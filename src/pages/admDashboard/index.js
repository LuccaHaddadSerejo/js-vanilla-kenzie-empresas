import { getLocalData } from "../../scripts/getLocalData.js"
import { createDepartment, deleteDepartment, deleteUser, editDepartment, editUser, fireUser, getAllDepartments, getAllUsers, getDepartmentByCompany, getUsersWithoutDepartment, hireUser, requestCompanies } from "../../scripts/request.js"

function verifyPermission(){
    const user = getLocalData('user')
    if(user == ""){
        window.location.replace('../../../index.html')
    }
}

verifyPermission()

function logOut(){
    const btn = document.getElementById('logoutBtnAdm')
    btn.addEventListener('click', () =>{
        localStorage.removeItem('user')
        window.location.replace("../../../index.html")
    })
}

logOut()

async function selectCompany(){
    const getCompany = await requestCompanies()
    const select = document.getElementById('select_adm')
    getCompany.forEach(elt => {
        const option = document.createElement('option')
        option.classList = 'options'
        option.value = elt.uuid
        option.innerText = elt.name
        select.append(option)
    })  

    return select
}

selectCompany()

async function selectFilter(){
    const select = await selectCompany()
    const listDepartments = document.getElementById('departmentList')
    select.addEventListener('change', (event)=>{
        event.preventDefault()
        listDepartments.innerHTML = ''
        if (event.target.value != 'todos'){
            getApiData(getDepartmentByCompany(event.target.value))
        }else{
            getApiData(getAllDepartments())
        }
       
    });
}

selectFilter()

async function renderModalList(list, data){
    const allUsers = await getAllUsers()
    const departments = await getAllDepartments()
    const listUsers = document.getElementById('usersList')
    listUsers.innerHTML = ''
    list.innerHTML = ''
    allUsers.forEach(allUsers => {
        if(allUsers.department_uuid == data.uuid){
            const item = document.createElement('li')
            item.classList = 'modal_big_item flex_col justify_around'

            const title = document.createElement('h3')
            title.classList = 'modal_big_username'
            title.innerText = allUsers.username

            const job = document.createElement('span')
            job.classList = 'modal_big_job'
            job.innerText = allUsers.professional_level

            const company = document.createElement('span')
            company.classList = 'modal_big_company'
            departments.map(elt => {
                if(allUsers.department_uuid == elt.uuid){
                    company.innerText = elt.companies.name
                }
            })

            const deleteBtn = document.createElement('button')
            deleteBtn.classList = 'modal_big_delete_btn'
            deleteBtn.innerText = 'Desligar'

            deleteBtn.addEventListener('click', async ()=>{
                await fireUser(allUsers.uuid)
                list.innerHTML = ''
                renderModalList(list, data)
            })

            item.append(title, job, company, deleteBtn)
            list.append(item)
        }
    })
    renderAllUsers()
}

