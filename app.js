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

function renderMatches(matches, name) {
  let html = '';
  if (matches) {
    html =
      '<h2>Resultaten:</h2><ul>' +
      matches
        .map(
          (match) =>
            `<li><a href="https://kbopub.economie.fgov.be/kbopub/zoeknummerform.html?nummer=${match.replaceAll(
              '.',
              '+'
            )}&actionLu=Zoek" target="_blank">${name} - ${match}</a></li>`
        )
        .join('') +
      '</ul>';
  } else {
    html = `<h2>Resultaten:</h2><ul><li><a href="https://kbopub.economie.fgov.be/kbopub/zoeknaamfonetischform.html?searchWord=${name.replaceAll(
      ' ',
      '%20'
    )}&_oudeBenaming=on&pstcdeNPRP=&postgemeente1=&ondNP=true&_ondNP=on&ondRP=true&_ondRP=on&rechtsvormFonetic=ALL&vest=true&_vest=on&filterEnkelActieve=true&_filterEnkelActieve=on&actionNPRP=Zoek" target="_blank">${name}</a></li><ul>`;
  }
  const results = document.querySelector('.results');
  results.innerHTML = html;
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
          if (matches) {
            matches = cleanNumber(matches);
          }
          renderMatches(matches, response.info);
        } else {
          console.log('something went wrong');
        }
      }
    );
  });
});
