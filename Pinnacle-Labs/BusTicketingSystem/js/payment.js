// js/payment.js
document.addEventListener('DOMContentLoaded', () => {
    const data = JSON.parse(sessionStorage.getItem('activeReservation'));
    if(!data) { window.location.href = 'index.html'; return; }

    document.getElementById('payableDisplay').innerText = `Total Amount Due: ₹${data.totalPrice}`;

    const selector = document.getElementById('gatewaySelector');
    const container = document.getElementById('dynamicInputContainer');

    selector.addEventListener('change', (e) => {
        if(e.target.value === 'card') {
            container.innerHTML = `
                <div class="form-group"><label>16-Digit Card Number</label><input type="text" pattern="[0-9]{16}" placeholder="4321 8765 9811 0000" required></div>
                <div class="grid-2">
                    <div class="form-group"><label>Expiry Date</label><input type="text" placeholder="MM/YY" required></div>
                    <div class="form-group"><label>CVV Secured Token</label><input type="password" pattern="[0-9]{3}" placeholder="***" required></div>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="form-group"><label>Virtual Payment Address (VPA / UPI ID)</label><input type="text" placeholder="passenger@upi" required></div>
            `;
        }
    });

    document.getElementById('paymentForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const loader = document.getElementById('loader');
        const text = document.getElementById('loaderText');
        
        loader.style.display = 'flex';

        setTimeout(() => { text.innerText = "Verifying Account Assertions & Balance Metrics..."; }, 1200);
        setTimeout(() => { text.innerText = "Finalizing Secure Ledger Reservation Entry..."; }, 2400);

        setTimeout(() => {
            const systemBuses = getBuses();
            const busInstance = systemBuses.find(b => b.id === data.busId);
            busInstance.bookedSeats.push(...data.seats);
            saveBuses(systemBuses);

            const dynamicPNR = 'IN-PNR-' + Math.floor(1000000 + Math.random() * 9000000);
            const bookingRecord = {
                id: dynamicPNR,
                ...data,
                status: 'Confirmed',
                timestamp: new Date().toLocaleString('en-IN', { timeZone: 'IST' })
            };

            saveBooking(bookingRecord);
            sessionStorage.removeItem('activeReservation');
            window.location.href = `confirmation.html?pnr=${dynamicPNR}`;
        }, 3600); // 3.6 second multi-stage animated execution sequence
    });
});