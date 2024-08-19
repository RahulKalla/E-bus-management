const db = firebase.firestore();

document.getElementById('addBusForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const busNumber = document.getElementById('busNumber').value;
    const busCapacity = parseInt(document.getElementById('busCapacity').value);

    db.collection('buses').add({
        busNumber: busNumber,
        capacity: busCapacity
    })
    .then(() => {
        document.getElementById('busNumber').value = '';
        document.getElementById('busCapacity').value = '';
        alert('Bus added successfully!');
    })
    .catch(error => {
        console.error('Error adding bus: ', error);
    });
});


function displayBuses() {
    const busList = document.getElementById('busList');
    busList.innerHTML = ''; 

    db.collection('buses').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const bus = doc.data();
            const busItem = document.createElement('div');
            busItem.textContent = `${bus.busNumber} - Capacity: ${bus.capacity}`;
            busList.appendChild(busItem);
        });
    });
}
displayBuses();
