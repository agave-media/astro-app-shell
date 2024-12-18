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
					<cds-table-header-cell>id</cds-table-header-cell>
						<cds-table-header-cell>nombre</cds-table-header-cell>
						<cds-table-header-cell>descripción</cds-table-header-cell>
						<cds-table-header-cell>categoria</cds-table-header-cell>
						<cds-table-header-cell>SubCategoria</cds-table-header-cell>
						<cds-table-header-cell>StockActual</cds-table-header-cell>
						<cds-table-header-cell>stockMinimo </cds-table-header-cell>
						<cds-table-header-cell>Costo</cds-table-header-cell>
						<cds-table-header-cell>precioPublico</cds-table-header-cell>
						<cds-table-header-cell>precioMayorista</cds-table-header-cell>
						<cds-table-header-cell>Costo</cds-table-header-cell>
						<cds-table-header-cell>precioPublico</cds-table-header-cell>
						<cds-table-header-cell>precioMayorista</cds-table-header-cell>
						<cds-table-header-cell>precioFF</cds-table-header-cell>
						<cds-table-header-cell>sku</cds-table-header-cell>
						<cds-table-header-cell>marca</cds-table-header-cell>
						<cds-table-header-cell>codigoDeBarras</cds-table-header-cell>
						<cds-table-header-cell>fabricacionLote</cds-table-header-cell>
						<cds-table-header-cell>caducidadLote</cds-table-header-cell>
						<cds-table-header-cell>lote</cds-table-header-cell>
						<cds-table-header-cell>recetaMedica</cds-table-header-cell>
						<cds-table-header-cell>impuestos</cds-table-header-cell>
						<cds-table-header-cell>catalogoEnLinea</cds-table-header-cell>
						<cds-table-header-cell>claveSAT</cds-table-header-cell>
						<cds-table-header-cell>iva</cds-table-header-cell>
						<cds-table-header-cell>ieps</cds-table-header-cell>
						<cds-table-header-cell>identificador</cds-table-header-cell>
						<cds-table-header-cell>unidad</cds-table-header-cell>
						<cds-table-header-cell>variantes</cds-table-header-cell>
					</cds-table-header-row>
				</cds-table-head>
				<cds-table-body>
					${repeat(
						this?.productos?.length ? this.productos : [],
						(singleProduct) => html`
							<cds-table-row>
								<cds-table-cell>${singleProduct.id}</cds-table-cell>
								<cds-table-cell>${singleProduct.nombre}</cds-table-cell>
								<cds-table-cell>${singleProduct.descripcion}</cds-table-cell>
								<cds-table-cell>${singleProduct.categoria}</cds-table-cell>
								<cds-table-cell>${singleProduct.subcategoria}</cds-table-cell>
								<cds-table-cell>${singleProduct.stockActual}</cds-table-cell>
								<cds-table-cell>${singleProduct.stockMinimo}</cds-table-cell>
								<cds-table-cell>${singleProduct.costo}</cds-table-cell>
								<cds-table-cell>${singleProduct.precioPublico}</cds-table-cell>
								<cds-table-cell>${singleProduct.precioMayorista}</cds-table-cell>
								<cds-table-cell>${singleProduct.precioFF}</cds-table-cell>
								<cds-table-cell>${singleProduct.sku}</cds-table-cell>
								<cds-table-cell>${singleProduct.marca}</cds-table-cell>
								<cds-table-cell>${singleProduct.codigoDeBarras}</cds-table-cell>
								<cds-table-cell>${singleProduct.fabricacionLote}</cds-table-cell>
								<cds-table-cell>${singleProduct.caducidadLote}</cds-table-cell>
								<cds-table-cell>${singleProduct.lote}</cds-table-cell>
								<cds-table-cell>${singleProduct.recetaMedica}</cds-table-cell>
								<cds-table-cell>${singleProduct.impuestos}</cds-table-cell>
								<cds-table-cell>${singleProduct.catalogoEnLinea}</cds-table-cell>
								<cds-table-cell>${singleProduct.claveSAT}</cds-table-cell>
								<cds-table-cell>${singleProduct.iva}</cds-table-cell>
								<cds-table-cell>${singleProduct.ieps}</cds-table-cell>
								<cds-table-cell>${singleProduct.identificador}</cds-table-cell>
								<cds-table-cell>${singleProduct.unidad}</cds-table-cell>
								<cds-table-cell>${singleProduct.variantes}</cds-table-cell>
								<cds-table-cell class="cds--table-column-menu">
									<cds-btn target="_blank" href=${singleProduct?.imagen || ""} kind="tertiary" size="sm">${Attachment16({ slot: "icon" })}</cds-btn>
								</cds-table-cell>
								<cds-table-cell class="cds--table-column-menu">${this.updateImage(singleProduct)}</cds-table-cell>
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

	openResendEmail(registro: RegistrationDetails){
		console.log('open resend dialog')
		this.dispatchEvent(new CustomEvent("open-resend-confirmation", { detail: registro, bubbles: true, composed: true }))
	}

	updateImage(singleProduct : Producto){

	}
}
