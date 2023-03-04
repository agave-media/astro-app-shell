import { FirebaseApp, initializeApp } from "firebase/app";
import type { Auth, Unsubscribe } from "firebase/auth";
import { getInstance as getMachine } from "@state/machines/iam";
import { DocumentData, Firestore, Query, serverTimestamp } from "firebase/firestore";
import type { FirebaseStorage } from "firebase/storage";
import type { Analytics } from "firebase/analytics";
import type { RegistrationDetails } from "@state/machines/registration";

let resolve: any,
	firebaseInstance: FirebaseApp,
	authInstance: Auth,
	firestoreInstance: Firestore,
	analyticsInstance: Analytics,
	storageInstance: FirebaseStorage,
	firestoreListeners: { [key: string]: Unsubscribe } = {},
	authListener: Unsubscribe,
	machine = getMachine();

const firebaseConfig = {
	apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
	authDomain: import.meta.env.PUBLIC_AUTH_DOMAIN,
	projectId: import.meta.env.PUBLIC_PROJECT_ID,
	storageBucket: import.meta.env.PUBLIC_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.PUBLIC_MESSAGING_SENDER_ID,
	appId: import.meta.env.PUBLIC_APP_ID,
	measurementId: import.meta.env.PUBLIC_MEASUREMENT_ID,
};

const promise = new Promise((res) => (resolve = res));

export { serverTimestamp };

export async function initialize() {
	if (import.meta.env.SSR) return undefined;

	if (firebaseInstance) return firebaseInstance;

	firebaseInstance = initializeApp(firebaseConfig);
	resolve(firebaseInstance);

	return firebaseInstance;
}

export async function getInstance() {
	if (import.meta.env.SSR) return undefined;

	if (firebaseInstance) return firebaseInstance;
	else await initialize();

	return promise;
}

export async function getStorage() {
	if (storageInstance) return storageInstance;

	const { getStorage } = await import("firebase/storage");
	await getInstance();
	storageInstance = getStorage();
	return storageInstance;
}

export async function getAnalytics() {
	if (analyticsInstance) return analyticsInstance;

	const { getAnalytics } = await import("firebase/analytics");
	await getInstance();
	analyticsInstance = getAnalytics(firebaseInstance);
	return analyticsInstance;
}

export async function getFirestore() {
	if (firestoreInstance) return firestoreInstance;

	const { getFirestore } = await import("firebase/firestore");
	await getInstance();
	firestoreInstance = getFirestore();
	return firestoreInstance;
}

export const fetchDoc = async (path: string) => {
	const { getDoc, doc } = await import("firebase/firestore");

	let curFirestore = await getFirestore();
	const docRef = await doc(curFirestore, path);
	const docSnap = await getDoc(docRef);

	return { ...docSnap.data(), id: docSnap.id };
};

export const queryDocs = async (path: string, searchQuery: string) => {
	let curFirestore = await getFirestore();

	// Create a reference to the cities collection
	const { collection, query, where, getDocs } = await import("firebase/firestore");
	const ref = collection(curFirestore, path);

	// Create a query against the collection.
	const q = query(ref, where("email", "==", searchQuery));

	const querySnapshot = await getDocs(q);
	let arr = [] as RegistrationDetails[];
	querySnapshot.forEach((doc) => {
		console.log(doc.id, " => ", doc.data());
		let curData = structuredClone(doc.data()) as RegistrationDetails;
		curData.id = doc.id;
		arr.push(curData);
	});

	return arr;
};

export async function queryRegistros(key: string, cb: any, q?: Query<DocumentData>) {
	let curFirestore = await getFirestore();
	const { collection, onSnapshot, query, orderBy } = await import("firebase/firestore");
	if (!q) q = query(collection(curFirestore, key), orderBy("states.createdAt", "desc"));
	firestoreListeners[key] = onSnapshot(q, cb);
	return firestoreListeners[key];
}

export async function attachFirestoreCollectionListener(key: string, cb: any, q?: Query<DocumentData>) {
	let curFirestore = await getFirestore();
	const { collection, onSnapshot, query } = await import("firebase/firestore");
	if (!q) q = query(collection(curFirestore, key));
	firestoreListeners[key] = onSnapshot(q, cb);
	return firestoreListeners[key];
}

