# Assumptions

- The grade scale follows the Philippine 1.00 to 5.00 model: 1.00 is best, 5.00 is failure.
- The allowed grade list is `1.00, 1.25, 1.50, 1.75, 2.00, 2.25, 2.50, 2.75, 3.00, 5.00`.
- Latin honors are treated as follows: Summa 1.00–1.20, Magna 1.21–1.45, Cum Laude 1.46–1.75.
- If the GWA is between 1.76 and 3.00, the app calls it "Good standing."
- A GWA above 3.00 is labeled "Failing."
- Each subject unit count is limited to whole numbers from 1 to 6.
- A subject name must be filled in and cannot exceed 40 characters.
- The app is built for a browser environment with localStorage available, which is the requirement for no backend.
- The app uses VS Code Live Server because ES modules will not work reliably from `file://` direct opening.
