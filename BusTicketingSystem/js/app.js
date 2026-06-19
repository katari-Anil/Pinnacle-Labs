// js/app.js

const indianBuses = [
    { id: "IND-NK01", name: "KSRTC Ambaari Dream Class", source: "Bengaluru", destination: "Mumbai", departure: "04:00 PM", arrival: "08:00 AM", price: 1650, totalSeats: 24, bookedSeats: ["A1", "A2", "B1"] },
    { id: "IND-VRL02", name: "VRL Travels Multi-Axle Scania", source: "Bengaluru", destination: "Mumbai", departure: "07:30 PM", arrival: "11:30 AM", price: 1800, totalSeats: 24, bookedSeats: ["C3", "C4"] },
    { id: "IND-MSRTC03", name: "MSRTC Shivneri E-Bus", source: "Pune", destination: "Mumbai", departure: "06:00 AM", arrival: "10:00 AM", price: 520, totalSeats: 24, bookedSeats: [] },
    { id: "IND-NE04", name: "National Travels Volvo A/C", source: "Delhi", destination: "Jaipur", departure: "11:00 PM", arrival: "05:00 AM", price: 750, totalSeats: 24, bookedSeats: ["D1", "D2", "D3"] },
    { id: "IND-SRS05", name: "SRS Travels Sleeper", source: "Chennai", destination: "Bengaluru", departure: "10:15 PM", arrival: "05:30 AM", price: 900, totalSeats: 24, bookedSeats: ["A3"] }
];

if (!localStorage.getItem('buses')) {
    localStorage.setItem('buses', JSON.stringify(indianBuses));
}
if (!localStorage.getItem('bookings')) {
    localStorage.setItem('bookings', JSON.stringify([]));
}

function getBuses() { return JSON.parse(localStorage.getItem('buses')); }
function saveBuses(buses) { localStorage.setItem('buses', JSON.stringify(buses)); }
function getBookings() { return JSON.parse(localStorage.getItem('bookings')); }
function saveBooking(booking) {
    const bookings = getBookings();
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
}