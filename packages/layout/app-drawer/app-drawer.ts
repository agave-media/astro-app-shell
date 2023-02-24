import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import { property } from "lit/decorators/property.js";
import "./drawer-component";
import "@material/web/list/list";
import "@material/web/navigationtab/navigation-tab";
import "@material/web/icon/icon";
import "@material/web/iconbutton/outlined-icon-button-toggle";
import { tlalocIcon } from "../tlaloc_icon";
import type { MdOutlinedIconButtonToggle } from "@material/web/iconbutton/outlined-icon-button-toggle";

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

	@property({ type: String })
	colorScheme: string;

	@property({ type: Boolean, reflect: true })
	wideview: boolean;

	@property({ type: Boolean, reflect: true })
	railopen: boolean;

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
		.narrow-drawer-content .nav-elements {
			margin-top: 106px;
		}
		.narrow-drawer-content .nav-elements div {
			flex: 1;

			display: flex;
			align-items: center;
		}
		:host(:not([wideview])) drawer-component {
			margin-top: 0;
		}
		md-list {
			--md-list-container-color: var(--md-surface-2);
			--md-list-list-item-container-color: var(--md-surface-2);
			--md-list-list-item-label-text-color: var(--md-sys-color-on-surface);
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
		md-outlined-icon-button-toggle {
			align-self: center;
			margin-bottom: 16px;
		}
		md-navigation-tab {
			--md-navigation-bar-active-label-text-color: var(--md-ref-palette-tertiary60);
			--md-navigation-bar-active-hover-label-text-color: var(--md-ref-palette-tertiary60);
		}
	`;

	protected override render() {
		return html`
			<drawer-component
				@open-changed="${(e: CustomEvent) => {
					if (this._open !== e.detail) this._open = e.detail;
				}}"
				.type="${this.wideview ? (this.railopen ? "persistent" : "modal") : "modal"}">
				<div slot="narrow" class="narrow-drawer-content">
					<div class="nav-elements">
						<div>
							<md-list>
								<md-navigation-tab
									@click=${() => {
										if (window.location.pathname !== "/") window.location.href = "/";
									}}
									?active=${window.location.pathname === "/"}
									.label=${"Inicio"}>
									<div slot="activeIcon">
										<md-icon>directions_bike</md-icon>
									</div>
									<div slot="inactiveIcon">
										<md-icon>directions_bike</md-icon>
									</div>
								</md-navigation-tab>

								<!-- <md-navigation-tab
									@click=${() => {
										if (window.location.pathname !== "/eventos") window.location.href = "/eventos";
									}}
									?active=${window.location.pathname.includes("/eventos")}
									.label=${"Eventos"}>
									<div slot="activeIcon">
										<md-icon>confirmation_number</md-icon>
									</div>
									<div slot="inactiveIcon">
										<md-icon>confirmation_number</md-icon>
									</div>
								</md-navigation-tab> -->

								<md-navigation-tab
									@click=${() => {
										if (window.location.pathname !== "/registro") window.location.href = "/registro";
									}}
									?active=${window.location.pathname.includes("/registro")}
									.label=${"Registro"}>
									<div slot="activeIcon">
										<md-icon>badge</md-icon>
									</div>
									<div slot="inactiveIcon">
										<md-icon>badge</md-icon>
									</div>
								</md-navigation-tab>

								<md-navigation-tab
									@click=${() => {
										if (window.location.pathname !== "/nosotros") window.location.href = "/nosotros";
									}}
									?active=${window.location.pathname.includes("/nosotros")}
									.label=${"Nosotros"}>
									<div slot="activeIcon">
										<md-icon>${tlalocIcon}</md-icon>
									</div>
									<div slot="inactiveIcon">
										<md-icon>${tlalocIcon}</md-icon>
									</div>
								</md-navigation-tab>
							</md-list>
						</div>

						<!-- <md-outlined-icon-button-toggle .selected=${this.colorScheme === "dark"} @input=${this._darkModeToggle}>
                            <div>
                                <md-icon>dark_mode</md-icon>
                            </div>
							<div slot="selectedIcon">
								<md-icon>light_mode</md-icon>
							</div>
						</md-outlined-icon-button-toggle> -->
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

	toggleRail() {
		if (this.wideview) {
			this.railopen = !this.railopen;
		}
	}

	_darkModeToggle(e: CustomEvent) {
        const { selected } = e.target as MdOutlinedIconButtonToggle
        this.dispatchEvent(new CustomEvent("dark-mode-toggle", { detail: { selected }, bubbles: true, composed: true }));
	}
}
