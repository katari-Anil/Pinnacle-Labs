// js/admin.js
document.addEventListener('DOMContentLoaded', () => {
    rebuildAnalyticsMetrics();

    document.getElementById('fleetCommissionForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const configuredBus = {
            id: document.getElementById('fId').value.trim(),
            name: document.getElementById('fName').value.trim(),
            source: document.getElementById('fSrc').value.trim(),
            destination: document.getElementById('fDst').value.trim(),
            departure: document.getElementById('fDep').value.trim(),
            arrival: document.getElementById('fArr').value.trim(),
            price: Number(document.getElementById('fPrice').value),
            totalSeats: 24,
            bookedSeats: []
        };

        const operationalFleet = getBuses();
        if(operationalFleet.some(b => b.id === configuredBus.id)) {
            alert("A configuration node already holds this identification string context key.");
            return;
        }

        operationalFleet.push(configuredBus);
        saveBuses(operationalFleet);
        alert(`Fleet unit ${configuredBus.id} registered into active route table matrices.`);
        document.getElementById('fleetCommissionForm').reset();
        rebuildAnalyticsMetrics();
    });
});

function rebuildAnalyticsMetrics() {
    const transactionLedger = getBookings();
    const operationalBuses = getBuses();

    const sumRevenue = transactionLedger
        .filter(t => t.status === 'Confirmed')
        .reduce((accumulated, current) => accumulated + current.totalPrice, 0);

    document.getElementById('mRev').innerText = `₹${sumRevenue}`;
    document.getElementById('mCount').innerText = transactionLedger.length;
    document.getElementById('mFleet').innerText = operationalBuses.length;
}