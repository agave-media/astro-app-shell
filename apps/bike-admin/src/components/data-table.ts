import { html, css, LitElement, PropertyValueMap } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import "@carbon/web-components/es/components/data-table/index.js";
import "@carbon/web-components/es/components/overflow-menu/index.js";
import "@carbon/web-components/es/components/button/index.js";
import Attachment16 from "@carbon/web-components/es/icons/attachment/16";
import Pending16 from "@carbon/web-components/es/icons/pending/24";
import CheckmarkFilled from "@carbon/web-components/es/icons/checkmark--filled/24";
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
		}
	`;

	protected override render() {
		return html`
			<!-- <bx-table-toolbar>
				<bx-table-toolbar-content>
					<bx-btn>Primary Button</bx-btn>
				</bx-table-toolbar-content>
			</bx-table-toolbar> -->
			<bx-table>
				<bx-table-head>
					<bx-table-header-row>
						<bx-table-header-cell>ID</bx-table-header-cell>
						<bx-table-header-cell>Correo</bx-table-header-cell>
						<bx-table-header-cell>Nombre</bx-table-header-cell>
						<bx-table-header-cell>Categoria</bx-table-header-cell>
						<bx-table-header-cell>Grupo</bx-table-header-cell>
						<bx-table-header-cell>Fecha</bx-table-header-cell>
						<bx-table-header-cell>Comprobante</bx-table-header-cell>
						<bx-table-header-cell>Status</bx-table-header-cell>
					</bx-table-header-row>
				</bx-table-head>
				<bx-table-body>
					${repeat(
						this?.registros?.length ? this.registros : [],
						(singleRegistro) => html`
							<bx-table-row>
								<bx-table-cell>${singleRegistro.shortID}</bx-table-cell>
								<bx-table-cell>${singleRegistro.email}</bx-table-cell>
								<bx-table-cell>${singleRegistro.fullName}</bx-table-cell>
								<bx-table-cell>${singleRegistro.raceType}</bx-table-cell>
								<bx-table-cell>${singleRegistro.raceCategory}</bx-table-cell>
								<bx-table-cell>${this._computeDate(singleRegistro.states.createdAt)}</bx-table-cell>
								<bx-table-cell class="bx--table-column-menu">
									<bx-btn target="_blank" href=${singleRegistro?.comprobanteHref || ""} kind="tertiary" size="sm">${Attachment16({ slot: "icon" })}</bx-btn>
								</bx-table-cell>
								<bx-table-cell class="bx--table-column-menu">${this._computeStatusIcon(singleRegistro)}</bx-table-cell>
							</bx-table-row>
						`
					)}
				</bx-table-body>
			</bx-table>
		`;
	}

	_computeStatusIcon(singleRegistro: RegistrationDetails) {
		if (singleRegistro?.states?.confirmedAt?.seconds > 0) return html` <bx-btn kind="ghost" size="sm">${CheckmarkFilled({ slot: "icon", color: "#24a148" })}</bx-btn> `;
		else if (singleRegistro?.states?.rejectedAt?.seconds > 0) return html` <bx-btn kind="ghost" size="sm">${ErrorIcon({ slot: "icon", color: "#da1e28" })}</bx-btn> `;
		else return html` <bx-btn @click=${() => this.openRegistrationActionDialog(singleRegistro)} kind="ghost" size="sm">${Pending16({ slot: "icon", color: "#6f6f6f" })}</bx-btn> `;
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
		console.log("cur date:", curDate);
		const date = DateTime.fromSeconds(curDate.seconds);
		const formattedDate = date.setLocale("es-MX").toLocaleString();
		return formattedDate;
	}

	openRegistrationActionDialog(registro: RegistrationDetails) {
		console.log("opening registration...");
		this.dispatchEvent(new CustomEvent("open-registration-dialog", { detail: registro, bubbles: true, composed: true }));
	}
}
