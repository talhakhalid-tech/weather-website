const form = document.querySelector('form')
const term = document.querySelector('input')

const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

form.addEventListener('submit', (event) => {
    event.preventDefault()

    message1.textContent='Loading!!!'
    message2.textContent=''

    fetch('http://localhost:3000/weather?address='+term.value).then((response) => {
    response.json().then((data) =>{
        if(data.error){
            message1.textContent = data.error
            message2.textContent = ''
        } else {
        message1.textContent=data.location
        message2.textContent=data.forecast
        }
    })
})
})