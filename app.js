const btnSearch = document.getElementById('btn-search');

btnSearch.addEventListener('click', () => {
  const queryOptions = { active: true, currentWindow: true };

  chrome.tabs.query(queryOptions, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { task: 'kbosearch' },
      function (response) {
        if (!chrome.runtime.lastError) {
          const content = response;
          console.log(content);
        } else {
          console.log('something went wrong');
        }
      }
    );
  });
});
