

class MemoryManagement {
    constructor(fixedPartitionSize) {
        this.fixedPartitionSize = fixedPartitionSize;
        this.partitions = [];

        for (let i = 0; i < 4; i++) {
            this.partitions.push({ start: i * fixedPartitionSize, end: (i + 1) * fixedPartitionSize - 1, size: fixedPartitionSize });
        }
    }

    allocateJob(jobSize) {
        for (let i = 0; i < this.partitions.length; i++) {
            if (this.partitions[i].size >= jobSize) {
                return { start: this.partitions[i].start, size: jobSize };
            }
        }

        return null;
    }
}
function runSimulation() {
    console.log('hi');
    let numberOfJobs = parseInt(document.getElementById('jobs').value);
    let jobSize = parseInt(document.getElementById('partition-size').value);
    let fixedPartitionSize = parseInt(document.getElementById('fixed-partition-size').value);

    let memoryManagement = new MemoryManagement(fixedPartitionSize);
    let allocatedJobs = [];

    for (let i = 0; i < numberOfJobs; i++) {
        let allocated = memoryManagement.allocate}

    // Allocate all the jobs
for (let i = 0; i < numberOfJobs; i++) {
    allocatedJobs.push(memoryManagement.allocateJob(jobSize));
}

// fragmentation_calculation.js
let fragmentationCalculation = () => {
    let process_size_array = document.getElementsByName('process_size');
    let process_sizes = Array.from(process_size_array).map(el => parseInt(el.value));

    let total_fragmentation = process_sizes.reduce((acc, curr) => acc + curr, 0);

    document.getElementById('total_fragmentation').innerHTML
}}}
