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
// Adds a new subject after validation and immediately saves the updated list.
export function addSubject(data) {
  const errors = validateSubject(data, state.subjects);

  if (errors.length > 0) {
    return { success: false, errors };
  }

  const newSubject = {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `subject-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: data.name.trim(),
    units: Number(data.units),
    grade: Number(data.grade),
  };

  state.subjects.push(newSubject);
  persist();
  return { success: true, subject: newSubject };
}

// Updates a subject by id and reuses the same validation rules as add mode.
export function updateSubject(id, data) {
  const index = state.subjects.findIndex((subject) => subject.id === id);

  if (index === -1) {
    return { success: false, errors: ["Subject not found."] };
  }

  const updatedSubject = {
    ...state.subjects[index],
    ...data,
    id,
    name: data.name.trim(),
    units: Number(data.units),
    grade: Number(data.grade),
  };

  const errors = validateSubject(updatedSubject, state.subjects);

  if (errors.length > 0) {
    return { success: false, errors };
  }

  state.subjects[index] = updatedSubject;
  persist();
  return { success: true, subject: updatedSubject };
}




// Removes a subject by id and persists the cleaned list back to storage.
export function deleteSubject(id) {
  const originalCount = state.subjects.length;
  state.subjects = state.subjects.filter((subject) => subject.id !== id);

  if (state.subjects.length !== originalCount) {
    persist();
    return true;
  }

  return false;
}





// Finds a single subject by id for the edit form to prefill with its current values.
export function getSubjectById(id) {
  return state.subjects.find((subject) => subject.id === id) ?? null;
}

// Loads saved data and falls back to an empty list if localStorage is missing or corrupted.
export function loadState() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      state.subjects = [];
      return state.subjects;
    }

    const parsed = JSON.parse(savedData);
    state.subjects = Array.isArray(parsed) ? parsed : [];
    return state.subjects;
  } catch (error) {
    console.error("Could not read saved state. Resetting to an empty list.", error);
    state.subjects = [];
    return state.subjects;
  }
}

// Computes GWA using the formula grade × units divided by total units, rounded to 2 decimal places.
export function calculateGwa(subjects) {
  if (!subjects || subjects.length === 0) {
    return 0;
  }

  const totalWeightedGrade = subjects.reduce((total, subject) => total + Number(subject.grade) * Number(subject.units), 0);
  const totalUnits = calculateTotalUnits(subjects);

  if (totalUnits === 0) {
    return 0;
  }

  return Number((totalWeightedGrade / totalUnits).toFixed(2));
}

// Totals the units across all subjects so the summary can show the full load.
export function calculateTotalUnits(subjects) {
  if (!subjects || subjects.length === 0) {
    return 0;
  }

  return subjects.reduce((total, subject) => total + Number(subject.units), 0);
}

// Converts a numeric GWA into a readable standing label using the school range rules.
export function getStanding(gwa) {
  if (!Number.isFinite(gwa) || gwa === 0) {
    return "—";
  }

  for (const range of STANDING_RANGES) {
    if (gwa >= range.min && gwa <= range.max) {
      return range.label;
    }
  }

  if (gwa <= 3) {
    return "Good standing";
  }

  return "Failing";
}



