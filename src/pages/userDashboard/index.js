import { getLocalData } from "../../scripts/getLocalData.js"
import { userEditProfileModal } from "../../scripts/modal.js"
import { getUserCoworkers, getUserDepartments, getUserInformation } from "../../scripts/request.js"

function verifyPermission(){
    const user = getLocalData('user')
    if(user == ""){
        window.location.replace('../../../index.html')
    }
}

verifyPermission()

function logOut(){
    const btn = document.getElementById('logoutBtn')
    btn.addEventListener('click', () =>{
        localStorage.removeItem('user')
        window.location.replace("../../../index.html")
    })
}

logOut()

async function getUserData(){
    const user = await getUserInformation()
    const section = document.querySelector('.section-2')
    const name = document.querySelector('.section-1_title')
    const email = document.querySelector('#userEmail')
    const job = document.querySelector('#userJob')
    const type =  document.querySelector('#userType')

    name.innerText = user.username
    email.innerText = user.email
    job.innerText = user.professional_level
    type.innerText = user.kind_of_work

    if(user.department_uuid == null){
        const empty = document.createElement('div')
        empty.classList = 'empty_list flex_row align_center justify_center'
        const message = document.createElement('span')
        message.classList = 'empty_list_span'
        message.innerText = 'Você ainda não foi contratado'
        empty.append(message)
        section.append(empty)
    }else{
        const coworkers = await getUserCoworkers()
        const depart = await getUserDepartments()
        const populated = document.createElement('div')
        populated.classList = 'populated_list'

        const populatedDivOne = document.createElement('div')
        populatedDivOne.classList = 'populated_list_div flex_row align_center justify_center'
        
        const populatedTitle = document.createElement('h2')
        populatedTitle.classList = 'populated_list_title'
        populatedTitle.innerText = `${depart.name} - ${depart.departments[0].name}`
        const completeList = document.createElement('ul')
        completeList.classList = 'full_list flex_row flex_wrap justify_evenly'

        coworkers.forEach(elt =>{
            const coUsers = elt.users
            coUsers.forEach(users => {
                const item = document.createElement('li')
                item.classList = 'list_item flex_col'
    
                const itemName = document.createElement('span')
                itemName.classList = 'list_item_span-1'
    
                const itemJob = document.createElement('span')
                itemJob.classList = 'list_item_span-2'
                itemName.innerText = users.username
                itemJob.innerText = users.professional_level
                item.append(itemName, itemJob)
                completeList.append(item)
            })    
        })

        populatedDivOne.append(populatedTitle)
        populated.append(populatedDivOne, completeList)
        section.append(populated)
    }
}

getUserData()

function editProfile(){
    const btn = document.getElementById('edit')
    btn.addEventListener('click', ()=>{
        userEditProfileModal()
    })
}

editProfile()




export{
    getUserData
}




