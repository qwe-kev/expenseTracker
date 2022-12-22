const myForm = document.querySelector('#my-form');
const expAmt = document.querySelector("#expAmount");
const expDesc = document.querySelector("#expDescription");
const expCat = document.querySelector("#expCategory");
const message = document.querySelector(".msg");
const expList = document.querySelector(".expList");


myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    if(expAmt.value === "" || expDesc.value === "" || expCat.value === "") {
        message.classList.add("bg-danger");
        message.innerHTML = "please enter all fields";

        setTimeout(() => message.remove(), 3000);
    }
    else {
        const li = document.createElement("li");
        li.classList.add("list-group-item-warning")
        const text = document.createTextNode(`${expAmt.value}-${expDesc.value}-${expCat.value}`);
        const deleteBtn = document.createElement("button");
        const editBtn = document.createElement("button");
        deleteBtn.classList.add("btn","btn-danger","btn-close");
        
        editBtn.classList.add("btn","btn-sm","btn-primary");
        editBtn.innerHTML = "Edit";
        

        let expItem = {
            expAmt : expAmt.value,
            expDesc : expDesc.value,
            expCat : expCat.value
        }
        if(localStorage.getItem(`item ${expDesc.value} ${expAmt.value}`) === JSON.stringify(expItem)) {
            message.classList.add("bg-warning");
            message.innerHTML = "Item already exists";

            setTimeout(() => {message.remove()}, 1000);
        }
        else {
            localStorage.setItem(`item ${expDesc.value} ${expAmt.value}`,JSON.stringify(expItem));
            li.appendChild(text);
            li.appendChild(deleteBtn);
            li.appendChild(editBtn);
            expList.appendChild(li);
        }
    }
}


expList.addEventListener('click', deleteItem);

function deleteItem(e) {
    e.preventDefault();
    if(e.target.classList && e.target.classList.contains("btn-danger")) {
        let arr = e.target.parentNode.firstChild.wholeText.split('-');
        console.log(arr);
        localStorage.removeItem(`item ${arr[0]} ${arr[1]}`)
        e.target.parentNode.remove();
        window.location.reload();
    }
}

document.addEventListener('DOMContentLoaded', displayList);

function displayList(e) {
    Object.entries({...localStorage}).forEach(item => {
        let itemValue = JSON.parse(item[1]);
        const li = document.createElement("li");
        li.classList.add("list-group-item-warning");
        const text = document.createTextNode(`${itemValue.expDesc}-${itemValue.expAmt}-${itemValue.expCat}`);
        const deleteBtn = document.createElement("button");
        const editBtn = document.createElement("button");
        deleteBtn.classList.add("btn","btn-danger","btn-close");
        editBtn.classList.add("btn","btn-sm","btn-primary");
        editBtn.innerHTML = "Edit";
        li.appendChild(text);
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        expList.appendChild(li);
    })

}