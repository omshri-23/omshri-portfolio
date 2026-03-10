import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: String(error) };
  }

  componentDidCatch(error) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return React.createElement(
        "div",
        {
          style: {
            minHeight: "100vh",
            background: "#0a0a0f",
            color: "#f2ede3",
            fontFamily: "Segoe UI, Arial, sans-serif",
            padding: "40px 24px",
          },
        },
        React.createElement(
          "div",
          { style: { maxWidth: "1100px", margin: "0 auto" } },
          React.createElement(
            "p",
            {
              style: {
                margin: 0,
                color: "#c9a84c",
                letterSpacing: ".2em",
                textTransform: "uppercase",
                fontSize: "12px",
              },
            },
            "Render error",
          ),
          React.createElement(
            "h1",
            { style: { margin: "16px 0 12px", fontSize: "48px", lineHeight: 1 } },
            "Omshri Singh",
          ),
          React.createElement(
            "pre",
            { style: { whiteSpace: "pre-wrap", color: "#c7c0b2" } },
            this.state.message,
          ),
        ),
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById("root");

document.documentElement.style.background = "#0a0a0f";
document.body.style.margin = "0";
document.body.style.background = "#0a0a0f";
document.body.style.color = "#f2ede3";
document.body.style.fontFamily = "Segoe UI, Arial, sans-serif";

if (rootElement) {
  rootElement.style.minHeight = "100vh";
  rootElement.style.background = "#0a0a0f";
  rootElement.innerHTML = `
    <div style="min-height:100vh;background:#0a0a0f;color:#f2ede3;font-family:Segoe UI,Arial,sans-serif;padding:40px 24px;">
      <div style="max-width:1100px;margin:0 auto;">
        <p style="margin:0;color:#c9a84c;letter-spacing:.2em;text-transform:uppercase;font-size:12px;">Loading portfolio</p>
        <h1 style="margin:16px 0 12px;font-size:48px;line-height:1;">Omshri Singh</h1>
        <p style="margin:0;color:#c7c0b2;line-height:1.8;">If React is still loading, this fallback remains visible instead of a blank page.</p>
      </div>
    </div>
  `;

  createRoot(rootElement).render(
    React.createElement(ErrorBoundary, null, React.createElement(App)),
  );
}
