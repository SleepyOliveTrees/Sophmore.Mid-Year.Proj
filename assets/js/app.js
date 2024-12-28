//login page
const { JSDOM } = require('jsdom');

// Create a simulated DOM
const dom = new JSDOM(`
  <!DOCTYPE html>
  <html>
  <body>
    <div class="wrapper">
      <a class="login-link"></a>
      <a class="register-link"></a>
      <button class="btnLogin-popup"></button>
      <span class="icon-close"></span>
      <div class="form-box login">
        <form></form>
      </div>
      <div class="form-box register">
        <form></form>
      </div>
    </div>
  </body>
  </html>
`);


// Access the document object from the simulated DOM
const document = dom.window.document;

// Select the element
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".wrapper");
  const loginLink = document.querySelector(".login-link");
  const registerLink = document.querySelector(".register-link");
  const btnPopup = document.querySelector(".btnLogin-popup");
  const iconClose = document.querySelector(".icon-close");

  registerLink.addEventListener("click", () => {
    wrapper.classList.add("active");
  });

  loginLink.addEventListener("click", () => {
    wrapper.classList.remove("active");
  });

  btnPopup.addEventListener("click", () => {
    wrapper.classList.add("active-popup");
  });

  iconClose.addEventListener("click", () => {
    wrapper.classList.remove("active-popup");
  });
});
//redirecting to home page
document.addEventListener('DOMContentLoaded', () => {
    const login = document.querySelector('.form-box.login form');
    const signup = document.querySelector('.form-box.register form');

    if (login) {
        login.addEventListener('submit', (event) => {
            event.preventDefault();
            const isValidLogin = true; // Replace with actual validation logic
            if (isValidLogin) {
                window.location.href = 'home.html';
            } else {
                alert('Invalid login credentials. Please try again.');
            }
        });
    } else {
        console.error('Login form not found.');
    }

    if (signup) {
        signup.addEventListener('submit', (event) => {
            event.preventDefault();
            const isValidRegistration = true; // Replace with actual validation logic
            if (isValidRegistration) {
                window.location.href = 'home.html';
            } else {
                alert('Registration failed. Please try again.');
            }
        });
    } else {
        console.error('Signup form not found.');
    }
});
// task list
const express = require("express");
const db = require("../../db/db_connection");
const app = express();

app.use(express.static(__dirname + "/public"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
// function addTask(){
    
//     // shows alert if user tries to make an empty task
//     if(inputBox.value === ''){
//         alert("You must write something");
//     }
//     else{
//         // creates an li element that will help us tell when an item is crossed out and adds it to the HTML
//         // let li = document.createElement("li");
//         // li.innerHTML = inputBox.value;
//         // listContainer.appendChild(li);
//         db.execute(
//           create_item,
//           [
//             req.body.item_name,
//             req.body.item_description,
//             req.body.item_completed,
//             req.body.item_due,
//             req.body.subject_id,
//             req.body.subject_private_id,
//           ],
//           (error, results) => {
//             if (error) {
//               res.status(500).send(error);
//             } else {
//               res.redirect("/");
//             }
//           }
//         );
//         // creates a span element for whatever was added with an 'x' that will be clicked to cross it out
//         //IDK if I should change this part tbh. It might need to be done differently- Olivia
//         let span = document.createElement("span")
//         span.innerHTML="\u00d7";
//         li.appendChild(span);
//     }
//     // resets the input box's value so that it's empty and ready for the next time to user wants to type something
//     inputBox.value = "";
//     // saves data
//     saveData();
// }

// // // detects what part of the list item is clicked
// // listContainer.addEventListener("click", function(e){
// //     // toggles whether or not a task is crossed out
// //     // if(e.target.tagName === "LI"){
// //     //     e.target.classList.toggle("checked");
// //     //     // saves the data that the user just added
// //     //     saveData();
// //     // }
// //     //temp
// //     if(req.body.item_completed == 0){
// //         db.execute(update_item, [
// //           req.body.item_name,
// //           req.body.item_description,
// //           req.body.item_completed,
// //           req.body.item_due,
// //           req.body.subject_id,
// //           req.body.subject_private_id,
// //         ]);
// //     }

// //     // if the 'x' is clicked then it will remove the task that it's designated to and save the data
// //     // else if(e.target.tagName === "SPAN"){
// //     //     e.target.parentElement.remove();
// //     //     saveData();
// //     // }
// //     else if(req.body.item_completed == 1){
// //         // db.execute(
// //         //     delete_item,
// //         //     [
// //         //         req.body.item_id,
// //         //     ]
// //         // )
// //         db.execute(delete_game, [req.params.id], (error, results) => {
// //           if (error) {
// //             res.status(500).send(error);
// //           } else {
// //             res.redirect("/tasks");
// //           }
// //         });
// //     }
// // }, false);

// // // this function saves the data by adding the current info inside local storage
// // // function saveData(){
// // //     localStorage.setItem("data", listContainer.innerHTML);
// // // };
// // // shows the stored data 
// // function showTask(){
// //     // listContainer.innerHTML=localStorage.getItem("data");
// //     db.execute(show_item);
// // }
// // showTask();

// // // task adding section
// // function hideAddOverlay () {
// //   document.getElementById("add-overlay").style.display = "none";
// // }

// // function showAddOverlay () {
// //   document.getElementById("add-overlay").style.display = "block";
// // }
// app.post("/tasks/:id/complete", (req, res) => {
//   const itemId = req.params.id;
//   const { item_completed } = req.body;

//   db.execute(
//     update_item, // Assuming `update_item` is your SQL query
//     [
//       req.body.item_name,
//       req.body.item_description,
//       item_completed,
//       req.body.item_due,
//       req.body.subject_id,
//       req.body.subject_private_id,
//       itemId,
//     ],
//     (error, results) => {
//       if (error) {
//         res.status(500).send("Error updating task completion status.");
//       } else {
//         res.send("Task completion status updated successfully.");
//       }
//     }
//   );
// });

// app.delete("/tasks/:id", (req, res) => {
//   const itemId = req.params.id;

//   db.execute(delete_item, [itemId], (error, results) => {
//     if (error) {
//       res.status(500).send("Error deleting task.");
//     } else {
//       res.send("Task deleted successfully.");
//     }
//   });
// });
