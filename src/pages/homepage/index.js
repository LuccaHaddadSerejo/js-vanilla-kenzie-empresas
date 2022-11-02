import { requestSectors, requestCompanies, requestCompaniesBySector } from "../../scripts/request.js"

getApiData(requestCompanies())

function redirect(){
    const btnLogin = document.getElementById('redirectLogin')
    const btnRegister = document.getElementById('redirectRegister')
    const btnDropDownLogin = document.getElementById('dropDownRedirectLogin')
    const btnDropDownRegister = document.getElementById('dropDownRedirectRegister')

    btnLogin.addEventListener('click', ()=>{
        window.location.replace('./src/pages/login/index.html')
    })

    btnRegister.addEventListener('click', ()=>{
        window.location.replace('./src/pages/register/index.html')   
    })

    btnDropDownLogin.addEventListener('click', ()=>{
        window.location.replace('./src/pages/login/index.html')
    })

    btnDropDownRegister.addEventListener('click', ()=>{
        window.location.replace('./src/pages/register/index.html')   
    })
}

redirect()

async function selectSector(){
    const getSector = await requestSectors()
    const select = document.getElementById('select_home')
    getSector.forEach(sector => {
        const option = document.createElement('option')
        option.classList = 'options'
        option.value = sector.description
        option.innerText = sector.description
        select.append(option)
    })  

    return select
}

selectSector()

function selectFilter(){
    const select = document.getElementById('select_home')
    const list = document.getElementById('list_home')
    select.addEventListener('change', (event)=>{
        event.preventDefault()
        list.innerHTML = ''
        getApiData(requestCompaniesBySector(event.target.value))
    });
}

selectFilter()

function renderList(arr){
    const list = document.getElementById('list_home')
    arr.forEach(company => {
        const listItem = document.createElement('li')
        listItem.classList = 'list_item flex_col justify_between'
        
        const listItemTitle = document.createElement('h2')
        listItemTitle.classList = 'item_title'
        listItemTitle.innerText = company.name

        const listItemDiv = document.createElement('div')
        listItemDiv.classList = 'item_div flex_col'

        const listItemSpanOne = document.createElement('span')
        listItemSpanOne.classList = 'item_hour'
        listItemSpanOne.innerText = company.opening_hours

        const listItemSpanTwo = document.createElement('span')
        listItemSpanTwo.classList = 'item_sector'
        listItemSpanTwo.innerText = company.sectors.description

        listItemDiv.append(listItemSpanOne, listItemSpanTwo)
        listItem.append(listItemTitle, listItemDiv)
        list.append(listItem)
    });
    return list
}

async function getApiData(data){
    const getList= await data   
    renderList(getList)
}

function dropDownMenu(){
    const btn = document.querySelector('.header_mobile_btn')
    
    btn.addEventListener('click', ()=>{
        const dropDownMenu = document.querySelector('.dropdown_full')
        dropDownMenu.classList.toggle('hidden')
    })
}

dropDownMenu()




