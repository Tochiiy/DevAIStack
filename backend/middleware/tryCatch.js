// ─── ASYNC ERROR WRAPPER ────────────────────────────────────
// Wraps async route handlers so thrown errors are caught and
// returned as 500 JSON instead of crashing the process.
// In production, replace console.error with a structured logger.
const TryCatch = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default TryCatch;

