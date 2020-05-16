'use strict';

var contentNode = document.getElementById('contents');

var continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
var message = continents.map(function (c) {
  return 'Hello ' + c + '!<br />';
}).join(' ');

var component = React.createElement('p', { dangerouslySetInnerHTML: { __html: message } });

ReactDOM.render(component, contentNode);