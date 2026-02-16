import Footer from "../components/home/Footer";

export default function About() {
  return (
    <>
      {/* PAGE HEADER */}
      <section className="about-hero">
        <div className="about-hero-overlay">
            <div className="container text-center text-white">
            <h1 className="mb-3">About Accra CYO</h1>
            <p className="lead">
                Forming Catholic youth for faith, leadership, service,
                and love for God and Ghana.
            </p>
            </div>
        </div>
        </section>

      {/* WHO WE ARE */}
      <section className="container my-5">
        <div className="row align-items-center g-4">

            {/* TEXT */}
            <div className="col-md-6">
            <h3 className="cyogreen mb-3">Who We Are</h3>
            <p>
                The Catholic Youth Organization (CYO) of the Accra Archdiocese
                is the official youth movement of the Archdiocese, dedicated
                to the holistic formation of young people in the Catholic faith.
            </p>
            <p>
                The organization brings together children, adolescents, and
                young adults from parishes across the Archdiocese and guides
                them through structured spiritual formation, leadership training,
                and community service.
            </p>
            </div>

            {/* IMAGE */}
            <div className="col-md-6">
            <img
                src="/images/about/who-we-are.jpg"
                alt="Accra Archdiocesan Catholic Youth Organization members"
                className="img-fluid rounded shadow-sm about-who-image"
            />
            </div>

        </div>
        </section>

      <section className="bg-light py-5">
        <div className="container">
            <div className="row g-4">

            {/* MISSION */}
            <div className="col-md-6">
                <div
                className="about-card"
                style={{ backgroundImage: "url('/images/about/mission.jpg')" }}
                >
                <div className="about-card-overlay">
                    <h4>Our Aim</h4>
                    <p>
                    To become true friends of God and better citizens of our country, 
                    and to help others to do the same.
                    </p>
                </div>
                </div>
            </div>

            {/* VISION */}
            <div className="col-md-6">
                <div
                className="about-card"
                style={{ backgroundImage: "url('/images/about/vision.jpg')" }}
                >
                <div className="about-card-overlay">
                    <h4>Our Vision</h4>
                    <p>
                    A vibrant and disciplined Catholic youth community,
                    witnessing Christ in society through faith,
                    leadership, and service.
                    </p>
                </div>
                </div>
            </div>

            </div>
        </div>
        </section>

      {/* STRUCTURE & MEMBERSHIP */}
      <section className="container my-5">
        <h3 className="cyogreen mb-3">Our Structure & Membership</h3>
        <p>
          Membership of the CYO is organized in progressive ranks that
          correspond to age and formation levels, ensuring that every
          young person receives appropriate guidance and mentoring.
        </p>

        <ul>
          <li>
            <strong>Infant Jesus:</strong> Children aged 6–11 years,
            introduced to basic Catholic formation.
          </li>
          <li>
            <strong>Young Apostles:</strong> Adolescents aged 12–16 years,
            guided in discipline, responsibility, and faith growth.
          </li>
          <li>
            <strong>Christian Soldiers:</strong> Youth aged 17 years and above,
            trained for leadership, service, and active witness.
          </li>
          <li>
            <strong>Officers:</strong> Appointed leaders who guide and
            coordinate activities at parish, deanery, and diocesan levels.
          </li>
        </ul>
      </section>

      {/* IDENTITY */}
      <section className="bg-success text-white py-5">
        <div className="container text-center">
          <h3 className="mb-3">Our Identity</h3>
          <p className="lead mb-1">
            <strong>Greeting:</strong> For God and Ghana!
          </p>
          <p className="lead mb-3">
            <strong>Response:</strong> Thanks be to God.
          </p>
          <p>
            <em>
              “CYO… Do something for God and Ghana now!”
            </em>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}