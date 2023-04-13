import express from "express";
import { getAllTodos, getTodoById, updateTodo, deleteTodo, addTodo } from "../controllers/todoController.js";
import { isAuthenticatedUser, isAuthorizedUser } from '../middleware/auth.js'
const router = express.Router();



router.route('/todos').get(getAllTodos);

router.route('/todo/:id').get(getTodoById);

router.route('/todo/update/:id').put(updateTodo);

router.route('/todo/delete/:id').delete(deleteTodo);

router.route('/todo/new').post(addTodo);


export default router;