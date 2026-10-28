let ProductsAdd = [];
    function rangebnt(value){
        document.querySelector('.value-scroll').innerHTML = value + ".00 $";
    }

    async function loadProducts() {
        try {
            const response = await fetch('Allproducts.json');
            ProductsAdd = await response.json();
            renderProducts(ProductsAdd);
            updateCartBadge();
        } catch (error) {
            document.getElementById('productGrid').innerHTML = '<div class="col-12 text-center text-danger">Failed to load products. Ensure you are running a local server.</div>';
        }
    }

    function renderProducts(products) {
        const grid = document.getElementById('productGrid');
        grid.innerHTML = '';

        if (products.length === 0) {
            grid.innerHTML = '<div class="col-12 text-center text-muted mt-4">No products found.</div>';
            return;
        }
        products.forEach(product => {
            grid.innerHTML += `
                <div class="col">
                    <div class="card  shadow border-0 w-100 card_hover reveal" >
                        <a href="/SRC/page/ReviewProducts.html?id=${product.id}" class="text-decoration-none">
                            <img class="card-img-top" src="${product.image}" alt="">
                        </a >
                        <div class="card-body w-100 h-100 overflow-hidden card_text">
                            <h4 class="card-title  fw-bold ">${product.name} <button class="btn btn-outline-danger active float-end" title="WishList"><i class="fa-regular fa-heart"></i></button ></h4>
                            <p class="card-price  fw-bold ">$${product.price}&ensp;<del class="text-danger"> $${product.discount}</del></p>
                            <div class="btn-chose">
                                <div class="btn btn-outline-primary w-25" title="Add to Cart" onclick='addToCart(${product.id})' ><i class="fa-solid fa-basket-shopping"></i></div>
                                <a href="/SRC/page/ReviewProducts.html?id=${product.id}" class="btn text-dark btn-outline-light border border-1" title="Review"><i class="fa-solid fa-maximize"></i></a >
                            </div>
                        </div>
                    </div>
                </div> 
            `;
        });
        
        // Re-trigger scroll observer for new elements
        setTimeout(revealOnScroll, 100); 
    }

    document.getElementById('searchInput').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = ProductsAdd.filter(p => p.name.toLowerCase().includes(term));
        renderProducts(filtered);
    });

    function addToCart(productId) {
        const product = ProductsAdd.find(p => p.id === productId);
        let cart = JSON.parse(localStorage.getItem('myCart')) || [];
        
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        localStorage.setItem('myCart', JSON.stringify(cart));
        updateCartBadge();

        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    function updateCartBadge() {
        const cart = JSON.parse(localStorage.getItem('myCart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cartBadge').innerText = totalItems;
    }

    
    function revealOnScroll() {
        const reveals = document.querySelectorAll(".reveal");
        const windowHeight = window.innerHeight;
        
        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            const revealPoint = 50; // Trigger before it fully enters
            if (elementTop < windowHeight - revealPoint) {
                reveal.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    
    loadProducts();

function spark(event){
    let mouse = document.createElement('mouse');
    mouse.style.left = (event.pageX) + 'px';
    mouse.style.top = (event.pageY) + 'px';

    mouse.style.scale = `${Math.random() * 2 + 1}`;

    mouse.style.setProperty('--x', getRandomTransitionValue());
    mouse.style.setProperty('--y', getRandomTransitionValue());

    document.body.appendChild(mouse);

    setTimeout(() => {
        document.body.removeChild(mouse);
    }, 2000);
}

function getRandomTransitionValue(){
    return `${Math.random() * 60 - 30}px`;
}

document.addEventListener('mousemove', spark);
  
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
  document.getElementById('scrollTopBtn').classList.toggle('show', window.scrollY > 400);
});

    
    