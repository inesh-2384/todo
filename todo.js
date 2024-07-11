class List {
  constructor(render) {
    this.render = render;
    this.todo = this.loadFromLocalStorage() || []; // Load tasks from localStorage or initialize empty array
    this.render.renderList(this.todo); 

    // Ensure tasks are saved to localStorage on any change
    this.saveToLocalStorage();
  }

  addcontent(text) {
    this.todo.push(text);
    this.render.renderList(this.todo);
    this.saveToLocalStorage();
  }

  delete(task) {
    this.todo = this.todo.filter((word) => word !== task);
    this.render.renderList(this.todo);
    this.saveToLocalStorage();
  }

  deleteall() {
    this.todo = [];
    this.render.renderList(this.todo);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('todo', JSON.stringify(this.todo));
  }

  loadFromLocalStorage() {
    const todoJson = localStorage.getItem('todo');
    return JSON.parse(todoJson);
  }
}

  



class Render {
  constructor(input) {
    this.input = input;
    const inputList = this.input.querySelector('input');
    const addButton = this.input.querySelector('.button');
    const ul = this.input.querySelector('.tasks');
    const deleteAll = this.input.querySelector('.delAll');

    addButton.addEventListener('click', () => {
      this.handleAddtask(inputList);
    });

    inputList.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.handleAddtask(inputList);
      }
    });

    ul.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        if (event.target.classList.contains('delete-btn')) {
          const text = event.target.previousSibling.textContent.trim();
          list.delete(text);
      }
     }
    });

    ul.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON' && event.target.classList.contains('edit-btn')) {
        const li = event.target.parentNode;//ul || div
        const oldText = li.firstChild.textContent.trim(); // Get the text content of the li element
        const newText = prompt("Edit task:", oldText);
    
        if (newText !== null && newText.trim() !== "" && newText !== oldText) {
          const index = list.todo.indexOf(oldText); 
          list.todo[index] = newText.trim(); 
          render.renderList(list.todo);
        }
      }
    });
    

    deleteAll.addEventListener('click', () => {
      list.deleteall();
    });
  }

  handleAddtask(inputList) {
    const tasks = inputList.value.trim();
    if (tasks !== "") {
      list.addcontent(tasks);
      inputList.value = "";
    }
  }

  renderList(inputs) {
    const ul = this.input.querySelector(".tasks");
    ul.innerHTML = "";

     // Load checkbox state from localStorage
     const savedCheckboxState = JSON.parse(localStorage.getItem('checkboxState')) || {};

    inputs.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = task;
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add('delete-btn');

      var editButton = document.createElement("button");
      editButton.textContent ="Edit";
      editButton.classList.add('edit-btn');

      editButton.addEventListener('click', () => {
        if (editButton.textContent === "Edit") {
            editButton.textContent = "Re-Edit";
        } else {
            editButton.textContent = "Edit";
        }
    });
    

      var checkbox = document.createElement('input');
      checkbox.classList.add('task-checkbox');
      checkbox.type = 'checkbox'; 
     checkbox.name = 'myCheckbox';  // Set name attribute
     checkbox.value = 'myValue';


     // Check if checkbox state is saved in localStorage
     if (savedCheckboxState[task]) {
      checkbox.checked = true;
      li.classList.add('green-background');
  }

     checkbox.addEventListener('change', function() {
      if (this.checked) {
          li.style.backgroundColor = 'green'; 
          li.style.color = 'white';
          savedCheckboxState[task] = true;
      } else {
          li.style.backgroundColor = ''; 
          li.style.color = '';
          delete savedCheckboxState[task];
      }
      localStorage.setItem('checkboxState', JSON.stringify(savedCheckboxState));
  });

      li.appendChild(deleteButton);
      li.appendChild(editButton);
      li.appendChild(checkbox);
      ul.appendChild(li);
    });
  }
}

const render = new Render(document.querySelector('#container'));
const list = new List(render);








//to crate a search a search bar and a button and putting it to a container


//const searchBar = document.createElement('input');
//      searchBar.type= 'text';
  //    searchBar.placeholder = 'enter';
//
  //   const searchButton = document.createElement('button');
    // searchButton.textContent = 'ADD';

     //const container = document.createElement('div');
     //container.appendChild(searchBar);
     //container.appendChild(searchButton);




     // Insert an element at a specific index in an array
//const array = [1, 2, 3, 4];
//const index = 2; // The index at which to insert the new element
//const newElement = 99;

//array.splice(index, 0, newElement); // Inserts the newElement at index 2
//console.log(array); // Output: [1, 2, 99, 3, 4]




//setItem('todo', JSON.stringify(this.todo)):

//setItem('key', 'value') is a method of the localStorage object. It sets a key-value pair in the localStorage, where:
//'key' is the name of the key under which the data will be stored.
//'value' is the data that you want to store.
