import { useEffect, useState } from "react";
import api from "../services/api";
import Footer from "../components/home/Footer";
import { getUploadsUrl } from "../utils/uploads";

export default function News() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts/public").then(res => setPosts(res.data));
  }, []);

  const news = posts.filter(p => p.type === "news");
  const events = posts.filter(p => p.type === "event");

  const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
};

  return (
    <>
            {/* PAGE HEADER */}
      <section className="news-hero">
        <div className="news-hero-overlay">
          <div className="container text-center text-white">
            <h1 className="mb-3">News & Events</h1>
            <p className="lead">
              Updates, announcements, and upcoming activities
              of the Accra Archdiocesan CYO.
            </p>
          </div>
        </div>
      </section>

      <section className="container my-5">
        <h3 className="cyogreen mb-4">Latest News</h3>

        {news.map(n => (
          <div key={n.id} className="mb-4">
            <h4 className="mb-2">{n.title}</h4>

            {/* MULTI-IMAGE (NEW POSTS) */}
            {n.images && n.images.length > 0 && (
              <div className="row g-2 mb-3">
                {n.images.slice(0, 3).map(img => (
                  <div key={img.id} className="col-md-4">
                    <img
                      src={getUploadsUrl(`posts/${img.file_name}`)}
                      className="img-fluid rounded"
                      style={{ height: "200px", objectFit: "cover" }}
                      alt="news images"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* FALLBACK (OLD POSTS) */}
            {(!n.images || n.images.length === 0) && n.image_url && (
              <img
                src={getUploadsUrl(`posts/${n.image_url}`)}
                className="img-fluid mb-3"
                alt="news images"
              />
            )}
            <p style={{ whiteSpace: "pre-line" }}>
              {n.content}
            </p>

            <hr />
          </div>
        ))}
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <h3 className="cyogreen mb-4">Upcoming Events</h3>
          {events.map(e => (
            <div key={e.id} className="mb-3">
              <h5>{e.title}</h5>
              <p>{e.content}</p>
              <p>
                <strong>Date:</strong> {formatDate(e.event_date)} <br />
                <strong>Venue:</strong> {e.venue}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}