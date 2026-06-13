const aCourse = {
    code: 'CSE121b',
    name: 'Javascript Language',
    logo: 'images/js-logo.png',
    sections: [
        { sectionNum: 1, roomNum: 'STC 353', enrolled: 26, days: 'TTh', instructor: 'Bro T' },
        { sectionNum: 2, roomNum: 'STC 347', enrolled: 28, days: 'TTh', instructor: 'Sis A' }
    ],
    enrollStudent: function (sectionNum) {
        const sectionIndex = this.sections.findIndex(
            (section) => section.sectionNum == sectionNum
        );

        if (sectionIndex >= 0) {
            this.sections[sectionIndex].enrolled++;
            renderSections(this.sections);
        }
    }
};

console.log(aCourse.code);
console.log(aCourse.name);

document.querySelector('#courseName').textContent = aCourse.name;
document.querySelector('#courseCode').textContent = aCourse.code;

document.querySelector('img').setAttribute('src', aCourse.logo);
document.querySelector('img').setAttribute('alt', aCourse.name);
document.querySelector('img').style.width = '100px';

console.log(aCourse.sections[1].roomNum);

function sectionTemplate(section) {
    return `<tr>
        <td>${section.sectionNum}</td>
        <td>${section.roomNum}</td>
        <td>${section.enrolled}</td>
        <td>${section.days}</td>
        <td>${section.instructor}</td>
    </tr>`;
}

function renderSections(sections) {
    const html = sections.map(sectionTemplate);
    document.querySelector('#sections').innerHTML = html.join('');
}

renderSections(aCourse.sections);

document.querySelector('#enrollStudent').addEventListener('click', function () {
    const sectionNum = document.querySelector('#sectionNumber').value;
    aCourse.enrollStudent(sectionNum);
});

const sectionInput = document.querySelector('#sectionNumber');

sectionInput.style.width = '140px';

const hoverMenu = document.createElement('div');
hoverMenu.innerHTML = `
    <div class="section-choice" style="padding: 8px;">1</div>
    <div class="section-choice" style="padding: 8px;">2</div>
`;

hoverMenu.style.display = 'none';
hoverMenu.style.position = 'absolute';
hoverMenu.style.backgroundColor = 'white';
hoverMenu.style.border = '1px solid #999';
hoverMenu.style.width = '140px';
hoverMenu.style.fontSize = '16px';
hoverMenu.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
hoverMenu.style.zIndex = '1000';
hoverMenu.style.cursor = 'pointer';

document.body.appendChild(hoverMenu);

sectionInput.addEventListener('mouseenter', function () {
    const rect = sectionInput.getBoundingClientRect();

    hoverMenu.style.left = `${rect.left + window.scrollX}px`;
    hoverMenu.style.top = `${rect.bottom + window.scrollY}px`;
    hoverMenu.style.display = 'block';
});

hoverMenu.addEventListener('mouseenter', function () {
    hoverMenu.style.display = 'block';
});

hoverMenu.addEventListener('click', function (event) {
    if (event.target.classList.contains('section-choice')) {
        sectionInput.value = event.target.textContent;
        hoverMenu.style.display = 'none';
    }
});

hoverMenu.addEventListener('mouseleave', function () {
    hoverMenu.style.display = 'none';
});