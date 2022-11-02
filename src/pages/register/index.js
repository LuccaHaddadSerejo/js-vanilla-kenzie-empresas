import { createNewUser } from "../../scripts/request.js"

function redirect(){
    const loginBtn = document.getElementById('redirectLoginBtn')
    const homeBtn = document.getElementById('redirectHomeBtn')

    loginBtn.addEventListener('click', () =>{
        window.location.replace('../login/index.html')
    })

    homeBtn.addEventListener('click', () =>{
        window.location.replace('../../../index.html')
    })
}

function registerUser(){
    const form = document.querySelector('.register_form')
    
    form.addEventListener('submit', async (event)=>{
        event.preventDefault()
        const elements = [...form.elements]
        const body = {}
        elements.forEach(elt => {
            if(elt.tagName != "BUTTON"){
                body[elt.id] = elt.value
            }
        })
        await createNewUser(body)
    })
}

registerUser()
redirect()