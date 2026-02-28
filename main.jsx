import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ForeWords from "./ForeWords.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ForeWords />
  </StrictMode>
);
