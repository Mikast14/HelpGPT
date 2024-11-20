async function getData(dataType) {
    const response = await fetch('http://127.0.0.1:8000/prompt_fragments/');
    const data = await response.json();
    return data;
}

const output = document.getElementById('output');

getData('prompt_fragments').then(data => {
    data.forEach(miniData => {
        const div = document.createElement('div');
        div.innerHTML = miniData.content;
        output.appendChild(div);
    });
});

async function postData(data) {
    const response = await fetch('http://127.0.0.1:8000/prompt_fragments/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

const newData = {
    author_id: 1,
    content: "Sample content",
    description: "Sample description"
};

postData(newData).then(response => {
    console.log('Data posted:', response);
}).catch(error => {
    console.error('Error posting data:', error);
});

const sidebar = document.getElementById('sidebar');
const insideToggleBtn = document.getElementById('insideToggleBtn');
const outsideToggleBtn = document.getElementById('outsideToggleBtn');
const content = document.getElementById('content');
const namemove = document.getElementById('name');

function showSidebar() {
    sidebar.classList.remove('hidden');
    content.classList.remove('collapsed');
    outsideToggleBtn.classList.remove('visible');
    namemove.classList.add('left'); // Move back to original position
}

function hideSidebar() {
    sidebar.classList.add('hidden');
    content.classList.add('collapsed');
    outsideToggleBtn.classList.add('visible');
    namemove.classList.remove('left'); // Smoothly move to the left
}


insideToggleBtn.addEventListener('click', hideSidebar);
outsideToggleBtn.addEventListener('click', showSidebar);


function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function containsLanguage(str, languages) {
    const validLanguages = languages
        .filter(lang => lang && typeof lang === 'string')
        .map(lang => escapeRegex(lang));

    
    const pattern = new RegExp(`\\b(${validLanguages.join('|')})\\b`, 'i');
    return pattern.test(str);
}

let language = {};
fetch("languages.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        language = data;
    });
const textarea = document.getElementById('input');
const outputCheck = document.getElementById('outputCheck');
const check1 = document.getElementById('check-1');

textarea.addEventListener('input', (event) => {
    const currentText = event.target.value.toLowerCase();
    if (containsLanguage(currentText, language.languages)) {
        outputCheck.innerHTML = 'Language detected';
        check1.style.borderColor = 'green';
    } else {
        outputCheck.innerHTML = 'No language detected';
        check1.style.borderColor = 'red';
    }
});
