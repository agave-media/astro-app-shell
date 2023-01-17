import { css, html, LitElement, PropertyValueMap } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import { property } from "lit/decorators/property.js";
import { installMediaQueryWatcher } from "@util/helpers/media-query";
import "../app-drawer/app-drawer";
import "../app-header/app-header";

declare global {
  interface HTMLElementTagNameMap {
    "app-shell": AppShell;
  }
}

@customElement("app-shell")
export class AppShell extends LitElement {
  @property({ type: Boolean, reflect: true })
  _draweropen: boolean = false;

  @property({ type: Boolean, reflect: true })
  _wideview: boolean;

  @property({ type: String })
  logo: string;

  static override styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;
      overflow-x: hidden;
      overflow-y: auto;
    }

    app-header {
      z-index: 2;
    } 

    .content {
      margin-top: 64px;

      display: flex;
      flex: 1;
    }

    div.main-content {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      align-self: stretch;
      box-sizing: border-box;
      overflow-x: hidden;

      z-index: 1;
      transition: transform 300ms cubic-bezier(0.62, 0.28, 0.23, 0.99);
      will-change: transform;
    }

    div.main-content[persistent] {
      margin-right: 80px;
      -webkit-transform: translateX(80px);
      transform: translateX(80px);
    }

    :host([_draweropen]) div.main-content[persistent] {
      margin-right: 360px;
      -webkit-transform: translateX(360px);
      transform: translateX(360px);
    }
  `;

  protected override render() {
    return html`
      <app-drawer
        .logo=${this.logo}
        .wideview=${this._wideview}
        @open-changed=${this._drawerOpenChanged}
      ></app-drawer>

      <div class="main-content" ?persistent=${this._wideview}>
        <app-header
          @open-drawer=${this.toggleDrawer}
          .logo=${this.logo}
          class="toolbar-top"
          id="header"
          title="Bike Shop"
        ></app-header>

        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }

  protected override async firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): Promise<void> {
    installMediaQueryWatcher(`(min-width: 768px)`, (matches) => this._layoutChanged(matches));
  }

  _layoutChanged(isWideLayout : boolean) {
    console.log("layout changed:", isWideLayout);
    this._wideview = isWideLayout;

    if (!isWideLayout) this._closeDrawer();
  }

  _closeDrawer() {
    const drawer = this.shadowRoot?.querySelector("app-drawer");
    if (drawer) drawer.close();
  }

  toggleDrawer() {
    console.log("toggle drawer action...");
    const drawer = this.shadowRoot?.querySelector("app-drawer");
    if (drawer) drawer.toggle();
  }

  _drawerOpenChanged(e : CustomEvent) {
    console.log("drawer open changed event:", e.detail);
    this._draweropen = e.detail;
  }
}