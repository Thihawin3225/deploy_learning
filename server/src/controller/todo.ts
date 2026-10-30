import type { Request, Response } from "express";
import { Todo } from "../models/todo.js";

export const createNewTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const newTodo = await Todo.create({
      title,
    });
    res
      .status(201)
      .json({ message: "New todo added is successful", note: newTodo });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ message: "All Todo are here", note: todos });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  try {
    const todo = await Todo.findById(todoId);
    res.status(200).json({ message: "Get One Item", note: todo });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;

  try {
    await Todo.findByIdAndDelete(todoId);
    res.status(200).json({ message: "Todo is Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updatedTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  const { title } = req.body;
  try {
    const updateTodoItem = await Todo.findByIdAndUpdate(todoId, {
      title,
    });
    res.status(200).json({ message: "Item is updated" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
