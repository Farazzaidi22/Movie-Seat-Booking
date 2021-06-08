const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(Occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')
let ticketPrice = +movieSelect.value //for converting from string to int

// console.log(ticketPrice)

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