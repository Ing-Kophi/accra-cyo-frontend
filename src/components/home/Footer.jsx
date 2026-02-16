import "./home.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">

        <div className="row">

          {/* ABOUT */}
          <div className="col-md-4 mb-4">
            <h5>Accra Archdiocesan CYO</h5>
            <p>
              A Catholic youth movement committed to faith formation,
              leadership development, and service to God, the Church,
              and Ghana.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="col-md-4 mb-4">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Accra CYO</a></li>
              <li><a href="/news">News & Events</a></li>
              <li><a href="/registration-figures">National Registration</a></li>
              <li><a href="/documents">Document Center</a></li>
              <li><a href="/media">Media</a></li>
              <li><a href="/contact_us">Contact Us</a></li>
            </ul>
          </div>

          {/* GREETING */}
          <div className="col-md-4 mb-4">
            <h6>Our Identity</h6>
            <p className="mb-1"><strong>For God and Ghana!</strong></p>
            <p className="mb-3">Thanks be to God.</p>

            <p className="small">
              “CYO… Do something for God and Ghana now!”
            </p>
          </div>

        </div>

        <hr className="footer-divider" />

        <div className="text-center small">
          © {year} Accra Archdiocesan Catholic Youth Organization.
          All rights reserved.
        </div>

      </div>
    </footer>
  );
}