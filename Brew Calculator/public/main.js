// main.js
const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ => {
  // Send PUT Request here
  
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            name:'Vass',
            quote: 'Did I ever tell you what the definition of inssanity is? Insanity is doing the exact... same fucking thing... ...'
        })
    })
    .then( res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
  })

  deleteButton.addEventListener('click', _ => {
    fetch('quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify ({
            name: 'Vass'
        })
    })
        .then(res => {
            if (res.okay) return res.json()
        })
        .then(response => {
            if ( response === 'INSUFFICIENT QUOTES') {
                messageDiv.textContent = `INSUFFICIENT QUOTES`
            } else {
                window.location.reload(true)
            }
        })
            .catch(console.error)
        })
