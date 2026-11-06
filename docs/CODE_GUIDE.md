# GWA Calculator Code Guide

## model.js
### Job
This file holds the app data and all the rules for validation, calculation, and storage.

### Functions
- `state` - Stores the subject list in one shared object that the controller and views read from.
- `persist()` - Saves the current list to localStorage after every change so the browser keeps the newest data.
- `validateSubject(data, subjects = state.subjects)` - Checks the subject name, units, grade, and duplicate names before a change is accepted.
- `addSubject(data)` - Adds a new subject only after validation and saves the result.
- `updateSubject(id, data)` - Replaces one subject with the edited values while keeping the same ID.
- `deleteSubject(id)` - Removes one subject from the model and persists the updated array.
- `getSubjectById(id)` - Finds one subject by ID so the edit form can be filled.
- `loadState()` - Reads saved data from localStorage and falls back to an empty list if data is lost or broken.
- `calculateGwa(subjects)` - Finds the weighted grade average using the grade times units formula.
- `calculateTotalUnits(subjects)` - Sums the units from all subjects to show the workload.
- `getStanding(gwa)` - Uses the honor ranges to label the student's standing.

### Questions and short answers
1. Why is the data stored in `state` instead of in the views? Because the model is the single source of truth and all updates pass through it.
2. What happens if localStorage is broken? `loadState()` catches the error and resets the app to an empty subject list.
3. Why are duplicate names rejected? The app needs one subject record per course name to avoid accidental double counting.

## View.js
### Job
This file is the shared base class used by all pages and list sections.

### Functions
- `_clear()` - Removes the current HTML inside the parent element before a new render.
- `render(data)` - Checks empty data, stores it, builds markup, and inserts it into the page.
- `renderError(message = this._errorMessage)` - Creates a simple empty-state message for the parent element.

### Questions and short answers
1. Why is `View.js` never changed? The assignment says to use this exact base class as the shared template for all child views.
2. What does `render()` do when data is empty? It calls `renderError()` to show the empty-state message instead of a blank area.
3. How do child views use this class? They set their parent element and `_generateMarkup()` and then extend the class.

## FormView.js
### Job
This file creates the form the user uses to add or edit a subject.

### Functions
- `_generateMarkup()` - Builds the inputs, select list, error text, and action buttons.
- `renderError(message = this._errorMessage)` - Shows validation messages inside the form without erasing the form itself.
- `clearError()` - Removes the old validation message before the next submit.
- `addHandlerSubmit(handler)` - Reads the form values and passes a plain object to the controller.
- `addHandlerCancel(handler)` - Connects the cancel button to exit edit mode.
- `fillForm(subject)` - Fills the form with one subject's data for editing.
- `resetForm()` - Restores the form to add mode.

### Questions and short answers
1. Why does `FormView` override `renderError()`? Because the base method clears the entire parent element, which would remove the form fields.
2. What does `fillForm()` do? It loads the selected subject into the form and flips the button to "Save changes."
3. Why is the submit data passed as a plain object? It keeps the controller simple and keeps the form view focused on reading user input.

## SubjectListView.js
### Job
This file renders each subject row and handles the edit and delete buttons.

### Functions
- `_generateMarkup()` - Builds all subject rows with their name, units, grade, and action buttons.
- `_escape(text)` - Converts special characters so the subject name is safe inside HTML.
- `addHandlerEdit(handler)` - Uses event delegation to detect the Edit button click.
- `addHandlerDelete(handler)` - Uses event delegation to detect the Delete button click.

### Questions and short answers
1. Why use event delegation here? It lets one listener handle all rows without creating a new listener for every subject.
2. Why escape the subject name? It prevents HTML characters from breaking the list layout or causing unsafe output.
3. What happens when there are no subjects? The base `render()` calls `renderError()` and shows the empty-state message.

## SummaryView.js
### Job
This file renders the GWA, total units, subject count, and standing label.

### Functions
- `_generateMarkup()` - Shows the summary cards with the newest values.

### Questions and short answers
1. Why is the summary always rendered from data passed in by the controller? The view should not read the model directly.
2. What does the summary show when no subjects exist? It shows a GWA of "—" and zero values for the other fields.
3. Who calculates the standing label? The model does; the summary view only displays it.

## controller.js
### Job
This file connects the model and the views and handles the app workflow.

### Functions
- `renderAll()` - Updates the list and summary after every model change.
- `controlSubmitSubject(data)` - Validates submitted data, saves it, and re-renders the screen.
- `controlCancelEdit()` - Resets the form from edit mode to add mode.
- `controlEditSubject(id)` - Loads a subject into the form for editing.
- `controlDeleteSubject(id)` - Confirms deletion and removes the selected subject.
- `init()` - Loads data from the model, creates the first render, and connects event handlers.

### Questions and short answers
1. Why is the controller the only file that imports both model and views? That keeps MVC boundaries clean and makes each part easier to understand.
2. Is the controller allowed to build markup? No. It only passes data into the view classes, which build the markup.
3. Why call `renderAll()` after every action? It keeps the list and summary consistent with the current model state.

## index.html
### Job
This file sets up the app layout and loads the app script.

### Questions and short answers
1. What required elements are in the page? A subject form, a subject list, and a summary section.
2. Why is the script type set to `module`? The app uses ES modules for imports and exports.
3. Why are no inline `onclick` attributes used? The project requirement says all behavior must be attached through JavaScript event listeners.
