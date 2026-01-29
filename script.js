function executeVariableRoomSprint() {
    const rawInput = document.getElementById('studentList').value.trim();
    const roomInput = document.getElementById('roomConfig').value.trim();
    const outputArea = document.getElementById('outputArea');
    outputArea.innerHTML = "";

    // 1. Expand Student Range (Refining the Backlog)
    let expandedBacklog = [];
    rawInput.split('\n').filter(s => s.trim() !== "").forEach(line => {
        const parts = line.split('-');
        if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            const start = parseInt(parts[0]), end = parseInt(parts[1]), branch = parts[2].trim();
            for (let i = start; i <= end; i++) expandedBacklog.push(`${i}-${branch}`);
        } else { expandedBacklog.push(line); }
    });

    // 2. Interleave Branches (Anti-Copying seating strategy)
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

    // 3. Process Rooms with Variable Capacities (Variable Sprint Velocity)
    const rooms = roomInput.split(',').map(r => {
        const [name, cap] = r.split(':');
        return { name: name ? name.trim() : "Unknown", capacity: parseInt(cap) || 0 };
    });

    let studentIndex = 0;
    rooms.forEach((room, idx) => {
        if (studentIndex >= finalOrder.length) return;

        const roomDiv = document.createElement('div');
        roomDiv.className = 'room-section';
        roomDiv.innerHTML = `<div class="room-title">VENUE: ${room.name} (${room.capacity} Benches)</div>`;

        let table = `<table><tr><th>Bench No</th><th>Student 1</th><th>Student 2</th></tr>`;
        for (let b = 1; b <= room.capacity; b++) {
            const s1 = finalOrder[studentIndex++] || "-";
            const s2 = finalOrder[studentIndex++] || "-";
            table += `<tr><td>${b}</td><td>${s1}</td><td>${s2}</td></tr>`;
        }
        table += `</table>`;
        roomDiv.innerHTML += table;

        // 4. Show Warning Note if students remain for the next "Sprint"
        if (studentIndex < finalOrder.length) {
            const nextRoomName = rooms[idx + 1] ? rooms[idx + 1].name : "Next Available Room";
            roomDiv.innerHTML += `
                <div class="warning-note">
                    <div class="alert-title">⚠️ Note: Remaining Students Moved to NEXT ROOM</div>
                    <div><strong>New Venue:</strong> ${nextRoomName}</div>
                    
                </div>`;
        }
        outputArea.appendChild(roomDiv);
    });
}