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

		bx-modal[open] {
			opacity: 1;
			visibility: inherit;
		}
	`;

    protected override render() {
        return html`
        <bx-modal @bx-modal-closed=${() => this.open = false} ?open=${this.open}>
            <bx-modal-header>
                <bx-modal-close-button></bx-modal-close-button>
                <bx-modal-label>${this.registration?.shortID}</bx-modal-label>
                <bx-modal-heading>Reenvio de email de confirmacion</bx-modal-heading>
            </bx-modal-header>
            <bx-modal-body><p>Se reenviará un correo a ${this.registration?.email}. Esta seguro de realizar la siguiente accion</p></bx-modal-body>
            <bx-modal-footer>
                <bx-modal-footer-button @click=${this.approveRegistration} ?disabled=${this.state !== "idle"} kind="primary">${this.state === "sending" ? "Enviando..." : "Enviar email"}</bx-modal-footer-button>
            </bx-modal-footer>
        </bx-modal>
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