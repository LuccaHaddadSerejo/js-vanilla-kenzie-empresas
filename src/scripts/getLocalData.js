function getLocalData(data){
    const localData = JSON.parse(localStorage.getItem(data)) || ""
    return localData
}

export {getLocalData}