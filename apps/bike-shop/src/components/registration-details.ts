import { html, css, LitElement, PropertyValueMap } from "lit";
import { property } from "lit/decorators/property.js";
import { customElement } from "lit/decorators.js";
import { fetchDoc } from "@db/clients/firebase";
import { ifDefined } from "lit/directives/if-defined.js";
import "@carbon/web-components/es/components/link/index.js";
import type { RegistrationDetails as Registration } from "@state/machines/registration";

@customElement("registration-details")
export class RegistrationDetails extends LitElement {
	@property({ type: String })
	registrationID: string = "";

	@property({ type: Object })
	registrationDetails: Registration;

	static override styles = css`
		h4, p {
            margin: 0;
        }

        h4 {
            text-transform: uppercase;
            letter-spacing: 0.8px;
            font-size: 12px;
            font-style: italic;
            
            display: flex;
            flex-direction: column;
            color: var(--md-sys-color-on-primary-container);
        }
        
        p {
            letter-spacing: 0.5px;
            font-weight: 400;
            text-transform: none;
            font-size: 17px;
            color: var(--md-sys-color-on-surface);
            font-style: normal;
        }
        
        bx-link {
            font-style: normal;
            text-transform: none;
        }
	`;

	protected override render() {
		return html`
			<h4>
                Correo electronico
                <p>${this.registrationDetails?.email}</p>
            </h4>

			<h4>
                Nombre completo
                <p>${this.registrationDetails?.fullName}</p>
            </h4>

			<h4>
                Grupo
                <p>${this.registrationDetails?.raceType}</p>
            </h4>

			<h4>
                Categoria
                <p>${this.registrationDetails?.raceCategory}</p>
            </h4>

			<h4>
                Comprobante de pago
                <bx-link target="_blank" href=${ifDefined(this.registrationDetails?.comprobanteHref)}>Ver archivo</bx-link>
            </h4>
		`;
	}

    protected override updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        const registrationIDUpdated = _changedProperties.has("registrationID")
        if (registrationIDUpdated && this.registrationID) {
            this.getRegistrationDetails(this.registrationID)
        }
    }

	async getRegistrationDetails(regID: string) {
		const registrationDetails = await fetchDoc(`registrations/${regID}`) as Registration;
		console.log("registration details:", registrationDetails);
        this.registrationDetails = registrationDetails
	}
}
