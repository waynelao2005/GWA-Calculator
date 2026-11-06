# Commit Plan

The three members should each make their own commits from their own GitHub account so the work is easy to grade and review.

## Member A commit ideas
1. Add the subject form layout and input fields.
   - Example commit message: `Add FormView markup for the subject form`
2. Add the form validation rules for missing names and bad units.
   - Example commit message: `Add name and unit validation in FormView and model`
3. Add grade selection and duplicate-name checks.
   - Example commit message: `Add grade options and duplicate subject validation`
4. Implement submit handling and form reset logic.
   - Example commit message: `Handle add and edit submit flow in controller`
5. Add cancel-edit mode and error messaging behavior.
   - Example commit message: `Add cancel flow and form error display`
6. Review the app for empty states and assignment rule compliance.
   - Example commit message: `Final form validation and MVC cleanup`

## Member B commit ideas
1. Create the subject list markup and empty-state message.
   - Example commit message: `Add SubjectListView empty state and list rows`
2. Add edit button delegation and fill-in form behavior.
   - Example commit message: `Add edit-button delegation to the subject list`
3. Add delete confirmation flow and remove logic.
   - Example commit message: `Add delete confirmation and subject removal`
4. Implement `addSubject` and `updateSubject` in the model.
   - Example commit message: `Add model methods for saving and updating subjects`
5. Implement `deleteSubject` and `getSubjectById` in the model.
   - Example commit message: `Complete subject deletion and lookup logic`
6. Review subject-list behavior across add, edit, and delete actions.
   - Example commit message: `Verify subject list behavior after data changes`

## Member C commit ideas
1. Add the summary layout and display cards.
   - Example commit message: `Add SummaryView card layout for GWA stats`
2. Implement `calculateGwa` and `calculateTotalUnits`.
   - Example commit message: `Calculate weighted GPA and total units`
3. Add `getStanding` and honor range labeling.
   - Example commit message: `Add standing labels for honor ranges`
4. Implement `loadState` and safe localStorage handling.
   - Example commit message: `Load saved subjects without crashing on bad data`
5. Connect the controller render flow with the model and view updates.
   - Example commit message: `Render all summary data after every subject change`
6. Final app review and persistence verification.
   - Example commit message: `Verify summary recomputation and reload persistence`
