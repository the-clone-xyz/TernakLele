// --- Nomor WhatsApp Tujuan ---
// GANTI NOMOR INI DENGAN NOMOR WA ANDA (Gunakan format 62 tanpa + atau 0 di depan)
const NOMOR_WA_ADMIN = "6281234567890";

// --- Mobile Menu Toggle ---
const btn = document.getElementById("mobile-menu-btn");
const menu = document.getElementById("mobile-menu");
const icon = document.getElementById("menu-icon");

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
  if (menu.classList.contains("hidden")) {
    icon.classList.remove("ph-x");
    icon.classList.add("ph-list");
  } else {
    icon.classList.remove("ph-list");
    icon.classList.add("ph-x");
  }
});

// Tutup mobile menu saat link diklik
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.add("hidden");
    icon.classList.remove("ph-x");
    icon.classList.add("ph-list");
  });
});

// --- Navbar Scroll Effect ---
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (window.scrollY > 20) {
    // Saat di-scroll: Tambahkan efek blur (glass), hapus background putih
    nav.classList.add("shadow-md", "glass-effect");
    nav.classList.remove("bg-white");
  } else {
    // Posisi atas (awal): Kembalikan background putih, hapus efek blur
    nav.classList.remove("shadow-md", "glass-effect");
    nav.classList.add("bg-white");
  }
});

// --- Fungsi Pilih Produk dari Katalog ---
function pilihProduk(namaProduk) {
  const selectProduk = document.getElementById("pesanProduk");
  selectProduk.value = namaProduk;

  // Scroll ke form pemesanan
  document.getElementById("pemesanan").scrollIntoView({ behavior: "smooth" });

  // Highlight form sebentar
  const formContainer = document.getElementById("pemesanan");
  formContainer.classList.add(
    "ring-4",
    "ring-brand-primary",
    "ring-opacity-50",
  );
  setTimeout(() => {
    formContainer.classList.remove(
      "ring-4",
      "ring-brand-primary",
      "ring-opacity-50",
    );
  }, 1500);
}

// --- Custom Modal Functions (Pengganti Alert) ---
const modal = document.getElementById("customModal");
const modalContent = document.getElementById("modalContent");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");

function tampilkanModal(title, message) {
  modalTitle.innerText = title;
  modalMessage.innerText = message;
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  // Animasi masuk
  setTimeout(() => {
    modalContent.classList.remove("scale-95", "opacity-0");
    modalContent.classList.add("scale-100", "opacity-100");
  }, 10);
}

function tutupModal() {
  // Animasi keluar
  modalContent.classList.remove("scale-100", "opacity-100");
  modalContent.classList.add("scale-95", "opacity-0");

  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }, 300);
}

// --- Handler Form Pendaftaran Member ---
document.getElementById("formMember").addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.getElementById("memberNama").value;
  const wa = document.getElementById("memberWA").value;
  const alamat = document.getElementById("memberAlamat").value;

  // Format Pesan WA
  const textWA =
    `*PENDAFTARAN MEMBER BARU*%0A%0A` +
    `Halo Admin TernakLele, saya ingin mendaftar sebagai member.%0A%0A` +
    `*Nama:* ${nama}%0A` +
    `*No. WA:* ${wa}%0A` +
    `*Alamat:* ${alamat}%0A%0A` +
    `Mohon info selanjutnya ya. Terima kasih!`;

  const linkWA = `https://wa.me/${NOMOR_WA_ADMIN}?text=${textWA}`;

  tampilkanModal(
    "Pendaftaran Diproses!",
    "Anda akan diarahkan ke WhatsApp untuk mengirim data pendaftaran member.",
  );

  setTimeout(() => {
    window.open(linkWA, "_blank");
    this.reset();
    tutupModal();
  }, 2000);
});

// --- Handler Form Pemesanan ---
document.getElementById("formPesan").addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.getElementById("pesanNama").value;
  const produk = document.getElementById("pesanProduk").value;
  const jumlah = document.getElementById("pesanJumlah").value;
  const status = document.getElementById("pesanStatus").value;
  const catatan = document.getElementById("pesanCatatan").value;

  if (!produk) {
    tampilkanModal("Perhatian", "Silakan pilih produk terlebih dahulu.");
    return;
  }

  // Format Pesan WA
  const textWA =
    `*ORDER BARU TERNAKLELE*%0A%0A` +
    `Halo Admin, saya ingin memesan produk:%0A%0A` +
    `*Nama:* ${nama}%0A` +
    `*Status:* ${status}%0A` +
    `*Produk:* ${produk}%0A` +
    `*Jumlah:* ${jumlah}%0A` +
    `*Alamat/Catatan:* ${catatan}%0A%0A` +
    `Tolong ditotal jumlah yang harus dibayar ya. Terima kasih!`;

  const linkWA = `https://wa.me/${NOMOR_WA_ADMIN}?text=${textWA}`;

  tampilkanModal(
    "Pesanan Dibuat!",
    "Mengarahkan ke WhatsApp untuk mengonfirmasi pesanan Anda.",
  );

  setTimeout(() => {
    window.open(linkWA, "_blank");
    this.reset();
    tutupModal();
  }, 2000);
});
