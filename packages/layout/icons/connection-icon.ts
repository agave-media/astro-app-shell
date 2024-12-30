import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import { getAttributes, toSVG } from '@carbon/icon-helpers';
import icon from '@carbon/icons/es/connection--receive/20.js';

declare global {
    interface HTMLElementTagNameMap {
        "connection-icon": ConnectionIcon;
    }
}

@customElement("connection-icon")
export class ConnectionIcon extends LitElement {
    static override styles = css`
        :host {
            display: flex;
        }
    `;

    protected override render() {
        return html`${toSVG({
            ...icon,
            attrs: getAttributes(icon.attrs),
        })}`;
    }
}