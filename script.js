const addBtn = document.getElementById("add");
let notes =  document.getElementById("notes"); 
// let bIsActive = false; 

const Savednotes = JSON.parse(localStorage.getItem("notes"));

if (Savednotes) {
    Savednotes.forEach((note) => {
        addNewNote(note);
    });
}

addBtn.addEventListener("click", () => {
    addNewNote();
});

function addNewNote(text = "") {
    const note = document.createElement("div");
    note.classList.add("note");
    // console.log(note); 

    note.innerHTML=`
            <div class="tools">
                    <input class= "NoteHead" placeholder="Click to add a header"></input>
                <div class= "noteBtn">
                    <button class="edit"><i class="fas fa-edit"></i></button>
                    <button class="delete"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>

            <div class="main ${text ? "" : "hidden"}"></div>
            <textarea class="${text ? "hidden" : ""}"></textarea>
    `;
    notes.appendChild(note);


    const editBtn = note.querySelector(".edit");
    const deleteBtn = note.querySelector(".delete");

    const main = note.querySelector(".main");
    const textArea = note.querySelector("textarea");

    textArea.value = text;
    main.innerHTML = marked(text);

    editBtn.addEventListener("click", () => {
        main.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });

    deleteBtn.addEventListener("click", () => {
        note.remove();

        updateLS();
    });

    textArea.addEventListener("input", (e) => {
        const { value } = e.target;
        

        main.innerHTML = marked(value);

        updateLS();
    });

    textArea.addEventListener("click", ()=>{
        // if(bIsActive == false){
        //    
        //     bIsActive = true;
        // }else{
        //     bIsActive = false;
        // }
        note.classList.toggle("active");
    });

    
    
    
}

document.addEventListener("click",(e)=>{
    const ActiveNotes = Array.prototype.slice.call(document.getElementsByClassName("active")); //copy LiveHTML collection in array
    // const ActiveNotes = document.querySelectorAll('.' +"active"); //correct way to use queery selector since it used CSS selectable properties you should use '.'

    //----------NOTE!: the reason why this did not work is because getElementsByClassName is live which means with every update to the collection an item is removed so it will loop over one less item which will make it skip
    //----------check out the ref here: https://stackoverflow.com/questions/39042435/why-is-my-javascript-for-loop-skipping-elements

    // console.log(e.target.tagName);
    // console.log(ActiveNotes);
    if((e.target.tagName != "TEXTAREA") || (e.target.tagName == "BUTTON")){
        // console.log("inside the target");
        for(let note of ActiveNotes){
            if(note.classList.contains("active")){
            note.classList.remove("active");
            // console.log("removed one");
        }
            // console.log("inside the loop");
            // console.log(`note:" ${note}`);
            // console.log(`Length ${ActiveNotes.length}`);
        }
          
    //-------------You can use forEach or for of but for in is for objects.    
    //     ActiveNotes.forEach((note) => {
    //     note.classList.remove("active");
    //     console.log("inside the foreach");
    //     // bIsActive = false;
    // });
    }
});

function updateLS() {
    const notesText = document.querySelectorAll("textarea");

    const notes = [];

    notesText.forEach((note) => {
        notes.push(note.value);
    });

    localStorage.setItem("notes", JSON.stringify(notes));
}


//------------------------------------------TODOs------------------------------------------------------//

const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");
const compsec = document.getElementById("todos-comp"); 

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach((todo) => {
        addTodo(todo);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
});

function addTodo(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoEl = document.createElement("li");
        todoEl.classList.add("todo");
        const delbtn = document.createElement("button");
        delbtn.classList.add("delete");
        const delbtntxt = document.createElement("I");
        delbtntxt.classList.add("fas");
        delbtntxt.classList.add("fa-trash-alt");
        
        

        if (todo && todo.completed) {

            todoEl.classList.add("completed");
            
            compsec.appendChild(todoEl);
        }

        todoEl.innerText = todoText;

        todoEl.addEventListener("click", (e) => {
            e.stopPropagation();
            
        if(todoEl.classList.contains("completed")){
         todoEl.classList.remove("completed");
            todosUL.appendChild(todoEl);
        
            delbtn.appendChild(delbtntxt);
    
            todoEl.appendChild(delbtn);
        }else{
            todoEl.classList.add("completed");
            compsec.appendChild(todoEl);

        }
            

            updateLS();
        });
        
       delbtn.addEventListener("click", (e) => {
            e.stopPropagation();
            todoEl.remove(); //-------NOTE: due to event bubbling this was always called when you submit because the list was part of the form. Now that i moved it out, it is no longer called.

            updateLS();
        });

        if(!todoEl.classList.contains("completed")){
            todosUL.appendChild(todoEl);
        
            delbtn.appendChild(delbtntxt);
    
            todoEl.appendChild(delbtn);
        }
        

        if ((todo && todo.completed)) {            
            compsec.appendChild(todoEl);
        }
        // else if (!todoEl.classList.contains("completed")){
        // todosUL.appendChild(todoEl);
        
        // delbtn.appendChild(delbtntxt);

        // todoEl.appendChild(delbtn);
        // }

        input.value = "";

        updateLS();
    }
}

function updateLS() {
    const todosEl = document.querySelectorAll("li");

    const todos = [];

    todosEl.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        });
    });

    
    

    localStorage.setItem("todos", JSON.stringify(todos));
}
