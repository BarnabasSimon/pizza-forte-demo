const pizzas = [
    {
        id: 1,
        name: "Classic Margherita",
        category: "classic",
        price: 3990,
        image: "images/margherita.png",
        description: "Paradicsomszósz, mozzarella, friss bazsalikom.",
        allergens: ["gluten", "lactose"]
    },
    {
        id: 2,
        name: "Csípős Pepperoni",
        category: "spicy",
        price: 4490,
        image: "images/pepperoni.png",
        description: "Pepperoni, chili, mozzarella, paradicsomszósz.",
        allergens: ["gluten", "lactose"]
    },
    {
        id: 3,
        name: "BBQ Csirkés",
        category: "meat",
        price: 4790,
        image: "images/bbq.png",
        description: "Csirke, BBQ szósz, lilahagyma, mozzarella.",
        allergens: ["gluten", "lactose"]
    },
    {
        id: 4,
        name: "Sonkás Gombás",
        category: "classic",
        price: 4290,
        image: "images/margherita.png",
        description: "Sonka, gomba, mozzarella, paradicsomszósz.",
        allergens: ["gluten", "lactose"]
    },
    {
        id: 5,
        name: "Magyaros",
        category: "spicy",
        price: 4690,
        image: "images/pepperoni.png",
        description: "Kolbász, bacon, lilahagyma, erős paprika.",
        allergens: ["gluten", "lactose"]
    },
    {
        id: 6,
        name: "Négysajtos",
        category: "veggie",
        price: 4590,
        image: "images/margherita.png",
        description: "Mozzarella, cheddar, parmezán, kéksajt.",
        allergens: ["gluten", "lactose"]
    },
    {
        id: 7,
        name: "Hawaii",
        category: "classic",
        price: 4390,
        image: "images/bbq.png",
        description: "Sonka, ananász, mozzarella, paradicsomszósz.",
        allergens: ["gluten", "lactose"]
    },
    {
        id: 8,
        name: "Vegetariana",
        category: "veggie",
        price: 4290,
        image: "images/margherita.png",
        description: "Kukorica, paprika, gomba, paradicsom, olívabogyó.",
        allergens: ["gluten", "lactose"]
    },
    {
        id: 9,
        name: "Tengeri Tonhalas",
        category: "premium",
        price: 4890,
        image: "images/margherita.png",
        description: "Tonhal, lilahagyma, olívabogyó, mozzarella.",
        allergens: ["gluten", "lactose"]
    },
    {
        id: 10,
        name: "Bacon Supreme",
        category: "meat",
        price: 4990,
        image: "images/pepperoni.png",
        description: "Bacon, sonka, szalámi, mozzarella, BBQ alap.",
        allergens: ["gluten", "lactose"]
    },
    {
        id: 11,
        name: "Diavola",
        category: "spicy",
        price: 4790,
        image: "images/pepperoni.png",
        description: "Csípős szalámi, jalapeño, chili, mozzarella.",
        allergens: ["gluten", "lactose"]
    },
    {
        id: 12,
        name: "Prosciutto Crudo",
        category: "premium",
        price: 5290,
        image: "images/margherita.png",
        description: "Pármai sonka, rukkola, parmezán, mozzarella.",
        allergens: ["gluten", "lactose"]
    },
    {
        id: 13,
        name: "Carbonara Pizza",
        category: "premium",
        price: 4990,
        image: "images/bbq.png",
        description: "Tejszínes alap, bacon, tojás, parmezán.",
        allergens: ["gluten", "lactose", "egg"]
    },
    {
        id: 14,
        name: "Mexikói Csípős",
        category: "spicy",
        price: 4890,
        image: "images/pepperoni.png",
        description: "Marhahús, bab, kukorica, jalapeño, chili.",
        allergens: ["gluten", "lactose"]
    },
    {
        id: 15,
        name: "Pesto Verde",
        category: "veggie",
        price: 4690,
        image: "images/margherita.png",
        description: "Pesto, mozzarella, paradicsom, rukkola.",
        allergens: ["gluten", "lactose", "nuts"]
    }
];

let cart = [];
let selectedCategory = "all";

const allergenNames = {
    gluten: "Glutén",
    lactose: "Laktóz",
    egg: "Tojás",
    nuts: "Diófélék"
};

