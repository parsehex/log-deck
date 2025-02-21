import "./style.css";
export { createLogger, logDeck, logHistory } from "./logger";
export { createLogUI } from "./logViewer";

import { logDeck, createLogger } from "./logger";
import { createLogUI } from './logViewer';

logDeck.log("This is a test log.");
logDeck.info({ _ctx: { userId: 123 } }, "User logged in.");

const moduleLogger = createLogger("MyModule");
moduleLogger.warn("This is a warning from MyModule.");

createLogUI();

const btn = document.createElement('button');
btn.addEventListener('click', () => {
	logDeck.log('Test');
});
btn.textContent = 'Add Log';
document.body.appendChild(btn);
