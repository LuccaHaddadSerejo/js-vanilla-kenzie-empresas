const createToast = (title, text) => {
    const body = document.querySelector('body')
    const toastWrapper = document.createElement('div')
    const toastDiv = document.createElement('div')
    const toastDivTwo = document.createElement('div')
    const toastTitle = document.createElement('h2')
    const toastParagraph = document.createElement('p')

    toastTitle.innerText = title
    toastParagraph.innerText = text

    toastWrapper.classList = 'toast_wrapper animation-1'
    toastDiv.classList.add('toast_div') 
    toastDivTwo.classList.add('toast_div-2')
    toastParagraph.classList.add('toast_paragraph')

    if(title == 'O email já foi registrado!'){
        toastTitle.classList = 'toast_message_error'
        toastWrapper.classList = 'toast_wrapper background_error animation-1'
    }else if(title == 'Usuário ou senha incorretos!'){
        toastTitle.classList = 'toast_message_error'
        toastWrapper.classList = 'toast_wrapper background_error animation-1'
    }else{
        toastTitle.classList = 'toast_message_success'
        toastWrapper.classList = 'toast_wrapper background_sucess animation-1'
    }


    toastDivTwo.append(toastTitle)
    toastDiv.append(toastDivTwo)
    toastWrapper.append(toastDiv, toastParagraph)

    body.appendChild(toastWrapper)
}



export {createToast}