import { createNewUser } from "../../scripts/request.js"

function redirect(){
    const loginBtnHeader = document.getElementById('redirectLoginBtnHeader')
    const homeBtn = document.getElementById('redirectHomeBtn')
    const loginBtn = document.getElementById('redirectLoginBtn')
    const btnDropDownHome = document.getElementById('dropDownRedirectHome')
    const btnDropDownLogin = document.getElementById('dropDownRedirectLogin')
    

    loginBtnHeader.addEventListener('click', () =>{
        window.location.replace('../login/index.html')
    })

    homeBtn.addEventListener('click', () =>{
        window.location.replace('../../../index.html')
    })

    loginBtn.addEventListener('click', () =>{
        window.location.replace('../login/index.html')
    })

    
    btnDropDownLogin.addEventListener('click', ()=>{
        window.location.replace('../login/index.html')
    })

    btnDropDownHome.addEventListener('click', ()=>{
        window.location.replace('../../../index.html') 
    })
}

redirect()

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

function dropDownMenu(){
    const btn = document.querySelector('.header_mobile_btn')
    
    btn.addEventListener('click', ()=>{
        const dropDownMenu = document.querySelector('.dropdown_full')
        dropDownMenu.classList.toggle('hidden')
    })
}

dropDownMenu()

