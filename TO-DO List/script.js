const itemForm = document.querySelector('#item-form')
const itemList = document.querySelector('#item-list')
const itemInput = document.querySelector('#item-input')
const itemBtn = document.querySelector('#submit')
const deleteBtn = document.querySelector('#delete')
const clearBtn = document.querySelector('#clear')
const filter = document.querySelector('#filter-Btn')
let editMode = false
const btnClasses = 'remove-item btn-link text-red'
const iClasses = 'fa-solid fa-xmark'


function add(e){
        e.preventDefault()
        const item = itemInput.value;
        if(item === ''){
            alert('enter something')
            return;
        }
        if(editMode){
            const toEdit = itemList.querySelector('.edit-mode')
            toEdit.classList.remove('edit-mode')
            toEdit.remove()
            removeFromStorage(toEdit.textContent)
        }else{
            if(exist(item)){
                alert('Item already exist')
                return
            }
        }
        addItemToDom(item)
        addToStorage(item)
        itemInput.value = ""
        checkUI()
        
}
function remove(item){
    item.remove()
    removeFromStorage(item.textContent)
    checkUI()
}
function removeFromStorage(item){
    let StorageItems = getItemsFromStorage()
    StorageItems = StorageItems.filter(i => i!==item)
    localStorage.setItem('items', JSON.stringify(StorageItems))
}
function addToStorage(item){
    let StorageItems = getItemsFromStorage()
    StorageItems.push(item)
    localStorage.setItem('items', JSON.stringify(StorageItems))
}
function exist(item){
    const StorageItems = getItemsFromStorage()
    return StorageItems.includes(item)
}
function getItemsFromStorage(){
    let StorageItems = localStorage.getItem('items')
    if(StorageItems === null)
        StorageItems = []
    else
        StorageItems = JSON.parse(StorageItems)
    return StorageItems
}
function displayItems(){
    let StorageItems = getItemsFromStorage()
    StorageItems.forEach( item => addItemToDom(item))
    checkUI()
}
function addItemToDom(text){
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(text))
    const btn = createButton()
    li.appendChild(btn)
    itemList.appendChild(li)
}
function createButton(){
    const btn = document.createElement('button')
    btn.classList = btnClasses
    const i = createI()
    btn.appendChild(i);
    return btn;
}
function createI(){
    const i = document.createElement('i')
    i.classList = iClasses
    return i ;
}
function onClear(){
    localStorage.removeItem('items')
    clear()
}
function clear(){
    while(itemList.firstChild)
        itemList.removeChild(itemList.firstChild)
    checkUI()
}
function onClickItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        remove(e.target.parentElement.parentElement)
    }else{
        editItem(e.target)
    }
}
function editItem(item){
    editMode = true
    itemList.querySelectorAll('li')
    .forEach(i => i.classList.remove('edit-mode'))
    item.classList.add('edit-mode')
    itemInput.value = item.textContent
    itemBtn.innerHTML = '<i class = "fa-solid fa-pen"></i>   Update Item'
    itemBtn.style.backgroundColor = '#228b22'
}

function checkUI(){
    itemInput.value=''
    const items = itemList.querySelectorAll('li')
    if(items.length === 0){
        clearBtn.style.display = 'none'
        filter.style.display = 'none'
    }else{
        clearBtn.style.display = 'block'
        filter.style.display = 'block'
    }
    if(editMode){
        itemBtn.style.backgroundColor = "#333"
        itemBtn.innerHTML = '<i class = "fa-solid fa-plus"></i>  Add Item'
    }
    editMode = false
}
function filterItems(e){
    const fil = e.target.value.toLowerCase()
    const filItems = itemList.querySelectorAll('li')
    filItems.forEach((item)=>{
        const itemName = item.textContent.toLocaleLowerCase()
        if(itemName.indexOf(fil)!=-1)
            item.style.display = 'flex'
        else
        item.style.display = 'none'
    })
}

function init(){
itemForm.addEventListener('submit',add)
clearBtn.addEventListener('click', onClear)
itemList.addEventListener('click', onClickItem)
filter.addEventListener('input', filterItems)
document.addEventListener('DOMContentLoaded', displayItems)
checkUI()
}
init()



