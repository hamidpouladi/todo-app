const express = require("express");
const router = express.Router();
const todoModel = require("../models/todo");

// Get the list of Todos
router.get("/todos", async (req, res) => {
  try {
    const todos = await todoModel.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Save new todo
router.post("/todos", async (req, res) => {
  const todo = new todoModel({
    title: req.body.title,
  });
  if (req.body.status) {
    todo.status = req.body.status;
  }
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update todo by id
router.patch("/todos/:id", async (req, res) => {
  try {
    const todo = await todoModel.findById(req.params.id);
    if (todo === null) {
      res.status(404).json({ message: "Cannot find todo item" });
    } else {
      if (req.body.title) {
        todo.title = req.body.title;
      }
      if (req.body.status) {
        todo.status = req.body.status;
      }
      try {
        const updatedTodo = await todo.save();
        res.json(updatedTodo);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
