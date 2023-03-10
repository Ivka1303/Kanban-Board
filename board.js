window.onload = function() {
    const newTaskButton = document.querySelectorAll('.add_button');
    const inputTaskForm = document.querySelectorAll('.task_form');
    const columnItems = document.querySelectorAll('.column_items');
    let next_id = 0;
  
    // open the new task input form
    for (let i = 0; i < newTaskButton.length; i++) {
      newTaskButton[i].addEventListener('click', function() {
        let taskForm = inputTaskForm[i];
        taskForm.style.display = "block";
        let input = taskForm.querySelector('input');
        input.focus();
      });
    }
  
    // submit new task
    for (let i = 0; i < inputTaskForm.length; i++) {
      inputTaskForm[i].addEventListener('submit', function(event) {
        event.preventDefault();
        let taskForm = event.target;
        let input = taskForm.querySelector('input');
        let taskName = input.value.trim();
        if (taskName.length > 0) {
          // create a new task object
          let newItem = document.createElement('div');
          newItem.id = "item_" + next_id;
          newItem.class = "task_name";
          // create a delete button for a new task
          let newDelete = document.createElement('button');
          newDelete.textContent = 'x';
          newDelete.style.color = 'gray';
          newDelete.classList.add('delete_item');
          // set data-id attribute to the item's ID to delete correct tasks
          newDelete.setAttribute('data-id', newItem.id); 
          next_id += 1;
          newItem.classList.add('item');
          newItem.draggable = true;
          newItem.innerHTML = taskName;
          newItem.appendChild(newDelete);
          columnItems[i].insertBefore(newItem, columnItems[i].lastElementChild);
          taskForm.style.display = "none";
          input.value = "";
          // add drag listener to the new item
          newItem.addEventListener('dragstart', function(event) {
            event.target.classList.add('dragging');
          });
          // allow deleting tasks after delete button is pressed
          newDelete.addEventListener('click', function() {
            const currentItem = document.querySelector(`[id="${this.getAttribute('data-id')}"]`);
            currentItem.remove();
          });
        }
      });
    }
  
    // allow items to be dropped to a different column
    for (let i = 0; i < columnItems.length; i++) {
      columnItems[i].addEventListener('dragover', function(event) {
        event.preventDefault();
        let currentItem = document.querySelector('.dragging');
        let currentColumn = currentItem.closest('.column_items');
        let targetColumn = event.currentTarget;
        if (currentColumn !== targetColumn) {
          targetColumn.insertBefore(currentItem, targetColumn.lastElementChild);
        }
      });
      // remove dragging status when item is dropped
      columnItems[i].addEventListener('drop', function(event) {
        event.preventDefault();
        let currentItem = document.querySelector('.dragging');
        currentItem.classList.remove('dragging');
      });
    }
  }
  