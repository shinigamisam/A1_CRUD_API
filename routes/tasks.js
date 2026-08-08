import express from "express";
const router = express.Router();

const tasks = [
  {
    id: 1,
    title: "Learn Math",
    done: true,
  },
  {
    id: 2,
    title: "Learn Statistics",
    done: false,
  },
  {
    id: 3,
    title: "Learn programming",
    done: true,
  },
];

router.get("/", (req, res) => {
  res.status(200).json(tasks);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(200).json(task);
});

export default router;
