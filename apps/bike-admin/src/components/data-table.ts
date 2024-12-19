import { html, css, LitElement, type PropertyValueMap } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import "@carbon/web-components/es/components/data-table/index.js";
import "@carbon/web-components/es/components/overflow-menu/index.js";
import "@carbon/web-components/es/components/button/index.js";
import Attachment16 from "@carbon/web-components/es/icons/attachment/16";
import Pending16 from "@carbon/web-components/es/icons/pending/24";
import CheckmarkFilled from "@carbon/web-components/es/icons/checkmark--filled/24";
import Edit16 from "@carbon/web-components/es/icons/edit/16";
import ErrorIcon from "@carbon/web-components/es/icons/error/24";
import { fetchProducts } from "@db/clients/turso";
import type { Producto } from "@state/machines/producto";
import { DateTime } from "luxon";
  
@customElement("data-table")
export class DataTable extends LitElement {
	@property({ type: Array })
	productos: Producto[] = [];

	static override styles = css`
		:host {
			display: block;
            scroll-behavior: auto;
            overflow-y: auto;
		}

        .cds--table-column-menu > div {
            display: flex;
            gap: 8px;
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
						<cds-table-header-cell>Nombre</cds-table-header-cell>
						<cds-table-header-cell>Categoria</cds-table-header-cell>
						<cds-table-header-cell>Sub-categoria</cds-table-header-cell>
						<cds-table-header-cell>Stock</cds-table-header-cell>
						<cds-table-header-cell>Costo</cds-table-header-cell>
						<!-- <cds-table-header-cell>Catalogo en linea</cds-table-header-cell> -->
						<cds-table-header-cell>Unidad</cds-table-header-cell>
						<cds-table-header-cell>Variantes</cds-table-header-cell>
						<cds-table-header-cell>Imagen</cds-table-header-cell>
					</cds-table-header-row>
				</cds-table-head>
				<cds-table-body>
					${repeat(
						this?.productos?.length ? this.productos : [],
						(singleProduct) => html`
							<cds-table-row>
								<cds-table-cell>${singleProduct.identificador}</cds-table-cell>
								<cds-table-cell>${singleProduct.nombre}</cds-table-cell>
								<cds-table-cell>${singleProduct.categoria}</cds-table-cell>
								<cds-table-cell>${singleProduct.subcategoria}</cds-table-cell>
								<cds-table-cell>${singleProduct.stockActual}</cds-table-cell>
								<cds-table-cell>${singleProduct.costo}</cds-table-cell>
								<cds-table-cell>${singleProduct.unidad}</cds-table-cell>
								<cds-table-cell>${singleProduct.variantes}</cds-table-cell>
								<cds-table-cell class="cds--table-column-menu">
                                    <div>
                                        <cds-button target="_blank" href=${singleProduct?.imagen || ""} kind="primary" size="sm">${Attachment16({ slot: "icon" })}</cds-button>
                                        <cds-button kind="secondary" @click=${() => this.openResendEmail(singleProduct)} size="sm">${Edit16({ slot: "icon" })}</cds-button>
                                    </div>
								</cds-table-cell>
							</cds-table-row>
						`
					)}
				</cds-table-body>
			</cds-table>
		`;
	}

	/*_resendConfirmation(singleProduct: Producto){
		if (singleProduct?.states?.confirmedAt?.seconds > 0) return html` <cds-btn @click=${() => this.openResendEmail(singleProduct)} kind="ghost" size="sm">${Email({slot:'icon'})}</cds-btn> `;
		else return html`<cds-btn disabled kind="ghost" size="sm">${Email({slot:'icon'})}</cds-btn>`
	}*/
	
    protected override async firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): Promise<void> {
		const data = await fetchProducts()
        console.log("products:", data);
        this.productos = data;
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

	openResendEmail(singleProduct: Producto){
		console.log('open resend dialog')
		this.dispatchEvent(new CustomEvent("open-resend-confirmation", { detail: singleProduct, bubbles: true, composed: true }))
	}
}
