import React from "react";
import "./index.css";

export default function Footer() {
  return (
    <div>
      <footer
        id="sticky-footer"
        className="footer fixed bottom py-2 bg-dark text-white-50"
      >
        <div className="container text-center">
          <small>Copyright &copy; Derma-app</small>
        </div>
      </footer>
    </div>
  );
}
