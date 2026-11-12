// VALLShop - interaksi navigasi, filter, notifikasi, dan formulir
document.addEventListener("DOMContentLoaded", () => {
  // Tahun otomatis pada footer
  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Tandai menu sesuai halaman yang sedang dibuka
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  // Menu hamburger untuk layar kecil
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
    });
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Notifikasi tombol keranjang (contoh tampilan, belum terhubung ke pembayaran)
  const toast = document.querySelector(".toast");
  let toastTimer;
  document.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", () => {
      if (!toast) return;
      toast.textContent = `${button.dataset.product} ditambahkan (simulasi).`;
      toast.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
    });
  });

  // Filter produk
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-grid-wide .product-card");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(item => item.classList.toggle("active", item === button));
      productCards.forEach(card => {
        card.hidden = filter !== "all" && card.dataset.category !== filter;
      });
    });
  });

  // Form kontak: buka aplikasi email pengguna
  const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");
      const recipient = "vallshop@example.com"; // masukkan email mu lalu pesan 
      const subject = encodeURIComponent(`Pesan VALLShop dari ${name}`);
      const body = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`);
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    });
  }
});
// TAMBAH PRODUK DI DALAM DAFTAR INI.
// Salin satu objek produk, lalu ubah nama, kategori, harga, dan gambar.
const products = [
  {
    name: "Kaos Basic Premium",
    category: "FASHION",
    price: 89000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&auto=format&fit=crop"
  },
  {
    name: "Headphone Wireless",
    category: "ELEKTRONIK",
    price: 249000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&auto=format&fit=crop"
  },
  {
    name: "Classic Watch",
    category: "AKSESORI",
    price: 179000,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&auto=format&fit=crop"
  },
  {
    name: "Jaket Kulit Premium",
    category: "FASHION",
    price: 325000,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900&auto=format&fit=crop"
  },
  {
    name: "Headphone Studio",
    category: "ELEKTRONIK",
    price: 299000,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=900&auto=format&fit=crop"
  },
  {
    name: "Kalung Minimalis",
    category: "AKSESORI",
    price: 125000,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&auto=format&fit=crop"
  },
  {
    name: "Sneakers Casual",
    category: "FASHION",
    price: 389000,
    image: "https://images.unsplash.com/photo-154	p2291026-7eec264c27ff?w=900&auto=format&fit=crop"
  },
  {
    name: "Tas Selempang",
    category: "AKSESORI",
    price: 159000,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&auto=format&fit=crop"
  },
  {
    name: "Kacamata Modern",
    category: "AKSESORI",
    price: 99000,
    image: "https://images.unsplash.com/photo-151	1499767150-?w=900&auto=format&fit=crop"
  }
];

const grid = document.getElementById("product-grid");
const searchInput = document.getElementById("search");
const emptyMessage = document.getElementById("empty-message");
const cartCount = document.getElementById("cart-count");

let totalCart = 0;

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
}

function renderProducts(list) {
  grid.innerHTML = "";

  list.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const image = document.createElement("img");
    image.className = "product-image";
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";
    image.onerror = () => {
      image.src = "https://placehold.co/900x450/252333/ffffff?text=Foto+Produk";
    };

    const info = document.createElement("div");
    info.className = "product-info";

    const category = document.createElement("p");
    category.className = "product-category";
    category.textContent = product.category;

    const name = document.createElement("h3");
    name.className = "product-name";
    name.textContent = product.name;

    const bottom = document.createElement("div");
    bottom.className = "product-bottom";

    const price = document.createElement("span");
    price.className = "product-price";
    price.textContent = formatRupiah(product.price);

    const button = document.createElement("button");
    button.className = "add-cart";
    button.type = "button";
    button.textContent = "+ Keranjang";
    button.addEventListener("click", () => {
      totalCart += 1;
      cartCount.textContent = totalCart;
      button.textContent = "Ditambahkan ✓";
      setTimeout(() => button.textContent = "+ Keranjang", 900);
    });

    bottom.append(price, button);
    info.append(category, name, bottom);
    card.append(image, info);
    grid.append(card);
  });

  emptyMessage.hidden = list.length !== 0;
}

searchInput.addEventListener("input", (event) => {
  const keyword = event.target.value.toLowerCase().trim();
  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(keyword) ||
    product.category.toLowerCase().includes(keyword)
  );
  renderProducts(filtered);
});

renderProducts(products);
