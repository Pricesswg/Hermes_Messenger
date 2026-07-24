function t(t,e,i,n){var o,s=arguments.length,a=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,n);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(a=(s<3?o(a):s>3?o(e,i,a):o(e,i))||a);return s>3&&a&&Object.defineProperty(e,i,a),a}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),o=new WeakMap;let s=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const a=t=>new s("string"==typeof t?t:t+"",void 0,n),r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]);return new s(i,t,n)},l=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return a(e)})(t):t,{is:h,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:u,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,_=globalThis,f=_.trustedTypes,g=f?f.emptyScript:"",v=_.reactiveElementPolyfillSupport,y=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},x=(t,e)=>!h(t,e),w={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let P=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&c(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:o}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const s=n?.call(this);o?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...u(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,n)=>{if(i)t.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of n){const n=document.createElement("style"),o=e.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=i.cssText,t.appendChild(n)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=n;const s=o.fromAttribute(e,t.type);this[n]=s??this._$Ej?.get(n)??s,this._$Em=null}}requestUpdate(t,e,i,n=!1,o){if(void 0!==t){const s=this.constructor;if(!1===n&&(o=this[t]),i??=s.getPropertyOptions(t),!((i.hasChanged??x)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:o},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==o||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===n&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,n=this[e];!0!==t||this._$AL.has(e)||void 0===n||this.C(e,void 0,i,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};P.elementStyles=[],P.shadowRootOptions={mode:"open"},P[y("elementProperties")]=new Map,P[y("finalized")]=new Map,v?.({ReactiveElement:P}),(_.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,z=t=>t,T=k.trustedTypes,E=T?T.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+A,C=`<${M}>`,$=document,O=()=>$.createComment(""),I=t=>null===t||"object"!=typeof t&&"function"!=typeof t,Z=Array.isArray,N="[ \t\n\f\r]",B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,R=/>/g,H=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,F=/"/g,W=/^(?:script|style|textarea|title)$/i,U=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),V=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),G=new WeakMap,K=$.createTreeWalker($,129);function Y(t,e){if(!Z(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,n=[];let o,s=2===e?"<svg>":3===e?"<math>":"",a=B;for(let e=0;e<i;e++){const i=t[e];let r,l,h=-1,c=0;for(;c<i.length&&(a.lastIndex=c,l=a.exec(i),null!==l);)c=a.lastIndex,a===B?"!--"===l[1]?a=D:void 0!==l[1]?a=R:void 0!==l[2]?(W.test(l[2])&&(o=RegExp("</"+l[2],"g")),a=H):void 0!==l[3]&&(a=H):a===H?">"===l[0]?(a=o??B,h=-1):void 0===l[1]?h=-2:(h=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?H:'"'===l[3]?F:j):a===F||a===j?a=H:a===D||a===R?a=B:(a=H,o=void 0);const d=a===H&&t[e+1].startsWith("/>")?" ":"";s+=a===B?i+C:h>=0?(n.push(r),i.slice(0,h)+S+i.slice(h)+A+d):i+A+(-2===h?e:d)}return[Y(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class X{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let o=0,s=0;const a=t.length-1,r=this.parts,[l,h]=J(t,e);if(this.el=X.createElement(l,i),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=K.nextNode())&&r.length<a;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(S)){const e=h[s++],i=n.getAttribute(t).split(A),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?nt:"?"===a[1]?ot:"@"===a[1]?st:it}),n.removeAttribute(t)}else t.startsWith(A)&&(r.push({type:6,index:o}),n.removeAttribute(t));if(W.test(n.tagName)){const t=n.textContent.split(A),e=t.length-1;if(e>0){n.textContent=T?T.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],O()),K.nextNode(),r.push({type:2,index:++o});n.append(t[e],O())}}}else if(8===n.nodeType)if(n.data===M)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=n.data.indexOf(A,t+1));)r.push({type:7,index:o}),t+=A.length-1}o++}}static createElement(t,e){const i=$.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,n){if(e===V)return e;let o=void 0!==n?i._$Co?.[n]:i._$Cl;const s=I(e)?void 0:e._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),void 0===s?o=void 0:(o=new s(t),o._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=o:i._$Cl=o),void 0!==o&&(e=Q(t,o._$AS(t,e.values),o,n)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??$).importNode(e,!0);K.currentNode=n;let o=K.nextNode(),s=0,a=0,r=i[0];for(;void 0!==r;){if(s===r.index){let e;2===r.type?e=new et(o,o.nextSibling,this,t):1===r.type?e=new r.ctor(o,r.name,r.strings,this,t):6===r.type&&(e=new at(o,this,t)),this._$AV.push(e),r=i[++a]}s!==r?.index&&(o=K.nextNode(),s++)}return K.currentNode=$,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),I(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>Z(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T($.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new tt(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new X(t)),e}k(t){Z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const o of t)n===e.length?e.push(i=new et(this.O(O()),this.O(O()),this,this.options)):i=e[n],i._$AI(o),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=z(t).nextSibling;z(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,n){const o=this.strings;let s=!1;if(void 0===o)t=Q(this,t,e,0),s=!I(t)||t!==this._$AH&&t!==V,s&&(this._$AH=t);else{const n=t;let a,r;for(t=o[0],a=0;a<o.length-1;a++)r=Q(this,n[i+a],e,a),r===V&&(r=this._$AH[a]),s||=!I(r)||r!==this._$AH[a],r===q?t=q:t!==q&&(t+=(r??"")+o[a+1]),this._$AH[a]=r}s&&!n&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class nt extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}let ot=class extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}};class st extends it{constructor(t,e,i,n,o){super(t,e,i,n,o),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??q)===V)return;const i=this._$AH,n=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==q&&(i===q||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const rt=k.litHtmlPolyfillSupport;rt?.(X,et),(k.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;class ht extends P{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let o=n._$litPart$;if(void 0===o){const t=i?.renderBefore??null;n._$litPart$=o=new et(e.insertBefore(O(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}ht._$litElement$=!0,ht.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ht});const ct=lt.litElementPolyfillSupport;ct?.({LitElement:ht}),(lt.litElementVersions??=[]).push("4.2.2");const dt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ut={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:x},pt=(t=ut,e,i)=>{const{kind:n,metadata:o}=i;let s=globalThis.litPropertyMetadata.get(o);if(void 0===s&&globalThis.litPropertyMetadata.set(o,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=!0),s.set(i.name,t),"accessor"===n){const{name:n}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(n,o,t,!0,i)},init(e){return void 0!==e&&this.C(n,void 0,t,e),e}}}if("setter"===n){const{name:n}=i;return function(i){const o=this[n];e.call(this,i),this.requestUpdate(n,o,t,!0,i)}}throw Error("Unsupported decorator location: "+n)};function mt(t){return(e,i)=>"object"==typeof i?pt(t,e,i):((t,e,i)=>{const n=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),n?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function _t(t){return mt({...t,state:!0,attribute:!1})}const ft={"tab.status":"Status","tab.devices":"Devices","tab.map":"Map","tab.messages":"Messages","tab.homeassistant":"Home Assistant","tab.settings":"Settings","tab.log":"Log","log.all":"All","log.received":"Received","log.sent":"Sent","log.clear":"Clear","log.empty":"Nothing logged yet.","log.privacy":"The log keeps the text of the messages in Home Assistant storage, capped at 200 entries. Clear it whenever you want.","log.outcome.matched":"command run","log.outcome.no_match":"no command matched","log.outcome.unauthorized":"sender not authorized","log.outcome.sent":"sent","presets.title":"Quick send","presets.add":"Add preset","presets.empty":"No preset yet.","presets.label":"Label","presets.text":"Message","presets.node":"Node ID (optional)","presets.nodeHint":"Leave empty to broadcast on the channel of the gateway.","presets.send":"Send","presets.toChannel":"to the channel","presets.toNode":"to node","status.title":"Status","status.nodes":"Nodes","status.commands":"Configured commands","status.executed":"Executed today","status.lastCommand":"Last command","status.lastError":"Last error","status.none":"None","status.noIntegration":"No Hermes entities found. Add the integration first.","devices.title":"Devices","devices.empty":"No Meshtastic devices found. Set up the Meshtastic integration first.","devices.unknown":"Unknown","map.noSelection":"No node selected yet. Pick the nodes to show in Settings.","map.noPosition":"The selected nodes have not reported a position yet.","map.waiting":"waiting for position","map.showAll":"Show all mesh nodes","map.radiusFilter":"Filter by radius","map.connected":"heard recently","map.notConnected":"not heard recently","map.noneInRadius":"No node inside the radius. Widen it or turn the filter off.","settings.title":"Settings","settings.global":"Global","settings.owmKey":"OpenWeather API key","settings.owmHint":"Used for the weather layer on the map. Stored in Home Assistant, never in the repository.","settings.gateway":"Gateway node","settings.mode":"Mode","settings.channel":"Channel","settings.initialDelay":"Initial delay (s)","settings.partDelay":"Delay between parts (s)","settings.authorizedNodes":"Authorized nodes","settings.mapNodes":"Nodes shown on the map","messages.title":"Messages","messages.gateway":"Gateway","messages.add":"Add message","messages.empty":"No commands configured yet.","messages.keyword":"Keyword","messages.matchType":"Match type","messages.service":"Service (domain.service)","messages.serviceHint":"Optional. Leave empty for a command that only replies.","messages.target":"Target entity","messages.targetHint":"The entity the service acts on. Leave empty if the service needs none.","messages.replyHint":"Optional. Use {state:entity_id} or {attr:entity_id:attribute}.","messages.replyTemplate":"Reply template","messages.replyTo":"Reply routing","messages.exact":"Exact match","messages.startswith":"Starts with","messages.onChannel":"On the channel","messages.senderDm":"DM to sender","messages.confirmDelete":"Delete this command?","messages.keywordHint":"The text people send from a Meshtastic node to trigger this.","messages.matchHint":'Use "Starts with" if you want to accept a value, like "temp 21".',"messages.paletteEntity":"Pick an entity","messages.paletteHint":"Choose what you want to read or control, then click a button below.","messages.pickEntityFirst":"Pick an entity to see what you can do with it.","messages.groupRead":"Read","messages.groupDo":"Do","messages.readState":"Value","messages.templateHint":"Click the buttons above to build this. Action buttons run something and send nothing.","messages.advanced":"Advanced","messages.hideAdvanced":"Hide advanced","common.comingSoon":"Coming in the next build phase.","common.phase":"Phase","common.save":"Save","common.cancel":"Cancel","common.edit":"Edit","common.delete":"Delete","common.loading":"Loading","common.saved":"Saved","common.noEntries":"No Hermes gateway configured yet.","common.loadError":"Could not load data from Home Assistant."},gt={en:ft,it:{"tab.status":"Status","tab.devices":"Dispositivi","tab.map":"Mappa","tab.messages":"Messaggi","tab.homeassistant":"Home Assistant","tab.settings":"Impostazioni","tab.log":"Log","log.all":"Tutti","log.received":"Ricevuti","log.sent":"Inviati","log.clear":"Svuota","log.empty":"Ancora nessun messaggio registrato.","log.privacy":"Il log conserva il testo dei messaggi nello storage di Home Assistant, con un limite di 200 voci. Puoi svuotarlo quando vuoi.","log.outcome.matched":"comando eseguito","log.outcome.no_match":"nessun comando corrispondente","log.outcome.unauthorized":"mittente non autorizzato","log.outcome.sent":"inviato","presets.title":"Invio rapido","presets.add":"Aggiungi preset","presets.empty":"Nessun preset.","presets.label":"Etichetta","presets.text":"Messaggio","presets.node":"Node ID (opzionale)","presets.nodeHint":"Lascia vuoto per inviare sul canale del gateway.","presets.send":"Invia","presets.toChannel":"sul canale","presets.toNode":"al nodo","status.title":"Status","status.nodes":"Nodi","status.commands":"Comandi configurati","status.executed":"Eseguiti oggi","status.lastCommand":"Ultimo comando","status.lastError":"Ultimo errore","status.none":"Nessuno","status.noIntegration":"Nessuna entità Hermes trovata. Aggiungi prima l'integrazione.","devices.title":"Dispositivi","devices.empty":"Nessun dispositivo Meshtastic trovato. Configura prima l'integrazione Meshtastic.","devices.unknown":"Sconosciuto","map.noSelection":"Nessun nodo selezionato. Scegli i nodi da mostrare in Impostazioni.","map.noPosition":"I nodi selezionati non hanno ancora inviato una posizione.","map.waiting":"in attesa di posizione","map.showAll":"Mostra tutti i nodi della mesh","map.radiusFilter":"Filtra per raggio","map.connected":"sentito di recente","map.notConnected":"non sentito di recente","map.noneInRadius":"Nessun nodo dentro il raggio. Allargalo o disattiva il filtro.","settings.title":"Impostazioni","settings.global":"Globali","settings.owmKey":"Chiave API OpenWeather","settings.owmHint":"Usata per il livello meteo sulla mappa. Salvata in Home Assistant, mai nel repository.","settings.gateway":"Nodo gateway","settings.mode":"Modalità","settings.channel":"Canale","settings.initialDelay":"Attesa iniziale (s)","settings.partDelay":"Pausa tra le parti (s)","settings.authorizedNodes":"Nodi autorizzati","settings.mapNodes":"Nodi mostrati sulla mappa","messages.title":"Messaggi","messages.gateway":"Gateway","messages.add":"Aggiungi messaggio","messages.empty":"Nessun comando configurato.","messages.keyword":"Parola chiave","messages.matchType":"Tipo di match","messages.service":"Servizio (dominio.servizio)","messages.serviceHint":"Opzionale. Lascia vuoto per un comando che risponde soltanto.","messages.target":"Entità target","messages.targetHint":"L'entità su cui agisce il servizio. Lascia vuoto se il servizio non ne richiede.","messages.replyHint":"Opzionale. Usa {state:entity_id} oppure {attr:entity_id:attributo}.","messages.replyTemplate":"Template di risposta","messages.replyTo":"Instradamento risposta","messages.exact":"Match esatto","messages.startswith":"Inizia con","messages.onChannel":"Sul canale","messages.senderDm":"DM al mittente","messages.confirmDelete":"Eliminare questo comando?","messages.keywordHint":"Il testo che si invia da un nodo Meshtastic per far scattare il comando.","messages.matchHint":'Usa "Inizia con" se vuoi accettare un valore, tipo "temp 21".',"messages.paletteEntity":"Scegli una entità","messages.paletteHint":"Scegli cosa vuoi leggere o comandare, poi clicca un pulsante qui sotto.","messages.pickEntityFirst":"Scegli una entità per vedere cosa puoi farci.","messages.groupRead":"Leggi","messages.groupDo":"Fai","messages.readState":"Valore","messages.templateHint":"Componi cliccando i pulsanti sopra. I pulsanti azione eseguono e non inviano testo.","messages.advanced":"Avanzate","messages.hideAdvanced":"Nascondi avanzate","common.comingSoon":"In arrivo nella prossima fase di sviluppo.","common.phase":"Fase","common.save":"Salva","common.cancel":"Annulla","common.edit":"Modifica","common.delete":"Elimina","common.loading":"Caricamento","common.saved":"Salvato","common.noEntries":"Nessun gateway Hermes configurato.","common.loadError":"Impossibile caricare i dati da Home Assistant."},es:{"tab.status":"Estado","tab.devices":"Dispositivos","tab.map":"Mapa","tab.messages":"Mensajes","tab.homeassistant":"Home Assistant","tab.settings":"Ajustes","tab.log":"Registro","log.all":"Todos","log.received":"Recibidos","log.sent":"Enviados","log.clear":"Vaciar","log.empty":"Todavía no hay nada registrado.","log.privacy":"El registro guarda el texto de los mensajes en el almacenamiento de Home Assistant, con un límite de 200 entradas. Puedes vaciarlo cuando quieras.","log.outcome.matched":"comando ejecutado","log.outcome.no_match":"ningún comando coincide","log.outcome.unauthorized":"remitente no autorizado","log.outcome.sent":"enviado","presets.title":"Envío rápido","presets.add":"Añadir preajuste","presets.empty":"Todavía no hay preajustes.","presets.label":"Etiqueta","presets.text":"Mensaje","presets.node":"ID de nodo (opcional)","presets.nodeHint":"Déjalo vacío para difundir en el canal de la puerta de enlace.","presets.send":"Enviar","presets.toChannel":"al canal","presets.toNode":"al nodo","status.title":"Estado","status.nodes":"Nodos","status.commands":"Comandos configurados","status.executed":"Ejecutados hoy","status.lastCommand":"Último comando","status.lastError":"Último error","status.none":"Ninguno","status.noIntegration":"No se han encontrado entidades de Hermes. Añade primero la integración.","devices.title":"Dispositivos","devices.empty":"No se han encontrado dispositivos Meshtastic. Configura primero la integración Meshtastic.","devices.unknown":"Desconocido","map.noSelection":"Ningún nodo seleccionado. Elige los nodos a mostrar en Ajustes.","map.noPosition":"Los nodos seleccionados aún no han enviado una posición.","map.waiting":"esperando posición","map.showAll":"Mostrar todos los nodos de la malla","map.radiusFilter":"Filtrar por radio","map.connected":"oído recientemente","map.notConnected":"no oído recientemente","map.noneInRadius":"Ningún nodo dentro del radio. Amplíalo o desactiva el filtro.","settings.title":"Ajustes","settings.global":"Globales","settings.owmKey":"Clave API de OpenWeather","settings.owmHint":"Se usa para la capa meteorológica del mapa. Guardada en Home Assistant, nunca en el repositorio.","settings.gateway":"Nodo de puerta de enlace","settings.mode":"Modo","settings.channel":"Canal","settings.initialDelay":"Retardo inicial (s)","settings.partDelay":"Retardo entre partes (s)","settings.authorizedNodes":"Nodos autorizados","settings.mapNodes":"Nodos mostrados en el mapa","messages.title":"Mensajes","messages.gateway":"Puerta de enlace","messages.add":"Añadir mensaje","messages.empty":"Todavía no hay comandos configurados.","messages.keyword":"Palabra clave","messages.matchType":"Tipo de coincidencia","messages.service":"Servicio (dominio.servicio)","messages.serviceHint":"Opcional. Déjalo vacío para un comando que solo responde.","messages.target":"Entidad de destino","messages.targetHint":"La entidad sobre la que actúa el servicio. Déjalo vacío si el servicio no la necesita.","messages.replyHint":"Opcional. Usa {state:entity_id} o {attr:entity_id:attribute}.","messages.replyTemplate":"Plantilla de respuesta","messages.replyTo":"Enrutamiento de respuesta","messages.exact":"Coincidencia exacta","messages.startswith":"Empieza por","messages.onChannel":"En el canal","messages.senderDm":"DM al remitente","messages.confirmDelete":"¿Eliminar este comando?","messages.keywordHint":"El texto que se envía desde un nodo Meshtastic para activarlo.","messages.matchHint":'Usa "Empieza por" si quieres aceptar un valor, como "temp 21".',"messages.paletteEntity":"Elige una entidad","messages.paletteHint":"Elige qué quieres leer o controlar y pulsa un botón de abajo.","messages.pickEntityFirst":"Elige una entidad para ver qué puedes hacer con ella.","messages.groupRead":"Leer","messages.groupDo":"Hacer","messages.readState":"Valor","messages.templateHint":"Compón pulsando los botones de arriba. Los botones de acción ejecutan y no envían texto.","messages.advanced":"Avanzado","messages.hideAdvanced":"Ocultar avanzado","common.comingSoon":"Llegará en la próxima fase de desarrollo.","common.phase":"Fase","common.save":"Guardar","common.cancel":"Cancelar","common.edit":"Editar","common.delete":"Eliminar","common.loading":"Cargando","common.saved":"Guardado","common.noEntries":"Todavía no hay ninguna puerta de enlace Hermes configurada.","common.loadError":"No se han podido cargar los datos de Home Assistant."},fr:{"tab.status":"État","tab.devices":"Appareils","tab.map":"Carte","tab.messages":"Messages","tab.homeassistant":"Home Assistant","tab.settings":"Paramètres","tab.log":"Journal","log.all":"Tous","log.received":"Reçus","log.sent":"Envoyés","log.clear":"Vider","log.empty":"Rien dans le journal pour le moment.","log.privacy":"Le journal conserve le texte des messages dans le stockage de Home Assistant, limité à 200 entrées. Vous pouvez le vider quand vous voulez.","log.outcome.matched":"commande exécutée","log.outcome.no_match":"aucune commande correspondante","log.outcome.unauthorized":"expéditeur non autorisé","log.outcome.sent":"envoyé","presets.title":"Envoi rapide","presets.add":"Ajouter un préréglage","presets.empty":"Aucun préréglage.","presets.label":"Libellé","presets.text":"Message","presets.node":"ID de nœud (facultatif)","presets.nodeHint":"Laissez vide pour diffuser sur le canal de la passerelle.","presets.send":"Envoyer","presets.toChannel":"sur le canal","presets.toNode":"au nœud","status.title":"État","status.nodes":"Nœuds","status.commands":"Commandes configurées","status.executed":"Exécutées aujourd'hui","status.lastCommand":"Dernière commande","status.lastError":"Dernière erreur","status.none":"Aucun","status.noIntegration":"Aucune entité Hermes trouvée. Ajoutez d'abord l'intégration.","devices.title":"Appareils","devices.empty":"Aucun appareil Meshtastic trouvé. Configurez d'abord l'intégration Meshtastic.","devices.unknown":"Inconnu","map.noSelection":"Aucun nœud sélectionné. Choisissez les nœuds à afficher dans Paramètres.","map.noPosition":"Les nœuds sélectionnés n'ont pas encore transmis de position.","map.waiting":"en attente de position","map.showAll":"Afficher tous les nœuds du maillage","map.radiusFilter":"Filtrer par rayon","map.connected":"entendu récemment","map.notConnected":"pas entendu récemment","map.noneInRadius":"Aucun nœud dans le rayon. Élargissez-le ou désactivez le filtre.","settings.title":"Paramètres","settings.global":"Globaux","settings.owmKey":"Clé API OpenWeather","settings.owmHint":"Utilisée pour la couche météo de la carte. Stockée dans Home Assistant, jamais dans le dépôt.","settings.gateway":"Nœud passerelle","settings.mode":"Mode","settings.channel":"Canal","settings.initialDelay":"Délai initial (s)","settings.partDelay":"Délai entre les parties (s)","settings.authorizedNodes":"Nœuds autorisés","settings.mapNodes":"Nœuds affichés sur la carte","messages.title":"Messages","messages.gateway":"Passerelle","messages.add":"Ajouter un message","messages.empty":"Aucune commande configurée pour le moment.","messages.keyword":"Mot-clé","messages.matchType":"Type de correspondance","messages.service":"Service (domaine.service)","messages.serviceHint":"Facultatif. Laissez vide pour une commande qui répond seulement.","messages.target":"Entité cible","messages.targetHint":"L'entité sur laquelle agit le service. Laissez vide si le service n'en a pas besoin.","messages.replyHint":"Facultatif. Utilisez {state:entity_id} ou {attr:entity_id:attribute}.","messages.replyTemplate":"Modèle de réponse","messages.replyTo":"Routage de la réponse","messages.exact":"Correspondance exacte","messages.startswith":"Commence par","messages.onChannel":"Sur le canal","messages.senderDm":"DM à l'expéditeur","messages.confirmDelete":"Supprimer cette commande ?","messages.keywordHint":"Le texte envoyé depuis un nœud Meshtastic pour la déclencher.","messages.matchHint":'Utilisez "Commence par" pour accepter une valeur, comme "temp 21".',"messages.paletteEntity":"Choisissez une entité","messages.paletteHint":"Choisissez ce que vous voulez lire ou piloter, puis cliquez un bouton ci-dessous.","messages.pickEntityFirst":"Choisissez une entité pour voir ce que vous pouvez en faire.","messages.groupRead":"Lire","messages.groupDo":"Faire","messages.readState":"Valeur","messages.templateHint":"Composez avec les boutons ci-dessus. Les boutons d'action exécutent et n'envoient rien.","messages.advanced":"Avancé","messages.hideAdvanced":"Masquer avancé","common.comingSoon":"Arrive dans la prochaine phase de développement.","common.phase":"Phase","common.save":"Enregistrer","common.cancel":"Annuler","common.edit":"Modifier","common.delete":"Supprimer","common.loading":"Chargement","common.saved":"Enregistré","common.noEntries":"Aucune passerelle Hermes configurée pour le moment.","common.loadError":"Impossible de charger les données depuis Home Assistant."},de:{"tab.status":"Status","tab.devices":"Geräte","tab.map":"Karte","tab.messages":"Nachrichten","tab.homeassistant":"Home Assistant","tab.settings":"Einstellungen","tab.log":"Protokoll","log.all":"Alle","log.received":"Empfangen","log.sent":"Gesendet","log.clear":"Leeren","log.empty":"Noch nichts protokolliert.","log.privacy":"Das Protokoll speichert den Text der Nachrichten im Home-Assistant-Speicher, begrenzt auf 200 Einträge. Du kannst es jederzeit leeren.","log.outcome.matched":"Befehl ausgeführt","log.outcome.no_match":"kein Befehl passt","log.outcome.unauthorized":"Absender nicht autorisiert","log.outcome.sent":"gesendet","presets.title":"Schnellversand","presets.add":"Vorlage hinzufügen","presets.empty":"Noch keine Vorlage.","presets.label":"Bezeichnung","presets.text":"Nachricht","presets.node":"Node-ID (optional)","presets.nodeHint":"Leer lassen, um auf dem Kanal des Gateways zu senden.","presets.send":"Senden","presets.toChannel":"auf den Kanal","presets.toNode":"an Node","status.title":"Status","status.nodes":"Nodes","status.commands":"Konfigurierte Befehle","status.executed":"Heute ausgeführt","status.lastCommand":"Letzter Befehl","status.lastError":"Letzter Fehler","status.none":"Keine","status.noIntegration":"Keine Hermes-Entitäten gefunden. Füge zuerst die Integration hinzu.","devices.title":"Geräte","devices.empty":"Keine Meshtastic-Geräte gefunden. Richte zuerst die Meshtastic-Integration ein.","devices.unknown":"Unbekannt","map.noSelection":"Kein Node ausgewählt. Wähle in den Einstellungen die anzuzeigenden Nodes.","map.noPosition":"Die ausgewählten Nodes haben noch keine Position gemeldet.","map.waiting":"warte auf Position","map.showAll":"Alle Mesh-Nodes anzeigen","map.radiusFilter":"Nach Radius filtern","map.connected":"kürzlich gehört","map.notConnected":"nicht kürzlich gehört","map.noneInRadius":"Kein Node im Radius. Vergrößere ihn oder schalte den Filter aus.","settings.title":"Einstellungen","settings.global":"Global","settings.owmKey":"OpenWeather-API-Schlüssel","settings.owmHint":"Wird für die Wetterebene der Karte verwendet. In Home Assistant gespeichert, nie im Repository.","settings.gateway":"Gateway-Node","settings.mode":"Modus","settings.channel":"Kanal","settings.initialDelay":"Anfängliche Verzögerung (s)","settings.partDelay":"Verzögerung zwischen Teilen (s)","settings.authorizedNodes":"Autorisierte Nodes","settings.mapNodes":"Auf der Karte angezeigte Nodes","messages.title":"Nachrichten","messages.gateway":"Gateway","messages.add":"Nachricht hinzufügen","messages.empty":"Noch keine Befehle konfiguriert.","messages.keyword":"Schlüsselwort","messages.matchType":"Übereinstimmungstyp","messages.service":"Dienst (domain.service)","messages.serviceHint":"Optional. Leer lassen für einen Befehl, der nur antwortet.","messages.target":"Ziel-Entität","messages.targetHint":"Die Entität, auf die der Dienst wirkt. Leer lassen, wenn der Dienst keine benötigt.","messages.replyHint":"Optional. Verwende {state:entity_id} oder {attr:entity_id:attribute}.","messages.replyTemplate":"Antwortvorlage","messages.replyTo":"Antwort-Routing","messages.exact":"Exakte Übereinstimmung","messages.startswith":"Beginnt mit","messages.onChannel":"Auf dem Kanal","messages.senderDm":"DM an Absender","messages.confirmDelete":"Diesen Befehl löschen?","messages.keywordHint":"Der Text, den man von einem Meshtastic-Node sendet, um ihn auszulösen.","messages.matchHint":'Nutze "Beginnt mit", wenn ein Wert akzeptiert werden soll, etwa "temp 21".',"messages.paletteEntity":"Entität wählen","messages.paletteHint":"Wähle, was du lesen oder steuern willst, dann klicke unten einen Button.","messages.pickEntityFirst":"Wähle eine Entität, um zu sehen, was möglich ist.","messages.groupRead":"Lesen","messages.groupDo":"Ausführen","messages.readState":"Wert","messages.templateHint":"Mit den Buttons oben zusammenstellen. Aktions-Buttons führen aus und senden keinen Text.","messages.advanced":"Erweitert","messages.hideAdvanced":"Erweitert ausblenden","common.comingSoon":"Kommt in der nächsten Ausbaustufe.","common.phase":"Phase","common.save":"Speichern","common.cancel":"Abbrechen","common.edit":"Bearbeiten","common.delete":"Löschen","common.loading":"Wird geladen","common.saved":"Gespeichert","common.noEntries":"Noch kein Hermes-Gateway konfiguriert.","common.loadError":"Daten konnten nicht aus Home Assistant geladen werden."}};const vt=r`
  :host {
    display: block;
    height: 100%;
    box-sizing: border-box;
  }

  /* Lovelace "panel" view gives us the full viewport and overlays the HA app
   * bar on top of the card. hermes-card.ts sets the panel-mode attribute when
   * it detects that layout, and this padding offsets the content. */
  :host([panel-mode]) {
    padding-top: var(--hermes-panel-offset, var(--header-height, 56px));
  }

  :host {
    --font-sans: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: "JetBrains Mono", ui-monospace, Menlo, monospace;

    --bg: var(--ha-card-background, var(--card-background-color, var(--primary-background-color, oklch(0.985 0.004 85))));
    --bg-soft: var(--secondary-background-color, var(--primary-background-color, oklch(0.965 0.005 85)));
    --bg-sunken: var(--primary-background-color, var(--secondary-background-color, oklch(0.945 0.006 85)));
    --surface: var(--ha-card-background, var(--card-background-color, #ffffff));
    --border: var(--divider-color, oklch(0.90 0.006 85));
    --text: var(--primary-text-color, oklch(0.22 0.012 85));
    --text-soft: var(--secondary-text-color, oklch(0.42 0.012 85));
    --text-muted: var(--disabled-text-color, var(--secondary-text-color, oklch(0.60 0.010 85)));

    /* Accent: Hermes gold, taken from the logo. Never themed away. */
    --accent: oklch(0.82 0.16 92);
    --accent-strong: oklch(0.72 0.16 90);
    --accent-soft: oklch(0.95 0.06 92);
    --accent-ink: oklch(0.42 0.10 88);

    --ok: var(--success-color, oklch(0.65 0.14 155));
    --warn: var(--warning-color, oklch(0.72 0.15 65));
    --danger: var(--error-color, oklch(0.60 0.18 25));
    --info: var(--info-color, oklch(0.60 0.13 230));

    --r-sm: 6px;
    --r-md: 10px;
    --r-lg: 16px;
    --r-pill: 999px;

    --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.06);
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-md: 0 4px 14px rgba(0, 0, 0, 0.10), 0 2px 4px rgba(0, 0, 0, 0.06);

    --pad: 16px;

    font-family: var(--font-sans);
    color: var(--text);
  }

  /* Dark theme: the light yellow highlight would sit under the theme's white
   * text and become unreadable. Use a translucent accent that darkens instead,
   * and a light ink, so highlighted rows and chips stay legible either way.
   * Every rule that paints --accent-soft must also set --accent-ink as colour. */
  @media (prefers-color-scheme: dark) {
    :host {
      --accent-soft: rgba(255, 214, 10, 0.18);
      --accent-ink: oklch(0.9 0.12 92);
    }
  }
`,yt=r`
  .shell {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--bg);
    border-radius: var(--r-lg);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
  }

  .topbar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px var(--pad);
    background: var(--surface);
    border-bottom: 1px solid var(--border);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    letter-spacing: 0.2px;
  }

  .brand .dot {
    width: 10px;
    height: 10px;
    border-radius: var(--r-pill);
    background: var(--accent);
    box-shadow: 0 0 0 4px var(--accent-soft);
  }

  .brand .sub {
    color: var(--text-muted);
    font-weight: 500;
    font-size: 0.8rem;
  }

  .tabs {
    display: flex;
    gap: 4px;
    padding: 8px var(--pad);
    background: var(--bg-soft);
    border-bottom: 1px solid var(--border);
    overflow-x: auto;
    scrollbar-width: thin;
  }

  .tab {
    appearance: none;
    border: 1px solid transparent;
    background: transparent;
    color: var(--text-soft);
    font-family: inherit;
    font-size: 0.86rem;
    font-weight: 600;
    padding: 8px 14px;
    border-radius: var(--r-pill);
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .tab:hover {
    background: var(--surface);
    color: var(--text);
  }

  .tab[aria-selected="true"] {
    background: var(--accent-soft);
    color: var(--accent-ink);
    border-color: var(--accent);
  }

  .content {
    flex: 1;
    min-height: 0;
    overflow: auto;
    padding: var(--pad);
  }

  h2.screen-title {
    margin: 0 0 14px;
    font-size: 1.05rem;
    font-weight: 700;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    gap: 12px;
  }

  .panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    padding: 14px;
    box-shadow: var(--shadow-xs);
  }

  .stat .label {
    font-size: 0.74rem;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: var(--text-muted);
    font-weight: 700;
  }

  .stat .value {
    margin-top: 6px;
    font-size: 1.5rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  .stat .value.small {
    font-size: 0.95rem;
    font-weight: 600;
    word-break: break-word;
  }

  .node-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 10px;
  }

  .node-name {
    font-weight: 700;
    font-size: 0.95rem;
  }

  .node-num {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--text-muted);
  }

  .rows {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    font-size: 0.82rem;
    padding: 4px 0;
    border-bottom: 1px dashed var(--border);
  }

  .row:last-child {
    border-bottom: none;
  }

  .row .k {
    color: var(--text-soft);
  }

  .row .v {
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    text-align: right;
  }

  .empty {
    color: var(--text-muted);
    font-size: 0.9rem;
    background: var(--bg-sunken);
    border: 1px dashed var(--border);
    border-radius: var(--r-md);
    padding: 22px;
    text-align: center;
  }

  .badge {
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.4px;
    padding: 3px 9px;
    border-radius: var(--r-pill);
    background: var(--accent-soft);
    color: var(--accent-ink);
  }

  .section {
    margin-bottom: 18px;
  }

  .section-title {
    font-size: 0.76rem;
    text-transform: uppercase;
    letter-spacing: 0.7px;
    font-weight: 700;
    color: var(--text-muted);
    margin-bottom: 8px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 12px;
  }

  .field > label {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--text-soft);
  }

  .hint {
    font-size: 0.72rem;
    color: var(--text-muted);
  }

  input,
  select,
  textarea {
    font-family: inherit;
    font-size: 0.86rem;
    color: var(--text);
    background: var(--bg-sunken);
    border: 1px solid var(--border);
    border-radius: var(--r-sm);
    padding: 8px 10px;
    width: 100%;
    box-sizing: border-box;
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: 2px solid var(--accent);
    outline-offset: -1px;
  }

  select[multiple] {
    min-height: 110px;
  }

  textarea {
    min-height: 70px;
    resize: vertical;
  }

  .actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  button.btn {
    appearance: none;
    font-family: inherit;
    font-size: 0.82rem;
    font-weight: 700;
    padding: 8px 14px;
    border-radius: var(--r-pill);
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    cursor: pointer;
  }

  button.btn:hover {
    background: var(--bg-soft);
  }

  button.btn.primary {
    background: var(--accent);
    border-color: var(--accent-strong);
    /* The accent stays a bright gold in both themes, so the ink stays dark. */
    color: #1b1b1b;
  }

  button.btn.danger {
    color: var(--danger);
  }

  .list-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 12px;
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    background: var(--surface);
    margin-bottom: 8px;
  }

  .list-row .meta {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .list-row .kw {
    font-weight: 700;
    font-size: 0.9rem;
  }

  .list-row .sub {
    font-size: 0.75rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .toast {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--ok);
  }

  .palette {
    background: var(--bg-sunken);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    padding: 12px;
    margin-bottom: 14px;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
  }

  .chip-group {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-pill);
    padding: 3px 8px 3px 3px;
  }

  button.chip {
    appearance: none;
    font-family: inherit;
    font-size: 0.8rem;
    font-weight: 700;
    padding: 6px 12px;
    border-radius: var(--r-pill);
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    cursor: pointer;
    white-space: nowrap;
  }

  button.chip:hover {
    border-color: var(--accent);
    background: var(--bg-soft);
    color: var(--text);
  }

  button.chip.read {
    border-style: dashed;
  }

  /* Action chips read as "actionable" through the accent border rather than a
   * yellow fill, so the label keeps the theme text colour and stays legible on
   * dark dashboards. */
  button.chip.do {
    background: var(--surface);
    border-color: var(--accent);
    border-width: 2px;
    color: var(--text);
  }

  .chip-group button.chip {
    border: none;
    background: transparent;
    padding: 4px 8px;
  }

  input.inline {
    width: 76px;
    padding: 4px 6px;
    font-size: 0.78rem;
  }

  select.inline {
    width: auto;
    padding: 4px 6px;
    font-size: 0.78rem;
  }

  .unit {
    font-size: 0.72rem;
    color: var(--text-muted);
  }

  button.btn.link {
    background: none;
    border: none;
    color: var(--accent-ink);
    padding: 4px 0;
    text-decoration: underline;
  }

  .map-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px;
    margin-bottom: 10px;
  }

  label.check {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--text-soft);
    cursor: pointer;
  }

  label.check input {
    width: auto;
    margin: 0;
  }

  .radius {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .radius input[type="range"] {
    width: 160px;
    padding: 0;
  }

  .legend {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.74rem;
    color: var(--text-muted);
    margin-bottom: 10px;
  }

  .legend .dot {
    margin-left: 8px;
  }

  .dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 6px;
  }

  .dot.on {
    background: #2ecc71;
  }

  .dot.off {
    background: #ffd60a;
  }

  .log-row {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    padding: 8px 0;
    border-bottom: 1px dashed var(--border);
  }

  .log-row .dir {
    font-weight: 700;
    font-size: 1rem;
    line-height: 1.2;
  }

  .log-row .dir.in {
    color: var(--info);
  }

  .log-row .dir.out {
    color: var(--ok);
  }

  .log-body {
    min-width: 0;
    flex: 1;
  }

  .log-text {
    font-size: 0.84rem;
    word-break: break-word;
  }

  .log-meta {
    font-size: 0.7rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
    margin-top: 2px;
  }

  button.chip[data-on="1"] {
    border-color: var(--accent);
    border-width: 2px;
    background: var(--bg-soft);
  }

  .sub-error {
    margin-top: 8px;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--danger);
    word-break: break-word;
  }
