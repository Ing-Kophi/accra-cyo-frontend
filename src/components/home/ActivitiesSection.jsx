import "./home.css";

export default function ActivitiesSection() {
  return (
    <section className="activities-section container my-5">

      <div className="text-center mb-4">
        <h3 className="cyogreen">What We Do</h3>
        <p className="text-muted">
          The Catholic Youth Organization is committed to holistic youth formation
          through faith, leadership, service, and fellowship.
        </p>
      </div>

      <div className="row g-4">

        {/* CAMPS */}
        <div className="col-md-6 col-lg-3">
          <div
            className="activity-card"
            style={{ backgroundImage: "url('/images/camps.jpg')" }}
          >
            <div className="activity-overlay">
              <h5>Camps & Retreats</h5>
              <p>
                Spiritual camps and retreats that build discipline,
                fellowship, and faith among the youth.
              </p>
            </div>
          </div>
        </div>

        {/* LEADERSHIP */}
        <div className="col-md-6 col-lg-3">
          <div
            className="activity-card"
            style={{ backgroundImage: "url('/images/leadership.jpg')" }}
          >
            <div className="activity-overlay">
              <h5>Leadership & Mentorship</h5>
              <p>
                Developing responsible leaders through mentoring,
                training, and service.
              </p>
            </div>
          </div>
        </div>

        {/* OUTREACH */}
        <div className="col-md-6 col-lg-3">
          <div
            className="activity-card"
            style={{ backgroundImage: "url('/images/outreach.jpg')" }}
          >
            <div className="activity-overlay">
              <h5>Community Outreach</h5>
              <p>
                Evangelization and social outreach that witness Christ
                in the wider community.
              </p>
            </div>
          </div>
        </div>

        {/* FORMATION */}
        <div className="col-md-6 col-lg-3">
          <div
            className="activity-card"
            style={{ backgroundImage: "url('/images/formations.jpg')" }}
          >
            <div className="activity-overlay">
              <h5>Faith Formation</h5>
              <p>
                Structured Catholic formation for children,
                adolescents, and young adults.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
