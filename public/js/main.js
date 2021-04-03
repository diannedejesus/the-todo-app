const deleteText = document.querySelectorAll('.fa-trash')
const checkText = document.querySelectorAll('.far')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteTodoItem)
})

Array.from(checkText).forEach((element)=>{
    element.addEventListener('click', checkTodoItem)
})

async function deleteTodoItem(){
    const tItem = this.parentNode.querySelectorAll('.item')[0].innerText
    const tDate = this.parentNode.querySelectorAll('.date')[0].innerText
    try{
        const response = await fetch('/deleteTodo', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'todo_item': tItem,
              'date_item': tDate
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function checkTodoItem(){
    const todo_item = this.parentNode.querySelectorAll('.item')[0].innerText
    const item_date = this.parentNode.querySelectorAll('.date')[0].innerText
    const todo_checked = this.parentNode.querySelectorAll('.fa-square')[0]

    try{
        const response = await fetch('markCompleted', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'todo_item': todo_item,
              'item_date': item_date,
              'todo_checked': !!todo_checked
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}