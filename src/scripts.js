
const SERVER_URL = 'http://127.0.0.1:5002'

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = `${SERVER_URL}/tasks`;
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.tasks.forEach(item => insertList(item.name, item.product, item.task_type, item.priority, item.start_date, item.end_date))
    })
    .catch((error) => {
      console.error('getList (Error)', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/

const postItem = async (nameTask, product, type, priority, start_date, end_date) => {

  const item_text = 'Task added to the database'
  const item_error = 'There was an error while attempting to connect to the backend'

  const formData = new FormData();
  formData.append('name', nameTask);
  formData.append('product', product);
  formData.append('task_type', type);
  formData.append('priority', priority);
  formData.append('start_date', start_date);
  formData.append('end_date', end_date);

  let url = `${SERVER_URL}/task`;
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => {response.json() ; alert(item_text)})
    .catch((error) => {
      console.error('Error:', error);
      alert(item_error)
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  span.className = "close";
  span.style.cursor ='pointer';
  let icon = document.createElement("i");
  icon.className = "bi bi-x";
  span.appendChild(icon);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const taskName = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Do you confirm the removal of the task from the database?")) {
        div.remove()
        deleteItem(taskName)
        alert("Task removed from database!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = `${SERVER_URL}/task?name=` + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputTask = document.getElementById("newInput").value;
  let inputProduct = document.getElementById("newProduct").value;
  let inputType = document.getElementById("newType").value;
  let inputPriority = document.getElementById("newPriority").value;
  let inputStartDate = document.getElementById("newStartDate").value;
  let inputEndDate = document.getElementById("newEndDate").value;

  if (inputTask === '') {
    alert("The task name must not be empty!");
  } else if (inputProduct === '') {
    alert("The product name must not be empty!");
  } else if (isNaN(inputPriority)) {
    alert("The field Priority and the field Type must be a number!");
  } else {
    insertList(inputTask, inputProduct, inputType, inputPriority, inputStartDate, inputEndDate)
    postItem(inputTask, inputProduct, inputType, inputPriority, inputStartDate, inputEndDate)
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (nameTask, product, type, priority, start_date, end_date) => {
  var item = [nameTask, product, type, priority, start_date, end_date]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newInput").value = "";
  document.getElementById("newProduct").value = "";
  document.getElementById("newType").value = "";
  document.getElementById("newPriority").value = "";
  document.getElementById("newStartDate").value = "";
  document.getElementById("newEndDate").value = "";

  removeElement()
}

document.addEventListener('DOMContentLoaded', function () {
  var tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
      new bootstrap.Tooltip(tooltipTriggerEl);
  });
});