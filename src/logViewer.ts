import { render, h } from "preact";
import { LogViewer } from "@/components/LogViewer";

export function createLogUI() {
  const existing = document.getElementById("logDeck-root");
  if (existing) return;

  const container = document.createElement("div");
  container.id = "logDeck-root";
  document.body.appendChild(container);

  // Watch for changes in the logs and re-render when updated
  render(
    h(LogViewer, {}),
    container
  );
}
