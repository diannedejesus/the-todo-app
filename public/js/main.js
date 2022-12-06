const deleteText = document.querySelectorAll('.fa-trash')
const editText = document.querySelectorAll('.fa-pen')
const checkText = document.querySelectorAll('.checkbox')
document.querySelector('.addButton').addEventListener('click', editTodoList)
document.querySelector('.completed').addEventListener('click', hideTodos)
//document.querySelector('.menuButton').addEventListener('click', showAdditionalTasks)

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteTodoItem)
})

Array.from(checkText).forEach((element)=>{
    element.addEventListener('click', checkTodoItem)
})

Array.from(editText).forEach((element)=>{
    element.addEventListener('click', editMode)
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
    //console.log(todo_item)

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

function editTodoList(){
    const menuRef = document.getElementById('editTodo')
    if(!menuRef.style.display || menuRef.style.display === 'none'){
        menuRef.style.display = 'block'
    }else{
        menuRef.style.display = 'none'
    }
    showAdditionalTasks()
}

async function showAdditionalTasks(){
    const menuRef = document.getElementById('editTodo').querySelector('#additonalItems')
    console.log(menuRef.children)
    if(menuRef.children.length !== 0){
        let emptyList = document.createElement("ul")
            emptyList.setAttribute("id", "additonalItems");
        menuRef.replaceWith(emptyList)
    }else{
        try{
            const response = await fetch('getAdditional')
            const data = await response.json()
            console.log(data)
            let newList = document.createElement("ul")
                newList.setAttribute("id", "additonalItems");
            
            for(let i=0; i < data.length; i++){
                console.log(data[i].todo_tag)
                let newElement = document.createElement("li")
                if(data[i].todo_tag === 'priority' && data[i].todo_tag !== 'event'){
                    newElement.setAttribute("class", "starButton fas fa-star");
                }else if(data[i].todo_tag !== 'event'){
                    newElement.setAttribute("class", "starButton far fa-star");
                }else{
                    newElement.setAttribute("class", "far fa-calendar");
                }
                
                newElement.innerText = `${data[i].todo_item}`
                newElement.addEventListener('click', togglePriority)

                newList.appendChild(newElement)
                //document.querySelector('.starButton').addEventListener('click', togglePriority)
                console.log(newList)
            }
            //console.log(menuRef)

            menuRef.replaceWith(newList);

        }catch(err){
            console.log(err)
        }
    }
}

async function togglePriority(){
    let tagChange
    let todo_item = this.innerText

    console.log(this.classList.contains('fas fa-star'))
    if(this.classList.contains('fa-star') && this.classList.contains('fas')){
        this.setAttribute("class", "starButton far fa-star")
        tagChange = 'additional'
    }else{
        this.setAttribute("class", "starButton fas fa-star")
        tagChange = 'priority'
    }
    
    try{
        const response = await fetch('changePriority', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'todo_item': todo_item,
              'todo_tag': tagChange
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

function hideTodos(){
    const theTodos = this.parentElement.querySelector('.todos')

    if(theTodos.classList.contains('hide')){
        theTodos.setAttribute("class", "todos")
    }else{
        theTodos.setAttribute("class", "todos hide")
    }
    
}




async function editMode(){
    const currentNode = this.parentElement
    const todoText = document.createElement("input")
    todoText.name = 'todoitem'
    const todoHidden = document.createElement("input")
    todoHidden.name = 'todoid'
    const todoCheckbox = document.createElement("input")
    todoCheckbox.name = 'todocheck'
    const todoDate = document.createElement("input")
    todoDate.name = 'tododate'
    const submitButton = document.createElement("input")
    submitButton.type = "submit"
    submitButton.onclick = editTodo
    const cancelButton = document.createElement("input")
    cancelButton.type = "button"
    cancelButton.value = "cancel"
    cancelButton.onclick = window.location.reload.bind(window.location)


    for(let items of this.parentNode.children){
        if(items.classList.contains('fa-square') || items.classList.contains('fa-check-square')){
            todoCheckbox.type = 'checkbox'
            todoCheckbox.checked = items.classList.contains('fa-check-square')
        }
        
        if(items.classList.contains('item')){
            todoText.type = 'text'
            todoText.value = items.innerText
            todoHidden.type = 'hidden'
            todoHidden.value = items.dataset.todoid
        }

        if(items.classList.contains('date')){
            const currentDate = new Date(items.innerText).toJSON().slice(0,10)
            todoDate.type = 'date'
            todoDate.value = `${currentDate}`
        } 
    }

    while(currentNode.firstChild){
        currentNode.removeChild(currentNode.firstChild)
    }
    
    currentNode.appendChild(todoCheckbox)
    currentNode.appendChild(todoText)
    currentNode.appendChild(todoHidden)
    currentNode.appendChild(todoDate)
    currentNode.appendChild(submitButton)
    currentNode.appendChild(cancelButton)
}




async function editTodo(){ 
    const todoItem = {
        'todo_item': this.parentElement.querySelector('input[name="todoitem"]').value,
    //  'todo_tag': tagChange,
        'date_item': this.parentElement.querySelector('input[name="tododate"]').value,
        'todoid': this.parentElement.querySelector('input[name="todoid"]').value,
        'todo_checked': this.parentElement.querySelector('input[name="todocheck"]').checked,
    }
    console.log(todoItem)
    try{
        const response = await fetch('editTodo', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify( todoItem )
        })

        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}