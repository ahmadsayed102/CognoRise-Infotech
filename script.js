const itemForm = document.querySelector('#item-form')
const itemList = document.querySelector('#item-list')
const itemInput = document.querySelector('#item-input')
const itemBtn = document.querySelector('#submit')
const deleteBtn = document.querySelector('#delete')
const clearBtn = document.querySelector('#clear')
const filter = document.querySelector('#filter-Btn')

const btnClasses = document.querySelector('#classes').classList
const iClasses = document.querySelector('#iclasses').classList

function add(e){
        e.preventDefault()
        const item = itemInput.value;
        if(item === ''){
            alert('enter something')
            return;
        }
        const i = addItem(item)
        itemList.appendChild(i)
        checkUI()
        itemInput.value = ""
        
}
function addItem(text){
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(text))
    const btn = createButton()
    li.appendChild(btn)
    return li;
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
function clear(){
    while(itemList.firstChild)
        itemList.removeChild(itemList.firstChild)
    checkUI()
}
function remove(e){
    if(e.target.parentElement.classList.contains('remove-item'))
        e.target.parentElement.parentElement.remove()
    checkUI()
}
function checkUI(){
    const items = itemList.querySelectorAll('li')
    if(items.length === 0){
        clearBtn.style.display = 'none'
        filter.style.display = 'none'
    }else{
        clearBtn.style.display = 'block'
        filter.style.display = 'block'
    }
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

itemForm.addEventListener('submit',add)
clearBtn.addEventListener('click', clear)
itemList.addEventListener('click', remove)
filter.addEventListener('input', filterItems)
checkUI()



