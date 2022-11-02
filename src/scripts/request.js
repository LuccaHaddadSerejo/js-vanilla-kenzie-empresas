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


export {
    requestSectors,
    requestCompanies,
    requestCompaniesBySector,
}