# 🎓 Exam Seating Sprint Coordinator (v2.0)
A professional, Scrum-based Examination Seating Arrangement System designed to automate complex academic logistics. This version introduces Physical Grid Visualization, Exclusion Handling, and Regex-based Roll Number Expansion.

## 🚀 Scrum Methodology in This Project
This project treats examination logistics as an **Agile Sprint**. By applying Scrum principles, resource allocation is balanced and transparent.

### 📋 Scrum Artifacts
* **Product Backlog:** The "Student List" input, where roll number ranges (e.g., 23501A1201-23501A1260-IT) represent the total work to be completed.

* **Sprint Capacity (Velocity):** Defined by the Rows x Cols input. Each "Seat Card" represents a unit of capacity.

* **Definition of Done (DoD):** A visual grid map where no two students from the same branch sit on the same bench.

* **Sprint Carry-over:** The Visual Overflow Architecture alerts the coordinator when the "backlog" exceeds a room's capacity, moving remaining students to the next "Sprint" (Venue).

## 🛠️ Key Technical Features
### 1. Regex-Based Suffix Expansion
The system uses a sophisticated Regular Expression engine to identify the numeric suffix of complex roll numbers.

* **Action:** It maintains leading zeros (e.g., 09 doesn't become 9) to ensure data integrity for university portals.

* **Logic:** const matchStart = startStr.match(/(\d+)$/);

### 2. Physical Classroom Grid Rendering
Instead of simple tables, the system renders a physical map of the room using CSS Grid.

* **Bench Cards:** Each card represents a bench, containing two distinct seat slots (Left and Right).

* **Dynamic Columns:** Inputting Hall: 6x4 automatically adjusts the UI to render exactly 4 columns of benches.

### 3. Detained/Exclusion Logic
A dedicated input field allows for the exclusion of students who are detained or absent. The engine cross-references this list during the "Sprint Refinement" phase and skips them automatically.

### 4. Branch Interleaving (Anti-Copying)
The system employs a * **Resource Leveling** algorithm. It separates students by branch and "picks" them in a round-robin fashion, ensuring that every seat adjacent to a student belongs to a different branch.

## 📂 File Structure
* `index.html`: The Scrum Dashboard (Modern UI with Inter font).

* `style.css`: Visual Identity (Seat cards, hover effects, and branch pill tags).

* `script.js`: The Allocation Engine (Regex logic, interleaving, and grid generation).

## 👨‍💻 Developer Contributions (Individual Project)
As the sole developer and architect, I handled:

* **UI/UX Design:** Implementing a high-contrast dashboard with responsive grid layouts and CSS transitions.

* **Logic Engine:** Developing the range expansion regex and the branch interleaving algorithm for multi-branch support.

* **Deployment Strategy:** Creating the "Visual Map" architecture to aid physical hall invigilation and overflow management.

## 📝 How to Use
**Define Dimensions:** Enter your venues (e.g., Lab A: 4x3) representing Rows and Benches per row.

**Filter Students:** Add any detained roll numbers to the exclusion box.

**Refine Backlog:** Enter ranges in Start-End-Branch format.


Execute: Click **GENERATE VISUAL MAP** to produce the invigilation-ready seating chart.
