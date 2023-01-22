import { css, html, LitElement } from "lit";
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
	`;

	protected override render() {
		return html`
			<div class="container">
				<md-navigation-bar>
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
					<md-navigation-tab
						@click=${() => {
							if (window.location.pathname !== "/registro") window.location.href = "/registro";
						}}
						?active=${window.location.pathname.includes("/registro")}
						.label=${"Registro"}>
						<div slot="activeIcon">
							<md-icon>confirmation_number</md-icon>
						</div>
						<div slot="inactiveIcon">
							<md-icon>confirmation_number</md-icon>
						</div>
					</md-navigation-tab>
				</md-navigation-bar>
			</div>
		`;
	}
}