function newDepartment(){
    const btnCreate = document.getElementById('createDepBtn')
    btnCreate.addEventListener('click', async()=>{
        const main = document.getElementById('mainADM')
        const list = document.getElementById('departmentList')
    
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
        title.innerText = 'Criar departamento'
    
        const form = document.createElement('form')
        form.classList =  'modal_edit_form flex_col'
    
        const inputName = document.createElement('input')
        inputName.classList = 'input_login'
        inputName.placeholder = 'Nome do departamento'
        inputName.id = 'name'
    
        const inputDescription = document.createElement('input')
        inputDescription.classList = 'input_login'
        inputDescription.placeholder = 'Descrição'
        inputDescription.id = 'description'
    
        const select = document.createElement('select')
        select.classList = 'input_login'
        const getCompany = await requestCompanies()
        getCompany.forEach(elt => {
            const option = document.createElement('option')
            option.classList = 'options'
            option.name = 'company_uuid'
            option.value = elt.uuid
            option.innerText = elt.name
            select.append(option)
        })
      
        const buttonConfirm = document.createElement('button')
        buttonConfirm.classList = 'dropdown_btn-2 modal_edit_confirm_button'
        buttonConfirm.innerText = 'Criar o departamento'
    
        form.addEventListener('submit', async (event)=>{      
            event.preventDefault()
            const selectMain = await selectCompany()
            list.innerHTML = ''
            const elements = [...form.elements]
            const body = {}
            elements.forEach(elt =>{
                if(elt.tagName == "INPUT"){
                    body[elt.id] = elt.value
                }else if(elt.tagName == "SELECT"){
                    body['company_uuid'] = elt.value
                }
            })
            await createDepartment(body)
            console.log(select)
            if(select.value == selectMain.value){
                getApiData(getDepartmentByCompany(select.value))
            }else if (selectMain.value == 'todos'){
                getApiData(getAllDepartments())
            }else{
        
            }
            wrapper.classList.add('animation_closeModal')
            setTimeout(() => {      
                wrapper.remove()
            }, 400);  
            })   
        closeBtn.addEventListener('click', ()=>{
            wrapper.classList.add('animation_closeModal')
            setTimeout(() => {      
                wrapper.remove()
            }, 400);  
        })
    
        closeBtn.append(BtnImg)
        form.append(inputName, inputDescription, select, buttonConfirm)
        divOne.append(title, form)
        container.append(closeBtn, divOne, form)
        wrapper.append(container)
        main.append(wrapper)
    })
}

newDepartment()

