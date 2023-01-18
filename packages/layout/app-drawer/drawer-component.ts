import { css, html, LitElement, PropertyValueMap } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import { property } from "lit/decorators/property.js";

declare global {
  interface HTMLElementTagNameMap {
    "drawer-component": DrawerComponent;
  }
}

@customElement("drawer-component")
export class DrawerComponent extends LitElement {
  @property({ type: Boolean, reflect: true })
  open: boolean;

  @property({ type: String, reflect: true })
  type: string;

  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      overflow: hidden;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    :host([type="modal"]) {
      z-index: 100;
      pointer-events: none;
    }
    .scrim {
      display: none;
    }
    :host([type="modal"]) .scrim {
      display: block;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;

      background-color: rgba(0, 0, 0, 0);
      will-change: background-color;
      transition: background-color 0.3s cubic-bezier(0, 0, 0.3, 1);
      z-index: 101;
    }
    .container {
      color: var(--drawer-color, #000000);
      background-color: var(--app-background-color);
      max-width: var(--drawer-max-width, 360px);

      box-shadow: var(--app-drawer-shadow);
      pointer-events: all;

      position: relative;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      margin-top: var(--drawer-margin-top);
      scrolling-behavior: auto;
      overflow-y: auto;
      overflow-x: hidden;
      align-self: flex-start;
    }
    :host([type="modal"]) .container {
      z-index: 102;
    }
    :host([type="modal"]) .container {
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
      transition: transform 300ms cubic-bezier(0.62, 0.28, 0.23, 0.99);
      will-change: transform;
      box-shadow: var(--app-drawer-shadow);
    }
    :host([rtl]) .container,
    :host([align="right"]) .container {
      align-self: flex-end;
      -webkit-transform: translateX(100%);
      transform: translateX(100%);
    }
    :host([open]) {
      pointer-events: auto;
    }
    :host([open][type="modal"]) .scrim {
      background-color: rgba(0, 0, 0, 0.55);
    }
    :host([open][type="modal"]) .container {
      -webkit-transform: none;
      transform: none;
      transition: transform 300ms cubic-bezier(0.62, 0.28, 0.23, 0.99);
    }
    :host([open][type="persistent"]) .container {
      -webkit-transform: none;
      transform: none;
      transition: transform 300ms cubic-bezier(0.62, 0.28, 0.23, 0.99);
    }
    .wide,
    .narrow {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transition: opacity 300ms cubic-bezier(0.62, 0.28, 0.23, 0.99);
      background-color: var(--app-background-color);
    }
    .narrow {
      /* opacity: 0; */
      display: none;
      width: 80px;
    }
    :host([type="persistent"]:not([open])) .wide {
      /* opacity: 0; */
      display: none;
    }
    :host([type="persistent"]:not([open])) .narrow {
      display: block;
      /* opacity: 1; */
    }
    :host([type="persistent"][open]) .wide {
      /* opacity: 1; */
      display: block;
    }
    :host([type="persistent"][open]) .narrow {
      /* opacity: 0; */
      display: none;
    }
    @media (max-width: 600px) {
      .title-container {
        min-height: 56px;
      }
    }
    @media (max-width: 600px) {
      .title-container {
        min-height: 56px;
      }
    }
  `;

  protected override render() {
    return html`
      <div id="container" class="container">
        <slot class="wide"></slot>
        <slot class="narrow" name="narrow"></slot>
      </div>
      <div @click="${this._onClick}" class="scrim"></div>
    `;
  }

  protected override updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    const openChanged = _changedProperties.has("open");
    if (openChanged) {
      this.dispatchEvent(
        new CustomEvent("open-changed", {
          detail: this.open,
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  _onClick(e : Event) {
    console.log("on drawer click:", e.target, e.target != this);
    if (this.type === "persistent") return;
    this.open = false;
  }
}
