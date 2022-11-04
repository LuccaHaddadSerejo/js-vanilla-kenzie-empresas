import { getUserData } from "../pages/userDashboard/index.js"
import { userEditProfile } from "./request.js"

function userEditProfileModal(){
    const section = document.getElementById('sectionTwoUser')
    const main = document.getElementById('mainUser')

    const wrapper = document.createElement('div')
    wrapper.classList = 'modal_wrapper flex_row align_center justify_center'

    const container = document.createElement('div')
    container.classList = 'modal_edit_container flex_col animation_popup'

    const closeBtn = document.createElement('button')
    closeBtn.classList = 'modal_close_btn'

    const BtnImg = document.createElement('img')
    BtnImg.src = '../../assets/img/XBlack.svg'

    const divOne = document.createElement('div')
    divOne.classList = 'flex_col modal_edit_user_div-1'

    const title = document.createElement('h2')
    title.classList = 'modal_edit_title'
    title.innerText = 'Edital perfil'

    const form = document.createElement('form')
    form.classList =  'modal_edit_form flex_col'

    const inputName = document.createElement('input')
    inputName.classList = 'input_login'
    inputName.placeholder = 'Seu nome'
    inputName.id = 'username'

    const inputEmail = document.createElement('input')
    inputEmail.classList = 'input_login'
    inputEmail.placeholder = 'Seu e-mail'
    inputEmail.id = 'email'
    inputEmail.type = 'email'

    const inputPassword = document.createElement('input')
    inputPassword.classList = 'input_login' 
    inputPassword.placeholder = 'Sua senha'
    inputPassword.id = 'password'
    inputPassword.type = 'password'
    
    const buttonConfirm = document.createElement('button')
    buttonConfirm.classList = 'dropdown_btn-2 modal_edit_confirm_button'
    buttonConfirm.innerText = 'Editar Perfil'

    form.addEventListener('submit', async (event)=>{
        event.preventDefault()
        section.innerHTML = ''
        const elements = [...form.elements]
        const body = {}
        elements.forEach(elt =>{
            if(elt.value.length > 0){
                body[elt.id] = elt.value
            }
        })
        await userEditProfile(body)
        getUserData()
        wrapper.remove()
    })
    
    closeBtn.addEventListener('click', ()=>{
        container.classList.add('animation_closeModal')
        setTimeout(() => {  
            wrapper.remove()  
        }, 300);      
    })

    closeBtn.append(BtnImg)
    form.append(inputName, inputEmail, inputPassword, buttonConfirm)
    divOne.append(title, form)
    container.append(closeBtn,divOne, form)
    wrapper.append(container)
    main.append(wrapper)
}

export{
    userEditProfileModal,
}
