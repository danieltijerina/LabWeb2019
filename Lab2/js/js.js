function toggleCheck(element) {
    if (element.checked) {
        element.nextSibling.classList.add("done");
    } else {
        element.nextSibling.classList.remove("done");
    }
}

function addElement(chore) {
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
    list.append(node);
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