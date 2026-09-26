// ===============================
// HERO SLIDER
// ===============================

let currentSlide = 0;

let slides = document.querySelectorAll(".slide");
let nextButton = document.querySelector(".next");
let prevButton = document.querySelector(".prev");
let dots = document.querySelectorAll(".dot");


function showSlide(index) {

    slides.forEach(function (slide) {
        slide.classList.remove("active");
    });

    slides[index].classList.add("active");


    dots.forEach(function (dot) {
        dot.classList.remove("active");
    });

    dots[index].classList.add("active");

}


// NEXT BUTTON

nextButton.addEventListener("click", function () {

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);

});


// PREVIOUS BUTTON

prevButton.addEventListener("click", function () {

    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);

});


// DOTS

dots.forEach(function (dot, index) {

    dot.addEventListener("click", function () {

        currentSlide = index;

        showSlide(currentSlide);

    });

});


// AUTO SLIDER

setInterval(function () {

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);

}, 20000);



// ===============================
// PRODUCTS
// ===============================

let searchBar = document.querySelector("#search");

let submitBtn = document.querySelector(".submit");

let productsData = [];



// ===============================
// CART
// ===============================

let cartCount = document.querySelector("#cartCount");

let count = 0;

let cart = [];



// ===============================
// CATEGORY
// ===============================

let categorySearch =
    document.querySelector("#category-search");



// ===============================
// GET PRODUCTS
// ===============================

async function getProducts() {

    try {

        let response =
            await fetch("https://dummyjson.com/products");

        if (!response.ok) {

            throw new Error("Unable to fetch products");

        }

        let data = await response.json();

        productsData = data.products;

        displayProducts(productsData);

    }

    catch (error) {

        console.log("Something went wrong:", error);

    }

}



// ===============================
// DISPLAY PRODUCTS
// ===============================

function displayProducts(products) {

    let productsContainer =
        document.querySelector("#products");

    productsContainer.innerHTML = "";


    products.forEach(function (product) {

        productsContainer.innerHTML += `

            <div class="card">

                <img src="${product.images[0]}">

                <h3>${product.title}</h3>

                <p>₹ ${product.price}</p>

                <p>${product.category}</p>

                <p>⭐⭐⭐ ${product.rating}</p>

                <button
                    class="addCart"
                    data-id="${product.id}">
                    Add to Cart
                </button>

            </div>

        `;

    });



    // ===============================
    // ADD TO CART BUTTONS
    // ===============================

    let addCartButtons =
        document.querySelectorAll(".addCart");


    addCartButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            let productId =
                Number(button.dataset.id);


            let selectedProduct =
                productsData.find(function (product) {

                    return product.id === productId;

                });


            // CHECK IF PRODUCT ALREADY EXISTS

            let existingProduct =
                cart.find(function (product) {

                    return product.id === productId;

                });


            if (existingProduct) {

                existingProduct.quantity++;

            }

            else {

                cart.push({

                    ...selectedProduct,

                    quantity: 1

                });

            }


            // UPDATE CART COUNT

            count++;

            cartCount.textContent = count;


            // BUTTON TEXT

            button.textContent =
                "Successfully Added";


            // DISPLAY CART

            displayCart();

        });

    });

}



// ===============================
// SEARCH PRODUCTS
// ===============================

submitBtn.addEventListener("click", function () {

    let search =
        searchBar.value.toLowerCase();


    let foundProducts =
        productsData.filter(function (product) {

            return product.title
                .toLowerCase()
                .includes(search);

        });


    if (foundProducts.length === 0) {

        document.querySelector("#products").innerHTML =
            "No Product Found";

    }

    else {

        displayProducts(foundProducts);

    }

});



// ===============================
// CLEAR SEARCH
// ===============================

searchBar.addEventListener("input", function () {

    if (searchBar.value === "") {

        displayProducts(productsData);

    }

});



// ===============================
// CATEGORY FILTER
// ===============================

categorySearch.addEventListener("change", function () {

    let selectedCategory =
        categorySearch.value;


    let filteredProducts =
        productsData.filter(function (product) {

            return selectedCategory === "" ||
                   product.category === selectedCategory;

        });


    displayProducts(filteredProducts);

});



// ===============================
// DISPLAY CART
// ===============================

