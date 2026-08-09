import express from "express";
import { v4 as uuidv4 } from "uuid";

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

router.post("/", (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      error: "Title is required",
    });
  }

  const newId =
    tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;

  const task = {
    id: newId,
    title: title,
    done: false,
  };

  tasks.push(task);

  res.status(201).json(task);
});

export default router;
