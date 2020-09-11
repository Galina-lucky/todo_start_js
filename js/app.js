;(function(){
  "use strict";

  let listTasks = document.getElementById('incomplete-tasks');
  let listCompletedTasks = document.getElementById('completed-tasks');
  let btnAdd = document.querySelector('.add');
  let btnEdit = document.querySelectorAll('.edit');
  
  btnAdd.addEventListener('click', addTask);
  /*!!!НА КАКОЕ СОБЫТИЕ ПРАВИЛЬНЕЕ СТАВИТЬ ФУНКЦИЮ removePrompt?*/
  btnAdd.addEventListener('mouseout', removePrompt);
  /*document.getElementById('new-task').addEventListener('focus',removePrompt);*/

  btnEdit.forEach(function(item) {
    item.onclick = editTask;
  })

  document.querySelectorAll('ul li input[type="text').forEach(function(item) {
    item.onblur = removeEditTask;
  })
  
  listTasks.addEventListener('click', moveTask);
/*  listTasks.addEventListener('click', deleteTask);*/
  listTasks.addEventListener('click', function() {
    deleteTask(listTasks);
  });

  listCompletedTasks.addEventListener('click', moveTask);
  listCompletedTasks.addEventListener('click', function() {
    deleteTask(listCompletedTasks);
  });

/*Добавить задачу в список задач кнопка [Add]*/  
  function addTask() {
    let taskValue = document.getElementById('new-task').value.trim();
    if (taskValue === '') {
      document.getElementById('new-task').style.borderColor = '#FF0505';
      document.querySelector('.prompt').style.visibility = 'visible';
    } else {
      let itemTask = document.querySelector('.task').cloneNode(true);
      itemTask.querySelector('label').innerText = taskValue;
      listTasks.appendChild(itemTask);
      document.getElementById('new-task').value = '';
    }
  }

/*Удалить подсказку о пустом поле при нажатии на кнопку [Add]*/
  function removePrompt() {
    document.getElementById('new-task').style.borderColor = '#ddd';
    document.querySelector('.prompt').style.visibility = 'hidden';
  }

/*Редактировать задачу, кнопка [Edit]*/
  function editTask() {
    let itemTask = this.closest('.task');
    itemTask.classList.add('editMode');
    itemTask.querySelector('input[type="text"]').setAttribute('value',itemTask.querySelector('label').innerText);
    itemTask.querySelector('input[type="text"]').focus();
  }

/*Убрать редактирование с задачи*/
  function removeEditTask() {
    let itemTask = this.closest('.task');
    itemTask.classList.remove('editMode');
    itemTask.querySelector('label').innerText = this.value;
  }


/*При нажатии на Checkbox переместить задачу*/
  function moveTask (event) {
    if (event.target.matches('#incomplete-tasks li .checkbox')) {
      document.getElementById('completed-tasks').appendChild(event.target.parentElement);
    } else {
      document.getElementById('incomplete-tasks').appendChild(event.target.parentElement);
    }
  }

/*Удалить задачу, кнопка [Delete]*/
  function deleteTask (list) {
    if (event.target.matches('.delete')) {
      list.removeChild(event.target.parentElement);
    }
  }
})();

