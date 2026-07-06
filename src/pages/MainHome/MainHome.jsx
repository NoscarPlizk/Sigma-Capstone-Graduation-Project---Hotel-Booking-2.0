import { Row, Col, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import SelectMenu from "../../component/SelectMenu/SelectMenu";
import "./MainHome.css";

const popularDestinations = [
  {
    title: "Kuala Lumpur",
    region: "Asia",
    note: "Skyline, food, and easy weekend stays",
    imgUrl:
      "https://img.static-kl.com/transform/1f159175-0757-4f9e-a9a8-ec6dbd5bce68/",
  },
  {
    title: "Tokyo",
    region: "Asia",
    note: "Neighbourhood hotels with late-night energy",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSJrEMCqMgEVm-268dXRBSqg7BRX-77DoP-X3Ki37flVvSpjOHOEaTXLjAzhakWWOWv8mww_6gSd-ht2cnvg4hrKh0&s=19",
  },
  {
    title: "Paris",
    region: "Europe",
    note: "Classic city stays near landmarks and cafes",
    imgUrl:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Dubai",
    region: "Middle East",
    note: "Modern towers, shopping, and resort breaks",
    imgUrl:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Vancouver",
    region: "North America",
    note: "Harbour views with a calm city pace",
    imgUrl:
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Melbourne",
    region: "Oceania",
    note: "Creative districts, coffee, and short escapes",
    imgUrl:
      "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=1200&q=80",
  },
];

function PopularCityCard({ title, region, note, imgUrl }) {
  return (
    <Col xs={12} md={6} xl={4}>
      <Card
        className="border-0 rounded-5 overflow-hidden position-relative shadow-sm h-100"
        style={{
          minHeight: 220,
          backgroundColor: "#f8fbfe",
          boxShadow: "0 16px 40px rgba(30, 71, 117, 0.10)",
        }}
      >
        <Link
          to={"/searchtohotellist"}
          className="w-100 h-100 text-decoration-none d-block"
        >
          <Card.Img
            src={imgUrl}
            alt={title}
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />

          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              background:
                "linear-gradient(180deg, rgba(15, 45, 78, 0.18) 0%, rgba(15, 45, 78, 0.10) 35%, rgba(9, 28, 52, 0.68) 100%)",
            }}
          />

          <div className="position-absolute top-0 start-0 p-3">
            <span
              className="px-3 py-2 rounded-pill small fw-semibold"
              style={{
                backgroundColor: "rgba(248, 251, 254, 0.92)",
                color: "#315b86",
                letterSpacing: "0.02em",
              }}
            >
              Popular destination
            </span>
          </div>

          <div className="position-absolute bottom-0 start-0 p-4 text-white">
            <p
              className="mb-2 text-uppercase fw-semibold"
              style={{
                fontSize: "0.78rem",
                letterSpacing: "0.12em",
                color: "rgba(235, 244, 252, 0.88)",
              }}
            >
              {region}
            </p>
            <h3 className="mb-2 fw-bold">{title}</h3>
            <p
              className="mb-0"
              style={{
                maxWidth: 260,
                color: "rgba(236, 244, 252, 0.90)",
              }}
            >
              {note}
            </p>
          </div>
        </Link>
      </Card>
    </Col>
  );
}

export default function MainHome() {
  return (
    <>
      <Row>
        <div className="hero">
          <div className="hero-inner">
            <h1 className="hero-title">Find your next stay</h1>
            <p className="hero-sub">Search deals on hotels, homes, and much more...</p>
            <SelectMenu />
          </div>
        </div>
        <Container className="py-5">
          <section
            className="rounded-5 px-4 px-lg-5 py-4 py-lg-5"
            style={{
              background: "linear-gradient(180deg, #fbfdff 0%, #eef5fb 100%)",
              border: "1px solid #d9e5f0",
            }}
          >
            <Row className="align-items-end g-3 mb-4">
              <Col lg={8}>
                <p
                  className="mb-2 text-uppercase fw-semibold"
                  style={{
                    color: "#6b8aa8",
                    letterSpacing: "0.14em",
                    fontSize: "0.82rem",
                  }}
                >
                  Recommended
                </p>
                <h2 className="mb-2" style={{ color: "#14385f", fontWeight: 700 }}>
                  Popular destinations
                </h2>
                <p className="mb-0" style={{ color: "#5c7690", maxWidth: 560 }}>
                  Curated city picks across Asia, Europe, the Middle East,
                  North America, and Oceania for quick hotel discovery.
                </p>
              </Col>
              <Col lg={4}>
                <div
                  className="rounded-4 px-3 py-3"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.72)",
                    border: "1px solid #e2ebf3",
                    color: "#5f7a95",
                  }}
                >
                  Clean destination shortcuts with a calm white-and-blue theme.
                </div>
              </Col>
            </Row>
            <Row className="g-4">
              {popularDestinations.map((city) => (
                <PopularCityCard key={city.title} {...city} />
              ))}
            </Row>
          </section>
        </Container>
      </Row>
    </>
  )
}
