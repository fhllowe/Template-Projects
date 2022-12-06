const groundWeight = document.querySelector("#groundWeight").value;
const ratio = document.querySelector('#ratio').value;

const coffeePouroverMaker  = (groundWeight, ratio) => { return {
    groundWeight: groundWeight,
    ratio: ratio,
    get waterWeight(){
        if (groundWeight && ratio) {
            return groundWeight * ratio
        }
    },

    get bloom (){
        return groundWeight * 2},
   get grindSize() {
       if (this.waterWeight >= 260 && typeof this.waterWeight === 'number'){
           return 'medium coarse'
       }
       else { 
           return 'medium'
       }
   },
    get recipe() {
        return `Start with ${groundWeight}g ground to ${this.grindSize}, heat up water to 93C, pour ${this.bloom}g of water into the grounds, wait for 30 seconds, and pour to ${this.waterWeight}g`
        },
    }
}

const kenyaAsali = coffeePouroverMaker(15, 15)
console.log (kenyaAsali.recipe)

const batchBrew = coffeePouroverMaker (30, 16)
console.log (batchBrew)
