!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("midata",[],e):"object"==typeof exports?exports.midata=e():t.midata=e()}(this,function(){return function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){"use strict";function n(t){for(var r in t)e.hasOwnProperty(r)||(e[r]=t[r])}var o=r(1);e.Midata=o.Midata,n(r(6));var i=r(6);e.resources=i},function(t,e,r){"use strict";var n=r(2),o=r(5),i=r(6),s=r(12),c=function(){function t(t,e,r){var i=this;this._host=t,this._appName=e,this._secret=r,this._create=function(t){var e=i._host+"/fhir/"+t.resourceType;return o.apiCall({jsonBody:!1,url:e,method:"POST",headers:{Authorization:"Bearer "+i._authToken,"Content-Type":"application/json+fhir;charset=utf-8"},payload:t})},this._update=function(t){var e=i._host+"/fhir/"+t.resourceType+"/"+t.id;return o.apiCall({jsonBody:!1,url:e,payload:t,headers:{Authorization:"Bearer "+i._authToken,"Content-Type":"application/json+fhir;charset=utf-8"},method:"PUT"})},this._refresh=function(){var t={appname:i._appName,secret:i._secret,refreshToken:i._refreshToken},e=o.apiCall({url:i._host+"/v1/auth",method:"POST",payload:t,jsonBody:!0,headers:{"Content-Type":"application/json"}}).then(function(t){var e=t.body;return i._authToken=e.authToken,i._refreshToken=e.refreshToken,e}).catch(function(t){return n.Promise.reject(t.body)});return e}}return Object.defineProperty(t.prototype,"loggedIn",{get:function(){return void 0!==this._authToken},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"authToken",{get:function(){return this._authToken},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"refreshToken",{get:function(){return this._refreshToken},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"user",{get:function(){return this._user},enumerable:!0,configurable:!0}),t.prototype.logout=function(){this._user=void 0,this._refreshToken=void 0,this._authToken=void 0},t.prototype.login=function(t,e,r){var i=this;if(void 0===t||void 0===e)throw new Error("You need to supply a username and a password!");var s={username:t,password:e,appname:this._appName,secret:this._secret};void 0!==r&&(s.role=r);var c=o.apiCall({url:this._host+"/v1/auth",method:"POST",headers:{"Content-Type":"application/json"},jsonBody:!0,payload:s}).then(function(e){var r=e.body;return i._authToken=r.authToken,i._refreshToken=r.refreshToken,i._user={id:r.owner,name:t},r}).catch(function(t){return n.Promise.reject(t.body)});return c},t.prototype.save=function(t){if(void 0===this._authToken)throw new Error("Can't create records when no user logged in first.\n                Call login() before trying to create records.");var e;e=t instanceof i.Resource?t.toJson():t;var r=void 0===e.id,o=r?this._create:this._update;return o(e).then(function(t){return 201===t.status?t.body:200===t.status?t.body:n.Promise.reject("Unexpected response status code: "+t.status)}).catch(function(t){return 400===t.status?n.Promise.reject("Resource could not be parsed or failed basic FHIR validation rules."):404===t.status?n.Promise.reject("Resource type not supported or not a valid FHIR end-point."):422===t.status?n.Promise.reject("The proposed resource violated applicable FHIR profiles or server business rules.\nMore details should be contained in the error message:\n"+t.body):500===t.status?n.Promise.reject(t.body):n.Promise.reject("Unexpected error response status code: "+t.status)})},t.prototype.search=function(t,e){void 0===e&&(e={});var r=this._host+"/fhir/"+t;return this._search(r,e)},t.prototype._search=function(t,e){void 0===e&&(e={});var r=Object.keys(e).map(function(t){return t+"="+e[t]}),i=r.join("&");i=i&&"?"+i||"";var c=t+i;return o.apiCall({url:c,method:"GET",jsonBody:!0,headers:{Authorization:"Bearer "+this._authToken,"Content-Type":"application/json+fhir;charset=utf-8"}}).then(function(t){if(void 0!==t.body.entry){var e=t.body.entry,r=e.map(function(t){return s.fromFhir(t.resource)});return r}return[]}).catch(function(t){return n.Promise.reject(t)})},t}();e.Midata=c},function(t,e,r){(function(e,n){!function(e,r){t.exports=r()}(this,function(){"use strict";function t(t){return"function"==typeof t||"object"==typeof t&&null!==t}function o(t){return"function"==typeof t}function i(t){G=t}function s(t){K=t}function c(){return function(){return e.nextTick(l)}}function u(){return"undefined"!=typeof z?function(){z(l)}:p()}function a(){var t=0,e=new Z(l),r=document.createTextNode("");return e.observe(r,{characterData:!0}),function(){r.data=t=++t%2}}function f(){var t=new MessageChannel;return t.port1.onmessage=l,function(){return t.port2.postMessage(0)}}function p(){var t=setTimeout;return function(){return t(l,1)}}function l(){for(var t=0;t<Y;t+=2){var e=rt[t],r=rt[t+1];e(r),rt[t]=void 0,rt[t+1]=void 0}Y=0}function h(){try{var t=r(4);return z=t.runOnLoop||t.runOnContext,u()}catch(t){return p()}}function d(t,e){var r=arguments,n=this,o=new this.constructor(v);void 0===o[ot]&&H(o);var i=n._state;return i?!function(){var t=r[i-1];K(function(){return B(i,o,t,n._result)})}():S(n,o,t,e),o}function y(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var r=new e(v);return T(r,t),r}function v(){}function g(){return new TypeError("You cannot resolve a promise with itself")}function m(){return new TypeError("A promises callback cannot return that same promise.")}function _(t){try{return t.then}catch(t){return ut.error=t,ut}}function b(t,e,r,n){try{t.call(e,r,n)}catch(t){return t}}function w(t,e,r){K(function(t){var n=!1,o=b(r,e,function(r){n||(n=!0,e!==r?T(t,r):R(t,r))},function(e){n||(n=!0,x(t,e))},"Settle: "+(t._label||" unknown promise"));!n&&o&&(n=!0,x(t,o))},t)}function O(t,e){e._state===st?R(t,e._result):e._state===ct?x(t,e._result):S(e,void 0,function(e){return T(t,e)},function(e){return x(t,e)})}function j(t,e,r){e.constructor===t.constructor&&r===d&&e.constructor.resolve===y?O(t,e):r===ut?x(t,ut.error):void 0===r?R(t,e):o(r)?w(t,e,r):R(t,e)}function T(e,r){e===r?x(e,g()):t(r)?j(e,r,_(r)):R(e,r)}function P(t){t._onerror&&t._onerror(t._result),k(t)}function R(t,e){t._state===it&&(t._result=e,t._state=st,0!==t._subscribers.length&&K(k,t))}function x(t,e){t._state===it&&(t._state=ct,t._result=e,K(P,t))}function S(t,e,r,n){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+st]=r,o[i+ct]=n,0===i&&t._state&&K(k,t)}function k(t){var e=t._subscribers,r=t._state;if(0!==e.length){for(var n=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)n=e[s],o=e[s+r],n?B(r,n,o,i):o(i);t._subscribers.length=0}}function C(){this.error=null}function A(t,e){try{return t(e)}catch(t){return at.error=t,at}}function B(t,e,r,n){var i=o(r),s=void 0,c=void 0,u=void 0,a=void 0;if(i){if(s=A(r,n),s===at?(a=!0,c=s.error,s=null):u=!0,e===s)return void x(e,m())}else s=n,u=!0;e._state!==it||(i&&u?T(e,s):a?x(e,c):t===st?R(e,s):t===ct&&x(e,s))}function M(t,e){try{e(function(e){T(t,e)},function(e){x(t,e)})}catch(e){x(t,e)}}function E(){return ft++}function H(t){t[ot]=ft++,t._state=void 0,t._result=void 0,t._subscribers=[]}function L(t,e){this._instanceConstructor=t,this.promise=new t(v),this.promise[ot]||H(this.promise),J(e)?(this._input=e,this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?R(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&R(this.promise,this._result))):x(this.promise,D())}function D(){return new Error("Array Methods must be provided an Array")}function V(t){return new L(this,t).promise}function I(t){var e=this;return new e(J(t)?function(r,n){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(r,n)}:function(t,e){return e(new TypeError("You must pass an array to race."))})}function F(t){var e=this,r=new e(v);return x(r,t),r}function N(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function Q(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function U(t){this[ot]=E(),this._result=this._state=void 0,this._subscribers=[],v!==t&&("function"!=typeof t&&N(),this instanceof U?M(this,t):Q())}function W(){var t=void 0;if("undefined"!=typeof n)t=n;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var e=t.Promise;if(e){var r=null;try{r=Object.prototype.toString.call(e.resolve())}catch(t){}if("[object Promise]"===r&&!e.cast)return}t.Promise=U}var q=void 0;q=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var J=q,Y=0,z=void 0,G=void 0,K=function(t,e){rt[Y]=t,rt[Y+1]=e,Y+=2,2===Y&&(G?G(l):nt())},X="undefined"!=typeof window?window:void 0,$=X||{},Z=$.MutationObserver||$.WebKitMutationObserver,tt="undefined"==typeof self&&"undefined"!=typeof e&&"[object process]"==={}.toString.call(e),et="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,rt=new Array(1e3),nt=void 0;nt=tt?c():Z?a():et?f():void 0===X?h():p();var ot=Math.random().toString(36).substring(16),it=void 0,st=1,ct=2,ut=new C,at=new C,ft=0;return L.prototype._enumerate=function(){for(var t=this.length,e=this._input,r=0;this._state===it&&r<t;r++)this._eachEntry(e[r],r)},L.prototype._eachEntry=function(t,e){var r=this._instanceConstructor,n=r.resolve;if(n===y){var o=_(t);if(o===d&&t._state!==it)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(r===U){var i=new r(v);j(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new r(function(e){return e(t)}),e)}else this._willSettleAt(n(t),e)},L.prototype._settledAt=function(t,e,r){var n=this.promise;n._state===it&&(this._remaining--,t===ct?x(n,r):this._result[e]=r),0===this._remaining&&R(n,this._result)},L.prototype._willSettleAt=function(t,e){var r=this;S(t,void 0,function(t){return r._settledAt(st,e,t)},function(t){return r._settledAt(ct,e,t)})},U.all=V,U.race=I,U.resolve=y,U.reject=F,U._setScheduler=i,U._setAsap=s,U._asap=K,U.prototype={constructor:U,then:d,catch:function(t){return this.then(null,t)}},U.polyfill=W,U.Promise=U,U})}).call(e,r(3),function(){return this}())},function(t,e){function r(){throw new Error("setTimeout has not been defined")}function n(){throw new Error("clearTimeout has not been defined")}function o(t){if(f===setTimeout)return setTimeout(t,0);if((f===r||!f)&&setTimeout)return f=setTimeout,setTimeout(t,0);try{return f(t,0)}catch(e){try{return f.call(null,t,0)}catch(e){return f.call(this,t,0)}}}function i(t){if(p===clearTimeout)return clearTimeout(t);if((p===n||!p)&&clearTimeout)return p=clearTimeout,clearTimeout(t);try{return p(t)}catch(e){try{return p.call(null,t)}catch(e){return p.call(this,t)}}}function s(){y&&h&&(y=!1,h.length?d=h.concat(d):v=-1,d.length&&c())}function c(){if(!y){var t=o(s);y=!0;for(var e=d.length;e;){for(h=d,d=[];++v<e;)h&&h[v].run();v=-1,e=d.length}h=null,y=!1,i(t)}}function u(t,e){this.fun=t,this.array=e}function a(){}var f,p,l=t.exports={};!function(){try{f="function"==typeof setTimeout?setTimeout:r}catch(t){f=r}try{p="function"==typeof clearTimeout?clearTimeout:n}catch(t){p=n}}();var h,d=[],y=!1,v=-1;l.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];d.push(new u(t,e)),1!==d.length||y||o(c)},u.prototype.run=function(){this.fun.apply(null,this.array)},l.title="browser",l.browser=!0,l.env={},l.argv=[],l.version="",l.versions={},l.on=a,l.addListener=a,l.once=a,l.off=a,l.removeListener=a,l.removeAllListeners=a,l.emit=a,l.binding=function(t){throw new Error("process.binding is not supported")},l.cwd=function(){return"/"},l.chdir=function(t){throw new Error("process.chdir is not supported")},l.umask=function(){return 0}},function(t,e){},function(t,e,r){"use strict";function n(t){var e=t.url,r=t.method,n=t.payload,i=t.headers,s=t.jsonBody||!1;return new o.Promise(function(t,o){var c=new XMLHttpRequest;c.open(r,e,!0),i&&Object.keys(i).forEach(function(t){c.setRequestHeader(t,i[t])}),c.onreadystatechange=function(){if(4===this.readyState){var e=this.status;if(e>=200&&e<300){var r=void 0;r=s?JSON.parse(this.responseText):this.responseText,t({message:"Request successful",body:r,status:e})}else o({message:this.statusText,body:this.responseText,status:e})}},c.onerror=function(){o({message:"Network error",body:"",status:0})},void 0!==n?c.send(JSON.stringify(n)):c.send()})}var o=r(2);e.apiCall=n},function(t,e,r){"use strict";var n=r(7);e.Resource=n.Resource;var o=r(8);e.Observation=o.Observation;var i=r(9);e.BodyWeight=i.BodyWeight;var s=r(13);e.Temperature=s.Temperature;var c=r(14);e.HeartRate=c.HeartRate;var u=r(15);e.StepsCount=u.StepsCount;var a=r(16);e.BodyHeight=a.BodyHeight;var f=r(17);e.Questionnaire=f.Questionnaire;var p=r(18);e.BloodPressure=p.BloodPressure;var l=r(19);e.Media=l.Media;var h=r(20);e.ImageMedia=h.ImageMedia;var d=r(21);e.Laboratory=d.Laboratory;var y=r(22);e.Hemoglobin=y.Hemoglobin;var v=r(11);e.categories=v},function(t,e){"use strict";var r=function(){function t(t){this._fhir={},this._fhir.resourceType=t}return t.prototype.addProperty=function(t,e){this._fhir[t]=e},t.prototype.removeProperty=function(t){delete this._fhir[t]},t.prototype.toJson=function(){return this._fhir},Object.defineProperty(t.prototype,"id",{get:function(){return this._fhir.id},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"resourceType",{get:function(){return this._fhir.resourceType},enumerable:!0,configurable:!0}),t}();e.Resource=r},function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},o=r(7),i=function(t){function e(e,r,n,o){t.call(this,"Observation"),this.addProperty("status","final"),this.addProperty("code",n),this.addProperty("effectiveDateTime",r.toISOString()),this.addProperty("valueQuantity",e),this.addProperty("category",o)}return n(e,t),e}(o.Resource);e.Observation=i;var s=function(t){function e(e,r,n){t.call(this,"Observation"),this.addProperty("status","final"),this.addProperty("code",r),this.addProperty("effectiveDateTime",e.toISOString()),this.addProperty("component",[]),this.addProperty("category",n)}return n(e,t),e.prototype.addComponent=function(t){this._fhir.component.push(t)},e}(o.Resource);e.MultiObservation=s},function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},o=this&&this.__decorate||function(t,e,r,n){var o,i=arguments.length,s=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,n);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(s=(i<3?o(s):i>3?o(e,r,s):o(e,r))||s);return i>3&&s&&Object.defineProperty(e,r,s),s},i=r(10),s=r(12),c=function(t){function e(e,r){var n={value:e,unit:"kg",system:"http://unitsofmeasure.org"};t.call(this,n,r,{coding:[{system:"http://loinc.org",code:"3141-9",display:"Weight Measured"}]})}return n(e,t),e=o([s.registerResource("3141-9")],e)}(i.VitalSigns);e.BodyWeight=c},function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},o=r(11),i=r(8),s=function(t){function e(e,r,n){t.call(this,e,r,n,o.VitalSigns)}return n(e,t),e}(i.Observation);e.VitalSigns=s},function(t,e){"use strict";e.VitalSigns={coding:[{system:"http://hl7.org/fhir/observation-category",code:"vital-signs",display:"Vital Signs"}],text:"Vital Signs"},e.Laboratory={coding:[{system:"http://hl7.org/fhir/observation-category",code:"laboratory",display:"Laboratory"}],text:"Laboratory"}},function(t,e){"use strict";function r(t){return function(e){o[t]=e,i.cls=e}}function n(t){var e=void 0!==t.code&&void 0!==t.code.coding&&1==t.code.coding.length&&void 0!==t.code.coding[0].code;if(e){var r=t.code.coding[0].code,n=void 0!==o[r];if(n){var i={_fhir:t},s=o[r];return i.__proto__=s.prototype,i}return t}return t}var o={};e.registerResource=r,e.fromFhir=n;var i=window;i.fromFhir=n},function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},o=this&&this.__decorate||function(t,e,r,n){var o,i=arguments.length,s=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,n);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(s=(i<3?o(s):i>3?o(e,r,s):o(e,r))||s);return i>3&&s&&Object.defineProperty(e,r,s),s},i=r(10),s=r(12),c={coding:[{system:"http://acme.lab",code:"BT",display:"Body temperature"},{system:"http://loinc.org",code:"8310-5",display:"Body temperature"},{system:"http://snomed.info/sct",code:"56342008",display:"Temperature taking"}],text:"Body temperature"},u=function(t){function e(e,r){var n={value:e,unit:"degrees C",code:"258710007",system:"http://snomed.info/sct"};t.call(this,n,r,c)}return n(e,t),e=o([s.registerResource("258710007")],e)}(i.VitalSigns);e.Temperature=u},function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},o=this&&this.__decorate||function(t,e,r,n){var o,i=arguments.length,s=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,n);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(s=(i<3?o(s):i>3?o(e,r,s):o(e,r))||s);return i>3&&s&&Object.defineProperty(e,r,s),s},i=r(10),s=r(12),c=function(t){function e(e,r){var n={value:e,unit:"bpm"};t.call(this,n,r,{coding:[{system:"http://loinc.org",code:"8867-4",display:"Heart Rate"}]})}return n(e,t),e=o([s.registerResource("8867-4")],e)}(i.VitalSigns);e.HeartRate=c},function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},o=this&&this.__decorate||function(t,e,r,n){var o,i=arguments.length,s=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,n);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(s=(i<3?o(s):i>3?o(e,r,s):o(e,r))||s);return i>3&&s&&Object.defineProperty(e,r,s),s},i=r(10),s=r(12),c=function(t){function e(e,r){var n={value:e,unit:"steps"};t.call(this,n,r,{text:"Steps",coding:[{system:"http://midata.coop",code:"activities/steps",display:"Steps"}]})}return n(e,t),e=o([s.registerResource("activities/steps")],e)}(i.VitalSigns);e.StepsCount=c},function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},o=this&&this.__decorate||function(t,e,r,n){var o,i=arguments.length,s=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,n);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(s=(i<3?o(s):i>3?o(e,r,s):o(e,r))||s);return i>3&&s&&Object.defineProperty(e,r,s),s},i=r(10),s=r(12),c=function(t){function e(e,r){var n={value:e,unit:"cm",system:"http://unitsofmeasure.org"};t.call(this,n,r,{coding:[{system:"http://loinc.org",code:"8302-2",display:"Body Height"}]})}return n(e,t),e=o([s.registerResource("8302-2")],e)}(i.VitalSigns);e.BodyHeight=c},function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},o=r(7),i=function(t){function e(e){t.call(this,"Questionnaire"),this.addProperty("status","published")}return n(e,t),e}(o.Resource);e.Questionnaire=i},function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},o=this&&this.__decorate||function(t,e,r,n){var o,i=arguments.length,s=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,n);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(s=(i<3?o(s):i>3?o(e,r,s):o(e,r))||s);return i>3&&s&&Object.defineProperty(e,r,s),s},i=r(8),s=r(11),c=r(12),u=function(t){function e(e,r,n){var o={coding:[{system:"http://loinc.org",code:"55417-0",display:"Blood Pressure"}]};t.call(this,n,o,s.VitalSigns),this.addComponent({code:{coding:[{system:"http://loinc.org",code:"8480-6",display:"Systolic blood pressure"}]},valueQuantity:{value:e,unit:"mm[Hg]"}}),this.addComponent({code:{coding:[{system:"http://loinc.org",code:"8462-4",display:"Diastolic blood pressure"}]},valueQuantity:{value:r,unit:"mm[Hg]"}})}return n(e,t),e=o([c.registerResource("55417-0")],e)}(i.MultiObservation);e.BloodPressure=u},function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},o=r(7),i=function(t){function e(e,r,n,o){t.call(this,"Media"),this.addProperty("type",r),this.addProperty("content",{contentType:n,data:o,title:e})}return n(e,t),e}(o.Resource);e.Media=i},function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},o=r(19),i=["png","gif","jpg"],s=function(t){function e(e,r){var n,o=e.match(/\.(\w+)$/);if(null===o)throw new Error("The filename requires a file extension!");if(n=o[1].toLowerCase(),i.indexOf(n)===-1)throw new Error("Unsupported type: "+n);t.call(this,e,"photo","image/"+n,r)}return n(e,t),e}(o.Media);e.ImageMedia=s},function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},o=r(11),i=r(8),s=function(t){function e(e,r,n){t.call(this,e,r,n,o.Laboratory)}return n(e,t),e}(i.Observation);e.Laboratory=s},function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},o=this&&this.__decorate||function(t,e,r,n){var o,i=arguments.length,s=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,n);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(s=(i<3?o(s):i>3?o(e,r,s):o(e,r))||s);return i>3&&s&&Object.defineProperty(e,r,s),s},i=r(21),s=r(12),c=function(t){function e(e,r){var n={value:e,unit:"g/dL"};t.call(this,n,r,{coding:[{system:"http://loinc.org",code:"718-7",display:"Hemoglobin"}]})}return n(e,t),e=o([s.registerResource("718-7")],e)}(i.Laboratory);e.Hemoglobin=c}])});
//# sourceMappingURL=midata.js.map