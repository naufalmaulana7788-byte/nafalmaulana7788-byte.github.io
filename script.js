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
      const recipient = "vallshop@example.com"; // GANTI dengan email toko kamu
      const subject = encodeURIComponent(`Pesan VALLShop dari ${name}`);
      const body = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`);
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    });
  }
});