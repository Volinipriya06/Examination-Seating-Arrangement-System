function executeCreativeGrid() {
    const rawInput = document.getElementById('studentList').value.trim();
    const roomInput = document.getElementById('roomConfig').value.trim();
    const excludedInput = document.getElementById('excludedStudents').value.split(',').map(s => s.trim());
    const outputArea = document.getElementById('outputArea');
    outputArea.innerHTML = "";

    let expandedBacklog = [];

    rawInput.split('\n').filter(s => s.trim() !== "").forEach(line => {
        const parts = line.split('-');
        
        // Pattern: [StartRoll]-[EndRoll]-[Branch] 
        // Example: 23501A1201-23501A1260-IT
        if (parts.length === 3) {
            const startStr = parts[0].trim();
            const endStr = parts[1].trim();
            const branch = parts[2].trim();

            // Extract numeric suffix using Regex
            const matchStart = startStr.match(/(\d+)$/);
            const matchEnd = endStr.match(/(\d+)$/);

            if (matchStart && matchEnd) {
                const prefix = startStr.substring(0, startStr.length - matchStart[0].length);
                const startNum = parseInt(matchStart[0]);
                const endNum = parseInt(matchEnd[0]);
                const padLength = matchStart[0].length; // Keep leading zeros (e.g., 01, 02)

                for (let i = startNum; i <= endNum; i++) {
                    const currentRoll = prefix + i.toString().padStart(padLength, '0');
                    if (!excludedInput.includes(currentRoll)) {
                        expandedBacklog.push(`${currentRoll}-${branch}`);
                    }
                }
            }
        } else {
            // Fallback for individual entries
            if (!excludedInput.includes(line.trim())) expandedBacklog.push(line.trim());
        }
    });
    
    // 2. Interleave Branches
    const branchMap = {};
    expandedBacklog.forEach(s => {
        const b = s.split('-')[1] || 'GEN';
        if (!branchMap[b]) branchMap[b] = [];
        branchMap[b].push(s);
    });

    let finalOrder = [];
    const branches = Object.keys(branchMap);
    let hasMore = true;
    while (hasMore) {
        hasMore = false;
        branches.forEach(b => {
            if (branchMap[b].length > 0) { finalOrder.push(branchMap[b].shift()); hasMore = true; }
        });
    }

    // 3. Grid Generation
    const rooms = roomInput.split(',').map(r => {
        const [name, dims] = r.split(':');
        let rows = 0, cols = 0;
        
        if (dims && dims.includes('x')) {
            const d = dims.toLowerCase().split('x');
            rows = parseInt(d[0]);
            cols = parseInt(d[1]);
        } else {
            // Fallback default
            cols = 3; 
            const cap = parseInt(dims) || 12;
            rows = Math.ceil(cap / cols);
        }
        return { name: name.trim(), rows: rows, cols: cols, capacity: rows * cols };
    });

    let studentIndex = 0;

    rooms.forEach((room, idx) => {
        if (studentIndex >= finalOrder.length) return;

        const roomDiv = document.createElement('div');
        roomDiv.className = 'room-section';
        
        // Creative Header
        roomDiv.innerHTML = `
            <div class="room-header">
                <div class="room-title">${room.name}</div>
                <div class="room-stats">${room.rows} Rows × ${room.cols} Cols</div>
            </div>
        `;

        const grid = document.createElement('div');
        grid.className = 'creative-grid';
        // Set Exact Columns from Input
        grid.style.gridTemplateColumns = `repeat(${room.cols}, 1fr)`;

        for (let b = 1; b <= room.capacity; b++) {
            const s1 = finalOrder[studentIndex++] || null;
            const s2 = finalOrder[studentIndex++] || null;

            // Helper to format student HTML
            const formatSeat = (student) => {
                if (!student) return `<div class="seat-slot empty">Empty</div>`;
                const [roll, branch] = student.split('-');
                return `
                    <div class="seat-slot filled">
                        <div>
                            ${roll}
                            <span class="branch-tag">${branch}</span>
                        </div>
                    </div>`;
            };

            const cardHTML = `
                <div class="seat-card">
                    <div class="bench-badge">Bench ${b}</div>
                    <div class="card-content">
                        <div class="seat-slot left">${formatSeat(s1)}</div>
                        ${formatSeat(s2)}
                    </div>
                </div>
            `;
            grid.innerHTML += cardHTML;
        }
        
        roomDiv.appendChild(grid);

        // Warning Logic
        if (studentIndex < finalOrder.length) {
            const nextRoom = rooms[idx + 1] ? rooms[idx + 1].name : "Next Venue";
            roomDiv.innerHTML += `
                <div class="overflow-alert">
                    <div class="alert-icon">⚠️</div>
                    <div>
                        <strong>Room Full. </strong> Moving to ${nextRoom}:
                        <div class="next-queue">
                            ${finalOrder.slice(studentIndex, studentIndex + 0).map(s => `<span class="queue-pill">${s}</span>`).join('')}
                            ${finalOrder.length > studentIndex + 0 ? `<small>+${finalOrder.length - (studentIndex + 0)} more</small>` : ''}
                        </div>
                    </div>
                </div>`;
        }
        outputArea.appendChild(roomDiv);
    });

}
