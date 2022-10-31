# KBO Search

<p>This is a Chrome extension which allows the user to automatically search for a 'Ondernemingsnummer' (a unique number that is registered to a specific company) on the current web page. If there is a 'Ondernemingsnummer' it will create an URL with this 'Ondernemingsnummer' as the query string. If the 'Ondernemingsnummer' is not available it will take the name of the site or the second-level domain as its query string.</p>
<p>There is also a 'Geschiedenis' tab where a user can see his search history sorted from new to old and grouped by date.</p>
<p>The extension is made with JavaScript and used regular expressions to detect the 'Ondernemingsnummer'.</p>

## Links

- [Download](/files/ondernemingsnummer-zoeken.zip 'Download the extension')

<p>Currently the extension is not in the Chrome store yet. You can download the ZIP-file above and install it following <a href="https://bashvlas.com/blog/install-chrome-extension-in-developer-mode/">this manual</a>.</p>

## Screenshots

### Search Page

![Result with Ondernemingsnummer](/screenshots/search.png 'Result with Ondernemingsnummer')

![Result without Ondernemingsnummer](/screenshots/search_noONN.png 'Result without Ondernemingsnummer')

### History

![Overview previous search results](/screenshots/history.png 'Overview previous search results')

## Built With

![HTML](https://img.shields.io/badge/-HTML-orange 'HTML')

![CSS](https://img.shields.io/badge/-CSS-blue 'CSS')

![JavaScript](https://img.shields.io/badge/-JavaScript-yellow 'JavaScript')

## Sources

I briefly read about Chrome extensions, but I followed the tutorial below to get me started:

- [Tutorial by codepiep](https://www.youtube.com/watch?v=zatlOlVR8Ts 'Tutorial by codepiep')

## What I have learned

- As it was my first time creating a Chrome extension I learned a lot of this specific API.

- I wanted to check if a string contains a 'Ondernemingsnummer'. This can be formatted in different ways, so I have to look for a way to check a string against multiple regular expressions.

## Things I may change in the future

I am pretty proud with the current result, beause it does exactly what I had in mind and even a bit more. But it's never finished. The most important changes:

- If there is no 'Ondernemingsnummer' it could be interesting to add an input field, where a user can type his own query string.

- Now it works with a 'Ondernemingsnummer' only. I'm thinking about allowing a user to enter his own regular expression that he wants to look for on a page.

## Conclusion

> Although it is a rather simple extension, I think it could be very useful and efficient extension. And it was an interesting project to learn a bit more about Chrome extensions.
