let cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
let products = JSON.parse(localStorage.getItem('products'));


let cartitems = document.getElementById('Cartitems');
let productslist = document.getElementById('Productslist');
let spanTotal = document.getElementById('spanTotal')
let total = 0;


addproducts(cartProducts);

function addproducts(cartProducts) {
    document.getElementById('cartcount').innerText = cartProducts.length;
    cartitems.innerHTML = ''

    cartProducts.forEach((id) => {
        products.forEach((item) => {
            if (item.id === parseInt(id)) {
                let div = document.createElement('div');
                div.className = 'card';
                div.innerHTML = `<div class="imgdiv">
                                     <img class="img" src=${item.image} alt="shirt">
                                 </div>
                                 <div style="width: 200px;"><b>Title : ${item.title}</b></div>
                                        <div class="ps">
                                            <span><b>Price : $${item.price}</b></span>
                                         </div>
                                 <button class="removeFromCartButton" data-product-id="${item.id}">Remove from cart</button>`;
                cartitems.appendChild(div);

                const addToCartButton = div.querySelector('.removeFromCartButton');
                addToCartButton.addEventListener('click', removefromcart);
            }
        })
    })


    productslist.innerHTML = ''
    cartProducts.forEach((id, i) => {
        products.forEach((item) => {
            if (item.id === parseInt(id)) {
                // <div><span>1.shirt</span><span>$100</span></div>
                let div = document.createElement('div');
                div.innerHTML = `<div><span style="width: 80%;">${++i}.${item.title}</span><span style="width: 15%;">$${item.price}</span></div>`;
                total = total + item.price;
                productslist.appendChild(div);
            }
        })
    })

    spanTotal.innerText = `Rs. ${Math.floor((total*100)*75)}`;

    if (cartProducts.length === 0) {
        cartitems.innerHTML = `<div id="emptyh1" style="display:flex;justify-content:center;align-items:center;flex-direction:column;">
                               <h1>Your cart is empty Shop now</h1>
                               <img src="../empty.png" alt="img" style="width:30rem;height:30rem;">
                                </div>`
    }
}

function removefromcart(event) {
    const id = event.target.dataset.productId;
    let index = cartProducts.indexOf(id); // Find the index of the first occurrence of '2'

    if (index !== -1) {
        cartProducts.splice(index, 1); // Remove the element at the found index
    }

    document.getElementById('cartcount').innerText = cartProducts.length;

    localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
    cartProducts = JSON.parse(localStorage.getItem('cartProducts'))
    addproducts(cartProducts);
}

//payment for checking out
function clearcart() {
        var options = {
            key: "rzp_test_PV1oQ0oMtgXOsq", // Enter the Key ID generated from the Dashboard
            amount: (total*100)*75, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "MyShop Checkout",
            description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            theme: {
                color: "#000",
            },
            image:
                "https://myshopairport.com/wp-content/uploads/2022/03/logo-design-my-shop-04.png",
        };

        var rzpy1 = new Razorpay(options);
        rzpy1.open();
        // clear mycart - localStorage
        alert('Click ok to make the payment')

        cartProducts = []
        localStorage.setItem('cartProducts',JSON.stringify(cartProducts));

        addproducts(cartProducts)
}
