
const SERVER_URL = 'http://127.0.0.1:5002'

let dataFromExternalApi = []

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = `${SERVER_URL}/tasks`;
  return fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.tasks.forEach(item => insertList(item.id, item.name, item.product, item.task_type, item.priority, item.start_date, item.end_date))
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
  Função para atualizar um item na lista do servidor via requisição PUT
  --------------------------------------------------------------------------------------
*/
const updateItem = async (taskId, nameTask, product, type, priority, start_date, end_date) => {

  const item_text = 'Task updated to the database'
  const item_error = 'There was an error while attempting to connect to the backend'

  const formData = new FormData();
  formData.append('id', taskId);
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
    .then((response) => { response.json(); alert(item_text) })
    .catch((error) => {
      console.error('Error:', error);
      alert(item_error)
    });
}
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
  return fetch(url, {
    method: 'post',
    body: formData
  })
    .then(response =>
      response.json().then(body => ({
        ok: response.ok,
        status: response.status,
        body: body
      }))
    )
    .then(({ ok, body, status }) => {
      if (ok) {
        alert(item_text);
        console.log("Server responded with:", body);
        return body;
      } else {
        alert(`Error (${status}): ${body.message || "Unknown error"}`);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert(item_error);  // This should probably be alert(item_error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close e um edit para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  span.className = "close";
  span.style.cursor = 'pointer';
  let icon = document.createElement("i");
  icon.className = "bi bi-x";
  span.appendChild(icon);

  let editSpan = document.createElement("span");
  editSpan.className = "edit";
  editSpan.style.cursor = 'pointer';
  let editIcon = document.createElement("i");
  editIcon.className = "bi bi-pencil";
  editSpan.appendChild(editIcon);

  parent.appendChild(span);
  parent.appendChild(editSpan);

  let isEditing = false;
  let originalValues = [];
  let inputElements = [];

  editSpan.addEventListener('click', function () {
    const row = parent.parentNode;
    const cells = row.children;

    if (!isEditing) {
      // Start editing
      originalValues = [];
      inputElements = [];

      for (let i = 0; i < cells.length - 1; i++) {
        const cell = cells[i];
        const originalValue = cell.textContent;
        originalValues.push(originalValue);

        const input = document.createElement("input");
        input.value = originalValue;

        cell.textContent = '';
        cell.appendChild(input);
        inputElements.push(input); // Keep a direct reference
      }

      editSpan.innerHTML = '<i class="bi bi-save"></i>';
      isEditing = true;
    } else {
      // Save edits
      let updated = false;
      const newValues = [];

      for (let i = 0; i < inputElements.length; i++) {
        const inputValue = inputElements[i].value;
        newValues.push(inputValue);

        if (inputValue !== originalValues[i]) {
          updated = true;
        }
      }

      // Apply the saved values to cells in correct order
      for (let i = 0; i < newValues.length; i++) {
        cells[i].textContent = newValues[i];
      }

      editSpan.innerHTML = '<i class="bi bi-pencil"></i>';
      isEditing = false;
    }
  });
};

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão delete para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertDeleteButton = (parent) => {
  const span = document.createElement("span");
  span.className = "close";
  span.style.cursor = 'pointer';
  const icon = document.createElement("i");
  icon.className = "bi bi-x";
  span.appendChild(icon);
  parent.appendChild(span);

  span.addEventListener('click', function () {
    const row = parent.parentNode;
    row.remove();
  });
};

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão edit e um edit para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertEditButton = (parent) => {
  let isEditing = false;
  let originalValues = [];
  let inputElements = [];

  const editSpan = document.createElement("span");
  editSpan.className = "edit";
  editSpan.style.cursor = 'pointer';
  const editIcon = document.createElement("i");
  editIcon.className = "bi bi-pencil";
  editSpan.appendChild(editIcon);
  parent.appendChild(editSpan);

  editSpan.addEventListener('click', function () {
    const row = parent.parentNode;
    const cells = row.children;

    if (!isEditing) {
      originalValues = [];
      inputElements = [];

      for (let i = 0; i < cells.length - 2; i++) {  // -2 because last two are buttons
        const cell = cells[i];
        originalValues.push(cell.textContent);
        const input = document.createElement("input");
        input.value = cell.textContent;
        cell.textContent = '';
        cell.appendChild(input);
        inputElements.push(input);
      }

      editSpan.innerHTML = '<i class="bi bi-save"></i>';
      isEditing = true;
    } else {
      const newValues = [];

      for (let i = 0; i < inputElements.length; i++) {
        newValues.push(inputElements[i].value);
      }

      for (let i = 0; i < newValues.length; i++) {
        cells[i].textContent = newValues[i];
      }

      editSpan.innerHTML = '<i class="bi bi-pencil"></i>';
      isEditing = false;
    }
  });
};


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
      const taskID = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Do you confirm the removal of the task from the database?")) {
        div.remove()
        deleteItem(taskID)
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
const deleteItem = (itemID) => {
  console.log('Request to delete item ', itemID);
  let url = `${SERVER_URL}/task/id?id=` + itemID;
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
const newItem = async () => {
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
    let result = await postItem(inputTask, inputProduct, inputType, inputPriority, inputStartDate, inputEndDate);
    alert(JSON.stringify(result));
    insertList(result.id, inputTask, inputProduct, inputType, inputPriority, inputStartDate, inputEndDate);
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (taskID, nameTask, product, type, priority, start_date, end_date) => {
  var item = [taskID, nameTask, product, type, priority, start_date, end_date]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  // Add separate cell for delete button
  const deleteCell = row.insertCell(-1);
  insertDeleteButton(deleteCell);

  // Add separate cell for edit button
  const editCell = row.insertCell(-1);
  insertEditButton(editCell);

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

/*
  --------------------------------------------------------------------------------------
  Função para conectar na API externa e obter os dados
  --------------------------------------------------------------------------------------
*/
const getAllDataFromNotion = (async) => {
  console.log("getAllDataFromNotion");
  fetch(`${SERVER_URL}/notion-data`)
    .then(response => response.json())
    .then(data => {
      dataFromExternalApi = data;
      console.log("Resposta Completa da API do Notion: ", data);
      // Exibindo as propriedades de cada item retornado
      data.forEach(item => {
        console.log("Item:", item);

        // Mostrando todos os campos que o item possui
        document.getElementById("newInput").value = item.Nome; // inputTask
        document.getElementById("newProduct").value = item.Produto //inputProduct
        document.getElementById("newType").value = item.Tipo; //inputType
        document.getElementById("newPriority").value = item.Prioridade; //inputPriority
        document.getElementById("newStartDate").value = item["Data inicio"] + "T08:00"; //inputStartDate
        document.getElementById("newEndDate").value = item["Data Fim"] + "T10:00"; //inputEndDate
        return
      });
    })
    .catch(error => console.error('Erro ao acessar a API externa', error));
}

const getItemFromNotion = (async) => {
  console.log("getItemFromNotion: Tamanho da lista atual disponivel ", dataFromExternalApi.length);
  if (dataFromExternalApi.length > 0) {
    // Exibindo as propriedades de cada item retornado
    item = dataFromExternalApi.pop(0);
    console.log("Item:", item);
    // Mostrando todos os campos que o item possui
    document.getElementById("newInput").value = item.Nome; // inputTask
    document.getElementById("newProduct").value = item.Produto //inputProduct
    document.getElementById("newType").value = item.Tipo; //inputType
    document.getElementById("newPriority").value = item.Prioridade; //inputPriority
    document.getElementById("newStartDate").value = item["Data inicio"] + "T08:00"; //inputStartDate
    document.getElementById("newEndDate").value = item["Data Fim"] + "T10:00"; //inputEndDate
  } else {
    getAllDataFromNotion();
  }
}

getAllDataFromNotion()