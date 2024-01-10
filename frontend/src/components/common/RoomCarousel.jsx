import React, { useEffect } from "react";
import { useState } from "react";
import { getAllRooms } from "../utils/ApiFunctions";
import { Card, Carousel, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const RoomCarousel = () => {
  const [rooms, setRooms] = useState([
    { id: "", roomType: "", roomPrice: "", photo: "" },
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllRooms()
      .then((data) => {
        setRooms(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section className="mt-5">
        <Spinner animation="border" role="status" />
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="text-danger  mb-5 mt-5">
        Error :{errorMessage}
      </section>
    );
  }
  return (
    <section className="bg-light mb-5 mt-5 shadow">
      <Link to="/browse-all-rooms" className="hotel-color text-center">
        Browse all rooms
      </Link>
      <Container>
        <Carousel
          indicators={false}
          prevIcon={
            <BsChevronLeft className="carousel-control-prev-icon text-dark" />
          }
          nextIcon={
            <BsChevronRight className="carousel-control-next-icon text-dark" />
          }
        >
          {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
            <Carousel.Item key={index}>
              <Row>
                {rooms.slice(index * 4, index * 4 + 4).map((room, index) => (
                  <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
                    <Card>
                      <Link to={`/book-room/${room.id}`}>
                        <Card.Img
                          variant="top"
                          src={`data:image/png;base64, ${room.photo}`}
                          alt="Room Photo"
                          className="w-100"
                          style={{ height: "200px" }}
                        />
                      </Link>
                      <Card.Body>
                        <Card.Title className="hotel-color">
                          {room.roomType}
                        </Card.Title>
                        <Card.Title className="hotel-price">
                          ${room.roomPrice}
                        </Card.Title>
                        <div className="flex-shrink-0">
                          <Link
                            className="btn btn-sm btn-hotel"
                            to={`/book-room/${room.id}`}
                          >
                            Book Now
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default RoomCarousel;
