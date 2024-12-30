document.addEventListener("DOMContentLoaded", () => {

    const tasksapp = {

        apiBaseUrl: "http://127.0.0.1:5000",
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

        // fetch tasks
        async fetchTasks(startDate, endDate) {
            try {
                const response = await fetch(`${this.apiBaseUrl}/api/tasks?start=${startDate}&end=${endDate}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch tasks :(");
                }
                const data = await response.json();
                console.log(data);

                // update state with tasks
                this.tasks = data.reduce((acc, task) => {
                    acc[task.due_date] = acc[task.due_date] || [];
                    acc[task.due_date].push(task);
                    return acc;
                }, {});
            }
            catch (error) {
                console.error("Error fetching tasks :(( : ", error);
            }
        },

        // rendering the selected week
        async renderWeek() {

            const today = new Date();
            const startOfWeek = this.getStartOfWeek(today, this.currentWeekOffset);
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            this.weeklyDisplay.innerHTML = "";

            // fetch tasks for the week
            const startDate = this.getDateString(startOfWeek);
            const endDate = this.getDateString(endOfWeek);
            await this.fetchTasks(startDate, endDate);

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

                    taskItem.textContent = `${task.category}, ${task.descr}`;
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
        async addTask() {
            if (!this.addDescription.value.trim() || !this.addCategory.value.trim()) {
                return;
            }

            try {
                const response = await fetch(`${this.apiBaseUrl}/api/tasks`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        due_date: this.newTaskDate,
                        descr: this.addDescription.value.trim(),
                        category: this.addCategory.value.trim(),
                    })
                });

                if (!response.ok) {
                    throw new Error("Failed to add task :(");
                }
                this.hideAddOverlay();
                this.renderWeek();
            } catch (error) {
                console.error("Error adding task: ", error);
            }
        },

        hideAddOverlay() {
            this.addOverlay.style.display = "none";
            this.newTask = null;
            this.newTaskDate = null;
        },

        // removes a task
        async removeTask(date, taskId) {
            try {
                const response = await fetch(`${this.apiBaseUrl}/api/tasks/${taskId}`, {
                    method: "DELETE"
                });
                this.renderWeek();
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        },

        // shows the modifying overlay
        showModifyOverlay(date, taskId) {
            this.modifyingDate = date;
            this.modifyingTask = this.tasks[date].find((task) => task.id === taskId);
            this.modifyDescription.value = this.modifyingTask.descr;
            this.modifyCategory.value = this.modifyingTask.category;
            this.modifyOverlay.style.display = "flex";

        },

        hideModifyOverlay() {
            this.modifyOverlay.style.display = "none";
            this.modifyingTask = null;
            this.modifyingDate = null;
        },

        async modifyTask() {

            if (!this.modifyDescription.value.trim() || !this.modifyCategory.value.trim()) {
                return;
            }

            try {
                const response = await fetch(`${this.apiBaseUrl}/api/tasks/${this.modifyingTask.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        due_date: this.modifyingTask.due_date,
                        descr: this.modifyDescription.value.trim(),
                        category: this.modifyCategory.value.trim(),
                    })
                });

                if (!response.ok) {
                    throw new Error("Failed to modify task :(");
                }
                this.hideModifyOverlay();
                this.renderWeek();
            } catch (error) {
                console.error("Error modifying task: ", error);
            }


        },

        // gets a date in the dateString format (yyyy-mm-dd)
        getDateString(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
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