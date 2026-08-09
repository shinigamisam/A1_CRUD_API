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

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  // Check if task exists
  if (!task) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  // Check if request body is empty
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Request body cannot be empty",
    });
  }

  // Check if title is valid, if provided
  if (
    req.body.title !== undefined &&
    (typeof req.body.title !== "string" || req.body.title.trim() === "")
  ) {
    return res.status(400).json({
      error: "Title must be a non-empty string",
    });
  }

  // Check if done is valid, if provided
  if (req.body.done !== undefined && typeof req.body.done !== "boolean") {
    return res.status(400).json({
      error: "Done must be true or false",
    });
  }

  // Update only the fields provided
  if (req.body.title !== undefined) {
    task.title = req.body.title;
  }

  if (req.body.done !== undefined) {
    task.done = req.body.done;
  }

  res.status(200).json(task);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  tasks.splice(taskIndex, 1);

  res.status(204).send();
});

export default router;
