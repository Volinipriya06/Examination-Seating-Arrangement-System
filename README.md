# 🎓 Exam Seating Sprint Coordinator (v2.0)

A professional, Scrum-based **Examination Seating Arrangement System** designed to automate complex academic logistics. This system treats examination hall management as an **Agile Sprint**, ensuring transparent resource allocation and automated branch interleaving.

## 🚀 The Scrum Methodology
This project moves beyond simple lists by applying Agile principles to physical space:

* **Product Backlog:** The raw student list where roll number ranges (e.g., `23501A1201-23501A1260-IT`) represent the total work to be completed.
* **Sprint Capacity:** Defined by the **Rows x Benches** input. Each seat represents a unit of capacity.
* **Definition of Done (DoD):** A fully rendered visual grid map where no two students from the same branch sit on the same bench (Anti-Copying Logic).
* **Sprint Carry-over:** A built-in **Visual Overflow Architecture** that alerts the coordinator when the backlog exceeds room capacity, automatically moving remaining students to the next "Sprint" (Venue).

## 💻 Tech Stack
* **Frontend:** HTML5, CSS3 (Advanced Grid/Flexbox), JavaScript (ES6+)
* **DevOps:** Docker (Nginx Alpine), Jenkins (Pipeline as Code)
* **Testing:** Selenium WebDriver (Automated UI Validation)
* **Design:** Inter Typography, High-Contrast Dashboard UI

## 🛠️ Key Technical Features

### 1. Regex-Based Suffix Expansion
The system uses a sophisticated Regular Expression engine to identify and expand numeric suffixes. It intelligently maintains leading zeros (e.g., `09` does not become `9`) to ensure data integrity for university portals.
> **Logic:** `const matchStart = startStr.match(/(\d+)$/);`

### 2. Physical Classroom Grid Rendering
Instead of abstract tables, the system renders a physical map using **CSS Grid**. 
* **Bench Cards:** Each card represents a physical bench with two distinct slots (Left and Right).
* **Dynamic Columns:** The UI automatically adjusts columns based on the `Rows x Cols` input.

### 3. Detained & Exclusion Logic
Includes a dedicated refinement phase where the engine cross-references a "Detained" list and skips those roll numbers automatically while maintaining the interleaving sequence.

### 4. Branch Interleaving (Anti-Copying)
Uses a **Resource Leveling** algorithm to separate students by branch. It employs a round-robin "picking" method to ensure that students from the same department are never seated next to each other.

## 📦 DevOps & CI/CD

### **Docker Deployment**
The app is containerized using Nginx for high-performance static serving.
```bash
# Build the image
docker build -t exam-system .

# Run the container
docker run -d -p 9001:80 --name exam-system exam-system
