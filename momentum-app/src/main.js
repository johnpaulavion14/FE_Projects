const body = document.body
const mainContainer = document.createElement("div")
const userName = document.createElement("div")
const label = document.createElement("label")
const input = document.createElement("input")
const timeContainer = document.createElement("div")
const time = document.createElement("div")
const greetingsContainer = document.createElement("div")
const greetings = document.createElement("div")
const greetingsTime = document.createElement("span")
const greetingsName = document.createElement("span")
const nameGreetingsInput = document.createElement("input")
const priorityContainer = document.createElement("div")
const priorityQuestion = document.createElement("label")
const inputPriority = document.createElement("input")
const mainFocus = document.createElement("div")
const containerFocusValue = document.createElement("div")
const focusValue = document.createElement("span")
const checkbox = document.createElement("input")
const quotesContainer = document.createElement("div")
const verse = document.createElement("div")
const verseTitle = document.createElement("div")
const todo = document.createElement("div")
const todoList = document.createElement("div")
const title = document.createElement("p")
const lists = document.createElement("ul")
const form= document.createElement("form")
const inputtoDo= document.createElement("input")
const button= document.createElement("button")

mainContainer.classList.add("mainContainer")   
body.append(mainContainer) 

// Input Your Name Section
userName.classList.add("userName")
label.id = "nameUser"
label.textContent = "Hello, What's Your Name?" 
input.id = "inputUser"
input.type = "text"
userName.append(label,input)
mainContainer.append(userName)

// GET INPUT NAME
input.addEventListener("keypress",function(e){
if(e.key === "Enter"){
    userName.remove()
    greetingsName.textContent = input.value
    mainContainer.append(timeContainer,greetingsContainer,quotesContainer,todo)
    if(window.innerWidth < 1000){
    body.style.backgroundImage = "url('320px-solidBG.png')"
    timeContainer.style = "animation:animate 0.5s linear;"
    greetings.style = "animation:animate 1.5s linear;"
    greetingsContainer.style = "animation:animate 0.7s linear;"
    quotesContainer.style = "animation:animate 0.9s linear;"
    todo.style = "animation:animate 1.2s linear;"
    }else{
        body.style.backgroundImage = "url('1000px-solidBG.png')"
        timeContainer.style = "animation:animate 0.5s linear;"
        greetings.style = "animation:animate 1.5s linear;"
        greetingsContainer.style = "animation:animate 0.7s linear;"
        quotesContainer.style = "animation:animate 0.9s linear;"
        todo.style = "animation:animate 1.2s linear;"
    }
}
}) 

// TIME Section
timeContainer.classList.add("timeContainer")
time.id = "time"

function updateTime(){
const d = new Date();
let hours = `${d.getHours()}`
let minutes = `${d.getMinutes()}`
let seconds = `${d.getSeconds()}`
let ampm = hours >= 12 ? hours === 24 ?"am":"pm" : "am"

// Time
timeHour = hours % 12;
timeHour = timeHour ? timeHour : 12;
time.innerHTML = `${timeHour}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} ${ampm}`

// Greetings
let morningtoEvening = hours >= 12 ? 
                        hours >= 14? 
                        hours >=17 ? "GOODEVENING":"GOODAFTERNOON"
                        :"GOODNOON"     
                        :"GOODMORNING"
greetingsTime.textContent = `${morningtoEvening},`


// Quotes
let verseContainer = ["So whether you eat or drink, or whatever you do, do it all for the glory of God." , "So whether we are here in this body or away from this body, our goal is to please him." , "Dear friends, let us continue to love one another, for love comes from God. Anyone who loves is a child of God and knows God." , "Teach these new disciples to obey all the commands I have given you. And be sure of this: I am with you always, even to the end of the age." , "Don't be afraid, for I am with you. Don't be discouraged, for I am your God. I will strengthen you and help you. I will hold you up with my victorious right hand."]
let verseTitleContainer = ["1 Corinthians 10:31" , "2 Corinthians 5:9" , "1 John 4:7" , "Matthew 28:20" , "Isaiah 41:10"]

verse.textContent = verseContainer[minutes%5]
verseTitle.textContent = verseTitleContainer[minutes%5]
}
setInterval(updateTime, 1000)
timeContainer.append(time)

// Greetings & Main Focus Section
//Greetings:
greetingsContainer.classList.add("greetingsContainer")
greetings.id = "greetings"
greetingsName.id = "greetingsName"
greetingsName.title = "double-click to edit"
nameGreetingsInput.id = "nameGreetingsInput"
nameGreetingsInput.type = "text"
greetings.append(greetingsTime,greetingsName)

greetingsName.addEventListener("dblclick", function(e){
    greetingsName.remove()
    greetings.append(nameGreetingsInput)
})
nameGreetingsInput.addEventListener("keypress",function(e){
    if(e.key === "Enter"){
        nameGreetingsInput.remove()
        greetingsName.textContent = nameGreetingsInput.value
        greetings.append(greetingsName)
        localStorage.setItem("nameInputValue", greetingsName.textContent);
    }
}) 

// Main Focus
priorityContainer.classList.add("priorityContainer")
priorityQuestion.id = "priorityQuestion"
priorityQuestion.textContent = "What is your priority for today?" 
inputPriority.id = ("inputPriority")
inputPriority.type = "text"

priorityContainer.append(priorityQuestion,inputPriority)
greetingsContainer.append(greetings,priorityContainer)

// GET INPUT Focus
mainFocus.id = "mainFocus"
mainFocus.textContent = "Your Main Focus for Today:" 
containerFocusValue.id = "mainFocusValue"
containerFocusValue.title = "double-click to edit"
checkbox.type = "checkbox"
checkbox.id = "checkBox"
focusValue.id = "focusValue"