function displayCart() {

    let cartProducts = document.querySelector("#cart-products");

    cartProducts.innerHTML = "";

    cart.forEach(function(product) {

        cartProducts.innerHTML += `
            <div class="cart-item">

                <img src="${product.images[0]}">

                <h3>${product.title}</h3>

                <p>₹${product.price}</p>

                <div class="quantity">

                    <button
                        class="minusBtn"
                        data-id="${product.id}">
                        −
                    </button>

                    <span class="quantityValue">
                        ${product.quantity}
                    </span>

                    <button
                        class="plusBtn"
                        data-id="${product.id}">
                        +
                    </button>

                </div>

                <button
                    class="removeBtn"
                    data-id="${product.id}">
                    X
                </button>

            </div>
        `;
    });


    // ===============================
    // CART TOTAL
    // ===============================

    let subtotal = 0;

    cart.forEach(function(product) {

        subtotal += product.price * product.quantity;

    });

    document.querySelector("#cartSubtotal").textContent =
        "₹" + subtotal.toFixed(2);

    document.querySelector("#cartTotal").textContent =
        "₹" + subtotal.toFixed(2);

    // ===============================
    // PLUS BUTTON
    // ===============================

    let plusButtons =
        document.querySelectorAll(".plusBtn");

    plusButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            let productId =
                Number(button.dataset.id);

            let selectedProduct =
                cart.find(function(product) {

                    return product.id === productId;

                });

            selectedProduct.quantity++;

            count++;

            cartCount.textContent = count;

            displayCart();

        });

    });


    // ===============================
    // MINUS BUTTON
    // ===============================

    let minusButtons =
        document.querySelectorAll(".minusBtn");

    minusButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            let productId =
                Number(button.dataset.id);

            let selectedProduct =
                cart.find(function(product) {

                    return product.id === productId;

                });

            if (selectedProduct.quantity > 1) {

                selectedProduct.quantity--;

                count--;

            }
            else {

                cart = cart.filter(function(product) {

                    return product.id !== productId;

                });

                count--;

            }

            cartCount.textContent = count;

            displayCart();

        });

    });


    // ===============================
    // REMOVE BUTTON
    // ===============================

    let removeButtons =
        document.querySelectorAll(".removeBtn");

    removeButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            let productId =
                Number(button.dataset.id);

            let selectedProduct =
                cart.find(function(product) {

                    return product.id === productId;

                });

            count =
                count - selectedProduct.quantity;

            cart =
                cart.filter(function(product) {

                    return product.id !== productId;

                });

            cartCount.textContent = count;

            displayCart();

        });

    });

}


// ===============================
// CART DRAWER
// ===============================

let cartLink =
    document.querySelector("#cart-link");

let cartSection =
    document.querySelector("#cart-section");

let closeCart =
    document.querySelector("#close-cart");


cartLink.addEventListener("click", function (event) {

    event.preventDefault();

    cartSection.classList.add("open");

});


closeCart.addEventListener("click", function () {

    cartSection.classList.remove("open");

});


getProducts();

// ===============================
// CHECKOUT
// ===============================

let checkoutBtn = document.querySelector("#checkoutBtn");

checkoutBtn.addEventListener("click", function () {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Order Placed Successfully!");

    cart = [];
    count = 0;

    cartCount.textContent = count;

    displayCart();

});

// ===============================
// NEWSLETTER
// ===============================

let newsletterEmail =
    document.querySelector("#newsletterEmail");

let subscribeBtn =
    document.querySelector("#subscribeBtn");

let subscribeMessage =
    document.querySelector("#subscribeMessage");


subscribeBtn.addEventListener("click", function() {

    if (newsletterEmail.checkValidity()) {

        subscribeBtn.textContent =
            " Subscribed !";

        newsletterEmail.value = "";
        setInterval(function(){
            subscribeBtn.textContent="Subscribe"
        },2000);
    }
    else {

        subscribeBtn.textContent =
            "Please enter a valid email!";

    }

});

// ===============================
// contact form
// ===============================

let contactForm = document.querySelector("#contactForm");
let contactMessage = document.querySelector("#contactMessage");
let contactSubmitBtn = document.querySelector("#contactSubmitBtn");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.querySelector("#name").value.trim();
    let email = document.querySelector("#email").value.trim();
    let message = document.querySelector("#Message").value.trim();

    if (name === "" || email === "" || message === "") {
        contactMessage.textContent = "Please fill all fields!";
        return;
    }

    if (!document.querySelector("#email").checkValidity()) {
        contactMessage.textContent = "Please enter a valid email!";
        return;
    }

    contactSubmitBtn.textContent = "Message Sent Successfully!";

    contactForm.reset();
    setTimeout(function(){
        contactSubmitBtn.textContent="Send Message";
    },2000);

});

getProducts();



// login Form 
 const loginLink = document.getElementById("loginLink");

loginLink.addEventListener("click", function (e) {

    e.preventDefault();

    const loginPage = `
        <div class="login-overlay" id="loginOverlay">

            <div class="login-box">

                <button class="close-login" id="closeLogin">✕</button>

                <h2>Login</h2>

                <form id="loginForm">

                    <label for="loginEmail">Email</label>
                    <input
                        type="email"
                        id="loginEmail"
                        placeholder="Enter your email"
                        required
                    >

                    <label for="loginPassword">Password</label>
                    <input
                        type="password"
                        id="loginPassword"
                        placeholder="Enter your password"
                        required
                    >

                    <button type="submit" class="login-btn">
                        Login
                    </button>

                   <button type="submit" class="login-btn">
                        SignUp
                    </button>

                </form>

            </div>

        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", loginPage);

    const closeLogin = document.getElementById("closeLogin");
    const loginOverlay = document.getElementById("loginOverlay");

    closeLogin.addEventListener("click", function () {
        loginOverlay.remove();
    });

});

// humburger

let menuToggle = document.querySelector("#menuToggle");
let navMenu = document.querySelector("nav ul");

menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("show");
});

let navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("show");

    });

});

let a =1;
let b=2;
console.log(a+b);
