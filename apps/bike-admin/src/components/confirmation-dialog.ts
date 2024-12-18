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
					<cds-modal-heading>Actualizar registro</cds-modal-heading>
				</cds-modal-header>
				<cds-modal-body><p>El registro sera actualizado y se enviará un correo a ${this.registration?.email}. Por favor, revise su selección antes de continuar.</p></cds-modal-body>
				<cds-modal-footer>
					<cds-modal-footer-button ?disabled=${this.state !== "idle"} @click=${this.rejectRegistration} kind="danger">${this.state === "rejecting" ? "Rechazando..." : "Rechazar"}</cds-modal-footer-button>
					<cds-modal-footer-button ?disabled=${this.state !== "idle"} @click=${this.approveRegistration} kind="primary">${this.state === "approving" ? "Aprobando..." : "Aprobar registro"}</cds-modal-footer-button>
				</cds-modal-footer>
			</cds-modal>
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