inputPriority.addEventListener("keypress",function(e){
    if(e.key === "Enter"){
        priorityQuestion.remove()
        inputPriority.remove()
        focusValue.textContent = `${inputPriority.value}`
        mainFocus.style = "animation: animate 1s ease;"
        containerFocusValue.style = "animation: animate 1s ease;"
        containerFocusValue.append(checkbox,focusValue)
        priorityContainer.append(mainFocus,containerFocusValue)
        localStorage.setItem('focusValue', focusValue.textContent);
    }
}) 

containerFocusValue.addEventListener("dblclick", function(e){
    containerFocusValue.remove()
    priorityContainer.append(inputPriority)
})
checkbox.addEventListener("click",function(e){
    if(e.target.checked){
        focusValue.style = "text-decoration: line-through;"
        // focusValue.style = "text-decoration-color: red;"
    }else{
        focusValue.style = "text-decoration: none;"
    }
})

// Quotes Section
quotesContainer.classList.add("quotesContainer")
quotesContainer.append(verse,verseTitle)

// ToDo Section
todo.id = "todo"
todo.classList.add("toggle")
todo.textContent = "ToDo"

// Toggle todo
todo.addEventListener("click",(e) => {
if(e.target.className ==="toggle"){
    mainContainer.append(todoList)
    todo.classList.remove("toggle")
    todoList.style = "animation: animate 1s ease;"
}else{
    todoList.remove()
    todo.classList.add("toggle")
}
})   

// ToDoList Section
todoList.classList.add("todoList")
title.id = "title"
title.textContent = "THINGS TO DO:"
lists.id ="lists"
form.id = "form"
inputtoDo.id="inputtoDo"
inputtoDo.type = "text"
button.id = "button"
button.textContent = "ADD"
form.append(inputtoDo)
form.append(button)
todoList.append(title,lists,form)

//Delete List Function
lists.addEventListener("click", (e) => {
    if(e.target.className == "delete"){
    const li = e.target.parentElement;
    li.parentNode.removeChild(li);

    //delete LocalSorage
    const getValue = JSON.parse(localStorage.getItem('values'))
    const inputValue = li.children[0].textContent
    const workListIndex = values.indexOf(inputValue)
    getValue.splice(workListIndex,1)
    values.splice(workListIndex,1)
    localStorage.setItem("values" , JSON.stringify(getValue))

}
});

// Storing input values in array
let values;
if(localStorage.getItem("values")){
values = JSON.parse(localStorage.getItem("values"))
}else{
values=[]
}

//Add List Function
form.addEventListener("submit", function(e){
    e.preventDefault();

    // create elements
    const workListContainer = document.createElement("div")
    workListContainer.id = "workListContainer"
    const editWorkList = document.createElement("input")
    editWorkList.title = "press Enter"
    editWorkList.id = "editWorkList"
    const value = inputtoDo.value;
    const li = document.createElement("li");
    const crossOut = document.createElement("input")
    crossOut.type = "checkbox"
    crossOut.id = "checkBox"

    li.id = "li"
    const workList = document.createElement("span");
    workList.id = "workList"
    workList.title = "double-click to edit"
    const deleteBtn = document.createElement("span");
    deleteBtn.id = "deleteBtn"

    // add text content
    workList.textContent = value;
    deleteBtn.textContent = "delete";

    // add classes
    deleteBtn.classList.add("delete");

    // append to DOM
    workListContainer.append(crossOut,workList)
    li.append(workListContainer,deleteBtn);
    lists.append(li);

    //Add to local storage
    values.push(value);
    localStorage.setItem("values", JSON.stringify(values))

    //Clear input text
    inputtoDo.value = ""

    //Edit toDos
    editWorkList.type = "text"

    workList.addEventListener("dblclick", function(){
        workList.remove()
        editWorkList.value = workList.textContent
        workListContainer.append(editWorkList)
    })
    crossOut.addEventListener("click",function(e){
        if(e.target.checked){
            workList.style = "text-decoration: line-through;"
        }else{
            workList.style = "text-decoration: none;"
        }
    })
    // editWorkList.addEventListener("keypress",function(e){
    //     if(e.key === "Enter"){
    //         editWorkList.remove()
    //         workList.textContent = editWorkList.value
    //         workListContainer.append(workList)
    //         // localStorage.setItem("values", greetingsName.textContent);
    //         // values.push(editWorkList.value);
            
    //         // values.forEach((element, index) => {
    //             //     arr[index] = element + index;
    //             //   });
                
    //             //delete LocalSorage
    //             // // const getValue = JSON.parse(localStorage.getItem('values'))
    //             // const inpValue = li.children[0].textContent
    //             // // getValue.splice(workListIndex,1)
    //             // const index = values.indexOf(inpValue)
    //             // console.log
    //             // values[index] = editWorkList.value
    //             // // values.splice(index,1)
    //             // localStorage.setItem("values", JSON.stringify(values))
    //         // localStorage.setItem("values" , JSON.stringify(getValue))
            
    //     }
    //     // else{
            
    //     // }
    // }) 
    // localStorage.clear()
})

//Display local storage
const getValue = JSON.parse(localStorage.getItem('values'))
getValue.forEach(value => {
    // create elements
    const li = document.createElement("li");
    li.id = "li"
    const workList = document.createElement("span");
    workList.id = "workList"
    const deleteBtn = document.createElement("span");
    deleteBtn.id = "deleteBtn"
    // add text content
    workList.textContent = value;
    deleteBtn.textContent = "delete";
    // add classes
    deleteBtn.classList.add("delete");
    // append to DOM
    li.append(workList,deleteBtn);
    lists.append(li);
});


