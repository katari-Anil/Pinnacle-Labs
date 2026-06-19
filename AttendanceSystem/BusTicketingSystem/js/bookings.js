// js/bookings.js
document.addEventListener('DOMContentLoaded', () => {
    executeHistoryRender();
    document.getElementById('dashboardSearch').addEventListener('input', (e) => {
        executeHistoryRender(e.target.value.toLowerCase());
    });
});

function executeHistoryRender(matchString = '') {
    const historicalArray = getBookings();
    const activeFleet = getBuses();
    const container = document.getElementById('dashboardTarget');
    container.innerHTML = '';

    if(historicalArray.length === 0) {
        container.innerHTML = `<p style="text-align:center; padding:1.5rem;">No historical execution states localized inside LocalStorage.</p>`;
        return;
    }

    historicalArray.forEach(ticket => {
        const bus = activeFleet.find(b => b.id === ticket.busId);
        const criteriaTokenStr = `${ticket.id} ${ticket.passenger.name}`.toLowerCase();

        if(matchString && !criteriaTokenStr.includes(matchString)) return;

        const row = document.createElement('div');
        row.className = 'booking-row';
        row.innerHTML = `
            <div>
                <h4>PNR Reference: ${ticket.id} [${ticket.status}]</h4>
                <p style="font-size:0.9rem; margin-top:4px;">Passenger: <b>${ticket.passenger.name}</b> | Seats Assigned: <b>${ticket.seats.join(', ')}</b></p>
                <p style="font-size:0.85rem; color:#555;">Route execution: ${bus ? bus.source : 'N/A'} to ${bus ? bus.destination : 'N/A'} on ${ticket.date}</p>
            </div>
            <div>
                ${ticket.status === 'Confirmed' ? `<button class="btn cancel-action" onclick="terminateTicket('${ticket.id}')">Cancel Seat</button>` : `<span style="color:gray; font-weight:bold;">Cancelled</span>`}
            </div>
        `;
        container.appendChild(row);
    });
}

function terminateTicket(pnrId) {
    if(!confirm("Authorize cancellation processing matrix node?")) return;

    let systemBookings = getBookings();
    const targetedItem = systemBookings.find(b => b.id === pnrId);
    targetedItem.status = 'Cancelled';
    localStorage.setItem('bookings', JSON.stringify(systemBookings));

    let localBuses = getBuses();
    const vehicle = localBuses.find(b => b.id === targetedItem.busId);
    if(vehicle) {
        vehicle.bookedSeats = vehicle.bookedSeats.filter(seat => !targetedItem.seats.includes(seat));
        saveBuses(localBuses);
    }
    executeHistoryRender();
}