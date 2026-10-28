let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    // 2. Render Cart & Quantity Selectors
    function renderCart() {
        const container = document.getElementById('cartContainer');
        
        if (cart.length === 0) {
            container.innerHTML = `
                <div class="text-center py-5">
                    <h5 class="text-muted mb-3">Your cart is empty.</h5>
                    <a href="/SRC/page/Products.html" class="btn btn-primary">Start Shopping</a>
                </div>`;
            updateTotals();
            return;
        }

        container.innerHTML = '';
        cart.forEach((item, index) => {
            container.innerHTML += `
                <div class="d-flex align-items-center mb-4 ${index !== cart.length - 1 ? 'border-bottom pb-4' : ''}">
                    <img src="${item.image}" alt="${item.name}" class="cart-img me-3">
                    <div class="flex-grow-1">
                        <h5 class="fw-bold mb-1">${item.name}</h5>
                        <p class="text-muted mb-0">$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="me-5 bg-light btn fw-bold">Instock</div>
                    <div class="d-flex align-items-center me-4">
                        <button class="btn btn-outline-secondary qty-btn fw-bold" onclick="updateQty(${item.id}, -1)">-</button>
                        <span class="mx-3 fw-bold fs-5">${item.quantity}</span>
                        <button class="btn btn-outline-secondary qty-btn fw-bold" onclick="updateQty(${item.id}, 1)">+</button>
                    </div>
                    <div class="text-end" style="min-width: 80px;">
                        <span class="fw-bold">$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    
                </div>
            `;
        });
        updateTotals();
    }

    // 3. Update Quantity & Remove Items
    function updateQty(id, change) {
        const itemIndex = cart.findIndex(i => i.id === id);
        if (itemIndex > -1) {
            cart[itemIndex].quantity += change;
            
            // Remove item if quantity drops to 0
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
            // Save updated cart to localStorage and re-render
            localStorage.setItem('myCart', JSON.stringify(cart));
            renderCart();
        }
    }

    // 4. Calculate Totals
    function updateTotals() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const qty = cart.reduce((sum, item) => sum + (item.quantity), 0);


        document.getElementById('subtotalDisplay').innerText = `$${total.toFixed(2)}`;
        const totalPrice = document.getElementById('totalDisplay').innerText = `$${total.toFixed(2)}`;  
        document.getElementById('payprice').innerText = '$ ' + total.toFixed(2);
        document.getElementById('payqty').innerText = qty;
        
        document.getElementById('username').innerText = document.getElementById('name').value;
        document.getElementById('userphone').innerText = document.getElementById('phone').value;
        document.getElementById('userdate').innerText = document.getElementById('date').value;
        document.getElementById('userbank').innerText = document.getElementById('PayBnak').value;
        document.getElementById('useremail').innerText = document.getElementById('email').value;
        document.getElementById('ref').innerText = "000885399222";
    }

    function checkout() {
        let payment = document.getElementById("mypayment");
        if(cart.length === 0) {
            const toast = new bootstrap.Toast(document.getElementById('cartToast'));
            payment.style.display = "none";
            toast.show();
            setTimeout(() => {
                window.location.href = "/SRC/page/Products.html";
            }, 2000);
            return;
        }
        else if (cart.length > 0){
            renderCart();     
        }

        updateTotals();
    }
    function payments (){
        if(cart.length === 0) {
            const toast = new bootstrap.Toast(document.getElementById('cartToast'));
            payment.style.display = "none";
            toast.show();
            setTimeout(() => {
                window.location.href = "/SRC/page/Products.html";
            }, 3500);
            return;
        }
        else if (cart.length > 0){
            localStorage.removeItem('myCart');
            cart = [];
            renderCart();    
        }
    }
    const pint = document.getElementById('mypayment')
    function Print(){
        document.getElementById('FromBilling').style.display = "none";
        document.getElementById('navbar').style.display = "none";
        document.querySelector('.footer').style.display = "none";
        document.querySelector('.hero').style.display = "none";
        document.getElementById('btnPrint').style.display = "none";
        location.reload();
        pint = window.print();
        
    };
    // Initialize Page
    renderCart();   