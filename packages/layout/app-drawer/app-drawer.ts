import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import { property } from "lit/decorators/property.js";
import "./drawer-component";
import "@material/web/list/list";
import "@material/web/list/list-item";
import "@material/web/list/list-divider";
import "@material/web/list/list-item-icon";
import "@material/web/navigationtab/navigation-tab";
import "@material/web/icon/icon";
import "@material/web/iconbutton/outlined-icon-button-toggle";
import { tlalocIcon } from '../tlaloc_icon';

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
            margin-top: 64px;
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
		md-list-item[data-active] {
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
			mix-blend-mode: multiply;
		}
		.logo-icon {
			mix-blend-mode: multiply;
		}
        md-outlined-icon-button-toggle {
            align-self: center;
            margin-bottom: 16px;
        }
	`;

	protected override render() {
		return html`
			<drawer-component
				@open-changed="${(e: CustomEvent) => {
					if (this._open !== e.detail) this._open = e.detail;
				}}"
				.type="${this.wideview ? "persistent" : "modal"}">
                <!-- Causes weird overlay bug when transitioning. Since it isn't used, temp. remove it. -->
				<!-- <div id="drawerContent" class="drawer-content">
					<div class="dialog-header">
						<md-standard-icon-button @click=${this.close}>${tlalocIcon}</md-standard-icon-button>

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
								?data-active=${window.location.pathname === "/"}
								@click=${() => {
									if (window.location.pathname !== "/") window.location.href = "/";
								}}
								headline="Inicio">
								<md-list-item-icon slot="start">${tlalocIcon}</md-list-item-icon>
							</md-list-item>

							<md-list-item ?data-active=${window.location.pathname.includes("/eventos")} .headline=${"Eventos"}>
								<md-list-item-icon slot="start">directions_bike</md-list-item-icon>
							</md-list-item>

							<md-list-item ?data-active=${window.location.pathname.includes("/tienda")} .headline=${"Tienda"}>
								<md-list-item-icon slot="start">storefront</md-list-item-icon>
							</md-list-item>
						</md-list>
					</div>
				</div> -->

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
                                        <md-icon>${tlalocIcon}</md-icon>
                                    </div>
                                    <div slot="inactiveIcon">
                                        <md-icon>${tlalocIcon}</md-icon>
                                    </div>
                                </md-navigation-tab>
                                <md-navigation-tab ?active=${window.location.pathname.includes("/eventos")} .label=${"Eventos"}>
                                    <div slot="activeIcon">
                                        <md-icon>directions_bike</md-icon>
                                    </div>
                                    <div slot="inactiveIcon">
                                        <md-icon>directions_bike</md-icon>
                                    </div>
                                </md-navigation-tab>
                                <md-navigation-tab ?active=${window.location.pathname.includes("/tienda")} .label=${"Tienda"}>
                                    <div slot="activeIcon">
                                        <md-icon>storefront</md-icon>
                                    </div>
                                    <div slot="inactiveIcon">
                                        <md-icon>storefront</md-icon>
                                    </div>
                                </md-navigation-tab>
                            </md-list>
                        </div>

                        <md-outlined-icon-button-toggle .selected=${this.colorScheme === "dark"} @icon-button-toggle-change=${this._darkModeToggle} onIcon="light_mode" offIcon="dark_mode"></md-outlined-icon-button-toggle>
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

    _darkModeToggle(e : CustomEvent) {
        this.dispatchEvent(new CustomEvent('dark-mode-toggle', {detail: {selected: e.detail.selected}, bubbles: true, composed: true}))
    }
}
