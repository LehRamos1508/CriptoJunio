export function errorHandler(err, req, res, next) {
  console.error("Erro capturado pelo middleware:", err);
  res.status(500).json({
    error: "Erro interno do servidor",
    message: err.message,
  });
}
