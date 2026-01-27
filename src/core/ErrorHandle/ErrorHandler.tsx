type Severity = "success" | "error" | "warning" | "info";

type ErrorHandler = (message: string, severity?: Severity) => void;

let handler: ErrorHandler | null = null;

export const registerErrorHandler = (fn: ErrorHandler) => {
  handler = fn;
};

export const notifyError = (message: string, severity: Severity = "error") => {
  if (handler) {
    handler(message, severity);
  }
};