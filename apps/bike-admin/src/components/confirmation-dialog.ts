import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "@carbon/web-components/es/components/modal/index.js";
import { updateRegistrationStatus } from "@db/clients/firebase";
import type { RegistrationDetails } from "@state/machines/registration";

declare global {
	interface HTMLElementTagNameMap {
		"confirmation-dialog": ConfirmationDialog;
	}
}

@customElement("confirmation-dialog")
export class ConfirmationDialog extends LitElement {
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
					<bx-modal-heading>Actualizar registro</bx-modal-heading>
				</bx-modal-header>
				<bx-modal-body><p>El registro sera actualizado y se enviará un correo a ${this.registration?.email}. Por favor, revise su selección antes de continuar.</p></bx-modal-body>
				<bx-modal-footer>
					<bx-modal-footer-button ?disabled=${this.state !== "idle"} @click=${this.rejectRegistration} kind="danger">${this.state === "rejecting" ? "Rechazando..." : "Rechazar"}</bx-modal-footer-button>
					<bx-modal-footer-button ?disabled=${this.state !== "idle"} @click=${this.approveRegistration} kind="primary">${this.state === "approving" ? "Aprobando..." : "Aprobar registro"}</bx-modal-footer-button>
				</bx-modal-footer>
			</bx-modal>
		`;
	}

    async rejectRegistration() {
        this.state = "rejecting"

        if (this.registration?.id) {
            try {
                await updateRegistrationStatus(this.registration.id, "rejected")
                this.state = "idle"
                this.open = false
            } catch (err) {
                console.log("error approving reg:", err)
                this.state = "idle"
            }
        }
    }

    async approveRegistration() {
        this.state = "approving"

        if (this.registration?.id) {
            try {
                await updateRegistrationStatus(this.registration.id, "confirmed")
                this.state = "idle"
                this.open = false
            } catch (err) {
                console.log("error approving reg:", err)
                this.state = "idle"
            }
        }
    }
}
