import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';


@customElement('info-cards')
export class InfoCards extends LitElement {


    
    static override styles = css`
        :host {
            display: none;
        }
    
    `

    protected override render() {
        return html `

        <div class="container">
            this is a test
        </div>

        `
    }
        
    
    }