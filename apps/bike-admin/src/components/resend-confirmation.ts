import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "@carbon/web-components/es/components/modal/index.js";
import type { RegistrationDetails } from "@state/machines/registration";
import { updateRegistrationStatus } from "@db/clients/firebase";

declare global {
    interface HTMLElementTagNameMap {
        "resend-confirmation": ResendConfirmation;
    }
}

@customElement("resend-confirmation")
export class ResendConfirmation extends LitElement {
    @property({ type: Boolean })
    open: boolean = false;

    @property({ type: String })
    state: string = "idle";

    @property({ type: Object })
    registration: RegistrationDetails | undefined;

    static override styles = css`
		:host {
			display: block;
		}

		cds-modal[open] {
			opacity: 1;
			visibility: inherit;
		}
	`;

    protected override render() {
        return html`
        <cds-modal @cds-modal-closed=${() => this.open = false} ?open=${this.open}>
            <cds-modal-header>
                <cds-modal-close-button></cds-modal-close-button>
                <cds-modal-label>${this.registration?.shortID}</cds-modal-label>
                <cds-modal-heading>Reenvio de email de confirmacion</cds-modal-heading>
            </cds-modal-header>
            <cds-modal-body><p>Se reenviará un correo a ${this.registration?.email}. Esta seguro de realizar la siguiente accion</p></cds-modal-body>
            <cds-modal-footer>
                <cds-modal-footer-button @click=${this.approveRegistration} ?disabled=${this.state !== "idle"} kind="primary">${this.state === "sending" ? "Enviando..." : "Enviar email"}</cds-modal-footer-button>
            </cds-modal-footer>
        </cds-modal>
    `;
    }

    async approveRegistration() {
        this.state = "sending"

        if (this.registration?.id) {
            try {
                await updateRegistrationStatus(this.registration.id, "resent")
                this.state = "idle"
                this.open = false
            } catch (err) {
                console.log("error approving reg:", err)
                this.state = "idle"
            }
        }
    }

}