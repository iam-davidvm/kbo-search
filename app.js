const btnSearch = document.getElementById('btn-search');

function searchPage(pageContent) {
  const regExp =
    /(BE) [0-9]{4}.[0-9]{3}.[0-9]{3}|(BE)[0-9]{4}.[0-9]{3}.[0-9]{3}|(BE) [0-9]{4}[0-9]{3}[0-9]{3}|(BE)[0-9]{4}[0-9]{3}[0-9]{3}|(BE) [0-9]{4} [0-9]{3} [0-9]{3}|(BE)[0-9]{4} [0-9]{3} [0-9]{3}|[0-9]{4}.[0-9]{3}.[0-9]{3}/g;

  return pageContent.match(regExp);
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
          const match = searchPage(content);
          console.log(match);
        } else {
          console.log('something went wrong');
        }
      }
    );
  });
});
