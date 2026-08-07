import express from "express";
import bodyParser from "body-parser";
import healthRoutes from "./routes/health.js";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/health", healthRoutes);

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
