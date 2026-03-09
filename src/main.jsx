import { Component, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error?.message || "Unknown render error",
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            background: "#f5f0e8",
            color: "#1a1714",
            padding: "2rem",
            fontFamily: "Outfit, sans-serif",
          }}
        >
          <div style={{ maxWidth: "720px" }}>
            <h1 style={{ margin: "0 0 1rem", fontSize: "2rem" }}>Portfolio failed to render</h1>
            <p style={{ margin: "0 0 0.75rem" }}>
              The app hit a runtime error. Refresh once. If it still fails, the latest code now ignores old saved data automatically.
            </p>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                background: "#ede7db",
                padding: "1rem",
                borderRadius: "8px",
                border: "1px solid rgba(26, 23, 20, 0.1)",
              }}
            >
              {this.state.errorMessage}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
