# 🎓 Exam Seating Sprint Coordinator

A professional, Scrum-based Examination Seating Arrangement System designed to automate complex academic logistics. This tool handles multi-branch interleaving, automated roll number ranges, and variable room capacities.

---

## 🚀 Scrum Methodology in This Project

This project treats examination logistics as an **Agile Sprint**. By applying Scrum principles, we ensure that resource allocation is balanced and transparent.

### 📋 Scrum Artifacts
* **Product Backlog:** The "Student List" input, where roll number ranges (e.g., `101-178-IT`) represent the total work to be completed.
* **Sprint Capacity (Velocity):** Defined by the `Room:Benches` input. Each room has a different capacity, mirroring how different Scrum teams have different velocities.
* **Definition of Done (DoD):** A fully populated seating table where no two students from the same branch sit on the same bench.
* **Sprint Carry-over:** The **Warning Note** alerts the coordinator when the "backlog" exceeds a room's capacity, moving the remaining students to the next "Sprint" (Venue).



---

## 🛠️ Key Technical Features

### 1. Automated Backlog Refinement (Range Expansion)
Instead of manual entry, the system parses range patterns:
* **Input:** `101-178-IT`
* **Action:** The JavaScript engine automatically generates 78 unique roll numbers associated with the 'IT' branch.

### 2. Anti-Copying Strategy (Branch Interleaving)
The system employs a **Resource Leveling** algorithm. It separates students by branch and picks them one-by-one to ensure that adjacent seats (Student 1 and Student 2) are from different branches, significantly reducing the chance of academic dishonesty.

### 3. Variable Capacity Management
The engine supports unique capacities for every venue.
* **Configuration:** `Lab A:5, Hall 1:50, Room 3:12`
* **Result:** The system fills Lab A first, generates an overflow warning, and seamlessly continues the list in Hall 1.

### 4. Visual Overflow Architecture
Following the UI requirements, the system uses a high-visibility warning system:
* **Dashed Red Border:** Indicates a venue overflow.
* **Pill Tags:** Displays the immediate "Next-in-Queue" students to help invigilators direct traffic.

---

## 📂 File Structure

* `index.html`: The Scrum Dashboard (Input UI).
* `style.css`: The Visual Identity (Dashed alerts and pill tags).
* `script.js`: The Allocation Engine (Range expansion and interleaving logic).

---

## 👥 Team Contributions (Agile Roles)

* **Scrum Master / UI Lead:** Focused on the "Definition of Done" and visual scannability (CSS dashed alerts and responsive layout).
* **Lead Developer / Architect:** Built the Range Expansion engine and the Branch Interleaving algorithm in JavaScript.

---

## 📝 How to Use

1.  **Define Rooms:** Enter your venues and their bench counts (e.g., `Room 101:5, Room 102:10`).
2.  **Enter Backlog:** Provide roll number ranges followed by branch codes (e.g., `101-150-CSE`).
3.  **Execute Sprint:** Click **Generate Seating Sprint** to view the interleaved results and overflow instructions.