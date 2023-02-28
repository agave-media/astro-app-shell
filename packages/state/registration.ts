import { createMachine, interpret, assign } from "xstate";
import { getUploadString, writeDoc } from "@db/clients/firebase.js";

export interface RegistrationDetails {
	email: string;
	fullName: string;
	phone?: string;
	teamName: string;
	raceType: string;
	raceCategory: string;
	bloodType: string;
	size: string;
	ageGroup?: string;
	fullNameEmergencyContact?: string;
	phoneEmergencyContact?: string;
	placeOfOrigin?: string;
	comprobante?: File;
	comprobanteHref?: string;
    id?: string;
}

type RegistrationMachineContext = {
	id: string | undefined;
	registrationDetails?: RegistrationDetails | undefined;
};

type RegistrationMachineEvent = { type: "SUBMIT_REGISTRATION"; registrationDetails: RegistrationDetails } | { type: "RESET" } | { type: "REGISTRATION_SUCCESS" } | { type: "REGISTRATION_FAILED" } | { type: "NOTIFY_FORM_ERROR" };

const registrationMachine = createMachine<RegistrationMachineContext, RegistrationMachineEvent>(
	{
		context: {
			id: undefined,
			registrationDetails: undefined,
		},
		id: "registration",
		initial: "idle",
		states: {
			idle: {
				on: {
					SUBMIT_REGISTRATION: {
						target: "submitting",
						actions: "assignRegistrationDetailsToContext",
					},
					RESET: {
						target: "idle",
						actions: "clearRegistrationDetails",
					},
					NOTIFY_FORM_ERROR: {
						target: "notifyFormError",
					},
				},
			},
			submitting: {
				invoke: {
					src: "submitRegistration",
					onDone: {
						target: "notifyRegistrationSuccess",
						actions: assign((_, event) => event.data),
					},
					onError: {
						target: "notifyRegistrationError",
					},
				},
			},
			complete: {
				type: "final",
			},
			notifyFormError: {
				invoke: {
					src: {
						type: "sendAlert",
						msg: "Formulario incompleto, por favor llenar todos los campos requeridos.",
						variant: "warning",
					},
					onDone: {
						target: "idle",
					},
				},
			},
			notifyRegistrationError: {
				invoke: {
					src: {
						type: "sendAlert",
						msg: "No se pudo enviar registro, por favor intenta mas tarde.",
						variant: "warning",
					},
					onDone: {
						target: "idle",
					},
				},
			},
			notifyRegistrationSuccess: {
				invoke: {
					src: {
						type: "sendAlert",
						msg: "Registro exitoso.",
						variant: "success",
					},
					onDone: {
						target: "complete",
					},
				},
			},
		},
	},
	{
		actions: {
			assignRegistrationDetailsToContext: assign((_, event) => {
				console.log("assigning registration details to context:", event);
				if (event.type === "SUBMIT_REGISTRATION" && event.registrationDetails) {
					return { registrationDetails: event.registrationDetails };
				} else {
					return {};
				}
			}),
			clearRegistrationDetails: assign((context) => {
				if (context.registrationDetails) {
					return { registrationDetails: undefined };
				} else {
					return {};
				}
			}),
		},
		services: {
			submitRegistration: async (context) => {
				if (context.registrationDetails && context.registrationDetails.comprobante) {
					console.log("writing registration to db:", context.registrationDetails);
					try {
                        const imgUploadResult = await getUploadString(context.registrationDetails.comprobante)
                        console.log("img upload result:", imgUploadResult);
                        
                        const clonedRegistration = structuredClone(context.registrationDetails)
                        delete clonedRegistration.comprobante
                        clonedRegistration.comprobanteHref = imgUploadResult

                        const result = await writeDoc("registrations", clonedRegistration);
                        console.log("write result:", result);
                        
                        return Promise.resolve({ id: result.id });
					} catch (e) {
						console.log("error writing registration:", e);
						return Promise.reject(e);
					}
				} else {
					return Promise.reject();
				}
			},
			sendAlert: async (_, __, { src }) => {
				console.log("sending alert from service:", src);
				const { msg, variant } = src;

				await import("@shoelace-style/shoelace/dist/components/alert/alert.js");

				// Hook into notification system.
				const el = document.createElement("sl-alert");
				// el.classList.add('sl-theme-dark');
				const alert = Object.assign(el, {
					variant,
					closable: true,
					duration: 4000,
					innerHTML: msg,
				});
				document.body.append(alert);
				alert.toast();

				return Promise.resolve(true);
			},
		},
	}
);

const registrationService = interpret(registrationMachine).start();
const getInstance = () => {
	return registrationService;
};
export { getInstance };
