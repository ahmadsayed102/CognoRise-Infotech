const buttons = document.querySelectorAll('.button');
const display = document.querySelector('#display');
const container = document.querySelector('.container');
let s ="";
function getValue(e){
    const value = e.target.value;
    let toshow = s;
    if(value ==='='){
        try{
        let result = math.evaluate(s);
        toshow = result;
        s="";
        }catch{
            alert('Invalid Expression')
            toshow = s;
        }
        
    }else if(value ==="clear") s = toshow = "";
    else if(value ==="delete") s = toshow = s.slice(0,-1);
    else{
    s+=`${value}`;
    toshow = s;
    }
    display.textContent = toshow;
}

buttons.forEach((item)=>{
    item.addEventListener('click', getValue);
});

