import { html, css, LitElement, PropertyValueMap, nothing } from "lit";
import { property } from "lit/decorators/property.js";
import { customElement } from "lit/decorators.js";
import { fetchDoc } from "@db/clients/firebase";
import { ifDefined } from "lit/directives/if-defined.js";
import "@carbon/web-components/es/components/link/index.js";
import "@carbon/web-components/es/components/notification/index.js";
import "@material/web/icon/icon";
import type { RegistrationDetails as Registration } from "@state/machines/registration";

@customElement("registration-details")
export class RegistrationDetails extends LitElement {
	@property({ type: String })
	registrationID: string = "";

	@property({ type: String })
	status: string = "";

	@property({ type: Object })
	registrationDetails: Registration;

	static override styles = css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 24px;

            width: 100%;
            margin: 0 auto;
		    max-width: 80ch;
        }

		h4,
		p {
			margin: 0;
		}

		h4 {
			text-transform: uppercase;
			letter-spacing: 0.8px;
			font-size: 12px;
			font-style: italic;

			display: flex;
			flex-direction: column;
			color: var(--md-sys-color-primary);
		}

		p {
			letter-spacing: 0.5px;
			font-weight: 400;
			text-transform: none;
			font-size: 17px;
			color: var(--md-sys-color-on-surface-variant);
			font-style: normal;
		}
        
        .single-attachment div {
            letter-spacing: 0.5px;
            font-weight: 400;
            text-transform: none;
            font-size: 15px;
            color: var(--md-sys-color-on-surface-variant);
            font-style: normal;
            
            display: flex;
            align-items: center;
        }

        md-icon {
            margin-right: 6px;
            font-size: 20px;
        }

		bx-link {
			font-style: normal;
			text-transform: none;
		}

        .card-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 32px;

            border-radius: 6px;
            padding: 12px;
            background-color: var(--md-sys-color-surface-variant);
        }

        bx-inline-notification {
            min-width: 100%;
            margin: 0;
        }

        .single-attachment-container {
            grid-column: span 2;
            gap: 6px;
        }

        .single-attachment {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: var(--md-sys-color-on-surface-variant);

            padding: 8px 12px;
            border: 1px solid var(--md-sys-color-outline);
            border-radius: 8px;
        }

        @media (max-width: 768px) {
            .card-container {
                grid-template-columns: 1fr;
            }
        }
	`;

	protected override render() {
		return html`
			${ifDefined(this.status) && this.status === "confirmado" ? 
                html` <bx-inline-notification hide-close-button .title=${"Listo para rodar"} subtitle="Tu registro ha sido confirmado para Coatl Race. ¡Te esperamos el 12 de marzo!"></bx-inline-notification> ` : 
                nothing
            }

			${ifDefined(this.status) && this.status === "pendiente" ? 
                html` <bx-inline-notification hide-close-button kind="warning" title="Registro pendiente" subtitle="Tu solicitud será validada en un plazo máximo de 24 horas. Te notificaremos por correo electrónico cuando tu registro haya sido confirmado o consulta el status por medio del boton 'Revisar boleto'."></bx-inline-notification> ` : 
                nothing
            }

			<div class="card-container">
                <h4>
                    Nombre completo
                    <p>${this.registrationDetails?.fullName}</p>
                </h4>

				<h4>
					Correo electronico
					<p>${this.registrationDetails?.email}</p>
				</h4>

                <h4>
                    Categoria
                    <p>${this.registrationDetails?.raceCategory}</p>
                </h4>

				<h4>
					Grupo
					<p>${this.registrationDetails?.raceType}</p>
				</h4>

				<h4 class="single-attachment-container">
					Archivos

                    <div class="single-attachment">
                        <div>
                            <md-icon>attach_file</md-icon>
                            <div>Comprobante de pago</div>
                        </div>
                        <bx-link target="_blank" href=${ifDefined(this.registrationDetails?.comprobanteHref)}>Ver archivo</bx-link>
                    </div>
				</h4>
			</div>
		`;
	}

	protected override updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		const registrationIDUpdated = _changedProperties.has("registrationID");
		if (registrationIDUpdated && this.registrationID) {
			this.getRegistrationDetails(this.registrationID);
		}
	}

	async getRegistrationDetails(regID: string) {
		const registrationDetails = (await fetchDoc(`registrations/${regID}`)) as Registration;
		console.log("registration details:", registrationDetails);
		this.registrationDetails = registrationDetails;

		const curStatus = registrationDetails.confirmed ? "confirmado" : "pendiente";
		this.status = curStatus;

		this.appendStatusToURL(curStatus);
	}

	appendStatusToURL(status: string) {
		const [_, page, id, curStatus] = window.location.pathname?.split("/") || [];
		console.log("appending status:", status, page, id, curStatus);
        // TODO: more validation
		if (curStatus !== status) window.history.replaceState(null, "", `/${page}/${id}/${status}`);
	}
}
