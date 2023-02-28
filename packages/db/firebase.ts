import { FirebaseApp, initializeApp } from "firebase/app";
import type { Auth, Unsubscribe } from "firebase/auth";
import { getInstance as getMachine } from "@state/machines/iam";
import type { DocumentData, Firestore, Query } from "firebase/firestore";

let resolve: any,
	firebaseInstance: FirebaseApp,
	authInstance: Auth,
	firestoreInstance: Firestore,
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

export async function getFirestore() {
	if (firestoreInstance) return firestoreInstance;

	const { getFirestore } = await import("firebase/firestore");
	await getInstance();
	firestoreInstance = getFirestore();
	return firestoreInstance;
}

export const fetchDoc = async (path: string) => {
	const { getDoc, doc } = await import("firebase/firestore");

    let curFirestore = await getFirestore()
	const docRef = await doc(curFirestore, path);
	const docSnap = await getDoc(docRef);

	return { ...docSnap.data(), id: docSnap.id };
};

export async function attachFirestoreCollectionListener(key: string, cb: any, q?: Query<DocumentData>) {
	let curFirestore = await getFirestore();
	const { collection, onSnapshot, query } = await import("firebase/firestore");
	if (!q) q = query(collection(curFirestore, key));
	firestoreListeners[key] = onSnapshot(q, cb);
	return firestoreListeners[key];
}

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

const iam = {
	initialize,
	getInstance,
	getAuth,
	attachAuthListener,
	signIn,
	signOut,
	fetchDoc,
	machine,
};
export default iam;
