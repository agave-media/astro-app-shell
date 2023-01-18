import { FirebaseApp, initializeApp } from "firebase/app";
import type { Auth } from "firebase/auth";
import { getInstance as getMachine } from "@state/machines/iam";

let resolve: any,
	firebaseInstance: FirebaseApp,
	authInstance: Auth,
	machine = getMachine();

// TODO: Replace the following with app's Firebase project configuration
const firebaseConfig = {
    //...
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

export async function getAuth() {
	if (authInstance) return authInstance;

	const { getAuth } = await import("firebase/auth");
	await getInstance();
	authInstance = getAuth();
	return authInstance;
}

const iam = {
	initialize,
	getInstance,
	getAuth,
	machine,
};
export default iam;