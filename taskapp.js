function getCalenderData(startDate, endDate) {
  // make database query that will return all todo items from the week that is passed into the function for a certain user

  let daysData = [];
  for(let i = 0; i<7; i++) {
    let tasks = [];
 
    for (let j = 0; j<5; j++) {
      let id = i*10+j;
      let task = {
        "id":id,
        "subject":"subject "+id,
        "desc":id+" description ",
        "done":0
      };
      tasks.push(task);
    }
    daysData.push(tasks);
  }
  // for (let i = 1; i<999999999; i++){
  //   i%859;
  // }

  return daysData;
  
}

function createCalendar(weekStart) {
  const calendar = document.createElement('div');
  calendar.classList.add('weekly-display');
  calendar.id = 'weekly-calendar';
    
    // Get the current date and set it to the beginning of the week
    const currentDate = weekStart || new Date();
    currentDate.setDate(currentDate.getDate() - currentDate.getDay());
    const endDate = currentDate.getDate() + 6;
    const daysData = getCalenderData(currentDate, endDate);
    console.log(daysData);

    const todayDate = new Date();
  
    // Create the header with day names
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    var i = 0;
    days.forEach(day => {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      const dateString = date.getMonth()+1 + "/" + date.getDate()+ "/" + date.getFullYear();
      
      let dayData = daysData[i];
      let header = document.createElement('div');
      header.classList.add('todo-app');
      header.id = dateString+'-todo-app';
      let overlay = createTaskOverlay(dateString,day,dateString,header.id);
      header.appendChild(overlay);

      const dayCell = document.createElement('div');
      dayCell.classList.add('day-of-week');
      dayCell.innerHTML = '<h2>'+day+'</h2>';
      const dates = document.createElement('div');


      if (todayDate.toDateString() === date.toDateString()) {
       header.classList.add('todayDate');
      }

      const dateSpan = document.createElement('span');
      dateSpan.textContent = dateString;
      dateSpan.classList.add('date-display');



      const taskContainer = document.createElement('ul');
      taskContainer.id='list-container';
      dayData.forEach(task => {
        const todoItem = document.createElement('li');
        todoItem.textContent = task.desc;
        taskContainer.appendChild(todoItem);
      });

      header.appendChild(dateSpan);
      header.appendChild(dayCell);
      header.appendChild(taskContainer);
      calendar.appendChild(header);
      i++;
    });
    document.addEventListener('click', handleClickEvent);
    return calendar;
  }

  function handleClickEvent(event) {
    console.log("handleClickEvent clicked");
    console.log("handleClickEvent clicked with id =", event.target.id);
    if (event.target.id.includes("todo-app") ) {
      showAddTask(event.target);
    }
  }

  function showAddTask(todoApp) {
    console.log("yay! it's todo-app", todoApp.id);
    const children = todoApp.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      console.log(child);
    }
    const dateSpanChild = todoApp.querySelector('.date-display');
    console.log("date display = ", dateSpanChild);
    console.log("date  = ", dateSpanChild.textContent);
    const dateString = todoApp.querySelector('.date-display').textContent;
    const dayString = todoApp.querySelector('.day-of-week').textContent;
    console.log("date  =", dateString);
    console.log("day  =", dayString);
  }

  function deleteCalendar() {
    const delItem = document.getElementById('weekly-calendar')
    delItem.remove();
    
    console.log('deleted-calender');
  }

  function createPrevCalendar() {
    showLoader();
    weekStartDate.setDate(weekStartDate.getDate()-7)
    deleteCalendar();
    document.getElementById('tasks-bg').appendChild(createCalendar(weekStartDate));
    hideLoader();
  }

  function createNextCalendar() {
    showLoader();
    weekStartDate.setDate(weekStartDate.getDate()+7)
    deleteCalendar();
    document.getElementById('tasks-bg').appendChild(createCalendar(weekStartDate));
    hideLoader();

  }

  function hideLoader(){
    console.log('goodbye!!!!!!!!!!!!!!!!!!!!!!')
    let screen = document.getElementById('loader-screen');
    let spinner = document.getElementById('spinner');
    screen.classList.add('noDisplay');
    spinner.classList.add('noDisplay');
    // screen.classList.remove('showDisplay');
    // spinner.classList.remove('showDisplay');
    console.log('goodbye!!!!!!!!!!!!!!!!!!!!!!############@222222222@')
  }

  function showLoader() {
    console.log('i was called........')
    let screen = document.getElementById('loader-screen');
    let spinner = document.getElementById('spinner');
    // screen.classList.add('showDisplay');
    // spinner.classList.add('showDisplay');
    screen.classList.remove('noDisplay');
    spinner.classList.remove('noDisplay');
  }

  function createTaskOverlay(id, dayString, dateString, parentId) {
    // Create the overlay container
    const overlay = document.createElement('div');
    overlay.id = id;
    overlay.classList.add('add-task-overlay');
  
    // Create the modify task display container
    const modifyTaskDisplay = document.createElement('div');
    modifyTaskDisplay.classList.add('modify-task-display');


    // Create and append the main header
    const mainHeader = document.createElement('h1');
    mainHeader.textContent = 'Add Task';
    modifyTaskDisplay.appendChild(mainHeader);

    // Display day and date
    const dayDateString = document.createElement('h2');
    dayDateString.textContent = dayString+', '+dateString;
    modifyTaskDisplay.appendChild(dayDateString);
  
    // Description section
    const descriptionHeader = document.createElement('h2');
    descriptionHeader.textContent = 'Description: ';
    modifyTaskDisplay.appendChild(descriptionHeader);
  
    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.id = 'description';
    descriptionInput.placeholder = 'Type your task here';
    modifyTaskDisplay.appendChild(descriptionInput);
  
    // Category section
    const categoryHeader = document.createElement('h2');
    categoryHeader.textContent = 'Category: ';
    modifyTaskDisplay.appendChild(categoryHeader);
  
    const categoryInput = document.createElement('input');
    categoryInput.type = 'text';
    categoryInput.id = 'category';
    categoryInput.placeholder = 'Type the category here';
    modifyTaskDisplay.appendChild(categoryInput);
  
    // Priority section
    const priorityHeader = document.createElement('h2');
    priorityHeader.textContent = 'Priority: ';
    modifyTaskDisplay.appendChild(priorityHeader);
  
    const prioritySelect = document.createElement('select');
    prioritySelect.name = 'priority';
    prioritySelect.id = 'priority';
  
    const defaultOption = document.createElement('option');
    defaultOption.value = '3';
    defaultOption.textContent = 'Default';
    prioritySelect.appendChild(defaultOption);
  
    const mediumOption = document.createElement('option');
    mediumOption.value = '2';
    mediumOption.textContent = 'Medium';
    prioritySelect.appendChild(mediumOption);
  
    const highOption = document.createElement('option');
    highOption.value = '1';
    highOption.textContent = 'High';
    prioritySelect.appendChild(highOption);
  
    modifyTaskDisplay.appendChild(prioritySelect);

    // Add break
    const smallBreak = document.createElement('br');
    modifyTaskDisplay.appendChild(smallBreak);

    // Add Task button
    const addButton = document.createElement('button');
    addButton.classList.add('add-task-btn');
    addButton.textContent = 'ADD';
    modifyTaskDisplay.appendChild(addButton);
  
    // Append the modifyTaskDisplay to the overlay
    overlay.appendChild(modifyTaskDisplay);

    return overlay;
    // Append the overlay to the document body or a specific container
    // document.getElementById(parentId).appendChild(overlay);
    // console.log(parentId)
  }

  function deleteAddTask(id) {
    const delItem = document.getElementById(id);
    delItem.remove();
  }

  function addCalenderData(id){
    const delItem = document.getElementById(id);
    delItem.remove();
  }


  // Get the current week and display the calendar
  hideLoader();
  var weekStartDate = new Date();
  weekStartDate.setDate(weekStartDate.getDate() - weekStartDate.getDay());
  document.getElementById('tasks-bg').appendChild(createCalendar(weekStartDate));

  addEventListener







  function createCalendar0(weekStart) {
    const calendar = document.createElement('div');
    calendar.classList.add('calendar');
  
    // Get the current date and set it to the beginning of the week
    const currentDate = weekStart || new Date();
    currentDate.setDate(currentDate.getDate() - currentDate.getDay());
  
    // Create the header with day names
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const header = document.createElement('div');
    header.classList.add('header');
    days.forEach(day => {
      const dayCell = document.createElement('div');
      dayCell.textContent = day;
      header.appendChild(dayCell);
    });
    calendar.appendChild(header);
  
    // Create the grid for the week
    for (let i = 0; i < 7; i++) {
      const dayCell = document.createElement('div');
      dayCell.classList.add('day');
  
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
  
      const dateSpan = document.createElement('span');
      dateSpan.textContent = date.getDate();
      dayCell.appendChild(dateSpan);
  
      calendar.appendChild(dayCell);
    }
  
    return calendar;
  }