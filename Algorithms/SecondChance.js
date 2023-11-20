
document.getElementById('pageReplacementForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let frames = parseInt(document.getElementById('frames').value);
    let pages = document.getElementById('pages').value.split(',').map(Number);
    simulate(frames, pages);
});
function simulate() {
const frames = parseInt(document.getElementById('frames').value);
const pages = document.getElementById('pages').value.split(',').map(Number);
let pageFaults = 0;
let frame = [];
let referenceBit = [];
let secondChance = [];

for (let i = 0; i < frames; i++) {
    frame[i] = -1;
    referenceBit[i] = 0;
    secondChance[i] = 0;
}

let PRTable = '<table border="1"><tr><th>Page</th>';

for (let i = 1; i <= frames; i++) {
    PRTable += `<th>Frame ${i}</th>`;
}

PRTable += '<th>Page Faults</th></tr>';

for (let i = 0; i < pages.length; i++) {
    let found = false;
    let replaced = -1;

    for (let j = 0; j < frames; j++) {
        if (frame[j] === pages[i]) {
            found = true;
            break;
        }
    }

    if (!found) {
        for (let j = 0; j < frames; j++) {
            if (referenceBit[j] === 0) {
                replaced = j;
                break;
            }
        }

        if (replaced === -1) {
            for (replaced = 0; replaced < frames; replaced++) {
                if (secondChance[replaced] === 0) {
                    break;
                }
            }
        }

        if (replaced !== -1) {
            frame[replaced] = pages[i];
            pageFaults++;
            referenceBit[replaced] = 0;
            secondChance[replaced] = 0;
        }
    }

    for (let j = 0; j < frames; j++) {
        if (frame[j] === pages[i]) {
            referenceBit[j] = 1;
            secondChance[j] = 1;
            break;
        }
    }
    const pageFault = found ? '' : '*';
    PRTable += `<tr><td>${pages[i]}</td><td>${frame.join(',')}</td><td>${pageFaults}</td><td>${pageFault}</td></tr>`;
}
PRTable += '</table>';
document.getElementById('PRTable').innerHTML = PRTable;

document.getElementById('result').innerHTML = 'Page Faults: ' + pageFaults;
}
