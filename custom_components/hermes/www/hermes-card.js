function e(e,t,s,a){var n,i=arguments.length,o=i<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,s):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,s,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(i<3?n(o):i>3?n(t,s,o):n(t,s))||o);return i>3&&o&&Object.defineProperty(t,s,o),o}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,s=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),n=new WeakMap;let i=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(s&&void 0===e){const s=void 0!==t&&1===t.length;s&&(e=n.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&n.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,s,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[a+1],e[0]);return new i(s,e,a)},r=s?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return(e=>new i("string"==typeof e?e:e+"",void 0,a))(t)})(e):e,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:p,getOwnPropertySymbols:m,getPrototypeOf:u}=Object,h=globalThis,g=h.trustedTypes,v=g?g.emptyScript:"",f=h.reactiveElementPolyfillSupport,y=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?v:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},_=(e,t)=>!l(e,t),$={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:_};Symbol.metadata??=Symbol("metadata"),h.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),a=this.getPropertyDescriptor(e,s,t);void 0!==a&&d(this.prototype,e,a)}}static getPropertyDescriptor(e,t,s){const{get:a,set:n}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const i=a?.call(this);n?.call(this,t),this.requestUpdate(e,i,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...p(e),...m(e)];for(const s of t)this.createProperty(s,e[s])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const s=this._$Eu(e,t);void 0!==s&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Eu(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,a)=>{if(s)e.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const s of a){const a=document.createElement("style"),n=t.litNonce;void 0!==n&&a.setAttribute("nonce",n),a.textContent=s.cssText,e.appendChild(a)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,s);if(void 0!==a&&!0===s.reflect){const n=(void 0!==s.converter?.toAttribute?s.converter:b).toAttribute(t,s.type);this._$Em=e,null==n?this.removeAttribute(a):this.setAttribute(a,n),this._$Em=null}}_$AK(e,t){const s=this.constructor,a=s._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=s.getPropertyOptions(a),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=a;const i=n.fromAttribute(t,e.type);this[a]=i??this._$Ej?.get(a)??i,this._$Em=null}}requestUpdate(e,t,s,a=!1,n){if(void 0!==e){const i=this.constructor;if(!1===a&&(n=this[e]),s??=i.getPropertyOptions(e),!((s.hasChanged??_)(n,t)||s.useDefault&&s.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(i._$Eu(e,s))))return;this.C(e,t,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:a,wrapped:n},i){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,i??t??this[e]),!0!==n||void 0!==i)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,s]of e){const{wrapped:e}=s,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,s,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[y("elementProperties")]=new Map,w[y("finalized")]=new Map,f?.({ReactiveElement:w}),(h.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,E=e=>e,A=x.trustedTypes,k=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,H="?"+C,z=`<${H}>`,N=document,M=()=>N.createComment(""),D=e=>null===e||"object"!=typeof e&&"function"!=typeof e,P=Array.isArray,T="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,U=/>/g,R=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,L=/"/g,G=/^(?:script|style|textarea|title)$/i,W=(e=>(t,...s)=>({_$litType$:e,strings:t,values:s}))(1),V=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),q=new WeakMap,K=N.createTreeWalker(N,129);function F(e,t){if(!P(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(t):t}const J=(e,t)=>{const s=e.length-1,a=[];let n,i=2===t?"<svg>":3===t?"<math>":"",o=I;for(let t=0;t<s;t++){const s=e[t];let r,l,d=-1,c=0;for(;c<s.length&&(o.lastIndex=c,l=o.exec(s),null!==l);)c=o.lastIndex,o===I?"!--"===l[1]?o=O:void 0!==l[1]?o=U:void 0!==l[2]?(G.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=R):void 0!==l[3]&&(o=R):o===R?">"===l[0]?(o=n??I,d=-1):void 0===l[1]?d=-2:(d=o.lastIndex-l[2].length,r=l[1],o=void 0===l[3]?R:'"'===l[3]?L:j):o===L||o===j?o=R:o===O||o===U?o=I:(o=R,n=void 0);const p=o===R&&e[t+1].startsWith("/>")?" ":"";i+=o===I?s+z:d>=0?(a.push(r),s.slice(0,d)+S+s.slice(d)+C+p):s+C+(-2===d?t:p)}return[F(e,i+(e[s]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]};class Z{constructor({strings:e,_$litType$:t},s){let a;this.parts=[];let n=0,i=0;const o=e.length-1,r=this.parts,[l,d]=J(e,t);if(this.el=Z.createElement(l,s),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=K.nextNode())&&r.length<o;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(S)){const t=d[i++],s=a.getAttribute(e).split(C),o=/([.?@])?(.*)/.exec(t);r.push({type:1,index:n,name:o[2],strings:s,ctor:"."===o[1]?te:"?"===o[1]?se:"@"===o[1]?ae:ee}),a.removeAttribute(e)}else e.startsWith(C)&&(r.push({type:6,index:n}),a.removeAttribute(e));if(G.test(a.tagName)){const e=a.textContent.split(C),t=e.length-1;if(t>0){a.textContent=A?A.emptyScript:"";for(let s=0;s<t;s++)a.append(e[s],M()),K.nextNode(),r.push({type:2,index:++n});a.append(e[t],M())}}}else if(8===a.nodeType)if(a.data===H)r.push({type:2,index:n});else{let e=-1;for(;-1!==(e=a.data.indexOf(C,e+1));)r.push({type:7,index:n}),e+=C.length-1}n++}}static createElement(e,t){const s=N.createElement("template");return s.innerHTML=e,s}}function Q(e,t,s=e,a){if(t===V)return t;let n=void 0!==a?s._$Co?.[a]:s._$Cl;const i=D(t)?void 0:t._$litDirective$;return n?.constructor!==i&&(n?._$AO?.(!1),void 0===i?n=void 0:(n=new i(e),n._$AT(e,s,a)),void 0!==a?(s._$Co??=[])[a]=n:s._$Cl=n),void 0!==n&&(t=Q(e,n._$AS(e,t.values),n,a)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,a=(e?.creationScope??N).importNode(t,!0);K.currentNode=a;let n=K.nextNode(),i=0,o=0,r=s[0];for(;void 0!==r;){if(i===r.index){let t;2===r.type?t=new Y(n,n.nextSibling,this,e):1===r.type?t=new r.ctor(n,r.name,r.strings,this,e):6===r.type&&(t=new ne(n,this,e)),this._$AV.push(t),r=s[++o]}i!==r?.index&&(n=K.nextNode(),i++)}return K.currentNode=N,a}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,a){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),D(e)?e===B||null==e||""===e?(this._$AH!==B&&this._$AR(),this._$AH=B):e!==this._$AH&&e!==V&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>P(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==B&&D(this._$AH)?this._$AA.nextSibling.data=e:this.T(N.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,a="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=Z.createElement(F(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new X(a,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=q.get(e.strings);return void 0===t&&q.set(e.strings,t=new Z(e)),t}k(e){P(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,a=0;for(const n of e)a===t.length?t.push(s=new Y(this.O(M()),this.O(M()),this,this.options)):s=t[a],s._$AI(n),a++;a<t.length&&(this._$AR(s&&s._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=E(e).nextSibling;E(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,a,n){this.type=1,this._$AH=B,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=B}_$AI(e,t=this,s,a){const n=this.strings;let i=!1;if(void 0===n)e=Q(this,e,t,0),i=!D(e)||e!==this._$AH&&e!==V,i&&(this._$AH=e);else{const a=e;let o,r;for(e=n[0],o=0;o<n.length-1;o++)r=Q(this,a[s+o],t,o),r===V&&(r=this._$AH[o]),i||=!D(r)||r!==this._$AH[o],r===B?e=B:e!==B&&(e+=(r??"")+n[o+1]),this._$AH[o]=r}i&&!a&&this.j(e)}j(e){e===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===B?void 0:e}}class se extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==B)}}class ae extends ee{constructor(e,t,s,a,n){super(e,t,s,a,n),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??B)===V)return;const s=this._$AH,a=e===B&&s!==B||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==B&&(s===B||a);a&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const ie=x.litHtmlPolyfillSupport;ie?.(Z,Y),(x.litHtmlVersions??=[]).push("3.3.3");const oe=globalThis;class re extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,s)=>{const a=s?.renderBefore??t;let n=a._$litPart$;if(void 0===n){const e=s?.renderBefore??null;a._$litPart$=n=new Y(t.insertBefore(M(),e),e,void 0,s??{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}re._$litElement$=!0,re.finalized=!0,oe.litElementHydrateSupport?.({LitElement:re});const le=oe.litElementPolyfillSupport;le?.({LitElement:re}),(oe.litElementVersions??=[]).push("4.2.2");const de={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:_},ce=(e=de,t,s)=>{const{kind:a,metadata:n}=s;let i=globalThis.litPropertyMetadata.get(n);if(void 0===i&&globalThis.litPropertyMetadata.set(n,i=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),i.set(s.name,e),"accessor"===a){const{name:a}=s;return{set(s){const n=t.get.call(this);t.set.call(this,s),this.requestUpdate(a,n,e,!0,s)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=s;return function(s){const n=this[a];t.call(this,s),this.requestUpdate(a,n,e,!0,s)}}throw Error("Unsupported decorator location: "+a)};function pe(e){return(t,s)=>"object"==typeof s?ce(e,t,s):((e,t,s)=>{const a=t.hasOwnProperty(s);return t.constructor.createProperty(s,e),a?Object.getOwnPropertyDescriptor(t,s):void 0})(e,t,s)}function me(e){return pe({...e,state:!0,attribute:!1})}const ue={"tab.status":"Status","tab.devices":"Devices","tab.map":"Map","tab.messages":"Messages","tab.homeassistant":"Home Assistant","tab.settings":"Settings","status.title":"Status","status.nodes":"Nodes","status.commands":"Configured commands","status.executed":"Executed today","status.lastCommand":"Last command","status.lastError":"Last error","status.none":"None","status.noIntegration":"No Hermes entities found. Add the integration first.","devices.title":"Devices","devices.empty":"No Meshtastic devices found. Set up the Meshtastic integration first.","devices.unknown":"Unknown","settings.title":"Settings","settings.global":"Global","settings.owmKey":"OpenWeather API key","settings.owmHint":"Used for the weather layer on the map. Stored in Home Assistant, never in the repository.","settings.gateway":"Gateway node","settings.mode":"Mode","settings.channel":"Channel","settings.initialDelay":"Initial delay (s)","settings.partDelay":"Delay between parts (s)","settings.authorizedNodes":"Authorized nodes","settings.mapNodes":"Nodes shown on the map","messages.title":"Messages","messages.gateway":"Gateway","messages.add":"Add message","messages.empty":"No commands configured yet.","messages.keyword":"Keyword","messages.matchType":"Match type","messages.service":"Service (domain.service)","messages.serviceHint":"Optional. Leave empty for a command that only replies.","messages.target":"Target entity","messages.targetHint":"The entity the service acts on. Leave empty if the service needs none.","messages.replyHint":"Optional. Use {state:entity_id} or {attr:entity_id:attribute}.","messages.replyTemplate":"Reply template","messages.replyTo":"Reply routing","messages.exact":"Exact match","messages.startswith":"Starts with","messages.onChannel":"On the channel","messages.senderDm":"DM to sender","messages.confirmDelete":"Delete this command?","messages.keywordHint":"The text people send from a Meshtastic node to trigger this.","messages.matchHint":'Use "Starts with" if you want to accept a value, like "temp 21".',"messages.paletteEntity":"Pick an entity","messages.paletteHint":"Choose what you want to read or control, then click a button below.","messages.pickEntityFirst":"Pick an entity to see what you can do with it.","messages.groupRead":"Read","messages.groupDo":"Do","messages.readState":"Value","messages.templateHint":"Click the buttons above to build this. Action buttons run something and send nothing.","messages.advanced":"Advanced","messages.hideAdvanced":"Hide advanced","common.comingSoon":"Coming in the next build phase.","common.phase":"Phase","common.save":"Save","common.cancel":"Cancel","common.edit":"Edit","common.delete":"Delete","common.loading":"Loading","common.saved":"Saved","common.noEntries":"No Hermes gateway configured yet.","common.loadError":"Could not load data from Home Assistant."},he={en:ue,it:{"tab.status":"Status","tab.devices":"Dispositivi","tab.map":"Mappa","tab.messages":"Messaggi","tab.homeassistant":"Home Assistant","tab.settings":"Impostazioni","status.title":"Status","status.nodes":"Nodi","status.commands":"Comandi configurati","status.executed":"Eseguiti oggi","status.lastCommand":"Ultimo comando","status.lastError":"Ultimo errore","status.none":"Nessuno","status.noIntegration":"Nessuna entità Hermes trovata. Aggiungi prima l'integrazione.","devices.title":"Dispositivi","devices.empty":"Nessun dispositivo Meshtastic trovato. Configura prima l'integrazione Meshtastic.","devices.unknown":"Sconosciuto","settings.title":"Impostazioni","settings.global":"Globali","settings.owmKey":"Chiave API OpenWeather","settings.owmHint":"Usata per il livello meteo sulla mappa. Salvata in Home Assistant, mai nel repository.","settings.gateway":"Nodo gateway","settings.mode":"Modalità","settings.channel":"Canale","settings.initialDelay":"Attesa iniziale (s)","settings.partDelay":"Pausa tra le parti (s)","settings.authorizedNodes":"Nodi autorizzati","settings.mapNodes":"Nodi mostrati sulla mappa","messages.title":"Messaggi","messages.gateway":"Gateway","messages.add":"Aggiungi messaggio","messages.empty":"Nessun comando configurato.","messages.keyword":"Parola chiave","messages.matchType":"Tipo di match","messages.service":"Servizio (dominio.servizio)","messages.serviceHint":"Opzionale. Lascia vuoto per un comando che risponde soltanto.","messages.target":"Entità target","messages.targetHint":"L'entità su cui agisce il servizio. Lascia vuoto se il servizio non ne richiede.","messages.replyHint":"Opzionale. Usa {state:entity_id} oppure {attr:entity_id:attributo}.","messages.replyTemplate":"Template di risposta","messages.replyTo":"Instradamento risposta","messages.exact":"Match esatto","messages.startswith":"Inizia con","messages.onChannel":"Sul canale","messages.senderDm":"DM al mittente","messages.confirmDelete":"Eliminare questo comando?","messages.keywordHint":"Il testo che si invia da un nodo Meshtastic per far scattare il comando.","messages.matchHint":'Usa "Inizia con" se vuoi accettare un valore, tipo "temp 21".',"messages.paletteEntity":"Scegli una entità","messages.paletteHint":"Scegli cosa vuoi leggere o comandare, poi clicca un pulsante qui sotto.","messages.pickEntityFirst":"Scegli una entità per vedere cosa puoi farci.","messages.groupRead":"Leggi","messages.groupDo":"Fai","messages.readState":"Valore","messages.templateHint":"Componi cliccando i pulsanti sopra. I pulsanti azione eseguono e non inviano testo.","messages.advanced":"Avanzate","messages.hideAdvanced":"Nascondi avanzate","common.comingSoon":"In arrivo nella prossima fase di sviluppo.","common.phase":"Fase","common.save":"Salva","common.cancel":"Annulla","common.edit":"Modifica","common.delete":"Elimina","common.loading":"Caricamento","common.saved":"Salvato","common.noEntries":"Nessun gateway Hermes configurato.","common.loadError":"Impossibile caricare i dati da Home Assistant."},es:{"tab.status":"Estado","tab.devices":"Dispositivos","tab.map":"Mapa","tab.messages":"Mensajes","tab.homeassistant":"Home Assistant","tab.settings":"Ajustes","status.title":"Estado","status.nodes":"Nodos","status.commands":"Comandos configurados","status.executed":"Ejecutados hoy","status.lastCommand":"Último comando","status.lastError":"Último error","status.none":"Ninguno","status.noIntegration":"No se han encontrado entidades de Hermes. Añade primero la integración.","devices.title":"Dispositivos","devices.empty":"No se han encontrado dispositivos Meshtastic. Configura primero la integración Meshtastic.","devices.unknown":"Desconocido","settings.title":"Ajustes","settings.global":"Globales","settings.owmKey":"Clave API de OpenWeather","settings.owmHint":"Se usa para la capa meteorológica del mapa. Guardada en Home Assistant, nunca en el repositorio.","settings.gateway":"Nodo de puerta de enlace","settings.mode":"Modo","settings.channel":"Canal","settings.initialDelay":"Retardo inicial (s)","settings.partDelay":"Retardo entre partes (s)","settings.authorizedNodes":"Nodos autorizados","settings.mapNodes":"Nodos mostrados en el mapa","messages.title":"Mensajes","messages.gateway":"Puerta de enlace","messages.add":"Añadir mensaje","messages.empty":"Todavía no hay comandos configurados.","messages.keyword":"Palabra clave","messages.matchType":"Tipo de coincidencia","messages.service":"Servicio (dominio.servicio)","messages.serviceHint":"Opcional. Déjalo vacío para un comando que solo responde.","messages.target":"Entidad de destino","messages.targetHint":"La entidad sobre la que actúa el servicio. Déjalo vacío si el servicio no la necesita.","messages.replyHint":"Opcional. Usa {state:entity_id} o {attr:entity_id:attribute}.","messages.replyTemplate":"Plantilla de respuesta","messages.replyTo":"Enrutamiento de respuesta","messages.exact":"Coincidencia exacta","messages.startswith":"Empieza por","messages.onChannel":"En el canal","messages.senderDm":"DM al remitente","messages.confirmDelete":"¿Eliminar este comando?","messages.keywordHint":"El texto que se envía desde un nodo Meshtastic para activarlo.","messages.matchHint":'Usa "Empieza por" si quieres aceptar un valor, como "temp 21".',"messages.paletteEntity":"Elige una entidad","messages.paletteHint":"Elige qué quieres leer o controlar y pulsa un botón de abajo.","messages.pickEntityFirst":"Elige una entidad para ver qué puedes hacer con ella.","messages.groupRead":"Leer","messages.groupDo":"Hacer","messages.readState":"Valor","messages.templateHint":"Compón pulsando los botones de arriba. Los botones de acción ejecutan y no envían texto.","messages.advanced":"Avanzado","messages.hideAdvanced":"Ocultar avanzado","common.comingSoon":"Llegará en la próxima fase de desarrollo.","common.phase":"Fase","common.save":"Guardar","common.cancel":"Cancelar","common.edit":"Editar","common.delete":"Eliminar","common.loading":"Cargando","common.saved":"Guardado","common.noEntries":"Todavía no hay ninguna puerta de enlace Hermes configurada.","common.loadError":"No se han podido cargar los datos de Home Assistant."},fr:{"tab.status":"État","tab.devices":"Appareils","tab.map":"Carte","tab.messages":"Messages","tab.homeassistant":"Home Assistant","tab.settings":"Paramètres","status.title":"État","status.nodes":"Nœuds","status.commands":"Commandes configurées","status.executed":"Exécutées aujourd'hui","status.lastCommand":"Dernière commande","status.lastError":"Dernière erreur","status.none":"Aucun","status.noIntegration":"Aucune entité Hermes trouvée. Ajoutez d'abord l'intégration.","devices.title":"Appareils","devices.empty":"Aucun appareil Meshtastic trouvé. Configurez d'abord l'intégration Meshtastic.","devices.unknown":"Inconnu","settings.title":"Paramètres","settings.global":"Globaux","settings.owmKey":"Clé API OpenWeather","settings.owmHint":"Utilisée pour la couche météo de la carte. Stockée dans Home Assistant, jamais dans le dépôt.","settings.gateway":"Nœud passerelle","settings.mode":"Mode","settings.channel":"Canal","settings.initialDelay":"Délai initial (s)","settings.partDelay":"Délai entre les parties (s)","settings.authorizedNodes":"Nœuds autorisés","settings.mapNodes":"Nœuds affichés sur la carte","messages.title":"Messages","messages.gateway":"Passerelle","messages.add":"Ajouter un message","messages.empty":"Aucune commande configurée pour le moment.","messages.keyword":"Mot-clé","messages.matchType":"Type de correspondance","messages.service":"Service (domaine.service)","messages.serviceHint":"Facultatif. Laissez vide pour une commande qui répond seulement.","messages.target":"Entité cible","messages.targetHint":"L'entité sur laquelle agit le service. Laissez vide si le service n'en a pas besoin.","messages.replyHint":"Facultatif. Utilisez {state:entity_id} ou {attr:entity_id:attribute}.","messages.replyTemplate":"Modèle de réponse","messages.replyTo":"Routage de la réponse","messages.exact":"Correspondance exacte","messages.startswith":"Commence par","messages.onChannel":"Sur le canal","messages.senderDm":"DM à l'expéditeur","messages.confirmDelete":"Supprimer cette commande ?","messages.keywordHint":"Le texte envoyé depuis un nœud Meshtastic pour la déclencher.","messages.matchHint":'Utilisez "Commence par" pour accepter une valeur, comme "temp 21".',"messages.paletteEntity":"Choisissez une entité","messages.paletteHint":"Choisissez ce que vous voulez lire ou piloter, puis cliquez un bouton ci-dessous.","messages.pickEntityFirst":"Choisissez une entité pour voir ce que vous pouvez en faire.","messages.groupRead":"Lire","messages.groupDo":"Faire","messages.readState":"Valeur","messages.templateHint":"Composez avec les boutons ci-dessus. Les boutons d'action exécutent et n'envoient rien.","messages.advanced":"Avancé","messages.hideAdvanced":"Masquer avancé","common.comingSoon":"Arrive dans la prochaine phase de développement.","common.phase":"Phase","common.save":"Enregistrer","common.cancel":"Annuler","common.edit":"Modifier","common.delete":"Supprimer","common.loading":"Chargement","common.saved":"Enregistré","common.noEntries":"Aucune passerelle Hermes configurée pour le moment.","common.loadError":"Impossible de charger les données depuis Home Assistant."},de:{"tab.status":"Status","tab.devices":"Geräte","tab.map":"Karte","tab.messages":"Nachrichten","tab.homeassistant":"Home Assistant","tab.settings":"Einstellungen","status.title":"Status","status.nodes":"Nodes","status.commands":"Konfigurierte Befehle","status.executed":"Heute ausgeführt","status.lastCommand":"Letzter Befehl","status.lastError":"Letzter Fehler","status.none":"Keine","status.noIntegration":"Keine Hermes-Entitäten gefunden. Füge zuerst die Integration hinzu.","devices.title":"Geräte","devices.empty":"Keine Meshtastic-Geräte gefunden. Richte zuerst die Meshtastic-Integration ein.","devices.unknown":"Unbekannt","settings.title":"Einstellungen","settings.global":"Global","settings.owmKey":"OpenWeather-API-Schlüssel","settings.owmHint":"Wird für die Wetterebene der Karte verwendet. In Home Assistant gespeichert, nie im Repository.","settings.gateway":"Gateway-Node","settings.mode":"Modus","settings.channel":"Kanal","settings.initialDelay":"Anfängliche Verzögerung (s)","settings.partDelay":"Verzögerung zwischen Teilen (s)","settings.authorizedNodes":"Autorisierte Nodes","settings.mapNodes":"Auf der Karte angezeigte Nodes","messages.title":"Nachrichten","messages.gateway":"Gateway","messages.add":"Nachricht hinzufügen","messages.empty":"Noch keine Befehle konfiguriert.","messages.keyword":"Schlüsselwort","messages.matchType":"Übereinstimmungstyp","messages.service":"Dienst (domain.service)","messages.serviceHint":"Optional. Leer lassen für einen Befehl, der nur antwortet.","messages.target":"Ziel-Entität","messages.targetHint":"Die Entität, auf die der Dienst wirkt. Leer lassen, wenn der Dienst keine benötigt.","messages.replyHint":"Optional. Verwende {state:entity_id} oder {attr:entity_id:attribute}.","messages.replyTemplate":"Antwortvorlage","messages.replyTo":"Antwort-Routing","messages.exact":"Exakte Übereinstimmung","messages.startswith":"Beginnt mit","messages.onChannel":"Auf dem Kanal","messages.senderDm":"DM an Absender","messages.confirmDelete":"Diesen Befehl löschen?","messages.keywordHint":"Der Text, den man von einem Meshtastic-Node sendet, um ihn auszulösen.","messages.matchHint":'Nutze "Beginnt mit", wenn ein Wert akzeptiert werden soll, etwa "temp 21".',"messages.paletteEntity":"Entität wählen","messages.paletteHint":"Wähle, was du lesen oder steuern willst, dann klicke unten einen Button.","messages.pickEntityFirst":"Wähle eine Entität, um zu sehen, was möglich ist.","messages.groupRead":"Lesen","messages.groupDo":"Ausführen","messages.readState":"Wert","messages.templateHint":"Mit den Buttons oben zusammenstellen. Aktions-Buttons führen aus und senden keinen Text.","messages.advanced":"Erweitert","messages.hideAdvanced":"Erweitert ausblenden","common.comingSoon":"Kommt in der nächsten Ausbaustufe.","common.phase":"Phase","common.save":"Speichern","common.cancel":"Abbrechen","common.edit":"Bearbeiten","common.delete":"Löschen","common.loading":"Wird geladen","common.saved":"Gespeichert","common.noEntries":"Noch kein Hermes-Gateway konfiguriert.","common.loadError":"Daten konnten nicht aus Home Assistant geladen werden."}};const ge=o`
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
`,ve=o`
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
    color: oklch(0.25 0.05 90);
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
    background: var(--accent-soft);
  }

  button.chip.read {
    border-style: dashed;
  }

  button.chip.do {
    background: var(--accent-soft);
    border-color: var(--accent);
    color: var(--accent-ink);
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

  .sub-error {
    margin-top: 8px;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--danger);
    word-break: break-word;
  }
`,fe="meshtastic",ye="hermes";function be(e,t){const s=e.entities;return s?Object.values(s).filter(e=>e.platform===t):Object.keys(e.states).filter(e=>e.includes(t)).map(e=>({entity_id:e,platform:t}))}function _e(e,t){for(const s of be(e,ye))if(s.entity_id.endsWith(t)){const t=e.states[s.entity_id];if(t)return t}}function $e(e,t){const s=e.devices?.[t];if(!s?.identifiers)return null;for(const e of s.identifiers)if(e?.[0]===fe){const t=Number.parseInt(String(e[1]),10);return Number.isNaN(t)?null:t}return null}function we(e){const t=(e.split(".")[1]??e).split("_");return t.slice(Math.max(t.length-2,0)).join(" ")}function xe(e){const t=new Map;for(const s of be(e,fe)){const a=s.device_id;if(!a)continue;const n=e.states[s.entity_id];if(!n)continue;let i=t.get(a);if(!i){const s=e.devices?.[a];i={deviceId:a,nodeNum:$e(e,a),name:s?.name_by_user||s?.name||n.attributes?.friendly_name||a,values:{}},t.set(a,i)}i.values[we(s.entity_id)]=n}return[...t.values()].sort((e,t)=>e.name.localeCompare(t.name))}const Ee=[{id:"turn_on",label:"Turn on",service:"homeassistant.turn_on"},{id:"turn_off",label:"Turn off",service:"homeassistant.turn_off"},{id:"toggle",label:"Toggle",service:"homeassistant.toggle"}];let Ae={light:[{id:"turn_on",label:"Turn on",service:"light.turn_on"},{id:"turn_on_brightness",label:"Turn on at brightness",service:"light.turn_on",value:{key:"brightness_pct",type:"number",unit:"%",min:1,max:100,step:1,default:80}},{id:"turn_off",label:"Turn off",service:"light.turn_off"},{id:"toggle",label:"Toggle",service:"light.toggle"}],switch:Ee,climate:[{id:"set_temperature",label:"Set temperature",service:"climate.set_temperature",value:{key:"temperature",type:"number",unit:"C",min:5,max:35,step:.5,default:21}},{id:"turn_on",label:"Turn on",service:"climate.turn_on"},{id:"turn_off",label:"Turn off",service:"climate.turn_off"}],cover:[{id:"open",label:"Open",service:"cover.open_cover"},{id:"close",label:"Close",service:"cover.close_cover"},{id:"stop",label:"Stop",service:"cover.stop_cover"},{id:"set_position",label:"Set position",service:"cover.set_cover_position",value:{key:"position",type:"number",unit:"%",min:0,max:100,step:5,default:100}}]},ke={light:"light",switch:"switch",input_boolean:"switch",climate:"climate",cover:"cover"},Se=Ee;const Ce={temperature:{min:"min_temp",max:"max_temp",step:"target_temp_step"},percentage:{step:"percentage_step"},value:{min:"min",max:"max",step:"step"}},He={hvac_mode:"hvac_modes",preset_mode:"preset_modes",fan_mode:"fan_modes",swing_mode:"swing_modes",operation_mode:"operation_list",source:"source_list"};function ze(e,t,s){const a=e.states[t]?.attributes??{},n={...s},i=Ce[s.key]??{};for(const e of["min","max","step"]){const t=i[e],s=t?a[t]:void 0;"number"==typeof s&&(n[e]=s)}const o=He[s.key],r=o?a[o]:void 0;return Array.isArray(r)&&r.length&&(n.options=r.map(String),void 0!==n.default&&n.options.includes(String(n.default))||(n.default=n.options[0])),"number"==typeof n.default&&("number"==typeof n.min&&n.default<n.min&&(n.default=n.min),"number"==typeof n.max&&n.default>n.max&&(n.default=n.max)),n}const Ne=new Set(["friendly_name","icon","supported_features","device_class","entity_picture","attribution","supported_color_modes","hs_color","rgb_color","xy_color"]);function Me(e,t){if(e.loadError)return W`
      <div class="empty">
        <div>${t("common.loadError")}</div>
        <div class="sub-error">${e.loadError}</div>
      </div>
    `;if(!e.entries.length)return W`<div class="empty">${t("common.noEntries")}</div>`;const s=e.entries.find(t=>t.entry_id===e.selectedEntry)??e.entries[0];return W`
    <h2 class="screen-title">${t("messages.title")}</h2>

    ${e.entries.length>1?W`
          <div class="field">
            <label>${t("messages.gateway")}</label>
            <select
              @change=${t=>e.onSelectEntry(t.target.value)}
            >
              ${e.entries.map(e=>W`
                  <option
                    value=${e.entry_id}
                    ?selected=${e.entry_id===s.entry_id}
                  >
                    ${e.title}
                  </option>
                `)}
            </select>
          </div>
        `:""}

    ${e.editing?function(e,t,s){const a=t=>s=>e.onDraftInput(t,s.target.value);return W`
    <div class="panel">
      <div class="field">
        <label>${s("messages.keyword")}</label>
        <input .value=${t.keyword??""} @input=${a("keyword")} />
        <span class="hint">${s("messages.keywordHint")}</span>
      </div>

      <div class="field">
        <label>${s("messages.matchType")}</label>
        <select @change=${a("match_type")}>
          <option value="exact" ?selected=${"exact"===t.match_type}>
            ${s("messages.exact")}
          </option>
          <option value="startswith" ?selected=${"startswith"===t.match_type}>
            ${s("messages.startswith")}
          </option>
        </select>
        <span class="hint">${s("messages.matchHint")}</span>
      </div>

      ${function(e,t){const s=e.paletteEntity;return W`
    <div class="palette">
      <div class="field">
        <label>${t("messages.paletteEntity")}</label>
        <input
          list="hermes-entities"
          .value=${s}
          placeholder="light.kitchen"
          @input=${t=>e.onPaletteEntity(t.target.value.trim())}
        />
        <datalist id="hermes-entities">
          ${e.entityIds.map(e=>W`<option value=${e}></option>`)}
        </datalist>
        <span class="hint">${t("messages.paletteHint")}</span>
      </div>

      ${s&&e.hass.states[s]?W`
            <div class="section-title">${t("messages.groupRead")}</div>
            <div class="chips">
              <button
                class="chip read"
                @click=${()=>e.onInsert(function(e){return`{state:${e}}`}(s))}
              >
                ${t("messages.readState")}
              </button>
              ${function(e,t){const s=e.states[t];return s?.attributes?Object.entries(s.attributes).filter(([e,t])=>!Ne.has(e)&&("string"==typeof t||"number"==typeof t||"boolean"==typeof t)).map(([e])=>e).sort():[]}(e.hass,s).map(t=>W`
                  <button
                    class="chip read"
                    @click=${()=>e.onInsert(function(e,t){return`{attr:${e}:${t}}`}(s,t))}
                  >
                    ${t}
                  </button>
                `)}
            </div>

            <div class="section-title">${t("messages.groupDo")}</div>
            <div class="chips">
              ${function(e){const t=ke[function(e){return e.split(".")[0]??""}(e)];return t&&Ae[t]||Se}(s).map(t=>W`
                  <span class="chip-group">
                    <button
                      class="chip do"
                      @click=${()=>e.onInsert(function(e,t,s){return e.value&&void 0!==s&&""!==s?`{do:${e.service}:${t}:${e.value.key}=${s}}`:`{do:${e.service}:${t}}`}(t,s,e.paletteValues[t.id]??(t.value?ze(e.hass,s,t.value).default:void 0)))}
                    >
                      ${t.label}
                    </button>
                    ${function(e,t,s){if(!t.value)return"";const a=ze(e.hass,s,t.value),n=e.paletteValues[t.id]??a.default??"";if("enum"===a.type)return W`
      <select
        class="inline"
        @change=${s=>e.onPaletteValue(t.id,s.target.value)}
      >
        ${(a.options??[]).map(e=>W`
            <option value=${e} ?selected=${e===n}>
              ${e}
            </option>
          `)}
      </select>
    `;const i=function(e){if("enum"===e.type)return"";if("number"!=typeof e.min||"number"!=typeof e.max)return"";const t=e.unit?` ${e.unit}`:"";return`${e.min} to ${e.max}${t}`}(a);return W`
    <input
      class="inline"
      type="number"
      min=${a.min??0}
      max=${a.max??100}
      step=${a.step??1}
      .value=${String(n)}
      @input=${s=>e.onPaletteValue(t.id,Number(s.target.value))}
    />
    ${i?W`<span class="unit">${i}</span>`:""}
  `}(e,t,s)}
                  </span>
                `)}
            </div>
          `:W`<div class="hint">${t("messages.pickEntityFirst")}</div>`}
    </div>
  `}(e,s)}

      <div class="field">
        <label>${s("messages.replyTemplate")}</label>
        <textarea
          id="hermes-template"
          .value=${t.reply_template??""}
          @input=${a("reply_template")}
        ></textarea>
        <span class="hint">${s("messages.templateHint")}</span>
      </div>

      <div class="field">
        <label>${s("messages.replyTo")}</label>
        <select @change=${a("reply_to")}>
          <option value="channel" ?selected=${"channel"===t.reply_to}>
            ${s("messages.onChannel")}
          </option>
          <option value="sender_dm" ?selected=${"sender_dm"===t.reply_to}>
            ${s("messages.senderDm")}
          </option>
        </select>
      </div>

      <button class="btn link" @click=${e.onToggleAdvanced}>
        ${e.showAdvanced?s("messages.hideAdvanced"):s("messages.advanced")}
      </button>

      ${e.showAdvanced?W`
            <div class="field" style="margin-top:10px">
              <label>${s("messages.service")}</label>
              <input
                .value=${t.service??""}
                placeholder="light.turn_off"
                @input=${a("service")}
              />
              <span class="hint">${s("messages.serviceHint")}</span>
            </div>
            <div class="field">
              <label>${s("messages.target")}</label>
              <input
                list="hermes-entities"
                .value=${t.target?.entity_id??""}
                placeholder="light.kitchen"
                @input=${t=>{const s=t.target.value.trim();e.onDraftInput("target",s?{entity_id:s}:void 0)}}
              />
            </div>
          `:""}

      <div class="actions">
        <button class="btn primary" @click=${e.onSave}>
          ${s("common.save")}
        </button>
        <button class="btn" @click=${e.onCancel}>${s("common.cancel")}</button>
      </div>
    </div>
  `}(e,e.editing,t):W`
          ${s.commands.length?s.commands.map(s=>function(e,t,s){const a=t.service||t.reply_template||"";return W`
    <div class="list-row">
      <div class="meta">
        <span class="kw">${t.keyword}</span>
        <span class="sub">${a}</span>
      </div>
      <div class="actions" style="margin:0">
        <button class="btn" @click=${()=>e.onEdit(t)}>
          ${s("common.edit")}
        </button>
        <button class="btn danger" @click=${()=>e.onDelete(t)}>
          ${s("common.delete")}
        </button>
      </div>
    </div>
  `}(e,s,t)):W`<div class="empty">${t("messages.empty")}</div>`}
          <div class="actions">
            <button class="btn primary" @click=${e.onNew}>
              ${t("messages.add")}
            </button>
          </div>
        `}
  `}function De(e,t,s){return W`
    <h2 class="screen-title">${e}</h2>
    <div class="empty">
      <div class="badge">${s("common.phase")} ${t}</div>
      <p>${s("common.comingSoon")}</p>
    </div>
  `}function Pe(e){return[...e.target.selectedOptions].map(e=>Number(e.value))}function Te(e,t){return e.map(e=>W`
      <option value=${e.node_num} ?selected=${t.includes(e.node_num)}>
        ${e.name} (${e.node_num})
      </option>
    `)}function Ie(e,t){const s=e.settings,a=t=>e.draftGlobal[t]??s?.[t];return W`
    <h2 class="screen-title">
      ${t("settings.title")}
      ${e.saved?W`<span class="toast">${t("common.saved")}</span>`:""}
    </h2>

    <div class="section">
      <div class="section-title">${t("settings.global")}</div>
      <div class="panel">
        <div class="field">
          <label for="owm">${t("settings.owmKey")}</label>
          <input
            id="owm"
            type="password"
            autocomplete="off"
            .value=${String(a("openweather_api_key")??"")}
            @input=${t=>e.onGlobalInput("openweather_api_key",t.target.value)}
          />
          <span class="hint">${t("settings.owmHint")}</span>
        </div>

        <div class="field">
          <label for="mapnodes">${t("settings.mapNodes")}</label>
          <select
            id="mapnodes"
            multiple
            @change=${t=>e.onGlobalInput("map_nodes",Pe(t))}
          >
            ${Te(e.nodes,a("map_nodes")??[])}
          </select>
        </div>

        <div class="actions">
          <button class="btn primary" @click=${e.onSaveGlobal}>
            ${t("common.save")}
          </button>
        </div>
      </div>
    </div>

    ${e.loadError?W`<div class="empty">
          <div>${t("common.loadError")}</div>
          <div class="sub-error">${e.loadError}</div>
        </div>`:0===e.entries.length?W`<div class="empty">${t("common.noEntries")}</div>`:e.entries.map(s=>function(e,t,s){const a=e.draftEntries[t.entry_id]??{},n=(e,t)=>a[e]??t;return W`
    <div class="section">
      <div class="section-title">${t.title}</div>
      <div class="panel">
        <div class="rows">
          <div class="row">
            <span class="k">${s("settings.gateway")}</span>
            <span class="v">${t.gateway_node_id??"-"}</span>
          </div>
          <div class="row">
            <span class="k">${s("settings.mode")}</span>
            <span class="v">${t.mode}</span>
          </div>
          ${null!==t.channel_index&&void 0!==t.channel_index?W`<div class="row">
                <span class="k">${s("settings.channel")}</span>
                <span class="v">${t.channel_index}</span>
              </div>`:""}
        </div>

        <div class="field" style="margin-top:12px">
          <label>${s("settings.initialDelay")}</label>
          <input
            type="number"
            min="0"
            max="60"
            step="1"
            .value=${String(n("initial_delay",t.initial_delay))}
            @input=${s=>e.onEntryInput(t.entry_id,"initial_delay",Number(s.target.value))}
          />
        </div>

        <div class="field">
          <label>${s("settings.partDelay")}</label>
          <input
            type="number"
            min="0"
            max="30"
            step="1"
            .value=${String(n("part_delay",t.part_delay))}
            @input=${s=>e.onEntryInput(t.entry_id,"part_delay",Number(s.target.value))}
          />
        </div>

        <div class="field">
          <label>${s("settings.authorizedNodes")}</label>
          <select
            multiple
            @change=${s=>e.onEntryInput(t.entry_id,"authorized_nodes",Pe(s))}
          >
            ${Te(e.nodes,n("authorized_nodes",t.authorized_nodes)??[])}
          </select>
        </div>

        <div class="actions">
          <button
            class="btn primary"
            @click=${()=>e.onSaveEntry(t.entry_id)}
          >
            ${s("common.save")}
          </button>
        </div>
      </div>
    </div>
  `}(e,s,t))}
  `}function Oe(e,t){if(!function(e){return be(e,ye).length>0}(e))return W`<div class="empty">${t("status.noIntegration")}</div>`;const s=xe(e),a=_e(e,"commands_executed"),n=_e(e,"last_command"),i=_e(e,"last_error"),o=e=>e&&"unknown"!==e&&"unavailable"!==e?e:t("status.none");return W`
    <h2 class="screen-title">${t("status.title")}</h2>
    <div class="grid">
      <div class="panel stat">
        <div class="label">${t("status.nodes")}</div>
        <div class="value">${s.length}</div>
      </div>
      <div class="panel stat">
        <div class="label">${t("status.executed")}</div>
        <div class="value">${a?a.state:"0"}</div>
      </div>
      <div class="panel stat">
        <div class="label">${t("status.lastCommand")}</div>
        <div class="value small">${o(n?.state)}</div>
      </div>
      <div class="panel stat">
        <div class="label">${t("status.lastError")}</div>
        <div class="value small">${o(i?.state)}</div>
      </div>
    </div>
  `}const Ue=["status","devices","map","messages","homeassistant","settings"],Re={keyword:"",match_type:"exact",service:"",reply_template:"",reply_to:"channel"};let je=class extends re{constructor(){super(...arguments),this._tab="status",this._entries=[],this._nodes=[],this._settings=null,this._saved=!1,this._draftGlobal={},this._draftEntries={},this._selectedEntry=null,this._editing=null,this._loadError=null,this._paletteEntity="",this._paletteValues={},this._showAdvanced=!1,this._loaded=!1,this._onGlobalInput=(e,t)=>{this._draftGlobal={...this._draftGlobal,[e]:t}},this._onEntryInput=(e,t,s)=>{this._draftEntries={...this._draftEntries,[e]:{...this._draftEntries[e]??{},[t]:s}}},this._onSaveGlobal=async()=>{var e,t;this.hass&&Object.keys(this._draftGlobal).length&&(this._settings=await(e=this.hass,t=this._draftGlobal,e.callWS({type:"hermes/settings/update",patch:t})),this._draftGlobal={},this._flagSaved())},this._onSaveEntry=async e=>{const t=this._draftEntries[e];this.hass&&t&&Object.keys(t).length&&(await function(e,t,s){return e.callWS({type:"hermes/entry/update",entry_id:t,patch:s})}(this.hass,e,t),this._draftEntries={...this._draftEntries,[e]:{}},this._flagSaved(),await this._load())},this._onSelectEntry=e=>{this._selectedEntry=e,this._editing=null},this._onNew=()=>{this._editing={...Re}},this._onEdit=e=>{this._editing={...e}},this._onDraftInput=(e,t)=>{this._editing&&(this._editing={...this._editing,[e]:t})},this._onCancel=()=>{this._editing=null},this._onPaletteEntity=e=>{this._paletteEntity=e},this._onPaletteValue=(e,t)=>{this._paletteValues={...this._paletteValues,[e]:t}},this._onToggleAdvanced=()=>{this._showAdvanced=!this._showAdvanced},this._onInsert=e=>{if(!this._editing)return;const t=this.renderRoot.querySelector("#hermes-template"),s=this._editing.reply_template??"";if(!t)return void(this._editing={...this._editing,reply_template:s+e});const a=t.selectionStart??s.length,n=t.selectionEnd??s.length,i=s.slice(0,a)+e+s.slice(n);this._editing={...this._editing,reply_template:i},this.updateComplete.then(()=>{const t=this.renderRoot.querySelector("#hermes-template");if(t){const s=a+e.length;t.focus(),t.setSelectionRange(s,s)}})},this._onSaveCommand=async()=>{const e=this._selectedEntry;if(!this.hass||!e||!this._editing)return;const t=Boolean(this._editing.service)||Boolean(this._editing.reply_template);this._editing.keyword&&t&&(await function(e,t,s){return e.callWS({type:"hermes/commands/save",entry_id:t,command:s})}(this.hass,e,this._editing),this._editing=null,this._flagSaved(),await this._load())},this._onDeleteCommand=async e=>{const t=this._selectedEntry;this.hass&&t&&e.id&&(await function(e,t,s){return e.callWS({type:"hermes/commands/remove",entry_id:t,command_id:s})}(this.hass,t,e.id),this._flagSaved(),await this._load())}}setConfig(e){this._config=e,e?.tab&&Ue.includes(e.tab)&&(this._tab=e.tab)}getCardSize(){return 12}firstUpdated(){let e=this.parentElement;for(;e;){if("HUI-PANEL-VIEW"===e.tagName){this.setAttribute("panel-mode","");break}e=e.parentElement}}updated(){this.hass&&!this._loaded&&(this._loaded=!0,this._load())}async _load(e=0){if(this.hass){try{const e=await(t=this.hass,t.callWS({type:"hermes/entries/list"}));this._entries=e,this._loadError=null,!this._selectedEntry&&e.length&&(this._selectedEntry=e[0].entry_id)}catch(t){if(e<3)return void window.setTimeout(()=>{this._load(e+1)},500*(e+1));this._loadError=String(t?.message??t),console.error("Hermes: failed to load gateways",t)}var t,s;try{this._nodes=await function(e){return e.callWS({type:"hermes/nodes/list"})}(this.hass)}catch(e){console.error("Hermes: failed to load nodes",e)}try{s=await function(e){return e.callWS({type:"hermes/actions"})}(this.hass),s?.by_type&&(Ae=s.by_type),s?.domain_to_type&&(ke=s.domain_to_type),s?.generic&&(Se=s.generic)}catch(e){console.warn("Hermes: using the built-in action catalogue",e)}try{this._settings=await function(e){return e.callWS({type:"hermes/settings/get"})}(this.hass)}catch{this._settings=null}}}_flagSaved(){this._saved=!0,window.setTimeout(()=>{this._saved=!1},2e3)}_select(e){this._tab=e}_screen(e){const t=this.hass;switch(this._tab){case"status":default:return Oe(t,e);case"devices":return function(e,t){const s=xe(e);return s.length?W`
    <h2 class="screen-title">${t("devices.title")}</h2>
    <div class="grid">
      ${s.map(e=>W`
          <div class="panel">
            <div class="node-head">
              <span class="node-name">${e.name}</span>
              <span class="node-num"
                >${e.nodeNum??t("devices.unknown")}</span
              >
            </div>
            <div class="rows">
              ${Object.entries(e.values).map(([e,t])=>W`
                  <div class="row">
                    <span class="k">${e}</span>
                    <span class="v">${function(e){const t=e.attributes?.unit_of_measurement;return t?`${e.state} ${t}`:e.state}(t)}</span>
                  </div>
                `)}
            </div>
          </div>
        `)}
    </div>
  `:W`<div class="empty">${t("devices.empty")}</div>`}(t,e);case"map":return De(e("tab.map"),3,e);case"messages":return Me({hass:t,entries:this._entries,selectedEntry:this._selectedEntry,editing:this._editing,loadError:this._loadError,entityIds:Object.keys(t.states).sort(),paletteEntity:this._paletteEntity,paletteValues:this._paletteValues,showAdvanced:this._showAdvanced,onSelectEntry:this._onSelectEntry,onNew:this._onNew,onEdit:this._onEdit,onDelete:this._onDeleteCommand,onDraftInput:this._onDraftInput,onPaletteEntity:this._onPaletteEntity,onPaletteValue:this._onPaletteValue,onInsert:this._onInsert,onToggleAdvanced:this._onToggleAdvanced,onSave:this._onSaveCommand,onCancel:this._onCancel},e);case"homeassistant":return De(e("tab.homeassistant"),4,e);case"settings":return Ie({settings:this._settings,entries:this._entries,nodes:this._nodes,saved:this._saved,loadError:this._loadError,draftGlobal:this._draftGlobal,draftEntries:this._draftEntries,onGlobalInput:this._onGlobalInput,onEntryInput:this._onEntryInput,onSaveGlobal:this._onSaveGlobal,onSaveEntry:this._onSaveEntry},e)}}render(){if(!this.hass||!this._config)return W``;const e=function(e){const t=(e?.locale?.language||e?.language||"en").split("-")[0].toLowerCase(),s=he[t]||ue;return e=>s[e]??ue[e]??e}(this.hass);return W`
      <div class="shell">
        <div class="topbar">
          <div class="brand">
            <span class="dot"></span>
            <span>Hermes</span>
            <span class="sub">Meshtastic Commander</span>
          </div>
        </div>

        <div class="tabs" role="tablist">
          ${Ue.map(t=>W`
              <button
                class="tab"
                role="tab"
                aria-selected=${this._tab===t?"true":"false"}
                @click=${()=>this._select(t)}
              >
                ${e(`tab.${t}`)}
              </button>
            `)}
        </div>

        <div class="content">${this._screen(e)}</div>
      </div>
    `}};je.styles=[ge,ve],e([pe({attribute:!1})],je.prototype,"hass",void 0),e([me()],je.prototype,"_config",void 0),e([me()],je.prototype,"_tab",void 0),e([me()],je.prototype,"_entries",void 0),e([me()],je.prototype,"_nodes",void 0),e([me()],je.prototype,"_settings",void 0),e([me()],je.prototype,"_saved",void 0),e([me()],je.prototype,"_draftGlobal",void 0),e([me()],je.prototype,"_draftEntries",void 0),e([me()],je.prototype,"_selectedEntry",void 0),e([me()],je.prototype,"_editing",void 0),e([me()],je.prototype,"_loadError",void 0),e([me()],je.prototype,"_paletteEntity",void 0),e([me()],je.prototype,"_paletteValues",void 0),e([me()],je.prototype,"_showAdvanced",void 0),je=e([(e=>(t,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)})("hermes-card")],je),window.customCards=window.customCards||[],window.customCards.push({type:"hermes-card",name:"Hermes",description:"Meshtastic Commander control panel",preview:!1}),console.info("%c HERMES-CARD %c 0.3.1 ","background:#FFD60A;color:#000","");export{je as HermesCard};
