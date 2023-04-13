import { User } from "./model/userSchema.js"



export const getAllTodos = async (req, res) => {

    const todos = await Todo.find()

    res.json({ todos: todos })
}

export const getTodoById = async (req, res, next) => {

    const { id } = req.params;

    try {
        const todo = await Todo.findById(id)

        if (todo) {
            res.json({
                todo
            })
        } 
        
    } catch (error) {
        next(error)
    }


}

export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const body = req.body

    await Todo.findByIdAndUpdate(id, body)

    res.json({ message: "Todo has been Updated" })
}

export const deleteTodo = async (req, res) => {
    const { id } = req.params;
    const body = req.body

    await Todo.findByIdAndDelete(id, body)

    res.json({ message: "Todo has been Deleted" })
}

export const addTodo = async (req, res, next) => {

    const todo = req.body;

    try {
        await Todo.create(todo)
        res.json({ message: "Todo has been added" })
    }
     catch (error) {
        next(error)
    }

}