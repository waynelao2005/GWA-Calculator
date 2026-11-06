import View from "./View.js";

// Builds and manages the add/edit form so the controller can stay focused on data changes.
export default class FormView extends View {
  _parentElement = document.querySelector(".subject-form");
  _errorMessage = "Please correct the highlighted values.";

  _generateMarkup() {
    const gradeOptions = this._data
      .map((option) => `<option value="${option}">${Number(option).toFixed(2)}</option>`)
      .join("");

    return `
      <div class="form-row">
        <label for="subject-name">Subject name</label>
        <input id="subject-name" name="name" type="text" maxlength="40" placeholder="e.g. Calculus 1" required />
      </div>

      <div class="form-grid">
        <div class="form-row">
          <label for="subject-units">Units</label>
          <input id="subject-units" name="units" type="number" min="1" max="6" step="1" placeholder="3" required />
        </div>

        <div class="form-row">
          <label for="subject-grade">Grade</label>
          <select id="subject-grade" name="grade">
            ${gradeOptions}
          </select>
        </div>
      </div>

      <p class="form-error" aria-live="polite"></p>

      <div class="form-actions">
        <button type="submit" class="primary-button">Add subject</button>
        <button type="button" class="secondary-button cancel-button" hidden>Cancel</button>
      </div>
    `;
  }

  // Keeps validation messages inside the form instead of wiping the entire form out.
  renderError(message = this._errorMessage) {
    const errorElement = this._parentElement.querySelector(".form-error");

    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  // Clears the validation note so the next submit starts with a fresh message area.
  clearError() {
    const errorElement = this._parentElement.querySelector(".form-error");

    if (errorElement) {
      errorElement.textContent = "";
    }
  }

  // Listens for submit events, reads the input values, and sends a plain object to the controller.
  addHandlerSubmit(handler) {
    this._parentElement.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput = this._parentElement.querySelector("#subject-name");
      const unitsInput = this._parentElement.querySelector("#subject-units");
      const gradeSelect = this._parentElement.querySelector("#subject-grade");
      const id = this._parentElement.dataset.editId || "";

      this.clearError();

      const data = {
        id,
        name: nameInput.value.trim(),
        units: Number(unitsInput.value),
        grade: Number(gradeSelect.value),
      };

      handler(data);
    });
  }

  // Wires the cancel button to leave edit mode without changing the subject list.
  addHandlerCancel(handler) {
    const cancelButton = this._parentElement.querySelector(".cancel-button");

    if (!cancelButton) {
      return;
    }

    cancelButton.addEventListener("click", () => {
      this.resetForm();
      handler();
    });
  }

  // Prefills the form when a user chooses to edit an existing subject.
  fillForm(subject) {
    const nameInput = this._parentElement.querySelector("#subject-name");
    const unitsInput = this._parentElement.querySelector("#subject-units");
    const gradeSelect = this._parentElement.querySelector("#subject-grade");
    const submitButton = this._parentElement.querySelector('button[type="submit"]');
    const cancelButton = this._parentElement.querySelector(".cancel-button");

    this.clearError();
    this._parentElement.dataset.editId = subject.id;
    nameInput.value = subject.name;
    unitsInput.value = subject.units;
    gradeSelect.value = String(subject.grade);
    submitButton.textContent = "Save changes";
    cancelButton.hidden = false;
  }

  // Returns the form to add-new mode and clears any validation message.
  resetForm() {
    this._parentElement.reset();
    this._parentElement.dataset.editId = "";

    const submitButton = this._parentElement.querySelector('button[type="submit"]');
    const cancelButton = this._parentElement.querySelector(".cancel-button");

    if (submitButton) {
      submitButton.textContent = "Add subject";
    }

    if (cancelButton) {
      cancelButton.hidden = true;
    }

    this.clearError();
  }
}
