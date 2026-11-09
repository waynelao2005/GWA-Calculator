// Holds the shared application state in one place  
export const state = { subjects: [] };

const STORAGE_KEY = "gwaCalculatorState";


export const GRADE_OPTIONS = [1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0, 5.0];


export const STANDING_RANGES = [
  { min: 1.0, max: 1.2, label: "Summa Cum Laude" },
  { min: 1.21, max: 1.45, label: "Magna Cum Laude" },
  { min: 1.46, max: 1.75, label: "Cum Laude" },
];

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.subjects))
  } catch (error) {
    console.error("Could not save state to localStorage.", error);
  }
}

// Validates a subject object and returns all user-facing errors before any change is made.
export function validateSubject(data, subjects = state.subjects) {
  const errors = [];
  const name = String(data?.name ?? "").trim();
  const units = Number(data?.units);
  const grade = Number(data?.grade);

  if (!name) {
    errors.push("Subject name is required.");
  }

  if (name.length > 40) {
    errors.push("Subject name must be 40 characters or fewer.");
  }

  if (!Number.isInteger(units) || units < 1 || units > 6) {
    errors.push("Units must be a whole number from 1 to 6.");
  }

  if (!GRADE_OPTIONS.includes(grade)) {
    errors.push("Grade must be one of the allowed values.");
  }

  const duplicate = subjects.some((subject) => {
    const sameName = subject.name.trim().toLowerCase() === name.toLowerCase();
    const sameId = String(subject.id) === String(data?.id ?? "");
    return sameName && !sameId;
  });

  if (duplicate && name) {
    errors.push("A subject with that name already exists.");
  }

  return errors;
}
