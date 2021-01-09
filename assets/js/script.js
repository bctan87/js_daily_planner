// This function saves the tasks into the localStorage
function storeTask() {
    localStorage.setItem('timeBlocks', JSON.stringify(timeBlocks));
}

// This function displays the save tasks  
function displayTask() {
    timeBlocks.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}

// This function displays saved tasks 
function currentTask() {
    let storedDay = JSON.parse(localStorage.getItem("timeBlocks"));

    if (storedDay) {
        timeBlocks = storedDay;
    }

    storeTask();
    displayTask();
}

// This function displays the date on top of the page
function displayDate() {
    let currentHeaderDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentHeaderDate);
}

// Calls the function above
displayDate();

// This contains the timeblocks info
let timeBlocks = [
    {
        id: "0",
        hour: "09",
        time: "09",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "01",
        time: "13",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "02",
        time: "14",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "03",
        time: "15",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "04",
        time: "16",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "05",
        time: "17",
        meridiem: "pm",
        reminder: ""
    },
    
]

// This determines the timeblocks' appearance
timeBlocks.forEach(function(thisHour) {

    // Timeblocks row
    let timeBlocksRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(timeBlocksRow);

    // Time area
    let timeArea = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });

    // Task area
    let taskArea = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });

    // This determines the taskArea's colors
    let taskAreaColor = $("<textarea>");
    taskArea.append(taskAreaColor);
    taskAreaColor.attr("id", thisHour.id);

    // Grey if past
    if (thisHour.time < moment().format("HH")) {
        taskAreaColor.attr ({
            "class": "past", 
        })

    // Red if current
    } else if (thisHour.time === moment().format("HH")) {
        taskAreaColor.attr({
            "class": "present"
        })

    // Green if future
    } else if (thisHour.time > moment().format("HH")) {
        taskAreaColor.attr({
            "class": "future"
        })
    }

    // Save button area
    let saveButton = $("<i class='far fa-save fa-lg'></i>")
    let saveArea = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    saveArea.append(saveButton);
    timeBlocksRow.append(timeArea, taskArea, saveArea);
})

// Calls the function to update the info
currentTask();

// This saves the user input into the local storage
$(".saveBtn").on("click", function(event) {
    // Prevents the page from loading
    event.preventDefault();

    // This line saves everything placed in the taskAreas, trimmed the excess empty spaces
    let saveTask = $(this).siblings(".description").children(".future, .present, .past").attr("id");
    timeBlocks[saveTask].reminder = $(this).siblings(".description").children(".future, .present, .past").val().trim();

    // To localStorage
    storeTask();

    // Updates the taskArea to display the latest saved task
    displayTask();
})