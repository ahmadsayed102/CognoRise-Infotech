const from = document.querySelector("#from");
const to = document.querySelector("#to");
const first = document.querySelector("#first");
const second = document.querySelector("#second");
var req = new XMLHttpRequest();
req.open("GET", "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_jf7Q6LaohPXfcuVnc0XRpNjy4zPg6alVIOQK4WWn" ,false);
req.send();
const data = JSON.parse(req.responseText).data;
const keys = Object.keys(data);
const values = Object.values(data);

function containsOnlyDigits(str) {
    return /^\d+$/.test(str);
}

function calculate(e){
    if(e.target.tagName.toUpperCase() === "SELECT" && (first.value == null || first.value == "")){
        alert("please enter value");
        return;
    }
    let fromValue = data[from.value];
    let toValue = data[to.value];
    let enteredValue = parseInt(first.value);
    let isnum =containsOnlyDigits(enteredValue);
    if(!isnum){
        alert('Enter valid value');
        first.value = "";
    }else{
        if(fromValue!=toValue)
            second.value = enteredValue*fromValue/toValue;
        else second.value = first.value;
    }
        
}

for(var key in data){
    const opt = document.createElement("option");
    opt.value = key;
    opt.innerHTML = key;
    const opt2 = opt.cloneNode(true);
    from.appendChild(opt);
    to.appendChild(opt2);
}
first.addEventListener('input', calculate);
from.addEventListener('change', calculate);
to.addEventListener('change', calculate);




