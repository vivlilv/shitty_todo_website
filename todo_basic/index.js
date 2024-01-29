
// const { Client } = require("@notionhq/client");

// const apiKey = 'secret_gk5jxGQEuU7WnKGMVZ7KINPEXMoWbslHvdmt2HLIKtf';
// const databaseId = '0bcc7951f3684aa8aa8dca94841bd53a';


// const notion = new Client({ auth: apiKey })

document.addEventListener('DOMContentLoaded', function () {
  const addTaskButton = document.getElementById("add-task")
  const toDoContainer = document.getElementById("to-dos")
  const inputField = document.getElementById("inputField")



  let tasks = []

  if(localStorage.getItem("tasks")){
    tasks = JSON.parse(localStorage.getItem("tasks"))
    renderTasks(tasks)
  }

  addTaskButton.addEventListener("click", function(){
    const text = inputField.value.trim()
    if(text!==""){
      inputField.value=""
      const newTask = {text: text, completed: false}
      tasks.push(newTask)
      saveTasksToLocalStorage()
      renderTasks(tasks)
    }
  })

  function saveTasksToLocalStorage(){
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }

  function renderTasks(taskList){
    toDoContainer.innerHTML = ""
    taskList.forEach(task=>{
      const paragraph = document.createElement("p")
      paragraph.classList.add("paragraph-styling")
      paragraph.innerText = task.text

      if(task.completed){
        paragraph.style.textDecoration = "line-through"
      }

      toDoContainer.appendChild(paragraph)

      paragraph.addEventListener("click", function(){
        task.completed =!task.completed
        saveTasksToLocalStorage()
        renderTasks(taskList)
      })

      paragraph.addEventListener("dblclick", function(){
        tasks = tasks.filter(t => t!==task)
        saveTasksToLocalStorage()
        renderTasks(tasks)
      })
    })
  }

  document.getElementById("all").addEventListener("click", function(){
    event.preventDefault()
    renderTasks(tasks)
    
  })

  document.getElementById("active").addEventListener("click", function(){
    event.preventDefault()
    const filterActive = tasks.filter(task => !task.completed)
    renderTasks(filterActive)
  })

  document.getElementById("completed").addEventListener("click", function(){
    event.preventDefault()
    const filterCompleted = tasks.filter(task => task.completed)
    renderTasks(filterCompleted)
  })


  // const sendButton = document.getElementById("send-to-notion")
  // const axios = require("axios")
  // sendButton.addEventListener("click", function(){
  //   axios.post("https://www.notion.so/NOTION-TODO-API-0bcc7951f3684aa8aa8dca94841bd53a?pvs=4")
  // })

  
})



