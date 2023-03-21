document.addEventListener("DOMContentLoaded", () => {
    loadLists();
});

function createNewList() {
    const newListName = document.getElementById("newListName").value;
    if (newListName) {
        const listSelect = document.getElementById("listSelect");
        const option = document.createElement("option");
        option.value = newListName;
        option.text = newListName;
        listSelect.add(option);
        listSelect.value = newListName;
        saveLists();
        loadList(newListName);
    }
}

function switchList() {
    const listSelect = document.getElementById("listSelect");
    const selectedList = listSelect.value;
    loadList(selectedList);
}

function addItem() {
    const itemInput = document.getElementById("itemInput");
    const itemList = document.getElementById("itemList");

    const li = document.createElement("li");
    li.onclick = toggleCheckbox;
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    li.appendChild(checkbox);

    const itemText = document.createTextNode(itemInput.value);
    li.appendChild(itemText);

    itemList.appendChild(li);
    itemInput.value = "";

    saveCurrentList();
}

function toggleCheckbox(event) {
    const target = event.target;
    if (target.tagName !== 'INPUT') {
        const checkbox = target.querySelector("input[type='checkbox']");
        checkbox.checked = !checkbox.checked;
    }
}

function resetList() {
    const checkboxes = document.querySelectorAll("#itemList input[type='checkbox']");
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

function saveCurrentList() {
    const listSelect = document.getElementById("listSelect");
    const selectedList = listSelect.value;
    const itemList = document.getElementById("itemList");
    localStorage.setItem(`list-${selectedList}`, itemList.innerHTML);
}

function loadList(listName) {
    const savedList = localStorage.getItem(`list-${listName}`);
    const itemList = document.getElementById("itemList");
    if (savedList) {
        itemList.innerHTML = savedList;
        const listItems = itemList.querySelectorAll("li");
        listItems.forEach(listItem => {
            listItem.onclick = toggleCheckbox;
        });
    } else {
        itemList.innerHTML = "";
    }
}

function saveLists() {
    const listSelect = document.getElementById("listSelect");
    localStorage.setItem("listSelect", listSelect.innerHTML);
}

function loadLists() {
    const savedListSelect = localStorage.getItem("listSelect");
    if (savedListSelect) {
        const listSelect = document.getElementById("listSelect");
        listSelect.innerHTML = savedListSelect;
    }
}


