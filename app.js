//login page
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
})

//redirecting to home page
const login = document.querySelector('.from-box.login form');
const signup = document.querySelector('.form-box.register form');

login.addEventListener('submit', (event)=> {
    event.preventDefault();
    const isValidLogin = true;
    if(isValidLogin){
      window.location.href = 'home.html';
    } else{
      alert('Invalid login credentials. Please try again');
    }
})

signup.addEventListener('submit', (event)=>{
  event.preventDefault();
  const isValidRegistration = true;
  if(isValidRegistration){
    window.location.href = 'home.html';
  } else{
    alert('Registration failed. Please try again.');
  }
})
// task list
const express = require("express");
const db = require("./db/db_connection");
const app = express();

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const create_item = `
    INSERT INTO to_do_item (item_name, item_description, item_completed, item_due, subject_id, subject_private_id)
    VALUES (?, ?, 0, ?, ?)
    `
const update_item = `
    UPDATE to_do_item
    SET item_name = ?,
        item_description = ?,
        item_due = ?,
        item_completed = ?,
        subject_id = ?
        subject_private_id = ?
    WHERE
        item_id = ?
    `
const delete_item = `
    DELETE FROM to_do_item 
    WHERE item_id = ?
`
//might need to change for subjects
const show_item = `
    SELECT item_name, item_description, item_due, item_completed
    FROM to_do_item
    
`;
function addTask(){
    
    // shows alert if user tries to make an empty task
    if(inputBox.value === ''){
        alert("You must write something");
    }
    else{
        // creates an li element that will help us tell when an item is crossed out and adds it to the HTML
        // let li = document.createElement("li");
        // li.innerHTML = inputBox.value;
        // listContainer.appendChild(li);
        db.execute(
          create_item,
          [
            req.body.item_name,
            req.body.item_description,
            req.body.item_completed,
            req.body.item_due,
            req.body.subject_id,
            req.body.subject_private_id,
          ],
          (error, results) => {
            if (error) {
              res.status(500).send(error);
            } else {
              res.redirect("/");
            }
          }
        );
        // creates a span element for whatever was added with an 'x' that will be clicked to cross it out
        //IDK if I should change this part tbh. It might need to be done differently- Olivia
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
    // if(e.target.tagName === "LI"){
    //     e.target.classList.toggle("checked");
    //     // saves the data that the user just added
    //     saveData();
    // }
    //temp
    if(req.body.item_completed == 0){
        db.execute(update_item, [
          req.body.item_name,
          req.body.item_description,
          req.body.item_completed,
          req.body.item_due,
          req.body.subject_id,
          req.body.subject_private_id,
        ]);
    }

    // if the 'x' is clicked then it will remove the task that it's designated to and save the data
    // else if(e.target.tagName === "SPAN"){
    //     e.target.parentElement.remove();
    //     saveData();
    // }
    else if(req.body.item_completed == 1){
        // db.execute(
        //     delete_item,
        //     [
        //         req.body.item_id,
        //     ]
        // )
        db.execute(delete_game, [req.params.id], (error, results) => {
          if (error) {
            res.status(500).send(error);
          } else {
            res.redirect("/tasks");
          }
        });
    }
}, false);

// this function saves the data by adding the current info inside local storage
// function saveData(){
//     localStorage.setItem("data", listContainer.innerHTML);
// };
// shows the stored data 
function showTask(){
    // listContainer.innerHTML=localStorage.getItem("data");
    db.execute(show_item);
}
showTask();