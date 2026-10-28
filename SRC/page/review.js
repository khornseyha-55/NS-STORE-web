
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

fetch('Allproducts.json')
    .then(response => response.json())
    .then(AllProducts => {

        const product = AllProducts.find(
            p => p.id == productId
        );
// productDetails
        if (product) {
            document.getElementById('productDetails').innerHTML = `
                <div class="row">
                    <div class="col-md-6 col-12">
                        <div class="card-product-view mt-5">
                            <img src="${product.image}" class="card-img-top rounded-2 shadow">
                            <div class="card-view-title ms-4">
                                <h4 class="name h4">${product.name}</h4>
                                <p class="price">$${product.price} &ensp;<del class="text-danger"> $${product.discount}</del></p>
                                <div class="mt-5 btn-chose">
                                    <div class="btn btn-outline-danger active"><i class="fa-regular fa-heart"></i></div>
                                    <div class="btn btn-primary" onclick='addToCart(${product.id})' ><i class="fa-solid fa-basket-shopping"></i></div>
                                    <a href="Products.html" class="btn btn-outline-warning">Back</a>
                                    <a href="/SRC/page/checkout.html?id=${product.id}" class="btn btn-outline-primary mt-2 w-75 text-decoration-none Checkout">Checkout</a>
                                </div>
            
                            </div>
                        </div>  
                        <hr>
                    </div>
                    
                    <div class="col-12 col-md-6">
                        <div class="view-card-title mt-5">
                            <h4>Order summary</h4> <hr width="175px">
                            <p class="h5 view-Description-img"> <img src="/SRC/Assect/image/job-description.png" class="me-1"/> Description</p>
                            <p class="text-center">${product.title}</P
                            <p class="h5"> <img src="/SRC/Assect/image/free-delivery.png"> Delivery <spam class="fw-bold">: Free</span></p>
                        </div>
                        
                    </div>
                </div>
            `;

        }
    });

function toggleTheme() {
    const d = document.documentElement;
    const isDark = d.getAttribute('data-theme') === 'dark';
    d.setAttribute('data-theme', isDark ? 'light' : 'dark');
    document.getElementById('themeIcon').className = isDark ? 'fa fa-moon' : 'fa fa-sun text-warning';
}

function paymentDataDisplay(){
    document.getElementById("username").textContent = localStorage.getItem("name");
    document.getElementById("useremail").textContent = localStorage.getItem("email");
    document.getElementById("userphone").textContent = localStorage.getItem("Phone");
    document.getElementById("useraddress").textContent = localStorage.getItem("address");
    document.getElementById("usercountry").textContent = localStorage.getItem("County");
    document.getElementById("Date").textContent = localStorage.getItem("date");
}