export const updateRegistrationStatus = async (regID: string, status: string) => {
	const db = await getFirestore();

	const { doc, updateDoc } = await import("firebase/firestore");

	const updatedStatus = { confirmed: status === "confirmed" } as any;
	if (status === "confirmed") updatedStatus["states.confirmedAt"] = serverTimestamp();
	else if (status === "rejected") updatedStatus["states.rejectedAt"] = serverTimestamp();
	console.log("updated status:", updatedStatus);

	const ref = doc(db, `registrations/${regID}`);
	return updateDoc(ref, updatedStatus);
};

export const incrementRegistrationCount = async (registrationType: string) => {
	const db = await getFirestore();

	const { doc, updateDoc, increment, getDoc } = await import("firebase/firestore");

	// Increment
	const updatedCount: any = {};
	updatedCount[registrationType] = increment(1);
	const ref = doc(db, "config/registrationCount");
	await updateDoc(ref, updatedCount);

	// Fetch updated count from DB
	const docSnap = await getDoc(ref);
	const parsedDoc = docSnap.data();
	console.log("increment success:", parsedDoc);

	return parsedDoc?.[registrationType] as number;
};

export const writeDoc = async (collectionName: string, docData: any) => {
	const db = await getFirestore();

	const { collection, addDoc } = await import("firebase/firestore");
	const docRef = await addDoc(collection(db, collectionName), docData);

	return docRef;
};

export async function getAuth() {
	if (authInstance) return authInstance;

	const { getAuth } = await import("firebase/auth");
	await getInstance();
	authInstance = getAuth();
	return authInstance;
}

export async function attachAuthListener() {
	if (authListener) return authListener;

	let curAuth = await getAuth();
	const { onAuthStateChanged } = await import("firebase/auth");
	authListener = onAuthStateChanged(curAuth, async (user) => {
		console.log("auth state listener:", user);
		if (user) {
			const { uid, displayName, email, phoneNumber } = user;
			console.log("user signed in:", uid, user);
			machine.send({
				type: "LOG_IN",
				userDetails: {
					uid,
					email,
					displayName,
					phoneNumber,
				},
			});
		} else {
			console.log("user not signed in...");
			machine.send({
				type: "LOG_OUT",
			});
		}
	});
	return authListener;
}

export async function register(email: string, pw: string) {
	const { getAuth, createUserWithEmailAndPassword } = await import("firebase/auth");

	await getInstance();
	const authInstance = getAuth();

	return createUserWithEmailAndPassword(authInstance, email, pw);
}

export async function signIn(email: string, pw: string) {
	const { signInWithEmailAndPassword } = await import("firebase/auth");
	let curAuth = await getAuth();
	return signInWithEmailAndPassword(curAuth, email, pw);
}

export async function signOut() {
	const { signOut } = await import("firebase/auth");
	let curAuth = await getAuth();
	return signOut(curAuth);
}

export async function getUploadString(imgFile: File) {
	const { ref, getDownloadURL, uploadBytes } = await import("firebase/storage");

	// url-safe timestamp suffix for image file name
	const imgSuffix = new Date().toISOString();
	const sanitizedFileName = `${imgFile.name}_${imgSuffix}`.replace(/\s/g, "_").replace(/:/g, "-").replace(/\./g, "-");
	console.log("file name:", imgFile.name, sanitizedFileName);

	let curStorage = await getStorage();
	let storageRef = ref(curStorage, `comprobantes/${sanitizedFileName}`);
	let uploadRes = await uploadBytes(storageRef, imgFile);
	return await getDownloadURL(uploadRes.ref);
}

const iam = {
	initialize,
	getInstance,
	getAuth,
    getAnalytics,
	attachAuthListener,
	signIn,
	signOut,
	fetchDoc,
	queryDocs,
	queryRegistros,
	serverTimestamp,
	incrementRegistrationCount,
    updateRegistrationStatus,
	machine,
};
export default iam;
