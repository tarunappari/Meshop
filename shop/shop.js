
(async function () {
    let url = `https://fakestoreapi.com/products`;

    let response = await fetch(url)
    let products = await response.json();
    localStorage.setItem('products', JSON.stringify(products));
})();

function randomColor() {
    var colors = ['red', 'blue', 'green', 'black', 'white'];
    var randomColors = [];

    for (var i = 0; i < 3; i++) {
        var randomIndex = Math.floor(Math.random() * colors.length);
        var randomColor = colors[randomIndex];
        randomColors.push(randomColor);
        colors.splice(randomIndex, 1);
    }

    return randomColors;
}

function randomSize() {
    var sizes = ['S', 'M', 'L', 'XL'];
    var randomSizes = [];

    for (var i = 0; i < 3; i++) {
        var randomIndex = Math.floor(Math.random() * sizes.length);
        var size = sizes[randomIndex];
        randomSizes.push(size);
        sizes.splice(randomIndex, 1);
    }

    return randomSizes;
}

let entireContainer = document.getElementById('entireContainer')
let menclothes = document.getElementById('menclothes');
let womencolthes = document.getElementById('womencolthes');
let jewellery = document.getElementById('jewellery');
let electronics = document.getElementById('electronics');

let products = JSON.parse(localStorage.getItem('products'));
document.getElementById('emptySearch').style.display = 'none';

//redenering every product to the shop
addProducts(products);


//function to add products
function addProducts(products) {
    products.forEach((item) => {
        if (item.category === "men's clothing") {
            let div = document.createElement('div');
            div.className = 'card';
            let sizes = randomSize();
            let colors = randomColor();
            item.colors = colors;
            item.sizes = sizes;
            div.innerHTML = `<div class="imgdiv">
                             <img class="img" src=${item.image} alt="img"></div>
                             <div style="width: 200px;">${item.title}</div>
                             <div class="ps">
                                 <span>$${item.price}</span>
                                 <span>${sizes}</span>
                             </div>
                             <div>Colors : ${colors}</div>
                             <div>Rating : ${item.rating.rate} </div>
                             <button class="addToCartButton" data-product-id="${item.id}">Add To Cart</button>`;

            menclothes.appendChild(div);

            const addToCartButton = div.querySelector('.addToCartButton');
            addToCartButton.addEventListener('click', addToCartFunc);
        }
        if (item.category === "women's clothing") {
            let div = document.createElement('div');
            div.className = 'card';
            let sizes = randomSize();
            let colors = randomColor();
            item.colors = colors;
            item.sizes = sizes;
            div.innerHTML = `<div class="imgdiv">
                             <img class="img" src=${item.image} alt="img"></div>
                             <div style="width: 200px;">${item.title}</div>
                             <div class="ps">
                                 <span>$${item.price}</span>
                                 <span>${sizes}</span>
                             </div>
                             <div>Colors : ${colors}</div>
                             <div>Rating : ${item.rating.rate} </div>
                             <button class="addToCartButton" data-product-id="${item.id}">Add To Cart</button>`;

            womencolthes.appendChild(div);

            const addToCartButton = div.querySelector('.addToCartButton');
            addToCartButton.addEventListener('click', addToCartFunc);
        }
        if (item.category === "jewelery") {
            let div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `<div class="imgdiv">
                             <img class="img" src=${item.image} alt="img"></div>
                             <div style="width: 200px;">${item.title}</div>
                             <div class="ps">
                                 <span>$${item.price}</span>
                             </div>
                             <div>Rating : ${item.rating.rate} </div>
                             <button class="addToCartButton" data-product-id="${item.id}">Add To Cart</button>`;

            jewellery.appendChild(div);

            const addToCartButton = div.querySelector('.addToCartButton');
            addToCartButton.addEventListener('click', addToCartFunc);
        }
        if (item.category === "electronics") {
            let div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `<div class="imgdiv">
                             <img class="img" src=${item.image} alt="img"></div>
                             <div style="width: 200px;">${item.title}</div>
                             <div class="ps">
                                 <span>$${item.price}</span>
                             </div>
                             <div>Rating : ${item.rating.rate} </div>
                             <button class="addToCartButton" data-product-id="${item.id}">Add To Cart</button>`;

            electronics.appendChild(div);

            const addToCartButton = div.querySelector('.addToCartButton');
            addToCartButton.addEventListener('click', addToCartFunc);
        }
    })

    let cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    document.getElementById('cartcount').innerHTML = cartProducts.length;
}

