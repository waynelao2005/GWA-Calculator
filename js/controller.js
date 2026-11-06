import { state, GRADE_OPTIONS, addSubject, updateSubject, deleteSubject, getSubjectById, loadState, validateSubject, calculateGwa, calculateTotalUnits, getStanding } from "./model.js";
import FormView from "./views/FormView.js";
import SubjectListView from "./views/SubjectListView.js";
import SummaryView from "./views/SummaryView.js";

const formView = new FormView();
const subjectListView = new SubjectListView();
const summaryView = new SummaryView();

// Renders the list and summary after every model change so the screen always reflects the latest data.
function renderAll() {
  const subjects = state.subjects;
  const totalUnits = calculateTotalUnits(subjects);
  const gwa = calculateGwa(subjects);
  const standing = getStanding(gwa);

  subjectListView.render(subjects);
  summaryView.render({
    gwa,
    totalUnits,
    subjectCount: subjects.length,
    standing,
  });
}

// Handles a submitted form by validating, saving, and then re-rendering the views.
function controlSubmitSubject(data) {
  const rawSubject = {
    ...data,
    name: data.name,
    units: data.units,
    grade: data.grade,
  };

  const errors = validateSubject(rawSubject, state.subjects);

  if (errors.length > 0) {
    formView.renderError(errors[0]);
    return;
  }

  if (data.id) {
    const result = updateSubject(data.id, rawSubject);

    if (!result.success) {
      formView.renderError(result.errors[0]);
      return;
    }
  } else {
    const result = addSubject(rawSubject);

    if (!result.success) {
      formView.renderError(result.errors[0]);
      return;
    }
  }

  formView.resetForm();
  renderAll();
}

// Returns the form to add mode without changing the subject list.
function controlCancelEdit() {
  formView.resetForm();
}

// Loads the selected subject into the form so the user can update it.
function controlEditSubject(id) {
  const subject = getSubjectById(id);

  if (!subject) {
    return;
  }

  formView.fillForm(subject);
}

// Deletes a subject after confirmation and rerenders the list and summary.
function controlDeleteSubject(id) {
  const confirmed = window.confirm("Delete this subject?");

  if (!confirmed) {
    return;
  }

  deleteSubject(id);
  renderAll();
}

// Starts the app by restoring saved data, building the form, and attaching event handlers.
function init() {
  loadState();
  formView.render(GRADE_OPTIONS);
  formView.addHandlerSubmit(controlSubmitSubject);
  formView.addHandlerCancel(controlCancelEdit);
  subjectListView.addHandlerEdit(controlEditSubject);
  subjectListView.addHandlerDelete(controlDeleteSubject);
  renderAll();
}

init();
