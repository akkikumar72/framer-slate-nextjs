"use client";

import { useState } from "react";
import "./price-toggle.css";

export function PriceToggle() {
  const [higherPrice, setHigherPrice] = useState(false);
  const price = higherPrice ? "$69" : "$49";

  return (
    <div className="home-plan-price orbital-price-toggle">
      <div className="orbital-price-toggle__value" aria-live="polite">
        <h3>{price}</h3>
        <span>/ Forever</span>
      </div>
      <button
        className="orbital-price-toggle__switch"
        type="button"
        role="switch"
        aria-checked={higherPrice}
        aria-label="Toggle Pro price between $49 and $69"
        onClick={() => setHigherPrice((current) => !current)}
      >
        <span className="orbital-price-toggle__knob" aria-hidden="true" />
      </button>
    </div>
  );
}
