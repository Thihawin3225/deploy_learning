import { Router } from "express";
import { createNewTodo, deleteTodo, getTodo, getTodos, updatedTodo, } from "../controller/todo.js";
const router = Router();
router.post("/create", createNewTodo);
router.get("/read", getTodos);
router.get("/read/:todoId", getTodo);
router.delete("/delete/:todoId", deleteTodo);
router.put("/update/:todoId", updatedTodo);
export default router;
//# sourceMappingURL=todo.js.map