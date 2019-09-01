function toggleCheck(element) {
    if (element.checked) {
        element.nextSibling.classList.add("done");
        // Moves the selected item to the end of the list.
        let items = document.getElementById("items");
        items.append(element.parentElement);
    } else {
        element.nextSibling.classList.remove("done");
    }
}

function addElement(chore) {
    // Validation so no empty items are added to list.
    if (!chore) {
        return;
    }
    let list = document.getElementById("items");
    let node = document.createElement("li");
    let input = document.createElement("input");
    input.type = "checkbox";
    input.onclick = function () {
        toggleCheck(this);
    };
    let span = document.createElement("span");
    let text = document.createTextNode(chore);
    span.append(text);
    node.append(input);
    node.append(span);
    list.prepend(node);
}

document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("newitem").addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            addElement(this.value);
            this.value = "";
        }
    });
});