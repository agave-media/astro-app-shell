import { html, css, LitElement } from "lit";
import { property } from "lit/decorators/property.js";
import { customElement } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import "@carbon/web-components/es/components/file-uploader/index.js";

declare global {
    interface HTMLElementTagNameMap {
        "image-uploader": ImageUploader;
    }
}

@customElement("image-uploader")
export class ImageUploader extends LitElement {
	@property({ type: String })
	href = "";

	@property({ type: Array })
	files: File[] = [];

	static override styles = css`
		.file-name:hover {
			text-decoration: underline;
			cursor: pointer;
		}
	`;

	protected override render() {
		return html`
			<cds-file-uploader-drop-container multiple @cds-file-uploader-drop-container-changed=${this._handleUpload} accept="image/jpeg image/png application/pdf">Arrastra tu comprobante de pago aquí o haz clic para subirlo</cds-file-uploader-drop-container>

			${repeat(
				this.files,
				(singleFile) => html`
					<cds-file-uploader-item @cds-file-uploader-item-deleted=${this._clearFiles} state="editing">
						<div @click=${() => this._openFilePreview(singleFile)} class="file-name">${singleFile.name}</div>
					</cds-file-uploader-item>
				`
			)}
		`;
	}

	_handleUpload(e: CustomEvent) {
		const { detail } = e;
		console.log("file uploaded:", e, detail.addedFiles);
		this.files = detail.addedFiles;

        this.dispatchEvent(new CustomEvent("file-added", {
            detail: detail?.addedFiles?.[0]
        }))
	}

	_clearFiles() {
		this.files = [];
	}

	_openFilePreview(singleFile: File) {
		const blobUrl = URL.createObjectURL(singleFile);
		window.open(blobUrl, "_blank");
	}
}
