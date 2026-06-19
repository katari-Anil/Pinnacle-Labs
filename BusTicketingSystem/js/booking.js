// js/booking.js
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const busId = params.get('busId');
    const date = params.get('date');

    const buses = getBuses();
    const targetedBus = buses.find(b => b.id === busId);
    if(!targetedBus) { window.location.href='index.html'; return; }

    document.getElementById('targetBusTitle').innerText = `${targetedBus.name} (${date})`;

    const grid = document.getElementById('layoutGrid');
    const trackingSelectedSeats = [];
    const layoutRows = ['L-A', 'L-B', 'U-A', 'U-B']; // Lower & Upper Deck Configurations

    layoutRows.forEach(rowPrefix => {
        for(let i=1; i<=6; i++) {
            const assignmentId = `${rowPrefix}${i}`;
            const element = document.createElement('div');
            element.className = 'seat';
            element.innerText = assignmentId;

            if(targetedBus.bookedSeats.includes(assignmentId)){
                element.classList.add('booked');
            } else {
                element.addEventListener('click', () => {
                    if(element.classList.contains('selected')) {
                        element.classList.remove('selected');
                        trackingSelectedSeats.splice(trackingSelectedSeats.indexOf(assignmentId), 1);
                    } else {
                        element.classList.add('selected');
                        trackingSelectedSeats.push(assignmentId);
                    }
                    document.getElementById('calculatedFare').innerText = trackingSelectedSeats.length * targetedBus.price;
                });
            }
            grid.appendChild(element);
        }
    });

    document.getElementById('bookingForm').addEventListener('submit', (e) => {
        e.preventDefault();
        if(trackingSelectedSeats.length === 0) { alert('Please select seats to reserve.'); return; }

        const payload = {
            busId, date,
            seats: trackingSelectedSeats,
            totalPrice: trackingSelectedSeats.length * targetedBus.price,
            passenger: {
                name: document.getElementById('pName').value,
                age: document.getElementById('pAge').value,
                gender: document.getElementById('pGender').value,
                phone: document.getElementById('pMobile').value,
                email: document.getElementById('pEmail').value
            }
        };
        sessionStorage.setItem('activeReservation', JSON.stringify(payload));
        window.location.href = 'payment.html';
    });
});