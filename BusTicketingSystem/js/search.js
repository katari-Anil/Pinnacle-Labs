// js/search.js
document.addEventListener('DOMContentLoaded', () => {
    const query = new URLSearchParams(window.location.search);
    const from = query.get('from');
    const to = query.get('to');
    const date = query.get('date');

    if(!from || !to || !date) { window.location.href = 'index.html'; return; }
    document.getElementById('routeHeading').innerText = `${from} ➔ ${to} (${date})`;

    const fleet = getBuses();
    const matches = fleet.filter(b => b.source.toLowerCase() === from.toLowerCase() && b.destination.toLowerCase() === to.toLowerCase());
    const target = document.getElementById('resultsContainer');

    if(matches.length === 0) {
        target.innerHTML = `<p style="text-align:center; padding: 2rem;">No operational routes found matching your criteria. Try searching <b>Bengaluru to Mumbai</b> for demo results.</p>`;
        return;
    }

    matches.forEach((bus, index) => {
        const structuralCard = document.createElement('div');
        structuralCard.className = 'bus-card';
        structuralCard.style.animationDelay = `${index * 0.15}s`;
        structuralCard.style.animationFillMode = 'forwards';

        const openSeats = bus.totalSeats - bus.bookedSeats.length;

        structuralCard.innerHTML = `
            <div class="bus-info">
                <h3>${bus.name} <span class="tag-sleeper">A/C Sleeper (2+1)</span></h3>
                <p class="bus-meta">Timing: <b>${bus.departure}</b> from Source ➔ Arrives <b>${bus.arrival}</b></p>
                <p class="bus-meta" style="color:${openSeats < 5 ? 'var(--indian-orange)' : 'var(--indian-green)'}"><b>${openSeats} Available Seats</b></p>
            </div>
            <div class="price-node">
                <div class="amt">₹${bus.price}</div>
                <button class="btn btn-select" onclick="navigateToLayout('${bus.id}','${date}')">Select Seats</button>
            </div>
        `;
        target.appendChild(structuralCard);
    });
});

function navigateToLayout(id, date) {
    window.location.href = `booking.html?busId=${id}&date=${date}`;
}