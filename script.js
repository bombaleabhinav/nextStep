const mentors = [
  {
    name: "Rahul Sharma",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    college: "MIT-WPU",
    branch: "CSE",
    year: "Final Year",
    cgpa: 9.62,
    jee: 98.7,
    skills: ["Computer Science", "Internships", "Placements"],
    badge: "Intern @ Microsoft",
    bio: "Helping students with coding, internships, and academics.",
    price: 399,
    rating: 4.9,
    booked: 142,
  },
  {
    name: "Aditi Mehra",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    college: "COEP Tech",
    branch: "AI & ML",
    year: "Third Year",
    cgpa: 9.48,
    jee: 99.1,
    skills: ["AI & ML", "Computer Science", "First Year"],
    badge: "Research Intern @ IISc",
    bio: "Guides first-year students on AI roadmaps and study systems.",
    price: 449,
    rating: 4.95,
    booked: 118,
  },
  {
    name: "Kabir Sethi",
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
    college: "VIT Vellore",
    branch: "Electronics",
    year: "Final Year",
    cgpa: 9.31,
    jee: 96.8,
    skills: ["Electronics", "Placements", "Internships"],
    badge: "Placed @ Texas Instruments",
    bio: "Breaks down core ECE prep, projects, and placement interviews.",
    price: 349,
    rating: 4.8,
    booked: 96,
  },
  {
    name: "Meera Nair",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    college: "Manipal Institute",
    branch: "CSE",
    year: "Final Year",
    cgpa: 9.18,
    jee: 97.4,
    skills: ["Computer Science", "Placements", "Internships"],
    badge: "SWE Intern @ Atlassian",
    bio: "Mentors students on DSA, resumes, and product internship prep.",
    price: 499,
    rating: 4.92,
    booked: 164,
  },
  {
    name: "Arjun Rao",
    photo: "https://randomuser.me/api/portraits/men/18.jpg",
    college: "PES University",
    branch: "Mechanical",
    year: "Fourth Year",
    cgpa: 8.96,
    jee: 94.3,
    skills: ["Mechanical", "First Year", "Internships"],
    badge: "Formula Student Lead",
    bio: "Helps with core projects, workshop skills, and branch decisions.",
    price: 299,
    rating: 4.72,
    booked: 78,
  },
  {
    name: "Ishita Kapoor",
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
    college: "SRM Institute",
    branch: "AI & ML",
    year: "Third Year",
    cgpa: 9.55,
    jee: 98.2,
    skills: ["AI & ML", "First Year", "Computer Science"],
    badge: "ML Fellow @ GDSC",
    bio: "Creates practical plans for Python, ML basics, and portfolio projects.",
    price: 379,
    rating: 4.86,
    booked: 104,
  },
];

const testimonials = [
  {
    quote:
      "My session made internship prep feel realistic. I left with a weekly roadmap, not vague motivation.",
    name: "Nandini Jain",
    college: "First Year, MIT-WPU",
    rating: "5.0",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    quote:
      "I compared branches with someone who had actually lived through the tradeoffs. That clarity was worth it.",
    name: "Rohan Kulkarni",
    college: "COEP Tech",
    rating: "4.9",
    photo: "https://randomuser.me/api/portraits/men/61.jpg",
  },
  {
    quote:
      "The mentor reviewed my resume and explained what recruiters notice first. Simple, direct, and useful.",
    name: "Sara D'Souza",
    college: "VIT Vellore",
    rating: "5.0",
    photo: "https://randomuser.me/api/portraits/women/30.jpg",
  },
];

const mentorGrid = document.querySelector("#mentor-grid");
const searchInput = document.querySelector("#mentor-search");
const sortSelect = document.querySelector("#mentor-sort");
const chipButtons = [...document.querySelectorAll(".chip")];
const counterEls = [...document.querySelectorAll("[data-count]")];
const animatedCounters = new WeakSet();
let activeFilter = "all";
let testimonialIndex = 0;
let testimonialTimer;

function formatRating(rating) {
  return rating.toFixed(rating % 1 === 0 ? 0 : 1);
}

