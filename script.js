const modal = document.getElementById("bookingModal");
const form = document.getElementById("bookingForm");
const dateInput = document.getElementById("date");
const year = document.getElementById("year");

function openBooking() {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => dateInput.focus(), 100);
}
function closeBooking() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
document.querySelectorAll("[data-open-booking]").forEach(btn => btn.addEventListener("click", openBooking));
document.querySelectorAll("[data-close-booking]").forEach(btn => btn.addEventListener("click", closeBooking));
modal.addEventListener("click", e => { if (e.target === modal) closeBooking(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("show")) closeBooking(); });

const today = new Date();
today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
dateInput.min = today.toISOString().split("T")[0];

form.addEventListener("submit", e => {
  e.preventDefault();
  const date = dateInput.value;
  const time = document.getElementById("time").value;
  const mode = document.getElementById("mode").value;
  const concern = document.getElementById("concern").value;
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!/^[0-9+\-\s()]{10,}$/.test(phone)) {
    alert("Please enter a valid phone number.");
    return;
  }

  const formattedDate = new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
    day: "2-digit", month: "long", year: "numeric"
  });

  const text =
`Hello Arti Ma'am,

I would like to book a session at Samadhan Counseling Clinic.

Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}
Preferred date: ${formattedDate}
Preferred time: ${time}
Session mode: ${mode}
Concern: ${concern}
${message ? `Note: ${message}` : ""}

Please let me know if this slot is available. Thank you.`;

  window.open("https://wa.me/919826167447?text=" + encodeURIComponent(text), "_blank");
  closeBooking();
});

year.textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
  document.querySelector(".site-header").classList.toggle("scrolled", window.scrollY > 8);
});

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
menuBtn.addEventListener("click", () => {
  const open = nav.style.display === "flex";
  nav.style.display = open ? "" : "flex";
  nav.style.flexDirection = "column";
  nav.style.position = "absolute";
  nav.style.top = "76px";
  nav.style.left = "0";
  nav.style.right = "0";
  nav.style.padding = "20px 5%";
  nav.style.background = "#fbfaf6";
  nav.style.borderBottom = "1px solid #e8e5dc";
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  if (window.innerWidth <= 900) nav.style.display = "";
}));


/* Media fallbacks for flat website assets */
document.querySelectorAll(".media-frame img, .image-photo img, .gallery-card img, .achievement-gallery img").forEach(img => {
  img.addEventListener("error", () => {
    img.style.display = "none";
    const fallback = img.parentElement.querySelector(".media-fallback, .photo-fallback");
    if (fallback) fallback.style.display = "flex";
  });
});

const clientVideo = document.getElementById("clientVideo");
if (clientVideo) {
  clientVideo.muted = false;
  clientVideo.volume = 1;
  clientVideo.addEventListener("loadedmetadata", () => {
    clientVideo.muted = false;
    clientVideo.volume = 1;
  });
  clientVideo.addEventListener("error", () => {
    const fallback = clientVideo.parentElement.querySelector(".video-fallback");
    if (fallback) fallback.style.display = "flex";
  });
}
