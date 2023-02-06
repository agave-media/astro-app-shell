import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators.js';

@customElement('image-loader')
export class ImageLoader extends LitElement {
    @property({ type: String })
    href: string = '';

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
                <img src=${this.href} alt="serial banner">
            </div>
        `;
    }
}