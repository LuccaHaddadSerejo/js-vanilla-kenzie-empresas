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


export {
    requestSectors,
    requestCompanies,
    requestCompaniesBySector,
    createNewUser,
}