function renderAllDepartments(arr){
    const list = document.getElementById('departmentList')
    const listUsers = document.getElementById('usersList')
    arr.forEach(elt =>{
        const item = document.createElement('li')
        item.classList = 'list_item flex_col'

        const itemDivOne = document.createElement('div')
        itemDivOne.classList = 'list_div-1 flex_col'

        const itemTitle = document.createElement('h2')
        itemTitle.classList = 'item_title'
        itemTitle.innerText = elt.name

        const itemDescription = document.createElement('span')
        itemDescription.classList = 'item_description'
        itemDescription.innerText = elt.description

        const itemCompany = document.createElement('span')
        itemCompany.classList = 'item_company'
        itemCompany.innerText = elt.companies.name

        const itemDivTwo = document.createElement('div')
        itemDivTwo.classList = 'list_div-2 flex_row align_center justify_center'

        const itemBtnOne = document.createElement('button')
        itemBtnOne.classList = 'list_button'
        itemBtnOne.addEventListener('click', async (event)=>{
            event.preventDefault()
            const main = document.getElementById('mainADM')

            const wrapper = document.createElement('div')
            wrapper.classList = 'modal_wrapper flex_row align_center justify_center'

            const container = document.createElement('div')
            container.classList = 'modal_big_container animation_popup'

            const sectionOne = document.createElement('section')
            sectionOne.classList = 'modal_big_section-1'

            const sectionOneDivOne = document.createElement('div')
            sectionOneDivOne.classList = 'modal_big_section-1_div-1'

            const sectionOneH2 = document.createElement('h2')
            sectionOneH2.classList = 'modal_big_title'
            sectionOneH2.innerText = elt.name

            const closeBtn = document.createElement('button')
            closeBtn.classList = 'modal_big_close_btn'

            const closeBtnImg = document.createElement('img')
            closeBtnImg.classList = ''
            closeBtnImg.src = '../../assets/img/XBlack.svg'

            const SectionOneDivTwo = document.createElement('div')
            SectionOneDivTwo.classList = 'modal_big_section-1_div-2 flex_row'

            const SectionOneDivTwoDivOne = document.createElement('div')
            SectionOneDivTwoDivOne.classList = 'modal_big_section-1_div-2_div-1 flex_col'

            const sectionOneH3 = document.createElement('h3')
            sectionOneH3.classList = 'modal_big_section-1_div-2_div-1_h3'
            sectionOneH3.innerText = elt.description

            const sectionOneH4 = document.createElement('h4')
            sectionOneH4.classList = 'modal_big_section-1_div-2_div-1_h4' 
            sectionOneH4.innerText = elt.companies.name

            const SectionOneDivTwoDivTwo = document.createElement('div')
            SectionOneDivTwoDivTwo.classList = 'modal_big_section-1_div-2_div-2 flex_col align_end'

            const sectionOneSelect = document.createElement('select')
            sectionOneSelect.classList = 'modal_big_select'
            const optionUserhidden = document.createElement('option')
            optionUserhidden.innerText = 'Selecionar Usuário'
            optionUserhidden.hidden = true
            sectionOneSelect.append(optionUserhidden)

            const usersWithoutDepartment = await getUsersWithoutDepartment()
            usersWithoutDepartment.forEach(user =>{
                const optionUser = document.createElement('option')
                optionUser.innerText = user.username
                optionUser.value = user.uuid

                sectionOneSelect.append(optionUser)
            })

            sectionOneSelect.addEventListener('change', async (event)=>{
                let userID = await event.target.value
                localStorage.setItem('userID', JSON.stringify(userID))
            })

            const hireBtn = document.createElement('button')
            hireBtn.classList = 'modal_big_hire_btn' 
            hireBtn.innerText = 'Contratar'

            hireBtn.addEventListener('click', async ()=>{        
                const body = {}
                body['user_uuid'] = getLocalData('userID')
                body['department_uuid'] = elt.uuid
                await hireUser(body)
                renderModalList(sectionTwoList, elt)    
            })

            const sectionTwo = document.createElement('section')
            sectionTwo.classList = 'modal_big_section-2'

            const sectionTwoDiv = document.createElement('div')
            sectionTwoDiv.classList = 'modal_big_section-2_div-1'

            const sectionTwoList = document.createElement('ul')
            sectionTwoList.classList = 'modal_big_ul flex_row align_start'

            renderModalList(sectionTwoList, elt)

            closeBtn.addEventListener('click', ()=> {
                wrapper.classList.add('animation_closeModal')
                setTimeout(() => {      
                    wrapper.remove()
                }, 400);  
            })

            closeBtn.append(closeBtnImg)
            SectionOneDivTwoDivOne.append(sectionOneH3, sectionOneH4)
            SectionOneDivTwoDivTwo.append(sectionOneSelect, hireBtn)
            SectionOneDivTwo.append(SectionOneDivTwoDivOne, SectionOneDivTwoDivTwo)
            sectionOneDivOne.append(sectionOneH2, closeBtn)
            sectionOne.append(sectionOneDivOne, SectionOneDivTwo)
            sectionTwoDiv.append(sectionTwoList)
            sectionTwo.append(sectionTwoDiv)
            container.append(sectionOne, sectionTwo)
            wrapper.append(container)
            main.append(wrapper)
        })

        const itemBtnTwo = document.createElement('button')
        itemBtnTwo.classList = 'list_button'

        itemBtnTwo.addEventListener('click', ()=>{
            const main = document.getElementById('mainADM')
            
        
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
                
            const form = document.createElement('form')
            form.classList =  'modal_edit_form flex_col'
        
            const title = document.createElement('h2')
            title.classList = 'modal_edit_title'
            title.innerText = 'Editar departamento'

            const text = document.createElement('textarea')
            text.classList = 'input_modal_textArea'
            text.value = elt.description
      
            
            const buttonConfirm = document.createElement('button')
            buttonConfirm.classList = 'dropdown_btn-2 modal_edit_confirm_button'
            buttonConfirm.innerText = 'Salvar alterações'
        
            form.addEventListener('submit', async (event)=>{
                event.preventDefault()
                list.innerHTML = ''
                const elements = [...form.elements]
                const body = {}
                elements.forEach(elt =>{
                    if(elt.tagName != "BUTTON"){
                        body['description'] = elt.value
                    }
                })
                await editDepartment(body, elt.uuid)
                getApiData(getAllDepartments())
                wrapper.classList.add('animation_closeModal')
                setTimeout(() => {      
                    wrapper.remove()
                }, 400);  
            })
        
            closeBtn.addEventListener('click', ()=>{
                wrapper.classList.add('animation_closeModal')
                setTimeout(() => {      
                    wrapper.remove()
                }, 400);  
            })
        
            closeBtn.append(BtnImg)
            form.append(text, buttonConfirm)
            divOne.append(title)
            container.append(closeBtn, divOne, form)
            wrapper.append(container)
            main.append(wrapper)
        })  

        const itemBtnThree = document.createElement('button')
        itemBtnThree.classList = 'list_button'
        itemBtnThree.addEventListener('click', ()=>{
            const main = document.getElementById('mainADM')
            const list = document.getElementById('departmentList')
        
            const wrapper = document.createElement('div')
            wrapper.classList = 'modal_wrapper flex_row align_center justify_center'
        
            const container = document.createElement('div')
            container.classList = 'modal_delete_container flex_col justify_center align_center animation_popup'
        
            const closeBtn = document.createElement('button')
            closeBtn.classList = 'modal_delete_close_btn'
        
            const BtnImg = document.createElement('img')
            BtnImg.src = '../../assets/img/XBlack.svg'
        
            const divOne = document.createElement('div')
            divOne.classList = 'modal_delete_user_div-1 flex_col'
                
            const title = document.createElement('h2')
            title.classList = 'modal_delete_title'
            title.innerText = `Realmente deseja deletar o Departamento ${elt.name} e demitir seus funcionários?`
      
            
            const buttonConfirm = document.createElement('button')
            buttonConfirm.classList = 'dropdown_btn-2 modal_delete_confirm_button'
            buttonConfirm.innerText = 'Confirmar'
        
            buttonConfirm.addEventListener('click', async()=>{
                list.innerHTML = ''
                listUsers.innerHTML = ''
                await deleteDepartment(elt.uuid)
                getApiData(getAllDepartments())
                renderAllUsers()
                wrapper.classList.add('animation_closeModal')
                setTimeout(() => {      
                    wrapper.remove()
                }, 400);  
            })

            closeBtn.addEventListener('click', ()=>{
                wrapper.classList.add('animation_closeModal')
                setTimeout(() => {      
                    wrapper.remove()
                }, 400);  
            })
        
            closeBtn.append(BtnImg)
            divOne.append(title, buttonConfirm)
            container.append(closeBtn, divOne)
            wrapper.append(container)
            main.append(wrapper)
        })

        const buttonImgOne = document.createElement('img')
        buttonImgOne.classList = 'eye_img'
        buttonImgOne.src = '../../assets/img/eyeBlue.svg'

        const buttonImgTwo = document.createElement('img')
        buttonImgTwo.classList = 'pen_img'
        buttonImgTwo.src = '../../assets/img/penBlack.svg'

        const buttonImgThree = document.createElement('img')
        buttonImgThree.classList = 'trash_img'
        buttonImgThree.src = '../../assets/img/trashBlack.svg'

        itemBtnOne.append(buttonImgOne)
        itemBtnTwo.append(buttonImgTwo)
        itemBtnThree.append(buttonImgThree)
        itemDivOne.append(itemTitle, itemDescription, itemCompany)
        itemDivTwo.append(itemBtnOne, itemBtnTwo, itemBtnThree)
        item.append(itemDivOne, itemDivTwo)
        list.append(item)
    })
}

