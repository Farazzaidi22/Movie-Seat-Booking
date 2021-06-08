const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(Occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')
let ticketPrice = +movieSelect.value //for converting from string to int

// console.log(ticketPrice)

populateUI()

//update total and count
function updateSelectedCount(){
    const selectedSeats =  document.querySelectorAll('.row .seat.Selected')
    
    const seatsIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat)
    })
    
    //local storage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))


    const selectedSeatsCount = selectedSeats.length

    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice
}

//save selected movie index and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)

}

//get data from localstorage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('Selected')
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex
    }
}

//movie select event
movieSelect.addEventListener('change', e=>{
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()
})


//Seat click event
container.addEventListener('click', e=> {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('Occupied')){
        e.target.classList.toggle('Selected')
        updateSelectedCount()
    }
})

//initial count and total set
updateSelectedCount()