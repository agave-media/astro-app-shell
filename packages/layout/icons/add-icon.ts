import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import { getAttributes, toSVG } from '@carbon/icon-helpers';
import addIcon from '@carbon/icons/es/add/20.js';

declare global {
    interface HTMLElementTagNameMap {
        "add-icon": AddIcon;
    }
}

@customElement("add-icon")
export class AddIcon extends LitElement {
    static override styles = css`
        :host {
            display: flex;
        }
    `;

    protected override render() {
        return html`${toSVG({
            ...addIcon,
            attrs: getAttributes(addIcon.attrs),
        })}`;
    }
}