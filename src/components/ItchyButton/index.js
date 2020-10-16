import React from "react";
import "./itchyButton.css"

export default function ItchyButton() {
  return (
<div class="dropdown">
  <button class="dropbtn">What score would you give to your itchiness today?</button>
  <div class="dropdown-content">
    <a href="#">0</a>
    <a href="#">1</a>
    <a href="#">2</a>
    <a href="#">4</a>
    <a href="#">5</a>   
  </div>
</div>
  );
}

// thinking of using the bootstrap button for an upgrade