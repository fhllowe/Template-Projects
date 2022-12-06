// main.js
const calculate = document.querySelectorAll('#calculate')
const deleteParam = document.querySelectorAll('.fa-trash')
const thumbParam = document.querySelectorAll('.fa-thumbs-up')

Array.from(calculate).forEach((element) => {
    element.addEventListener('click', calculateBrew)
})

Array.from(deleteParam).forEach((element)=>{
    element.addEventListener('click', deleteBrew)
})

//Array.from(thumbParam).forEach((element) => {
    //element.addEventListener('click', addLike)
//})


async function deleteBrew(){
    const country = this.parentNode.childNodes[1].innerText
    const region = this.parentNode.childNodes[2].innerText
    const estate = this.parentNode.childNodes[3].innerText
    const varietal = this.parentNode.childNodes[4].innerText
    const groundWeight = this.parentNode.childNodes[5].innerText
    const ratio = this.parentNode.childNodes[6].innerText
    const printBrew = this.parentNode.childNodes[7].innerText
    
    try{
        const response = await fetch('deleteBrew', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'country': country,
              'region': region,
              'estate': estate,
              'varietal': varietal,
              'groundWeight': groundWeight,
              'ratio': ratio,
              'printBrew': printBrew
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function calculateBrew(){
    const country = this.parentNode.childNodes[1].innerText
    const region = this.parentNode.childNodes[2].innerText
    const varietal = this.parentNode.childNodes[3].innerText
    const estate = this.parentNode.childNodes[4].innerText
    const groundWeight = Number(this.parentNode.childNodes[5].innerText)
    const ratio = Number(this.parentNode.childNodes[6].innerText)
    const printBrew = Number(this.parentNode.childNodes[7].innerText)
    try{
        const response = await fetch('calculateBrew', {
            method: 'put',
            header: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                'countryS': country,
                'regionS': region,
                'varietalS': varietal,
                'estateS': estate,
                'groundWeightS': groundWeight,
                'ratioS': ratio,
                'printBrewS': printBrew
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

