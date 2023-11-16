document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault // create arrays to store burst time, priority, waiting time, and turnaround time
    let burst_time = []
    let priority = []
    let waiting_time = []
    let turnaround_time = []

    // create variables to store the number of processes and the burst time sum
    let num_processes = parseInt(document.getElementById('num_processes').value)
    let burst_time_sum = 0

    // iterate through each process and gather its burst time and priority
    for (let i = 0; i < num_processes; i++) {
       burst_time[i] = parseInt(document.getElementById('burst_time' + i).value)
       priority[i] = parseInt(document.getElementById('priority' + i).value)
       burst_time_sum += burst_time[i]
    }

    // calculate waiting time and turnaround time
    for (let i = 0; i < num_processes; i++) {
       waiting_time[i] = 0
       turnaround_time[i] = burst_time[i]
    }

    for (let i = 1; i < num_processes; i++) {
       waiting_time[i] = burst_time[i - 1] + waiting_time[i - 1]
       turnaround_time[i] = burst_time[i] + waiting_time[i]
    }

    // create the execution table
    let table_body = document.getElementById('table-body')
    for (let i = 0; i < num_processes; i++) {
       let row = table_body.insertRow(i)
       row.insertCell(0).textContent = i + 1
       row.insertCell(1).textContent = burst_time[i]
       row.insertCell(2).textContent = priority[i]
       row.insertCell(3).textContent = waiting_time[i]
       row.insertCell(4).textContent = turnaround_time[i]
    }
   })
