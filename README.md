Export Mixpanel people properties to an Excel Compatible CSV
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
!function(){var a=/report\/([^\/]*)\//.exec(document.location.href)[1],b=function(a){return-1===a.indexOf("msgCount_")},c=function(b){return"https://mixpanel.com/report/"+a+"/explore/#user?distinct_id="+b},d=function(){var a=mp.report.explore.models.records.toJSON();return _.pluck(a,"properties").map(function(b,d){return b.$id=a[d].id,b.url=c(b.$id),b})},e=function(a,b){return b=b||DATA,a=a||function(){return!0},b.reduce(function(b,c){return Object.keys(c).map(function(c){a(c)&&-1===b.indexOf(c)&&b.push(c)}),b},[])},f=function(a){return a.replace(/\\/g,"\\\\").replace(/\u0008/g,"\\b").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\f/g,"\\f").replace(/\r/g,"\\r").replace(/'/g,"\\'").replace(/"/g,'\\"')},g=function(a){return"number"==typeof a?a:'"'+f(String(a))+'"'},h=function(a,b){b=b||DATA;var c=b.map(function(b){return a.map(function(a){return b[a]||""})});return[a].concat(c)},i=function(a,b){return b=b||g,a.map(function(a){return a.map(function(a){return b(a)}).join(";")}).join("\n")},j=function(a){return a.split("").map(function(b,c){return a.charCodeAt(c)>255?"?":b}).join("")},k=d(),l=i(h(e(b,k),k));window.open("data:text/csv;base64,"+btoa(j(l)))}();
```

### Options

- Change the `filterCol` function body to filter columns based on their names.

### Troubleshooting

- Check you allowed popup in Mixpanel.
- Open the JavaScript console to investigate where the issue could be.
