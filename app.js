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

function renderMatches(matches) {
  html =
    '<h2>Resultaten:</h2><ul>' +
    matches
      .map(
        (match) =>
          `<li><a href="https://kbopub.economie.fgov.be/kbopub/zoeknummerform.html?nummer=${match.replaceAll(
            '.',
            '+'
          )}&actionLu=Zoek" target="_blank">${match}</a></li>`
      )
      .join('') +
    '</ul>';
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
          const content = response.replaceAll(/\\n/g, ' ');
          let matches = searchPage(content);
          matches = cleanNumber(matches);
          renderMatches(matches);
        } else {
          console.log('something went wrong');
        }
      }
    );
  });
});
