function e(e,t,s,i){var a,n=arguments.length,o=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,s,i);else for(var r=e.length-1;r>=0;r--)(a=e[r])&&(o=(n<3?a(o):n>3?a(t,s,o):a(t,s))||o);return n>3&&o&&Object.defineProperty(t,s,o),o}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,s=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),a=new WeakMap;let n=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(s&&void 0===e){const s=void 0!==t&&1===t.length;s&&(e=a.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&a.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,s,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[i+1],e[0]);return new n(s,e,i)},r=s?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,u=globalThis,g=u.trustedTypes,v=g?g.emptyScript:"",f=u.reactiveElementPolyfillSupport,y=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?v:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},_=(e,t)=>!l(e,t),$={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:_};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);void 0!==i&&d(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:a}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const n=i?.call(this);a?.call(this,t),this.requestUpdate(e,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=m(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const s of t)this.createProperty(s,e[s])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const s=this._$Eu(e,t);void 0!==s&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Eu(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(s)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const s of i){const i=document.createElement("style"),a=t.litNonce;void 0!==a&&i.setAttribute("nonce",a),i.textContent=s.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(void 0!==i&&!0===s.reflect){const a=(void 0!==s.converter?.toAttribute?s.converter:b).toAttribute(t,s.type);this._$Em=e,null==a?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(e,t){const s=this.constructor,i=s._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=s.getPropertyOptions(i),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=i;const n=a.fromAttribute(t,e.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(e,t,s,i=!1,a){if(void 0!==e){const n=this.constructor;if(!1===i&&(a=this[e]),s??=n.getPropertyOptions(e),!((s.hasChanged??_)(a,t)||s.useDefault&&s.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:a},n){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==a||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,s]of e){const{wrapped:e}=s,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,s,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[y("elementProperties")]=new Map,w[y("finalized")]=new Map,f?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,A=e=>e,E=x.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:e=>e}):void 0,k="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,N="?"+C,H=`<${N}>`,M=document,z=()=>M.createComment(""),D=e=>null===e||"object"!=typeof e&&"function"!=typeof e,P=Array.isArray,O="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,I=/>/g,R=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,G=/"/g,L=/^(?:script|style|textarea|title)$/i,W=(e=>(t,...s)=>({_$litType$:e,strings:t,values:s}))(1),B=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),q=new WeakMap,V=M.createTreeWalker(M,129);function F(e,t){if(!P(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const J=(e,t)=>{const s=e.length-1,i=[];let a,n=2===t?"<svg>":3===t?"<math>":"",o=T;for(let t=0;t<s;t++){const s=e[t];let r,l,d=-1,c=0;for(;c<s.length&&(o.lastIndex=c,l=o.exec(s),null!==l);)c=o.lastIndex,o===T?"!--"===l[1]?o=U:void 0!==l[1]?o=I:void 0!==l[2]?(L.test(l[2])&&(a=RegExp("</"+l[2],"g")),o=R):void 0!==l[3]&&(o=R):o===R?">"===l[0]?(o=a??T,d=-1):void 0===l[1]?d=-2:(d=o.lastIndex-l[2].length,r=l[1],o=void 0===l[3]?R:'"'===l[3]?G:j):o===G||o===j?o=R:o===U||o===I?o=T:(o=R,a=void 0);const h=o===R&&e[t+1].startsWith("/>")?" ":"";n+=o===T?s+H:d>=0?(i.push(r),s.slice(0,d)+k+s.slice(d)+C+h):s+C+(-2===d?t:h)}return[F(e,n+(e[s]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class Z{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let a=0,n=0;const o=e.length-1,r=this.parts,[l,d]=J(e,t);if(this.el=Z.createElement(l,s),V.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=V.nextNode())&&r.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(k)){const t=d[n++],s=i.getAttribute(e).split(C),o=/([.?@])?(.*)/.exec(t);r.push({type:1,index:a,name:o[2],strings:s,ctor:"."===o[1]?te:"?"===o[1]?se:"@"===o[1]?ie:ee}),i.removeAttribute(e)}else e.startsWith(C)&&(r.push({type:6,index:a}),i.removeAttribute(e));if(L.test(i.tagName)){const e=i.textContent.split(C),t=e.length-1;if(t>0){i.textContent=E?E.emptyScript:"";for(let s=0;s<t;s++)i.append(e[s],z()),V.nextNode(),r.push({type:2,index:++a});i.append(e[t],z())}}}else if(8===i.nodeType)if(i.data===N)r.push({type:2,index:a});else{let e=-1;for(;-1!==(e=i.data.indexOf(C,e+1));)r.push({type:7,index:a}),e+=C.length-1}a++}}static createElement(e,t){const s=M.createElement("template");return s.innerHTML=e,s}}function Q(e,t,s=e,i){if(t===B)return t;let a=void 0!==i?s._$Co?.[i]:s._$Cl;const n=D(t)?void 0:t._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),void 0===n?a=void 0:(a=new n(e),a._$AT(e,s,i)),void 0!==i?(s._$Co??=[])[i]=a:s._$Cl=a),void 0!==a&&(t=Q(e,a._$AS(e,t.values),a,i)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??M).importNode(t,!0);V.currentNode=i;let a=V.nextNode(),n=0,o=0,r=s[0];for(;void 0!==r;){if(n===r.index){let t;2===r.type?t=new Y(a,a.nextSibling,this,e):1===r.type?t=new r.ctor(a,r.name,r.strings,this,e):6===r.type&&(t=new ae(a,this,e)),this._$AV.push(t),r=s[++o]}n!==r?.index&&(a=V.nextNode(),n++)}return V.currentNode=M,i}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),D(e)?e===K||null==e||""===e?(this._$AH!==K&&this._$AR(),this._$AH=K):e!==this._$AH&&e!==B&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>P(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==K&&D(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,i="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=Z.createElement(F(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new X(i,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=q.get(e.strings);return void 0===t&&q.set(e.strings,t=new Z(e)),t}k(e){P(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const a of e)i===t.length?t.push(s=new Y(this.O(z()),this.O(z()),this,this.options)):s=t[i],s._$AI(a),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=A(e).nextSibling;A(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,a){this.type=1,this._$AH=K,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=a,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=K}_$AI(e,t=this,s,i){const a=this.strings;let n=!1;if(void 0===a)e=Q(this,e,t,0),n=!D(e)||e!==this._$AH&&e!==B,n&&(this._$AH=e);else{const i=e;let o,r;for(e=a[0],o=0;o<a.length-1;o++)r=Q(this,i[s+o],t,o),r===B&&(r=this._$AH[o]),n||=!D(r)||r!==this._$AH[o],r===K?e=K:e!==K&&(e+=(r??"")+a[o+1]),this._$AH[o]=r}n&&!i&&this.j(e)}j(e){e===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===K?void 0:e}}class se extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==K)}}class ie extends ee{constructor(e,t,s,i,a){super(e,t,s,i,a),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??K)===B)return;const s=this._$AH,i=e===K&&s!==K||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,a=e!==K&&(s===K||i);i&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ae{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const ne=x.litHtmlPolyfillSupport;ne?.(Z,Y),(x.litHtmlVersions??=[]).push("3.3.3");const oe=globalThis;class re extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,s)=>{const i=s?.renderBefore??t;let a=i._$litPart$;if(void 0===a){const e=s?.renderBefore??null;i._$litPart$=a=new Y(t.insertBefore(z(),e),e,void 0,s??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}re._$litElement$=!0,re.finalized=!0,oe.litElementHydrateSupport?.({LitElement:re});const le=oe.litElementPolyfillSupport;le?.({LitElement:re}),(oe.litElementVersions??=[]).push("4.2.2");const de={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:_},ce=(e=de,t,s)=>{const{kind:i,metadata:a}=s;let n=globalThis.litPropertyMetadata.get(a);if(void 0===n&&globalThis.litPropertyMetadata.set(a,n=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),n.set(s.name,e),"accessor"===i){const{name:i}=s;return{set(s){const a=t.get.call(this);t.set.call(this,s),this.requestUpdate(i,a,e,!0,s)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=s;return function(s){const a=this[i];t.call(this,s),this.requestUpdate(i,a,e,!0,s)}}throw Error("Unsupported decorator location: "+i)};function he(e){return(t,s)=>"object"==typeof s?ce(e,t,s):((e,t,s)=>{const i=t.hasOwnProperty(s);return t.constructor.createProperty(s,e),i?Object.getOwnPropertyDescriptor(t,s):void 0})(e,t,s)}function pe(e){return he({...e,state:!0,attribute:!1})}const me={"tab.status":"Status","tab.devices":"Devices","tab.map":"Map","tab.messages":"Messages","tab.homeassistant":"Home Assistant","tab.settings":"Settings","status.title":"Status","status.nodes":"Nodes","status.commands":"Configured commands","status.executed":"Executed today","status.lastCommand":"Last command","status.lastError":"Last error","status.none":"None","status.noIntegration":"No Hermes entities found. Add the integration first.","devices.title":"Devices","devices.empty":"No Meshtastic devices found. Set up the Meshtastic integration first.","devices.unknown":"Unknown","settings.title":"Settings","settings.global":"Global","settings.owmKey":"OpenWeather API key","settings.owmHint":"Used for the weather layer on the map. Stored in Home Assistant, never in the repository.","settings.gateway":"Gateway node","settings.mode":"Mode","settings.channel":"Channel","settings.initialDelay":"Initial delay (s)","settings.partDelay":"Delay between parts (s)","settings.authorizedNodes":"Authorized nodes","settings.mapNodes":"Nodes shown on the map","messages.title":"Messages","messages.gateway":"Gateway","messages.add":"Add message","messages.empty":"No commands configured yet.","messages.keyword":"Keyword","messages.matchType":"Match type","messages.service":"Service (domain.service)","messages.serviceHint":"Optional. Leave empty for a command that only replies.","messages.target":"Target entity","messages.targetHint":"The entity the service acts on. Leave empty if the service needs none.","messages.replyHint":"Optional. Use {state:entity_id} or {attr:entity_id:attribute}.","messages.replyTemplate":"Reply template","messages.replyTo":"Reply routing","messages.exact":"Exact match","messages.startswith":"Starts with","messages.onChannel":"On the channel","messages.senderDm":"DM to sender","messages.confirmDelete":"Delete this command?","common.comingSoon":"Coming in the next build phase.","common.phase":"Phase","common.save":"Save","common.cancel":"Cancel","common.edit":"Edit","common.delete":"Delete","common.loading":"Loading","common.saved":"Saved","common.noEntries":"No Hermes gateway configured yet."},ue={en:me,it:{"tab.status":"Status","tab.devices":"Dispositivi","tab.map":"Mappa","tab.messages":"Messaggi","tab.homeassistant":"Home Assistant","tab.settings":"Impostazioni","status.title":"Status","status.nodes":"Nodi","status.commands":"Comandi configurati","status.executed":"Eseguiti oggi","status.lastCommand":"Ultimo comando","status.lastError":"Ultimo errore","status.none":"Nessuno","status.noIntegration":"Nessuna entità Hermes trovata. Aggiungi prima l'integrazione.","devices.title":"Dispositivi","devices.empty":"Nessun dispositivo Meshtastic trovato. Configura prima l'integrazione Meshtastic.","devices.unknown":"Sconosciuto","settings.title":"Impostazioni","settings.global":"Globali","settings.owmKey":"Chiave API OpenWeather","settings.owmHint":"Usata per il livello meteo sulla mappa. Salvata in Home Assistant, mai nel repository.","settings.gateway":"Nodo gateway","settings.mode":"Modalità","settings.channel":"Canale","settings.initialDelay":"Attesa iniziale (s)","settings.partDelay":"Pausa tra le parti (s)","settings.authorizedNodes":"Nodi autorizzati","settings.mapNodes":"Nodi mostrati sulla mappa","messages.title":"Messaggi","messages.gateway":"Gateway","messages.add":"Aggiungi messaggio","messages.empty":"Nessun comando configurato.","messages.keyword":"Parola chiave","messages.matchType":"Tipo di match","messages.service":"Servizio (dominio.servizio)","messages.serviceHint":"Opzionale. Lascia vuoto per un comando che risponde soltanto.","messages.target":"Entità target","messages.targetHint":"L'entità su cui agisce il servizio. Lascia vuoto se il servizio non ne richiede.","messages.replyHint":"Opzionale. Usa {state:entity_id} oppure {attr:entity_id:attributo}.","messages.replyTemplate":"Template di risposta","messages.replyTo":"Instradamento risposta","messages.exact":"Match esatto","messages.startswith":"Inizia con","messages.onChannel":"Sul canale","messages.senderDm":"DM al mittente","messages.confirmDelete":"Eliminare questo comando?","common.comingSoon":"In arrivo nella prossima fase di sviluppo.","common.phase":"Fase","common.save":"Salva","common.cancel":"Annulla","common.edit":"Modifica","common.delete":"Elimina","common.loading":"Caricamento","common.saved":"Salvato","common.noEntries":"Nessun gateway Hermes configurato."},es:{"tab.status":"Estado","tab.devices":"Dispositivos","tab.map":"Mapa","tab.messages":"Mensajes","tab.homeassistant":"Home Assistant","tab.settings":"Ajustes","status.title":"Estado","status.nodes":"Nodos","status.commands":"Comandos configurados","status.executed":"Ejecutados hoy","status.lastCommand":"Último comando","status.lastError":"Último error","status.none":"Ninguno","status.noIntegration":"No se han encontrado entidades de Hermes. Añade primero la integración.","devices.title":"Dispositivos","devices.empty":"No se han encontrado dispositivos Meshtastic. Configura primero la integración Meshtastic.","devices.unknown":"Desconocido","settings.title":"Ajustes","settings.global":"Globales","settings.owmKey":"Clave API de OpenWeather","settings.owmHint":"Se usa para la capa meteorológica del mapa. Guardada en Home Assistant, nunca en el repositorio.","settings.gateway":"Nodo de puerta de enlace","settings.mode":"Modo","settings.channel":"Canal","settings.initialDelay":"Retardo inicial (s)","settings.partDelay":"Retardo entre partes (s)","settings.authorizedNodes":"Nodos autorizados","settings.mapNodes":"Nodos mostrados en el mapa","messages.title":"Mensajes","messages.gateway":"Puerta de enlace","messages.add":"Añadir mensaje","messages.empty":"Todavía no hay comandos configurados.","messages.keyword":"Palabra clave","messages.matchType":"Tipo de coincidencia","messages.service":"Servicio (dominio.servicio)","messages.serviceHint":"Opcional. Déjalo vacío para un comando que solo responde.","messages.target":"Entidad de destino","messages.targetHint":"La entidad sobre la que actúa el servicio. Déjalo vacío si el servicio no la necesita.","messages.replyHint":"Opcional. Usa {state:entity_id} o {attr:entity_id:attribute}.","messages.replyTemplate":"Plantilla de respuesta","messages.replyTo":"Enrutamiento de respuesta","messages.exact":"Coincidencia exacta","messages.startswith":"Empieza por","messages.onChannel":"En el canal","messages.senderDm":"DM al remitente","messages.confirmDelete":"¿Eliminar este comando?","common.comingSoon":"Llegará en la próxima fase de desarrollo.","common.phase":"Fase","common.save":"Guardar","common.cancel":"Cancelar","common.edit":"Editar","common.delete":"Eliminar","common.loading":"Cargando","common.saved":"Guardado","common.noEntries":"Todavía no hay ninguna puerta de enlace Hermes configurada."},fr:{"tab.status":"État","tab.devices":"Appareils","tab.map":"Carte","tab.messages":"Messages","tab.homeassistant":"Home Assistant","tab.settings":"Paramètres","status.title":"État","status.nodes":"Nœuds","status.commands":"Commandes configurées","status.executed":"Exécutées aujourd'hui","status.lastCommand":"Dernière commande","status.lastError":"Dernière erreur","status.none":"Aucun","status.noIntegration":"Aucune entité Hermes trouvée. Ajoutez d'abord l'intégration.","devices.title":"Appareils","devices.empty":"Aucun appareil Meshtastic trouvé. Configurez d'abord l'intégration Meshtastic.","devices.unknown":"Inconnu","settings.title":"Paramètres","settings.global":"Globaux","settings.owmKey":"Clé API OpenWeather","settings.owmHint":"Utilisée pour la couche météo de la carte. Stockée dans Home Assistant, jamais dans le dépôt.","settings.gateway":"Nœud passerelle","settings.mode":"Mode","settings.channel":"Canal","settings.initialDelay":"Délai initial (s)","settings.partDelay":"Délai entre les parties (s)","settings.authorizedNodes":"Nœuds autorisés","settings.mapNodes":"Nœuds affichés sur la carte","messages.title":"Messages","messages.gateway":"Passerelle","messages.add":"Ajouter un message","messages.empty":"Aucune commande configurée pour le moment.","messages.keyword":"Mot-clé","messages.matchType":"Type de correspondance","messages.service":"Service (domaine.service)","messages.serviceHint":"Facultatif. Laissez vide pour une commande qui répond seulement.","messages.target":"Entité cible","messages.targetHint":"L'entité sur laquelle agit le service. Laissez vide si le service n'en a pas besoin.","messages.replyHint":"Facultatif. Utilisez {state:entity_id} ou {attr:entity_id:attribute}.","messages.replyTemplate":"Modèle de réponse","messages.replyTo":"Routage de la réponse","messages.exact":"Correspondance exacte","messages.startswith":"Commence par","messages.onChannel":"Sur le canal","messages.senderDm":"DM à l'expéditeur","messages.confirmDelete":"Supprimer cette commande ?","common.comingSoon":"Arrive dans la prochaine phase de développement.","common.phase":"Phase","common.save":"Enregistrer","common.cancel":"Annuler","common.edit":"Modifier","common.delete":"Supprimer","common.loading":"Chargement","common.saved":"Enregistré","common.noEntries":"Aucune passerelle Hermes configurée pour le moment."},de:{"tab.status":"Status","tab.devices":"Geräte","tab.map":"Karte","tab.messages":"Nachrichten","tab.homeassistant":"Home Assistant","tab.settings":"Einstellungen","status.title":"Status","status.nodes":"Nodes","status.commands":"Konfigurierte Befehle","status.executed":"Heute ausgeführt","status.lastCommand":"Letzter Befehl","status.lastError":"Letzter Fehler","status.none":"Keine","status.noIntegration":"Keine Hermes-Entitäten gefunden. Füge zuerst die Integration hinzu.","devices.title":"Geräte","devices.empty":"Keine Meshtastic-Geräte gefunden. Richte zuerst die Meshtastic-Integration ein.","devices.unknown":"Unbekannt","settings.title":"Einstellungen","settings.global":"Global","settings.owmKey":"OpenWeather-API-Schlüssel","settings.owmHint":"Wird für die Wetterebene der Karte verwendet. In Home Assistant gespeichert, nie im Repository.","settings.gateway":"Gateway-Node","settings.mode":"Modus","settings.channel":"Kanal","settings.initialDelay":"Anfängliche Verzögerung (s)","settings.partDelay":"Verzögerung zwischen Teilen (s)","settings.authorizedNodes":"Autorisierte Nodes","settings.mapNodes":"Auf der Karte angezeigte Nodes","messages.title":"Nachrichten","messages.gateway":"Gateway","messages.add":"Nachricht hinzufügen","messages.empty":"Noch keine Befehle konfiguriert.","messages.keyword":"Schlüsselwort","messages.matchType":"Übereinstimmungstyp","messages.service":"Dienst (domain.service)","messages.serviceHint":"Optional. Leer lassen für einen Befehl, der nur antwortet.","messages.target":"Ziel-Entität","messages.targetHint":"Die Entität, auf die der Dienst wirkt. Leer lassen, wenn der Dienst keine benötigt.","messages.replyHint":"Optional. Verwende {state:entity_id} oder {attr:entity_id:attribute}.","messages.replyTemplate":"Antwortvorlage","messages.replyTo":"Antwort-Routing","messages.exact":"Exakte Übereinstimmung","messages.startswith":"Beginnt mit","messages.onChannel":"Auf dem Kanal","messages.senderDm":"DM an Absender","messages.confirmDelete":"Diesen Befehl löschen?","common.comingSoon":"Kommt in der nächsten Ausbaustufe.","common.phase":"Phase","common.save":"Speichern","common.cancel":"Abbrechen","common.edit":"Bearbeiten","common.delete":"Löschen","common.loading":"Wird geladen","common.saved":"Gespeichert","common.noEntries":"Noch kein Hermes-Gateway konfiguriert."}};const ge=o`
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
`,fe="meshtastic",ye="hermes";function be(e,t){const s=e.entities;return s?Object.values(s).filter(e=>e.platform===t):Object.keys(e.states).filter(e=>e.includes(t)).map(e=>({entity_id:e,platform:t}))}function _e(e,t){for(const s of be(e,ye))if(s.entity_id.endsWith(t)){const t=e.states[s.entity_id];if(t)return t}}function $e(e,t){const s=e.devices?.[t];if(!s?.identifiers)return null;for(const e of s.identifiers)if(e?.[0]===fe){const t=Number.parseInt(String(e[1]),10);return Number.isNaN(t)?null:t}return null}function we(e){const t=(e.split(".")[1]??e).split("_");return t.slice(Math.max(t.length-2,0)).join(" ")}function xe(e){const t=new Map;for(const s of be(e,fe)){const i=s.device_id;if(!i)continue;const a=e.states[s.entity_id];if(!a)continue;let n=t.get(i);if(!n){const s=e.devices?.[i];n={deviceId:i,nodeNum:$e(e,i),name:s?.name_by_user||s?.name||a.attributes?.friendly_name||i,values:{}},t.set(i,n)}n.values[we(s.entity_id)]=a}return[...t.values()].sort((e,t)=>e.name.localeCompare(t.name))}function Ae(e,t){if(!e.entries.length)return W`<div class="empty">${t("common.noEntries")}</div>`;const s=e.entries.find(t=>t.entry_id===e.selectedEntry)??e.entries[0];return W`
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

    ${e.editing?function(e,t,s){const i=t=>s=>e.onDraftInput(t,s.target.value);return W`
    <div class="panel">
      <div class="field">
        <label>${s("messages.keyword")}</label>
        <input .value=${t.keyword??""} @input=${i("keyword")} />
      </div>

      <div class="field">
        <label>${s("messages.matchType")}</label>
        <select @change=${i("match_type")}>
          <option value="exact" ?selected=${"exact"===t.match_type}>
            ${s("messages.exact")}
          </option>
          <option value="startswith" ?selected=${"startswith"===t.match_type}>
            ${s("messages.startswith")}
          </option>
        </select>
      </div>

      <div class="field">
        <label>${s("messages.service")}</label>
        <input
          .value=${t.service??""}
          placeholder="light.turn_off"
          @input=${i("service")}
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
        <datalist id="hermes-entities">
          ${e.entityIds.map(e=>W`<option value=${e}></option>`)}
        </datalist>
        <span class="hint">${s("messages.targetHint")}</span>
      </div>

      <div class="field">
        <label>${s("messages.replyTemplate")}</label>
        <textarea
          .value=${t.reply_template??""}
          placeholder="{state:sensor.living_room_temp}"
          @input=${i("reply_template")}
        ></textarea>
        <span class="hint">${s("messages.replyHint")}</span>
      </div>

      <div class="field">
        <label>${s("messages.replyTo")}</label>
        <select @change=${i("reply_to")}>
          <option value="channel" ?selected=${"channel"===t.reply_to}>
            ${s("messages.onChannel")}
          </option>
          <option value="sender_dm" ?selected=${"sender_dm"===t.reply_to}>
            ${s("messages.senderDm")}
          </option>
        </select>
      </div>

      <div class="actions">
        <button class="btn primary" @click=${e.onSave}>
          ${s("common.save")}
        </button>
        <button class="btn" @click=${e.onCancel}>${s("common.cancel")}</button>
      </div>
    </div>
  `}(e,e.editing,t):W`
          ${s.commands.length?s.commands.map(s=>function(e,t,s){return W`
    <div class="list-row">
      <div class="meta">
        <span class="kw">${t.keyword}</span>
        <span class="sub">${t.service}</span>
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
  `}function Ee(e,t,s){return W`
    <h2 class="screen-title">${e}</h2>
    <div class="empty">
      <div class="badge">${s("common.phase")} ${t}</div>
      <p>${s("common.comingSoon")}</p>
    </div>
  `}function Se(e){return[...e.target.selectedOptions].map(e=>Number(e.value))}function ke(e,t){return e.map(e=>W`
      <option value=${e.node_num} ?selected=${t.includes(e.node_num)}>
        ${e.name} (${e.node_num})
      </option>
    `)}function Ce(e,t){const s=e.settings,i=t=>e.draftGlobal[t]??s?.[t];return W`
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
            .value=${String(i("openweather_api_key")??"")}
            @input=${t=>e.onGlobalInput("openweather_api_key",t.target.value)}
          />
          <span class="hint">${t("settings.owmHint")}</span>
        </div>

        <div class="field">
          <label for="mapnodes">${t("settings.mapNodes")}</label>
          <select
            id="mapnodes"
            multiple
            @change=${t=>e.onGlobalInput("map_nodes",Se(t))}
          >
            ${ke(e.nodes,i("map_nodes")??[])}
          </select>
        </div>

        <div class="actions">
          <button class="btn primary" @click=${e.onSaveGlobal}>
            ${t("common.save")}
          </button>
        </div>
      </div>
    </div>

    ${0===e.entries.length?W`<div class="empty">${t("common.noEntries")}</div>`:e.entries.map(s=>function(e,t,s){const i=e.draftEntries[t.entry_id]??{},a=(e,t)=>i[e]??t;return W`
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
            .value=${String(a("initial_delay",t.initial_delay))}
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
            .value=${String(a("part_delay",t.part_delay))}
            @input=${s=>e.onEntryInput(t.entry_id,"part_delay",Number(s.target.value))}
          />
        </div>

        <div class="field">
          <label>${s("settings.authorizedNodes")}</label>
          <select
            multiple
            @change=${s=>e.onEntryInput(t.entry_id,"authorized_nodes",Se(s))}
          >
            ${ke(e.nodes,a("authorized_nodes",t.authorized_nodes)??[])}
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
  `}function Ne(e,t){if(!function(e){return be(e,ye).length>0}(e))return W`<div class="empty">${t("status.noIntegration")}</div>`;const s=xe(e),i=_e(e,"commands_executed"),a=_e(e,"last_command"),n=_e(e,"last_error"),o=e=>e&&"unknown"!==e&&"unavailable"!==e?e:t("status.none");return W`
    <h2 class="screen-title">${t("status.title")}</h2>
    <div class="grid">
      <div class="panel stat">
        <div class="label">${t("status.nodes")}</div>
        <div class="value">${s.length}</div>
      </div>
      <div class="panel stat">
        <div class="label">${t("status.executed")}</div>
        <div class="value">${i?i.state:"0"}</div>
      </div>
      <div class="panel stat">
        <div class="label">${t("status.lastCommand")}</div>
        <div class="value small">${o(a?.state)}</div>
      </div>
      <div class="panel stat">
        <div class="label">${t("status.lastError")}</div>
        <div class="value small">${o(n?.state)}</div>
      </div>
    </div>
  `}function He(e){return e.callWS({type:"hermes/nodes/list"})}const Me=["status","devices","map","messages","homeassistant","settings"],ze={keyword:"",match_type:"exact",service:"",reply_template:"",reply_to:"channel"};let De=class extends re{constructor(){super(...arguments),this._tab="status",this._entries=[],this._nodes=[],this._settings=null,this._saved=!1,this._draftGlobal={},this._draftEntries={},this._selectedEntry=null,this._editing=null,this._loaded=!1,this._onGlobalInput=(e,t)=>{this._draftGlobal={...this._draftGlobal,[e]:t}},this._onEntryInput=(e,t,s)=>{this._draftEntries={...this._draftEntries,[e]:{...this._draftEntries[e]??{},[t]:s}}},this._onSaveGlobal=async()=>{var e,t;this.hass&&Object.keys(this._draftGlobal).length&&(this._settings=await(e=this.hass,t=this._draftGlobal,e.callWS({type:"hermes/settings/update",patch:t})),this._draftGlobal={},this._flagSaved())},this._onSaveEntry=async e=>{const t=this._draftEntries[e];this.hass&&t&&Object.keys(t).length&&(await function(e,t,s){return e.callWS({type:"hermes/entry/update",entry_id:t,patch:s})}(this.hass,e,t),this._draftEntries={...this._draftEntries,[e]:{}},this._flagSaved(),await this._load())},this._onSelectEntry=e=>{this._selectedEntry=e,this._editing=null},this._onNew=()=>{this._editing={...ze}},this._onEdit=e=>{this._editing={...e}},this._onDraftInput=(e,t)=>{this._editing&&(this._editing={...this._editing,[e]:t})},this._onCancel=()=>{this._editing=null},this._onSaveCommand=async()=>{const e=this._selectedEntry;if(!this.hass||!e||!this._editing)return;const t=Boolean(this._editing.service)||Boolean(this._editing.reply_template);this._editing.keyword&&t&&(await function(e,t,s){return e.callWS({type:"hermes/commands/save",entry_id:t,command:s})}(this.hass,e,this._editing),this._editing=null,this._flagSaved(),await this._load())},this._onDeleteCommand=async e=>{const t=this._selectedEntry;this.hass&&t&&e.id&&(await function(e,t,s){return e.callWS({type:"hermes/commands/remove",entry_id:t,command_id:s})}(this.hass,t,e.id),this._flagSaved(),await this._load())}}setConfig(e){this._config=e,e?.tab&&Me.includes(e.tab)&&(this._tab=e.tab)}getCardSize(){return 12}firstUpdated(){let e=this.parentElement;for(;e;){if("HUI-PANEL-VIEW"===e.tagName){this.setAttribute("panel-mode","");break}e=e.parentElement}}updated(){this.hass&&!this._loaded&&(this._loaded=!0,this._load())}async _load(){if(this.hass){try{const[t,s]=await Promise.all([(e=this.hass,e.callWS({type:"hermes/entries/list"})),He(this.hass)]);this._entries=t,this._nodes=s,!this._selectedEntry&&t.length&&(this._selectedEntry=t[0].entry_id)}catch(e){console.error("Hermes: failed to load entries or nodes",e)}var e;try{this._settings=await function(e){return e.callWS({type:"hermes/settings/get"})}(this.hass)}catch{this._settings=null}}}_flagSaved(){this._saved=!0,window.setTimeout(()=>{this._saved=!1},2e3)}_select(e){this._tab=e}_screen(e){const t=this.hass;switch(this._tab){case"status":default:return Ne(t,e);case"devices":return function(e,t){const s=xe(e);return s.length?W`
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
  `:W`<div class="empty">${t("devices.empty")}</div>`}(t,e);case"map":return Ee(e("tab.map"),3,e);case"messages":return Ae({entries:this._entries,selectedEntry:this._selectedEntry,editing:this._editing,entityIds:Object.keys(t.states).sort(),onSelectEntry:this._onSelectEntry,onNew:this._onNew,onEdit:this._onEdit,onDelete:this._onDeleteCommand,onDraftInput:this._onDraftInput,onSave:this._onSaveCommand,onCancel:this._onCancel},e);case"homeassistant":return Ee(e("tab.homeassistant"),4,e);case"settings":return Ce({settings:this._settings,entries:this._entries,nodes:this._nodes,saved:this._saved,draftGlobal:this._draftGlobal,draftEntries:this._draftEntries,onGlobalInput:this._onGlobalInput,onEntryInput:this._onEntryInput,onSaveGlobal:this._onSaveGlobal,onSaveEntry:this._onSaveEntry},e)}}render(){if(!this.hass||!this._config)return W``;const e=function(e){const t=(e?.locale?.language||e?.language||"en").split("-")[0].toLowerCase(),s=ue[t]||me;return e=>s[e]??me[e]??e}(this.hass);return W`
      <div class="shell">
        <div class="topbar">
          <div class="brand">
            <span class="dot"></span>
            <span>Hermes</span>
            <span class="sub">Meshtastic Commander</span>
          </div>
        </div>

        <div class="tabs" role="tablist">
          ${Me.map(t=>W`
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
    `}};De.styles=[ge,ve],e([he({attribute:!1})],De.prototype,"hass",void 0),e([pe()],De.prototype,"_config",void 0),e([pe()],De.prototype,"_tab",void 0),e([pe()],De.prototype,"_entries",void 0),e([pe()],De.prototype,"_nodes",void 0),e([pe()],De.prototype,"_settings",void 0),e([pe()],De.prototype,"_saved",void 0),e([pe()],De.prototype,"_draftGlobal",void 0),e([pe()],De.prototype,"_draftEntries",void 0),e([pe()],De.prototype,"_selectedEntry",void 0),e([pe()],De.prototype,"_editing",void 0),De=e([(e=>(t,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)})("hermes-card")],De),window.customCards=window.customCards||[],window.customCards.push({type:"hermes-card",name:"Hermes",description:"Meshtastic Commander control panel",preview:!1}),console.info("%c HERMES-CARD %c 0.2.1 ","background:#FFD60A;color:#000","");export{De as HermesCard};
