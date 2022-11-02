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


export {
    requestSectors,
    requestCompanies,
    requestCompaniesBySector,
    createNewUser,
    userLogin,
}