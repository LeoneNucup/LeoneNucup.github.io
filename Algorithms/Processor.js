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

function nonPreemptivePriorityScheduling() {
    let table = document.getElementById('priorityTable');
    let processes = [];
    for (let i = 1; i < table.rows.length; i++) {
        let burstTime = parseInt(table.rows[i].cells[1].getElementsByTagName('input')[0].value);
        let priority = parseInt(table.rows[i].cells[2].getElementsByTagName('input')[0].value);
        processes.push({ process: 'P' + i, burstTime: burstTime, priority: priority });
    }

    // Sort processes based on priority
    processes.sort((a, b) => b.priority - a.priority);

    let totalWaitTime = 0;
    let totalTurnaroundTime = 0;
    let time = 0;
    for (let i = 0; i < processes.length; i++) {
        time += processes[i].burstTime;
        totalWaitTime += time - processes[i].burstTime;
        totalTurnaroundTime += time;
    }

    let averageWaitTime = totalWaitTime / processes.length;
    let averageTurnaroundTime = totalTurnaroundTime / processes.length;


    document.getElementById("PrioWT").innerHTML = ("Average Wait Time: " + averageWaitTime);
    document.getElementById("PrioTT").innerHTML = ("Average Turnaround Time: " + averageTurnaroundTime);
}

function preemptiveRoundRobinScheduling() {
    let table = document.getElementById('roundRobinTable');
    let processes = [];
    for (let i = 1; i < table.rows.length; i++) {
        let burstTime = parseInt(table.rows[i].cells[1].getElementsByTagName('input')[0].value);
        processes.push({ process: 'P' + i, burstTime: burstTime });
    }

    let timeQuantum = 2; // Set to 2 for simplicity
    let totalWaitTime = 0;
    let totalTurnaroundTime = 0;
    let time = 0;
    let completedProcesses = 0;

    while (completedProcesses < processes.length) {
        if (time < processes[completedProcesses].burstTime) {
            time += timeQuantum;
            if (time >= processes[completedProcesses].burstTime) {
                totalWaitTime += time - processes[completedProcesses].burstTime;
                totalTurnaroundTime += time;
                completedProcesses++;
            }
        } else {
            processes.push(processes.shift());
            completedProcesses--;
            time = 0;
        }
    }

    let averageWaitTime = totalWaitTime / processes.length;
    let averageTurnaroundTime = totalTurnaroundTime / processes.length;

    document.getElementById("RrWT").innerHTML = ("Average Wait Time: " + averageWaitTime);
    document.getElementById("RrTT").innerHTML = ("Average Turnaround Time: " + averageTurnaroundTime);
}
