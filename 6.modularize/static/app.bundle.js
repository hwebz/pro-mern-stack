!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function c(e,t){return(c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function u(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=l(e);if(t){var o=l(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return a(this,n)}}function a(e,t){return!t||"object"!==r(t)&&"function"!=typeof t?i(e):t}function i(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}n.r(t);var f=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&c(e,t)}(l,React.Component);var t,n,r,a=u(l);function l(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),(e=a.call(this)).handleSubmit=e.handleSubmit.bind(i(e)),e}return t=l,(n=[{key:"handleSubmit",value:function(e){e.preventDefault();var t=document.forms.issueAdd;this.props.createIssue({owner:t.owner.value,title:t.title.value,status:"New",created:new Date}),t.owner.value="",t.title.value=""}},{key:"render",value:function(){return React.createElement("div",null,React.createElement("form",{name:"issueAdd",onSubmit:this.handleSubmit},React.createElement("input",{type:"text",name:"owner",placeholder:"Owner"}),React.createElement("input",{type:"text",name:"title",placeholder:"Title"}),React.createElement("button",{type:"submit"},"Add")))}}])&&o(t.prototype,n),r&&o(t,r),l}();function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function d(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=h(e);if(t){var o=h(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return b(this,n)}}function b(e,t){return!t||"object"!==s(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var v=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(c,React.Component);var t,n,r,o=d(c);function c(){return p(this,c),o.apply(this,arguments)}return t=c,(n=[{key:"render",value:function(){return React.createElement("div",null,"This is a placeholder for the Issue Filter.")}}])&&y(t.prototype,n),r&&y(t,r),c}();function R(e){return(R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function E(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function O(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function w(e,t,n){return t&&O(e.prototype,t),n&&O(e,n),e}function S(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}function _(e,t){return(_=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function g(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=P(e);if(t){var o=P(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return j(this,n)}}function j(e,t){return!t||"object"!==R(t)&&"function"!=typeof t?D(e):t}function D(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function P(e){return(P=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var T=function(e){return React.createElement("tr",null,React.createElement("td",null,e.issue._id),React.createElement("td",null,e.issue.status),React.createElement("td",null,e.issue.owner),React.createElement("td",null,e.issue.created.toDateString()),React.createElement("td",null,e.issue.effort),React.createElement("td",null,e.issue.completionDate?e.issue.completionDate.toDateString():""),React.createElement("td",null,e.issue.title))},k=function(e){S(n,React.Component);var t=g(n);function n(){return E(this,n),t.apply(this,arguments)}return w(n,[{key:"render",value:function(){var e=this.props.issues.map((function(e){return React.createElement(T,{key:e._id,issue:e})}));return React.createElement("table",{className:"bordered-table"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",null,"ID"),React.createElement("th",null,"Status"),React.createElement("th",null,"Owner"),React.createElement("th",null,"Created"),React.createElement("th",null,"Effort"),React.createElement("th",null,"Completion"),React.createElement("th",null,"Title"))),React.createElement("tbody",null,e))}}]),n}(),x=function(e){S(n,React.Component);var t=g(n);function n(){var e;return E(this,n),(e=t.call(this)).state={issues:[]},e.createIssue=e.createIssue.bind(D(e)),e}return w(n,[{key:"componentDidMount",value:function(){this.loadData()}},{key:"loadData",value:function(){var e=this;fetch("/api/issues").then((function(e){return e.json()})).then((function(t){console.log("Total count of records: ".concat(t._metadata.total_count)),t.records.forEach((function(e){e.created=new Date(e.created),e.completionDate&&(e.completionDate=new Date(e.completionDate))})),e.setState({issues:t.records})})).catch((function(e){console.log(e)}))}},{key:"createIssue",value:function(e){var t=this;fetch("/api/issues",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((function(e){e.ok?e.json().then((function(e){e.created=new Date(e.created),e.completionDate&&(e.completionDate=new Date(e.completionDate));var n=t.state.issues.concat(e);t.setState({issues:n})})):e.json().then((function(e){alert("Failed to add issue: ".concat(e.message))}))})).catch((function(e){alert("Error in sending data to server: ".concat(e.message))}))}},{key:"createTestIssue",value:function(){this.createIssue({status:"New",owner:"Pieta",created:new Date,title:"Completion date should be optional"})}},{key:"render",value:function(){return React.createElement("div",null,React.createElement("h1",null,"Issue Tracker"),React.createElement(v,null),React.createElement("hr",null),React.createElement(k,{issues:this.state.issues}),React.createElement("hr",null),React.createElement(f,{createIssue:this.createIssue}))}}]),n}();ReactDOM.render(React.createElement(x,null),document.getElementById("contents"))}]);