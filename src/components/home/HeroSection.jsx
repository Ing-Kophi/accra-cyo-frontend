import "./home.css";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <div className="hero-content container text-center text-white">

          <h1 className="hero-title mb-3">
            Forming Catholic Youth for God and Ghana
          </h1>

          <p className="hero-subtitle mb-4">
            A disciplined, faith-filled youth movement of the Accra Archdiocese,
            committed to service, leadership, and Christian formation.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <a
              href="/about"
              className="btn btn-light btn-lg"
            >
              About Accra CYO
            </a>

            <a
              href="/registration-figures"
              className="btn btn-outline-light btn-lg"
            >
              National Registration
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
