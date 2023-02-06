import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import { property } from "lit/decorators/property.js";
import "@material/web/icon/icon";
import "@shoelace-style/shoelace/dist/components/card/card.js";

@customElement("contact-section")
export class ContactSection extends LitElement {
	@property({ type: String })
	email: string;

	@property({ type: String })
	phoneNumber: string;

	@property({ type: Object })
	map: any;

	static override styles = css`
		:host {
			display: block;
			color: var(--md-sys-color-on-surface);
		}
		
		h1,
		p {
			margin: 0;
		}
		
		/* h1 {
			color: var(--md-sys-color-primary);
		}
		
		p {
			color: var(--md-sys-color-on-surface);
		} */

		.wrapper {
			display: grid;
			grid-template-columns: 1fr 1.5fr;

			gap: 30px;
		}

		.text-info p {
			margin-top: 10px;
		}

		#map {
			height: 400px;
		}

		.contact-info {
			margin-top: 20px;
		}

		.contact-info > *:not(:first-child) {
			margin-top: 20px;
		}

		.contact-links {
			display: flex;
			align-items: center;

			text-decoration: none;
		}
		
		.contact-links:hover p {
			text-decoration: underline;
		}

		md-icon {
			color: var(--md-sys-color-primary);
		}
		
		.contact-links p {
			margin-left: 5px;
			color: var(--md-sys-color-on-surface);
		}

		.right {
			border-radius: 16px;
		}

		iframe {
			border-radius: 16px;
			height: 100%;
			width: 100%;
		}

		sl-card {
			height: 100%;
			width: 100%;
			--padding: 0;
			--border-radius: 16px;
		}

		@media (max-width: 800px) {
			.wrapper {
				display: flex;
				flex-direction: column;

				gap: 0;

				text-align: center;
			}

			.wrapper > *:not(:first-child) {
				margin-top: 20px;
			}

			.contact-links {
				justify-content: center;
			}

			#map {
				height: 300px;
			}
		}
	`;

	protected override render() {
		return html`
			<section class="wrapper">
				<div class="left">
					<div class="text-info">
						<h1>Como llegar</h1>
						<p>Lugar sede, Cabañas "Tlalocamp", Monte Tláloc, Estado de México</p>
					</div>
					<div class="contact-info">
						<a class="contact-links" target="_blank" href=${`mailto: ${this?.email}`} rel="noreferrer">
							<md-icon>mail</md-icon>
							<p>${this?.email}</p>
						</a>

						<a class="contact-links" target="_blank" href=${`tel:+52: ${this?.phoneNumber}`} rel="noreferrer">
							<md-icon>call</md-icon>
							<p>${this?.phoneNumber}</p>
						</a>
					</div>
				</div>
				<div class="right">
					<sl-card>
						<iframe id="map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3762.217949011207!2d-98.7572493!3d19.4461678!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1c37effe33393c43!2s76F3C6WV%2BCQ8!5e0!3m2!1sen!2smx!4v1674629624890!5m2!1sen!2smx" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
					</sl-card>
				</div>
			</section>
		`;
	}
}
