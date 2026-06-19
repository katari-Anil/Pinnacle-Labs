document.addEventListener('DOMContentLoaded', () => {
    const todayDateStr = getTodayDateString();
    document.getElementById('current-date-label').innerText = new Date().toLocaleDateString(undefined, { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });

    renderMetrics();
    renderDailyCheckInTable();
});

function renderMetrics() {
    const roster = getStorageData('roster');
    const logs = getStorageData('attendance_logs');
    const today = getTodayDateString();

    const todayLogs = logs.filter(l => l.date === today);
    const presentCount = todayLogs.filter(l => l.status === 'Present').length;
    const absentCount = roster.length - presentCount;
    
    const rate = roster.length ? Math.round((presentCount / roster.length) * 100) : 0;

    document.getElementById('metric-total').innerText = roster.length;
    document.getElementById('metric-present').innerText = presentCount;
    document.getElementById('metric-absent').innerText = absentCount >= 0 ? absentCount : 0;
    document.getElementById('metric-rate').innerText = `${rate}%`;
}

function renderDailyCheckInTable() {
    const roster = getStorageData('roster');
    const logs = getStorageData('attendance_logs');
    const today = getTodayDateString();
    const tbody = document.getElementById('dashboard-table-body');
    
    tbody.innerHTML = "";

    if(roster.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">No members registered in the system roster.</td></tr>`;
        return;
    }

    roster.forEach(member => {
        // Find existing record for this specific user today
        const userTodayLog = logs.find(l => l.date === today && l.memberId === member.id);
        
        const statusBadge = userTodayLog 
            ? `<span class="badge badge-present">Present</span>` 
            : `<span class="badge badge-absent">Absent</span>`;
            
        const timeValue = userTodayLog ? userTodayLog.time : '--:--';

        let actionButtons = "";
        if (!userTodayLog) {
            actionButtons = `<button class="btn btn-primary" onclick="checkIn('${member.id}')" style="padding:0.4rem 0.8rem; font-size:0.85rem;">Check In</button>`;
        } else {
            actionButtons = `<button class="btn btn-danger" onclick="revertCheckIn('${member.id}')" style="padding:0.4rem 0.8rem; font-size:0.85rem;">Undo</button>`;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${sanitize(member.id)}</strong></td>
            <td>${sanitize(member.name)}</td>
            <td>${sanitize(member.department)}</td>
            <td>${statusBadge} (At ${timeValue})</td>
            <td><div class="action-buttons">${actionButtons}</div></td>
        `;
        tbody.appendChild(tr);
    });
}

window.checkIn = function(memberId) {
    const logs = getStorageData('attendance_logs');
    const today = getTodayDateString();
    
    const timeNow = new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false });

    logs.push({
        date: today,
        memberId: memberId,
        time: timeNow,
        status: 'Present'
    });

    setStorageData('attendance_logs', logs);
    renderMetrics();
    renderDailyCheckInTable();
};

window.revertCheckIn = function(memberId) {
    let logs = getStorageData('attendance_logs');
    const today = getTodayDateString();

    logs = logs.filter(l => !(l.date === today && l.memberId === memberId));
    
    setStorageData('attendance_logs', logs);
    renderMetrics();
    renderDailyCheckInTable();
};