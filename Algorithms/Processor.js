function addRow(tableId) {
    let table = document.getElementById(tableId);
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.innerHTML = "P" + (table.rows.length - 1);
    cell2.innerHTML = '<input type="number" min="1" value="1">';
    if (tableId === 'priorityTable') {
        cell3.innerHTML = '<input type="number" min="1" value="1">';
    }
}

function generateTimeline(processes) {
    let timeline = [];
    let currentTime = 0;
    let completedProcesses = 0;

    while (completedProcesses < processes.length) {
        for (let i = 0; i < processes.length; i++) {
            if (processes[i].burstTime === 0) {
                timeline.push({ time: currentTime, process: processes[i].process });
                completedProcesses++;
            } else {
                currentTime++;
                processes[i].burstTime--;
            }
        }
    }

    return timeline;
}


function nonPreemptivePriorityScheduling() {
    let table = document.getElementById('priorityTable');
    let processes = [];
    for (let i = 1; i < table.rows.length; i++) {
        let burstTime = parseInt(table.rows[i].cells[1].getElementsByTagName('input')[0].value);
        let priority = parseInt(table.rows[i].cells[2].getElementsByTagName('input')[0].value);
        processes.push({ process: 'P' + i, burstTime: burstTime, priority: priority });
    }

    // Sort processes based on priority
    processes.sort((a, b) => a.priority - b.priority);

    let totalWaitTime = 0;
    let totalTurnaroundTime = 0;
    let currentTime = 0;
    let endTime =0;
    let startTime=0;
    let TATime=0;

    for (let i = 0; i < processes.length; i++) {
        currentTime += processes[i].burstTime;
        endTime = currentTime;
        TATime = currentTime
        totalTurnaroundTime += endTime;
        totalWaitTime += TATime-processes[i].burstTime;
        startTime += currentTime;

    }

    let averageWaitTime = totalWaitTime / processes.length;
    let averageTurnaroundTime = totalTurnaroundTime / processes.length;

    document.getElementById("PrioWT").innerHTML = ("Average Wait Time: " + averageWaitTime);
    document.getElementById("PrioTT").innerHTML = ("Average Turnaround Time: " + averageTurnaroundTime);
}

function preemptiveRoundRobinScheduling() {
    let table = document.getElementById('roundRobinTable');
    let processes = [];
    let ctr =0;
    for (let i = 1; i < table.rows.length; i++) {
        let burstTime = parseInt(table.rows[i].cells[1].getElementsByTagName('input')[0].value);
        processes.push({ process: 'P' + i, burstTime: burstTime , ctr: ctr});
    }

    let timeQuantum = 2; // Set to 2 for simplicity
    let totalWaitTime = 0;
    let totalTurnaroundTime = 0;
    let currentTime = 0;
    let endTime =0;
    let startTime=0;
    let TATime=0;
    let completedProcesses = 0;

    while (completedProcesses < processes.length) {
        for (let i = 0; i < processes.length; i++) {
            if (processes[i].burstTime > 0) {
                if (processes[i].burstTime <= timeQuantum) {
                    currentTime += processes[i].burstTime;
                    endTime = currentTime;
                    TATime = currentTime;
                    totalTurnaroundTime += endTime;
                    totalWaitTime += TATime - (processes[i].burstTime+timeQuantum*processes[i].ctr);
                    startTime += currentTime;
                    completedProcesses++;
                    processes[i].burstTime = 0;
                } else {
                    currentTime += timeQuantum;
                    processes[i].burstTime -= timeQuantum;
                    processes[i].ctr++;
                }
            }
        }
    }

    let averageWaitTime = totalWaitTime / processes.length;
    let averageTurnaroundTime = totalTurnaroundTime / processes.length;

    document.getElementById("RrWT").innerHTML = ("Average Wait Time: " + averageWaitTime);
    document.getElementById("RrTT").innerHTML = ("Average Turnaround Time: " + averageTurnaroundTime);
}
