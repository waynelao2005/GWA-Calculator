import View from "./View.js";

// Displays the current totals and standing so students can judge their progress at a glance.
export default class SummaryView extends View {
  _parentElement = document.querySelector(".summary");
  _errorMessage = "No subjects yet.";

  _generateMarkup() {
    const { gwa, totalUnits, subjectCount, standing } = this._data;

    const gwaText = subjectCount === 0 ? "—" : Number(gwa).toFixed(2);

    return `
      <div class="summary-row">
        <span class="summary-label">GWA</span>
        <span class="summary-value">${gwaText}</span>
      </div>

      <div class="summary-row">
        <span class="summary-label">Total units</span>
        <span class="summary-value small">${totalUnits}</span>
      </div>

      <div class="summary-row">
        <span class="summary-label">Subjects</span>==
        <span class="summary-value small">${subjectCount}</span>
      </div>

      <div class="summary-row">
        <span class="summary-label">Standing</span>
        <span class="summary-value small">${standing}</span>
      </div>
    `;
  }
}