//function to add specific products
function addSpecific(item, container) {
    if (container === 'jewellery' || container === 'electronics') {
        let div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `<div class="imgdiv">
                                 <img class="img" src=${item.image} alt="img"></div>
                                 <div style="width: 200px;">${item.title}</div>
                                 <div class="ps">
                                     <span>$${item.price}</span>
                                 </div>
                                 <div>Rating : ${item.rating.rate} </div>
                                 <button class="addToCartButton" data-product-id="${item.id}">Add To Cart</button>`;
        container.appendChild(div);

        const addToCartButton = div.querySelector('.addToCartButton');
        addToCartButton.addEventListener('click', addToCartFunc);
    }
    else {
        let div = document.createElement('div');
        div.className = 'card';
        let sizes = randomSize();
        let colors = randomColor();
        div.innerHTML = `<div class="imgdiv">
                                 <img class="img" src=${item.image} alt="img"></div>
                                 <div style="width: 200px;">${item.title}</div>
                                 <div class="ps">
                                     <span>$${item.price}</span>
                                     <span>${sizes}</span>
                                 </div>
                                 <div>Colors : ${colors}</div>
                                 <div>Rating : ${item.rating.rate} </div>
                                 <button class="addToCartButton" data-product-id="${item.id}">Add To Cart</button>`;
        container.appendChild(div);

        const addToCartButton = div.querySelector('.addToCartButton');
        addToCartButton.addEventListener('click', addToCartFunc);
    }
}

let mensec = document.getElementById('menSection')
let womensec = document.getElementById('womenSection')
let jewsec = document.getElementById('jewellerysection')
let elesec = document.getElementById('electromicssection')


//filtering upon search
document.getElementById('search').addEventListener('keyup', (event) => {
    let value = event.target.value.toLowerCase();
    jewellery.innerHTML = ""
    menclothes.innerHTML = ''
    womencolthes.innerHTML = ''
    electronics.innerHTML = ''
    let men = true, women = true, jew = true, elec = true;
    let all = false;

    products.forEach((item) => {
        let title = item.title.toLowerCase();
        if (title.includes(value)) {
            if (item.category === "men's clothing") {
                addSpecific(item, menclothes)
                men = false
            }
            if (item.category === "women's clothing") {
                addSpecific(item, womencolthes)
                women = false
            }
            if (item.category === "electronics") {
                addSpecific(item, electronics);
                elec = false
            }
            if (item.category === "jewelery") {
                jewellery.style.display = "flex"
                addSpecific(item, jewellery)
                jew = false
            }
        }
    })
    if (men) {
        mensec.style.display = 'none'
        menclothes.style.display = 'none'
    }
    else {
        mensec.style.display = 'flex'
        menclothes.style.display = 'flex'
    }
    if (women) {
        womensec.style.display = 'none'
        womencolthes.style.display = 'none'
    }
    else {
        womensec.style.display = 'flex'
        womencolthes.style.display = 'flex'
    }
    if (jew) {
        jewsec.style.display = 'none'
        jewellery.style.display = "none"
    }
    else {
        jewsec.style.display = 'flex'
        jewellery.style.display = 'flex'
    }
    if (elec) {
        elesec.style.display = 'none'
        electronics.style.display = 'none'
    }
    else {
        elesec.style.display = 'flex'
        electronics.style.display = 'flex'
    }
    if (men && women && jew && elec) {
        all = true;
    }
    else {
        all = false;
    }
    if (all) {
        document.getElementById('emptySearch').style.display = 'flex';
    }
    else {
        document.getElementById('emptySearch').style.display = 'none';
    }
})

