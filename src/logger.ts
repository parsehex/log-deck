export type LogMethod = (...args: any[]) => void;

export interface Logger {
	log: LogMethod;
	info: LogMethod;
	warn: LogMethod;
	error: LogMethod;
	debug: LogMethod;
}
export type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'debug';

const logHistory: { level: LogLevel; message: any[]; ctx?: any; timestamp: number, pageLoadId: string }[] = [];
window.pageLoadId = Date.now().toString();

function createLogger(moduleName?: string): Logger {
	function logMessage(level: LogLevel, ...args: any[]) {
		const timestamp = Date.now();
		let ctx;

		if (args.length > 0 && args[0] && typeof args[0] === "object" && "_ctx" in args[0]) {
			ctx = args.shift()._ctx;
		}

		logHistory.push({ level, message: args, ctx, timestamp, pageLoadId: window.pageLoadId });

		const prefix = `[${moduleName || "LogDeck"}] [${level.toUpperCase()}]`;
		console[level]?.(prefix, ...args, ctx ? `(ctx: ${JSON.stringify(ctx)})` : "");
	}

	return {
		log: (...args) => logMessage("log", ...args),
		info: (...args) => logMessage("info", ...args),
		warn: (...args) => logMessage("warn", ...args),
		error: (...args) => logMessage("error", ...args),
		debug: (...args) => logMessage("debug", ...args),
	};
}

// Default logger
export const logDeck = createLogger();
export { createLogger, logHistory };
