const previusOperetionsText = document.querySelector("#previus-operation")
const currentOperetionsText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")


class Calculator{
    constructor(previusOperetionsText,currentOperetionsText) {
        this.previusOperetionsText = previusOperetionsText
        this.currentOperetionsText = currentOperetionsText
        this.currentOperetion = ""
    }
// add digit to calculator screen
    addDigit(digit){
        if(digit === "." && this.currentOperetionsText.innerText.includes(".")){
            return
        }
        
        this.currentOperetion = digit
        this.updateScreen()
    }

    processOperation(operation){

        if(this.currentOperetionsText.innerText ==="" && operation !== "C"){
            if(this.previusOperetionsText.innerText !== ""){
                this.changeOperetion(operation)
            }
            return
        }
        
        let operationValue
        const previus = +this.previusOperetionsText.innerText.split(" ")[0]
        const current = +this.currentOperetionsText.innerText

        switch(operation){
            case "+":
                operationValue = previus + current
                this.updateScreen(operationValue,operation,current,previus)
                break
            case "-":
                operationValue = previus - current
                this.updateScreen(operationValue,operation,current,previus)
                break
            case "/":
                operationValue = previus / current
                this.updateScreen(operationValue,operation,current,previus)
                break
            case "*":
                operationValue = previus * current
                this.updateScreen(operationValue,operation,current,previus)
                break
            case "DEL":
                this.processDelOperator()
                break
            case "C":
                this.cOperetion()
                break
            case "CE":
                this.ceOperetion()
                break
            case "=":
                this.processEqual()
                break
            default:
                return
        }


    }
    
    updateScreen(operationValue = null,operation = null,current = null,previus = null){
        console.log(operationValue,operation,current,previus)

        if(operationValue===null){
            this.currentOperetionsText.innerText += this.currentOperetion
        }else{
            if(previus===0){
                operationValue= current
            }
            this.previusOperetionsText.innerText = `${operationValue} ${operation}`
            this.currentOperetionsText.innerText = ""
        }
        
    }


    changeOperetion(operation){
        const mathOpereton = ["*","/","+","-"]

        if(!mathOpereton.includes(operation)){
            return
        }

        this.previusOperetionsText.innerText = this.previusOperetionsText.innerText.slice(0,-1) + operation
    }


    processDelOperator(){
        this.currentOperetionsText.innerText = this.currentOperetionsText.innerText.slice(0, -1)
    }

    ceOperetion(){
        this.currentOperetionsText.innerText = ""
    }

    cOperetion(){
        this.currentOperetionsText.innerText = ""
        this.previusOperetionsText.innerText = ""
    }

    processEqual(){
        const operation = previusOperetionsText.innerText.split(" ")[1]
        this.processOperation(operation)

        this.currentOperetionsText.innerText = this.previusOperetionsText.innerText.slice(0,-1)
        this.previusOperetionsText.innerText = ""

    }
}

const calc = new Calculator(previusOperetionsText,currentOperetionsText)

buttons.forEach((btn) =>{
    btn.addEventListener("click",(e)=>{
        const value = e.target.innerText

        if(+value >= 0 || value === "." ){
            calc.addDigit(value)
        }else{
            calc.processOperation(value)
        }

    })
})