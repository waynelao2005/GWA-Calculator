# Report Facts

## a) Real folder tree

```text
project/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── model.js
│   ├── controller.js
│   └── views/
│       ├── View.js
│       ├── FormView.js
│       ├── SubjectListView.js
│       └── SummaryView.js
├── docs/
│   ├── CODE_GUIDE.md
│   ├── OWNERSHIP.md
│   ├── REPORT_FACTS.md
│   ├── COMMIT_PLAN.md
│   └── ASSUMPTIONS.md
└── README.md
```

## b) Real `state` object

```js
export const state = {
  subjects: [
    {
      id: "sample-subject-id",
      name: "Calculus 1",
      units: 3,
      grade: 1.5,
    },
  ],
};
```

- `subjects` - An array of subject objects that stores every course the student enters.
- `id` - A unique string used to identify a single subject for edit and delete actions.
- `name` - The subject name shown in the list and used for validation.
- `units` - A whole number from 1 to 6 that counts how much credit the subject carries.
- `grade` - The grade value used in the weighted average formula.

## c) Views table

| View file | Parent selector | Handler methods exposed | Owner |
|---|---|---|---|
| `js/views/FormView.js` | `.subject-form` | `addHandlerSubmit(handler)`, `addHandlerCancel(handler)` | Member A |
| `js/views/SubjectListView.js` | `.subject-list` | `addHandlerEdit(handler)`, `addHandlerDelete(handler)` | Member B |
| `js/views/SummaryView.js` | `.summary` | none | Member C |

## d) Trace: user adds a subject
1. User submits the form in `FormView.js`.
2. The submit listener in `FormView.js` calls `controlSubmitSubject` in `js/controller.js`.
3. `controlSubmitSubject` validates the data with `validateSubject` in `js/model.js`.
4. `addSubject` in `js/model.js` updates `state.subjects` and saves the list to `localStorage`.
5. The controller calls `subjectListView.render(...)` and `summaryView.render(...)`.
6. The views rebuild their markup from the current data and the screen updates.

## e) Test cases

| # | What is tested | Input | Expected result | Actual result | Pass? |
|---|---|---|---|---|---|
| 1 | Valid add | Name: `Calculus 1`, Units: `3`, Grade: `1.50` | Subject is added to the list and GWA updates |  |  |
| 2 | Empty name | Name: empty string | Error message says name is required |  |  |
| 3 | Units out of range | Units: `0` | Error message says units must be 1 to 6 |  |  |
| 4 | Duplicate name | Add same name twice | Error message says duplicate subject name |  |  |
| 5 | Invalid grade | Grade: `4.25` | Error message says grade is not allowed |  |  |
| 6 | Reload persistence | Refresh page after adding subjects | Saved subjects reappear from localStorage |  |  |
| 7 | Edit subject | Click Edit, change grade, save | Subject updates and summary recomputes |  |  |
| 8 | Delete subject | Click Delete and confirm | Subject is removed and empty-state appears when the last item is removed |  |  |
