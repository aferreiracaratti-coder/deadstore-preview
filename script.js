const products = [
  {
    id: 1,
    name: "Thrasher Flame Hoodie",
    price: "USD 78",
    status: "available",
    statusLabel: "Available",
    category: "hoodies",
    image: "assets/images/producto-1.webp",
    description: "Hoodie heavyweight con print frontal clásico y fit oversize. Pieza de alta rotación en drops street vintage."
  },
  {
    id: 2,
    name: "Hard Rock Zip Hoodie",
    price: "USD 85",
    status: "available",
    statusLabel: "Available",
    category: "hoodies",
    image: "assets/images/producto-2.webp",
    description: "Zip hoodie Hard Rock Café en tono marrón con interior claro. Pieza fuerte para drop de invierno."
  },
  {
    id: 3,
    name: "Ithaca College Hoodie",
    price: "USD 74",
    status: "available",
    statusLabel: "Available",
    category: "hoodies",
    image: "assets/images/producto-8-hoodie.webp",
    description: "Hoodie gris jaspeado varsity style con logo central. Básico premium de alta salida."
  },
  {
    id: 4,
    name: "Gothic Cross Back Shirt",
    price: "USD 54",
    status: "available",
    statusLabel: "Available",
    category: "shirts",
    image: "assets/images/producto-3-camisa.webp",
    description: "Camisa blanca con gráfica trasera de alto impacto. Funciona como statement piece en layering urbano."
  },
  {
    id: 5,
    name: "Nike Court Mesh Short",
    price: "USD 45",
    status: "last-unit",
    statusLabel: "Last unit",
    category: "shorts-pants",
    image: "assets/images/producto-4-short.webp",
    description: "Short mesh Nike reversible en blanco y navy. Pieza cómoda y versátil para uso diario."
  },
  {
    id: 6,
    name: "Black Utility Overshirt",
    price: "USD 58",
    status: "available",
    statusLabel: "Available",
    category: "shirts",
    image: "assets/images/producto-5-camisa.webp",
    description: "Overshirt negra con interior rayado en bordó. Estética sobria y textura premium para combinar con básicos."
  },
  {
    id: 7,
    name: "Nike Cargo Snow Pant",
    price: "USD 68",
    status: "available",
    statusLabel: "Available",
    category: "shorts-pants",
    image: "assets/images/producto-6-pantalon.webp",
    description: "Cargo pant azul oscuro, tela técnica y bolsillos utilitarios. Perfil street funcional con salida rápida."
  },
  {
    id: 8,
    name: "Nike Red Track Pant",
    price: "USD 62",
    status: "last-unit",
    statusLabel: "Last unit",
    category: "shorts-pants",
    image: "assets/images/producto-7-pantalon.webp",
    description: "Pantalón deportivo vintage Nike en rojo intenso con panel lateral negro. Ideal para looks urbanos de contraste."
  }
];

const categoryLabels = {
  hoodies: "Hoodie",
  shirts: "Shirt",
  "shorts-pants": "Shorts & Pants"
};

const productGrid = document.getElementById("productGrid");
const categoryButtons = Array.from(document.querySelectorAll(".category-card"));

const modal = document.getElementById("productModal");
const modalImage = document.getElementById("modalProductImage");
const modalTitle = document.getElementById("modalProductTitle");
const modalPrice = document.getElementById("modalProductPrice");
const modalStatus = document.getElementById("modalProductStatus");
const modalDescription = document.getElementById("modalProductDescription");
const modalBuyBtn = document.getElementById("modalBuyBtn");
const modalClose = document.getElementById("modalClose");

let selectedCategory = "all";

function resolveCategory(product) {
  return product.category || "hoodies";
}

function createProductCard(product) {
  const category = resolveCategory(product);
  const categoryLabel = categoryLabels[category] || "Hoodie";

  return `
    <article class="product-card" data-product-id="${product.id}" tabindex="0" role="button" aria-label="Ver ${product.name}">
      <div class="product-image-wrap">
        <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy" />
        <span class="product-overlay">Ver producto</span>
      </div>
      <div class="product-meta">
        <h3 class="product-title">${product.name}</h3>
        <span class="product-category">${categoryLabel}</span>
        <div class="product-row">
          <span class="product-price">${product.price}</span>
          <span class="product-status" data-status="${product.status}">${product.statusLabel}</span>
        </div>
      </div>
    </article>
  `;
}

function renderProducts() {
  const visibleProducts = selectedCategory === "all"
    ? products
    : products.filter((product) => resolveCategory(product) === selectedCategory);

  productGrid.innerHTML = visibleProducts.map(createProductCard).join("");
}

function openModal(productId) {
  const product = products.find((item) => item.id === Number(productId));

  if (!product) {
    return;
  }

  modalImage.src = product.image;
  modalImage.alt = product.name;
  modalTitle.textContent = product.name;
  modalPrice.textContent = product.price;
  modalStatus.textContent = product.statusLabel;
  modalDescription.textContent = product.description;
  modalBuyBtn.href = "#";

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function handleCategoryClick(event) {
  const button = event.target.closest(".category-card");

  if (!button) {
    return;
  }

  selectedCategory = button.dataset.filter;
  categoryButtons.forEach((item) => item.classList.remove("is-active"));
  button.classList.add("is-active");
  renderProducts();
}

function setupProductEvents() {
  productGrid.addEventListener("click", (event) => {
    const card = event.target.closest(".product-card");
    if (card) {
      openModal(card.dataset.productId);
    }
  });

  productGrid.addEventListener("keydown", (event) => {
    const card = event.target.closest(".product-card");
    if (!card) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal(card.dataset.productId);
    }
  });
}

function setupModalEvents() {
  modal.addEventListener("click", (event) => {
    if (event.target.matches("[data-close-modal='true']")) {
      closeModal();
    }
  });

  modalClose.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

function setupRevealAnimation() {
  const revealItems = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", handleCategoryClick);
});

renderProducts();
setupProductEvents();
setupModalEvents();
setupRevealAnimation();
