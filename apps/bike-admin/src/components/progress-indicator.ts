import { html, css, LitElement, nothing } from "lit"
import { customElement, property, queryAssignedElements } from "lit/decorators.js"
import "@carbon/web-components/es/components/progress-indicator/index.js"

@customElement("progress-indicator")
export class ProgressIndicator extends LitElement {
	@property({ type: String })
	activeStep = "ubpp"

	@queryAssignedElements({ selector: ".content" })
	aciveSlot!: Array<HTMLElement>

	static override styles = css`
		:host {
			display: block;
		}

		bx-progress-step {
			flex-shrink: 0;
		}

		bx-progress-indicator {
			overflow-x: auto;
			padding-bottom: 2em;
		}
	`

	protected override render() {
		return html`
			<bx-progress-indicator @click=${this.onStepClick}>
				<bx-progress-step
					data-name="ubpp"
					.labelText=${"UBPP"}
					.secondaryLabelText=${"UBPP y delegado"}
				></bx-progress-step>
				<bx-progress-step
					data-name="tipo"
					.labelText=${"Tipo"}
					.secondaryLabelText=${"Tipo de registro"}
				></bx-progress-step>
				<bx-progress-step
					data-name="facturas"
					.labelText=${"Facturas"}
					.secondaryLabelText=${"Validar facturas"}
				></bx-progress-step>
				<bx-progress-step
					data-name="relacion"
					.labelText=${"Relacion"}
					.secondaryLabelText=${"Subir relacion"}
				></bx-progress-step>
			</bx-progress-indicator>

			${this.activeStep === "ubpp" ?     html`<slot @slotchange=${this.onSlotChange} name="ubpp"></slot>` : nothing}
			${this.activeStep === "tipo" ?     html`<slot @slotchange=${this.onSlotChange} name="tipo"></slot>` : nothing}
			${this.activeStep === "facturas" ? html`<slot @slotchange=${this.onSlotChange} name="facturas"></slot>` : nothing}
			${this.activeStep === "relacion" ? html`<slot @slotchange=${this.onSlotChange} name="relacion"></slot>` : nothing}
		`
	}

    private onSlotChange(e: Event) {
        let target = e.target as HTMLSlotElement
        let content = target.assignedElements()[0] as HTMLElement
        if (content && content.slot === 'tipo') {
            const curRadioTiles = content.querySelectorAll("bx-radio-tile")
            console.log('curRadioTiles:', curRadioTiles)
        }
    }

	onStepClick(e: PointerEvent) {
		let target = e.target as HTMLElement
		if (target.dataset.name) {
			this.activeStep = target.dataset.name
		}
	}
}
