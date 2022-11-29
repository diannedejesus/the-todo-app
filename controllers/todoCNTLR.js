const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo-application'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    .catch(error => console.error(error))


module.exports = {

    index: async (req, res) => {
        try{
            const todoItems = await db.collection('items').find().sort({date_item: 1}).toArray()
            res.render('index.ejs', { info: todoItems })
        }catch(err) {
            console.error(err)
        }
    },


    addTodo: (req, res) => {
        console.log(req.body.todo_items)
        let modifiedTodoItem = req.body.todo_item.replace(/\s+/g, ' ').trim()
        db.collection('items').insertOne({
            todo_item: modifiedTodoItem, //.replace(/\s+/g, ' ').trim(), 
            date_item: req.body.todo_date ? new Date(req.body.todo_date) : new Date(),
            todo_tag: req.body.todo_tag, 
            todo_checked: false
        })
        .then(result => {
            console.log('To do added')
            res.redirect('/')
        })
        .catch(error => console.error(error))
    }
 
}