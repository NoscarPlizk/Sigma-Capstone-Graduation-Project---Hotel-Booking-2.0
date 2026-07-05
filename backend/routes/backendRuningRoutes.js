export function ReportBackendRuning(app) {
  app.get("/", (req, res) => {
    res.json({
      success: true,
      message: "Stripe backend server is running",
    });
  });
}
