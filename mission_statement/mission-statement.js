let selectElem = document.querySelector('select');
let logo = document.querySelector('.logo');

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;

    if (current === 'dark') {
        document.body.classList.add('dark');
        logo.src = 'images/BYUI-logo_white.png';
    } else {
        document.body.classList.remove('dark');
        logo.src = 'images/BYUI-logo-dark.png';
    }
}