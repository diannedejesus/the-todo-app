const deleteText = document.querySelectorAll('.fa-trash')
const checkText = document.querySelectorAll('.checkbox')
document.querySelector('.addButton').addEventListener('click', editTodo)
//document.querySelector('.menuButton').addEventListener('click', showAdditionalTasks)

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

function editTodo(){
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