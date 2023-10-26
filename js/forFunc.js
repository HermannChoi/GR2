const createBtn = document.querySelector('.createBtn');
const list_section = document.querySelector('.list_section');

let todos = [];

createBtn.addEventListener('click', createNewTodo);

function createNewTodo() {
    //새로운 아이템 객체 생성
    const item = {
        id: new Date().getTime(),
        text: '',
        complete: false
    }
    //배열 처음에 새로운 아이템 추가
    todos.unshift(item);

    //요소 생성
    const {itemEl, inputEl, editBtnEl, removeBtnEl} = createTodoElement(item);

    //리스트 요소 안에서 위로 방금 생성한 아이템 요소 추가
    list_section.prepend(itemEl);

    inputEl.removeAttribute('disabled');

    inputEl.focus();
    saveToLocalStorages();
}

function createTodoElement(item) {
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');

    const checkboxEl = document.createElement('input');
    checkboxEl.classList.add('checkbox');
    checkboxEl.type = 'checkbox';
    checkboxEl.checked = item.complete;

    if(item.complete) {
        itemEl.classList.add('complete');
    }

    const inputEl = document.createElement('input');
    inputEl.classList.add('writeTodo');
    inputEl.onkeyup = () => {'blur'}
    type = 'text';
    inputEl.value = item.text;
    inputEl.setAttribute('disabled', '');

    const actionsEl = document.createElement('div');
    actionsEl.classList.add('actions');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerText = 'edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons');
    removeBtnEl.innerText ='remove_circle';

    checkboxEl.addEventListener('change', () => {
        item.complete = checkboxEl.checked;

        if(item.complete) {
            itemEl.classList.add('complete');
        } else {
            itemEl.classList.remove('complete');
        }
        saveToLocalStorages();
    });

    inputEl.addEventListener('blur', () => {
        inputEl.setAttribute('disabled', '');
        saveToLocalStorages();
    });

    inputEl.addEventListener('input', () => {
        item.text = inputEl.value;
    });

    inputEl.addEventListener("keydown", () => {
        if(event.key === 'Enter') {
            inputEl.blur();
            // saveToLocalStorages();
        }
    })

    editBtnEl.addEventListener('click', () => {
        inputEl.removeAttribute('disabled');
        inputEl.focus();
    });

    removeBtnEl.addEventListener('click', () => {
        todos = todos.filter(t => t.id!== item.id);
        itemEl.remove();
        saveToLocalStorages();
    });

    actionsEl.append(editBtnEl);
    actionsEl.append(removeBtnEl);

    itemEl.append(checkboxEl);
    itemEl.append(inputEl);
    itemEl.append(actionsEl);

    return {itemEl, inputEl, editBtnEl, removeBtnEl};
}

function saveToLocalStorages() {
    const data = JSON.stringify(todos);

    localStorage.setItem('todos', data);
}

function loadFromLocalStorages() {
    const data = localStorage.getItem('todos');

    if(data) {
        todos = JSON.parse(data);
    }
}

function displayTodos() {
    loadFromLocalStorages();

    for (let i = 0; i < todos.length; i++) {
        const item = todos[i];
        const { itemEl } = createTodoElement(item);

        list_section.append(itemEl);
    }
}

displayTodos();