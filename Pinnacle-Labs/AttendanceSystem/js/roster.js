document.addEventListener('DOMContentLoaded', () => {
    renderRosterTable();

    document.getElementById('add-member-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const idInput = document.getElementById('member-id').value.trim().toUpperCase();
        const nameInput = document.getElementById('member-name').value.trim();
        const deptInput = document.getElementById('member-dept').value;

        const roster = getStorageData('roster');

        if(roster.some(m => m.id === idInput)) {
            alert("Configuration Conflict: A user profile matching this ID already exists.");
            return;
        }

        roster.push({ id: idInput, name: nameInput, department: deptInput });
        setStorageData('roster', roster);
        
        e.target.reset();
        renderRosterTable();
    });
});

function renderRosterTable() {
    const roster = getStorageData('roster');
    const tbody = document.getElementById('roster-table-body');
    tbody.innerHTML = "";

    if (roster.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted);">No profiles registered in directory index.</td></tr>`;
        return;
    }

    roster.forEach(member => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${sanitize(member.id)}</td>
            <td><strong>${sanitize(member.name)}</strong></td>
            <td>${sanitize(member.department)}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteMember('${member.id}')" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">Remove Profile</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.deleteMember = function(id) {
    if(confirm("Confirm profile delete? This action will not delete historical logs but removes them from the daily tracking board roster loop.")) {
        let roster = getStorageData('roster');
        roster = roster.filter(m => m.id !== id);
        setStorageData('roster', roster);
        renderRosterTable();
    }
};