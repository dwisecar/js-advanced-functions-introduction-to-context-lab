// Your code here
let createEmployeeRecord = row => {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = employee => {
    return employee.map(row => {
        return createEmployeeRecord(row);
    })
}

let createTimeInEvent = (employee, timeStamp) => {
    let [date, hour] = timeStamp.split(' ');
    employee.timeInEvents.push({
        type: 'TimeIn',
        date: date,
        hour: parseInt(hour, 10)
    })
    return employee;
}

let createTimeOutEvent = (employee, timeStamp) => {
    let [date, hour] = timeStamp.split(' ');
    employee.timeOutEvents.push({
        type: 'TimeOut',
        date: date,
        hour: parseInt(hour, 10)
    })
    return employee;
}

let hoursWorkedOnDate = (employee, date) => {
    let timeIn = employee.timeInEvents.find(timeInEvent => {
        return timeInEvent.date === date;
    });

    let timeOut = employee.timeOutEvents.find(timeOutEvent => {
        return timeOutEvent.date === date;
    });

    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = (employee, date) => {
    let wages = hoursWorkedOnDate(employee, date) * employee.payPerHour;
    return parseInt(wages.toString());
}

let allWagesFor = employee => {
    let datesWorked = employee.timeInEvents.map(day => {
        return day.date
    })

    let payTotal = datesWorked.reduce((memo, day) => {
        return memo + wagesEarnedOnDate(employee, day)
    }, 0)

    return payTotal;
}

let findEmployeeByFirstName = function(arr, firstName){
    return arr.find(employee => {
        return employee.firstName == firstName;
    })
}

let calculatePayroll = function(arr){
    return arr.reduce(function(memo, record){
        return memo + allWagesFor(record)
    }, 0)
}