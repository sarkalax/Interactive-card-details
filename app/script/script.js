let holderNameCard = document.querySelector("#holderNameCard"),
    cardNumberCard = document.querySelector("#cardNumberCard"),
    expiracyMonthCard = document.querySelector("#expiracyMonthCard"),
    expiracyYearCard = document.querySelector("#expiracyYearCard"),
    cvcCard = document.querySelector("#cvcCard");
let holderName = document.querySelector("#holderName"),
    cardNumber = document.querySelector("#cardNumber"),
    expiracyMonth = document.querySelector("#expiracyMonth"),
    expiracyYear = document.querySelector("#expiracyYear"),
    cvc = document.querySelector("#cvc");
    
    
    holderName.addEventListener("input", (event) => {
        holderNameCard.textContent = event.target.value
    })

    cardNumber.addEventListener("input", (event) => {
        event.target.value = event.target.value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim()
        
        cardNumberCard.textContent = event.target.value
    })

    expiracyMonth.addEventListener("input", (event) => {
        event.target.value = event.target.value.replace(/[^\d]/g, '')
        
        expiracyMonthCard.textContent = event.target.value
    })
    
    expiracyMonth.addEventListener("change", () => {
        if (expiracyMonth.value.length == 1) {
            let month = []
            month.push(expiracyMonth.value)
            expiracyMonth.value = `0${month[0]}`
            expiracyMonthCard.textContent= `0${month[0]}`
        }
        // if (expiracyMonth.value.length > 2) {
        //     expiracyMonth.value = "12"
        // }
    })

    expiracyYear.addEventListener("input", (event) => {
        expiracyYearCard.textContent = event.target.value
        
        event.target.value = event.target.value.replace(/[^\d]/g, '')
    })
    cvc.addEventListener("input", (event) => {
        event.target.value = event.target.value.replace(/[^\d]/g, '')
        
        cvcCard.textContent = event.target.value
    })
    
    const thankU = document.querySelector("#thankU")
    
    let validity

    //po submitu kontroluje inputy
    let form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        
        event.preventDefault() 
        
        validity = 0;
        checkInputs()

        if (validity === 5) { //tzn. jsou-li všechny validní
            thankUPage()      // přejde na další stránku
            console.log("🥳")
        }
        
    })

    //zpátky na vyplňovací stránku
    const backBttn = document.querySelector("#backBttn")

    backBttn.addEventListener("click", () => {
        location.reload()
        holderName.focus()
    })
    
    //checkInputs
    function checkInputs() {
        if (holderName.value === "") {
            setError(holderName, "Name can't be blank")
        }
            else if (!isName(holderName.value)) {
                setError(holderName, "Please enter a valid name")
            }
            else if (isName(holderName.value)) {
                unsetError(holderName)
                validity++
            }

        if (cardNumber.value === "") {
            setError(cardNumber, "Number can't be blank")
        }
            else if (!isNumber(cardNumber.value)) { //pokud nevyhovuje podmínce
                setError(cardNumber,"Wrong format, numbers only (12-16 characters)")
            }         
            else if (isNumber(cardNumber.value)) { //pokud vyhovuje
                unsetError(cardNumber)
                validity++
            }
    

        if (expiracyMonth.value === "") {
            setError(expiracyMonth, "Date can't be blank")
        }
            else if (!isMonth(expiracyMonth.value)) {
                setError(expiracyMonth, "Please enter a valid date")

            }
            else if (isMonth(expiracyMonth.value)) {
                unsetError(expiracyMonth)
                validity++
            }

        if (expiracyYear.value === "") {
            setError(expiracyYear, "Date can't be blank")
        }
            else if (!isYear(expiracyYear.value)) {
                setError(expiracyYear, "Please enter a valid date")

            }
            else if (isYear(expiracyYear.value)) {
                unsetError(expiracyYear)
                validity++
            }

        if (cvc.value === "") {
            setError(cvc, "Cvc can't be blank")
        } 
            else if (!isCvcNumber(cvc.value) || cvc.value.length > 3) {
                setError(cvc, "Three numbers code")
            }
            else if (isCvcNumber(cvc.value)) {
                unsetError(cvc)
                validity++
            }

     
    }

    //regex podmínkové fce !!!! vrací true/false
    function isName(parTested) {
        let reg = /^\b[a-zA-z]+\s[a-zA-z]+\b$/

        return reg.test(parTested)
    }

    function isNumber(parTested) {
        let reg = /^[\d ]{15,19}$/     //kvůli mezerám
        
        return reg.test(parTested) 
    }

    function isMonth(parTested) {
        let reg =  /^0[1-9]|1[0-2]$/   //<01;12>

        return reg.test(parTested) 
    }
    function isYear(parTested) {
        let reg = /^2[0-9]|3[0-5]$/   //<20;35>

        return reg.test(parTested)
    }

    function isCvcNumber(parTested) {
        let reg = /^[0-9]{3}$/ 

        return reg.test(parTested)
    }


    //setError fce vypisuje chybovou hlášku
    function setError(parInput, parMessage) {
        const controlForm = parInput.parentElement, //vezme parenta inputu
        small = controlForm.querySelector("small"); //v něm vybere <small>
        
        small.innerText = parMessage;
        parInput.classList.add("errorBorder") //classa nastavuje rámeček

        parInput.focus()    //když je invalid focus na něj
    }

    //unsetError fce odebírá chybovou hlášku
    function unsetError(parInput) {
        const controlForm = parInput.parentElement,
              small = controlForm.querySelector("small")

        small.innerText = ""
        parInput.classList.remove("errorBorder") 
    }
    
    //thankUPage fce
    function thankUPage() {
        thankU.classList.remove("noDisplay")
        form.classList.add("noDisplay")
    }