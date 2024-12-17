// task list
const express = require("express");
const app = express();

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
function addTask(){
    // shows alert if user tries to make an empty task
    if(inputBox.value === ''){
        alert("You must write something");
    }
    else{
        // creates an li element that will help us tell when an item is crossed out and adds it to the HTML
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        // creates a span element for whatever was added with an 'x' that will be clicked to cross it out
        let span = document.createElement("span")
        span.innerHTML="\u00d7";
        li.appendChild(span);
    }
    // resets the input box's value so that it's empty and ready for the next time to user wants to type something
    inputBox.value = "";
    // saves data
    saveData();
}

// detects what part of the list item is clicked
listContainer.addEventListener("click", function(e){
    // toggles whether or not a task is crossed out
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        // saves the data that the user just added
        saveData();
    }
    // if the 'x' is clicked then it will remove the task that it's designated to and save the data
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// this function saves the data by adding the current info inside local storage
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
};
// shows the stored data 
function showTask(){
    listContainer.innerHTML=localStorage.getItem("data");
}
showTask();