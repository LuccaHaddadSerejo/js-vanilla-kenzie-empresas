import { getLocalData } from "./getLocalData.js"
import { createToast } from "./toast.js"

const baseUrl = "http://localhost:6278"

async function requestSectors(){
    try{
        const data = await fetch(`${baseUrl}/sectors`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const dataJson = await data.json()
        return dataJson
    }catch(error){
        console.log(error)
    }
}

async function requestCompanies(){
    try{
        const data = await fetch(`${baseUrl}/companies`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const dataJson = await data.json()
        return dataJson
    }catch(error){
        console.log(error)
    }
}

async function requestCompaniesBySector(sector){
    try{
        const data = await fetch(`${baseUrl}/companies/${sector}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const dataJson = await data.json()
        return dataJson
    }catch(error){
        console.log(error)
    }
}

async function createNewUser(body){
    try{
        const data = await fetch(`${baseUrl}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        if(data.ok == true){
            createToast('Sua conta foi criada com sucesso!', 'Você será redirecionado para a página de login')
            setTimeout(() => {  
                window.location.replace('/src/pages/login/index.html')
            }, 4000);   
        }else{
            createToast('O email já foi registrado!', 'Tente novamente com outro e-mail')
        }
    }catch(error){
        console.log(error)
    }
}

async function userLogin(body){
    try{
        const data = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        if(data.ok == true){
            const resp = await data.json()
            localStorage.setItem('user', JSON.stringify(resp))
            checkForAdmin(getLocalData('user'))
        }else{
            createToast('Usuário ou senha incorretos!', 'Tente novamente ou crie uma conta')
        }
    }catch(error){
        console.log(error)
    }
}

async function checkForAdmin(object){
    try{
        const data = await fetch(`${baseUrl}/auth/validate_user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${object.token}`
            }
        })
        if(data.ok == true){
            const resp = await data.json()
            if(resp.is_admin == false){
                window.location.replace('/src/pages/userDashboard/index.html')
            }else if(resp.is_admin == true){
                window.location.replace('/src/pages/admDashboard/index.html')
            }
        }
    }catch(error){
        console.log(error)
    }
}

async function getUserInformation(){
    try{
        const localStorage = await getLocalData('user')
        const data = await fetch (`${baseUrl}/users/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        const resp = data.json()
        return resp
    }catch(error){
        console.log(error)
    }
}

async function userEditProfile(body){
    try{
        const localStorage = await getLocalData('user')
        const data = await fetch(`${baseUrl}/users`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(body)
        })
        if(data.ok == true){
            createToast('Perfil atualizado com sucesso!', '')
        }
    }catch(error){
        console.log(error)
    }
}

async function getUserCoworkers(){
    try{
        const localStorage = await getLocalData('user')
        const data = await fetch (`${baseUrl}/users/departments/coworkers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        const resp = data.json()
        return resp
    }catch(error){
        console.log(error)
    }
}

async function getUserDepartments(){
    try{
        const localStorage = await getLocalData('user')
        const data = await fetch (`${baseUrl}/users/departments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        const resp = data.json()
        return resp
    }catch(error){
        console.log(error)
    }
}

async function getAllDepartments(){
    try{
        const localStorage = await getLocalData('user')
        const data = await fetch (`${baseUrl}/departments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        const resp = data.json()
        return resp
    }catch(error){
        console.log(error)
    }
}

async function getAllUsers(){
    try{
        const localStorage = await getLocalData('user')
        const data = await fetch (`${baseUrl}/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        const resp = data.json()
        return resp
    }catch(error){
        console.log(error)
    }
}

async function getDepartmentByCompany(id){
    try{
        const localStorage = await getLocalData('user')
        const data = await fetch (`${baseUrl}/departments/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        const resp = data.json()
        return resp
    }catch(error){
        console.log(error)
    }
}

async function createDepartment(body){
    try{
        const localStorage = await getLocalData('user')
        const data = await fetch(`${baseUrl}/departments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(body)
        })
        if(data.ok == true){
            createToast('Departamento criado com sucesso!', '')
        }
    }catch(error){
        console.log(error)
    }
}


async function editDepartment(body, id){
    try{
        const localStorage = await getLocalData('user')
        const data = await fetch(`${baseUrl}/departments/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(body)
        })
        if(data.ok == true){
            createToast('Departamento editado com sucesso!', '')
        }
    }catch(error){
        console.log(error)
    }
}

async function deleteDepartment(id){
    try{
        const localStorage = await getLocalData('user')
        const data = await fetch(`${baseUrl}/departments/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        if(data.ok == true){
            createToast('Departamento deletado com sucesso!', '')
        }
    }catch(error){
        console.log(error)
    }
}

async function deleteUser(id){
    try{
        const localStorage = await getLocalData('user')
        const data = await fetch(`${baseUrl}/admin/delete_user/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        if(data.ok == true){
            createToast('Usuário deletado com sucesso!', '')
        }
    }catch(error){
        console.log(error)
    }
}

async function editUser(body, id){
    try{
        const localStorage = await getLocalData('user')
        const data = await fetch(`${baseUrl}/admin/update_user/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(body)
        })
        if(data.ok == true){
            createToast('Usuário editado com sucesso!', '')
        }
    }catch(error){
        console.log(error)
    }
}

async function getUsersWithoutDepartment(){
    try{            
        const localStorage = await getLocalData('user')
        const data = await fetch (`${baseUrl}/admin/out_of_work`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        const resp = data.json()
        return resp
    }catch(error){
        console.log(error)
    }
}

async function hireUser(body){
    try{    
        const localStorage = await getLocalData('user')
        const data = await fetch(`${baseUrl}/departments/hire/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(body)
        })
        if(data.ok == true){
            createToast('Usuário contratado com sucesso!', '')
        }
    }catch(error){
        console.log(error)
    }
}

async function fireUser(id){
    try{
        const localStorage = await getLocalData('user')
        const data = await fetch(`${baseUrl}/departments/dismiss/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        if(data.ok == true){
            createToast('Usuário demitido com sucesso!', '')
        }
    }catch(error){
        console.log(error)
    }
}

export {
    requestSectors,
    requestCompanies,
    requestCompaniesBySector,
    createNewUser,
    userLogin,
    getUserInformation,
    userEditProfile,
    getUserCoworkers,
    getUserDepartments,
    getAllDepartments,
    getAllUsers,
    getDepartmentByCompany,
    createDepartment,
    editDepartment,
    deleteDepartment,
    deleteUser,
    editUser,
    getUsersWithoutDepartment,
    hireUser,
    fireUser
}