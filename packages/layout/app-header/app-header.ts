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
			padding: 8px 16px 8px 16px;
			display: flex;
			align-items: center;
            justify-content: center;
			background-color: var(--md-surface-2);
			color: var(--md-sys-color-on-surface);
            width: 100%;
		}

		.logo-container {
			display: flex;
			height: 56px;
            border-radius: 12px;
		}

        img {
            height: 100%;
            width: auto;
        }

        :host([colorscheme="dark"]) .logo-container {
            background: var(--md-sys-color-inverse-surface);
        }

        :host([_wideview]) .container {
            margin-right: 80px;
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

				<div class="leading-container">
					<slot name="leading"></slot>
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
