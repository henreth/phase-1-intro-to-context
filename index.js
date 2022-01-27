// Your code here
let createEmployeeRecord= (info) => {
    return {
        'firstName': info[0],
        'familyName': info[1],
        'title': info[2],
        'payPerHour': parseInt(info[3]),
        'timeInEvents': [],
        'timeOutEvents': []
    }
}

let createEmployeeRecords = (infoList) => {
    return infoList.map(info=>{
        return createEmployeeRecord(info)
    })
    // const empList = [];
    // for (info of infoList){
    //     empList.push(createEmployeeRecord(info));
    // }
    // return empList;
}

let createTimeInEvent = (emp,timeStamp) => {
    emp.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(timeStamp.split(' ')[1],10),
        date: timeStamp.split(' ')[0]
    });
    return emp;
}

let createTimeOutEvent = (emp,timeStamp) => {
    emp.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(timeStamp.split(' ')[1],10),
        date: timeStamp.split(' ')[0]
    });
    return emp;
}

let hoursWorkedOnDate = (emp,dateForm) => {
    let inRecord = emp.timeInEvents.find(record=>{
        return record.date === dateForm;
    });

    let outRecord = emp.timeOutEvents.find(record=>{
        return record.date === dateForm;
    });

    return (outRecord.hour - inRecord.hour) / 100;
}

let wagesEarnedOnDate = (emp,dateForm) => {
    return hoursWorkedOnDate(emp,dateForm) * emp.payPerHour;
}

let allWagesFor = (emp) => {
    let allDates = emp.timeInEvents.map(record=>record.date);

    return allDates.reduce( (tot,date) => {
        return tot+=wagesEarnedOnDate(emp, date);
    },0)
}

let calculatePayroll = (empList) => {
    return empList.reduce( (tot,emp) => {
        return tot+=allWagesFor(emp);
    },0);
}