//filtering items upon clicking categories
let all = document.getElementById('all');
let menbtn = document.getElementById('men-btn');
let womenbtn = document.getElementById('women-btn');
let jewellerybtn = document.getElementById('jewellery-btn');
let electronicsbtn = document.getElementById('electronics-btn');

all.addEventListener("click", () => {
    all.style.color = "white";
    all.style.backgroundColor = "black";

    menbtn.style.color = "black";
    menbtn.style.backgroundColor = "white";

    womenbtn.style.color = "black";
    womenbtn.style.backgroundColor = "white";

    jewellerybtn.style.color = "black";
    jewellerybtn.style.backgroundColor = "white";

    electronicsbtn.style.color = "black";
    electronicsbtn.style.backgroundColor = "white";

    menclothes.innerHTML = ''
    womencolthes.innerHTML = ''
    jewellery.innerHTML = ''
    electronics.innerHTML = ''

    mensec.style.display = "block"
    womensec.style.display = "block"
    jewsec.style.display = "block"
    elesec.style.display = "block"

    addProducts(products)

})

menbtn.addEventListener('click', () => {
    all.style.color = "black";
    all.style.backgroundColor = "white";

    menbtn.style.color = "white";
    menbtn.style.backgroundColor = "black";

    womenbtn.style.color = "black";
    womenbtn.style.backgroundColor = "white";

    jewellerybtn.style.color = "black";
    jewellerybtn.style.backgroundColor = "white";

    electronicsbtn.style.color = "black";
    electronicsbtn.style.backgroundColor = "white";

    mensec.style.display = "block"
    womensec.style.display = "none"
    jewsec.style.display = "none"
    elesec.style.display = "none"

    menclothes.innerHTML = ''

    products.forEach((item) => {
        if (item.category === "men's clothing") {
            let div = document.createElement('div');
            div.className = 'card';
            let sizes = randomSize();
            let colors = randomColor();
            div.innerHTML = `<div class="imgdiv">
                             <img class="img" src=${item.image} alt="img"></div>
                             <div style="width: 200px;">${item.title}</div>
                             <div class="ps">
                                 <span>$${item.price}</span>
                                 <span>${sizes}</span>
                             </div>
                             <div>Colors : ${colors}</div>
                             <div>Rating : ${item.rating.rate} </div>
                             <button class="addToCartButton" data-product-id="${item.id}">Add To Cart</button>`;
            menclothes.appendChild(div);

            const addToCartButton = div.querySelector('.addToCartButton');
            addToCartButton.addEventListener('click', addToCartFunc);
        }
    })
})

womenbtn.addEventListener('click', () => {
    all.style.color = "black";
    all.style.backgroundColor = "white";

    menbtn.style.color = "black";
    menbtn.style.backgroundColor = "white";

    womenbtn.style.color = "white";
    womenbtn.style.backgroundColor = "black";

    jewellerybtn.style.color = "black";
    jewellerybtn.style.backgroundColor = "white";

    electronicsbtn.style.color = "black";
    electronicsbtn.style.backgroundColor = "white";

    mensec.style.display = "none";
    womensec.style.display = "block"
    jewsec.style.display = "none"
    elesec.style.display = "none"

    womencolthes.innerHTML = ''

    products.forEach((item) => {
        if (item.category === "women's clothing") {
            let div = document.createElement('div');
            div.className = 'card';
            let sizes = randomSize();
            let colors = randomColor();
            div.innerHTML = `<div class="imgdiv">
                             <img class="img" src=${item.image} alt="img"></div>
                             <div style="width: 200px;">${item.title}</div>
                             <div class="ps">
                                 <span>$${item.price}</span>
                                 <span>${sizes}</span>
                             </div>
                             <div>Colors : ${colors}</div>
                             <div>Rating : ${item.rating.rate} </div>
                             <button class="addToCartButton" data-product-id="${item.id}">Add To Cart</button>`;
            womencolthes.appendChild(div);

            const addToCartButton = div.querySelector('.addToCartButton');
            addToCartButton.addEventListener('click', addToCartFunc);
        }
    })
})

