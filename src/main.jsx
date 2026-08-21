import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const destinations = [
  {
    id: 1,
    name: "Hunza Valley",
    country: "Pakistan",
    category: "Mountains",
    price: 320,
    days: 5,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=900&q=80",
    tag: "Popular",
  },
  {
    id: 2,
    name: "Skardu",
    country: "Pakistan",
    category: "Adventure",
    price: 410,
    days: 6,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
    tag: "Best Seller",
  },
  {
    id: 3,
    name: "Bali",
    country: "Indonesia",
    category: "Beach",
    price: 690,
    days: 7,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
    tag: "Trending",
  },
  {
    id: 4,
    name: "Istanbul",
    country: "Türkiye",
    category: "Culture",
    price: 580,
    days: 5,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=900&q=80",
    tag: "City Escape",
  },
  {
    id: 5,
    name: "Swiss Alps",
    country: "Switzerland",
    category: "Mountains",
    price: 1250,
    days: 8,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=80",
    tag: "Premium",
  },
  {
    id: 6,
    name: "Dubai",
    country: "UAE",
    category: "City",
    price: 520,
    days: 4,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
    tag: "Quick Trip",
  },
];

const categories = [
  "All",
  "Mountains",
  "Adventure",
  "Beach",
  "Culture",
  "City",
];

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [toast, setToast] = useState("");

  const filteredDestinations = useMemo(() => {

    //...check categories...
    return destinations.filter((place) => {
      const matchesCategory =
        activeCategory === "All" || place.category === activeCategory;

// ... to convert upper to lower case letters in search...
      const query = search.toLowerCase().trim();

//... search matching...
      const matchesSearch =
        !query ||
        `${place.name} ${place.country}`.toLowerCase().includes(query);
        
 //... if categories and search is same then show othervise card hide...       
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  //... function for destination favorite/unfavorite...
  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }
//... toast show and after 2.2s dissapear automatically
  function showToast(message) {
    setToast(message);
    window.clearTimeout(window.toastTimer);
    window.toastTimer = window.setTimeout(() => setToast(""), 2200);
  }
//... scrollto section...page ko us section tak le jayega jhaa call kraya hy...
  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <div className="app">
      <header className="navbar">
        <button
          className="logo"
          onClick={() => scrollToSection("home")}
        >

          <span className="logo-mark">W</span>
          <span>Wanderly</span>
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <button onClick={() => scrollToSection("home")}>Home</button>
          <button onClick={() => scrollToSection("destinations")}>
            Destinations
          </button>
          <button onClick={() => scrollToSection("packages")}>Packages</button>
          <button onClick={() => scrollToSection("about")}>Why us</button>
        </nav>

        <div className="nav-actions">
          <button
            className="favorite-nav"
            onClick={() =>
              showToast(
                `${favorites.length} saved destination${favorites.length === 1 ? "" : "s"}`,
              )
            }
          >
            ♡ {favorites.length}
          </button>
          <button
            className="primary-btn small"
            onClick={() => scrollToSection("destinations")}
          >
            Explore
          </button>
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </header>
      
      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="eyebrow">
              <span>✦</span> Travel made memorable
            </div>
            <h1>
              Find your next <span>beautiful</span> escape.
            </h1>
            <p>
              Discover carefully planned trips, hidden gems, and unforgettable
              experiences — without making travel planning complicated.
            </p>
            <div className="hero-buttons">
              <button
                className="primary-btn"
                onClick={() => scrollToSection("destinations")}
              >
                Explore destinations <span>→</span>
              </button>
              <button
                className="ghost-btn"
                onClick={() =>
                  showToast("Trip planner opened — choose a destination below!")
                }
              >
                Plan my trip
              </button>
            </div>

            <div className="search-box">
              <div className="search-icon">⌕</div>
              <div className="search-field">
                <label>Where to?</label>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Hunza, Bali, Dubai..."
                />
              </div>
              <button
                className="search-btn"
                onClick={() => scrollToSection("destinations")}
              >
                Search
              </button>
            </div>

            <div className="hero-stats">
              <div>
                <strong>12k+</strong>
                <span>Happy travelers</span>
              </div>
              <div>
                <strong>48</strong>
                <span>Destinations</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>Average rating</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=85"
                alt="Mountain landscape"
              />
              <div className="floating-card location-card">
                <span className="pin">●</span>
                <div>
                  <b>Hunza Valley</b>
                  <small>Gilgit-Baltistan, Pakistan</small>
                </div>
              </div>
              <div className="floating-card rating-card">
                <span>★</span>
                <div>
                  <b>4.9</b>
                  <small>2,480 reviews</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section destinations" id="destinations">
          <div className="section-heading">
            <div>
              <span className="section-kicker">EXPLORE THE WORLD</span>
              <h2>
                Places worth <span>remembering.</span>
              </h2>
            </div>
            <p>
              Hand-picked destinations for every kind of traveler, from peaceful
              mountain mornings to lively city nights.
            </p>
          </div>

          <div className="filters">
            <div className="category-list">
              {categories.map((category) => (
                <button
                  key={category}
                  className={activeCategory === category ? "active" : ""}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <span className="result-count">
              {filteredDestinations.length} destinations
            </span>
          </div>

          <div className="destination-grid">
            {filteredDestinations.map((place) => (
              <article className="destination-card" key={place.id}>
                <div className="card-image">
                  <img src={place.image} alt={place.name} loading="lazy" />
                  <span className="tag">{place.tag}</span>
                  <button
                    className={
                      favorites.includes(place.id) ? "heart saved" : "heart"
                    }
                    onClick={() => toggleFavorite(place.id)}
                    aria-label={`Save ${place.name}`}
                  >
                    {favorites.includes(place.id) ? "♥" : "♡"}
                  </button>
                </div>
                <div className="card-body">
                  <div className="card-title-row">
                    <div>
                      <h3>{place.name}</h3>
                      <span>{place.country}</span>
                    </div>
                    <div className="rating">★ {place.rating}</div>
                  </div>
                  <div className="card-meta">
                    <span>◷ {place.days} days</span>
                    <span>● {place.category}</span>
                  </div>
                  <div className="price-row">
                    <div>
                      <small>Starting from</small>
                      <strong>${place.price}</strong>
                    </div>
                    <button
                      className="arrow-btn"
                      onClick={() =>
                        showToast(`${place.name} added to your trip planner!`)
                      }
                    >
                      →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filteredDestinations.length === 0 && (
            <div className="empty-state">
              <h3>No destination found</h3>
              <p>Try another city or select “All”.</p>
              <button
                className="primary-btn small"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </section>

        <section className="experience section" id="about">
          <div className="experience-image">
            <img
              src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1000&q=80"
              alt="Friends traveling together"
            />
            <div className="experience-badge">
              <strong>10+</strong>
              <span>
                years of
                <br />
                travel stories
              </span>
            </div>
          </div>
          <div className="experience-content">
            <span className="section-kicker">WHY WANDERLY</span>
            <h2>
              We plan the details, <span>you live the story.</span>
            </h2>
            <p>
              Good travel is more than a destination. We combine simple planning
              with local experiences so you can spend less time comparing
              options and more time enjoying the journey.
            </p>
            <div className="feature-list">
              <Feature
                icon="✦"
                title="Curated experiences"
                text="Trips designed around places and moments worth experiencing."
              />
              <Feature
                icon="✓"
                title="Simple planning"
                text="Clear packages, flexible options, and no confusing steps."
              />
              <Feature
                icon="♡"
                title="Travel with confidence"
                text="Support before and during your journey when you need it."
              />
            </div>
            <button
              className="text-btn"
              onClick={() => showToast("More about Wanderly coming soon!")}
            >
              Learn more <span>→</span>
            </button>
          </div>
        </section>

        <section className="section packages" id="packages">
          <div className="section-heading center">
            <div>
              <span className="section-kicker">READY-MADE TRIPS</span>
              <h2>
                Travel packages for <span>real explorers.</span>
              </h2>
            </div>
            <p>
              Pick a starting point and customize it later. No need to plan
              everything from zero.
            </p>
          </div>
          <div className="package-grid">
            <PackageCard
              title="Northern Escape"
              location="Hunza + Skardu"
              price="699"
              days="7 days"
              image="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80"
              highlight="Most loved"
              onClick={showToast}
            />
            <PackageCard
              title="Island Reset"
              location="Bali, Indonesia"
              price="899"
              days="8 days"
              image="https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=900&q=80"
              highlight="Relax"
              onClick={showToast}
            />
            <PackageCard
              title="European Charm"
              location="Switzerland + Italy"
              price="1,499"
              days="10 days"
              image="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80"
              highlight="Premium"
              onClick={showToast}
            />
          </div>
        </section>

        <section className="testimonial section">
          <div className="quote-mark">“</div>
          <blockquote>
            Wanderly made our northern trip feel effortless. We had a plan, but
            still had enough freedom to discover places on our own.
          </blockquote>
          <div className="reviewer">
            <div className="avatar">AK</div>
            <div>
              <strong>Areeba Khan</strong>
              <span>Traveled to Hunza & Skardu</span>
            </div>
            <div className="review-stars">★★★★★</div>
          </div>
        </section>

        <section className="newsletter section">
          <div>
            <span className="section-kicker">TRAVEL INSPIRATION</span>
            <h2>Get the good trips in your inbox.</h2>
            <p>
              Occasional destination ideas, new packages, and travel tips. No
              spam.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              showToast("You are on the Wanderly list!");
              e.currentTarget.reset();
            }}
          >
            <input type="email" required placeholder="Your email address" />
            <button className="primary-btn" type="submit">
              Join newsletter →
            </button>
          </form>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <button className="logo" onClick={() => scrollToSection("home")}>
            <span className="logo-mark">W</span>
            <span>Wanderly</span>
          </button>
          <p>Beautiful trips. Simple planning. Better memories.</p>
        </div>
        <div className="footer-links">
          <div>
            <b>Explore</b>
            <button onClick={() => scrollToSection("destinations")}>
              Destinations
            </button>
            <button onClick={() => scrollToSection("packages")}>
              Packages
            </button>
          </div>
          <div>
            <b>Company</b>
            <button onClick={() => scrollToSection("about")}>About us</button>
            <button onClick={() => showToast("Contact page coming soon!")}>
              Contact
            </button>
          </div>
          <div>
            <b>Follow</b>
            <button onClick={() => showToast("Instagram link coming soon!")}>
              Instagram
            </button>
            <button onClick={() => showToast("Facebook link coming soon!")}>
              Facebook
            </button>
          </div>
        </div>
        <div className="copyright">© 2026 Wanderly. Built with React.</div>
      </footer>
      {toast && <div className="toast">✓ {toast}</div>}
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="feature">
      <div className="feature-icon">{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}
function PackageCard({
  title,
  location,
  price,
  days,
  image,
  highlight,
  onClick,
}) {
  return (
    <article className="package-card">
      <img src={image} alt={title} loading="lazy" />
      <div className="package-overlay">
        <span>{highlight}</span>
        <div>
          <h3>{title}</h3>
          <p>
            {location} · {days}
          </p>
        </div>
        <div className="package-bottom">
          <strong>${price}</strong>
          <button onClick={() => onClick(`${title} selected!`)}>
            View trip →
          </button>
        </div>
      </div>
    </article>
  );
}

createRoot(document.getElementById("root")).render(<App />);
