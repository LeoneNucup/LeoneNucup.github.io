let partitions = {
    partition1: { size: 10, allocated: false },
    partition2: { size: 10, allocated: false },
    partition3: { size: 10, allocated: false },
    partition4: { size: 10, allocated: false }
};

const totalPartitions = Object.keys(partitions).length;

function createJobInputs() {
    let numJobs = parseInt(document.getElementById("numJobs").value);
    if (isNaN(numJobs) || numJobs <= 0 || numJobs > 4) {
        alert("Please enter a valid number of jobs between 1 and 4.");
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

function allocateMemory() {
    let internalFragmentation = 0;

    for (let partition in partitions) {
        if (!partitions[partition].allocated) {
            partitions[partition].allocated = true;
        }
    }

    for (let i = 1; i <= totalPartitions; i++) {
        let jobSizeInput = document.getElementById(`jobSize${i}`);
        if (jobSizeInput) {
            let jobSize = parseInt(jobSizeInput.value);
            if (isNaN(jobSize) || jobSize <= 0) {
                alert(`Please enter a valid size for Job ${i}.`);
                return;
            }

            let allocated = false;
            for (let partition in partitions) {
                if (!partitions[partition].allocated && partitions[partition].size >= jobSize) {
                    partitions[partition].allocated = true;
                    allocated = true;
                    break;
                }
            }

            if (!allocated) {
                internalFragmentation += partitions[`partition${i}`].size - jobSize;
            }
        }
    }

    updateMemoryDisplay();
    displayInternalFragmentation(internalFragmentation);
}

function deallocateMemory() {
    for (let partition in partitions) {
        if (partitions[partition].allocated) {
            partitions[partition].allocated = false;
        }
    }

    updateMemoryDisplay();
    clearJobInputs();
    clearInternalFragmentation();
}

function updateMemoryDisplay() {
    let x = 1;
    let numJobs = parseInt(document.getElementById("numJobs").value);
    console.log(numJobs);
    for (let partition in partitions) {
        if(x <= numJobs){
        let partitionElement = document.getElementById(partition);
        partitionElement.textContent = `${partition} (${partitions[partition].allocated ? 'Allocated' : 'Free'})`;
        x++;
    }
}
}

function clearJobInputs() {
    let jobSizesContainer = document.getElementById("jobSizesContainer");
    jobSizesContainer.innerHTML = "";
}

function displayInternalFragmentation(fragmentation) {
    let internalFragmentationDiv = document.getElementById("internalFragmentation");
    internalFragmentationDiv.textContent = `Internal Fragmentation: ${fragmentation}`;
}

function clearInternalFragmentation() {
    let internalFragmentationDiv = document.getElementById("internalFragmentation");
    internalFragmentationDiv.textContent = "";
}


