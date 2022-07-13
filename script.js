let B7validator = {
    handleSubmit:(event) => {
        event.preventDefault()
        let send = true 

        let inputs = form.querySelectorAll('input')

        B7validator.clearErrors()

        for(let i = 0; i < inputs.length; i++) {
            let input = inputs[i]
            let check = B7validator.checkInput(input)

            if(check !== true) {
                send = false
                B7validator.showError(input, check)
            }
        }

        if(send) {
            form.submit()
        }
    },

    checkInput:(input) => {
        let rules = input.getAttribute('data-rules')

        if(rules !== null) {
            rules = rules.split('|')
            for(let k in rules) {
                let rDetails = rules[k].split('=')

                min = 2

                switch (rDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'Este campo é obrigatório'
                        } 
                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]) {
                            return `Campo precisa ter pelo menos ${rDetails[1]} caracteres.`
                        }
                    break;
                    case 'email':
                        if(input.value !== '') {
                            let regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'O e-mail digitado não é válido'
                            }
                        }
                    break
                    default:
                }
            }
        }

        return true
    },

    showError:(input, error) => {
        input.style.borderColor = 'red'

        let errorElement = document.createElement('div')
        errorElement.classList.add('error')
        errorElement.innerHTML = error

        input.parentElement.insertBefore(errorElement, input.ElementSibling)
    },
    clearErrors:() => {
        let inputs = form.querySelectorAll('input')
        for(let i = 0; i < inputs.length; i++) {
            inputs[i].style = ''
        }

        let errorElements = document.querySelectorAll('.error')

        for(let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove()
        }
    }
}

let form = document.querySelector('.b7validator')
form.addEventListener('submit', B7validator.handleSubmit)
