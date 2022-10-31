function deleteHistory() {
  localStorage.removeItem('KBOhistory');
  renderPage('');
}

function renderPage(history) {
  const historyNode = document.querySelector('.history');
  history.innerHTML = '';
  historyNode.innerHTML =
    '<h2>Vorige zoekresulaten</h2><button id="btn-delete"><i class="fas fa-trash-alt"></i></button>';
  let html = '';
  if (history.length > 0) {
    let currentDate = '0';
    for (let i = 0; i < history.length; i++) {
      if (history[i].date !== currentDate) {
        html += `<article><p class="search-date">${history[i].date}</p>
                <ul>`;
        currentDate = history[i].date;
      }
      if (history[i].hasONnummer) {
        if (history[i].matches.length > 1) {
          for (let j = 0; j < history[i].matches.length; j++) {
            html += `<li><a href="https://kbopub.economie.fgov.be/kbopub/zoeknummerform.html?nummer=${history[i].queryStrings[j]}&actionLu=Zoek" target="_blank">${history[i].matches[j]}</a></li>`;
          }
        } else {
          html += `<li><a href="https://kbopub.economie.fgov.be/kbopub/zoeknummerform.html?nummer=${history[i].queryStrings}&actionLu=Zoek" target="_blank">${history[i].matches}</a></li>`;
        }
      } else {
        html += `<li><a href="https://kbopub.economie.fgov.be/kbopub/zoeknaamfonetischform.html?searchWord=${history[i].queryStrings}&_oudeBenaming=on&pstcdeNPRP=&postgemeente1=&ondNP=true&_ondNP=on&ondRP=true&_ondRP=on&rechtsvormFonetic=ALL&vest=true&_vest=on&filterEnkelActieve=true&_filterEnkelActieve=on&actionNPRP=Zoek" target="_blank">${history[i].matches}</a></li>`;
      }
      if (i === history.length - 1 || history[i].date !== history[i + 1].date) {
        html += '</ul></article>';
      }
    }
  } else {
    html =
      '<article><p class="noresults">Er zijn geen oude zoekopdrachten teruggevonden.</p></article>';
  }

  historyNode.insertAdjacentHTML('beforeend', html);
  const btnDelete = document.getElementById('btn-delete');
  btnDelete.addEventListener('click', deleteHistory);
}

(function readHistory() {
  const KBOhistory = JSON.parse(localStorage.getItem('KBOhistory') || '[]');
  KBOhistory.reverse();
  renderPage(KBOhistory);
})();
