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
    errordiv.innerText = "Error : Please login or signup to shop anything";
    setTimeout(()=>{
        errordiv.innerText = "";
    },5000);
})

let email = document.getElementById('email');
let password = document.getElementById('password');
let login = document.getElementById('login');

//checker func if localstorage has users array is present or not
function getUsersArray(){
    const usersJSON = localStorage.getItem('users');
    if (usersJSON) {
      return JSON.parse(usersJSON);
    }
    else{
        return false;
    }
}

login.addEventListener("click",(e)=>{
    e.preventDefault();
    if(email.value === ''||password.value === ''){
        error.innerText = 'Error : All the fields the mandatory'
        return;
    }

    let user = {
        email:email.value,
        password:password.value
    }
    let users = getUsersArray();
    if(users){
        let flag = true;
        users.forEach((item)=>{
            if(item.email === user.email){
                flag = false;
                if(item.password === user.password){
                    localStorage.setItem('users',JSON.stringify(users))
                    if(localStorage.getItem('currentUser')){
                        let currentUser = JSON.parse(localStorage.getItem('currentUser'))
                        currentUser = user;
                        localStorage.setItem('currentUser',JSON.stringify(currentUser));
                    }
                    else{
                        let currentUser = user;
                        localStorage.setItem('currentUser',JSON.stringify(currentUser));
                    }
                    let link = document.createElement('a');
                    link.href = "../shop/shop.html";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    return;
                }
                else{
                    error.innerText = 'Error : Incorrect password'
                    return;
                }
            }
        })
        if(flag){
            error.innerText = 'Error : You didnt have an account please sign un';
            document.getElementById('signup').style.display = "inline";
            return;
        }
    }
    else{
        error.innerText = 'Error : You didnt have an account please sign up';
        document.getElementById('signup').style.display = "inline";
        return;
    }
})

let cartProducts = [];
localStorage.setItem('cartProducts',JSON.stringify(cartProducts))