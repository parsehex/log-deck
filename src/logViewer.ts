import { render, h } from "preact";
import { LogViewer } from "@/components/LogViewer";

export function createLogUI() {
  const existing = document.getElementById("logDeck-root");
  if (existing) return;

  const container = document.createElement("div");
  container.id = "logDeck-root";
  document.body.appendChild(container);
  console.log("rendering");
  render(h(LogViewer), container);
}