jewellerybtn.addEventListener('click', () => {
    all.style.color = "black";
    all.style.backgroundColor = "white";

    menbtn.style.color = "black";
    menbtn.style.backgroundColor = "white";

    womenbtn.style.color = "black";
    womenbtn.style.backgroundColor = "white";

    jewellerybtn.style.color = "white";
    jewellerybtn.style.backgroundColor = "black";

    electronicsbtn.style.color = "black";
    electronicsbtn.style.backgroundColor = "white";

    mensec.style.display = "none";
    womensec.style.display = "none"
    jewsec.style.display = "block"
    elesec.style.display = "none"

    jewellery.innerHTML = ''

    products.forEach((item) => {
        if (item.category === "jewelery") {
            let div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `<div class="imgdiv">
                             <img class="img" src=${item.image} alt="img"></div>
                             <div style="width: 200px;">${item.title}</div>
                             <div class="ps">
                                 <span>$${item.price}</span>
                             </div>
                             <div>Rating : ${item.rating.rate} </div>
                             <button class="addToCartButton" data-product-id="${item.id}">Add To Cart</button>`;
            jewellery.appendChild(div);

            const addToCartButton = div.querySelector('.addToCartButton');
            addToCartButton.addEventListener('click', addToCartFunc);
        }
    })
})

electronicsbtn.addEventListener('click', () => {
    all.style.color = "black";
    all.style.backgroundColor = "white";

    menbtn.style.color = "black";
    menbtn.style.backgroundColor = "white";

    womenbtn.style.color = "black";
    womenbtn.style.backgroundColor = "white";

    jewellerybtn.style.color = "black";
    jewellerybtn.style.backgroundColor = "white";

    electronicsbtn.style.color = "white";
    electronicsbtn.style.backgroundColor = "black";

    mensec.style.display = "none";
    womensec.style.display = "none"
    jewsec.style.display = "none"
    elesec.style.display = "block"
    electronics.innerHTML = ''

    products.forEach((item) => {
        if (item.category === "electronics") {
            let div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `<div class="imgdiv">
                             <img class="img" src=${item.image} alt="img"></div>
                             <div style="width: 200px;">${item.title}</div>
                             <div class="ps">
                                 <span>$${item.price}</span>
                             </div>
                             <div>Rating : ${item.rating.rate} </div>
                             <button class="addToCartButton" data-product-id="${item.id}">Add To Cart</button>`;
            electronics.appendChild(div);

            const addToCartButton = div.querySelector('.addToCartButton');
            addToCartButton.addEventListener('click', addToCartFunc);
        }
    })
})


let rangevalue = document.getElementById('rangevalue')
let selectedrange = null;

function range(value) {
    selectedrange = parseInt(value);
    rangevalue.innerText = value;

}

let selectedColors = [];
let selectedSizes = [];
let selectedPrices = [];

//function to gather selected items
function editFiletred(type, value) {
    if (type === 'size') {
        if (selectedSizes.includes(value)) {
            selectedSizes = selectedSizes.filter((item) => {
                if (item !== value) return item;
            })
        }
        else {
            selectedSizes.push(value);
        }
    }
    if (type === 'color') {
        if (selectedColors.includes(value)) {
            selectedColors = selectedColors.filter((item) => {
                if (item !== value) return item;
            })
        }
        else {
            selectedColors.push(value);
        }
    }
    if (type === 'price') {
        if (selectedPrices.includes(value)) {
            selectedPrices = selectedPrices.filter((item) => {
                if (item !== value) return item;
            })
        }
        else {
            selectedPrices.push(value);
        }
    }
}

