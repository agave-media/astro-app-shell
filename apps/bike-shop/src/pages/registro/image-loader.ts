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
                <img src="https://firebasestorage.googleapis.com/v0/b/serial-mtb-texcoco.appspot.com/o/banners%2Fserial_banner.jpg?alt=media&token=26be61c9-9f3b-4119-93ff-1ad5cf7e626a" alt="serial banner">
            </div>
        `;
    }
}