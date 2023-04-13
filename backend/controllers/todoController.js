import { Todo } from "../model/todoSchema.js"



export const getAllTodos = async (req, res) => {

    const page = parseInt(req.query.page) - 1 || 0;
    const limit =  parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "_id";
    req.query.sort ? (sort=req.query.sort.split(",")) : (sort=[sort])

    let sortBy = {};
    if(sort[1]){
        sortBy[sort[0]] = sort[1]
    }else{
        sortBy[sort[0]] = "asc"
    }


    let todos = await Todo.find({title:{$regex:search, $options:"i"}}).sort(sortBy).skip(page*limit).limit(limit)
    let total = await Todo.countDocuments({title:{$regex:search, $options:"i"}})

    let pageCount = Math.ceil(total/limit)
    // let todos = await Todo.find({
    //     "$or":[
    //         {title:{$regex: searchTerm}},
    //         {body:{$regex: searchTerm}},
    //     ]
    // })
    

    res.json({ 
        todos,
        total,
        page: page+1,
        limit,
        pageCount
    })
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
        
    } catch (err) {
        next(err)
    }


}

export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const body = req.body

    console.log(id, body);

    await Todo.findByIdAndUpdate(id, body)

    res.json({ message: "Todo has been Updated" })
}

export const deleteTodo = async (req, res) => {
    const { id } = req.params;

    await Todo.findByIdAndDelete(id)

    res.json({ message: "Todo has been Deleted" })
}

export const addTodo = async (req, res, next) => {

    const todo = req.body;

    try {
        await Todo.create(todo)
        res.json({ message: "Todo has been added" })
    }
     catch (err) {
        next(err)
    }

}