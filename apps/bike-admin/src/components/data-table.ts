import { html, css, LitElement, type PropertyValueMap } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import "@carbon/web-components/es/components/data-table/index.js";
import "@carbon/web-components/es/components/overflow-menu/index.js";
import "@carbon/web-components/es/components/button/index.js";
import Attachment16 from "@carbon/web-components/es/icons/attachment/16";
import Pending16 from "@carbon/web-components/es/icons/pending/24";
import CheckmarkFilled from "@carbon/web-components/es/icons/checkmark--filled/24";
import Email from "@carbon/web-components/es/icons/email/24"
import ErrorIcon from "@carbon/web-components/es/icons/error/24";
import { queryRegistros } from "@db/clients/firebase";
import type { QuerySnapshot } from "firebase/firestore";
import type { RegistrationDetails } from "@state/machines/registration";
import { DateTime } from "luxon";

@customElement("data-table")
export class DataTable extends LitElement {
	@property({ type: Array })
	registros: RegistrationDetails[] = [];

	static override styles = css`
		:host {
			display: block;
            scroll-behavior: auto;
            overflow-y: auto;
		}
	`;

	protected override render() {
		return html`
			<!-- <cds-table-toolbar>
				<cds-table-toolbar-content>
					<cds-btn>Primary Button</cds-btn>
				</cds-table-toolbar-content>
			</cds-table-toolbar> -->
			<cds-table>
				<cds-table-head>
					<cds-table-header-row>
						<cds-table-header-cell>ID</cds-table-header-cell>
						<cds-table-header-cell>Correo</cds-table-header-cell>
						<cds-table-header-cell>Nombre</cds-table-header-cell>
						<cds-table-header-cell>Equipo</cds-table-header-cell>
						<cds-table-header-cell>Categoria</cds-table-header-cell>
						<cds-table-header-cell>Grupo</cds-table-header-cell>
						<cds-table-header-cell>Talla</cds-table-header-cell>
						<cds-table-header-cell>Fecha</cds-table-header-cell>
						<cds-table-header-cell>Comprobante</cds-table-header-cell>
						<cds-table-header-cell>Status</cds-table-header-cell>
						<cds-table-header-cell>Reenvio</cds-table-header-cell>

					</cds-table-header-row>
				</cds-table-head>
				<cds-table-body>
					${repeat(
						this?.registros?.length ? this.registros : [],
						(singleRegistro) => html`
							<cds-table-row>
								<cds-table-cell>${singleRegistro.shortID}</cds-table-cell>
								<cds-table-cell>${singleRegistro.email}</cds-table-cell>
								<cds-table-cell>${singleRegistro.fullName}</cds-table-cell>
								<cds-table-cell>${singleRegistro.teamName}</cds-table-cell>
								<cds-table-cell>${singleRegistro.raceType}</cds-table-cell>
								<cds-table-cell>${singleRegistro.raceCategory}</cds-table-cell>
								<cds-table-cell>${singleRegistro?.size?.toUpperCase() || "S/N"}</cds-table-cell>
								<cds-table-cell>${this._computeDate(singleRegistro.states.createdAt)}</cds-table-cell>
								<cds-table-cell class="cds--table-column-menu">
									<cds-btn target="_blank" href=${singleRegistro?.comprobanteHref || ""} kind="tertiary" size="sm">${Attachment16({ slot: "icon" })}</cds-btn>
								</cds-table-cell>
								<cds-table-cell class="cds--table-column-menu">${this._computeStatusIcon(singleRegistro)}</cds-table-cell>
								<cds-table-cell class="cds--table-column-menu">${this._resendConfirmation(singleRegistro)}</cds-table-cell>
							</cds-table-row>
						`
					)}
				</cds-table-body>
			</cds-table>
		`;
	}

	_computeStatusIcon(singleRegistro: RegistrationDetails) {
		if (singleRegistro?.states?.confirmedAt?.seconds > 0) return html` <cds-btn kind="ghost" size="sm">${CheckmarkFilled({ slot: "icon", color: "#24a148" })}</cds-btn> `;
		else if (singleRegistro?.states?.rejectedAt?.seconds > 0) return html` <cds-btn kind="ghost" size="sm">${ErrorIcon({ slot: "icon", color: "#da1e28" })}</cds-btn> `;
		else return html` <cds-btn @click=${() => this.openRegistrationActionDialog(singleRegistro)} kind="ghost" size="sm">${Pending16({ slot: "icon", color: "#6f6f6f" })}</cds-btn> `;
	}
	_resendConfirmation(singleRegistro: RegistrationDetails){
		if (singleRegistro?.states?.confirmedAt?.seconds > 0) return html` <cds-btn @click=${() => this.openResendEmail(singleRegistro)} kind="ghost" size="sm">${Email({slot:'icon'})}</cds-btn> `;
		else return html`<cds-btn disabled kind="ghost" size="sm">${Email({slot:'icon'})}</cds-btn>`
	}
	protected override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		queryRegistros("registrations", (docs: QuerySnapshot) => {
			let arr = [] as RegistrationDetails[];
			docs.forEach((doc) => {
				console.log(doc.id, " => ", doc.data());
				let curData = structuredClone(doc.data()) as RegistrationDetails;
				curData.id = doc.id;
				arr.push(curData);
			});
			console.log("registrations:", docs, arr);
			this.registros = arr;
		});
	}

	_computeDate(curDate: any) {
		const date = DateTime.fromSeconds(curDate.seconds);
		const formattedDate = date.setLocale("es-MX").toLocaleString();
		return formattedDate;
	}

	openRegistrationActionDialog(registro: RegistrationDetails) {
		console.log("opening registration...");
		this.dispatchEvent(new CustomEvent("open-registration-dialog", { detail: registro, bubbles: true, composed: true }));
	}

	openResendEmail(registro: RegistrationDetails){
		console.log('open resend dialog')
		this.dispatchEvent(new CustomEvent("open-resend-confirmation", { detail: registro, bubbles: true, composed: true }))
	}
}
