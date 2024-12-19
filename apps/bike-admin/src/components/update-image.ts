import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "@carbon/web-components/es/components/modal/index.js";
import { updateRegistrationStatus } from "@db/clients/firebase";
import type { Producto } from "@state/machines/producto";
import "./image-uploader";

declare global {
    interface HTMLElementTagNameMap {
        "update-image": UpdateImage;
    }
}

@customElement("update-image")
export class UpdateImage extends LitElement {
    @property({ type: Boolean })
    open = false;

    @property({ type: String })
    state = "idle";

    @property({ type: Object })
    producto: Producto | undefined;

    static override styles = css`
		:host {
			display: block;
		}

		cds-modal[open] {
			opacity: 1;
			visibility: inherit;
		}

        cds-modal-body > div {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            flex-direction: column;
        }

        image-uploader {
            align-self: center;
        }
	`;

    protected override render() {
        return html`
        <cds-modal @cds-modal-closed=${() => this.open = false} ?open=${this.open}>
            <cds-modal-header>
                <cds-modal-close-button></cds-modal-close-button>
                <cds-modal-label>${this.producto?.nombre}</cds-modal-label>
                <cds-modal-heading>Actualización de Imagen</cds-modal-heading>
            </cds-modal-header>
            <cds-modal-body>
                <div>
                    <p>Se actualizará la imagen del producto ${this.producto?.nombre}. ¿Está seguro de realizar esta acción?</p>
                    <image-uploader></image-uploader>
                </div>
            </cds-modal-body>
            <cds-modal-footer>
                <cds-modal-footer-button @click=${this.approveRegistration} ?disabled=${this.state !== "idle"} kind="primary">${this.state === "sending" ? "Enviando..." : "Actualizar"}</cds-modal-footer-button>
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