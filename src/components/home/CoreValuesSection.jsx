import "./home.css";

export default function CoreValuesSection() {
  return (
    <section className="core-values-section">
      <div className="container">

        <div className="row align-items-center">
          <div className="col-md-7 text-white mb-4 mb-md-0">
            <h2 className="mb-3">
              Our Core Values. Our Foundation.
            </h2>

            <p className="lead">
              The Catholic Youth Organization of the Accra Archdiocese is built
              on firm spiritual and moral foundations. Our values guide our
              formation, leadership, and service to God, the Church, and Ghana.
            </p>

            <p>
              Through disciplined formation and active participation in Church
              life, we nurture young people to live out their faith with courage,
              responsibility, and love for country.
            </p>

            <a
              href="/about"
              className="btn btn-outline-light mt-3"
            >
              Learn More About Accra CYO
            </a>
          </div>

          <div className="col-md-5">
            <ul className="core-values-list">
              <li>Faith in God</li>
              <li>Discipline and Moral Uprightness</li>
              <li>Service to Church and Community</li>
              <li>Leadership and Responsibility</li>
              <li>Charitable Acts</li>
              <li>Patriotism — Love for Ghana</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}