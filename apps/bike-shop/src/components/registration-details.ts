import { html, css, LitElement, PropertyValueMap } from "lit";
import { property } from "lit/decorators/property.js";
import { customElement } from "lit/decorators.js";
import { fetchDoc } from "@db/clients/firebase";
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
            letter-spacing: 0.5px;
            font-size: 16px;
        }

        p {
            font-weight: 400;
            text-transform: none;
            font-size: 14px;
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
