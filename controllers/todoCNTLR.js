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

    getOtherTodo: async (req, res) => {
        try{
            const todoItems = await db.collection('items').find().sort({date_item: -1}).toArray()
            res.json(todoItems)
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
    },

    deleteTodo: (req, res) => {
        db.collection('items').deleteOne({todo_item: req.body.todo_item})
        .then(result => {
            console.log('Item Deleted')
            res.json('Item Deleted')
        })
        .catch(error => console.error(error))
    },


    changeTodoPriority: (req, res) => {
        const todoItem = req.body.todo_item
        db.collection('items').updateOne({todo_item: todoItem},{
            $set: {
                todo_tag: req.body.todo_tag
              }
        },{
            sort: {_id: -1},
            //upsert: true
        })
        .then(result => {
            console.log('Changed Priority')
            res.json('Changed Priority')
        })
        .catch(error => console.error(error))
    },

    markTodoCompleted: (req, res) => {
        console.log(req.body.todo_item)
            db.collection('items').updateOne({todo_item: req.body.todo_item},{
                $set: {
                    todo_checked: req.body.todo_checked
                  }
            },{
                sort: {_id: -1},
                //upsert: true
            })
            .then(result => {
                console.log('Marked as completed')
                res.json('Marked as completed')
            })
            .catch(error => console.error(error))
        },

    editTodo: async (req, res) => {
        const todoItem = {
            todo_item: req.body.todo_item,
            date_item: req.body.date_item,
            todo_checked: req.body.todo_checked,
        }
        
        //use id to find
        const test = await db.collection('items').find({_id: req.body.todoid})
        console.log(test)
        //     ,{
        //     $set: todoItem
        // })
        // .then(result => {
        //     console.log('Edit Todo', result)
        //     res.json('Edit Todo')
        // })
        // .catch(error => console.error(error))
    },

}