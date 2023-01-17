import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import { property } from "lit/decorators/property.js";

declare global {
	interface HTMLElementTagNameMap {
		"app-header": AppHeader;
	}
}

@customElement("app-header")
export class AppHeader extends LitElement {
	@property({ type: String })
	logo: string;

	static override styles = css`
		:host {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;

			height: 64px;
			box-sizing: border-box;
			display: flex;
			align-items: stretch;
			justify-content: space-between;
			width: 100%;
		}

		.container {
			padding: 8px 24px;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			background-color: var(--md-surface-2);
			color: var(--md-sys-color-on-surface);
			width: 100%;
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
			<div class="container">
				<div class="icon-container">
					<slot name="icon"></slot>
				</div>

				<h2 class="header-title">
					<div
						@click=${() => {
							if (window.location.pathname !== "/") window.location.href = "/";
						}}
						class="logo-container">
						<img src=${this.logo} alt="Tlaloc Ride Tuned logo" />
					</div>
				</h2>

				<div class="leading-container">
					<slot name="leading"></slot>
				</div>

				<!-- Add dropdown menu -->
				<div class="trailing-container">
					<slot name="trailing"></slot>
				</div>
			</div>
		`;
	}
}
