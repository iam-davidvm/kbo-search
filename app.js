const btnSearch = document.getElementById('btn-search');

btnSearch.addEventListener('click', () => {
  const queryOptions = { active: true, currentWindow: true };

  chrome.tabs.query(queryOptions, (tabs) => {
    console.log(tabs[0].id);
    chrome.tabs.sendMessage(
      tabs[0].id,
      { task: 'kbosearch' },
      function (response) {
        console.log(response.status);
      }
    );
  });
});
