/* <div class="todo-app">
                <div class="date-display">
                    <h2>11/23</h2>
                </div>
                <div class="day-of-week">
                    <h2>MON</h2>
                </div>
                
                <ul id="list-container">
                    <li><p>ajdhadoiijj</p></li>
                    <li>fdwcve</li>
                    <li>test #3</li>
                </ul>
            </div> */


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
        "desc":id+" description",
        "done":0
      };
      tasks.push(task);
    }
    daysData.push(tasks);
  }
   
  return daysData;
  
}

function createCalendar() {
  const calendar = document.createElement('div');
  calendar.classList.add('weekly-display');
    
    // Get the current date and set it to the beginning of the week
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - currentDate.getDay());
    const endDate = currentDate.getDate() + 6;
    const data = getCalenderData(currentDate, endDate);
  
    // Create the header with day names
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    var i = 0;
    days.forEach(day => {
      const header = document.createElement('div');
      header.classList.add('todo-app');

      const dayCell = document.createElement('div');
      dayCell.classList.add('day-of-week');
      dayCell.innerHTML = '<h2>'+day+'</h2>';
      const dates = document.createElement('div');
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      const dateSpan = document.createElement('span');
      dateSpan.textContent = date.getMonth()+1 + "/" + date.getDate();
      dateSpan.classList.add('date-display');



      const taskContainer = document.createElement('ul');
      taskContainer.id='list-container';

      taskContainer.appendChild(document.createTextNode('sijdydhyuduu'))

      header.appendChild(dateSpan);
      header.appendChild(dayCell);
      header.appendChild(taskContainer);
      calendar.appendChild(header);
      i++;
    });
  
    // // Create the grid for the week
    // const dates = document.createElement('div');
    // dates.classList.add('header');
    // for (let i = 0; i < 7; i++) {
    //   const dayCell = document.createElement('div');
    //   dayCell.classList.add('day');
  
    //   const date = new Date(currentDate);
    //   date.setDate(currentDate.getDate() + i);
  
    //   const dateSpan = document.createElement('span');
    //   dateSpan.textContent = date.getMonth()+1 + "/" + date.getDate();
    //   dayCell.appendChild(dateSpan);

    //   dates.appendChild(dayCell);

    // }
    // calendar.appendChild(dates);
  
    return calendar;
  }
  
  // Get the current week and display the calendar
  document.getElementById('tasks-bg').appendChild(createCalendar());




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