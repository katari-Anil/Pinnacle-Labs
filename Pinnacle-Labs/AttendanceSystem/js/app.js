/**
 * Attendance System — Central Storage Engine Initialization
 */

// Initialize empty datasets if missing from Local Storage
if (!localStorage.getItem('roster')) {
    const defaultRoster = [
        { id: "EMP101", name: "Katari Anil", department: "Engineering" },
        { id: "EMP102", name: "Jane Smith", department: "Design" },
        { id: "EMP103", name: "Alex Jones", department: "Operations" }
    ];
    localStorage.setItem('roster', JSON.stringify(defaultRoster));
}

if (!localStorage.getItem('attendance_logs')) {
    localStorage.setItem('attendance_logs', JSON.stringify([]));
}

/**
 * Global Utility: Fetch data arrays safely
 */
function getStorageData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

/**
 * Global Utility: Write data arrays safely
 */
function setStorageData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Escape rendering tags to block script parsing anomalies
 */
function sanitize(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

/**
 * Format timestamp values cleanly
 */
function getTodayDateString() {
    const d = new Date();
    return d.toISOString().split('T')[0]; // Format: YYYY-MM-DD
}