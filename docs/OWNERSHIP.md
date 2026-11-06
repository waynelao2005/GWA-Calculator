# Ownership Split

This is a suggested ownership plan for a three-member team. The idea is that each member owns the code they are most visible in and can commit from their own GitHub account.

## Member A
- `js/views/FormView.js`
- `controlSubmitSubject` in `js/controller.js`
- `controlCancelEdit` in `js/controller.js`
- `validateSubject` in `js/model.js`

## Member B
- `js/views/SubjectListView.js`
- `controlEditSubject` in `js/controller.js`
- `controlDeleteSubject` in `js/controller.js`
- `addSubject` in `js/model.js`
- `updateSubject` in `js/model.js`
- `deleteSubject` in `js/model.js`
- `getSubjectById` in `js/model.js`

## Member C
- `js/views/SummaryView.js`
- `calculateGwa` in `js/model.js`
- `calculateTotalUnits` in `js/model.js`
- `getStanding` in `js/model.js`
- `loadState` in `js/model.js`
- `persist` in `js/model.js`
- `init` in `js/controller.js`
- `renderAll` in `js/controller.js`

## Shared or team-owned files
- `js/views/View.js` - shared base class for all views
- `index.html` - page structure and overall app shell
- `css/style.css` - common layout and design

## Ownership note
Each member should make their own commit history on their own branch and GitHub account so the work stays easy to review and grade.
