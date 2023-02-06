import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('image-loader')
export class ImageLoader extends LitElement {
    static override styles = css`
        :host {
            display: block;
        }

        .banner {
            display: flex;
        }

        img {
            width: 100%;
        }
    `

    protected override render() {
        return html`
            <div class="banner">
                <img src="https://firebasestorage.googleapis.com/v0/b/serial-mtb-texcoco.appspot.com/o/banners%2F2cumbres_long_banner.jpg?alt=media&token=68d73a5e-f976-43be-83c3-4a6ff47bd64bs" alt="serial banner">
            </div>
        `;
    }
}