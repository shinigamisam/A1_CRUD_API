import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("Home route");
  res.status(200).json({ message: "Hello" });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