function renderMentors() {
  const query = searchInput.value.trim().toLowerCase();
  const sortBy = sortSelect.value;

  const filtered = mentors
    .filter((mentor) => {
      const searchable = [
        mentor.name,
        mentor.college,
        mentor.branch,
        mentor.year,
        mentor.badge,
        mentor.bio,
        mentor.skills.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      const matchesSearch = !query || searchable.includes(query);
      const matchesFilter =
        activeFilter === "all" ||
        mentor.skills.includes(activeFilter) ||
        mentor.branch === activeFilter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      const sorters = {
        rating: b.rating - a.rating,
        cgpa: b.cgpa - a.cgpa,
        jee: b.jee - a.jee,
        price: a.price - b.price,
        booked: b.booked - a.booked,
      };
      return sorters[sortBy] || 0;
    });

  if (!filtered.length) {
    mentorGrid.innerHTML =
      '<p class="empty-state">No mentors found. Try another search or filter.</p>';
    return;
  }

  mentorGrid.innerHTML = filtered
    .map(
      (mentor) => `
        <article class="mentor-card fade-up in-view">
          <div class="mentor-header">
            <img class="mentor-avatar" src="${mentor.photo}" alt="${mentor.name}" />
            <div class="mentor-title">
              <h3>${mentor.name}</h3>
              <p>${mentor.college} &bull; ${mentor.branch} &bull; ${mentor.year}</p>
            </div>
          </div>
          <div class="mentor-metrics">
            <div class="metric">
              <span>CGPA</span>
              <strong>${mentor.cgpa}</strong>
            </div>
            <div class="metric">
              <span>JEE</span>
              <strong>${mentor.jee}%</strong>
            </div>
          </div>
          <div class="skill-list">
            ${mentor.skills.map((skill) => `<span>${skill}</span>`).join("")}
          </div>
          <p class="mentor-bio"><strong>${mentor.badge}</strong><br />${mentor.bio}</p>
          <div class="mentor-footer">
            <div class="mentor-rating">
              <strong>&#9733; ${formatRating(mentor.rating)}</strong>
              <span>${mentor.booked} sessions</span>
            </div>
            <div class="mentor-price">
              <strong>&#8377;${mentor.price}</strong>
              <span>/ session</span>
            </div>
            <button class="book-button" type="button">Book Session</button>
          </div>
        </article>
      `
    )
    .join("");
}

function animateCounter(el) {
  if (animatedCounters.has(el)) return;
  animatedCounters.add(el);

  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    const formatted =
      target % 1 === 0 ? Math.round(value).toLocaleString("en-IN") : value.toFixed(1);
    el.textContent = `${formatted}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        if (entry.target.matches("[data-count]")) animateCounter(entry.target);
      });
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll(".fade-up, [data-count]").forEach((el) => observer.observe(el));
}

function renderTestimonial() {
  const testimonial = testimonials[testimonialIndex];
  const card = document.querySelector("#testimonial-card");
  card.innerHTML = `
    <img src="${testimonial.photo}" alt="${testimonial.name}" />
    <div>
      <blockquote>&ldquo;${testimonial.quote}&rdquo;</blockquote>
      <p><strong>${testimonial.name}</strong> &bull; ${testimonial.college} &bull; &#9733; ${testimonial.rating}</p>
    </div>
  `;

  document.querySelectorAll("#testimonial-dots button").forEach((dot, index) => {
    dot.classList.toggle("active", index === testimonialIndex);
    dot.setAttribute("aria-current", index === testimonialIndex ? "true" : "false");
  });
}

function moveTestimonial(direction) {
  testimonialIndex =
    (testimonialIndex + direction + testimonials.length) % testimonials.length;
  renderTestimonial();
  resetTestimonialTimer();
}

function resetTestimonialTimer() {
  clearInterval(testimonialTimer);
  testimonialTimer = setInterval(() => moveTestimonial(1), 5200);
}

function setupTestimonials() {
  const dots = document.querySelector("#testimonial-dots");
  dots.innerHTML = testimonials
    .map(
      (_, index) =>
        `<button type="button" aria-label="Show testimonial ${index + 1}"></button>`
    )
    .join("");

  dots.querySelectorAll("button").forEach((dot, index) => {
    dot.addEventListener("click", () => {
      testimonialIndex = index;
      renderTestimonial();
      resetTestimonialTimer();
    });
  });

  document
    .querySelector("#testimonial-prev")
    .addEventListener("click", () => moveTestimonial(-1));
  document
    .querySelector("#testimonial-next")
    .addEventListener("click", () => moveTestimonial(1));

  renderTestimonial();
  resetTestimonialTimer();
}

searchInput.addEventListener("input", renderMentors);
sortSelect.addEventListener("change", renderMentors);
chipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    chipButtons.forEach((chip) => chip.classList.toggle("active", chip === button));
    renderMentors();
  });
});

renderMentors();
setupScrollAnimations();
setupTestimonials();
