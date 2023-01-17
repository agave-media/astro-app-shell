import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import { property } from "lit/decorators/property.js";
import "../app-drawer/drawer-component";
import "@material/web/list/list";
import "@material/web/list/list-item";
import "@material/web/list/list-divider";
import "@material/web/list/list-item-icon";
import "@material/web/iconbutton/standard-icon-button";
import "@material/web/navigationtab/navigation-tab";
import "@material/web/icon/icon";

declare global {
	interface HTMLElementTagNameMap {
		"app-drawer": AppDrawer;
	}
}

@customElement("app-drawer")
export class AppDrawer extends LitElement {
	@property({ type: Boolean })
	_open: boolean;

	@property({ type: String })
	logo: string;

	@property({ type: Boolean, reflect: true })
	wideview: boolean;

	static override styles = css`
		:host {
			display: block;
		}
		.narrow-drawer-content,
		.drawer-content {
			overflow: hidden;
			background-color: var(--md-surface-2);
		}
		.narrow-drawer-content,
		.drawer-content,
		.nav-elements {
			padding: 0;
			display: flex;
			flex-direction: column;
			height: 100%;
		}
		:host(:not([wideview])) drawer-component {
			margin-top: 0;
		}
		md-list {
			--md-list-container-color: var(--md-surface-2);
			--md-list-list-item-container-color: var(--md-surface-2);
			--md-list-list-item-label-text-color: var(--md-sys-color-on-surface);
		}
		md-list-item[active] {
			--md-list-list-item-container-color: var(--md-sys-color-secondary-container);
		}
		md-list-item-icon {
			display: flex;
		}
		.header-title {
			font-size: 16px;
			margin: 0;
			color: var(--md-sys-color-on-surface);

			letter-spacing: 0.5px;
			font-weight: 600;

			display: flex;
			align-items: center;
			white-space: nowrap;
            visibility: hidden;
		}
		.dialog-header {
			padding: 0 16px;
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			box-sizing: border-box;
			align-items: center;
		}
		.narrow-dialog-header {
			margin: 8px 0px 8px;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		md-navigation-tab {
			width: 80px;
		}
		.logo-container {
			display: flex;
			height: 64px;
			margin-right: 4px;
			mix-blend-mode: multiply;
		}
	`;

	protected override render() {
		return html`
			<drawer-component
				@open-changed="${(e: CustomEvent) => {
					if (this._open !== e.detail) this._open = e.detail;
				}}"
				.type="${this.wideview ? "persistent" : "modal"}">
				<div id="drawerContent" class="drawer-content">
					<div class="dialog-header">
						<md-standard-icon-button @click=${this.close} icon="menu"></md-standard-icon-button>

						<h2 class="header-title">
							<div
								@click=${() => {
									if (window.location.pathname !== "/") window.location.href = "/";
								}}
								class="logo-container">
								<img src=${this.logo} alt="Tlaloc Ride Tuned logo" />
							</div>
						</h2>
					</div>
					<div class="nav-elements">
						<md-list>
							<md-list-item
								?active=${window.location.pathname === "/"}
								@click=${() => {
									if (window.location.pathname !== "/") window.location.href = "/";
								}}
								headline="Inicio">
								<md-list-item-icon slot="start">home</md-list-item-icon>
							</md-list-item>

							<md-list-item
								?active=${window.location.pathname.includes("/eventos")}
								@click=${() => {
									if (window.location.pathname !== "/eventos") window.location.href = "/eventos";
								}}
								.headline=${"Eventos"}>
								<md-list-item-icon slot="start">directions_bike</md-list-item-icon>
							</md-list-item>

							<md-list-item
								?active=${window.location.pathname.includes("/tienda")}
								@click=${() => {
									if (window.location.pathname !== "/tienda") window.location.href = "/tienda";
								}}
								.headline=${"Tienda"}>
								<md-list-item-icon slot="start">storefront</md-list-item-icon>
							</md-list-item>
						</md-list>
					</div>
				</div>

				<div slot="narrow" class="narrow-drawer-content">
					<div class="narrow-dialog-header">
						<md-standard-icon-button @click=${this.show} icon="menu"></md-standard-icon-button>
					</div>
					<div class="nav-elements">
						<md-list>
							<md-navigation-tab
								@click=${() => {
									if (window.location.pathname !== "/") window.location.href = "/";
								}}
								?active=${window.location.pathname === "/"}
								.label=${"Inicio"}>
								<div slot="activeIcon">
									<md-icon>home</md-icon>
								</div>
								<div slot="inactiveIcon">
									<md-icon>home</md-icon>
								</div>
							</md-navigation-tab>
							<md-navigation-tab
								@click=${() => {
									if (window.location.pathname !== "/eventos") window.location.href = "/eventos";
								}}
								?active=${window.location.pathname.includes("/eventos")}
								.label=${"Eventos"}>
								<div slot="activeIcon">
									<md-icon>directions_bike</md-icon>
								</div>
								<div slot="inactiveIcon">
									<md-icon>directions_bike</md-icon>
								</div>
							</md-navigation-tab>
							<md-navigation-tab
								@click=${() => {
									if (window.location.pathname !== "/tienda") window.location.href = "/tienda";
								}}
								?active=${window.location.pathname.includes("/tienda")}
								.label=${"Tienda"}>
								<div slot="activeIcon">
									<md-icon>storefront</md-icon>
								</div>
								<div slot="inactiveIcon">
									<md-icon>storefront</md-icon>
								</div>
							</md-navigation-tab>
						</md-list>
					</div>
				</div>
			</drawer-component>
		`;
	}

	show() {
		let drawer = this.shadowRoot?.querySelector("drawer-component");
		if (drawer && !this._open) drawer.open = true;
	}

	close() {
		let drawer = this.shadowRoot?.querySelector("drawer-component");
		if (drawer && this._open) drawer.open = false;
	}

	toggle() {
		let drawer = this.shadowRoot?.querySelector("drawer-component");
		if (drawer) drawer.open = !drawer.open;
	}
}
