import React from "react";

const Footer = () => {
  return (
    <footer className="footer mt-auto pt-3 bg-dark text-center text-white-50 fixed-bottom">
      <div className="container">
        <p>
          Scholar Tracker for{" "}
          <a
            href="https://axieinfinity.com/"
            className="text-warning"
            target="blank"
            style={{ textDecoration: "none" }}
          >
            Axie Infinity
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
