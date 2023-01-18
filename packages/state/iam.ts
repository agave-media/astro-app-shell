import { createMachine, interpret } from "xstate";

export type AuthenticationMachineContext = {
	ready?: boolean;
};

export type AuthenticationMachineEvent = { type: "AUTH_READY" } | { type: "LOG_IN" } | { type: "LOG_OUT" };

const iamMachine = createMachine<AuthenticationMachineContext, AuthenticationMachineEvent>({
	context: {},
	id: "IAM",
	predictableActionArguments: true,
	initial: "init",
	states: {
		init: {
			on: {
				AUTH_READY: { target: "loggedOut" },
			},
		},
		loggedOut: {
			on: {
				LOG_IN: {
					target: "loggedIn",
				},
			},
		},
		loggedIn: {
			on: {
				LOG_OUT: {
					target: "loggedOut",
				},
			},
		},
	},
});

// global instance of the machine
const service = interpret(iamMachine).start();
const getInstance = () => {
	return service;
};
export { getInstance };
