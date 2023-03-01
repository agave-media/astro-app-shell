import { html, css, LitElement, PropertyValueMap, nothing } from "lit";
import { property } from "lit/decorators/property.js";
import { customElement } from "lit/decorators.js";
import { queryDocs } from "@db/clients/firebase";
import { query } from "lit/decorators/query.js";
import "@carbon/web-components/es/components/link/index.js";
import type { RegistrationDetails as Registration } from "@state/machines/registration";
import "@carbon/web-components/es/components/notification/index.js";
import "@material/web/textfield/outlined-text-field";
import "@material/web/button/filled-button";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import type { MdOutlinedTextField } from "@material/web/textfield/outlined-text-field";

@customElement("registration-checker")
export class RegistrationChecker extends LitElement {
	@property({ type: String })
	status: string = "";

	@property({ type: Object })
	registrationDetails: Registration;

	@property({ type: Object })
	searchResults: Registration[];

    @query("form")
    searchForm: HTMLFormElement

    @query("sl-button")
    submitButton: HTMLButtonElement

	static override styles = css`
		:host {
			display: flex;
			flex-direction: column;
			gap: 24px;

			width: 100%;
		}

		h4,
		p {
			margin: 0;
		}

		h4 {
			text-transform: uppercase;
			letter-spacing: 0.8px;
			font-size: 12px;
			font-style: italic;

			display: flex;
			flex-direction: column;
			color: var(--md-sys-color-on-primary-container);
		}

		p {
			letter-spacing: 0.5px;
			font-weight: 400;
			text-transform: none;
			font-size: 17px;
			color: var(--md-sys-color-on-surface);
			font-style: normal;
		}

		bx-link {
			font-style: normal;
			text-transform: none;
		}

		form {
           display: flex;
            flex-direction: column;
            gap: 24px;
    
            width: 100%;
		}

		bx-inline-notification {
			min-width: 100%;
			margin: 0;
		}

        .btns {
            align-self: flex-end;
        }

		[hidden] {
			display: none;
		}
	`;

	protected override render() {
		return html`
			<form @submit=${this.handleSubmit}>
				<md-outlined-text-field required class="input" type="email" name="searchQuery" label="Buscar correo electronico"></md-outlined-text-field>

				<div class="btns light-theme">
					<sl-button hidden type="submit">Buscar registro</sl-button>
					<md-filled-button @click=${() => this.submitButton.click()} id="submitButton" type="submit" label="Buscar registro"></md-filled-button>
				</div>
			</form>

			${this.searchResults && this.searchResults.length === 0 ? html` <bx-inline-notification hide-close-button kind="error" .title=${"No se encontro correo"} subtitle="Lo sentimos, no se encontró un registro con esa dirección de correo electrónico. Por favor, verifica que la dirección sea correcta."></bx-inline-notification> ` : nothing}
		`;
	}

	protected override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		const inputs = this.shadowRoot?.querySelectorAll("md-outlined-text-field") as NodeListOf<MdOutlinedTextField>;
		inputs.forEach(async (input) => {
			input.setCustomValidity("Campo requerido.");
			this.runningValidation(input);
		});
	}
    
    handleSubmit(event: Event) {
        event.preventDefault();
    
        let isFormValid = this.searchForm.reportValidity();
        console.log("isFormValid:", isFormValid);
        if (isFormValid) {
            console.log("SUBMIT success:", event);
            this.handleSearch();
        } else {
            console.log("SUBMIT error:", event);
        }
    }

	async handleSearch() {
        // Get form data
		const formData = new FormData(this.searchForm);
		const data = Object.fromEntries(formData.entries());
		console.log("data:", data);

        if (data) {
            const queryResults = (await queryDocs("registrations", data.searchQuery as string));
            console.log("registration details:", queryResults);
            this.searchResults = queryResults

            if (queryResults.length && queryResults?.[0]?.id) {
                window.location.replace(`/confirmacion/${queryResults[0].id}`)
            }
        }
	}

    // Ensures errors are cleared when input is valid.
	runningValidation(input: MdOutlinedTextField) {
		input.addEventListener("input", () => {
			this.validateInput(input);
		});
	};

	validateInput(input: MdOutlinedTextField) {
		const isInputValid = input.checkValidity();
		if (!isInputValid) {
			if (input.value === "") {
				input.setCustomValidity("Campo requerido.");
			} else if (input.validity.typeMismatch || input.validity.badInput) {
				input.setCustomValidity("Por favor ingresa un valor válido.");
			} else if (input.validity.tooShort) {
				input.setCustomValidity("Requiere un mínimo de 6 caracteres");
			} else if (input.validity.valid || input.validity.valueMissing) {
				input.setCustomValidity("Campo requerido.");
			} else {
				input.setCustomValidity("");
			}

			// Report to update input error message.
			input.reportValidity();
		}
	}
}
