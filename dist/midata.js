!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("midata",[],e):"object"==typeof exports?exports.midata=e():t.midata=e()}(this,function(){return function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){"use strict";function n(t){for(var r in t)e.hasOwnProperty(r)||(e[r]=t[r])}var o=r(1);e.Midata=o.Midata,n(r(6))},function(t,e,r){"use strict";var n=r(2),o=r(5),i=r(6),s=r(10),u=function(){function t(t,e,r){var i=this;this._host=t,this._appName=e,this._secret=r,this._create=function(t){var e=i._host+"/fhir/"+t.resourceType;return o.apiCall({jsonBody:!1,url:e,method:"POST",headers:{Authorization:"Bearer "+i._authToken,"Content-Type":"application/json+fhir;charset=utf-8"},payload:t})},this._update=function(t){var e=i._host+"/fhir/"+t.resourceType+"/"+t.id;return o.apiCall({jsonBody:!1,url:e,payload:t,headers:{Authorization:"Bearer "+i._authToken,"Content-Type":"application/json+fhir;charset=utf-8"},method:"PUT"})},this._refresh=function(){var t={appname:i._appName,secret:i._secret,refreshToken:i._refreshToken},e=o.apiCall({url:i._host+"/v1/auth",method:"POST",payload:t,jsonBody:!0,headers:{"Content-Type":"application/json"}}).then(function(t){var e=t.body;return i._authToken=e.authToken,i._refreshToken=e.refreshToken,e}).catch(function(t){return n.Promise.reject(t.body)});return e}}return Object.defineProperty(t.prototype,"loggedIn",{get:function(){return void 0!==this._authToken},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"authToken",{get:function(){return this._authToken},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"refreshToken",{get:function(){return this._refreshToken},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"user",{get:function(){return this._user},enumerable:!0,configurable:!0}),t.prototype.logout=function(){this._user=void 0,this._refreshToken=void 0,this._authToken=void 0},t.prototype.login=function(t,e,r){var i=this;if(void 0===t||void 0===e)throw new Error("You need to supply a username and a password!");var s={username:t,password:e,appname:this._appName,secret:this._secret};void 0!==r&&(s.role=r);var u=o.apiCall({url:this._host+"/v1/auth",method:"POST",headers:{"Content-Type":"application/json"},jsonBody:!0,payload:s}).then(function(e){var r=e.body;return i._authToken=r.authToken,i._refreshToken=r.refreshToken,i._user={name:t},r}).catch(function(t){return n.Promise.reject(t.body)});return u},t.prototype.save=function(t){if(void 0===this._authToken)throw new Error("Can't create records when no user logged in first.\n                Call login() before trying to create records.");var e;e=t instanceof i.Resource?t.toJson():t;var r=void 0===e.id,o=r?this._create:this._update;return o(e).then(function(t){return 201===t.status?t.body:200===t.status?t.body:n.Promise.reject("Unexpected response status code: "+t.status)}).catch(function(t){return 400===t.status?n.Promise.reject("Resource could not be parsed or failed basic FHIR validation rules."):404===t.status?n.Promise.reject("Resource type not supported or not a valid FHIR end-point."):422===t.status?n.Promise.reject("The proposed resource violated applicable FHIR profiles\n                    or server business rules. More details should be contained\n                    in the error message."):500===t.status?n.Promise.reject(t.body):n.Promise.reject("Unexpected error response status code: "+t.status)})},t.prototype.search=function(t,e){void 0===e&&(e={});var r=Object.keys(e).map(function(t){return t+"="+e[t]}),i=r.join("&");i=i&&"?"+i||"";var u=this._host+"/fhir/"+t+i;return o.apiCall({url:u,method:"GET",headers:{Authorization:"Bearer "+this._authToken,"Content-Type":"application/json+fhir;charset=utf-8"}}).then(function(t){var e=[];if(t.body.entry){var r=t.body.entry;e=r.map(function(t){return s.fromFhir(t.resource)})}return e}).catch(function(t){return n.Promise.reject(t.body)})},t}();e.Midata=u},function(t,e,r){(function(e,n){!function(e,r){t.exports=r()}(this,function(){"use strict";function t(t){return"function"==typeof t||"object"==typeof t&&null!==t}function o(t){return"function"==typeof t}function i(t){K=t}function s(t){X=t}function u(){return function(){return e.nextTick(p)}}function a(){return"undefined"!=typeof G?function(){G(p)}:h()}function c(){var t=0,e=new $(p),r=document.createTextNode("");return e.observe(r,{characterData:!0}),function(){r.data=t=++t%2}}function f(){var t=new MessageChannel;return t.port1.onmessage=p,function(){return t.port2.postMessage(0)}}function h(){var t=setTimeout;return function(){return t(p,1)}}function p(){for(var t=0;t<z;t+=2){var e=rt[t],r=rt[t+1];e(r),rt[t]=void 0,rt[t+1]=void 0}z=0}function l(){try{var t=r(4);return G=t.runOnLoop||t.runOnContext,a()}catch(t){return h()}}function d(t,e){var r=arguments,n=this,o=new this.constructor(v);void 0===o[ot]&&H(o);var i=n._state;return i?!function(){var t=r[i-1];X(function(){return B(i,o,t,n._result)})}():R(n,o,t,e),o}function y(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var r=new e(v);return O(r,t),r}function v(){}function m(){return new TypeError("You cannot resolve a promise with itself")}function _(){return new TypeError("A promises callback cannot return that same promise.")}function b(t){try{return t.then}catch(t){return at.error=t,at}}function g(t,e,r,n){try{t.call(e,r,n)}catch(t){return t}}function w(t,e,r){X(function(t){var n=!1,o=g(r,e,function(r){n||(n=!0,e!==r?O(t,r):k(t,r))},function(e){n||(n=!0,x(t,e))},"Settle: "+(t._label||" unknown promise"));!n&&o&&(n=!0,x(t,o))},t)}function T(t,e){e._state===st?k(t,e._result):e._state===ut?x(t,e._result):R(e,void 0,function(e){return O(t,e)},function(e){return x(t,e)})}function j(t,e,r){e.constructor===t.constructor&&r===d&&e.constructor.resolve===y?T(t,e):r===at?x(t,at.error):void 0===r?k(t,e):o(r)?w(t,e,r):k(t,e)}function O(e,r){e===r?x(e,m()):t(r)?j(e,r,b(r)):k(e,r)}function P(t){t._onerror&&t._onerror(t._result),C(t)}function k(t,e){t._state===it&&(t._result=e,t._state=st,0!==t._subscribers.length&&X(C,t))}function x(t,e){t._state===it&&(t._state=ut,t._result=e,X(P,t))}function R(t,e,r,n){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+st]=r,o[i+ut]=n,0===i&&t._state&&X(C,t)}function C(t){var e=t._subscribers,r=t._state;if(0!==e.length){for(var n=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)n=e[s],o=e[s+r],n?B(r,n,o,i):o(i);t._subscribers.length=0}}function A(){this.error=null}function S(t,e){try{return t(e)}catch(t){return ct.error=t,ct}}function B(t,e,r,n){var i=o(r),s=void 0,u=void 0,a=void 0,c=void 0;if(i){if(s=S(r,n),s===ct?(c=!0,u=s.error,s=null):a=!0,e===s)return void x(e,_())}else s=n,a=!0;e._state!==it||(i&&a?O(e,s):c?x(e,u):t===st?k(e,s):t===ut&&x(e,s))}function E(t,e){try{e(function(e){O(t,e)},function(e){x(t,e)})}catch(e){x(t,e)}}function M(){return ft++}function H(t){t[ot]=ft++,t._state=void 0,t._result=void 0,t._subscribers=[]}function F(t,e){this._instanceConstructor=t,this.promise=new t(v),this.promise[ot]||H(this.promise),q(e)?(this._input=e,this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?k(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&k(this.promise,this._result))):x(this.promise,D())}function D(){return new Error("Array Methods must be provided an Array")}function N(t){return new F(this,t).promise}function Q(t){var e=this;return new e(q(t)?function(r,n){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(r,n)}:function(t,e){return e(new TypeError("You must pass an array to race."))})}function L(t){var e=this,r=new e(v);return x(r,t),r}function W(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function Y(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function I(t){this[ot]=M(),this._result=this._state=void 0,this._subscribers=[],v!==t&&("function"!=typeof t&&W(),this instanceof I?E(this,t):Y())}function J(){var t=void 0;if("undefined"!=typeof n)t=n;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var e=t.Promise;if(e){var r=null;try{r=Object.prototype.toString.call(e.resolve())}catch(t){}if("[object Promise]"===r&&!e.cast)return}t.Promise=I}var U=void 0;U=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var q=U,z=0,G=void 0,K=void 0,X=function(t,e){rt[z]=t,rt[z+1]=e,z+=2,2===z&&(K?K(p):nt())},V="undefined"!=typeof window?window:void 0,Z=V||{},$=Z.MutationObserver||Z.WebKitMutationObserver,tt="undefined"==typeof self&&"undefined"!=typeof e&&"[object process]"==={}.toString.call(e),et="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,rt=new Array(1e3),nt=void 0;nt=tt?u():$?c():et?f():void 0===V?l():h();var ot=Math.random().toString(36).substring(16),it=void 0,st=1,ut=2,at=new A,ct=new A,ft=0;return F.prototype._enumerate=function(){for(var t=this.length,e=this._input,r=0;this._state===it&&r<t;r++)this._eachEntry(e[r],r)},F.prototype._eachEntry=function(t,e){var r=this._instanceConstructor,n=r.resolve;if(n===y){var o=b(t);if(o===d&&t._state!==it)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(r===I){var i=new r(v);j(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new r(function(e){return e(t)}),e)}else this._willSettleAt(n(t),e)},F.prototype._settledAt=function(t,e,r){var n=this.promise;n._state===it&&(this._remaining--,t===ut?x(n,r):this._result[e]=r),0===this._remaining&&k(n,this._result)},F.prototype._willSettleAt=function(t,e){var r=this;R(t,void 0,function(t){return r._settledAt(st,e,t)},function(t){return r._settledAt(ut,e,t)})},I.all=N,I.race=Q,I.resolve=y,I.reject=L,I._setScheduler=i,I._setAsap=s,I._asap=X,I.prototype={constructor:I,then:d,catch:function(t){return this.then(null,t)}},I.polyfill=J,I.Promise=I,I})}).call(e,r(3),function(){return this}())},function(t,e){function r(){throw new Error("setTimeout has not been defined")}function n(){throw new Error("clearTimeout has not been defined")}function o(t){if(f===setTimeout)return setTimeout(t,0);if((f===r||!f)&&setTimeout)return f=setTimeout,setTimeout(t,0);try{return f(t,0)}catch(e){try{return f.call(null,t,0)}catch(e){return f.call(this,t,0)}}}function i(t){if(h===clearTimeout)return clearTimeout(t);if((h===n||!h)&&clearTimeout)return h=clearTimeout,clearTimeout(t);try{return h(t)}catch(e){try{return h.call(null,t)}catch(e){return h.call(this,t)}}}function s(){y&&l&&(y=!1,l.length?d=l.concat(d):v=-1,d.length&&u())}function u(){if(!y){var t=o(s);y=!0;for(var e=d.length;e;){for(l=d,d=[];++v<e;)l&&l[v].run();v=-1,e=d.length}l=null,y=!1,i(t)}}function a(t,e){this.fun=t,this.array=e}function c(){}var f,h,p=t.exports={};!function(){try{f="function"==typeof setTimeout?setTimeout:r}catch(t){f=r}try{h="function"==typeof clearTimeout?clearTimeout:n}catch(t){h=n}}();var l,d=[],y=!1,v=-1;p.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];d.push(new a(t,e)),1!==d.length||y||o(u)},a.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=c,p.addListener=c,p.once=c,p.off=c,p.removeListener=c,p.removeAllListeners=c,p.emit=c,p.binding=function(t){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(t){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},function(t,e){},function(t,e,r){"use strict";function n(t){var e=t.url,r=t.method,n=t.payload,i=t.headers,s=t.jsonBody||!1;return new o.Promise(function(t,o){var u=new XMLHttpRequest;u.open(r,e,!0),i&&Object.keys(i).forEach(function(t){u.setRequestHeader(t,i[t])}),u.onreadystatechange=function(){if(4===this.readyState){var e=this.status;if(e>=200&&e<300){var r=void 0;r=s?JSON.parse(this.responseText):this.responseText,t({message:"Request successful",body:r,status:e})}else o({message:this.statusText,body:this.responseText,status:e})}},u.onerror=function(){o({message:"Network error",body:"",status:0})},void 0!==n?u.send(JSON.stringify(n)):u.send()})}var o=r(2);e.apiCall=n},function(t,e,r){"use strict";var n=r(7);e.Resource=n.Resource;var o=r(8);e.Observation=o.Observation;var i=r(9);e.BodyWeight=i.BodyWeight;var s=r(11);e.Temperature=s.Temperature;var u=r(12);e.HeartRate=u.HeartRate;var a=r(13);e.StepsCount=a.StepsCount;var c=r(14);e.BodyHeight=c.BodyHeight;var f=r(15);e.Questionnaire=f.Questionnaire;var h=r(16);e.BloodPressure=h.BloodPressure},function(t,e){"use strict";var r=function(){function t(t){this._fhir={},this._fhir.resourceType=t}return t.prototype.addProperty=function(t,e){this._fhir[t]=e},t.prototype.removeProperty=function(t){delete this._fhir[t]},t.prototype.toJson=function(){return this._fhir},Object.defineProperty(t.prototype,"id",{get:function(){return this._fhir.id},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"resourceType",{get:function(){return this._fhir.resourceType},enumerable:!0,configurable:!0}),t}();e.Resource=r},function(t,e,r){"use strict";function n(t){function e(t){return t<10?"0"+t:t.toString()}var r=t.getFullYear(),n=t.getMonth()+1,o=t.getDay()+1;return r+"-"+e(n)+"-"+e(o)}var o=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},i=r(7),s=function(t){function e(e,r,o){t.call(this,"Observation"),this.addProperty("status","final"),this.addProperty("code",o),this.addProperty("effectiveDateTime",n(r)),this.addProperty("valueQuantity",e)}return o(e,t),e}(i.Resource);e.Observation=s;var u=function(t){function e(e,r){t.call(this,"Observation"),this.addProperty("status","final"),this.addProperty("code",e),this.addProperty("effectiveDateTime",n(r)),this.addProperty("component",[])}return o(e,t),e.prototype.addComponent=function(t){this._fhir.component.push(t)},e}(i.Resource);e.MultiObservation=u},function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},o=this&&this.__decorate||function(t,e,r,n){var o,i=arguments.length,s=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,n);else for(var u=t.length-1;u>=0;u--)(o=t[u])&&(s=(i<3?o(s):i>3?o(e,r,s):o(e,r))||s);return i>3&&s&&Object.defineProperty(e,r,s),s},i=r(8),s=r(10),u=function(t){function e(e,r){var n={value:e,unit:"kg",system:"http://unitsofmeasure.org"};t.call(this,n,r,{coding:[{system:"http://loinc.org",code:"3141-9",display:"Weight Measured"}]})}return n(e,t),e=o([s.registerResource("3141-9")],e)}(i.Observation);e.BodyWeight=u},function(t,e){"use strict";function r(t){return function(e){o[t]=e,i.cls=e}}function n(t){var e=t.code.coding[0].code;if(void 0!==o[e]){var r={_fhir:t},n=o[e];return r.__proto__=n.prototype,r}return t}var o={};e.registerResource=r,e.fromFhir=n;var i=window;i.fromFhir=n},function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},o=r(8),i={coding:[{system:"http://acme.lab",code:"BT",display:"Body temperature"},{system:"http://loinc.org",code:"8310-5",display:"Body temperature"},{system:"http://snomed.info/sct",code:"56342008",display:"Temperature taking"}],text:"Body temperature"},s=function(t){function e(e,r){var n={value:e,unit:"degrees C",code:"258710007",system:"http://snomed.info/sct"};t.call(this,n,r,i)}return n(e,t),e}(o.Observation);e.Temperature=s},function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},o=r(8),i=function(t){function e(e,r){var n={value:e,unit:"bpm"};t.call(this,n,r,{coding:[{system:"http://loinc.org",code:"8867-4",display:"Heart Rate"}]})}return n(e,t),e}(o.Observation);e.HeartRate=i},function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},o=r(8),i=function(t){function e(e,r){var n={value:e,unit:"steps"};t.call(this,n,r,{text:"Steps",coding:[{system:"http://midata.coop",code:"activities/steps",display:"Steps"}]})}return n(e,t),e}(o.Observation);e.StepsCount=i},function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},o=this&&this.__decorate||function(t,e,r,n){var o,i=arguments.length,s=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,n);else for(var u=t.length-1;u>=0;u--)(o=t[u])&&(s=(i<3?o(s):i>3?o(e,r,s):o(e,r))||s);return i>3&&s&&Object.defineProperty(e,r,s),s},i=r(8),s=r(10),u=function(t){function e(e,r){var n={value:e,unit:"cm",system:"http://unitsofmeasure.org"};t.call(this,n,r,{coding:[{system:"http://loinc.org",code:"8302-2",display:"Body Height"}]})}return n(e,t),e=o([s.registerResource("8302-2")],e)}(i.Observation);e.BodyHeight=u},function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},o=r(7),i=function(t){function e(e){t.call(this,"Questionnaire"),this.addProperty("status","published")}return n(e,t),e}(o.Resource);e.Questionnaire=i},function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},o=r(8),i=function(t){function e(e,r,n){var o={coding:[{system:"http://loinc.org",code:"55417-0",display:"Blood Pressure"}]};t.call(this,o,n),this.addComponent({code:{coding:[{system:"http://loinc.org",code:"8480-6",display:"Systolic blood pressure"}]},valueQuantity:{value:e,unit:"mm[Hg]"}}),this.addComponent({code:{coding:[{system:"http://loinc.org",code:"8462-4",display:"Diastolic blood pressure"}]},valueQuantity:{value:r,unit:"mm[Hg]"}})}return n(e,t),e}(o.MultiObservation);e.BloodPressure=i}])});
//# sourceMappingURL=midata.js.map