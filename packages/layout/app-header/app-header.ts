import { css, html, LitElement, PropertyValueMap } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import { property } from "lit/decorators/property.js";
import { getInstance as getSettingsInstance } from "@state/machines/settings";
import { installMediaQueryWatcher } from "@util/helpers/media-query";

declare global {
	interface HTMLElementTagNameMap {
		"app-header": AppHeader;
	}
}

@customElement("app-header")
export class AppHeader extends LitElement {
	@property({ type: String })
	logo: string;

	@property({ type: String, reflect: true })
	colorScheme: string;

	@property({ type: Boolean, reflect: true })
	_wideview: boolean;

	static override styles = css`
		:host {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;

			height: 64px;
			box-sizing: border-box;
			display: flex;
		}

		.container {
			padding: 8px 16px;
			background-color: var(--md-surface-2);
			color: var(--md-sys-color-on-surface);
			width: 100%;
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			align-items: center;
		}

		.trailing-container {
			display: flex;
			justify-content: flex-end;
			align-items: center;
		}

		.logo-container {
			display: flex;
			height: 48px;
			justify-self: center;
			cursor: pointer;
			align-items: center;
			border-radius: 12px;
		}

		img {
			border-radius: 12px;
			padding: 4px;
			height: 100%;
			width: auto;
		}

		:host([colorscheme="dark"]) .logo-container img {
			background: var(--md-sys-color-inverse-surface);
		}

		.logo-container img:hover,
		:host([colorscheme="dark"]) .logo-container img:hover {
			background: var(--md-sys-color-secondary-container-light);
		}
	`;

	protected override render() {
		return html`
			<div class="container">
				<div class="icon-container">
					<slot name="icon"></slot>
				</div>

				<div
					@click=${() => {
						if (window.location.pathname !== "/") window.location.href = "/";
					}}
					class="logo-container">
					<img src=${this.logo} alt="Tlaloc Ride Tuned logo" />
				</div>

				<div class="trailing-container">
					<slot name="trailing"></slot>
				</div>
			</div>
		`;
	}

	protected override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		const settings = getSettingsInstance();
		settings.onTransition((state) => {
			const { colorScheme } = state.context;
			console.log("header colorScheme:", colorScheme);

			if (colorScheme) this.colorScheme = colorScheme;
		});

		installMediaQueryWatcher(`(min-width: 768px)`, (matches) => this._layoutChanged(matches));
	}

	_layoutChanged(matches: boolean) {
		console.log("layout changed", matches);
		this._wideview = matches;
	}
}
