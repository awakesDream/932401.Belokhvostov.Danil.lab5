document.addEventListener("DOMContentLoaded", function () {
    var themeKey = "theme";
    var skillsKey = "skills";
    var hiddenKey = "hidden";

    var body = document.body;
    var themeBtn = document.getElementById("theme-toggle");
    var addBtn = document.getElementById("add-skill");
    var clearBtn = document.getElementById("clear-skills");
    var hideBtn = document.getElementById("toggle-skills");
    var list = document.getElementById("skills-list");
    var block = document.getElementById("skills-list-section");

    if (!list) {
        console.log("Элемент не найден: #skills-list");
        return;
    }

    function saveSkills() {
        var items = list.querySelectorAll("li");
        var data = [];
        for (var i = 0; i < items.length; i++) {
            data.push(items[i].querySelector("span").textContent.trim());
        }
        localStorage.setItem(skillsKey, JSON.stringify(data));
    }

    function makeItem(text) {
        var li = document.createElement("li");
        var span = document.createElement("span");
        span.textContent = text + " ";
        li.appendChild(span);

        var btn = document.createElement("button");
        btn.className = "remove-skill";
        btn.type = "button";
        btn.textContent = "Удалить";

        li.appendChild(btn);
        return li;
    }

    function showSkills(arr) {
        list.innerHTML = "";
        for (var i = 0; i < arr.length; i++) {
            list.appendChild(makeItem(arr[i]));
        }
    }

    function loadSkills() {
        var data = localStorage.getItem(skillsKey);
        if (!data) return;
        showSkills(JSON.parse(data));
    }

    function setTheme(dark) {
        if (dark) {
            body.classList.add("dark-theme");
            themeBtn.textContent = "Светлая тема";
        } else {
            body.classList.remove("dark-theme");
            themeBtn.textContent = "Тёмная тема";
        }
    }

    function loadTheme() {
        setTheme(localStorage.getItem(themeKey) === "dark");
    }

    function loadHidden() {
        if (localStorage.getItem(hiddenKey) === "1") {
            list.classList.add("invisible");
            hideBtn.textContent = "Показать список навыков";
        }
    }

    var buttons = [
        [themeBtn, "theme-toggle"],
        [addBtn, "add-skill"],
        [clearBtn, "clear-skills"],
        [hideBtn, "toggle-skills"],
        [block, "skills-list-section"]
    ];

    for (var i = 0; i < buttons.length; i++) {
        if (!buttons[i][0]) {
            console.log("Элемент не найден: #" + buttons[i][1]);
            return false;
        }
    }

    themeBtn.onclick = function () {
        var dark = body.classList.toggle("dark-theme");
        themeBtn.textContent = dark ? "Светлая тема" : "Тёмная тема";
        localStorage.setItem(themeKey, dark ? "dark" : "light");
    };

    addBtn.onclick = function () {
        var name = prompt("Введите название навыка:");
        if (!name || name.trim() === "") return;
        list.appendChild(makeItem(name.trim()));
        saveSkills();
    };

    clearBtn.onclick = function () {
        var items = list.querySelectorAll("li");
        if (items.length === 0) {
            alert("Навыки уже удалены");
            return;
        }
        for (var i = 0; i < items.length; i++) {
            items[i].remove();
        }
        saveSkills();
    };

    hideBtn.onclick = function () {
        list.classList.toggle("invisible");
        var hidden = list.classList.contains("invisible");
        hideBtn.textContent = hidden ? "Показать список навыков" : "Скрыть список навыков";
        localStorage.setItem(hiddenKey, hidden ? "1" : "0");
    };

    block.onclick = function (event) {
        if (event.target.className === "remove-skill") {
            event.target.closest("li").remove();
            saveSkills();
        }
    };

    loadTheme();
    loadSkills();
    loadHidden();

    console.log("Страница загружена");
});