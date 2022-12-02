const express = require('express')
const app = express()
const PORT = 3030

const indexRouter = require('./routes/todoRTE');

require('dotenv').config()


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.use('/', indexRouter);


app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})