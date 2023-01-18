import { createMachine, interpret, assign } from "xstate";

export type SettingsMachineContext = {
	colorScheme?: string;
};

export type SettingsMachineEvent = { type: "SET_COLOR_SCHEME"; colorScheme: string };

const settingsMachine = createMachine<SettingsMachineContext, SettingsMachineEvent>(
	{
		context: {
			colorScheme: "light",
		},
		id: "settings",
		type: "parallel",
		predictableActionArguments: true,
		states: {
			colorSchemeEvents: {
				initial: "idle",
				states: {
					idle: {
						on: {
							SET_COLOR_SCHEME: {
								target: "idle",
								actions: ["setColorScheme"],
							},
						},
					},
				},
			},
		},
	},
	{
		actions: {
			setColorScheme: assign((context, event) => {
				if (event.type !== "SET_COLOR_SCHEME") return {};

				return {
					colorScheme: event.colorScheme,
				};
			}),
		},
	}
);

// global instance of the machine
const service = interpret(settingsMachine).start();
const getInstance = () => {
	return service;
};
export { getInstance };
