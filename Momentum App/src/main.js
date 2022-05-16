const body = document.body
const mainContainer = document.createElement("div")
mainContainer.classList.add("mainContainer")   

body.append(mainContainer) 


// Input Your Name Section
const userName = document.createElement("div")
userName.classList.add("userName")

const label = document.createElement("label")
label.id = "nameUser"
label.textContent = "Hello, What's Your Name?" 

const input = document.createElement("input")
input.id = "inputUser"
input.type = "text"

userName.append(label,input)
mainContainer.append(userName)

// GET INPUT NAME
input.addEventListener("keypress",function(e){
    if(e.key === "Enter"){
        userName.remove()
        mainContainer.append(timeContainer,greetingsContainer,quotesContainer,todo)
        
        body.style.backgroundImage = "url('320px-solidBG.png')"
    }
}) 
    
// SecondPhase

// TIME Section
const timeContainer = document.createElement("div")
timeContainer.classList.add("timeContainer")
const time = document.createElement("div")
time.id = "time"

function update(){
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
    greetings.innerHTML = `${morningtoEvening},<span>${input.value}</span>`
   
    // Quotes
    let verseContainer = ["So whether you eat or drink, or whatever you do, do it all for the glory of God." , "So whether we are here in this body or away from this body, our goal is to please him." , "Dear friends, let us continue to love one another, for love comes from God. Anyone who loves is a child of God and knows God." , "Teach these new disciples to obey all the commands I have given you. And be sure of this: I am with you always, even to the end of the age." , "Don't be afraid, for I am with you. Don't be discouraged, for I am your God. I will strengthen you and help you. I will hold you up with my victorious right hand."]
    let verseTitleContainer = ["1 Corinthians 10:31" , "2 Corinthians 5:9" , "1 John 4:7" , "Matthew 28:20" , "Isaiah 41:10"]

    verse.textContent = verseContainer[minutes%5]
    verseTitle.textContent = verseTitleContainer[minutes%5]
}

window.addEventListener("load", function(){
    setInterval(update, 1000)
})

timeContainer.append(time)


// Greetings & Main Focus Section

//Greetings:
const greetingsContainer = document.createElement("div")
greetingsContainer.classList.add("greetingsContainer")
const greetings = document.createElement("div")
greetings.id = "greetings"

// Main Focus
const priorityContainer = document.createElement("div")
priorityContainer.classList.add("priorityContainer")
const priorityQuestion = document.createElement("label")
priorityQuestion.id = "priorityQuestion"
priorityQuestion.textContent = "What is your priority for today?" 
const inputPriority = document.createElement("input")
inputPriority.id = "inputPriority"
inputPriority.type = "text"

priorityContainer.append(priorityQuestion,inputPriority)
greetingsContainer.append(greetings,priorityContainer)

// GET INPUT Focus
const mainFocus = document.createElement("div")
mainFocus.id = "mainFocus"
mainFocus.textContent = "Your Main Focus for Today:" 

const mainFocusValue = document.createElement("span")
mainFocusValue.id = "mainFocusValue"


inputPriority.addEventListener("keypress",function(e){
    if(e.key === "Enter"){
        priorityQuestion.remove()
        inputPriority.remove()
        mainFocusValue.textContent = `${inputPriority.value}`

        priorityContainer.append(mainFocus,mainFocusValue)
    }
}) 


// Quotes Section

const quotesContainer = document.createElement("div")
quotesContainer.classList.add("quotesContainer")
const verse = document.createElement("div")
const verseTitle = document.createElement("div")
quotesContainer.append(verse,verseTitle)


// ToDo Section

const todo = document.createElement("div")
todo.id = "todo"
todo.classList.add("toggle")
todo.textContent = "ToDo"

// Toggle todo
todo.addEventListener("click",(e) => {
    if(e.target.className ==="toggle"){
        mainContainer.append(todoList)
        todo.classList.remove("toggle")
    }else{
        todoList.remove()
        todo.classList.add("toggle")
    }

})   

// ToDoList Section
const todoList = document.createElement("div")
todoList.classList.add("todoList")
const title = document.createElement("p")
title.id = "title"
title.textContent = "THINGS TO DO:"
const lists = document.createElement("ul")
lists.id ="lists"
const form= document.createElement("form")
form.id = "form"
const inputtoDo= document.createElement("input")
inputtoDo.id="inputtoDo"
inputtoDo.type = "text"
const button= document.createElement("button")
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
const value = inputtoDo.value;
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

   //Add to local storage
   values.push(value);
   localStorage.setItem("values", JSON.stringify(values))

   //Clear input text
   inputtoDo.value = ""
 });

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







   























