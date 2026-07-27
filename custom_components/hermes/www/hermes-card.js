function e(e,t,n,i){var s,a=arguments.length,o=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,i);else for(var r=e.length-1;r>=0;r--)(s=e[r])&&(o=(a<3?s(o):a>3?s(t,n,o):s(t,n))||o);return a>3&&o&&Object.defineProperty(t,n,o),o}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,n=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let a=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(n&&void 0===e){const n=void 0!==t&&1===t.length;n&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&s.set(t,e))}return e}toString(){return this.cssText}};const o=e=>new a("string"==typeof e?e:e+"",void 0,i),r=(e,...t)=>{const n=1===e.length?e[0]:t.reduce((t,n,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+e[i+1],e[0]);return new a(n,e,i)},l=n?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return o(t)})(e):e,{is:h,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:u,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,g=globalThis,f=g.trustedTypes,_=f?f.emptyScript:"",v=g.reactiveElementPolyfillSupport,y=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=null!==e;break;case Number:n=null===e?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch(e){n=null}}return n}},w=(e,t)=>!h(e,t),x={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=x){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(e,n,t);void 0!==i&&d(this.prototype,e,i)}}static getPropertyDescriptor(e,t,n){const{get:i,set:s}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const a=i?.call(this);s?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??x}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=m(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...u(e),...p(e)];for(const n of t)this.createProperty(n,e[n])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const n=this._$Eu(e,t);void 0!==n&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const e of n)t.unshift(l(e))}else void 0!==e&&t.push(l(e));return t}static _$Eu(e,t){const n=t.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(n)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const n of i){const i=document.createElement("style"),s=t.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=n.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){const n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(void 0!==i&&!0===n.reflect){const s=(void 0!==n.converter?.toAttribute?n.converter:b).toAttribute(t,n.type);this._$Em=e,null==s?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(e,t){const n=this.constructor,i=n._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=n.getPropertyOptions(i),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=i;const a=s.fromAttribute(t,e.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(e,t,n,i=!1,s){if(void 0!==e){const a=this.constructor;if(!1===i&&(s=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??w)(s,t)||n.useDefault&&n.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:i,wrapped:s},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==s||void 0!==a)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,n]of e){const{wrapped:e}=n,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,n,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[y("elementProperties")]=new Map,k[y("finalized")]=new Map,v?.({ReactiveElement:k}),(g.reactiveElementVersions??=[]).push("2.1.2");const z=globalThis,$=e=>e,P=z.trustedTypes,S=P?P.createPolicy("lit-html",{createHTML:e=>e}):void 0,T="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+C,A=`<${E}>`,M=document,H=()=>M.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,I=Array.isArray,D="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,B=/>/g,Z=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,q=/"/g,F=/^(?:script|style|textarea|title)$/i,W=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),U=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),K=new WeakMap,V=M.createTreeWalker(M,129);function Y(e,t){if(!I(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const J=(e,t)=>{const n=e.length-1,i=[];let s,a=2===t?"<svg>":3===t?"<math>":"",o=O;for(let t=0;t<n;t++){const n=e[t];let r,l,h=-1,d=0;for(;d<n.length&&(o.lastIndex=d,l=o.exec(n),null!==l);)d=o.lastIndex,o===O?"!--"===l[1]?o=R:void 0!==l[1]?o=B:void 0!==l[2]?(F.test(l[2])&&(s=RegExp("</"+l[2],"g")),o=Z):void 0!==l[3]&&(o=Z):o===Z?">"===l[0]?(o=s??O,h=-1):void 0===l[1]?h=-2:(h=o.lastIndex-l[2].length,r=l[1],o=void 0===l[3]?Z:'"'===l[3]?q:j):o===q||o===j?o=Z:o===R||o===B?o=O:(o=Z,s=void 0);const c=o===Z&&e[t+1].startsWith("/>")?" ":"";a+=o===O?n+A:h>=0?(i.push(r),n.slice(0,h)+T+n.slice(h)+C+c):n+C+(-2===h?t:c)}return[Y(e,a+(e[n]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class X{constructor({strings:e,_$litType$:t},n){let i;this.parts=[];let s=0,a=0;const o=e.length-1,r=this.parts,[l,h]=J(e,t);if(this.el=X.createElement(l,n),V.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=V.nextNode())&&r.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(T)){const t=h[a++],n=i.getAttribute(e).split(C),o=/([.?@])?(.*)/.exec(t);r.push({type:1,index:s,name:o[2],strings:n,ctor:"."===o[1]?ie:"?"===o[1]?se:"@"===o[1]?ae:ne}),i.removeAttribute(e)}else e.startsWith(C)&&(r.push({type:6,index:s}),i.removeAttribute(e));if(F.test(i.tagName)){const e=i.textContent.split(C),t=e.length-1;if(t>0){i.textContent=P?P.emptyScript:"";for(let n=0;n<t;n++)i.append(e[n],H()),V.nextNode(),r.push({type:2,index:++s});i.append(e[t],H())}}}else if(8===i.nodeType)if(i.data===E)r.push({type:2,index:s});else{let e=-1;for(;-1!==(e=i.data.indexOf(C,e+1));)r.push({type:7,index:s}),e+=C.length-1}s++}}static createElement(e,t){const n=M.createElement("template");return n.innerHTML=e,n}}function Q(e,t,n=e,i){if(t===U)return t;let s=void 0!==i?n._$Co?.[i]:n._$Cl;const a=N(t)?void 0:t._$litDirective$;return s?.constructor!==a&&(s?._$AO?.(!1),void 0===a?s=void 0:(s=new a(e),s._$AT(e,n,i)),void 0!==i?(n._$Co??=[])[i]=s:n._$Cl=s),void 0!==s&&(t=Q(e,s._$AS(e,t.values),s,i)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,i=(e?.creationScope??M).importNode(t,!0);V.currentNode=i;let s=V.nextNode(),a=0,o=0,r=n[0];for(;void 0!==r;){if(a===r.index){let t;2===r.type?t=new te(s,s.nextSibling,this,e):1===r.type?t=new r.ctor(s,r.name,r.strings,this,e):6===r.type&&(t=new oe(s,this,e)),this._$AV.push(t),r=n[++o]}a!==r?.index&&(s=V.nextNode(),a++)}return V.currentNode=M,i}p(e){let t=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,i){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),N(e)?e===G||null==e||""===e?(this._$AH!==G&&this._$AR(),this._$AH=G):e!==this._$AH&&e!==U&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>I(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==G&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:n}=e,i="number"==typeof n?this._$AC(e):(void 0===n.el&&(n.el=X.createElement(Y(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new ee(i,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=K.get(e.strings);return void 0===t&&K.set(e.strings,t=new X(e)),t}k(e){I(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,i=0;for(const s of e)i===t.length?t.push(n=new te(this.O(H()),this.O(H()),this,this.options)):n=t[i],n._$AI(s),i++;i<t.length&&(this._$AR(n&&n._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ne{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,i,s){this.type=1,this._$AH=G,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=s,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=G}_$AI(e,t=this,n,i){const s=this.strings;let a=!1;if(void 0===s)e=Q(this,e,t,0),a=!N(e)||e!==this._$AH&&e!==U,a&&(this._$AH=e);else{const i=e;let o,r;for(e=s[0],o=0;o<s.length-1;o++)r=Q(this,i[n+o],t,o),r===U&&(r=this._$AH[o]),a||=!N(r)||r!==this._$AH[o],r===G?e=G:e!==G&&(e+=(r??"")+s[o+1]),this._$AH[o]=r}a&&!i&&this.j(e)}j(e){e===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends ne{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===G?void 0:e}}let se=class extends ne{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==G)}};class ae extends ne{constructor(e,t,n,i,s){super(e,t,n,i,s),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??G)===U)return;const n=this._$AH,i=e===G&&n!==G||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,s=e!==G&&(n===G||i);i&&this.element.removeEventListener(this.name,this,n),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const re=z.litHtmlPolyfillSupport;re?.(X,te),(z.litHtmlVersions??=[]).push("3.3.3");const le=globalThis;class he extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,n)=>{const i=n?.renderBefore??t;let s=i._$litPart$;if(void 0===s){const e=n?.renderBefore??null;i._$litPart$=s=new te(t.insertBefore(H(),e),e,void 0,n??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return U}}he._$litElement$=!0,he.finalized=!0,le.litElementHydrateSupport?.({LitElement:he});const de=le.litElementPolyfillSupport;de?.({LitElement:he}),(le.litElementVersions??=[]).push("4.2.2");const ce=e=>(t,n)=>{void 0!==n?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ue={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:w},pe=(e=ue,t,n)=>{const{kind:i,metadata:s}=n;let a=globalThis.litPropertyMetadata.get(s);if(void 0===a&&globalThis.litPropertyMetadata.set(s,a=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),"accessor"===i){const{name:i}=n;return{set(n){const s=t.get.call(this);t.set.call(this,n),this.requestUpdate(i,s,e,!0,n)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=n;return function(n){const s=this[i];t.call(this,n),this.requestUpdate(i,s,e,!0,n)}}throw Error("Unsupported decorator location: "+i)};function me(e){return(t,n)=>"object"==typeof n?pe(e,t,n):((e,t,n)=>{const i=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),i?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function ge(e){return me({...e,state:!0,attribute:!1})}const fe={"tab.status":"Status","tab.devices":"Devices","tab.map":"Map","tab.messages":"Messages","tab.homeassistant":"Home Assistant","tab.settings":"Settings","tab.log":"Log","tab.chat":"Chat","chat.noChannels":"No channel read from the radio yet, so there is nowhere to write.","chat.emptyThread":"Nothing here yet. Write the first message.","chat.channels":"Channels","chat.direct":"Direct messages","chat.sendOn":"Send on","chat.sendTo":"Send to","chat.placeholder":"Write a message","chat.send":"Send","chat.clear":"Clear this conversation","chat.note":"Conversations are grouped by channel and by node, and cover every channel this gateway hears, not only the one commands arrive on.","ha.shared":"Hermes entities","ha.noEntities":"No Hermes entity yet. Add the integration first.","ha.connected":"Entities used by your commands","ha.noReferences":"No command references an entity yet.","ha.problems":"need attention","ha.missing":"does not exist","ha.test":"Send a test","ha.testText":"Text","ha.testPlaceholder":"Test from Home Assistant","ha.testHint":"Sends on the channel of the selected gateway, through the same path a notification takes.","ha.sendTest":"Send","log.all":"All","log.received":"Received","log.sent":"Sent","log.clear":"Clear","log.empty":"Nothing logged yet.","log.nothingReceived":"no message has reached Hermes since the last restart","status.reason.error":"failed while being handled","log.outcome.error":"failed while being handled","log.privacy":"The log keeps the text of the messages in Home Assistant storage, capped at 200 entries. Clear it whenever you want.","log.outcome.matched":"command run","log.outcome.no_match":"no command matched","log.outcome.unauthorized":"sender not authorized","log.outcome.sent":"sent","log.outcome.help":"help sent","log.outcome.rate_limited":"rate limit reached","log.outcome.other_gateway":"ignored, another gateway","log.outcome.other_target":"ignored, another channel or a direct message","log.outcome.malformed":"ignored, unexpected format","presets.title":"Quick send","presets.add":"Add preset","presets.empty":"No preset yet.","presets.label":"Label","presets.text":"Message","presets.node":"Node ID (optional)","presets.nodeHint":"Leave empty to broadcast on the channel of the gateway.","presets.send":"Send","presets.channel":"Channel","presets.channelDefault":"The gateway's own channel","presets.channelHint":"Send on a different channel without adding a second Hermes instance. Ignored when a node ID is set, since that becomes a direct message.","presets.toChannelDefault":"to the gateway channel","presets.toChannel":"to channel","presets.toNode":"to node","status.title":"Status","status.nodes":"Nodes","status.commands":"Configured commands","status.executed":"Executed today","status.lastCommand":"Last command","status.lastError":"Last error","status.none":"None","status.noIntegration":"No Hermes entities found. Add the integration first.","radioCfg.title":"Radio configuration","radioCfg.warning":"These are written to the radio itself, not to Hermes. Most of them restart the node, and the wrong region or modem preset stops it talking to every other node until they match again. Change one at a time and check the mesh after each.","radioCfg.write":"Write to the radio","radioCfg.region":"Region","radioCfg.modem_preset":"Modem preset","radioCfg.hop_limit":"Hop limit","radioCfg.tx_enabled":"Transmitting enabled","radioCfg.tx_power":"Transmit power (dBm)","radioCfg.role":"Node role","radioCfg.node_info_broadcast_secs":"Node info interval (s)","radio.title":"Gateway radio","radio.name":"Name","radio.short":"Short name","radio.hardware":"Hardware","radio.role":"Role","radio.firmware":"Firmware","radio.region":"Region","radio.preset":"Modem preset","radio.hops":"Hop limit","status.reception":"Reception","status.busEvents":"Mesh events reaching Hermes","status.versions":"Versions","status.card":"card","status.backend":"backend","status.notListening":"not subscribed","status.versionMismatch":"The card and the Python code are different versions. Python only changes on a full Home Assistant restart, so restart it: until then the old backend keeps running and receives nothing new.","status.mismatch":"nothing is getting through","status.notRunning":"not running","status.radioOfflineBadge":"radio not connected","summary.link":"Radio link","summary.linkUp":"connected","summary.received":"Messages received","summary.accepted":"Commands accepted","status.radioOffline":"The Meshtastic integration currently has no link to its node, so no message can reach Hermes and nothing can be sent. Everything else on this panel follows from that. Check the Meshtastic integration and the connection to the gateway node: an app connected straight to the radio keeps working regardless, which is why traffic still looks fine there.","status.radioConflict":"A Meshtastic node accepts one connection at a time. These integrations are also loaded and connect to a node themselves, so if one of them holds yours, the Meshtastic integration gets nothing and neither does Hermes. Remove or disconnect it, then check this panel again.","status.notRunningHint":"This gateway is configured but the integration is not running, so nothing is listening for messages. The settings below are read from storage and look fine either way. Check Settings, Devices and Services for an error on Hermes, and the Home Assistant log.","status.expects":"This gateway listens to","status.lastSeen":"Last message on the mesh","status.seenFrom":"Sent by node","status.seenResult":"Result","status.tally":"Since the last restart","status.updatedAt":"updated at","status.nothingSeen":"nothing seen yet","status.nodeUnknown":"unknown","status.reason.received":"reached Hermes","status.reason.malformed":"arrived in an unexpected shape","status.reason.accepted":"accepted","status.reason.other_gateway":"arrived through a different gateway","status.reason.other_target":"arrived on a different channel or as a direct message","status.hintGateway":"Messages are reaching Home Assistant through another node. The gateway is always the node physically connected to Home Assistant, not the one you send from. Correct it in Settings.","status.hintTarget":"Messages are arriving somewhere this gateway is not listening. Check the mode and the channel in Settings against the channel shown above.","devices.title":"Devices","devices.empty":"No Meshtastic devices found. Set up the Meshtastic integration first.","devices.unknown":"Unknown","map.noSelection":"No node selected yet. Pick the nodes to show in Settings.","map.noPosition":"The selected nodes have not reported a position yet.","map.waiting":"waiting for position","map.showAll":"Show all mesh nodes","map.radiusFilter":"Filter by radius","map.connected":"heard recently","map.notConnected":"not heard recently","map.relay":"relay, cannot send commands","map.noneInRadius":"No node inside the radius. Widen it or turn the filter off.","map.size":"Size","map.size.auto":"Auto","map.size.mobile":"Phone","map.size.tablet":"Tablet","map.size.desktop":"Desktop","settings.title":"Settings","settings.global":"Global","settings.owmKey":"OpenWeather API key","settings.owmHint":"Used for the weather layer on the map. Stored in Home Assistant, never in the repository.","settings.gateway":"Gateway node","settings.gatewayHint":"The node physically connected to Home Assistant, not the one you send from. Every message reaches Home Assistant through it, so picking any other node means nothing is ever received.","settings.mode":"Mode","settings.modeChannel":"Listen on a channel","settings.modeDm":"Listen to direct messages","settings.modeHint":"Switching to a channel reveals which channel to listen on. On direct messages the gateway answers privately and no channel applies.","settings.channel":"Channel","settings.initialDelay":"Initial delay (s)","settings.partDelay":"Delay between parts (s)","settings.authorizedNodes":"Authorized nodes","settings.mapNodes":"Nodes shown on the map","settings.channelHint":"The channel Hermes listens on for commands. Changing it takes effect right away.","settings.channelsUnavailable":"Channel list unavailable, enter the index by hand.","settings.defaultPskWarning":"This channel still uses the default Meshtastic key, which is public. Anyone nearby can read it and send commands on it. Use a channel with your own key for anything that controls the house.","settings.reachable":"Consider a node reachable for (minutes)","settings.reachableHint":"How recently a node must have been heard to show green on the map. Two hours suits a fixed installation, a much shorter window says more in the field.","settings.requireAck":"Ask for delivery acknowledgement","settings.requireAckHint":"Tells you the message was delivered, at the cost of a return packet per message. On a busy mesh that is real airtime.","settings.rateLimit":"Max commands per node per minute","settings.rateLimitHint":"Protects against a node that malfunctions or a repeater that duplicates packets. 0 turns the limit off.","settings.caseSensitive":"Match keywords exactly as typed","settings.caseSensitiveHint":"Off by default, and usually best left off: phone keyboards and the Meshtastic app capitalise on their own, so strict matching would reject Status for a keyword written status.","settings.helpKeyword":"Help keyword","settings.helpKeywordHint":"Replies with the list of available commands, for people on the mesh with no access to Home Assistant. Empty disables it. Only authorized nodes get an answer.","settings.refresh":"Refresh","settings.refreshHint":"Re-read the channels and nodes from the radio, after changing something in the Meshtastic app","settings.firmware":"Firmware","settings.gatewayFirmware":"Gateway firmware","settings.channelsFound":"Channels read from the radio","settings.channelsNone":"none, the node may still be connecting","settings.firmwareSameNote":"Check that every node and repeater runs the same firmware version, or versions known to be compatible. Mixed versions cause messages that arrive on one node and not on another.","settings.firmwareDmNote":"Direct messages need a recent firmware on both ends. On older versions the encryption is not recognised, so the message never reaches Home Assistant and no entity state changes. Use a channel if a node cannot be updated.","settings.firmwareOnlyGateway":"Only the gateway reports its firmware to Home Assistant, so the other nodes have to be checked in the Meshtastic app.","settings.pinSize":"Pin size","settings.pinSize.small":"Small","settings.pinSize.medium":"Medium","settings.pinSize.large":"Large","settings.mapLabels":"Show node names on the map","settings.mapLabelsHint":"Useful with a handful of nodes, crowded with many.","settings.mapNodesHint":"Only these nodes are drawn as points on the Map tab. The map has a switch to show the whole mesh temporarily.","settings.authorizedHint":"Only these nodes can trigger commands. Anyone else is ignored without a reply.","settings.noNodes":"No Meshtastic node found yet.","messages.title":"Messages","messages.gateway":"Gateway","messages.listening":"Listening on","messages.listeningHint":"The channel this gateway is receiving commands on","messages.repliesOn":"Where this command replies","messages.onDm":"Direct message","messages.add":"Add message","messages.empty":"No commands configured yet.","messages.keyword":"Keyword","messages.matchType":"Match type","messages.service":"Service (domain.service)","messages.serviceHint":"Optional. Leave empty for a command that only replies.","messages.target":"Target entity","messages.targetHint":"The entity the service acts on. Leave empty if the service needs none.","messages.replyHint":"Optional. Use {state:entity_id} or {attr:entity_id:attribute}.","messages.replyTemplate":"Reply template","messages.replyTo":"Reply routing","messages.exact":"Exact match","messages.startswith":"Starts with","messages.onChannel":"On the channel","messages.senderDm":"DM to sender","messages.replyChannel":"Which channel","messages.replyChannelSame":"The one it was heard on","messages.replyChannelHint":"The reply goes only here. Commands arriving on any other channel are ignored without an answer, so this is a boundary and not just routing.","messages.dmGatewayNote":"This gateway listens to direct messages, so replies always go back privately: answering a private command on a channel would publish the state of your home to everyone listening on it. To reply on a channel, switch the gateway to channel mode in Settings.","messages.confirmDelete":"Delete this command?","messages.keywordHint":"The text people send from a Meshtastic node to trigger this.","messages.matchHint":'Use "Starts with" if you want to accept a value, like "temp 21".',"messages.paletteEntity":"Pick an entity","messages.paletteHint":"Choose what you want to read or control, then click a button below.","messages.pickEntityFirst":"Pick an entity to see what you can do with it.","messages.groupRead":"Read","messages.groupDo":"Do","messages.readState":"Value","messages.templateHint":"Click the buttons above to build this. Action buttons run something and send nothing.","messages.advanced":"Advanced","messages.hideAdvanced":"Hide advanced","common.save":"Save","common.cancel":"Cancel","common.edit":"Edit","common.duplicate":"Duplicate","common.delete":"Delete","common.loading":"Loading","common.saved":"Saved","common.noEntries":"No Hermes gateway configured yet.","common.loadError":"Could not load data from Home Assistant."},_e={en:fe,it:{"tab.status":"Status","tab.devices":"Dispositivi","tab.map":"Mappa","tab.messages":"Messaggi","tab.homeassistant":"Home Assistant","tab.settings":"Impostazioni","tab.log":"Log","tab.chat":"Chat","chat.noChannels":"Nessun canale letto dalla radio, quindi non c'e' dove scrivere.","chat.emptyThread":"Ancora niente. Scrivi il primo messaggio.","chat.channels":"Canali","chat.direct":"Messaggi diretti","chat.sendOn":"Invia su","chat.sendTo":"Invia a","chat.placeholder":"Scrivi un messaggio","chat.send":"Invia","chat.clear":"Svuota questa conversazione","chat.note":"Le conversazioni sono raggruppate per canale e per nodo, e coprono tutti i canali che il gateway sente, non solo quello da cui arrivano i comandi.","ha.shared":"Entità di Hermes","ha.noEntities":"Nessuna entità Hermes. Aggiungi prima l'integrazione.","ha.connected":"Entità usate dai tuoi comandi","ha.noReferences":"Nessun comando fa riferimento a una entità.","ha.problems":"da controllare","ha.missing":"non esiste","ha.test":"Invia una prova","ha.testText":"Testo","ha.testPlaceholder":"Prova da Home Assistant","ha.testHint":"Invia sul canale del gateway selezionato, per la stessa strada di una notifica.","ha.sendTest":"Invia","log.all":"Tutti","log.received":"Ricevuti","log.sent":"Inviati","log.clear":"Svuota","log.empty":"Ancora nessun messaggio registrato.","log.nothingReceived":"nessun messaggio e' arrivato a Hermes dall'ultimo riavvio","status.reason.error":"errore durante la gestione","log.outcome.error":"errore durante la gestione","log.privacy":"Il log conserva il testo dei messaggi nello storage di Home Assistant, con un limite di 200 voci. Puoi svuotarlo quando vuoi.","log.outcome.matched":"comando eseguito","log.outcome.no_match":"nessun comando corrispondente","log.outcome.unauthorized":"mittente non autorizzato","log.outcome.sent":"inviato","log.outcome.help":"aiuto inviato","log.outcome.rate_limited":"limite di frequenza raggiunto","log.outcome.other_gateway":"ignorato, un altro gateway","log.outcome.other_target":"ignorato, un altro canale o un messaggio diretto","log.outcome.malformed":"ignorato, formato inatteso","presets.title":"Invio rapido","presets.add":"Aggiungi preset","presets.empty":"Nessun preset.","presets.label":"Etichetta","presets.text":"Messaggio","presets.node":"Node ID (opzionale)","presets.nodeHint":"Lascia vuoto per inviare sul canale del gateway.","presets.send":"Invia","presets.channel":"Canale","presets.channelDefault":"Il canale del gateway","presets.channelHint":"Invia su un canale diverso senza aggiungere una seconda istanza di Hermes. Ignorato se imposti un node ID, perche' allora diventa un messaggio diretto.","presets.toChannelDefault":"sul canale del gateway","presets.toChannel":"sul canale","presets.toNode":"al nodo","status.title":"Status","status.nodes":"Nodi","status.commands":"Comandi configurati","status.executed":"Eseguiti oggi","status.lastCommand":"Ultimo comando","status.lastError":"Ultimo errore","status.none":"Nessuno","status.noIntegration":"Nessuna entità Hermes trovata. Aggiungi prima l'integrazione.","radioCfg.title":"Configurazione della radio","radioCfg.warning":"Questi valori vengono scritti sulla radio, non su Hermes. Quasi tutti fanno riavviare il nodo, e una regione o un preset del modem sbagliati lo isolano da tutti gli altri nodi finche' non tornano a coincidere. Cambiane uno per volta e verifica la mesh dopo ognuno.","radioCfg.write":"Scrivi sulla radio","radioCfg.region":"Regione","radioCfg.modem_preset":"Preset del modem","radioCfg.hop_limit":"Limite di hop","radioCfg.tx_enabled":"Trasmissione abilitata","radioCfg.tx_power":"Potenza di trasmissione (dBm)","radioCfg.role":"Ruolo del nodo","radioCfg.node_info_broadcast_secs":"Intervallo info nodo (s)","radio.title":"Radio del gateway","radio.name":"Nome","radio.short":"Nome breve","radio.hardware":"Hardware","radio.role":"Ruolo","radio.firmware":"Firmware","radio.region":"Regione","radio.preset":"Preset del modem","radio.hops":"Limite di hop","status.reception":"Ricezione","status.busEvents":"Eventi mesh arrivati a Hermes","status.versions":"Versioni","status.card":"card","status.backend":"backend","status.notListening":"non iscritto","status.versionMismatch":"La card e il codice Python sono di versioni diverse. Il Python cambia solo con un riavvio completo di Home Assistant, quindi riavvialo: fino ad allora resta in esecuzione il backend vecchio e non riceve nulla di nuovo.","status.mismatch":"non passa niente","status.notRunning":"non in esecuzione","status.radioOfflineBadge":"radio non connessa","summary.link":"Collegamento radio","summary.linkUp":"connessa","summary.received":"Messaggi ricevuti","summary.accepted":"Comandi accettati","status.radioOffline":"L'integrazione Meshtastic non ha al momento un collegamento col suo nodo, quindi nessun messaggio puo' arrivare a Hermes e nulla puo' essere inviato. Tutto il resto di questo pannello e' una conseguenza. Controlla l'integrazione Meshtastic e la connessione al nodo gateway: un'app collegata direttamente alla radio continua a funzionare comunque, ed e' per questo che li' il traffico sembra regolare.","status.radioConflict":"Un nodo Meshtastic accetta una connessione alla volta. Anche queste integrazioni sono caricate e si collegano da sole a un nodo, quindi se una di loro tiene il tuo, l'integrazione Meshtastic non riceve nulla e Hermes nemmeno. Rimuovila o scollegala, poi ricontrolla questo pannello.","status.notRunningHint":"Questo gateway e' configurato ma l'integrazione non e' in esecuzione, quindi non c'e' nulla in ascolto dei messaggi. Le impostazioni qui sotto vengono lette dallo storage e sembrano corrette comunque. Controlla in Impostazioni, Dispositivi e servizi se Hermes e' in errore, e il log di Home Assistant.","status.expects":"Questo gateway ascolta","status.lastSeen":"Ultimo messaggio sulla mesh","status.seenFrom":"Inviato dal nodo","status.seenResult":"Esito","status.tally":"Dall'ultimo riavvio","status.updatedAt":"aggiornato alle","status.nothingSeen":"ancora niente","status.nodeUnknown":"sconosciuto","status.reason.received":"arrivati a Hermes","status.reason.malformed":"arrivati in una forma inattesa","status.reason.accepted":"accettato","status.reason.other_gateway":"arrivato tramite un gateway diverso","status.reason.other_target":"arrivato su un altro canale o come messaggio diretto","status.hintGateway":"I messaggi arrivano a Home Assistant tramite un altro nodo. Il gateway e' sempre il nodo fisicamente collegato a Home Assistant, non quello da cui scrivi. Correggilo nelle Impostazioni.","status.hintTarget":"I messaggi arrivano dove questo gateway non ascolta. Confronta modalita' e canale nelle Impostazioni con il canale mostrato qui sopra.","devices.title":"Dispositivi","devices.empty":"Nessun dispositivo Meshtastic trovato. Configura prima l'integrazione Meshtastic.","devices.unknown":"Sconosciuto","map.noSelection":"Nessun nodo selezionato. Scegli i nodi da mostrare in Impostazioni.","map.noPosition":"I nodi selezionati non hanno ancora inviato una posizione.","map.waiting":"in attesa di posizione","map.showAll":"Mostra tutti i nodi della mesh","map.radiusFilter":"Filtra per raggio","map.connected":"sentito di recente","map.notConnected":"non sentito di recente","map.relay":"ripetitore, non puo' inviare comandi","map.noneInRadius":"Nessun nodo dentro il raggio. Allargalo o disattiva il filtro.","map.size":"Dimensione","map.size.auto":"Automatica","map.size.mobile":"Cellulare","map.size.tablet":"Tablet","map.size.desktop":"Computer","settings.title":"Impostazioni","settings.global":"Globali","settings.owmKey":"Chiave API OpenWeather","settings.owmHint":"Usata per il livello meteo sulla mappa. Salvata in Home Assistant, mai nel repository.","settings.gateway":"Nodo gateway","settings.gatewayHint":"Il nodo fisicamente collegato a Home Assistant, non quello da cui scrivi. Ogni messaggio passa da li', quindi scegliendo un altro nodo non si riceve mai niente.","settings.mode":"Modalità","settings.modeChannel":"Ascolta su un canale","settings.modeDm":"Ascolta i messaggi diretti","settings.modeHint":"Passando a canale compare quale canale ascoltare. Sui messaggi diretti il gateway risponde in privato e il canale non si applica.","settings.channel":"Canale","settings.initialDelay":"Attesa iniziale (s)","settings.partDelay":"Pausa tra le parti (s)","settings.authorizedNodes":"Nodi autorizzati","settings.mapNodes":"Nodi mostrati sulla mappa","settings.channelHint":"Il canale su cui Hermes ascolta i comandi. La modifica ha effetto subito.","settings.channelsUnavailable":"Elenco canali non disponibile, inserisci l'indice a mano.","settings.defaultPskWarning":"Questo canale usa ancora la chiave predefinita di Meshtastic, che e' pubblica. Chiunque nelle vicinanze puo' leggerlo e inviare comandi. Per comandare la casa usa un canale con una chiave tua.","settings.reachable":"Considera un nodo raggiungibile per (minuti)","settings.reachableHint":"Da quanto un nodo deve essere stato sentito per apparire verde sulla mappa. Due ore vanno bene per un impianto fisso, una finestra molto piu' corta dice di piu' sul campo.","settings.requireAck":"Chiedi conferma di consegna","settings.requireAckHint":"Ti dice se il messaggio e' stato consegnato, al costo di un pacchetto di ritorno per messaggio. Su una mesh trafficata e' airtime reale.","settings.rateLimit":"Comandi massimi per nodo al minuto","settings.rateLimitHint":"Protegge da un nodo che impazzisce o da un ripetitore che duplica i pacchetti. 0 disattiva il limite.","settings.caseSensitive":"Distingui maiuscole e minuscole","settings.caseSensitiveHint":"Disattivo di default, ed e' meglio lasciarlo cosi': le tastiere dei telefoni e l'app Meshtastic mettono la maiuscola da sole, quindi il confronto rigido rifiuterebbe Stato per una parola chiave scritta stato.","settings.helpKeyword":"Parola chiave di aiuto","settings.helpKeywordHint":"Risponde con l'elenco dei comandi disponibili, per chi e' sulla mesh senza accesso a Home Assistant. Vuoto la disattiva. Rispondiamo solo ai nodi autorizzati.","settings.refresh":"Aggiorna","settings.refreshHint":"Rilegge canali e nodi dalla radio, dopo aver cambiato qualcosa nell'app Meshtastic","settings.firmware":"Firmware","settings.gatewayFirmware":"Firmware del gateway","settings.channelsFound":"Canali letti dalla radio","settings.channelsNone":"nessuno, il nodo potrebbe essere ancora in connessione","settings.firmwareSameNote":"Verifica che tutti i nodi e i ripetitori abbiano la stessa versione di firmware, oppure versioni note come compatibili. Versioni miste causano messaggi che arrivano a un nodo e non a un altro.","settings.firmwareDmNote":"I messaggi diretti richiedono un firmware recente da entrambe le parti. Sulle versioni piu' vecchie la cifratura non viene riconosciuta, quindi il messaggio non arriva a Home Assistant e nessuna entita' cambia stato. Se un nodo non e' aggiornabile, usa un canale.","settings.firmwareOnlyGateway":"Solo il gateway comunica il proprio firmware a Home Assistant, quindi gli altri nodi vanno controllati dall'app Meshtastic.","settings.pinSize":"Dimensione dei punti","settings.pinSize.small":"Piccoli","settings.pinSize.medium":"Medi","settings.pinSize.large":"Grandi","settings.mapLabels":"Mostra i nomi dei nodi sulla mappa","settings.mapLabelsHint":"Utile con pochi nodi, affollato con molti.","settings.mapNodesHint":"Solo questi nodi vengono disegnati come punti nella tab Mappa. Nella mappa c'e' una spunta per mostrare temporaneamente tutta la mesh.","settings.authorizedHint":"Solo questi nodi possono far scattare i comandi. Gli altri vengono ignorati senza risposta.","settings.noNodes":"Nessun nodo Meshtastic trovato.","messages.title":"Messaggi","messages.gateway":"Gateway","messages.listening":"In ascolto su","messages.listeningHint":"Il canale su cui questo gateway riceve i comandi","messages.repliesOn":"Dove risponde questo comando","messages.onDm":"Messaggio diretto","messages.add":"Aggiungi messaggio","messages.empty":"Nessun comando configurato.","messages.keyword":"Parola chiave","messages.matchType":"Tipo di match","messages.service":"Servizio (dominio.servizio)","messages.serviceHint":"Opzionale. Lascia vuoto per un comando che risponde soltanto.","messages.target":"Entità target","messages.targetHint":"L'entità su cui agisce il servizio. Lascia vuoto se il servizio non ne richiede.","messages.replyHint":"Opzionale. Usa {state:entity_id} oppure {attr:entity_id:attributo}.","messages.replyTemplate":"Template di risposta","messages.replyTo":"Instradamento risposta","messages.exact":"Match esatto","messages.startswith":"Inizia con","messages.onChannel":"Sul canale","messages.senderDm":"DM al mittente","messages.replyChannel":"Su quale canale","messages.replyChannelSame":"Quello su cui e' arrivato","messages.replyChannelHint":"La risposta esce solo qui. I comandi che arrivano da qualsiasi altro canale vengono ignorati senza risposta, quindi questo e' un confine e non un semplice instradamento.","messages.dmGatewayNote":"Questo gateway ascolta i messaggi diretti, quindi le risposte tornano sempre in privato: rispondere su un canale a un comando privato pubblicherebbe lo stato di casa tua a chiunque lo stia ascoltando. Per rispondere su un canale, porta il gateway in modalita' canale nelle Impostazioni.","messages.confirmDelete":"Eliminare questo comando?","messages.keywordHint":"Il testo che si invia da un nodo Meshtastic per far scattare il comando.","messages.matchHint":'Usa "Inizia con" se vuoi accettare un valore, tipo "temp 21".',"messages.paletteEntity":"Scegli una entità","messages.paletteHint":"Scegli cosa vuoi leggere o comandare, poi clicca un pulsante qui sotto.","messages.pickEntityFirst":"Scegli una entità per vedere cosa puoi farci.","messages.groupRead":"Leggi","messages.groupDo":"Fai","messages.readState":"Valore","messages.templateHint":"Componi cliccando i pulsanti sopra. I pulsanti azione eseguono e non inviano testo.","messages.advanced":"Avanzate","messages.hideAdvanced":"Nascondi avanzate","common.save":"Salva","common.cancel":"Annulla","common.edit":"Modifica","common.duplicate":"Duplica","common.delete":"Elimina","common.loading":"Caricamento","common.saved":"Salvato","common.noEntries":"Nessun gateway Hermes configurato.","common.loadError":"Impossibile caricare i dati da Home Assistant."},es:{"tab.status":"Estado","tab.devices":"Dispositivos","tab.map":"Mapa","tab.messages":"Mensajes","tab.homeassistant":"Home Assistant","tab.settings":"Ajustes","tab.log":"Registro","tab.chat":"Chat","chat.noChannels":"Ningun canal leido de la radio, asi que no hay donde escribir.","chat.emptyThread":"Todavia nada. Escribe el primer mensaje.","chat.channels":"Canales","chat.direct":"Mensajes directos","chat.sendOn":"Enviar por","chat.sendTo":"Enviar a","chat.placeholder":"Escribe un mensaje","chat.send":"Enviar","chat.clear":"Vaciar esta conversacion","chat.note":"Las conversaciones se agrupan por canal y por nodo, y cubren todos los canales que oye la puerta de enlace, no solo aquel por el que llegan los comandos.","ha.shared":"Entidades de Hermes","ha.noEntities":"Todavía no hay entidades de Hermes. Añade primero la integración.","ha.connected":"Entidades usadas por tus comandos","ha.noReferences":"Ningún comando hace referencia a una entidad.","ha.problems":"requieren atención","ha.missing":"no existe","ha.test":"Enviar una prueba","ha.testText":"Texto","ha.testPlaceholder":"Prueba desde Home Assistant","ha.testHint":"Envía al canal de la puerta de enlace seleccionada, por el mismo camino que una notificación.","ha.sendTest":"Enviar","log.all":"Todos","log.received":"Recibidos","log.sent":"Enviados","log.clear":"Vaciar","log.empty":"Todavía no hay nada registrado.","log.nothingReceived":"ningun mensaje ha llegado a Hermes desde el ultimo reinicio","status.reason.error":"fallo al procesarlo","log.outcome.error":"fallo al procesarlo","log.privacy":"El registro guarda el texto de los mensajes en el almacenamiento de Home Assistant, con un límite de 200 entradas. Puedes vaciarlo cuando quieras.","log.outcome.matched":"comando ejecutado","log.outcome.no_match":"ningún comando coincide","log.outcome.unauthorized":"remitente no autorizado","log.outcome.sent":"enviado","log.outcome.help":"ayuda enviada","log.outcome.rate_limited":"limite de frecuencia alcanzado","log.outcome.other_gateway":"ignorado, otra puerta de enlace","log.outcome.other_target":"ignorado, otro canal o un mensaje directo","log.outcome.malformed":"ignorado, formato inesperado","presets.title":"Envío rápido","presets.add":"Añadir preajuste","presets.empty":"Todavía no hay preajustes.","presets.label":"Etiqueta","presets.text":"Mensaje","presets.node":"ID de nodo (opcional)","presets.nodeHint":"Déjalo vacío para difundir en el canal de la puerta de enlace.","presets.send":"Enviar","presets.channel":"Canal","presets.channelDefault":"El canal de la puerta de enlace","presets.channelHint":"Envia por un canal distinto sin anadir una segunda instancia de Hermes. Se ignora si pones un ID de nodo, porque entonces es un mensaje directo.","presets.toChannelDefault":"al canal de la puerta de enlace","presets.toChannel":"al canal","presets.toNode":"al nodo","status.title":"Estado","status.nodes":"Nodos","status.commands":"Comandos configurados","status.executed":"Ejecutados hoy","status.lastCommand":"Último comando","status.lastError":"Último error","status.none":"Ninguno","status.noIntegration":"No se han encontrado entidades de Hermes. Añade primero la integración.","radioCfg.title":"Configuracion de la radio","radioCfg.warning":"Estos valores se escriben en la radio, no en Hermes. Casi todos reinician el nodo, y una region o un preajuste de modem equivocados lo aislan de todos los demas nodos hasta que vuelvan a coincidir. Cambia uno cada vez y comprueba la malla despues de cada uno.","radioCfg.write":"Escribir en la radio","radioCfg.region":"Region","radioCfg.modem_preset":"Preajuste del modem","radioCfg.hop_limit":"Limite de saltos","radioCfg.tx_enabled":"Transmision habilitada","radioCfg.tx_power":"Potencia de transmision (dBm)","radioCfg.role":"Rol del nodo","radioCfg.node_info_broadcast_secs":"Intervalo de info del nodo (s)","radio.title":"Radio de la puerta de enlace","radio.name":"Nombre","radio.short":"Nombre corto","radio.hardware":"Hardware","radio.role":"Rol","radio.firmware":"Firmware","radio.region":"Region","radio.preset":"Preajuste del modem","radio.hops":"Limite de saltos","status.reception":"Recepcion","status.busEvents":"Eventos mesh llegados a Hermes","status.versions":"Versiones","status.card":"card","status.backend":"backend","status.notListening":"no suscrito","status.versionMismatch":"La card y el codigo Python son de versiones distintas. El Python solo cambia con un reinicio completo de Home Assistant, asi que reinicialo: hasta entonces sigue el backend antiguo y no recibe nada nuevo.","status.mismatch":"no pasa nada","status.notRunning":"no en ejecucion","status.radioOfflineBadge":"radio no conectada","summary.link":"Enlace de radio","summary.linkUp":"conectada","summary.received":"Mensajes recibidos","summary.accepted":"Comandos aceptados","status.radioOffline":"La integracion Meshtastic no tiene ahora enlace con su nodo, asi que ningun mensaje puede llegar a Hermes ni puede enviarse nada. Todo lo demas de este panel es consecuencia de eso. Revisa la integracion Meshtastic y la conexion al nodo de puerta de enlace: una app conectada directamente a la radio sigue funcionando igual, por eso alli el trafico parece normal.","status.radioConflict":"Un nodo Meshtastic acepta una conexion cada vez. Estas integraciones tambien estan cargadas y se conectan por su cuenta a un nodo, asi que si una de ellas ocupa el tuyo, la integracion Meshtastic no recibe nada y Hermes tampoco. Quitala o desconectala y vuelve a mirar este panel.","status.notRunningHint":"Esta puerta de enlace esta configurada pero la integracion no esta en ejecucion, asi que no hay nada escuchando mensajes. Los ajustes de abajo se leen del almacenamiento y parecen correctos igualmente. Revisa en Ajustes, Dispositivos y servicios si Hermes esta en error, y el registro de Home Assistant.","status.expects":"Esta puerta de enlace escucha","status.lastSeen":"Ultimo mensaje en la malla","status.seenFrom":"Enviado por el nodo","status.seenResult":"Resultado","status.tally":"Desde el ultimo reinicio","status.updatedAt":"actualizado a las","status.nothingSeen":"todavia nada","status.nodeUnknown":"desconocido","status.reason.received":"llegados a Hermes","status.reason.malformed":"llegados con una forma inesperada","status.reason.accepted":"aceptado","status.reason.other_gateway":"llego por otra puerta de enlace","status.reason.other_target":"llego por otro canal o como mensaje directo","status.hintGateway":"Los mensajes llegan a Home Assistant por otro nodo. La puerta de enlace es siempre el nodo conectado fisicamente a Home Assistant, no aquel desde el que escribes. Corrigelo en los Ajustes.","status.hintTarget":"Los mensajes llegan donde esta puerta de enlace no escucha. Compara el modo y el canal en los Ajustes con el canal mostrado arriba.","devices.title":"Dispositivos","devices.empty":"No se han encontrado dispositivos Meshtastic. Configura primero la integración Meshtastic.","devices.unknown":"Desconocido","map.noSelection":"Ningún nodo seleccionado. Elige los nodos a mostrar en Ajustes.","map.noPosition":"Los nodos seleccionados aún no han enviado una posición.","map.waiting":"esperando posición","map.showAll":"Mostrar todos los nodos de la malla","map.radiusFilter":"Filtrar por radio","map.connected":"oído recientemente","map.notConnected":"no oído recientemente","map.relay":"repetidor, no puede enviar comandos","map.noneInRadius":"Ningún nodo dentro del radio. Amplíalo o desactiva el filtro.","map.size":"Tamaño","map.size.auto":"Automático","map.size.mobile":"Móvil","map.size.tablet":"Tableta","map.size.desktop":"Ordenador","settings.title":"Ajustes","settings.global":"Globales","settings.owmKey":"Clave API de OpenWeather","settings.owmHint":"Se usa para la capa meteorológica del mapa. Guardada en Home Assistant, nunca en el repositorio.","settings.gateway":"Nodo de puerta de enlace","settings.gatewayHint":"El nodo conectado fisicamente a Home Assistant, no aquel desde el que escribes. Todos los mensajes pasan por el, asi que eligiendo otro nodo nunca se recibe nada.","settings.mode":"Modo","settings.modeChannel":"Escuchar en un canal","settings.modeDm":"Escuchar mensajes directos","settings.modeHint":"Al cambiar a canal aparece cual canal escuchar. En mensajes directos la puerta de enlace responde en privado y el canal no se aplica.","settings.channel":"Canal","settings.initialDelay":"Retardo inicial (s)","settings.partDelay":"Retardo entre partes (s)","settings.authorizedNodes":"Nodos autorizados","settings.mapNodes":"Nodos mostrados en el mapa","settings.channelHint":"El canal en el que Hermes escucha los comandos. El cambio surte efecto de inmediato.","settings.channelsUnavailable":"Lista de canales no disponible, introduce el indice a mano.","settings.defaultPskWarning":"Este canal todavia usa la clave predeterminada de Meshtastic, que es publica. Cualquiera cerca puede leerlo y enviar comandos. Usa un canal con tu propia clave para controlar la casa.","settings.reachable":"Considerar un nodo accesible durante (minutos)","settings.reachableHint":"Cuanto de reciente debe ser la ultima escucha para que el nodo aparezca en verde. Dos horas van bien en una instalacion fija, una ventana mas corta dice mas sobre el terreno.","settings.requireAck":"Pedir confirmacion de entrega","settings.requireAckHint":"Te dice si el mensaje se ha entregado, a costa de un paquete de vuelta por mensaje. En una malla con trafico eso es tiempo de aire real.","settings.rateLimit":"Comandos maximos por nodo y minuto","settings.rateLimitHint":"Protege de un nodo que falla o de un repetidor que duplica paquetes. 0 desactiva el limite.","settings.caseSensitive":"Distinguir mayusculas y minusculas","settings.caseSensitiveHint":"Desactivado por defecto, y suele ser mejor dejarlo asi: los teclados de los moviles y la app de Meshtastic ponen la mayuscula solos, asi que la comparacion estricta rechazaria Estado para una palabra clave escrita estado.","settings.helpKeyword":"Palabra clave de ayuda","settings.helpKeywordHint":"Responde con la lista de comandos disponibles, para quien esta en la malla sin acceso a Home Assistant. Vacio lo desactiva. Solo responde a nodos autorizados.","settings.refresh":"Actualizar","settings.refreshHint":"Vuelve a leer los canales y nodos de la radio, tras cambiar algo en la app de Meshtastic","settings.firmware":"Firmware","settings.gatewayFirmware":"Firmware de la puerta de enlace","settings.channelsFound":"Canales leidos de la radio","settings.channelsNone":"ninguno, el nodo puede estar aun conectandose","settings.firmwareSameNote":"Comprueba que todos los nodos y repetidores tengan la misma version de firmware, o versiones compatibles conocidas. Las versiones mezcladas provocan mensajes que llegan a un nodo y no a otro.","settings.firmwareDmNote":"Los mensajes directos necesitan firmware reciente en ambos extremos. En versiones antiguas el cifrado no se reconoce, asi que el mensaje no llega a Home Assistant y ninguna entidad cambia de estado. Si un nodo no se puede actualizar, usa un canal.","settings.firmwareOnlyGateway":"Solo la puerta de enlace informa de su firmware a Home Assistant, los demas nodos hay que comprobarlos en la app de Meshtastic.","settings.pinSize":"Tamano de los puntos","settings.pinSize.small":"Pequenos","settings.pinSize.medium":"Medianos","settings.pinSize.large":"Grandes","settings.mapLabels":"Mostrar los nombres de los nodos en el mapa","settings.mapLabelsHint":"Util con pocos nodos, abarrotado con muchos.","settings.mapNodesHint":"Solo estos nodos se dibujan como puntos en la pestaña Mapa. El mapa tiene una casilla para mostrar toda la malla temporalmente.","settings.authorizedHint":"Solo estos nodos pueden activar comandos. El resto se ignora sin respuesta.","settings.noNodes":"Todavía no se ha encontrado ningún nodo Meshtastic.","messages.title":"Mensajes","messages.gateway":"Puerta de enlace","messages.listening":"Escuchando en","messages.listeningHint":"El canal en el que esta puerta de enlace recibe los comandos","messages.repliesOn":"Donde responde este comando","messages.onDm":"Mensaje directo","messages.add":"Añadir mensaje","messages.empty":"Todavía no hay comandos configurados.","messages.keyword":"Palabra clave","messages.matchType":"Tipo de coincidencia","messages.service":"Servicio (dominio.servicio)","messages.serviceHint":"Opcional. Déjalo vacío para un comando que solo responde.","messages.target":"Entidad de destino","messages.targetHint":"La entidad sobre la que actúa el servicio. Déjalo vacío si el servicio no la necesita.","messages.replyHint":"Opcional. Usa {state:entity_id} o {attr:entity_id:attribute}.","messages.replyTemplate":"Plantilla de respuesta","messages.replyTo":"Enrutamiento de respuesta","messages.exact":"Coincidencia exacta","messages.startswith":"Empieza por","messages.onChannel":"En el canal","messages.senderDm":"DM al remitente","messages.replyChannel":"En que canal","messages.replyChannelSame":"Aquel en el que llego","messages.replyChannelHint":"La respuesta sale solo aqui. Los comandos que llegan por cualquier otro canal se ignoran sin respuesta, asi que esto es un limite y no un simple enrutamiento.","messages.dmGatewayNote":"Esta puerta de enlace escucha mensajes directos, asi que las respuestas siempre vuelven en privado: responder en un canal a un comando privado publicaria el estado de tu casa a todos los que lo escuchan. Para responder en un canal, cambia la puerta de enlace a modo canal en los Ajustes.","messages.confirmDelete":"¿Eliminar este comando?","messages.keywordHint":"El texto que se envía desde un nodo Meshtastic para activarlo.","messages.matchHint":'Usa "Empieza por" si quieres aceptar un valor, como "temp 21".',"messages.paletteEntity":"Elige una entidad","messages.paletteHint":"Elige qué quieres leer o controlar y pulsa un botón de abajo.","messages.pickEntityFirst":"Elige una entidad para ver qué puedes hacer con ella.","messages.groupRead":"Leer","messages.groupDo":"Hacer","messages.readState":"Valor","messages.templateHint":"Compón pulsando los botones de arriba. Los botones de acción ejecutan y no envían texto.","messages.advanced":"Avanzado","messages.hideAdvanced":"Ocultar avanzado","common.save":"Guardar","common.cancel":"Cancelar","common.edit":"Editar","common.duplicate":"Duplicar","common.delete":"Eliminar","common.loading":"Cargando","common.saved":"Guardado","common.noEntries":"Todavía no hay ninguna puerta de enlace Hermes configurada.","common.loadError":"No se han podido cargar los datos de Home Assistant."},fr:{"tab.status":"État","tab.devices":"Appareils","tab.map":"Carte","tab.messages":"Messages","tab.homeassistant":"Home Assistant","tab.settings":"Paramètres","tab.log":"Journal","tab.chat":"Chat","chat.noChannels":"Aucun canal lu depuis la radio, il n y a donc nulle part ou ecrire.","chat.emptyThread":"Rien pour le moment. Ecrivez le premier message.","chat.channels":"Canaux","chat.direct":"Messages directs","chat.sendOn":"Envoyer sur","chat.sendTo":"Envoyer a","chat.placeholder":"Ecrire un message","chat.send":"Envoyer","chat.clear":"Vider cette conversation","chat.note":"Les conversations sont regroupees par canal et par nœud, et couvrent tous les canaux que la passerelle entend, pas seulement celui des commandes.","ha.shared":"Entités de Hermes","ha.noEntities":"Aucune entité Hermes. Ajoutez d'abord l'intégration.","ha.connected":"Entités utilisées par vos commandes","ha.noReferences":"Aucune commande ne référence une entité.","ha.problems":"à vérifier","ha.missing":"n'existe pas","ha.test":"Envoyer un test","ha.testText":"Texte","ha.testPlaceholder":"Test depuis Home Assistant","ha.testHint":"Envoie sur le canal de la passerelle sélectionnée, par le même chemin qu'une notification.","ha.sendTest":"Envoyer","log.all":"Tous","log.received":"Reçus","log.sent":"Envoyés","log.clear":"Vider","log.empty":"Rien dans le journal pour le moment.","log.nothingReceived":"aucun message n est arrive a Hermes depuis le dernier redemarrage","status.reason.error":"echec lors du traitement","log.outcome.error":"echec lors du traitement","log.privacy":"Le journal conserve le texte des messages dans le stockage de Home Assistant, limité à 200 entrées. Vous pouvez le vider quand vous voulez.","log.outcome.matched":"commande exécutée","log.outcome.no_match":"aucune commande correspondante","log.outcome.unauthorized":"expéditeur non autorisé","log.outcome.sent":"envoyé","log.outcome.help":"aide envoyee","log.outcome.rate_limited":"limite de frequence atteinte","log.outcome.other_gateway":"ignore, une autre passerelle","log.outcome.other_target":"ignore, un autre canal ou un message direct","log.outcome.malformed":"ignore, format inattendu","presets.title":"Envoi rapide","presets.add":"Ajouter un préréglage","presets.empty":"Aucun préréglage.","presets.label":"Libellé","presets.text":"Message","presets.node":"ID de nœud (facultatif)","presets.nodeHint":"Laissez vide pour diffuser sur le canal de la passerelle.","presets.send":"Envoyer","presets.channel":"Canal","presets.channelDefault":"Le canal de la passerelle","presets.channelHint":"Envoyer sur un autre canal sans ajouter une deuxieme instance de Hermes. Ignore si un ID de nœud est defini, car cela devient un message direct.","presets.toChannelDefault":"sur le canal de la passerelle","presets.toChannel":"sur le canal","presets.toNode":"au nœud","status.title":"État","status.nodes":"Nœuds","status.commands":"Commandes configurées","status.executed":"Exécutées aujourd'hui","status.lastCommand":"Dernière commande","status.lastError":"Dernière erreur","status.none":"Aucun","status.noIntegration":"Aucune entité Hermes trouvée. Ajoutez d'abord l'intégration.","radioCfg.title":"Configuration de la radio","radioCfg.warning":"Ces valeurs sont ecrites dans la radio, pas dans Hermes. La plupart redemarrent le nœud, et une region ou une preselection de modem erronee le coupe de tous les autres nœuds jusqu a ce qu ils correspondent de nouveau. Changez-en un a la fois et verifiez le maillage apres chacun.","radioCfg.write":"Ecrire dans la radio","radioCfg.region":"Region","radioCfg.modem_preset":"Preselection du modem","radioCfg.hop_limit":"Limite de sauts","radioCfg.tx_enabled":"Emission activee","radioCfg.tx_power":"Puissance d emission (dBm)","radioCfg.role":"Role du nœud","radioCfg.node_info_broadcast_secs":"Intervalle info nœud (s)","radio.title":"Radio de la passerelle","radio.name":"Nom","radio.short":"Nom court","radio.hardware":"Materiel","radio.role":"Role","radio.firmware":"Firmware","radio.region":"Region","radio.preset":"Preselection du modem","radio.hops":"Limite de sauts","status.reception":"Reception","status.busEvents":"Evenements mesh arrives a Hermes","status.versions":"Versions","status.card":"card","status.backend":"backend","status.notListening":"non abonne","status.versionMismatch":"La carte et le code Python sont de versions differentes. Le Python ne change qu au redemarrage complet de Home Assistant, redemarrez-le: jusque la l ancien backend continue et ne recoit rien de nouveau.","status.mismatch":"rien ne passe","status.notRunning":"pas en cours d execution","status.radioOfflineBadge":"radio non connectee","summary.link":"Liaison radio","summary.linkUp":"connectee","summary.received":"Messages recus","summary.accepted":"Commandes acceptees","status.radioOffline":"L integration Meshtastic n a actuellement aucun lien avec son nœud, aucun message ne peut donc atteindre Hermes et rien ne peut etre envoye. Tout le reste de ce panneau en decoule. Verifiez l integration Meshtastic et la connexion au nœud passerelle: une application connectee directement a la radio continue de fonctionner, d ou un trafic qui parait normal la-bas.","status.radioConflict":"Un noeud Meshtastic accepte une connexion a la fois. Ces integrations sont aussi chargees et se connectent elles-memes a un noeud, donc si l'une d'elles occupe le votre, l'integration Meshtastic ne recoit rien et Hermes non plus. Retirez-la ou deconnectez-la, puis revenez ici.","status.notRunningHint":"Cette passerelle est configuree mais l integration ne tourne pas, rien n ecoute donc les messages. Les parametres ci-dessous sont lus depuis le stockage et paraissent corrects de toute facon. Verifiez dans Parametres, Appareils et services si Hermes est en erreur, ainsi que le journal de Home Assistant.","status.expects":"Cette passerelle ecoute","status.lastSeen":"Dernier message sur le maillage","status.seenFrom":"Envoye par le nœud","status.seenResult":"Resultat","status.tally":"Depuis le dernier redemarrage","status.updatedAt":"mis a jour a","status.nothingSeen":"rien pour le moment","status.nodeUnknown":"inconnu","status.reason.received":"arrives a Hermes","status.reason.malformed":"arrives sous une forme inattendue","status.reason.accepted":"accepte","status.reason.other_gateway":"arrive par une autre passerelle","status.reason.other_target":"arrive sur un autre canal ou en message direct","status.hintGateway":"Les messages atteignent Home Assistant par un autre nœud. La passerelle est toujours le nœud physiquement connecte a Home Assistant, pas celui depuis lequel vous ecrivez. Corrigez-le dans les Parametres.","status.hintTarget":"Les messages arrivent la ou cette passerelle n ecoute pas. Comparez le mode et le canal dans les Parametres avec le canal affiche ci-dessus.","devices.title":"Appareils","devices.empty":"Aucun appareil Meshtastic trouvé. Configurez d'abord l'intégration Meshtastic.","devices.unknown":"Inconnu","map.noSelection":"Aucun nœud sélectionné. Choisissez les nœuds à afficher dans Paramètres.","map.noPosition":"Les nœuds sélectionnés n'ont pas encore transmis de position.","map.waiting":"en attente de position","map.showAll":"Afficher tous les nœuds du maillage","map.radiusFilter":"Filtrer par rayon","map.connected":"entendu récemment","map.notConnected":"pas entendu récemment","map.relay":"relais, ne peut pas envoyer de commandes","map.noneInRadius":"Aucun nœud dans le rayon. Élargissez-le ou désactivez le filtre.","map.size":"Taille","map.size.auto":"Automatique","map.size.mobile":"Téléphone","map.size.tablet":"Tablette","map.size.desktop":"Ordinateur","settings.title":"Paramètres","settings.global":"Globaux","settings.owmKey":"Clé API OpenWeather","settings.owmHint":"Utilisée pour la couche météo de la carte. Stockée dans Home Assistant, jamais dans le dépôt.","settings.gateway":"Nœud passerelle","settings.gatewayHint":"Le nœud physiquement connecte a Home Assistant, pas celui depuis lequel vous ecrivez. Tous les messages passent par lui, choisir un autre nœud signifie ne jamais rien recevoir.","settings.mode":"Mode","settings.modeChannel":"Ecouter sur un canal","settings.modeDm":"Ecouter les messages directs","settings.modeHint":"En passant sur canal, le canal a ecouter apparait. En messages directs la passerelle repond en prive et le canal ne s applique pas.","settings.channel":"Canal","settings.initialDelay":"Délai initial (s)","settings.partDelay":"Délai entre les parties (s)","settings.authorizedNodes":"Nœuds autorisés","settings.mapNodes":"Nœuds affichés sur la carte","settings.channelHint":"Le canal sur lequel Hermes ecoute les commandes. La modification prend effet immediatement.","settings.channelsUnavailable":"Liste des canaux indisponible, saisissez l'index a la main.","settings.defaultPskWarning":"Ce canal utilise encore la cle par defaut de Meshtastic, qui est publique. N'importe qui a proximite peut le lire et envoyer des commandes. Utilisez un canal avec votre propre cle pour piloter la maison.","settings.reachable":"Considerer un nœud joignable pendant (minutes)","settings.reachableHint":"Depuis combien de temps un nœud doit avoir ete entendu pour apparaitre en vert. Deux heures conviennent a une installation fixe, une fenetre bien plus courte est plus parlante sur le terrain.","settings.requireAck":"Demander un accuse de reception","settings.requireAckHint":"Indique que le message a ete delivre, au prix d'un paquet de retour par message. Sur un maillage charge c'est du temps d'antenne reel.","settings.rateLimit":"Commandes maximum par nœud et par minute","settings.rateLimitHint":"Protege d'un nœud defaillant ou d'un repeteur qui duplique les paquets. 0 desactive la limite.","settings.caseSensitive":"Distinguer les majuscules","settings.caseSensitiveHint":"Desactive par defaut, et mieux vaut le laisser ainsi: les claviers de telephone et l'application Meshtastic mettent la majuscule d'eux-memes, une comparaison stricte rejetterait donc Etat pour un mot-cle ecrit etat.","settings.helpKeyword":"Mot-cle d'aide","settings.helpKeywordHint":"Repond avec la liste des commandes disponibles, pour ceux qui sont sur le maillage sans acces a Home Assistant. Vide le desactive. Seuls les nœuds autorises recoivent une reponse.","settings.refresh":"Actualiser","settings.refreshHint":"Relit les canaux et les nœuds depuis la radio, apres un changement dans l'application Meshtastic","settings.firmware":"Firmware","settings.gatewayFirmware":"Firmware de la passerelle","settings.channelsFound":"Canaux lus depuis la radio","settings.channelsNone":"aucun, le nœud est peut-etre encore en connexion","settings.firmwareSameNote":"Verifiez que tous les nœuds et repeteurs utilisent la meme version de firmware, ou des versions connues comme compatibles. Des versions melangees provoquent des messages qui arrivent sur un nœud et pas sur un autre.","settings.firmwareDmNote":"Les messages directs exigent un firmware recent des deux cotes. Sur les anciennes versions le chiffrement n'est pas reconnu, donc le message n'atteint pas Home Assistant et aucune entite ne change d'etat. Si un nœud ne peut pas etre mis a jour, utilisez un canal.","settings.firmwareOnlyGateway":"Seule la passerelle communique son firmware a Home Assistant, les autres nœuds doivent etre verifies dans l'application Meshtastic.","settings.pinSize":"Taille des points","settings.pinSize.small":"Petits","settings.pinSize.medium":"Moyens","settings.pinSize.large":"Grands","settings.mapLabels":"Afficher les noms des nœuds sur la carte","settings.mapLabelsHint":"Utile avec peu de nœuds, charge avec beaucoup.","settings.mapNodesHint":"Seuls ces nœuds sont dessinés sur l'onglet Carte. La carte a une case pour afficher tout le maillage temporairement.","settings.authorizedHint":"Seuls ces nœuds peuvent déclencher des commandes. Les autres sont ignorés sans réponse.","settings.noNodes":"Aucun nœud Meshtastic trouvé pour le moment.","messages.title":"Messages","messages.gateway":"Passerelle","messages.listening":"A l'ecoute sur","messages.listeningHint":"Le canal sur lequel cette passerelle recoit les commandes","messages.repliesOn":"Ou repond cette commande","messages.onDm":"Message direct","messages.add":"Ajouter un message","messages.empty":"Aucune commande configurée pour le moment.","messages.keyword":"Mot-clé","messages.matchType":"Type de correspondance","messages.service":"Service (domaine.service)","messages.serviceHint":"Facultatif. Laissez vide pour une commande qui répond seulement.","messages.target":"Entité cible","messages.targetHint":"L'entité sur laquelle agit le service. Laissez vide si le service n'en a pas besoin.","messages.replyHint":"Facultatif. Utilisez {state:entity_id} ou {attr:entity_id:attribute}.","messages.replyTemplate":"Modèle de réponse","messages.replyTo":"Routage de la réponse","messages.exact":"Correspondance exacte","messages.startswith":"Commence par","messages.onChannel":"Sur le canal","messages.senderDm":"DM à l'expéditeur","messages.replyChannel":"Sur quel canal","messages.replyChannelSame":"Celui par lequel elle est arrivee","messages.replyChannelHint":"La reponse ne part que la. Les commandes arrivant par tout autre canal sont ignorees sans reponse, c est donc une limite et pas un simple routage.","messages.dmGatewayNote":"Cette passerelle ecoute les messages directs, les reponses repartent donc toujours en prive: repondre sur un canal a une commande privee publierait l etat de votre maison a tous ceux qui l ecoutent. Pour repondre sur un canal, passez la passerelle en mode canal dans les Parametres.","messages.confirmDelete":"Supprimer cette commande ?","messages.keywordHint":"Le texte envoyé depuis un nœud Meshtastic pour la déclencher.","messages.matchHint":'Utilisez "Commence par" pour accepter une valeur, comme "temp 21".',"messages.paletteEntity":"Choisissez une entité","messages.paletteHint":"Choisissez ce que vous voulez lire ou piloter, puis cliquez un bouton ci-dessous.","messages.pickEntityFirst":"Choisissez une entité pour voir ce que vous pouvez en faire.","messages.groupRead":"Lire","messages.groupDo":"Faire","messages.readState":"Valeur","messages.templateHint":"Composez avec les boutons ci-dessus. Les boutons d'action exécutent et n'envoient rien.","messages.advanced":"Avancé","messages.hideAdvanced":"Masquer avancé","common.save":"Enregistrer","common.cancel":"Annuler","common.edit":"Modifier","common.duplicate":"Dupliquer","common.delete":"Supprimer","common.loading":"Chargement","common.saved":"Enregistré","common.noEntries":"Aucune passerelle Hermes configurée pour le moment.","common.loadError":"Impossible de charger les données depuis Home Assistant."},de:{"tab.status":"Status","tab.devices":"Geräte","tab.map":"Karte","tab.messages":"Nachrichten","tab.homeassistant":"Home Assistant","tab.settings":"Einstellungen","tab.log":"Protokoll","tab.chat":"Chat","chat.noChannels":"Noch kein Kanal vom Funkgeraet gelesen, es gibt also keinen Ort zum Schreiben.","chat.emptyThread":"Noch nichts. Schreibe die erste Nachricht.","chat.channels":"Kanaele","chat.direct":"Direktnachrichten","chat.sendOn":"Senden auf","chat.sendTo":"Senden an","chat.placeholder":"Nachricht schreiben","chat.send":"Senden","chat.clear":"Diese Unterhaltung leeren","chat.note":"Unterhaltungen sind nach Kanal und Node gruppiert und umfassen alle Kanaele, die das Gateway hoert, nicht nur den der Befehle.","ha.shared":"Hermes-Entitäten","ha.noEntities":"Noch keine Hermes-Entität. Füge zuerst die Integration hinzu.","ha.connected":"Von deinen Befehlen verwendete Entitäten","ha.noReferences":"Kein Befehl verweist auf eine Entität.","ha.problems":"zu prüfen","ha.missing":"existiert nicht","ha.test":"Test senden","ha.testText":"Text","ha.testPlaceholder":"Test von Home Assistant","ha.testHint":"Sendet auf dem Kanal des gewählten Gateways, über denselben Weg wie eine Benachrichtigung.","ha.sendTest":"Senden","log.all":"Alle","log.received":"Empfangen","log.sent":"Gesendet","log.clear":"Leeren","log.empty":"Noch nichts protokolliert.","log.nothingReceived":"seit dem letzten Neustart hat keine Nachricht Hermes erreicht","status.reason.error":"bei der Verarbeitung fehlgeschlagen","log.outcome.error":"bei der Verarbeitung fehlgeschlagen","log.privacy":"Das Protokoll speichert den Text der Nachrichten im Home-Assistant-Speicher, begrenzt auf 200 Einträge. Du kannst es jederzeit leeren.","log.outcome.matched":"Befehl ausgeführt","log.outcome.no_match":"kein Befehl passt","log.outcome.unauthorized":"Absender nicht autorisiert","log.outcome.sent":"gesendet","log.outcome.help":"Hilfe gesendet","log.outcome.rate_limited":"Ratenlimit erreicht","log.outcome.other_gateway":"ignoriert, ein anderes Gateway","log.outcome.other_target":"ignoriert, ein anderer Kanal oder eine Direktnachricht","log.outcome.malformed":"ignoriert, unerwartetes Format","presets.title":"Schnellversand","presets.add":"Vorlage hinzufügen","presets.empty":"Noch keine Vorlage.","presets.label":"Bezeichnung","presets.text":"Nachricht","presets.node":"Node-ID (optional)","presets.nodeHint":"Leer lassen, um auf dem Kanal des Gateways zu senden.","presets.send":"Senden","presets.channel":"Kanal","presets.channelDefault":"Der Kanal des Gateways","presets.channelHint":"Auf einem anderen Kanal senden, ohne eine zweite Hermes-Instanz anzulegen. Wird ignoriert, wenn eine Node-ID gesetzt ist, denn dann ist es eine Direktnachricht.","presets.toChannelDefault":"auf den Gateway-Kanal","presets.toChannel":"auf Kanal","presets.toNode":"an Node","status.title":"Status","status.nodes":"Nodes","status.commands":"Konfigurierte Befehle","status.executed":"Heute ausgeführt","status.lastCommand":"Letzter Befehl","status.lastError":"Letzter Fehler","status.none":"Keine","status.noIntegration":"Keine Hermes-Entitäten gefunden. Füge zuerst die Integration hinzu.","radioCfg.title":"Funkkonfiguration","radioCfg.warning":"Diese Werte werden auf das Funkgeraet geschrieben, nicht auf Hermes. Die meisten starten den Node neu, und eine falsche Region oder Modem-Voreinstellung schneidet ihn von allen anderen Nodes ab, bis sie wieder uebereinstimmen. Aendere eines nach dem anderen und pruefe danach das Mesh.","radioCfg.write":"Auf das Funkgeraet schreiben","radioCfg.region":"Region","radioCfg.modem_preset":"Modem-Voreinstellung","radioCfg.hop_limit":"Hop-Limit","radioCfg.tx_enabled":"Senden aktiviert","radioCfg.tx_power":"Sendeleistung (dBm)","radioCfg.role":"Node-Rolle","radioCfg.node_info_broadcast_secs":"Node-Info-Intervall (s)","radio.title":"Gateway-Funkgeraet","radio.name":"Name","radio.short":"Kurzname","radio.hardware":"Hardware","radio.role":"Rolle","radio.firmware":"Firmware","radio.region":"Region","radio.preset":"Modem-Voreinstellung","radio.hops":"Hop-Limit","status.reception":"Empfang","status.busEvents":"Mesh-Ereignisse, die Hermes erreichen","status.versions":"Versionen","status.card":"Card","status.backend":"Backend","status.notListening":"nicht abonniert","status.versionMismatch":"Card und Python-Code haben verschiedene Versionen. Python aendert sich nur bei einem vollstaendigen Neustart von Home Assistant, starte ihn also neu: bis dahin laeuft das alte Backend weiter und empfaengt nichts Neues.","status.mismatch":"es kommt nichts an","status.notRunning":"laeuft nicht","status.radioOfflineBadge":"Funk nicht verbunden","summary.link":"Funkverbindung","summary.linkUp":"verbunden","summary.received":"Empfangene Nachrichten","summary.accepted":"Angenommene Befehle","status.radioOffline":"Die Meshtastic-Integration hat derzeit keine Verbindung zu ihrem Node, es kann also keine Nachricht Hermes erreichen und nichts gesendet werden. Alles andere auf diesem Panel folgt daraus. Pruefe die Meshtastic-Integration und die Verbindung zum Gateway-Node: eine App, die direkt mit dem Funkgeraet verbunden ist, funktioniert weiterhin, deshalb sieht der Verkehr dort normal aus.","status.radioConflict":"Ein Meshtastic-Knoten nimmt jeweils eine Verbindung an. Diese Integrationen sind ebenfalls geladen und verbinden sich selbst mit einem Knoten. Belegt eine davon Ihren, bekommt die Meshtastic-Integration nichts und Hermes auch nicht. Entfernen oder trennen Sie sie und pruefen Sie dieses Panel erneut.","status.notRunningHint":"Dieses Gateway ist konfiguriert, aber die Integration laeuft nicht, es hoert also nichts auf Nachrichten. Die Einstellungen unten stammen aus dem Speicher und sehen ohnehin korrekt aus. Pruefe unter Einstellungen, Geraete und Dienste, ob Hermes einen Fehler zeigt, und das Home-Assistant-Log.","status.expects":"Dieses Gateway empfaengt","status.lastSeen":"Letzte Nachricht im Mesh","status.seenFrom":"Gesendet von Node","status.seenResult":"Ergebnis","status.tally":"Seit dem letzten Neustart","status.updatedAt":"aktualisiert um","status.nothingSeen":"noch nichts","status.nodeUnknown":"unbekannt","status.reason.received":"bei Hermes angekommen","status.reason.malformed":"in unerwarteter Form angekommen","status.reason.accepted":"angenommen","status.reason.other_gateway":"kam ueber ein anderes Gateway","status.reason.other_target":"kam auf einem anderen Kanal oder als Direktnachricht","status.hintGateway":"Die Nachrichten erreichen Home Assistant ueber einen anderen Node. Das Gateway ist immer der Node, der physisch mit Home Assistant verbunden ist, nicht der, von dem du schreibst. Korrigiere es in den Einstellungen.","status.hintTarget":"Die Nachrichten kommen dort an, wo dieses Gateway nicht empfaengt. Vergleiche Modus und Kanal in den Einstellungen mit dem oben gezeigten Kanal.","devices.title":"Geräte","devices.empty":"Keine Meshtastic-Geräte gefunden. Richte zuerst die Meshtastic-Integration ein.","devices.unknown":"Unbekannt","map.noSelection":"Kein Node ausgewählt. Wähle in den Einstellungen die anzuzeigenden Nodes.","map.noPosition":"Die ausgewählten Nodes haben noch keine Position gemeldet.","map.waiting":"warte auf Position","map.showAll":"Alle Mesh-Nodes anzeigen","map.radiusFilter":"Nach Radius filtern","map.connected":"kürzlich gehört","map.notConnected":"nicht kürzlich gehört","map.relay":"Relais, kann keine Befehle senden","map.noneInRadius":"Kein Node im Radius. Vergrößere ihn oder schalte den Filter aus.","map.size":"Größe","map.size.auto":"Automatisch","map.size.mobile":"Handy","map.size.tablet":"Tablet","map.size.desktop":"Computer","settings.title":"Einstellungen","settings.global":"Global","settings.owmKey":"OpenWeather-API-Schlüssel","settings.owmHint":"Wird für die Wetterebene der Karte verwendet. In Home Assistant gespeichert, nie im Repository.","settings.gateway":"Gateway-Node","settings.gatewayHint":"Der Node, der physisch mit Home Assistant verbunden ist, nicht der, von dem du schreibst. Jede Nachricht laeuft ueber ihn, ein anderer Node bedeutet also, dass nie etwas ankommt.","settings.mode":"Modus","settings.modeChannel":"Auf einem Kanal empfangen","settings.modeDm":"Direktnachrichten empfangen","settings.modeHint":"Beim Wechsel auf Kanal erscheint, welcher Kanal empfangen wird. Bei Direktnachrichten antwortet das Gateway privat und ein Kanal gilt nicht.","settings.channel":"Kanal","settings.initialDelay":"Anfängliche Verzögerung (s)","settings.partDelay":"Verzögerung zwischen Teilen (s)","settings.authorizedNodes":"Autorisierte Nodes","settings.mapNodes":"Auf der Karte angezeigte Nodes","settings.channelHint":"Der Kanal, auf dem Hermes Befehle empfaengt. Die Aenderung wirkt sofort.","settings.channelsUnavailable":"Kanalliste nicht verfuegbar, gib den Index von Hand ein.","settings.defaultPskWarning":"Dieser Kanal nutzt noch den Standardschluessel von Meshtastic, der oeffentlich ist. Jeder in der Naehe kann mitlesen und Befehle senden. Nutze fuer die Haussteuerung einen Kanal mit eigenem Schluessel.","settings.reachable":"Node als erreichbar gelten lassen fuer (Minuten)","settings.reachableHint":"Wie kuerzlich ein Node gehoert worden sein muss, um gruen zu erscheinen. Zwei Stunden passen zu einer festen Installation, ein viel kuerzeres Fenster sagt im Feld mehr aus.","settings.requireAck":"Empfangsbestaetigung anfordern","settings.requireAckHint":"Sagt dir, ob die Nachricht zugestellt wurde, um den Preis eines Rueckpakets pro Nachricht. In einem ausgelasteten Mesh ist das echte Sendezeit.","settings.rateLimit":"Maximale Befehle pro Node und Minute","settings.rateLimitHint":"Schuetzt vor einem fehlerhaften Node oder einem Repeater, der Pakete dupliziert. 0 schaltet das Limit ab.","settings.caseSensitive":"Gross- und Kleinschreibung beachten","settings.caseSensitiveHint":"Standardmaessig aus, und meist besser so: Handytastaturen und die Meshtastic-App schreiben von selbst gross, ein strikter Vergleich wuerde also Status fuer ein als status geschriebenes Schluesselwort ablehnen.","settings.helpKeyword":"Hilfe-Schluesselwort","settings.helpKeywordHint":"Antwortet mit der Liste der verfuegbaren Befehle, fuer Leute im Mesh ohne Zugang zu Home Assistant. Leer deaktiviert es. Nur autorisierte Nodes bekommen eine Antwort.","settings.refresh":"Aktualisieren","settings.refreshHint":"Liest Kanaele und Nodes erneut vom Funkgeraet, nach einer Aenderung in der Meshtastic-App","settings.firmware":"Firmware","settings.gatewayFirmware":"Gateway-Firmware","settings.channelsFound":"Vom Funkgeraet gelesene Kanaele","settings.channelsNone":"keine, der Node verbindet sich moeglicherweise noch","settings.firmwareSameNote":"Pruefe, dass alle Nodes und Repeater dieselbe Firmware-Version haben oder Versionen, die als kompatibel bekannt sind. Gemischte Versionen fuehren dazu, dass Nachrichten bei einem Node ankommen und bei einem anderen nicht.","settings.firmwareDmNote":"Direktnachrichten brauchen auf beiden Seiten eine aktuelle Firmware. Bei aelteren Versionen wird die Verschluesselung nicht erkannt, die Nachricht erreicht Home Assistant nicht und keine Entitaet aendert ihren Zustand. Laesst sich ein Node nicht aktualisieren, nutze einen Kanal.","settings.firmwareOnlyGateway":"Nur das Gateway meldet seine Firmware an Home Assistant, die anderen Nodes muessen in der Meshtastic-App geprueft werden.","settings.pinSize":"Punktgroesse","settings.pinSize.small":"Klein","settings.pinSize.medium":"Mittel","settings.pinSize.large":"Gross","settings.mapLabels":"Node-Namen auf der Karte anzeigen","settings.mapLabelsHint":"Nuetzlich bei wenigen Nodes, unuebersichtlich bei vielen.","settings.mapNodesHint":"Nur diese Nodes werden im Karten-Tab als Punkte gezeichnet. Die Karte hat einen Schalter, um kurzzeitig das ganze Mesh zu zeigen.","settings.authorizedHint":"Nur diese Nodes können Befehle auslösen. Alle anderen werden ohne Antwort ignoriert.","settings.noNodes":"Noch kein Meshtastic-Node gefunden.","messages.title":"Nachrichten","messages.gateway":"Gateway","messages.listening":"Empfaengt auf","messages.listeningHint":"Der Kanal, auf dem dieses Gateway Befehle empfaengt","messages.repliesOn":"Wo dieser Befehl antwortet","messages.onDm":"Direktnachricht","messages.add":"Nachricht hinzufügen","messages.empty":"Noch keine Befehle konfiguriert.","messages.keyword":"Schlüsselwort","messages.matchType":"Übereinstimmungstyp","messages.service":"Dienst (domain.service)","messages.serviceHint":"Optional. Leer lassen für einen Befehl, der nur antwortet.","messages.target":"Ziel-Entität","messages.targetHint":"Die Entität, auf die der Dienst wirkt. Leer lassen, wenn der Dienst keine benötigt.","messages.replyHint":"Optional. Verwende {state:entity_id} oder {attr:entity_id:attribute}.","messages.replyTemplate":"Antwortvorlage","messages.replyTo":"Antwort-Routing","messages.exact":"Exakte Übereinstimmung","messages.startswith":"Beginnt mit","messages.onChannel":"Auf dem Kanal","messages.senderDm":"DM an Absender","messages.replyChannel":"Auf welchem Kanal","messages.replyChannelSame":"Der, auf dem er ankam","messages.replyChannelHint":"Die Antwort geht nur hierhin. Befehle von jedem anderen Kanal werden ohne Antwort ignoriert, das ist also eine Grenze und keine blosse Zustellung.","messages.dmGatewayNote":"Dieses Gateway empfaengt Direktnachrichten, Antworten gehen also immer privat zurueck: einen privaten Befehl auf einem Kanal zu beantworten wuerde den Zustand deines Hauses allen Mithoerenden veroeffentlichen. Um auf einem Kanal zu antworten, stelle das Gateway in den Einstellungen auf Kanalmodus um.","messages.confirmDelete":"Diesen Befehl löschen?","messages.keywordHint":"Der Text, den man von einem Meshtastic-Node sendet, um ihn auszulösen.","messages.matchHint":'Nutze "Beginnt mit", wenn ein Wert akzeptiert werden soll, etwa "temp 21".',"messages.paletteEntity":"Entität wählen","messages.paletteHint":"Wähle, was du lesen oder steuern willst, dann klicke unten einen Button.","messages.pickEntityFirst":"Wähle eine Entität, um zu sehen, was möglich ist.","messages.groupRead":"Lesen","messages.groupDo":"Ausführen","messages.readState":"Wert","messages.templateHint":"Mit den Buttons oben zusammenstellen. Aktions-Buttons führen aus und senden keinen Text.","messages.advanced":"Erweitert","messages.hideAdvanced":"Erweitert ausblenden","common.save":"Speichern","common.cancel":"Abbrechen","common.edit":"Bearbeiten","common.duplicate":"Duplizieren","common.delete":"Löschen","common.loading":"Wird geladen","common.saved":"Gespeichert","common.noEntries":"Noch kein Hermes-Gateway konfiguriert.","common.loadError":"Daten konnten nicht aus Home Assistant geladen werden."}};const ve=r`
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

  /* A compact card is one card among many in a column: it has to end where its
   * content ends, not stretch to whatever the row happens to be. */
  :host([compact]) {
    height: auto;
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
`,ye=r`
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
    /* Values are user text: a command with no spaces, or an error message
     * carrying an entity id, has to wrap rather than run off the card. */
    min-width: 0;
    overflow-wrap: anywhere;
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

  /* Wraps instead of overflowing: in a narrow column the buttons used to fall
   * out of line with the text they belong to. */
  .list-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px 12px;
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    background: var(--surface);
    margin-bottom: 8px;
  }

  .list-row .meta {
    flex: 1 1 220px;
  }

  .list-row .actions {
    flex: 0 0 auto;
    flex-wrap: nowrap;
  }

  @media (max-width: 520px) {
    .list-row .actions {
      flex: 1 1 100%;
      flex-wrap: wrap;
    }
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

  /* Next to the button that caused it, vertically centred on the same row:
   * in a title it could scroll out of view while the button stayed visible. */
  .toast {
    display: inline-flex;
    align-items: center;
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--ok);
    white-space: nowrap;
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

  .dot.relay {
    background: #4aa3ff;
  }

  .checklist {
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-height: 220px;
    overflow-y: auto;
    border: 1px solid var(--border);
    border-radius: var(--r-sm);
    padding: 8px 10px;
    background: var(--bg-sunken);
  }

  .checklist .check {
    justify-content: flex-start;
    gap: 8px;
    padding: 3px 0;
  }

  .checklist .node-num {
    margin-left: auto;
  }

  button.btn.refresh {
    margin-left: 10px;
    padding: 4px 12px;
    font-size: 0.72rem;
    vertical-align: middle;
  }

  .field.indented {
    margin-left: 16px;
    padding-left: 12px;
    border-left: 2px solid var(--border);
  }

  .channel-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-left: 10px;
    padding: 3px 10px;
    border-radius: var(--r-pill);
    border: 2px solid var(--accent);
    background: var(--surface);
    color: var(--text);
    font-size: 0.72rem;
    font-weight: 700;
    white-space: nowrap;
    vertical-align: middle;
  }

  .channel-badge.small {
    margin-left: 0;
    font-size: 0.68rem;
    padding: 2px 8px;
  }

  .note {
    font-size: 0.78rem;
    line-height: 1.45;
    padding: 8px 10px;
    border-left: 3px solid var(--accent);
    background: var(--bg-sunken);
    border-radius: var(--r-sm);
    margin-bottom: 8px;
  }

  .note.warn {
    border-left-color: var(--danger);
  }

  .dot.bad {
    background: var(--danger);
  }

  .used {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: var(--text-muted);
    margin-left: 6px;
  }

  .warn-badge {
    margin-left: 8px;
    font-size: 0.68rem;
    font-weight: 700;
    color: var(--danger);
    text-transform: none;
    letter-spacing: 0;
  }

  .chip .count {
    margin-left: 6px;
    font-size: 0.66rem;
    font-weight: 700;
    opacity: 0.7;
    font-variant-numeric: tabular-nums;
  }

  .chat-log {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 50vh;
    overflow-y: auto;
    padding: 12px;
    background: var(--bg-sunken);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
  }

  .bubble {
    max-width: 80%;
    padding: 8px 11px;
    border-radius: var(--r-md);
    background: var(--surface);
    border: 1px solid var(--border);
  }

  /* Ours sit on the right with the accent edge, theirs on the left, which is
   * the arrangement every messaging app has taught people to read. */
  .bubble.out {
    align-self: flex-end;
    border-color: var(--accent);
    box-shadow: inset -3px 0 0 var(--accent);
  }

  .bubble .who {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--text-muted);
    margin-bottom: 2px;
  }

  .bubble .text {
    font-size: 0.86rem;
    word-break: break-word;
    white-space: pre-wrap;
  }

  .bubble .when {
    font-size: 0.66rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
    margin-top: 3px;
  }

  .chat-send {
    display: flex;
    gap: 8px;
    margin-top: 12px;
  }

  .chat-send input {
    flex: 1;
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

  /* --- Compact cards ----------------------------------------------------
   *
   * The panel card owns a whole view and stretches to it. These two sit in a
   * dashboard column next to unrelated cards, so they take the height their
   * content needs and measure themselves rather than the window: a column can
   * be a quarter of the screen wide on a desktop, which no viewport media
   * query would ever notice. */
  .shell.compact {
    height: auto;
    container-type: inline-size;
  }

  .shell.compact .content {
    padding: 14px;
    overflow: visible;
  }

  .shell.compact .screen-title {
    font-size: 0.95rem;
  }

  /* Tall enough to hold a conversation, short enough to leave room for the
   * cards underneath it. */
  .shell.compact .chat-log {
    max-height: 320px;
  }

  .summary-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 10px;
  }

  .summary-title {
    font-weight: 700;
    font-size: 0.95rem;
  }

  /* The radio link being down makes every other reading meaningless, so it
   * marks the whole card instead of one row. */
  .summary[data-warn="1"] {
    border-left: 3px solid var(--warn);
    padding-left: 11px;
    margin-left: -14px;
  }

  @container (max-width: 330px) {
    .row {
      flex-direction: column;
      align-items: flex-start;
      gap: 1px;
    }

    .row .v {
      text-align: left;
    }
  }
`;function be(e,t){const n=e.chats[t];return n?.length?n[n.length-1].ts:""}function we(e,t,n){const i=Number(e.split(":")[1]),s=t.channels.find(e=>e.index===i);return s?`${i}: ${s.name}`:`${n("settings.channel")} ${i}`}function xe(e,t){const n=e.split(":")[1],i=t.nodes.find(e=>String(e.node_num)===n);return i?i.name:n}function ke(e,t,n,i){const s=e.chats[t]?.length??0;return W`
    <button
      class="chip"
      data-on=${t===n?"1":"0"}
      @click=${()=>e.onSelect(t)}
    >
      ${i}${s?W`<span class="count">${s}</span>`:""}
    </button>
  `}function ze(e,t){const n=function(e){const t=e.channels.map(e=>`channel:${e.index}`),n=Object.keys(e.chats).filter(e=>e.startsWith("channel:"));return[...new Set([...t,...n])].sort((e,t)=>Number(e.split(":")[1])-Number(t.split(":")[1]))}(e),i=function(e){return Object.keys(e.chats).filter(e=>e.startsWith("node:")).sort((t,n)=>be(e,n).localeCompare(be(e,t)))}(e),s=[...n,...i];if(!s.length)return W`
      <h2 class="screen-title">${t("tab.chat")}</h2>
      <div class="empty">${t("chat.noChannels")}</div>
    `;const a=e.thread&&s.includes(e.thread)?e.thread:s[0],o=e.chats[a]??[],r=a.startsWith("channel:");return W`
    <h2 class="screen-title">${t("tab.chat")}</h2>

    <div class="section-title">${t("chat.channels")}</div>
    <div class="chips" style="margin-bottom:10px">
      ${n.map(n=>ke(e,n,a,we(n,e,t)))}
    </div>

    ${i.length?W`
          <div class="section-title">${t("chat.direct")}</div>
          <div class="chips" style="margin-bottom:12px">
            ${i.map(t=>ke(e,t,a,xe(t,e)))}
          </div>
        `:""}

    <div class="chat-log">
      ${o.length?o.map(e=>W`
              <div class="bubble ${e.outgoing?"out":"in"}">
                ${e.outgoing?"":W`<div class="who">
                      ${e.name||e.node||t("devices.unknown")}
                    </div>`}
                <div class="text">${e.text}</div>
                <div class="when">
                  ${e.ts?new Date(e.ts).toLocaleString():""}
                </div>
              </div>
            `):W`<div class="hint">${t("chat.emptyThread")}</div>`}
    </div>

    <div class="chat-send">
      <input
        .value=${e.draft}
        placeholder=${r?`${t("chat.sendOn")} ${we(a,e,t)}`:`${t("chat.sendTo")} ${xe(a,e)}`}
        @input=${t=>e.onDraft(t.target.value)}
        @keydown=${t=>{"Enter"===t.key&&e.draft.trim()&&e.onSend()}}
      />
      <button
        class="btn primary"
        ?disabled=${!e.draft.trim()||e.sending}
        @click=${e.onSend}
      >
        ${e.sending?t("common.loading"):t("chat.send")}
      </button>
    </div>

    ${o.length?W`
          <div class="actions">
            <button class="btn danger" @click=${()=>e.onClear(a)}>
              ${t("chat.clear")}
            </button>
          </div>
        `:""}

    <div class="hint">${t("chat.note")}</div>
  `}const $e="meshtastic",Pe="hermes";function Se(e,t){const n=e.entities;return n?Object.values(n).filter(e=>e.platform===t):Object.keys(e.states).filter(e=>e.includes(t)).map(e=>({entity_id:e,platform:t}))}function Le(e,t){for(const n of Se(e,Pe))if(n.entity_id.endsWith(t)){const t=e.states[n.entity_id];if(t)return t}}function Te(e){return Se(e,Pe).length>0}function Ce(e,t){const n=e.devices?.[t];if(!n?.identifiers)return null;for(const e of n.identifiers)if(e?.[0]===$e){const t=Number.parseInt(String(e[1]),10);return Number.isNaN(t)?null:t}return null}function Ee(e){const t=(e.split(".")[1]??e).split("_");return t.slice(Math.max(t.length-2,0)).join(" ")}function Ae(e){const t=new Map;for(const n of Se(e,$e)){const i=n.device_id;if(!i)continue;const s=e.states[n.entity_id];if(!s)continue;let a=t.get(i);if(!a){const n=e.devices?.[i];a={deviceId:i,nodeNum:Ce(e,i),name:n?.name_by_user||n?.name||s.attributes?.friendly_name||i,values:{}},t.set(i,a)}a.values[Ee(n.entity_id)]=s}return[...t.values()].sort((e,t)=>e.name.localeCompare(t.name))}function Me(e,t){return!!e&&Date.now()-1e3*e<6e4*t}function He(e,t,n=120){if(!t)return!1;const i=e.states[t];if(!i||"unavailable"===i.state||"unknown"===i.state)return!1;const s=Date.parse(i.state);return!Number.isNaN(s)&&Date.now()-s<=60*n*1e3}const Ne=[/\{state:([^:}]+)\}/g,/\{attr:([^:}]+):[^}]+\}/g,/\{do:[^:}]+:([^:}]+?)(?::[^}]*)?\}/g];const Ie=["battery","voltage","snr","hops","last_heard","utilization","uptime"];function De(e){const t=e.attributes?.unit_of_measurement;return t?`${e.state} ${t}`:e.state}function Oe(e,t){const n=Ae(e);return n.length?W`
    <h2 class="screen-title">${t("devices.title")}</h2>
    <div class="grid">
      ${n.map(e=>W`
          <div class="panel">
            <div class="node-head">
              <span class="node-name">${e.name}</span>
              <span class="node-num"
                >${e.nodeNum??t("devices.unknown")}</span
              >
            </div>
            ${function(e){const{headline:t,rest:n}=function(e){const t=Object.entries(e),n=e=>Ie.findIndex(t=>e.toLowerCase().includes(t)),i=t.filter(([e])=>n(e)>=0).sort((e,t)=>n(e[0])-n(t[0]));return{headline:i,rest:t.filter(([e])=>n(e)<0)}}(e);return W`
    <div class="rows">
      ${[...t,...n].map(([e,t])=>W`
          <div class="row">
            <span class="k">${e}</span>
            <span class="v">${De(t)}</span>
          </div>
        `)}
    </div>
  `}(e.values)}
          </div>
        `)}
    </div>
  `:W`<div class="empty">${t("devices.empty")}</div>`}const Re="missing";function Be(e,t){const n=function(e){const t=new Map,n=(e,n)=>{const i=e.trim();if(!i.includes("."))return;const s=t.get(i)??[];s.includes(n)||s.push(n),t.set(i,s)};for(const t of e)for(const e of t.commands??[]){const t=e.keyword||"?",i=e.target?.entity_id;"string"==typeof i&&n(i,t);const s=e.reply_template??"";for(const e of Ne){let i;for(e.lastIndex=0;null!==(i=e.exec(s));)n(i[1],t)}}return new Map([...t.entries()].sort((e,t)=>e[0].localeCompare(t[0])))}(e.entries),i=function(e){const t=[];for(const n of Se(e,Pe)){const i=e.states[n.entity_id];i&&t.push(i)}return t.sort((e,t)=>e.entity_id.localeCompare(t.entity_id))}(e.hass),s=[...n.entries()].map(([t,n])=>{const i=e.hass.states[t];return{entityId:t,keywords:n,state:i,status:i?"unavailable"===i.state||"unknown"===i.state?i.state:"":Re}}),a=s.filter(e=>""!==e.status).length;return W`
    <h2 class="screen-title">${t("tab.homeassistant")}</h2>

    <div class="section">
      <div class="section-title">${t("ha.shared")}</div>
      ${i.length?W`
            <div class="rows">
              ${i.map(e=>W`
                  <div class="row">
                    <span class="k">
                      ${e.attributes?.friendly_name||e.entity_id}
                    </span>
                    <span class="v">${De(e)}</span>
                  </div>
                `)}
            </div>
          `:W`<div class="empty">${t("ha.noEntities")}</div>`}
    </div>

    <div class="section">
      <div class="section-title">
        ${t("ha.connected")}
        ${a?W`<span class="warn-badge">${a} ${t("ha.problems")}</span>`:""}
      </div>
      ${s.length?W`
            <div class="rows">
              ${s.map(e=>W`
                  <div class="row">
                    <span class="k">
                      <span
                        class="dot ${""===e.status?"on":"bad"}"
                      ></span>
                      ${e.state?.attributes?.friendly_name||e.entityId}
                      <span class="used">${e.keywords.join(", ")}</span>
                    </span>
                    <span class="v">
                      ${e.status===Re?t("ha.missing"):e.state?De(e.state):""}
                    </span>
                  </div>
                `)}
            </div>
          `:W`<div class="empty">${t("ha.noReferences")}</div>`}
    </div>

    <div class="section">
      <div class="section-title">${t("ha.test")}</div>
      <div class="panel">
        <div class="field">
          <label>${t("ha.testText")}</label>
          <input
            .value=${e.testText}
            placeholder=${t("ha.testPlaceholder")}
            @input=${t=>e.onTestText(t.target.value)}
          />
          <span class="hint">${t("ha.testHint")}</span>
        </div>
        <div class="actions">
          <button
            class="btn primary"
            ?disabled=${!e.testText||!e.entries.length||e.sending}
            @click=${e.onSendTest}
          >
            ${e.sending?t("common.loading"):t("ha.sendTest")}
          </button>
        </div>
      </div>
    </div>
  `}function Ze(e,t){const n=e.filter?e.entries.filter(t=>t.direction===e.filter):e.entries;return W`
    <h2 class="screen-title">
      ${t("tab.log")}
      <button class="btn refresh" @click=${e.onRefresh}>
        ${t("settings.refresh")}
      </button>
      ${e.updatedAt?W`<span class="hint">${t("status.updatedAt")} ${e.updatedAt}</span>`:""}
    </h2>

    ${e.entries_meta.map(e=>W`
        <div class="note">
          <b>${e.title}</b>:
          ${Object.keys(e.counts).length?Object.entries(e.counts).map(([e,n])=>`${n} ${t(`status.reason.${e}`)}`).join(", "):t("log.nothingReceived")}
        </div>
      `)}

    <div class="map-controls">
      ${["","in","out"].map(n=>W`
          <button
            class="chip"
            data-on=${e.filter===n?"1":"0"}
            @click=${()=>e.onFilter(n)}
          >
            ${t(""===n?"log.all":"in"===n?"log.received":"log.sent")}
          </button>
        `)}
      <button class="btn danger" style="margin-left:auto" @click=${e.onClear}>
        ${t("log.clear")}
      </button>
    </div>

    ${0===n.length?W`<div class="empty">${t("log.empty")}</div>`:W`
          <div class="rows">
            ${n.map(e=>function(e,t){const n=e.ts?new Date(e.ts).toLocaleString():"",i=`log.outcome.${e.outcome}`,s=t(i);return W`
    <div class="log-row">
      <span class="dir ${e.direction}">
        ${"in"===e.direction?"←":"→"}
      </span>
      <div class="log-body">
        <div class="log-text">${e.text}</div>
        <div class="log-meta">
          ${n}${e.node?` · ${e.node}`:""}
          ${s&&s!==i?` · ${s}`:""}
        </div>
      </div>
    </div>
  `}(e,t))}
          </div>
        `}

    <div class="hint" style="margin-top:12px">${t("log.privacy")}</div>
  `}var je,qe={exports:{}};var Fe=(je||(je=1,function(e){var t="1.9.4";function n(e){var t,n,i,s;for(n=1,i=arguments.length;n<i;n++)for(t in s=arguments[n])e[t]=s[t];return e}var i=Object.create||function(){function e(){}return function(t){return e.prototype=t,new e}}();function s(e,t){var n=Array.prototype.slice;if(e.bind)return e.bind.apply(e,n.call(arguments,1));var i=n.call(arguments,2);return function(){return e.apply(t,i.length?i.concat(n.call(arguments)):arguments)}}var a=0;function o(e){return"_leaflet_id"in e||(e._leaflet_id=++a),e._leaflet_id}function r(e,t,n){var i,s,a,o;return o=function(){i=!1,s&&(a.apply(n,s),s=!1)},a=function(){i?s=arguments:(e.apply(n,arguments),setTimeout(o,t),i=!0)},a}function l(e,t,n){var i=t[1],s=t[0],a=i-s;return e===i&&n?e:((e-s)%a+a)%a+s}function h(){return!1}function d(e,t){if(!1===t)return e;var n=Math.pow(10,void 0===t?6:t);return Math.round(e*n)/n}function c(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function u(e){return c(e).split(/\s+/)}function p(e,t){for(var n in Object.prototype.hasOwnProperty.call(e,"options")||(e.options=e.options?i(e.options):{}),t)e.options[n]=t[n];return e.options}function m(e,t,n){var i=[];for(var s in e)i.push(encodeURIComponent(n?s.toUpperCase():s)+"="+encodeURIComponent(e[s]));return(t&&-1!==t.indexOf("?")?"&":"?")+i.join("&")}var g=/\{ *([\w_ -]+) *\}/g;function f(e,t){return e.replace(g,function(e,n){var i=t[n];if(void 0===i)throw new Error("No value provided for variable "+e);return"function"==typeof i&&(i=i(t)),i})}var _=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)};function v(e,t){for(var n=0;n<e.length;n++)if(e[n]===t)return n;return-1}var y="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function b(e){return window["webkit"+e]||window["moz"+e]||window["ms"+e]}var w=0;function x(e){var t=+new Date,n=Math.max(0,16-(t-w));return w=t+n,window.setTimeout(e,n)}var k=window.requestAnimationFrame||b("RequestAnimationFrame")||x,z=window.cancelAnimationFrame||b("CancelAnimationFrame")||b("CancelRequestAnimationFrame")||function(e){window.clearTimeout(e)};function $(e,t,n){if(!n||k!==x)return k.call(window,s(e,t));e.call(t)}function P(e){e&&z.call(window,e)}var S={__proto__:null,extend:n,create:i,bind:s,get lastId(){return a},stamp:o,throttle:r,wrapNum:l,falseFn:h,formatNum:d,trim:c,splitWords:u,setOptions:p,getParamString:m,template:f,isArray:_,indexOf:v,emptyImageUrl:y,requestFn:k,cancelFn:z,requestAnimFrame:$,cancelAnimFrame:P};function T(){}function C(e){if("undefined"!=typeof L&&L&&L.Mixin){e=_(e)?e:[e];for(var t=0;t<e.length;t++)e[t]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",(new Error).stack)}}T.extend=function(e){var t=function(){p(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},s=t.__super__=this.prototype,a=i(s);for(var o in a.constructor=t,t.prototype=a,this)Object.prototype.hasOwnProperty.call(this,o)&&"prototype"!==o&&"__super__"!==o&&(t[o]=this[o]);return e.statics&&n(t,e.statics),e.includes&&(C(e.includes),n.apply(null,[a].concat(e.includes))),n(a,e),delete a.statics,delete a.includes,a.options&&(a.options=s.options?i(s.options):{},n(a.options,e.options)),a._initHooks=[],a.callInitHooks=function(){if(!this._initHooksCalled){s.callInitHooks&&s.callInitHooks.call(this),this._initHooksCalled=!0;for(var e=0,t=a._initHooks.length;e<t;e++)a._initHooks[e].call(this)}},t},T.include=function(e){var t=this.prototype.options;return n(this.prototype,e),e.options&&(this.prototype.options=t,this.mergeOptions(e.options)),this},T.mergeOptions=function(e){return n(this.prototype.options,e),this},T.addInitHook=function(e){var t=Array.prototype.slice.call(arguments,1),n="function"==typeof e?e:function(){this[e].apply(this,t)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(n),this};var E={on:function(e,t,n){if("object"==typeof e)for(var i in e)this._on(i,e[i],t);else for(var s=0,a=(e=u(e)).length;s<a;s++)this._on(e[s],t,n);return this},off:function(e,t,n){if(arguments.length)if("object"==typeof e)for(var i in e)this._off(i,e[i],t);else{e=u(e);for(var s=1===arguments.length,a=0,o=e.length;a<o;a++)s?this._off(e[a]):this._off(e[a],t,n)}else delete this._events;return this},_on:function(e,t,n,i){if("function"==typeof t){if(!1===this._listens(e,t,n)){n===this&&(n=void 0);var s={fn:t,ctx:n};i&&(s.once=!0),this._events=this._events||{},this._events[e]=this._events[e]||[],this._events[e].push(s)}}else console.warn("wrong listener type: "+typeof t)},_off:function(e,t,n){var i,s,a;if(this._events&&(i=this._events[e]))if(1!==arguments.length)if("function"==typeof t){var o=this._listens(e,t,n);if(!1!==o){var r=i[o];this._firingCount&&(r.fn=h,this._events[e]=i=i.slice()),i.splice(o,1)}}else console.warn("wrong listener type: "+typeof t);else{if(this._firingCount)for(s=0,a=i.length;s<a;s++)i[s].fn=h;delete this._events[e]}},fire:function(e,t,i){if(!this.listens(e,i))return this;var s=n({},t,{type:e,target:this,sourceTarget:t&&t.sourceTarget||this});if(this._events){var a=this._events[e];if(a){this._firingCount=this._firingCount+1||1;for(var o=0,r=a.length;o<r;o++){var l=a[o],h=l.fn;l.once&&this.off(e,h,l.ctx),h.call(l.ctx||this,s)}this._firingCount--}}return i&&this._propagateEvent(s),this},listens:function(e,t,n,i){"string"!=typeof e&&console.warn('"string" type argument expected');var s=t;"function"!=typeof t&&(i=!!t,s=void 0,n=void 0);var a=this._events&&this._events[e];if(a&&a.length&&!1!==this._listens(e,s,n))return!0;if(i)for(var o in this._eventParents)if(this._eventParents[o].listens(e,t,n,i))return!0;return!1},_listens:function(e,t,n){if(!this._events)return!1;var i=this._events[e]||[];if(!t)return!!i.length;n===this&&(n=void 0);for(var s=0,a=i.length;s<a;s++)if(i[s].fn===t&&i[s].ctx===n)return s;return!1},once:function(e,t,n){if("object"==typeof e)for(var i in e)this._on(i,e[i],t,!0);else for(var s=0,a=(e=u(e)).length;s<a;s++)this._on(e[s],t,n,!0);return this},addEventParent:function(e){return this._eventParents=this._eventParents||{},this._eventParents[o(e)]=e,this},removeEventParent:function(e){return this._eventParents&&delete this._eventParents[o(e)],this},_propagateEvent:function(e){for(var t in this._eventParents)this._eventParents[t].fire(e.type,n({layer:e.target,propagatedFrom:e.target},e),!0)}};E.addEventListener=E.on,E.removeEventListener=E.clearAllEventListeners=E.off,E.addOneTimeEventListener=E.once,E.fireEvent=E.fire,E.hasEventListeners=E.listens;var A=T.extend(E);function M(e,t,n){this.x=n?Math.round(e):e,this.y=n?Math.round(t):t}var H=Math.trunc||function(e){return e>0?Math.floor(e):Math.ceil(e)};function N(e,t,n){return e instanceof M?e:_(e)?new M(e[0],e[1]):null==e?e:"object"==typeof e&&"x"in e&&"y"in e?new M(e.x,e.y):new M(e,t,n)}function I(e,t){if(e)for(var n=t?[e,t]:e,i=0,s=n.length;i<s;i++)this.extend(n[i])}function D(e,t){return!e||e instanceof I?e:new I(e,t)}function O(e,t){if(e)for(var n=t?[e,t]:e,i=0,s=n.length;i<s;i++)this.extend(n[i])}function R(e,t){return e instanceof O?e:new O(e,t)}function B(e,t,n){if(isNaN(e)||isNaN(t))throw new Error("Invalid LatLng object: ("+e+", "+t+")");this.lat=+e,this.lng=+t,void 0!==n&&(this.alt=+n)}function Z(e,t,n){return e instanceof B?e:_(e)&&"object"!=typeof e[0]?3===e.length?new B(e[0],e[1],e[2]):2===e.length?new B(e[0],e[1]):null:null==e?e:"object"==typeof e&&"lat"in e?new B(e.lat,"lng"in e?e.lng:e.lon,e.alt):void 0===t?null:new B(e,t,n)}M.prototype={clone:function(){return new M(this.x,this.y)},add:function(e){return this.clone()._add(N(e))},_add:function(e){return this.x+=e.x,this.y+=e.y,this},subtract:function(e){return this.clone()._subtract(N(e))},_subtract:function(e){return this.x-=e.x,this.y-=e.y,this},divideBy:function(e){return this.clone()._divideBy(e)},_divideBy:function(e){return this.x/=e,this.y/=e,this},multiplyBy:function(e){return this.clone()._multiplyBy(e)},_multiplyBy:function(e){return this.x*=e,this.y*=e,this},scaleBy:function(e){return new M(this.x*e.x,this.y*e.y)},unscaleBy:function(e){return new M(this.x/e.x,this.y/e.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=H(this.x),this.y=H(this.y),this},distanceTo:function(e){var t=(e=N(e)).x-this.x,n=e.y-this.y;return Math.sqrt(t*t+n*n)},equals:function(e){return(e=N(e)).x===this.x&&e.y===this.y},contains:function(e){return e=N(e),Math.abs(e.x)<=Math.abs(this.x)&&Math.abs(e.y)<=Math.abs(this.y)},toString:function(){return"Point("+d(this.x)+", "+d(this.y)+")"}},I.prototype={extend:function(e){var t,n;if(!e)return this;if(e instanceof M||"number"==typeof e[0]||"x"in e)t=n=N(e);else if(t=(e=D(e)).min,n=e.max,!t||!n)return this;return this.min||this.max?(this.min.x=Math.min(t.x,this.min.x),this.max.x=Math.max(n.x,this.max.x),this.min.y=Math.min(t.y,this.min.y),this.max.y=Math.max(n.y,this.max.y)):(this.min=t.clone(),this.max=n.clone()),this},getCenter:function(e){return N((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,e)},getBottomLeft:function(){return N(this.min.x,this.max.y)},getTopRight:function(){return N(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(e){var t,n;return(e="number"==typeof e[0]||e instanceof M?N(e):D(e))instanceof I?(t=e.min,n=e.max):t=n=e,t.x>=this.min.x&&n.x<=this.max.x&&t.y>=this.min.y&&n.y<=this.max.y},intersects:function(e){e=D(e);var t=this.min,n=this.max,i=e.min,s=e.max,a=s.x>=t.x&&i.x<=n.x,o=s.y>=t.y&&i.y<=n.y;return a&&o},overlaps:function(e){e=D(e);var t=this.min,n=this.max,i=e.min,s=e.max,a=s.x>t.x&&i.x<n.x,o=s.y>t.y&&i.y<n.y;return a&&o},isValid:function(){return!(!this.min||!this.max)},pad:function(e){var t=this.min,n=this.max,i=Math.abs(t.x-n.x)*e,s=Math.abs(t.y-n.y)*e;return D(N(t.x-i,t.y-s),N(n.x+i,n.y+s))},equals:function(e){return!!e&&(e=D(e),this.min.equals(e.getTopLeft())&&this.max.equals(e.getBottomRight()))}},O.prototype={extend:function(e){var t,n,i=this._southWest,s=this._northEast;if(e instanceof B)t=e,n=e;else{if(!(e instanceof O))return e?this.extend(Z(e)||R(e)):this;if(t=e._southWest,n=e._northEast,!t||!n)return this}return i||s?(i.lat=Math.min(t.lat,i.lat),i.lng=Math.min(t.lng,i.lng),s.lat=Math.max(n.lat,s.lat),s.lng=Math.max(n.lng,s.lng)):(this._southWest=new B(t.lat,t.lng),this._northEast=new B(n.lat,n.lng)),this},pad:function(e){var t=this._southWest,n=this._northEast,i=Math.abs(t.lat-n.lat)*e,s=Math.abs(t.lng-n.lng)*e;return new O(new B(t.lat-i,t.lng-s),new B(n.lat+i,n.lng+s))},getCenter:function(){return new B((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new B(this.getNorth(),this.getWest())},getSouthEast:function(){return new B(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(e){e="number"==typeof e[0]||e instanceof B||"lat"in e?Z(e):R(e);var t,n,i=this._southWest,s=this._northEast;return e instanceof O?(t=e.getSouthWest(),n=e.getNorthEast()):t=n=e,t.lat>=i.lat&&n.lat<=s.lat&&t.lng>=i.lng&&n.lng<=s.lng},intersects:function(e){e=R(e);var t=this._southWest,n=this._northEast,i=e.getSouthWest(),s=e.getNorthEast(),a=s.lat>=t.lat&&i.lat<=n.lat,o=s.lng>=t.lng&&i.lng<=n.lng;return a&&o},overlaps:function(e){e=R(e);var t=this._southWest,n=this._northEast,i=e.getSouthWest(),s=e.getNorthEast(),a=s.lat>t.lat&&i.lat<n.lat,o=s.lng>t.lng&&i.lng<n.lng;return a&&o},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(e,t){return!!e&&(e=R(e),this._southWest.equals(e.getSouthWest(),t)&&this._northEast.equals(e.getNorthEast(),t))},isValid:function(){return!(!this._southWest||!this._northEast)}},B.prototype={equals:function(e,t){return!!e&&(e=Z(e),Math.max(Math.abs(this.lat-e.lat),Math.abs(this.lng-e.lng))<=(void 0===t?1e-9:t))},toString:function(e){return"LatLng("+d(this.lat,e)+", "+d(this.lng,e)+")"},distanceTo:function(e){return q.distance(this,Z(e))},wrap:function(){return q.wrapLatLng(this)},toBounds:function(e){var t=180*e/40075017,n=t/Math.cos(Math.PI/180*this.lat);return R([this.lat-t,this.lng-n],[this.lat+t,this.lng+n])},clone:function(){return new B(this.lat,this.lng,this.alt)}};var j={latLngToPoint:function(e,t){var n=this.projection.project(e),i=this.scale(t);return this.transformation._transform(n,i)},pointToLatLng:function(e,t){var n=this.scale(t),i=this.transformation.untransform(e,n);return this.projection.unproject(i)},project:function(e){return this.projection.project(e)},unproject:function(e){return this.projection.unproject(e)},scale:function(e){return 256*Math.pow(2,e)},zoom:function(e){return Math.log(e/256)/Math.LN2},getProjectedBounds:function(e){if(this.infinite)return null;var t=this.projection.bounds,n=this.scale(e);return new I(this.transformation.transform(t.min,n),this.transformation.transform(t.max,n))},infinite:!1,wrapLatLng:function(e){var t=this.wrapLng?l(e.lng,this.wrapLng,!0):e.lng;return new B(this.wrapLat?l(e.lat,this.wrapLat,!0):e.lat,t,e.alt)},wrapLatLngBounds:function(e){var t=e.getCenter(),n=this.wrapLatLng(t),i=t.lat-n.lat,s=t.lng-n.lng;if(0===i&&0===s)return e;var a=e.getSouthWest(),o=e.getNorthEast();return new O(new B(a.lat-i,a.lng-s),new B(o.lat-i,o.lng-s))}},q=n({},j,{wrapLng:[-180,180],R:6371e3,distance:function(e,t){var n=Math.PI/180,i=e.lat*n,s=t.lat*n,a=Math.sin((t.lat-e.lat)*n/2),o=Math.sin((t.lng-e.lng)*n/2),r=a*a+Math.cos(i)*Math.cos(s)*o*o,l=2*Math.atan2(Math.sqrt(r),Math.sqrt(1-r));return this.R*l}}),F=6378137,W={R:F,MAX_LATITUDE:85.0511287798,project:function(e){var t=Math.PI/180,n=this.MAX_LATITUDE,i=Math.max(Math.min(n,e.lat),-n),s=Math.sin(i*t);return new M(this.R*e.lng*t,this.R*Math.log((1+s)/(1-s))/2)},unproject:function(e){var t=180/Math.PI;return new B((2*Math.atan(Math.exp(e.y/this.R))-Math.PI/2)*t,e.x*t/this.R)},bounds:function(){var e=F*Math.PI;return new I([-e,-e],[e,e])}()};function U(e,t,n,i){if(_(e))return this._a=e[0],this._b=e[1],this._c=e[2],void(this._d=e[3]);this._a=e,this._b=t,this._c=n,this._d=i}function G(e,t,n,i){return new U(e,t,n,i)}U.prototype={transform:function(e,t){return this._transform(e.clone(),t)},_transform:function(e,t){return t=t||1,e.x=t*(this._a*e.x+this._b),e.y=t*(this._c*e.y+this._d),e},untransform:function(e,t){return t=t||1,new M((e.x/t-this._b)/this._a,(e.y/t-this._d)/this._c)}};var K=n({},q,{code:"EPSG:3857",projection:W,transformation:function(){var e=.5/(Math.PI*W.R);return G(e,.5,-e,.5)}()}),V=n({},K,{code:"EPSG:900913"});function Y(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function J(e,t){var n,i,s,a,o,r,l="";for(n=0,s=e.length;n<s;n++){for(i=0,a=(o=e[n]).length;i<a;i++)l+=(i?"L":"M")+(r=o[i]).x+" "+r.y;l+=t?De.svg?"z":"x":""}return l||"M0 0"}var X,Q=document.documentElement.style,ee="ActiveXObject"in window,te=ee&&!document.addEventListener,ne="msLaunchUri"in navigator&&!("documentMode"in document),ie=Ie("webkit"),se=Ie("android"),ae=Ie("android 2")||Ie("android 3"),oe=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),re=se&&Ie("Google")&&oe<537&&!("AudioNode"in window),le=!!window.opera,he=!ne&&Ie("chrome"),de=Ie("gecko")&&!ie&&!le&&!ee,ce=!he&&Ie("safari"),ue=Ie("phantom"),pe="OTransition"in Q,me=0===navigator.platform.indexOf("Win"),ge=ee&&"transition"in Q,fe="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!ae,_e="MozPerspective"in Q,ve=!window.L_DISABLE_3D&&(ge||fe||_e)&&!pe&&!ue,ye="undefined"!=typeof orientation||Ie("mobile"),be=ye&&ie,we=ye&&fe,xe=!window.PointerEvent&&window.MSPointerEvent,ke=!(!window.PointerEvent&&!xe),ze="ontouchstart"in window||!!window.TouchEvent,$e=!window.L_NO_TOUCH&&(ze||ke),Pe=ye&&le,Se=ye&&de,Le=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,Te=function(){var e=!1;try{var t=Object.defineProperty({},"passive",{get:function(){e=!0}});window.addEventListener("testPassiveEventSupport",h,t),window.removeEventListener("testPassiveEventSupport",h,t)}catch(e){}return e}(),Ce=!!document.createElement("canvas").getContext,Ee=!(!document.createElementNS||!Y("svg").createSVGRect),Ae=!!Ee&&((X=document.createElement("div")).innerHTML="<svg/>","http://www.w3.org/2000/svg"===(X.firstChild&&X.firstChild.namespaceURI)),Me=!Ee&&function(){try{var e=document.createElement("div");e.innerHTML='<v:shape adj="1"/>';var t=e.firstChild;return t.style.behavior="url(#default#VML)",t&&"object"==typeof t.adj}catch(e){return!1}}(),He=0===navigator.platform.indexOf("Mac"),Ne=0===navigator.platform.indexOf("Linux");function Ie(e){return navigator.userAgent.toLowerCase().indexOf(e)>=0}var De={ie:ee,ielt9:te,edge:ne,webkit:ie,android:se,android23:ae,androidStock:re,opera:le,chrome:he,gecko:de,safari:ce,phantom:ue,opera12:pe,win:me,ie3d:ge,webkit3d:fe,gecko3d:_e,any3d:ve,mobile:ye,mobileWebkit:be,mobileWebkit3d:we,msPointer:xe,pointer:ke,touch:$e,touchNative:ze,mobileOpera:Pe,mobileGecko:Se,retina:Le,passiveEvents:Te,canvas:Ce,svg:Ee,vml:Me,inlineSvg:Ae,mac:He,linux:Ne},Oe=De.msPointer?"MSPointerDown":"pointerdown",Re=De.msPointer?"MSPointerMove":"pointermove",Be=De.msPointer?"MSPointerUp":"pointerup",Ze=De.msPointer?"MSPointerCancel":"pointercancel",je={touchstart:Oe,touchmove:Re,touchend:Be,touchcancel:Ze},qe={touchstart:Qe,touchmove:Xe,touchend:Xe,touchcancel:Xe},Fe={},We=!1;function Ue(e,t,n){return"touchstart"===t&&Je(),qe[t]?(n=qe[t].bind(this,n),e.addEventListener(je[t],n,!1),n):(console.warn("wrong event specified:",t),h)}function Ge(e,t,n){je[t]?e.removeEventListener(je[t],n,!1):console.warn("wrong event specified:",t)}function Ke(e){Fe[e.pointerId]=e}function Ve(e){Fe[e.pointerId]&&(Fe[e.pointerId]=e)}function Ye(e){delete Fe[e.pointerId]}function Je(){We||(document.addEventListener(Oe,Ke,!0),document.addEventListener(Re,Ve,!0),document.addEventListener(Be,Ye,!0),document.addEventListener(Ze,Ye,!0),We=!0)}function Xe(e,t){if(t.pointerType!==(t.MSPOINTER_TYPE_MOUSE||"mouse")){for(var n in t.touches=[],Fe)t.touches.push(Fe[n]);t.changedTouches=[t],e(t)}}function Qe(e,t){t.MSPOINTER_TYPE_TOUCH&&t.pointerType===t.MSPOINTER_TYPE_TOUCH&&Kt(t),Xe(e,t)}function et(e){var t,n,i={};for(n in e)t=e[n],i[n]=t&&t.bind?t.bind(e):t;return e=i,i.type="dblclick",i.detail=2,i.isTrusted=!1,i._simulated=!0,i}var tt=200;function nt(e,t){e.addEventListener("dblclick",t);var n,i=0;function s(e){if(1===e.detail){if("mouse"!==e.pointerType&&(!e.sourceCapabilities||e.sourceCapabilities.firesTouchEvents)){var s=Yt(e);if(!s.some(function(e){return e instanceof HTMLLabelElement&&e.attributes.for})||s.some(function(e){return e instanceof HTMLInputElement||e instanceof HTMLSelectElement})){var a=Date.now();a-i<=tt?2===++n&&t(et(e)):n=1,i=a}}}else n=e.detail}return e.addEventListener("click",s),{dblclick:t,simDblclick:s}}function it(e,t){e.removeEventListener("dblclick",t.dblclick),e.removeEventListener("click",t.simDblclick)}var st,at,ot,rt,lt,ht=Pt(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),dt=Pt(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),ct="webkitTransition"===dt||"OTransition"===dt?dt+"End":"transitionend";function ut(e){return"string"==typeof e?document.getElementById(e):e}function pt(e,t){var n=e.style[t]||e.currentStyle&&e.currentStyle[t];if((!n||"auto"===n)&&document.defaultView){var i=document.defaultView.getComputedStyle(e,null);n=i?i[t]:null}return"auto"===n?null:n}function mt(e,t,n){var i=document.createElement(e);return i.className=t||"",n&&n.appendChild(i),i}function gt(e){var t=e.parentNode;t&&t.removeChild(e)}function ft(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function _t(e){var t=e.parentNode;t&&t.lastChild!==e&&t.appendChild(e)}function vt(e){var t=e.parentNode;t&&t.firstChild!==e&&t.insertBefore(e,t.firstChild)}function yt(e,t){if(void 0!==e.classList)return e.classList.contains(t);var n=kt(e);return n.length>0&&new RegExp("(^|\\s)"+t+"(\\s|$)").test(n)}function bt(e,t){if(void 0!==e.classList)for(var n=u(t),i=0,s=n.length;i<s;i++)e.classList.add(n[i]);else if(!yt(e,t)){var a=kt(e);xt(e,(a?a+" ":"")+t)}}function wt(e,t){void 0!==e.classList?e.classList.remove(t):xt(e,c((" "+kt(e)+" ").replace(" "+t+" "," ")))}function xt(e,t){void 0===e.className.baseVal?e.className=t:e.className.baseVal=t}function kt(e){return e.correspondingElement&&(e=e.correspondingElement),void 0===e.className.baseVal?e.className:e.className.baseVal}function zt(e,t){"opacity"in e.style?e.style.opacity=t:"filter"in e.style&&$t(e,t)}function $t(e,t){var n=!1,i="DXImageTransform.Microsoft.Alpha";try{n=e.filters.item(i)}catch(e){if(1===t)return}t=Math.round(100*t),n?(n.Enabled=100!==t,n.Opacity=t):e.style.filter+=" progid:"+i+"(opacity="+t+")"}function Pt(e){for(var t=document.documentElement.style,n=0;n<e.length;n++)if(e[n]in t)return e[n];return!1}function St(e,t,n){var i=t||new M(0,0);e.style[ht]=(De.ie3d?"translate("+i.x+"px,"+i.y+"px)":"translate3d("+i.x+"px,"+i.y+"px,0)")+(n?" scale("+n+")":"")}function Lt(e,t){e._leaflet_pos=t,De.any3d?St(e,t):(e.style.left=t.x+"px",e.style.top=t.y+"px")}function Tt(e){return e._leaflet_pos||new M(0,0)}if("onselectstart"in document)st=function(){Ot(window,"selectstart",Kt)},at=function(){Bt(window,"selectstart",Kt)};else{var Ct=Pt(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);st=function(){if(Ct){var e=document.documentElement.style;ot=e[Ct],e[Ct]="none"}},at=function(){Ct&&(document.documentElement.style[Ct]=ot,ot=void 0)}}function Et(){Ot(window,"dragstart",Kt)}function At(){Bt(window,"dragstart",Kt)}function Mt(e){for(;-1===e.tabIndex;)e=e.parentNode;e.style&&(Ht(),rt=e,lt=e.style.outlineStyle,e.style.outlineStyle="none",Ot(window,"keydown",Ht))}function Ht(){rt&&(rt.style.outlineStyle=lt,rt=void 0,lt=void 0,Bt(window,"keydown",Ht))}function Nt(e){do{e=e.parentNode}while(!(e.offsetWidth&&e.offsetHeight||e===document.body));return e}function It(e){var t=e.getBoundingClientRect();return{x:t.width/e.offsetWidth||1,y:t.height/e.offsetHeight||1,boundingClientRect:t}}var Dt={__proto__:null,TRANSFORM:ht,TRANSITION:dt,TRANSITION_END:ct,get:ut,getStyle:pt,create:mt,remove:gt,empty:ft,toFront:_t,toBack:vt,hasClass:yt,addClass:bt,removeClass:wt,setClass:xt,getClass:kt,setOpacity:zt,testProp:Pt,setTransform:St,setPosition:Lt,getPosition:Tt,get disableTextSelection(){return st},get enableTextSelection(){return at},disableImageDrag:Et,enableImageDrag:At,preventOutline:Mt,restoreOutline:Ht,getSizedParentNode:Nt,getScale:It};function Ot(e,t,n,i){if(t&&"object"==typeof t)for(var s in t)qt(e,s,t[s],n);else for(var a=0,o=(t=u(t)).length;a<o;a++)qt(e,t[a],n,i);return this}var Rt="_leaflet_events";function Bt(e,t,n,i){if(1===arguments.length)Zt(e),delete e[Rt];else if(t&&"object"==typeof t)for(var s in t)Ft(e,s,t[s],n);else if(t=u(t),2===arguments.length)Zt(e,function(e){return-1!==v(t,e)});else for(var a=0,o=t.length;a<o;a++)Ft(e,t[a],n,i);return this}function Zt(e,t){for(var n in e[Rt]){var i=n.split(/\d/)[0];t&&!t(i)||Ft(e,i,null,null,n)}}var jt={mouseenter:"mouseover",mouseleave:"mouseout",wheel:!("onwheel"in window)&&"mousewheel"};function qt(e,t,n,i){var s=t+o(n)+(i?"_"+o(i):"");if(e[Rt]&&e[Rt][s])return this;var a=function(t){return n.call(i||e,t||window.event)},r=a;!De.touchNative&&De.pointer&&0===t.indexOf("touch")?a=Ue(e,t,a):De.touch&&"dblclick"===t?a=nt(e,a):"addEventListener"in e?"touchstart"===t||"touchmove"===t||"wheel"===t||"mousewheel"===t?e.addEventListener(jt[t]||t,a,!!De.passiveEvents&&{passive:!1}):"mouseenter"===t||"mouseleave"===t?(a=function(t){t=t||window.event,en(e,t)&&r(t)},e.addEventListener(jt[t],a,!1)):e.addEventListener(t,r,!1):e.attachEvent("on"+t,a),e[Rt]=e[Rt]||{},e[Rt][s]=a}function Ft(e,t,n,i,s){s=s||t+o(n)+(i?"_"+o(i):"");var a=e[Rt]&&e[Rt][s];if(!a)return this;!De.touchNative&&De.pointer&&0===t.indexOf("touch")?Ge(e,t,a):De.touch&&"dblclick"===t?it(e,a):"removeEventListener"in e?e.removeEventListener(jt[t]||t,a,!1):e.detachEvent("on"+t,a),e[Rt][s]=null}function Wt(e){return e.stopPropagation?e.stopPropagation():e.originalEvent?e.originalEvent._stopped=!0:e.cancelBubble=!0,this}function Ut(e){return qt(e,"wheel",Wt),this}function Gt(e){return Ot(e,"mousedown touchstart dblclick contextmenu",Wt),e._leaflet_disable_click=!0,this}function Kt(e){return e.preventDefault?e.preventDefault():e.returnValue=!1,this}function Vt(e){return Kt(e),Wt(e),this}function Yt(e){if(e.composedPath)return e.composedPath();for(var t=[],n=e.target;n;)t.push(n),n=n.parentNode;return t}function Jt(e,t){if(!t)return new M(e.clientX,e.clientY);var n=It(t),i=n.boundingClientRect;return new M((e.clientX-i.left)/n.x-t.clientLeft,(e.clientY-i.top)/n.y-t.clientTop)}var Xt=De.linux&&De.chrome?window.devicePixelRatio:De.mac?3*window.devicePixelRatio:window.devicePixelRatio>0?2*window.devicePixelRatio:1;function Qt(e){return De.edge?e.wheelDeltaY/2:e.deltaY&&0===e.deltaMode?-e.deltaY/Xt:e.deltaY&&1===e.deltaMode?20*-e.deltaY:e.deltaY&&2===e.deltaMode?60*-e.deltaY:e.deltaX||e.deltaZ?0:e.wheelDelta?(e.wheelDeltaY||e.wheelDelta)/2:e.detail&&Math.abs(e.detail)<32765?20*-e.detail:e.detail?e.detail/-32765*60:0}function en(e,t){var n=t.relatedTarget;if(!n)return!0;try{for(;n&&n!==e;)n=n.parentNode}catch(e){return!1}return n!==e}var tn={__proto__:null,on:Ot,off:Bt,stopPropagation:Wt,disableScrollPropagation:Ut,disableClickPropagation:Gt,preventDefault:Kt,stop:Vt,getPropagationPath:Yt,getMousePosition:Jt,getWheelDelta:Qt,isExternalTarget:en,addListener:Ot,removeListener:Bt},nn=A.extend({run:function(e,t,n,i){this.stop(),this._el=e,this._inProgress=!0,this._duration=n||.25,this._easeOutPower=1/Math.max(i||.5,.2),this._startPos=Tt(e),this._offset=t.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=$(this._animate,this),this._step()},_step:function(e){var t=+new Date-this._startTime,n=1e3*this._duration;t<n?this._runFrame(this._easeOut(t/n),e):(this._runFrame(1),this._complete())},_runFrame:function(e,t){var n=this._startPos.add(this._offset.multiplyBy(e));t&&n._round(),Lt(this._el,n),this.fire("step")},_complete:function(){P(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(e){return 1-Math.pow(1-e,this._easeOutPower)}}),sn=A.extend({options:{crs:K,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(e,t){t=p(this,t),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(e),this._initLayout(),this._onResize=s(this._onResize,this),this._initEvents(),t.maxBounds&&this.setMaxBounds(t.maxBounds),void 0!==t.zoom&&(this._zoom=this._limitZoom(t.zoom)),t.center&&void 0!==t.zoom&&this.setView(Z(t.center),t.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=dt&&De.any3d&&!De.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),Ot(this._proxy,ct,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(e,t,i){return t=void 0===t?this._zoom:this._limitZoom(t),e=this._limitCenter(Z(e),t,this.options.maxBounds),i=i||{},this._stop(),this._loaded&&!i.reset&&!0!==i&&(void 0!==i.animate&&(i.zoom=n({animate:i.animate},i.zoom),i.pan=n({animate:i.animate,duration:i.duration},i.pan)),this._zoom!==t?this._tryAnimatedZoom&&this._tryAnimatedZoom(e,t,i.zoom):this._tryAnimatedPan(e,i.pan))?(clearTimeout(this._sizeTimer),this):(this._resetView(e,t,i.pan&&i.pan.noMoveStart),this)},setZoom:function(e,t){return this._loaded?this.setView(this.getCenter(),e,{zoom:t}):(this._zoom=e,this)},zoomIn:function(e,t){return e=e||(De.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+e,t)},zoomOut:function(e,t){return e=e||(De.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-e,t)},setZoomAround:function(e,t,n){var i=this.getZoomScale(t),s=this.getSize().divideBy(2),a=(e instanceof M?e:this.latLngToContainerPoint(e)).subtract(s).multiplyBy(1-1/i),o=this.containerPointToLatLng(s.add(a));return this.setView(o,t,{zoom:n})},_getBoundsCenterZoom:function(e,t){t=t||{},e=e.getBounds?e.getBounds():R(e);var n=N(t.paddingTopLeft||t.padding||[0,0]),i=N(t.paddingBottomRight||t.padding||[0,0]),s=this.getBoundsZoom(e,!1,n.add(i));if((s="number"==typeof t.maxZoom?Math.min(t.maxZoom,s):s)===1/0)return{center:e.getCenter(),zoom:s};var a=i.subtract(n).divideBy(2),o=this.project(e.getSouthWest(),s),r=this.project(e.getNorthEast(),s);return{center:this.unproject(o.add(r).divideBy(2).add(a),s),zoom:s}},fitBounds:function(e,t){if(!(e=R(e)).isValid())throw new Error("Bounds are not valid.");var n=this._getBoundsCenterZoom(e,t);return this.setView(n.center,n.zoom,t)},fitWorld:function(e){return this.fitBounds([[-90,-180],[90,180]],e)},panTo:function(e,t){return this.setView(e,this._zoom,{pan:t})},panBy:function(e,t){if(t=t||{},!(e=N(e).round()).x&&!e.y)return this.fire("moveend");if(!0!==t.animate&&!this.getSize().contains(e))return this._resetView(this.unproject(this.project(this.getCenter()).add(e)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new nn,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),t.noMoveStart||this.fire("movestart"),!1!==t.animate){bt(this._mapPane,"leaflet-pan-anim");var n=this._getMapPanePos().subtract(e).round();this._panAnim.run(this._mapPane,n,t.duration||.25,t.easeLinearity)}else this._rawPanBy(e),this.fire("move").fire("moveend");return this},flyTo:function(e,t,n){if(!1===(n=n||{}).animate||!De.any3d)return this.setView(e,t,n);this._stop();var i=this.project(this.getCenter()),s=this.project(e),a=this.getSize(),o=this._zoom;e=Z(e),t=void 0===t?o:t;var r=Math.max(a.x,a.y),l=r*this.getZoomScale(o,t),h=s.distanceTo(i)||1,d=1.42,c=d*d;function u(e){var t=(l*l-r*r+(e?-1:1)*c*c*h*h)/(2*(e?l:r)*c*h),n=Math.sqrt(t*t+1)-t;return n<1e-9?-18:Math.log(n)}function p(e){return(Math.exp(e)-Math.exp(-e))/2}function m(e){return(Math.exp(e)+Math.exp(-e))/2}function g(e){return p(e)/m(e)}var f=u(0);function _(e){return r*(m(f)/m(f+d*e))}function v(e){return r*(m(f)*g(f+d*e)-p(f))/c}function y(e){return 1-Math.pow(1-e,1.5)}var b=Date.now(),w=(u(1)-f)/d,x=n.duration?1e3*n.duration:1e3*w*.8;function k(){var n=(Date.now()-b)/x,a=y(n)*w;n<=1?(this._flyToFrame=$(k,this),this._move(this.unproject(i.add(s.subtract(i).multiplyBy(v(a)/h)),o),this.getScaleZoom(r/_(a),o),{flyTo:!0})):this._move(e,t)._moveEnd(!0)}return this._moveStart(!0,n.noMoveStart),k.call(this),this},flyToBounds:function(e,t){var n=this._getBoundsCenterZoom(e,t);return this.flyTo(n.center,n.zoom,t)},setMaxBounds:function(e){return e=R(e),this.listens("moveend",this._panInsideMaxBounds)&&this.off("moveend",this._panInsideMaxBounds),e.isValid()?(this.options.maxBounds=e,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this)},setMinZoom:function(e){var t=this.options.minZoom;return this.options.minZoom=e,this._loaded&&t!==e&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(e):this},setMaxZoom:function(e){var t=this.options.maxZoom;return this.options.maxZoom=e,this._loaded&&t!==e&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(e):this},panInsideBounds:function(e,t){this._enforcingBounds=!0;var n=this.getCenter(),i=this._limitCenter(n,this._zoom,R(e));return n.equals(i)||this.panTo(i,t),this._enforcingBounds=!1,this},panInside:function(e,t){var n=N((t=t||{}).paddingTopLeft||t.padding||[0,0]),i=N(t.paddingBottomRight||t.padding||[0,0]),s=this.project(this.getCenter()),a=this.project(e),o=this.getPixelBounds(),r=D([o.min.add(n),o.max.subtract(i)]),l=r.getSize();if(!r.contains(a)){this._enforcingBounds=!0;var h=a.subtract(r.getCenter()),d=r.extend(a).getSize().subtract(l);s.x+=h.x<0?-d.x:d.x,s.y+=h.y<0?-d.y:d.y,this.panTo(this.unproject(s),t),this._enforcingBounds=!1}return this},invalidateSize:function(e){if(!this._loaded)return this;e=n({animate:!1,pan:!0},!0===e?{animate:!0}:e);var t=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var i=this.getSize(),a=t.divideBy(2).round(),o=i.divideBy(2).round(),r=a.subtract(o);return r.x||r.y?(e.animate&&e.pan?this.panBy(r):(e.pan&&this._rawPanBy(r),this.fire("move"),e.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(s(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:t,newSize:i})):this},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(e){if(e=this._locateOptions=n({timeout:1e4,watch:!1},e),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var t=s(this._handleGeolocationResponse,this),i=s(this._handleGeolocationError,this);return e.watch?this._locationWatchId=navigator.geolocation.watchPosition(t,i,e):navigator.geolocation.getCurrentPosition(t,i,e),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(e){if(this._container._leaflet_id){var t=e.code,n=e.message||(1===t?"permission denied":2===t?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:t,message:"Geolocation error: "+n+"."})}},_handleGeolocationResponse:function(e){if(this._container._leaflet_id){var t=new B(e.coords.latitude,e.coords.longitude),n=t.toBounds(2*e.coords.accuracy),i=this._locateOptions;if(i.setView){var s=this.getBoundsZoom(n);this.setView(t,i.maxZoom?Math.min(s,i.maxZoom):s)}var a={latlng:t,bounds:n,timestamp:e.timestamp};for(var o in e.coords)"number"==typeof e.coords[o]&&(a[o]=e.coords[o]);this.fire("locationfound",a)}},addHandler:function(e,t){if(!t)return this;var n=this[e]=new t(this);return this._handlers.push(n),this.options[e]&&n.enable(),this},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch(e){this._container._leaflet_id=void 0,this._containerId=void 0}var e;for(e in void 0!==this._locationWatchId&&this.stopLocate(),this._stop(),gt(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&(P(this._resizeRequest),this._resizeRequest=null),this._clearHandlers(),this._loaded&&this.fire("unload"),this._layers)this._layers[e].remove();for(e in this._panes)gt(this._panes[e]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(e,t){var n=mt("div","leaflet-pane"+(e?" leaflet-"+e.replace("Pane","")+"-pane":""),t||this._mapPane);return e&&(this._panes[e]=n),n},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var e=this.getPixelBounds();return new O(this.unproject(e.getBottomLeft()),this.unproject(e.getTopRight()))},getMinZoom:function(){return void 0===this.options.minZoom?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return void 0===this.options.maxZoom?void 0===this._layersMaxZoom?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(e,t,n){e=R(e),n=N(n||[0,0]);var i=this.getZoom()||0,s=this.getMinZoom(),a=this.getMaxZoom(),o=e.getNorthWest(),r=e.getSouthEast(),l=this.getSize().subtract(n),h=D(this.project(r,i),this.project(o,i)).getSize(),d=De.any3d?this.options.zoomSnap:1,c=l.x/h.x,u=l.y/h.y,p=t?Math.max(c,u):Math.min(c,u);return i=this.getScaleZoom(p,i),d&&(i=Math.round(i/(d/100))*(d/100),i=t?Math.ceil(i/d)*d:Math.floor(i/d)*d),Math.max(s,Math.min(a,i))},getSize:function(){return this._size&&!this._sizeChanged||(this._size=new M(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(e,t){var n=this._getTopLeftPoint(e,t);return new I(n,n.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(e){return this.options.crs.getProjectedBounds(void 0===e?this.getZoom():e)},getPane:function(e){return"string"==typeof e?this._panes[e]:e},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(e,t){var n=this.options.crs;return t=void 0===t?this._zoom:t,n.scale(e)/n.scale(t)},getScaleZoom:function(e,t){var n=this.options.crs;t=void 0===t?this._zoom:t;var i=n.zoom(e*n.scale(t));return isNaN(i)?1/0:i},project:function(e,t){return t=void 0===t?this._zoom:t,this.options.crs.latLngToPoint(Z(e),t)},unproject:function(e,t){return t=void 0===t?this._zoom:t,this.options.crs.pointToLatLng(N(e),t)},layerPointToLatLng:function(e){var t=N(e).add(this.getPixelOrigin());return this.unproject(t)},latLngToLayerPoint:function(e){return this.project(Z(e))._round()._subtract(this.getPixelOrigin())},wrapLatLng:function(e){return this.options.crs.wrapLatLng(Z(e))},wrapLatLngBounds:function(e){return this.options.crs.wrapLatLngBounds(R(e))},distance:function(e,t){return this.options.crs.distance(Z(e),Z(t))},containerPointToLayerPoint:function(e){return N(e).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(e){return N(e).add(this._getMapPanePos())},containerPointToLatLng:function(e){var t=this.containerPointToLayerPoint(N(e));return this.layerPointToLatLng(t)},latLngToContainerPoint:function(e){return this.layerPointToContainerPoint(this.latLngToLayerPoint(Z(e)))},mouseEventToContainerPoint:function(e){return Jt(e,this._container)},mouseEventToLayerPoint:function(e){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e))},mouseEventToLatLng:function(e){return this.layerPointToLatLng(this.mouseEventToLayerPoint(e))},_initContainer:function(e){var t=this._container=ut(e);if(!t)throw new Error("Map container not found.");if(t._leaflet_id)throw new Error("Map container is already initialized.");Ot(t,"scroll",this._onScroll,this),this._containerId=o(t)},_initLayout:function(){var e=this._container;this._fadeAnimated=this.options.fadeAnimation&&De.any3d,bt(e,"leaflet-container"+(De.touch?" leaflet-touch":"")+(De.retina?" leaflet-retina":"")+(De.ielt9?" leaflet-oldie":"")+(De.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var t=pt(e,"position");"absolute"!==t&&"relative"!==t&&"fixed"!==t&&"sticky"!==t&&(e.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var e=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),Lt(this._mapPane,new M(0,0)),this.createPane("tilePane"),this.createPane("overlayPane"),this.createPane("shadowPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(bt(e.markerPane,"leaflet-zoom-hide"),bt(e.shadowPane,"leaflet-zoom-hide"))},_resetView:function(e,t,n){Lt(this._mapPane,new M(0,0));var i=!this._loaded;this._loaded=!0,t=this._limitZoom(t),this.fire("viewprereset");var s=this._zoom!==t;this._moveStart(s,n)._move(e,t)._moveEnd(s),this.fire("viewreset"),i&&this.fire("load")},_moveStart:function(e,t){return e&&this.fire("zoomstart"),t||this.fire("movestart"),this},_move:function(e,t,n,i){void 0===t&&(t=this._zoom);var s=this._zoom!==t;return this._zoom=t,this._lastCenter=e,this._pixelOrigin=this._getNewPixelOrigin(e),i?n&&n.pinch&&this.fire("zoom",n):((s||n&&n.pinch)&&this.fire("zoom",n),this.fire("move",n)),this},_moveEnd:function(e){return e&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return P(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(e){Lt(this._mapPane,this._getMapPanePos().subtract(e))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(e){this._targets={},this._targets[o(this._container)]=this;var t=e?Bt:Ot;t(this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",this._handleDOMEvent,this),this.options.trackResize&&t(window,"resize",this._onResize,this),De.any3d&&this.options.transform3DLimit&&(e?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){P(this._resizeRequest),this._resizeRequest=$(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var e=this._getMapPanePos();Math.max(Math.abs(e.x),Math.abs(e.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(e,t){for(var n,i=[],s="mouseout"===t||"mouseover"===t,a=e.target||e.srcElement,r=!1;a;){if((n=this._targets[o(a)])&&("click"===t||"preclick"===t)&&this._draggableMoved(n)){r=!0;break}if(n&&n.listens(t,!0)){if(s&&!en(a,e))break;if(i.push(n),s)break}if(a===this._container)break;a=a.parentNode}return i.length||r||s||!this.listens(t,!0)||(i=[this]),i},_isClickDisabled:function(e){for(;e&&e!==this._container;){if(e._leaflet_disable_click)return!0;e=e.parentNode}},_handleDOMEvent:function(e){var t=e.target||e.srcElement;if(!(!this._loaded||t._leaflet_disable_events||"click"===e.type&&this._isClickDisabled(t))){var n=e.type;"mousedown"===n&&Mt(t),this._fireDOMEvent(e,n)}},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(e,t,i){if("click"===e.type){var s=n({},e);s.type="preclick",this._fireDOMEvent(s,s.type,i)}var a=this._findEventTargets(e,t);if(i){for(var o=[],r=0;r<i.length;r++)i[r].listens(t,!0)&&o.push(i[r]);a=o.concat(a)}if(a.length){"contextmenu"===t&&Kt(e);var l=a[0],h={originalEvent:e};if("keypress"!==e.type&&"keydown"!==e.type&&"keyup"!==e.type){var d=l.getLatLng&&(!l._radius||l._radius<=10);h.containerPoint=d?this.latLngToContainerPoint(l.getLatLng()):this.mouseEventToContainerPoint(e),h.layerPoint=this.containerPointToLayerPoint(h.containerPoint),h.latlng=d?l.getLatLng():this.layerPointToLatLng(h.layerPoint)}for(r=0;r<a.length;r++)if(a[r].fire(t,h,!0),h.originalEvent._stopped||!1===a[r].options.bubblingMouseEvents&&-1!==v(this._mouseEvents,t))return}},_draggableMoved:function(e){return(e=e.dragging&&e.dragging.enabled()?e:this).dragging&&e.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var e=0,t=this._handlers.length;e<t;e++)this._handlers[e].disable()},whenReady:function(e,t){return this._loaded?e.call(t||this,{target:this}):this.on("load",e,t),this},_getMapPanePos:function(){return Tt(this._mapPane)||new M(0,0)},_moved:function(){var e=this._getMapPanePos();return e&&!e.equals([0,0])},_getTopLeftPoint:function(e,t){return(e&&void 0!==t?this._getNewPixelOrigin(e,t):this.getPixelOrigin()).subtract(this._getMapPanePos())},_getNewPixelOrigin:function(e,t){var n=this.getSize()._divideBy(2);return this.project(e,t)._subtract(n)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(e,t,n){var i=this._getNewPixelOrigin(n,t);return this.project(e,t)._subtract(i)},_latLngBoundsToNewLayerBounds:function(e,t,n){var i=this._getNewPixelOrigin(n,t);return D([this.project(e.getSouthWest(),t)._subtract(i),this.project(e.getNorthWest(),t)._subtract(i),this.project(e.getSouthEast(),t)._subtract(i),this.project(e.getNorthEast(),t)._subtract(i)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(e){return this.latLngToLayerPoint(e).subtract(this._getCenterLayerPoint())},_limitCenter:function(e,t,n){if(!n)return e;var i=this.project(e,t),s=this.getSize().divideBy(2),a=new I(i.subtract(s),i.add(s)),o=this._getBoundsOffset(a,n,t);return Math.abs(o.x)<=1&&Math.abs(o.y)<=1?e:this.unproject(i.add(o),t)},_limitOffset:function(e,t){if(!t)return e;var n=this.getPixelBounds(),i=new I(n.min.add(e),n.max.add(e));return e.add(this._getBoundsOffset(i,t))},_getBoundsOffset:function(e,t,n){var i=D(this.project(t.getNorthEast(),n),this.project(t.getSouthWest(),n)),s=i.min.subtract(e.min),a=i.max.subtract(e.max);return new M(this._rebound(s.x,-a.x),this._rebound(s.y,-a.y))},_rebound:function(e,t){return e+t>0?Math.round(e-t)/2:Math.max(0,Math.ceil(e))-Math.max(0,Math.floor(t))},_limitZoom:function(e){var t=this.getMinZoom(),n=this.getMaxZoom(),i=De.any3d?this.options.zoomSnap:1;return i&&(e=Math.round(e/i)*i),Math.max(t,Math.min(n,e))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){wt(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(e,t){var n=this._getCenterOffset(e)._trunc();return!(!0!==(t&&t.animate)&&!this.getSize().contains(n)||(this.panBy(n,t),0))},_createAnimProxy:function(){var e=this._proxy=mt("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(e),this.on("zoomanim",function(e){var t=ht,n=this._proxy.style[t];St(this._proxy,this.project(e.center,e.zoom),this.getZoomScale(e.zoom,1)),n===this._proxy.style[t]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",this._animMoveEnd,this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){gt(this._proxy),this.off("load moveend",this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var e=this.getCenter(),t=this.getZoom();St(this._proxy,this.project(e,t),this.getZoomScale(t,1))},_catchTransitionEnd:function(e){this._animatingZoom&&e.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(e,t,n){if(this._animatingZoom)return!0;if(n=n||{},!this._zoomAnimated||!1===n.animate||this._nothingToAnimate()||Math.abs(t-this._zoom)>this.options.zoomAnimationThreshold)return!1;var i=this.getZoomScale(t),s=this._getCenterOffset(e)._divideBy(1-1/i);return!(!0!==n.animate&&!this.getSize().contains(s)||($(function(){this._moveStart(!0,n.noMoveStart||!1)._animateZoom(e,t,!0)},this),0))},_animateZoom:function(e,t,n,i){this._mapPane&&(n&&(this._animatingZoom=!0,this._animateToCenter=e,this._animateToZoom=t,bt(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:e,zoom:t,noUpdate:i}),this._tempFireZoomEvent||(this._tempFireZoomEvent=this._zoom!==this._animateToZoom),this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(s(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&wt(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire("zoom"),delete this._tempFireZoomEvent,this.fire("move"),this._moveEnd(!0))}});function an(e,t){return new sn(e,t)}var on=T.extend({options:{position:"topright"},initialize:function(e){p(this,e)},getPosition:function(){return this.options.position},setPosition:function(e){var t=this._map;return t&&t.removeControl(this),this.options.position=e,t&&t.addControl(this),this},getContainer:function(){return this._container},addTo:function(e){this.remove(),this._map=e;var t=this._container=this.onAdd(e),n=this.getPosition(),i=e._controlCorners[n];return bt(t,"leaflet-control"),-1!==n.indexOf("bottom")?i.insertBefore(t,i.firstChild):i.appendChild(t),this._map.on("unload",this.remove,this),this},remove:function(){return this._map?(gt(this._container),this.onRemove&&this.onRemove(this._map),this._map.off("unload",this.remove,this),this._map=null,this):this},_refocusOnMap:function(e){this._map&&e&&e.screenX>0&&e.screenY>0&&this._map.getContainer().focus()}}),rn=function(e){return new on(e)};sn.include({addControl:function(e){return e.addTo(this),this},removeControl:function(e){return e.remove(),this},_initControlPos:function(){var e=this._controlCorners={},t="leaflet-",n=this._controlContainer=mt("div",t+"control-container",this._container);function i(i,s){var a=t+i+" "+t+s;e[i+s]=mt("div",a,n)}i("top","left"),i("top","right"),i("bottom","left"),i("bottom","right")},_clearControlPos:function(){for(var e in this._controlCorners)gt(this._controlCorners[e]);gt(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var ln=on.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(e,t,n,i){return n<i?-1:i<n?1:0}},initialize:function(e,t,n){for(var i in p(this,n),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,this._preventClick=!1,e)this._addLayer(e[i],i);for(i in t)this._addLayer(t[i],i,!0)},onAdd:function(e){this._initLayout(),this._update(),this._map=e,e.on("zoomend",this._checkDisabledLayers,this);for(var t=0;t<this._layers.length;t++)this._layers[t].layer.on("add remove",this._onLayerChange,this);return this._container},addTo:function(e){return on.prototype.addTo.call(this,e),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var e=0;e<this._layers.length;e++)this._layers[e].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(e,t){return this._addLayer(e,t),this._map?this._update():this},addOverlay:function(e,t){return this._addLayer(e,t,!0),this._map?this._update():this},removeLayer:function(e){e.off("add remove",this._onLayerChange,this);var t=this._getLayer(o(e));return t&&this._layers.splice(this._layers.indexOf(t),1),this._map?this._update():this},expand:function(){bt(this._container,"leaflet-control-layers-expanded"),this._section.style.height=null;var e=this._map.getSize().y-(this._container.offsetTop+50);return e<this._section.clientHeight?(bt(this._section,"leaflet-control-layers-scrollbar"),this._section.style.height=e+"px"):wt(this._section,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return wt(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var e="leaflet-control-layers",t=this._container=mt("div",e),n=this.options.collapsed;t.setAttribute("aria-haspopup",!0),Gt(t),Ut(t);var i=this._section=mt("section",e+"-list");n&&(this._map.on("click",this.collapse,this),Ot(t,{mouseenter:this._expandSafely,mouseleave:this.collapse},this));var s=this._layersLink=mt("a",e+"-toggle",t);s.href="#",s.title="Layers",s.setAttribute("role","button"),Ot(s,{keydown:function(e){13===e.keyCode&&this._expandSafely()},click:function(e){Kt(e),this._expandSafely()}},this),n||this.expand(),this._baseLayersList=mt("div",e+"-base",i),this._separator=mt("div",e+"-separator",i),this._overlaysList=mt("div",e+"-overlays",i),t.appendChild(i)},_getLayer:function(e){for(var t=0;t<this._layers.length;t++)if(this._layers[t]&&o(this._layers[t].layer)===e)return this._layers[t]},_addLayer:function(e,t,n){this._map&&e.on("add remove",this._onLayerChange,this),this._layers.push({layer:e,name:t,overlay:n}),this.options.sortLayers&&this._layers.sort(s(function(e,t){return this.options.sortFunction(e.layer,t.layer,e.name,t.name)},this)),this.options.autoZIndex&&e.setZIndex&&(this._lastZIndex++,e.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;ft(this._baseLayersList),ft(this._overlaysList),this._layerControlInputs=[];var e,t,n,i,s=0;for(n=0;n<this._layers.length;n++)i=this._layers[n],this._addItem(i),t=t||i.overlay,e=e||!i.overlay,s+=i.overlay?0:1;return this.options.hideSingleBase&&(e=e&&s>1,this._baseLayersList.style.display=e?"":"none"),this._separator.style.display=t&&e?"":"none",this},_onLayerChange:function(e){this._handlingClick||this._update();var t=this._getLayer(o(e.target)),n=t.overlay?"add"===e.type?"overlayadd":"overlayremove":"add"===e.type?"baselayerchange":null;n&&this._map.fire(n,t)},_createRadioElement:function(e,t){var n='<input type="radio" class="leaflet-control-layers-selector" name="'+e+'"'+(t?' checked="checked"':"")+"/>",i=document.createElement("div");return i.innerHTML=n,i.firstChild},_addItem:function(e){var t,n=document.createElement("label"),i=this._map.hasLayer(e.layer);e.overlay?((t=document.createElement("input")).type="checkbox",t.className="leaflet-control-layers-selector",t.defaultChecked=i):t=this._createRadioElement("leaflet-base-layers_"+o(this),i),this._layerControlInputs.push(t),t.layerId=o(e.layer),Ot(t,"click",this._onInputClick,this);var s=document.createElement("span");s.innerHTML=" "+e.name;var a=document.createElement("span");return n.appendChild(a),a.appendChild(t),a.appendChild(s),(e.overlay?this._overlaysList:this._baseLayersList).appendChild(n),this._checkDisabledLayers(),n},_onInputClick:function(){if(!this._preventClick){var e,t,n=this._layerControlInputs,i=[],s=[];this._handlingClick=!0;for(var a=n.length-1;a>=0;a--)e=n[a],t=this._getLayer(e.layerId).layer,e.checked?i.push(t):e.checked||s.push(t);for(a=0;a<s.length;a++)this._map.hasLayer(s[a])&&this._map.removeLayer(s[a]);for(a=0;a<i.length;a++)this._map.hasLayer(i[a])||this._map.addLayer(i[a]);this._handlingClick=!1,this._refocusOnMap()}},_checkDisabledLayers:function(){for(var e,t,n=this._layerControlInputs,i=this._map.getZoom(),s=n.length-1;s>=0;s--)e=n[s],t=this._getLayer(e.layerId).layer,e.disabled=void 0!==t.options.minZoom&&i<t.options.minZoom||void 0!==t.options.maxZoom&&i>t.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expandSafely:function(){var e=this._section;this._preventClick=!0,Ot(e,"click",Kt),this.expand();var t=this;setTimeout(function(){Bt(e,"click",Kt),t._preventClick=!1})}}),hn=function(e,t,n){return new ln(e,t,n)},dn=on.extend({options:{position:"topleft",zoomInText:'<span aria-hidden="true">+</span>',zoomInTitle:"Zoom in",zoomOutText:'<span aria-hidden="true">&#x2212;</span>',zoomOutTitle:"Zoom out"},onAdd:function(e){var t="leaflet-control-zoom",n=mt("div",t+" leaflet-bar"),i=this.options;return this._zoomInButton=this._createButton(i.zoomInText,i.zoomInTitle,t+"-in",n,this._zoomIn),this._zoomOutButton=this._createButton(i.zoomOutText,i.zoomOutTitle,t+"-out",n,this._zoomOut),this._updateDisabled(),e.on("zoomend zoomlevelschange",this._updateDisabled,this),n},onRemove:function(e){e.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(e){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(e.shiftKey?3:1))},_zoomOut:function(e){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(e.shiftKey?3:1))},_createButton:function(e,t,n,i,s){var a=mt("a",n,i);return a.innerHTML=e,a.href="#",a.title=t,a.setAttribute("role","button"),a.setAttribute("aria-label",t),Gt(a),Ot(a,"click",Vt),Ot(a,"click",s,this),Ot(a,"click",this._refocusOnMap,this),a},_updateDisabled:function(){var e=this._map,t="leaflet-disabled";wt(this._zoomInButton,t),wt(this._zoomOutButton,t),this._zoomInButton.setAttribute("aria-disabled","false"),this._zoomOutButton.setAttribute("aria-disabled","false"),(this._disabled||e._zoom===e.getMinZoom())&&(bt(this._zoomOutButton,t),this._zoomOutButton.setAttribute("aria-disabled","true")),(this._disabled||e._zoom===e.getMaxZoom())&&(bt(this._zoomInButton,t),this._zoomInButton.setAttribute("aria-disabled","true"))}});sn.mergeOptions({zoomControl:!0}),sn.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new dn,this.addControl(this.zoomControl))});var cn=function(e){return new dn(e)},un=on.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(e){var t="leaflet-control-scale",n=mt("div",t),i=this.options;return this._addScales(i,t+"-line",n),e.on(i.updateWhenIdle?"moveend":"move",this._update,this),e.whenReady(this._update,this),n},onRemove:function(e){e.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(e,t,n){e.metric&&(this._mScale=mt("div",t,n)),e.imperial&&(this._iScale=mt("div",t,n))},_update:function(){var e=this._map,t=e.getSize().y/2,n=e.distance(e.containerPointToLatLng([0,t]),e.containerPointToLatLng([this.options.maxWidth,t]));this._updateScales(n)},_updateScales:function(e){this.options.metric&&e&&this._updateMetric(e),this.options.imperial&&e&&this._updateImperial(e)},_updateMetric:function(e){var t=this._getRoundNum(e),n=t<1e3?t+" m":t/1e3+" km";this._updateScale(this._mScale,n,t/e)},_updateImperial:function(e){var t,n,i,s=3.2808399*e;s>5280?(t=s/5280,n=this._getRoundNum(t),this._updateScale(this._iScale,n+" mi",n/t)):(i=this._getRoundNum(s),this._updateScale(this._iScale,i+" ft",i/s))},_updateScale:function(e,t,n){e.style.width=Math.round(this.options.maxWidth*n)+"px",e.innerHTML=t},_getRoundNum:function(e){var t=Math.pow(10,(Math.floor(e)+"").length-1),n=e/t;return t*(n=n>=10?10:n>=5?5:n>=3?3:n>=2?2:1)}}),pn=function(e){return new un(e)},mn='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',gn=on.extend({options:{position:"bottomright",prefix:'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">'+(De.inlineSvg?mn+" ":"")+"Leaflet</a>"},initialize:function(e){p(this,e),this._attributions={}},onAdd:function(e){for(var t in e.attributionControl=this,this._container=mt("div","leaflet-control-attribution"),Gt(this._container),e._layers)e._layers[t].getAttribution&&this.addAttribution(e._layers[t].getAttribution());return this._update(),e.on("layeradd",this._addAttribution,this),this._container},onRemove:function(e){e.off("layeradd",this._addAttribution,this)},_addAttribution:function(e){e.layer.getAttribution&&(this.addAttribution(e.layer.getAttribution()),e.layer.once("remove",function(){this.removeAttribution(e.layer.getAttribution())},this))},setPrefix:function(e){return this.options.prefix=e,this._update(),this},addAttribution:function(e){return e?(this._attributions[e]||(this._attributions[e]=0),this._attributions[e]++,this._update(),this):this},removeAttribution:function(e){return e?(this._attributions[e]&&(this._attributions[e]--,this._update()),this):this},_update:function(){if(this._map){var e=[];for(var t in this._attributions)this._attributions[t]&&e.push(t);var n=[];this.options.prefix&&n.push(this.options.prefix),e.length&&n.push(e.join(", ")),this._container.innerHTML=n.join(' <span aria-hidden="true">|</span> ')}}});sn.mergeOptions({attributionControl:!0}),sn.addInitHook(function(){this.options.attributionControl&&(new gn).addTo(this)});var fn=function(e){return new gn(e)};on.Layers=ln,on.Zoom=dn,on.Scale=un,on.Attribution=gn,rn.layers=hn,rn.zoom=cn,rn.scale=pn,rn.attribution=fn;var _n=T.extend({initialize:function(e){this._map=e},enable:function(){return this._enabled||(this._enabled=!0,this.addHooks()),this},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}});_n.addTo=function(e,t){return e.addHandler(t,this),this};var vn={Events:E},yn=De.touch?"touchstart mousedown":"mousedown",bn=A.extend({options:{clickTolerance:3},initialize:function(e,t,n,i){p(this,i),this._element=e,this._dragStartTarget=t||e,this._preventOutline=n},enable:function(){this._enabled||(Ot(this._dragStartTarget,yn,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(bn._dragging===this&&this.finishDrag(!0),Bt(this._dragStartTarget,yn,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(e){if(this._enabled&&(this._moved=!1,!yt(this._element,"leaflet-zoom-anim")))if(e.touches&&1!==e.touches.length)bn._dragging===this&&this.finishDrag();else if(!(bn._dragging||e.shiftKey||1!==e.which&&1!==e.button&&!e.touches||(bn._dragging=this,this._preventOutline&&Mt(this._element),Et(),st(),this._moving))){this.fire("down");var t=e.touches?e.touches[0]:e,n=Nt(this._element);this._startPoint=new M(t.clientX,t.clientY),this._startPos=Tt(this._element),this._parentScale=It(n);var i="mousedown"===e.type;Ot(document,i?"mousemove":"touchmove",this._onMove,this),Ot(document,i?"mouseup":"touchend touchcancel",this._onUp,this)}},_onMove:function(e){if(this._enabled)if(e.touches&&e.touches.length>1)this._moved=!0;else{var t=e.touches&&1===e.touches.length?e.touches[0]:e,n=new M(t.clientX,t.clientY)._subtract(this._startPoint);(n.x||n.y)&&(Math.abs(n.x)+Math.abs(n.y)<this.options.clickTolerance||(n.x/=this._parentScale.x,n.y/=this._parentScale.y,Kt(e),this._moved||(this.fire("dragstart"),this._moved=!0,bt(document.body,"leaflet-dragging"),this._lastTarget=e.target||e.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),bt(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(n),this._moving=!0,this._lastEvent=e,this._updatePosition()))}},_updatePosition:function(){var e={originalEvent:this._lastEvent};this.fire("predrag",e),Lt(this._element,this._newPos),this.fire("drag",e)},_onUp:function(){this._enabled&&this.finishDrag()},finishDrag:function(e){wt(document.body,"leaflet-dragging"),this._lastTarget&&(wt(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),Bt(document,"mousemove touchmove",this._onMove,this),Bt(document,"mouseup touchend touchcancel",this._onUp,this),At(),at();var t=this._moved&&this._moving;this._moving=!1,bn._dragging=!1,t&&this.fire("dragend",{noInertia:e,distance:this._newPos.distanceTo(this._startPos)})}});function wn(e,t,n){var i,s,a,o,r,l,h,d,c,u=[1,4,2,8];for(s=0,h=e.length;s<h;s++)e[s]._code=Hn(e[s],t);for(o=0;o<4;o++){for(d=u[o],i=[],s=0,a=(h=e.length)-1;s<h;a=s++)r=e[s],l=e[a],r._code&d?l._code&d||((c=Mn(l,r,d,t,n))._code=Hn(c,t),i.push(c)):(l._code&d&&((c=Mn(l,r,d,t,n))._code=Hn(c,t),i.push(c)),i.push(r));e=i}return e}function xn(e,t){var n,i,s,a,o,r,l,h,d;if(!e||0===e.length)throw new Error("latlngs not passed");Dn(e)||(console.warn("latlngs are not flat! Only the first ring will be used"),e=e[0]);var c=Z([0,0]),u=R(e);u.getNorthWest().distanceTo(u.getSouthWest())*u.getNorthEast().distanceTo(u.getNorthWest())<1700&&(c=kn(e));var p=e.length,m=[];for(n=0;n<p;n++){var g=Z(e[n]);m.push(t.project(Z([g.lat-c.lat,g.lng-c.lng])))}for(r=l=h=0,n=0,i=p-1;n<p;i=n++)s=m[n],a=m[i],o=s.y*a.x-a.y*s.x,l+=(s.x+a.x)*o,h+=(s.y+a.y)*o,r+=3*o;d=0===r?m[0]:[l/r,h/r];var f=t.unproject(N(d));return Z([f.lat+c.lat,f.lng+c.lng])}function kn(e){for(var t=0,n=0,i=0,s=0;s<e.length;s++){var a=Z(e[s]);t+=a.lat,n+=a.lng,i++}return Z([t/i,n/i])}var zn,$n={__proto__:null,clipPolygon:wn,polygonCenter:xn,centroid:kn};function Pn(e,t){if(!t||!e.length)return e.slice();var n=t*t;return e=Tn(e=En(e,n),n)}function Sn(e,t,n){return Math.sqrt(In(e,t,n,!0))}function Ln(e,t,n){return In(e,t,n)}function Tn(e,t){var n=e.length,i=new(typeof Uint8Array!=void 0+""?Uint8Array:Array)(n);i[0]=i[n-1]=1,Cn(e,i,t,0,n-1);var s,a=[];for(s=0;s<n;s++)i[s]&&a.push(e[s]);return a}function Cn(e,t,n,i,s){var a,o,r,l=0;for(o=i+1;o<=s-1;o++)(r=In(e[o],e[i],e[s],!0))>l&&(a=o,l=r);l>n&&(t[a]=1,Cn(e,t,n,i,a),Cn(e,t,n,a,s))}function En(e,t){for(var n=[e[0]],i=1,s=0,a=e.length;i<a;i++)Nn(e[i],e[s])>t&&(n.push(e[i]),s=i);return s<a-1&&n.push(e[a-1]),n}function An(e,t,n,i,s){var a,o,r,l=i?zn:Hn(e,n),h=Hn(t,n);for(zn=h;;){if(!(l|h))return[e,t];if(l&h)return!1;r=Hn(o=Mn(e,t,a=l||h,n,s),n),a===l?(e=o,l=r):(t=o,h=r)}}function Mn(e,t,n,i,s){var a,o,r=t.x-e.x,l=t.y-e.y,h=i.min,d=i.max;return 8&n?(a=e.x+r*(d.y-e.y)/l,o=d.y):4&n?(a=e.x+r*(h.y-e.y)/l,o=h.y):2&n?(a=d.x,o=e.y+l*(d.x-e.x)/r):1&n&&(a=h.x,o=e.y+l*(h.x-e.x)/r),new M(a,o,s)}function Hn(e,t){var n=0;return e.x<t.min.x?n|=1:e.x>t.max.x&&(n|=2),e.y<t.min.y?n|=4:e.y>t.max.y&&(n|=8),n}function Nn(e,t){var n=t.x-e.x,i=t.y-e.y;return n*n+i*i}function In(e,t,n,i){var s,a=t.x,o=t.y,r=n.x-a,l=n.y-o,h=r*r+l*l;return h>0&&((s=((e.x-a)*r+(e.y-o)*l)/h)>1?(a=n.x,o=n.y):s>0&&(a+=r*s,o+=l*s)),r=e.x-a,l=e.y-o,i?r*r+l*l:new M(a,o)}function Dn(e){return!_(e[0])||"object"!=typeof e[0][0]&&void 0!==e[0][0]}function On(e){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),Dn(e)}function Rn(e,t){var n,i,s,a,o,r,l,h;if(!e||0===e.length)throw new Error("latlngs not passed");Dn(e)||(console.warn("latlngs are not flat! Only the first ring will be used"),e=e[0]);var d=Z([0,0]),c=R(e);c.getNorthWest().distanceTo(c.getSouthWest())*c.getNorthEast().distanceTo(c.getNorthWest())<1700&&(d=kn(e));var u=e.length,p=[];for(n=0;n<u;n++){var m=Z(e[n]);p.push(t.project(Z([m.lat-d.lat,m.lng-d.lng])))}for(n=0,i=0;n<u-1;n++)i+=p[n].distanceTo(p[n+1])/2;if(0===i)h=p[0];else for(n=0,a=0;n<u-1;n++)if(o=p[n],r=p[n+1],(a+=s=o.distanceTo(r))>i){l=(a-i)/s,h=[r.x-l*(r.x-o.x),r.y-l*(r.y-o.y)];break}var g=t.unproject(N(h));return Z([g.lat+d.lat,g.lng+d.lng])}var Bn={__proto__:null,simplify:Pn,pointToSegmentDistance:Sn,closestPointOnSegment:Ln,clipSegment:An,_getEdgeIntersection:Mn,_getBitCode:Hn,_sqClosestPointOnSegment:In,isFlat:Dn,_flat:On,polylineCenter:Rn},Zn={project:function(e){return new M(e.lng,e.lat)},unproject:function(e){return new B(e.y,e.x)},bounds:new I([-180,-90],[180,90])},jn={R:6378137,R_MINOR:6356752.314245179,bounds:new I([-20037508.34279,-15496570.73972],[20037508.34279,18764656.23138]),project:function(e){var t=Math.PI/180,n=this.R,i=e.lat*t,s=this.R_MINOR/n,a=Math.sqrt(1-s*s),o=a*Math.sin(i),r=Math.tan(Math.PI/4-i/2)/Math.pow((1-o)/(1+o),a/2);return i=-n*Math.log(Math.max(r,1e-10)),new M(e.lng*t*n,i)},unproject:function(e){for(var t,n=180/Math.PI,i=this.R,s=this.R_MINOR/i,a=Math.sqrt(1-s*s),o=Math.exp(-e.y/i),r=Math.PI/2-2*Math.atan(o),l=0,h=.1;l<15&&Math.abs(h)>1e-7;l++)t=a*Math.sin(r),t=Math.pow((1-t)/(1+t),a/2),r+=h=Math.PI/2-2*Math.atan(o*t)-r;return new B(r*n,e.x*n/i)}},qn={__proto__:null,LonLat:Zn,Mercator:jn,SphericalMercator:W},Fn=n({},q,{code:"EPSG:3395",projection:jn,transformation:function(){var e=.5/(Math.PI*jn.R);return G(e,.5,-e,.5)}()}),Wn=n({},q,{code:"EPSG:4326",projection:Zn,transformation:G(1/180,1,-1/180,.5)}),Un=n({},j,{projection:Zn,transformation:G(1,0,-1,0),scale:function(e){return Math.pow(2,e)},zoom:function(e){return Math.log(e)/Math.LN2},distance:function(e,t){var n=t.lng-e.lng,i=t.lat-e.lat;return Math.sqrt(n*n+i*i)},infinite:!0});j.Earth=q,j.EPSG3395=Fn,j.EPSG3857=K,j.EPSG900913=V,j.EPSG4326=Wn,j.Simple=Un;var Gn=A.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(e){return e.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(e){return e&&e.removeLayer(this),this},getPane:function(e){return this._map.getPane(e?this.options[e]||e:this.options.pane)},addInteractiveTarget:function(e){return this._map._targets[o(e)]=this,this},removeInteractiveTarget:function(e){return delete this._map._targets[o(e)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(e){var t=e.target;if(t.hasLayer(this)){if(this._map=t,this._zoomAnimated=t._zoomAnimated,this.getEvents){var n=this.getEvents();t.on(n,this),this.once("remove",function(){t.off(n,this)},this)}this.onAdd(t),this.fire("add"),t.fire("layeradd",{layer:this})}}});sn.include({addLayer:function(e){if(!e._layerAdd)throw new Error("The provided object is not a Layer.");var t=o(e);return this._layers[t]||(this._layers[t]=e,e._mapToAdd=this,e.beforeAdd&&e.beforeAdd(this),this.whenReady(e._layerAdd,e)),this},removeLayer:function(e){var t=o(e);return this._layers[t]?(this._loaded&&e.onRemove(this),delete this._layers[t],this._loaded&&(this.fire("layerremove",{layer:e}),e.fire("remove")),e._map=e._mapToAdd=null,this):this},hasLayer:function(e){return o(e)in this._layers},eachLayer:function(e,t){for(var n in this._layers)e.call(t,this._layers[n]);return this},_addLayers:function(e){for(var t=0,n=(e=e?_(e)?e:[e]:[]).length;t<n;t++)this.addLayer(e[t])},_addZoomLimit:function(e){isNaN(e.options.maxZoom)&&isNaN(e.options.minZoom)||(this._zoomBoundLayers[o(e)]=e,this._updateZoomLevels())},_removeZoomLimit:function(e){var t=o(e);this._zoomBoundLayers[t]&&(delete this._zoomBoundLayers[t],this._updateZoomLevels())},_updateZoomLevels:function(){var e=1/0,t=-1/0,n=this._getZoomSpan();for(var i in this._zoomBoundLayers){var s=this._zoomBoundLayers[i].options;e=void 0===s.minZoom?e:Math.min(e,s.minZoom),t=void 0===s.maxZoom?t:Math.max(t,s.maxZoom)}this._layersMaxZoom=t===-1/0?void 0:t,this._layersMinZoom=e===1/0?void 0:e,n!==this._getZoomSpan()&&this.fire("zoomlevelschange"),void 0===this.options.maxZoom&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),void 0===this.options.minZoom&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var Kn=Gn.extend({initialize:function(e,t){var n,i;if(p(this,t),this._layers={},e)for(n=0,i=e.length;n<i;n++)this.addLayer(e[n])},addLayer:function(e){var t=this.getLayerId(e);return this._layers[t]=e,this._map&&this._map.addLayer(e),this},removeLayer:function(e){var t=e in this._layers?e:this.getLayerId(e);return this._map&&this._layers[t]&&this._map.removeLayer(this._layers[t]),delete this._layers[t],this},hasLayer:function(e){return("number"==typeof e?e:this.getLayerId(e))in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(e){var t,n,i=Array.prototype.slice.call(arguments,1);for(t in this._layers)(n=this._layers[t])[e]&&n[e].apply(n,i);return this},onAdd:function(e){this.eachLayer(e.addLayer,e)},onRemove:function(e){this.eachLayer(e.removeLayer,e)},eachLayer:function(e,t){for(var n in this._layers)e.call(t,this._layers[n]);return this},getLayer:function(e){return this._layers[e]},getLayers:function(){var e=[];return this.eachLayer(e.push,e),e},setZIndex:function(e){return this.invoke("setZIndex",e)},getLayerId:function(e){return o(e)}}),Vn=function(e,t){return new Kn(e,t)},Yn=Kn.extend({addLayer:function(e){return this.hasLayer(e)?this:(e.addEventParent(this),Kn.prototype.addLayer.call(this,e),this.fire("layeradd",{layer:e}))},removeLayer:function(e){return this.hasLayer(e)?(e in this._layers&&(e=this._layers[e]),e.removeEventParent(this),Kn.prototype.removeLayer.call(this,e),this.fire("layerremove",{layer:e})):this},setStyle:function(e){return this.invoke("setStyle",e)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var e=new O;for(var t in this._layers){var n=this._layers[t];e.extend(n.getBounds?n.getBounds():n.getLatLng())}return e}}),Jn=function(e,t){return new Yn(e,t)},Xn=T.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(e){p(this,e)},createIcon:function(e){return this._createIcon("icon",e)},createShadow:function(e){return this._createIcon("shadow",e)},_createIcon:function(e,t){var n=this._getIconUrl(e);if(!n){if("icon"===e)throw new Error("iconUrl not set in Icon options (see the docs).");return null}var i=this._createImg(n,t&&"IMG"===t.tagName?t:null);return this._setIconStyles(i,e),(this.options.crossOrigin||""===this.options.crossOrigin)&&(i.crossOrigin=!0===this.options.crossOrigin?"":this.options.crossOrigin),i},_setIconStyles:function(e,t){var n=this.options,i=n[t+"Size"];"number"==typeof i&&(i=[i,i]);var s=N(i),a=N("shadow"===t&&n.shadowAnchor||n.iconAnchor||s&&s.divideBy(2,!0));e.className="leaflet-marker-"+t+" "+(n.className||""),a&&(e.style.marginLeft=-a.x+"px",e.style.marginTop=-a.y+"px"),s&&(e.style.width=s.x+"px",e.style.height=s.y+"px")},_createImg:function(e,t){return(t=t||document.createElement("img")).src=e,t},_getIconUrl:function(e){return De.retina&&this.options[e+"RetinaUrl"]||this.options[e+"Url"]}});function Qn(e){return new Xn(e)}var ei=Xn.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(e){return"string"!=typeof ei.imagePath&&(ei.imagePath=this._detectIconPath()),(this.options.imagePath||ei.imagePath)+Xn.prototype._getIconUrl.call(this,e)},_stripUrl:function(e){var t=function(e,t,n){var i=t.exec(e);return i&&i[n]};return(e=t(e,/^url\((['"])?(.+)\1\)$/,2))&&t(e,/^(.*)marker-icon\.png$/,1)},_detectIconPath:function(){var e=mt("div","leaflet-default-icon-path",document.body),t=pt(e,"background-image")||pt(e,"backgroundImage");if(document.body.removeChild(e),t=this._stripUrl(t))return t;var n=document.querySelector('link[href$="leaflet.css"]');return n?n.href.substring(0,n.href.length-11-1):""}}),ti=_n.extend({initialize:function(e){this._marker=e},addHooks:function(){var e=this._marker._icon;this._draggable||(this._draggable=new bn(e,e,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),bt(e,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&wt(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(e){var t=this._marker,n=t._map,i=this._marker.options.autoPanSpeed,s=this._marker.options.autoPanPadding,a=Tt(t._icon),o=n.getPixelBounds(),r=n.getPixelOrigin(),l=D(o.min._subtract(r).add(s),o.max._subtract(r).subtract(s));if(!l.contains(a)){var h=N((Math.max(l.max.x,a.x)-l.max.x)/(o.max.x-l.max.x)-(Math.min(l.min.x,a.x)-l.min.x)/(o.min.x-l.min.x),(Math.max(l.max.y,a.y)-l.max.y)/(o.max.y-l.max.y)-(Math.min(l.min.y,a.y)-l.min.y)/(o.min.y-l.min.y)).multiplyBy(i);n.panBy(h,{animate:!1}),this._draggable._newPos._add(h),this._draggable._startPos._add(h),Lt(t._icon,this._draggable._newPos),this._onDrag(e),this._panRequest=$(this._adjustPan.bind(this,e))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire("movestart").fire("dragstart")},_onPreDrag:function(e){this._marker.options.autoPan&&(P(this._panRequest),this._panRequest=$(this._adjustPan.bind(this,e)))},_onDrag:function(e){var t=this._marker,n=t._shadow,i=Tt(t._icon),s=t._map.layerPointToLatLng(i);n&&Lt(n,i),t._latlng=s,e.latlng=s,e.oldLatLng=this._oldLatLng,t.fire("move",e).fire("drag",e)},_onDragEnd:function(e){P(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",e)}}),ni=Gn.extend({options:{icon:new ei,interactive:!0,keyboard:!0,title:"",alt:"Marker",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",shadowPane:"shadowPane",bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(e,t){p(this,t),this._latlng=Z(e)},onAdd:function(e){this._zoomAnimated=this._zoomAnimated&&e.options.markerZoomAnimation,this._zoomAnimated&&e.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(e){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&e.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(e){var t=this._latlng;return this._latlng=Z(e),this.update(),this.fire("move",{oldLatLng:t,latlng:this._latlng})},setZIndexOffset:function(e){return this.options.zIndexOffset=e,this.update()},getIcon:function(){return this.options.icon},setIcon:function(e){return this.options.icon=e,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var e=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(e)}return this},_initIcon:function(){var e=this.options,t="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),n=e.icon.createIcon(this._icon),i=!1;n!==this._icon&&(this._icon&&this._removeIcon(),i=!0,e.title&&(n.title=e.title),"IMG"===n.tagName&&(n.alt=e.alt||"")),bt(n,t),e.keyboard&&(n.tabIndex="0",n.setAttribute("role","button")),this._icon=n,e.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&Ot(n,"focus",this._panOnFocus,this);var s=e.icon.createShadow(this._shadow),a=!1;s!==this._shadow&&(this._removeShadow(),a=!0),s&&(bt(s,t),s.alt=""),this._shadow=s,e.opacity<1&&this._updateOpacity(),i&&this.getPane().appendChild(this._icon),this._initInteraction(),s&&a&&this.getPane(e.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&Bt(this._icon,"focus",this._panOnFocus,this),gt(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&gt(this._shadow),this._shadow=null},_setPos:function(e){this._icon&&Lt(this._icon,e),this._shadow&&Lt(this._shadow,e),this._zIndex=e.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(e){this._icon&&(this._icon.style.zIndex=this._zIndex+e)},_animateZoom:function(e){var t=this._map._latLngToNewLayerPoint(this._latlng,e.zoom,e.center).round();this._setPos(t)},_initInteraction:function(){if(this.options.interactive&&(bt(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),ti)){var e=this.options.draggable;this.dragging&&(e=this.dragging.enabled(),this.dragging.disable()),this.dragging=new ti(this),e&&this.dragging.enable()}},setOpacity:function(e){return this.options.opacity=e,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var e=this.options.opacity;this._icon&&zt(this._icon,e),this._shadow&&zt(this._shadow,e)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_panOnFocus:function(){var e=this._map;if(e){var t=this.options.icon.options,n=t.iconSize?N(t.iconSize):N(0,0),i=t.iconAnchor?N(t.iconAnchor):N(0,0);e.panInside(this._latlng,{paddingTopLeft:i,paddingBottomRight:n.subtract(i)})}},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});function ii(e,t){return new ni(e,t)}var si=Gn.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(e){this._renderer=e.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(e){return p(this,e),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&e&&Object.prototype.hasOwnProperty.call(e,"weight")&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0)}}),ai=si.extend({options:{fill:!0,radius:10},initialize:function(e,t){p(this,t),this._latlng=Z(e),this._radius=this.options.radius},setLatLng:function(e){var t=this._latlng;return this._latlng=Z(e),this.redraw(),this.fire("move",{oldLatLng:t,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(e){return this.options.radius=this._radius=e,this.redraw()},getRadius:function(){return this._radius},setStyle:function(e){var t=e&&e.radius||this._radius;return si.prototype.setStyle.call(this,e),this.setRadius(t),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var e=this._radius,t=this._radiusY||e,n=this._clickTolerance(),i=[e+n,t+n];this._pxBounds=new I(this._point.subtract(i),this._point.add(i))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(e){return e.distanceTo(this._point)<=this._radius+this._clickTolerance()}});function oi(e,t){return new ai(e,t)}var ri=ai.extend({initialize:function(e,t,i){if("number"==typeof t&&(t=n({},i,{radius:t})),p(this,t),this._latlng=Z(e),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(e){return this._mRadius=e,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var e=[this._radius,this._radiusY||this._radius];return new O(this._map.layerPointToLatLng(this._point.subtract(e)),this._map.layerPointToLatLng(this._point.add(e)))},setStyle:si.prototype.setStyle,_project:function(){var e=this._latlng.lng,t=this._latlng.lat,n=this._map,i=n.options.crs;if(i.distance===q.distance){var s=Math.PI/180,a=this._mRadius/q.R/s,o=n.project([t+a,e]),r=n.project([t-a,e]),l=o.add(r).divideBy(2),h=n.unproject(l).lat,d=Math.acos((Math.cos(a*s)-Math.sin(t*s)*Math.sin(h*s))/(Math.cos(t*s)*Math.cos(h*s)))/s;(isNaN(d)||0===d)&&(d=a/Math.cos(Math.PI/180*t)),this._point=l.subtract(n.getPixelOrigin()),this._radius=isNaN(d)?0:l.x-n.project([h,e-d]).x,this._radiusY=l.y-o.y}else{var c=i.unproject(i.project(this._latlng).subtract([this._mRadius,0]));this._point=n.latLngToLayerPoint(this._latlng),this._radius=this._point.x-n.latLngToLayerPoint(c).x}this._updateBounds()}});function li(e,t,n){return new ri(e,t,n)}var hi=si.extend({options:{smoothFactor:1,noClip:!1},initialize:function(e,t){p(this,t),this._setLatLngs(e)},getLatLngs:function(){return this._latlngs},setLatLngs:function(e){return this._setLatLngs(e),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(e){for(var t,n,i=1/0,s=null,a=In,o=0,r=this._parts.length;o<r;o++)for(var l=this._parts[o],h=1,d=l.length;h<d;h++){var c=a(e,t=l[h-1],n=l[h],!0);c<i&&(i=c,s=a(e,t,n))}return s&&(s.distance=Math.sqrt(i)),s},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return Rn(this._defaultShape(),this._map.options.crs)},getBounds:function(){return this._bounds},addLatLng:function(e,t){return t=t||this._defaultShape(),e=Z(e),t.push(e),this._bounds.extend(e),this.redraw()},_setLatLngs:function(e){this._bounds=new O,this._latlngs=this._convertLatLngs(e)},_defaultShape:function(){return Dn(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(e){for(var t=[],n=Dn(e),i=0,s=e.length;i<s;i++)n?(t[i]=Z(e[i]),this._bounds.extend(t[i])):t[i]=this._convertLatLngs(e[i]);return t},_project:function(){var e=new I;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,e),this._bounds.isValid()&&e.isValid()&&(this._rawPxBounds=e,this._updateBounds())},_updateBounds:function(){var e=this._clickTolerance(),t=new M(e,e);this._rawPxBounds&&(this._pxBounds=new I([this._rawPxBounds.min.subtract(t),this._rawPxBounds.max.add(t)]))},_projectLatlngs:function(e,t,n){var i,s,a=e[0]instanceof B,o=e.length;if(a){for(s=[],i=0;i<o;i++)s[i]=this._map.latLngToLayerPoint(e[i]),n.extend(s[i]);t.push(s)}else for(i=0;i<o;i++)this._projectLatlngs(e[i],t,n)},_clipPoints:function(){var e=this._renderer._bounds;if(this._parts=[],this._pxBounds&&this._pxBounds.intersects(e))if(this.options.noClip)this._parts=this._rings;else{var t,n,i,s,a,o,r,l=this._parts;for(t=0,i=0,s=this._rings.length;t<s;t++)for(n=0,a=(r=this._rings[t]).length;n<a-1;n++)(o=An(r[n],r[n+1],e,n,!0))&&(l[i]=l[i]||[],l[i].push(o[0]),o[1]===r[n+1]&&n!==a-2||(l[i].push(o[1]),i++))}},_simplifyPoints:function(){for(var e=this._parts,t=this.options.smoothFactor,n=0,i=e.length;n<i;n++)e[n]=Pn(e[n],t)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(e,t){var n,i,s,a,o,r,l=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(e))return!1;for(n=0,a=this._parts.length;n<a;n++)for(i=0,s=(o=(r=this._parts[n]).length)-1;i<o;s=i++)if((t||0!==i)&&Sn(e,r[s],r[i])<=l)return!0;return!1}});function di(e,t){return new hi(e,t)}hi._flat=On;var ci=hi.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return xn(this._defaultShape(),this._map.options.crs)},_convertLatLngs:function(e){var t=hi.prototype._convertLatLngs.call(this,e),n=t.length;return n>=2&&t[0]instanceof B&&t[0].equals(t[n-1])&&t.pop(),t},_setLatLngs:function(e){hi.prototype._setLatLngs.call(this,e),Dn(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return Dn(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var e=this._renderer._bounds,t=this.options.weight,n=new M(t,t);if(e=new I(e.min.subtract(n),e.max.add(n)),this._parts=[],this._pxBounds&&this._pxBounds.intersects(e))if(this.options.noClip)this._parts=this._rings;else for(var i,s=0,a=this._rings.length;s<a;s++)(i=wn(this._rings[s],e,!0)).length&&this._parts.push(i)},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(e){var t,n,i,s,a,o,r,l,h=!1;if(!this._pxBounds||!this._pxBounds.contains(e))return!1;for(s=0,r=this._parts.length;s<r;s++)for(a=0,o=(l=(t=this._parts[s]).length)-1;a<l;o=a++)n=t[a],i=t[o],n.y>e.y!=i.y>e.y&&e.x<(i.x-n.x)*(e.y-n.y)/(i.y-n.y)+n.x&&(h=!h);return h||hi.prototype._containsPoint.call(this,e,!0)}});function ui(e,t){return new ci(e,t)}var pi=Yn.extend({initialize:function(e,t){p(this,t),this._layers={},e&&this.addData(e)},addData:function(e){var t,n,i,s=_(e)?e:e.features;if(s){for(t=0,n=s.length;t<n;t++)((i=s[t]).geometries||i.geometry||i.features||i.coordinates)&&this.addData(i);return this}var a=this.options;if(a.filter&&!a.filter(e))return this;var o=mi(e,a);return o?(o.feature=wi(e),o.defaultOptions=o.options,this.resetStyle(o),a.onEachFeature&&a.onEachFeature(e,o),this.addLayer(o)):this},resetStyle:function(e){return void 0===e?this.eachLayer(this.resetStyle,this):(e.options=n({},e.defaultOptions),this._setLayerStyle(e,this.options.style),this)},setStyle:function(e){return this.eachLayer(function(t){this._setLayerStyle(t,e)},this)},_setLayerStyle:function(e,t){e.setStyle&&("function"==typeof t&&(t=t(e.feature)),e.setStyle(t))}});function mi(e,t){var n,i,s,a,o="Feature"===e.type?e.geometry:e,r=o?o.coordinates:null,l=[],h=t&&t.pointToLayer,d=t&&t.coordsToLatLng||fi;if(!r&&!o)return null;switch(o.type){case"Point":return gi(h,e,n=d(r),t);case"MultiPoint":for(s=0,a=r.length;s<a;s++)n=d(r[s]),l.push(gi(h,e,n,t));return new Yn(l);case"LineString":case"MultiLineString":return i=_i(r,"LineString"===o.type?0:1,d),new hi(i,t);case"Polygon":case"MultiPolygon":return i=_i(r,"Polygon"===o.type?1:2,d),new ci(i,t);case"GeometryCollection":for(s=0,a=o.geometries.length;s<a;s++){var c=mi({geometry:o.geometries[s],type:"Feature",properties:e.properties},t);c&&l.push(c)}return new Yn(l);case"FeatureCollection":for(s=0,a=o.features.length;s<a;s++){var u=mi(o.features[s],t);u&&l.push(u)}return new Yn(l);default:throw new Error("Invalid GeoJSON object.")}}function gi(e,t,n,i){return e?e(t,n):new ni(n,i&&i.markersInheritOptions&&i)}function fi(e){return new B(e[1],e[0],e[2])}function _i(e,t,n){for(var i,s=[],a=0,o=e.length;a<o;a++)i=t?_i(e[a],t-1,n):(n||fi)(e[a]),s.push(i);return s}function vi(e,t){return void 0!==(e=Z(e)).alt?[d(e.lng,t),d(e.lat,t),d(e.alt,t)]:[d(e.lng,t),d(e.lat,t)]}function yi(e,t,n,i){for(var s=[],a=0,o=e.length;a<o;a++)s.push(t?yi(e[a],Dn(e[a])?0:t-1,n,i):vi(e[a],i));return!t&&n&&s.length>0&&s.push(s[0].slice()),s}function bi(e,t){return e.feature?n({},e.feature,{geometry:t}):wi(t)}function wi(e){return"Feature"===e.type||"FeatureCollection"===e.type?e:{type:"Feature",properties:{},geometry:e}}var xi={toGeoJSON:function(e){return bi(this,{type:"Point",coordinates:vi(this.getLatLng(),e)})}};function ki(e,t){return new pi(e,t)}ni.include(xi),ri.include(xi),ai.include(xi),hi.include({toGeoJSON:function(e){var t=!Dn(this._latlngs);return bi(this,{type:(t?"Multi":"")+"LineString",coordinates:yi(this._latlngs,t?1:0,!1,e)})}}),ci.include({toGeoJSON:function(e){var t=!Dn(this._latlngs),n=t&&!Dn(this._latlngs[0]),i=yi(this._latlngs,n?2:t?1:0,!0,e);return t||(i=[i]),bi(this,{type:(n?"Multi":"")+"Polygon",coordinates:i})}}),Kn.include({toMultiPoint:function(e){var t=[];return this.eachLayer(function(n){t.push(n.toGeoJSON(e).geometry.coordinates)}),bi(this,{type:"MultiPoint",coordinates:t})},toGeoJSON:function(e){var t=this.feature&&this.feature.geometry&&this.feature.geometry.type;if("MultiPoint"===t)return this.toMultiPoint(e);var n="GeometryCollection"===t,i=[];return this.eachLayer(function(t){if(t.toGeoJSON){var s=t.toGeoJSON(e);if(n)i.push(s.geometry);else{var a=wi(s);"FeatureCollection"===a.type?i.push.apply(i,a.features):i.push(a)}}}),n?bi(this,{geometries:i,type:"GeometryCollection"}):{type:"FeatureCollection",features:i}}});var zi=ki,$i=Gn.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(e,t,n){this._url=e,this._bounds=R(t),p(this,n)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(bt(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){gt(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(e){return this.options.opacity=e,this._image&&this._updateOpacity(),this},setStyle:function(e){return e.opacity&&this.setOpacity(e.opacity),this},bringToFront:function(){return this._map&&_t(this._image),this},bringToBack:function(){return this._map&&vt(this._image),this},setUrl:function(e){return this._url=e,this._image&&(this._image.src=e),this},setBounds:function(e){return this._bounds=R(e),this._map&&this._reset(),this},getEvents:function(){var e={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(e.zoomanim=this._animateZoom),e},setZIndex:function(e){return this.options.zIndex=e,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var e="IMG"===this._url.tagName,t=this._image=e?this._url:mt("img");bt(t,"leaflet-image-layer"),this._zoomAnimated&&bt(t,"leaflet-zoom-animated"),this.options.className&&bt(t,this.options.className),t.onselectstart=h,t.onmousemove=h,t.onload=s(this.fire,this,"load"),t.onerror=s(this._overlayOnError,this,"error"),(this.options.crossOrigin||""===this.options.crossOrigin)&&(t.crossOrigin=!0===this.options.crossOrigin?"":this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),e?this._url=t.src:(t.src=this._url,t.alt=this.options.alt)},_animateZoom:function(e){var t=this._map.getZoomScale(e.zoom),n=this._map._latLngBoundsToNewLayerBounds(this._bounds,e.zoom,e.center).min;St(this._image,n,t)},_reset:function(){var e=this._image,t=new I(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),n=t.getSize();Lt(e,t.min),e.style.width=n.x+"px",e.style.height=n.y+"px"},_updateOpacity:function(){zt(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&void 0!==this.options.zIndex&&null!==this.options.zIndex&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error");var e=this.options.errorOverlayUrl;e&&this._url!==e&&(this._url=e,this._image.src=e)},getCenter:function(){return this._bounds.getCenter()}}),Pi=function(e,t,n){return new $i(e,t,n)},Si=$i.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var e="VIDEO"===this._url.tagName,t=this._image=e?this._url:mt("video");if(bt(t,"leaflet-image-layer"),this._zoomAnimated&&bt(t,"leaflet-zoom-animated"),this.options.className&&bt(t,this.options.className),t.onselectstart=h,t.onmousemove=h,t.onloadeddata=s(this.fire,this,"load"),e){for(var n=t.getElementsByTagName("source"),i=[],a=0;a<n.length;a++)i.push(n[a].src);this._url=n.length>0?i:[t.src]}else{_(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(t.style,"objectFit")&&(t.style.objectFit="fill"),t.autoplay=!!this.options.autoplay,t.loop=!!this.options.loop,t.muted=!!this.options.muted,t.playsInline=!!this.options.playsInline;for(var o=0;o<this._url.length;o++){var r=mt("source");r.src=this._url[o],t.appendChild(r)}}}});function Li(e,t,n){return new Si(e,t,n)}var Ti=$i.extend({_initImage:function(){var e=this._image=this._url;bt(e,"leaflet-image-layer"),this._zoomAnimated&&bt(e,"leaflet-zoom-animated"),this.options.className&&bt(e,this.options.className),e.onselectstart=h,e.onmousemove=h}});function Ci(e,t,n){return new Ti(e,t,n)}var Ei=Gn.extend({options:{interactive:!1,offset:[0,0],className:"",pane:void 0,content:""},initialize:function(e,t){e&&(e instanceof B||_(e))?(this._latlng=Z(e),p(this,t)):(p(this,e),this._source=t),this.options.content&&(this._content=this.options.content)},openOn:function(e){return(e=arguments.length?e:this._source._map).hasLayer(this)||e.addLayer(this),this},close:function(){return this._map&&this._map.removeLayer(this),this},toggle:function(e){return this._map?this.close():(arguments.length?this._source=e:e=this._source,this._prepareOpen(),this.openOn(e._map)),this},onAdd:function(e){this._zoomAnimated=e._zoomAnimated,this._container||this._initLayout(),e._fadeAnimated&&zt(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),e._fadeAnimated&&zt(this._container,1),this.bringToFront(),this.options.interactive&&(bt(this._container,"leaflet-interactive"),this.addInteractiveTarget(this._container))},onRemove:function(e){e._fadeAnimated?(zt(this._container,0),this._removeTimeout=setTimeout(s(gt,void 0,this._container),200)):gt(this._container),this.options.interactive&&(wt(this._container,"leaflet-interactive"),this.removeInteractiveTarget(this._container))},getLatLng:function(){return this._latlng},setLatLng:function(e){return this._latlng=Z(e),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(e){return this._content=e,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var e={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(e.zoomanim=this._animateZoom),e},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&_t(this._container),this},bringToBack:function(){return this._map&&vt(this._container),this},_prepareOpen:function(e){var t=this._source;if(!t._map)return!1;if(t instanceof Yn){t=null;var n=this._source._layers;for(var i in n)if(n[i]._map){t=n[i];break}if(!t)return!1;this._source=t}if(!e)if(t.getCenter)e=t.getCenter();else if(t.getLatLng)e=t.getLatLng();else{if(!t.getBounds)throw new Error("Unable to get source layer LatLng.");e=t.getBounds().getCenter()}return this.setLatLng(e),this._map&&this.update(),!0},_updateContent:function(){if(this._content){var e=this._contentNode,t="function"==typeof this._content?this._content(this._source||this):this._content;if("string"==typeof t)e.innerHTML=t;else{for(;e.hasChildNodes();)e.removeChild(e.firstChild);e.appendChild(t)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var e=this._map.latLngToLayerPoint(this._latlng),t=N(this.options.offset),n=this._getAnchor();this._zoomAnimated?Lt(this._container,e.add(n)):t=t.add(e).add(n);var i=this._containerBottom=-t.y,s=this._containerLeft=-Math.round(this._containerWidth/2)+t.x;this._container.style.bottom=i+"px",this._container.style.left=s+"px"}},_getAnchor:function(){return[0,0]}});sn.include({_initOverlay:function(e,t,n,i){var s=t;return s instanceof e||(s=new e(i).setContent(t)),n&&s.setLatLng(n),s}}),Gn.include({_initOverlay:function(e,t,n,i){var s=n;return s instanceof e?(p(s,i),s._source=this):(s=t&&!i?t:new e(i,this)).setContent(n),s}});var Ai=Ei.extend({options:{pane:"popupPane",offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(e){return!(e=arguments.length?e:this._source._map).hasLayer(this)&&e._popup&&e._popup.options.autoClose&&e.removeLayer(e._popup),e._popup=this,Ei.prototype.openOn.call(this,e)},onAdd:function(e){Ei.prototype.onAdd.call(this,e),e.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof si||this._source.on("preclick",Wt))},onRemove:function(e){Ei.prototype.onRemove.call(this,e),e.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof si||this._source.off("preclick",Wt))},getEvents:function(){var e=Ei.prototype.getEvents.call(this);return(void 0!==this.options.closeOnClick?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(e.preclick=this.close),this.options.keepInView&&(e.moveend=this._adjustPan),e},_initLayout:function(){var e="leaflet-popup",t=this._container=mt("div",e+" "+(this.options.className||"")+" leaflet-zoom-animated"),n=this._wrapper=mt("div",e+"-content-wrapper",t);if(this._contentNode=mt("div",e+"-content",n),Gt(t),Ut(this._contentNode),Ot(t,"contextmenu",Wt),this._tipContainer=mt("div",e+"-tip-container",t),this._tip=mt("div",e+"-tip",this._tipContainer),this.options.closeButton){var i=this._closeButton=mt("a",e+"-close-button",t);i.setAttribute("role","button"),i.setAttribute("aria-label","Close popup"),i.href="#close",i.innerHTML='<span aria-hidden="true">&#215;</span>',Ot(i,"click",function(e){Kt(e),this.close()},this)}},_updateLayout:function(){var e=this._contentNode,t=e.style;t.width="",t.whiteSpace="nowrap";var n=e.offsetWidth;n=Math.min(n,this.options.maxWidth),n=Math.max(n,this.options.minWidth),t.width=n+1+"px",t.whiteSpace="",t.height="";var i=e.offsetHeight,s=this.options.maxHeight,a="leaflet-popup-scrolled";s&&i>s?(t.height=s+"px",bt(e,a)):wt(e,a),this._containerWidth=this._container.offsetWidth},_animateZoom:function(e){var t=this._map._latLngToNewLayerPoint(this._latlng,e.zoom,e.center),n=this._getAnchor();Lt(this._container,t.add(n))},_adjustPan:function(){if(this.options.autoPan)if(this._map._panAnim&&this._map._panAnim.stop(),this._autopanning)this._autopanning=!1;else{var e=this._map,t=parseInt(pt(this._container,"marginBottom"),10)||0,n=this._container.offsetHeight+t,i=this._containerWidth,s=new M(this._containerLeft,-n-this._containerBottom);s._add(Tt(this._container));var a=e.layerPointToContainerPoint(s),o=N(this.options.autoPanPadding),r=N(this.options.autoPanPaddingTopLeft||o),l=N(this.options.autoPanPaddingBottomRight||o),h=e.getSize(),d=0,c=0;a.x+i+l.x>h.x&&(d=a.x+i-h.x+l.x),a.x-d-r.x<0&&(d=a.x-r.x),a.y+n+l.y>h.y&&(c=a.y+n-h.y+l.y),a.y-c-r.y<0&&(c=a.y-r.y),(d||c)&&(this.options.keepInView&&(this._autopanning=!0),e.fire("autopanstart").panBy([d,c]))}},_getAnchor:function(){return N(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),Mi=function(e,t){return new Ai(e,t)};sn.mergeOptions({closePopupOnClick:!0}),sn.include({openPopup:function(e,t,n){return this._initOverlay(Ai,e,t,n).openOn(this),this},closePopup:function(e){return(e=arguments.length?e:this._popup)&&e.close(),this}}),Gn.include({bindPopup:function(e,t){return this._popup=this._initOverlay(Ai,this._popup,e,t),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(e){return this._popup&&(this instanceof Yn||(this._popup._source=this),this._popup._prepareOpen(e||this._latlng)&&this._popup.openOn(this._map)),this},closePopup:function(){return this._popup&&this._popup.close(),this},togglePopup:function(){return this._popup&&this._popup.toggle(this),this},isPopupOpen:function(){return!!this._popup&&this._popup.isOpen()},setPopupContent:function(e){return this._popup&&this._popup.setContent(e),this},getPopup:function(){return this._popup},_openPopup:function(e){if(this._popup&&this._map){Vt(e);var t=e.layer||e.target;this._popup._source!==t||t instanceof si?(this._popup._source=t,this.openPopup(e.latlng)):this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(e.latlng)}},_movePopup:function(e){this._popup.setLatLng(e.latlng)},_onKeyPress:function(e){13===e.originalEvent.keyCode&&this._openPopup(e)}});var Hi=Ei.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,opacity:.9},onAdd:function(e){Ei.prototype.onAdd.call(this,e),this.setOpacity(this.options.opacity),e.fire("tooltipopen",{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire("tooltipopen",{tooltip:this},!0))},onRemove:function(e){Ei.prototype.onRemove.call(this,e),e.fire("tooltipclose",{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire("tooltipclose",{tooltip:this},!0))},getEvents:function(){var e=Ei.prototype.getEvents.call(this);return this.options.permanent||(e.preclick=this.close),e},_initLayout:function(){var e="leaflet-tooltip "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=mt("div",e),this._container.setAttribute("role","tooltip"),this._container.setAttribute("id","leaflet-tooltip-"+o(this))},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(e){var t,n,i=this._map,s=this._container,a=i.latLngToContainerPoint(i.getCenter()),o=i.layerPointToContainerPoint(e),r=this.options.direction,l=s.offsetWidth,h=s.offsetHeight,d=N(this.options.offset),c=this._getAnchor();"top"===r?(t=l/2,n=h):"bottom"===r?(t=l/2,n=0):"center"===r?(t=l/2,n=h/2):"right"===r?(t=0,n=h/2):"left"===r?(t=l,n=h/2):o.x<a.x?(r="right",t=0,n=h/2):(r="left",t=l+2*(d.x+c.x),n=h/2),e=e.subtract(N(t,n,!0)).add(d).add(c),wt(s,"leaflet-tooltip-right"),wt(s,"leaflet-tooltip-left"),wt(s,"leaflet-tooltip-top"),wt(s,"leaflet-tooltip-bottom"),bt(s,"leaflet-tooltip-"+r),Lt(s,e)},_updatePosition:function(){var e=this._map.latLngToLayerPoint(this._latlng);this._setPosition(e)},setOpacity:function(e){this.options.opacity=e,this._container&&zt(this._container,e)},_animateZoom:function(e){var t=this._map._latLngToNewLayerPoint(this._latlng,e.zoom,e.center);this._setPosition(t)},_getAnchor:function(){return N(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),Ni=function(e,t){return new Hi(e,t)};sn.include({openTooltip:function(e,t,n){return this._initOverlay(Hi,e,t,n).openOn(this),this},closeTooltip:function(e){return e.close(),this}}),Gn.include({bindTooltip:function(e,t){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay(Hi,this._tooltip,e,t),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(e){if(e||!this._tooltipHandlersAdded){var t=e?"off":"on",n={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?n.add=this._openTooltip:(n.mouseover=this._openTooltip,n.mouseout=this.closeTooltip,n.click=this._openTooltip,this._map?this._addFocusListeners():n.add=this._addFocusListeners),this._tooltip.options.sticky&&(n.mousemove=this._moveTooltip),this[t](n),this._tooltipHandlersAdded=!e}},openTooltip:function(e){return this._tooltip&&(this instanceof Yn||(this._tooltip._source=this),this._tooltip._prepareOpen(e)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this))),this},closeTooltip:function(){if(this._tooltip)return this._tooltip.close()},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(e){return this._tooltip&&this._tooltip.setContent(e),this},getTooltip:function(){return this._tooltip},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this)},_addFocusListenersOnLayer:function(e){var t="function"==typeof e.getElement&&e.getElement();t&&(Ot(t,"focus",function(){this._tooltip._source=e,this.openTooltip()},this),Ot(t,"blur",this.closeTooltip,this))},_setAriaDescribedByOnLayer:function(e){var t="function"==typeof e.getElement&&e.getElement();t&&t.setAttribute("aria-describedby",this._tooltip._container.id)},_openTooltip:function(e){if(this._tooltip&&this._map)if(this._map.dragging&&this._map.dragging.moving()&&!this._openOnceFlag){this._openOnceFlag=!0;var t=this;this._map.once("moveend",function(){t._openOnceFlag=!1,t._openTooltip(e)})}else this._tooltip._source=e.layer||e.target,this.openTooltip(this._tooltip.options.sticky?e.latlng:void 0)},_moveTooltip:function(e){var t,n,i=e.latlng;this._tooltip.options.sticky&&e.originalEvent&&(t=this._map.mouseEventToContainerPoint(e.originalEvent),n=this._map.containerPointToLayerPoint(t),i=this._map.layerPointToLatLng(n)),this._tooltip.setLatLng(i)}});var Ii=Xn.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(e){var t=e&&"DIV"===e.tagName?e:document.createElement("div"),n=this.options;if(n.html instanceof Element?(ft(t),t.appendChild(n.html)):t.innerHTML=!1!==n.html?n.html:"",n.bgPos){var i=N(n.bgPos);t.style.backgroundPosition=-i.x+"px "+-i.y+"px"}return this._setIconStyles(t,"icon"),t},createShadow:function(){return null}});function Di(e){return new Ii(e)}Xn.Default=ei;var Oi=Gn.extend({options:{tileSize:256,opacity:1,updateWhenIdle:De.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(e){p(this,e)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView()},beforeAdd:function(e){e._addZoomLimit(this)},onRemove:function(e){this._removeAllTiles(),gt(this._container),e._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(_t(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(vt(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(e){return this.options.opacity=e,this._updateOpacity(),this},setZIndex:function(e){return this.options.zIndex=e,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){if(this._map){this._removeAllTiles();var e=this._clampZoom(this._map.getZoom());e!==this._tileZoom&&(this._tileZoom=e,this._updateLevels()),this._update()}return this},getEvents:function(){var e={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=r(this._onMoveEnd,this.options.updateInterval,this)),e.move=this._onMove),this._zoomAnimated&&(e.zoomanim=this._animateZoom),e},createTile:function(){return document.createElement("div")},getTileSize:function(){var e=this.options.tileSize;return e instanceof M?e:new M(e,e)},_updateZIndex:function(){this._container&&void 0!==this.options.zIndex&&null!==this.options.zIndex&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(e){for(var t,n=this.getPane().children,i=-e(-1/0,1/0),s=0,a=n.length;s<a;s++)t=n[s].style.zIndex,n[s]!==this._container&&t&&(i=e(i,+t));isFinite(i)&&(this.options.zIndex=i+e(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!De.ielt9){zt(this._container,this.options.opacity);var e=+new Date,t=!1,n=!1;for(var i in this._tiles){var s=this._tiles[i];if(s.current&&s.loaded){var a=Math.min(1,(e-s.loaded)/200);zt(s.el,a),a<1?t=!0:(s.active?n=!0:this._onOpaqueTile(s),s.active=!0)}}n&&!this._noPrune&&this._pruneTiles(),t&&(P(this._fadeFrame),this._fadeFrame=$(this._updateOpacity,this))}},_onOpaqueTile:h,_initContainer:function(){this._container||(this._container=mt("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var e=this._tileZoom,t=this.options.maxZoom;if(void 0!==e){for(var n in this._levels)n=Number(n),this._levels[n].el.children.length||n===e?(this._levels[n].el.style.zIndex=t-Math.abs(e-n),this._onUpdateLevel(n)):(gt(this._levels[n].el),this._removeTilesAtZoom(n),this._onRemoveLevel(n),delete this._levels[n]);var i=this._levels[e],s=this._map;return i||((i=this._levels[e]={}).el=mt("div","leaflet-tile-container leaflet-zoom-animated",this._container),i.el.style.zIndex=t,i.origin=s.project(s.unproject(s.getPixelOrigin()),e).round(),i.zoom=e,this._setZoomTransform(i,s.getCenter(),s.getZoom()),h(i.el.offsetWidth),this._onCreateLevel(i)),this._level=i,i}},_onUpdateLevel:h,_onRemoveLevel:h,_onCreateLevel:h,_pruneTiles:function(){if(this._map){var e,t,n=this._map.getZoom();if(n>this.options.maxZoom||n<this.options.minZoom)this._removeAllTiles();else{for(e in this._tiles)(t=this._tiles[e]).retain=t.current;for(e in this._tiles)if((t=this._tiles[e]).current&&!t.active){var i=t.coords;this._retainParent(i.x,i.y,i.z,i.z-5)||this._retainChildren(i.x,i.y,i.z,i.z+2)}for(e in this._tiles)this._tiles[e].retain||this._removeTile(e)}}},_removeTilesAtZoom:function(e){for(var t in this._tiles)this._tiles[t].coords.z===e&&this._removeTile(t)},_removeAllTiles:function(){for(var e in this._tiles)this._removeTile(e)},_invalidateAll:function(){for(var e in this._levels)gt(this._levels[e].el),this._onRemoveLevel(Number(e)),delete this._levels[e];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(e,t,n,i){var s=Math.floor(e/2),a=Math.floor(t/2),o=n-1,r=new M(+s,+a);r.z=+o;var l=this._tileCoordsToKey(r),h=this._tiles[l];return h&&h.active?(h.retain=!0,!0):(h&&h.loaded&&(h.retain=!0),o>i&&this._retainParent(s,a,o,i))},_retainChildren:function(e,t,n,i){for(var s=2*e;s<2*e+2;s++)for(var a=2*t;a<2*t+2;a++){var o=new M(s,a);o.z=n+1;var r=this._tileCoordsToKey(o),l=this._tiles[r];l&&l.active?l.retain=!0:(l&&l.loaded&&(l.retain=!0),n+1<i&&this._retainChildren(s,a,n+1,i))}},_resetView:function(e){var t=e&&(e.pinch||e.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),t,t)},_animateZoom:function(e){this._setView(e.center,e.zoom,!0,e.noUpdate)},_clampZoom:function(e){var t=this.options;return void 0!==t.minNativeZoom&&e<t.minNativeZoom?t.minNativeZoom:void 0!==t.maxNativeZoom&&t.maxNativeZoom<e?t.maxNativeZoom:e},_setView:function(e,t,n,i){var s=Math.round(t);s=void 0!==this.options.maxZoom&&s>this.options.maxZoom||void 0!==this.options.minZoom&&s<this.options.minZoom?void 0:this._clampZoom(s);var a=this.options.updateWhenZooming&&s!==this._tileZoom;i&&!a||(this._tileZoom=s,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),void 0!==s&&this._update(e),n||this._pruneTiles(),this._noPrune=!!n),this._setZoomTransforms(e,t)},_setZoomTransforms:function(e,t){for(var n in this._levels)this._setZoomTransform(this._levels[n],e,t)},_setZoomTransform:function(e,t,n){var i=this._map.getZoomScale(n,e.zoom),s=e.origin.multiplyBy(i).subtract(this._map._getNewPixelOrigin(t,n)).round();De.any3d?St(e.el,s,i):Lt(e.el,s)},_resetGrid:function(){var e=this._map,t=e.options.crs,n=this._tileSize=this.getTileSize(),i=this._tileZoom,s=this._map.getPixelWorldBounds(this._tileZoom);s&&(this._globalTileRange=this._pxBoundsToTileRange(s)),this._wrapX=t.wrapLng&&!this.options.noWrap&&[Math.floor(e.project([0,t.wrapLng[0]],i).x/n.x),Math.ceil(e.project([0,t.wrapLng[1]],i).x/n.y)],this._wrapY=t.wrapLat&&!this.options.noWrap&&[Math.floor(e.project([t.wrapLat[0],0],i).y/n.x),Math.ceil(e.project([t.wrapLat[1],0],i).y/n.y)]},_onMoveEnd:function(){this._map&&!this._map._animatingZoom&&this._update()},_getTiledPixelBounds:function(e){var t=this._map,n=t._animatingZoom?Math.max(t._animateToZoom,t.getZoom()):t.getZoom(),i=t.getZoomScale(n,this._tileZoom),s=t.project(e,this._tileZoom).floor(),a=t.getSize().divideBy(2*i);return new I(s.subtract(a),s.add(a))},_update:function(e){var t=this._map;if(t){var n=this._clampZoom(t.getZoom());if(void 0===e&&(e=t.getCenter()),void 0!==this._tileZoom){var i=this._getTiledPixelBounds(e),s=this._pxBoundsToTileRange(i),a=s.getCenter(),o=[],r=this.options.keepBuffer,l=new I(s.getBottomLeft().subtract([r,-r]),s.getTopRight().add([r,-r]));if(!(isFinite(s.min.x)&&isFinite(s.min.y)&&isFinite(s.max.x)&&isFinite(s.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var h in this._tiles){var d=this._tiles[h].coords;d.z===this._tileZoom&&l.contains(new M(d.x,d.y))||(this._tiles[h].current=!1)}if(Math.abs(n-this._tileZoom)>1)this._setView(e,n);else{for(var c=s.min.y;c<=s.max.y;c++)for(var u=s.min.x;u<=s.max.x;u++){var p=new M(u,c);if(p.z=this._tileZoom,this._isValidTile(p)){var m=this._tiles[this._tileCoordsToKey(p)];m?m.current=!0:o.push(p)}}if(o.sort(function(e,t){return e.distanceTo(a)-t.distanceTo(a)}),0!==o.length){this._loading||(this._loading=!0,this.fire("loading"));var g=document.createDocumentFragment();for(u=0;u<o.length;u++)this._addTile(o[u],g);this._level.el.appendChild(g)}}}}},_isValidTile:function(e){var t=this._map.options.crs;if(!t.infinite){var n=this._globalTileRange;if(!t.wrapLng&&(e.x<n.min.x||e.x>n.max.x)||!t.wrapLat&&(e.y<n.min.y||e.y>n.max.y))return!1}if(!this.options.bounds)return!0;var i=this._tileCoordsToBounds(e);return R(this.options.bounds).overlaps(i)},_keyToBounds:function(e){return this._tileCoordsToBounds(this._keyToTileCoords(e))},_tileCoordsToNwSe:function(e){var t=this._map,n=this.getTileSize(),i=e.scaleBy(n),s=i.add(n);return[t.unproject(i,e.z),t.unproject(s,e.z)]},_tileCoordsToBounds:function(e){var t=this._tileCoordsToNwSe(e),n=new O(t[0],t[1]);return this.options.noWrap||(n=this._map.wrapLatLngBounds(n)),n},_tileCoordsToKey:function(e){return e.x+":"+e.y+":"+e.z},_keyToTileCoords:function(e){var t=e.split(":"),n=new M(+t[0],+t[1]);return n.z=+t[2],n},_removeTile:function(e){var t=this._tiles[e];t&&(gt(t.el),delete this._tiles[e],this.fire("tileunload",{tile:t.el,coords:this._keyToTileCoords(e)}))},_initTile:function(e){bt(e,"leaflet-tile");var t=this.getTileSize();e.style.width=t.x+"px",e.style.height=t.y+"px",e.onselectstart=h,e.onmousemove=h,De.ielt9&&this.options.opacity<1&&zt(e,this.options.opacity)},_addTile:function(e,t){var n=this._getTilePos(e),i=this._tileCoordsToKey(e),a=this.createTile(this._wrapCoords(e),s(this._tileReady,this,e));this._initTile(a),this.createTile.length<2&&$(s(this._tileReady,this,e,null,a)),Lt(a,n),this._tiles[i]={el:a,coords:e,current:!0},t.appendChild(a),this.fire("tileloadstart",{tile:a,coords:e})},_tileReady:function(e,t,n){t&&this.fire("tileerror",{error:t,tile:n,coords:e});var i=this._tileCoordsToKey(e);(n=this._tiles[i])&&(n.loaded=+new Date,this._map._fadeAnimated?(zt(n.el,0),P(this._fadeFrame),this._fadeFrame=$(this._updateOpacity,this)):(n.active=!0,this._pruneTiles()),t||(bt(n.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:n.el,coords:e})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),De.ielt9||!this._map._fadeAnimated?$(this._pruneTiles,this):setTimeout(s(this._pruneTiles,this),250)))},_getTilePos:function(e){return e.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(e){var t=new M(this._wrapX?l(e.x,this._wrapX):e.x,this._wrapY?l(e.y,this._wrapY):e.y);return t.z=e.z,t},_pxBoundsToTileRange:function(e){var t=this.getTileSize();return new I(e.min.unscaleBy(t).floor(),e.max.unscaleBy(t).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var e in this._tiles)if(!this._tiles[e].loaded)return!1;return!0}});function Ri(e){return new Oi(e)}var Bi=Oi.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(e,t){this._url=e,(t=p(this,t)).detectRetina&&De.retina&&t.maxZoom>0?(t.tileSize=Math.floor(t.tileSize/2),t.zoomReverse?(t.zoomOffset--,t.minZoom=Math.min(t.maxZoom,t.minZoom+1)):(t.zoomOffset++,t.maxZoom=Math.max(t.minZoom,t.maxZoom-1)),t.minZoom=Math.max(0,t.minZoom)):t.zoomReverse?t.minZoom=Math.min(t.maxZoom,t.minZoom):t.maxZoom=Math.max(t.minZoom,t.maxZoom),"string"==typeof t.subdomains&&(t.subdomains=t.subdomains.split("")),this.on("tileunload",this._onTileRemove)},setUrl:function(e,t){return this._url===e&&void 0===t&&(t=!0),this._url=e,t||this.redraw(),this},createTile:function(e,t){var n=document.createElement("img");return Ot(n,"load",s(this._tileOnLoad,this,t,n)),Ot(n,"error",s(this._tileOnError,this,t,n)),(this.options.crossOrigin||""===this.options.crossOrigin)&&(n.crossOrigin=!0===this.options.crossOrigin?"":this.options.crossOrigin),"string"==typeof this.options.referrerPolicy&&(n.referrerPolicy=this.options.referrerPolicy),n.alt="",n.src=this.getTileUrl(e),n},getTileUrl:function(e){var t={r:De.retina?"@2x":"",s:this._getSubdomain(e),x:e.x,y:e.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var i=this._globalTileRange.max.y-e.y;this.options.tms&&(t.y=i),t["-y"]=i}return f(this._url,n(t,this.options))},_tileOnLoad:function(e,t){De.ielt9?setTimeout(s(e,this,null,t),0):e(null,t)},_tileOnError:function(e,t,n){var i=this.options.errorTileUrl;i&&t.getAttribute("src")!==i&&(t.src=i),e(n,t)},_onTileRemove:function(e){e.tile.onload=null},_getZoomForUrl:function(){var e=this._tileZoom,t=this.options.maxZoom;return this.options.zoomReverse&&(e=t-e),e+this.options.zoomOffset},_getSubdomain:function(e){var t=Math.abs(e.x+e.y)%this.options.subdomains.length;return this.options.subdomains[t]},_abortLoading:function(){var e,t;for(e in this._tiles)if(this._tiles[e].coords.z!==this._tileZoom&&((t=this._tiles[e].el).onload=h,t.onerror=h,!t.complete)){t.src=y;var n=this._tiles[e].coords;gt(t),delete this._tiles[e],this.fire("tileabort",{tile:t,coords:n})}},_removeTile:function(e){var t=this._tiles[e];if(t)return t.el.setAttribute("src",y),Oi.prototype._removeTile.call(this,e)},_tileReady:function(e,t,n){if(this._map&&(!n||n.getAttribute("src")!==y))return Oi.prototype._tileReady.call(this,e,t,n)}});function Zi(e,t){return new Bi(e,t)}var ji=Bi.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(e,t){this._url=e;var i=n({},this.defaultWmsParams);for(var s in t)s in this.options||(i[s]=t[s]);var a=(t=p(this,t)).detectRetina&&De.retina?2:1,o=this.getTileSize();i.width=o.x*a,i.height=o.y*a,this.wmsParams=i},onAdd:function(e){this._crs=this.options.crs||e.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var t=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[t]=this._crs.code,Bi.prototype.onAdd.call(this,e)},getTileUrl:function(e){var t=this._tileCoordsToNwSe(e),n=this._crs,i=D(n.project(t[0]),n.project(t[1])),s=i.min,a=i.max,o=(this._wmsVersion>=1.3&&this._crs===Wn?[s.y,s.x,a.y,a.x]:[s.x,s.y,a.x,a.y]).join(","),r=Bi.prototype.getTileUrl.call(this,e);return r+m(this.wmsParams,r,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+o},setParams:function(e,t){return n(this.wmsParams,e),t||this.redraw(),this}});function qi(e,t){return new ji(e,t)}Bi.WMS=ji,Zi.wms=qi;var Fi=Gn.extend({options:{padding:.1},initialize:function(e){p(this,e),o(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),bt(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var e={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(e.zoomanim=this._onAnimZoom),e},_onAnimZoom:function(e){this._updateTransform(e.center,e.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(e,t){var n=this._map.getZoomScale(t,this._zoom),i=this._map.getSize().multiplyBy(.5+this.options.padding),s=this._map.project(this._center,t),a=i.multiplyBy(-n).add(s).subtract(this._map._getNewPixelOrigin(e,t));De.any3d?St(this._container,a,n):Lt(this._container,a)},_reset:function(){for(var e in this._update(),this._updateTransform(this._center,this._zoom),this._layers)this._layers[e]._reset()},_onZoomEnd:function(){for(var e in this._layers)this._layers[e]._project()},_updatePaths:function(){for(var e in this._layers)this._layers[e]._update()},_update:function(){var e=this.options.padding,t=this._map.getSize(),n=this._map.containerPointToLayerPoint(t.multiplyBy(-e)).round();this._bounds=new I(n,n.add(t.multiplyBy(1+2*e)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),Wi=Fi.extend({options:{tolerance:0},getEvents:function(){var e=Fi.prototype.getEvents.call(this);return e.viewprereset=this._onViewPreReset,e},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){Fi.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var e=this._container=document.createElement("canvas");Ot(e,"mousemove",this._onMouseMove,this),Ot(e,"click dblclick mousedown mouseup contextmenu",this._onClick,this),Ot(e,"mouseout",this._handleMouseOut,this),e._leaflet_disable_events=!0,this._ctx=e.getContext("2d")},_destroyContainer:function(){P(this._redrawRequest),delete this._ctx,gt(this._container),Bt(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){for(var e in this._redrawBounds=null,this._layers)this._layers[e]._update();this._redraw()}},_update:function(){if(!this._map._animatingZoom||!this._bounds){Fi.prototype._update.call(this);var e=this._bounds,t=this._container,n=e.getSize(),i=De.retina?2:1;Lt(t,e.min),t.width=i*n.x,t.height=i*n.y,t.style.width=n.x+"px",t.style.height=n.y+"px",De.retina&&this._ctx.scale(2,2),this._ctx.translate(-e.min.x,-e.min.y),this.fire("update")}},_reset:function(){Fi.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(e){this._updateDashArray(e),this._layers[o(e)]=e;var t=e._order={layer:e,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=t),this._drawLast=t,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(e){this._requestRedraw(e)},_removePath:function(e){var t=e._order,n=t.next,i=t.prev;n?n.prev=i:this._drawLast=i,i?i.next=n:this._drawFirst=n,delete e._order,delete this._layers[o(e)],this._requestRedraw(e)},_updatePath:function(e){this._extendRedrawBounds(e),e._project(),e._update(),this._requestRedraw(e)},_updateStyle:function(e){this._updateDashArray(e),this._requestRedraw(e)},_updateDashArray:function(e){if("string"==typeof e.options.dashArray){var t,n,i=e.options.dashArray.split(/[, ]+/),s=[];for(n=0;n<i.length;n++){if(t=Number(i[n]),isNaN(t))return;s.push(t)}e.options._dashArray=s}else e.options._dashArray=e.options.dashArray},_requestRedraw:function(e){this._map&&(this._extendRedrawBounds(e),this._redrawRequest=this._redrawRequest||$(this._redraw,this))},_extendRedrawBounds:function(e){if(e._pxBounds){var t=(e.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new I,this._redrawBounds.extend(e._pxBounds.min.subtract([t,t])),this._redrawBounds.extend(e._pxBounds.max.add([t,t]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var e=this._redrawBounds;if(e){var t=e.getSize();this._ctx.clearRect(e.min.x,e.min.y,t.x,t.y)}else this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore()},_draw:function(){var e,t=this._redrawBounds;if(this._ctx.save(),t){var n=t.getSize();this._ctx.beginPath(),this._ctx.rect(t.min.x,t.min.y,n.x,n.y),this._ctx.clip()}this._drawing=!0;for(var i=this._drawFirst;i;i=i.next)e=i.layer,(!t||e._pxBounds&&e._pxBounds.intersects(t))&&e._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(e,t){if(this._drawing){var n,i,s,a,o=e._parts,r=o.length,l=this._ctx;if(r){for(l.beginPath(),n=0;n<r;n++){for(i=0,s=o[n].length;i<s;i++)a=o[n][i],l[i?"lineTo":"moveTo"](a.x,a.y);t&&l.closePath()}this._fillStroke(l,e)}}},_updateCircle:function(e){if(this._drawing&&!e._empty()){var t=e._point,n=this._ctx,i=Math.max(Math.round(e._radius),1),s=(Math.max(Math.round(e._radiusY),1)||i)/i;1!==s&&(n.save(),n.scale(1,s)),n.beginPath(),n.arc(t.x,t.y/s,i,0,2*Math.PI,!1),1!==s&&n.restore(),this._fillStroke(n,e)}},_fillStroke:function(e,t){var n=t.options;n.fill&&(e.globalAlpha=n.fillOpacity,e.fillStyle=n.fillColor||n.color,e.fill(n.fillRule||"evenodd")),n.stroke&&0!==n.weight&&(e.setLineDash&&e.setLineDash(t.options&&t.options._dashArray||[]),e.globalAlpha=n.opacity,e.lineWidth=n.weight,e.strokeStyle=n.color,e.lineCap=n.lineCap,e.lineJoin=n.lineJoin,e.stroke())},_onClick:function(e){for(var t,n,i=this._map.mouseEventToLayerPoint(e),s=this._drawFirst;s;s=s.next)(t=s.layer).options.interactive&&t._containsPoint(i)&&("click"!==e.type&&"preclick"!==e.type||!this._map._draggableMoved(t))&&(n=t);this._fireEvent(!!n&&[n],e)},_onMouseMove:function(e){if(this._map&&!this._map.dragging.moving()&&!this._map._animatingZoom){var t=this._map.mouseEventToLayerPoint(e);this._handleMouseHover(e,t)}},_handleMouseOut:function(e){var t=this._hoveredLayer;t&&(wt(this._container,"leaflet-interactive"),this._fireEvent([t],e,"mouseout"),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(e,t){if(!this._mouseHoverThrottled){for(var n,i,a=this._drawFirst;a;a=a.next)(n=a.layer).options.interactive&&n._containsPoint(t)&&(i=n);i!==this._hoveredLayer&&(this._handleMouseOut(e),i&&(bt(this._container,"leaflet-interactive"),this._fireEvent([i],e,"mouseover"),this._hoveredLayer=i)),this._fireEvent(!!this._hoveredLayer&&[this._hoveredLayer],e),this._mouseHoverThrottled=!0,setTimeout(s(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(e,t,n){this._map._fireDOMEvent(t,n||t.type,e)},_bringToFront:function(e){var t=e._order;if(t){var n=t.next,i=t.prev;n&&(n.prev=i,i?i.next=n:n&&(this._drawFirst=n),t.prev=this._drawLast,this._drawLast.next=t,t.next=null,this._drawLast=t,this._requestRedraw(e))}},_bringToBack:function(e){var t=e._order;if(t){var n=t.next,i=t.prev;i&&(i.next=n,n?n.prev=i:i&&(this._drawLast=i),t.prev=null,t.next=this._drawFirst,this._drawFirst.prev=t,this._drawFirst=t,this._requestRedraw(e))}}});function Ui(e){return De.canvas?new Wi(e):null}var Gi=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(e){return document.createElement("<lvml:"+e+' class="lvml">')}}catch(e){}return function(e){return document.createElement("<"+e+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}(),Ki={_initContainer:function(){this._container=mt("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(Fi.prototype._update.call(this),this.fire("update"))},_initPath:function(e){var t=e._container=Gi("shape");bt(t,"leaflet-vml-shape "+(this.options.className||"")),t.coordsize="1 1",e._path=Gi("path"),t.appendChild(e._path),this._updateStyle(e),this._layers[o(e)]=e},_addPath:function(e){var t=e._container;this._container.appendChild(t),e.options.interactive&&e.addInteractiveTarget(t)},_removePath:function(e){var t=e._container;gt(t),e.removeInteractiveTarget(t),delete this._layers[o(e)]},_updateStyle:function(e){var t=e._stroke,n=e._fill,i=e.options,s=e._container;s.stroked=!!i.stroke,s.filled=!!i.fill,i.stroke?(t||(t=e._stroke=Gi("stroke")),s.appendChild(t),t.weight=i.weight+"px",t.color=i.color,t.opacity=i.opacity,i.dashArray?t.dashStyle=_(i.dashArray)?i.dashArray.join(" "):i.dashArray.replace(/( *, *)/g," "):t.dashStyle="",t.endcap=i.lineCap.replace("butt","flat"),t.joinstyle=i.lineJoin):t&&(s.removeChild(t),e._stroke=null),i.fill?(n||(n=e._fill=Gi("fill")),s.appendChild(n),n.color=i.fillColor||i.color,n.opacity=i.fillOpacity):n&&(s.removeChild(n),e._fill=null)},_updateCircle:function(e){var t=e._point.round(),n=Math.round(e._radius),i=Math.round(e._radiusY||n);this._setPath(e,e._empty()?"M0 0":"AL "+t.x+","+t.y+" "+n+","+i+" 0,23592600")},_setPath:function(e,t){e._path.v=t},_bringToFront:function(e){_t(e._container)},_bringToBack:function(e){vt(e._container)}},Vi=De.vml?Gi:Y,Yi=Fi.extend({_initContainer:function(){this._container=Vi("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=Vi("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){gt(this._container),Bt(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_update:function(){if(!this._map._animatingZoom||!this._bounds){Fi.prototype._update.call(this);var e=this._bounds,t=e.getSize(),n=this._container;this._svgSize&&this._svgSize.equals(t)||(this._svgSize=t,n.setAttribute("width",t.x),n.setAttribute("height",t.y)),Lt(n,e.min),n.setAttribute("viewBox",[e.min.x,e.min.y,t.x,t.y].join(" ")),this.fire("update")}},_initPath:function(e){var t=e._path=Vi("path");e.options.className&&bt(t,e.options.className),e.options.interactive&&bt(t,"leaflet-interactive"),this._updateStyle(e),this._layers[o(e)]=e},_addPath:function(e){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(e._path),e.addInteractiveTarget(e._path)},_removePath:function(e){gt(e._path),e.removeInteractiveTarget(e._path),delete this._layers[o(e)]},_updatePath:function(e){e._project(),e._update()},_updateStyle:function(e){var t=e._path,n=e.options;t&&(n.stroke?(t.setAttribute("stroke",n.color),t.setAttribute("stroke-opacity",n.opacity),t.setAttribute("stroke-width",n.weight),t.setAttribute("stroke-linecap",n.lineCap),t.setAttribute("stroke-linejoin",n.lineJoin),n.dashArray?t.setAttribute("stroke-dasharray",n.dashArray):t.removeAttribute("stroke-dasharray"),n.dashOffset?t.setAttribute("stroke-dashoffset",n.dashOffset):t.removeAttribute("stroke-dashoffset")):t.setAttribute("stroke","none"),n.fill?(t.setAttribute("fill",n.fillColor||n.color),t.setAttribute("fill-opacity",n.fillOpacity),t.setAttribute("fill-rule",n.fillRule||"evenodd")):t.setAttribute("fill","none"))},_updatePoly:function(e,t){this._setPath(e,J(e._parts,t))},_updateCircle:function(e){var t=e._point,n=Math.max(Math.round(e._radius),1),i="a"+n+","+(Math.max(Math.round(e._radiusY),1)||n)+" 0 1,0 ",s=e._empty()?"M0 0":"M"+(t.x-n)+","+t.y+i+2*n+",0 "+i+2*-n+",0 ";this._setPath(e,s)},_setPath:function(e,t){e._path.setAttribute("d",t)},_bringToFront:function(e){_t(e._path)},_bringToBack:function(e){vt(e._path)}});function Ji(e){return De.svg||De.vml?new Yi(e):null}De.vml&&Yi.include(Ki),sn.include({getRenderer:function(e){var t=e.options.renderer||this._getPaneRenderer(e.options.pane)||this.options.renderer||this._renderer;return t||(t=this._renderer=this._createRenderer()),this.hasLayer(t)||this.addLayer(t),t},_getPaneRenderer:function(e){if("overlayPane"===e||void 0===e)return!1;var t=this._paneRenderers[e];return void 0===t&&(t=this._createRenderer({pane:e}),this._paneRenderers[e]=t),t},_createRenderer:function(e){return this.options.preferCanvas&&Ui(e)||Ji(e)}});var Xi=ci.extend({initialize:function(e,t){ci.prototype.initialize.call(this,this._boundsToLatLngs(e),t)},setBounds:function(e){return this.setLatLngs(this._boundsToLatLngs(e))},_boundsToLatLngs:function(e){return[(e=R(e)).getSouthWest(),e.getNorthWest(),e.getNorthEast(),e.getSouthEast()]}});function Qi(e,t){return new Xi(e,t)}Yi.create=Vi,Yi.pointsToPath=J,pi.geometryToLayer=mi,pi.coordsToLatLng=fi,pi.coordsToLatLngs=_i,pi.latLngToCoords=vi,pi.latLngsToCoords=yi,pi.getFeature=bi,pi.asFeature=wi,sn.mergeOptions({boxZoom:!0});var es=_n.extend({initialize:function(e){this._map=e,this._container=e._container,this._pane=e._panes.overlayPane,this._resetStateTimeout=0,e.on("unload",this._destroy,this)},addHooks:function(){Ot(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){Bt(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){gt(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){0!==this._resetStateTimeout&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(e){if(!e.shiftKey||1!==e.which&&1!==e.button)return!1;this._clearDeferredResetState(),this._resetState(),st(),Et(),this._startPoint=this._map.mouseEventToContainerPoint(e),Ot(document,{contextmenu:Vt,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(e){this._moved||(this._moved=!0,this._box=mt("div","leaflet-zoom-box",this._container),bt(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(e);var t=new I(this._point,this._startPoint),n=t.getSize();Lt(this._box,t.min),this._box.style.width=n.x+"px",this._box.style.height=n.y+"px"},_finish:function(){this._moved&&(gt(this._box),wt(this._container,"leaflet-crosshair")),at(),At(),Bt(document,{contextmenu:Vt,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(e){if((1===e.which||1===e.button)&&(this._finish(),this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(s(this._resetState,this),0);var t=new O(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(t).fire("boxzoomend",{boxZoomBounds:t})}},_onKeyDown:function(e){27===e.keyCode&&(this._finish(),this._clearDeferredResetState(),this._resetState())}});sn.addInitHook("addHandler","boxZoom",es),sn.mergeOptions({doubleClickZoom:!0});var ts=_n.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(e){var t=this._map,n=t.getZoom(),i=t.options.zoomDelta,s=e.originalEvent.shiftKey?n-i:n+i;"center"===t.options.doubleClickZoom?t.setZoom(s):t.setZoomAround(e.containerPoint,s)}});sn.addInitHook("addHandler","doubleClickZoom",ts),sn.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var ns=_n.extend({addHooks:function(){if(!this._draggable){var e=this._map;this._draggable=new bn(e._mapPane,e._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),e.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),e.on("zoomend",this._onZoomEnd,this),e.whenReady(this._onZoomEnd,this))}bt(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){wt(this._map._container,"leaflet-grab"),wt(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var e=this._map;if(e._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var t=R(this._map.options.maxBounds);this._offsetLimit=D(this._map.latLngToContainerPoint(t.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(t.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;e.fire("movestart").fire("dragstart"),e.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(e){if(this._map.options.inertia){var t=this._lastTime=+new Date,n=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(n),this._times.push(t),this._prunePositions(t)}this._map.fire("move",e).fire("drag",e)},_prunePositions:function(e){for(;this._positions.length>1&&e-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var e=this._map.getSize().divideBy(2),t=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=t.subtract(e).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(e,t){return e-(e-t)*this._viscosity},_onPreDragLimit:function(){if(this._viscosity&&this._offsetLimit){var e=this._draggable._newPos.subtract(this._draggable._startPos),t=this._offsetLimit;e.x<t.min.x&&(e.x=this._viscousLimit(e.x,t.min.x)),e.y<t.min.y&&(e.y=this._viscousLimit(e.y,t.min.y)),e.x>t.max.x&&(e.x=this._viscousLimit(e.x,t.max.x)),e.y>t.max.y&&(e.y=this._viscousLimit(e.y,t.max.y)),this._draggable._newPos=this._draggable._startPos.add(e)}},_onPreDragWrap:function(){var e=this._worldWidth,t=Math.round(e/2),n=this._initialWorldOffset,i=this._draggable._newPos.x,s=(i-t+n)%e+t-n,a=(i+t+n)%e-t-n,o=Math.abs(s+n)<Math.abs(a+n)?s:a;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=o},_onDragEnd:function(e){var t=this._map,n=t.options,i=!n.inertia||e.noInertia||this._times.length<2;if(t.fire("dragend",e),i)t.fire("moveend");else{this._prunePositions(+new Date);var s=this._lastPos.subtract(this._positions[0]),a=(this._lastTime-this._times[0])/1e3,o=n.easeLinearity,r=s.multiplyBy(o/a),l=r.distanceTo([0,0]),h=Math.min(n.inertiaMaxSpeed,l),d=r.multiplyBy(h/l),c=h/(n.inertiaDeceleration*o),u=d.multiplyBy(-c/2).round();u.x||u.y?(u=t._limitOffset(u,t.options.maxBounds),$(function(){t.panBy(u,{duration:c,easeLinearity:o,noMoveStart:!0,animate:!0})})):t.fire("moveend")}}});sn.addInitHook("addHandler","dragging",ns),sn.mergeOptions({keyboard:!0,keyboardPanDelta:80});var is=_n.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(e){this._map=e,this._setPanDelta(e.options.keyboardPanDelta),this._setZoomDelta(e.options.zoomDelta)},addHooks:function(){var e=this._map._container;e.tabIndex<=0&&(e.tabIndex="0"),Ot(e,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),Bt(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var e=document.body,t=document.documentElement,n=e.scrollTop||t.scrollTop,i=e.scrollLeft||t.scrollLeft;this._map._container.focus(),window.scrollTo(i,n)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(e){var t,n,i=this._panKeys={},s=this.keyCodes;for(t=0,n=s.left.length;t<n;t++)i[s.left[t]]=[-1*e,0];for(t=0,n=s.right.length;t<n;t++)i[s.right[t]]=[e,0];for(t=0,n=s.down.length;t<n;t++)i[s.down[t]]=[0,e];for(t=0,n=s.up.length;t<n;t++)i[s.up[t]]=[0,-1*e]},_setZoomDelta:function(e){var t,n,i=this._zoomKeys={},s=this.keyCodes;for(t=0,n=s.zoomIn.length;t<n;t++)i[s.zoomIn[t]]=e;for(t=0,n=s.zoomOut.length;t<n;t++)i[s.zoomOut[t]]=-e},_addHooks:function(){Ot(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){Bt(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(e){if(!(e.altKey||e.ctrlKey||e.metaKey)){var t,n=e.keyCode,i=this._map;if(n in this._panKeys){if(!i._panAnim||!i._panAnim._inProgress)if(t=this._panKeys[n],e.shiftKey&&(t=N(t).multiplyBy(3)),i.options.maxBounds&&(t=i._limitOffset(N(t),i.options.maxBounds)),i.options.worldCopyJump){var s=i.wrapLatLng(i.unproject(i.project(i.getCenter()).add(t)));i.panTo(s)}else i.panBy(t)}else if(n in this._zoomKeys)i.setZoom(i.getZoom()+(e.shiftKey?3:1)*this._zoomKeys[n]);else{if(27!==n||!i._popup||!i._popup.options.closeOnEscapeKey)return;i.closePopup()}Vt(e)}}});sn.addInitHook("addHandler","keyboard",is),sn.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var ss=_n.extend({addHooks:function(){Ot(this._map._container,"wheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){Bt(this._map._container,"wheel",this._onWheelScroll,this)},_onWheelScroll:function(e){var t=Qt(e),n=this._map.options.wheelDebounceTime;this._delta+=t,this._lastMousePos=this._map.mouseEventToContainerPoint(e),this._startTime||(this._startTime=+new Date);var i=Math.max(n-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(s(this._performZoom,this),i),Vt(e)},_performZoom:function(){var e=this._map,t=e.getZoom(),n=this._map.options.zoomSnap||0;e._stop();var i=this._delta/(4*this._map.options.wheelPxPerZoomLevel),s=4*Math.log(2/(1+Math.exp(-Math.abs(i))))/Math.LN2,a=n?Math.ceil(s/n)*n:s,o=e._limitZoom(t+(this._delta>0?a:-a))-t;this._delta=0,this._startTime=null,o&&("center"===e.options.scrollWheelZoom?e.setZoom(t+o):e.setZoomAround(this._lastMousePos,t+o))}});sn.addInitHook("addHandler","scrollWheelZoom",ss);var as=600;sn.mergeOptions({tapHold:De.touchNative&&De.safari&&De.mobile,tapTolerance:15});var os=_n.extend({addHooks:function(){Ot(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){Bt(this._map._container,"touchstart",this._onDown,this)},_onDown:function(e){if(clearTimeout(this._holdTimeout),1===e.touches.length){var t=e.touches[0];this._startPos=this._newPos=new M(t.clientX,t.clientY),this._holdTimeout=setTimeout(s(function(){this._cancel(),this._isTapValid()&&(Ot(document,"touchend",Kt),Ot(document,"touchend touchcancel",this._cancelClickPrevent),this._simulateEvent("contextmenu",t))},this),as),Ot(document,"touchend touchcancel contextmenu",this._cancel,this),Ot(document,"touchmove",this._onMove,this)}},_cancelClickPrevent:function e(){Bt(document,"touchend",Kt),Bt(document,"touchend touchcancel",e)},_cancel:function(){clearTimeout(this._holdTimeout),Bt(document,"touchend touchcancel contextmenu",this._cancel,this),Bt(document,"touchmove",this._onMove,this)},_onMove:function(e){var t=e.touches[0];this._newPos=new M(t.clientX,t.clientY)},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_simulateEvent:function(e,t){var n=new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window,screenX:t.screenX,screenY:t.screenY,clientX:t.clientX,clientY:t.clientY});n._simulated=!0,t.target.dispatchEvent(n)}});sn.addInitHook("addHandler","tapHold",os),sn.mergeOptions({touchZoom:De.touch,bounceAtZoomLimits:!0});var rs=_n.extend({addHooks:function(){bt(this._map._container,"leaflet-touch-zoom"),Ot(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){wt(this._map._container,"leaflet-touch-zoom"),Bt(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(e){var t=this._map;if(e.touches&&2===e.touches.length&&!t._animatingZoom&&!this._zooming){var n=t.mouseEventToContainerPoint(e.touches[0]),i=t.mouseEventToContainerPoint(e.touches[1]);this._centerPoint=t.getSize()._divideBy(2),this._startLatLng=t.containerPointToLatLng(this._centerPoint),"center"!==t.options.touchZoom&&(this._pinchStartLatLng=t.containerPointToLatLng(n.add(i)._divideBy(2))),this._startDist=n.distanceTo(i),this._startZoom=t.getZoom(),this._moved=!1,this._zooming=!0,t._stop(),Ot(document,"touchmove",this._onTouchMove,this),Ot(document,"touchend touchcancel",this._onTouchEnd,this),Kt(e)}},_onTouchMove:function(e){if(e.touches&&2===e.touches.length&&this._zooming){var t=this._map,n=t.mouseEventToContainerPoint(e.touches[0]),i=t.mouseEventToContainerPoint(e.touches[1]),a=n.distanceTo(i)/this._startDist;if(this._zoom=t.getScaleZoom(a,this._startZoom),!t.options.bounceAtZoomLimits&&(this._zoom<t.getMinZoom()&&a<1||this._zoom>t.getMaxZoom()&&a>1)&&(this._zoom=t._limitZoom(this._zoom)),"center"===t.options.touchZoom){if(this._center=this._startLatLng,1===a)return}else{var o=n._add(i)._divideBy(2)._subtract(this._centerPoint);if(1===a&&0===o.x&&0===o.y)return;this._center=t.unproject(t.project(this._pinchStartLatLng,this._zoom).subtract(o),this._zoom)}this._moved||(t._moveStart(!0,!1),this._moved=!0),P(this._animRequest);var r=s(t._move,t,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=$(r,this,!0),Kt(e)}},_onTouchEnd:function(){this._moved&&this._zooming?(this._zooming=!1,P(this._animRequest),Bt(document,"touchmove",this._onTouchMove,this),Bt(document,"touchend touchcancel",this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))):this._zooming=!1}});sn.addInitHook("addHandler","touchZoom",rs),sn.BoxZoom=es,sn.DoubleClickZoom=ts,sn.Drag=ns,sn.Keyboard=is,sn.ScrollWheelZoom=ss,sn.TapHold=os,sn.TouchZoom=rs,e.Bounds=I,e.Browser=De,e.CRS=j,e.Canvas=Wi,e.Circle=ri,e.CircleMarker=ai,e.Class=T,e.Control=on,e.DivIcon=Ii,e.DivOverlay=Ei,e.DomEvent=tn,e.DomUtil=Dt,e.Draggable=bn,e.Evented=A,e.FeatureGroup=Yn,e.GeoJSON=pi,e.GridLayer=Oi,e.Handler=_n,e.Icon=Xn,e.ImageOverlay=$i,e.LatLng=B,e.LatLngBounds=O,e.Layer=Gn,e.LayerGroup=Kn,e.LineUtil=Bn,e.Map=sn,e.Marker=ni,e.Mixin=vn,e.Path=si,e.Point=M,e.PolyUtil=$n,e.Polygon=ci,e.Polyline=hi,e.Popup=Ai,e.PosAnimation=nn,e.Projection=qn,e.Rectangle=Xi,e.Renderer=Fi,e.SVG=Yi,e.SVGOverlay=Ti,e.TileLayer=Bi,e.Tooltip=Hi,e.Transformation=U,e.Util=S,e.VideoOverlay=Si,e.bind=s,e.bounds=D,e.canvas=Ui,e.circle=li,e.circleMarker=oi,e.control=rn,e.divIcon=Di,e.extend=n,e.featureGroup=Jn,e.geoJSON=ki,e.geoJson=zi,e.gridLayer=Ri,e.icon=Qn,e.imageOverlay=Pi,e.latLng=Z,e.latLngBounds=R,e.layerGroup=Vn,e.map=an,e.marker=ii,e.point=N,e.polygon=ui,e.polyline=di,e.popup=Mi,e.rectangle=Qi,e.setOptions=p,e.stamp=o,e.svg=Ji,e.svgOverlay=Ci,e.tileLayer=Zi,e.tooltip=Ni,e.transformation=G,e.version=t,e.videoOverlay=Li;var ls=window.L;e.noConflict=function(){return window.L=ls,this},window.L=e}(qe.exports)),qe.exports);const We=["temp_new","wind_new","clouds_new","precipitation_new"];let Ue=class extends he{constructor(){super(...arguments),this.nodes=[],this.owmKey="",this.zoom=10,this.radiusKm=0,this.center=null,this.heightMode="auto",this.pinSize="medium",this.labels=!1,this._owmLayer="",this._markers=[],this._signature="",this._heightApplied=""}firstUpdated(){const e=this.renderRoot.querySelector("#map");e&&(this._map=Fe.map(e,{zoomControl:!0,attributionControl:!0}).setView([46,11],this.zoom),this._setBase(),this._drawNodes(),this._resizeObserver=new ResizeObserver(()=>this._map?.invalidateSize()),this._resizeObserver.observe(e),window.setTimeout(()=>this._map?.invalidateSize(),60))}willUpdate(){const e={auto:"clamp(320px, 60vh, 900px)",mobile:"340px",tablet:"520px",desktop:"760px"};this.style.setProperty("--hermes-map-height",e[this.heightMode]??e.auto)}updated(){const e=JSON.stringify([this.nodes.map(e=>[e.nodeNum,e.latitude,e.longitude,e.connected,e.authorized]),this.radiusKm,this.center,this.pinSize,this.labels]);e!==this._signature&&(this._signature=e,this._drawNodes()),this.heightMode!==this._heightApplied&&(this._heightApplied=this.heightMode,window.setTimeout(()=>this._map?.invalidateSize(),50))}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),this._map?.remove(),this._map=void 0}_isDark(){return matchMedia("(prefers-color-scheme: dark)").matches}_setBase(){this._map&&(this._base?.remove(),this._base=Fe.tileLayer(this._isDark()?"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png":"https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',maxZoom:19}).addTo(this._map))}_drawNodes(){if(!this._map)return;for(const e of this._markers)e.remove();this._markers=[];const e=[];for(const t of this.nodes){if(null===t.latitude||null===t.longitude)continue;const n=[t.latitude,t.longitude];e.push(n);const i={small:12,medium:16,large:22},s=i[this.pinSize]??i.medium,a=t.authorized?t.connected?"on":"off":"relay",o=this.labels?`<span class="tag">${t.name}</span>`:"",r=Fe.marker(n,{icon:Fe.divIcon({className:"pin",html:`<div class="${a}" style="width:${s}px;height:${s}px"></div>${o}`,iconSize:[s,s],iconAnchor:[s/2,s/2]}),title:t.name}).addTo(this._map);r.bindPopup(this._popup(t)),this._markers.push(r)}if(this._circle?.remove(),this._circle=void 0,this.radiusKm>0&&this.center)return this._circle=Fe.circle(this.center,{radius:1e3*this.radiusKm,color:"#e0a800",weight:2,fillOpacity:.06}).addTo(this._map),void this._map.fitBounds(this._circle.getBounds(),{padding:[20,20]});1===e.length?this._map.setView(e[0],Math.max(this.zoom,13)):e.length>1&&this._map.fitBounds(Fe.latLngBounds(e),{padding:[40,40]})}_popup(e){const t=[`<b>${e.name}</b>`];return null!==e.nodeNum&&t.push(`#${e.nodeNum}`),null!==e.battery&&void 0!==e.battery&&t.push(`${e.battery}%`),e.lastSeen&&t.push(e.lastSeen),t.join("<br>")}_toggleOwm(e){this._map&&this.owmKey&&(this._owm?.remove(),this._owm=void 0,this._owmLayer!==e?(this._owmLayer=e,this._owm=Fe.tileLayer(`https://tile.openweathermap.org/map/${e}/{z}/{x}/{y}.png?appid=${this.owmKey}`,{opacity:.6,maxZoom:19}).addTo(this._map)):this._owmLayer="")}render(){return W`
      ${this.owmKey?W`
            <div class="toolbar">
              ${We.map(e=>W`
                  <button
                    class="lchip"
                    data-on=${this._owmLayer===e?"1":"0"}
                    @click=${()=>this._toggleOwm(e)}
                  >
                    ${e.replace("_new","")}
                  </button>
                `)}
            </div>
          `:""}
      <div id="map"></div>
    `}};Ue.styles=[o('\n/* required styles */\n\n.leaflet-pane,\n.leaflet-tile,\n.leaflet-marker-icon,\n.leaflet-marker-shadow,\n.leaflet-tile-container,\n.leaflet-pane > svg,\n.leaflet-pane > canvas,\n.leaflet-zoom-box,\n.leaflet-image-layer,\n.leaflet-layer {\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\t}\n.leaflet-container {\n\toverflow: hidden;\n\t}\n.leaflet-tile,\n.leaflet-marker-icon,\n.leaflet-marker-shadow {\n\t-webkit-user-select: none;\n\t   -moz-user-select: none;\n\t        user-select: none;\n\t  -webkit-user-drag: none;\n\t}\n/* Prevents IE11 from highlighting tiles in blue */\n.leaflet-tile::selection {\n\tbackground: transparent;\n}\n/* Safari renders non-retina tile on retina better with this, but Chrome is worse */\n.leaflet-safari .leaflet-tile {\n\timage-rendering: -webkit-optimize-contrast;\n\t}\n/* hack that prevents hw layers "stretching" when loading new tiles */\n.leaflet-safari .leaflet-tile-container {\n\twidth: 1600px;\n\theight: 1600px;\n\t-webkit-transform-origin: 0 0;\n\t}\n.leaflet-marker-icon,\n.leaflet-marker-shadow {\n\tdisplay: block;\n\t}\n/* .leaflet-container svg: reset svg max-width decleration shipped in Joomla! (joomla.org) 3.x */\n/* .leaflet-container img: map is broken in FF if you have max-width: 100% on tiles */\n.leaflet-container .leaflet-overlay-pane svg {\n\tmax-width: none !important;\n\tmax-height: none !important;\n\t}\n.leaflet-container .leaflet-marker-pane img,\n.leaflet-container .leaflet-shadow-pane img,\n.leaflet-container .leaflet-tile-pane img,\n.leaflet-container img.leaflet-image-layer,\n.leaflet-container .leaflet-tile {\n\tmax-width: none !important;\n\tmax-height: none !important;\n\twidth: auto;\n\tpadding: 0;\n\t}\n\n.leaflet-container img.leaflet-tile {\n\t/* See: https://bugs.chromium.org/p/chromium/issues/detail?id=600120 */\n\tmix-blend-mode: plus-lighter;\n}\n\n.leaflet-container.leaflet-touch-zoom {\n\t-ms-touch-action: pan-x pan-y;\n\ttouch-action: pan-x pan-y;\n\t}\n.leaflet-container.leaflet-touch-drag {\n\t-ms-touch-action: pinch-zoom;\n\t/* Fallback for FF which doesn\'t support pinch-zoom */\n\ttouch-action: none;\n\ttouch-action: pinch-zoom;\n}\n.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {\n\t-ms-touch-action: none;\n\ttouch-action: none;\n}\n.leaflet-container {\n\t-webkit-tap-highlight-color: transparent;\n}\n.leaflet-container a {\n\t-webkit-tap-highlight-color: rgba(51, 181, 229, 0.4);\n}\n.leaflet-tile {\n\tfilter: inherit;\n\tvisibility: hidden;\n\t}\n.leaflet-tile-loaded {\n\tvisibility: inherit;\n\t}\n.leaflet-zoom-box {\n\twidth: 0;\n\theight: 0;\n\t-moz-box-sizing: border-box;\n\t     box-sizing: border-box;\n\tz-index: 800;\n\t}\n/* workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=888319 */\n.leaflet-overlay-pane svg {\n\t-moz-user-select: none;\n\t}\n\n.leaflet-pane         { z-index: 400; }\n\n.leaflet-tile-pane    { z-index: 200; }\n.leaflet-overlay-pane { z-index: 400; }\n.leaflet-shadow-pane  { z-index: 500; }\n.leaflet-marker-pane  { z-index: 600; }\n.leaflet-tooltip-pane   { z-index: 650; }\n.leaflet-popup-pane   { z-index: 700; }\n\n.leaflet-map-pane canvas { z-index: 100; }\n.leaflet-map-pane svg    { z-index: 200; }\n\n.leaflet-vml-shape {\n\twidth: 1px;\n\theight: 1px;\n\t}\n.lvml {\n\tbehavior: none;\n\tdisplay: inline-block;\n\tposition: absolute;\n\t}\n\n\n/* control positioning */\n\n.leaflet-control {\n\tposition: relative;\n\tz-index: 800;\n\tpointer-events: visiblePainted; /* IE 9-10 doesn\'t have auto */\n\tpointer-events: auto;\n\t}\n.leaflet-top,\n.leaflet-bottom {\n\tposition: absolute;\n\tz-index: 1000;\n\tpointer-events: none;\n\t}\n.leaflet-top {\n\ttop: 0;\n\t}\n.leaflet-right {\n\tright: 0;\n\t}\n.leaflet-bottom {\n\tbottom: 0;\n\t}\n.leaflet-left {\n\tleft: 0;\n\t}\n.leaflet-control {\n\tfloat: left;\n\tclear: both;\n\t}\n.leaflet-right .leaflet-control {\n\tfloat: right;\n\t}\n.leaflet-top .leaflet-control {\n\tmargin-top: 10px;\n\t}\n.leaflet-bottom .leaflet-control {\n\tmargin-bottom: 10px;\n\t}\n.leaflet-left .leaflet-control {\n\tmargin-left: 10px;\n\t}\n.leaflet-right .leaflet-control {\n\tmargin-right: 10px;\n\t}\n\n\n/* zoom and fade animations */\n\n.leaflet-fade-anim .leaflet-popup {\n\topacity: 0;\n\t-webkit-transition: opacity 0.2s linear;\n\t   -moz-transition: opacity 0.2s linear;\n\t        transition: opacity 0.2s linear;\n\t}\n.leaflet-fade-anim .leaflet-map-pane .leaflet-popup {\n\topacity: 1;\n\t}\n.leaflet-zoom-animated {\n\t-webkit-transform-origin: 0 0;\n\t    -ms-transform-origin: 0 0;\n\t        transform-origin: 0 0;\n\t}\nsvg.leaflet-zoom-animated {\n\twill-change: transform;\n}\n\n.leaflet-zoom-anim .leaflet-zoom-animated {\n\t-webkit-transition: -webkit-transform 0.25s cubic-bezier(0,0,0.25,1);\n\t   -moz-transition:    -moz-transform 0.25s cubic-bezier(0,0,0.25,1);\n\t        transition:         transform 0.25s cubic-bezier(0,0,0.25,1);\n\t}\n.leaflet-zoom-anim .leaflet-tile,\n.leaflet-pan-anim .leaflet-tile {\n\t-webkit-transition: none;\n\t   -moz-transition: none;\n\t        transition: none;\n\t}\n\n.leaflet-zoom-anim .leaflet-zoom-hide {\n\tvisibility: hidden;\n\t}\n\n\n/* cursors */\n\n.leaflet-interactive {\n\tcursor: pointer;\n\t}\n.leaflet-grab {\n\tcursor: -webkit-grab;\n\tcursor:    -moz-grab;\n\tcursor:         grab;\n\t}\n.leaflet-crosshair,\n.leaflet-crosshair .leaflet-interactive {\n\tcursor: crosshair;\n\t}\n.leaflet-popup-pane,\n.leaflet-control {\n\tcursor: auto;\n\t}\n.leaflet-dragging .leaflet-grab,\n.leaflet-dragging .leaflet-grab .leaflet-interactive,\n.leaflet-dragging .leaflet-marker-draggable {\n\tcursor: move;\n\tcursor: -webkit-grabbing;\n\tcursor:    -moz-grabbing;\n\tcursor:         grabbing;\n\t}\n\n/* marker & overlays interactivity */\n.leaflet-marker-icon,\n.leaflet-marker-shadow,\n.leaflet-image-layer,\n.leaflet-pane > svg path,\n.leaflet-tile-container {\n\tpointer-events: none;\n\t}\n\n.leaflet-marker-icon.leaflet-interactive,\n.leaflet-image-layer.leaflet-interactive,\n.leaflet-pane > svg path.leaflet-interactive,\nsvg.leaflet-image-layer.leaflet-interactive path {\n\tpointer-events: visiblePainted; /* IE 9-10 doesn\'t have auto */\n\tpointer-events: auto;\n\t}\n\n/* visual tweaks */\n\n.leaflet-container {\n\tbackground: #ddd;\n\toutline-offset: 1px;\n\t}\n.leaflet-container a {\n\tcolor: #0078A8;\n\t}\n.leaflet-zoom-box {\n\tborder: 2px dotted #38f;\n\tbackground: rgba(255,255,255,0.5);\n\t}\n\n\n/* general typography */\n.leaflet-container {\n\tfont-family: "Helvetica Neue", Arial, Helvetica, sans-serif;\n\tfont-size: 12px;\n\tfont-size: 0.75rem;\n\tline-height: 1.5;\n\t}\n\n\n/* general toolbar styles */\n\n.leaflet-bar {\n\tbox-shadow: 0 1px 5px rgba(0,0,0,0.65);\n\tborder-radius: 4px;\n\t}\n.leaflet-bar a {\n\tbackground-color: #fff;\n\tborder-bottom: 1px solid #ccc;\n\twidth: 26px;\n\theight: 26px;\n\tline-height: 26px;\n\tdisplay: block;\n\ttext-align: center;\n\ttext-decoration: none;\n\tcolor: black;\n\t}\n.leaflet-bar a,\n.leaflet-control-layers-toggle {\n\tbackground-position: 50% 50%;\n\tbackground-repeat: no-repeat;\n\tdisplay: block;\n\t}\n.leaflet-bar a:hover,\n.leaflet-bar a:focus {\n\tbackground-color: #f4f4f4;\n\t}\n.leaflet-bar a:first-child {\n\tborder-top-left-radius: 4px;\n\tborder-top-right-radius: 4px;\n\t}\n.leaflet-bar a:last-child {\n\tborder-bottom-left-radius: 4px;\n\tborder-bottom-right-radius: 4px;\n\tborder-bottom: none;\n\t}\n.leaflet-bar a.leaflet-disabled {\n\tcursor: default;\n\tbackground-color: #f4f4f4;\n\tcolor: #bbb;\n\t}\n\n.leaflet-touch .leaflet-bar a {\n\twidth: 30px;\n\theight: 30px;\n\tline-height: 30px;\n\t}\n.leaflet-touch .leaflet-bar a:first-child {\n\tborder-top-left-radius: 2px;\n\tborder-top-right-radius: 2px;\n\t}\n.leaflet-touch .leaflet-bar a:last-child {\n\tborder-bottom-left-radius: 2px;\n\tborder-bottom-right-radius: 2px;\n\t}\n\n/* zoom control */\n\n.leaflet-control-zoom-in,\n.leaflet-control-zoom-out {\n\tfont: bold 18px \'Lucida Console\', Monaco, monospace;\n\ttext-indent: 1px;\n\t}\n\n.leaflet-touch .leaflet-control-zoom-in, .leaflet-touch .leaflet-control-zoom-out  {\n\tfont-size: 22px;\n\t}\n\n\n/* layers control */\n\n.leaflet-control-layers {\n\tbox-shadow: 0 1px 5px rgba(0,0,0,0.4);\n\tbackground: #fff;\n\tborder-radius: 5px;\n\t}\n.leaflet-control-layers-toggle {\n\tbackground-image: none;\n\twidth: 36px;\n\theight: 36px;\n\t}\n.leaflet-retina .leaflet-control-layers-toggle {\n\tbackground-image: none;\n\tbackground-size: 26px 26px;\n\t}\n.leaflet-touch .leaflet-control-layers-toggle {\n\twidth: 44px;\n\theight: 44px;\n\t}\n.leaflet-control-layers .leaflet-control-layers-list,\n.leaflet-control-layers-expanded .leaflet-control-layers-toggle {\n\tdisplay: none;\n\t}\n.leaflet-control-layers-expanded .leaflet-control-layers-list {\n\tdisplay: block;\n\tposition: relative;\n\t}\n.leaflet-control-layers-expanded {\n\tpadding: 6px 10px 6px 6px;\n\tcolor: #333;\n\tbackground: #fff;\n\t}\n.leaflet-control-layers-scrollbar {\n\toverflow-y: scroll;\n\toverflow-x: hidden;\n\tpadding-right: 5px;\n\t}\n.leaflet-control-layers-selector {\n\tmargin-top: 2px;\n\tposition: relative;\n\ttop: 1px;\n\t}\n.leaflet-control-layers label {\n\tdisplay: block;\n\tfont-size: 13px;\n\tfont-size: 1.08333em;\n\t}\n.leaflet-control-layers-separator {\n\theight: 0;\n\tborder-top: 1px solid #ddd;\n\tmargin: 5px -10px 5px -6px;\n\t}\n\n/* Default icon URLs */\n.leaflet-default-icon-path { /* used only in path-guessing heuristic, see L.Icon.Default */\n\tbackground-image: none;\n\t}\n\n\n/* attribution and scale controls */\n\n.leaflet-container .leaflet-control-attribution {\n\tbackground: #fff;\n\tbackground: rgba(255, 255, 255, 0.8);\n\tmargin: 0;\n\t}\n.leaflet-control-attribution,\n.leaflet-control-scale-line {\n\tpadding: 0 5px;\n\tcolor: #333;\n\tline-height: 1.4;\n\t}\n.leaflet-control-attribution a {\n\ttext-decoration: none;\n\t}\n.leaflet-control-attribution a:hover,\n.leaflet-control-attribution a:focus {\n\ttext-decoration: underline;\n\t}\n.leaflet-attribution-flag {\n\tdisplay: inline !important;\n\tvertical-align: baseline !important;\n\twidth: 1em;\n\theight: 0.6669em;\n\t}\n.leaflet-left .leaflet-control-scale {\n\tmargin-left: 5px;\n\t}\n.leaflet-bottom .leaflet-control-scale {\n\tmargin-bottom: 5px;\n\t}\n.leaflet-control-scale-line {\n\tborder: 2px solid #777;\n\tborder-top: none;\n\tline-height: 1.1;\n\tpadding: 2px 5px 1px;\n\twhite-space: nowrap;\n\t-moz-box-sizing: border-box;\n\t     box-sizing: border-box;\n\tbackground: rgba(255, 255, 255, 0.8);\n\ttext-shadow: 1px 1px #fff;\n\t}\n.leaflet-control-scale-line:not(:first-child) {\n\tborder-top: 2px solid #777;\n\tborder-bottom: none;\n\tmargin-top: -2px;\n\t}\n.leaflet-control-scale-line:not(:first-child):not(:last-child) {\n\tborder-bottom: 2px solid #777;\n\t}\n\n.leaflet-touch .leaflet-control-attribution,\n.leaflet-touch .leaflet-control-layers,\n.leaflet-touch .leaflet-bar {\n\tbox-shadow: none;\n\t}\n.leaflet-touch .leaflet-control-layers,\n.leaflet-touch .leaflet-bar {\n\tborder: 2px solid rgba(0,0,0,0.2);\n\tbackground-clip: padding-box;\n\t}\n\n\n/* popup */\n\n.leaflet-popup {\n\tposition: absolute;\n\ttext-align: center;\n\tmargin-bottom: 20px;\n\t}\n.leaflet-popup-content-wrapper {\n\tpadding: 1px;\n\ttext-align: left;\n\tborder-radius: 12px;\n\t}\n.leaflet-popup-content {\n\tmargin: 13px 24px 13px 20px;\n\tline-height: 1.3;\n\tfont-size: 13px;\n\tfont-size: 1.08333em;\n\tmin-height: 1px;\n\t}\n.leaflet-popup-content p {\n\tmargin: 17px 0;\n\tmargin: 1.3em 0;\n\t}\n.leaflet-popup-tip-container {\n\twidth: 40px;\n\theight: 20px;\n\tposition: absolute;\n\tleft: 50%;\n\tmargin-top: -1px;\n\tmargin-left: -20px;\n\toverflow: hidden;\n\tpointer-events: none;\n\t}\n.leaflet-popup-tip {\n\twidth: 17px;\n\theight: 17px;\n\tpadding: 1px;\n\n\tmargin: -10px auto 0;\n\tpointer-events: auto;\n\n\t-webkit-transform: rotate(45deg);\n\t   -moz-transform: rotate(45deg);\n\t    -ms-transform: rotate(45deg);\n\t        transform: rotate(45deg);\n\t}\n.leaflet-popup-content-wrapper,\n.leaflet-popup-tip {\n\tbackground: white;\n\tcolor: #333;\n\tbox-shadow: 0 3px 14px rgba(0,0,0,0.4);\n\t}\n.leaflet-container a.leaflet-popup-close-button {\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\tborder: none;\n\ttext-align: center;\n\twidth: 24px;\n\theight: 24px;\n\tfont: 16px/24px Tahoma, Verdana, sans-serif;\n\tcolor: #757575;\n\ttext-decoration: none;\n\tbackground: transparent;\n\t}\n.leaflet-container a.leaflet-popup-close-button:hover,\n.leaflet-container a.leaflet-popup-close-button:focus {\n\tcolor: #585858;\n\t}\n.leaflet-popup-scrolled {\n\toverflow: auto;\n\t}\n\n.leaflet-oldie .leaflet-popup-content-wrapper {\n\t-ms-zoom: 1;\n\t}\n.leaflet-oldie .leaflet-popup-tip {\n\twidth: 24px;\n\tmargin: 0 auto;\n\n\t-ms-filter: "progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)";\n\tfilter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678);\n\t}\n\n.leaflet-oldie .leaflet-control-zoom,\n.leaflet-oldie .leaflet-control-layers,\n.leaflet-oldie .leaflet-popup-content-wrapper,\n.leaflet-oldie .leaflet-popup-tip {\n\tborder: 1px solid #999;\n\t}\n\n\n/* div icon */\n\n.leaflet-div-icon {\n\tbackground: #fff;\n\tborder: 1px solid #666;\n\t}\n\n\n/* Tooltip */\n/* Base styles for the element that has a tooltip */\n.leaflet-tooltip {\n\tposition: absolute;\n\tpadding: 6px;\n\tbackground-color: #fff;\n\tborder: 1px solid #fff;\n\tborder-radius: 3px;\n\tcolor: #222;\n\twhite-space: nowrap;\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n\tpointer-events: none;\n\tbox-shadow: 0 1px 3px rgba(0,0,0,0.4);\n\t}\n.leaflet-tooltip.leaflet-interactive {\n\tcursor: pointer;\n\tpointer-events: auto;\n\t}\n.leaflet-tooltip-top:before,\n.leaflet-tooltip-bottom:before,\n.leaflet-tooltip-left:before,\n.leaflet-tooltip-right:before {\n\tposition: absolute;\n\tpointer-events: none;\n\tborder: 6px solid transparent;\n\tbackground: transparent;\n\tcontent: "";\n\t}\n\n/* Directions */\n\n.leaflet-tooltip-bottom {\n\tmargin-top: 6px;\n}\n.leaflet-tooltip-top {\n\tmargin-top: -6px;\n}\n.leaflet-tooltip-bottom:before,\n.leaflet-tooltip-top:before {\n\tleft: 50%;\n\tmargin-left: -6px;\n\t}\n.leaflet-tooltip-top:before {\n\tbottom: 0;\n\tmargin-bottom: -12px;\n\tborder-top-color: #fff;\n\t}\n.leaflet-tooltip-bottom:before {\n\ttop: 0;\n\tmargin-top: -12px;\n\tmargin-left: -6px;\n\tborder-bottom-color: #fff;\n\t}\n.leaflet-tooltip-left {\n\tmargin-left: -6px;\n}\n.leaflet-tooltip-right {\n\tmargin-left: 6px;\n}\n.leaflet-tooltip-left:before,\n.leaflet-tooltip-right:before {\n\ttop: 50%;\n\tmargin-top: -6px;\n\t}\n.leaflet-tooltip-left:before {\n\tright: 0;\n\tmargin-right: -12px;\n\tborder-left-color: #fff;\n\t}\n.leaflet-tooltip-right:before {\n\tleft: 0;\n\tmargin-left: -12px;\n\tborder-right-color: #fff;\n\t}\n\n/* Printing */\n\n@media print {\n\t/* Prevent printers from removing background-images of controls. */\n\t.leaflet-control {\n\t\t-webkit-print-color-adjust: exact;\n\t\tprint-color-adjust: exact;\n\t\t}\n\t}\n'),r`
      :host {
        display: block;
      }
      #map {
        /* Driven by the size preset. "auto" scales with the viewport so the
         * same card is usable on a phone and on a desktop without a setting. */
        height: var(--hermes-map-height, clamp(320px, 60vh, 900px));
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
      /* A node that may not send commands is a relay as far as Hermes is
       * concerned: it carries traffic but is not a peer, so it reads as a
       * different kind of thing rather than a different state. */
      .pin div.relay {
        background: #4aa3ff;
        box-shadow: 0 0 0 3px rgba(74, 163, 255, 0.30);
      }
      /* A halo was not enough: over a busy map the text still landed on tiles
       * and other labels. An opaque chip on its own stacking level reads in
       * every case, and a long name is cut rather than covering a neighbour. */
      .pin .tag {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 100%;
        margin-top: 4px;
        max-width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 10px;
        font-weight: 700;
        line-height: 1.4;
        padding: 1px 5px;
        border-radius: 4px;
        color: var(--text);
        background: var(--surface);
        border: 1px solid var(--border);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
        pointer-events: none;
      }
      /* Labels above every marker, so one pin never sits on another's name. */
      .leaflet-marker-icon:hover {
        z-index: 500 !important;
      }
    `],e([me({attribute:!1})],Ue.prototype,"hass",void 0),e([me({attribute:!1})],Ue.prototype,"nodes",void 0),e([me()],Ue.prototype,"owmKey",void 0),e([me({type:Number})],Ue.prototype,"zoom",void 0),e([me({type:Number})],Ue.prototype,"radiusKm",void 0),e([me({attribute:!1})],Ue.prototype,"center",void 0),e([me()],Ue.prototype,"heightMode",void 0),e([me()],Ue.prototype,"pinSize",void 0),e([me({type:Boolean})],Ue.prototype,"labels",void 0),e([ge()],Ue.prototype,"_owmLayer",void 0),Ue=e([ce("hermes-map")],Ue);const Ge=["auto","mobile","tablet","desktop"];function Ke(e,t){const n=e.settings?.map_nodes??[],i=function(e,t,n=!1,i=120,s=[],a=[]){const o=new Set((t??[]).map(Number)),r=new Set((s??[]).map(Number));if(!n&&!o.size)return[];const l=new Map,h=new Map;for(const t of Se(e,$e)){const e=t.device_id;e&&(t.entity_id.startsWith("device_tracker.")?l.set(e,t.entity_id):t.entity_id.includes("last_heard")&&h.set(e,t.entity_id))}const d=new Map;for(const t of Object.values(e.devices??{})){const n=Ce(e,t.id);if(null===n)continue;const s=l.get(t.id),a=s?e.states[s]:void 0,c=a?.attributes?.latitude,u=a?.attributes?.longitude,p=a?.attributes?.battery_level;d.set(n,{nodeNum:n,name:t.name_by_user||t.name||a?.attributes?.friendly_name||String(n),latitude:"number"==typeof c?c:null,longitude:"number"==typeof u?u:null,battery:"number"==typeof p?p:null,lastSeen:a?.last_changed?new Date(a.last_changed).toLocaleString():"",connected:He(e,h.get(t.id),i),selected:o.has(n),authorized:r.has(n)})}for(const e of a??[]){const t=Number(e.node_num);if(!Number.isFinite(t))continue;const n=Me(e.last_heard,i),s=d.get(t);s?(null===s.latitude&&null!=e.latitude&&(s.latitude=e.latitude,s.longitude=e.longitude??null),null===s.battery&&null!=e.battery&&(s.battery=e.battery),!s.lastSeen&&e.last_heard&&(s.lastSeen=new Date(1e3*e.last_heard).toLocaleString()),s.connected=s.connected||n):d.set(t,{nodeNum:t,name:e.name||String(t),latitude:e.latitude??null,longitude:e.longitude??null,battery:e.battery??null,lastSeen:e.last_heard?new Date(1e3*e.last_heard).toLocaleString():"",connected:n,selected:o.has(t),authorized:r.has(t)})}return[...d.values()].filter(e=>n||e.selected).sort((e,t)=>e.name.localeCompare(t.name))}(e.hass,n,e.showAll,e.settings?.reachable_minutes??120,e.authorized,e.meshNodes),s=function(e){const t=e.find(e=>e.selected&&null!==e.latitude)??e.find(e=>null!==e.latitude);return t&&null!==t.latitude&&null!==t.longitude?[t.latitude,t.longitude]:null}(i),a=e.radiusOn&&null!==s&&e.radiusKm>0,o=a?i.filter(t=>null===t.latitude||null===t.longitude||function(e,t,n,i){const s=e=>e*Math.PI/180,a=s(n-e),o=s(i-t),r=Math.sin(a/2)**2+Math.cos(s(e))*Math.cos(s(n))*Math.sin(o/2)**2;return 12742*Math.asin(Math.sqrt(r))}(s[0],s[1],t.latitude,t.longitude)<=e.radiusKm):i,r=o.filter(e=>null!==e.latitude&&null!==e.longitude),l=i.some(e=>null!==e.latitude);return W`
    <h2 class="screen-title">${t("tab.map")}</h2>

    <div class="map-controls">
      <label class="check">
        <input
          type="checkbox"
          .checked=${e.showAll}
          @change=${e.onToggleShowAll}
        />
        <span>${t("map.showAll")}</span>
      </label>

      <label class="check">
        <input
          type="checkbox"
          .checked=${e.radiusOn}
          @change=${e.onToggleRadius}
        />
        <span>${t("map.radiusFilter")}</span>
      </label>

      <span class="radius">
        <label class="check" style="gap:6px">
          <span>${t("map.size")}</span>
          <select
            @change=${t=>e.onHeightChange(t.target.value)}
          >
            ${Ge.map(n=>W`
                <option
                  value=${n}
                  ?selected=${(e.settings?.map_height??"auto")===n}
                >
                  ${t(`map.size.${n}`)}
                </option>
              `)}
          </select>
        </label>
      </span>

      ${e.radiusOn?W`
            <span class="radius">
              <input
                type="range"
                min="1"
                max="200"
                step="1"
                .value=${String(e.radiusKm)}
                @input=${t=>e.onRadiusChange(Number(t.target.value))}
              />
              <span class="unit">${e.radiusKm} km</span>
            </span>
          `:""}
    </div>

    <div class="legend">
      <span class="dot on"></span>${t("map.connected")}
      <span class="dot off"></span>${t("map.notConnected")}
      <span class="dot relay"></span>${t("map.relay")}
    </div>

    ${n.length||e.showAll?0===r.length?W`<div class="empty">
            ${t(l&&a?"map.noneInRadius":"map.noPosition")}
          </div>`:W`
            <hermes-map
              .hass=${e.hass}
              .nodes=${r}
              .owmKey=${e.settings?.openweather_api_key??""}
              .zoom=${e.settings?.map_zoom??10}
              .radiusKm=${e.radiusOn?e.radiusKm:0}
              .center=${s}
              .heightMode=${e.settings?.map_height??"auto"}
              .pinSize=${e.settings?.map_pin_size??"medium"}
              .labels=${e.settings?.map_labels??!1}
            ></hermes-map>
          `:W`<div class="empty">${t("map.noSelection")}</div>`}

    ${o.length?W`
          <div class="rows" style="margin-top:14px">
            ${o.map(e=>W`
                <div class="row">
                  <span class="k">
                    <span
                      class="dot ${e.authorized?e.connected?"on":"off":"relay"}"
                    ></span>
                    ${e.name}
                  </span>
                  <span class="v">
                    ${null!==e.latitude&&null!==e.longitude?`${e.latitude.toFixed(5)}, ${e.longitude.toFixed(5)}`:t("map.waiting")}
                  </span>
                </div>
              `)}
          </div>
        `:""}
  `}let Ve=class extends he{constructor(){super(...arguments),this.value="",this.placeholder="",this.domains=[],this._query="",this._open=!1,this._active=0}_label(e){return this.hass?.states[e]?.attributes?.friendly_name||e}_matches(){if(!this.hass)return[];const e=this._query.trim().toLowerCase(),t=this.domains?.length?new Set(this.domains):null,n=Object.keys(this.hass.states).filter(e=>!t||t.has(e.split(".")[0]));return e?n.filter(t=>t.toLowerCase().includes(e)||this._label(t).toLowerCase().includes(e)).sort().slice(0,60):n.slice(0,60).sort()}_commit(e){this.value=e,this._query="",this._open=!1,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:e},bubbles:!0,composed:!0}))}_onKeyDown(e){const t=this._matches();"ArrowDown"===e.key?(e.preventDefault(),this._open=!0,this._active=Math.min(this._active+1,t.length-1)):"ArrowUp"===e.key?(e.preventDefault(),this._active=Math.max(this._active-1,0)):"Enter"===e.key?this._open&&t[this._active]&&(e.preventDefault(),this._commit(t[this._active])):"Escape"===e.key&&(this._open=!1)}render(){const e=this._matches(),t=this._open?this._query:this.value;return W`
      <input
        .value=${t}
        placeholder=${this.placeholder}
        @focus=${()=>{this._open=!0,this._query="",this._active=0}}
        @input=${e=>{this._query=e.target.value,this._open=!0,this._active=0}}
        @keydown=${this._onKeyDown}
        @blur=${()=>window.setTimeout(()=>this._open=!1,150)}
      />
      ${this._open?W`
            <div class="list">
              ${e.length?e.map((e,t)=>W`
                      <div
                        class="opt"
                        data-active=${t===this._active?"1":"0"}
                        @mousedown=${t=>{t.preventDefault(),this._commit(e)}}
                      >
                        <span class="name">${this._label(e)}</span>
                        <span class="id">${e}</span>
                      </div>
                    `):W`<div class="none">${this._query}</div>`}
            </div>
          `:""}
    `}};Ve.styles=r`
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
  `,e([me({attribute:!1})],Ve.prototype,"hass",void 0),e([me()],Ve.prototype,"value",void 0),e([me()],Ve.prototype,"placeholder",void 0),e([me({attribute:!1})],Ve.prototype,"domains",void 0),e([ge()],Ve.prototype,"_query",void 0),e([ge()],Ve.prototype,"_open",void 0),e([ge()],Ve.prototype,"_active",void 0),Ve=e([ce("hermes-entity-picker")],Ve);const Ye=[{id:"turn_on",label:"Turn on",service:"homeassistant.turn_on"},{id:"turn_off",label:"Turn off",service:"homeassistant.turn_off"},{id:"toggle",label:"Toggle",service:"homeassistant.toggle"}];let Je={light:[{id:"turn_on",label:"Turn on",service:"light.turn_on"},{id:"turn_on_brightness",label:"Turn on at brightness",service:"light.turn_on",value:{key:"brightness_pct",type:"number",unit:"%",min:1,max:100,step:1,default:80}},{id:"turn_off",label:"Turn off",service:"light.turn_off"},{id:"toggle",label:"Toggle",service:"light.toggle"}],switch:Ye,climate:[{id:"set_temperature",label:"Set temperature",service:"climate.set_temperature",value:{key:"temperature",type:"number",unit:"C",min:5,max:35,step:.5,default:21}},{id:"turn_on",label:"Turn on",service:"climate.turn_on"},{id:"turn_off",label:"Turn off",service:"climate.turn_off"}],cover:[{id:"open",label:"Open",service:"cover.open_cover"},{id:"close",label:"Close",service:"cover.close_cover"},{id:"stop",label:"Stop",service:"cover.stop_cover"},{id:"set_position",label:"Set position",service:"cover.set_cover_position",value:{key:"position",type:"number",unit:"%",min:0,max:100,step:5,default:100}}]},Xe={light:"light",switch:"switch",input_boolean:"switch",climate:"climate",cover:"cover"},Qe=Ye;const et={temperature:{min:"min_temp",max:"max_temp",step:"target_temp_step"},percentage:{step:"percentage_step"},value:{min:"min",max:"max",step:"step"}},tt={hvac_mode:"hvac_modes",preset_mode:"preset_modes",fan_mode:"fan_modes",swing_mode:"swing_modes",operation_mode:"operation_list",source:"source_list"};function nt(e,t,n){const i=e.states[t]?.attributes??{},s={...n},a=et[n.key]??{};for(const e of["min","max","step"]){const t=a[e],n=t?i[t]:void 0;"number"==typeof n&&(s[e]=n)}const o=tt[n.key],r=o?i[o]:void 0;return Array.isArray(r)&&r.length&&(s.options=r.map(String),void 0!==s.default&&s.options.includes(String(s.default))||(s.default=s.options[0])),"number"==typeof s.default&&("number"==typeof s.min&&s.default<s.min&&(s.default=s.min),"number"==typeof s.max&&s.default>s.max&&(s.default=s.max)),s}const it=new Set(["friendly_name","icon","supported_features","device_class","entity_picture","attribution","supported_color_modes","hs_color","rgb_color","xy_color"]);function st(e,t,n){if("channel"!==t.mode)return n("messages.onDm");const i=t.channel_index??0,s=e.channels.find(e=>e.index===i);return s?`${i}: ${s.name}`:`${n("settings.channel")} ${i}`}function at(e,t){if(e.loadError)return W`
      <div class="empty">
        <div>${t("common.loadError")}</div>
        <div class="sub-error">${e.loadError}</div>
      </div>
    `;if(!e.entries.length)return W`<div class="empty">${t("common.noEntries")}</div>`;const n=e.entries.find(t=>t.entry_id===e.selectedEntry)??e.entries[0];return W`
    <h2 class="screen-title">
      ${t("messages.title")}
      <span class="channel-badge" title=${t("messages.listeningHint")}>
        ${t("messages.listening")} ${st(e,n,t)}
      </span>
    </h2>

    ${e.entries.length>1?W`
          <div class="field">
            <label>${t("messages.gateway")}</label>
            <select
              @change=${t=>e.onSelectEntry(t.target.value)}
            >
              ${e.entries.map(e=>W`
                  <option
                    value=${e.entry_id}
                    ?selected=${e.entry_id===n.entry_id}
                  >
                    ${e.title}
                  </option>
                `)}
            </select>
          </div>
        `:""}

    ${e.editing?function(e,t,n){const i=e.entries.find(t=>t.entry_id===e.selectedEntry)??e.entries[0],s="direct_message"===i?.mode,a=t=>n=>e.onDraftInput(t,n.target.value);return W`
    <div class="panel">
      <div class="field">
        <label>${n("messages.keyword")}</label>
        <input .value=${t.keyword??""} @input=${a("keyword")} />
        <span class="hint">${n("messages.keywordHint")}</span>
      </div>

      <div class="field">
        <label>${n("messages.matchType")}</label>
        <select @change=${a("match_type")}>
          <option value="exact" ?selected=${"exact"===t.match_type}>
            ${n("messages.exact")}
          </option>
          <option value="startswith" ?selected=${"startswith"===t.match_type}>
            ${n("messages.startswith")}
          </option>
        </select>
        <span class="hint">${n("messages.matchHint")}</span>
      </div>

      ${function(e,t){const n=e.paletteEntity;return W`
    <div class="palette">
      <div class="field">
        <label>${t("messages.paletteEntity")}</label>
        <hermes-entity-picker
          .hass=${e.hass}
          .value=${n}
          placeholder="light.kitchen"
          @value-changed=${t=>e.onPaletteEntity(t.detail.value)}
        ></hermes-entity-picker>
        <span class="hint">${t("messages.paletteHint")}</span>
      </div>

      ${n&&e.hass.states[n]?W`
            <div class="section-title">${t("messages.groupRead")}</div>
            <div class="chips">
              <button
                class="chip read"
                @click=${()=>e.onInsert(function(e){return`{state:${e}}`}(n))}
              >
                ${t("messages.readState")}
              </button>
              ${function(e,t){const n=e.states[t];return n?.attributes?Object.entries(n.attributes).filter(([e,t])=>!it.has(e)&&("string"==typeof t||"number"==typeof t||"boolean"==typeof t)).map(([e])=>e).sort():[]}(e.hass,n).map(t=>W`
                  <button
                    class="chip read"
                    @click=${()=>e.onInsert(function(e,t){return`{attr:${e}:${t}}`}(n,t))}
                  >
                    ${t}
                  </button>
                `)}
            </div>

            <div class="section-title">${t("messages.groupDo")}</div>
            <div class="chips">
              ${function(e){const t=Xe[function(e){return e.split(".")[0]??""}(e)];return t&&Je[t]||Qe}(n).map(t=>W`
                  <span class="chip-group">
                    <button
                      class="chip do"
                      @click=${()=>e.onInsert(function(e,t,n){return e.value&&void 0!==n&&""!==n?`{do:${e.service}:${t}:${e.value.key}=${n}}`:`{do:${e.service}:${t}}`}(t,n,e.paletteValues[t.id]??(t.value?nt(e.hass,n,t.value).default:void 0)))}
                    >
                      ${t.label}
                    </button>
                    ${function(e,t,n){if(!t.value)return"";const i=nt(e.hass,n,t.value),s=e.paletteValues[t.id]??i.default??"";if("enum"===i.type)return W`
      <select
        class="inline"
        @change=${n=>e.onPaletteValue(t.id,n.target.value)}
      >
        ${(i.options??[]).map(e=>W`
            <option value=${e} ?selected=${e===s}>
              ${e}
            </option>
          `)}
      </select>
    `;const a=function(e){if("enum"===e.type)return"";if("number"!=typeof e.min||"number"!=typeof e.max)return"";const t=e.unit?` ${e.unit}`:"";return`${e.min} to ${e.max}${t}`}(i);return W`
    <input
      class="inline"
      type="number"
      min=${i.min??0}
      max=${i.max??100}
      step=${i.step??1}
      .value=${String(s)}
      @input=${n=>e.onPaletteValue(t.id,Number(n.target.value))}
    />
    ${a?W`<span class="unit">${a}</span>`:""}
  `}(e,t,n)}
                  </span>
                `)}
            </div>
          `:W`<div class="hint">${t("messages.pickEntityFirst")}</div>`}
    </div>
  `}(e,n)}

      <div class="field">
        <label>${n("messages.replyTemplate")}</label>
        <textarea
          id="hermes-template"
          .value=${t.reply_template??""}
          @input=${a("reply_template")}
        ></textarea>
        <span class="hint">${n("messages.templateHint")}</span>
      </div>

      <div class="field">
        <label>${n("messages.replyTo")}</label>
        <select @change=${a("reply_to")}>
          <option value="channel" ?selected=${"channel"===t.reply_to}>
            ${n("messages.onChannel")}
          </option>
          <option value="sender_dm" ?selected=${"sender_dm"===t.reply_to}>
            ${n("messages.senderDm")}
          </option>
        </select>
      </div>

      ${"channel"===t.reply_to?W`
            <div class="field indented">
              <label>${n("messages.replyChannel")}</label>
              <select
                ?disabled=${s}
                @change=${t=>{const n=t.target.value;e.onDraftInput("reply_channel",""===n?null:Number(n))}}
              >
                <option
                  value=""
                  ?selected=${null===t.reply_channel||void 0===t.reply_channel}
                >
                  ${n("messages.replyChannelSame")}
                </option>
                ${e.channels.map(e=>W`
                    <option
                      value=${e.index}
                      ?selected=${t.reply_channel===e.index}
                    >
                      ${e.index}: ${e.name}
                    </option>
                  `)}
              </select>
              <span class="hint">
                ${n(s?"messages.dmGatewayNote":"messages.replyChannelHint")}
              </span>
            </div>
          `:""}

      <button class="btn link" @click=${e.onToggleAdvanced}>
        ${e.showAdvanced?n("messages.hideAdvanced"):n("messages.advanced")}
      </button>

      ${e.showAdvanced?W`
            <div class="field" style="margin-top:10px">
              <label>${n("messages.service")}</label>
              <input
                .value=${t.service??""}
                placeholder="light.turn_off"
                @input=${a("service")}
              />
              <span class="hint">${n("messages.serviceHint")}</span>
            </div>
            <div class="field">
              <label>${n("messages.target")}</label>
              <hermes-entity-picker
                .hass=${e.hass}
                .value=${t.target?.entity_id??""}
                placeholder="light.kitchen"
                @value-changed=${t=>{const n=t.detail.value;e.onDraftInput("target",n?{entity_id:n}:void 0)}}
              ></hermes-entity-picker>
            </div>
          `:""}

      <div class="actions">
        <button class="btn primary" @click=${e.onSave}>
          ${n("common.save")}
        </button>
        <button class="btn" @click=${e.onCancel}>${n("common.cancel")}</button>
      </div>
    </div>
  `}(e,e.editing,t):W`
          ${n.commands.length?n.commands.map(i=>function(e,t,n,i){const s=t.service||t.reply_template||"",a=t.reply_channel,o=null!=a?e.channels.find(e=>e.index===a):void 0,r="sender_dm"===t.reply_to?i("messages.onDm"):null!=a?`${a}${o?`: ${o.name}`:""}`:st(e,n,i);return W`
    <div class="list-row">
      <div class="meta">
        <span class="kw">${t.keyword}</span>
        <span class="sub">${s}</span>
      </div>
      <div class="actions" style="margin:0">
        <span class="channel-badge small" title=${i("messages.repliesOn")}>
          ${r}
        </span>
        <button class="btn" @click=${()=>e.onEdit(t)}>
          ${i("common.edit")}
        </button>
        <button class="btn" @click=${()=>e.onDuplicate(t)}>
          ${i("common.duplicate")}
        </button>
        <button class="btn danger" @click=${()=>e.onDelete(t)}>
          ${i("common.delete")}
        </button>
      </div>
    </div>
  `}(e,i,n,t)):W`<div class="empty">${t("messages.empty")}</div>`}
          <div class="actions">
            <button class="btn primary" @click=${e.onNew}>
              ${t("messages.add")}
            </button>
          </div>

          ${function(e,t,n){if(e.editingPreset){const t=e.editingPreset;return W`
      <div class="section" style="margin-top:22px">
        <div class="section-title">${n("presets.title")}</div>
        <div class="panel">
          <div class="field">
            <label>${n("presets.label")}</label>
            <input
              .value=${t.label??""}
              @input=${t=>e.onPresetInput("label",t.target.value)}
            />
          </div>
          <div class="field">
            <label>${n("presets.text")}</label>
            <textarea
              .value=${t.text??""}
              @input=${t=>e.onPresetInput("text",t.target.value)}
            ></textarea>
          </div>
          <div class="field">
            <label>${n("presets.channel")}</label>
            <select
              ?disabled=${Boolean(t.node_id)}
              @change=${t=>{const n=t.target.value;e.onPresetInput("channel",""===n?null:Number(n))}}
            >
              <option value="" ?selected=${null===t.channel||void 0===t.channel}>
                ${n("presets.channelDefault")}
              </option>
              ${e.channels.map(e=>W`
                  <option
                    value=${e.index}
                    ?selected=${t.channel===e.index}
                  >
                    ${e.index}: ${e.name}
                  </option>
                `)}
            </select>
            <span class="hint">${n("presets.channelHint")}</span>
          </div>

          <div class="field">
            <label>${n("presets.node")}</label>
            <input
              type="number"
              .value=${t.node_id?String(t.node_id):""}
              @input=${t=>{const n=t.target.value.trim();e.onPresetInput("node_id",n?Number(n):null)}}
            />
            <span class="hint">${n("presets.nodeHint")}</span>
          </div>
          <div class="actions">
            <button class="btn primary" @click=${e.onPresetSave}>
              ${n("common.save")}
            </button>
            <button class="btn" @click=${e.onPresetCancel}>
              ${n("common.cancel")}
            </button>
          </div>
        </div>
      </div>
    `}return W`
    <div class="section" style="margin-top:22px">
      <div class="section-title">${n("presets.title")}</div>
      ${e.presets.length?e.presets.map(i=>W`
              <div class="list-row">
                <div class="meta">
                  <span class="kw">${i.label||i.text}</span>
                  <span class="sub">
                    ${i.node_id?`${n("presets.toNode")} ${i.node_id}`:null!==i.channel&&void 0!==i.channel?`${n("presets.toChannel")} ${i.channel}`:n("presets.toChannelDefault")}
                  </span>
                </div>
                <div class="actions" style="margin:0">
                  <button
                    class="btn primary"
                    @click=${()=>e.onPresetSend(i)}
                    ?disabled=${!t}
                  >
                    ${n("presets.send")}
                  </button>
                  <button class="btn" @click=${()=>e.onPresetEdit(i)}>
                    ${n("common.edit")}
                  </button>
                  <button
                    class="btn danger"
                    @click=${()=>e.onPresetDelete(i)}
                  >
                    ${n("common.delete")}
                  </button>
                </div>
              </div>
            `):W`<div class="empty">${n("presets.empty")}</div>`}
      <div class="actions">
        <button class="btn" @click=${e.onPresetNew}>${n("presets.add")}</button>
      </div>
    </div>
  `}(e,n,t)}
        `}
  `}function ot(e){return e.filter(e=>"mesh"!==e.source)}function rt(e,t,n,i,s=null){if(s)return W`<div class="sub-error">${s}</div>`;if(!e.length)return W`<div class="hint">${i}</div>`;const a=new Set((t??[]).map(Number));return W`
    <div class="checklist">
      ${e.map(e=>W`
          <label class="check">
            <input
              type="checkbox"
              .checked=${a.has(e.node_num)}
              @change=${t=>{const i=new Set(a);t.target.checked?i.add(e.node_num):i.delete(e.node_num),n([...i].sort((e,t)=>e-t))}}
            />
            <span>${e.name}</span>
            <span class="node-num">${e.node_num}</span>
          </label>
        `)}
    </div>
  `}function lt(e,t){const n=e.settings,i=t=>e.draftGlobal[t]??n?.[t];return W`
    <h2 class="screen-title">
      ${t("settings.title")}
      <button
        class="btn refresh"
        ?disabled=${e.refreshing}
        title=${t("settings.refreshHint")}
        @click=${e.onRefresh}
      >
        ${e.refreshing?t("common.loading"):t("settings.refresh")}
      </button>
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
          <label>${t("settings.mapNodes")}</label>
          ${rt(e.nodes,i("map_nodes")??[],t=>e.onGlobalInput("map_nodes",t),t("settings.noNodes"),e.nodesError)}
          <span class="hint">${t("settings.mapNodesHint")}</span>
        </div>

        <div class="field">
          <label>${t("settings.reachable")}</label>
          <input
            type="number"
            min="1"
            max="1440"
            step="5"
            .value=${String(i("reachable_minutes")??120)}
            @input=${t=>e.onGlobalInput("reachable_minutes",Number(t.target.value))}
          />
          <span class="hint">${t("settings.reachableHint")}</span>
        </div>

        <div class="field">
          <label>${t("settings.pinSize")}</label>
          <select
            @change=${t=>e.onGlobalInput("map_pin_size",t.target.value)}
          >
            ${["small","medium","large"].map(e=>W`
                <option
                  value=${e}
                  ?selected=${(i("map_pin_size")??"medium")===e}
                >
                  ${t(`settings.pinSize.${e}`)}
                </option>
              `)}
          </select>
        </div>

        <div class="field">
          <label class="check">
            <input
              type="checkbox"
              .checked=${Boolean(i("map_labels"))}
              @change=${t=>e.onGlobalInput("map_labels",t.target.checked)}
            />
            <span>${t("settings.mapLabels")}</span>
          </label>
          <span class="hint">${t("settings.mapLabelsHint")}</span>
        </div>

        <div class="actions">
          <button class="btn primary" @click=${e.onSaveGlobal}>
            ${t("common.save")}
          </button>
          ${e.saved?W`<span class="toast">${t("common.saved")}</span>`:""}
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">${t("settings.firmware")}</div>
      <div class="panel">
        ${e.firmware?W`<div class="row">
              <span class="k">${t("settings.gatewayFirmware")}</span>
              <span class="v">${e.firmware}</span>
            </div>`:""}
        <div class="row">
          <span class="k">${t("settings.channelsFound")}</span>
          <span class="v">
            ${e.channels.length?e.channels.map(e=>`${e.index}: ${e.name}`).join(", "):t("settings.channelsNone")}
          </span>
        </div>
        <div class="note">${t("settings.firmwareSameNote")}</div>
        <div class="note">${t("settings.firmwareDmNote")}</div>
        <div class="hint">${t("settings.firmwareOnlyGateway")}</div>
      </div>
    </div>

    ${function(e,t){const n=e.radioConfig;if(!n||!Object.keys(n.values).length)return W``;const i=t=>e.radioDraft[t]??n.values[t],s=Object.keys(e.radioDraft).length>0,a=s=>{const a=i(s),o=n.options[s];return o?W`
        <div class="field">
          <label>${t(`radioCfg.${s}`)}</label>
          <select
            @change=${t=>e.onRadioInput(s,t.target.value)}
          >
            ${o.map(e=>W`
                <option value=${e} ?selected=${e===a}>
                  ${e}
                </option>
              `)}
          </select>
        </div>
      `:"boolean"==typeof n.values[s]?W`
        <div class="field">
          <label class="check">
            <input
              type="checkbox"
              .checked=${Boolean(a)}
              @change=${t=>e.onRadioInput(s,t.target.checked)}
            />
            <span>${t(`radioCfg.${s}`)}</span>
          </label>
        </div>
      `:W`
      <div class="field">
        <label>${t(`radioCfg.${s}`)}</label>
        <input
          type="number"
          .value=${String(a??"")}
          @input=${t=>e.onRadioInput(s,Number(t.target.value))}
        />
      </div>
    `};return W`
    <div class="section">
      <div class="section-title">${t("radioCfg.title")}</div>
      <div class="panel">
        <div class="note warn">${t("radioCfg.warning")}</div>

        ${Object.keys(n.values).map(e=>a(e))}

        ${e.radioError?W`<div class="note warn">${e.radioError}</div>`:""}

        <div class="actions">
          <button
            class="btn primary"
            ?disabled=${!s||e.radioSaving}
            @click=${e.onRadioSave}
          >
            ${e.radioSaving?t("common.loading"):t("radioCfg.write")}
          </button>
        </div>
      </div>
    </div>
  `}(e,t)}

    ${e.loadError?W`<div class="empty">
          <div>${t("common.loadError")}</div>
          <div class="sub-error">${e.loadError}</div>
        </div>`:0===e.entries.length?W`<div class="empty">${t("common.noEntries")}</div>`:e.entries.map(n=>function(e,t,n){const i=e.draftEntries[t.entry_id]??{},s=(e,t)=>i[e]??t;return W`
    <div class="section">
      <div class="section-title">${t.title}</div>
      <div class="panel">
        <div class="rows">


        </div>

        <div class="field" style="margin-top:12px">
          <label>${n("settings.gateway")}</label>
          ${ot(e.nodes).length?W`
                <select
                  @change=${n=>e.onEntryInput(t.entry_id,"gateway_node_id",Number(n.target.value))}
                >
                  ${ot(e.nodes).map(e=>W`
                      <option
                        value=${e.node_num}
                        ?selected=${s("gateway_node_id",t.gateway_node_id)===e.node_num}
                      >
                        ${e.name} (${e.node_num})
                      </option>
                    `)}
                </select>
              `:W`<div class="hint">${n("settings.noNodes")}</div>`}
          <span class="hint">${n("settings.gatewayHint")}</span>
        </div>

        <div class="field">
          <label>${n("settings.mode")}</label>
          <select
            @change=${n=>e.onEntryInput(t.entry_id,"mode",n.target.value)}
          >
            <option
              value="channel"
              ?selected=${"channel"===s("mode",t.mode)}
            >
              ${n("settings.modeChannel")}
            </option>
            <option
              value="direct_message"
              ?selected=${"direct_message"===s("mode",t.mode)}
            >
              ${n("settings.modeDm")}
            </option>
          </select>
          <span class="hint">${n("settings.modeHint")}</span>
        </div>

        ${"channel"===s("mode",t.mode)?function(e,t,n){const i=e.draftEntries[t.entry_id]??{},s=i.channel_index??t.channel_index??0,a=e.channels.find(e=>e.index===s);return W`
    <div class="field" style="margin-top:12px">
      <label>${n("settings.channel")}</label>
      ${e.channels.length?W`
            <select
              @change=${n=>e.onEntryInput(t.entry_id,"channel_index",Number(n.target.value))}
            >
              ${e.channels.map(e=>W`
                  <option value=${e.index} ?selected=${e.index===s}>
                    ${e.index}: ${e.name}
                  </option>
                `)}
            </select>
          `:W`
            <input
              type="number"
              min="0"
              max="7"
              .value=${String(s)}
              @change=${n=>e.onEntryInput(t.entry_id,"channel_index",Number(n.target.value))}
            />
            <span class="hint">${n("settings.channelsUnavailable")}</span>
          `}
      <span class="hint">${n("settings.channelHint")}</span>
      ${a?.default_psk?W`<div class="note warn">${n("settings.defaultPskWarning")}</div>`:""}
    </div>
  `}(e,t,n):""}

        <div class="field" style="margin-top:12px">
          <label>${n("settings.initialDelay")}</label>
          <input
            type="number"
            min="0"
            max="60"
            step="1"
            .value=${String(s("initial_delay",t.initial_delay))}
            @input=${n=>e.onEntryInput(t.entry_id,"initial_delay",Number(n.target.value))}
          />
        </div>

        <div class="field">
          <label>${n("settings.partDelay")}</label>
          <input
            type="number"
            min="0"
            max="30"
            step="1"
            .value=${String(s("part_delay",t.part_delay))}
            @input=${n=>e.onEntryInput(t.entry_id,"part_delay",Number(n.target.value))}
          />
        </div>

        <div class="field">
          <label>${n("settings.authorizedNodes")}</label>
          ${rt(e.nodes,s("authorized_nodes",t.authorized_nodes)??[],n=>e.onEntryInput(t.entry_id,"authorized_nodes",n),n("settings.noNodes"),e.nodesError)}
          <span class="hint">${n("settings.authorizedHint")}</span>
        </div>

        <div class="field">
          <label class="check">
            <input
              type="checkbox"
              .checked=${Boolean(s("require_ack",t.require_ack))}
              @change=${n=>e.onEntryInput(t.entry_id,"require_ack",n.target.checked)}
            />
            <span>${n("settings.requireAck")}</span>
          </label>
          <span class="hint">${n("settings.requireAckHint")}</span>
        </div>

        <div class="field">
          <label>${n("settings.rateLimit")}</label>
          <input
            type="number"
            min="0"
            max="60"
            step="1"
            .value=${String(s("rate_limit",t.rate_limit))}
            @input=${n=>e.onEntryInput(t.entry_id,"rate_limit",Number(n.target.value))}
          />
          <span class="hint">${n("settings.rateLimitHint")}</span>
        </div>

        <div class="field">
          <label class="check">
            <input
              type="checkbox"
              .checked=${Boolean(s("case_sensitive",t.case_sensitive))}
              @change=${n=>e.onEntryInput(t.entry_id,"case_sensitive",n.target.checked)}
            />
            <span>${n("settings.caseSensitive")}</span>
          </label>
          <span class="hint">${n("settings.caseSensitiveHint")}</span>
        </div>

        <div class="field">
          <label>${n("settings.helpKeyword")}</label>
          <input
            placeholder="help"
            .value=${String(s("help_keyword",t.help_keyword)??"")}
            @input=${n=>e.onEntryInput(t.entry_id,"help_keyword",n.target.value)}
          />
          <span class="hint">${n("settings.helpKeywordHint")}</span>
        </div>

        <div class="actions">
          <button
            class="btn primary"
            @click=${()=>e.onSaveEntry(t.entry_id)}
          >
            ${n("common.save")}
          </button>
          ${e.saved?W`<span class="toast">${n("common.saved")}</span>`:""}
        </div>
      </div>
    </div>
  `}(e,n,t))}
  `}const ht="1.0.1";function dt(e,t,n,i,s){if(!Te(e))return W`<div class="empty">${s("status.noIntegration")}</div>`;const a=Ae(e),o=Le(e,"commands_executed"),r=Le(e,"last_command"),l=Le(e,"last_error"),h=e=>e&&"unknown"!==e&&"unavailable"!==e?e:s("status.none");return W`
    <h2 class="screen-title">
      ${s("status.title")}
      ${n?W`<span class="hint">${s("status.updatedAt")} ${n}</span>`:""}
    </h2>
    <div class="grid">
      <div class="panel stat">
        <div class="label">${s("status.nodes")}</div>
        <div class="value">${a.length}</div>
      </div>
      <div class="panel stat">
        <div class="label">${s("status.executed")}</div>
        <div class="value">${o?o.state:"0"}</div>
      </div>
      <div class="panel stat">
        <div class="label">${s("status.lastCommand")}</div>
        <div class="value small">${h(r?.state)}</div>
      </div>
      <div class="panel stat">
        <div class="label">${s("status.lastError")}</div>
        <div class="value small">${h(l?.state)}</div>
      </div>
    </div>

    ${i?function(e,t){const n=[["radio.name",e.long_name],["radio.short",e.short_name],["radio.hardware",e.hardware],["radio.role",e.role],["radio.firmware",e.firmware],["radio.region",e.region],["radio.preset",e.modem_preset],["radio.hops",e.hop_limit]],i=n.filter(([,e])=>null!=e&&""!==e);return i.length?W`
    <div class="section" style="margin-top:18px">
      <div class="section-title">${t("radio.title")}</div>
      <div class="panel">
        <div class="rows">
          ${i.map(([e,n])=>W`
              <div class="row">
                <span class="k">${t(e)}</span>
                <span class="v">${String(n)}</span>
              </div>
            `)}
        </div>
      </div>
    </div>
  `:W``}(i,s):""}

    ${t.map(e=>function(e,t){const n=e.last_seen,i=e.seen_counts??{},s=!1===e.loaded,a=!1===e.radio_connected,o=(i.received??0)>0&&!i.accepted;return W`
    <div class="section" style="margin-top:18px">
      <div class="section-title">
        ${t("status.reception")}
        ${a?W`<span class="warn-badge">${t("status.radioOfflineBadge")}</span>`:s?W`<span class="warn-badge">${t("status.notRunning")}</span>`:o?W`<span class="warn-badge">${t("status.mismatch")}</span>`:""}
      </div>
      <div class="panel">
        ${a?W`<div class="note warn">${t("status.radioOffline")}</div>`:""}
        ${a&&e.competing_integrations?.length?W`<div class="note warn">
              ${t("status.radioConflict")}
              <br />
              ${e.competing_integrations.map(e=>W`<code>${e}</code> `)}
            </div>`:""}
        ${s?W`<div class="note warn">
              ${t("status.notRunningHint")}
              ${e.state?W`<br /><code>${e.state}</code>`:""}
            </div>`:""}
        <div class="rows">
          <div class="row">
            <span class="k">${t("status.versions")}</span>
            <span class="v">
              ${t("status.card")} ${ht},
              ${t("status.backend")} ${e.backend_version||"?"}
              ${!1===e.listening?` (${t("status.notListening")})`:""}
            </span>
          </div>
          ${e.backend_version&&e.backend_version!==ht?W`<div class="note warn">${t("status.versionMismatch")}</div>`:""}
          <div class="row">
            <span class="k">${t("status.busEvents")}</span>
            <span class="v">${e.bus_events??0}</span>
          </div>
          <div class="row">
            <span class="k">${t("status.expects")}</span>
            <span class="v">
              ${t("settings.gateway")} ${e.gateway_node_id??"-"},
              ${"channel"===e.mode?`${t("settings.channel")} ${e.channel_index??0}`:t("messages.onDm")}
            </span>
          </div>
          ${n?W`
                <div class="row">
                  <span class="k">${t("status.lastSeen")}</span>
                  <span class="v">
                    ${t("settings.gateway")} ${n.gateway??"-"},
                    ${null!==n.channel&&void 0!==n.channel?`${t("settings.channel")} ${n.channel}`:t("messages.onDm")}
                  </span>
                </div>
                <div class="row">
                  <span class="k">${t("status.seenFrom")}</span>
                  <span class="v">${n.from??"-"}</span>
                </div>
                <div class="row">
                  <span class="k">${t("status.seenResult")}</span>
                  <span class="v">${t(`status.reason.${n.reason}`)}</span>
                </div>
                <div class="row">
                  <span class="k">${t("status.tally")}</span>
                  <span class="v">
                    ${Object.entries(i).map(([e,n])=>`${n} ${t(`status.reason.${e}`)}`).join(", ")}
                  </span>
                </div>
              `:W`<div class="row">
                <span class="k">${t("status.lastSeen")}</span>
                <span class="v">${t("status.nothingSeen")}</span>
              </div>`}
        </div>
        ${o?W`
              <div class="note warn" style="margin-top:10px">
                ${t("other_gateway"===n?.reason?"status.hintGateway":"status.hintTarget")}
              </div>
            `:""}
      </div>
    </div>
  `}(e,s))}
  `}function ct(e,t){return e.callWS({type:"hermes/settings/update",patch:t})}function ut(e){return e.callWS({type:"hermes/entries/list"})}function pt(e){return e.callWS({type:"hermes/presets/list"})}function mt(e){return e.callWS({type:"hermes/history/list"})}function gt(e){return e.callWS({type:"hermes/chats/list"})}const ft=["status","chat","log","devices","map","messages","homeassistant","settings"],_t=["full","summary","chat"],vt={keyword:"",match_type:"exact",service:"",reply_template:"",reply_to:"channel"};let yt=class extends he{constructor(){super(...arguments),this._tab="status",this._view="full",this._entries=[],this._nodes=[],this._settings=null,this._saved=!1,this._draftGlobal={},this._draftEntries={},this._selectedEntry=null,this._editing=null,this._loadError=null,this._paletteEntity="",this._paletteValues={},this._showAdvanced=!1,this._mapShowAll=!1,this._mapRadiusOn=!1,this._mapRadiusKm=25,this._presets=[],this._editingPreset=null,this._history=[],this._logFilter="",this._testText="",this._sendingTest=!1,this._channels=[],this._firmware=null,this._radio=null,this._nodesError=null,this._refreshing=!1,this._updatedAt="",this._chats={},this._chatThread=null,this._chatDraft="",this._chatSending=!1,this._radioConfig=null,this._radioDraft={},this._radioSaving=!1,this._radioError=null,this._loaded=!1,this._onGlobalInput=(e,t)=>{this._draftGlobal={...this._draftGlobal,[e]:t}},this._onEntryInput=(e,t,n)=>{this._draftEntries={...this._draftEntries,[e]:{...this._draftEntries[e]??{},[t]:n}}},this._onSaveGlobal=async()=>{this.hass&&Object.keys(this._draftGlobal).length&&(this._settings=await ct(this.hass,this._draftGlobal),this._draftGlobal={},this._flagSaved())},this._onSaveEntry=async e=>{const t=this._draftEntries[e];this.hass&&t&&Object.keys(t).length&&(await function(e,t,n){return e.callWS({type:"hermes/entry/update",entry_id:t,patch:n})}(this.hass,e,t),this._draftEntries={...this._draftEntries,[e]:{}},this._flagSaved(),await this._load())},this._onSelectEntry=e=>{this._selectedEntry=e,this._editing=null},this._onNew=()=>{this._editing={...vt}},this._onEdit=e=>{this._editing={...e}},this._onDuplicate=e=>{const{id:t,...n}=e;this._editing={...n,keyword:`${e.keyword} 2`}},this._onDraftInput=(e,t)=>{this._editing&&(this._editing={...this._editing,[e]:t})},this._onCancel=()=>{this._editing=null},this._onPaletteEntity=e=>{this._paletteEntity=e},this._onPaletteValue=(e,t)=>{this._paletteValues={...this._paletteValues,[e]:t}},this._onToggleAdvanced=()=>{this._showAdvanced=!this._showAdvanced},this._onPresetNew=()=>{this._editingPreset={label:"",text:"",node_id:null,channel:null}},this._onPresetEdit=e=>{this._editingPreset={...e}},this._onPresetInput=(e,t)=>{this._editingPreset&&(this._editingPreset={...this._editingPreset,[e]:t})},this._onPresetCancel=()=>{this._editingPreset=null},this._onPresetSave=async()=>{var e,t;this.hass&&this._editingPreset?.text&&(await(e=this.hass,t=this._editingPreset,e.callWS({type:"hermes/presets/save",preset:t})),this._editingPreset=null,this._presets=await pt(this.hass),this._flagSaved())},this._onPresetDelete=async e=>{var t,n;this.hass&&e.id&&(await(t=this.hass,n=e.id,t.callWS({type:"hermes/presets/remove",preset_id:n})),this._presets=await pt(this.hass))},this._onPresetSend=async e=>{const t=this._selectedEntry??this._entries[0]?.entry_id;this.hass&&t&&e.id&&(await function(e,t,n){return e.callWS({type:"hermes/presets/send",entry_id:t,preset_id:n})}(this.hass,t,e.id),this._flagSaved(),this._history=await mt(this.hass))},this._onTestText=e=>{this._testText=e},this._onSendTest=async()=>{const e=this._selectedEntry??this._entries[0]?.entry_id;if(this.hass&&e&&this._testText){this._sendingTest=!0;try{await this.hass.callService("hermes","broadcast",{config_entry_id:e,message:this._testText}),this._flagSaved(),this._history=await mt(this.hass)}catch(e){console.error("Hermes: test send failed",e)}finally{this._sendingTest=!1}}},this._onRadioInput=(e,t)=>{this._radioDraft={...this._radioDraft,[e]:t},this._radioError=null},this._onRadioSave=async()=>{if(this.hass&&Object.keys(this._radioDraft).length){this._radioSaving=!0,this._radioError=null;try{this._radioConfig=await(e=this.hass,t=this._radioDraft,e.callWS({type:"hermes/radio/config/set",patch:t})),this._radioDraft={},this._flagSaved()}catch(e){this._radioError=String(e?.message??e)}finally{this._radioSaving=!1}var e,t}},this._onChatSelect=e=>{this._chatThread=e},this._onChatDraft=e=>{this._chatDraft=e},this._onChatSend=async()=>{const e=this._selectedEntry??this._entries[0]?.entry_id,t=this._chatThread??Object.keys(this._chats)[0];if(this.hass&&e&&t&&this._chatDraft.trim()){this._chatSending=!0;try{await function(e,t,n,i){return e.callWS({type:"hermes/chats/send",entry_id:t,thread:n,message:i})}(this.hass,e,t,this._chatDraft.trim()),this._chatDraft="",this._chats=await gt(this.hass)}catch(e){console.error("Hermes: could not send the message",e)}finally{this._chatSending=!1}}},this._onChatClear=async e=>{this.hass&&(await function(e,t){return e.callWS({type:"hermes/chats/clear",thread:t})}(this.hass,e),this._chats=await gt(this.hass))},this._onLogFilter=e=>{this._logFilter=e},this._onLogClear=async()=>{var e;this.hass&&(await(e=this.hass,e.callWS({type:"hermes/history/clear"})),this._history=[])},this._onToggleShowAll=()=>{this._mapShowAll=!this._mapShowAll},this._onToggleRadius=()=>{this._mapRadiusOn=!this._mapRadiusOn},this._onRadiusChange=e=>{this._mapRadiusKm=e},this._onRefresh=async()=>{this._refreshing=!0;try{await this._load()}finally{this._refreshing=!1}},this._onHeightChange=async e=>{this.hass&&(this._settings=await ct(this.hass,{map_height:e}))},this._onInsert=e=>{if(!this._editing)return;const t=this.renderRoot.querySelector("#hermes-template"),n=this._editing.reply_template??"";if(!t)return void(this._editing={...this._editing,reply_template:n+e});const i=t.selectionStart??n.length,s=t.selectionEnd??n.length,a=n.slice(0,i)+e+n.slice(s);this._editing={...this._editing,reply_template:a},this.updateComplete.then(()=>{const t=this.renderRoot.querySelector("#hermes-template");if(t){const n=i+e.length;t.focus(),t.setSelectionRange(n,n)}})},this._onSaveCommand=async()=>{const e=this._selectedEntry;if(!this.hass||!e||!this._editing)return;const t=Boolean(this._editing.service)||Boolean(this._editing.reply_template);this._editing.keyword&&t&&(await function(e,t,n){return e.callWS({type:"hermes/commands/save",entry_id:t,command:n})}(this.hass,e,this._editing),this._editing=null,this._flagSaved(),await this._load())},this._onDeleteCommand=async e=>{const t=this._selectedEntry;this.hass&&t&&e.id&&(await function(e,t,n){return e.callWS({type:"hermes/commands/remove",entry_id:t,command_id:n})}(this.hass,t,e.id),this._flagSaved(),await this._load())}}setConfig(e){this._config=e,e?.tab&&ft.includes(e.tab)&&(this._tab=e.tab),this._view=_t.includes(e?.view)?e.view:"full",this.toggleAttribute("compact","full"!==this._view)}getCardSize(){return 12}connectedCallback(){super.connectedCallback(),this._subscribe(),this._pollTimer=window.setInterval(()=>{this._poll()},15e3)}disconnectedCallback(){super.disconnectedCallback(),this._pollTimer&&(window.clearInterval(this._pollTimer),this._pollTimer=void 0),this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=void 0)}async _subscribe(){const e=this.hass?.connection;if(e?.subscribeEvents&&!this._unsubscribe)try{this._unsubscribe=await e.subscribeEvents(()=>{this._poll(!0)},"meshtastic_api_text_message")}catch(e){console.warn("Hermes: live updates unavailable, falling back to polling",e)}}async _poll(e=!1){if(this.hass&&this._loaded&&(e||"status"===this._tab||"log"===this._tab||"chat"===this._tab))try{this._entries=await ut(this.hass),"full"===this._view&&(this._history=await mt(this.hass)),"summary"!==this._view&&(this._chats=await gt(this.hass)),this._updatedAt=(new Date).toLocaleTimeString()}catch(e){console.warn("Hermes: refresh failed",e)}}firstUpdated(){let e=this.parentElement;for(;e;){if("HUI-PANEL-VIEW"===e.tagName){this.setAttribute("panel-mode","");break}e=e.parentElement}}updated(){this.hass&&!this._loaded&&(this._loaded=!0,this._load())}async _load(e=0){if(this.hass){try{const e=await ut(this.hass);this._entries=e,this._loadError=null,!this._selectedEntry&&e.length&&(this._selectedEntry=e[0].entry_id)}catch(t){if(e<3)return void window.setTimeout(()=>{this._load(e+1)},500*(e+1));this._loadError=String(t?.message??t),console.error("Hermes: failed to load gateways",t)}try{this._nodes=await(t=this.hass,t.callWS({type:"hermes/nodes/list"})),this._nodesError=null}catch(e){this._nodesError=String(e?.message??e),console.error("Hermes: failed to load nodes",e)}var t;try{this._channels=await function(e){return e.callWS({type:"hermes/channels/list"})}(this.hass)}catch(e){console.warn("Hermes: could not read the radio channels",e)}try{const e=await function(e){return e.callWS({type:"hermes/radio/info"})}(this.hass);this._radio=e,this._firmware=e.firmware}catch{this._firmware=null}try{this._chats=await gt(this.hass)}catch(e){console.error("Hermes: failed to load the conversations",e)}if("full"===this._view){try{n=await function(e){return e.callWS({type:"hermes/actions"})}(this.hass),n?.by_type&&(Je=n.by_type),n?.domain_to_type&&(Xe=n.domain_to_type),n?.generic&&(Qe=n.generic)}catch(e){console.warn("Hermes: using the built-in action catalogue",e)}var n;try{this._presets=await pt(this.hass)}catch(e){console.error("Hermes: failed to load presets",e)}try{this._history=await mt(this.hass)}catch(e){console.error("Hermes: failed to load the log",e)}try{this._radioConfig=await function(e){return e.callWS({type:"hermes/radio/config/get"})}(this.hass)}catch(e){console.warn("Hermes: could not read the radio configuration",e)}try{this._settings=await function(e){return e.callWS({type:"hermes/settings/get"})}(this.hass)}catch{this._settings=null}}}}_flagSaved(){this._saved=!0,window.setTimeout(()=>{this._saved=!1},2e3)}_select(e){this._tab=e,this._load()}_screen(e){const t=this.hass;switch(this._tab){case"status":default:return dt(t,this._entries,this._updatedAt,this._radio,e);case"chat":return ze({chats:this._chats,channels:this._channels,nodes:this._nodes,thread:this._chatThread,draft:this._chatDraft,sending:this._chatSending,onSelect:this._onChatSelect,onDraft:this._onChatDraft,onSend:this._onChatSend,onClear:this._onChatClear},e);case"log":return Ze({entries:this._history,entries_meta:this._entries.map(e=>({title:e.title,counts:e.seen_counts??{}})),filter:this._logFilter,updatedAt:this._updatedAt,onFilter:this._onLogFilter,onClear:this._onLogClear,onRefresh:()=>{this._poll(!0)}},e);case"devices":return Oe(t,e);case"map":return Ke({hass:t,settings:this._settings,authorized:[...new Set(this._entries.flatMap(e=>e.authorized_nodes??[]))],meshNodes:this._nodes,showAll:this._mapShowAll,radiusOn:this._mapRadiusOn,radiusKm:this._mapRadiusKm,onToggleShowAll:this._onToggleShowAll,onToggleRadius:this._onToggleRadius,onRadiusChange:this._onRadiusChange,onHeightChange:this._onHeightChange},e);case"messages":return at({hass:t,entries:this._entries,selectedEntry:this._selectedEntry,editing:this._editing,loadError:this._loadError,paletteEntity:this._paletteEntity,paletteValues:this._paletteValues,showAdvanced:this._showAdvanced,onSelectEntry:this._onSelectEntry,onNew:this._onNew,onEdit:this._onEdit,onDuplicate:this._onDuplicate,onDelete:this._onDeleteCommand,onDraftInput:this._onDraftInput,onPaletteEntity:this._onPaletteEntity,onPaletteValue:this._onPaletteValue,onInsert:this._onInsert,onToggleAdvanced:this._onToggleAdvanced,onSave:this._onSaveCommand,onCancel:this._onCancel,channels:this._channels,presets:this._presets,editingPreset:this._editingPreset,onPresetNew:this._onPresetNew,onPresetEdit:this._onPresetEdit,onPresetDelete:this._onPresetDelete,onPresetInput:this._onPresetInput,onPresetSave:this._onPresetSave,onPresetCancel:this._onPresetCancel,onPresetSend:this._onPresetSend},e);case"homeassistant":return Be({hass:t,entries:this._entries,testText:this._testText,selectedEntry:this._selectedEntry,sending:this._sendingTest,onTestText:this._onTestText,onSendTest:this._onSendTest},e);case"settings":return lt({settings:this._settings,entries:this._entries,nodes:this._nodes,channels:this._channels,firmware:this._firmware,nodesError:this._nodesError,refreshing:this._refreshing,onRefresh:this._onRefresh,saved:this._saved,loadError:this._loadError,draftGlobal:this._draftGlobal,draftEntries:this._draftEntries,onGlobalInput:this._onGlobalInput,onEntryInput:this._onEntryInput,radioConfig:this._radioConfig,radioDraft:this._radioDraft,radioSaving:this._radioSaving,radioError:this._radioError,onRadioInput:this._onRadioInput,onRadioSave:this._onRadioSave,onSaveGlobal:this._onSaveGlobal,onSaveEntry:this._onSaveEntry},e)}}_compact(e){const t=this.hass;return"chat"===this._view?ze({chats:this._chats,channels:this._channels,nodes:this._nodes,thread:this._chatThread,draft:this._chatDraft,sending:this._chatSending,onSelect:this._onChatSelect,onDraft:this._onChatDraft,onSend:this._onChatSend,onClear:this._onChatClear},e):function(e,t,n,i,s){if(!Te(e))return W`<div class="empty">${s("status.noIntegration")}</div>`;const a=e=>e&&"unknown"!==e&&"unavailable"!==e?e:s("status.none"),o=Le(e,"commands_executed"),r=Le(e,"last_command"),l=Le(e,"last_error"),h=t.some(e=>!1===e.radio_connected),d=t.reduce((e,t)=>e+(t.seen_counts?.received??0),0),c=t.reduce((e,t)=>e+(t.seen_counts?.accepted??0),0),u=[[s("summary.link"),s(h?"status.radioOfflineBadge":"summary.linkUp")],[s("status.nodes"),Ae(e).length],[s("summary.received"),d],[s("summary.accepted"),c],[s("status.executed"),o?o.state:"0"],[s("status.lastCommand"),a(r?.state)],[s("status.lastError"),a(l?.state)]];return i?.long_name&&u.splice(1,0,[s("radio.name"),i.long_name]),W`
    <div class="summary" data-warn=${h?"1":"0"}>
      <div class="summary-head">
        <span class="summary-title">Hermes</span>
        ${n?W`<span class="hint">${n}</span>`:""}
      </div>

      <div class="rows">
        ${u.map(([e,t])=>W`
            <div class="row">
              <span class="k">${e}</span>
              <span class="v">${String(t)}</span>
            </div>
          `)}
      </div>

      ${t.map(e=>W`
          <div class="row">
            <span class="k">${e.title}</span>
            <span class="v">
              ${"channel"===e.mode?`${s("settings.channel")} ${e.channel_index??0}`:s("messages.onDm")}
            </span>
          </div>
        `)}
    </div>
  `}(t,this._entries,this._updatedAt,this._radio,e)}render(){if(!this.hass||!this._config)return W``;const e=function(e){const t=(e?.locale?.language||e?.language||"en").split("-")[0].toLowerCase(),n=_e[t]||fe;return e=>n[e]??fe[e]??e}(this.hass);return"full"!==this._view?W`
        <div class="shell compact" data-view=${this._view}>
          <div class="content">${this._compact(e)}</div>
        </div>
      `:W`
      <div class="shell">
        <div class="topbar">
          <div class="brand">
            <span class="dot"></span>
            <span>Hermes</span>
            <span class="sub">Meshtastic Commander</span>
          </div>
        </div>

        <div class="tabs" role="tablist">
          ${ft.map(t=>W`
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
    `}};yt.styles=[ve,ye],e([me({attribute:!1})],yt.prototype,"hass",void 0),e([ge()],yt.prototype,"_config",void 0),e([ge()],yt.prototype,"_tab",void 0),e([ge()],yt.prototype,"_view",void 0),e([ge()],yt.prototype,"_entries",void 0),e([ge()],yt.prototype,"_nodes",void 0),e([ge()],yt.prototype,"_settings",void 0),e([ge()],yt.prototype,"_saved",void 0),e([ge()],yt.prototype,"_draftGlobal",void 0),e([ge()],yt.prototype,"_draftEntries",void 0),e([ge()],yt.prototype,"_selectedEntry",void 0),e([ge()],yt.prototype,"_editing",void 0),e([ge()],yt.prototype,"_loadError",void 0),e([ge()],yt.prototype,"_paletteEntity",void 0),e([ge()],yt.prototype,"_paletteValues",void 0),e([ge()],yt.prototype,"_showAdvanced",void 0),e([ge()],yt.prototype,"_mapShowAll",void 0),e([ge()],yt.prototype,"_mapRadiusOn",void 0),e([ge()],yt.prototype,"_mapRadiusKm",void 0),e([ge()],yt.prototype,"_presets",void 0),e([ge()],yt.prototype,"_editingPreset",void 0),e([ge()],yt.prototype,"_history",void 0),e([ge()],yt.prototype,"_logFilter",void 0),e([ge()],yt.prototype,"_testText",void 0),e([ge()],yt.prototype,"_sendingTest",void 0),e([ge()],yt.prototype,"_channels",void 0),e([ge()],yt.prototype,"_firmware",void 0),e([ge()],yt.prototype,"_radio",void 0),e([ge()],yt.prototype,"_nodesError",void 0),e([ge()],yt.prototype,"_refreshing",void 0),e([ge()],yt.prototype,"_updatedAt",void 0),e([ge()],yt.prototype,"_chats",void 0),e([ge()],yt.prototype,"_chatThread",void 0),e([ge()],yt.prototype,"_chatDraft",void 0),e([ge()],yt.prototype,"_chatSending",void 0),e([ge()],yt.prototype,"_radioConfig",void 0),e([ge()],yt.prototype,"_radioDraft",void 0),e([ge()],yt.prototype,"_radioSaving",void 0),e([ge()],yt.prototype,"_radioError",void 0),yt=e([ce("hermes-card")],yt);let bt=class extends yt{setConfig(e){super.setConfig({...e,view:"summary"})}getCardSize(){return 4}};bt=e([ce("hermes-summary-card")],bt);let wt=class extends yt{setConfig(e){super.setConfig({...e,view:"chat"})}getCardSize(){return 8}};wt=e([ce("hermes-chat-card")],wt),window.customCards=window.customCards||[],window.customCards.push({type:"hermes-card",name:"Hermes",description:"Meshtastic Commander control panel",preview:!1},{type:"hermes-summary-card",name:"Hermes summary",description:"Hermes status as a list of parameters, for a dashboard column",preview:!1},{type:"hermes-chat-card",name:"Hermes chat",description:"Send and read Meshtastic messages, channels and direct",preview:!1}),console.info(`%c HERMES-CARD %c ${ht} `,"background:#FFD60A;color:#000","");export{yt as HermesCard,wt as HermesChatCard,bt as HermesSummaryCard};