`,bt="meshtastic",xt="hermes";function wt(t,e){const i=t.entities;return i?Object.values(i).filter(t=>t.platform===e):Object.keys(t.states).filter(t=>t.includes(e)).map(t=>({entity_id:t,platform:e}))}function Pt(t,e){for(const i of wt(t,xt))if(i.entity_id.endsWith(e)){const e=t.states[i.entity_id];if(e)return e}}function Lt(t,e){const i=t.devices?.[e];if(!i?.identifiers)return null;for(const t of i.identifiers)if(t?.[0]===bt){const e=Number.parseInt(String(t[1]),10);return Number.isNaN(e)?null:e}return null}function kt(t){const e=(t.split(".")[1]??t).split("_");return e.slice(Math.max(e.length-2,0)).join(" ")}function zt(t){const e=new Map;for(const i of wt(t,bt)){const n=i.device_id;if(!n)continue;const o=t.states[i.entity_id];if(!o)continue;let s=e.get(n);if(!s){const i=t.devices?.[n];s={deviceId:n,nodeNum:Lt(t,n),name:i?.name_by_user||i?.name||o.attributes?.friendly_name||n,values:{}},e.set(n,s)}s.values[kt(i.entity_id)]=o}return[...e.values()].sort((t,e)=>t.name.localeCompare(e.name))}const Tt=72e5;function Et(t,e){if(!e)return!1;const i=t.states[e];if(!i||"unavailable"===i.state||"unknown"===i.state)return!1;const n=Date.parse(i.state);return!Number.isNaN(n)&&Date.now()-n<=Tt}function St(t,e){const i=t.filter?t.entries.filter(e=>e.direction===t.filter):t.entries;return U`
    <h2 class="screen-title">${e("tab.log")}</h2>

    <div class="map-controls">
      ${["","in","out"].map(i=>U`
          <button
            class="chip"
            data-on=${t.filter===i?"1":"0"}
            @click=${()=>t.onFilter(i)}
          >
            ${e(""===i?"log.all":"in"===i?"log.received":"log.sent")}
          </button>
        `)}
      <button class="btn danger" style="margin-left:auto" @click=${t.onClear}>
        ${e("log.clear")}
      </button>
    </div>

    ${0===i.length?U`<div class="empty">${e("log.empty")}</div>`:U`
          <div class="rows">
            ${i.map(t=>function(t,e){const i=t.ts?new Date(t.ts).toLocaleString():"",n=`log.outcome.${t.outcome}`,o=e(n);return U`
    <div class="log-row">
      <span class="dir ${t.direction}">
        ${"in"===t.direction?"←":"→"}
      </span>
      <div class="log-body">
        <div class="log-text">${t.text}</div>
        <div class="log-meta">
          ${i}${t.node?` · ${t.node}`:""}
          ${o&&o!==n?` · ${o}`:""}
        </div>
      </div>
    </div>
  `}(t,e))}
          </div>
        `}

    <div class="hint" style="margin-top:12px">${e("log.privacy")}</div>
  `}var At,Mt={exports:{}};var Ct=(At||(At=1,function(t){var e="1.9.4";function i(t){var e,i,n,o;for(i=1,n=arguments.length;i<n;i++)for(e in o=arguments[i])t[e]=o[e];return t}var n=Object.create||function(){function t(){}return function(e){return t.prototype=e,new t}}();function o(t,e){var i=Array.prototype.slice;if(t.bind)return t.bind.apply(t,i.call(arguments,1));var n=i.call(arguments,2);return function(){return t.apply(e,n.length?n.concat(i.call(arguments)):arguments)}}var s=0;function a(t){return"_leaflet_id"in t||(t._leaflet_id=++s),t._leaflet_id}function r(t,e,i){var n,o,s,a;return a=function(){n=!1,o&&(s.apply(i,o),o=!1)},s=function(){n?o=arguments:(t.apply(i,arguments),setTimeout(a,e),n=!0)},s}function l(t,e,i){var n=e[1],o=e[0],s=n-o;return t===n&&i?t:((t-o)%s+s)%s+o}function h(){return!1}function c(t,e){if(!1===e)return t;var i=Math.pow(10,void 0===e?6:e);return Math.round(t*i)/i}function d(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function u(t){return d(t).split(/\s+/)}function p(t,e){for(var i in Object.prototype.hasOwnProperty.call(t,"options")||(t.options=t.options?n(t.options):{}),e)t.options[i]=e[i];return t.options}function m(t,e,i){var n=[];for(var o in t)n.push(encodeURIComponent(i?o.toUpperCase():o)+"="+encodeURIComponent(t[o]));return(e&&-1!==e.indexOf("?")?"&":"?")+n.join("&")}var _=/\{ *([\w_ -]+) *\}/g;function f(t,e){return t.replace(_,function(t,i){var n=e[i];if(void 0===n)throw new Error("No value provided for variable "+t);return"function"==typeof n&&(n=n(e)),n})}var g=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)};function v(t,e){for(var i=0;i<t.length;i++)if(t[i]===e)return i;return-1}var y="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function b(t){return window["webkit"+t]||window["moz"+t]||window["ms"+t]}var x=0;function w(t){var e=+new Date,i=Math.max(0,16-(e-x));return x=e+i,window.setTimeout(t,i)}var P=window.requestAnimationFrame||b("RequestAnimationFrame")||w,k=window.cancelAnimationFrame||b("CancelAnimationFrame")||b("CancelRequestAnimationFrame")||function(t){window.clearTimeout(t)};function z(t,e,i){if(!i||P!==w)return P.call(window,o(t,e));t.call(e)}function T(t){t&&k.call(window,t)}var E={__proto__:null,extend:i,create:n,bind:o,get lastId(){return s},stamp:a,throttle:r,wrapNum:l,falseFn:h,formatNum:c,trim:d,splitWords:u,setOptions:p,getParamString:m,template:f,isArray:g,indexOf:v,emptyImageUrl:y,requestFn:P,cancelFn:k,requestAnimFrame:z,cancelAnimFrame:T};function S(){}function A(t){if("undefined"!=typeof L&&L&&L.Mixin){t=g(t)?t:[t];for(var e=0;e<t.length;e++)t[e]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",(new Error).stack)}}S.extend=function(t){var e=function(){p(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},o=e.__super__=this.prototype,s=n(o);for(var a in s.constructor=e,e.prototype=s,this)Object.prototype.hasOwnProperty.call(this,a)&&"prototype"!==a&&"__super__"!==a&&(e[a]=this[a]);return t.statics&&i(e,t.statics),t.includes&&(A(t.includes),i.apply(null,[s].concat(t.includes))),i(s,t),delete s.statics,delete s.includes,s.options&&(s.options=o.options?n(o.options):{},i(s.options,t.options)),s._initHooks=[],s.callInitHooks=function(){if(!this._initHooksCalled){o.callInitHooks&&o.callInitHooks.call(this),this._initHooksCalled=!0;for(var t=0,e=s._initHooks.length;t<e;t++)s._initHooks[t].call(this)}},e},S.include=function(t){var e=this.prototype.options;return i(this.prototype,t),t.options&&(this.prototype.options=e,this.mergeOptions(t.options)),this},S.mergeOptions=function(t){return i(this.prototype.options,t),this},S.addInitHook=function(t){var e=Array.prototype.slice.call(arguments,1),i="function"==typeof t?t:function(){this[t].apply(this,e)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(i),this};var M={on:function(t,e,i){if("object"==typeof t)for(var n in t)this._on(n,t[n],e);else for(var o=0,s=(t=u(t)).length;o<s;o++)this._on(t[o],e,i);return this},off:function(t,e,i){if(arguments.length)if("object"==typeof t)for(var n in t)this._off(n,t[n],e);else{t=u(t);for(var o=1===arguments.length,s=0,a=t.length;s<a;s++)o?this._off(t[s]):this._off(t[s],e,i)}else delete this._events;return this},_on:function(t,e,i,n){if("function"==typeof e){if(!1===this._listens(t,e,i)){i===this&&(i=void 0);var o={fn:e,ctx:i};n&&(o.once=!0),this._events=this._events||{},this._events[t]=this._events[t]||[],this._events[t].push(o)}}else console.warn("wrong listener type: "+typeof e)},_off:function(t,e,i){var n,o,s;if(this._events&&(n=this._events[t]))if(1!==arguments.length)if("function"==typeof e){var a=this._listens(t,e,i);if(!1!==a){var r=n[a];this._firingCount&&(r.fn=h,this._events[t]=n=n.slice()),n.splice(a,1)}}else console.warn("wrong listener type: "+typeof e);else{if(this._firingCount)for(o=0,s=n.length;o<s;o++)n[o].fn=h;delete this._events[t]}},fire:function(t,e,n){if(!this.listens(t,n))return this;var o=i({},e,{type:t,target:this,sourceTarget:e&&e.sourceTarget||this});if(this._events){var s=this._events[t];if(s){this._firingCount=this._firingCount+1||1;for(var a=0,r=s.length;a<r;a++){var l=s[a],h=l.fn;l.once&&this.off(t,h,l.ctx),h.call(l.ctx||this,o)}this._firingCount--}}return n&&this._propagateEvent(o),this},listens:function(t,e,i,n){"string"!=typeof t&&console.warn('"string" type argument expected');var o=e;"function"!=typeof e&&(n=!!e,o=void 0,i=void 0);var s=this._events&&this._events[t];if(s&&s.length&&!1!==this._listens(t,o,i))return!0;if(n)for(var a in this._eventParents)if(this._eventParents[a].listens(t,e,i,n))return!0;return!1},_listens:function(t,e,i){if(!this._events)return!1;var n=this._events[t]||[];if(!e)return!!n.length;i===this&&(i=void 0);for(var o=0,s=n.length;o<s;o++)if(n[o].fn===e&&n[o].ctx===i)return o;return!1},once:function(t,e,i){if("object"==typeof t)for(var n in t)this._on(n,t[n],e,!0);else for(var o=0,s=(t=u(t)).length;o<s;o++)this._on(t[o],e,i,!0);return this},addEventParent:function(t){return this._eventParents=this._eventParents||{},this._eventParents[a(t)]=t,this},removeEventParent:function(t){return this._eventParents&&delete this._eventParents[a(t)],this},_propagateEvent:function(t){for(var e in this._eventParents)this._eventParents[e].fire(t.type,i({layer:t.target,propagatedFrom:t.target},t),!0)}};M.addEventListener=M.on,M.removeEventListener=M.clearAllEventListeners=M.off,M.addOneTimeEventListener=M.once,M.fireEvent=M.fire,M.hasEventListeners=M.listens;var C=S.extend(M);function $(t,e,i){this.x=i?Math.round(t):t,this.y=i?Math.round(e):e}var O=Math.trunc||function(t){return t>0?Math.floor(t):Math.ceil(t)};function I(t,e,i){return t instanceof $?t:g(t)?new $(t[0],t[1]):null==t?t:"object"==typeof t&&"x"in t&&"y"in t?new $(t.x,t.y):new $(t,e,i)}function Z(t,e){if(t)for(var i=e?[t,e]:t,n=0,o=i.length;n<o;n++)this.extend(i[n])}function N(t,e){return!t||t instanceof Z?t:new Z(t,e)}function B(t,e){if(t)for(var i=e?[t,e]:t,n=0,o=i.length;n<o;n++)this.extend(i[n])}function D(t,e){return t instanceof B?t:new B(t,e)}function R(t,e,i){if(isNaN(t)||isNaN(e))throw new Error("Invalid LatLng object: ("+t+", "+e+")");this.lat=+t,this.lng=+e,void 0!==i&&(this.alt=+i)}function H(t,e,i){return t instanceof R?t:g(t)&&"object"!=typeof t[0]?3===t.length?new R(t[0],t[1],t[2]):2===t.length?new R(t[0],t[1]):null:null==t?t:"object"==typeof t&&"lat"in t?new R(t.lat,"lng"in t?t.lng:t.lon,t.alt):void 0===e?null:new R(t,e,i)}$.prototype={clone:function(){return new $(this.x,this.y)},add:function(t){return this.clone()._add(I(t))},_add:function(t){return this.x+=t.x,this.y+=t.y,this},subtract:function(t){return this.clone()._subtract(I(t))},_subtract:function(t){return this.x-=t.x,this.y-=t.y,this},divideBy:function(t){return this.clone()._divideBy(t)},_divideBy:function(t){return this.x/=t,this.y/=t,this},multiplyBy:function(t){return this.clone()._multiplyBy(t)},_multiplyBy:function(t){return this.x*=t,this.y*=t,this},scaleBy:function(t){return new $(this.x*t.x,this.y*t.y)},unscaleBy:function(t){return new $(this.x/t.x,this.y/t.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=O(this.x),this.y=O(this.y),this},distanceTo:function(t){var e=(t=I(t)).x-this.x,i=t.y-this.y;return Math.sqrt(e*e+i*i)},equals:function(t){return(t=I(t)).x===this.x&&t.y===this.y},contains:function(t){return t=I(t),Math.abs(t.x)<=Math.abs(this.x)&&Math.abs(t.y)<=Math.abs(this.y)},toString:function(){return"Point("+c(this.x)+", "+c(this.y)+")"}},Z.prototype={extend:function(t){var e,i;if(!t)return this;if(t instanceof $||"number"==typeof t[0]||"x"in t)e=i=I(t);else if(e=(t=N(t)).min,i=t.max,!e||!i)return this;return this.min||this.max?(this.min.x=Math.min(e.x,this.min.x),this.max.x=Math.max(i.x,this.max.x),this.min.y=Math.min(e.y,this.min.y),this.max.y=Math.max(i.y,this.max.y)):(this.min=e.clone(),this.max=i.clone()),this},getCenter:function(t){return I((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,t)},getBottomLeft:function(){return I(this.min.x,this.max.y)},getTopRight:function(){return I(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(t){var e,i;return(t="number"==typeof t[0]||t instanceof $?I(t):N(t))instanceof Z?(e=t.min,i=t.max):e=i=t,e.x>=this.min.x&&i.x<=this.max.x&&e.y>=this.min.y&&i.y<=this.max.y},intersects:function(t){t=N(t);var e=this.min,i=this.max,n=t.min,o=t.max,s=o.x>=e.x&&n.x<=i.x,a=o.y>=e.y&&n.y<=i.y;return s&&a},overlaps:function(t){t=N(t);var e=this.min,i=this.max,n=t.min,o=t.max,s=o.x>e.x&&n.x<i.x,a=o.y>e.y&&n.y<i.y;return s&&a},isValid:function(){return!(!this.min||!this.max)},pad:function(t){var e=this.min,i=this.max,n=Math.abs(e.x-i.x)*t,o=Math.abs(e.y-i.y)*t;return N(I(e.x-n,e.y-o),I(i.x+n,i.y+o))},equals:function(t){return!!t&&(t=N(t),this.min.equals(t.getTopLeft())&&this.max.equals(t.getBottomRight()))}},B.prototype={extend:function(t){var e,i,n=this._southWest,o=this._northEast;if(t instanceof R)e=t,i=t;else{if(!(t instanceof B))return t?this.extend(H(t)||D(t)):this;if(e=t._southWest,i=t._northEast,!e||!i)return this}return n||o?(n.lat=Math.min(e.lat,n.lat),n.lng=Math.min(e.lng,n.lng),o.lat=Math.max(i.lat,o.lat),o.lng=Math.max(i.lng,o.lng)):(this._southWest=new R(e.lat,e.lng),this._northEast=new R(i.lat,i.lng)),this},pad:function(t){var e=this._southWest,i=this._northEast,n=Math.abs(e.lat-i.lat)*t,o=Math.abs(e.lng-i.lng)*t;return new B(new R(e.lat-n,e.lng-o),new R(i.lat+n,i.lng+o))},getCenter:function(){return new R((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new R(this.getNorth(),this.getWest())},getSouthEast:function(){return new R(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(t){t="number"==typeof t[0]||t instanceof R||"lat"in t?H(t):D(t);var e,i,n=this._southWest,o=this._northEast;return t instanceof B?(e=t.getSouthWest(),i=t.getNorthEast()):e=i=t,e.lat>=n.lat&&i.lat<=o.lat&&e.lng>=n.lng&&i.lng<=o.lng},intersects:function(t){t=D(t);var e=this._southWest,i=this._northEast,n=t.getSouthWest(),o=t.getNorthEast(),s=o.lat>=e.lat&&n.lat<=i.lat,a=o.lng>=e.lng&&n.lng<=i.lng;return s&&a},overlaps:function(t){t=D(t);var e=this._southWest,i=this._northEast,n=t.getSouthWest(),o=t.getNorthEast(),s=o.lat>e.lat&&n.lat<i.lat,a=o.lng>e.lng&&n.lng<i.lng;return s&&a},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(t,e){return!!t&&(t=D(t),this._southWest.equals(t.getSouthWest(),e)&&this._northEast.equals(t.getNorthEast(),e))},isValid:function(){return!(!this._southWest||!this._northEast)}},R.prototype={equals:function(t,e){return!!t&&(t=H(t),Math.max(Math.abs(this.lat-t.lat),Math.abs(this.lng-t.lng))<=(void 0===e?1e-9:e))},toString:function(t){return"LatLng("+c(this.lat,t)+", "+c(this.lng,t)+")"},distanceTo:function(t){return F.distance(this,H(t))},wrap:function(){return F.wrapLatLng(this)},toBounds:function(t){var e=180*t/40075017,i=e/Math.cos(Math.PI/180*this.lat);return D([this.lat-e,this.lng-i],[this.lat+e,this.lng+i])},clone:function(){return new R(this.lat,this.lng,this.alt)}};var j={latLngToPoint:function(t,e){var i=this.projection.project(t),n=this.scale(e);return this.transformation._transform(i,n)},pointToLatLng:function(t,e){var i=this.scale(e),n=this.transformation.untransform(t,i);return this.projection.unproject(n)},project:function(t){return this.projection.project(t)},unproject:function(t){return this.projection.unproject(t)},scale:function(t){return 256*Math.pow(2,t)},zoom:function(t){return Math.log(t/256)/Math.LN2},getProjectedBounds:function(t){if(this.infinite)return null;var e=this.projection.bounds,i=this.scale(t);return new Z(this.transformation.transform(e.min,i),this.transformation.transform(e.max,i))},infinite:!1,wrapLatLng:function(t){var e=this.wrapLng?l(t.lng,this.wrapLng,!0):t.lng;return new R(this.wrapLat?l(t.lat,this.wrapLat,!0):t.lat,e,t.alt)},wrapLatLngBounds:function(t){var e=t.getCenter(),i=this.wrapLatLng(e),n=e.lat-i.lat,o=e.lng-i.lng;if(0===n&&0===o)return t;var s=t.getSouthWest(),a=t.getNorthEast();return new B(new R(s.lat-n,s.lng-o),new R(a.lat-n,a.lng-o))}},F=i({},j,{wrapLng:[-180,180],R:6371e3,distance:function(t,e){var i=Math.PI/180,n=t.lat*i,o=e.lat*i,s=Math.sin((e.lat-t.lat)*i/2),a=Math.sin((e.lng-t.lng)*i/2),r=s*s+Math.cos(n)*Math.cos(o)*a*a,l=2*Math.atan2(Math.sqrt(r),Math.sqrt(1-r));return this.R*l}}),W=6378137,U={R:W,MAX_LATITUDE:85.0511287798,project:function(t){var e=Math.PI/180,i=this.MAX_LATITUDE,n=Math.max(Math.min(i,t.lat),-i),o=Math.sin(n*e);return new $(this.R*t.lng*e,this.R*Math.log((1+o)/(1-o))/2)},unproject:function(t){var e=180/Math.PI;return new R((2*Math.atan(Math.exp(t.y/this.R))-Math.PI/2)*e,t.x*e/this.R)},bounds:function(){var t=W*Math.PI;return new Z([-t,-t],[t,t])}()};function V(t,e,i,n){if(g(t))return this._a=t[0],this._b=t[1],this._c=t[2],void(this._d=t[3]);this._a=t,this._b=e,this._c=i,this._d=n}function q(t,e,i,n){return new V(t,e,i,n)}V.prototype={transform:function(t,e){return this._transform(t.clone(),e)},_transform:function(t,e){return e=e||1,t.x=e*(this._a*t.x+this._b),t.y=e*(this._c*t.y+this._d),t},untransform:function(t,e){return e=e||1,new $((t.x/e-this._b)/this._a,(t.y/e-this._d)/this._c)}};var G=i({},F,{code:"EPSG:3857",projection:U,transformation:function(){var t=.5/(Math.PI*U.R);return q(t,.5,-t,.5)}()}),K=i({},G,{code:"EPSG:900913"});function Y(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function J(t,e){var i,n,o,s,a,r,l="";for(i=0,o=t.length;i<o;i++){for(n=0,s=(a=t[i]).length;n<s;n++)l+=(n?"L":"M")+(r=a[n]).x+" "+r.y;l+=e?Nt.svg?"z":"x":""}return l||"M0 0"}var X,Q=document.documentElement.style,tt="ActiveXObject"in window,et=tt&&!document.addEventListener,it="msLaunchUri"in navigator&&!("documentMode"in document),nt=Zt("webkit"),ot=Zt("android"),st=Zt("android 2")||Zt("android 3"),at=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),rt=ot&&Zt("Google")&&at<537&&!("AudioNode"in window),lt=!!window.opera,ht=!it&&Zt("chrome"),ct=Zt("gecko")&&!nt&&!lt&&!tt,dt=!ht&&Zt("safari"),ut=Zt("phantom"),pt="OTransition"in Q,mt=0===navigator.platform.indexOf("Win"),_t=tt&&"transition"in Q,ft="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!st,gt="MozPerspective"in Q,vt=!window.L_DISABLE_3D&&(_t||ft||gt)&&!pt&&!ut,yt="undefined"!=typeof orientation||Zt("mobile"),bt=yt&&nt,xt=yt&&ft,wt=!window.PointerEvent&&window.MSPointerEvent,Pt=!(!window.PointerEvent&&!wt),Lt="ontouchstart"in window||!!window.TouchEvent,kt=!window.L_NO_TOUCH&&(Lt||Pt),zt=yt&&lt,Tt=yt&&ct,Et=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,St=function(){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("testPassiveEventSupport",h,e),window.removeEventListener("testPassiveEventSupport",h,e)}catch(t){}return t}(),At=!!document.createElement("canvas").getContext,Mt=!(!document.createElementNS||!Y("svg").createSVGRect),Ct=!!Mt&&((X=document.createElement("div")).innerHTML="<svg/>","http://www.w3.org/2000/svg"===(X.firstChild&&X.firstChild.namespaceURI)),$t=!Mt&&function(){try{var t=document.createElement("div");t.innerHTML='<v:shape adj="1"/>';var e=t.firstChild;return e.style.behavior="url(#default#VML)",e&&"object"==typeof e.adj}catch(t){return!1}}(),Ot=0===navigator.platform.indexOf("Mac"),It=0===navigator.platform.indexOf("Linux");function Zt(t){return navigator.userAgent.toLowerCase().indexOf(t)>=0}var Nt={ie:tt,ielt9:et,edge:it,webkit:nt,android:ot,android23:st,androidStock:rt,opera:lt,chrome:ht,gecko:ct,safari:dt,phantom:ut,opera12:pt,win:mt,ie3d:_t,webkit3d:ft,gecko3d:gt,any3d:vt,mobile:yt,mobileWebkit:bt,mobileWebkit3d:xt,msPointer:wt,pointer:Pt,touch:kt,touchNative:Lt,mobileOpera:zt,mobileGecko:Tt,retina:Et,passiveEvents:St,canvas:At,svg:Mt,vml:$t,inlineSvg:Ct,mac:Ot,linux:It},Bt=Nt.msPointer?"MSPointerDown":"pointerdown",Dt=Nt.msPointer?"MSPointerMove":"pointermove",Rt=Nt.msPointer?"MSPointerUp":"pointerup",Ht=Nt.msPointer?"MSPointerCancel":"pointercancel",jt={touchstart:Bt,touchmove:Dt,touchend:Rt,touchcancel:Ht},Ft={touchstart:Qt,touchmove:Xt,touchend:Xt,touchcancel:Xt},Wt={},Ut=!1;function Vt(t,e,i){return"touchstart"===e&&Jt(),Ft[e]?(i=Ft[e].bind(this,i),t.addEventListener(jt[e],i,!1),i):(console.warn("wrong event specified:",e),h)}function qt(t,e,i){jt[e]?t.removeEventListener(jt[e],i,!1):console.warn("wrong event specified:",e)}function Gt(t){Wt[t.pointerId]=t}function Kt(t){Wt[t.pointerId]&&(Wt[t.pointerId]=t)}function Yt(t){delete Wt[t.pointerId]}function Jt(){Ut||(document.addEventListener(Bt,Gt,!0),document.addEventListener(Dt,Kt,!0),document.addEventListener(Rt,Yt,!0),document.addEventListener(Ht,Yt,!0),Ut=!0)}function Xt(t,e){if(e.pointerType!==(e.MSPOINTER_TYPE_MOUSE||"mouse")){for(var i in e.touches=[],Wt)e.touches.push(Wt[i]);e.changedTouches=[e],t(e)}}function Qt(t,e){e.MSPOINTER_TYPE_TOUCH&&e.pointerType===e.MSPOINTER_TYPE_TOUCH&&Ge(e),Xt(t,e)}function te(t){var e,i,n={};for(i in t)e=t[i],n[i]=e&&e.bind?e.bind(t):e;return t=n,n.type="dblclick",n.detail=2,n.isTrusted=!1,n._simulated=!0,n}var ee=200;function ie(t,e){t.addEventListener("dblclick",e);var i,n=0;function o(t){if(1===t.detail){if("mouse"!==t.pointerType&&(!t.sourceCapabilities||t.sourceCapabilities.firesTouchEvents)){var o=Ye(t);if(!o.some(function(t){return t instanceof HTMLLabelElement&&t.attributes.for})||o.some(function(t){return t instanceof HTMLInputElement||t instanceof HTMLSelectElement})){var s=Date.now();s-n<=ee?2===++i&&e(te(t)):i=1,n=s}}}else i=t.detail}return t.addEventListener("click",o),{dblclick:e,simDblclick:o}}function ne(t,e){t.removeEventListener("dblclick",e.dblclick),t.removeEventListener("click",e.simDblclick)}var oe,se,ae,re,le,he=ze(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),ce=ze(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),de="webkitTransition"===ce||"OTransition"===ce?ce+"End":"transitionend";function ue(t){return"string"==typeof t?document.getElementById(t):t}function pe(t,e){var i=t.style[e]||t.currentStyle&&t.currentStyle[e];if((!i||"auto"===i)&&document.defaultView){var n=document.defaultView.getComputedStyle(t,null);i=n?n[e]:null}return"auto"===i?null:i}function me(t,e,i){var n=document.createElement(t);return n.className=e||"",i&&i.appendChild(n),n}function _e(t){var e=t.parentNode;e&&e.removeChild(t)}function fe(t){for(;t.firstChild;)t.removeChild(t.firstChild)}function ge(t){var e=t.parentNode;e&&e.lastChild!==t&&e.appendChild(t)}function ve(t){var e=t.parentNode;e&&e.firstChild!==t&&e.insertBefore(t,e.firstChild)}function ye(t,e){if(void 0!==t.classList)return t.classList.contains(e);var i=Pe(t);return i.length>0&&new RegExp("(^|\\s)"+e+"(\\s|$)").test(i)}function be(t,e){if(void 0!==t.classList)for(var i=u(e),n=0,o=i.length;n<o;n++)t.classList.add(i[n]);else if(!ye(t,e)){var s=Pe(t);we(t,(s?s+" ":"")+e)}}function xe(t,e){void 0!==t.classList?t.classList.remove(e):we(t,d((" "+Pe(t)+" ").replace(" "+e+" "," ")))}function we(t,e){void 0===t.className.baseVal?t.className=e:t.className.baseVal=e}function Pe(t){return t.correspondingElement&&(t=t.correspondingElement),void 0===t.className.baseVal?t.className:t.className.baseVal}function Le(t,e){"opacity"in t.style?t.style.opacity=e:"filter"in t.style&&ke(t,e)}function ke(t,e){var i=!1,n="DXImageTransform.Microsoft.Alpha";try{i=t.filters.item(n)}catch(t){if(1===e)return}e=Math.round(100*e),i?(i.Enabled=100!==e,i.Opacity=e):t.style.filter+=" progid:"+n+"(opacity="+e+")"}function ze(t){for(var e=document.documentElement.style,i=0;i<t.length;i++)if(t[i]in e)return t[i];return!1}function Te(t,e,i){var n=e||new $(0,0);t.style[he]=(Nt.ie3d?"translate("+n.x+"px,"+n.y+"px)":"translate3d("+n.x+"px,"+n.y+"px,0)")+(i?" scale("+i+")":"")}function Ee(t,e){t._leaflet_pos=e,Nt.any3d?Te(t,e):(t.style.left=e.x+"px",t.style.top=e.y+"px")}function Se(t){return t._leaflet_pos||new $(0,0)}if("onselectstart"in document)oe=function(){Be(window,"selectstart",Ge)},se=function(){Re(window,"selectstart",Ge)};else{var Ae=ze(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);oe=function(){if(Ae){var t=document.documentElement.style;ae=t[Ae],t[Ae]="none"}},se=function(){Ae&&(document.documentElement.style[Ae]=ae,ae=void 0)}}function Me(){Be(window,"dragstart",Ge)}function Ce(){Re(window,"dragstart",Ge)}function $e(t){for(;-1===t.tabIndex;)t=t.parentNode;t.style&&(Oe(),re=t,le=t.style.outlineStyle,t.style.outlineStyle="none",Be(window,"keydown",Oe))}function Oe(){re&&(re.style.outlineStyle=le,re=void 0,le=void 0,Re(window,"keydown",Oe))}function Ie(t){do{t=t.parentNode}while(!(t.offsetWidth&&t.offsetHeight||t===document.body));return t}function Ze(t){var e=t.getBoundingClientRect();return{x:e.width/t.offsetWidth||1,y:e.height/t.offsetHeight||1,boundingClientRect:e}}var Ne={__proto__:null,TRANSFORM:he,TRANSITION:ce,TRANSITION_END:de,get:ue,getStyle:pe,create:me,remove:_e,empty:fe,toFront:ge,toBack:ve,hasClass:ye,addClass:be,removeClass:xe,setClass:we,getClass:Pe,setOpacity:Le,testProp:ze,setTransform:Te,setPosition:Ee,getPosition:Se,get disableTextSelection(){return oe},get enableTextSelection(){return se},disableImageDrag:Me,enableImageDrag:Ce,preventOutline:$e,restoreOutline:Oe,getSizedParentNode:Ie,getScale:Ze};function Be(t,e,i,n){if(e&&"object"==typeof e)for(var o in e)Fe(t,o,e[o],i);else for(var s=0,a=(e=u(e)).length;s<a;s++)Fe(t,e[s],i,n);return this}var De="_leaflet_events";function Re(t,e,i,n){if(1===arguments.length)He(t),delete t[De];else if(e&&"object"==typeof e)for(var o in e)We(t,o,e[o],i);else if(e=u(e),2===arguments.length)He(t,function(t){return-1!==v(e,t)});else for(var s=0,a=e.length;s<a;s++)We(t,e[s],i,n);return this}function He(t,e){for(var i in t[De]){var n=i.split(/\d/)[0];e&&!e(n)||We(t,n,null,null,i)}}var je={mouseenter:"mouseover",mouseleave:"mouseout",wheel:!("onwheel"in window)&&"mousewheel"};function Fe(t,e,i,n){var o=e+a(i)+(n?"_"+a(n):"");if(t[De]&&t[De][o])return this;var s=function(e){return i.call(n||t,e||window.event)},r=s;!Nt.touchNative&&Nt.pointer&&0===e.indexOf("touch")?s=Vt(t,e,s):Nt.touch&&"dblclick"===e?s=ie(t,s):"addEventListener"in t?"touchstart"===e||"touchmove"===e||"wheel"===e||"mousewheel"===e?t.addEventListener(je[e]||e,s,!!Nt.passiveEvents&&{passive:!1}):"mouseenter"===e||"mouseleave"===e?(s=function(e){e=e||window.event,ti(t,e)&&r(e)},t.addEventListener(je[e],s,!1)):t.addEventListener(e,r,!1):t.attachEvent("on"+e,s),t[De]=t[De]||{},t[De][o]=s}function We(t,e,i,n,o){o=o||e+a(i)+(n?"_"+a(n):"");var s=t[De]&&t[De][o];if(!s)return this;!Nt.touchNative&&Nt.pointer&&0===e.indexOf("touch")?qt(t,e,s):Nt.touch&&"dblclick"===e?ne(t,s):"removeEventListener"in t?t.removeEventListener(je[e]||e,s,!1):t.detachEvent("on"+e,s),t[De][o]=null}function Ue(t){return t.stopPropagation?t.stopPropagation():t.originalEvent?t.originalEvent._stopped=!0:t.cancelBubble=!0,this}function Ve(t){return Fe(t,"wheel",Ue),this}function qe(t){return Be(t,"mousedown touchstart dblclick contextmenu",Ue),t._leaflet_disable_click=!0,this}function Ge(t){return t.preventDefault?t.preventDefault():t.returnValue=!1,this}function Ke(t){return Ge(t),Ue(t),this}function Ye(t){if(t.composedPath)return t.composedPath();for(var e=[],i=t.target;i;)e.push(i),i=i.parentNode;return e}function Je(t,e){if(!e)return new $(t.clientX,t.clientY);var i=Ze(e),n=i.boundingClientRect;return new $((t.clientX-n.left)/i.x-e.clientLeft,(t.clientY-n.top)/i.y-e.clientTop)}var Xe=Nt.linux&&Nt.chrome?window.devicePixelRatio:Nt.mac?3*window.devicePixelRatio:window.devicePixelRatio>0?2*window.devicePixelRatio:1;function Qe(t){return Nt.edge?t.wheelDeltaY/2:t.deltaY&&0===t.deltaMode?-t.deltaY/Xe:t.deltaY&&1===t.deltaMode?20*-t.deltaY:t.deltaY&&2===t.deltaMode?60*-t.deltaY:t.deltaX||t.deltaZ?0:t.wheelDelta?(t.wheelDeltaY||t.wheelDelta)/2:t.detail&&Math.abs(t.detail)<32765?20*-t.detail:t.detail?t.detail/-32765*60:0}function ti(t,e){var i=e.relatedTarget;if(!i)return!0;try{for(;i&&i!==t;)i=i.parentNode}catch(t){return!1}return i!==t}var ei={__proto__:null,on:Be,off:Re,stopPropagation:Ue,disableScrollPropagation:Ve,disableClickPropagation:qe,preventDefault:Ge,stop:Ke,getPropagationPath:Ye,getMousePosition:Je,getWheelDelta:Qe,isExternalTarget:ti,addListener:Be,removeListener:Re},ii=C.extend({run:function(t,e,i,n){this.stop(),this._el=t,this._inProgress=!0,this._duration=i||.25,this._easeOutPower=1/Math.max(n||.5,.2),this._startPos=Se(t),this._offset=e.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=z(this._animate,this),this._step()},_step:function(t){var e=+new Date-this._startTime,i=1e3*this._duration;e<i?this._runFrame(this._easeOut(e/i),t):(this._runFrame(1),this._complete())},_runFrame:function(t,e){var i=this._startPos.add(this._offset.multiplyBy(t));e&&i._round(),Ee(this._el,i),this.fire("step")},_complete:function(){T(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(t){return 1-Math.pow(1-t,this._easeOutPower)}}),ni=C.extend({options:{crs:G,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(t,e){e=p(this,e),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(t),this._initLayout(),this._onResize=o(this._onResize,this),this._initEvents(),e.maxBounds&&this.setMaxBounds(e.maxBounds),void 0!==e.zoom&&(this._zoom=this._limitZoom(e.zoom)),e.center&&void 0!==e.zoom&&this.setView(H(e.center),e.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=ce&&Nt.any3d&&!Nt.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),Be(this._proxy,de,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(t,e,n){return e=void 0===e?this._zoom:this._limitZoom(e),t=this._limitCenter(H(t),e,this.options.maxBounds),n=n||{},this._stop(),this._loaded&&!n.reset&&!0!==n&&(void 0!==n.animate&&(n.zoom=i({animate:n.animate},n.zoom),n.pan=i({animate:n.animate,duration:n.duration},n.pan)),this._zoom!==e?this._tryAnimatedZoom&&this._tryAnimatedZoom(t,e,n.zoom):this._tryAnimatedPan(t,n.pan))?(clearTimeout(this._sizeTimer),this):(this._resetView(t,e,n.pan&&n.pan.noMoveStart),this)},setZoom:function(t,e){return this._loaded?this.setView(this.getCenter(),t,{zoom:e}):(this._zoom=t,this)},zoomIn:function(t,e){return t=t||(Nt.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+t,e)},zoomOut:function(t,e){return t=t||(Nt.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-t,e)},setZoomAround:function(t,e,i){var n=this.getZoomScale(e),o=this.getSize().divideBy(2),s=(t instanceof $?t:this.latLngToContainerPoint(t)).subtract(o).multiplyBy(1-1/n),a=this.containerPointToLatLng(o.add(s));return this.setView(a,e,{zoom:i})},_getBoundsCenterZoom:function(t,e){e=e||{},t=t.getBounds?t.getBounds():D(t);var i=I(e.paddingTopLeft||e.padding||[0,0]),n=I(e.paddingBottomRight||e.padding||[0,0]),o=this.getBoundsZoom(t,!1,i.add(n));if((o="number"==typeof e.maxZoom?Math.min(e.maxZoom,o):o)===1/0)return{center:t.getCenter(),zoom:o};var s=n.subtract(i).divideBy(2),a=this.project(t.getSouthWest(),o),r=this.project(t.getNorthEast(),o);return{center:this.unproject(a.add(r).divideBy(2).add(s),o),zoom:o}},fitBounds:function(t,e){if(!(t=D(t)).isValid())throw new Error("Bounds are not valid.");var i=this._getBoundsCenterZoom(t,e);return this.setView(i.center,i.zoom,e)},fitWorld:function(t){return this.fitBounds([[-90,-180],[90,180]],t)},panTo:function(t,e){return this.setView(t,this._zoom,{pan:e})},panBy:function(t,e){if(e=e||{},!(t=I(t).round()).x&&!t.y)return this.fire("moveend");if(!0!==e.animate&&!this.getSize().contains(t))return this._resetView(this.unproject(this.project(this.getCenter()).add(t)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new ii,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),e.noMoveStart||this.fire("movestart"),!1!==e.animate){be(this._mapPane,"leaflet-pan-anim");var i=this._getMapPanePos().subtract(t).round();this._panAnim.run(this._mapPane,i,e.duration||.25,e.easeLinearity)}else this._rawPanBy(t),this.fire("move").fire("moveend");return this},flyTo:function(t,e,i){if(!1===(i=i||{}).animate||!Nt.any3d)return this.setView(t,e,i);this._stop();var n=this.project(this.getCenter()),o=this.project(t),s=this.getSize(),a=this._zoom;t=H(t),e=void 0===e?a:e;var r=Math.max(s.x,s.y),l=r*this.getZoomScale(a,e),h=o.distanceTo(n)||1,c=1.42,d=c*c;function u(t){var e=(l*l-r*r+(t?-1:1)*d*d*h*h)/(2*(t?l:r)*d*h),i=Math.sqrt(e*e+1)-e;return i<1e-9?-18:Math.log(i)}function p(t){return(Math.exp(t)-Math.exp(-t))/2}function m(t){return(Math.exp(t)+Math.exp(-t))/2}function _(t){return p(t)/m(t)}var f=u(0);function g(t){return r*(m(f)/m(f+c*t))}function v(t){return r*(m(f)*_(f+c*t)-p(f))/d}function y(t){return 1-Math.pow(1-t,1.5)}var b=Date.now(),x=(u(1)-f)/c,w=i.duration?1e3*i.duration:1e3*x*.8;function P(){var i=(Date.now()-b)/w,s=y(i)*x;i<=1?(this._flyToFrame=z(P,this),this._move(this.unproject(n.add(o.subtract(n).multiplyBy(v(s)/h)),a),this.getScaleZoom(r/g(s),a),{flyTo:!0})):this._move(t,e)._moveEnd(!0)}return this._moveStart(!0,i.noMoveStart),P.call(this),this},flyToBounds:function(t,e){var i=this._getBoundsCenterZoom(t,e);return this.flyTo(i.center,i.zoom,e)},setMaxBounds:function(t){return t=D(t),this.listens("moveend",this._panInsideMaxBounds)&&this.off("moveend",this._panInsideMaxBounds),t.isValid()?(this.options.maxBounds=t,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this)},setMinZoom:function(t){var e=this.options.minZoom;return this.options.minZoom=t,this._loaded&&e!==t&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(t):this},setMaxZoom:function(t){var e=this.options.maxZoom;return this.options.maxZoom=t,this._loaded&&e!==t&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(t):this},panInsideBounds:function(t,e){this._enforcingBounds=!0;var i=this.getCenter(),n=this._limitCenter(i,this._zoom,D(t));return i.equals(n)||this.panTo(n,e),this._enforcingBounds=!1,this},panInside:function(t,e){var i=I((e=e||{}).paddingTopLeft||e.padding||[0,0]),n=I(e.paddingBottomRight||e.padding||[0,0]),o=this.project(this.getCenter()),s=this.project(t),a=this.getPixelBounds(),r=N([a.min.add(i),a.max.subtract(n)]),l=r.getSize();if(!r.contains(s)){this._enforcingBounds=!0;var h=s.subtract(r.getCenter()),c=r.extend(s).getSize().subtract(l);o.x+=h.x<0?-c.x:c.x,o.y+=h.y<0?-c.y:c.y,this.panTo(this.unproject(o),e),this._enforcingBounds=!1}return this},invalidateSize:function(t){if(!this._loaded)return this;t=i({animate:!1,pan:!0},!0===t?{animate:!0}:t);var e=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var n=this.getSize(),s=e.divideBy(2).round(),a=n.divideBy(2).round(),r=s.subtract(a);return r.x||r.y?(t.animate&&t.pan?this.panBy(r):(t.pan&&this._rawPanBy(r),this.fire("move"),t.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(o(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:e,newSize:n})):this},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(t){if(t=this._locateOptions=i({timeout:1e4,watch:!1},t),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var e=o(this._handleGeolocationResponse,this),n=o(this._handleGeolocationError,this);return t.watch?this._locationWatchId=navigator.geolocation.watchPosition(e,n,t):navigator.geolocation.getCurrentPosition(e,n,t),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(t){if(this._container._leaflet_id){var e=t.code,i=t.message||(1===e?"permission denied":2===e?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:e,message:"Geolocation error: "+i+"."})}},_handleGeolocationResponse:function(t){if(this._container._leaflet_id){var e=new R(t.coords.latitude,t.coords.longitude),i=e.toBounds(2*t.coords.accuracy),n=this._locateOptions;if(n.setView){var o=this.getBoundsZoom(i);this.setView(e,n.maxZoom?Math.min(o,n.maxZoom):o)}var s={latlng:e,bounds:i,timestamp:t.timestamp};for(var a in t.coords)"number"==typeof t.coords[a]&&(s[a]=t.coords[a]);this.fire("locationfound",s)}},addHandler:function(t,e){if(!e)return this;var i=this[t]=new e(this);return this._handlers.push(i),this.options[t]&&i.enable(),this},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch(t){this._container._leaflet_id=void 0,this._containerId=void 0}var t;for(t in void 0!==this._locationWatchId&&this.stopLocate(),this._stop(),_e(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&(T(this._resizeRequest),this._resizeRequest=null),this._clearHandlers(),this._loaded&&this.fire("unload"),this._layers)this._layers[t].remove();for(t in this._panes)_e(this._panes[t]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(t,e){var i=me("div","leaflet-pane"+(t?" leaflet-"+t.replace("Pane","")+"-pane":""),e||this._mapPane);return t&&(this._panes[t]=i),i},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var t=this.getPixelBounds();return new B(this.unproject(t.getBottomLeft()),this.unproject(t.getTopRight()))},getMinZoom:function(){return void 0===this.options.minZoom?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return void 0===this.options.maxZoom?void 0===this._layersMaxZoom?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(t,e,i){t=D(t),i=I(i||[0,0]);var n=this.getZoom()||0,o=this.getMinZoom(),s=this.getMaxZoom(),a=t.getNorthWest(),r=t.getSouthEast(),l=this.getSize().subtract(i),h=N(this.project(r,n),this.project(a,n)).getSize(),c=Nt.any3d?this.options.zoomSnap:1,d=l.x/h.x,u=l.y/h.y,p=e?Math.max(d,u):Math.min(d,u);return n=this.getScaleZoom(p,n),c&&(n=Math.round(n/(c/100))*(c/100),n=e?Math.ceil(n/c)*c:Math.floor(n/c)*c),Math.max(o,Math.min(s,n))},getSize:function(){return this._size&&!this._sizeChanged||(this._size=new $(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(t,e){var i=this._getTopLeftPoint(t,e);return new Z(i,i.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(t){return this.options.crs.getProjectedBounds(void 0===t?this.getZoom():t)},getPane:function(t){return"string"==typeof t?this._panes[t]:t},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(t,e){var i=this.options.crs;return e=void 0===e?this._zoom:e,i.scale(t)/i.scale(e)},getScaleZoom:function(t,e){var i=this.options.crs;e=void 0===e?this._zoom:e;var n=i.zoom(t*i.scale(e));return isNaN(n)?1/0:n},project:function(t,e){return e=void 0===e?this._zoom:e,this.options.crs.latLngToPoint(H(t),e)},unproject:function(t,e){return e=void 0===e?this._zoom:e,this.options.crs.pointToLatLng(I(t),e)},layerPointToLatLng:function(t){var e=I(t).add(this.getPixelOrigin());return this.unproject(e)},latLngToLayerPoint:function(t){return this.project(H(t))._round()._subtract(this.getPixelOrigin())},wrapLatLng:function(t){return this.options.crs.wrapLatLng(H(t))},wrapLatLngBounds:function(t){return this.options.crs.wrapLatLngBounds(D(t))},distance:function(t,e){return this.options.crs.distance(H(t),H(e))},containerPointToLayerPoint:function(t){return I(t).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(t){return I(t).add(this._getMapPanePos())},containerPointToLatLng:function(t){var e=this.containerPointToLayerPoint(I(t));return this.layerPointToLatLng(e)},latLngToContainerPoint:function(t){return this.layerPointToContainerPoint(this.latLngToLayerPoint(H(t)))},mouseEventToContainerPoint:function(t){return Je(t,this._container)},mouseEventToLayerPoint:function(t){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))},mouseEventToLatLng:function(t){return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))},_initContainer:function(t){var e=this._container=ue(t);if(!e)throw new Error("Map container not found.");if(e._leaflet_id)throw new Error("Map container is already initialized.");Be(e,"scroll",this._onScroll,this),this._containerId=a(e)},_initLayout:function(){var t=this._container;this._fadeAnimated=this.options.fadeAnimation&&Nt.any3d,be(t,"leaflet-container"+(Nt.touch?" leaflet-touch":"")+(Nt.retina?" leaflet-retina":"")+(Nt.ielt9?" leaflet-oldie":"")+(Nt.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var e=pe(t,"position");"absolute"!==e&&"relative"!==e&&"fixed"!==e&&"sticky"!==e&&(t.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var t=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),Ee(this._mapPane,new $(0,0)),this.createPane("tilePane"),this.createPane("overlayPane"),this.createPane("shadowPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(be(t.markerPane,"leaflet-zoom-hide"),be(t.shadowPane,"leaflet-zoom-hide"))},_resetView:function(t,e,i){Ee(this._mapPane,new $(0,0));var n=!this._loaded;this._loaded=!0,e=this._limitZoom(e),this.fire("viewprereset");var o=this._zoom!==e;this._moveStart(o,i)._move(t,e)._moveEnd(o),this.fire("viewreset"),n&&this.fire("load")},_moveStart:function(t,e){return t&&this.fire("zoomstart"),e||this.fire("movestart"),this},_move:function(t,e,i,n){void 0===e&&(e=this._zoom);var o=this._zoom!==e;return this._zoom=e,this._lastCenter=t,this._pixelOrigin=this._getNewPixelOrigin(t),n?i&&i.pinch&&this.fire("zoom",i):((o||i&&i.pinch)&&this.fire("zoom",i),this.fire("move",i)),this},_moveEnd:function(t){return t&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return T(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(t){Ee(this._mapPane,this._getMapPanePos().subtract(t))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(t){this._targets={},this._targets[a(this._container)]=this;var e=t?Re:Be;e(this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",this._handleDOMEvent,this),this.options.trackResize&&e(window,"resize",this._onResize,this),Nt.any3d&&this.options.transform3DLimit&&(t?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){T(this._resizeRequest),this._resizeRequest=z(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var t=this._getMapPanePos();Math.max(Math.abs(t.x),Math.abs(t.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(t,e){for(var i,n=[],o="mouseout"===e||"mouseover"===e,s=t.target||t.srcElement,r=!1;s;){if((i=this._targets[a(s)])&&("click"===e||"preclick"===e)&&this._draggableMoved(i)){r=!0;break}if(i&&i.listens(e,!0)){if(o&&!ti(s,t))break;if(n.push(i),o)break}if(s===this._container)break;s=s.parentNode}return n.length||r||o||!this.listens(e,!0)||(n=[this]),n},_isClickDisabled:function(t){for(;t&&t!==this._container;){if(t._leaflet_disable_click)return!0;t=t.parentNode}},_handleDOMEvent:function(t){var e=t.target||t.srcElement;if(!(!this._loaded||e._leaflet_disable_events||"click"===t.type&&this._isClickDisabled(e))){var i=t.type;"mousedown"===i&&$e(e),this._fireDOMEvent(t,i)}},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(t,e,n){if("click"===t.type){var o=i({},t);o.type="preclick",this._fireDOMEvent(o,o.type,n)}var s=this._findEventTargets(t,e);if(n){for(var a=[],r=0;r<n.length;r++)n[r].listens(e,!0)&&a.push(n[r]);s=a.concat(s)}if(s.length){"contextmenu"===e&&Ge(t);var l=s[0],h={originalEvent:t};if("keypress"!==t.type&&"keydown"!==t.type&&"keyup"!==t.type){var c=l.getLatLng&&(!l._radius||l._radius<=10);h.containerPoint=c?this.latLngToContainerPoint(l.getLatLng()):this.mouseEventToContainerPoint(t),h.layerPoint=this.containerPointToLayerPoint(h.containerPoint),h.latlng=c?l.getLatLng():this.layerPointToLatLng(h.layerPoint)}for(r=0;r<s.length;r++)if(s[r].fire(e,h,!0),h.originalEvent._stopped||!1===s[r].options.bubblingMouseEvents&&-1!==v(this._mouseEvents,e))return}},_draggableMoved:function(t){return(t=t.dragging&&t.dragging.enabled()?t:this).dragging&&t.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var t=0,e=this._handlers.length;t<e;t++)this._handlers[t].disable()},whenReady:function(t,e){return this._loaded?t.call(e||this,{target:this}):this.on("load",t,e),this},_getMapPanePos:function(){return Se(this._mapPane)||new $(0,0)},_moved:function(){var t=this._getMapPanePos();return t&&!t.equals([0,0])},_getTopLeftPoint:function(t,e){return(t&&void 0!==e?this._getNewPixelOrigin(t,e):this.getPixelOrigin()).subtract(this._getMapPanePos())},_getNewPixelOrigin:function(t,e){var i=this.getSize()._divideBy(2);return this.project(t,e)._subtract(i)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(t,e,i){var n=this._getNewPixelOrigin(i,e);return this.project(t,e)._subtract(n)},_latLngBoundsToNewLayerBounds:function(t,e,i){var n=this._getNewPixelOrigin(i,e);return N([this.project(t.getSouthWest(),e)._subtract(n),this.project(t.getNorthWest(),e)._subtract(n),this.project(t.getSouthEast(),e)._subtract(n),this.project(t.getNorthEast(),e)._subtract(n)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(t){return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())},_limitCenter:function(t,e,i){if(!i)return t;var n=this.project(t,e),o=this.getSize().divideBy(2),s=new Z(n.subtract(o),n.add(o)),a=this._getBoundsOffset(s,i,e);return Math.abs(a.x)<=1&&Math.abs(a.y)<=1?t:this.unproject(n.add(a),e)},_limitOffset:function(t,e){if(!e)return t;var i=this.getPixelBounds(),n=new Z(i.min.add(t),i.max.add(t));return t.add(this._getBoundsOffset(n,e))},_getBoundsOffset:function(t,e,i){var n=N(this.project(e.getNorthEast(),i),this.project(e.getSouthWest(),i)),o=n.min.subtract(t.min),s=n.max.subtract(t.max);return new $(this._rebound(o.x,-s.x),this._rebound(o.y,-s.y))},_rebound:function(t,e){return t+e>0?Math.round(t-e)/2:Math.max(0,Math.ceil(t))-Math.max(0,Math.floor(e))},_limitZoom:function(t){var e=this.getMinZoom(),i=this.getMaxZoom(),n=Nt.any3d?this.options.zoomSnap:1;return n&&(t=Math.round(t/n)*n),Math.max(e,Math.min(i,t))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){xe(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(t,e){var i=this._getCenterOffset(t)._trunc();return!(!0!==(e&&e.animate)&&!this.getSize().contains(i)||(this.panBy(i,e),0))},_createAnimProxy:function(){var t=this._proxy=me("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(t),this.on("zoomanim",function(t){var e=he,i=this._proxy.style[e];Te(this._proxy,this.project(t.center,t.zoom),this.getZoomScale(t.zoom,1)),i===this._proxy.style[e]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",this._animMoveEnd,this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){_e(this._proxy),this.off("load moveend",this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var t=this.getCenter(),e=this.getZoom();Te(this._proxy,this.project(t,e),this.getZoomScale(e,1))},_catchTransitionEnd:function(t){this._animatingZoom&&t.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(t,e,i){if(this._animatingZoom)return!0;if(i=i||{},!this._zoomAnimated||!1===i.animate||this._nothingToAnimate()||Math.abs(e-this._zoom)>this.options.zoomAnimationThreshold)return!1;var n=this.getZoomScale(e),o=this._getCenterOffset(t)._divideBy(1-1/n);return!(!0!==i.animate&&!this.getSize().contains(o)||(z(function(){this._moveStart(!0,i.noMoveStart||!1)._animateZoom(t,e,!0)},this),0))},_animateZoom:function(t,e,i,n){this._mapPane&&(i&&(this._animatingZoom=!0,this._animateToCenter=t,this._animateToZoom=e,be(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:t,zoom:e,noUpdate:n}),this._tempFireZoomEvent||(this._tempFireZoomEvent=this._zoom!==this._animateToZoom),this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(o(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&xe(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire("zoom"),delete this._tempFireZoomEvent,this.fire("move"),this._moveEnd(!0))}});function oi(t,e){return new ni(t,e)}var si=S.extend({options:{position:"topright"},initialize:function(t){p(this,t)},getPosition:function(){return this.options.position},setPosition:function(t){var e=this._map;return e&&e.removeControl(this),this.options.position=t,e&&e.addControl(this),this},getContainer:function(){return this._container},addTo:function(t){this.remove(),this._map=t;var e=this._container=this.onAdd(t),i=this.getPosition(),n=t._controlCorners[i];return be(e,"leaflet-control"),-1!==i.indexOf("bottom")?n.insertBefore(e,n.firstChild):n.appendChild(e),this._map.on("unload",this.remove,this),this},remove:function(){return this._map?(_e(this._container),this.onRemove&&this.onRemove(this._map),this._map.off("unload",this.remove,this),this._map=null,this):this},_refocusOnMap:function(t){this._map&&t&&t.screenX>0&&t.screenY>0&&this._map.getContainer().focus()}}),ai=function(t){return new si(t)};ni.include({addControl:function(t){return t.addTo(this),this},removeControl:function(t){return t.remove(),this},_initControlPos:function(){var t=this._controlCorners={},e="leaflet-",i=this._controlContainer=me("div",e+"control-container",this._container);function n(n,o){var s=e+n+" "+e+o;t[n+o]=me("div",s,i)}n("top","left"),n("top","right"),n("bottom","left"),n("bottom","right")},_clearControlPos:function(){for(var t in this._controlCorners)_e(this._controlCorners[t]);_e(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var ri=si.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(t,e,i,n){return i<n?-1:n<i?1:0}},initialize:function(t,e,i){for(var n in p(this,i),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,this._preventClick=!1,t)this._addLayer(t[n],n);for(n in e)this._addLayer(e[n],n,!0)},onAdd:function(t){this._initLayout(),this._update(),this._map=t,t.on("zoomend",this._checkDisabledLayers,this);for(var e=0;e<this._layers.length;e++)this._layers[e].layer.on("add remove",this._onLayerChange,this);return this._container},addTo:function(t){return si.prototype.addTo.call(this,t),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var t=0;t<this._layers.length;t++)this._layers[t].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(t,e){return this._addLayer(t,e),this._map?this._update():this},addOverlay:function(t,e){return this._addLayer(t,e,!0),this._map?this._update():this},removeLayer:function(t){t.off("add remove",this._onLayerChange,this);var e=this._getLayer(a(t));return e&&this._layers.splice(this._layers.indexOf(e),1),this._map?this._update():this},expand:function(){be(this._container,"leaflet-control-layers-expanded"),this._section.style.height=null;var t=this._map.getSize().y-(this._container.offsetTop+50);return t<this._section.clientHeight?(be(this._section,"leaflet-control-layers-scrollbar"),this._section.style.height=t+"px"):xe(this._section,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return xe(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var t="leaflet-control-layers",e=this._container=me("div",t),i=this.options.collapsed;e.setAttribute("aria-haspopup",!0),qe(e),Ve(e);var n=this._section=me("section",t+"-list");i&&(this._map.on("click",this.collapse,this),Be(e,{mouseenter:this._expandSafely,mouseleave:this.collapse},this));var o=this._layersLink=me("a",t+"-toggle",e);o.href="#",o.title="Layers",o.setAttribute("role","button"),Be(o,{keydown:function(t){13===t.keyCode&&this._expandSafely()},click:function(t){Ge(t),this._expandSafely()}},this),i||this.expand(),this._baseLayersList=me("div",t+"-base",n),this._separator=me("div",t+"-separator",n),this._overlaysList=me("div",t+"-overlays",n),e.appendChild(n)},_getLayer:function(t){for(var e=0;e<this._layers.length;e++)if(this._layers[e]&&a(this._layers[e].layer)===t)return this._layers[e]},_addLayer:function(t,e,i){this._map&&t.on("add remove",this._onLayerChange,this),this._layers.push({layer:t,name:e,overlay:i}),this.options.sortLayers&&this._layers.sort(o(function(t,e){return this.options.sortFunction(t.layer,e.layer,t.name,e.name)},this)),this.options.autoZIndex&&t.setZIndex&&(this._lastZIndex++,t.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;fe(this._baseLayersList),fe(this._overlaysList),this._layerControlInputs=[];var t,e,i,n,o=0;for(i=0;i<this._layers.length;i++)n=this._layers[i],this._addItem(n),e=e||n.overlay,t=t||!n.overlay,o+=n.overlay?0:1;return this.options.hideSingleBase&&(t=t&&o>1,this._baseLayersList.style.display=t?"":"none"),this._separator.style.display=e&&t?"":"none",this},_onLayerChange:function(t){this._handlingClick||this._update();var e=this._getLayer(a(t.target)),i=e.overlay?"add"===t.type?"overlayadd":"overlayremove":"add"===t.type?"baselayerchange":null;i&&this._map.fire(i,e)},_createRadioElement:function(t,e){var i='<input type="radio" class="leaflet-control-layers-selector" name="'+t+'"'+(e?' checked="checked"':"")+"/>",n=document.createElement("div");return n.innerHTML=i,n.firstChild},_addItem:function(t){var e,i=document.createElement("label"),n=this._map.hasLayer(t.layer);t.overlay?((e=document.createElement("input")).type="checkbox",e.className="leaflet-control-layers-selector",e.defaultChecked=n):e=this._createRadioElement("leaflet-base-layers_"+a(this),n),this._layerControlInputs.push(e),e.layerId=a(t.layer),Be(e,"click",this._onInputClick,this);var o=document.createElement("span");o.innerHTML=" "+t.name;var s=document.createElement("span");return i.appendChild(s),s.appendChild(e),s.appendChild(o),(t.overlay?this._overlaysList:this._baseLayersList).appendChild(i),this._checkDisabledLayers(),i},_onInputClick:function(){if(!this._preventClick){var t,e,i=this._layerControlInputs,n=[],o=[];this._handlingClick=!0;for(var s=i.length-1;s>=0;s--)t=i[s],e=this._getLayer(t.layerId).layer,t.checked?n.push(e):t.checked||o.push(e);for(s=0;s<o.length;s++)this._map.hasLayer(o[s])&&this._map.removeLayer(o[s]);for(s=0;s<n.length;s++)this._map.hasLayer(n[s])||this._map.addLayer(n[s]);this._handlingClick=!1,this._refocusOnMap()}},_checkDisabledLayers:function(){for(var t,e,i=this._layerControlInputs,n=this._map.getZoom(),o=i.length-1;o>=0;o--)t=i[o],e=this._getLayer(t.layerId).layer,t.disabled=void 0!==e.options.minZoom&&n<e.options.minZoom||void 0!==e.options.maxZoom&&n>e.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expandSafely:function(){var t=this._section;this._preventClick=!0,Be(t,"click",Ge),this.expand();var e=this;setTimeout(function(){Re(t,"click",Ge),e._preventClick=!1})}}),li=function(t,e,i){return new ri(t,e,i)},hi=si.extend({options:{position:"topleft",zoomInText:'<span aria-hidden="true">+</span>',zoomInTitle:"Zoom in",zoomOutText:'<span aria-hidden="true">&#x2212;</span>',zoomOutTitle:"Zoom out"},onAdd:function(t){var e="leaflet-control-zoom",i=me("div",e+" leaflet-bar"),n=this.options;return this._zoomInButton=this._createButton(n.zoomInText,n.zoomInTitle,e+"-in",i,this._zoomIn),this._zoomOutButton=this._createButton(n.zoomOutText,n.zoomOutTitle,e+"-out",i,this._zoomOut),this._updateDisabled(),t.on("zoomend zoomlevelschange",this._updateDisabled,this),i},onRemove:function(t){t.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(t){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(t.shiftKey?3:1))},_zoomOut:function(t){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(t.shiftKey?3:1))},_createButton:function(t,e,i,n,o){var s=me("a",i,n);return s.innerHTML=t,s.href="#",s.title=e,s.setAttribute("role","button"),s.setAttribute("aria-label",e),qe(s),Be(s,"click",Ke),Be(s,"click",o,this),Be(s,"click",this._refocusOnMap,this),s},_updateDisabled:function(){var t=this._map,e="leaflet-disabled";xe(this._zoomInButton,e),xe(this._zoomOutButton,e),this._zoomInButton.setAttribute("aria-disabled","false"),this._zoomOutButton.setAttribute("aria-disabled","false"),(this._disabled||t._zoom===t.getMinZoom())&&(be(this._zoomOutButton,e),this._zoomOutButton.setAttribute("aria-disabled","true")),(this._disabled||t._zoom===t.getMaxZoom())&&(be(this._zoomInButton,e),this._zoomInButton.setAttribute("aria-disabled","true"))}});ni.mergeOptions({zoomControl:!0}),ni.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new hi,this.addControl(this.zoomControl))});var ci=function(t){return new hi(t)},di=si.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(t){var e="leaflet-control-scale",i=me("div",e),n=this.options;return this._addScales(n,e+"-line",i),t.on(n.updateWhenIdle?"moveend":"move",this._update,this),t.whenReady(this._update,this),i},onRemove:function(t){t.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(t,e,i){t.metric&&(this._mScale=me("div",e,i)),t.imperial&&(this._iScale=me("div",e,i))},_update:function(){var t=this._map,e=t.getSize().y/2,i=t.distance(t.containerPointToLatLng([0,e]),t.containerPointToLatLng([this.options.maxWidth,e]));this._updateScales(i)},_updateScales:function(t){this.options.metric&&t&&this._updateMetric(t),this.options.imperial&&t&&this._updateImperial(t)},_updateMetric:function(t){var e=this._getRoundNum(t),i=e<1e3?e+" m":e/1e3+" km";this._updateScale(this._mScale,i,e/t)},_updateImperial:function(t){var e,i,n,o=3.2808399*t;o>5280?(e=o/5280,i=this._getRoundNum(e),this._updateScale(this._iScale,i+" mi",i/e)):(n=this._getRoundNum(o),this._updateScale(this._iScale,n+" ft",n/o))},_updateScale:function(t,e,i){t.style.width=Math.round(this.options.maxWidth*i)+"px",t.innerHTML=e},_getRoundNum:function(t){var e=Math.pow(10,(Math.floor(t)+"").length-1),i=t/e;return e*(i=i>=10?10:i>=5?5:i>=3?3:i>=2?2:1)}}),ui=function(t){return new di(t)},pi='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',mi=si.extend({options:{position:"bottomright",prefix:'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">'+(Nt.inlineSvg?pi+" ":"")+"Leaflet</a>"},initialize:function(t){p(this,t),this._attributions={}},onAdd:function(t){for(var e in t.attributionControl=this,this._container=me("div","leaflet-control-attribution"),qe(this._container),t._layers)t._layers[e].getAttribution&&this.addAttribution(t._layers[e].getAttribution());return this._update(),t.on("layeradd",this._addAttribution,this),this._container},onRemove:function(t){t.off("layeradd",this._addAttribution,this)},_addAttribution:function(t){t.layer.getAttribution&&(this.addAttribution(t.layer.getAttribution()),t.layer.once("remove",function(){this.removeAttribution(t.layer.getAttribution())},this))},setPrefix:function(t){return this.options.prefix=t,this._update(),this},addAttribution:function(t){return t?(this._attributions[t]||(this._attributions[t]=0),this._attributions[t]++,this._update(),this):this},removeAttribution:function(t){return t?(this._attributions[t]&&(this._attributions[t]--,this._update()),this):this},_update:function(){if(this._map){var t=[];for(var e in this._attributions)this._attributions[e]&&t.push(e);var i=[];this.options.prefix&&i.push(this.options.prefix),t.length&&i.push(t.join(", ")),this._container.innerHTML=i.join(' <span aria-hidden="true">|</span> ')}}});ni.mergeOptions({attributionControl:!0}),ni.addInitHook(function(){this.options.attributionControl&&(new mi).addTo(this)});var _i=function(t){return new mi(t)};si.Layers=ri,si.Zoom=hi,si.Scale=di,si.Attribution=mi,ai.layers=li,ai.zoom=ci,ai.scale=ui,ai.attribution=_i;var fi=S.extend({initialize:function(t){this._map=t},enable:function(){return this._enabled||(this._enabled=!0,this.addHooks()),this},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}});fi.addTo=function(t,e){return t.addHandler(e,this),this};var gi={Events:M},vi=Nt.touch?"touchstart mousedown":"mousedown",yi=C.extend({options:{clickTolerance:3},initialize:function(t,e,i,n){p(this,n),this._element=t,this._dragStartTarget=e||t,this._preventOutline=i},enable:function(){this._enabled||(Be(this._dragStartTarget,vi,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(yi._dragging===this&&this.finishDrag(!0),Re(this._dragStartTarget,vi,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(t){if(this._enabled&&(this._moved=!1,!ye(this._element,"leaflet-zoom-anim")))if(t.touches&&1!==t.touches.length)yi._dragging===this&&this.finishDrag();else if(!(yi._dragging||t.shiftKey||1!==t.which&&1!==t.button&&!t.touches||(yi._dragging=this,this._preventOutline&&$e(this._element),Me(),oe(),this._moving))){this.fire("down");var e=t.touches?t.touches[0]:t,i=Ie(this._element);this._startPoint=new $(e.clientX,e.clientY),this._startPos=Se(this._element),this._parentScale=Ze(i);var n="mousedown"===t.type;Be(document,n?"mousemove":"touchmove",this._onMove,this),Be(document,n?"mouseup":"touchend touchcancel",this._onUp,this)}},_onMove:function(t){if(this._enabled)if(t.touches&&t.touches.length>1)this._moved=!0;else{var e=t.touches&&1===t.touches.length?t.touches[0]:t,i=new $(e.clientX,e.clientY)._subtract(this._startPoint);(i.x||i.y)&&(Math.abs(i.x)+Math.abs(i.y)<this.options.clickTolerance||(i.x/=this._parentScale.x,i.y/=this._parentScale.y,Ge(t),this._moved||(this.fire("dragstart"),this._moved=!0,be(document.body,"leaflet-dragging"),this._lastTarget=t.target||t.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),be(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(i),this._moving=!0,this._lastEvent=t,this._updatePosition()))}},_updatePosition:function(){var t={originalEvent:this._lastEvent};this.fire("predrag",t),Ee(this._element,this._newPos),this.fire("drag",t)},_onUp:function(){this._enabled&&this.finishDrag()},finishDrag:function(t){xe(document.body,"leaflet-dragging"),this._lastTarget&&(xe(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),Re(document,"mousemove touchmove",this._onMove,this),Re(document,"mouseup touchend touchcancel",this._onUp,this),Ce(),se();var e=this._moved&&this._moving;this._moving=!1,yi._dragging=!1,e&&this.fire("dragend",{noInertia:t,distance:this._newPos.distanceTo(this._startPos)})}});function bi(t,e,i){var n,o,s,a,r,l,h,c,d,u=[1,4,2,8];for(o=0,h=t.length;o<h;o++)t[o]._code=$i(t[o],e);for(a=0;a<4;a++){for(c=u[a],n=[],o=0,s=(h=t.length)-1;o<h;s=o++)r=t[o],l=t[s],r._code&c?l._code&c||((d=Ci(l,r,c,e,i))._code=$i(d,e),n.push(d)):(l._code&c&&((d=Ci(l,r,c,e,i))._code=$i(d,e),n.push(d)),n.push(r));t=n}return t}function xi(t,e){var i,n,o,s,a,r,l,h,c;if(!t||0===t.length)throw new Error("latlngs not passed");Zi(t)||(console.warn("latlngs are not flat! Only the first ring will be used"),t=t[0]);var d=H([0,0]),u=D(t);u.getNorthWest().distanceTo(u.getSouthWest())*u.getNorthEast().distanceTo(u.getNorthWest())<1700&&(d=wi(t));var p=t.length,m=[];for(i=0;i<p;i++){var _=H(t[i]);m.push(e.project(H([_.lat-d.lat,_.lng-d.lng])))}for(r=l=h=0,i=0,n=p-1;i<p;n=i++)o=m[i],s=m[n],a=o.y*s.x-s.y*o.x,l+=(o.x+s.x)*a,h+=(o.y+s.y)*a,r+=3*a;c=0===r?m[0]:[l/r,h/r];var f=e.unproject(I(c));return H([f.lat+d.lat,f.lng+d.lng])}function wi(t){for(var e=0,i=0,n=0,o=0;o<t.length;o++){var s=H(t[o]);e+=s.lat,i+=s.lng,n++}return H([e/n,i/n])}var Pi,Li={__proto__:null,clipPolygon:bi,polygonCenter:xi,centroid:wi};function ki(t,e){if(!e||!t.length)return t.slice();var i=e*e;return t=Ei(t=Ai(t,i),i)}function zi(t,e,i){return Math.sqrt(Ii(t,e,i,!0))}function Ti(t,e,i){return Ii(t,e,i)}function Ei(t,e){var i=t.length,n=new(typeof Uint8Array!=void 0+""?Uint8Array:Array)(i);n[0]=n[i-1]=1,Si(t,n,e,0,i-1);var o,s=[];for(o=0;o<i;o++)n[o]&&s.push(t[o]);return s}function Si(t,e,i,n,o){var s,a,r,l=0;for(a=n+1;a<=o-1;a++)(r=Ii(t[a],t[n],t[o],!0))>l&&(s=a,l=r);l>i&&(e[s]=1,Si(t,e,i,n,s),Si(t,e,i,s,o))}function Ai(t,e){for(var i=[t[0]],n=1,o=0,s=t.length;n<s;n++)Oi(t[n],t[o])>e&&(i.push(t[n]),o=n);return o<s-1&&i.push(t[s-1]),i}function Mi(t,e,i,n,o){var s,a,r,l=n?Pi:$i(t,i),h=$i(e,i);for(Pi=h;;){if(!(l|h))return[t,e];if(l&h)return!1;r=$i(a=Ci(t,e,s=l||h,i,o),i),s===l?(t=a,l=r):(e=a,h=r)}}function Ci(t,e,i,n,o){var s,a,r=e.x-t.x,l=e.y-t.y,h=n.min,c=n.max;return 8&i?(s=t.x+r*(c.y-t.y)/l,a=c.y):4&i?(s=t.x+r*(h.y-t.y)/l,a=h.y):2&i?(s=c.x,a=t.y+l*(c.x-t.x)/r):1&i&&(s=h.x,a=t.y+l*(h.x-t.x)/r),new $(s,a,o)}function $i(t,e){var i=0;return t.x<e.min.x?i|=1:t.x>e.max.x&&(i|=2),t.y<e.min.y?i|=4:t.y>e.max.y&&(i|=8),i}function Oi(t,e){var i=e.x-t.x,n=e.y-t.y;return i*i+n*n}function Ii(t,e,i,n){var o,s=e.x,a=e.y,r=i.x-s,l=i.y-a,h=r*r+l*l;return h>0&&((o=((t.x-s)*r+(t.y-a)*l)/h)>1?(s=i.x,a=i.y):o>0&&(s+=r*o,a+=l*o)),r=t.x-s,l=t.y-a,n?r*r+l*l:new $(s,a)}function Zi(t){return!g(t[0])||"object"!=typeof t[0][0]&&void 0!==t[0][0]}function Ni(t){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),Zi(t)}function Bi(t,e){var i,n,o,s,a,r,l,h;if(!t||0===t.length)throw new Error("latlngs not passed");Zi(t)||(console.warn("latlngs are not flat! Only the first ring will be used"),t=t[0]);var c=H([0,0]),d=D(t);d.getNorthWest().distanceTo(d.getSouthWest())*d.getNorthEast().distanceTo(d.getNorthWest())<1700&&(c=wi(t));var u=t.length,p=[];for(i=0;i<u;i++){var m=H(t[i]);p.push(e.project(H([m.lat-c.lat,m.lng-c.lng])))}for(i=0,n=0;i<u-1;i++)n+=p[i].distanceTo(p[i+1])/2;if(0===n)h=p[0];else for(i=0,s=0;i<u-1;i++)if(a=p[i],r=p[i+1],(s+=o=a.distanceTo(r))>n){l=(s-n)/o,h=[r.x-l*(r.x-a.x),r.y-l*(r.y-a.y)];break}var _=e.unproject(I(h));return H([_.lat+c.lat,_.lng+c.lng])}var Di={__proto__:null,simplify:ki,pointToSegmentDistance:zi,closestPointOnSegment:Ti,clipSegment:Mi,_getEdgeIntersection:Ci,_getBitCode:$i,_sqClosestPointOnSegment:Ii,isFlat:Zi,_flat:Ni,polylineCenter:Bi},Ri={project:function(t){return new $(t.lng,t.lat)},unproject:function(t){return new R(t.y,t.x)},bounds:new Z([-180,-90],[180,90])},Hi={R:6378137,R_MINOR:6356752.314245179,bounds:new Z([-20037508.34279,-15496570.73972],[20037508.34279,18764656.23138]),project:function(t){var e=Math.PI/180,i=this.R,n=t.lat*e,o=this.R_MINOR/i,s=Math.sqrt(1-o*o),a=s*Math.sin(n),r=Math.tan(Math.PI/4-n/2)/Math.pow((1-a)/(1+a),s/2);return n=-i*Math.log(Math.max(r,1e-10)),new $(t.lng*e*i,n)},unproject:function(t){for(var e,i=180/Math.PI,n=this.R,o=this.R_MINOR/n,s=Math.sqrt(1-o*o),a=Math.exp(-t.y/n),r=Math.PI/2-2*Math.atan(a),l=0,h=.1;l<15&&Math.abs(h)>1e-7;l++)e=s*Math.sin(r),e=Math.pow((1-e)/(1+e),s/2),r+=h=Math.PI/2-2*Math.atan(a*e)-r;return new R(r*i,t.x*i/n)}},ji={__proto__:null,LonLat:Ri,Mercator:Hi,SphericalMercator:U},Fi=i({},F,{code:"EPSG:3395",projection:Hi,transformation:function(){var t=.5/(Math.PI*Hi.R);return q(t,.5,-t,.5)}()}),Wi=i({},F,{code:"EPSG:4326",projection:Ri,transformation:q(1/180,1,-1/180,.5)}),Ui=i({},j,{projection:Ri,transformation:q(1,0,-1,0),scale:function(t){return Math.pow(2,t)},zoom:function(t){return Math.log(t)/Math.LN2},distance:function(t,e){var i=e.lng-t.lng,n=e.lat-t.lat;return Math.sqrt(i*i+n*n)},infinite:!0});j.Earth=F,j.EPSG3395=Fi,j.EPSG3857=G,j.EPSG900913=K,j.EPSG4326=Wi,j.Simple=Ui;var Vi=C.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(t){return t.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(t){return t&&t.removeLayer(this),this},getPane:function(t){return this._map.getPane(t?this.options[t]||t:this.options.pane)},addInteractiveTarget:function(t){return this._map._targets[a(t)]=this,this},removeInteractiveTarget:function(t){return delete this._map._targets[a(t)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(t){var e=t.target;if(e.hasLayer(this)){if(this._map=e,this._zoomAnimated=e._zoomAnimated,this.getEvents){var i=this.getEvents();e.on(i,this),this.once("remove",function(){e.off(i,this)},this)}this.onAdd(e),this.fire("add"),e.fire("layeradd",{layer:this})}}});ni.include({addLayer:function(t){if(!t._layerAdd)throw new Error("The provided object is not a Layer.");var e=a(t);return this._layers[e]||(this._layers[e]=t,t._mapToAdd=this,t.beforeAdd&&t.beforeAdd(this),this.whenReady(t._layerAdd,t)),this},removeLayer:function(t){var e=a(t);return this._layers[e]?(this._loaded&&t.onRemove(this),delete this._layers[e],this._loaded&&(this.fire("layerremove",{layer:t}),t.fire("remove")),t._map=t._mapToAdd=null,this):this},hasLayer:function(t){return a(t)in this._layers},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},_addLayers:function(t){for(var e=0,i=(t=t?g(t)?t:[t]:[]).length;e<i;e++)this.addLayer(t[e])},_addZoomLimit:function(t){isNaN(t.options.maxZoom)&&isNaN(t.options.minZoom)||(this._zoomBoundLayers[a(t)]=t,this._updateZoomLevels())},_removeZoomLimit:function(t){var e=a(t);this._zoomBoundLayers[e]&&(delete this._zoomBoundLayers[e],this._updateZoomLevels())},_updateZoomLevels:function(){var t=1/0,e=-1/0,i=this._getZoomSpan();for(var n in this._zoomBoundLayers){var o=this._zoomBoundLayers[n].options;t=void 0===o.minZoom?t:Math.min(t,o.minZoom),e=void 0===o.maxZoom?e:Math.max(e,o.maxZoom)}this._layersMaxZoom=e===-1/0?void 0:e,this._layersMinZoom=t===1/0?void 0:t,i!==this._getZoomSpan()&&this.fire("zoomlevelschange"),void 0===this.options.maxZoom&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),void 0===this.options.minZoom&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var qi=Vi.extend({initialize:function(t,e){var i,n;if(p(this,e),this._layers={},t)for(i=0,n=t.length;i<n;i++)this.addLayer(t[i])},addLayer:function(t){var e=this.getLayerId(t);return this._layers[e]=t,this._map&&this._map.addLayer(t),this},removeLayer:function(t){var e=t in this._layers?t:this.getLayerId(t);return this._map&&this._layers[e]&&this._map.removeLayer(this._layers[e]),delete this._layers[e],this},hasLayer:function(t){return("number"==typeof t?t:this.getLayerId(t))in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(t){var e,i,n=Array.prototype.slice.call(arguments,1);for(e in this._layers)(i=this._layers[e])[t]&&i[t].apply(i,n);return this},onAdd:function(t){this.eachLayer(t.addLayer,t)},onRemove:function(t){this.eachLayer(t.removeLayer,t)},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},getLayer:function(t){return this._layers[t]},getLayers:function(){var t=[];return this.eachLayer(t.push,t),t},setZIndex:function(t){return this.invoke("setZIndex",t)},getLayerId:function(t){return a(t)}}),Gi=function(t,e){return new qi(t,e)},Ki=qi.extend({addLayer:function(t){return this.hasLayer(t)?this:(t.addEventParent(this),qi.prototype.addLayer.call(this,t),this.fire("layeradd",{layer:t}))},removeLayer:function(t){return this.hasLayer(t)?(t in this._layers&&(t=this._layers[t]),t.removeEventParent(this),qi.prototype.removeLayer.call(this,t),this.fire("layerremove",{layer:t})):this},setStyle:function(t){return this.invoke("setStyle",t)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var t=new B;for(var e in this._layers){var i=this._layers[e];t.extend(i.getBounds?i.getBounds():i.getLatLng())}return t}}),Yi=function(t,e){return new Ki(t,e)},Ji=S.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(t){p(this,t)},createIcon:function(t){return this._createIcon("icon",t)},createShadow:function(t){return this._createIcon("shadow",t)},_createIcon:function(t,e){var i=this._getIconUrl(t);if(!i){if("icon"===t)throw new Error("iconUrl not set in Icon options (see the docs).");return null}var n=this._createImg(i,e&&"IMG"===e.tagName?e:null);return this._setIconStyles(n,t),(this.options.crossOrigin||""===this.options.crossOrigin)&&(n.crossOrigin=!0===this.options.crossOrigin?"":this.options.crossOrigin),n},_setIconStyles:function(t,e){var i=this.options,n=i[e+"Size"];"number"==typeof n&&(n=[n,n]);var o=I(n),s=I("shadow"===e&&i.shadowAnchor||i.iconAnchor||o&&o.divideBy(2,!0));t.className="leaflet-marker-"+e+" "+(i.className||""),s&&(t.style.marginLeft=-s.x+"px",t.style.marginTop=-s.y+"px"),o&&(t.style.width=o.x+"px",t.style.height=o.y+"px")},_createImg:function(t,e){return(e=e||document.createElement("img")).src=t,e},_getIconUrl:function(t){return Nt.retina&&this.options[t+"RetinaUrl"]||this.options[t+"Url"]}});function Xi(t){return new Ji(t)}var Qi=Ji.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(t){return"string"!=typeof Qi.imagePath&&(Qi.imagePath=this._detectIconPath()),(this.options.imagePath||Qi.imagePath)+Ji.prototype._getIconUrl.call(this,t)},_stripUrl:function(t){var e=function(t,e,i){var n=e.exec(t);return n&&n[i]};return(t=e(t,/^url\((['"])?(.+)\1\)$/,2))&&e(t,/^(.*)marker-icon\.png$/,1)},_detectIconPath:function(){var t=me("div","leaflet-default-icon-path",document.body),e=pe(t,"background-image")||pe(t,"backgroundImage");if(document.body.removeChild(t),e=this._stripUrl(e))return e;var i=document.querySelector('link[href$="leaflet.css"]');return i?i.href.substring(0,i.href.length-11-1):""}}),tn=fi.extend({initialize:function(t){this._marker=t},addHooks:function(){var t=this._marker._icon;this._draggable||(this._draggable=new yi(t,t,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),be(t,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&xe(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(t){var e=this._marker,i=e._map,n=this._marker.options.autoPanSpeed,o=this._marker.options.autoPanPadding,s=Se(e._icon),a=i.getPixelBounds(),r=i.getPixelOrigin(),l=N(a.min._subtract(r).add(o),a.max._subtract(r).subtract(o));if(!l.contains(s)){var h=I((Math.max(l.max.x,s.x)-l.max.x)/(a.max.x-l.max.x)-(Math.min(l.min.x,s.x)-l.min.x)/(a.min.x-l.min.x),(Math.max(l.max.y,s.y)-l.max.y)/(a.max.y-l.max.y)-(Math.min(l.min.y,s.y)-l.min.y)/(a.min.y-l.min.y)).multiplyBy(n);i.panBy(h,{animate:!1}),this._draggable._newPos._add(h),this._draggable._startPos._add(h),Ee(e._icon,this._draggable._newPos),this._onDrag(t),this._panRequest=z(this._adjustPan.bind(this,t))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire("movestart").fire("dragstart")},_onPreDrag:function(t){this._marker.options.autoPan&&(T(this._panRequest),this._panRequest=z(this._adjustPan.bind(this,t)))},_onDrag:function(t){var e=this._marker,i=e._shadow,n=Se(e._icon),o=e._map.layerPointToLatLng(n);i&&Ee(i,n),e._latlng=o,t.latlng=o,t.oldLatLng=this._oldLatLng,e.fire("move",t).fire("drag",t)},_onDragEnd:function(t){T(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",t)}}),en=Vi.extend({options:{icon:new Qi,interactive:!0,keyboard:!0,title:"",alt:"Marker",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",shadowPane:"shadowPane",bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(t,e){p(this,e),this._latlng=H(t)},onAdd:function(t){this._zoomAnimated=this._zoomAnimated&&t.options.markerZoomAnimation,this._zoomAnimated&&t.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(t){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&t.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(t){var e=this._latlng;return this._latlng=H(t),this.update(),this.fire("move",{oldLatLng:e,latlng:this._latlng})},setZIndexOffset:function(t){return this.options.zIndexOffset=t,this.update()},getIcon:function(){return this.options.icon},setIcon:function(t){return this.options.icon=t,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var t=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(t)}return this},_initIcon:function(){var t=this.options,e="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),i=t.icon.createIcon(this._icon),n=!1;i!==this._icon&&(this._icon&&this._removeIcon(),n=!0,t.title&&(i.title=t.title),"IMG"===i.tagName&&(i.alt=t.alt||"")),be(i,e),t.keyboard&&(i.tabIndex="0",i.setAttribute("role","button")),this._icon=i,t.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&Be(i,"focus",this._panOnFocus,this);var o=t.icon.createShadow(this._shadow),s=!1;o!==this._shadow&&(this._removeShadow(),s=!0),o&&(be(o,e),o.alt=""),this._shadow=o,t.opacity<1&&this._updateOpacity(),n&&this.getPane().appendChild(this._icon),this._initInteraction(),o&&s&&this.getPane(t.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&Re(this._icon,"focus",this._panOnFocus,this),_e(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&_e(this._shadow),this._shadow=null},_setPos:function(t){this._icon&&Ee(this._icon,t),this._shadow&&Ee(this._shadow,t),this._zIndex=t.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(t){this._icon&&(this._icon.style.zIndex=this._zIndex+t)},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center).round();this._setPos(e)},_initInteraction:function(){if(this.options.interactive&&(be(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),tn)){var t=this.options.draggable;this.dragging&&(t=this.dragging.enabled(),this.dragging.disable()),this.dragging=new tn(this),t&&this.dragging.enable()}},setOpacity:function(t){return this.options.opacity=t,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var t=this.options.opacity;this._icon&&Le(this._icon,t),this._shadow&&Le(this._shadow,t)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_panOnFocus:function(){var t=this._map;if(t){var e=this.options.icon.options,i=e.iconSize?I(e.iconSize):I(0,0),n=e.iconAnchor?I(e.iconAnchor):I(0,0);t.panInside(this._latlng,{paddingTopLeft:n,paddingBottomRight:i.subtract(n)})}},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});function nn(t,e){return new en(t,e)}var on=Vi.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(t){this._renderer=t.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(t){return p(this,t),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&t&&Object.prototype.hasOwnProperty.call(t,"weight")&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0)}}),sn=on.extend({options:{fill:!0,radius:10},initialize:function(t,e){p(this,e),this._latlng=H(t),this._radius=this.options.radius},setLatLng:function(t){var e=this._latlng;return this._latlng=H(t),this.redraw(),this.fire("move",{oldLatLng:e,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(t){return this.options.radius=this._radius=t,this.redraw()},getRadius:function(){return this._radius},setStyle:function(t){var e=t&&t.radius||this._radius;return on.prototype.setStyle.call(this,t),this.setRadius(e),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var t=this._radius,e=this._radiusY||t,i=this._clickTolerance(),n=[t+i,e+i];this._pxBounds=new Z(this._point.subtract(n),this._point.add(n))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(t){return t.distanceTo(this._point)<=this._radius+this._clickTolerance()}});function an(t,e){return new sn(t,e)}var rn=sn.extend({initialize:function(t,e,n){if("number"==typeof e&&(e=i({},n,{radius:e})),p(this,e),this._latlng=H(t),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(t){return this._mRadius=t,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var t=[this._radius,this._radiusY||this._radius];return new B(this._map.layerPointToLatLng(this._point.subtract(t)),this._map.layerPointToLatLng(this._point.add(t)))},setStyle:on.prototype.setStyle,_project:function(){var t=this._latlng.lng,e=this._latlng.lat,i=this._map,n=i.options.crs;if(n.distance===F.distance){var o=Math.PI/180,s=this._mRadius/F.R/o,a=i.project([e+s,t]),r=i.project([e-s,t]),l=a.add(r).divideBy(2),h=i.unproject(l).lat,c=Math.acos((Math.cos(s*o)-Math.sin(e*o)*Math.sin(h*o))/(Math.cos(e*o)*Math.cos(h*o)))/o;(isNaN(c)||0===c)&&(c=s/Math.cos(Math.PI/180*e)),this._point=l.subtract(i.getPixelOrigin()),this._radius=isNaN(c)?0:l.x-i.project([h,t-c]).x,this._radiusY=l.y-a.y}else{var d=n.unproject(n.project(this._latlng).subtract([this._mRadius,0]));this._point=i.latLngToLayerPoint(this._latlng),this._radius=this._point.x-i.latLngToLayerPoint(d).x}this._updateBounds()}});function ln(t,e,i){return new rn(t,e,i)}var hn=on.extend({options:{smoothFactor:1,noClip:!1},initialize:function(t,e){p(this,e),this._setLatLngs(t)},getLatLngs:function(){return this._latlngs},setLatLngs:function(t){return this._setLatLngs(t),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(t){for(var e,i,n=1/0,o=null,s=Ii,a=0,r=this._parts.length;a<r;a++)for(var l=this._parts[a],h=1,c=l.length;h<c;h++){var d=s(t,e=l[h-1],i=l[h],!0);d<n&&(n=d,o=s(t,e,i))}return o&&(o.distance=Math.sqrt(n)),o},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return Bi(this._defaultShape(),this._map.options.crs)},getBounds:function(){return this._bounds},addLatLng:function(t,e){return e=e||this._defaultShape(),t=H(t),e.push(t),this._bounds.extend(t),this.redraw()},_setLatLngs:function(t){this._bounds=new B,this._latlngs=this._convertLatLngs(t)},_defaultShape:function(){return Zi(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(t){for(var e=[],i=Zi(t),n=0,o=t.length;n<o;n++)i?(e[n]=H(t[n]),this._bounds.extend(e[n])):e[n]=this._convertLatLngs(t[n]);return e},_project:function(){var t=new Z;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,t),this._bounds.isValid()&&t.isValid()&&(this._rawPxBounds=t,this._updateBounds())},_updateBounds:function(){var t=this._clickTolerance(),e=new $(t,t);this._rawPxBounds&&(this._pxBounds=new Z([this._rawPxBounds.min.subtract(e),this._rawPxBounds.max.add(e)]))},_projectLatlngs:function(t,e,i){var n,o,s=t[0]instanceof R,a=t.length;if(s){for(o=[],n=0;n<a;n++)o[n]=this._map.latLngToLayerPoint(t[n]),i.extend(o[n]);e.push(o)}else for(n=0;n<a;n++)this._projectLatlngs(t[n],e,i)},_clipPoints:function(){var t=this._renderer._bounds;if(this._parts=[],this._pxBounds&&this._pxBounds.intersects(t))if(this.options.noClip)this._parts=this._rings;else{var e,i,n,o,s,a,r,l=this._parts;for(e=0,n=0,o=this._rings.length;e<o;e++)for(i=0,s=(r=this._rings[e]).length;i<s-1;i++)(a=Mi(r[i],r[i+1],t,i,!0))&&(l[n]=l[n]||[],l[n].push(a[0]),a[1]===r[i+1]&&i!==s-2||(l[n].push(a[1]),n++))}},_simplifyPoints:function(){for(var t=this._parts,e=this.options.smoothFactor,i=0,n=t.length;i<n;i++)t[i]=ki(t[i],e)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(t,e){var i,n,o,s,a,r,l=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(t))return!1;for(i=0,s=this._parts.length;i<s;i++)for(n=0,o=(a=(r=this._parts[i]).length)-1;n<a;o=n++)if((e||0!==n)&&zi(t,r[o],r[n])<=l)return!0;return!1}});function cn(t,e){return new hn(t,e)}hn._flat=Ni;var dn=hn.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return xi(this._defaultShape(),this._map.options.crs)},_convertLatLngs:function(t){var e=hn.prototype._convertLatLngs.call(this,t),i=e.length;return i>=2&&e[0]instanceof R&&e[0].equals(e[i-1])&&e.pop(),e},_setLatLngs:function(t){hn.prototype._setLatLngs.call(this,t),Zi(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return Zi(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var t=this._renderer._bounds,e=this.options.weight,i=new $(e,e);if(t=new Z(t.min.subtract(i),t.max.add(i)),this._parts=[],this._pxBounds&&this._pxBounds.intersects(t))if(this.options.noClip)this._parts=this._rings;else for(var n,o=0,s=this._rings.length;o<s;o++)(n=bi(this._rings[o],t,!0)).length&&this._parts.push(n)},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(t){var e,i,n,o,s,a,r,l,h=!1;if(!this._pxBounds||!this._pxBounds.contains(t))return!1;for(o=0,r=this._parts.length;o<r;o++)for(s=0,a=(l=(e=this._parts[o]).length)-1;s<l;a=s++)i=e[s],n=e[a],i.y>t.y!=n.y>t.y&&t.x<(n.x-i.x)*(t.y-i.y)/(n.y-i.y)+i.x&&(h=!h);return h||hn.prototype._containsPoint.call(this,t,!0)}});function un(t,e){return new dn(t,e)}var pn=Ki.extend({initialize:function(t,e){p(this,e),this._layers={},t&&this.addData(t)},addData:function(t){var e,i,n,o=g(t)?t:t.features;if(o){for(e=0,i=o.length;e<i;e++)((n=o[e]).geometries||n.geometry||n.features||n.coordinates)&&this.addData(n);return this}var s=this.options;if(s.filter&&!s.filter(t))return this;var a=mn(t,s);return a?(a.feature=xn(t),a.defaultOptions=a.options,this.resetStyle(a),s.onEachFeature&&s.onEachFeature(t,a),this.addLayer(a)):this},resetStyle:function(t){return void 0===t?this.eachLayer(this.resetStyle,this):(t.options=i({},t.defaultOptions),this._setLayerStyle(t,this.options.style),this)},setStyle:function(t){return this.eachLayer(function(e){this._setLayerStyle(e,t)},this)},_setLayerStyle:function(t,e){t.setStyle&&("function"==typeof e&&(e=e(t.feature)),t.setStyle(e))}});function mn(t,e){var i,n,o,s,a="Feature"===t.type?t.geometry:t,r=a?a.coordinates:null,l=[],h=e&&e.pointToLayer,c=e&&e.coordsToLatLng||fn;if(!r&&!a)return null;switch(a.type){case"Point":return _n(h,t,i=c(r),e);case"MultiPoint":for(o=0,s=r.length;o<s;o++)i=c(r[o]),l.push(_n(h,t,i,e));return new Ki(l);case"LineString":case"MultiLineString":return n=gn(r,"LineString"===a.type?0:1,c),new hn(n,e);case"Polygon":case"MultiPolygon":return n=gn(r,"Polygon"===a.type?1:2,c),new dn(n,e);case"GeometryCollection":for(o=0,s=a.geometries.length;o<s;o++){var d=mn({geometry:a.geometries[o],type:"Feature",properties:t.properties},e);d&&l.push(d)}return new Ki(l);case"FeatureCollection":for(o=0,s=a.features.length;o<s;o++){var u=mn(a.features[o],e);u&&l.push(u)}return new Ki(l);default:throw new Error("Invalid GeoJSON object.")}}function _n(t,e,i,n){return t?t(e,i):new en(i,n&&n.markersInheritOptions&&n)}function fn(t){return new R(t[1],t[0],t[2])}function gn(t,e,i){for(var n,o=[],s=0,a=t.length;s<a;s++)n=e?gn(t[s],e-1,i):(i||fn)(t[s]),o.push(n);return o}function vn(t,e){return void 0!==(t=H(t)).alt?[c(t.lng,e),c(t.lat,e),c(t.alt,e)]:[c(t.lng,e),c(t.lat,e)]}function yn(t,e,i,n){for(var o=[],s=0,a=t.length;s<a;s++)o.push(e?yn(t[s],Zi(t[s])?0:e-1,i,n):vn(t[s],n));return!e&&i&&o.length>0&&o.push(o[0].slice()),o}function bn(t,e){return t.feature?i({},t.feature,{geometry:e}):xn(e)}function xn(t){return"Feature"===t.type||"FeatureCollection"===t.type?t:{type:"Feature",properties:{},geometry:t}}var wn={toGeoJSON:function(t){return bn(this,{type:"Point",coordinates:vn(this.getLatLng(),t)})}};function Pn(t,e){return new pn(t,e)}en.include(wn),rn.include(wn),sn.include(wn),hn.include({toGeoJSON:function(t){var e=!Zi(this._latlngs);return bn(this,{type:(e?"Multi":"")+"LineString",coordinates:yn(this._latlngs,e?1:0,!1,t)})}}),dn.include({toGeoJSON:function(t){var e=!Zi(this._latlngs),i=e&&!Zi(this._latlngs[0]),n=yn(this._latlngs,i?2:e?1:0,!0,t);return e||(n=[n]),bn(this,{type:(i?"Multi":"")+"Polygon",coordinates:n})}}),qi.include({toMultiPoint:function(t){var e=[];return this.eachLayer(function(i){e.push(i.toGeoJSON(t).geometry.coordinates)}),bn(this,{type:"MultiPoint",coordinates:e})},toGeoJSON:function(t){var e=this.feature&&this.feature.geometry&&this.feature.geometry.type;if("MultiPoint"===e)return this.toMultiPoint(t);var i="GeometryCollection"===e,n=[];return this.eachLayer(function(e){if(e.toGeoJSON){var o=e.toGeoJSON(t);if(i)n.push(o.geometry);else{var s=xn(o);"FeatureCollection"===s.type?n.push.apply(n,s.features):n.push(s)}}}),i?bn(this,{geometries:n,type:"GeometryCollection"}):{type:"FeatureCollection",features:n}}});var Ln=Pn,kn=Vi.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(t,e,i){this._url=t,this._bounds=D(e),p(this,i)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(be(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){_e(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(t){return this.options.opacity=t,this._image&&this._updateOpacity(),this},setStyle:function(t){return t.opacity&&this.setOpacity(t.opacity),this},bringToFront:function(){return this._map&&ge(this._image),this},bringToBack:function(){return this._map&&ve(this._image),this},setUrl:function(t){return this._url=t,this._image&&(this._image.src=t),this},setBounds:function(t){return this._bounds=D(t),this._map&&this._reset(),this},getEvents:function(){var t={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var t="IMG"===this._url.tagName,e=this._image=t?this._url:me("img");be(e,"leaflet-image-layer"),this._zoomAnimated&&be(e,"leaflet-zoom-animated"),this.options.className&&be(e,this.options.className),e.onselectstart=h,e.onmousemove=h,e.onload=o(this.fire,this,"load"),e.onerror=o(this._overlayOnError,this,"error"),(this.options.crossOrigin||""===this.options.crossOrigin)&&(e.crossOrigin=!0===this.options.crossOrigin?"":this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),t?this._url=e.src:(e.src=this._url,e.alt=this.options.alt)},_animateZoom:function(t){var e=this._map.getZoomScale(t.zoom),i=this._map._latLngBoundsToNewLayerBounds(this._bounds,t.zoom,t.center).min;Te(this._image,i,e)},_reset:function(){var t=this._image,e=new Z(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),i=e.getSize();Ee(t,e.min),t.style.width=i.x+"px",t.style.height=i.y+"px"},_updateOpacity:function(){Le(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&void 0!==this.options.zIndex&&null!==this.options.zIndex&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error");var t=this.options.errorOverlayUrl;t&&this._url!==t&&(this._url=t,this._image.src=t)},getCenter:function(){return this._bounds.getCenter()}}),zn=function(t,e,i){return new kn(t,e,i)},Tn=kn.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var t="VIDEO"===this._url.tagName,e=this._image=t?this._url:me("video");if(be(e,"leaflet-image-layer"),this._zoomAnimated&&be(e,"leaflet-zoom-animated"),this.options.className&&be(e,this.options.className),e.onselectstart=h,e.onmousemove=h,e.onloadeddata=o(this.fire,this,"load"),t){for(var i=e.getElementsByTagName("source"),n=[],s=0;s<i.length;s++)n.push(i[s].src);this._url=i.length>0?n:[e.src]}else{g(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(e.style,"objectFit")&&(e.style.objectFit="fill"),e.autoplay=!!this.options.autoplay,e.loop=!!this.options.loop,e.muted=!!this.options.muted,e.playsInline=!!this.options.playsInline;for(var a=0;a<this._url.length;a++){var r=me("source");r.src=this._url[a],e.appendChild(r)}}}});function En(t,e,i){return new Tn(t,e,i)}var Sn=kn.extend({_initImage:function(){var t=this._image=this._url;be(t,"leaflet-image-layer"),this._zoomAnimated&&be(t,"leaflet-zoom-animated"),this.options.className&&be(t,this.options.className),t.onselectstart=h,t.onmousemove=h}});function An(t,e,i){return new Sn(t,e,i)}var Mn=Vi.extend({options:{interactive:!1,offset:[0,0],className:"",pane:void 0,content:""},initialize:function(t,e){t&&(t instanceof R||g(t))?(this._latlng=H(t),p(this,e)):(p(this,t),this._source=e),this.options.content&&(this._content=this.options.content)},openOn:function(t){return(t=arguments.length?t:this._source._map).hasLayer(this)||t.addLayer(this),this},close:function(){return this._map&&this._map.removeLayer(this),this},toggle:function(t){return this._map?this.close():(arguments.length?this._source=t:t=this._source,this._prepareOpen(),this.openOn(t._map)),this},onAdd:function(t){this._zoomAnimated=t._zoomAnimated,this._container||this._initLayout(),t._fadeAnimated&&Le(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),t._fadeAnimated&&Le(this._container,1),this.bringToFront(),this.options.interactive&&(be(this._container,"leaflet-interactive"),this.addInteractiveTarget(this._container))},onRemove:function(t){t._fadeAnimated?(Le(this._container,0),this._removeTimeout=setTimeout(o(_e,void 0,this._container),200)):_e(this._container),this.options.interactive&&(xe(this._container,"leaflet-interactive"),this.removeInteractiveTarget(this._container))},getLatLng:function(){return this._latlng},setLatLng:function(t){return this._latlng=H(t),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(t){return this._content=t,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var t={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&ge(this._container),this},bringToBack:function(){return this._map&&ve(this._container),this},_prepareOpen:function(t){var e=this._source;if(!e._map)return!1;if(e instanceof Ki){e=null;var i=this._source._layers;for(var n in i)if(i[n]._map){e=i[n];break}if(!e)return!1;this._source=e}if(!t)if(e.getCenter)t=e.getCenter();else if(e.getLatLng)t=e.getLatLng();else{if(!e.getBounds)throw new Error("Unable to get source layer LatLng.");t=e.getBounds().getCenter()}return this.setLatLng(t),this._map&&this.update(),!0},_updateContent:function(){if(this._content){var t=this._contentNode,e="function"==typeof this._content?this._content(this._source||this):this._content;if("string"==typeof e)t.innerHTML=e;else{for(;t.hasChildNodes();)t.removeChild(t.firstChild);t.appendChild(e)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var t=this._map.latLngToLayerPoint(this._latlng),e=I(this.options.offset),i=this._getAnchor();this._zoomAnimated?Ee(this._container,t.add(i)):e=e.add(t).add(i);var n=this._containerBottom=-e.y,o=this._containerLeft=-Math.round(this._containerWidth/2)+e.x;this._container.style.bottom=n+"px",this._container.style.left=o+"px"}},_getAnchor:function(){return[0,0]}});ni.include({_initOverlay:function(t,e,i,n){var o=e;return o instanceof t||(o=new t(n).setContent(e)),i&&o.setLatLng(i),o}}),Vi.include({_initOverlay:function(t,e,i,n){var o=i;return o instanceof t?(p(o,n),o._source=this):(o=e&&!n?e:new t(n,this)).setContent(i),o}});var Cn=Mn.extend({options:{pane:"popupPane",offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(t){return!(t=arguments.length?t:this._source._map).hasLayer(this)&&t._popup&&t._popup.options.autoClose&&t.removeLayer(t._popup),t._popup=this,Mn.prototype.openOn.call(this,t)},onAdd:function(t){Mn.prototype.onAdd.call(this,t),t.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof on||this._source.on("preclick",Ue))},onRemove:function(t){Mn.prototype.onRemove.call(this,t),t.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof on||this._source.off("preclick",Ue))},getEvents:function(){var t=Mn.prototype.getEvents.call(this);return(void 0!==this.options.closeOnClick?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(t.preclick=this.close),this.options.keepInView&&(t.moveend=this._adjustPan),t},_initLayout:function(){var t="leaflet-popup",e=this._container=me("div",t+" "+(this.options.className||"")+" leaflet-zoom-animated"),i=this._wrapper=me("div",t+"-content-wrapper",e);if(this._contentNode=me("div",t+"-content",i),qe(e),Ve(this._contentNode),Be(e,"contextmenu",Ue),this._tipContainer=me("div",t+"-tip-container",e),this._tip=me("div",t+"-tip",this._tipContainer),this.options.closeButton){var n=this._closeButton=me("a",t+"-close-button",e);n.setAttribute("role","button"),n.setAttribute("aria-label","Close popup"),n.href="#close",n.innerHTML='<span aria-hidden="true">&#215;</span>',Be(n,"click",function(t){Ge(t),this.close()},this)}},_updateLayout:function(){var t=this._contentNode,e=t.style;e.width="",e.whiteSpace="nowrap";var i=t.offsetWidth;i=Math.min(i,this.options.maxWidth),i=Math.max(i,this.options.minWidth),e.width=i+1+"px",e.whiteSpace="",e.height="";var n=t.offsetHeight,o=this.options.maxHeight,s="leaflet-popup-scrolled";o&&n>o?(e.height=o+"px",be(t,s)):xe(t,s),this._containerWidth=this._container.offsetWidth},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center),i=this._getAnchor();Ee(this._container,e.add(i))},_adjustPan:function(){if(this.options.autoPan)if(this._map._panAnim&&this._map._panAnim.stop(),this._autopanning)this._autopanning=!1;else{var t=this._map,e=parseInt(pe(this._container,"marginBottom"),10)||0,i=this._container.offsetHeight+e,n=this._containerWidth,o=new $(this._containerLeft,-i-this._containerBottom);o._add(Se(this._container));var s=t.layerPointToContainerPoint(o),a=I(this.options.autoPanPadding),r=I(this.options.autoPanPaddingTopLeft||a),l=I(this.options.autoPanPaddingBottomRight||a),h=t.getSize(),c=0,d=0;s.x+n+l.x>h.x&&(c=s.x+n-h.x+l.x),s.x-c-r.x<0&&(c=s.x-r.x),s.y+i+l.y>h.y&&(d=s.y+i-h.y+l.y),s.y-d-r.y<0&&(d=s.y-r.y),(c||d)&&(this.options.keepInView&&(this._autopanning=!0),t.fire("autopanstart").panBy([c,d]))}},_getAnchor:function(){return I(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),$n=function(t,e){return new Cn(t,e)};ni.mergeOptions({closePopupOnClick:!0}),ni.include({openPopup:function(t,e,i){return this._initOverlay(Cn,t,e,i).openOn(this),this},closePopup:function(t){return(t=arguments.length?t:this._popup)&&t.close(),this}}),Vi.include({bindPopup:function(t,e){return this._popup=this._initOverlay(Cn,this._popup,t,e),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(t){return this._popup&&(this instanceof Ki||(this._popup._source=this),this._popup._prepareOpen(t||this._latlng)&&this._popup.openOn(this._map)),this},closePopup:function(){return this._popup&&this._popup.close(),this},togglePopup:function(){return this._popup&&this._popup.toggle(this),this},isPopupOpen:function(){return!!this._popup&&this._popup.isOpen()},setPopupContent:function(t){return this._popup&&this._popup.setContent(t),this},getPopup:function(){return this._popup},_openPopup:function(t){if(this._popup&&this._map){Ke(t);var e=t.layer||t.target;this._popup._source!==e||e instanceof on?(this._popup._source=e,this.openPopup(t.latlng)):this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(t.latlng)}},_movePopup:function(t){this._popup.setLatLng(t.latlng)},_onKeyPress:function(t){13===t.originalEvent.keyCode&&this._openPopup(t)}});var On=Mn.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,opacity:.9},onAdd:function(t){Mn.prototype.onAdd.call(this,t),this.setOpacity(this.options.opacity),t.fire("tooltipopen",{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire("tooltipopen",{tooltip:this},!0))},onRemove:function(t){Mn.prototype.onRemove.call(this,t),t.fire("tooltipclose",{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire("tooltipclose",{tooltip:this},!0))},getEvents:function(){var t=Mn.prototype.getEvents.call(this);return this.options.permanent||(t.preclick=this.close),t},_initLayout:function(){var t="leaflet-tooltip "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=me("div",t),this._container.setAttribute("role","tooltip"),this._container.setAttribute("id","leaflet-tooltip-"+a(this))},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(t){var e,i,n=this._map,o=this._container,s=n.latLngToContainerPoint(n.getCenter()),a=n.layerPointToContainerPoint(t),r=this.options.direction,l=o.offsetWidth,h=o.offsetHeight,c=I(this.options.offset),d=this._getAnchor();"top"===r?(e=l/2,i=h):"bottom"===r?(e=l/2,i=0):"center"===r?(e=l/2,i=h/2):"right"===r?(e=0,i=h/2):"left"===r?(e=l,i=h/2):a.x<s.x?(r="right",e=0,i=h/2):(r="left",e=l+2*(c.x+d.x),i=h/2),t=t.subtract(I(e,i,!0)).add(c).add(d),xe(o,"leaflet-tooltip-right"),xe(o,"leaflet-tooltip-left"),xe(o,"leaflet-tooltip-top"),xe(o,"leaflet-tooltip-bottom"),be(o,"leaflet-tooltip-"+r),Ee(o,t)},_updatePosition:function(){var t=this._map.latLngToLayerPoint(this._latlng);this._setPosition(t)},setOpacity:function(t){this.options.opacity=t,this._container&&Le(this._container,t)},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center);this._setPosition(e)},_getAnchor:function(){return I(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),In=function(t,e){return new On(t,e)};ni.include({openTooltip:function(t,e,i){return this._initOverlay(On,t,e,i).openOn(this),this},closeTooltip:function(t){return t.close(),this}}),Vi.include({bindTooltip:function(t,e){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay(On,this._tooltip,t,e),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(t){if(t||!this._tooltipHandlersAdded){var e=t?"off":"on",i={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?i.add=this._openTooltip:(i.mouseover=this._openTooltip,i.mouseout=this.closeTooltip,i.click=this._openTooltip,this._map?this._addFocusListeners():i.add=this._addFocusListeners),this._tooltip.options.sticky&&(i.mousemove=this._moveTooltip),this[e](i),this._tooltipHandlersAdded=!t}},openTooltip:function(t){return this._tooltip&&(this instanceof Ki||(this._tooltip._source=this),this._tooltip._prepareOpen(t)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this))),this},closeTooltip:function(){if(this._tooltip)return this._tooltip.close()},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(t){return this._tooltip&&this._tooltip.setContent(t),this},getTooltip:function(){return this._tooltip},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this)},_addFocusListenersOnLayer:function(t){var e="function"==typeof t.getElement&&t.getElement();e&&(Be(e,"focus",function(){this._tooltip._source=t,this.openTooltip()},this),Be(e,"blur",this.closeTooltip,this))},_setAriaDescribedByOnLayer:function(t){var e="function"==typeof t.getElement&&t.getElement();e&&e.setAttribute("aria-describedby",this._tooltip._container.id)},_openTooltip:function(t){if(this._tooltip&&this._map)if(this._map.dragging&&this._map.dragging.moving()&&!this._openOnceFlag){this._openOnceFlag=!0;var e=this;this._map.once("moveend",function(){e._openOnceFlag=!1,e._openTooltip(t)})}else this._tooltip._source=t.layer||t.target,this.openTooltip(this._tooltip.options.sticky?t.latlng:void 0)},_moveTooltip:function(t){var e,i,n=t.latlng;this._tooltip.options.sticky&&t.originalEvent&&(e=this._map.mouseEventToContainerPoint(t.originalEvent),i=this._map.containerPointToLayerPoint(e),n=this._map.layerPointToLatLng(i)),this._tooltip.setLatLng(n)}});var Zn=Ji.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(t){var e=t&&"DIV"===t.tagName?t:document.createElement("div"),i=this.options;if(i.html instanceof Element?(fe(e),e.appendChild(i.html)):e.innerHTML=!1!==i.html?i.html:"",i.bgPos){var n=I(i.bgPos);e.style.backgroundPosition=-n.x+"px "+-n.y+"px"}return this._setIconStyles(e,"icon"),e},createShadow:function(){return null}});function Nn(t){return new Zn(t)}Ji.Default=Qi;var Bn=Vi.extend({options:{tileSize:256,opacity:1,updateWhenIdle:Nt.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(t){p(this,t)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView()},beforeAdd:function(t){t._addZoomLimit(this)},onRemove:function(t){this._removeAllTiles(),_e(this._container),t._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(ge(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(ve(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(t){return this.options.opacity=t,this._updateOpacity(),this},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){if(this._map){this._removeAllTiles();var t=this._clampZoom(this._map.getZoom());t!==this._tileZoom&&(this._tileZoom=t,this._updateLevels()),this._update()}return this},getEvents:function(){var t={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=r(this._onMoveEnd,this.options.updateInterval,this)),t.move=this._onMove),this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},createTile:function(){return document.createElement("div")},getTileSize:function(){var t=this.options.tileSize;return t instanceof $?t:new $(t,t)},_updateZIndex:function(){this._container&&void 0!==this.options.zIndex&&null!==this.options.zIndex&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(t){for(var e,i=this.getPane().children,n=-t(-1/0,1/0),o=0,s=i.length;o<s;o++)e=i[o].style.zIndex,i[o]!==this._container&&e&&(n=t(n,+e));isFinite(n)&&(this.options.zIndex=n+t(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!Nt.ielt9){Le(this._container,this.options.opacity);var t=+new Date,e=!1,i=!1;for(var n in this._tiles){var o=this._tiles[n];if(o.current&&o.loaded){var s=Math.min(1,(t-o.loaded)/200);Le(o.el,s),s<1?e=!0:(o.active?i=!0:this._onOpaqueTile(o),o.active=!0)}}i&&!this._noPrune&&this._pruneTiles(),e&&(T(this._fadeFrame),this._fadeFrame=z(this._updateOpacity,this))}},_onOpaqueTile:h,_initContainer:function(){this._container||(this._container=me("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var t=this._tileZoom,e=this.options.maxZoom;if(void 0!==t){for(var i in this._levels)i=Number(i),this._levels[i].el.children.length||i===t?(this._levels[i].el.style.zIndex=e-Math.abs(t-i),this._onUpdateLevel(i)):(_e(this._levels[i].el),this._removeTilesAtZoom(i),this._onRemoveLevel(i),delete this._levels[i]);var n=this._levels[t],o=this._map;return n||((n=this._levels[t]={}).el=me("div","leaflet-tile-container leaflet-zoom-animated",this._container),n.el.style.zIndex=e,n.origin=o.project(o.unproject(o.getPixelOrigin()),t).round(),n.zoom=t,this._setZoomTransform(n,o.getCenter(),o.getZoom()),h(n.el.offsetWidth),this._onCreateLevel(n)),this._level=n,n}},_onUpdateLevel:h,_onRemoveLevel:h,_onCreateLevel:h,_pruneTiles:function(){if(this._map){var t,e,i=this._map.getZoom();if(i>this.options.maxZoom||i<this.options.minZoom)this._removeAllTiles();else{for(t in this._tiles)(e=this._tiles[t]).retain=e.current;for(t in this._tiles)if((e=this._tiles[t]).current&&!e.active){var n=e.coords;this._retainParent(n.x,n.y,n.z,n.z-5)||this._retainChildren(n.x,n.y,n.z,n.z+2)}for(t in this._tiles)this._tiles[t].retain||this._removeTile(t)}}},_removeTilesAtZoom:function(t){for(var e in this._tiles)this._tiles[e].coords.z===t&&this._removeTile(e)},_removeAllTiles:function(){for(var t in this._tiles)this._removeTile(t)},_invalidateAll:function(){for(var t in this._levels)_e(this._levels[t].el),this._onRemoveLevel(Number(t)),delete this._levels[t];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(t,e,i,n){var o=Math.floor(t/2),s=Math.floor(e/2),a=i-1,r=new $(+o,+s);r.z=+a;var l=this._tileCoordsToKey(r),h=this._tiles[l];return h&&h.active?(h.retain=!0,!0):(h&&h.loaded&&(h.retain=!0),a>n&&this._retainParent(o,s,a,n))},_retainChildren:function(t,e,i,n){for(var o=2*t;o<2*t+2;o++)for(var s=2*e;s<2*e+2;s++){var a=new $(o,s);a.z=i+1;var r=this._tileCoordsToKey(a),l=this._tiles[r];l&&l.active?l.retain=!0:(l&&l.loaded&&(l.retain=!0),i+1<n&&this._retainChildren(o,s,i+1,n))}},_resetView:function(t){var e=t&&(t.pinch||t.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),e,e)},_animateZoom:function(t){this._setView(t.center,t.zoom,!0,t.noUpdate)},_clampZoom:function(t){var e=this.options;return void 0!==e.minNativeZoom&&t<e.minNativeZoom?e.minNativeZoom:void 0!==e.maxNativeZoom&&e.maxNativeZoom<t?e.maxNativeZoom:t},_setView:function(t,e,i,n){var o=Math.round(e);o=void 0!==this.options.maxZoom&&o>this.options.maxZoom||void 0!==this.options.minZoom&&o<this.options.minZoom?void 0:this._clampZoom(o);var s=this.options.updateWhenZooming&&o!==this._tileZoom;n&&!s||(this._tileZoom=o,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),void 0!==o&&this._update(t),i||this._pruneTiles(),this._noPrune=!!i),this._setZoomTransforms(t,e)},_setZoomTransforms:function(t,e){for(var i in this._levels)this._setZoomTransform(this._levels[i],t,e)},_setZoomTransform:function(t,e,i){var n=this._map.getZoomScale(i,t.zoom),o=t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(e,i)).round();Nt.any3d?Te(t.el,o,n):Ee(t.el,o)},_resetGrid:function(){var t=this._map,e=t.options.crs,i=this._tileSize=this.getTileSize(),n=this._tileZoom,o=this._map.getPixelWorldBounds(this._tileZoom);o&&(this._globalTileRange=this._pxBoundsToTileRange(o)),this._wrapX=e.wrapLng&&!this.options.noWrap&&[Math.floor(t.project([0,e.wrapLng[0]],n).x/i.x),Math.ceil(t.project([0,e.wrapLng[1]],n).x/i.y)],this._wrapY=e.wrapLat&&!this.options.noWrap&&[Math.floor(t.project([e.wrapLat[0],0],n).y/i.x),Math.ceil(t.project([e.wrapLat[1],0],n).y/i.y)]},_onMoveEnd:function(){this._map&&!this._map._animatingZoom&&this._update()},_getTiledPixelBounds:function(t){var e=this._map,i=e._animatingZoom?Math.max(e._animateToZoom,e.getZoom()):e.getZoom(),n=e.getZoomScale(i,this._tileZoom),o=e.project(t,this._tileZoom).floor(),s=e.getSize().divideBy(2*n);return new Z(o.subtract(s),o.add(s))},_update:function(t){var e=this._map;if(e){var i=this._clampZoom(e.getZoom());if(void 0===t&&(t=e.getCenter()),void 0!==this._tileZoom){var n=this._getTiledPixelBounds(t),o=this._pxBoundsToTileRange(n),s=o.getCenter(),a=[],r=this.options.keepBuffer,l=new Z(o.getBottomLeft().subtract([r,-r]),o.getTopRight().add([r,-r]));if(!(isFinite(o.min.x)&&isFinite(o.min.y)&&isFinite(o.max.x)&&isFinite(o.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var h in this._tiles){var c=this._tiles[h].coords;c.z===this._tileZoom&&l.contains(new $(c.x,c.y))||(this._tiles[h].current=!1)}if(Math.abs(i-this._tileZoom)>1)this._setView(t,i);else{for(var d=o.min.y;d<=o.max.y;d++)for(var u=o.min.x;u<=o.max.x;u++){var p=new $(u,d);if(p.z=this._tileZoom,this._isValidTile(p)){var m=this._tiles[this._tileCoordsToKey(p)];m?m.current=!0:a.push(p)}}if(a.sort(function(t,e){return t.distanceTo(s)-e.distanceTo(s)}),0!==a.length){this._loading||(this._loading=!0,this.fire("loading"));var _=document.createDocumentFragment();for(u=0;u<a.length;u++)this._addTile(a[u],_);this._level.el.appendChild(_)}}}}},_isValidTile:function(t){var e=this._map.options.crs;if(!e.infinite){var i=this._globalTileRange;if(!e.wrapLng&&(t.x<i.min.x||t.x>i.max.x)||!e.wrapLat&&(t.y<i.min.y||t.y>i.max.y))return!1}if(!this.options.bounds)return!0;var n=this._tileCoordsToBounds(t);return D(this.options.bounds).overlaps(n)},_keyToBounds:function(t){return this._tileCoordsToBounds(this._keyToTileCoords(t))},_tileCoordsToNwSe:function(t){var e=this._map,i=this.getTileSize(),n=t.scaleBy(i),o=n.add(i);return[e.unproject(n,t.z),e.unproject(o,t.z)]},_tileCoordsToBounds:function(t){var e=this._tileCoordsToNwSe(t),i=new B(e[0],e[1]);return this.options.noWrap||(i=this._map.wrapLatLngBounds(i)),i},_tileCoordsToKey:function(t){return t.x+":"+t.y+":"+t.z},_keyToTileCoords:function(t){var e=t.split(":"),i=new $(+e[0],+e[1]);return i.z=+e[2],i},_removeTile:function(t){var e=this._tiles[t];e&&(_e(e.el),delete this._tiles[t],this.fire("tileunload",{tile:e.el,coords:this._keyToTileCoords(t)}))},_initTile:function(t){be(t,"leaflet-tile");var e=this.getTileSize();t.style.width=e.x+"px",t.style.height=e.y+"px",t.onselectstart=h,t.onmousemove=h,Nt.ielt9&&this.options.opacity<1&&Le(t,this.options.opacity)},_addTile:function(t,e){var i=this._getTilePos(t),n=this._tileCoordsToKey(t),s=this.createTile(this._wrapCoords(t),o(this._tileReady,this,t));this._initTile(s),this.createTile.length<2&&z(o(this._tileReady,this,t,null,s)),Ee(s,i),this._tiles[n]={el:s,coords:t,current:!0},e.appendChild(s),this.fire("tileloadstart",{tile:s,coords:t})},_tileReady:function(t,e,i){e&&this.fire("tileerror",{error:e,tile:i,coords:t});var n=this._tileCoordsToKey(t);(i=this._tiles[n])&&(i.loaded=+new Date,this._map._fadeAnimated?(Le(i.el,0),T(this._fadeFrame),this._fadeFrame=z(this._updateOpacity,this)):(i.active=!0,this._pruneTiles()),e||(be(i.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:i.el,coords:t})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),Nt.ielt9||!this._map._fadeAnimated?z(this._pruneTiles,this):setTimeout(o(this._pruneTiles,this),250)))},_getTilePos:function(t){return t.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(t){var e=new $(this._wrapX?l(t.x,this._wrapX):t.x,this._wrapY?l(t.y,this._wrapY):t.y);return e.z=t.z,e},_pxBoundsToTileRange:function(t){var e=this.getTileSize();return new Z(t.min.unscaleBy(e).floor(),t.max.unscaleBy(e).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var t in this._tiles)if(!this._tiles[t].loaded)return!1;return!0}});function Dn(t){return new Bn(t)}var Rn=Bn.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(t,e){this._url=t,(e=p(this,e)).detectRetina&&Nt.retina&&e.maxZoom>0?(e.tileSize=Math.floor(e.tileSize/2),e.zoomReverse?(e.zoomOffset--,e.minZoom=Math.min(e.maxZoom,e.minZoom+1)):(e.zoomOffset++,e.maxZoom=Math.max(e.minZoom,e.maxZoom-1)),e.minZoom=Math.max(0,e.minZoom)):e.zoomReverse?e.minZoom=Math.min(e.maxZoom,e.minZoom):e.maxZoom=Math.max(e.minZoom,e.maxZoom),"string"==typeof e.subdomains&&(e.subdomains=e.subdomains.split("")),this.on("tileunload",this._onTileRemove)},setUrl:function(t,e){return this._url===t&&void 0===e&&(e=!0),this._url=t,e||this.redraw(),this},createTile:function(t,e){var i=document.createElement("img");return Be(i,"load",o(this._tileOnLoad,this,e,i)),Be(i,"error",o(this._tileOnError,this,e,i)),(this.options.crossOrigin||""===this.options.crossOrigin)&&(i.crossOrigin=!0===this.options.crossOrigin?"":this.options.crossOrigin),"string"==typeof this.options.referrerPolicy&&(i.referrerPolicy=this.options.referrerPolicy),i.alt="",i.src=this.getTileUrl(t),i},getTileUrl:function(t){var e={r:Nt.retina?"@2x":"",s:this._getSubdomain(t),x:t.x,y:t.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var n=this._globalTileRange.max.y-t.y;this.options.tms&&(e.y=n),e["-y"]=n}return f(this._url,i(e,this.options))},_tileOnLoad:function(t,e){Nt.ielt9?setTimeout(o(t,this,null,e),0):t(null,e)},_tileOnError:function(t,e,i){var n=this.options.errorTileUrl;n&&e.getAttribute("src")!==n&&(e.src=n),t(i,e)},_onTileRemove:function(t){t.tile.onload=null},_getZoomForUrl:function(){var t=this._tileZoom,e=this.options.maxZoom;return this.options.zoomReverse&&(t=e-t),t+this.options.zoomOffset},_getSubdomain:function(t){var e=Math.abs(t.x+t.y)%this.options.subdomains.length;return this.options.subdomains[e]},_abortLoading:function(){var t,e;for(t in this._tiles)if(this._tiles[t].coords.z!==this._tileZoom&&((e=this._tiles[t].el).onload=h,e.onerror=h,!e.complete)){e.src=y;var i=this._tiles[t].coords;_e(e),delete this._tiles[t],this.fire("tileabort",{tile:e,coords:i})}},_removeTile:function(t){var e=this._tiles[t];if(e)return e.el.setAttribute("src",y),Bn.prototype._removeTile.call(this,t)},_tileReady:function(t,e,i){if(this._map&&(!i||i.getAttribute("src")!==y))return Bn.prototype._tileReady.call(this,t,e,i)}});function Hn(t,e){return new Rn(t,e)}var jn=Rn.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(t,e){this._url=t;var n=i({},this.defaultWmsParams);for(var o in e)o in this.options||(n[o]=e[o]);var s=(e=p(this,e)).detectRetina&&Nt.retina?2:1,a=this.getTileSize();n.width=a.x*s,n.height=a.y*s,this.wmsParams=n},onAdd:function(t){this._crs=this.options.crs||t.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var e=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[e]=this._crs.code,Rn.prototype.onAdd.call(this,t)},getTileUrl:function(t){var e=this._tileCoordsToNwSe(t),i=this._crs,n=N(i.project(e[0]),i.project(e[1])),o=n.min,s=n.max,a=(this._wmsVersion>=1.3&&this._crs===Wi?[o.y,o.x,s.y,s.x]:[o.x,o.y,s.x,s.y]).join(","),r=Rn.prototype.getTileUrl.call(this,t);return r+m(this.wmsParams,r,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+a},setParams:function(t,e){return i(this.wmsParams,t),e||this.redraw(),this}});function Fn(t,e){return new jn(t,e)}Rn.WMS=jn,Hn.wms=Fn;var Wn=Vi.extend({options:{padding:.1},initialize:function(t){p(this,t),a(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),be(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var t={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(t.zoomanim=this._onAnimZoom),t},_onAnimZoom:function(t){this._updateTransform(t.center,t.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(t,e){var i=this._map.getZoomScale(e,this._zoom),n=this._map.getSize().multiplyBy(.5+this.options.padding),o=this._map.project(this._center,e),s=n.multiplyBy(-i).add(o).subtract(this._map._getNewPixelOrigin(t,e));Nt.any3d?Te(this._container,s,i):Ee(this._container,s)},_reset:function(){for(var t in this._update(),this._updateTransform(this._center,this._zoom),this._layers)this._layers[t]._reset()},_onZoomEnd:function(){for(var t in this._layers)this._layers[t]._project()},_updatePaths:function(){for(var t in this._layers)this._layers[t]._update()},_update:function(){var t=this.options.padding,e=this._map.getSize(),i=this._map.containerPointToLayerPoint(e.multiplyBy(-t)).round();this._bounds=new Z(i,i.add(e.multiplyBy(1+2*t)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),Un=Wn.extend({options:{tolerance:0},getEvents:function(){var t=Wn.prototype.getEvents.call(this);return t.viewprereset=this._onViewPreReset,t},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){Wn.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var t=this._container=document.createElement("canvas");Be(t,"mousemove",this._onMouseMove,this),Be(t,"click dblclick mousedown mouseup contextmenu",this._onClick,this),Be(t,"mouseout",this._handleMouseOut,this),t._leaflet_disable_events=!0,this._ctx=t.getContext("2d")},_destroyContainer:function(){T(this._redrawRequest),delete this._ctx,_e(this._container),Re(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){for(var t in this._redrawBounds=null,this._layers)this._layers[t]._update();this._redraw()}},_update:function(){if(!this._map._animatingZoom||!this._bounds){Wn.prototype._update.call(this);var t=this._bounds,e=this._container,i=t.getSize(),n=Nt.retina?2:1;Ee(e,t.min),e.width=n*i.x,e.height=n*i.y,e.style.width=i.x+"px",e.style.height=i.y+"px",Nt.retina&&this._ctx.scale(2,2),this._ctx.translate(-t.min.x,-t.min.y),this.fire("update")}},_reset:function(){Wn.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(t){this._updateDashArray(t),this._layers[a(t)]=t;var e=t._order={layer:t,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=e),this._drawLast=e,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(t){this._requestRedraw(t)},_removePath:function(t){var e=t._order,i=e.next,n=e.prev;i?i.prev=n:this._drawLast=n,n?n.next=i:this._drawFirst=i,delete t._order,delete this._layers[a(t)],this._requestRedraw(t)},_updatePath:function(t){this._extendRedrawBounds(t),t._project(),t._update(),this._requestRedraw(t)},_updateStyle:function(t){this._updateDashArray(t),this._requestRedraw(t)},_updateDashArray:function(t){if("string"==typeof t.options.dashArray){var e,i,n=t.options.dashArray.split(/[, ]+/),o=[];for(i=0;i<n.length;i++){if(e=Number(n[i]),isNaN(e))return;o.push(e)}t.options._dashArray=o}else t.options._dashArray=t.options.dashArray},_requestRedraw:function(t){this._map&&(this._extendRedrawBounds(t),this._redrawRequest=this._redrawRequest||z(this._redraw,this))},_extendRedrawBounds:function(t){if(t._pxBounds){var e=(t.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new Z,this._redrawBounds.extend(t._pxBounds.min.subtract([e,e])),this._redrawBounds.extend(t._pxBounds.max.add([e,e]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var t=this._redrawBounds;if(t){var e=t.getSize();this._ctx.clearRect(t.min.x,t.min.y,e.x,e.y)}else this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore()},_draw:function(){var t,e=this._redrawBounds;if(this._ctx.save(),e){var i=e.getSize();this._ctx.beginPath(),this._ctx.rect(e.min.x,e.min.y,i.x,i.y),this._ctx.clip()}this._drawing=!0;for(var n=this._drawFirst;n;n=n.next)t=n.layer,(!e||t._pxBounds&&t._pxBounds.intersects(e))&&t._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(t,e){if(this._drawing){var i,n,o,s,a=t._parts,r=a.length,l=this._ctx;if(r){for(l.beginPath(),i=0;i<r;i++){for(n=0,o=a[i].length;n<o;n++)s=a[i][n],l[n?"lineTo":"moveTo"](s.x,s.y);e&&l.closePath()}this._fillStroke(l,t)}}},_updateCircle:function(t){if(this._drawing&&!t._empty()){var e=t._point,i=this._ctx,n=Math.max(Math.round(t._radius),1),o=(Math.max(Math.round(t._radiusY),1)||n)/n;1!==o&&(i.save(),i.scale(1,o)),i.beginPath(),i.arc(e.x,e.y/o,n,0,2*Math.PI,!1),1!==o&&i.restore(),this._fillStroke(i,t)}},_fillStroke:function(t,e){var i=e.options;i.fill&&(t.globalAlpha=i.fillOpacity,t.fillStyle=i.fillColor||i.color,t.fill(i.fillRule||"evenodd")),i.stroke&&0!==i.weight&&(t.setLineDash&&t.setLineDash(e.options&&e.options._dashArray||[]),t.globalAlpha=i.opacity,t.lineWidth=i.weight,t.strokeStyle=i.color,t.lineCap=i.lineCap,t.lineJoin=i.lineJoin,t.stroke())},_onClick:function(t){for(var e,i,n=this._map.mouseEventToLayerPoint(t),o=this._drawFirst;o;o=o.next)(e=o.layer).options.interactive&&e._containsPoint(n)&&("click"!==t.type&&"preclick"!==t.type||!this._map._draggableMoved(e))&&(i=e);this._fireEvent(!!i&&[i],t)},_onMouseMove:function(t){if(this._map&&!this._map.dragging.moving()&&!this._map._animatingZoom){var e=this._map.mouseEventToLayerPoint(t);this._handleMouseHover(t,e)}},_handleMouseOut:function(t){var e=this._hoveredLayer;e&&(xe(this._container,"leaflet-interactive"),this._fireEvent([e],t,"mouseout"),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(t,e){if(!this._mouseHoverThrottled){for(var i,n,s=this._drawFirst;s;s=s.next)(i=s.layer).options.interactive&&i._containsPoint(e)&&(n=i);n!==this._hoveredLayer&&(this._handleMouseOut(t),n&&(be(this._container,"leaflet-interactive"),this._fireEvent([n],t,"mouseover"),this._hoveredLayer=n)),this._fireEvent(!!this._hoveredLayer&&[this._hoveredLayer],t),this._mouseHoverThrottled=!0,setTimeout(o(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(t,e,i){this._map._fireDOMEvent(e,i||e.type,t)},_bringToFront:function(t){var e=t._order;if(e){var i=e.next,n=e.prev;i&&(i.prev=n,n?n.next=i:i&&(this._drawFirst=i),e.prev=this._drawLast,this._drawLast.next=e,e.next=null,this._drawLast=e,this._requestRedraw(t))}},_bringToBack:function(t){var e=t._order;if(e){var i=e.next,n=e.prev;n&&(n.next=i,i?i.prev=n:n&&(this._drawLast=n),e.prev=null,e.next=this._drawFirst,this._drawFirst.prev=e,this._drawFirst=e,this._requestRedraw(t))}}});function Vn(t){return Nt.canvas?new Un(t):null}var qn=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(t){return document.createElement("<lvml:"+t+' class="lvml">')}}catch(t){}return function(t){return document.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}(),Gn={_initContainer:function(){this._container=me("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(Wn.prototype._update.call(this),this.fire("update"))},_initPath:function(t){var e=t._container=qn("shape");be(e,"leaflet-vml-shape "+(this.options.className||"")),e.coordsize="1 1",t._path=qn("path"),e.appendChild(t._path),this._updateStyle(t),this._layers[a(t)]=t},_addPath:function(t){var e=t._container;this._container.appendChild(e),t.options.interactive&&t.addInteractiveTarget(e)},_removePath:function(t){var e=t._container;_e(e),t.removeInteractiveTarget(e),delete this._layers[a(t)]},_updateStyle:function(t){var e=t._stroke,i=t._fill,n=t.options,o=t._container;o.stroked=!!n.stroke,o.filled=!!n.fill,n.stroke?(e||(e=t._stroke=qn("stroke")),o.appendChild(e),e.weight=n.weight+"px",e.color=n.color,e.opacity=n.opacity,n.dashArray?e.dashStyle=g(n.dashArray)?n.dashArray.join(" "):n.dashArray.replace(/( *, *)/g," "):e.dashStyle="",e.endcap=n.lineCap.replace("butt","flat"),e.joinstyle=n.lineJoin):e&&(o.removeChild(e),t._stroke=null),n.fill?(i||(i=t._fill=qn("fill")),o.appendChild(i),i.color=n.fillColor||n.color,i.opacity=n.fillOpacity):i&&(o.removeChild(i),t._fill=null)},_updateCircle:function(t){var e=t._point.round(),i=Math.round(t._radius),n=Math.round(t._radiusY||i);this._setPath(t,t._empty()?"M0 0":"AL "+e.x+","+e.y+" "+i+","+n+" 0,23592600")},_setPath:function(t,e){t._path.v=e},_bringToFront:function(t){ge(t._container)},_bringToBack:function(t){ve(t._container)}},Kn=Nt.vml?qn:Y,Yn=Wn.extend({_initContainer:function(){this._container=Kn("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=Kn("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){_e(this._container),Re(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_update:function(){if(!this._map._animatingZoom||!this._bounds){Wn.prototype._update.call(this);var t=this._bounds,e=t.getSize(),i=this._container;this._svgSize&&this._svgSize.equals(e)||(this._svgSize=e,i.setAttribute("width",e.x),i.setAttribute("height",e.y)),Ee(i,t.min),i.setAttribute("viewBox",[t.min.x,t.min.y,e.x,e.y].join(" ")),this.fire("update")}},_initPath:function(t){var e=t._path=Kn("path");t.options.className&&be(e,t.options.className),t.options.interactive&&be(e,"leaflet-interactive"),this._updateStyle(t),this._layers[a(t)]=t},_addPath:function(t){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(t._path),t.addInteractiveTarget(t._path)},_removePath:function(t){_e(t._path),t.removeInteractiveTarget(t._path),delete this._layers[a(t)]},_updatePath:function(t){t._project(),t._update()},_updateStyle:function(t){var e=t._path,i=t.options;e&&(i.stroke?(e.setAttribute("stroke",i.color),e.setAttribute("stroke-opacity",i.opacity),e.setAttribute("stroke-width",i.weight),e.setAttribute("stroke-linecap",i.lineCap),e.setAttribute("stroke-linejoin",i.lineJoin),i.dashArray?e.setAttribute("stroke-dasharray",i.dashArray):e.removeAttribute("stroke-dasharray"),i.dashOffset?e.setAttribute("stroke-dashoffset",i.dashOffset):e.removeAttribute("stroke-dashoffset")):e.setAttribute("stroke","none"),i.fill?(e.setAttribute("fill",i.fillColor||i.color),e.setAttribute("fill-opacity",i.fillOpacity),e.setAttribute("fill-rule",i.fillRule||"evenodd")):e.setAttribute("fill","none"))},_updatePoly:function(t,e){this._setPath(t,J(t._parts,e))},_updateCircle:function(t){var e=t._point,i=Math.max(Math.round(t._radius),1),n="a"+i+","+(Math.max(Math.round(t._radiusY),1)||i)+" 0 1,0 ",o=t._empty()?"M0 0":"M"+(e.x-i)+","+e.y+n+2*i+",0 "+n+2*-i+",0 ";this._setPath(t,o)},_setPath:function(t,e){t._path.setAttribute("d",e)},_bringToFront:function(t){ge(t._path)},_bringToBack:function(t){ve(t._path)}});function Jn(t){return Nt.svg||Nt.vml?new Yn(t):null}Nt.vml&&Yn.include(Gn),ni.include({getRenderer:function(t){var e=t.options.renderer||this._getPaneRenderer(t.options.pane)||this.options.renderer||this._renderer;return e||(e=this._renderer=this._createRenderer()),this.hasLayer(e)||this.addLayer(e),e},_getPaneRenderer:function(t){if("overlayPane"===t||void 0===t)return!1;var e=this._paneRenderers[t];return void 0===e&&(e=this._createRenderer({pane:t}),this._paneRenderers[t]=e),e},_createRenderer:function(t){return this.options.preferCanvas&&Vn(t)||Jn(t)}});var Xn=dn.extend({initialize:function(t,e){dn.prototype.initialize.call(this,this._boundsToLatLngs(t),e)},setBounds:function(t){return this.setLatLngs(this._boundsToLatLngs(t))},_boundsToLatLngs:function(t){return[(t=D(t)).getSouthWest(),t.getNorthWest(),t.getNorthEast(),t.getSouthEast()]}});function Qn(t,e){return new Xn(t,e)}Yn.create=Kn,Yn.pointsToPath=J,pn.geometryToLayer=mn,pn.coordsToLatLng=fn,pn.coordsToLatLngs=gn,pn.latLngToCoords=vn,pn.latLngsToCoords=yn,pn.getFeature=bn,pn.asFeature=xn,ni.mergeOptions({boxZoom:!0});var to=fi.extend({initialize:function(t){this._map=t,this._container=t._container,this._pane=t._panes.overlayPane,this._resetStateTimeout=0,t.on("unload",this._destroy,this)},addHooks:function(){Be(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){Re(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){_e(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){0!==this._resetStateTimeout&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(t){if(!t.shiftKey||1!==t.which&&1!==t.button)return!1;this._clearDeferredResetState(),this._resetState(),oe(),Me(),this._startPoint=this._map.mouseEventToContainerPoint(t),Be(document,{contextmenu:Ke,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(t){this._moved||(this._moved=!0,this._box=me("div","leaflet-zoom-box",this._container),be(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(t);var e=new Z(this._point,this._startPoint),i=e.getSize();Ee(this._box,e.min),this._box.style.width=i.x+"px",this._box.style.height=i.y+"px"},_finish:function(){this._moved&&(_e(this._box),xe(this._container,"leaflet-crosshair")),se(),Ce(),Re(document,{contextmenu:Ke,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(t){if((1===t.which||1===t.button)&&(this._finish(),this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(o(this._resetState,this),0);var e=new B(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(e).fire("boxzoomend",{boxZoomBounds:e})}},_onKeyDown:function(t){27===t.keyCode&&(this._finish(),this._clearDeferredResetState(),this._resetState())}});ni.addInitHook("addHandler","boxZoom",to),ni.mergeOptions({doubleClickZoom:!0});var eo=fi.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(t){var e=this._map,i=e.getZoom(),n=e.options.zoomDelta,o=t.originalEvent.shiftKey?i-n:i+n;"center"===e.options.doubleClickZoom?e.setZoom(o):e.setZoomAround(t.containerPoint,o)}});ni.addInitHook("addHandler","doubleClickZoom",eo),ni.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var io=fi.extend({addHooks:function(){if(!this._draggable){var t=this._map;this._draggable=new yi(t._mapPane,t._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),t.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),t.on("zoomend",this._onZoomEnd,this),t.whenReady(this._onZoomEnd,this))}be(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){xe(this._map._container,"leaflet-grab"),xe(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var t=this._map;if(t._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var e=D(this._map.options.maxBounds);this._offsetLimit=N(this._map.latLngToContainerPoint(e.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(e.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;t.fire("movestart").fire("dragstart"),t.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(t){if(this._map.options.inertia){var e=this._lastTime=+new Date,i=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(i),this._times.push(e),this._prunePositions(e)}this._map.fire("move",t).fire("drag",t)},_prunePositions:function(t){for(;this._positions.length>1&&t-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var t=this._map.getSize().divideBy(2),e=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=e.subtract(t).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(t,e){return t-(t-e)*this._viscosity},_onPreDragLimit:function(){if(this._viscosity&&this._offsetLimit){var t=this._draggable._newPos.subtract(this._draggable._startPos),e=this._offsetLimit;t.x<e.min.x&&(t.x=this._viscousLimit(t.x,e.min.x)),t.y<e.min.y&&(t.y=this._viscousLimit(t.y,e.min.y)),t.x>e.max.x&&(t.x=this._viscousLimit(t.x,e.max.x)),t.y>e.max.y&&(t.y=this._viscousLimit(t.y,e.max.y)),this._draggable._newPos=this._draggable._startPos.add(t)}},_onPreDragWrap:function(){var t=this._worldWidth,e=Math.round(t/2),i=this._initialWorldOffset,n=this._draggable._newPos.x,o=(n-e+i)%t+e-i,s=(n+e+i)%t-e-i,a=Math.abs(o+i)<Math.abs(s+i)?o:s;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=a},_onDragEnd:function(t){var e=this._map,i=e.options,n=!i.inertia||t.noInertia||this._times.length<2;if(e.fire("dragend",t),n)e.fire("moveend");else{this._prunePositions(+new Date);var o=this._lastPos.subtract(this._positions[0]),s=(this._lastTime-this._times[0])/1e3,a=i.easeLinearity,r=o.multiplyBy(a/s),l=r.distanceTo([0,0]),h=Math.min(i.inertiaMaxSpeed,l),c=r.multiplyBy(h/l),d=h/(i.inertiaDeceleration*a),u=c.multiplyBy(-d/2).round();u.x||u.y?(u=e._limitOffset(u,e.options.maxBounds),z(function(){e.panBy(u,{duration:d,easeLinearity:a,noMoveStart:!0,animate:!0})})):e.fire("moveend")}}});ni.addInitHook("addHandler","dragging",io),ni.mergeOptions({keyboard:!0,keyboardPanDelta:80});var no=fi.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(t){this._map=t,this._setPanDelta(t.options.keyboardPanDelta),this._setZoomDelta(t.options.zoomDelta)},addHooks:function(){var t=this._map._container;t.tabIndex<=0&&(t.tabIndex="0"),Be(t,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),Re(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var t=document.body,e=document.documentElement,i=t.scrollTop||e.scrollTop,n=t.scrollLeft||e.scrollLeft;this._map._container.focus(),window.scrollTo(n,i)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(t){var e,i,n=this._panKeys={},o=this.keyCodes;for(e=0,i=o.left.length;e<i;e++)n[o.left[e]]=[-1*t,0];for(e=0,i=o.right.length;e<i;e++)n[o.right[e]]=[t,0];for(e=0,i=o.down.length;e<i;e++)n[o.down[e]]=[0,t];for(e=0,i=o.up.length;e<i;e++)n[o.up[e]]=[0,-1*t]},_setZoomDelta:function(t){var e,i,n=this._zoomKeys={},o=this.keyCodes;for(e=0,i=o.zoomIn.length;e<i;e++)n[o.zoomIn[e]]=t;for(e=0,i=o.zoomOut.length;e<i;e++)n[o.zoomOut[e]]=-t},_addHooks:function(){Be(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){Re(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(t){if(!(t.altKey||t.ctrlKey||t.metaKey)){var e,i=t.keyCode,n=this._map;if(i in this._panKeys){if(!n._panAnim||!n._panAnim._inProgress)if(e=this._panKeys[i],t.shiftKey&&(e=I(e).multiplyBy(3)),n.options.maxBounds&&(e=n._limitOffset(I(e),n.options.maxBounds)),n.options.worldCopyJump){var o=n.wrapLatLng(n.unproject(n.project(n.getCenter()).add(e)));n.panTo(o)}else n.panBy(e)}else if(i in this._zoomKeys)n.setZoom(n.getZoom()+(t.shiftKey?3:1)*this._zoomKeys[i]);else{if(27!==i||!n._popup||!n._popup.options.closeOnEscapeKey)return;n.closePopup()}Ke(t)}}});ni.addInitHook("addHandler","keyboard",no),ni.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var oo=fi.extend({addHooks:function(){Be(this._map._container,"wheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){Re(this._map._container,"wheel",this._onWheelScroll,this)},_onWheelScroll:function(t){var e=Qe(t),i=this._map.options.wheelDebounceTime;this._delta+=e,this._lastMousePos=this._map.mouseEventToContainerPoint(t),this._startTime||(this._startTime=+new Date);var n=Math.max(i-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(o(this._performZoom,this),n),Ke(t)},_performZoom:function(){var t=this._map,e=t.getZoom(),i=this._map.options.zoomSnap||0;t._stop();var n=this._delta/(4*this._map.options.wheelPxPerZoomLevel),o=4*Math.log(2/(1+Math.exp(-Math.abs(n))))/Math.LN2,s=i?Math.ceil(o/i)*i:o,a=t._limitZoom(e+(this._delta>0?s:-s))-e;this._delta=0,this._startTime=null,a&&("center"===t.options.scrollWheelZoom?t.setZoom(e+a):t.setZoomAround(this._lastMousePos,e+a))}});ni.addInitHook("addHandler","scrollWheelZoom",oo);var so=600;ni.mergeOptions({tapHold:Nt.touchNative&&Nt.safari&&Nt.mobile,tapTolerance:15});var ao=fi.extend({addHooks:function(){Be(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){Re(this._map._container,"touchstart",this._onDown,this)},_onDown:function(t){if(clearTimeout(this._holdTimeout),1===t.touches.length){var e=t.touches[0];this._startPos=this._newPos=new $(e.clientX,e.clientY),this._holdTimeout=setTimeout(o(function(){this._cancel(),this._isTapValid()&&(Be(document,"touchend",Ge),Be(document,"touchend touchcancel",this._cancelClickPrevent),this._simulateEvent("contextmenu",e))},this),so),Be(document,"touchend touchcancel contextmenu",this._cancel,this),Be(document,"touchmove",this._onMove,this)}},_cancelClickPrevent:function t(){Re(document,"touchend",Ge),Re(document,"touchend touchcancel",t)},_cancel:function(){clearTimeout(this._holdTimeout),Re(document,"touchend touchcancel contextmenu",this._cancel,this),Re(document,"touchmove",this._onMove,this)},_onMove:function(t){var e=t.touches[0];this._newPos=new $(e.clientX,e.clientY)},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_simulateEvent:function(t,e){var i=new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window,screenX:e.screenX,screenY:e.screenY,clientX:e.clientX,clientY:e.clientY});i._simulated=!0,e.target.dispatchEvent(i)}});ni.addInitHook("addHandler","tapHold",ao),ni.mergeOptions({touchZoom:Nt.touch,bounceAtZoomLimits:!0});var ro=fi.extend({addHooks:function(){be(this._map._container,"leaflet-touch-zoom"),Be(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){xe(this._map._container,"leaflet-touch-zoom"),Re(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(t){var e=this._map;if(t.touches&&2===t.touches.length&&!e._animatingZoom&&!this._zooming){var i=e.mouseEventToContainerPoint(t.touches[0]),n=e.mouseEventToContainerPoint(t.touches[1]);this._centerPoint=e.getSize()._divideBy(2),this._startLatLng=e.containerPointToLatLng(this._centerPoint),"center"!==e.options.touchZoom&&(this._pinchStartLatLng=e.containerPointToLatLng(i.add(n)._divideBy(2))),this._startDist=i.distanceTo(n),this._startZoom=e.getZoom(),this._moved=!1,this._zooming=!0,e._stop(),Be(document,"touchmove",this._onTouchMove,this),Be(document,"touchend touchcancel",this._onTouchEnd,this),Ge(t)}},_onTouchMove:function(t){if(t.touches&&2===t.touches.length&&this._zooming){var e=this._map,i=e.mouseEventToContainerPoint(t.touches[0]),n=e.mouseEventToContainerPoint(t.touches[1]),s=i.distanceTo(n)/this._startDist;if(this._zoom=e.getScaleZoom(s,this._startZoom),!e.options.bounceAtZoomLimits&&(this._zoom<e.getMinZoom()&&s<1||this._zoom>e.getMaxZoom()&&s>1)&&(this._zoom=e._limitZoom(this._zoom)),"center"===e.options.touchZoom){if(this._center=this._startLatLng,1===s)return}else{var a=i._add(n)._divideBy(2)._subtract(this._centerPoint);if(1===s&&0===a.x&&0===a.y)return;this._center=e.unproject(e.project(this._pinchStartLatLng,this._zoom).subtract(a),this._zoom)}this._moved||(e._moveStart(!0,!1),this._moved=!0),T(this._animRequest);var r=o(e._move,e,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=z(r,this,!0),Ge(t)}},_onTouchEnd:function(){this._moved&&this._zooming?(this._zooming=!1,T(this._animRequest),Re(document,"touchmove",this._onTouchMove,this),Re(document,"touchend touchcancel",this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))):this._zooming=!1}});ni.addInitHook("addHandler","touchZoom",ro),ni.BoxZoom=to,ni.DoubleClickZoom=eo,ni.Drag=io,ni.Keyboard=no,ni.ScrollWheelZoom=oo,ni.TapHold=ao,ni.TouchZoom=ro,t.Bounds=Z,t.Browser=Nt,t.CRS=j,t.Canvas=Un,t.Circle=rn,t.CircleMarker=sn,t.Class=S,t.Control=si,t.DivIcon=Zn,t.DivOverlay=Mn,t.DomEvent=ei,t.DomUtil=Ne,t.Draggable=yi,t.Evented=C,t.FeatureGroup=Ki,t.GeoJSON=pn,t.GridLayer=Bn,t.Handler=fi,t.Icon=Ji,t.ImageOverlay=kn,t.LatLng=R,t.LatLngBounds=B,t.Layer=Vi,t.LayerGroup=qi,t.LineUtil=Di,t.Map=ni,t.Marker=en,t.Mixin=gi,t.Path=on,t.Point=$,t.PolyUtil=Li,t.Polygon=dn,t.Polyline=hn,t.Popup=Cn,t.PosAnimation=ii,t.Projection=ji,t.Rectangle=Xn,t.Renderer=Wn,t.SVG=Yn,t.SVGOverlay=Sn,t.TileLayer=Rn,t.Tooltip=On,t.Transformation=V,t.Util=E,t.VideoOverlay=Tn,t.bind=o,t.bounds=N,t.canvas=Vn,t.circle=ln,t.circleMarker=an,t.control=ai,t.divIcon=Nn,t.extend=i,t.featureGroup=Yi,t.geoJSON=Pn,t.geoJson=Ln,t.gridLayer=Dn,t.icon=Xi,t.imageOverlay=zn,t.latLng=H,t.latLngBounds=D,t.layerGroup=Gi,t.map=oi,t.marker=nn,t.point=I,t.polygon=un,t.polyline=cn,t.popup=$n,t.rectangle=Qn,t.setOptions=p,t.stamp=a,t.svg=Jn,t.svgOverlay=An,t.tileLayer=Hn,t.tooltip=In,t.transformation=q,t.version=e,t.videoOverlay=En;var lo=window.L;t.noConflict=function(){return window.L=lo,this},window.L=t}(Mt.exports)),Mt.exports);const $t=["temp_new","wind_new","clouds_new","precipitation_new"];let Ot=class extends ht{constructor(){super(...arguments),this.nodes=[],this.owmKey="",this.zoom=10,this.radiusKm=0,this.center=null,this._owmLayer="",this._markers=[],this._signature=""}firstUpdated(){const t=this.renderRoot.querySelector("#map");t&&(this._map=Ct.map(t,{zoomControl:!0,attributionControl:!0}).setView([46,11],this.zoom),this._setBase(),this._drawNodes(),this._resizeObserver=new ResizeObserver(()=>this._map?.invalidateSize()),this._resizeObserver.observe(t),window.setTimeout(()=>this._map?.invalidateSize(),60))}updated(){const t=JSON.stringify([this.nodes.map(t=>[t.nodeNum,t.latitude,t.longitude,t.connected]),this.radiusKm,this.center]);t!==this._signature&&(this._signature=t,this._drawNodes())}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),this._map?.remove(),this._map=void 0}_isDark(){return matchMedia("(prefers-color-scheme: dark)").matches}_setBase(){this._map&&(this._base?.remove(),this._base=Ct.tileLayer(this._isDark()?"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png":"https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',maxZoom:19}).addTo(this._map))}_drawNodes(){if(!this._map)return;for(const t of this._markers)t.remove();this._markers=[];const t=[];for(const e of this.nodes){if(null===e.latitude||null===e.longitude)continue;const i=[e.latitude,e.longitude];t.push(i);const n=Ct.marker(i,{icon:Ct.divIcon({className:"pin",html:`<div class="${e.connected?"on":"off"}"></div>`,iconSize:[16,16],iconAnchor:[8,8]}),title:e.name}).addTo(this._map);n.bindPopup(this._popup(e)),this._markers.push(n)}if(this._circle?.remove(),this._circle=void 0,this.radiusKm>0&&this.center)return this._circle=Ct.circle(this.center,{radius:1e3*this.radiusKm,color:"#e0a800",weight:2,fillOpacity:.06}).addTo(this._map),void this._map.fitBounds(this._circle.getBounds(),{padding:[20,20]});1===t.length?this._map.setView(t[0],Math.max(this.zoom,13)):t.length>1&&this._map.fitBounds(Ct.latLngBounds(t),{padding:[40,40]})}_popup(t){const e=[`<b>${t.name}</b>`];return null!==t.nodeNum&&e.push(`#${t.nodeNum}`),null!==t.battery&&void 0!==t.battery&&e.push(`${t.battery}%`),t.lastSeen&&e.push(t.lastSeen),e.join("<br>")}_toggleOwm(t){this._map&&this.owmKey&&(this._owm?.remove(),this._owm=void 0,this._owmLayer!==t?(this._owmLayer=t,this._owm=Ct.tileLayer(`https://tile.openweathermap.org/map/${t}/{z}/{x}/{y}.png?appid=${this.owmKey}`,{opacity:.6,maxZoom:19}).addTo(this._map)):this._owmLayer="")}render(){return U`
      ${this.owmKey?U`
            <div class="toolbar">
              ${$t.map(t=>U`
                  <button
                    class="lchip"
                    data-on=${this._owmLayer===t?"1":"0"}
                    @click=${()=>this._toggleOwm(t)}
                  >
                    ${t.replace("_new","")}
                  </button>
                `)}
            </div>
          `:""}
      <div id="map"></div>
    `}};function It(t,e){const i=t.settings?.map_nodes??[],n=function(t,e,i=!1){const n=new Set((e??[]).map(Number));if(!i&&!n.size)return[];const o=new Map,s=new Map;for(const e of wt(t,bt)){const t=e.device_id;t&&(e.entity_id.startsWith("device_tracker.")?o.set(t,e.entity_id):e.entity_id.includes("last_heard")&&s.set(t,e.entity_id))}const a=[];for(const e of Object.values(t.devices??{})){const r=Lt(t,e.id);if(null===r)continue;const l=n.has(r);if(!i&&!l)continue;const h=o.get(e.id),c=h?t.states[h]:void 0,d=c?.attributes?.latitude,u=c?.attributes?.longitude,p=c?.attributes?.battery_level;a.push({nodeNum:r,name:e.name_by_user||e.name||c?.attributes?.friendly_name||String(r),latitude:"number"==typeof d?d:null,longitude:"number"==typeof u?u:null,battery:"number"==typeof p?p:null,lastSeen:c?.last_changed?new Date(c.last_changed).toLocaleString():"",connected:Et(t,s.get(e.id)),selected:l})}return a.sort((t,e)=>t.name.localeCompare(e.name))}(t.hass,i,t.showAll),o=function(t){const e=t.find(t=>t.selected&&null!==t.latitude)??t.find(t=>null!==t.latitude);return e&&null!==e.latitude&&null!==e.longitude?[e.latitude,e.longitude]:null}(n),s=t.radiusOn&&null!==o&&t.radiusKm>0,a=s?n.filter(e=>null===e.latitude||null===e.longitude||function(t,e,i,n){const o=t=>t*Math.PI/180,s=o(i-t),a=o(n-e),r=Math.sin(s/2)**2+Math.cos(o(t))*Math.cos(o(i))*Math.sin(a/2)**2;return 12742*Math.asin(Math.sqrt(r))}(o[0],o[1],e.latitude,e.longitude)<=t.radiusKm):n,r=a.filter(t=>null!==t.latitude&&null!==t.longitude),l=n.some(t=>null!==t.latitude);return U`
    <h2 class="screen-title">${e("tab.map")}</h2>

    <div class="map-controls">
      <label class="check">
        <input
          type="checkbox"
          .checked=${t.showAll}
          @change=${t.onToggleShowAll}
        />
        <span>${e("map.showAll")}</span>
      </label>

      <label class="check">
        <input
          type="checkbox"
          .checked=${t.radiusOn}
          @change=${t.onToggleRadius}
        />
        <span>${e("map.radiusFilter")}</span>
      </label>

      ${t.radiusOn?U`
            <span class="radius">
              <input
                type="range"
                min="1"
                max="200"
                step="1"
                .value=${String(t.radiusKm)}
                @input=${e=>t.onRadiusChange(Number(e.target.value))}
              />
              <span class="unit">${t.radiusKm} km</span>
            </span>
          `:""}
    </div>

    <div class="legend">
      <span class="dot on"></span>${e("map.connected")}
      <span class="dot off"></span>${e("map.notConnected")}
    </div>

    ${i.length||t.showAll?0===r.length?U`<div class="empty">
            ${e(l&&s?"map.noneInRadius":"map.noPosition")}
          </div>`:U`
            <hermes-map
              .hass=${t.hass}
              .nodes=${r}
              .owmKey=${t.settings?.openweather_api_key??""}
              .zoom=${t.settings?.map_zoom??10}
              .radiusKm=${t.radiusOn?t.radiusKm:0}
              .center=${o}
            ></hermes-map>
          `:U`<div class="empty">${e("map.noSelection")}</div>`}

    ${a.length?U`
          <div class="rows" style="margin-top:14px">
            ${a.map(t=>U`
                <div class="row">
                  <span class="k">
                    <span class="dot ${t.connected?"on":"off"}"></span>
                    ${t.name}
                  </span>
                  <span class="v">
                    ${null!==t.latitude&&null!==t.longitude?`${t.latitude.toFixed(5)}, ${t.longitude.toFixed(5)}`:e("map.waiting")}
                  </span>
                </div>
              `)}
          </div>
        `:""}
  `}Ot.styles=[a('\n/* required styles */\n\n.leaflet-pane,\n.leaflet-tile,\n.leaflet-marker-icon,\n.leaflet-marker-shadow,\n.leaflet-tile-container,\n.leaflet-pane > svg,\n.leaflet-pane > canvas,\n.leaflet-zoom-box,\n.leaflet-image-layer,\n.leaflet-layer {\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\t}\n.leaflet-container {\n\toverflow: hidden;\n\t}\n.leaflet-tile,\n.leaflet-marker-icon,\n.leaflet-marker-shadow {\n\t-webkit-user-select: none;\n\t   -moz-user-select: none;\n\t        user-select: none;\n\t  -webkit-user-drag: none;\n\t}\n/* Prevents IE11 from highlighting tiles in blue */\n.leaflet-tile::selection {\n\tbackground: transparent;\n}\n/* Safari renders non-retina tile on retina better with this, but Chrome is worse */\n.leaflet-safari .leaflet-tile {\n\timage-rendering: -webkit-optimize-contrast;\n\t}\n/* hack that prevents hw layers "stretching" when loading new tiles */\n.leaflet-safari .leaflet-tile-container {\n\twidth: 1600px;\n\theight: 1600px;\n\t-webkit-transform-origin: 0 0;\n\t}\n.leaflet-marker-icon,\n.leaflet-marker-shadow {\n\tdisplay: block;\n\t}\n/* .leaflet-container svg: reset svg max-width decleration shipped in Joomla! (joomla.org) 3.x */\n/* .leaflet-container img: map is broken in FF if you have max-width: 100% on tiles */\n.leaflet-container .leaflet-overlay-pane svg {\n\tmax-width: none !important;\n\tmax-height: none !important;\n\t}\n.leaflet-container .leaflet-marker-pane img,\n.leaflet-container .leaflet-shadow-pane img,\n.leaflet-container .leaflet-tile-pane img,\n.leaflet-container img.leaflet-image-layer,\n.leaflet-container .leaflet-tile {\n\tmax-width: none !important;\n\tmax-height: none !important;\n\twidth: auto;\n\tpadding: 0;\n\t}\n\n.leaflet-container img.leaflet-tile {\n\t/* See: https://bugs.chromium.org/p/chromium/issues/detail?id=600120 */\n\tmix-blend-mode: plus-lighter;\n}\n\n.leaflet-container.leaflet-touch-zoom {\n\t-ms-touch-action: pan-x pan-y;\n\ttouch-action: pan-x pan-y;\n\t}\n.leaflet-container.leaflet-touch-drag {\n\t-ms-touch-action: pinch-zoom;\n\t/* Fallback for FF which doesn\'t support pinch-zoom */\n\ttouch-action: none;\n\ttouch-action: pinch-zoom;\n}\n.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {\n\t-ms-touch-action: none;\n\ttouch-action: none;\n}\n.leaflet-container {\n\t-webkit-tap-highlight-color: transparent;\n}\n.leaflet-container a {\n\t-webkit-tap-highlight-color: rgba(51, 181, 229, 0.4);\n}\n.leaflet-tile {\n\tfilter: inherit;\n\tvisibility: hidden;\n\t}\n.leaflet-tile-loaded {\n\tvisibility: inherit;\n\t}\n.leaflet-zoom-box {\n\twidth: 0;\n\theight: 0;\n\t-moz-box-sizing: border-box;\n\t     box-sizing: border-box;\n\tz-index: 800;\n\t}\n/* workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=888319 */\n.leaflet-overlay-pane svg {\n\t-moz-user-select: none;\n\t}\n\n.leaflet-pane         { z-index: 400; }\n\n.leaflet-tile-pane    { z-index: 200; }\n.leaflet-overlay-pane { z-index: 400; }\n.leaflet-shadow-pane  { z-index: 500; }\n.leaflet-marker-pane  { z-index: 600; }\n.leaflet-tooltip-pane   { z-index: 650; }\n.leaflet-popup-pane   { z-index: 700; }\n\n.leaflet-map-pane canvas { z-index: 100; }\n.leaflet-map-pane svg    { z-index: 200; }\n\n.leaflet-vml-shape {\n\twidth: 1px;\n\theight: 1px;\n\t}\n.lvml {\n\tbehavior: none;\n\tdisplay: inline-block;\n\tposition: absolute;\n\t}\n\n\n/* control positioning */\n\n.leaflet-control {\n\tposition: relative;\n\tz-index: 800;\n\tpointer-events: visiblePainted; /* IE 9-10 doesn\'t have auto */\n\tpointer-events: auto;\n\t}\n.leaflet-top,\n.leaflet-bottom {\n\tposition: absolute;\n\tz-index: 1000;\n\tpointer-events: none;\n\t}\n.leaflet-top {\n\ttop: 0;\n\t}\n.leaflet-right {\n\tright: 0;\n\t}\n.leaflet-bottom {\n\tbottom: 0;\n\t}\n.leaflet-left {\n\tleft: 0;\n\t}\n.leaflet-control {\n\tfloat: left;\n\tclear: both;\n\t}\n.leaflet-right .leaflet-control {\n\tfloat: right;\n\t}\n.leaflet-top .leaflet-control {\n\tmargin-top: 10px;\n\t}\n.leaflet-bottom .leaflet-control {\n\tmargin-bottom: 10px;\n\t}\n.leaflet-left .leaflet-control {\n\tmargin-left: 10px;\n\t}\n.leaflet-right .leaflet-control {\n\tmargin-right: 10px;\n\t}\n\n\n/* zoom and fade animations */\n\n.leaflet-fade-anim .leaflet-popup {\n\topacity: 0;\n\t-webkit-transition: opacity 0.2s linear;\n\t   -moz-transition: opacity 0.2s linear;\n\t        transition: opacity 0.2s linear;\n\t}\n.leaflet-fade-anim .leaflet-map-pane .leaflet-popup {\n\topacity: 1;\n\t}\n.leaflet-zoom-animated {\n\t-webkit-transform-origin: 0 0;\n\t    -ms-transform-origin: 0 0;\n\t        transform-origin: 0 0;\n\t}\nsvg.leaflet-zoom-animated {\n\twill-change: transform;\n}\n\n.leaflet-zoom-anim .leaflet-zoom-animated {\n\t-webkit-transition: -webkit-transform 0.25s cubic-bezier(0,0,0.25,1);\n\t   -moz-transition:    -moz-transform 0.25s cubic-bezier(0,0,0.25,1);\n\t        transition:         transform 0.25s cubic-bezier(0,0,0.25,1);\n\t}\n.leaflet-zoom-anim .leaflet-tile,\n.leaflet-pan-anim .leaflet-tile {\n\t-webkit-transition: none;\n\t   -moz-transition: none;\n\t        transition: none;\n\t}\n\n.leaflet-zoom-anim .leaflet-zoom-hide {\n\tvisibility: hidden;\n\t}\n\n\n/* cursors */\n\n.leaflet-interactive {\n\tcursor: pointer;\n\t}\n.leaflet-grab {\n\tcursor: -webkit-grab;\n\tcursor:    -moz-grab;\n\tcursor:         grab;\n\t}\n.leaflet-crosshair,\n.leaflet-crosshair .leaflet-interactive {\n\tcursor: crosshair;\n\t}\n.leaflet-popup-pane,\n.leaflet-control {\n\tcursor: auto;\n\t}\n.leaflet-dragging .leaflet-grab,\n.leaflet-dragging .leaflet-grab .leaflet-interactive,\n.leaflet-dragging .leaflet-marker-draggable {\n\tcursor: move;\n\tcursor: -webkit-grabbing;\n\tcursor:    -moz-grabbing;\n\tcursor:         grabbing;\n\t}\n\n/* marker & overlays interactivity */\n.leaflet-marker-icon,\n.leaflet-marker-shadow,\n.leaflet-image-layer,\n.leaflet-pane > svg path,\n.leaflet-tile-container {\n\tpointer-events: none;\n\t}\n\n.leaflet-marker-icon.leaflet-interactive,\n.leaflet-image-layer.leaflet-interactive,\n.leaflet-pane > svg path.leaflet-interactive,\nsvg.leaflet-image-layer.leaflet-interactive path {\n\tpointer-events: visiblePainted; /* IE 9-10 doesn\'t have auto */\n\tpointer-events: auto;\n\t}\n\n/* visual tweaks */\n\n.leaflet-container {\n\tbackground: #ddd;\n\toutline-offset: 1px;\n\t}\n.leaflet-container a {\n\tcolor: #0078A8;\n\t}\n.leaflet-zoom-box {\n\tborder: 2px dotted #38f;\n\tbackground: rgba(255,255,255,0.5);\n\t}\n\n\n/* general typography */\n.leaflet-container {\n\tfont-family: "Helvetica Neue", Arial, Helvetica, sans-serif;\n\tfont-size: 12px;\n\tfont-size: 0.75rem;\n\tline-height: 1.5;\n\t}\n\n\n/* general toolbar styles */\n\n.leaflet-bar {\n\tbox-shadow: 0 1px 5px rgba(0,0,0,0.65);\n\tborder-radius: 4px;\n\t}\n.leaflet-bar a {\n\tbackground-color: #fff;\n\tborder-bottom: 1px solid #ccc;\n\twidth: 26px;\n\theight: 26px;\n\tline-height: 26px;\n\tdisplay: block;\n\ttext-align: center;\n\ttext-decoration: none;\n\tcolor: black;\n\t}\n.leaflet-bar a,\n.leaflet-control-layers-toggle {\n\tbackground-position: 50% 50%;\n\tbackground-repeat: no-repeat;\n\tdisplay: block;\n\t}\n.leaflet-bar a:hover,\n.leaflet-bar a:focus {\n\tbackground-color: #f4f4f4;\n\t}\n.leaflet-bar a:first-child {\n\tborder-top-left-radius: 4px;\n\tborder-top-right-radius: 4px;\n\t}\n.leaflet-bar a:last-child {\n\tborder-bottom-left-radius: 4px;\n\tborder-bottom-right-radius: 4px;\n\tborder-bottom: none;\n\t}\n.leaflet-bar a.leaflet-disabled {\n\tcursor: default;\n\tbackground-color: #f4f4f4;\n\tcolor: #bbb;\n\t}\n\n.leaflet-touch .leaflet-bar a {\n\twidth: 30px;\n\theight: 30px;\n\tline-height: 30px;\n\t}\n.leaflet-touch .leaflet-bar a:first-child {\n\tborder-top-left-radius: 2px;\n\tborder-top-right-radius: 2px;\n\t}\n.leaflet-touch .leaflet-bar a:last-child {\n\tborder-bottom-left-radius: 2px;\n\tborder-bottom-right-radius: 2px;\n\t}\n\n/* zoom control */\n\n.leaflet-control-zoom-in,\n.leaflet-control-zoom-out {\n\tfont: bold 18px \'Lucida Console\', Monaco, monospace;\n\ttext-indent: 1px;\n\t}\n\n.leaflet-touch .leaflet-control-zoom-in, .leaflet-touch .leaflet-control-zoom-out  {\n\tfont-size: 22px;\n\t}\n\n\n/* layers control */\n\n.leaflet-control-layers {\n\tbox-shadow: 0 1px 5px rgba(0,0,0,0.4);\n\tbackground: #fff;\n\tborder-radius: 5px;\n\t}\n.leaflet-control-layers-toggle {\n\tbackground-image: none;\n\twidth: 36px;\n\theight: 36px;\n\t}\n.leaflet-retina .leaflet-control-layers-toggle {\n\tbackground-image: none;\n\tbackground-size: 26px 26px;\n\t}\n.leaflet-touch .leaflet-control-layers-toggle {\n\twidth: 44px;\n\theight: 44px;\n\t}\n.leaflet-control-layers .leaflet-control-layers-list,\n.leaflet-control-layers-expanded .leaflet-control-layers-toggle {\n\tdisplay: none;\n\t}\n.leaflet-control-layers-expanded .leaflet-control-layers-list {\n\tdisplay: block;\n\tposition: relative;\n\t}\n.leaflet-control-layers-expanded {\n\tpadding: 6px 10px 6px 6px;\n\tcolor: #333;\n\tbackground: #fff;\n\t}\n.leaflet-control-layers-scrollbar {\n\toverflow-y: scroll;\n\toverflow-x: hidden;\n\tpadding-right: 5px;\n\t}\n.leaflet-control-layers-selector {\n\tmargin-top: 2px;\n\tposition: relative;\n\ttop: 1px;\n\t}\n.leaflet-control-layers label {\n\tdisplay: block;\n\tfont-size: 13px;\n\tfont-size: 1.08333em;\n\t}\n.leaflet-control-layers-separator {\n\theight: 0;\n\tborder-top: 1px solid #ddd;\n\tmargin: 5px -10px 5px -6px;\n\t}\n\n/* Default icon URLs */\n.leaflet-default-icon-path { /* used only in path-guessing heuristic, see L.Icon.Default */\n\tbackground-image: none;\n\t}\n\n\n/* attribution and scale controls */\n\n.leaflet-container .leaflet-control-attribution {\n\tbackground: #fff;\n\tbackground: rgba(255, 255, 255, 0.8);\n\tmargin: 0;\n\t}\n.leaflet-control-attribution,\n.leaflet-control-scale-line {\n\tpadding: 0 5px;\n\tcolor: #333;\n\tline-height: 1.4;\n\t}\n.leaflet-control-attribution a {\n\ttext-decoration: none;\n\t}\n.leaflet-control-attribution a:hover,\n.leaflet-control-attribution a:focus {\n\ttext-decoration: underline;\n\t}\n.leaflet-attribution-flag {\n\tdisplay: inline !important;\n\tvertical-align: baseline !important;\n\twidth: 1em;\n\theight: 0.6669em;\n\t}\n.leaflet-left .leaflet-control-scale {\n\tmargin-left: 5px;\n\t}\n.leaflet-bottom .leaflet-control-scale {\n\tmargin-bottom: 5px;\n\t}\n.leaflet-control-scale-line {\n\tborder: 2px solid #777;\n\tborder-top: none;\n\tline-height: 1.1;\n\tpadding: 2px 5px 1px;\n\twhite-space: nowrap;\n\t-moz-box-sizing: border-box;\n\t     box-sizing: border-box;\n\tbackground: rgba(255, 255, 255, 0.8);\n\ttext-shadow: 1px 1px #fff;\n\t}\n.leaflet-control-scale-line:not(:first-child) {\n\tborder-top: 2px solid #777;\n\tborder-bottom: none;\n\tmargin-top: -2px;\n\t}\n.leaflet-control-scale-line:not(:first-child):not(:last-child) {\n\tborder-bottom: 2px solid #777;\n\t}\n\n.leaflet-touch .leaflet-control-attribution,\n.leaflet-touch .leaflet-control-layers,\n.leaflet-touch .leaflet-bar {\n\tbox-shadow: none;\n\t}\n.leaflet-touch .leaflet-control-layers,\n.leaflet-touch .leaflet-bar {\n\tborder: 2px solid rgba(0,0,0,0.2);\n\tbackground-clip: padding-box;\n\t}\n\n\n/* popup */\n\n.leaflet-popup {\n\tposition: absolute;\n\ttext-align: center;\n\tmargin-bottom: 20px;\n\t}\n.leaflet-popup-content-wrapper {\n\tpadding: 1px;\n\ttext-align: left;\n\tborder-radius: 12px;\n\t}\n.leaflet-popup-content {\n\tmargin: 13px 24px 13px 20px;\n\tline-height: 1.3;\n\tfont-size: 13px;\n\tfont-size: 1.08333em;\n\tmin-height: 1px;\n\t}\n.leaflet-popup-content p {\n\tmargin: 17px 0;\n\tmargin: 1.3em 0;\n\t}\n.leaflet-popup-tip-container {\n\twidth: 40px;\n\theight: 20px;\n\tposition: absolute;\n\tleft: 50%;\n\tmargin-top: -1px;\n\tmargin-left: -20px;\n\toverflow: hidden;\n\tpointer-events: none;\n\t}\n.leaflet-popup-tip {\n\twidth: 17px;\n\theight: 17px;\n\tpadding: 1px;\n\n\tmargin: -10px auto 0;\n\tpointer-events: auto;\n\n\t-webkit-transform: rotate(45deg);\n\t   -moz-transform: rotate(45deg);\n\t    -ms-transform: rotate(45deg);\n\t        transform: rotate(45deg);\n\t}\n.leaflet-popup-content-wrapper,\n.leaflet-popup-tip {\n\tbackground: white;\n\tcolor: #333;\n\tbox-shadow: 0 3px 14px rgba(0,0,0,0.4);\n\t}\n.leaflet-container a.leaflet-popup-close-button {\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\tborder: none;\n\ttext-align: center;\n\twidth: 24px;\n\theight: 24px;\n\tfont: 16px/24px Tahoma, Verdana, sans-serif;\n\tcolor: #757575;\n\ttext-decoration: none;\n\tbackground: transparent;\n\t}\n.leaflet-container a.leaflet-popup-close-button:hover,\n.leaflet-container a.leaflet-popup-close-button:focus {\n\tcolor: #585858;\n\t}\n.leaflet-popup-scrolled {\n\toverflow: auto;\n\t}\n\n.leaflet-oldie .leaflet-popup-content-wrapper {\n\t-ms-zoom: 1;\n\t}\n.leaflet-oldie .leaflet-popup-tip {\n\twidth: 24px;\n\tmargin: 0 auto;\n\n\t-ms-filter: "progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)";\n\tfilter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678);\n\t}\n\n.leaflet-oldie .leaflet-control-zoom,\n.leaflet-oldie .leaflet-control-layers,\n.leaflet-oldie .leaflet-popup-content-wrapper,\n.leaflet-oldie .leaflet-popup-tip {\n\tborder: 1px solid #999;\n\t}\n\n\n/* div icon */\n\n.leaflet-div-icon {\n\tbackground: #fff;\n\tborder: 1px solid #666;\n\t}\n\n\n/* Tooltip */\n/* Base styles for the element that has a tooltip */\n.leaflet-tooltip {\n\tposition: absolute;\n\tpadding: 6px;\n\tbackground-color: #fff;\n\tborder: 1px solid #fff;\n\tborder-radius: 3px;\n\tcolor: #222;\n\twhite-space: nowrap;\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n\tpointer-events: none;\n\tbox-shadow: 0 1px 3px rgba(0,0,0,0.4);\n\t}\n.leaflet-tooltip.leaflet-interactive {\n\tcursor: pointer;\n\tpointer-events: auto;\n\t}\n.leaflet-tooltip-top:before,\n.leaflet-tooltip-bottom:before,\n.leaflet-tooltip-left:before,\n.leaflet-tooltip-right:before {\n\tposition: absolute;\n\tpointer-events: none;\n\tborder: 6px solid transparent;\n\tbackground: transparent;\n\tcontent: "";\n\t}\n\n/* Directions */\n\n.leaflet-tooltip-bottom {\n\tmargin-top: 6px;\n}\n.leaflet-tooltip-top {\n\tmargin-top: -6px;\n}\n.leaflet-tooltip-bottom:before,\n.leaflet-tooltip-top:before {\n\tleft: 50%;\n\tmargin-left: -6px;\n\t}\n.leaflet-tooltip-top:before {\n\tbottom: 0;\n\tmargin-bottom: -12px;\n\tborder-top-color: #fff;\n\t}\n.leaflet-tooltip-bottom:before {\n\ttop: 0;\n\tmargin-top: -12px;\n\tmargin-left: -6px;\n\tborder-bottom-color: #fff;\n\t}\n.leaflet-tooltip-left {\n\tmargin-left: -6px;\n}\n.leaflet-tooltip-right {\n\tmargin-left: 6px;\n}\n.leaflet-tooltip-left:before,\n.leaflet-tooltip-right:before {\n\ttop: 50%;\n\tmargin-top: -6px;\n\t}\n.leaflet-tooltip-left:before {\n\tright: 0;\n\tmargin-right: -12px;\n\tborder-left-color: #fff;\n\t}\n.leaflet-tooltip-right:before {\n\tleft: 0;\n\tmargin-left: -12px;\n\tborder-right-color: #fff;\n\t}\n\n/* Printing */\n\n@media print {\n\t/* Prevent printers from removing background-images of controls. */\n\t.leaflet-control {\n\t\t-webkit-print-color-adjust: exact;\n\t\tprint-color-adjust: exact;\n\t\t}\n\t}\n'),r`
      :host {
        display: block;
      }
      #map {
        height: 420px;
        border-radius: var(--r-md, 10px);
        border: 1px solid var(--border);
        overflow: hidden;
        background: var(--bg-sunken);
      }
      .toolbar {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 10px;
      }
      .lchip {
        padding: 4px 11px;
        border-radius: 999px;
        font-size: 0.72rem;
        font-weight: 700;
        cursor: pointer;
        background: var(--bg-sunken);
        border: 1px solid var(--border);
        color: var(--text-soft);
        font-family: inherit;
      }
      .lchip[data-on="1"] {
        background: var(--accent-soft);
        border-color: var(--accent);
        color: var(--accent-ink);
      }
      .pin {
        background: none;
        border: none;
      }
      .pin div {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid #1b1b1b;
      }
      .pin div.on {
        background: #2ecc71;
        box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.35);
      }
      .pin div.off {
        background: #ffd60a;
        box-shadow: 0 0 0 3px rgba(255, 214, 10, 0.35);
      }
    `],t([mt({attribute:!1})],Ot.prototype,"hass",void 0),t([mt({attribute:!1})],Ot.prototype,"nodes",void 0),t([mt()],Ot.prototype,"owmKey",void 0),t([mt({type:Number})],Ot.prototype,"zoom",void 0),t([mt({type:Number})],Ot.prototype,"radiusKm",void 0),t([mt({attribute:!1})],Ot.prototype,"center",void 0),t([_t()],Ot.prototype,"_owmLayer",void 0),Ot=t([dt("hermes-map")],Ot);let Zt=class extends ht{constructor(){super(...arguments),this.value="",this.placeholder="",this.domains=[],this._query="",this._open=!1,this._active=0}_label(t){return this.hass?.states[t]?.attributes?.friendly_name||t}_matches(){if(!this.hass)return[];const t=this._query.trim().toLowerCase(),e=this.domains?.length?new Set(this.domains):null,i=Object.keys(this.hass.states).filter(t=>!e||e.has(t.split(".")[0]));return t?i.filter(e=>e.toLowerCase().includes(t)||this._label(e).toLowerCase().includes(t)).sort().slice(0,60):i.slice(0,60).sort()}_commit(t){this.value=t,this._query="",this._open=!1,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t},bubbles:!0,composed:!0}))}_onKeyDown(t){const e=this._matches();"ArrowDown"===t.key?(t.preventDefault(),this._open=!0,this._active=Math.min(this._active+1,e.length-1)):"ArrowUp"===t.key?(t.preventDefault(),this._active=Math.max(this._active-1,0)):"Enter"===t.key?this._open&&e[this._active]&&(t.preventDefault(),this._commit(e[this._active])):"Escape"===t.key&&(this._open=!1)}render(){const t=this._matches(),e=this._open?this._query:this.value;return U`
      <input
        .value=${e}
        placeholder=${this.placeholder}
        @focus=${()=>{this._open=!0,this._query="",this._active=0}}
        @input=${t=>{this._query=t.target.value,this._open=!0,this._active=0}}
        @keydown=${this._onKeyDown}
        @blur=${()=>window.setTimeout(()=>this._open=!1,150)}
      />
      ${this._open?U`
            <div class="list">
              ${t.length?t.map((t,e)=>U`
                      <div
                        class="opt"
                        data-active=${e===this._active?"1":"0"}
                        @mousedown=${e=>{e.preventDefault(),this._commit(t)}}
                      >
                        <span class="name">${this._label(t)}</span>
                        <span class="id">${t}</span>
                      </div>
                    `):U`<div class="none">${this._query}</div>`}
            </div>
          `:""}
    `}};Zt.styles=r`
    :host {
      display: block;
      position: relative;
    }
    .list {
      position: absolute;
      z-index: 20;
      left: 0;
      right: 0;
      max-height: 240px;
      overflow-y: auto;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--r-sm, 6px);
      box-shadow: var(--shadow-md);
      margin-top: 2px;
    }
    .opt {
      display: flex;
      flex-direction: column;
      gap: 1px;
      padding: 7px 10px;
      cursor: pointer;
      border-bottom: 1px solid var(--border);
    }
    .opt:last-child {
      border-bottom: none;
    }
    .opt:hover,
    .opt[data-active="1"] {
      /* Follow the Home Assistant theme rather than painting our yellow here.
       * A light yellow fill sat under the theme's white text on dark themes and
       * was unreadable, and prefers-color-scheme is not enough because a HA
       * dashboard can be dark while the OS is light. Theme background, theme
       * text, and the accent only as an edge marker: legible either way. */
      background: var(--bg-soft, rgba(127, 127, 127, 0.14));
      color: var(--text);
      box-shadow: inset 3px 0 0 var(--accent, #ffd60a);
    }
    .opt .name {
      font-size: 0.84rem;
      font-weight: 600;
    }
    .opt .id {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: var(--text-muted);
    }
    .none {
      padding: 10px;
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    input {
      font-family: inherit;
      font-size: 0.86rem;
      color: var(--text);
      background: var(--bg-sunken);
      border: 1px solid var(--border);
      border-radius: var(--r-sm, 6px);
      padding: 8px 10px;
      width: 100%;
      box-sizing: border-box;
    }
    input:focus {
      outline: 2px solid var(--accent);
      outline-offset: -1px;
    }
  `,t([mt({attribute:!1})],Zt.prototype,"hass",void 0),t([mt()],Zt.prototype,"value",void 0),t([mt()],Zt.prototype,"placeholder",void 0),t([mt({attribute:!1})],Zt.prototype,"domains",void 0),t([_t()],Zt.prototype,"_query",void 0),t([_t()],Zt.prototype,"_open",void 0),t([_t()],Zt.prototype,"_active",void 0),Zt=t([dt("hermes-entity-picker")],Zt);const Nt=[{id:"turn_on",label:"Turn on",service:"homeassistant.turn_on"},{id:"turn_off",label:"Turn off",service:"homeassistant.turn_off"},{id:"toggle",label:"Toggle",service:"homeassistant.toggle"}];let Bt={light:[{id:"turn_on",label:"Turn on",service:"light.turn_on"},{id:"turn_on_brightness",label:"Turn on at brightness",service:"light.turn_on",value:{key:"brightness_pct",type:"number",unit:"%",min:1,max:100,step:1,default:80}},{id:"turn_off",label:"Turn off",service:"light.turn_off"},{id:"toggle",label:"Toggle",service:"light.toggle"}],switch:Nt,climate:[{id:"set_temperature",label:"Set temperature",service:"climate.set_temperature",value:{key:"temperature",type:"number",unit:"C",min:5,max:35,step:.5,default:21}},{id:"turn_on",label:"Turn on",service:"climate.turn_on"},{id:"turn_off",label:"Turn off",service:"climate.turn_off"}],cover:[{id:"open",label:"Open",service:"cover.open_cover"},{id:"close",label:"Close",service:"cover.close_cover"},{id:"stop",label:"Stop",service:"cover.stop_cover"},{id:"set_position",label:"Set position",service:"cover.set_cover_position",value:{key:"position",type:"number",unit:"%",min:0,max:100,step:5,default:100}}]},Dt={light:"light",switch:"switch",input_boolean:"switch",climate:"climate",cover:"cover"},Rt=Nt;const Ht={temperature:{min:"min_temp",max:"max_temp",step:"target_temp_step"},percentage:{step:"percentage_step"},value:{min:"min",max:"max",step:"step"}},jt={hvac_mode:"hvac_modes",preset_mode:"preset_modes",fan_mode:"fan_modes",swing_mode:"swing_modes",operation_mode:"operation_list",source:"source_list"};function Ft(t,e,i){const n=t.states[e]?.attributes??{},o={...i},s=Ht[i.key]??{};for(const t of["min","max","step"]){const e=s[t],i=e?n[e]:void 0;"number"==typeof i&&(o[t]=i)}const a=jt[i.key],r=a?n[a]:void 0;return Array.isArray(r)&&r.length&&(o.options=r.map(String),void 0!==o.default&&o.options.includes(String(o.default))||(o.default=o.options[0])),"number"==typeof o.default&&("number"==typeof o.min&&o.default<o.min&&(o.default=o.min),"number"==typeof o.max&&o.default>o.max&&(o.default=o.max)),o}const Wt=new Set(["friendly_name","icon","supported_features","device_class","entity_picture","attribution","supported_color_modes","hs_color","rgb_color","xy_color"]);function Ut(t,e){if(t.loadError)return U`
      <div class="empty">
        <div>${e("common.loadError")}</div>
        <div class="sub-error">${t.loadError}</div>
      </div>
    `;if(!t.entries.length)return U`<div class="empty">${e("common.noEntries")}</div>`;const i=t.entries.find(e=>e.entry_id===t.selectedEntry)??t.entries[0];return U`
    <h2 class="screen-title">${e("messages.title")}</h2>

    ${t.entries.length>1?U`
          <div class="field">
            <label>${e("messages.gateway")}</label>
            <select
              @change=${e=>t.onSelectEntry(e.target.value)}
            >
              ${t.entries.map(t=>U`
                  <option
                    value=${t.entry_id}
                    ?selected=${t.entry_id===i.entry_id}
                  >
                    ${t.title}
                  </option>
                `)}
            </select>
          </div>
        `:""}

    ${t.editing?function(t,e,i){const n=e=>i=>t.onDraftInput(e,i.target.value);return U`
    <div class="panel">
      <div class="field">
        <label>${i("messages.keyword")}</label>
        <input .value=${e.keyword??""} @input=${n("keyword")} />
        <span class="hint">${i("messages.keywordHint")}</span>
      </div>

      <div class="field">
        <label>${i("messages.matchType")}</label>
        <select @change=${n("match_type")}>
          <option value="exact" ?selected=${"exact"===e.match_type}>
            ${i("messages.exact")}
          </option>
          <option value="startswith" ?selected=${"startswith"===e.match_type}>
            ${i("messages.startswith")}
          </option>
        </select>
        <span class="hint">${i("messages.matchHint")}</span>
      </div>

      ${function(t,e){const i=t.paletteEntity;return U`
    <div class="palette">
      <div class="field">
        <label>${e("messages.paletteEntity")}</label>
        <hermes-entity-picker
          .hass=${t.hass}
          .value=${i}
          placeholder="light.kitchen"
          @value-changed=${e=>t.onPaletteEntity(e.detail.value)}
        ></hermes-entity-picker>
        <span class="hint">${e("messages.paletteHint")}</span>
      </div>

      ${i&&t.hass.states[i]?U`
            <div class="section-title">${e("messages.groupRead")}</div>
            <div class="chips">
              <button
                class="chip read"
                @click=${()=>t.onInsert(function(t){return`{state:${t}}`}(i))}
              >
                ${e("messages.readState")}
              </button>
              ${function(t,e){const i=t.states[e];return i?.attributes?Object.entries(i.attributes).filter(([t,e])=>!Wt.has(t)&&("string"==typeof e||"number"==typeof e||"boolean"==typeof e)).map(([t])=>t).sort():[]}(t.hass,i).map(e=>U`
                  <button
                    class="chip read"
                    @click=${()=>t.onInsert(function(t,e){return`{attr:${t}:${e}}`}(i,e))}
                  >
                    ${e}
                  </button>
                `)}
            </div>

            <div class="section-title">${e("messages.groupDo")}</div>
            <div class="chips">
              ${function(t){const e=Dt[function(t){return t.split(".")[0]??""}(t)];return e&&Bt[e]||Rt}(i).map(e=>U`
                  <span class="chip-group">
                    <button
                      class="chip do"
                      @click=${()=>t.onInsert(function(t,e,i){return t.value&&void 0!==i&&""!==i?`{do:${t.service}:${e}:${t.value.key}=${i}}`:`{do:${t.service}:${e}}`}(e,i,t.paletteValues[e.id]??(e.value?Ft(t.hass,i,e.value).default:void 0)))}
                    >
                      ${e.label}
                    </button>
                    ${function(t,e,i){if(!e.value)return"";const n=Ft(t.hass,i,e.value),o=t.paletteValues[e.id]??n.default??"";if("enum"===n.type)return U`
      <select
        class="inline"
        @change=${i=>t.onPaletteValue(e.id,i.target.value)}
      >
        ${(n.options??[]).map(t=>U`
            <option value=${t} ?selected=${t===o}>
              ${t}
            </option>
          `)}
      </select>
    `;const s=function(t){if("enum"===t.type)return"";if("number"!=typeof t.min||"number"!=typeof t.max)return"";const e=t.unit?` ${t.unit}`:"";return`${t.min} to ${t.max}${e}`}(n);return U`
    <input
      class="inline"
      type="number"
      min=${n.min??0}
      max=${n.max??100}
      step=${n.step??1}
      .value=${String(o)}
      @input=${i=>t.onPaletteValue(e.id,Number(i.target.value))}
    />
    ${s?U`<span class="unit">${s}</span>`:""}
  `}(t,e,i)}
                  </span>
                `)}
            </div>
          `:U`<div class="hint">${e("messages.pickEntityFirst")}</div>`}
    </div>
  `}(t,i)}

      <div class="field">
        <label>${i("messages.replyTemplate")}</label>
        <textarea
          id="hermes-template"
          .value=${e.reply_template??""}
          @input=${n("reply_template")}
        ></textarea>
        <span class="hint">${i("messages.templateHint")}</span>
      </div>

      <div class="field">
        <label>${i("messages.replyTo")}</label>
        <select @change=${n("reply_to")}>
          <option value="channel" ?selected=${"channel"===e.reply_to}>
            ${i("messages.onChannel")}
          </option>
          <option value="sender_dm" ?selected=${"sender_dm"===e.reply_to}>
            ${i("messages.senderDm")}
          </option>
        </select>
      </div>

      <button class="btn link" @click=${t.onToggleAdvanced}>
        ${t.showAdvanced?i("messages.hideAdvanced"):i("messages.advanced")}
      </button>

      ${t.showAdvanced?U`
            <div class="field" style="margin-top:10px">
              <label>${i("messages.service")}</label>
              <input
                .value=${e.service??""}
                placeholder="light.turn_off"
                @input=${n("service")}
              />
              <span class="hint">${i("messages.serviceHint")}</span>
            </div>
            <div class="field">
              <label>${i("messages.target")}</label>
              <hermes-entity-picker
                .hass=${t.hass}
                .value=${e.target?.entity_id??""}
                placeholder="light.kitchen"
                @value-changed=${e=>{const i=e.detail.value;t.onDraftInput("target",i?{entity_id:i}:void 0)}}
              ></hermes-entity-picker>
            </div>
          `:""}

      <div class="actions">
        <button class="btn primary" @click=${t.onSave}>
          ${i("common.save")}
        </button>
        <button class="btn" @click=${t.onCancel}>${i("common.cancel")}</button>
      </div>
    </div>
  `}(t,t.editing,e):U`
          ${i.commands.length?i.commands.map(i=>function(t,e,i){const n=e.service||e.reply_template||"";return U`
    <div class="list-row">
      <div class="meta">
        <span class="kw">${e.keyword}</span>
        <span class="sub">${n}</span>
      </div>
      <div class="actions" style="margin:0">
        <button class="btn" @click=${()=>t.onEdit(e)}>
          ${i("common.edit")}
        </button>
        <button class="btn danger" @click=${()=>t.onDelete(e)}>
          ${i("common.delete")}
        </button>
      </div>
    </div>
  `}(t,i,e)):U`<div class="empty">${e("messages.empty")}</div>`}
          <div class="actions">
            <button class="btn primary" @click=${t.onNew}>
              ${e("messages.add")}
            </button>
          </div>

          ${function(t,e,i){if(t.editingPreset){const e=t.editingPreset;return U`
      <div class="section" style="margin-top:22px">
        <div class="section-title">${i("presets.title")}</div>
        <div class="panel">
          <div class="field">
            <label>${i("presets.label")}</label>
            <input
              .value=${e.label??""}
              @input=${e=>t.onPresetInput("label",e.target.value)}
            />
          </div>
          <div class="field">
            <label>${i("presets.text")}</label>
            <textarea
              .value=${e.text??""}
              @input=${e=>t.onPresetInput("text",e.target.value)}
            ></textarea>
          </div>
          <div class="field">
            <label>${i("presets.node")}</label>
            <input
              type="number"
              .value=${e.node_id?String(e.node_id):""}
              @input=${e=>{const i=e.target.value.trim();t.onPresetInput("node_id",i?Number(i):null)}}
            />
            <span class="hint">${i("presets.nodeHint")}</span>
          </div>
          <div class="actions">
            <button class="btn primary" @click=${t.onPresetSave}>
              ${i("common.save")}
            </button>
            <button class="btn" @click=${t.onPresetCancel}>
              ${i("common.cancel")}
            </button>
          </div>
        </div>
      </div>
    `}return U`
    <div class="section" style="margin-top:22px">
      <div class="section-title">${i("presets.title")}</div>
      ${t.presets.length?t.presets.map(n=>U`
              <div class="list-row">
                <div class="meta">
                  <span class="kw">${n.label||n.text}</span>
                  <span class="sub">
                    ${n.node_id?`${i("presets.toNode")} ${n.node_id}`:i("presets.toChannel")}
                  </span>
                </div>
                <div class="actions" style="margin:0">
                  <button
                    class="btn primary"
                    @click=${()=>t.onPresetSend(n)}
                    ?disabled=${!e}
                  >
                    ${i("presets.send")}
                  </button>
                  <button class="btn" @click=${()=>t.onPresetEdit(n)}>
                    ${i("common.edit")}
                  </button>
                  <button
                    class="btn danger"
                    @click=${()=>t.onPresetDelete(n)}
                  >
                    ${i("common.delete")}
                  </button>
                </div>
              </div>
            `):U`<div class="empty">${i("presets.empty")}</div>`}
      <div class="actions">
        <button class="btn" @click=${t.onPresetNew}>${i("presets.add")}</button>
      </div>
    </div>
  `}(t,i,e)}
        `}
  `}function Vt(t){return[...t.target.selectedOptions].map(t=>Number(t.value))}function qt(t,e){return t.map(t=>U`
      <option value=${t.node_num} ?selected=${e.includes(t.node_num)}>
        ${t.name} (${t.node_num})
      </option>
    `)}function Gt(t,e){const i=t.settings,n=e=>t.draftGlobal[e]??i?.[e];return U`
    <h2 class="screen-title">
      ${e("settings.title")}
      ${t.saved?U`<span class="toast">${e("common.saved")}</span>`:""}
    </h2>

    <div class="section">
      <div class="section-title">${e("settings.global")}</div>
      <div class="panel">
        <div class="field">
          <label for="owm">${e("settings.owmKey")}</label>
          <input
            id="owm"
            type="password"
            autocomplete="off"
            .value=${String(n("openweather_api_key")??"")}
            @input=${e=>t.onGlobalInput("openweather_api_key",e.target.value)}
          />
          <span class="hint">${e("settings.owmHint")}</span>
        </div>

        <div class="field">
          <label for="mapnodes">${e("settings.mapNodes")}</label>
          <select
            id="mapnodes"
            multiple
            @change=${e=>t.onGlobalInput("map_nodes",Vt(e))}
          >
            ${qt(t.nodes,n("map_nodes")??[])}
          </select>
        </div>

        <div class="actions">
          <button class="btn primary" @click=${t.onSaveGlobal}>
            ${e("common.save")}
          </button>
        </div>
      </div>
    </div>

    ${t.loadError?U`<div class="empty">
          <div>${e("common.loadError")}</div>
          <div class="sub-error">${t.loadError}</div>
        </div>`:0===t.entries.length?U`<div class="empty">${e("common.noEntries")}</div>`:t.entries.map(i=>function(t,e,i){const n=t.draftEntries[e.entry_id]??{},o=(t,e)=>n[t]??e;return U`
    <div class="section">
      <div class="section-title">${e.title}</div>
      <div class="panel">
        <div class="rows">
          <div class="row">
            <span class="k">${i("settings.gateway")}</span>
            <span class="v">${e.gateway_node_id??"-"}</span>
          </div>
          <div class="row">
            <span class="k">${i("settings.mode")}</span>
            <span class="v">${e.mode}</span>
          </div>
          ${null!==e.channel_index&&void 0!==e.channel_index?U`<div class="row">
                <span class="k">${i("settings.channel")}</span>
                <span class="v">${e.channel_index}</span>
              </div>`:""}
        </div>

        <div class="field" style="margin-top:12px">
          <label>${i("settings.initialDelay")}</label>
          <input
            type="number"
            min="0"
            max="60"
            step="1"
            .value=${String(o("initial_delay",e.initial_delay))}
            @input=${i=>t.onEntryInput(e.entry_id,"initial_delay",Number(i.target.value))}
          />
        </div>

        <div class="field">
          <label>${i("settings.partDelay")}</label>
          <input
            type="number"
            min="0"
            max="30"
            step="1"
            .value=${String(o("part_delay",e.part_delay))}
            @input=${i=>t.onEntryInput(e.entry_id,"part_delay",Number(i.target.value))}
          />
        </div>

        <div class="field">
          <label>${i("settings.authorizedNodes")}</label>
          <select
            multiple
            @change=${i=>t.onEntryInput(e.entry_id,"authorized_nodes",Vt(i))}
          >
            ${qt(t.nodes,o("authorized_nodes",e.authorized_nodes)??[])}
          </select>
        </div>

        <div class="actions">
          <button
            class="btn primary"
            @click=${()=>t.onSaveEntry(e.entry_id)}
          >
            ${i("common.save")}
          </button>
        </div>
      </div>
    </div>
  `}(t,i,e))}
  `}function Kt(t,e){if(!function(t){return wt(t,xt).length>0}(t))return U`<div class="empty">${e("status.noIntegration")}</div>`;const i=zt(t),n=Pt(t,"commands_executed"),o=Pt(t,"last_command"),s=Pt(t,"last_error"),a=t=>t&&"unknown"!==t&&"unavailable"!==t?t:e("status.none");return U`
    <h2 class="screen-title">${e("status.title")}</h2>
    <div class="grid">
      <div class="panel stat">
        <div class="label">${e("status.nodes")}</div>
        <div class="value">${i.length}</div>
      </div>
      <div class="panel stat">
        <div class="label">${e("status.executed")}</div>
        <div class="value">${n?n.state:"0"}</div>
      </div>
      <div class="panel stat">
        <div class="label">${e("status.lastCommand")}</div>
        <div class="value small">${a(o?.state)}</div>
      </div>
      <div class="panel stat">
        <div class="label">${e("status.lastError")}</div>
        <div class="value small">${a(s?.state)}</div>
      </div>
    </div>
  `}function Yt(t){return t.callWS({type:"hermes/presets/list"})}function Jt(t){return t.callWS({type:"hermes/history/list"})}const Xt=["status","log","devices","map","messages","homeassistant","settings"],Qt={keyword:"",match_type:"exact",service:"",reply_template:"",reply_to:"channel"};let te=class extends ht{constructor(){super(...arguments),this._tab="status",this._entries=[],this._nodes=[],this._settings=null,this._saved=!1,this._draftGlobal={},this._draftEntries={},this._selectedEntry=null,this._editing=null,this._loadError=null,this._paletteEntity="",this._paletteValues={},this._showAdvanced=!1,this._mapShowAll=!1,this._mapRadiusOn=!1,this._mapRadiusKm=25,this._presets=[],this._editingPreset=null,this._history=[],this._logFilter="",this._loaded=!1,this._onGlobalInput=(t,e)=>{this._draftGlobal={...this._draftGlobal,[t]:e}},this._onEntryInput=(t,e,i)=>{this._draftEntries={...this._draftEntries,[t]:{...this._draftEntries[t]??{},[e]:i}}},this._onSaveGlobal=async()=>{var t,e;this.hass&&Object.keys(this._draftGlobal).length&&(this._settings=await(t=this.hass,e=this._draftGlobal,t.callWS({type:"hermes/settings/update",patch:e})),this._draftGlobal={},this._flagSaved())},this._onSaveEntry=async t=>{const e=this._draftEntries[t];this.hass&&e&&Object.keys(e).length&&(await function(t,e,i){return t.callWS({type:"hermes/entry/update",entry_id:e,patch:i})}(this.hass,t,e),this._draftEntries={...this._draftEntries,[t]:{}},this._flagSaved(),await this._load())},this._onSelectEntry=t=>{this._selectedEntry=t,this._editing=null},this._onNew=()=>{this._editing={...Qt}},this._onEdit=t=>{this._editing={...t}},this._onDraftInput=(t,e)=>{this._editing&&(this._editing={...this._editing,[t]:e})},this._onCancel=()=>{this._editing=null},this._onPaletteEntity=t=>{this._paletteEntity=t},this._onPaletteValue=(t,e)=>{this._paletteValues={...this._paletteValues,[t]:e}},this._onToggleAdvanced=()=>{this._showAdvanced=!this._showAdvanced},this._onPresetNew=()=>{this._editingPreset={label:"",text:"",node_id:null}},this._onPresetEdit=t=>{this._editingPreset={...t}},this._onPresetInput=(t,e)=>{this._editingPreset&&(this._editingPreset={...this._editingPreset,[t]:e})},this._onPresetCancel=()=>{this._editingPreset=null},this._onPresetSave=async()=>{var t,e;this.hass&&this._editingPreset?.text&&(await(t=this.hass,e=this._editingPreset,t.callWS({type:"hermes/presets/save",preset:e})),this._editingPreset=null,this._presets=await Yt(this.hass),this._flagSaved())},this._onPresetDelete=async t=>{var e,i;this.hass&&t.id&&(await(e=this.hass,i=t.id,e.callWS({type:"hermes/presets/remove",preset_id:i})),this._presets=await Yt(this.hass))},this._onPresetSend=async t=>{const e=this._selectedEntry??this._entries[0]?.entry_id;this.hass&&e&&t.id&&(await function(t,e,i){return t.callWS({type:"hermes/presets/send",entry_id:e,preset_id:i})}(this.hass,e,t.id),this._flagSaved(),this._history=await Jt(this.hass))},this._onLogFilter=t=>{this._logFilter=t},this._onLogClear=async()=>{var t;this.hass&&(await(t=this.hass,t.callWS({type:"hermes/history/clear"})),this._history=[])},this._onToggleShowAll=()=>{this._mapShowAll=!this._mapShowAll},this._onToggleRadius=()=>{this._mapRadiusOn=!this._mapRadiusOn},this._onRadiusChange=t=>{this._mapRadiusKm=t},this._onInsert=t=>{if(!this._editing)return;const e=this.renderRoot.querySelector("#hermes-template"),i=this._editing.reply_template??"";if(!e)return void(this._editing={...this._editing,reply_template:i+t});const n=e.selectionStart??i.length,o=e.selectionEnd??i.length,s=i.slice(0,n)+t+i.slice(o);this._editing={...this._editing,reply_template:s},this.updateComplete.then(()=>{const e=this.renderRoot.querySelector("#hermes-template");if(e){const i=n+t.length;e.focus(),e.setSelectionRange(i,i)}})},this._onSaveCommand=async()=>{const t=this._selectedEntry;if(!this.hass||!t||!this._editing)return;const e=Boolean(this._editing.service)||Boolean(this._editing.reply_template);this._editing.keyword&&e&&(await function(t,e,i){return t.callWS({type:"hermes/commands/save",entry_id:e,command:i})}(this.hass,t,this._editing),this._editing=null,this._flagSaved(),await this._load())},this._onDeleteCommand=async t=>{const e=this._selectedEntry;this.hass&&e&&t.id&&(await function(t,e,i){return t.callWS({type:"hermes/commands/remove",entry_id:e,command_id:i})}(this.hass,e,t.id),this._flagSaved(),await this._load())}}setConfig(t){this._config=t,t?.tab&&Xt.includes(t.tab)&&(this._tab=t.tab)}getCardSize(){return 12}firstUpdated(){let t=this.parentElement;for(;t;){if("HUI-PANEL-VIEW"===t.tagName){this.setAttribute("panel-mode","");break}t=t.parentElement}}updated(){this.hass&&!this._loaded&&(this._loaded=!0,this._load())}async _load(t=0){if(this.hass){try{const t=await(e=this.hass,e.callWS({type:"hermes/entries/list"}));this._entries=t,this._loadError=null,!this._selectedEntry&&t.length&&(this._selectedEntry=t[0].entry_id)}catch(e){if(t<3)return void window.setTimeout(()=>{this._load(t+1)},500*(t+1));this._loadError=String(e?.message??e),console.error("Hermes: failed to load gateways",e)}var e,i;try{this._nodes=await function(t){return t.callWS({type:"hermes/nodes/list"})}(this.hass)}catch(t){console.error("Hermes: failed to load nodes",t)}try{i=await function(t){return t.callWS({type:"hermes/actions"})}(this.hass),i?.by_type&&(Bt=i.by_type),i?.domain_to_type&&(Dt=i.domain_to_type),i?.generic&&(Rt=i.generic)}catch(t){console.warn("Hermes: using the built-in action catalogue",t)}try{this._presets=await Yt(this.hass)}catch(t){console.error("Hermes: failed to load presets",t)}try{this._history=await Jt(this.hass)}catch(t){console.error("Hermes: failed to load the log",t)}try{this._settings=await function(t){return t.callWS({type:"hermes/settings/get"})}(this.hass)}catch{this._settings=null}}}_flagSaved(){this._saved=!0,window.setTimeout(()=>{this._saved=!1},2e3)}_select(t){this._tab=t}_screen(t){const e=this.hass;switch(this._tab){case"status":default:return Kt(e,t);case"log":return St({entries:this._history,filter:this._logFilter,onFilter:this._onLogFilter,onClear:this._onLogClear},t);case"devices":return function(t,e){const i=zt(t);return i.length?U`
    <h2 class="screen-title">${e("devices.title")}</h2>
    <div class="grid">
      ${i.map(t=>U`
          <div class="panel">
            <div class="node-head">
              <span class="node-name">${t.name}</span>
              <span class="node-num"
                >${t.nodeNum??e("devices.unknown")}</span
              >
            </div>
            <div class="rows">
              ${Object.entries(t.values).map(([t,e])=>U`
                  <div class="row">
                    <span class="k">${t}</span>
                    <span class="v">${function(t){const e=t.attributes?.unit_of_measurement;return e?`${t.state} ${e}`:t.state}(e)}</span>
                  </div>
                `)}
            </div>
          </div>
        `)}
    </div>
  `:U`<div class="empty">${e("devices.empty")}</div>`}(e,t);case"map":return It({hass:e,settings:this._settings,showAll:this._mapShowAll,radiusOn:this._mapRadiusOn,radiusKm:this._mapRadiusKm,onToggleShowAll:this._onToggleShowAll,onToggleRadius:this._onToggleRadius,onRadiusChange:this._onRadiusChange},t);case"messages":return Ut({hass:e,entries:this._entries,selectedEntry:this._selectedEntry,editing:this._editing,loadError:this._loadError,paletteEntity:this._paletteEntity,paletteValues:this._paletteValues,showAdvanced:this._showAdvanced,onSelectEntry:this._onSelectEntry,onNew:this._onNew,onEdit:this._onEdit,onDelete:this._onDeleteCommand,onDraftInput:this._onDraftInput,onPaletteEntity:this._onPaletteEntity,onPaletteValue:this._onPaletteValue,onInsert:this._onInsert,onToggleAdvanced:this._onToggleAdvanced,onSave:this._onSaveCommand,onCancel:this._onCancel,presets:this._presets,editingPreset:this._editingPreset,onPresetNew:this._onPresetNew,onPresetEdit:this._onPresetEdit,onPresetDelete:this._onPresetDelete,onPresetInput:this._onPresetInput,onPresetSave:this._onPresetSave,onPresetCancel:this._onPresetCancel,onPresetSend:this._onPresetSend},t);case"homeassistant":return function(t,e,i){return U`
    <h2 class="screen-title">${t}</h2>
    <div class="empty">
      <div class="badge">${i("common.phase")} ${e}</div>
      <p>${i("common.comingSoon")}</p>
    </div>
  `}(t("tab.homeassistant"),4,t);case"settings":return Gt({settings:this._settings,entries:this._entries,nodes:this._nodes,saved:this._saved,loadError:this._loadError,draftGlobal:this._draftGlobal,draftEntries:this._draftEntries,onGlobalInput:this._onGlobalInput,onEntryInput:this._onEntryInput,onSaveGlobal:this._onSaveGlobal,onSaveEntry:this._onSaveEntry},t)}}render(){if(!this.hass||!this._config)return U``;const t=function(t){const e=(t?.locale?.language||t?.language||"en").split("-")[0].toLowerCase(),i=gt[e]||ft;return t=>i[t]??ft[t]??t}(this.hass);return U`
      <div class="shell">
        <div class="topbar">
          <div class="brand">
            <span class="dot"></span>
            <span>Hermes</span>
            <span class="sub">Meshtastic Commander</span>
          </div>
        </div>

        <div class="tabs" role="tablist">
          ${Xt.map(e=>U`
              <button
                class="tab"
                role="tab"
                aria-selected=${this._tab===e?"true":"false"}
                @click=${()=>this._select(e)}
              >
                ${t(`tab.${e}`)}
              </button>
            `)}
        </div>

        <div class="content">${this._screen(t)}</div>
      </div>
    `}};te.styles=[vt,yt],t([mt({attribute:!1})],te.prototype,"hass",void 0),t([_t()],te.prototype,"_config",void 0),t([_t()],te.prototype,"_tab",void 0),t([_t()],te.prototype,"_entries",void 0),t([_t()],te.prototype,"_nodes",void 0),t([_t()],te.prototype,"_settings",void 0),t([_t()],te.prototype,"_saved",void 0),t([_t()],te.prototype,"_draftGlobal",void 0),t([_t()],te.prototype,"_draftEntries",void 0),t([_t()],te.prototype,"_selectedEntry",void 0),t([_t()],te.prototype,"_editing",void 0),t([_t()],te.prototype,"_loadError",void 0),t([_t()],te.prototype,"_paletteEntity",void 0),t([_t()],te.prototype,"_paletteValues",void 0),t([_t()],te.prototype,"_showAdvanced",void 0),t([_t()],te.prototype,"_mapShowAll",void 0),t([_t()],te.prototype,"_mapRadiusOn",void 0),t([_t()],te.prototype,"_mapRadiusKm",void 0),t([_t()],te.prototype,"_presets",void 0),t([_t()],te.prototype,"_editingPreset",void 0),t([_t()],te.prototype,"_history",void 0),t([_t()],te.prototype,"_logFilter",void 0),te=t([dt("hermes-card")],te),window.customCards=window.customCards||[],window.customCards.push({type:"hermes-card",name:"Hermes",description:"Meshtastic Commander control panel",preview:!1}),console.info("%c HERMES-CARD %c 0.6.0 ","background:#FFD60A;color:#000","");export{te as HermesCard};
