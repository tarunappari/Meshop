let errordiv = document.getElementById("error");

//this shows error if you click on cart without login or signup
document.getElementById("cart").addEventListener("click",()=>{
        errordiv.innerText = "Error : Please login or signup to view your cart";
        setTimeout(()=>{
            errordiv.innerText = "";
        },5000);
})

//this shows error if you click on profile without login or signup
document.getElementById("profile").addEventListener("click",()=>{
    errordiv.innerText = "Error : Please login or signup to view your profile";
    setTimeout(()=>{
        errordiv.innerText = "";
    },5000);
})

//this shows error if you click on shop without login or signup
document.getElementById("shop").addEventListener("click",()=>{
    errordiv.innerText = "Error : Please login or signup to view your shop anything";
    setTimeout(()=>{
        errordiv.innerText = "";
    },5000);
})

let fname = document.getElementById('fname');
let lname = document.getElementById('lname');
let email = document.getElementById('email');
let p1 = document.getElementById('p1')
let p2 = document.getElementById('p2')
let signupbtn = document.getElementById('signup-btn')
let login = document.getElementById('login');

let error = document.getElementById('error')

function getUsersArray(){
    const usersJSON = localStorage.getItem('users');
    if (usersJSON) {
      return JSON.parse(usersJSON);
    }
    else{
        return [];
    }
}

//token generator
function token(){
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789'
    let res = '';
    let length = chars.length;
    for(let i=0;i<=16;i++){
        res += chars.charAt(Math.floor(Math.random()*length))
    }
    return res;
}

//checker
signupbtn.addEventListener('click',(event)=>{
    event.preventDefault();
    if(fname.value===''|| lname.value ===''||email.value===''||p1.value===''||p2.value===''){
        error.innerText = 'Error : All the fields the mandatory'
        return;
    }
    if(p1.value.length < 8){
        error.innerText = 'Error : password should contain 8 letters'
        p1.focus();
        return;
    }
    if(p1.value !== p2.value){
        error.innerText = 'Error : password didnt match';
        p2.focus();
        return;
    }

    error.innerText = '';

    let user = {
        fname:fname.value,
        lname:lname.value,
        email:email.value,
        password:p1.value,
        token:token(),
    }

    let users = getUsersArray();

    let flag = true;
    users.forEach((item)=>{
        if(item.email === user.email){
            flag = false;
            login.style.display = "inline"
            error.style.color = 'red'
            error.innerText = 'Error : Hey! you have an account in MeShop please login';
        }
    })

    if(flag){
        users.push(user);

        localStorage.setItem('users',JSON.stringify(users));
        
        if(localStorage.getItem('currentUser')){
            let currentUser = JSON.parse(localStorage.getItem('currentUser'))
            currentUser = {
                email:user.email,
                password:user.password
            }
            localStorage.setItem('currentUser',JSON.stringify(currentUser));
        }
        else{
            let currentUser = {
                email:user.email,
                password:user.password
            }
            localStorage.setItem('currentUser',JSON.stringify(currentUser));
        }
        login.style.display = "inline"
        error.style.color = 'green'
        error.innerText = 'Your account was succesfully created please login';
    }
    else{
        localStorage.setItem('users',JSON.stringify(users));
    }
})
