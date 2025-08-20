import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="custom-footer">
      <Container>
        <Row>
          {/* ABOUT */}
          <Col md={2} sm={6}>
            <h5>ABOUT</h5>
            <ul className="list-unstyled">
              <li>Contact Us</li>
              <li>About Us</li>
              <li>Careers</li>
              <li>Flipkart Stories</li>
              <li>Press</li>
              <li>Corporate Information</li>
            </ul>
          </Col>

          {/* GROUP COMPANIES */}
          <Col md={2} sm={6}>
            <h5>GROUP COMPANIES</h5>
            <ul className="list-unstyled">
              <li>Myntra</li>
              <li>Cleartrip</li>
              <li>Shopsy</li>
            </ul>
          </Col>

          {/* HELP */}
          <Col md={2} sm={6}>
            <h5>HELP</h5>
            <ul className="list-unstyled">
              <li>Payments</li>
              <li>Shipping</li>
              <li>Cancellation & Returns</li>
              <li>FAQ</li>
            </ul>
          </Col>

          {/* CONSUMER POLICY */}
          <Col md={2} sm={6}>
            <h5>CONSUMER POLICY</h5>
            <ul className="list-unstyled">
              <li>Cancellation & Returns</li>
              <li>Terms Of Use</li>
              <li>Security</li>
              <li>Privacy</li>
              <li>Sitemap</li>
              <li>Grievance Redressal</li>
              <li>EPR Compliance</li>
            </ul>
          </Col>

          {/* MAIL US */}
          <Col md={2} sm={6}>
            <h5>Mail Us:</h5>
            <address>
              Flipkart Internet Private Limited, <br />
              Buildings Alyssa, Begonia & <br />
              Clove Embassy Tech Village, <br />
              Outer Ring Road, Devarabeesanahalli Village, <br />
              Bengaluru, 560103, <br />
              Karnataka, India
            </address>

            <h5>Social:</h5>
            <div className="social-icons">
              <FaFacebookF />
              <FaTwitter />
              <FaYoutube />
              <FaInstagram />
            </div>
          </Col>

          {/* REGISTERED OFFICE */}
          <Col md={2} sm={6}>
            <h5>Registered Office Address:</h5>
            <address>
              Flipkart Internet Private Limited, <br />
              Buildings Alyssa, Begonia & <br />
              Clove Embassy Tech Village, <br />
              Outer Ring Road, Devarabeesanahalli Village, <br />
              Bengaluru, 560103, <br />
              Karnataka, India <br />
              CIN: U51109KA2012PTC066107 <br />
              Telephone: <a href="tel:04445614700">044-45614700</a> /{" "}
              <a href="tel:04467415800">044-67415800</a>
            </address>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