async function getApiData(data){
    const dataAPI = await data
    renderAllDepartments(dataAPI)
}

getApiData(getAllDepartments())

async function renderAllUsers(){
    const users = await getAllUsers()
    const departments = await getAllDepartments()
    const listUsers = document.getElementById('usersList')
    users.forEach(user =>{
        if(user.username != 'ADMIN'){ 
        const item = document.createElement('li')
        item.classList = 'list_item flex_col'

        const itemDivOne = document.createElement('div')
        itemDivOne.classList = 'list_div-1 flex_col'

        const itemTitle = document.createElement('h2')
        itemTitle.classList = 'item_title'
        itemTitle.innerText = user.username

        const itemDescription = document.createElement('span')
        itemDescription.classList = 'item_description'
        itemDescription.innerText = user.professional_level

        const itemCompany = document.createElement('span')
        itemCompany.classList = 'item_company'
        departments.map(elt => {
            if(user.department_uuid == elt.uuid){
                itemCompany.innerText = elt.companies.name
            }
        })
        const itemDivTwo = document.createElement('div')
        itemDivTwo.classList = 'list_div-2 flex_row align_center justify_center'

        const itemBtnTwo = document.createElement('button')
        itemBtnTwo.classList = 'list_button'
        itemBtnTwo.addEventListener('click', ()=>{
            const main = document.getElementById('mainADM')

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
            title.innerText = 'Editar Usuário'
                
            const form = document.createElement('form')
            form.classList =  'modal_edit_form flex_col'

            const selectOne = document.createElement('select')
            selectOne.classList = 'options_modal_select input_login'
            selectOne.id = 'jobType'

            const selectOneOptionOne = document.createElement('option')
            selectOneOptionOne.classList = 'options_modal_select'
            selectOneOptionOne.innerText = 'Selecionar modalidade de trabalho'
            selectOneOptionOne.hidden = true

            const selectOneOptionTwo = document.createElement('option')
            selectOneOptionTwo.classList = 'options_modal_select'
            selectOneOptionTwo.innerText = 'Presencial'
            selectOneOptionTwo.value = "presencial"

            const selectOneOptionThree = document.createElement('option')
            selectOneOptionThree.classList = 'options_modal_select'
            selectOneOptionThree.innerText = 'Híbrido'
            selectOneOptionThree.value = "hibrido"

            const selectOneOptionFour = document.createElement('option')
            selectOneOptionFour.classList = 'options_modal_select'
            selectOneOptionFour.innerText = 'Home Office'
            selectOneOptionFour.value = 'home office'

            const selectTwo = document.createElement('select')
            selectTwo.classList = 'options_modal_select input_login'
            selectTwo.id = 'jobLevel'

            const selectTwoOptionOne = document.createElement('option')
            selectTwoOptionOne.classList = 'options_modal_select'
            selectTwoOptionOne.innerText = 'Selecionar nível profissional'
            selectTwoOptionOne.hidden = true

            const selectTwoOptionTwo = document.createElement('option')
            selectTwoOptionTwo.classList = 'options_modal_select'
            selectTwoOptionTwo.innerText = 'Estágio'
            selectTwoOptionTwo.value = "estágio"

            const selectTwoOptionThree = document.createElement('option')
            selectTwoOptionThree.classList = 'options_modal_select'
            selectTwoOptionThree.innerText = 'Júnior'
            selectTwoOptionThree.value = "júnior"

            const selectTwoOptionFour = document.createElement('option')
            selectTwoOptionFour.classList = 'options_modal_select'
            selectTwoOptionFour.innerText = 'Pleno'
            selectTwoOptionFour.value = 'pleno'

            const selectTwoOptionFive = document.createElement('option')
            selectTwoOptionFive.classList = 'options_modal_select'
            selectTwoOptionFive.innerText = 'Sênior'
            selectTwoOptionFive.value = 'sênior'

            const buttonConfirm = document.createElement('button')
            buttonConfirm.classList = 'dropdown_btn-2 modal_edit_confirm_button'
            buttonConfirm.innerText = 'Editar perfil'
        
            form.addEventListener('submit', async (event)=>{
                event.preventDefault()
                listUsers.innerHTML = ''
                const elements = [...form.elements]
                const body = {}
                elements.forEach(elt =>{
                    if(elt.id == "jobType"){
                        body['kind_of_work'] = elt.value
                    }else if(elt.id == "jobLevel"){
                        body['professional_level'] = elt.value 
                    }
                })
                await editUser(body, user.uuid)
                renderAllUsers()
                wrapper.classList.add('animation_closeModal')
                setTimeout(() => {      
                    wrapper.remove()
                }, 400);  
            })
        
            closeBtn.addEventListener('click', ()=>{
                wrapper.classList.add('animation_closeModal')
                setTimeout(() => {      
                    wrapper.remove()
                }, 400);  
            })
        
            closeBtn.append(BtnImg)
            selectOne.append(selectOneOptionOne, selectOneOptionTwo, selectOneOptionThree, selectOneOptionFour)
            selectTwo.append(selectTwoOptionOne, selectTwoOptionTwo, selectTwoOptionThree, selectTwoOptionFour, selectTwoOptionFive)
            form.append(selectOne, selectTwo, buttonConfirm)
            divOne.append(title)
            container.append(closeBtn, divOne, form)
            wrapper.append(container)
            main.append(wrapper)

        })

        const itemBtnThree = document.createElement('button')
        itemBtnThree.classList = 'list_button'
        itemBtnThree.addEventListener('click', ()=>{
            const main = document.getElementById('mainADM')
         
        
            const wrapper = document.createElement('div')
            wrapper.classList = 'modal_wrapper flex_row align_center justify_center'
        
            const container = document.createElement('div')
            container.classList = 'modal_delete_container flex_col justify_center align_center animation_popup'
        
            const closeBtn = document.createElement('button')
            closeBtn.classList = 'modal_delete_close_btn'
        
            const BtnImg = document.createElement('img')
            BtnImg.src = '../../assets/img/XBlack.svg'
        
            const divOne = document.createElement('div')
            divOne.classList = 'modal_delete_user_div-1 flex_col'
                
            const title = document.createElement('h2')
            title.classList = 'modal_delete_title'
            title.innerText = `Realmente deseja remover o usuário ${user.username}?`
      
            
            const buttonConfirm = document.createElement('button')
            buttonConfirm.classList = 'dropdown_btn-2 modal_delete_confirm_button'
            buttonConfirm.innerText = 'Deletar'
        
            buttonConfirm.addEventListener('click', async()=>{
                listUsers.innerHTML = ''
                await deleteUser(user.uuid)
                renderAllUsers()
                wrapper.classList.add('animation_closeModal')
                setTimeout(() => {      
                    wrapper.remove()
                }, 400);  
            })

            closeBtn.addEventListener('click', ()=>{
                wrapper.classList.add('animation_closeModal')
                setTimeout(() => {      
                    wrapper.remove()
                }, 400);  
            })
        
            closeBtn.append(BtnImg)
            divOne.append(title, buttonConfirm)
            container.append(closeBtn, divOne)
            wrapper.append(container)
            main.append(wrapper)
        })

        const buttonImgTwo = document.createElement('img')
        buttonImgTwo.classList = 'pen_img'
        buttonImgTwo.src = '../../assets/img/penBlack.svg'

        const buttonImgThree = document.createElement('img')
        buttonImgThree.classList = 'trash_img'
        buttonImgThree.src = '../../assets/img/trashBlack.svg'
    

        itemBtnTwo.append(buttonImgTwo)
        itemBtnThree.append(buttonImgThree)
        itemDivOne.append(itemTitle, itemDescription, itemCompany)
        itemDivTwo.append(itemBtnTwo, itemBtnThree)
        item.append(itemDivOne, itemDivTwo)
        listUsers.append(item)
        }    
    })
}

renderAllUsers()

export{
    selectCompany,
    selectFilter,
}

