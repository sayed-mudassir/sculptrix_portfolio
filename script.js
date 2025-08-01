// Scroll Animation
// Three.js 3D Background Animation
const canvas = document.getElementById("canvas3d");
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Create floating shapes
const geometry = new THREE.IcosahedronGeometry(1, 0);
const material = new THREE.MeshPhongMaterial({
  color: 0x6c63ff,
  transparent: true,
  opacity: 0.7,
  shininess: 100,
  specular: 0xffffff,
});

const shapes = [];
const shapeCount = 8;

for (let i = 0; i < shapeCount; i++) {
  const shape = new THREE.Mesh(geometry, material.clone());
  shape.position.x = (Math.random() - 0.5) * 20;
  shape.position.y = (Math.random() - 0.5) * 20;
  shape.position.z = (Math.random() - 0.5) * 20;
  shape.scale.setScalar(Math.random() * 0.5 + 0.5);
  shape.userData = {
    speed: Math.random() * 0.02 + 0.01,
    rotationSpeed: Math.random() * 0.02 + 0.01,
    direction: new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    ).normalize(),
  };
  shapes.push(shape);
  scene.add(shape);
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  shapes.forEach((shape) => {
    shape.position.addScaledVector(
      shape.userData.direction,
      shape.userData.speed
    );
    shape.rotation.x += shape.userData.rotationSpeed;
    shape.rotation.y += shape.userData.rotationSpeed;

    // Bounce off imaginary walls
    if (Math.abs(shape.position.x) > 10) shape.userData.direction.x *= -1;
    if (Math.abs(shape.position.y) > 10) shape.userData.direction.y *= -1;
    if (Math.abs(shape.position.z) > 10) shape.userData.direction.z *= -1;
  });

  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  mobileMenuBtn.innerHTML = navLinks.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: "smooth",
    });
  });
});

// Header Scroll Effect
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Scroll Animation
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".section-title, .service-card, .pricing-card, .testimonial-card, .contact-info, .contact-form"
  );

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    if (elementPosition < screenPosition) {
      element.classList.add("animated");
    }
  });
};

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

// Form Submission
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const service = document.getElementById("service").value;

  // Here you would typically send the form data to a server
  // For demonstration, we'll just show an alert
  alert(
    `Thank you, ${name}! We've received your inquiry about ${
      service || "our services"
    }. We'll contact you at ${email} shortly.`
  );

  // Reset form
  contactForm.reset();
});
