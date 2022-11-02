import { userLogin } from "../../scripts/request.js";

function redirect(){
    const registerBtnHeader = document.getElementById('redirectRegisterBtnHeader')
    const homeBtn = document.getElementById('redirectHomeBtn')
    const registerBtn = document.getElementById('redirectRegisterBtn')
    const btnDropDownHome = document.getElementById('dropDownRedirectHome')
    const btnDropDownRegister = document.getElementById('dropDownRedirectRegister')

    registerBtnHeader.addEventListener('click', () =>{
        window.location.replace('../register/index.html')
    })

    registerBtn.addEventListener('click', () =>{
        window.location.replace('../register/index.html')
    })

    homeBtn.addEventListener('click', () =>{    
        window.location.replace('../../../index.html')   
    })

    
    btnDropDownHome.addEventListener('click', ()=>{
        window.location.replace('../../../index.html')
    })

    btnDropDownRegister.addEventListener('click', ()=>{   
        window.location.replace('../register/index.html')
    })
}

redirect()

function logIn(){
    const form = document.querySelector('.login_form')
    
    form.addEventListener('submit', async (event)=>{
        event.preventDefault()
        const elements = [...form.elements]
        const body = {}
        elements.forEach(elt => {
            if(elt.value.length > 0){
                body[elt.id] = elt.value
            }
        })
        await userLogin(body)
    })
}

logIn()

function dropDownMenu(){
    const btn = document.querySelector('.header_mobile_btn')
    
    btn.addEventListener('click', ()=>{
        const dropDownMenu = document.querySelector('.dropdown_full')
        dropDownMenu.classList.toggle('hidden')
    })
}

dropDownMenu()
