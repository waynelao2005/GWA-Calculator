import View from "./View.js";

// Builds each subject row from the current list so the user can edit or remove entries without touching the model.
export default class SubjectListView extends View {
  _parentElement = document.querySelector(".subject-list");
  _errorMessage = "No subjects yet. Add your first one above.";

  _generateMarkup() {
    return this._data
      .map(
        (subject) => `
          <li class="subject-item" data-id="${subject.id}">
            <div class="subject-info">
              <span class="subject-name">${this._escape(subject.name)}</span>
              <span class="subject-meta">${subject.units} units · Grade ${Number(subject.grade).toFixed(2)}</span>
            </div>
            <div class="subject-actions">
              <button type="button" class="table-button edit-button" data-id="${subject.id}">Edit</button>
              <button type="button" class="table-button delete-button" data-id="${subject.id}">Delete</button>
            </div>
          </li>
        `,
      )
      .join("");
  }

  // Escapes a subject name before it is inserted into HTML so special characters stay readable and safe.
  _escape(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Delegates clicks from the list to the controller without attaching one listener per row.
  addHandlerEdit(handler) {
    this._parentElement.addEventListener("click", (event) => {
      const button = event.target.closest(".edit-button");

      if (!button) {
        return;
      }

      const { id } = button.dataset;
      handler(id);
    });
  }

  // Delegates delete clicks to the controller and keeps the list logic in one place.
  addHandlerDelete(handler) {
    this._parentElement.addEventListener("click", (event) => {
      const button = event.target.closest(".delete-button");

      if (!button) {
        return;
      }

      const { id } = button.dataset;
      handler(id);
    });
  }
}
