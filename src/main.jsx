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
    <style>
      .boot-fallback{min-height:100vh;display:grid;place-items:center;padding:48px 24px;background:#0a0a0f;color:#f2ede3;font-family:Segoe UI,Arial,sans-serif}
      .boot-fallback__card{width:min(460px,100%);border-radius:22px;padding:28px 26px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);box-shadow:0 22px 55px rgba(0,0,0,.55);transition:transform .35s ease,box-shadow .35s ease;transform:perspective(900px) rotateX(0deg) rotateY(0deg)}
      .boot-fallback__card:hover{transform:perspective(900px) rotateX(-10deg) rotateY(10deg) translateY(-6px);box-shadow:0 30px 70px rgba(0,0,0,.65)}
      .boot-fallback__logo{width:74px;height:74px;border-radius:18px;display:grid;place-items:center;background:rgba(201,168,76,.14);border:1px solid rgba(201,168,76,.22);color:#c9a84c;font-weight:700;font-size:28px;letter-spacing:.08em}
      .boot-fallback__row{margin-top:16px;display:flex;align-items:center;justify-content:space-between;gap:18px}
      .boot-fallback__label{margin:0;color:#f2ede3;letter-spacing:.2em;text-transform:uppercase;font-size:12px}
      .boot-fallback__dots{display:flex;gap:6px}
      .boot-fallback__dots span{width:7px;height:7px;border-radius:999px;background:rgba(242,237,227,.7);animation:bootDot .9s infinite ease-in-out}
      .boot-fallback__dots span:nth-child(2){animation-delay:.12s}
      .boot-fallback__dots span:nth-child(3){animation-delay:.24s}
      @keyframes bootDot{0%,100%{transform:translateY(0);opacity:.5}50%{transform:translateY(-6px);opacity:1}}
    </style>
    <div class="boot-fallback">
      <div class="boot-fallback__card" role="status" aria-live="polite" aria-label="Loading portfolio">
        <div class="boot-fallback__logo" aria-hidden="true">23</div>
        <div class="boot-fallback__row">
          <p class="boot-fallback__label">Loading portfolio</p>
          <div class="boot-fallback__dots" aria-hidden="true"><span></span><span></span><span></span></div>
        </div>
      </div>
    </div>
  `;

  createRoot(rootElement).render(
    React.createElement(ErrorBoundary, null, React.createElement(App)),
  );
}
