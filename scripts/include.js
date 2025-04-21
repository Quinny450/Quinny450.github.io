// scripts/includes.js
function includeHTML(id, file) {
    fetch(file)
      .then(res => res.text())
      .then(data => {
        document.getElementById(id).innerHTML = data;
      });
  }
  window.addEventListener('DOMContentLoaded', () => {
    includeHTML('header-include', 'components/header.html');
    includeHTML('footer-include', 'components/footer.html');
  });
  