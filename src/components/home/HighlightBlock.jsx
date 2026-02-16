import "./home.css";

export default function HighlightBlocks() {
  return (
    <section className="highlight-section">
      <div className="container-fluid px-0">
        <div className="row g-0">

          {/* BLOCK 1 */}
          <div className="col-md-4 highlight-block highlight-green">
            <div className="highlight-content">
              <h4>Faith Formation</h4>
              <p>
                Nurturing young Catholics through prayer, discipline,
                and sound Christian formation.
              </p>
              <a href="/about">Learn more →</a>
            </div>
          </div>

          {/* BLOCK 2 */}
          <div className="col-md-4 highlight-block highlight-dark">
            <div className="highlight-content">
              <h4>Leadership & Mentorship</h4>
              <p>
                Forming responsible leaders equipped to serve
                the Church, community, and nation.
              </p>
              <a href="/about">Learn more →</a>
            </div>
          </div>

          {/* BLOCK 3 */}
          <div className="col-md-4 highlight-block highlight-green">
            <div className="highlight-content">
              <h4>Service & Outreach</h4>
              <p>
                Witnessing Christ through community service,
                evangelization, and social action.
              </p>
              <a href="/about">Learn more →</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
