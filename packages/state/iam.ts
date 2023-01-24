import { createMachine, interpret, assign } from "xstate";
import { register } from "@db/clients/firebase.js";

export type AuthenticationMachineContext = {
	userDetails?: UserDetails | undefined;
};

interface UserDetails {
	uid: string;
	email: string | null;
	displayName?: string | null;
	phoneNumber?: string | null;
}

interface NewUser {
	email: string;
	password: string;
}

export type AuthenticationMachineEvent =  { type: "LOG_IN"; userDetails: UserDetails } | { type: "LOG_OUT" } | { type: "CREATE_ACCOUNT"; newUser: NewUser };

const iamMachine = createMachine<AuthenticationMachineContext, AuthenticationMachineEvent>(
	{
		context: {},
		id: "IAM",
		predictableActionArguments: true,
		initial: "loggedOut",
		states: {
			loggedOut: {
				on: {
					LOG_IN: {
						target: "loggedIn",
						actions: "assignUserDetailsToContext",
					},
					CREATE_ACCOUNT: {
						target: "creatingAccount",
					},
				},
			},
			creatingAccount: {
				invoke: {
					src: "createAccount",
					onDone: {
						target: "loggedIn",
						actions: assign((_, event) => event.data),
					},
					onError: {
						target: "loggedOut",
					},
				},
			},
			loggedIn: {
				on: {
					LOG_OUT: {
						target: "loggedOut",
						actions: "clearCache",
					},
				},
			},
			notifyRegistrationError: {
				invoke: {
					src: {
						type: "sendAlert",
						msg: "No se pudo crear una cuenta, por favor intenta mas tarde.",
						variant: "warning",
					},
					onDone: {
						target: "loggedOut",
					},
				},
			},
			notifyRegistrationSuccess: {
				invoke: {
					src: {
						type: "sendAlert",
						msg: "Cuenta creada exitosamente!",
						variant: "success",
					},
					onDone: {
						target: "loggedIn",
					},
				},
			},
		},
	},
	{
		actions: {
			clearCache: assign((context, event) => {
				console.log("clearing user context:", context, event);
				return { userDetails: undefined };
			}),
			assignUserDetailsToContext: assign((context, event) => {
				console.log("assigning user details to context:", context, event);
				if (event.type === "LOG_IN") {
					return { userDetails: event.userDetails };
				} else {
					return {};
				}
			}),
		},
		services: {
			createAccount: async (context, event) => {
				if (event.type === "CREATE_ACCOUNT") {
					try {
						console.log("creating account:", context, event);
						const result = await register(event.newUser.email as string, event.newUser.password as string);
						console.log("create account result:", result);
                        const { uid, email, displayName, phoneNumber } = result.user;
                        return Promise.resolve({ uid, email, displayName, phoneNumber });
					} catch (error) {
						console.log("create account error:", error);
						return Promise.reject(error);
					}
				} else {
					return Promise.reject("invalid event type");
				}
			},
		},
	}
);

// global instance of the machine
const service = interpret(iamMachine).start();
const getInstance = () => {
	return service;
};
export { getInstance };
