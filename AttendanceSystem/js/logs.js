document.addEventListener('DOMContentLoaded', () => {
    // Default picker inputs initialization to today
    document.getElementById('filter-date').value = getTodayDateString();
    renderLogs();

    document.getElementById('filter-trigger').addEventListener('click', renderLogs);
});

function renderLogs() {
    const filterDate = document.getElementById('filter-date').value;
    const searchName = document.getElementById('search-name').value.trim().toLowerCase();
    
    const roster = getStorageData('roster');
    const logs = getStorageData('attendance_logs');
    const tbody = document.getElementById('logs-table-body');
    
    tbody.innerHTML = "";

    // Filter down execution matrices matching criteria parameters
    const targetDayLogs = logs.filter(l => l.date === filterDate);

    // Map through the total roster base structure to see who was present vs absent on that specific date
    let parsedDataset = roster.map(member => {
        const matchingLog = targetDayLogs.find(l => l.memberId === member.id);
        return {
            id: member.id,
            name: member.name,
            department: member.department,
            status: matchingLog ? 'Present' : 'Absent',
            time: matchingLog ? matchingLog.time : '--:--'
        };
    });

    // Apply text search filtering if input exists
    if (searchName) {
        parsedDataset = parsedDataset.filter(item => 
            item.name.toLowerCase().includes(searchName) || 
            item.id.toLowerCase().includes(searchName)
        );
    }

    if (parsedDataset.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">No records match your tracking query filter adjustments.</td></tr>`;
        return;
    }

    parsedDataset.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${sanitize(filterDate)}</td>
            <td><strong>${sanitize(row.id)}</strong></td>
            <td>${sanitize(row.name)}</td>
            <td>${sanitize(row.department)}</td>
            <td><span class="badge badge-${row.status.toLowerCase()}">${row.status}</span> ${row.time !== '--:--' ? `(at ${row.time})` : ''}</td>
        `;
        tbody.appendChild(tr);
    });
}