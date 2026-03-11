const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

let cart = [];

let cartlength = cart.length;

cartBtn.addEventListener("click", () => {
    updateCartModel();
    cartModal.style.display = "flex";
})

cartModal.addEventListener("click", (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
})

closeModalBtn.addEventListener("click", () => {
    cartModal.style.display = "none";
})

menu.addEventListener("click", (event) => {
    let parentButton = event.target.closest("button[data-name]");

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));

        addToCart(name, price);
    }
});


function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name)

    if (existingItem) {
        existingItem.quantity += 1

    } else {
        cart.push({
            name,
            price,
            quantity: 1
        })
    }
    updateCartModel()

    Toastify({
        text: "Produto adicionado ao carrinho!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        className: "success",
        style: {
          background: "linear-gradient(135deg, #00d084 0%, #00b870 100%)",
          borderRadius: "12px",
          fontWeight: "600",
          padding: "16px 24px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
        },
      }).showToast();
}

function updateCartModel() {
    cartItemsContainer.innerHTML = "";
    let total = 0;


    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("cart-item");

        cartItemElement.innerHTML =
            `
     <div class="flex items-center justify-between">
         <div>
            <p class="font-bold text-charcoal">${item.name}</p>
            <p class="text-sm text-gray-600">Qtd: ${item.quantity}</p>
            <p class="font-bold mt-1 text-flame-orange">R$ ${item.price.toFixed(2)}</p>
         </div> 
         <div>
            <button class="remove-from-cart-btn bg-flame-red text-white px-4 py-2 rounded-lg font-bold hover:bg-flame-red-dark transition-all" data-name="${item.name}">
                Remover
            </button>
         </div>
     </div>  
     `;

        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement);
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length
}


cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name");

        removeItemCart(name);
    }
})

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if (index !== -1) {
        const item = cart[index];

        if (item.quantity > 1) {
            item.quantity -= 1;
            updateCartModel();
            return;
        }
        cart.splice(index, 1);
        updateCartModel();
    }
}

function getAddress() {
    return addressInput.value;
}
addressInput.addEventListener("input", (event) => {
    let inputValue = event.target.value;
    if (inputValue !== "") {
        addressInput.classList.remove("border-flame-red")
        addressWarn.classList.add("hidden");
    }
});

function sendOrder() {
    const isOpen = checkRestaurantOpen();
    const address = getAddress();
    
    if (cart.length === 0) return;

    if (isOpen) {
        if (address !== "") {
            const cartItems = cart.map((item) => {
                return `${item.quantity}x ${item.name}`;
            }).join("\n");

            const totalPrice = cart.reduce((acc, item) => {
                return acc + (item.price * item.quantity);
            }, 0);

            const message = encodeURIComponent(`${cartItems}

Local: ${address}\nPreço Total: R$ ${totalPrice.toFixed(2)}
`);

            const phone = "47988095244";

            window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
        } else {
            addressWarn.classList.remove("hidden");
            addressInput.classList.add("border-flame-red");
            addressInput.classList.add("address-warn-shake");
            setTimeout(() => {
                addressInput.classList.remove("address-warn-shake");
            }, 300);
        }
    } else {
        Toastify({
            text: "Ops o restaurante está fechado!",
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "right", 
            stopOnFocus: true,
            className: "error",
            style: {
                background: "linear-gradient(135deg, #ff3838 0%, #e62828 100%)",
                borderRadius: "12px",
                fontWeight: "600",
                padding: "16px 24px",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
            },
        }).showToast();
    }
}

function checkRestaurantOpen() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 12 && hora <= 22;
}

const spanItem = document.getElementById('date-span');
const isOpen = checkRestaurantOpen();

if (isOpen) {
    spanItem.classList.add('bg-fresh-green');
    spanItem.classList.remove('bg-flame-red');
} else {
    spanItem.classList.add('bg-flame-red');
    spanItem.classList.remove('bg-fresh-green');
}

