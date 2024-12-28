document.addEventListener("DOMContentLoaded", () => {

    const tasksapp = {


        currentWeekOffset: 0,
        tasks: {},
        modifyingTask: null,
        modifyingDate: null,
        newTask: null,
        newTaskDate: null,

        init() {
            this.weeklyDisplay = document.getElementById("weeklyDisplay");

            // add overlay 
            this.addOverlay = document.getElementById("addOverlay");
            this.addDescription = document.getElementById("addDescription");
            this.addCategory = document.getElementById("addCategory");
            this.addPriority = document.getElementById("addPriority");
            this.addTaskBtn = document.getElementById("addTaskBtn");
            this.addCancelBtn = document.getElementById("addCancelBtn");

            // modify overlay 
            this.modifyOverlay = document.getElementById("modifyOverlay");
            this.modifyDescription = document.getElementById("modifyDescription");
            this.modifyCategory = document.getElementById("modifyCategory");
            this.modifyPriority = document.getElementById("modifyPriority");
            this.modifyTaskBtn = document.getElementById("modifyTaskBtn");
            this.modifyCancelBtn = document.getElementById("modifyCancelBtn");

            // event listeners
            document.getElementById("prevWeek").addEventListener("click", () => this.changeWeek(-1));
            document.getElementById("nextWeek").addEventListener("click", () => this.changeWeek(1));

            this.addTaskBtn.addEventListener("click", () => this.addTask());
            this.addCancelBtn.addEventListener("click", () => this.hideAddOverlay()); // hides overlay when task cancelled

            this.modifyTaskBtn.addEventListener("click", () => this.modifyTask());
            this.modifyCancelBtn.addEventListener("click", () => this.hideModifyOverlay());

            this.renderWeek();

        },

        // rendering the selected week

        renderWeek() {

            const today = new Date();
            const startOfWeek = this.getStartOfWeek(today, this.currentWeekOffset);
            this.weeklyDisplay.innerHTML = "";

            for (let i = 0; i < 7; i++) {
                const date = new Date(startOfWeek);
                date.setDate(startOfWeek.getDate() + i);
                const dateString = this.getDateString(date);

                // creating day column
                const column = document.createElement("div");
                column.className = "task-column";
                if (this.isToday(date)) {
                    column.classList.add("today");
                }

                // add day label and date
                const dateDisplay = document.createElement('span');
                dateDisplay.textContent = dateString;
                dateDisplay.classList.add('date-display');

                const dayDisplay = document.createElement('div');
                dayDisplay.classList.add('day-of-week');
                dayDisplay.innerHTML = '<h2>' + date.toLocaleDateString("en-US", { weekday: "short" }) + '</h2>';

                column.appendChild(dateDisplay);
                column.appendChild(dayDisplay);

                // add new task button
                const newTaskBtn = document.createElement("button");
                newTaskBtn.className = "newTaskBtn";
                newTaskBtn.textContent = "+";
                newTaskBtn.addEventListener("click", () => this.showAddOverlay(dateString));
                column.appendChild(newTaskBtn);


                // task list
                const taskList = document.createElement("ul");
                taskList.id = "list-container";
                const tasksForDate = this.tasks[dateString] || [];
                tasksForDate.forEach((task) => {
                    const taskItem = document.createElement("li");
                    const modifyButton = document.createElement("button");
                    modifyButton.className = "task-buttons";
                    modifyButton.textContent = "✏️";
                    modifyButton.addEventListener("click", () => this.showModifyOverlay(dateString, task.id));
                    const deleteButton = document.createElement("button");
                    deleteButton.className = "task-buttons";
                    deleteButton.textContent = "❌";
                    deleteButton.addEventListener("click", () => this.removeTask(dateString, task.id));
                
                    taskItem.textContent = `${task.category}, ${task.description}`;
                    taskItem.appendChild(modifyButton);
                    taskItem.appendChild(deleteButton);
                    taskList.appendChild(taskItem);
                });
                column.appendChild(taskList);



                this.weeklyDisplay.appendChild(column);
            }

        },

        showAddOverlay(date) {
            this.newTaskDate = date;
            this.addDescription.value = "";
            this.addCategory.value = "";
            this.addOverlay.style.display = "flex";
        },

        // changes the displayed week
        changeWeek(offset) {
            this.currentWeekOffset += offset;
            this.renderWeek();
        },

        // make sure to add priority later
        addTask() {
            if (!this.addDescription.value.trim() || !this.addCategory.value.trim()) {
                return;
            }
            if (!this.tasks[this.newTaskDate]) {
                this.tasks[this.newTaskDate] = [];
            }
            this.tasks[this.newTaskDate].push({ id: Date.now(), date: this.newTaskDate, description: this.addDescription.value.trim(), category: this.addCategory.value.trim() });

            this.hideAddOverlay();
            this.renderWeek();
        },

        hideAddOverlay() {
            this.addOverlay.style.display = "none";
            this.newTask = null;
            this.newTaskDate = null;
        },

        // removes a task
        removeTask(date, taskId) {
            this.tasks[date] = this.tasks[date].filter((task) => task.id !== taskId);
            this.renderWeek();
        },

        // shows the modifying overlay
        showModifyOverlay(date, taskId) {
            this.modifyingDate = date;
            this.modifyingTask = this.tasks[date].find((task) => task.id === taskId);
            this.modifyDescription.value = this.modifyingTask.description;
            this.modifyCategory.value = this.modifyingTask.category;
            this.modifyOverlay.style.display = "flex";

        },

        hideModifyOverlay() {
            this.modifyOverlay.style.display = "none";
            this.modifyingTask = null;
            this.modifyingDate = null;
        },

        modifyTask() {
            this.modifyingTask.description = this.modifyDescription.value;
            this.modifyingTask.category = this.modifyCategory.value;
            this.hideModifyOverlay();
            this.renderWeek();
        },

        // gets a date in the dateString format (mm/dd/yyyy)
        getDateString(date) {
            return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
        },

        // sees if the selected date is today
        isToday(date) {
            return this.getDateString(new Date()) == this.getDateString(date);
        },


        // gets the start of the week for a given date
        getStartOfWeek(date, weekOffset = 0) {
            const startOfWeek = new Date(date);
            const day = startOfWeek.getDay();
            const diff = startOfWeek.getDate() - day + weekOffset * 7;
            startOfWeek.setDate(diff);
            return startOfWeek;
        }

    };

    window.tasksapp = tasksapp;

    tasksapp.init();

});