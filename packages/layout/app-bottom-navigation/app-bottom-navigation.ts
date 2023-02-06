import { css, html, LitElement, PropertyValueMap } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import "@material/web/navigationbar/navigation-bar";
import "@material/web/navigationtab/navigation-tab";
import "@material/web/icon/icon";
import { tlalocIcon } from "../tlaloc_icon";

declare global {
	interface HTMLElementTagNameMap {
		"app-bottom-navigation": AppBottomNavigation;
	}
}

@customElement("app-bottom-navigation")
export class AppBottomNavigation extends LitElement {
	static override styles = css`
		:host {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;

			box-sizing: border-box;
			display: flex;
			align-items: stretch;
			justify-content: space-between;
			width: 100%;
		}

		.container {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
		}

		md-navigation-tab {
			--md-navigation-bar-active-label-text-color: var(--md-ref-palette-tertiary60);
			--md-navigation-bar-active-hover-label-text-color: var(--md-ref-palette-tertiary60);
		}
	`;

	protected override render() {
		return html`
			<div class="container">
				<md-navigation-bar .activeIndex=${this._computeActiveIndex()}>
					<md-navigation-tab 
						@click=${() => {
							if (window.location.pathname !== "/") window.location.href = "/";
						}} 
						.label=${"Inicio"}>
							<div slot="activeIcon">
								<md-icon>directions_bike</md-icon>
							</div>
							<div slot="inactiveIcon">
								<md-icon>directions_bike</md-icon>
							</div>
					</md-navigation-tab>

					<md-navigation-tab 
						@click=${() => {
							if (window.location.pathname !== "/eventos") window.location.href = "/eventos";
						}} 
						.label=${"Eventos"}>
							<div slot="activeIcon">
								<md-icon>confirmation_number</md-icon>
							</div>
							<div slot="inactiveIcon">
								<md-icon>confirmation_number</md-icon>
							</div>
					</md-navigation-tab>

					<md-navigation-tab
						@click=${() => {
							if (window.location.pathname !== "/registro") window.location.href = "/registro";
						}}
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
						.label=${"Nosotros"}>
							<div slot="activeIcon">
								<md-icon>${tlalocIcon}</md-icon>
							</div>
							<div slot="inactiveIcon">
								<md-icon>${tlalocIcon}</md-icon>
							</div>
					</md-navigation-tab>
				</md-navigation-bar>
			</div>
		`;
	}

	protected override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		console.log('current location:', window.location.pathname)
	}

	_computeActiveIndex() {
		switch (window.location.pathname) {
			case "/":
				return 0;
			case "/eventos":
				return 1;
			case "/registro":
				return 2;
			case "/nosotros":
				return 3;
			default:
				return 0;
		}
	}
}
