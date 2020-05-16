var contentNode = document.getElementById('contents');

const  continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
const message = continents.map(c => `Hello ${c}!<br />`).join(' ');

const component = <p dangerouslySetInnerHTML={{__html: message}}></p>

ReactDOM.render(component, contentNode);