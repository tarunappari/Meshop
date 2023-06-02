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

///this will take you to login page
document.getElementById("Login").addEventListener("click",(e)=>{
    e.preventDefault()
    let link = document.createElement('a');
    link.href = './login.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link)
})

//this will take you to signup page
document.getElementById("SignUp").addEventListener("click",(e)=>{
    e.preventDefault();
    let link = document.createElement('a');
    link.href = './Signup.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link)
})