import { css, html, LitElement, nothing, PropertyValueMap } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import { property } from "lit/decorators/property.js";
import { installMediaQueryWatcher } from "@util/helpers/media-query";
import "../app-drawer/app-drawer";
import "../app-header/app-header";
import "../app-bottom-navigation/app-bottom-navigation";
import "@material/web/fab/fab";
import { getInstance as getSettingsInstance } from "@state/machines/settings";

declare global {
	interface HTMLElementTagNameMap {
		"app-shell": AppShell;
	}
}

@customElement("app-shell")
export class AppShell extends LitElement {
	@property({ type: Boolean, reflect: true })
	_draweropen: boolean = false;

	@property({ type: Boolean, reflect: true })
	_wideview: boolean;

	@property({ type: String })
	logo: string;

    @property({ type: String })
	colorScheme: string;

	static override styles = css`
		:host {
			/* min-height: 100vh; */
			display: flex;
			flex-direction: column;
			align-items: stretch;
			justify-content: flex-start;
			overflow-x: hidden;
			overflow-y: auto;
		}

		app-header {
			z-index: 2;
		}

		.content {
			margin-top: 64px;

			display: flex;
			flex: 1;

            margin-bottom: 80px;
		}

		div.main-content {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			align-self: stretch;
			box-sizing: border-box;
			overflow-x: hidden;

			z-index: 1;
			transition: transform 300ms cubic-bezier(0.62, 0.28, 0.23, 0.99);
			will-change: transform;
		}

		div.main-content[persistent] {
			margin-right: 80px;
			-webkit-transform: translateX(80px);
			transform: translateX(80px);
		}

		:host([_draweropen]) div.main-content[persistent] {
			margin-right: 280px;
			-webkit-transform: translateX(280px);
			transform: translateX(280px);
		}

        :host([_wideview]) .content {
            margin-bottom: 0;
        }

        md-fab {
            position: fixed;
            bottom: 96px;
            right: 16px;
            z-index: 3;
            display: none;
        }

        :host(:not([_wideview])) md-fab {
            display: block;
        }
	`;

	protected override render() {
		return html`
			<app-drawer .colorScheme=${this.colorScheme} .logo=${this.logo} .wideview=${this._wideview} @open-changed=${this._drawerOpenChanged}></app-drawer>

			<div class="main-content" ?persistent=${this._wideview}>
				<app-header @open-drawer=${this.toggleDrawer} .logo=${this.logo} class="toolbar-top" id="header" title="Tlaloc Ride Tuned"></app-header>

				<div class="content">
					<slot></slot>
				</div>

                ${this._wideview ? nothing : html`<app-bottom-navigation></app-bottom-navigation>`}
			</div>

            <md-fab @click=${this._dipatchSetColorSchemeEvent} .icon=${this.colorScheme === "light" ? "dark_mode" : "light_mode"}></md-fab>
		`;
	}

	protected override async firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): Promise<void> {
		installMediaQueryWatcher(`(min-width: 768px)`, (matches) => this._layoutChanged(matches));

        const settings = getSettingsInstance();
		settings.onTransition((state) => {
			const { colorScheme } = state.context;
			if (colorScheme) this.colorScheme = colorScheme;
		});
	}

	_layoutChanged(isWideLayout: boolean) {
		console.log("layout changed:", isWideLayout);
		this._wideview = isWideLayout;

		if (!isWideLayout) this._closeDrawer();
	}

	_closeDrawer() {
		const drawer = this.shadowRoot?.querySelector("app-drawer");
		if (drawer) drawer.close();
	}

	toggleDrawer() {
		console.log("toggle drawer action...");
		const drawer = this.shadowRoot?.querySelector("app-drawer");
		if (drawer) drawer.toggle();
	}

	_drawerOpenChanged(e: CustomEvent) {
		console.log("drawer open changed event:", e.detail);
		this._draweropen = e.detail;
	}

    _dipatchSetColorSchemeEvent(e : CustomEvent) {
        const activateDarkMode = this.colorScheme === "light"; 
        this.dispatchEvent(new CustomEvent('dark-mode-toggle', {detail: {selected: activateDarkMode}, bubbles: true, composed: true}))
    }
}
