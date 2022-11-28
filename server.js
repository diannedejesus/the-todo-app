const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
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
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())


app.get('/', async (request, response) => {
    try{
        const todoItems = await db.collection('items').find().sort({date_item: 1}).toArray()
        response.render('index.ejs', { info: todoItems })
    }catch(err) {
        console.error(err)
    }
})
app.get('/getAdditional', async (request, response) => {
    try{
        const todoItems = await db.collection('items').find().sort({date_item: -1}).toArray()
        //response.render('index.ejs', { info: todoItems })
        response.json(todoItems)
        //console.log(todoItems)
    }catch(err) {
        console.error(err)
    }
})

app.post('/addTodo', (request, response) => {
    console.log(request.body.todo_items)
    let modifiedTodoItem = request.body.todo_item.replace(/\s+/g, ' ').trim()
    db.collection('items').insertOne({
        todo_item: modifiedTodoItem, //.replace(/\s+/g, ' ').trim(), 
        date_item: request.body.todo_date ? new Date(request.body.todo_date) : new Date(),
        todo_tag: request.body.todo_tag, 
        todo_checked: false
    })
    .then(result => {
        console.log('To do added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteTodo', (request, response) => {
    db.collection('items').deleteOne({todo_item: request.body.todo_item})
    .then(result => {
        console.log('Item Deleted')
        response.json('Item Deleted')
    })
    .catch(error => console.error(error))
})


app.put('/changePriority', (request, response) => {
    const todoItem = request.body.todo_item
    db.collection('items').updateOne({todo_item: todoItem},{
        $set: {
            todo_tag: request.body.todo_tag
          }
    },{
        sort: {_id: -1},
        //upsert: true
    })
    .then(result => {
        console.log('Changed Priority')
        response.json('Changed Priority')
    })
    .catch(error => console.error(error))

})

app.put('/markCompleted', (request, response) => {
    console.log(request.body.todo_item)
    db.collection('items').updateOne({todo_item: request.body.todo_item},{
        $set: {
            todo_checked: request.body.todo_checked
          }
    },{
        sort: {_id: -1},
        //upsert: true
    })
    .then(result => {
        console.log('Marked as completed')
        response.json('Marked as completed')
    })
    .catch(error => console.error(error))

})


app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})