//filtering products upon clicking filter button
document.getElementById('applyFilter').addEventListener('click', () => {


    let filteredProducts = products.filter(item => {
        // Check if any selected color matches any color in the product's colors array
        let colorMatch;
        if (item.colors) {
            colorMatch = selectedColors.some(color => item.colors.includes(color));
        }

        let sizeMatch;
        if (item.sizes) {
            sizeMatch = selectedSizes.some(size => item.sizes.includes(size));
        }

        let priceMatch = selectedPrices.some((price) => {
            if (price === '25') {
                if (item.price >= 0 && item.price <= 25) {
                    return true;
                }
            }
            if (price === '50') {
                if (item.price >= 25 && item.price <= 50) {
                    return true;
                }
            }
            if (price === '100') {
                if (item.price >= 50 && item.price <= 100) {
                    return true;
                }
            }
            if (price === '101') {
                if (item.price > 100) {
                    return true;
                }
            }
        })

        let ratingMatch;
        if (item.rating.rate >= selectedrange && item.rating.rate <= selectedrange + .9) {
            ratingMatch = true;
        }

        return colorMatch || sizeMatch || priceMatch || ratingMatch;
    })

    if (filteredProducts.length !== 0) {
        jewellery.innerHTML = ''
        menclothes.innerHTML = ''
        womencolthes.innerHTML = ''
        electronics.innerHTML = ''

        let men = true, women = true, jew = true, elec = true;
        let all = false;

        filteredProducts.forEach((item) => {
            if (item.category === "men's clothing") {
                addSpecific(item, menclothes)
                men = false
            }
            if (item.category === "women's clothing") {
                addSpecific(item, womencolthes)
                women = false
            }
            if (item.category === "electronics") {
                addSpecific(item, electronics);
                elec = false
            }
            if (item.category === "jewelery") {
                addSpecific(item, jewellery)
                jew = false
            }
        })

        if (men) {
            mensec.style.display = 'none'
            menclothes.style.display = 'none'
        }
        else {
            mensec.style.display = 'flex'
            menclothes.style.display = 'flex'
        }
        if (women) {
            womensec.style.display = 'none'
            womencolthes.style.display = 'none'
        }
        else {
            womensec.style.display = 'flex'
            womencolthes.style.display = 'flex'
        }
        if (jew) {
            jewsec.style.display = 'none'
            jewellery.style.display = "none"
        }
        else {
            jewsec.style.display = 'flex'
            jewellery.style.display = 'flex'
        }
        if (elec) {
            elesec.style.display = 'none'
            electronics.style.display = 'none'
        }
        else {
            elesec.style.display = 'flex'
            electronics.style.display = 'flex'
        }

        if (men && women && jew && elec) {
            all = true;
        }
        else {
            all = false;
        }

        if (all) {
            document.getElementById('emptySearch').style.display = 'flex';
        }
        else {
            document.getElementById('emptySearch').style.display = 'none';
        }
    }

    if (filteredProducts.length === 0) {
        jewellery.style.display = 'flex'
        menclothes.style.display = 'flex'
        womencolthes.style.display = 'flex'
        electronics.style.display = 'flex'

        jewellery.innerHTML = ""
        menclothes.innerHTML = ''
        womencolthes.innerHTML = ''
        electronics.innerHTML = ''

        addProducts(products);
    }

})


let cartProducts = JSON.parse(localStorage.getItem('cartProducts'))
//adding of products to cart
//const productId = event.target.dataset.productId;
function addToCartFunc(event) {
    const id = event.target.dataset.productId;
    cartProducts.push(id);
    document.getElementById('cartcount').innerText = cartProducts.length;
    event.target.innerText = 'Added';
    setTimeout(()=>{
        event.target.innerText = "Add to cart"
    },2000)
    localStorage.setItem('cartProducts',JSON.stringify(cartProducts));
}
