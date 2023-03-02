import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "@carbon/web-components/es/components/modal/index.js";
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
					<bx-modal-footer-button kind="danger">Rechazar</bx-modal-footer-button>
					<bx-modal-footer-button kind="primary">Validar registro</bx-modal-footer-button>
				</bx-modal-footer>
			</bx-modal>
		`;
	}
}
