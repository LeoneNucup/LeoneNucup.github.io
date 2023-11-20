function createJobInputs() {
    let numJobs = parseInt(document.getElementById("numJobs").value);
    if (isNaN(numJobs) || numJobs <= 0 || numJobs > 5) {
        alert("Please enter a valid number of jobs between 1 and 5.");
        return;
    }

    let jobSizesContainer = document.getElementById("jobSizesContainer");
    jobSizesContainer.innerHTML = "";

    for (let i = 0; i < numJobs; i++) {
        let input = document.createElement("input");
        input.type = "number";
        input.min = "1";
        input.placeholder = `Enter size of Job ${i + 1}`;
        input.id = `jobSize${i + 1}`;
        jobSizesContainer.appendChild(input);
    }
}

function FirstFit() {
    let P1Size = parseInt(document.getElementById("P1Size").value);
    let P2Size = parseInt(document.getElementById("P2Size").value);
    let P3Size = parseInt(document.getElementById("P3Size").value);
    let P4Size = parseInt(document.getElementById("P4Size").value);

    let numJobs = parseInt(document.getElementById("numJobs").value);
    jobs = [];
    for (let i = 1; i <= numJobs; i++) {
        jobs[i] = `Job ${i}`;
    }
    let partitions = {
        partition1: { size: P1Size, allocated: false, job: jobs[1] },
        partition2: { size: P2Size, allocated: false, job: jobs[2] },
        partition3: { size: P3Size, allocated: false, job: jobs[3] },
        partition4: { size: P4Size, allocated: false, job: jobs[4] }
    };
    const totalPartitions = Object.keys(partitions).length;
    console.log(partitions);
    let internalFragmentation = 0;
    const sortedPartitions = Object.keys(partitions).sort((a, b) => partitions[a].job - partitions[b].job);
    for (let i = 1; i <= totalPartitions; i++) {
        let jobSizeInput = document.getElementById(`jobSize${i}`);
        if (jobSizeInput) {
            let jobSize = parseInt(jobSizeInput.value);
            if (isNaN(jobSize) || jobSize <= 0) {
                alert(`Please enter a valid size for Job ${i}.`);
                return;
            }

            let allocated = false;
            //First Fit
            for (let j = 0; j < sortedPartitions.length; j++) {
                let partition = sortedPartitions[j];
                if (!partitions[partition].allocated && partitions[partition].size >= jobSize) {
                    partitions[partition].allocated = true;
                    partitions[partition].job = jobs[i];
                    allocated = true;
                    internalFragmentation += partitions[`partition${i}`].size - jobSize;
                    break;
                }
                if (!partitions[partition].allocated && partitions[partition].size < jobSize) {
                    partitions[partition].allocated = false;
                    partitions[partition].job = null;
                    allocated = false;
                }
            }

        }
    }

    updateMemoryDisplay(partitions);
    displayInternalFragmentation(internalFragmentation);
}


function BestFit() {
    let P1Size = parseInt(document.getElementById("P1Size").value);
    let P2Size = parseInt(document.getElementById("P2Size").value);
    let P3Size = parseInt(document.getElementById("P3Size").value);
    let P4Size = parseInt(document.getElementById("P4Size").value);

    let numJobs = parseInt(document.getElementById("numJobs").value);
    jobs = [];
    for (let i = 1; i <= numJobs; i++) {
        jobs[i] = `Job ${i}`;
    }
    let partitions = {
        partition1: { size: P1Size, allocated: false, job: jobs[1] },
        partition2: { size: P2Size, allocated: false, job: jobs[2] },
        partition3: { size: P3Size, allocated: false, job: jobs[3] },
        partition4: { size: P4Size, allocated: false, job: jobs[4] }
    };
    const totalPartitions = Object.keys(partitions).length;
    console.log(partitions);
    let internalFragmentation = 0;

    const sortedPartitions = Object.keys(partitions).sort((a, b) => partitions[a].size - partitions[b].size);

    for (let i = 1; i <= totalPartitions; i++) {
        let jobSizeInput = document.getElementById(`jobSize${i}`);
        if (jobSizeInput) {
            let jobSize = parseInt(jobSizeInput.value);
            if (isNaN(jobSize) || jobSize <= 0) {
                alert(`Please enter a valid size for Job ${i}.`);
                return;
            }

            let allocated = false;
            for (let j = 0; j < sortedPartitions.length; j++) {
                let partition = sortedPartitions[j];
                if (!partitions[partition].allocated && partitions[partition].size >= jobSize) {
                    partitions[partition].allocated = true;
                    internalFragmentation += partitions[`partition${i}`].size - jobSize;
                    partitions[partition].job = jobs[i]; // Store the job information
                    allocated = true;
                    break;
                }
                if (!partitions[partition].allocated && partitions[partition].size < jobSize) {
                    partitions[partition].allocated = false;
                    partitions[partition].job = null;
                    allocated = false;
                }

            }

        }
    }

    updateMemoryDisplay(partitions);
    displayInternalFragmentation(internalFragmentation);
}


function WorstFit() {
    let P1Size = parseInt(document.getElementById("P1Size").value);
    let P2Size = parseInt(document.getElementById("P2Size").value);
    let P3Size = parseInt(document.getElementById("P3Size").value);
    let P4Size = parseInt(document.getElementById("P4Size").value);

    let numJobs = parseInt(document.getElementById("numJobs").value);

    jobs = [];
    for (let i = 1; i <= numJobs; i++) {
        jobs[i] = `Job ${i}`;
    }
    let partitions = {
        partition1: { size: P1Size, allocated: false, job: jobs[1] },
        partition2: { size: P2Size, allocated: false, job: jobs[2] },
        partition3: { size: P3Size, allocated: false, job: jobs[3] },
        partition4: { size: P4Size, allocated: false, job: jobs[4] }
    };
    const totalPartitions = Object.keys(partitions).length;
    console.log(partitions);
    let internalFragmentation = 0;

    const sortedPartitions = Object.keys(partitions).sort((a, b) => partitions[b].size - partitions[a].size);

    for (let i = 1; i <= totalPartitions; i++) {
        let jobSizeInput = document.getElementById(`jobSize${i}`);
        if (jobSizeInput) {
            let jobSize = parseInt(jobSizeInput.value);
            if (isNaN(jobSize) || jobSize <= 0) {
                alert(`Please enter a valid size for Job ${i}.`);
                return;
            }

            let allocated = false;
            for (let j = 0; j < sortedPartitions.length; j++) {
                let partition = sortedPartitions[j];
                if (!partitions[partition].allocated && partitions[partition].size >= jobSize) {
                    partitions[partition].allocated = true;
                    partitions[partition].job = jobs[i]; // Store the job information
                    allocated = true;
                    internalFragmentation += partitions[`partition${i}`].size - jobSize;
                    break;
                }
                if (!partitions[partition].allocated && partitions[partition].size < jobSize) {
                    partitions[partition].allocated = false;
                    partitions[partition].job = null;
                    allocated = false;
                }
            }

        }
    }
    console.log(internalFragmentation);
    updateMemoryDisplay(partitions);
    displayInternalFragmentation(internalFragmentation);
}

function updateMemoryDisplay(partitions) {
    for (let partition in partitions) {
        let partitionElement = document.getElementById(partition);
        partitionElement.textContent = `${partition} ${partitions[partition].job} (${partitions[partition].allocated ? 'Allocated' : 'Free'})`;

    }
}

function displayInternalFragmentation(fragmentation) {
    let internalFragmentationDiv = document.getElementById("internalFragmentation");
    internalFragmentationDiv.textContent = `Internal Fragmentation: ${fragmentation}`;
}



