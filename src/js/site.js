// fix copyright year in footer
const c = document.getElementsByTagName('footer')[0].getElementsByTagName('p')[1];
c.innerHTML = c.innerHTML.replace(2021,(new Date).getFullYear())

// set events to make menu work
const opener = document.getElementsByClassName('hamburger')[0];
const closer = document.getElementsByClassName('menuX')[0];
const popoutMenu = document.getElementsByTagName('nav')[0];
opener.addEventListener('click', () => {
  popoutMenu.classList.add('open')
})
closer.addEventListener('click', () => {
  popoutMenu.classList.remove('open')
})