import express from "express";
import bodyParser from "body-parser";
import healthRoutes from "./routes/health.js";
import taskRoutes from "./routes/tasks.js";
import swaggerUi from "swagger-ui-express";
import openapiDocument from "./openapi.json" with { type: "json" };

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/tasks", taskRoutes);
app.use("/health", healthRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiDocument));

const info = {
  name: "Task API",
  version: "1.0",
  endpoints: ["/tasks"],
};

app.get("/", (req, res) => {
  console.log("Home route");
  res.status(200).json(info);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
