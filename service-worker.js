(()=>{"use strict";var a={747:()=>{try{self["workbox:cacheable-response:7.0.0"]&&_()}catch(e){}},124:()=>{try{self["workbox:core:7.0.0"]&&_()}catch(e){}},390:()=>{try{self["workbox:expiration:7.0.0"]&&_()}catch(e){}},515:()=>{try{self["workbox:precaching:7.0.0"]&&_()}catch(e){}},695:()=>{try{self["workbox:routing:7.0.0"]&&_()}catch(e){}},818:()=>{try{self["workbox:strategies:7.0.0"]&&_()}catch(e){}}},s={};function i(e){var t=s[e];return void 0!==t||(t=s[e]={exports:{}},a[e](t,t.exports,i)),t.exports}var c,o;{i(124);const w=(e,...t)=>{let s=e;return 0<t.length&&(s+=" :: "+JSON.stringify(t)),s};class y extends Error{constructor(e,t){super(w(e,t)),this.name=e,this.details=t}}const v=e=>{return new URL(String(e),location.href).href.replace(new RegExp("^"+location.origin),"")};i(747);class b{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(t){let e=!0;return this._statuses&&(e=this._statuses.includes(t.status)),e=this._headers?e&&Object.keys(this._headers).some(e=>t.headers.get(e)===this._headers[e]):e}}class R{constructor(e){this.cacheWillUpdate=async({response:e})=>this._cacheableResponse.isResponseCacheable(e)?e:null,this._cacheableResponse=new b(e)}}const x={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},C=e=>[x.prefix,e,x.suffix].filter(e=>e&&0<e.length).join("-"),E={updateDetails:t=>{var e=e=>{"string"==typeof t[e]&&(x[e]=t[e])};for(const s of Object.keys(x))e(s)},getGoogleAnalyticsName:e=>e||C(x.googleAnalytics),getPrecacheName:e=>e||C(x.precache),getPrefix:()=>x.prefix,getRuntimeName:e=>e||C(x.runtime),getSuffix:()=>x.suffix};function h(e,t){var s=new URL(e);for(const a of t)s.searchParams.delete(a);return s.href}class ${constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}const L=new Set;function j(t){return new Promise(e=>setTimeout(e,t))}function l(e){return"string"==typeof e?new Request(e):e}i(818);class Q{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new $,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const s of this._plugins)this._pluginStateMap.set(s,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(t){var s=this["event"];let a=l(t);if("navigate"===a.mode&&s instanceof FetchEvent&&s.preloadResponse){t=await s.preloadResponse;if(t)return t}t=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:s})}catch(e){if(e instanceof Error)throw new y("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}var r=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions);for(const n of this.iterateCallbacks("fetchDidSucceed"))e=await n({event:s,request:r,response:e});return e}catch(e){throw t&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:t.clone(),request:r.clone()}),e}}async fetchAndCachePut(e){var t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){e=l(e);let t;var{cacheName:s,matchOptions:a}=this._strategy,r=await this.getCacheKey(e,"read"),e=Object.assign(Object.assign({},a),{cacheName:s});t=await caches.match(r,e);for(const n of this.iterateCallbacks("cachedResponseWillBeUsed"))t=await n({cacheName:s,matchOptions:a,cachedResponse:t,request:r,event:this.event})||void 0;return t}async cachePut(e,t){var e=l(e),s=(await j(0),await this.getCacheKey(e,"write"));if(!t)throw new y("cache-put-with-no-response",{url:v(s.url)});var a=await this._ensureResponseSafeToCache(t);if(!a)return!1;var{cacheName:r,matchOptions:e}=this._strategy,t=await self.caches.open(r),n=this.hasCallback("cacheDidUpdate"),i=n?await async function(e,t,s,a){var r=h(t.url,s);if(t.url===r)return e.match(t,a);var n=Object.assign(Object.assign({},a),{ignoreSearch:!0});for(const i of await e.keys(t,n))if(r===h(i.url,s))return e.match(i,a)}(t,s.clone(),["__WB_REVISION__"],e):null;try{await t.put(s,n?a.clone():a)}catch(e){if(e instanceof Error){if("QuotaExceededError"===e.name){for(const c of L)await c();await 0}throw e}}for(const o of this.iterateCallbacks("cacheDidUpdate"))await o({cacheName:r,oldResponse:i,newResponse:a.clone(),request:s,event:this.event});return!0}async getCacheKey(t,s){var a=t.url+" | "+s;if(!this._cacheKeys[a]){let e=t;for(const r of this.iterateCallbacks("cacheKeyWillBeUsed"))e=l(await r({mode:s,request:e,event:this.event,params:this.params}));this._cacheKeys[a]=e}return this._cacheKeys[a]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(t){for(const s of this._strategy.plugins)if("function"==typeof s[t]){const a=this._pluginStateMap.get(s);yield e=>{e=Object.assign(Object.assign({},e),{state:a});return s[t](e)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){for(var e;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const a of this.iterateCallbacks("cacheWillUpdate"))if(t=await a({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class q{constructor(e={}){this.cacheName=E.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){var[e]=this.handleAll(e);return e}handleAll(e){var t=(e=e instanceof FetchEvent?{event:e,request:e.request}:e).event,s="string"==typeof e.request?new Request(e.request):e.request,e="params"in e?e.params:void 0,e=new Q(this,{event:t,request:s,params:e}),a=this._getResponse(e,s,t);return[a,this._awaitComplete(a,e,s,t)]}async _getResponse(t,s,a){await t.runCallbacks("handlerWillStart",{event:a,request:s});let r=void 0;try{if(!(r=await this._handle(s,t))||"error"===r.type)throw new y("no-response",{url:s.url})}catch(e){if(e instanceof Error)for(const n of t.iterateCallbacks("handlerDidError"))if(r=await n({error:e,event:a,request:s}))break;if(!r)throw e}for(const e of t.iterateCallbacks("handlerWillRespond"))r=await e({event:a,request:s,response:r});return r}async _awaitComplete(e,t,s,a){let r,n;try{r=await e}catch(n){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:r}),await t.doneWaiting()}catch(e){e instanceof Error&&(n=e)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:r,error:n}),t.destroy(),n)throw n}}(class extends null{});const k={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};function u(e){e.then(()=>{})}const J=(t,e)=>e.some(e=>t instanceof e);let s,e;const N=new WeakMap,T=new WeakMap,U=new WeakMap,D=new WeakMap,P=new WeakMap;let a={get(e,t,s){if(e instanceof IDBTransaction){if("done"===t)return T.get(e);if("objectStoreNames"===t)return e.objectStoreNames||U.get(e);if("store"===t)return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return d(e[t])},set(e,t,s){return e[t]=s,!0},has(e,t){return e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e}};function F(s){return s!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(e=e||[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey]).includes(s)?function(...e){return s.apply(I(this),e),d(N.get(this))}:function(...e){return d(s.apply(I(this),e))}:function(e,...t){t=s.call(I(this),e,...t);return U.set(t,e.sort?e.sort():[e]),d(t)}}function H(e){var n,t;return"function"==typeof e?F(e):(e instanceof IDBTransaction&&(n=e,T.has(n)||(t=new Promise((e,t)=>{const s=()=>{n.removeEventListener("complete",a),n.removeEventListener("error",r),n.removeEventListener("abort",r)},a=()=>{e(),s()},r=()=>{t(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",a),n.addEventListener("error",r),n.addEventListener("abort",r)}),T.set(n,t))),J(e,s=s||[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])?new Proxy(e,a):e)}function d(e){var n,t;return e instanceof IDBRequest?(n=e,(t=new Promise((e,t)=>{const s=()=>{n.removeEventListener("success",a),n.removeEventListener("error",r)},a=()=>{e(d(n.result)),s()},r=()=>{t(n.error),s()};n.addEventListener("success",a),n.addEventListener("error",r)})).then(e=>{e instanceof IDBCursor&&N.set(e,n)}).catch(()=>{}),P.set(t,n),t):D.has(e)?D.get(e):((t=H(e))!==e&&(D.set(e,t),P.set(t,e)),t)}const I=e=>P.get(e),z=["get","getKey","getAll","getAllKeys","count"],X=["put","add","delete","clear"],K=new Map;function p(e,t){if(e instanceof IDBDatabase&&!(t in e)&&"string"==typeof t){if(K.get(t))return K.get(t);const a=t.replace(/FromIndex$/,""),r=t!==a,n=X.includes(a);return a in(r?IDBIndex:IDBObjectStore).prototype&&(n||z.includes(a))?(e=async function(e,...t){e=this.transaction(e,n?"readwrite":"readonly");let s=e.store;return r&&(s=s.index(t.shift())),(await Promise.all([s[a](...t),n&&e.done]))[0]},K.set(t,e),e):void 0}}a={...c=a,get:(e,t,s)=>p(e,t)||c.get(e,t,s),has:(e,t)=>!!p(e,t)||c.has(e,t)},i(390);const M="cache-entries",S=e=>{e=new URL(e,location.href);return e.hash="",e.href};class Y{constructor(e){this._db=null,this._cacheName=e}_upgradeDb(e){e=e.createObjectStore(M,{keyPath:"id"});e.createIndex("cacheName","cacheName",{unique:!1}),e.createIndex("timestamp","timestamp",{unique:!1})}_upgradeDbAndDeleteOldDbs(e){var t;this._upgradeDb(e),this._cacheName&&([e,{blocked:t}={}]=[this._cacheName],e=indexedDB.deleteDatabase(e),t&&e.addEventListener("blocked",e=>t(e.oldVersion,e)),d(e).then(()=>{}))}async setTimestamp(e,t){t={url:e=S(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)},e=(await this.getDb()).transaction(M,"readwrite",{durability:"relaxed"});await e.store.put(t),await e.done}async getTimestamp(e){e=await(await this.getDb()).get(M,this._getId(e));return null==e?void 0:e.timestamp}async expireEntries(e,t){var s=await this.getDb();let a=await s.transaction(M).store.index("timestamp").openCursor(null,"prev");var r=[];let n=0;for(;a;){var i=a.value;i.cacheName===this._cacheName&&(e&&i.timestamp<e||t&&n>=t?r.push(a.value):n++),a=await a.continue()}var c=[];for(const o of r)await s.delete(M,o.id),c.push(o.url);return c}_getId(e){return this._cacheName+"|"+S(e)}async getDb(){return this._db||(this._db=await function(e,t,{blocked:s,upgrade:a,blocking:r,terminated:n}){const i=indexedDB.open(e,t);return e=d(i),a&&i.addEventListener("upgradeneeded",e=>{a(d(i.result),e.oldVersion,e.newVersion,d(i.transaction),e)}),s&&i.addEventListener("blocked",e=>s(e.oldVersion,e.newVersion,e)),e.then(e=>{n&&e.addEventListener("close",()=>n()),r&&e.addEventListener("versionchange",e=>r(e.oldVersion,e.newVersion,e))}).catch(()=>{}),e}("workbox-expiration",1,{upgrade:this._upgradeDbAndDeleteOldDbs.bind(this)})),this._db}}class Z{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._matchOptions=t.matchOptions,this._cacheName=e,this._timestampModel=new Y(e)}async expireEntries(){if(this._isRunning)this._rerunRequested=!0;else{this._isRunning=!0;var e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,e=await this._timestampModel.expireEntries(e,this._maxEntries),t=await self.caches.open(this._cacheName);for(const s of e)await t.delete(s,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,u(this.expireEntries()))}}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){var t;return!!this._maxAgeSeconds&&(e=await this._timestampModel.getTimestamp(e),t=Date.now()-1e3*this._maxAgeSeconds,void 0===e||e<t)}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}i(695);const A=e=>e&&"object"==typeof e?e:{handle:e};class O{constructor(e,t,s="GET"){this.handler=A(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=A(e)}}(class extends O{});class ee extends O{constructor(s,e,t){super(({url:e})=>{var t=s.exec(e.href);if(t&&(e.origin===location.origin||0===t.index))return t.slice(1)},e,t)}}class te{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{var t=e["request"],t=this.handleRequest({request:t,event:e});t&&e.respondWith(t)})}addCacheListener(){self.addEventListener("message",t=>{var e;t.data&&"CACHE_URLS"===t.data.type&&(e=t.data["payload"],e=Promise.all(e.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);e=new Request(...e);return this.handleRequest({request:e,event:t})})),t.waitUntil(e),t.ports)&&t.ports[0]&&e.then(()=>t.ports[0].postMessage(!0))})}handleRequest({request:s,event:a}){const r=new URL(s.url,location.href);if(r.protocol.startsWith("http")){var t=r.origin===location.origin;const{params:n,route:i}=this.findMatchingRoute({event:a,request:s,sameOrigin:t,url:r});let e=i&&i.handler;t=s.method;if(e=!e&&this._defaultHandlerMap.has(t)?this._defaultHandlerMap.get(t):e){let t;try{t=e.handle({url:r,request:s,event:a,params:n})}catch(e){t=Promise.reject(e)}const c=i&&i.catchHandler;return t=t instanceof Promise&&(this._catchHandler||c)?t.catch(async t=>{if(c)try{return await c.handle({url:r,request:s,event:a,params:n})}catch(e){e instanceof Error&&(t=e)}if(this._catchHandler)return this._catchHandler.handle({url:r,request:s,event:a});throw t}):t}}}findMatchingRoute({url:t,sameOrigin:s,request:a,event:r}){for(const i of this._routes.get(a.method)||[]){let e;var n=i.match({url:t,sameOrigin:s,request:a,event:r});if(n)return e=n,(Array.isArray(e)&&0===e.length||n.constructor===Object&&0===Object.keys(n).length||"boolean"==typeof n)&&(e=void 0),{route:i,params:e}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,A(e))}setCatchHandler(e){this._catchHandler=A(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new y("unregister-route-but-not-found-with-method",{method:e.method});var t=this._routes.get(e.method).indexOf(e);if(!(-1<t))throw new y("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let t;const se=()=>(t||((t=new te).addFetchListener(),t.addCacheListener()),t);function f(e,t,s){let a;if("string"==typeof e){const r=new URL(e,location.href);a=new O(({url:e})=>e.href===r.href,t,s)}else if(e instanceof RegExp)a=new ee(e,t,s);else if("function"==typeof e)a=new O(e,t,s);else{if(!(e instanceof O))throw new y("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=e}se().registerRoute(a),a}function g(e,t){t=t();return e.waitUntil(t),t}i(515);class ae{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{return"install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request&&(e=t.originalRequest.url,(s?this.notUpdatedURLs:this.updatedURLs).push(e)),s}}}class re{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{t=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return t?new Request(t,{headers:e.headers}):e},this._precacheController=e}}let r;async function V(e,t){let s=null;if(e.url&&(a=new URL(e.url),s=a.origin),s!==self.location.origin)throw new y("cross-origin-copy-response",{origin:s});var a=e.clone(),e={headers:new Headers(a.headers),status:a.status,statusText:a.statusText},t=t?t(e):e,e=function(){if(void 0===r){var e=new Response("");if("body"in e)try{new Response(e.body),r=!0}catch(e){r=!1}r=!1}return r}()?a.body:await a.blob();return new Response(e,t)}class W extends q{constructor(e={}){e.cacheName=E.getPrecacheName(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(W.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){var s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?this._handleInstall(e,t):this._handleFetch(e,t))}async _handleFetch(e,t){let s;var a,r,n=t.params||{};if(this._fallbackToNetwork)return n=n.integrity,r=!(a=e.integrity)||a===n,s=await t.fetch(new Request(e,{integrity:"no-cors"!==e.mode?a||n:void 0})),n&&r&&"no-cors"!==e.mode&&(this._useDefaultCacheabilityPluginIfNeeded(),await t.cachePut(e,s.clone())),s;throw new y("missing-precache-entry",{cacheName:this.cacheName,url:e.url})}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();var s=await t.fetch(e);if(await t.cachePut(e,s.clone()))return s;throw new y("bad-precaching-response",{url:e.url,status:s.status})}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(var[s,a]of this.plugins.entries())a!==W.copyRedirectedCacheableResponsesPlugin&&(a===W.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate)&&t++;0===t?this.plugins.push(W.defaultPrecacheCacheabilityPlugin):1<t&&null!==e&&this.plugins.splice(e,1)}}W.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate({response:e}){return!e||400<=e.status?null:e}},W.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate({response:e}){return e.redirected?await V(e):e}};class ne{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new W({cacheName:E.getPrecacheName(e),plugins:[...t,new re({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){var t=[];for(const n of e){"string"==typeof n?t.push(n):n&&void 0===n.revision&&t.push(n.url);var{cacheKey:s,url:a}=function(e){if(e){if("string"==typeof e)return{cacheKey:(a=new URL(e,location.href)).href,url:a.href};var t,s,{revision:a,url:r}=e;if(r)return a?(t=new URL(r,location.href),s=new URL(r,location.href),t.searchParams.set("__WB_REVISION__",a),{cacheKey:t.href,url:s.href}):{cacheKey:(a=new URL(r,location.href)).href,url:a.href}}throw new y("add-to-cache-list-unexpected-type",{entry:e})}(n),r="string"!=typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(a)&&this._urlsToCacheKeys.get(a)!==s)throw new y("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(a),secondEntry:s});if("string"!=typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(s)&&this._cacheKeysToIntegrities.get(s)!==n.integrity)throw new y("add-to-cache-list-conflicting-integrities",{url:a});this._cacheKeysToIntegrities.set(s,n.integrity)}this._urlsToCacheKeys.set(a,s),this._urlsToCacheModes.set(a,r),0<t.length&&(s="Workbox is precaching URLs without revision "+`info: ${t.join(", ")}
This is generally NOT safe. `+"Learn more at https://bit.ly/wb-precache",console.warn(s))}}install(i){return g(i,async()=>{var e,t,s=new ae;this.strategy.plugins.push(s);for([e,t]of this._urlsToCacheKeys){var a=this._cacheKeysToIntegrities.get(t),r=this._urlsToCacheModes.get(e),a=new Request(e,{integrity:a,cache:r,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:t},request:a,event:i}))}var{updatedURLs:s,notUpdatedURLs:n}=s;return{updatedURLs:s,notUpdatedURLs:n}})}activate(e){return g(e,async()=>{var e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(const r of t)s.has(r.url)||(await e.delete(r),a.push(r.url));return{deletedURLs:a}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){e=new URL(e,location.href);return this._urlsToCacheKeys.get(e.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){e=e instanceof Request?e.url:e,e=this.getCacheKeyForURL(e);if(e)return(await self.caches.open(this.strategy.cacheName)).match(e)}createHandlerBoundToURL(t){const s=this.getCacheKeyForURL(t);if(s)return e=>(e.request=new Request(t),e.params=Object.assign({cacheKey:s},e.params),this.strategy.handle(e));throw new y("non-precached-url",{url:t})}}let n;const B=()=>n=n||new ne;function*G(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:a=!0,urlManipulation:r}={}){var n,e=new URL(e,location.href),t=(e.hash="",yield e.href,function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(e,t));if(yield t.href,s&&t.pathname.endsWith("/")&&((n=new URL(t.href)).pathname+=s,yield n.href),a&&((s=new URL(t.href)).pathname+=".html",yield s.href),r)for(const i of r({url:e}))yield i.href}class ie extends O{constructor(r,n){super(({request:e})=>{var t=r.getURLsToCacheKeys();for(const a of G(e.url,n)){var s=t.get(a);if(s)return{cacheKey:s,integrity:r.getIntegrityForCacheKey(s)}}},r.strategy)}}self.addEventListener("activate",()=>self.clients.claim()),o=o=[{'revision':null,'url':'780.31d6cfe0d16ae931b73c.css'},{'revision':null,'url':'780.53ac4184bb53006b8982.js'},{'revision':'3b0f705d540781b9a971e611f40a1f4e','url':'ReleaseNotes.txt'},{'revision':'d3cf03d9052b6a7be2a0361214b601c3','url':'apple-touch-icon.png'},{'revision':'a493ba0aa0b8ec8068d786d7248bb92c','url':'browserconfig.xml'},{'revision':'0b08de51925f328e173f6ae920da3de9','url':'favicon-16x16.png'},{'revision':'1d7125651088260073f5bd7650d80caf','url':'favicon-32x32.png'},{'revision':'02dc3abc2d75545eb9a2ec5d3a21e55a','url':'favicon.ico'},{'revision':'63e30cda3e3fc1936ba2757dab0a025b','url':'icon-512x512.png'},{'revision':'b0f9e427fc43b02b4060d11bc8c166fc','url':'index.html'},{'revision':'3d9f31d0949a259cbd074bfdd385edbd','url':'locales/en/translation.json'},{'revision':'acbd8fd21cc3e3755f3261e97ead7926','url':'locales/ru/translation.json'},{'revision':null,'url':'main.c09c19872e24d89b916e.js'},{'revision':'0ed008650abe370303cfa92b3bcfdaaf','url':'manifest.json'},{'revision':'20d29b2d44b31e6a93e0979712d135d3','url':'mstile-150x150.png'},{'revision':null,'url':'runtime.a32bc04855498682968b.js'},{'revision':'657bee87c033b343b920f7a2f01261f9','url':'safari-pinned-tab.svg'},{'revision':'b2b2de8ba86df9f7c61f7d0fb84d8a7d','url':'screenshot-320x320.png'},{'revision':null,'url':'vendor.3a4d06fc6efa76aab2ef.js'}],B().precache(o),o=m,m=B(),f(new ie(m,o)),f(({request:e})=>"image"===e.destination,new class extends q{async _handle(e,t){let s=await t.cacheMatch(e),a=void 0;if(!s)try{s=await t.fetchAndCachePut(e)}catch(e){e instanceof Error&&(a=e)}if(s)return s;throw new y("no-response",{url:e.url,error:a})}}({cacheName:"images",plugins:[new R({statuses:[0,200]}),new class{constructor(e={}){this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:a})=>{if(!a)return null;var r=this._isResponseDateFresh(a),s=this._getCacheExpiration(s),s=(u(s.expireEntries()),s.updateTimestamp(t.url));if(e)try{e.waitUntil(s)}catch(e){}return r?a:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{e=this._getCacheExpiration(e);await e.updateTimestamp(t.url),await e.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&(e=()=>this.deleteCacheAndMetadata(),L.add(e))}_getCacheExpiration(e){if(e===E.getRuntimeName())throw new y("expire-custom-caches-only");let t=this._cacheExpirations.get(e);return t||(t=new Z(e,this._config),this._cacheExpirations.set(e,t)),t}_isResponseDateFresh(e){return!this._maxAgeSeconds||null===(e=this._getDateHeaderTimestamp(e))||e>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){return!e.headers.has("date")||(e=e.headers.get("date"),e=new Date(e).getTime(),isNaN(e))?null:e}async deleteCacheAndMetadata(){for(var[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}({maxEntries:60,maxAgeSeconds:2592e3})]})),f(({url:e})=>"https://fonts.googleapis.com"===e.origin,new class extends q{constructor(e={}){super(e),this.plugins.some(e=>"cacheWillUpdate"in e)||this.plugins.unshift(k)}async _handle(e,t){var s=t.fetchAndCachePut(e).catch(()=>{});t.waitUntil(s);let a=await t.cacheMatch(e),r;if(!a)try{a=await s}catch(e){e instanceof Error&&(r=e)}if(a)return a;throw new y("no-response",{url:e.url,error:r})}}({cacheName:"google-fonts-stylesheets"}));var m={fetchDidSucceed:async({response:e})=>{if(e.ok)return e;throw new Error(e.status+" "+e.statusText)}};f(({url:e})=>"http://127.0.0.1:8080"===e.origin&&e.pathname.includes("api"),new class extends q{constructor(e={}){super(e),this.plugins.some(e=>"cacheWillUpdate"in e)||this.plugins.unshift(k),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(e,t){var s,a=[];const r=[];let n;this._networkTimeoutSeconds&&({id:c,promise:s}=this._getTimeoutPromise({request:e,logs:a,handler:t}),n=c,r.push(s));const i=this._getNetworkPromise({timeoutId:n,request:e,logs:a,handler:t});r.push(i);var c=await t.waitUntil((async()=>await t.waitUntil(Promise.race(r))||await i)());if(c)return c;throw new y("no-response",{url:e.url})}_getTimeoutPromise({request:t,handler:s}){let a;return{promise:new Promise(e=>{a=setTimeout(async()=>{e(await s.cacheMatch(t))},1e3*this._networkTimeoutSeconds)}),id:a}}async _getNetworkPromise({timeoutId:e,request:t,handler:s}){let a,r;try{r=await s.fetchAndCachePut(t)}catch(e){e instanceof Error&&(a=e)}return e&&clearTimeout(e),r=!a&&r?r:await s.cacheMatch(t)}}({cacheName:"tasks-response-cache",plugins:[new R({statuses:[0,200]}),m]})),self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})}})();