const formatPrice = (price) => `${price.toLocaleString("hu-HU")} Ft`;

const productGrid = document.getElementById("product-grid");
const allergenFilter = document.getElementById("allergen-filter");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const categoryButtons = document.querySelectorAll(".category-btn");

const orderForm = document.getElementById("order-form");
const orderModal = document.getElementById("order-modal");
const modalClose = document.getElementById("modal-close");

const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const navLinks = document.getElementById("nav-links");

function renderProducts() {
    if (!productGrid) return;

    const selectedAllergen = allergenFilter ? allergenFilter.value : "none";

    let filteredPizzas = pizzas;

    if (selectedCategory !== "all") {
        filteredPizzas = filteredPizzas.filter((pizza) => pizza.category === selectedCategory);
    }

    if (selectedAllergen !== "none") {
        filteredPizzas = filteredPizzas.filter((pizza) => !pizza.allergens.includes(selectedAllergen));
    }

    productGrid.innerHTML = "";

    if (filteredPizzas.length === 0) {
        productGrid.innerHTML = `
            <div class="product-card">
                <h3>Nincs találat</h3>
                <p>Próbálj másik kategóriát vagy allergén szűrőt választani.</p>
            </div>
        `;
        return;
    }

    filteredPizzas.forEach((pizza) => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <div class="product-top">
                <div class="product-info">
                    <h3>${pizza.name}</h3>
                    <p>${pizza.description}</p>

                    <div class="allergens">
                        ${pizza.allergens.map((allergen) => `<span>${allergenNames[allergen]}</span>`).join("")}
                    </div>

                    <span class="product-price">${formatPrice(pizza.price)}</span>
                </div>

                <img src="${pizza.image}" alt="${pizza.name}">
            </div>

            <button class="add-cart-btn" onclick="addToCart(${pizza.id})">
                Kosárba
            </button>
        `;

        productGrid.appendChild(card);
    });
}

function addToCart(id) {
    const pizza = pizzas.find((item) => item.id === id);
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...pizza,
            quantity: 1
        });
    }

    renderCart();
}

function increaseQuantity(id) {
    const item = cart.find((pizza) => pizza.id === id);

    if (item) {
        item.quantity++;
    }

    renderCart();
}

function decreaseQuantity(id) {
    const item = cart.find((pizza) => pizza.id === id);

    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {
        cart = cart.filter((pizza) => pizza.id !== id);
    }

    renderCart();
}

function removeFromCart(id) {
    cart = cart.filter((pizza) => pizza.id !== id);
    renderCart();
}

function renderCart() {
    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `<p class="small-note">A kosár jelenleg üres.</p>`;
    }

    cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <strong>${item.name}</strong>
            <p>${formatPrice(item.price)} / db</p>

            <div class="cart-controls">
                <button onclick="decreaseQuantity(${item.id})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${item.id})">+</button>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">×</button>
            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = formatPrice(total);
}

categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
        categoryButtons.forEach((btn) => btn.classList.remove("active"));

        button.classList.add("active");
        selectedCategory = button.dataset.category;

        renderProducts();
    });
});

if (allergenFilter) {
    allergenFilter.addEventListener("change", renderProducts);
}

if (orderForm && orderModal) {
    orderForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (cart.length === 0) {
            alert("A kosár üres. Adj hozzá legalább egy pizzát.");
            return;
        }

        orderModal.classList.add("active");
    });
}

if (modalClose && orderModal) {
    modalClose.addEventListener("click", () => {
        orderModal.classList.remove("active");
    });

    orderModal.addEventListener("click", (event) => {
        if (event.target === orderModal) {
            orderModal.classList.remove("active");
        }
    });
}

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}

function renderFeaturedPizzas() {
    const featuredGrid = document.getElementById("featured-pizzas");

    if (!featuredGrid) return;

    const shuffled = [...pizzas].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    featuredGrid.innerHTML = "";

    selected.forEach((pizza) => {
        const card = document.createElement("div");
        card.className = "pizza-card";

        card.innerHTML = `
            <img src="${pizza.image}" alt="${pizza.name}">
            <h3>${pizza.name}</h3>
            <p>${pizza.description}</p>
            <span>${formatPrice(pizza.price)}</span>
        `;

        featuredGrid.appendChild(card);
    });
}

renderFeaturedPizzas(); 
renderProducts();
renderCart();