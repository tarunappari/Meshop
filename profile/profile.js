let fname = document.getElementById('fname');
let lname = document.getElementById('lname');
let saveinfo = document.getElementById('save');

let oldpassword = document.getElementById('oldpassword');
let p1 = document.getElementById('p1');
let p2 = document.getElementById('p2');
let changePassword = document.getElementById('change-btn')
let logout = document.getElementById('logout');

let mysuccess = document.getElementById('mysuccess');
let passwordsuccess = document.getElementById('passwordsuccess');



let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let user = {};
let users = JSON.parse(localStorage.getItem('users'));
users.forEach((item)=>{
    if(item.email === currentUser.email){
        user.fanme = item.fname;
        user.lname = item.lname;
    }
})
fname.value = user.fanme;
lname.value = user.lname;
localStorage.setItem('users',JSON.stringify(users));
localStorage.setItem('currentUser',JSON.stringify(currentUser));

saveinfo.addEventListener("click",()=>{
    let flag = true;
    if(fname.value !== '' && lname.value !== ''){
        let users = JSON.parse(localStorage.getItem('users'));
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        flag = false;
        users.forEach((item)=>{
            if(item.email === currentUser.email){
                item.fname = fname.value;
                item.lname = lname.value;
            }
        })
        localStorage.setItem('users',JSON.stringify(users));
        localStorage.setItem('currentUser',JSON.stringify(currentUser));
    }
    if(flag){
        mysuccess.innerText = 'all fields are mandatory'
        mysuccess.style.color = "red"
        setTimeout(()=>{
            mysuccess.innerText = '';
        },5000)
    }
    else{
        setTimeout(()=>{
            mysuccess.innerText = 'New Info is updated succesfully'
            mysuccess.style.color = "green"
        },1500)
        setTimeout(()=>{
            mysuccess.innerText = '';
        },6000)
    }
})

changePassword.addEventListener('click',()=>{
    if(oldpassword.value === ''||p1.value === ''||p2.value === ''){
        passwordsuccess.innerText = "Error : All fields are mandatory"
        passwordsuccess.style.color = "red";
        return;
    }

    if(p1.value.length < 8){
        passwordsuccess.innerText = "Error : password should contain 8 letters"
        passwordsuccess.style.color = "red";
        return;
    }

    if(p1.value !== p2.value){
        passwordsuccess.innerText = "Error : new password and confirm password didnt matched"
        passwordsuccess.style.color = "red";
        return;
    }

    passwordsuccess.innerText = ''

    let flag = true;
    let users = JSON.parse(localStorage.getItem('users'));
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    users.forEach((item)=>{
        if(item.email === currentUser.email){
            if(oldpassword.value === item.password){
                flag = false;
                item.password = p1.value;
                currentUser.password = p1.value;
            }
        }
    })
    localStorage.setItem('users',JSON.stringify(users));
    localStorage.setItem('currentUser',JSON.stringify(currentUser));
    if(flag){
        passwordsuccess.innerText = "Error : Old Password is incorrect"
        passwordsuccess.style.color = "red";
        return;
    }
    else{
        setTimeout(()=>{
            passwordsuccess.innerText = "Password changed succesfully"
            passwordsuccess.style.color = "green";
            return;
        },1500)
        setTimeout(()=>{
            passwordsuccess.innerText = ""
        },5000)
    }
})

logout.addEventListener('click',()=>{
    setTimeout(()=>{
       localStorage.removeItem('currentUser');

    let link = document.createElement('a');
    link.href = "../index.html";
    document.body.appendChild(link)
    link.click();
    document.body.removeChild(link);
    },1500)
})

let cartProducts = JSON.parse(localStorage.getItem('cartProducts'));

document.getElementById('cartcount').innerText = cartProducts.length;