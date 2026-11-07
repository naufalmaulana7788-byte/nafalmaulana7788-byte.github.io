// =================================
// VALLSTORE - JAVASCRIPT
// =================================

// NOMOR WHATSAPP TOKO
/* =====================================
   VALLSTORE - JAVASCRIPT
   ===================================== */

// GANTI DENGAN NOMOR WHATSAPP TOKO
const nomorWA = "6285104201566";

// DATA KERANJANG
let keranjang = [];


/* =====================================
   FORMAT HARGA RUPIAH
   ===================================== */

function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
}


/* =====================================
   PENCARIAN PRODUK
   ===================================== */

const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("input", function () {

        const keyword = this.value.toLowerCase();

        document.querySelectorAll(".product-card").forEach(card => {

            const nama = card.querySelector("h3")
                .textContent.toLowerCase();

            card.style.display = nama.includes(keyword)
                ? ""
                : "none";

        });

    });
}


/* =====================================
   TAMBAH PRODUK KE KERANJANG
   ===================================== */

function tambahKeranjang(nama, harga) {

    const produk = keranjang.find(item =>
        item.nama === nama
    );

    if (produk) {

        produk.jumlah++;

    } else {

        keranjang.push({
            nama: nama,
            harga: harga,
            jumlah: 1
        });

    }

    tampilkanKeranjang();

}


/* =====================================
   TAMPILKAN KERANJANG
   ===================================== */

function tampilkanKeranjang() {

    const cartList = document.getElementById("cartList");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.getElementById("cartCount");

    if (!cartList) return;

    cartList.innerHTML = "";

    let total = 0;
    let jumlahItem = 0;

    if (keranjang.length === 0) {
        cartList.innerHTML = "<p>Keranjang masih kosong.</p>";
    }

    keranjang.forEach((item, index) => {

        total += item.harga * item.jumlah;
        jumlahItem += item.jumlah;

        cartList.innerHTML += `
            <div class="cart-item">
                <div>
                    <h4>${item.nama}</h4>
                    <p>${formatRupiah(item.harga)} x ${item.jumlah}</p>
                </div>

                <button onclick="hapusKeranjang(${index})">
                    Hapus
                </button>
            </div>
        `;
    });

    cartTotal.textContent = formatRupiah(total);
    cartCount.textContent = jumlahItem;
}


/* =====================================
   HAPUS PRODUK
   ===================================== */

function hapusKeranjang(index) {

    keranjang.splice(index, 1);

    tampilkanKeranjang();

}


/* =====================================
   TOMBOL TAMBAH KERANJANG
   ===================================== */

document.querySelectorAll(".product-card").forEach(card => {

    const tombol = document.createElement("button");

    tombol.textContent = "Tambah Keranjang";

    tombol.className = "buy-button";

    tombol.type = "button";

    tombol.addEventListener("click", function () {

        const nama = card.querySelector("h3").textContent;

        const teksHarga = card.querySelector(".price").textContent;

        const harga = Number(
            teksHarga.replace(/\D/g, "")
        );

        if (!nama || harga <= 0) {
            alert("Data produk tidak valid!");
            return;
        }

        tambahKeranjang(nama, harga);

        alert(nama + " berhasil ditambahkan!");

    });

    const info = card.querySelector(".product-info");

    if (info) {
        info.appendChild(tombol);
    }

});


/* =====================================
   CHECKOUT WHATSAPP
   ===================================== */

function checkoutWhatsApp() {

    if (keranjang.length === 0) {

        alert("Keranjang belanja masih kosong!");

        return;

    }

    let pesan = "Halo VALLSTORE!\n";
    pesan += "Saya ingin memesan produk berikut:\n\n";

    let total = 0;

    keranjang.forEach(item => {

        const subtotal = item.harga * item.jumlah;

        pesan += "Produk: " + item.nama + "\n";
        pesan += "Jumlah: " + item.jumlah + "\n";
        pesan += "Harga: " + formatRupiah(subtotal) + "\n\n";

        total += subtotal;

    });

    pesan += "====================\n";
    pesan += "TOTAL: " + formatRupiah(total);
    pesan += "\n\nTerima kasih!";

    const url =
        "https://wa.me/" +
        nomorWA +
        "?text=" +
        encodeURIComponent(pesan);

    window.open(url, "_blank");

}


