const itemForm = document.querySelector('#item-form')
const itemList = document.querySelector('#item-list')
const itemInput = document.querySelector('#item-input')
const itemBtn = document.querySelector('#submit')
// heeeeeeey

const btnClasses = document.querySelector('#classes').classList
const iClasses = document.querySelector('#iclasses').classList

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



itemForm.addEventListener('submit',(e)=> {
    e.preventDefault()
    const item = itemInput.value;
    if(item === ''){
        alert('enter something')
        return;
    }
    const i = addItem(item)
    itemList.appendChild(i)
    itemInput.value = ""
})




