const btnSearch = document.getElementById('btn-search');

function searchPage(pageContent) {
  const regExp =
    /(BE) [0-9]{4}.[0-9]{3}.[0-9]{3}|(BE)[0-9]{4}.[0-9]{3}.[0-9]{3}|(BE) [0-9]{4}[0-9]{3}[0-9]{3}|(BE)[0-9]{4}[0-9]{3}[0-9]{3}|(BE) [0-9]{4} [0-9]{3} [0-9]{3}|(BE)[0-9]{4} [0-9]{3} [0-9]{3}|[0-9]{4}.[0-9]{3}.[0-9]{3}/g;

  return pageContent.match(regExp);
}

function cleanNumber(numbers) {
  return numbers.map((number) =>
    number.replaceAll('BE ', '').replaceAll(' ', '.').replaceAll('BE', '')
  );
}

function renderMatches(queryStrings, matches, hasONnummer) {
  let html = '';
  if (hasONnummer) {
    html =
      '<h2>Resultaten:</h2><ul>' +
      matches
        .map(
          (match) =>
            `<li><a href="https://kbopub.economie.fgov.be/kbopub/zoeknummerform.html?nummer=${queryStrings}&actionLu=Zoek" target="_blank">${match}</a></li>`
        )
        .join('') +
      '</ul>';
  } else {
    html = `<h2>Resultaten:</h2><ul><li><a href="https://kbopub.economie.fgov.be/kbopub/zoeknaamfonetischform.html?searchWord=${queryStrings}&_oudeBenaming=on&pstcdeNPRP=&postgemeente1=&ondNP=true&_ondNP=on&ondRP=true&_ondRP=on&rechtsvormFonetic=ALL&vest=true&_vest=on&filterEnkelActieve=true&_filterEnkelActieve=on&actionNPRP=Zoek" target="_blank">${matches}</a></li><ul>`;
  }
  const results = document.querySelector('.results');
  results.innerHTML = html;
}

function saveSearch(queryStrings, matches, hasONnummer) {
  const date = Date.now();
  const search = {
    queryStrings,
    matches,
    hasONnummer,
    date,
  };
  const KBOhistory = JSON.parse(localStorage.getItem('KBOhistory') || '[]');
  KBOhistory.push(search);
  localStorage.setItem('KBOhistory', JSON.stringify(KBOhistory));
}

btnSearch.addEventListener('click', () => {
  const queryOptions = { active: true, currentWindow: true };

  chrome.tabs.query(queryOptions, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { task: 'kbosearch' },
      function (response) {
        if (!chrome.runtime.lastError) {
          const content = response.content.replaceAll(/\\n/g, ' ');
          let matches = searchPage(content);
          let queryStrings = [];
          let hasONnummer = true;
          if (matches) {
            matches = cleanNumber(matches);
            queryStrings = [...matches];
            matches = matches.map((match) => `${response.info} - ${match}`);
            queryStrings = queryStrings.map(
              (queryString) => `${queryString.replaceAll(' ', '%20')}`
            );
          } else {
            matches = [response.info];
            queryStrings = [...matches];
            queryStrings = queryStrings.map(
              (queryString) => `${queryString.replaceAll('.', '+')}`
            );
            hasONnummer = false;
          }
          renderMatches(queryStrings, matches, hasONnummer);
          saveSearch(queryStrings, matches, hasONnummer);
        } else {
          console.log('something went wrong');
        }
      }
    );
  });
});