/* =====================================
   JALANKAN WEBSITE
   ===================================== */

tampilkanKeranjang();

console.log("VALLSTORE berhasil dijalankan!");

const nomorWA = "6285104201566";

// =================================
// PENCARIAN PRODUK
// =================================

const searchInput = document.querySelector("#searchInput");
const productCards = document.querySelectorAll(".product-card");

if (searchInput) {
    searchInput.addEventListener("input", function () {
        const keyword = this.value.toLowerCase();

        productCards.forEach(card => {
            const nama = card.querySelector("h3").textContent.toLowerCase();

            card.style.display = nama.includes(keyword)
                ? ""
                : "none";
        });
    });
}

// =================================
// KERANJANG BELANJA
// =================================

let keranjang = [];

function tambahKeranjang(nama, harga) {
    const produk = keranjang.find(item => item.nama === nama);

    if (produk) {
        produk.jumlah++;
    } else {
        keranjang.push({
            nama: nama,
            harga: harga,
            jumlah: 1
        });
    }

    tampilkanKeranjang();
    alert(nama + " berhasil ditambahkan ke keranjang!");
}

// =================================
// TAMPILKAN KERANJANG
// =================================

function tampilkanKeranjang() {
    const cartList = document.getElementById("cartList");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.getElementById("cartCount");

    if (!cartList) return;

    cartList.innerHTML = "";

    let total = 0;
    let jumlahItem = 0;

    keranjang.forEach((item, index) => {
        total += item.harga * item.jumlah;
        jumlahItem += item.jumlah;

        cartList.innerHTML += `
            <div class="cart-item">
                <div>
                    <h4>${item.nama}</h4>
                    <p>${formatRupiah(item.harga)} x ${item.jumlah}</p>
                </div>

                <button onclick="hapusKeranjang(${index})">
                    Hapus
                </button>
            </div>
        `;
    });

    if (cartTotal) {
        cartTotal.textContent = formatRupiah(total);
    }

    if (cartCount) {
        cartCount.textContent = jumlahItem;
    }
}

// =================================
// HAPUS PRODUK
// =================================

function hapusKeranjang(index) {
    keranjang.splice(index, 1);
    tampilkanKeranjang();
}

// =================================
// FORMAT RUPIAH
// =================================

function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
}

// =================================
// CHECKOUT WHATSAPP
// =================================

function checkoutWhatsApp() {
    if (keranjang.length === 0) {
        alert("Keranjang belanja masih kosong!");
        return;
    }

    let pesan = "Halo VALLSTORE, saya ingin memesan:\n\n";

    let total = 0;

    keranjang.forEach(item => {
        pesan += `${item.nama}\n`;
        pesan += `Jumlah: ${item.jumlah}\n`;
        pesan += `Harga: ${formatRupiah(item.harga * item.jumlah)}\n\n`;

        total += item.harga * item.jumlah;
    });

    pesan += "Total Pembayaran: " + formatRupiah(total);

    const url = "https://wa.me/" + nomorWA +
        "?text=" + encodeURIComponent(pesan);

    window.open(url, "_blank");
}

// =================================
// TOMBOL TAMBAH KERANJANG
// =================================

document.querySelectorAll(".product-card").forEach(card => {
    const tombol = document.createElement("button");

    tombol.textContent = "Tambah Keranjang";
    tombol.className = "buy-button";

    tombol.addEventListener("click", () => {
        const nama = card.querySelector("h3").textContent;

        const teksHarga = card.querySelector(".price").textContent;

        const harga = Number(teksHarga.replace(/\D/g, ""));

        tambahKeranjang(nama, harga);
    });

    const info = card.querySelector(".product-info");

    if (info) {
        info.appendChild(tombol);
    }
});

console.log("VALLSTORE JavaScript berhasil dijalankan!");
