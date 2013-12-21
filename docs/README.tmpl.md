{%= description %}
------------------

A bookmarklet that exports an Excel compatible CSV of the first 1000 people (with all their properties) from `Mixpanel > People > Explore`.

- Create a favorite
- Change the favorite URL with `bookmarklet.js` content
- Save it
- Open Mixpanel
- Click on **Explore**
- Click on the favorite
- Enjoy

Tested in Chrome 31+.

### Bookmarklet.js content

```javascript
{%= bookmarklet() %}
```

### Options
If necessary you can change the `filterCol` function body to filter columns based on their names.

### Troubleshooting

- Check you allowed popup in Mixpanel.
- Open the JavaScript console to investigate where the issue could be.
