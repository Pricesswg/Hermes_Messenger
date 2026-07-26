function t(t,e,n,i){var s,o=arguments.length,a=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,i);else for(var r=t.length-1;r>=0;r--)(s=t[r])&&(a=(o<3?s(a):o>3?s(e,n,a):s(e,n))||a);return o>3&&a&&Object.defineProperty(e,n,a),a}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,n=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let o=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(n&&void 0===t){const n=void 0!==e&&1===e.length;n&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&s.set(e,t))}return t}toString(){return this.cssText}};const a=t=>new o("string"==typeof t?t:t+"",void 0,i),r=(t,...e)=>{const n=1===t.length?t[0]:e.reduce((e,n,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[i+1],t[0]);return new o(n,t,i)},l=n?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return a(e)})(t):t,{is:h,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:u,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,g=globalThis,f=g.trustedTypes,_=f?f.emptyScript:"",v=g.reactiveElementPolyfillSupport,y=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=null!==t;break;case Number:n=null===t?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch(t){n=null}}return n}},w=(t,e)=>!h(t,e),x={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(t,n,e);void 0!==i&&d(this.prototype,t,i)}}static getPropertyDescriptor(t,e,n){const{get:i,set:s}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);s?.call(this,e),this.requestUpdate(t,o,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...u(t),...p(t)];for(const n of e)this.createProperty(n,t[n])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,n]of e)this.elementProperties.set(t,n)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const n=this._$Eu(t,e);void 0!==n&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const n=new Set(t.flat(1/0).reverse());for(const t of n)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const n=e.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const n of e.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(n)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const n of i){const i=document.createElement("style"),s=e.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=n.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,n){this._$AK(t,n)}_$ET(t,e){const n=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,n);if(void 0!==i&&!0===n.reflect){const s=(void 0!==n.converter?.toAttribute?n.converter:b).toAttribute(e,n.type);this._$Em=t,null==s?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(t,e){const n=this.constructor,i=n._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=n.getPropertyOptions(i),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=i;const o=s.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,n,i=!1,s){if(void 0!==t){const o=this.constructor;if(!1===i&&(s=this[t]),n??=o.getPropertyOptions(t),!((n.hasChanged??w)(s,e)||n.useDefault&&n.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,n))))return;this.C(t,e,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:n,reflect:i,wrapped:s},o){n&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==s||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||n||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,n]of t){const{wrapped:t}=n,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,n,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[y("elementProperties")]=new Map,k[y("finalized")]=new Map,v?.({ReactiveElement:k}),(g.reactiveElementVersions??=[]).push("2.1.2");const z=globalThis,P=t=>t,$=z.trustedTypes,S=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,T="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+C,A=`<${E}>`,M=document,H=()=>M.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,I=Array.isArray,O="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,B=/>/g,Z=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,q=/"/g,F=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...n)=>({_$litType$:t,strings:e,values:n}))(1),U=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),K=new WeakMap,V=M.createTreeWalker(M,129);function Y(t,e){if(!I(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const J=(t,e)=>{const n=t.length-1,i=[];let s,o=2===e?"<svg>":3===e?"<math>":"",a=D;for(let e=0;e<n;e++){const n=t[e];let r,l,h=-1,d=0;for(;d<n.length&&(a.lastIndex=d,l=a.exec(n),null!==l);)d=a.lastIndex,a===D?"!--"===l[1]?a=R:void 0!==l[1]?a=B:void 0!==l[2]?(F.test(l[2])&&(s=RegExp("</"+l[2],"g")),a=Z):void 0!==l[3]&&(a=Z):a===Z?">"===l[0]?(a=s??D,h=-1):void 0===l[1]?h=-2:(h=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?Z:'"'===l[3]?q:j):a===q||a===j?a=Z:a===R||a===B?a=D:(a=Z,s=void 0);const c=a===Z&&t[e+1].startsWith("/>")?" ":"";o+=a===D?n+A:h>=0?(i.push(r),n.slice(0,h)+T+n.slice(h)+C+c):n+C+(-2===h?e:c)}return[Y(t,o+(t[n]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class X{constructor({strings:t,_$litType$:e},n){let i;this.parts=[];let s=0,o=0;const a=t.length-1,r=this.parts,[l,h]=J(t,e);if(this.el=X.createElement(l,n),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=V.nextNode())&&r.length<a;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(T)){const e=h[o++],n=i.getAttribute(t).split(C),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:s,name:a[2],strings:n,ctor:"."===a[1]?it:"?"===a[1]?st:"@"===a[1]?ot:nt}),i.removeAttribute(t)}else t.startsWith(C)&&(r.push({type:6,index:s}),i.removeAttribute(t));if(F.test(i.tagName)){const t=i.textContent.split(C),e=t.length-1;if(e>0){i.textContent=$?$.emptyScript:"";for(let n=0;n<e;n++)i.append(t[n],H()),V.nextNode(),r.push({type:2,index:++s});i.append(t[e],H())}}}else if(8===i.nodeType)if(i.data===E)r.push({type:2,index:s});else{let t=-1;for(;-1!==(t=i.data.indexOf(C,t+1));)r.push({type:7,index:s}),t+=C.length-1}s++}}static createElement(t,e){const n=M.createElement("template");return n.innerHTML=t,n}}function Q(t,e,n=t,i){if(e===U)return e;let s=void 0!==i?n._$Co?.[i]:n._$Cl;const o=N(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(t),s._$AT(t,n,i)),void 0!==i?(n._$Co??=[])[i]=s:n._$Cl=s),void 0!==s&&(e=Q(t,s._$AS(t,e.values),s,i)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:n}=this._$AD,i=(t?.creationScope??M).importNode(e,!0);V.currentNode=i;let s=V.nextNode(),o=0,a=0,r=n[0];for(;void 0!==r;){if(o===r.index){let e;2===r.type?e=new et(s,s.nextSibling,this,t):1===r.type?e=new r.ctor(s,r.name,r.strings,this,t):6===r.type&&(e=new at(s,this,t)),this._$AV.push(e),r=n[++a]}o!==r?.index&&(s=V.nextNode(),o++)}return V.currentNode=M,i}p(t){let e=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,n,i){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),N(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==U&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>I(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:n}=t,i="number"==typeof n?this._$AC(t):(void 0===n.el&&(n.el=X.createElement(Y(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new tt(i,this),n=t.u(this.options);t.p(e),this.T(n),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new X(t)),e}k(t){I(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let n,i=0;for(const s of t)i===e.length?e.push(n=new et(this.O(H()),this.O(H()),this,this.options)):n=e[i],n._$AI(s),i++;i<e.length&&(this._$AR(n&&n._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=P(t).nextSibling;P(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class nt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,n,i,s){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=s,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=G}_$AI(t,e=this,n,i){const s=this.strings;let o=!1;if(void 0===s)t=Q(this,t,e,0),o=!N(t)||t!==this._$AH&&t!==U,o&&(this._$AH=t);else{const i=t;let a,r;for(t=s[0],a=0;a<s.length-1;a++)r=Q(this,i[n+a],e,a),r===U&&(r=this._$AH[a]),o||=!N(r)||r!==this._$AH[a],r===G?t=G:t!==G&&(t+=(r??"")+s[a+1]),this._$AH[a]=r}o&&!i&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends nt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}let st=class extends nt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}};class ot extends nt{constructor(t,e,n,i,s){super(t,e,n,i,s),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??G)===U)return;const n=this._$AH,i=t===G&&n!==G||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,s=t!==G&&(n===G||i);i&&this.element.removeEventListener(this.name,this,n),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const rt=z.litHtmlPolyfillSupport;rt?.(X,et),(z.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;class ht extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,n)=>{const i=n?.renderBefore??e;let s=i._$litPart$;if(void 0===s){const t=n?.renderBefore??null;i._$litPart$=s=new et(e.insertBefore(H(),t),t,void 0,n??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return U}}ht._$litElement$=!0,ht.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ht});const dt=lt.litElementPolyfillSupport;dt?.({LitElement:ht}),(lt.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,n)=>{void 0!==n?n.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ut={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:w},pt=(t=ut,e,n)=>{const{kind:i,metadata:s}=n;let o=globalThis.litPropertyMetadata.get(s);if(void 0===o&&globalThis.litPropertyMetadata.set(s,o=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),o.set(n.name,t),"accessor"===i){const{name:i}=n;return{set(n){const s=e.get.call(this);e.set.call(this,n),this.requestUpdate(i,s,t,!0,n)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=n;return function(n){const s=this[i];e.call(this,n),this.requestUpdate(i,s,t,!0,n)}}throw Error("Unsupported decorator location: "+i)};function mt(t){return(e,n)=>"object"==typeof n?pt(t,e,n):((t,e,n)=>{const i=e.hasOwnProperty(n);return e.constructor.createProperty(n,t),i?Object.getOwnPropertyDescriptor(e,n):void 0})(t,e,n)}function gt(t){return mt({...t,state:!0,attribute:!1})}const ft={"tab.status":"Status","tab.devices":"Devices","tab.map":"Map","tab.messages":"Messages","tab.homeassistant":"Home Assistant","tab.settings":"Settings","tab.log":"Log","tab.chat":"Chat","chat.noChannels":"No channel read from the radio yet, so there is nowhere to write.","chat.emptyThread":"Nothing here yet. Write the first message.","chat.channels":"Channels","chat.direct":"Direct messages","chat.sendOn":"Send on","chat.sendTo":"Send to","chat.placeholder":"Write a message","chat.send":"Send","chat.clear":"Clear this conversation","chat.note":"Conversations are grouped by channel and by node, and cover every channel this gateway hears, not only the one commands arrive on.","ha.shared":"Hermes entities","ha.noEntities":"No Hermes entity yet. Add the integration first.","ha.connected":"Entities used by your commands","ha.noReferences":"No command references an entity yet.","ha.problems":"need attention","ha.missing":"does not exist","ha.test":"Send a test","ha.testText":"Text","ha.testPlaceholder":"Test from Home Assistant","ha.testHint":"Sends on the channel of the selected gateway, through the same path a notification takes.","ha.sendTest":"Send","log.all":"All","log.received":"Received","log.sent":"Sent","log.clear":"Clear","log.empty":"Nothing logged yet.","log.nothingReceived":"no message has reached Hermes since the last restart","status.reason.error":"failed while being handled","log.outcome.error":"failed while being handled","log.privacy":"The log keeps the text of the messages in Home Assistant storage, capped at 200 entries. Clear it whenever you want.","log.outcome.matched":"command run","log.outcome.no_match":"no command matched","log.outcome.unauthorized":"sender not authorized","log.outcome.sent":"sent","log.outcome.help":"help sent","log.outcome.rate_limited":"rate limit reached","log.outcome.other_gateway":"ignored, another gateway","log.outcome.other_target":"ignored, another channel or a direct message","log.outcome.malformed":"ignored, unexpected format","presets.title":"Quick send","presets.add":"Add preset","presets.empty":"No preset yet.","presets.label":"Label","presets.text":"Message","presets.node":"Node ID (optional)","presets.nodeHint":"Leave empty to broadcast on the channel of the gateway.","presets.send":"Send","presets.channel":"Channel","presets.channelDefault":"The gateway's own channel","presets.channelHint":"Send on a different channel without adding a second Hermes instance. Ignored when a node ID is set, since that becomes a direct message.","presets.toChannelDefault":"to the gateway channel","presets.toChannel":"to channel","presets.toNode":"to node","status.title":"Status","status.nodes":"Nodes","status.commands":"Configured commands","status.executed":"Executed today","status.lastCommand":"Last command","status.lastError":"Last error","status.none":"None","status.noIntegration":"No Hermes entities found. Add the integration first.","radioCfg.title":"Radio configuration","radioCfg.warning":"These are written to the radio itself, not to Hermes. Most of them restart the node, and the wrong region or modem preset stops it talking to every other node until they match again. Change one at a time and check the mesh after each.","radioCfg.write":"Write to the radio","radioCfg.region":"Region","radioCfg.modem_preset":"Modem preset","radioCfg.hop_limit":"Hop limit","radioCfg.tx_enabled":"Transmitting enabled","radioCfg.tx_power":"Transmit power (dBm)","radioCfg.role":"Node role","radioCfg.node_info_broadcast_secs":"Node info interval (s)","radio.title":"Gateway radio","radio.name":"Name","radio.short":"Short name","radio.hardware":"Hardware","radio.role":"Role","radio.firmware":"Firmware","radio.region":"Region","radio.preset":"Modem preset","radio.hops":"Hop limit","status.reception":"Reception","status.busEvents":"Mesh events reaching Hermes","status.versions":"Versions","status.card":"card","status.backend":"backend","status.notListening":"not subscribed","status.versionMismatch":"The card and the Python code are different versions. Python only changes on a full Home Assistant restart, so restart it: until then the old backend keeps running and receives nothing new.","status.mismatch":"nothing is getting through","status.notRunning":"not running","status.radioOfflineBadge":"radio not connected","status.radioOffline":"The Meshtastic integration currently has no link to its node, so no message can reach Hermes and nothing can be sent. Everything else on this panel follows from that. Check the Meshtastic integration and the connection to the gateway node: an app connected straight to the radio keeps working regardless, which is why traffic still looks fine there.","status.notRunningHint":"This gateway is configured but the integration is not running, so nothing is listening for messages. The settings below are read from storage and look fine either way. Check Settings, Devices and Services for an error on Hermes, and the Home Assistant log.","status.expects":"This gateway listens to","status.lastSeen":"Last message on the mesh","status.seenFrom":"Sent by node","status.seenResult":"Result","status.tally":"Since the last restart","status.updatedAt":"updated at","status.applySeen":"Listen where the messages are","status.applySeenHint":"Sets the gateway, the mode and the channel to those of the message above, taken from traffic that really arrived.","status.nothingSeen":"nothing seen yet","status.nodeUnknown":"unknown","status.reason.received":"reached Hermes","status.reason.malformed":"arrived in an unexpected shape","status.reason.accepted":"accepted","status.reason.other_gateway":"arrived through a different gateway","status.reason.other_target":"arrived on a different channel or as a direct message","status.hintGateway":"Messages are reaching Home Assistant through another node. The gateway is always the node physically connected to Home Assistant, not the one you send from. Correct it in Settings.","status.hintTarget":"Messages are arriving somewhere this gateway is not listening. Check the mode and the channel in Settings against the channel shown above.","devices.title":"Devices","devices.empty":"No Meshtastic devices found. Set up the Meshtastic integration first.","devices.unknown":"Unknown","map.noSelection":"No node selected yet. Pick the nodes to show in Settings.","map.noPosition":"The selected nodes have not reported a position yet.","map.waiting":"waiting for position","map.showAll":"Show all mesh nodes","map.radiusFilter":"Filter by radius","map.connected":"heard recently","map.notConnected":"not heard recently","map.relay":"relay, cannot send commands","map.noneInRadius":"No node inside the radius. Widen it or turn the filter off.","map.size":"Size","map.size.auto":"Auto","map.size.mobile":"Phone","map.size.tablet":"Tablet","map.size.desktop":"Desktop","settings.title":"Settings","settings.global":"Global","settings.owmKey":"OpenWeather API key","settings.owmHint":"Used for the weather layer on the map. Stored in Home Assistant, never in the repository.","settings.gateway":"Gateway node","settings.gatewayHint":"The node physically connected to Home Assistant, not the one you send from. Every message reaches Home Assistant through it, so picking any other node means nothing is ever received.","settings.mode":"Mode","settings.modeChannel":"Listen on a channel","settings.modeDm":"Listen to direct messages","settings.modeHint":"Switching to a channel reveals which channel to listen on. On direct messages the gateway answers privately and no channel applies.","settings.channel":"Channel","settings.initialDelay":"Initial delay (s)","settings.partDelay":"Delay between parts (s)","settings.authorizedNodes":"Authorized nodes","settings.mapNodes":"Nodes shown on the map","settings.channelHint":"The channel Hermes listens on for commands. Changing it takes effect right away.","settings.channelsUnavailable":"Channel list unavailable, enter the index by hand.","settings.defaultPskWarning":"This channel still uses the default Meshtastic key, which is public. Anyone nearby can read it and send commands on it. Use a channel with your own key for anything that controls the house.","settings.reachable":"Consider a node reachable for (minutes)","settings.reachableHint":"How recently a node must have been heard to show green on the map. Two hours suits a fixed installation, a much shorter window says more in the field.","settings.requireAck":"Ask for delivery acknowledgement","settings.requireAckHint":"Tells you the message was delivered, at the cost of a return packet per message. On a busy mesh that is real airtime.","settings.rateLimit":"Max commands per node per minute","settings.rateLimitHint":"Protects against a node that malfunctions or a repeater that duplicates packets. 0 turns the limit off.","settings.caseSensitive":"Match keywords exactly as typed","settings.caseSensitiveHint":"Off by default, and usually best left off: phone keyboards and the Meshtastic app capitalise on their own, so strict matching would reject Status for a keyword written status.","settings.helpKeyword":"Help keyword","settings.helpKeywordHint":"Replies with the list of available commands, for people on the mesh with no access to Home Assistant. Empty disables it. Only authorized nodes get an answer.","settings.refresh":"Refresh","settings.refreshHint":"Re-read the channels and nodes from the radio, after changing something in the Meshtastic app","settings.firmware":"Firmware","settings.gatewayFirmware":"Gateway firmware","settings.channelsFound":"Channels read from the radio","settings.channelsNone":"none, the node may still be connecting","settings.firmwareSameNote":"Check that every node and repeater runs the same firmware version, or versions known to be compatible. Mixed versions cause messages that arrive on one node and not on another.","settings.firmwareDmNote":"Direct messages need a recent firmware on both ends. On older versions the encryption is not recognised, so the message never reaches Home Assistant and no entity state changes. Use a channel if a node cannot be updated.","settings.firmwareOnlyGateway":"Only the gateway reports its firmware to Home Assistant, so the other nodes have to be checked in the Meshtastic app.","settings.pinSize":"Pin size","settings.pinSize.small":"Small","settings.pinSize.medium":"Medium","settings.pinSize.large":"Large","settings.mapLabels":"Show node names on the map","settings.mapLabelsHint":"Useful with a handful of nodes, crowded with many.","settings.mapNodesHint":"Only these nodes are drawn as points on the Map tab. The map has a switch to show the whole mesh temporarily.","settings.authorizedHint":"Only these nodes can trigger commands. Anyone else is ignored without a reply.","settings.noNodes":"No Meshtastic node found yet.","messages.title":"Messages","messages.gateway":"Gateway","messages.listening":"Listening on","messages.listeningHint":"The channel this gateway is receiving commands on","messages.repliesOn":"Where this command replies","messages.onDm":"Direct message","messages.add":"Add message","messages.empty":"No commands configured yet.","messages.keyword":"Keyword","messages.matchType":"Match type","messages.service":"Service (domain.service)","messages.serviceHint":"Optional. Leave empty for a command that only replies.","messages.target":"Target entity","messages.targetHint":"The entity the service acts on. Leave empty if the service needs none.","messages.replyHint":"Optional. Use {state:entity_id} or {attr:entity_id:attribute}.","messages.replyTemplate":"Reply template","messages.replyTo":"Reply routing","messages.exact":"Exact match","messages.startswith":"Starts with","messages.onChannel":"On the channel","messages.senderDm":"DM to sender","messages.replyChannel":"Which channel","messages.replyChannelSame":"The one it was heard on","messages.replyChannelHint":"The reply goes only here. Commands arriving on any other channel are ignored without an answer, so this is a boundary and not just routing.","messages.dmGatewayNote":"This gateway listens to direct messages, so replies always go back privately: answering a private command on a channel would publish the state of your home to everyone listening on it. To reply on a channel, switch the gateway to channel mode in Settings.","messages.confirmDelete":"Delete this command?","messages.keywordHint":"The text people send from a Meshtastic node to trigger this.","messages.matchHint":'Use "Starts with" if you want to accept a value, like "temp 21".',"messages.paletteEntity":"Pick an entity","messages.paletteHint":"Choose what you want to read or control, then click a button below.","messages.pickEntityFirst":"Pick an entity to see what you can do with it.","messages.groupRead":"Read","messages.groupDo":"Do","messages.readState":"Value","messages.templateHint":"Click the buttons above to build this. Action buttons run something and send nothing.","messages.advanced":"Advanced","messages.hideAdvanced":"Hide advanced","common.save":"Save","common.cancel":"Cancel","common.edit":"Edit","common.duplicate":"Duplicate","common.delete":"Delete","common.loading":"Loading","common.saved":"Saved","common.noEntries":"No Hermes gateway configured yet.","common.loadError":"Could not load data from Home Assistant."},_t={en:ft,it:{"tab.status":"Status","tab.devices":"Dispositivi","tab.map":"Mappa","tab.messages":"Messaggi","tab.homeassistant":"Home Assistant","tab.settings":"Impostazioni","tab.log":"Log","tab.chat":"Chat","chat.noChannels":"Nessun canale letto dalla radio, quindi non c'e' dove scrivere.","chat.emptyThread":"Ancora niente. Scrivi il primo messaggio.","chat.channels":"Canali","chat.direct":"Messaggi diretti","chat.sendOn":"Invia su","chat.sendTo":"Invia a","chat.placeholder":"Scrivi un messaggio","chat.send":"Invia","chat.clear":"Svuota questa conversazione","chat.note":"Le conversazioni sono raggruppate per canale e per nodo, e coprono tutti i canali che il gateway sente, non solo quello da cui arrivano i comandi.","ha.shared":"Entità di Hermes","ha.noEntities":"Nessuna entità Hermes. Aggiungi prima l'integrazione.","ha.connected":"Entità usate dai tuoi comandi","ha.noReferences":"Nessun comando fa riferimento a una entità.","ha.problems":"da controllare","ha.missing":"non esiste","ha.test":"Invia una prova","ha.testText":"Testo","ha.testPlaceholder":"Prova da Home Assistant","ha.testHint":"Invia sul canale del gateway selezionato, per la stessa strada di una notifica.","ha.sendTest":"Invia","log.all":"Tutti","log.received":"Ricevuti","log.sent":"Inviati","log.clear":"Svuota","log.empty":"Ancora nessun messaggio registrato.","log.nothingReceived":"nessun messaggio e' arrivato a Hermes dall'ultimo riavvio","status.reason.error":"errore durante la gestione","log.outcome.error":"errore durante la gestione","log.privacy":"Il log conserva il testo dei messaggi nello storage di Home Assistant, con un limite di 200 voci. Puoi svuotarlo quando vuoi.","log.outcome.matched":"comando eseguito","log.outcome.no_match":"nessun comando corrispondente","log.outcome.unauthorized":"mittente non autorizzato","log.outcome.sent":"inviato","log.outcome.help":"aiuto inviato","log.outcome.rate_limited":"limite di frequenza raggiunto","log.outcome.other_gateway":"ignorato, un altro gateway","log.outcome.other_target":"ignorato, un altro canale o un messaggio diretto","log.outcome.malformed":"ignorato, formato inatteso","presets.title":"Invio rapido","presets.add":"Aggiungi preset","presets.empty":"Nessun preset.","presets.label":"Etichetta","presets.text":"Messaggio","presets.node":"Node ID (opzionale)","presets.nodeHint":"Lascia vuoto per inviare sul canale del gateway.","presets.send":"Invia","presets.channel":"Canale","presets.channelDefault":"Il canale del gateway","presets.channelHint":"Invia su un canale diverso senza aggiungere una seconda istanza di Hermes. Ignorato se imposti un node ID, perche' allora diventa un messaggio diretto.","presets.toChannelDefault":"sul canale del gateway","presets.toChannel":"sul canale","presets.toNode":"al nodo","status.title":"Status","status.nodes":"Nodi","status.commands":"Comandi configurati","status.executed":"Eseguiti oggi","status.lastCommand":"Ultimo comando","status.lastError":"Ultimo errore","status.none":"Nessuno","status.noIntegration":"Nessuna entità Hermes trovata. Aggiungi prima l'integrazione.","radioCfg.title":"Configurazione della radio","radioCfg.warning":"Questi valori vengono scritti sulla radio, non su Hermes. Quasi tutti fanno riavviare il nodo, e una regione o un preset del modem sbagliati lo isolano da tutti gli altri nodi finche' non tornano a coincidere. Cambiane uno per volta e verifica la mesh dopo ognuno.","radioCfg.write":"Scrivi sulla radio","radioCfg.region":"Regione","radioCfg.modem_preset":"Preset del modem","radioCfg.hop_limit":"Limite di hop","radioCfg.tx_enabled":"Trasmissione abilitata","radioCfg.tx_power":"Potenza di trasmissione (dBm)","radioCfg.role":"Ruolo del nodo","radioCfg.node_info_broadcast_secs":"Intervallo info nodo (s)","radio.title":"Radio del gateway","radio.name":"Nome","radio.short":"Nome breve","radio.hardware":"Hardware","radio.role":"Ruolo","radio.firmware":"Firmware","radio.region":"Regione","radio.preset":"Preset del modem","radio.hops":"Limite di hop","status.reception":"Ricezione","status.busEvents":"Eventi mesh arrivati a Hermes","status.versions":"Versioni","status.card":"card","status.backend":"backend","status.notListening":"non iscritto","status.versionMismatch":"La card e il codice Python sono di versioni diverse. Il Python cambia solo con un riavvio completo di Home Assistant, quindi riavvialo: fino ad allora resta in esecuzione il backend vecchio e non riceve nulla di nuovo.","status.mismatch":"non passa niente","status.notRunning":"non in esecuzione","status.radioOfflineBadge":"radio non connessa","status.radioOffline":"L'integrazione Meshtastic non ha al momento un collegamento col suo nodo, quindi nessun messaggio puo' arrivare a Hermes e nulla puo' essere inviato. Tutto il resto di questo pannello e' una conseguenza. Controlla l'integrazione Meshtastic e la connessione al nodo gateway: un'app collegata direttamente alla radio continua a funzionare comunque, ed e' per questo che li' il traffico sembra regolare.","status.notRunningHint":"Questo gateway e' configurato ma l'integrazione non e' in esecuzione, quindi non c'e' nulla in ascolto dei messaggi. Le impostazioni qui sotto vengono lette dallo storage e sembrano corrette comunque. Controlla in Impostazioni, Dispositivi e servizi se Hermes e' in errore, e il log di Home Assistant.","status.expects":"Questo gateway ascolta","status.lastSeen":"Ultimo messaggio sulla mesh","status.seenFrom":"Inviato dal nodo","status.seenResult":"Esito","status.tally":"Dall'ultimo riavvio","status.updatedAt":"aggiornato alle","status.applySeen":"Ascolta dove sono i messaggi","status.applySeenHint":"Imposta gateway, modalita' e canale su quelli del messaggio qui sopra, presi da traffico realmente arrivato.","status.nothingSeen":"ancora niente","status.nodeUnknown":"sconosciuto","status.reason.received":"arrivati a Hermes","status.reason.malformed":"arrivati in una forma inattesa","status.reason.accepted":"accettato","status.reason.other_gateway":"arrivato tramite un gateway diverso","status.reason.other_target":"arrivato su un altro canale o come messaggio diretto","status.hintGateway":"I messaggi arrivano a Home Assistant tramite un altro nodo. Il gateway e' sempre il nodo fisicamente collegato a Home Assistant, non quello da cui scrivi. Correggilo nelle Impostazioni.","status.hintTarget":"I messaggi arrivano dove questo gateway non ascolta. Confronta modalita' e canale nelle Impostazioni con il canale mostrato qui sopra.","devices.title":"Dispositivi","devices.empty":"Nessun dispositivo Meshtastic trovato. Configura prima l'integrazione Meshtastic.","devices.unknown":"Sconosciuto","map.noSelection":"Nessun nodo selezionato. Scegli i nodi da mostrare in Impostazioni.","map.noPosition":"I nodi selezionati non hanno ancora inviato una posizione.","map.waiting":"in attesa di posizione","map.showAll":"Mostra tutti i nodi della mesh","map.radiusFilter":"Filtra per raggio","map.connected":"sentito di recente","map.notConnected":"non sentito di recente","map.relay":"ripetitore, non puo' inviare comandi","map.noneInRadius":"Nessun nodo dentro il raggio. Allargalo o disattiva il filtro.","map.size":"Dimensione","map.size.auto":"Automatica","map.size.mobile":"Cellulare","map.size.tablet":"Tablet","map.size.desktop":"Computer","settings.title":"Impostazioni","settings.global":"Globali","settings.owmKey":"Chiave API OpenWeather","settings.owmHint":"Usata per il livello meteo sulla mappa. Salvata in Home Assistant, mai nel repository.","settings.gateway":"Nodo gateway","settings.gatewayHint":"Il nodo fisicamente collegato a Home Assistant, non quello da cui scrivi. Ogni messaggio passa da li', quindi scegliendo un altro nodo non si riceve mai niente.","settings.mode":"Modalità","settings.modeChannel":"Ascolta su un canale","settings.modeDm":"Ascolta i messaggi diretti","settings.modeHint":"Passando a canale compare quale canale ascoltare. Sui messaggi diretti il gateway risponde in privato e il canale non si applica.","settings.channel":"Canale","settings.initialDelay":"Attesa iniziale (s)","settings.partDelay":"Pausa tra le parti (s)","settings.authorizedNodes":"Nodi autorizzati","settings.mapNodes":"Nodi mostrati sulla mappa","settings.channelHint":"Il canale su cui Hermes ascolta i comandi. La modifica ha effetto subito.","settings.channelsUnavailable":"Elenco canali non disponibile, inserisci l'indice a mano.","settings.defaultPskWarning":"Questo canale usa ancora la chiave predefinita di Meshtastic, che e' pubblica. Chiunque nelle vicinanze puo' leggerlo e inviare comandi. Per comandare la casa usa un canale con una chiave tua.","settings.reachable":"Considera un nodo raggiungibile per (minuti)","settings.reachableHint":"Da quanto un nodo deve essere stato sentito per apparire verde sulla mappa. Due ore vanno bene per un impianto fisso, una finestra molto piu' corta dice di piu' sul campo.","settings.requireAck":"Chiedi conferma di consegna","settings.requireAckHint":"Ti dice se il messaggio e' stato consegnato, al costo di un pacchetto di ritorno per messaggio. Su una mesh trafficata e' airtime reale.","settings.rateLimit":"Comandi massimi per nodo al minuto","settings.rateLimitHint":"Protegge da un nodo che impazzisce o da un ripetitore che duplica i pacchetti. 0 disattiva il limite.","settings.caseSensitive":"Distingui maiuscole e minuscole","settings.caseSensitiveHint":"Disattivo di default, ed e' meglio lasciarlo cosi': le tastiere dei telefoni e l'app Meshtastic mettono la maiuscola da sole, quindi il confronto rigido rifiuterebbe Stato per una parola chiave scritta stato.","settings.helpKeyword":"Parola chiave di aiuto","settings.helpKeywordHint":"Risponde con l'elenco dei comandi disponibili, per chi e' sulla mesh senza accesso a Home Assistant. Vuoto la disattiva. Rispondiamo solo ai nodi autorizzati.","settings.refresh":"Aggiorna","settings.refreshHint":"Rilegge canali e nodi dalla radio, dopo aver cambiato qualcosa nell'app Meshtastic","settings.firmware":"Firmware","settings.gatewayFirmware":"Firmware del gateway","settings.channelsFound":"Canali letti dalla radio","settings.channelsNone":"nessuno, il nodo potrebbe essere ancora in connessione","settings.firmwareSameNote":"Verifica che tutti i nodi e i ripetitori abbiano la stessa versione di firmware, oppure versioni note come compatibili. Versioni miste causano messaggi che arrivano a un nodo e non a un altro.","settings.firmwareDmNote":"I messaggi diretti richiedono un firmware recente da entrambe le parti. Sulle versioni piu' vecchie la cifratura non viene riconosciuta, quindi il messaggio non arriva a Home Assistant e nessuna entita' cambia stato. Se un nodo non e' aggiornabile, usa un canale.","settings.firmwareOnlyGateway":"Solo il gateway comunica il proprio firmware a Home Assistant, quindi gli altri nodi vanno controllati dall'app Meshtastic.","settings.pinSize":"Dimensione dei punti","settings.pinSize.small":"Piccoli","settings.pinSize.medium":"Medi","settings.pinSize.large":"Grandi","settings.mapLabels":"Mostra i nomi dei nodi sulla mappa","settings.mapLabelsHint":"Utile con pochi nodi, affollato con molti.","settings.mapNodesHint":"Solo questi nodi vengono disegnati come punti nella tab Mappa. Nella mappa c'e' una spunta per mostrare temporaneamente tutta la mesh.","settings.authorizedHint":"Solo questi nodi possono far scattare i comandi. Gli altri vengono ignorati senza risposta.","settings.noNodes":"Nessun nodo Meshtastic trovato.","messages.title":"Messaggi","messages.gateway":"Gateway","messages.listening":"In ascolto su","messages.listeningHint":"Il canale su cui questo gateway riceve i comandi","messages.repliesOn":"Dove risponde questo comando","messages.onDm":"Messaggio diretto","messages.add":"Aggiungi messaggio","messages.empty":"Nessun comando configurato.","messages.keyword":"Parola chiave","messages.matchType":"Tipo di match","messages.service":"Servizio (dominio.servizio)","messages.serviceHint":"Opzionale. Lascia vuoto per un comando che risponde soltanto.","messages.target":"Entità target","messages.targetHint":"L'entità su cui agisce il servizio. Lascia vuoto se il servizio non ne richiede.","messages.replyHint":"Opzionale. Usa {state:entity_id} oppure {attr:entity_id:attributo}.","messages.replyTemplate":"Template di risposta","messages.replyTo":"Instradamento risposta","messages.exact":"Match esatto","messages.startswith":"Inizia con","messages.onChannel":"Sul canale","messages.senderDm":"DM al mittente","messages.replyChannel":"Su quale canale","messages.replyChannelSame":"Quello su cui e' arrivato","messages.replyChannelHint":"La risposta esce solo qui. I comandi che arrivano da qualsiasi altro canale vengono ignorati senza risposta, quindi questo e' un confine e non un semplice instradamento.","messages.dmGatewayNote":"Questo gateway ascolta i messaggi diretti, quindi le risposte tornano sempre in privato: rispondere su un canale a un comando privato pubblicherebbe lo stato di casa tua a chiunque lo stia ascoltando. Per rispondere su un canale, porta il gateway in modalita' canale nelle Impostazioni.","messages.confirmDelete":"Eliminare questo comando?","messages.keywordHint":"Il testo che si invia da un nodo Meshtastic per far scattare il comando.","messages.matchHint":'Usa "Inizia con" se vuoi accettare un valore, tipo "temp 21".',"messages.paletteEntity":"Scegli una entità","messages.paletteHint":"Scegli cosa vuoi leggere o comandare, poi clicca un pulsante qui sotto.","messages.pickEntityFirst":"Scegli una entità per vedere cosa puoi farci.","messages.groupRead":"Leggi","messages.groupDo":"Fai","messages.readState":"Valore","messages.templateHint":"Componi cliccando i pulsanti sopra. I pulsanti azione eseguono e non inviano testo.","messages.advanced":"Avanzate","messages.hideAdvanced":"Nascondi avanzate","common.save":"Salva","common.cancel":"Annulla","common.edit":"Modifica","common.duplicate":"Duplica","common.delete":"Elimina","common.loading":"Caricamento","common.saved":"Salvato","common.noEntries":"Nessun gateway Hermes configurato.","common.loadError":"Impossibile caricare i dati da Home Assistant."},es:{"tab.status":"Estado","tab.devices":"Dispositivos","tab.map":"Mapa","tab.messages":"Mensajes","tab.homeassistant":"Home Assistant","tab.settings":"Ajustes","tab.log":"Registro","tab.chat":"Chat","chat.noChannels":"Ningun canal leido de la radio, asi que no hay donde escribir.","chat.emptyThread":"Todavia nada. Escribe el primer mensaje.","chat.channels":"Canales","chat.direct":"Mensajes directos","chat.sendOn":"Enviar por","chat.sendTo":"Enviar a","chat.placeholder":"Escribe un mensaje","chat.send":"Enviar","chat.clear":"Vaciar esta conversacion","chat.note":"Las conversaciones se agrupan por canal y por nodo, y cubren todos los canales que oye la puerta de enlace, no solo aquel por el que llegan los comandos.","ha.shared":"Entidades de Hermes","ha.noEntities":"Todavía no hay entidades de Hermes. Añade primero la integración.","ha.connected":"Entidades usadas por tus comandos","ha.noReferences":"Ningún comando hace referencia a una entidad.","ha.problems":"requieren atención","ha.missing":"no existe","ha.test":"Enviar una prueba","ha.testText":"Texto","ha.testPlaceholder":"Prueba desde Home Assistant","ha.testHint":"Envía al canal de la puerta de enlace seleccionada, por el mismo camino que una notificación.","ha.sendTest":"Enviar","log.all":"Todos","log.received":"Recibidos","log.sent":"Enviados","log.clear":"Vaciar","log.empty":"Todavía no hay nada registrado.","log.nothingReceived":"ningun mensaje ha llegado a Hermes desde el ultimo reinicio","status.reason.error":"fallo al procesarlo","log.outcome.error":"fallo al procesarlo","log.privacy":"El registro guarda el texto de los mensajes en el almacenamiento de Home Assistant, con un límite de 200 entradas. Puedes vaciarlo cuando quieras.","log.outcome.matched":"comando ejecutado","log.outcome.no_match":"ningún comando coincide","log.outcome.unauthorized":"remitente no autorizado","log.outcome.sent":"enviado","log.outcome.help":"ayuda enviada","log.outcome.rate_limited":"limite de frecuencia alcanzado","log.outcome.other_gateway":"ignorado, otra puerta de enlace","log.outcome.other_target":"ignorado, otro canal o un mensaje directo","log.outcome.malformed":"ignorado, formato inesperado","presets.title":"Envío rápido","presets.add":"Añadir preajuste","presets.empty":"Todavía no hay preajustes.","presets.label":"Etiqueta","presets.text":"Mensaje","presets.node":"ID de nodo (opcional)","presets.nodeHint":"Déjalo vacío para difundir en el canal de la puerta de enlace.","presets.send":"Enviar","presets.channel":"Canal","presets.channelDefault":"El canal de la puerta de enlace","presets.channelHint":"Envia por un canal distinto sin anadir una segunda instancia de Hermes. Se ignora si pones un ID de nodo, porque entonces es un mensaje directo.","presets.toChannelDefault":"al canal de la puerta de enlace","presets.toChannel":"al canal","presets.toNode":"al nodo","status.title":"Estado","status.nodes":"Nodos","status.commands":"Comandos configurados","status.executed":"Ejecutados hoy","status.lastCommand":"Último comando","status.lastError":"Último error","status.none":"Ninguno","status.noIntegration":"No se han encontrado entidades de Hermes. Añade primero la integración.","radioCfg.title":"Configuracion de la radio","radioCfg.warning":"Estos valores se escriben en la radio, no en Hermes. Casi todos reinician el nodo, y una region o un preajuste de modem equivocados lo aislan de todos los demas nodos hasta que vuelvan a coincidir. Cambia uno cada vez y comprueba la malla despues de cada uno.","radioCfg.write":"Escribir en la radio","radioCfg.region":"Region","radioCfg.modem_preset":"Preajuste del modem","radioCfg.hop_limit":"Limite de saltos","radioCfg.tx_enabled":"Transmision habilitada","radioCfg.tx_power":"Potencia de transmision (dBm)","radioCfg.role":"Rol del nodo","radioCfg.node_info_broadcast_secs":"Intervalo de info del nodo (s)","radio.title":"Radio de la puerta de enlace","radio.name":"Nombre","radio.short":"Nombre corto","radio.hardware":"Hardware","radio.role":"Rol","radio.firmware":"Firmware","radio.region":"Region","radio.preset":"Preajuste del modem","radio.hops":"Limite de saltos","status.reception":"Recepcion","status.busEvents":"Eventos mesh llegados a Hermes","status.versions":"Versiones","status.card":"card","status.backend":"backend","status.notListening":"no suscrito","status.versionMismatch":"La card y el codigo Python son de versiones distintas. El Python solo cambia con un reinicio completo de Home Assistant, asi que reinicialo: hasta entonces sigue el backend antiguo y no recibe nada nuevo.","status.mismatch":"no pasa nada","status.notRunning":"no en ejecucion","status.radioOfflineBadge":"radio no conectada","status.radioOffline":"La integracion Meshtastic no tiene ahora enlace con su nodo, asi que ningun mensaje puede llegar a Hermes ni puede enviarse nada. Todo lo demas de este panel es consecuencia de eso. Revisa la integracion Meshtastic y la conexion al nodo de puerta de enlace: una app conectada directamente a la radio sigue funcionando igual, por eso alli el trafico parece normal.","status.notRunningHint":"Esta puerta de enlace esta configurada pero la integracion no esta en ejecucion, asi que no hay nada escuchando mensajes. Los ajustes de abajo se leen del almacenamiento y parecen correctos igualmente. Revisa en Ajustes, Dispositivos y servicios si Hermes esta en error, y el registro de Home Assistant.","status.expects":"Esta puerta de enlace escucha","status.lastSeen":"Ultimo mensaje en la malla","status.seenFrom":"Enviado por el nodo","status.seenResult":"Resultado","status.tally":"Desde el ultimo reinicio","status.updatedAt":"actualizado a las","status.applySeen":"Escuchar donde estan los mensajes","status.applySeenHint":"Ajusta la puerta de enlace, el modo y el canal a los del mensaje de arriba, tomados de trafico que llego de verdad.","status.nothingSeen":"todavia nada","status.nodeUnknown":"desconocido","status.reason.received":"llegados a Hermes","status.reason.malformed":"llegados con una forma inesperada","status.reason.accepted":"aceptado","status.reason.other_gateway":"llego por otra puerta de enlace","status.reason.other_target":"llego por otro canal o como mensaje directo","status.hintGateway":"Los mensajes llegan a Home Assistant por otro nodo. La puerta de enlace es siempre el nodo conectado fisicamente a Home Assistant, no aquel desde el que escribes. Corrigelo en los Ajustes.","status.hintTarget":"Los mensajes llegan donde esta puerta de enlace no escucha. Compara el modo y el canal en los Ajustes con el canal mostrado arriba.","devices.title":"Dispositivos","devices.empty":"No se han encontrado dispositivos Meshtastic. Configura primero la integración Meshtastic.","devices.unknown":"Desconocido","map.noSelection":"Ningún nodo seleccionado. Elige los nodos a mostrar en Ajustes.","map.noPosition":"Los nodos seleccionados aún no han enviado una posición.","map.waiting":"esperando posición","map.showAll":"Mostrar todos los nodos de la malla","map.radiusFilter":"Filtrar por radio","map.connected":"oído recientemente","map.notConnected":"no oído recientemente","map.relay":"repetidor, no puede enviar comandos","map.noneInRadius":"Ningún nodo dentro del radio. Amplíalo o desactiva el filtro.","map.size":"Tamaño","map.size.auto":"Automático","map.size.mobile":"Móvil","map.size.tablet":"Tableta","map.size.desktop":"Ordenador","settings.title":"Ajustes","settings.global":"Globales","settings.owmKey":"Clave API de OpenWeather","settings.owmHint":"Se usa para la capa meteorológica del mapa. Guardada en Home Assistant, nunca en el repositorio.","settings.gateway":"Nodo de puerta de enlace","settings.gatewayHint":"El nodo conectado fisicamente a Home Assistant, no aquel desde el que escribes. Todos los mensajes pasan por el, asi que eligiendo otro nodo nunca se recibe nada.","settings.mode":"Modo","settings.modeChannel":"Escuchar en un canal","settings.modeDm":"Escuchar mensajes directos","settings.modeHint":"Al cambiar a canal aparece cual canal escuchar. En mensajes directos la puerta de enlace responde en privado y el canal no se aplica.","settings.channel":"Canal","settings.initialDelay":"Retardo inicial (s)","settings.partDelay":"Retardo entre partes (s)","settings.authorizedNodes":"Nodos autorizados","settings.mapNodes":"Nodos mostrados en el mapa","settings.channelHint":"El canal en el que Hermes escucha los comandos. El cambio surte efecto de inmediato.","settings.channelsUnavailable":"Lista de canales no disponible, introduce el indice a mano.","settings.defaultPskWarning":"Este canal todavia usa la clave predeterminada de Meshtastic, que es publica. Cualquiera cerca puede leerlo y enviar comandos. Usa un canal con tu propia clave para controlar la casa.","settings.reachable":"Considerar un nodo accesible durante (minutos)","settings.reachableHint":"Cuanto de reciente debe ser la ultima escucha para que el nodo aparezca en verde. Dos horas van bien en una instalacion fija, una ventana mas corta dice mas sobre el terreno.","settings.requireAck":"Pedir confirmacion de entrega","settings.requireAckHint":"Te dice si el mensaje se ha entregado, a costa de un paquete de vuelta por mensaje. En una malla con trafico eso es tiempo de aire real.","settings.rateLimit":"Comandos maximos por nodo y minuto","settings.rateLimitHint":"Protege de un nodo que falla o de un repetidor que duplica paquetes. 0 desactiva el limite.","settings.caseSensitive":"Distinguir mayusculas y minusculas","settings.caseSensitiveHint":"Desactivado por defecto, y suele ser mejor dejarlo asi: los teclados de los moviles y la app de Meshtastic ponen la mayuscula solos, asi que la comparacion estricta rechazaria Estado para una palabra clave escrita estado.","settings.helpKeyword":"Palabra clave de ayuda","settings.helpKeywordHint":"Responde con la lista de comandos disponibles, para quien esta en la malla sin acceso a Home Assistant. Vacio lo desactiva. Solo responde a nodos autorizados.","settings.refresh":"Actualizar","settings.refreshHint":"Vuelve a leer los canales y nodos de la radio, tras cambiar algo en la app de Meshtastic","settings.firmware":"Firmware","settings.gatewayFirmware":"Firmware de la puerta de enlace","settings.channelsFound":"Canales leidos de la radio","settings.channelsNone":"ninguno, el nodo puede estar aun conectandose","settings.firmwareSameNote":"Comprueba que todos los nodos y repetidores tengan la misma version de firmware, o versiones compatibles conocidas. Las versiones mezcladas provocan mensajes que llegan a un nodo y no a otro.","settings.firmwareDmNote":"Los mensajes directos necesitan firmware reciente en ambos extremos. En versiones antiguas el cifrado no se reconoce, asi que el mensaje no llega a Home Assistant y ninguna entidad cambia de estado. Si un nodo no se puede actualizar, usa un canal.","settings.firmwareOnlyGateway":"Solo la puerta de enlace informa de su firmware a Home Assistant, los demas nodos hay que comprobarlos en la app de Meshtastic.","settings.pinSize":"Tamano de los puntos","settings.pinSize.small":"Pequenos","settings.pinSize.medium":"Medianos","settings.pinSize.large":"Grandes","settings.mapLabels":"Mostrar los nombres de los nodos en el mapa","settings.mapLabelsHint":"Util con pocos nodos, abarrotado con muchos.","settings.mapNodesHint":"Solo estos nodos se dibujan como puntos en la pestaña Mapa. El mapa tiene una casilla para mostrar toda la malla temporalmente.","settings.authorizedHint":"Solo estos nodos pueden activar comandos. El resto se ignora sin respuesta.","settings.noNodes":"Todavía no se ha encontrado ningún nodo Meshtastic.","messages.title":"Mensajes","messages.gateway":"Puerta de enlace","messages.listening":"Escuchando en","messages.listeningHint":"El canal en el que esta puerta de enlace recibe los comandos","messages.repliesOn":"Donde responde este comando","messages.onDm":"Mensaje directo","messages.add":"Añadir mensaje","messages.empty":"Todavía no hay comandos configurados.","messages.keyword":"Palabra clave","messages.matchType":"Tipo de coincidencia","messages.service":"Servicio (dominio.servicio)","messages.serviceHint":"Opcional. Déjalo vacío para un comando que solo responde.","messages.target":"Entidad de destino","messages.targetHint":"La entidad sobre la que actúa el servicio. Déjalo vacío si el servicio no la necesita.","messages.replyHint":"Opcional. Usa {state:entity_id} o {attr:entity_id:attribute}.","messages.replyTemplate":"Plantilla de respuesta","messages.replyTo":"Enrutamiento de respuesta","messages.exact":"Coincidencia exacta","messages.startswith":"Empieza por","messages.onChannel":"En el canal","messages.senderDm":"DM al remitente","messages.replyChannel":"En que canal","messages.replyChannelSame":"Aquel en el que llego","messages.replyChannelHint":"La respuesta sale solo aqui. Los comandos que llegan por cualquier otro canal se ignoran sin respuesta, asi que esto es un limite y no un simple enrutamiento.","messages.dmGatewayNote":"Esta puerta de enlace escucha mensajes directos, asi que las respuestas siempre vuelven en privado: responder en un canal a un comando privado publicaria el estado de tu casa a todos los que lo escuchan. Para responder en un canal, cambia la puerta de enlace a modo canal en los Ajustes.","messages.confirmDelete":"¿Eliminar este comando?","messages.keywordHint":"El texto que se envía desde un nodo Meshtastic para activarlo.","messages.matchHint":'Usa "Empieza por" si quieres aceptar un valor, como "temp 21".',"messages.paletteEntity":"Elige una entidad","messages.paletteHint":"Elige qué quieres leer o controlar y pulsa un botón de abajo.","messages.pickEntityFirst":"Elige una entidad para ver qué puedes hacer con ella.","messages.groupRead":"Leer","messages.groupDo":"Hacer","messages.readState":"Valor","messages.templateHint":"Compón pulsando los botones de arriba. Los botones de acción ejecutan y no envían texto.","messages.advanced":"Avanzado","messages.hideAdvanced":"Ocultar avanzado","common.save":"Guardar","common.cancel":"Cancelar","common.edit":"Editar","common.duplicate":"Duplicar","common.delete":"Eliminar","common.loading":"Cargando","common.saved":"Guardado","common.noEntries":"Todavía no hay ninguna puerta de enlace Hermes configurada.","common.loadError":"No se han podido cargar los datos de Home Assistant."},fr:{"tab.status":"État","tab.devices":"Appareils","tab.map":"Carte","tab.messages":"Messages","tab.homeassistant":"Home Assistant","tab.settings":"Paramètres","tab.log":"Journal","tab.chat":"Chat","chat.noChannels":"Aucun canal lu depuis la radio, il n y a donc nulle part ou ecrire.","chat.emptyThread":"Rien pour le moment. Ecrivez le premier message.","chat.channels":"Canaux","chat.direct":"Messages directs","chat.sendOn":"Envoyer sur","chat.sendTo":"Envoyer a","chat.placeholder":"Ecrire un message","chat.send":"Envoyer","chat.clear":"Vider cette conversation","chat.note":"Les conversations sont regroupees par canal et par nœud, et couvrent tous les canaux que la passerelle entend, pas seulement celui des commandes.","ha.shared":"Entités de Hermes","ha.noEntities":"Aucune entité Hermes. Ajoutez d'abord l'intégration.","ha.connected":"Entités utilisées par vos commandes","ha.noReferences":"Aucune commande ne référence une entité.","ha.problems":"à vérifier","ha.missing":"n'existe pas","ha.test":"Envoyer un test","ha.testText":"Texte","ha.testPlaceholder":"Test depuis Home Assistant","ha.testHint":"Envoie sur le canal de la passerelle sélectionnée, par le même chemin qu'une notification.","ha.sendTest":"Envoyer","log.all":"Tous","log.received":"Reçus","log.sent":"Envoyés","log.clear":"Vider","log.empty":"Rien dans le journal pour le moment.","log.nothingReceived":"aucun message n est arrive a Hermes depuis le dernier redemarrage","status.reason.error":"echec lors du traitement","log.outcome.error":"echec lors du traitement","log.privacy":"Le journal conserve le texte des messages dans le stockage de Home Assistant, limité à 200 entrées. Vous pouvez le vider quand vous voulez.","log.outcome.matched":"commande exécutée","log.outcome.no_match":"aucune commande correspondante","log.outcome.unauthorized":"expéditeur non autorisé","log.outcome.sent":"envoyé","log.outcome.help":"aide envoyee","log.outcome.rate_limited":"limite de frequence atteinte","log.outcome.other_gateway":"ignore, une autre passerelle","log.outcome.other_target":"ignore, un autre canal ou un message direct","log.outcome.malformed":"ignore, format inattendu","presets.title":"Envoi rapide","presets.add":"Ajouter un préréglage","presets.empty":"Aucun préréglage.","presets.label":"Libellé","presets.text":"Message","presets.node":"ID de nœud (facultatif)","presets.nodeHint":"Laissez vide pour diffuser sur le canal de la passerelle.","presets.send":"Envoyer","presets.channel":"Canal","presets.channelDefault":"Le canal de la passerelle","presets.channelHint":"Envoyer sur un autre canal sans ajouter une deuxieme instance de Hermes. Ignore si un ID de nœud est defini, car cela devient un message direct.","presets.toChannelDefault":"sur le canal de la passerelle","presets.toChannel":"sur le canal","presets.toNode":"au nœud","status.title":"État","status.nodes":"Nœuds","status.commands":"Commandes configurées","status.executed":"Exécutées aujourd'hui","status.lastCommand":"Dernière commande","status.lastError":"Dernière erreur","status.none":"Aucun","status.noIntegration":"Aucune entité Hermes trouvée. Ajoutez d'abord l'intégration.","radioCfg.title":"Configuration de la radio","radioCfg.warning":"Ces valeurs sont ecrites dans la radio, pas dans Hermes. La plupart redemarrent le nœud, et une region ou une preselection de modem erronee le coupe de tous les autres nœuds jusqu a ce qu ils correspondent de nouveau. Changez-en un a la fois et verifiez le maillage apres chacun.","radioCfg.write":"Ecrire dans la radio","radioCfg.region":"Region","radioCfg.modem_preset":"Preselection du modem","radioCfg.hop_limit":"Limite de sauts","radioCfg.tx_enabled":"Emission activee","radioCfg.tx_power":"Puissance d emission (dBm)","radioCfg.role":"Role du nœud","radioCfg.node_info_broadcast_secs":"Intervalle info nœud (s)","radio.title":"Radio de la passerelle","radio.name":"Nom","radio.short":"Nom court","radio.hardware":"Materiel","radio.role":"Role","radio.firmware":"Firmware","radio.region":"Region","radio.preset":"Preselection du modem","radio.hops":"Limite de sauts","status.reception":"Reception","status.busEvents":"Evenements mesh arrives a Hermes","status.versions":"Versions","status.card":"card","status.backend":"backend","status.notListening":"non abonne","status.versionMismatch":"La carte et le code Python sont de versions differentes. Le Python ne change qu au redemarrage complet de Home Assistant, redemarrez-le: jusque la l ancien backend continue et ne recoit rien de nouveau.","status.mismatch":"rien ne passe","status.notRunning":"pas en cours d execution","status.radioOfflineBadge":"radio non connectee","status.radioOffline":"L integration Meshtastic n a actuellement aucun lien avec son nœud, aucun message ne peut donc atteindre Hermes et rien ne peut etre envoye. Tout le reste de ce panneau en decoule. Verifiez l integration Meshtastic et la connexion au nœud passerelle: une application connectee directement a la radio continue de fonctionner, d ou un trafic qui parait normal la-bas.","status.notRunningHint":"Cette passerelle est configuree mais l integration ne tourne pas, rien n ecoute donc les messages. Les parametres ci-dessous sont lus depuis le stockage et paraissent corrects de toute facon. Verifiez dans Parametres, Appareils et services si Hermes est en erreur, ainsi que le journal de Home Assistant.","status.expects":"Cette passerelle ecoute","status.lastSeen":"Dernier message sur le maillage","status.seenFrom":"Envoye par le nœud","status.seenResult":"Resultat","status.tally":"Depuis le dernier redemarrage","status.updatedAt":"mis a jour a","status.applySeen":"Ecouter la ou sont les messages","status.applySeenHint":"Regle la passerelle, le mode et le canal sur ceux du message ci-dessus, pris sur du trafic reellement arrive.","status.nothingSeen":"rien pour le moment","status.nodeUnknown":"inconnu","status.reason.received":"arrives a Hermes","status.reason.malformed":"arrives sous une forme inattendue","status.reason.accepted":"accepte","status.reason.other_gateway":"arrive par une autre passerelle","status.reason.other_target":"arrive sur un autre canal ou en message direct","status.hintGateway":"Les messages atteignent Home Assistant par un autre nœud. La passerelle est toujours le nœud physiquement connecte a Home Assistant, pas celui depuis lequel vous ecrivez. Corrigez-le dans les Parametres.","status.hintTarget":"Les messages arrivent la ou cette passerelle n ecoute pas. Comparez le mode et le canal dans les Parametres avec le canal affiche ci-dessus.","devices.title":"Appareils","devices.empty":"Aucun appareil Meshtastic trouvé. Configurez d'abord l'intégration Meshtastic.","devices.unknown":"Inconnu","map.noSelection":"Aucun nœud sélectionné. Choisissez les nœuds à afficher dans Paramètres.","map.noPosition":"Les nœuds sélectionnés n'ont pas encore transmis de position.","map.waiting":"en attente de position","map.showAll":"Afficher tous les nœuds du maillage","map.radiusFilter":"Filtrer par rayon","map.connected":"entendu récemment","map.notConnected":"pas entendu récemment","map.relay":"relais, ne peut pas envoyer de commandes","map.noneInRadius":"Aucun nœud dans le rayon. Élargissez-le ou désactivez le filtre.","map.size":"Taille","map.size.auto":"Automatique","map.size.mobile":"Téléphone","map.size.tablet":"Tablette","map.size.desktop":"Ordinateur","settings.title":"Paramètres","settings.global":"Globaux","settings.owmKey":"Clé API OpenWeather","settings.owmHint":"Utilisée pour la couche météo de la carte. Stockée dans Home Assistant, jamais dans le dépôt.","settings.gateway":"Nœud passerelle","settings.gatewayHint":"Le nœud physiquement connecte a Home Assistant, pas celui depuis lequel vous ecrivez. Tous les messages passent par lui, choisir un autre nœud signifie ne jamais rien recevoir.","settings.mode":"Mode","settings.modeChannel":"Ecouter sur un canal","settings.modeDm":"Ecouter les messages directs","settings.modeHint":"En passant sur canal, le canal a ecouter apparait. En messages directs la passerelle repond en prive et le canal ne s applique pas.","settings.channel":"Canal","settings.initialDelay":"Délai initial (s)","settings.partDelay":"Délai entre les parties (s)","settings.authorizedNodes":"Nœuds autorisés","settings.mapNodes":"Nœuds affichés sur la carte","settings.channelHint":"Le canal sur lequel Hermes ecoute les commandes. La modification prend effet immediatement.","settings.channelsUnavailable":"Liste des canaux indisponible, saisissez l'index a la main.","settings.defaultPskWarning":"Ce canal utilise encore la cle par defaut de Meshtastic, qui est publique. N'importe qui a proximite peut le lire et envoyer des commandes. Utilisez un canal avec votre propre cle pour piloter la maison.","settings.reachable":"Considerer un nœud joignable pendant (minutes)","settings.reachableHint":"Depuis combien de temps un nœud doit avoir ete entendu pour apparaitre en vert. Deux heures conviennent a une installation fixe, une fenetre bien plus courte est plus parlante sur le terrain.","settings.requireAck":"Demander un accuse de reception","settings.requireAckHint":"Indique que le message a ete delivre, au prix d'un paquet de retour par message. Sur un maillage charge c'est du temps d'antenne reel.","settings.rateLimit":"Commandes maximum par nœud et par minute","settings.rateLimitHint":"Protege d'un nœud defaillant ou d'un repeteur qui duplique les paquets. 0 desactive la limite.","settings.caseSensitive":"Distinguer les majuscules","settings.caseSensitiveHint":"Desactive par defaut, et mieux vaut le laisser ainsi: les claviers de telephone et l'application Meshtastic mettent la majuscule d'eux-memes, une comparaison stricte rejetterait donc Etat pour un mot-cle ecrit etat.","settings.helpKeyword":"Mot-cle d'aide","settings.helpKeywordHint":"Repond avec la liste des commandes disponibles, pour ceux qui sont sur le maillage sans acces a Home Assistant. Vide le desactive. Seuls les nœuds autorises recoivent une reponse.","settings.refresh":"Actualiser","settings.refreshHint":"Relit les canaux et les nœuds depuis la radio, apres un changement dans l'application Meshtastic","settings.firmware":"Firmware","settings.gatewayFirmware":"Firmware de la passerelle","settings.channelsFound":"Canaux lus depuis la radio","settings.channelsNone":"aucun, le nœud est peut-etre encore en connexion","settings.firmwareSameNote":"Verifiez que tous les nœuds et repeteurs utilisent la meme version de firmware, ou des versions connues comme compatibles. Des versions melangees provoquent des messages qui arrivent sur un nœud et pas sur un autre.","settings.firmwareDmNote":"Les messages directs exigent un firmware recent des deux cotes. Sur les anciennes versions le chiffrement n'est pas reconnu, donc le message n'atteint pas Home Assistant et aucune entite ne change d'etat. Si un nœud ne peut pas etre mis a jour, utilisez un canal.","settings.firmwareOnlyGateway":"Seule la passerelle communique son firmware a Home Assistant, les autres nœuds doivent etre verifies dans l'application Meshtastic.","settings.pinSize":"Taille des points","settings.pinSize.small":"Petits","settings.pinSize.medium":"Moyens","settings.pinSize.large":"Grands","settings.mapLabels":"Afficher les noms des nœuds sur la carte","settings.mapLabelsHint":"Utile avec peu de nœuds, charge avec beaucoup.","settings.mapNodesHint":"Seuls ces nœuds sont dessinés sur l'onglet Carte. La carte a une case pour afficher tout le maillage temporairement.","settings.authorizedHint":"Seuls ces nœuds peuvent déclencher des commandes. Les autres sont ignorés sans réponse.","settings.noNodes":"Aucun nœud Meshtastic trouvé pour le moment.","messages.title":"Messages","messages.gateway":"Passerelle","messages.listening":"A l'ecoute sur","messages.listeningHint":"Le canal sur lequel cette passerelle recoit les commandes","messages.repliesOn":"Ou repond cette commande","messages.onDm":"Message direct","messages.add":"Ajouter un message","messages.empty":"Aucune commande configurée pour le moment.","messages.keyword":"Mot-clé","messages.matchType":"Type de correspondance","messages.service":"Service (domaine.service)","messages.serviceHint":"Facultatif. Laissez vide pour une commande qui répond seulement.","messages.target":"Entité cible","messages.targetHint":"L'entité sur laquelle agit le service. Laissez vide si le service n'en a pas besoin.","messages.replyHint":"Facultatif. Utilisez {state:entity_id} ou {attr:entity_id:attribute}.","messages.replyTemplate":"Modèle de réponse","messages.replyTo":"Routage de la réponse","messages.exact":"Correspondance exacte","messages.startswith":"Commence par","messages.onChannel":"Sur le canal","messages.senderDm":"DM à l'expéditeur","messages.replyChannel":"Sur quel canal","messages.replyChannelSame":"Celui par lequel elle est arrivee","messages.replyChannelHint":"La reponse ne part que la. Les commandes arrivant par tout autre canal sont ignorees sans reponse, c est donc une limite et pas un simple routage.","messages.dmGatewayNote":"Cette passerelle ecoute les messages directs, les reponses repartent donc toujours en prive: repondre sur un canal a une commande privee publierait l etat de votre maison a tous ceux qui l ecoutent. Pour repondre sur un canal, passez la passerelle en mode canal dans les Parametres.","messages.confirmDelete":"Supprimer cette commande ?","messages.keywordHint":"Le texte envoyé depuis un nœud Meshtastic pour la déclencher.","messages.matchHint":'Utilisez "Commence par" pour accepter une valeur, comme "temp 21".',"messages.paletteEntity":"Choisissez une entité","messages.paletteHint":"Choisissez ce que vous voulez lire ou piloter, puis cliquez un bouton ci-dessous.","messages.pickEntityFirst":"Choisissez une entité pour voir ce que vous pouvez en faire.","messages.groupRead":"Lire","messages.groupDo":"Faire","messages.readState":"Valeur","messages.templateHint":"Composez avec les boutons ci-dessus. Les boutons d'action exécutent et n'envoient rien.","messages.advanced":"Avancé","messages.hideAdvanced":"Masquer avancé","common.save":"Enregistrer","common.cancel":"Annuler","common.edit":"Modifier","common.duplicate":"Dupliquer","common.delete":"Supprimer","common.loading":"Chargement","common.saved":"Enregistré","common.noEntries":"Aucune passerelle Hermes configurée pour le moment.","common.loadError":"Impossible de charger les données depuis Home Assistant."},de:{"tab.status":"Status","tab.devices":"Geräte","tab.map":"Karte","tab.messages":"Nachrichten","tab.homeassistant":"Home Assistant","tab.settings":"Einstellungen","tab.log":"Protokoll","tab.chat":"Chat","chat.noChannels":"Noch kein Kanal vom Funkgeraet gelesen, es gibt also keinen Ort zum Schreiben.","chat.emptyThread":"Noch nichts. Schreibe die erste Nachricht.","chat.channels":"Kanaele","chat.direct":"Direktnachrichten","chat.sendOn":"Senden auf","chat.sendTo":"Senden an","chat.placeholder":"Nachricht schreiben","chat.send":"Senden","chat.clear":"Diese Unterhaltung leeren","chat.note":"Unterhaltungen sind nach Kanal und Node gruppiert und umfassen alle Kanaele, die das Gateway hoert, nicht nur den der Befehle.","ha.shared":"Hermes-Entitäten","ha.noEntities":"Noch keine Hermes-Entität. Füge zuerst die Integration hinzu.","ha.connected":"Von deinen Befehlen verwendete Entitäten","ha.noReferences":"Kein Befehl verweist auf eine Entität.","ha.problems":"zu prüfen","ha.missing":"existiert nicht","ha.test":"Test senden","ha.testText":"Text","ha.testPlaceholder":"Test von Home Assistant","ha.testHint":"Sendet auf dem Kanal des gewählten Gateways, über denselben Weg wie eine Benachrichtigung.","ha.sendTest":"Senden","log.all":"Alle","log.received":"Empfangen","log.sent":"Gesendet","log.clear":"Leeren","log.empty":"Noch nichts protokolliert.","log.nothingReceived":"seit dem letzten Neustart hat keine Nachricht Hermes erreicht","status.reason.error":"bei der Verarbeitung fehlgeschlagen","log.outcome.error":"bei der Verarbeitung fehlgeschlagen","log.privacy":"Das Protokoll speichert den Text der Nachrichten im Home-Assistant-Speicher, begrenzt auf 200 Einträge. Du kannst es jederzeit leeren.","log.outcome.matched":"Befehl ausgeführt","log.outcome.no_match":"kein Befehl passt","log.outcome.unauthorized":"Absender nicht autorisiert","log.outcome.sent":"gesendet","log.outcome.help":"Hilfe gesendet","log.outcome.rate_limited":"Ratenlimit erreicht","log.outcome.other_gateway":"ignoriert, ein anderes Gateway","log.outcome.other_target":"ignoriert, ein anderer Kanal oder eine Direktnachricht","log.outcome.malformed":"ignoriert, unerwartetes Format","presets.title":"Schnellversand","presets.add":"Vorlage hinzufügen","presets.empty":"Noch keine Vorlage.","presets.label":"Bezeichnung","presets.text":"Nachricht","presets.node":"Node-ID (optional)","presets.nodeHint":"Leer lassen, um auf dem Kanal des Gateways zu senden.","presets.send":"Senden","presets.channel":"Kanal","presets.channelDefault":"Der Kanal des Gateways","presets.channelHint":"Auf einem anderen Kanal senden, ohne eine zweite Hermes-Instanz anzulegen. Wird ignoriert, wenn eine Node-ID gesetzt ist, denn dann ist es eine Direktnachricht.","presets.toChannelDefault":"auf den Gateway-Kanal","presets.toChannel":"auf Kanal","presets.toNode":"an Node","status.title":"Status","status.nodes":"Nodes","status.commands":"Konfigurierte Befehle","status.executed":"Heute ausgeführt","status.lastCommand":"Letzter Befehl","status.lastError":"Letzter Fehler","status.none":"Keine","status.noIntegration":"Keine Hermes-Entitäten gefunden. Füge zuerst die Integration hinzu.","radioCfg.title":"Funkkonfiguration","radioCfg.warning":"Diese Werte werden auf das Funkgeraet geschrieben, nicht auf Hermes. Die meisten starten den Node neu, und eine falsche Region oder Modem-Voreinstellung schneidet ihn von allen anderen Nodes ab, bis sie wieder uebereinstimmen. Aendere eines nach dem anderen und pruefe danach das Mesh.","radioCfg.write":"Auf das Funkgeraet schreiben","radioCfg.region":"Region","radioCfg.modem_preset":"Modem-Voreinstellung","radioCfg.hop_limit":"Hop-Limit","radioCfg.tx_enabled":"Senden aktiviert","radioCfg.tx_power":"Sendeleistung (dBm)","radioCfg.role":"Node-Rolle","radioCfg.node_info_broadcast_secs":"Node-Info-Intervall (s)","radio.title":"Gateway-Funkgeraet","radio.name":"Name","radio.short":"Kurzname","radio.hardware":"Hardware","radio.role":"Rolle","radio.firmware":"Firmware","radio.region":"Region","radio.preset":"Modem-Voreinstellung","radio.hops":"Hop-Limit","status.reception":"Empfang","status.busEvents":"Mesh-Ereignisse, die Hermes erreichen","status.versions":"Versionen","status.card":"Card","status.backend":"Backend","status.notListening":"nicht abonniert","status.versionMismatch":"Card und Python-Code haben verschiedene Versionen. Python aendert sich nur bei einem vollstaendigen Neustart von Home Assistant, starte ihn also neu: bis dahin laeuft das alte Backend weiter und empfaengt nichts Neues.","status.mismatch":"es kommt nichts an","status.notRunning":"laeuft nicht","status.radioOfflineBadge":"Funk nicht verbunden","status.radioOffline":"Die Meshtastic-Integration hat derzeit keine Verbindung zu ihrem Node, es kann also keine Nachricht Hermes erreichen und nichts gesendet werden. Alles andere auf diesem Panel folgt daraus. Pruefe die Meshtastic-Integration und die Verbindung zum Gateway-Node: eine App, die direkt mit dem Funkgeraet verbunden ist, funktioniert weiterhin, deshalb sieht der Verkehr dort normal aus.","status.notRunningHint":"Dieses Gateway ist konfiguriert, aber die Integration laeuft nicht, es hoert also nichts auf Nachrichten. Die Einstellungen unten stammen aus dem Speicher und sehen ohnehin korrekt aus. Pruefe unter Einstellungen, Geraete und Dienste, ob Hermes einen Fehler zeigt, und das Home-Assistant-Log.","status.expects":"Dieses Gateway empfaengt","status.lastSeen":"Letzte Nachricht im Mesh","status.seenFrom":"Gesendet von Node","status.seenResult":"Ergebnis","status.tally":"Seit dem letzten Neustart","status.updatedAt":"aktualisiert um","status.applySeen":"Dort empfangen, wo die Nachrichten sind","status.applySeenHint":"Setzt Gateway, Modus und Kanal auf die der Nachricht oben, entnommen aus tatsaechlich angekommenem Verkehr.","status.nothingSeen":"noch nichts","status.nodeUnknown":"unbekannt","status.reason.received":"bei Hermes angekommen","status.reason.malformed":"in unerwarteter Form angekommen","status.reason.accepted":"angenommen","status.reason.other_gateway":"kam ueber ein anderes Gateway","status.reason.other_target":"kam auf einem anderen Kanal oder als Direktnachricht","status.hintGateway":"Die Nachrichten erreichen Home Assistant ueber einen anderen Node. Das Gateway ist immer der Node, der physisch mit Home Assistant verbunden ist, nicht der, von dem du schreibst. Korrigiere es in den Einstellungen.","status.hintTarget":"Die Nachrichten kommen dort an, wo dieses Gateway nicht empfaengt. Vergleiche Modus und Kanal in den Einstellungen mit dem oben gezeigten Kanal.","devices.title":"Geräte","devices.empty":"Keine Meshtastic-Geräte gefunden. Richte zuerst die Meshtastic-Integration ein.","devices.unknown":"Unbekannt","map.noSelection":"Kein Node ausgewählt. Wähle in den Einstellungen die anzuzeigenden Nodes.","map.noPosition":"Die ausgewählten Nodes haben noch keine Position gemeldet.","map.waiting":"warte auf Position","map.showAll":"Alle Mesh-Nodes anzeigen","map.radiusFilter":"Nach Radius filtern","map.connected":"kürzlich gehört","map.notConnected":"nicht kürzlich gehört","map.relay":"Relais, kann keine Befehle senden","map.noneInRadius":"Kein Node im Radius. Vergrößere ihn oder schalte den Filter aus.","map.size":"Größe","map.size.auto":"Automatisch","map.size.mobile":"Handy","map.size.tablet":"Tablet","map.size.desktop":"Computer","settings.title":"Einstellungen","settings.global":"Global","settings.owmKey":"OpenWeather-API-Schlüssel","settings.owmHint":"Wird für die Wetterebene der Karte verwendet. In Home Assistant gespeichert, nie im Repository.","settings.gateway":"Gateway-Node","settings.gatewayHint":"Der Node, der physisch mit Home Assistant verbunden ist, nicht der, von dem du schreibst. Jede Nachricht laeuft ueber ihn, ein anderer Node bedeutet also, dass nie etwas ankommt.","settings.mode":"Modus","settings.modeChannel":"Auf einem Kanal empfangen","settings.modeDm":"Direktnachrichten empfangen","settings.modeHint":"Beim Wechsel auf Kanal erscheint, welcher Kanal empfangen wird. Bei Direktnachrichten antwortet das Gateway privat und ein Kanal gilt nicht.","settings.channel":"Kanal","settings.initialDelay":"Anfängliche Verzögerung (s)","settings.partDelay":"Verzögerung zwischen Teilen (s)","settings.authorizedNodes":"Autorisierte Nodes","settings.mapNodes":"Auf der Karte angezeigte Nodes","settings.channelHint":"Der Kanal, auf dem Hermes Befehle empfaengt. Die Aenderung wirkt sofort.","settings.channelsUnavailable":"Kanalliste nicht verfuegbar, gib den Index von Hand ein.","settings.defaultPskWarning":"Dieser Kanal nutzt noch den Standardschluessel von Meshtastic, der oeffentlich ist. Jeder in der Naehe kann mitlesen und Befehle senden. Nutze fuer die Haussteuerung einen Kanal mit eigenem Schluessel.","settings.reachable":"Node als erreichbar gelten lassen fuer (Minuten)","settings.reachableHint":"Wie kuerzlich ein Node gehoert worden sein muss, um gruen zu erscheinen. Zwei Stunden passen zu einer festen Installation, ein viel kuerzeres Fenster sagt im Feld mehr aus.","settings.requireAck":"Empfangsbestaetigung anfordern","settings.requireAckHint":"Sagt dir, ob die Nachricht zugestellt wurde, um den Preis eines Rueckpakets pro Nachricht. In einem ausgelasteten Mesh ist das echte Sendezeit.","settings.rateLimit":"Maximale Befehle pro Node und Minute","settings.rateLimitHint":"Schuetzt vor einem fehlerhaften Node oder einem Repeater, der Pakete dupliziert. 0 schaltet das Limit ab.","settings.caseSensitive":"Gross- und Kleinschreibung beachten","settings.caseSensitiveHint":"Standardmaessig aus, und meist besser so: Handytastaturen und die Meshtastic-App schreiben von selbst gross, ein strikter Vergleich wuerde also Status fuer ein als status geschriebenes Schluesselwort ablehnen.","settings.helpKeyword":"Hilfe-Schluesselwort","settings.helpKeywordHint":"Antwortet mit der Liste der verfuegbaren Befehle, fuer Leute im Mesh ohne Zugang zu Home Assistant. Leer deaktiviert es. Nur autorisierte Nodes bekommen eine Antwort.","settings.refresh":"Aktualisieren","settings.refreshHint":"Liest Kanaele und Nodes erneut vom Funkgeraet, nach einer Aenderung in der Meshtastic-App","settings.firmware":"Firmware","settings.gatewayFirmware":"Gateway-Firmware","settings.channelsFound":"Vom Funkgeraet gelesene Kanaele","settings.channelsNone":"keine, der Node verbindet sich moeglicherweise noch","settings.firmwareSameNote":"Pruefe, dass alle Nodes und Repeater dieselbe Firmware-Version haben oder Versionen, die als kompatibel bekannt sind. Gemischte Versionen fuehren dazu, dass Nachrichten bei einem Node ankommen und bei einem anderen nicht.","settings.firmwareDmNote":"Direktnachrichten brauchen auf beiden Seiten eine aktuelle Firmware. Bei aelteren Versionen wird die Verschluesselung nicht erkannt, die Nachricht erreicht Home Assistant nicht und keine Entitaet aendert ihren Zustand. Laesst sich ein Node nicht aktualisieren, nutze einen Kanal.","settings.firmwareOnlyGateway":"Nur das Gateway meldet seine Firmware an Home Assistant, die anderen Nodes muessen in der Meshtastic-App geprueft werden.","settings.pinSize":"Punktgroesse","settings.pinSize.small":"Klein","settings.pinSize.medium":"Mittel","settings.pinSize.large":"Gross","settings.mapLabels":"Node-Namen auf der Karte anzeigen","settings.mapLabelsHint":"Nuetzlich bei wenigen Nodes, unuebersichtlich bei vielen.","settings.mapNodesHint":"Nur diese Nodes werden im Karten-Tab als Punkte gezeichnet. Die Karte hat einen Schalter, um kurzzeitig das ganze Mesh zu zeigen.","settings.authorizedHint":"Nur diese Nodes können Befehle auslösen. Alle anderen werden ohne Antwort ignoriert.","settings.noNodes":"Noch kein Meshtastic-Node gefunden.","messages.title":"Nachrichten","messages.gateway":"Gateway","messages.listening":"Empfaengt auf","messages.listeningHint":"Der Kanal, auf dem dieses Gateway Befehle empfaengt","messages.repliesOn":"Wo dieser Befehl antwortet","messages.onDm":"Direktnachricht","messages.add":"Nachricht hinzufügen","messages.empty":"Noch keine Befehle konfiguriert.","messages.keyword":"Schlüsselwort","messages.matchType":"Übereinstimmungstyp","messages.service":"Dienst (domain.service)","messages.serviceHint":"Optional. Leer lassen für einen Befehl, der nur antwortet.","messages.target":"Ziel-Entität","messages.targetHint":"Die Entität, auf die der Dienst wirkt. Leer lassen, wenn der Dienst keine benötigt.","messages.replyHint":"Optional. Verwende {state:entity_id} oder {attr:entity_id:attribute}.","messages.replyTemplate":"Antwortvorlage","messages.replyTo":"Antwort-Routing","messages.exact":"Exakte Übereinstimmung","messages.startswith":"Beginnt mit","messages.onChannel":"Auf dem Kanal","messages.senderDm":"DM an Absender","messages.replyChannel":"Auf welchem Kanal","messages.replyChannelSame":"Der, auf dem er ankam","messages.replyChannelHint":"Die Antwort geht nur hierhin. Befehle von jedem anderen Kanal werden ohne Antwort ignoriert, das ist also eine Grenze und keine blosse Zustellung.","messages.dmGatewayNote":"Dieses Gateway empfaengt Direktnachrichten, Antworten gehen also immer privat zurueck: einen privaten Befehl auf einem Kanal zu beantworten wuerde den Zustand deines Hauses allen Mithoerenden veroeffentlichen. Um auf einem Kanal zu antworten, stelle das Gateway in den Einstellungen auf Kanalmodus um.","messages.confirmDelete":"Diesen Befehl löschen?","messages.keywordHint":"Der Text, den man von einem Meshtastic-Node sendet, um ihn auszulösen.","messages.matchHint":'Nutze "Beginnt mit", wenn ein Wert akzeptiert werden soll, etwa "temp 21".',"messages.paletteEntity":"Entität wählen","messages.paletteHint":"Wähle, was du lesen oder steuern willst, dann klicke unten einen Button.","messages.pickEntityFirst":"Wähle eine Entität, um zu sehen, was möglich ist.","messages.groupRead":"Lesen","messages.groupDo":"Ausführen","messages.readState":"Wert","messages.templateHint":"Mit den Buttons oben zusammenstellen. Aktions-Buttons führen aus und senden keinen Text.","messages.advanced":"Erweitert","messages.hideAdvanced":"Erweitert ausblenden","common.save":"Speichern","common.cancel":"Abbrechen","common.edit":"Bearbeiten","common.duplicate":"Duplizieren","common.delete":"Löschen","common.loading":"Wird geladen","common.saved":"Gespeichert","common.noEntries":"Noch kein Hermes-Gateway konfiguriert.","common.loadError":"Daten konnten nicht aus Home Assistant geladen werden."}};const vt=r`
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
`;function bt(t,e){const n=t.chats[e];return n?.length?n[n.length-1].ts:""}function wt(t,e,n){const i=Number(t.split(":")[1]),s=e.channels.find(t=>t.index===i);return s?`${i}: ${s.name}`:`${n("settings.channel")} ${i}`}function xt(t,e){const n=t.split(":")[1],i=e.nodes.find(t=>String(t.node_num)===n);return i?i.name:n}function kt(t,e,n,i){const s=t.chats[e]?.length??0;return W`
    <button
      class="chip"
      data-on=${e===n?"1":"0"}
      @click=${()=>t.onSelect(e)}
    >
      ${i}${s?W`<span class="count">${s}</span>`:""}
    </button>
  `}function zt(t,e){const n=function(t){const e=t.channels.map(t=>`channel:${t.index}`),n=Object.keys(t.chats).filter(t=>t.startsWith("channel:"));return[...new Set([...e,...n])].sort((t,e)=>Number(t.split(":")[1])-Number(e.split(":")[1]))}(t),i=function(t){return Object.keys(t.chats).filter(t=>t.startsWith("node:")).sort((e,n)=>bt(t,n).localeCompare(bt(t,e)))}(t),s=[...n,...i];if(!s.length)return W`
      <h2 class="screen-title">${e("tab.chat")}</h2>
      <div class="empty">${e("chat.noChannels")}</div>
    `;const o=t.thread&&s.includes(t.thread)?t.thread:s[0],a=t.chats[o]??[],r=o.startsWith("channel:");return W`
    <h2 class="screen-title">${e("tab.chat")}</h2>

    <div class="section-title">${e("chat.channels")}</div>
    <div class="chips" style="margin-bottom:10px">
      ${n.map(n=>kt(t,n,o,wt(n,t,e)))}
    </div>

    ${i.length?W`
          <div class="section-title">${e("chat.direct")}</div>
          <div class="chips" style="margin-bottom:12px">
            ${i.map(e=>kt(t,e,o,xt(e,t)))}
          </div>
        `:""}

    <div class="chat-log">
      ${a.length?a.map(t=>W`
              <div class="bubble ${t.outgoing?"out":"in"}">
                ${t.outgoing?"":W`<div class="who">
                      ${t.name||t.node||e("devices.unknown")}
                    </div>`}
                <div class="text">${t.text}</div>
                <div class="when">
                  ${t.ts?new Date(t.ts).toLocaleString():""}
                </div>
              </div>
            `):W`<div class="hint">${e("chat.emptyThread")}</div>`}
    </div>

    <div class="chat-send">
      <input
        .value=${t.draft}
        placeholder=${r?`${e("chat.sendOn")} ${wt(o,t,e)}`:`${e("chat.sendTo")} ${xt(o,t)}`}
        @input=${e=>t.onDraft(e.target.value)}
        @keydown=${e=>{"Enter"===e.key&&t.draft.trim()&&t.onSend()}}
      />
      <button
        class="btn primary"
        ?disabled=${!t.draft.trim()||t.sending}
        @click=${t.onSend}
      >
        ${t.sending?e("common.loading"):e("chat.send")}
      </button>
    </div>

    ${a.length?W`
          <div class="actions">
            <button class="btn danger" @click=${()=>t.onClear(o)}>
              ${e("chat.clear")}
            </button>
          </div>
        `:""}

    <div class="hint">${e("chat.note")}</div>
  `}const Pt="meshtastic",$t="hermes";function St(t,e){const n=t.entities;return n?Object.values(n).filter(t=>t.platform===e):Object.keys(t.states).filter(t=>t.includes(e)).map(t=>({entity_id:t,platform:e}))}function Lt(t,e){for(const n of St(t,$t))if(n.entity_id.endsWith(e)){const e=t.states[n.entity_id];if(e)return e}}function Tt(t,e){const n=t.devices?.[e];if(!n?.identifiers)return null;for(const t of n.identifiers)if(t?.[0]===Pt){const e=Number.parseInt(String(t[1]),10);return Number.isNaN(e)?null:e}return null}function Ct(t){const e=(t.split(".")[1]??t).split("_");return e.slice(Math.max(e.length-2,0)).join(" ")}function Et(t){const e=new Map;for(const n of St(t,Pt)){const i=n.device_id;if(!i)continue;const s=t.states[n.entity_id];if(!s)continue;let o=e.get(i);if(!o){const n=t.devices?.[i];o={deviceId:i,nodeNum:Tt(t,i),name:n?.name_by_user||n?.name||s.attributes?.friendly_name||i,values:{}},e.set(i,o)}o.values[Ct(n.entity_id)]=s}return[...e.values()].sort((t,e)=>t.name.localeCompare(e.name))}function At(t,e,n=120){if(!e)return!1;const i=t.states[e];if(!i||"unavailable"===i.state||"unknown"===i.state)return!1;const s=Date.parse(i.state);return!Number.isNaN(s)&&Date.now()-s<=60*n*1e3}const Mt=[/\{state:([^:}]+)\}/g,/\{attr:([^:}]+):[^}]+\}/g,/\{do:[^:}]+:([^:}]+?)(?::[^}]*)?\}/g];const Ht=["battery","voltage","snr","hops","last_heard","utilization","uptime"];function Nt(t){const e=t.attributes?.unit_of_measurement;return e?`${t.state} ${e}`:t.state}function It(t,e){const n=Et(t);return n.length?W`
    <h2 class="screen-title">${e("devices.title")}</h2>
    <div class="grid">
      ${n.map(t=>W`
          <div class="panel">
            <div class="node-head">
              <span class="node-name">${t.name}</span>
              <span class="node-num"
                >${t.nodeNum??e("devices.unknown")}</span
              >
            </div>
            ${function(t){const{headline:e,rest:n}=function(t){const e=Object.entries(t),n=t=>Ht.findIndex(e=>t.toLowerCase().includes(e)),i=e.filter(([t])=>n(t)>=0).sort((t,e)=>n(t[0])-n(e[0]));return{headline:i,rest:e.filter(([t])=>n(t)<0)}}(t);return W`
    <div class="rows">
      ${[...e,...n].map(([t,e])=>W`
          <div class="row">
            <span class="k">${t}</span>
            <span class="v">${Nt(e)}</span>
          </div>
        `)}
    </div>
  `}(t.values)}
          </div>
        `)}
    </div>
  `:W`<div class="empty">${e("devices.empty")}</div>`}const Ot="missing";function Dt(t,e){const n=function(t){const e=new Map,n=(t,n)=>{const i=t.trim();if(!i.includes("."))return;const s=e.get(i)??[];s.includes(n)||s.push(n),e.set(i,s)};for(const e of t)for(const t of e.commands??[]){const e=t.keyword||"?",i=t.target?.entity_id;"string"==typeof i&&n(i,e);const s=t.reply_template??"";for(const t of Mt){let i;for(t.lastIndex=0;null!==(i=t.exec(s));)n(i[1],e)}}return new Map([...e.entries()].sort((t,e)=>t[0].localeCompare(e[0])))}(t.entries),i=function(t){const e=[];for(const n of St(t,$t)){const i=t.states[n.entity_id];i&&e.push(i)}return e.sort((t,e)=>t.entity_id.localeCompare(e.entity_id))}(t.hass),s=[...n.entries()].map(([e,n])=>{const i=t.hass.states[e];return{entityId:e,keywords:n,state:i,status:i?"unavailable"===i.state||"unknown"===i.state?i.state:"":Ot}}),o=s.filter(t=>""!==t.status).length;return W`
    <h2 class="screen-title">${e("tab.homeassistant")}</h2>

    <div class="section">
      <div class="section-title">${e("ha.shared")}</div>
      ${i.length?W`
            <div class="rows">
              ${i.map(t=>W`
                  <div class="row">
                    <span class="k">
                      ${t.attributes?.friendly_name||t.entity_id}
                    </span>
                    <span class="v">${Nt(t)}</span>
                  </div>
                `)}
            </div>
          `:W`<div class="empty">${e("ha.noEntities")}</div>`}
    </div>

    <div class="section">
      <div class="section-title">
        ${e("ha.connected")}
        ${o?W`<span class="warn-badge">${o} ${e("ha.problems")}</span>`:""}
      </div>
      ${s.length?W`
            <div class="rows">
              ${s.map(t=>W`
                  <div class="row">
                    <span class="k">
                      <span
                        class="dot ${""===t.status?"on":"bad"}"
                      ></span>
                      ${t.state?.attributes?.friendly_name||t.entityId}
                      <span class="used">${t.keywords.join(", ")}</span>
                    </span>
                    <span class="v">
                      ${t.status===Ot?e("ha.missing"):t.state?Nt(t.state):""}
                    </span>
                  </div>
                `)}
            </div>
          `:W`<div class="empty">${e("ha.noReferences")}</div>`}
    </div>

    <div class="section">
      <div class="section-title">${e("ha.test")}</div>
      <div class="panel">
        <div class="field">
          <label>${e("ha.testText")}</label>
          <input
            .value=${t.testText}
            placeholder=${e("ha.testPlaceholder")}
            @input=${e=>t.onTestText(e.target.value)}
          />
          <span class="hint">${e("ha.testHint")}</span>
        </div>
        <div class="actions">
          <button
            class="btn primary"
            ?disabled=${!t.testText||!t.entries.length||t.sending}
            @click=${t.onSendTest}
          >
            ${t.sending?e("common.loading"):e("ha.sendTest")}
          </button>
        </div>
      </div>
    </div>
  `}function Rt(t,e){const n=t.filter?t.entries.filter(e=>e.direction===t.filter):t.entries;return W`
    <h2 class="screen-title">
      ${e("tab.log")}
      <button class="btn refresh" @click=${t.onRefresh}>
        ${e("settings.refresh")}
      </button>
      ${t.updatedAt?W`<span class="hint">${e("status.updatedAt")} ${t.updatedAt}</span>`:""}
    </h2>

    ${t.entries_meta.map(t=>W`
        <div class="note">
          <b>${t.title}</b>:
          ${Object.keys(t.counts).length?Object.entries(t.counts).map(([t,n])=>`${n} ${e(`status.reason.${t}`)}`).join(", "):e("log.nothingReceived")}
        </div>
      `)}

    <div class="map-controls">
      ${["","in","out"].map(n=>W`
          <button
            class="chip"
            data-on=${t.filter===n?"1":"0"}
            @click=${()=>t.onFilter(n)}
          >
            ${e(""===n?"log.all":"in"===n?"log.received":"log.sent")}
          </button>
        `)}
      <button class="btn danger" style="margin-left:auto" @click=${t.onClear}>
        ${e("log.clear")}
      </button>
    </div>

    ${0===n.length?W`<div class="empty">${e("log.empty")}</div>`:W`
          <div class="rows">
            ${n.map(t=>function(t,e){const n=t.ts?new Date(t.ts).toLocaleString():"",i=`log.outcome.${t.outcome}`,s=e(i);return W`
    <div class="log-row">
      <span class="dir ${t.direction}">
        ${"in"===t.direction?"←":"→"}
      </span>
      <div class="log-body">
        <div class="log-text">${t.text}</div>
        <div class="log-meta">
          ${n}${t.node?` · ${t.node}`:""}
          ${s&&s!==i?` · ${s}`:""}
        </div>
      </div>
    </div>
  `}(t,e))}
          </div>
        `}

    <div class="hint" style="margin-top:12px">${e("log.privacy")}</div>
  `}var Bt,Zt={exports:{}};var jt=(Bt||(Bt=1,function(t){var e="1.9.4";function n(t){var e,n,i,s;for(n=1,i=arguments.length;n<i;n++)for(e in s=arguments[n])t[e]=s[e];return t}var i=Object.create||function(){function t(){}return function(e){return t.prototype=e,new t}}();function s(t,e){var n=Array.prototype.slice;if(t.bind)return t.bind.apply(t,n.call(arguments,1));var i=n.call(arguments,2);return function(){return t.apply(e,i.length?i.concat(n.call(arguments)):arguments)}}var o=0;function a(t){return"_leaflet_id"in t||(t._leaflet_id=++o),t._leaflet_id}function r(t,e,n){var i,s,o,a;return a=function(){i=!1,s&&(o.apply(n,s),s=!1)},o=function(){i?s=arguments:(t.apply(n,arguments),setTimeout(a,e),i=!0)},o}function l(t,e,n){var i=e[1],s=e[0],o=i-s;return t===i&&n?t:((t-s)%o+o)%o+s}function h(){return!1}function d(t,e){if(!1===e)return t;var n=Math.pow(10,void 0===e?6:e);return Math.round(t*n)/n}function c(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function u(t){return c(t).split(/\s+/)}function p(t,e){for(var n in Object.prototype.hasOwnProperty.call(t,"options")||(t.options=t.options?i(t.options):{}),e)t.options[n]=e[n];return t.options}function m(t,e,n){var i=[];for(var s in t)i.push(encodeURIComponent(n?s.toUpperCase():s)+"="+encodeURIComponent(t[s]));return(e&&-1!==e.indexOf("?")?"&":"?")+i.join("&")}var g=/\{ *([\w_ -]+) *\}/g;function f(t,e){return t.replace(g,function(t,n){var i=e[n];if(void 0===i)throw new Error("No value provided for variable "+t);return"function"==typeof i&&(i=i(e)),i})}var _=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)};function v(t,e){for(var n=0;n<t.length;n++)if(t[n]===e)return n;return-1}var y="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function b(t){return window["webkit"+t]||window["moz"+t]||window["ms"+t]}var w=0;function x(t){var e=+new Date,n=Math.max(0,16-(e-w));return w=e+n,window.setTimeout(t,n)}var k=window.requestAnimationFrame||b("RequestAnimationFrame")||x,z=window.cancelAnimationFrame||b("CancelAnimationFrame")||b("CancelRequestAnimationFrame")||function(t){window.clearTimeout(t)};function P(t,e,n){if(!n||k!==x)return k.call(window,s(t,e));t.call(e)}function $(t){t&&z.call(window,t)}var S={__proto__:null,extend:n,create:i,bind:s,get lastId(){return o},stamp:a,throttle:r,wrapNum:l,falseFn:h,formatNum:d,trim:c,splitWords:u,setOptions:p,getParamString:m,template:f,isArray:_,indexOf:v,emptyImageUrl:y,requestFn:k,cancelFn:z,requestAnimFrame:P,cancelAnimFrame:$};function T(){}function C(t){if("undefined"!=typeof L&&L&&L.Mixin){t=_(t)?t:[t];for(var e=0;e<t.length;e++)t[e]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",(new Error).stack)}}T.extend=function(t){var e=function(){p(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},s=e.__super__=this.prototype,o=i(s);for(var a in o.constructor=e,e.prototype=o,this)Object.prototype.hasOwnProperty.call(this,a)&&"prototype"!==a&&"__super__"!==a&&(e[a]=this[a]);return t.statics&&n(e,t.statics),t.includes&&(C(t.includes),n.apply(null,[o].concat(t.includes))),n(o,t),delete o.statics,delete o.includes,o.options&&(o.options=s.options?i(s.options):{},n(o.options,t.options)),o._initHooks=[],o.callInitHooks=function(){if(!this._initHooksCalled){s.callInitHooks&&s.callInitHooks.call(this),this._initHooksCalled=!0;for(var t=0,e=o._initHooks.length;t<e;t++)o._initHooks[t].call(this)}},e},T.include=function(t){var e=this.prototype.options;return n(this.prototype,t),t.options&&(this.prototype.options=e,this.mergeOptions(t.options)),this},T.mergeOptions=function(t){return n(this.prototype.options,t),this},T.addInitHook=function(t){var e=Array.prototype.slice.call(arguments,1),n="function"==typeof t?t:function(){this[t].apply(this,e)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(n),this};var E={on:function(t,e,n){if("object"==typeof t)for(var i in t)this._on(i,t[i],e);else for(var s=0,o=(t=u(t)).length;s<o;s++)this._on(t[s],e,n);return this},off:function(t,e,n){if(arguments.length)if("object"==typeof t)for(var i in t)this._off(i,t[i],e);else{t=u(t);for(var s=1===arguments.length,o=0,a=t.length;o<a;o++)s?this._off(t[o]):this._off(t[o],e,n)}else delete this._events;return this},_on:function(t,e,n,i){if("function"==typeof e){if(!1===this._listens(t,e,n)){n===this&&(n=void 0);var s={fn:e,ctx:n};i&&(s.once=!0),this._events=this._events||{},this._events[t]=this._events[t]||[],this._events[t].push(s)}}else console.warn("wrong listener type: "+typeof e)},_off:function(t,e,n){var i,s,o;if(this._events&&(i=this._events[t]))if(1!==arguments.length)if("function"==typeof e){var a=this._listens(t,e,n);if(!1!==a){var r=i[a];this._firingCount&&(r.fn=h,this._events[t]=i=i.slice()),i.splice(a,1)}}else console.warn("wrong listener type: "+typeof e);else{if(this._firingCount)for(s=0,o=i.length;s<o;s++)i[s].fn=h;delete this._events[t]}},fire:function(t,e,i){if(!this.listens(t,i))return this;var s=n({},e,{type:t,target:this,sourceTarget:e&&e.sourceTarget||this});if(this._events){var o=this._events[t];if(o){this._firingCount=this._firingCount+1||1;for(var a=0,r=o.length;a<r;a++){var l=o[a],h=l.fn;l.once&&this.off(t,h,l.ctx),h.call(l.ctx||this,s)}this._firingCount--}}return i&&this._propagateEvent(s),this},listens:function(t,e,n,i){"string"!=typeof t&&console.warn('"string" type argument expected');var s=e;"function"!=typeof e&&(i=!!e,s=void 0,n=void 0);var o=this._events&&this._events[t];if(o&&o.length&&!1!==this._listens(t,s,n))return!0;if(i)for(var a in this._eventParents)if(this._eventParents[a].listens(t,e,n,i))return!0;return!1},_listens:function(t,e,n){if(!this._events)return!1;var i=this._events[t]||[];if(!e)return!!i.length;n===this&&(n=void 0);for(var s=0,o=i.length;s<o;s++)if(i[s].fn===e&&i[s].ctx===n)return s;return!1},once:function(t,e,n){if("object"==typeof t)for(var i in t)this._on(i,t[i],e,!0);else for(var s=0,o=(t=u(t)).length;s<o;s++)this._on(t[s],e,n,!0);return this},addEventParent:function(t){return this._eventParents=this._eventParents||{},this._eventParents[a(t)]=t,this},removeEventParent:function(t){return this._eventParents&&delete this._eventParents[a(t)],this},_propagateEvent:function(t){for(var e in this._eventParents)this._eventParents[e].fire(t.type,n({layer:t.target,propagatedFrom:t.target},t),!0)}};E.addEventListener=E.on,E.removeEventListener=E.clearAllEventListeners=E.off,E.addOneTimeEventListener=E.once,E.fireEvent=E.fire,E.hasEventListeners=E.listens;var A=T.extend(E);function M(t,e,n){this.x=n?Math.round(t):t,this.y=n?Math.round(e):e}var H=Math.trunc||function(t){return t>0?Math.floor(t):Math.ceil(t)};function N(t,e,n){return t instanceof M?t:_(t)?new M(t[0],t[1]):null==t?t:"object"==typeof t&&"x"in t&&"y"in t?new M(t.x,t.y):new M(t,e,n)}function I(t,e){if(t)for(var n=e?[t,e]:t,i=0,s=n.length;i<s;i++)this.extend(n[i])}function O(t,e){return!t||t instanceof I?t:new I(t,e)}function D(t,e){if(t)for(var n=e?[t,e]:t,i=0,s=n.length;i<s;i++)this.extend(n[i])}function R(t,e){return t instanceof D?t:new D(t,e)}function B(t,e,n){if(isNaN(t)||isNaN(e))throw new Error("Invalid LatLng object: ("+t+", "+e+")");this.lat=+t,this.lng=+e,void 0!==n&&(this.alt=+n)}function Z(t,e,n){return t instanceof B?t:_(t)&&"object"!=typeof t[0]?3===t.length?new B(t[0],t[1],t[2]):2===t.length?new B(t[0],t[1]):null:null==t?t:"object"==typeof t&&"lat"in t?new B(t.lat,"lng"in t?t.lng:t.lon,t.alt):void 0===e?null:new B(t,e,n)}M.prototype={clone:function(){return new M(this.x,this.y)},add:function(t){return this.clone()._add(N(t))},_add:function(t){return this.x+=t.x,this.y+=t.y,this},subtract:function(t){return this.clone()._subtract(N(t))},_subtract:function(t){return this.x-=t.x,this.y-=t.y,this},divideBy:function(t){return this.clone()._divideBy(t)},_divideBy:function(t){return this.x/=t,this.y/=t,this},multiplyBy:function(t){return this.clone()._multiplyBy(t)},_multiplyBy:function(t){return this.x*=t,this.y*=t,this},scaleBy:function(t){return new M(this.x*t.x,this.y*t.y)},unscaleBy:function(t){return new M(this.x/t.x,this.y/t.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=H(this.x),this.y=H(this.y),this},distanceTo:function(t){var e=(t=N(t)).x-this.x,n=t.y-this.y;return Math.sqrt(e*e+n*n)},equals:function(t){return(t=N(t)).x===this.x&&t.y===this.y},contains:function(t){return t=N(t),Math.abs(t.x)<=Math.abs(this.x)&&Math.abs(t.y)<=Math.abs(this.y)},toString:function(){return"Point("+d(this.x)+", "+d(this.y)+")"}},I.prototype={extend:function(t){var e,n;if(!t)return this;if(t instanceof M||"number"==typeof t[0]||"x"in t)e=n=N(t);else if(e=(t=O(t)).min,n=t.max,!e||!n)return this;return this.min||this.max?(this.min.x=Math.min(e.x,this.min.x),this.max.x=Math.max(n.x,this.max.x),this.min.y=Math.min(e.y,this.min.y),this.max.y=Math.max(n.y,this.max.y)):(this.min=e.clone(),this.max=n.clone()),this},getCenter:function(t){return N((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,t)},getBottomLeft:function(){return N(this.min.x,this.max.y)},getTopRight:function(){return N(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(t){var e,n;return(t="number"==typeof t[0]||t instanceof M?N(t):O(t))instanceof I?(e=t.min,n=t.max):e=n=t,e.x>=this.min.x&&n.x<=this.max.x&&e.y>=this.min.y&&n.y<=this.max.y},intersects:function(t){t=O(t);var e=this.min,n=this.max,i=t.min,s=t.max,o=s.x>=e.x&&i.x<=n.x,a=s.y>=e.y&&i.y<=n.y;return o&&a},overlaps:function(t){t=O(t);var e=this.min,n=this.max,i=t.min,s=t.max,o=s.x>e.x&&i.x<n.x,a=s.y>e.y&&i.y<n.y;return o&&a},isValid:function(){return!(!this.min||!this.max)},pad:function(t){var e=this.min,n=this.max,i=Math.abs(e.x-n.x)*t,s=Math.abs(e.y-n.y)*t;return O(N(e.x-i,e.y-s),N(n.x+i,n.y+s))},equals:function(t){return!!t&&(t=O(t),this.min.equals(t.getTopLeft())&&this.max.equals(t.getBottomRight()))}},D.prototype={extend:function(t){var e,n,i=this._southWest,s=this._northEast;if(t instanceof B)e=t,n=t;else{if(!(t instanceof D))return t?this.extend(Z(t)||R(t)):this;if(e=t._southWest,n=t._northEast,!e||!n)return this}return i||s?(i.lat=Math.min(e.lat,i.lat),i.lng=Math.min(e.lng,i.lng),s.lat=Math.max(n.lat,s.lat),s.lng=Math.max(n.lng,s.lng)):(this._southWest=new B(e.lat,e.lng),this._northEast=new B(n.lat,n.lng)),this},pad:function(t){var e=this._southWest,n=this._northEast,i=Math.abs(e.lat-n.lat)*t,s=Math.abs(e.lng-n.lng)*t;return new D(new B(e.lat-i,e.lng-s),new B(n.lat+i,n.lng+s))},getCenter:function(){return new B((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new B(this.getNorth(),this.getWest())},getSouthEast:function(){return new B(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(t){t="number"==typeof t[0]||t instanceof B||"lat"in t?Z(t):R(t);var e,n,i=this._southWest,s=this._northEast;return t instanceof D?(e=t.getSouthWest(),n=t.getNorthEast()):e=n=t,e.lat>=i.lat&&n.lat<=s.lat&&e.lng>=i.lng&&n.lng<=s.lng},intersects:function(t){t=R(t);var e=this._southWest,n=this._northEast,i=t.getSouthWest(),s=t.getNorthEast(),o=s.lat>=e.lat&&i.lat<=n.lat,a=s.lng>=e.lng&&i.lng<=n.lng;return o&&a},overlaps:function(t){t=R(t);var e=this._southWest,n=this._northEast,i=t.getSouthWest(),s=t.getNorthEast(),o=s.lat>e.lat&&i.lat<n.lat,a=s.lng>e.lng&&i.lng<n.lng;return o&&a},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(t,e){return!!t&&(t=R(t),this._southWest.equals(t.getSouthWest(),e)&&this._northEast.equals(t.getNorthEast(),e))},isValid:function(){return!(!this._southWest||!this._northEast)}},B.prototype={equals:function(t,e){return!!t&&(t=Z(t),Math.max(Math.abs(this.lat-t.lat),Math.abs(this.lng-t.lng))<=(void 0===e?1e-9:e))},toString:function(t){return"LatLng("+d(this.lat,t)+", "+d(this.lng,t)+")"},distanceTo:function(t){return q.distance(this,Z(t))},wrap:function(){return q.wrapLatLng(this)},toBounds:function(t){var e=180*t/40075017,n=e/Math.cos(Math.PI/180*this.lat);return R([this.lat-e,this.lng-n],[this.lat+e,this.lng+n])},clone:function(){return new B(this.lat,this.lng,this.alt)}};var j={latLngToPoint:function(t,e){var n=this.projection.project(t),i=this.scale(e);return this.transformation._transform(n,i)},pointToLatLng:function(t,e){var n=this.scale(e),i=this.transformation.untransform(t,n);return this.projection.unproject(i)},project:function(t){return this.projection.project(t)},unproject:function(t){return this.projection.unproject(t)},scale:function(t){return 256*Math.pow(2,t)},zoom:function(t){return Math.log(t/256)/Math.LN2},getProjectedBounds:function(t){if(this.infinite)return null;var e=this.projection.bounds,n=this.scale(t);return new I(this.transformation.transform(e.min,n),this.transformation.transform(e.max,n))},infinite:!1,wrapLatLng:function(t){var e=this.wrapLng?l(t.lng,this.wrapLng,!0):t.lng;return new B(this.wrapLat?l(t.lat,this.wrapLat,!0):t.lat,e,t.alt)},wrapLatLngBounds:function(t){var e=t.getCenter(),n=this.wrapLatLng(e),i=e.lat-n.lat,s=e.lng-n.lng;if(0===i&&0===s)return t;var o=t.getSouthWest(),a=t.getNorthEast();return new D(new B(o.lat-i,o.lng-s),new B(a.lat-i,a.lng-s))}},q=n({},j,{wrapLng:[-180,180],R:6371e3,distance:function(t,e){var n=Math.PI/180,i=t.lat*n,s=e.lat*n,o=Math.sin((e.lat-t.lat)*n/2),a=Math.sin((e.lng-t.lng)*n/2),r=o*o+Math.cos(i)*Math.cos(s)*a*a,l=2*Math.atan2(Math.sqrt(r),Math.sqrt(1-r));return this.R*l}}),F=6378137,W={R:F,MAX_LATITUDE:85.0511287798,project:function(t){var e=Math.PI/180,n=this.MAX_LATITUDE,i=Math.max(Math.min(n,t.lat),-n),s=Math.sin(i*e);return new M(this.R*t.lng*e,this.R*Math.log((1+s)/(1-s))/2)},unproject:function(t){var e=180/Math.PI;return new B((2*Math.atan(Math.exp(t.y/this.R))-Math.PI/2)*e,t.x*e/this.R)},bounds:function(){var t=F*Math.PI;return new I([-t,-t],[t,t])}()};function U(t,e,n,i){if(_(t))return this._a=t[0],this._b=t[1],this._c=t[2],void(this._d=t[3]);this._a=t,this._b=e,this._c=n,this._d=i}function G(t,e,n,i){return new U(t,e,n,i)}U.prototype={transform:function(t,e){return this._transform(t.clone(),e)},_transform:function(t,e){return e=e||1,t.x=e*(this._a*t.x+this._b),t.y=e*(this._c*t.y+this._d),t},untransform:function(t,e){return e=e||1,new M((t.x/e-this._b)/this._a,(t.y/e-this._d)/this._c)}};var K=n({},q,{code:"EPSG:3857",projection:W,transformation:function(){var t=.5/(Math.PI*W.R);return G(t,.5,-t,.5)}()}),V=n({},K,{code:"EPSG:900913"});function Y(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function J(t,e){var n,i,s,o,a,r,l="";for(n=0,s=t.length;n<s;n++){for(i=0,o=(a=t[n]).length;i<o;i++)l+=(i?"L":"M")+(r=a[i]).x+" "+r.y;l+=e?Ot.svg?"z":"x":""}return l||"M0 0"}var X,Q=document.documentElement.style,tt="ActiveXObject"in window,et=tt&&!document.addEventListener,nt="msLaunchUri"in navigator&&!("documentMode"in document),it=It("webkit"),st=It("android"),ot=It("android 2")||It("android 3"),at=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),rt=st&&It("Google")&&at<537&&!("AudioNode"in window),lt=!!window.opera,ht=!nt&&It("chrome"),dt=It("gecko")&&!it&&!lt&&!tt,ct=!ht&&It("safari"),ut=It("phantom"),pt="OTransition"in Q,mt=0===navigator.platform.indexOf("Win"),gt=tt&&"transition"in Q,ft="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!ot,_t="MozPerspective"in Q,vt=!window.L_DISABLE_3D&&(gt||ft||_t)&&!pt&&!ut,yt="undefined"!=typeof orientation||It("mobile"),bt=yt&&it,wt=yt&&ft,xt=!window.PointerEvent&&window.MSPointerEvent,kt=!(!window.PointerEvent&&!xt),zt="ontouchstart"in window||!!window.TouchEvent,Pt=!window.L_NO_TOUCH&&(zt||kt),$t=yt&&lt,St=yt&&dt,Lt=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,Tt=function(){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("testPassiveEventSupport",h,e),window.removeEventListener("testPassiveEventSupport",h,e)}catch(t){}return t}(),Ct=!!document.createElement("canvas").getContext,Et=!(!document.createElementNS||!Y("svg").createSVGRect),At=!!Et&&((X=document.createElement("div")).innerHTML="<svg/>","http://www.w3.org/2000/svg"===(X.firstChild&&X.firstChild.namespaceURI)),Mt=!Et&&function(){try{var t=document.createElement("div");t.innerHTML='<v:shape adj="1"/>';var e=t.firstChild;return e.style.behavior="url(#default#VML)",e&&"object"==typeof e.adj}catch(t){return!1}}(),Ht=0===navigator.platform.indexOf("Mac"),Nt=0===navigator.platform.indexOf("Linux");function It(t){return navigator.userAgent.toLowerCase().indexOf(t)>=0}var Ot={ie:tt,ielt9:et,edge:nt,webkit:it,android:st,android23:ot,androidStock:rt,opera:lt,chrome:ht,gecko:dt,safari:ct,phantom:ut,opera12:pt,win:mt,ie3d:gt,webkit3d:ft,gecko3d:_t,any3d:vt,mobile:yt,mobileWebkit:bt,mobileWebkit3d:wt,msPointer:xt,pointer:kt,touch:Pt,touchNative:zt,mobileOpera:$t,mobileGecko:St,retina:Lt,passiveEvents:Tt,canvas:Ct,svg:Et,vml:Mt,inlineSvg:At,mac:Ht,linux:Nt},Dt=Ot.msPointer?"MSPointerDown":"pointerdown",Rt=Ot.msPointer?"MSPointerMove":"pointermove",Bt=Ot.msPointer?"MSPointerUp":"pointerup",Zt=Ot.msPointer?"MSPointerCancel":"pointercancel",jt={touchstart:Dt,touchmove:Rt,touchend:Bt,touchcancel:Zt},qt={touchstart:Qt,touchmove:Xt,touchend:Xt,touchcancel:Xt},Ft={},Wt=!1;function Ut(t,e,n){return"touchstart"===e&&Jt(),qt[e]?(n=qt[e].bind(this,n),t.addEventListener(jt[e],n,!1),n):(console.warn("wrong event specified:",e),h)}function Gt(t,e,n){jt[e]?t.removeEventListener(jt[e],n,!1):console.warn("wrong event specified:",e)}function Kt(t){Ft[t.pointerId]=t}function Vt(t){Ft[t.pointerId]&&(Ft[t.pointerId]=t)}function Yt(t){delete Ft[t.pointerId]}function Jt(){Wt||(document.addEventListener(Dt,Kt,!0),document.addEventListener(Rt,Vt,!0),document.addEventListener(Bt,Yt,!0),document.addEventListener(Zt,Yt,!0),Wt=!0)}function Xt(t,e){if(e.pointerType!==(e.MSPOINTER_TYPE_MOUSE||"mouse")){for(var n in e.touches=[],Ft)e.touches.push(Ft[n]);e.changedTouches=[e],t(e)}}function Qt(t,e){e.MSPOINTER_TYPE_TOUCH&&e.pointerType===e.MSPOINTER_TYPE_TOUCH&&Ke(e),Xt(t,e)}function te(t){var e,n,i={};for(n in t)e=t[n],i[n]=e&&e.bind?e.bind(t):e;return t=i,i.type="dblclick",i.detail=2,i.isTrusted=!1,i._simulated=!0,i}var ee=200;function ne(t,e){t.addEventListener("dblclick",e);var n,i=0;function s(t){if(1===t.detail){if("mouse"!==t.pointerType&&(!t.sourceCapabilities||t.sourceCapabilities.firesTouchEvents)){var s=Ye(t);if(!s.some(function(t){return t instanceof HTMLLabelElement&&t.attributes.for})||s.some(function(t){return t instanceof HTMLInputElement||t instanceof HTMLSelectElement})){var o=Date.now();o-i<=ee?2===++n&&e(te(t)):n=1,i=o}}}else n=t.detail}return t.addEventListener("click",s),{dblclick:e,simDblclick:s}}function ie(t,e){t.removeEventListener("dblclick",e.dblclick),t.removeEventListener("click",e.simDblclick)}var se,oe,ae,re,le,he=$e(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),de=$e(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),ce="webkitTransition"===de||"OTransition"===de?de+"End":"transitionend";function ue(t){return"string"==typeof t?document.getElementById(t):t}function pe(t,e){var n=t.style[e]||t.currentStyle&&t.currentStyle[e];if((!n||"auto"===n)&&document.defaultView){var i=document.defaultView.getComputedStyle(t,null);n=i?i[e]:null}return"auto"===n?null:n}function me(t,e,n){var i=document.createElement(t);return i.className=e||"",n&&n.appendChild(i),i}function ge(t){var e=t.parentNode;e&&e.removeChild(t)}function fe(t){for(;t.firstChild;)t.removeChild(t.firstChild)}function _e(t){var e=t.parentNode;e&&e.lastChild!==t&&e.appendChild(t)}function ve(t){var e=t.parentNode;e&&e.firstChild!==t&&e.insertBefore(t,e.firstChild)}function ye(t,e){if(void 0!==t.classList)return t.classList.contains(e);var n=ke(t);return n.length>0&&new RegExp("(^|\\s)"+e+"(\\s|$)").test(n)}function be(t,e){if(void 0!==t.classList)for(var n=u(e),i=0,s=n.length;i<s;i++)t.classList.add(n[i]);else if(!ye(t,e)){var o=ke(t);xe(t,(o?o+" ":"")+e)}}function we(t,e){void 0!==t.classList?t.classList.remove(e):xe(t,c((" "+ke(t)+" ").replace(" "+e+" "," ")))}function xe(t,e){void 0===t.className.baseVal?t.className=e:t.className.baseVal=e}function ke(t){return t.correspondingElement&&(t=t.correspondingElement),void 0===t.className.baseVal?t.className:t.className.baseVal}function ze(t,e){"opacity"in t.style?t.style.opacity=e:"filter"in t.style&&Pe(t,e)}function Pe(t,e){var n=!1,i="DXImageTransform.Microsoft.Alpha";try{n=t.filters.item(i)}catch(t){if(1===e)return}e=Math.round(100*e),n?(n.Enabled=100!==e,n.Opacity=e):t.style.filter+=" progid:"+i+"(opacity="+e+")"}function $e(t){for(var e=document.documentElement.style,n=0;n<t.length;n++)if(t[n]in e)return t[n];return!1}function Se(t,e,n){var i=e||new M(0,0);t.style[he]=(Ot.ie3d?"translate("+i.x+"px,"+i.y+"px)":"translate3d("+i.x+"px,"+i.y+"px,0)")+(n?" scale("+n+")":"")}function Le(t,e){t._leaflet_pos=e,Ot.any3d?Se(t,e):(t.style.left=e.x+"px",t.style.top=e.y+"px")}function Te(t){return t._leaflet_pos||new M(0,0)}if("onselectstart"in document)se=function(){De(window,"selectstart",Ke)},oe=function(){Be(window,"selectstart",Ke)};else{var Ce=$e(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);se=function(){if(Ce){var t=document.documentElement.style;ae=t[Ce],t[Ce]="none"}},oe=function(){Ce&&(document.documentElement.style[Ce]=ae,ae=void 0)}}function Ee(){De(window,"dragstart",Ke)}function Ae(){Be(window,"dragstart",Ke)}function Me(t){for(;-1===t.tabIndex;)t=t.parentNode;t.style&&(He(),re=t,le=t.style.outlineStyle,t.style.outlineStyle="none",De(window,"keydown",He))}function He(){re&&(re.style.outlineStyle=le,re=void 0,le=void 0,Be(window,"keydown",He))}function Ne(t){do{t=t.parentNode}while(!(t.offsetWidth&&t.offsetHeight||t===document.body));return t}function Ie(t){var e=t.getBoundingClientRect();return{x:e.width/t.offsetWidth||1,y:e.height/t.offsetHeight||1,boundingClientRect:e}}var Oe={__proto__:null,TRANSFORM:he,TRANSITION:de,TRANSITION_END:ce,get:ue,getStyle:pe,create:me,remove:ge,empty:fe,toFront:_e,toBack:ve,hasClass:ye,addClass:be,removeClass:we,setClass:xe,getClass:ke,setOpacity:ze,testProp:$e,setTransform:Se,setPosition:Le,getPosition:Te,get disableTextSelection(){return se},get enableTextSelection(){return oe},disableImageDrag:Ee,enableImageDrag:Ae,preventOutline:Me,restoreOutline:He,getSizedParentNode:Ne,getScale:Ie};function De(t,e,n,i){if(e&&"object"==typeof e)for(var s in e)qe(t,s,e[s],n);else for(var o=0,a=(e=u(e)).length;o<a;o++)qe(t,e[o],n,i);return this}var Re="_leaflet_events";function Be(t,e,n,i){if(1===arguments.length)Ze(t),delete t[Re];else if(e&&"object"==typeof e)for(var s in e)Fe(t,s,e[s],n);else if(e=u(e),2===arguments.length)Ze(t,function(t){return-1!==v(e,t)});else for(var o=0,a=e.length;o<a;o++)Fe(t,e[o],n,i);return this}function Ze(t,e){for(var n in t[Re]){var i=n.split(/\d/)[0];e&&!e(i)||Fe(t,i,null,null,n)}}var je={mouseenter:"mouseover",mouseleave:"mouseout",wheel:!("onwheel"in window)&&"mousewheel"};function qe(t,e,n,i){var s=e+a(n)+(i?"_"+a(i):"");if(t[Re]&&t[Re][s])return this;var o=function(e){return n.call(i||t,e||window.event)},r=o;!Ot.touchNative&&Ot.pointer&&0===e.indexOf("touch")?o=Ut(t,e,o):Ot.touch&&"dblclick"===e?o=ne(t,o):"addEventListener"in t?"touchstart"===e||"touchmove"===e||"wheel"===e||"mousewheel"===e?t.addEventListener(je[e]||e,o,!!Ot.passiveEvents&&{passive:!1}):"mouseenter"===e||"mouseleave"===e?(o=function(e){e=e||window.event,tn(t,e)&&r(e)},t.addEventListener(je[e],o,!1)):t.addEventListener(e,r,!1):t.attachEvent("on"+e,o),t[Re]=t[Re]||{},t[Re][s]=o}function Fe(t,e,n,i,s){s=s||e+a(n)+(i?"_"+a(i):"");var o=t[Re]&&t[Re][s];if(!o)return this;!Ot.touchNative&&Ot.pointer&&0===e.indexOf("touch")?Gt(t,e,o):Ot.touch&&"dblclick"===e?ie(t,o):"removeEventListener"in t?t.removeEventListener(je[e]||e,o,!1):t.detachEvent("on"+e,o),t[Re][s]=null}function We(t){return t.stopPropagation?t.stopPropagation():t.originalEvent?t.originalEvent._stopped=!0:t.cancelBubble=!0,this}function Ue(t){return qe(t,"wheel",We),this}function Ge(t){return De(t,"mousedown touchstart dblclick contextmenu",We),t._leaflet_disable_click=!0,this}function Ke(t){return t.preventDefault?t.preventDefault():t.returnValue=!1,this}function Ve(t){return Ke(t),We(t),this}function Ye(t){if(t.composedPath)return t.composedPath();for(var e=[],n=t.target;n;)e.push(n),n=n.parentNode;return e}function Je(t,e){if(!e)return new M(t.clientX,t.clientY);var n=Ie(e),i=n.boundingClientRect;return new M((t.clientX-i.left)/n.x-e.clientLeft,(t.clientY-i.top)/n.y-e.clientTop)}var Xe=Ot.linux&&Ot.chrome?window.devicePixelRatio:Ot.mac?3*window.devicePixelRatio:window.devicePixelRatio>0?2*window.devicePixelRatio:1;function Qe(t){return Ot.edge?t.wheelDeltaY/2:t.deltaY&&0===t.deltaMode?-t.deltaY/Xe:t.deltaY&&1===t.deltaMode?20*-t.deltaY:t.deltaY&&2===t.deltaMode?60*-t.deltaY:t.deltaX||t.deltaZ?0:t.wheelDelta?(t.wheelDeltaY||t.wheelDelta)/2:t.detail&&Math.abs(t.detail)<32765?20*-t.detail:t.detail?t.detail/-32765*60:0}function tn(t,e){var n=e.relatedTarget;if(!n)return!0;try{for(;n&&n!==t;)n=n.parentNode}catch(t){return!1}return n!==t}var en={__proto__:null,on:De,off:Be,stopPropagation:We,disableScrollPropagation:Ue,disableClickPropagation:Ge,preventDefault:Ke,stop:Ve,getPropagationPath:Ye,getMousePosition:Je,getWheelDelta:Qe,isExternalTarget:tn,addListener:De,removeListener:Be},nn=A.extend({run:function(t,e,n,i){this.stop(),this._el=t,this._inProgress=!0,this._duration=n||.25,this._easeOutPower=1/Math.max(i||.5,.2),this._startPos=Te(t),this._offset=e.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=P(this._animate,this),this._step()},_step:function(t){var e=+new Date-this._startTime,n=1e3*this._duration;e<n?this._runFrame(this._easeOut(e/n),t):(this._runFrame(1),this._complete())},_runFrame:function(t,e){var n=this._startPos.add(this._offset.multiplyBy(t));e&&n._round(),Le(this._el,n),this.fire("step")},_complete:function(){$(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(t){return 1-Math.pow(1-t,this._easeOutPower)}}),sn=A.extend({options:{crs:K,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(t,e){e=p(this,e),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(t),this._initLayout(),this._onResize=s(this._onResize,this),this._initEvents(),e.maxBounds&&this.setMaxBounds(e.maxBounds),void 0!==e.zoom&&(this._zoom=this._limitZoom(e.zoom)),e.center&&void 0!==e.zoom&&this.setView(Z(e.center),e.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=de&&Ot.any3d&&!Ot.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),De(this._proxy,ce,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(t,e,i){return e=void 0===e?this._zoom:this._limitZoom(e),t=this._limitCenter(Z(t),e,this.options.maxBounds),i=i||{},this._stop(),this._loaded&&!i.reset&&!0!==i&&(void 0!==i.animate&&(i.zoom=n({animate:i.animate},i.zoom),i.pan=n({animate:i.animate,duration:i.duration},i.pan)),this._zoom!==e?this._tryAnimatedZoom&&this._tryAnimatedZoom(t,e,i.zoom):this._tryAnimatedPan(t,i.pan))?(clearTimeout(this._sizeTimer),this):(this._resetView(t,e,i.pan&&i.pan.noMoveStart),this)},setZoom:function(t,e){return this._loaded?this.setView(this.getCenter(),t,{zoom:e}):(this._zoom=t,this)},zoomIn:function(t,e){return t=t||(Ot.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+t,e)},zoomOut:function(t,e){return t=t||(Ot.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-t,e)},setZoomAround:function(t,e,n){var i=this.getZoomScale(e),s=this.getSize().divideBy(2),o=(t instanceof M?t:this.latLngToContainerPoint(t)).subtract(s).multiplyBy(1-1/i),a=this.containerPointToLatLng(s.add(o));return this.setView(a,e,{zoom:n})},_getBoundsCenterZoom:function(t,e){e=e||{},t=t.getBounds?t.getBounds():R(t);var n=N(e.paddingTopLeft||e.padding||[0,0]),i=N(e.paddingBottomRight||e.padding||[0,0]),s=this.getBoundsZoom(t,!1,n.add(i));if((s="number"==typeof e.maxZoom?Math.min(e.maxZoom,s):s)===1/0)return{center:t.getCenter(),zoom:s};var o=i.subtract(n).divideBy(2),a=this.project(t.getSouthWest(),s),r=this.project(t.getNorthEast(),s);return{center:this.unproject(a.add(r).divideBy(2).add(o),s),zoom:s}},fitBounds:function(t,e){if(!(t=R(t)).isValid())throw new Error("Bounds are not valid.");var n=this._getBoundsCenterZoom(t,e);return this.setView(n.center,n.zoom,e)},fitWorld:function(t){return this.fitBounds([[-90,-180],[90,180]],t)},panTo:function(t,e){return this.setView(t,this._zoom,{pan:e})},panBy:function(t,e){if(e=e||{},!(t=N(t).round()).x&&!t.y)return this.fire("moveend");if(!0!==e.animate&&!this.getSize().contains(t))return this._resetView(this.unproject(this.project(this.getCenter()).add(t)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new nn,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),e.noMoveStart||this.fire("movestart"),!1!==e.animate){be(this._mapPane,"leaflet-pan-anim");var n=this._getMapPanePos().subtract(t).round();this._panAnim.run(this._mapPane,n,e.duration||.25,e.easeLinearity)}else this._rawPanBy(t),this.fire("move").fire("moveend");return this},flyTo:function(t,e,n){if(!1===(n=n||{}).animate||!Ot.any3d)return this.setView(t,e,n);this._stop();var i=this.project(this.getCenter()),s=this.project(t),o=this.getSize(),a=this._zoom;t=Z(t),e=void 0===e?a:e;var r=Math.max(o.x,o.y),l=r*this.getZoomScale(a,e),h=s.distanceTo(i)||1,d=1.42,c=d*d;function u(t){var e=(l*l-r*r+(t?-1:1)*c*c*h*h)/(2*(t?l:r)*c*h),n=Math.sqrt(e*e+1)-e;return n<1e-9?-18:Math.log(n)}function p(t){return(Math.exp(t)-Math.exp(-t))/2}function m(t){return(Math.exp(t)+Math.exp(-t))/2}function g(t){return p(t)/m(t)}var f=u(0);function _(t){return r*(m(f)/m(f+d*t))}function v(t){return r*(m(f)*g(f+d*t)-p(f))/c}function y(t){return 1-Math.pow(1-t,1.5)}var b=Date.now(),w=(u(1)-f)/d,x=n.duration?1e3*n.duration:1e3*w*.8;function k(){var n=(Date.now()-b)/x,o=y(n)*w;n<=1?(this._flyToFrame=P(k,this),this._move(this.unproject(i.add(s.subtract(i).multiplyBy(v(o)/h)),a),this.getScaleZoom(r/_(o),a),{flyTo:!0})):this._move(t,e)._moveEnd(!0)}return this._moveStart(!0,n.noMoveStart),k.call(this),this},flyToBounds:function(t,e){var n=this._getBoundsCenterZoom(t,e);return this.flyTo(n.center,n.zoom,e)},setMaxBounds:function(t){return t=R(t),this.listens("moveend",this._panInsideMaxBounds)&&this.off("moveend",this._panInsideMaxBounds),t.isValid()?(this.options.maxBounds=t,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this)},setMinZoom:function(t){var e=this.options.minZoom;return this.options.minZoom=t,this._loaded&&e!==t&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(t):this},setMaxZoom:function(t){var e=this.options.maxZoom;return this.options.maxZoom=t,this._loaded&&e!==t&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(t):this},panInsideBounds:function(t,e){this._enforcingBounds=!0;var n=this.getCenter(),i=this._limitCenter(n,this._zoom,R(t));return n.equals(i)||this.panTo(i,e),this._enforcingBounds=!1,this},panInside:function(t,e){var n=N((e=e||{}).paddingTopLeft||e.padding||[0,0]),i=N(e.paddingBottomRight||e.padding||[0,0]),s=this.project(this.getCenter()),o=this.project(t),a=this.getPixelBounds(),r=O([a.min.add(n),a.max.subtract(i)]),l=r.getSize();if(!r.contains(o)){this._enforcingBounds=!0;var h=o.subtract(r.getCenter()),d=r.extend(o).getSize().subtract(l);s.x+=h.x<0?-d.x:d.x,s.y+=h.y<0?-d.y:d.y,this.panTo(this.unproject(s),e),this._enforcingBounds=!1}return this},invalidateSize:function(t){if(!this._loaded)return this;t=n({animate:!1,pan:!0},!0===t?{animate:!0}:t);var e=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var i=this.getSize(),o=e.divideBy(2).round(),a=i.divideBy(2).round(),r=o.subtract(a);return r.x||r.y?(t.animate&&t.pan?this.panBy(r):(t.pan&&this._rawPanBy(r),this.fire("move"),t.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(s(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:e,newSize:i})):this},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(t){if(t=this._locateOptions=n({timeout:1e4,watch:!1},t),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var e=s(this._handleGeolocationResponse,this),i=s(this._handleGeolocationError,this);return t.watch?this._locationWatchId=navigator.geolocation.watchPosition(e,i,t):navigator.geolocation.getCurrentPosition(e,i,t),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(t){if(this._container._leaflet_id){var e=t.code,n=t.message||(1===e?"permission denied":2===e?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:e,message:"Geolocation error: "+n+"."})}},_handleGeolocationResponse:function(t){if(this._container._leaflet_id){var e=new B(t.coords.latitude,t.coords.longitude),n=e.toBounds(2*t.coords.accuracy),i=this._locateOptions;if(i.setView){var s=this.getBoundsZoom(n);this.setView(e,i.maxZoom?Math.min(s,i.maxZoom):s)}var o={latlng:e,bounds:n,timestamp:t.timestamp};for(var a in t.coords)"number"==typeof t.coords[a]&&(o[a]=t.coords[a]);this.fire("locationfound",o)}},addHandler:function(t,e){if(!e)return this;var n=this[t]=new e(this);return this._handlers.push(n),this.options[t]&&n.enable(),this},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch(t){this._container._leaflet_id=void 0,this._containerId=void 0}var t;for(t in void 0!==this._locationWatchId&&this.stopLocate(),this._stop(),ge(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&($(this._resizeRequest),this._resizeRequest=null),this._clearHandlers(),this._loaded&&this.fire("unload"),this._layers)this._layers[t].remove();for(t in this._panes)ge(this._panes[t]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(t,e){var n=me("div","leaflet-pane"+(t?" leaflet-"+t.replace("Pane","")+"-pane":""),e||this._mapPane);return t&&(this._panes[t]=n),n},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var t=this.getPixelBounds();return new D(this.unproject(t.getBottomLeft()),this.unproject(t.getTopRight()))},getMinZoom:function(){return void 0===this.options.minZoom?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return void 0===this.options.maxZoom?void 0===this._layersMaxZoom?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(t,e,n){t=R(t),n=N(n||[0,0]);var i=this.getZoom()||0,s=this.getMinZoom(),o=this.getMaxZoom(),a=t.getNorthWest(),r=t.getSouthEast(),l=this.getSize().subtract(n),h=O(this.project(r,i),this.project(a,i)).getSize(),d=Ot.any3d?this.options.zoomSnap:1,c=l.x/h.x,u=l.y/h.y,p=e?Math.max(c,u):Math.min(c,u);return i=this.getScaleZoom(p,i),d&&(i=Math.round(i/(d/100))*(d/100),i=e?Math.ceil(i/d)*d:Math.floor(i/d)*d),Math.max(s,Math.min(o,i))},getSize:function(){return this._size&&!this._sizeChanged||(this._size=new M(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(t,e){var n=this._getTopLeftPoint(t,e);return new I(n,n.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(t){return this.options.crs.getProjectedBounds(void 0===t?this.getZoom():t)},getPane:function(t){return"string"==typeof t?this._panes[t]:t},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(t,e){var n=this.options.crs;return e=void 0===e?this._zoom:e,n.scale(t)/n.scale(e)},getScaleZoom:function(t,e){var n=this.options.crs;e=void 0===e?this._zoom:e;var i=n.zoom(t*n.scale(e));return isNaN(i)?1/0:i},project:function(t,e){return e=void 0===e?this._zoom:e,this.options.crs.latLngToPoint(Z(t),e)},unproject:function(t,e){return e=void 0===e?this._zoom:e,this.options.crs.pointToLatLng(N(t),e)},layerPointToLatLng:function(t){var e=N(t).add(this.getPixelOrigin());return this.unproject(e)},latLngToLayerPoint:function(t){return this.project(Z(t))._round()._subtract(this.getPixelOrigin())},wrapLatLng:function(t){return this.options.crs.wrapLatLng(Z(t))},wrapLatLngBounds:function(t){return this.options.crs.wrapLatLngBounds(R(t))},distance:function(t,e){return this.options.crs.distance(Z(t),Z(e))},containerPointToLayerPoint:function(t){return N(t).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(t){return N(t).add(this._getMapPanePos())},containerPointToLatLng:function(t){var e=this.containerPointToLayerPoint(N(t));return this.layerPointToLatLng(e)},latLngToContainerPoint:function(t){return this.layerPointToContainerPoint(this.latLngToLayerPoint(Z(t)))},mouseEventToContainerPoint:function(t){return Je(t,this._container)},mouseEventToLayerPoint:function(t){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))},mouseEventToLatLng:function(t){return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))},_initContainer:function(t){var e=this._container=ue(t);if(!e)throw new Error("Map container not found.");if(e._leaflet_id)throw new Error("Map container is already initialized.");De(e,"scroll",this._onScroll,this),this._containerId=a(e)},_initLayout:function(){var t=this._container;this._fadeAnimated=this.options.fadeAnimation&&Ot.any3d,be(t,"leaflet-container"+(Ot.touch?" leaflet-touch":"")+(Ot.retina?" leaflet-retina":"")+(Ot.ielt9?" leaflet-oldie":"")+(Ot.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var e=pe(t,"position");"absolute"!==e&&"relative"!==e&&"fixed"!==e&&"sticky"!==e&&(t.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var t=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),Le(this._mapPane,new M(0,0)),this.createPane("tilePane"),this.createPane("overlayPane"),this.createPane("shadowPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(be(t.markerPane,"leaflet-zoom-hide"),be(t.shadowPane,"leaflet-zoom-hide"))},_resetView:function(t,e,n){Le(this._mapPane,new M(0,0));var i=!this._loaded;this._loaded=!0,e=this._limitZoom(e),this.fire("viewprereset");var s=this._zoom!==e;this._moveStart(s,n)._move(t,e)._moveEnd(s),this.fire("viewreset"),i&&this.fire("load")},_moveStart:function(t,e){return t&&this.fire("zoomstart"),e||this.fire("movestart"),this},_move:function(t,e,n,i){void 0===e&&(e=this._zoom);var s=this._zoom!==e;return this._zoom=e,this._lastCenter=t,this._pixelOrigin=this._getNewPixelOrigin(t),i?n&&n.pinch&&this.fire("zoom",n):((s||n&&n.pinch)&&this.fire("zoom",n),this.fire("move",n)),this},_moveEnd:function(t){return t&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return $(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(t){Le(this._mapPane,this._getMapPanePos().subtract(t))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(t){this._targets={},this._targets[a(this._container)]=this;var e=t?Be:De;e(this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",this._handleDOMEvent,this),this.options.trackResize&&e(window,"resize",this._onResize,this),Ot.any3d&&this.options.transform3DLimit&&(t?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){$(this._resizeRequest),this._resizeRequest=P(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var t=this._getMapPanePos();Math.max(Math.abs(t.x),Math.abs(t.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(t,e){for(var n,i=[],s="mouseout"===e||"mouseover"===e,o=t.target||t.srcElement,r=!1;o;){if((n=this._targets[a(o)])&&("click"===e||"preclick"===e)&&this._draggableMoved(n)){r=!0;break}if(n&&n.listens(e,!0)){if(s&&!tn(o,t))break;if(i.push(n),s)break}if(o===this._container)break;o=o.parentNode}return i.length||r||s||!this.listens(e,!0)||(i=[this]),i},_isClickDisabled:function(t){for(;t&&t!==this._container;){if(t._leaflet_disable_click)return!0;t=t.parentNode}},_handleDOMEvent:function(t){var e=t.target||t.srcElement;if(!(!this._loaded||e._leaflet_disable_events||"click"===t.type&&this._isClickDisabled(e))){var n=t.type;"mousedown"===n&&Me(e),this._fireDOMEvent(t,n)}},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(t,e,i){if("click"===t.type){var s=n({},t);s.type="preclick",this._fireDOMEvent(s,s.type,i)}var o=this._findEventTargets(t,e);if(i){for(var a=[],r=0;r<i.length;r++)i[r].listens(e,!0)&&a.push(i[r]);o=a.concat(o)}if(o.length){"contextmenu"===e&&Ke(t);var l=o[0],h={originalEvent:t};if("keypress"!==t.type&&"keydown"!==t.type&&"keyup"!==t.type){var d=l.getLatLng&&(!l._radius||l._radius<=10);h.containerPoint=d?this.latLngToContainerPoint(l.getLatLng()):this.mouseEventToContainerPoint(t),h.layerPoint=this.containerPointToLayerPoint(h.containerPoint),h.latlng=d?l.getLatLng():this.layerPointToLatLng(h.layerPoint)}for(r=0;r<o.length;r++)if(o[r].fire(e,h,!0),h.originalEvent._stopped||!1===o[r].options.bubblingMouseEvents&&-1!==v(this._mouseEvents,e))return}},_draggableMoved:function(t){return(t=t.dragging&&t.dragging.enabled()?t:this).dragging&&t.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var t=0,e=this._handlers.length;t<e;t++)this._handlers[t].disable()},whenReady:function(t,e){return this._loaded?t.call(e||this,{target:this}):this.on("load",t,e),this},_getMapPanePos:function(){return Te(this._mapPane)||new M(0,0)},_moved:function(){var t=this._getMapPanePos();return t&&!t.equals([0,0])},_getTopLeftPoint:function(t,e){return(t&&void 0!==e?this._getNewPixelOrigin(t,e):this.getPixelOrigin()).subtract(this._getMapPanePos())},_getNewPixelOrigin:function(t,e){var n=this.getSize()._divideBy(2);return this.project(t,e)._subtract(n)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(t,e,n){var i=this._getNewPixelOrigin(n,e);return this.project(t,e)._subtract(i)},_latLngBoundsToNewLayerBounds:function(t,e,n){var i=this._getNewPixelOrigin(n,e);return O([this.project(t.getSouthWest(),e)._subtract(i),this.project(t.getNorthWest(),e)._subtract(i),this.project(t.getSouthEast(),e)._subtract(i),this.project(t.getNorthEast(),e)._subtract(i)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(t){return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())},_limitCenter:function(t,e,n){if(!n)return t;var i=this.project(t,e),s=this.getSize().divideBy(2),o=new I(i.subtract(s),i.add(s)),a=this._getBoundsOffset(o,n,e);return Math.abs(a.x)<=1&&Math.abs(a.y)<=1?t:this.unproject(i.add(a),e)},_limitOffset:function(t,e){if(!e)return t;var n=this.getPixelBounds(),i=new I(n.min.add(t),n.max.add(t));return t.add(this._getBoundsOffset(i,e))},_getBoundsOffset:function(t,e,n){var i=O(this.project(e.getNorthEast(),n),this.project(e.getSouthWest(),n)),s=i.min.subtract(t.min),o=i.max.subtract(t.max);return new M(this._rebound(s.x,-o.x),this._rebound(s.y,-o.y))},_rebound:function(t,e){return t+e>0?Math.round(t-e)/2:Math.max(0,Math.ceil(t))-Math.max(0,Math.floor(e))},_limitZoom:function(t){var e=this.getMinZoom(),n=this.getMaxZoom(),i=Ot.any3d?this.options.zoomSnap:1;return i&&(t=Math.round(t/i)*i),Math.max(e,Math.min(n,t))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){we(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(t,e){var n=this._getCenterOffset(t)._trunc();return!(!0!==(e&&e.animate)&&!this.getSize().contains(n)||(this.panBy(n,e),0))},_createAnimProxy:function(){var t=this._proxy=me("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(t),this.on("zoomanim",function(t){var e=he,n=this._proxy.style[e];Se(this._proxy,this.project(t.center,t.zoom),this.getZoomScale(t.zoom,1)),n===this._proxy.style[e]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",this._animMoveEnd,this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){ge(this._proxy),this.off("load moveend",this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var t=this.getCenter(),e=this.getZoom();Se(this._proxy,this.project(t,e),this.getZoomScale(e,1))},_catchTransitionEnd:function(t){this._animatingZoom&&t.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(t,e,n){if(this._animatingZoom)return!0;if(n=n||{},!this._zoomAnimated||!1===n.animate||this._nothingToAnimate()||Math.abs(e-this._zoom)>this.options.zoomAnimationThreshold)return!1;var i=this.getZoomScale(e),s=this._getCenterOffset(t)._divideBy(1-1/i);return!(!0!==n.animate&&!this.getSize().contains(s)||(P(function(){this._moveStart(!0,n.noMoveStart||!1)._animateZoom(t,e,!0)},this),0))},_animateZoom:function(t,e,n,i){this._mapPane&&(n&&(this._animatingZoom=!0,this._animateToCenter=t,this._animateToZoom=e,be(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:t,zoom:e,noUpdate:i}),this._tempFireZoomEvent||(this._tempFireZoomEvent=this._zoom!==this._animateToZoom),this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(s(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&we(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire("zoom"),delete this._tempFireZoomEvent,this.fire("move"),this._moveEnd(!0))}});function on(t,e){return new sn(t,e)}var an=T.extend({options:{position:"topright"},initialize:function(t){p(this,t)},getPosition:function(){return this.options.position},setPosition:function(t){var e=this._map;return e&&e.removeControl(this),this.options.position=t,e&&e.addControl(this),this},getContainer:function(){return this._container},addTo:function(t){this.remove(),this._map=t;var e=this._container=this.onAdd(t),n=this.getPosition(),i=t._controlCorners[n];return be(e,"leaflet-control"),-1!==n.indexOf("bottom")?i.insertBefore(e,i.firstChild):i.appendChild(e),this._map.on("unload",this.remove,this),this},remove:function(){return this._map?(ge(this._container),this.onRemove&&this.onRemove(this._map),this._map.off("unload",this.remove,this),this._map=null,this):this},_refocusOnMap:function(t){this._map&&t&&t.screenX>0&&t.screenY>0&&this._map.getContainer().focus()}}),rn=function(t){return new an(t)};sn.include({addControl:function(t){return t.addTo(this),this},removeControl:function(t){return t.remove(),this},_initControlPos:function(){var t=this._controlCorners={},e="leaflet-",n=this._controlContainer=me("div",e+"control-container",this._container);function i(i,s){var o=e+i+" "+e+s;t[i+s]=me("div",o,n)}i("top","left"),i("top","right"),i("bottom","left"),i("bottom","right")},_clearControlPos:function(){for(var t in this._controlCorners)ge(this._controlCorners[t]);ge(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var ln=an.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(t,e,n,i){return n<i?-1:i<n?1:0}},initialize:function(t,e,n){for(var i in p(this,n),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,this._preventClick=!1,t)this._addLayer(t[i],i);for(i in e)this._addLayer(e[i],i,!0)},onAdd:function(t){this._initLayout(),this._update(),this._map=t,t.on("zoomend",this._checkDisabledLayers,this);for(var e=0;e<this._layers.length;e++)this._layers[e].layer.on("add remove",this._onLayerChange,this);return this._container},addTo:function(t){return an.prototype.addTo.call(this,t),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var t=0;t<this._layers.length;t++)this._layers[t].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(t,e){return this._addLayer(t,e),this._map?this._update():this},addOverlay:function(t,e){return this._addLayer(t,e,!0),this._map?this._update():this},removeLayer:function(t){t.off("add remove",this._onLayerChange,this);var e=this._getLayer(a(t));return e&&this._layers.splice(this._layers.indexOf(e),1),this._map?this._update():this},expand:function(){be(this._container,"leaflet-control-layers-expanded"),this._section.style.height=null;var t=this._map.getSize().y-(this._container.offsetTop+50);return t<this._section.clientHeight?(be(this._section,"leaflet-control-layers-scrollbar"),this._section.style.height=t+"px"):we(this._section,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return we(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var t="leaflet-control-layers",e=this._container=me("div",t),n=this.options.collapsed;e.setAttribute("aria-haspopup",!0),Ge(e),Ue(e);var i=this._section=me("section",t+"-list");n&&(this._map.on("click",this.collapse,this),De(e,{mouseenter:this._expandSafely,mouseleave:this.collapse},this));var s=this._layersLink=me("a",t+"-toggle",e);s.href="#",s.title="Layers",s.setAttribute("role","button"),De(s,{keydown:function(t){13===t.keyCode&&this._expandSafely()},click:function(t){Ke(t),this._expandSafely()}},this),n||this.expand(),this._baseLayersList=me("div",t+"-base",i),this._separator=me("div",t+"-separator",i),this._overlaysList=me("div",t+"-overlays",i),e.appendChild(i)},_getLayer:function(t){for(var e=0;e<this._layers.length;e++)if(this._layers[e]&&a(this._layers[e].layer)===t)return this._layers[e]},_addLayer:function(t,e,n){this._map&&t.on("add remove",this._onLayerChange,this),this._layers.push({layer:t,name:e,overlay:n}),this.options.sortLayers&&this._layers.sort(s(function(t,e){return this.options.sortFunction(t.layer,e.layer,t.name,e.name)},this)),this.options.autoZIndex&&t.setZIndex&&(this._lastZIndex++,t.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;fe(this._baseLayersList),fe(this._overlaysList),this._layerControlInputs=[];var t,e,n,i,s=0;for(n=0;n<this._layers.length;n++)i=this._layers[n],this._addItem(i),e=e||i.overlay,t=t||!i.overlay,s+=i.overlay?0:1;return this.options.hideSingleBase&&(t=t&&s>1,this._baseLayersList.style.display=t?"":"none"),this._separator.style.display=e&&t?"":"none",this},_onLayerChange:function(t){this._handlingClick||this._update();var e=this._getLayer(a(t.target)),n=e.overlay?"add"===t.type?"overlayadd":"overlayremove":"add"===t.type?"baselayerchange":null;n&&this._map.fire(n,e)},_createRadioElement:function(t,e){var n='<input type="radio" class="leaflet-control-layers-selector" name="'+t+'"'+(e?' checked="checked"':"")+"/>",i=document.createElement("div");return i.innerHTML=n,i.firstChild},_addItem:function(t){var e,n=document.createElement("label"),i=this._map.hasLayer(t.layer);t.overlay?((e=document.createElement("input")).type="checkbox",e.className="leaflet-control-layers-selector",e.defaultChecked=i):e=this._createRadioElement("leaflet-base-layers_"+a(this),i),this._layerControlInputs.push(e),e.layerId=a(t.layer),De(e,"click",this._onInputClick,this);var s=document.createElement("span");s.innerHTML=" "+t.name;var o=document.createElement("span");return n.appendChild(o),o.appendChild(e),o.appendChild(s),(t.overlay?this._overlaysList:this._baseLayersList).appendChild(n),this._checkDisabledLayers(),n},_onInputClick:function(){if(!this._preventClick){var t,e,n=this._layerControlInputs,i=[],s=[];this._handlingClick=!0;for(var o=n.length-1;o>=0;o--)t=n[o],e=this._getLayer(t.layerId).layer,t.checked?i.push(e):t.checked||s.push(e);for(o=0;o<s.length;o++)this._map.hasLayer(s[o])&&this._map.removeLayer(s[o]);for(o=0;o<i.length;o++)this._map.hasLayer(i[o])||this._map.addLayer(i[o]);this._handlingClick=!1,this._refocusOnMap()}},_checkDisabledLayers:function(){for(var t,e,n=this._layerControlInputs,i=this._map.getZoom(),s=n.length-1;s>=0;s--)t=n[s],e=this._getLayer(t.layerId).layer,t.disabled=void 0!==e.options.minZoom&&i<e.options.minZoom||void 0!==e.options.maxZoom&&i>e.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expandSafely:function(){var t=this._section;this._preventClick=!0,De(t,"click",Ke),this.expand();var e=this;setTimeout(function(){Be(t,"click",Ke),e._preventClick=!1})}}),hn=function(t,e,n){return new ln(t,e,n)},dn=an.extend({options:{position:"topleft",zoomInText:'<span aria-hidden="true">+</span>',zoomInTitle:"Zoom in",zoomOutText:'<span aria-hidden="true">&#x2212;</span>',zoomOutTitle:"Zoom out"},onAdd:function(t){var e="leaflet-control-zoom",n=me("div",e+" leaflet-bar"),i=this.options;return this._zoomInButton=this._createButton(i.zoomInText,i.zoomInTitle,e+"-in",n,this._zoomIn),this._zoomOutButton=this._createButton(i.zoomOutText,i.zoomOutTitle,e+"-out",n,this._zoomOut),this._updateDisabled(),t.on("zoomend zoomlevelschange",this._updateDisabled,this),n},onRemove:function(t){t.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(t){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(t.shiftKey?3:1))},_zoomOut:function(t){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(t.shiftKey?3:1))},_createButton:function(t,e,n,i,s){var o=me("a",n,i);return o.innerHTML=t,o.href="#",o.title=e,o.setAttribute("role","button"),o.setAttribute("aria-label",e),Ge(o),De(o,"click",Ve),De(o,"click",s,this),De(o,"click",this._refocusOnMap,this),o},_updateDisabled:function(){var t=this._map,e="leaflet-disabled";we(this._zoomInButton,e),we(this._zoomOutButton,e),this._zoomInButton.setAttribute("aria-disabled","false"),this._zoomOutButton.setAttribute("aria-disabled","false"),(this._disabled||t._zoom===t.getMinZoom())&&(be(this._zoomOutButton,e),this._zoomOutButton.setAttribute("aria-disabled","true")),(this._disabled||t._zoom===t.getMaxZoom())&&(be(this._zoomInButton,e),this._zoomInButton.setAttribute("aria-disabled","true"))}});sn.mergeOptions({zoomControl:!0}),sn.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new dn,this.addControl(this.zoomControl))});var cn=function(t){return new dn(t)},un=an.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(t){var e="leaflet-control-scale",n=me("div",e),i=this.options;return this._addScales(i,e+"-line",n),t.on(i.updateWhenIdle?"moveend":"move",this._update,this),t.whenReady(this._update,this),n},onRemove:function(t){t.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(t,e,n){t.metric&&(this._mScale=me("div",e,n)),t.imperial&&(this._iScale=me("div",e,n))},_update:function(){var t=this._map,e=t.getSize().y/2,n=t.distance(t.containerPointToLatLng([0,e]),t.containerPointToLatLng([this.options.maxWidth,e]));this._updateScales(n)},_updateScales:function(t){this.options.metric&&t&&this._updateMetric(t),this.options.imperial&&t&&this._updateImperial(t)},_updateMetric:function(t){var e=this._getRoundNum(t),n=e<1e3?e+" m":e/1e3+" km";this._updateScale(this._mScale,n,e/t)},_updateImperial:function(t){var e,n,i,s=3.2808399*t;s>5280?(e=s/5280,n=this._getRoundNum(e),this._updateScale(this._iScale,n+" mi",n/e)):(i=this._getRoundNum(s),this._updateScale(this._iScale,i+" ft",i/s))},_updateScale:function(t,e,n){t.style.width=Math.round(this.options.maxWidth*n)+"px",t.innerHTML=e},_getRoundNum:function(t){var e=Math.pow(10,(Math.floor(t)+"").length-1),n=t/e;return e*(n=n>=10?10:n>=5?5:n>=3?3:n>=2?2:1)}}),pn=function(t){return new un(t)},mn='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',gn=an.extend({options:{position:"bottomright",prefix:'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">'+(Ot.inlineSvg?mn+" ":"")+"Leaflet</a>"},initialize:function(t){p(this,t),this._attributions={}},onAdd:function(t){for(var e in t.attributionControl=this,this._container=me("div","leaflet-control-attribution"),Ge(this._container),t._layers)t._layers[e].getAttribution&&this.addAttribution(t._layers[e].getAttribution());return this._update(),t.on("layeradd",this._addAttribution,this),this._container},onRemove:function(t){t.off("layeradd",this._addAttribution,this)},_addAttribution:function(t){t.layer.getAttribution&&(this.addAttribution(t.layer.getAttribution()),t.layer.once("remove",function(){this.removeAttribution(t.layer.getAttribution())},this))},setPrefix:function(t){return this.options.prefix=t,this._update(),this},addAttribution:function(t){return t?(this._attributions[t]||(this._attributions[t]=0),this._attributions[t]++,this._update(),this):this},removeAttribution:function(t){return t?(this._attributions[t]&&(this._attributions[t]--,this._update()),this):this},_update:function(){if(this._map){var t=[];for(var e in this._attributions)this._attributions[e]&&t.push(e);var n=[];this.options.prefix&&n.push(this.options.prefix),t.length&&n.push(t.join(", ")),this._container.innerHTML=n.join(' <span aria-hidden="true">|</span> ')}}});sn.mergeOptions({attributionControl:!0}),sn.addInitHook(function(){this.options.attributionControl&&(new gn).addTo(this)});var fn=function(t){return new gn(t)};an.Layers=ln,an.Zoom=dn,an.Scale=un,an.Attribution=gn,rn.layers=hn,rn.zoom=cn,rn.scale=pn,rn.attribution=fn;var _n=T.extend({initialize:function(t){this._map=t},enable:function(){return this._enabled||(this._enabled=!0,this.addHooks()),this},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}});_n.addTo=function(t,e){return t.addHandler(e,this),this};var vn={Events:E},yn=Ot.touch?"touchstart mousedown":"mousedown",bn=A.extend({options:{clickTolerance:3},initialize:function(t,e,n,i){p(this,i),this._element=t,this._dragStartTarget=e||t,this._preventOutline=n},enable:function(){this._enabled||(De(this._dragStartTarget,yn,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(bn._dragging===this&&this.finishDrag(!0),Be(this._dragStartTarget,yn,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(t){if(this._enabled&&(this._moved=!1,!ye(this._element,"leaflet-zoom-anim")))if(t.touches&&1!==t.touches.length)bn._dragging===this&&this.finishDrag();else if(!(bn._dragging||t.shiftKey||1!==t.which&&1!==t.button&&!t.touches||(bn._dragging=this,this._preventOutline&&Me(this._element),Ee(),se(),this._moving))){this.fire("down");var e=t.touches?t.touches[0]:t,n=Ne(this._element);this._startPoint=new M(e.clientX,e.clientY),this._startPos=Te(this._element),this._parentScale=Ie(n);var i="mousedown"===t.type;De(document,i?"mousemove":"touchmove",this._onMove,this),De(document,i?"mouseup":"touchend touchcancel",this._onUp,this)}},_onMove:function(t){if(this._enabled)if(t.touches&&t.touches.length>1)this._moved=!0;else{var e=t.touches&&1===t.touches.length?t.touches[0]:t,n=new M(e.clientX,e.clientY)._subtract(this._startPoint);(n.x||n.y)&&(Math.abs(n.x)+Math.abs(n.y)<this.options.clickTolerance||(n.x/=this._parentScale.x,n.y/=this._parentScale.y,Ke(t),this._moved||(this.fire("dragstart"),this._moved=!0,be(document.body,"leaflet-dragging"),this._lastTarget=t.target||t.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),be(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(n),this._moving=!0,this._lastEvent=t,this._updatePosition()))}},_updatePosition:function(){var t={originalEvent:this._lastEvent};this.fire("predrag",t),Le(this._element,this._newPos),this.fire("drag",t)},_onUp:function(){this._enabled&&this.finishDrag()},finishDrag:function(t){we(document.body,"leaflet-dragging"),this._lastTarget&&(we(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),Be(document,"mousemove touchmove",this._onMove,this),Be(document,"mouseup touchend touchcancel",this._onUp,this),Ae(),oe();var e=this._moved&&this._moving;this._moving=!1,bn._dragging=!1,e&&this.fire("dragend",{noInertia:t,distance:this._newPos.distanceTo(this._startPos)})}});function wn(t,e,n){var i,s,o,a,r,l,h,d,c,u=[1,4,2,8];for(s=0,h=t.length;s<h;s++)t[s]._code=Hn(t[s],e);for(a=0;a<4;a++){for(d=u[a],i=[],s=0,o=(h=t.length)-1;s<h;o=s++)r=t[s],l=t[o],r._code&d?l._code&d||((c=Mn(l,r,d,e,n))._code=Hn(c,e),i.push(c)):(l._code&d&&((c=Mn(l,r,d,e,n))._code=Hn(c,e),i.push(c)),i.push(r));t=i}return t}function xn(t,e){var n,i,s,o,a,r,l,h,d;if(!t||0===t.length)throw new Error("latlngs not passed");On(t)||(console.warn("latlngs are not flat! Only the first ring will be used"),t=t[0]);var c=Z([0,0]),u=R(t);u.getNorthWest().distanceTo(u.getSouthWest())*u.getNorthEast().distanceTo(u.getNorthWest())<1700&&(c=kn(t));var p=t.length,m=[];for(n=0;n<p;n++){var g=Z(t[n]);m.push(e.project(Z([g.lat-c.lat,g.lng-c.lng])))}for(r=l=h=0,n=0,i=p-1;n<p;i=n++)s=m[n],o=m[i],a=s.y*o.x-o.y*s.x,l+=(s.x+o.x)*a,h+=(s.y+o.y)*a,r+=3*a;d=0===r?m[0]:[l/r,h/r];var f=e.unproject(N(d));return Z([f.lat+c.lat,f.lng+c.lng])}function kn(t){for(var e=0,n=0,i=0,s=0;s<t.length;s++){var o=Z(t[s]);e+=o.lat,n+=o.lng,i++}return Z([e/i,n/i])}var zn,Pn={__proto__:null,clipPolygon:wn,polygonCenter:xn,centroid:kn};function $n(t,e){if(!e||!t.length)return t.slice();var n=e*e;return t=Tn(t=En(t,n),n)}function Sn(t,e,n){return Math.sqrt(In(t,e,n,!0))}function Ln(t,e,n){return In(t,e,n)}function Tn(t,e){var n=t.length,i=new(typeof Uint8Array!=void 0+""?Uint8Array:Array)(n);i[0]=i[n-1]=1,Cn(t,i,e,0,n-1);var s,o=[];for(s=0;s<n;s++)i[s]&&o.push(t[s]);return o}function Cn(t,e,n,i,s){var o,a,r,l=0;for(a=i+1;a<=s-1;a++)(r=In(t[a],t[i],t[s],!0))>l&&(o=a,l=r);l>n&&(e[o]=1,Cn(t,e,n,i,o),Cn(t,e,n,o,s))}function En(t,e){for(var n=[t[0]],i=1,s=0,o=t.length;i<o;i++)Nn(t[i],t[s])>e&&(n.push(t[i]),s=i);return s<o-1&&n.push(t[o-1]),n}function An(t,e,n,i,s){var o,a,r,l=i?zn:Hn(t,n),h=Hn(e,n);for(zn=h;;){if(!(l|h))return[t,e];if(l&h)return!1;r=Hn(a=Mn(t,e,o=l||h,n,s),n),o===l?(t=a,l=r):(e=a,h=r)}}function Mn(t,e,n,i,s){var o,a,r=e.x-t.x,l=e.y-t.y,h=i.min,d=i.max;return 8&n?(o=t.x+r*(d.y-t.y)/l,a=d.y):4&n?(o=t.x+r*(h.y-t.y)/l,a=h.y):2&n?(o=d.x,a=t.y+l*(d.x-t.x)/r):1&n&&(o=h.x,a=t.y+l*(h.x-t.x)/r),new M(o,a,s)}function Hn(t,e){var n=0;return t.x<e.min.x?n|=1:t.x>e.max.x&&(n|=2),t.y<e.min.y?n|=4:t.y>e.max.y&&(n|=8),n}function Nn(t,e){var n=e.x-t.x,i=e.y-t.y;return n*n+i*i}function In(t,e,n,i){var s,o=e.x,a=e.y,r=n.x-o,l=n.y-a,h=r*r+l*l;return h>0&&((s=((t.x-o)*r+(t.y-a)*l)/h)>1?(o=n.x,a=n.y):s>0&&(o+=r*s,a+=l*s)),r=t.x-o,l=t.y-a,i?r*r+l*l:new M(o,a)}function On(t){return!_(t[0])||"object"!=typeof t[0][0]&&void 0!==t[0][0]}function Dn(t){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),On(t)}function Rn(t,e){var n,i,s,o,a,r,l,h;if(!t||0===t.length)throw new Error("latlngs not passed");On(t)||(console.warn("latlngs are not flat! Only the first ring will be used"),t=t[0]);var d=Z([0,0]),c=R(t);c.getNorthWest().distanceTo(c.getSouthWest())*c.getNorthEast().distanceTo(c.getNorthWest())<1700&&(d=kn(t));var u=t.length,p=[];for(n=0;n<u;n++){var m=Z(t[n]);p.push(e.project(Z([m.lat-d.lat,m.lng-d.lng])))}for(n=0,i=0;n<u-1;n++)i+=p[n].distanceTo(p[n+1])/2;if(0===i)h=p[0];else for(n=0,o=0;n<u-1;n++)if(a=p[n],r=p[n+1],(o+=s=a.distanceTo(r))>i){l=(o-i)/s,h=[r.x-l*(r.x-a.x),r.y-l*(r.y-a.y)];break}var g=e.unproject(N(h));return Z([g.lat+d.lat,g.lng+d.lng])}var Bn={__proto__:null,simplify:$n,pointToSegmentDistance:Sn,closestPointOnSegment:Ln,clipSegment:An,_getEdgeIntersection:Mn,_getBitCode:Hn,_sqClosestPointOnSegment:In,isFlat:On,_flat:Dn,polylineCenter:Rn},Zn={project:function(t){return new M(t.lng,t.lat)},unproject:function(t){return new B(t.y,t.x)},bounds:new I([-180,-90],[180,90])},jn={R:6378137,R_MINOR:6356752.314245179,bounds:new I([-20037508.34279,-15496570.73972],[20037508.34279,18764656.23138]),project:function(t){var e=Math.PI/180,n=this.R,i=t.lat*e,s=this.R_MINOR/n,o=Math.sqrt(1-s*s),a=o*Math.sin(i),r=Math.tan(Math.PI/4-i/2)/Math.pow((1-a)/(1+a),o/2);return i=-n*Math.log(Math.max(r,1e-10)),new M(t.lng*e*n,i)},unproject:function(t){for(var e,n=180/Math.PI,i=this.R,s=this.R_MINOR/i,o=Math.sqrt(1-s*s),a=Math.exp(-t.y/i),r=Math.PI/2-2*Math.atan(a),l=0,h=.1;l<15&&Math.abs(h)>1e-7;l++)e=o*Math.sin(r),e=Math.pow((1-e)/(1+e),o/2),r+=h=Math.PI/2-2*Math.atan(a*e)-r;return new B(r*n,t.x*n/i)}},qn={__proto__:null,LonLat:Zn,Mercator:jn,SphericalMercator:W},Fn=n({},q,{code:"EPSG:3395",projection:jn,transformation:function(){var t=.5/(Math.PI*jn.R);return G(t,.5,-t,.5)}()}),Wn=n({},q,{code:"EPSG:4326",projection:Zn,transformation:G(1/180,1,-1/180,.5)}),Un=n({},j,{projection:Zn,transformation:G(1,0,-1,0),scale:function(t){return Math.pow(2,t)},zoom:function(t){return Math.log(t)/Math.LN2},distance:function(t,e){var n=e.lng-t.lng,i=e.lat-t.lat;return Math.sqrt(n*n+i*i)},infinite:!0});j.Earth=q,j.EPSG3395=Fn,j.EPSG3857=K,j.EPSG900913=V,j.EPSG4326=Wn,j.Simple=Un;var Gn=A.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(t){return t.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(t){return t&&t.removeLayer(this),this},getPane:function(t){return this._map.getPane(t?this.options[t]||t:this.options.pane)},addInteractiveTarget:function(t){return this._map._targets[a(t)]=this,this},removeInteractiveTarget:function(t){return delete this._map._targets[a(t)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(t){var e=t.target;if(e.hasLayer(this)){if(this._map=e,this._zoomAnimated=e._zoomAnimated,this.getEvents){var n=this.getEvents();e.on(n,this),this.once("remove",function(){e.off(n,this)},this)}this.onAdd(e),this.fire("add"),e.fire("layeradd",{layer:this})}}});sn.include({addLayer:function(t){if(!t._layerAdd)throw new Error("The provided object is not a Layer.");var e=a(t);return this._layers[e]||(this._layers[e]=t,t._mapToAdd=this,t.beforeAdd&&t.beforeAdd(this),this.whenReady(t._layerAdd,t)),this},removeLayer:function(t){var e=a(t);return this._layers[e]?(this._loaded&&t.onRemove(this),delete this._layers[e],this._loaded&&(this.fire("layerremove",{layer:t}),t.fire("remove")),t._map=t._mapToAdd=null,this):this},hasLayer:function(t){return a(t)in this._layers},eachLayer:function(t,e){for(var n in this._layers)t.call(e,this._layers[n]);return this},_addLayers:function(t){for(var e=0,n=(t=t?_(t)?t:[t]:[]).length;e<n;e++)this.addLayer(t[e])},_addZoomLimit:function(t){isNaN(t.options.maxZoom)&&isNaN(t.options.minZoom)||(this._zoomBoundLayers[a(t)]=t,this._updateZoomLevels())},_removeZoomLimit:function(t){var e=a(t);this._zoomBoundLayers[e]&&(delete this._zoomBoundLayers[e],this._updateZoomLevels())},_updateZoomLevels:function(){var t=1/0,e=-1/0,n=this._getZoomSpan();for(var i in this._zoomBoundLayers){var s=this._zoomBoundLayers[i].options;t=void 0===s.minZoom?t:Math.min(t,s.minZoom),e=void 0===s.maxZoom?e:Math.max(e,s.maxZoom)}this._layersMaxZoom=e===-1/0?void 0:e,this._layersMinZoom=t===1/0?void 0:t,n!==this._getZoomSpan()&&this.fire("zoomlevelschange"),void 0===this.options.maxZoom&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),void 0===this.options.minZoom&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var Kn=Gn.extend({initialize:function(t,e){var n,i;if(p(this,e),this._layers={},t)for(n=0,i=t.length;n<i;n++)this.addLayer(t[n])},addLayer:function(t){var e=this.getLayerId(t);return this._layers[e]=t,this._map&&this._map.addLayer(t),this},removeLayer:function(t){var e=t in this._layers?t:this.getLayerId(t);return this._map&&this._layers[e]&&this._map.removeLayer(this._layers[e]),delete this._layers[e],this},hasLayer:function(t){return("number"==typeof t?t:this.getLayerId(t))in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(t){var e,n,i=Array.prototype.slice.call(arguments,1);for(e in this._layers)(n=this._layers[e])[t]&&n[t].apply(n,i);return this},onAdd:function(t){this.eachLayer(t.addLayer,t)},onRemove:function(t){this.eachLayer(t.removeLayer,t)},eachLayer:function(t,e){for(var n in this._layers)t.call(e,this._layers[n]);return this},getLayer:function(t){return this._layers[t]},getLayers:function(){var t=[];return this.eachLayer(t.push,t),t},setZIndex:function(t){return this.invoke("setZIndex",t)},getLayerId:function(t){return a(t)}}),Vn=function(t,e){return new Kn(t,e)},Yn=Kn.extend({addLayer:function(t){return this.hasLayer(t)?this:(t.addEventParent(this),Kn.prototype.addLayer.call(this,t),this.fire("layeradd",{layer:t}))},removeLayer:function(t){return this.hasLayer(t)?(t in this._layers&&(t=this._layers[t]),t.removeEventParent(this),Kn.prototype.removeLayer.call(this,t),this.fire("layerremove",{layer:t})):this},setStyle:function(t){return this.invoke("setStyle",t)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var t=new D;for(var e in this._layers){var n=this._layers[e];t.extend(n.getBounds?n.getBounds():n.getLatLng())}return t}}),Jn=function(t,e){return new Yn(t,e)},Xn=T.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(t){p(this,t)},createIcon:function(t){return this._createIcon("icon",t)},createShadow:function(t){return this._createIcon("shadow",t)},_createIcon:function(t,e){var n=this._getIconUrl(t);if(!n){if("icon"===t)throw new Error("iconUrl not set in Icon options (see the docs).");return null}var i=this._createImg(n,e&&"IMG"===e.tagName?e:null);return this._setIconStyles(i,t),(this.options.crossOrigin||""===this.options.crossOrigin)&&(i.crossOrigin=!0===this.options.crossOrigin?"":this.options.crossOrigin),i},_setIconStyles:function(t,e){var n=this.options,i=n[e+"Size"];"number"==typeof i&&(i=[i,i]);var s=N(i),o=N("shadow"===e&&n.shadowAnchor||n.iconAnchor||s&&s.divideBy(2,!0));t.className="leaflet-marker-"+e+" "+(n.className||""),o&&(t.style.marginLeft=-o.x+"px",t.style.marginTop=-o.y+"px"),s&&(t.style.width=s.x+"px",t.style.height=s.y+"px")},_createImg:function(t,e){return(e=e||document.createElement("img")).src=t,e},_getIconUrl:function(t){return Ot.retina&&this.options[t+"RetinaUrl"]||this.options[t+"Url"]}});function Qn(t){return new Xn(t)}var ti=Xn.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(t){return"string"!=typeof ti.imagePath&&(ti.imagePath=this._detectIconPath()),(this.options.imagePath||ti.imagePath)+Xn.prototype._getIconUrl.call(this,t)},_stripUrl:function(t){var e=function(t,e,n){var i=e.exec(t);return i&&i[n]};return(t=e(t,/^url\((['"])?(.+)\1\)$/,2))&&e(t,/^(.*)marker-icon\.png$/,1)},_detectIconPath:function(){var t=me("div","leaflet-default-icon-path",document.body),e=pe(t,"background-image")||pe(t,"backgroundImage");if(document.body.removeChild(t),e=this._stripUrl(e))return e;var n=document.querySelector('link[href$="leaflet.css"]');return n?n.href.substring(0,n.href.length-11-1):""}}),ei=_n.extend({initialize:function(t){this._marker=t},addHooks:function(){var t=this._marker._icon;this._draggable||(this._draggable=new bn(t,t,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),be(t,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&we(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(t){var e=this._marker,n=e._map,i=this._marker.options.autoPanSpeed,s=this._marker.options.autoPanPadding,o=Te(e._icon),a=n.getPixelBounds(),r=n.getPixelOrigin(),l=O(a.min._subtract(r).add(s),a.max._subtract(r).subtract(s));if(!l.contains(o)){var h=N((Math.max(l.max.x,o.x)-l.max.x)/(a.max.x-l.max.x)-(Math.min(l.min.x,o.x)-l.min.x)/(a.min.x-l.min.x),(Math.max(l.max.y,o.y)-l.max.y)/(a.max.y-l.max.y)-(Math.min(l.min.y,o.y)-l.min.y)/(a.min.y-l.min.y)).multiplyBy(i);n.panBy(h,{animate:!1}),this._draggable._newPos._add(h),this._draggable._startPos._add(h),Le(e._icon,this._draggable._newPos),this._onDrag(t),this._panRequest=P(this._adjustPan.bind(this,t))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire("movestart").fire("dragstart")},_onPreDrag:function(t){this._marker.options.autoPan&&($(this._panRequest),this._panRequest=P(this._adjustPan.bind(this,t)))},_onDrag:function(t){var e=this._marker,n=e._shadow,i=Te(e._icon),s=e._map.layerPointToLatLng(i);n&&Le(n,i),e._latlng=s,t.latlng=s,t.oldLatLng=this._oldLatLng,e.fire("move",t).fire("drag",t)},_onDragEnd:function(t){$(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",t)}}),ni=Gn.extend({options:{icon:new ti,interactive:!0,keyboard:!0,title:"",alt:"Marker",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",shadowPane:"shadowPane",bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(t,e){p(this,e),this._latlng=Z(t)},onAdd:function(t){this._zoomAnimated=this._zoomAnimated&&t.options.markerZoomAnimation,this._zoomAnimated&&t.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(t){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&t.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(t){var e=this._latlng;return this._latlng=Z(t),this.update(),this.fire("move",{oldLatLng:e,latlng:this._latlng})},setZIndexOffset:function(t){return this.options.zIndexOffset=t,this.update()},getIcon:function(){return this.options.icon},setIcon:function(t){return this.options.icon=t,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var t=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(t)}return this},_initIcon:function(){var t=this.options,e="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),n=t.icon.createIcon(this._icon),i=!1;n!==this._icon&&(this._icon&&this._removeIcon(),i=!0,t.title&&(n.title=t.title),"IMG"===n.tagName&&(n.alt=t.alt||"")),be(n,e),t.keyboard&&(n.tabIndex="0",n.setAttribute("role","button")),this._icon=n,t.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&De(n,"focus",this._panOnFocus,this);var s=t.icon.createShadow(this._shadow),o=!1;s!==this._shadow&&(this._removeShadow(),o=!0),s&&(be(s,e),s.alt=""),this._shadow=s,t.opacity<1&&this._updateOpacity(),i&&this.getPane().appendChild(this._icon),this._initInteraction(),s&&o&&this.getPane(t.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&Be(this._icon,"focus",this._panOnFocus,this),ge(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&ge(this._shadow),this._shadow=null},_setPos:function(t){this._icon&&Le(this._icon,t),this._shadow&&Le(this._shadow,t),this._zIndex=t.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(t){this._icon&&(this._icon.style.zIndex=this._zIndex+t)},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center).round();this._setPos(e)},_initInteraction:function(){if(this.options.interactive&&(be(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),ei)){var t=this.options.draggable;this.dragging&&(t=this.dragging.enabled(),this.dragging.disable()),this.dragging=new ei(this),t&&this.dragging.enable()}},setOpacity:function(t){return this.options.opacity=t,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var t=this.options.opacity;this._icon&&ze(this._icon,t),this._shadow&&ze(this._shadow,t)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_panOnFocus:function(){var t=this._map;if(t){var e=this.options.icon.options,n=e.iconSize?N(e.iconSize):N(0,0),i=e.iconAnchor?N(e.iconAnchor):N(0,0);t.panInside(this._latlng,{paddingTopLeft:i,paddingBottomRight:n.subtract(i)})}},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});function ii(t,e){return new ni(t,e)}var si=Gn.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(t){this._renderer=t.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(t){return p(this,t),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&t&&Object.prototype.hasOwnProperty.call(t,"weight")&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0)}}),oi=si.extend({options:{fill:!0,radius:10},initialize:function(t,e){p(this,e),this._latlng=Z(t),this._radius=this.options.radius},setLatLng:function(t){var e=this._latlng;return this._latlng=Z(t),this.redraw(),this.fire("move",{oldLatLng:e,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(t){return this.options.radius=this._radius=t,this.redraw()},getRadius:function(){return this._radius},setStyle:function(t){var e=t&&t.radius||this._radius;return si.prototype.setStyle.call(this,t),this.setRadius(e),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var t=this._radius,e=this._radiusY||t,n=this._clickTolerance(),i=[t+n,e+n];this._pxBounds=new I(this._point.subtract(i),this._point.add(i))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(t){return t.distanceTo(this._point)<=this._radius+this._clickTolerance()}});function ai(t,e){return new oi(t,e)}var ri=oi.extend({initialize:function(t,e,i){if("number"==typeof e&&(e=n({},i,{radius:e})),p(this,e),this._latlng=Z(t),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(t){return this._mRadius=t,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var t=[this._radius,this._radiusY||this._radius];return new D(this._map.layerPointToLatLng(this._point.subtract(t)),this._map.layerPointToLatLng(this._point.add(t)))},setStyle:si.prototype.setStyle,_project:function(){var t=this._latlng.lng,e=this._latlng.lat,n=this._map,i=n.options.crs;if(i.distance===q.distance){var s=Math.PI/180,o=this._mRadius/q.R/s,a=n.project([e+o,t]),r=n.project([e-o,t]),l=a.add(r).divideBy(2),h=n.unproject(l).lat,d=Math.acos((Math.cos(o*s)-Math.sin(e*s)*Math.sin(h*s))/(Math.cos(e*s)*Math.cos(h*s)))/s;(isNaN(d)||0===d)&&(d=o/Math.cos(Math.PI/180*e)),this._point=l.subtract(n.getPixelOrigin()),this._radius=isNaN(d)?0:l.x-n.project([h,t-d]).x,this._radiusY=l.y-a.y}else{var c=i.unproject(i.project(this._latlng).subtract([this._mRadius,0]));this._point=n.latLngToLayerPoint(this._latlng),this._radius=this._point.x-n.latLngToLayerPoint(c).x}this._updateBounds()}});function li(t,e,n){return new ri(t,e,n)}var hi=si.extend({options:{smoothFactor:1,noClip:!1},initialize:function(t,e){p(this,e),this._setLatLngs(t)},getLatLngs:function(){return this._latlngs},setLatLngs:function(t){return this._setLatLngs(t),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(t){for(var e,n,i=1/0,s=null,o=In,a=0,r=this._parts.length;a<r;a++)for(var l=this._parts[a],h=1,d=l.length;h<d;h++){var c=o(t,e=l[h-1],n=l[h],!0);c<i&&(i=c,s=o(t,e,n))}return s&&(s.distance=Math.sqrt(i)),s},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return Rn(this._defaultShape(),this._map.options.crs)},getBounds:function(){return this._bounds},addLatLng:function(t,e){return e=e||this._defaultShape(),t=Z(t),e.push(t),this._bounds.extend(t),this.redraw()},_setLatLngs:function(t){this._bounds=new D,this._latlngs=this._convertLatLngs(t)},_defaultShape:function(){return On(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(t){for(var e=[],n=On(t),i=0,s=t.length;i<s;i++)n?(e[i]=Z(t[i]),this._bounds.extend(e[i])):e[i]=this._convertLatLngs(t[i]);return e},_project:function(){var t=new I;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,t),this._bounds.isValid()&&t.isValid()&&(this._rawPxBounds=t,this._updateBounds())},_updateBounds:function(){var t=this._clickTolerance(),e=new M(t,t);this._rawPxBounds&&(this._pxBounds=new I([this._rawPxBounds.min.subtract(e),this._rawPxBounds.max.add(e)]))},_projectLatlngs:function(t,e,n){var i,s,o=t[0]instanceof B,a=t.length;if(o){for(s=[],i=0;i<a;i++)s[i]=this._map.latLngToLayerPoint(t[i]),n.extend(s[i]);e.push(s)}else for(i=0;i<a;i++)this._projectLatlngs(t[i],e,n)},_clipPoints:function(){var t=this._renderer._bounds;if(this._parts=[],this._pxBounds&&this._pxBounds.intersects(t))if(this.options.noClip)this._parts=this._rings;else{var e,n,i,s,o,a,r,l=this._parts;for(e=0,i=0,s=this._rings.length;e<s;e++)for(n=0,o=(r=this._rings[e]).length;n<o-1;n++)(a=An(r[n],r[n+1],t,n,!0))&&(l[i]=l[i]||[],l[i].push(a[0]),a[1]===r[n+1]&&n!==o-2||(l[i].push(a[1]),i++))}},_simplifyPoints:function(){for(var t=this._parts,e=this.options.smoothFactor,n=0,i=t.length;n<i;n++)t[n]=$n(t[n],e)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(t,e){var n,i,s,o,a,r,l=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(t))return!1;for(n=0,o=this._parts.length;n<o;n++)for(i=0,s=(a=(r=this._parts[n]).length)-1;i<a;s=i++)if((e||0!==i)&&Sn(t,r[s],r[i])<=l)return!0;return!1}});function di(t,e){return new hi(t,e)}hi._flat=Dn;var ci=hi.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return xn(this._defaultShape(),this._map.options.crs)},_convertLatLngs:function(t){var e=hi.prototype._convertLatLngs.call(this,t),n=e.length;return n>=2&&e[0]instanceof B&&e[0].equals(e[n-1])&&e.pop(),e},_setLatLngs:function(t){hi.prototype._setLatLngs.call(this,t),On(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return On(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var t=this._renderer._bounds,e=this.options.weight,n=new M(e,e);if(t=new I(t.min.subtract(n),t.max.add(n)),this._parts=[],this._pxBounds&&this._pxBounds.intersects(t))if(this.options.noClip)this._parts=this._rings;else for(var i,s=0,o=this._rings.length;s<o;s++)(i=wn(this._rings[s],t,!0)).length&&this._parts.push(i)},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(t){var e,n,i,s,o,a,r,l,h=!1;if(!this._pxBounds||!this._pxBounds.contains(t))return!1;for(s=0,r=this._parts.length;s<r;s++)for(o=0,a=(l=(e=this._parts[s]).length)-1;o<l;a=o++)n=e[o],i=e[a],n.y>t.y!=i.y>t.y&&t.x<(i.x-n.x)*(t.y-n.y)/(i.y-n.y)+n.x&&(h=!h);return h||hi.prototype._containsPoint.call(this,t,!0)}});function ui(t,e){return new ci(t,e)}var pi=Yn.extend({initialize:function(t,e){p(this,e),this._layers={},t&&this.addData(t)},addData:function(t){var e,n,i,s=_(t)?t:t.features;if(s){for(e=0,n=s.length;e<n;e++)((i=s[e]).geometries||i.geometry||i.features||i.coordinates)&&this.addData(i);return this}var o=this.options;if(o.filter&&!o.filter(t))return this;var a=mi(t,o);return a?(a.feature=wi(t),a.defaultOptions=a.options,this.resetStyle(a),o.onEachFeature&&o.onEachFeature(t,a),this.addLayer(a)):this},resetStyle:function(t){return void 0===t?this.eachLayer(this.resetStyle,this):(t.options=n({},t.defaultOptions),this._setLayerStyle(t,this.options.style),this)},setStyle:function(t){return this.eachLayer(function(e){this._setLayerStyle(e,t)},this)},_setLayerStyle:function(t,e){t.setStyle&&("function"==typeof e&&(e=e(t.feature)),t.setStyle(e))}});function mi(t,e){var n,i,s,o,a="Feature"===t.type?t.geometry:t,r=a?a.coordinates:null,l=[],h=e&&e.pointToLayer,d=e&&e.coordsToLatLng||fi;if(!r&&!a)return null;switch(a.type){case"Point":return gi(h,t,n=d(r),e);case"MultiPoint":for(s=0,o=r.length;s<o;s++)n=d(r[s]),l.push(gi(h,t,n,e));return new Yn(l);case"LineString":case"MultiLineString":return i=_i(r,"LineString"===a.type?0:1,d),new hi(i,e);case"Polygon":case"MultiPolygon":return i=_i(r,"Polygon"===a.type?1:2,d),new ci(i,e);case"GeometryCollection":for(s=0,o=a.geometries.length;s<o;s++){var c=mi({geometry:a.geometries[s],type:"Feature",properties:t.properties},e);c&&l.push(c)}return new Yn(l);case"FeatureCollection":for(s=0,o=a.features.length;s<o;s++){var u=mi(a.features[s],e);u&&l.push(u)}return new Yn(l);default:throw new Error("Invalid GeoJSON object.")}}function gi(t,e,n,i){return t?t(e,n):new ni(n,i&&i.markersInheritOptions&&i)}function fi(t){return new B(t[1],t[0],t[2])}function _i(t,e,n){for(var i,s=[],o=0,a=t.length;o<a;o++)i=e?_i(t[o],e-1,n):(n||fi)(t[o]),s.push(i);return s}function vi(t,e){return void 0!==(t=Z(t)).alt?[d(t.lng,e),d(t.lat,e),d(t.alt,e)]:[d(t.lng,e),d(t.lat,e)]}function yi(t,e,n,i){for(var s=[],o=0,a=t.length;o<a;o++)s.push(e?yi(t[o],On(t[o])?0:e-1,n,i):vi(t[o],i));return!e&&n&&s.length>0&&s.push(s[0].slice()),s}function bi(t,e){return t.feature?n({},t.feature,{geometry:e}):wi(e)}function wi(t){return"Feature"===t.type||"FeatureCollection"===t.type?t:{type:"Feature",properties:{},geometry:t}}var xi={toGeoJSON:function(t){return bi(this,{type:"Point",coordinates:vi(this.getLatLng(),t)})}};function ki(t,e){return new pi(t,e)}ni.include(xi),ri.include(xi),oi.include(xi),hi.include({toGeoJSON:function(t){var e=!On(this._latlngs);return bi(this,{type:(e?"Multi":"")+"LineString",coordinates:yi(this._latlngs,e?1:0,!1,t)})}}),ci.include({toGeoJSON:function(t){var e=!On(this._latlngs),n=e&&!On(this._latlngs[0]),i=yi(this._latlngs,n?2:e?1:0,!0,t);return e||(i=[i]),bi(this,{type:(n?"Multi":"")+"Polygon",coordinates:i})}}),Kn.include({toMultiPoint:function(t){var e=[];return this.eachLayer(function(n){e.push(n.toGeoJSON(t).geometry.coordinates)}),bi(this,{type:"MultiPoint",coordinates:e})},toGeoJSON:function(t){var e=this.feature&&this.feature.geometry&&this.feature.geometry.type;if("MultiPoint"===e)return this.toMultiPoint(t);var n="GeometryCollection"===e,i=[];return this.eachLayer(function(e){if(e.toGeoJSON){var s=e.toGeoJSON(t);if(n)i.push(s.geometry);else{var o=wi(s);"FeatureCollection"===o.type?i.push.apply(i,o.features):i.push(o)}}}),n?bi(this,{geometries:i,type:"GeometryCollection"}):{type:"FeatureCollection",features:i}}});var zi=ki,Pi=Gn.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(t,e,n){this._url=t,this._bounds=R(e),p(this,n)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(be(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){ge(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(t){return this.options.opacity=t,this._image&&this._updateOpacity(),this},setStyle:function(t){return t.opacity&&this.setOpacity(t.opacity),this},bringToFront:function(){return this._map&&_e(this._image),this},bringToBack:function(){return this._map&&ve(this._image),this},setUrl:function(t){return this._url=t,this._image&&(this._image.src=t),this},setBounds:function(t){return this._bounds=R(t),this._map&&this._reset(),this},getEvents:function(){var t={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var t="IMG"===this._url.tagName,e=this._image=t?this._url:me("img");be(e,"leaflet-image-layer"),this._zoomAnimated&&be(e,"leaflet-zoom-animated"),this.options.className&&be(e,this.options.className),e.onselectstart=h,e.onmousemove=h,e.onload=s(this.fire,this,"load"),e.onerror=s(this._overlayOnError,this,"error"),(this.options.crossOrigin||""===this.options.crossOrigin)&&(e.crossOrigin=!0===this.options.crossOrigin?"":this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),t?this._url=e.src:(e.src=this._url,e.alt=this.options.alt)},_animateZoom:function(t){var e=this._map.getZoomScale(t.zoom),n=this._map._latLngBoundsToNewLayerBounds(this._bounds,t.zoom,t.center).min;Se(this._image,n,e)},_reset:function(){var t=this._image,e=new I(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),n=e.getSize();Le(t,e.min),t.style.width=n.x+"px",t.style.height=n.y+"px"},_updateOpacity:function(){ze(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&void 0!==this.options.zIndex&&null!==this.options.zIndex&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error");var t=this.options.errorOverlayUrl;t&&this._url!==t&&(this._url=t,this._image.src=t)},getCenter:function(){return this._bounds.getCenter()}}),$i=function(t,e,n){return new Pi(t,e,n)},Si=Pi.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var t="VIDEO"===this._url.tagName,e=this._image=t?this._url:me("video");if(be(e,"leaflet-image-layer"),this._zoomAnimated&&be(e,"leaflet-zoom-animated"),this.options.className&&be(e,this.options.className),e.onselectstart=h,e.onmousemove=h,e.onloadeddata=s(this.fire,this,"load"),t){for(var n=e.getElementsByTagName("source"),i=[],o=0;o<n.length;o++)i.push(n[o].src);this._url=n.length>0?i:[e.src]}else{_(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(e.style,"objectFit")&&(e.style.objectFit="fill"),e.autoplay=!!this.options.autoplay,e.loop=!!this.options.loop,e.muted=!!this.options.muted,e.playsInline=!!this.options.playsInline;for(var a=0;a<this._url.length;a++){var r=me("source");r.src=this._url[a],e.appendChild(r)}}}});function Li(t,e,n){return new Si(t,e,n)}var Ti=Pi.extend({_initImage:function(){var t=this._image=this._url;be(t,"leaflet-image-layer"),this._zoomAnimated&&be(t,"leaflet-zoom-animated"),this.options.className&&be(t,this.options.className),t.onselectstart=h,t.onmousemove=h}});function Ci(t,e,n){return new Ti(t,e,n)}var Ei=Gn.extend({options:{interactive:!1,offset:[0,0],className:"",pane:void 0,content:""},initialize:function(t,e){t&&(t instanceof B||_(t))?(this._latlng=Z(t),p(this,e)):(p(this,t),this._source=e),this.options.content&&(this._content=this.options.content)},openOn:function(t){return(t=arguments.length?t:this._source._map).hasLayer(this)||t.addLayer(this),this},close:function(){return this._map&&this._map.removeLayer(this),this},toggle:function(t){return this._map?this.close():(arguments.length?this._source=t:t=this._source,this._prepareOpen(),this.openOn(t._map)),this},onAdd:function(t){this._zoomAnimated=t._zoomAnimated,this._container||this._initLayout(),t._fadeAnimated&&ze(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),t._fadeAnimated&&ze(this._container,1),this.bringToFront(),this.options.interactive&&(be(this._container,"leaflet-interactive"),this.addInteractiveTarget(this._container))},onRemove:function(t){t._fadeAnimated?(ze(this._container,0),this._removeTimeout=setTimeout(s(ge,void 0,this._container),200)):ge(this._container),this.options.interactive&&(we(this._container,"leaflet-interactive"),this.removeInteractiveTarget(this._container))},getLatLng:function(){return this._latlng},setLatLng:function(t){return this._latlng=Z(t),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(t){return this._content=t,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var t={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&_e(this._container),this},bringToBack:function(){return this._map&&ve(this._container),this},_prepareOpen:function(t){var e=this._source;if(!e._map)return!1;if(e instanceof Yn){e=null;var n=this._source._layers;for(var i in n)if(n[i]._map){e=n[i];break}if(!e)return!1;this._source=e}if(!t)if(e.getCenter)t=e.getCenter();else if(e.getLatLng)t=e.getLatLng();else{if(!e.getBounds)throw new Error("Unable to get source layer LatLng.");t=e.getBounds().getCenter()}return this.setLatLng(t),this._map&&this.update(),!0},_updateContent:function(){if(this._content){var t=this._contentNode,e="function"==typeof this._content?this._content(this._source||this):this._content;if("string"==typeof e)t.innerHTML=e;else{for(;t.hasChildNodes();)t.removeChild(t.firstChild);t.appendChild(e)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var t=this._map.latLngToLayerPoint(this._latlng),e=N(this.options.offset),n=this._getAnchor();this._zoomAnimated?Le(this._container,t.add(n)):e=e.add(t).add(n);var i=this._containerBottom=-e.y,s=this._containerLeft=-Math.round(this._containerWidth/2)+e.x;this._container.style.bottom=i+"px",this._container.style.left=s+"px"}},_getAnchor:function(){return[0,0]}});sn.include({_initOverlay:function(t,e,n,i){var s=e;return s instanceof t||(s=new t(i).setContent(e)),n&&s.setLatLng(n),s}}),Gn.include({_initOverlay:function(t,e,n,i){var s=n;return s instanceof t?(p(s,i),s._source=this):(s=e&&!i?e:new t(i,this)).setContent(n),s}});var Ai=Ei.extend({options:{pane:"popupPane",offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(t){return!(t=arguments.length?t:this._source._map).hasLayer(this)&&t._popup&&t._popup.options.autoClose&&t.removeLayer(t._popup),t._popup=this,Ei.prototype.openOn.call(this,t)},onAdd:function(t){Ei.prototype.onAdd.call(this,t),t.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof si||this._source.on("preclick",We))},onRemove:function(t){Ei.prototype.onRemove.call(this,t),t.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof si||this._source.off("preclick",We))},getEvents:function(){var t=Ei.prototype.getEvents.call(this);return(void 0!==this.options.closeOnClick?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(t.preclick=this.close),this.options.keepInView&&(t.moveend=this._adjustPan),t},_initLayout:function(){var t="leaflet-popup",e=this._container=me("div",t+" "+(this.options.className||"")+" leaflet-zoom-animated"),n=this._wrapper=me("div",t+"-content-wrapper",e);if(this._contentNode=me("div",t+"-content",n),Ge(e),Ue(this._contentNode),De(e,"contextmenu",We),this._tipContainer=me("div",t+"-tip-container",e),this._tip=me("div",t+"-tip",this._tipContainer),this.options.closeButton){var i=this._closeButton=me("a",t+"-close-button",e);i.setAttribute("role","button"),i.setAttribute("aria-label","Close popup"),i.href="#close",i.innerHTML='<span aria-hidden="true">&#215;</span>',De(i,"click",function(t){Ke(t),this.close()},this)}},_updateLayout:function(){var t=this._contentNode,e=t.style;e.width="",e.whiteSpace="nowrap";var n=t.offsetWidth;n=Math.min(n,this.options.maxWidth),n=Math.max(n,this.options.minWidth),e.width=n+1+"px",e.whiteSpace="",e.height="";var i=t.offsetHeight,s=this.options.maxHeight,o="leaflet-popup-scrolled";s&&i>s?(e.height=s+"px",be(t,o)):we(t,o),this._containerWidth=this._container.offsetWidth},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center),n=this._getAnchor();Le(this._container,e.add(n))},_adjustPan:function(){if(this.options.autoPan)if(this._map._panAnim&&this._map._panAnim.stop(),this._autopanning)this._autopanning=!1;else{var t=this._map,e=parseInt(pe(this._container,"marginBottom"),10)||0,n=this._container.offsetHeight+e,i=this._containerWidth,s=new M(this._containerLeft,-n-this._containerBottom);s._add(Te(this._container));var o=t.layerPointToContainerPoint(s),a=N(this.options.autoPanPadding),r=N(this.options.autoPanPaddingTopLeft||a),l=N(this.options.autoPanPaddingBottomRight||a),h=t.getSize(),d=0,c=0;o.x+i+l.x>h.x&&(d=o.x+i-h.x+l.x),o.x-d-r.x<0&&(d=o.x-r.x),o.y+n+l.y>h.y&&(c=o.y+n-h.y+l.y),o.y-c-r.y<0&&(c=o.y-r.y),(d||c)&&(this.options.keepInView&&(this._autopanning=!0),t.fire("autopanstart").panBy([d,c]))}},_getAnchor:function(){return N(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),Mi=function(t,e){return new Ai(t,e)};sn.mergeOptions({closePopupOnClick:!0}),sn.include({openPopup:function(t,e,n){return this._initOverlay(Ai,t,e,n).openOn(this),this},closePopup:function(t){return(t=arguments.length?t:this._popup)&&t.close(),this}}),Gn.include({bindPopup:function(t,e){return this._popup=this._initOverlay(Ai,this._popup,t,e),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(t){return this._popup&&(this instanceof Yn||(this._popup._source=this),this._popup._prepareOpen(t||this._latlng)&&this._popup.openOn(this._map)),this},closePopup:function(){return this._popup&&this._popup.close(),this},togglePopup:function(){return this._popup&&this._popup.toggle(this),this},isPopupOpen:function(){return!!this._popup&&this._popup.isOpen()},setPopupContent:function(t){return this._popup&&this._popup.setContent(t),this},getPopup:function(){return this._popup},_openPopup:function(t){if(this._popup&&this._map){Ve(t);var e=t.layer||t.target;this._popup._source!==e||e instanceof si?(this._popup._source=e,this.openPopup(t.latlng)):this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(t.latlng)}},_movePopup:function(t){this._popup.setLatLng(t.latlng)},_onKeyPress:function(t){13===t.originalEvent.keyCode&&this._openPopup(t)}});var Hi=Ei.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,opacity:.9},onAdd:function(t){Ei.prototype.onAdd.call(this,t),this.setOpacity(this.options.opacity),t.fire("tooltipopen",{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire("tooltipopen",{tooltip:this},!0))},onRemove:function(t){Ei.prototype.onRemove.call(this,t),t.fire("tooltipclose",{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire("tooltipclose",{tooltip:this},!0))},getEvents:function(){var t=Ei.prototype.getEvents.call(this);return this.options.permanent||(t.preclick=this.close),t},_initLayout:function(){var t="leaflet-tooltip "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=me("div",t),this._container.setAttribute("role","tooltip"),this._container.setAttribute("id","leaflet-tooltip-"+a(this))},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(t){var e,n,i=this._map,s=this._container,o=i.latLngToContainerPoint(i.getCenter()),a=i.layerPointToContainerPoint(t),r=this.options.direction,l=s.offsetWidth,h=s.offsetHeight,d=N(this.options.offset),c=this._getAnchor();"top"===r?(e=l/2,n=h):"bottom"===r?(e=l/2,n=0):"center"===r?(e=l/2,n=h/2):"right"===r?(e=0,n=h/2):"left"===r?(e=l,n=h/2):a.x<o.x?(r="right",e=0,n=h/2):(r="left",e=l+2*(d.x+c.x),n=h/2),t=t.subtract(N(e,n,!0)).add(d).add(c),we(s,"leaflet-tooltip-right"),we(s,"leaflet-tooltip-left"),we(s,"leaflet-tooltip-top"),we(s,"leaflet-tooltip-bottom"),be(s,"leaflet-tooltip-"+r),Le(s,t)},_updatePosition:function(){var t=this._map.latLngToLayerPoint(this._latlng);this._setPosition(t)},setOpacity:function(t){this.options.opacity=t,this._container&&ze(this._container,t)},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center);this._setPosition(e)},_getAnchor:function(){return N(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),Ni=function(t,e){return new Hi(t,e)};sn.include({openTooltip:function(t,e,n){return this._initOverlay(Hi,t,e,n).openOn(this),this},closeTooltip:function(t){return t.close(),this}}),Gn.include({bindTooltip:function(t,e){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay(Hi,this._tooltip,t,e),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(t){if(t||!this._tooltipHandlersAdded){var e=t?"off":"on",n={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?n.add=this._openTooltip:(n.mouseover=this._openTooltip,n.mouseout=this.closeTooltip,n.click=this._openTooltip,this._map?this._addFocusListeners():n.add=this._addFocusListeners),this._tooltip.options.sticky&&(n.mousemove=this._moveTooltip),this[e](n),this._tooltipHandlersAdded=!t}},openTooltip:function(t){return this._tooltip&&(this instanceof Yn||(this._tooltip._source=this),this._tooltip._prepareOpen(t)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this))),this},closeTooltip:function(){if(this._tooltip)return this._tooltip.close()},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(t){return this._tooltip&&this._tooltip.setContent(t),this},getTooltip:function(){return this._tooltip},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this)},_addFocusListenersOnLayer:function(t){var e="function"==typeof t.getElement&&t.getElement();e&&(De(e,"focus",function(){this._tooltip._source=t,this.openTooltip()},this),De(e,"blur",this.closeTooltip,this))},_setAriaDescribedByOnLayer:function(t){var e="function"==typeof t.getElement&&t.getElement();e&&e.setAttribute("aria-describedby",this._tooltip._container.id)},_openTooltip:function(t){if(this._tooltip&&this._map)if(this._map.dragging&&this._map.dragging.moving()&&!this._openOnceFlag){this._openOnceFlag=!0;var e=this;this._map.once("moveend",function(){e._openOnceFlag=!1,e._openTooltip(t)})}else this._tooltip._source=t.layer||t.target,this.openTooltip(this._tooltip.options.sticky?t.latlng:void 0)},_moveTooltip:function(t){var e,n,i=t.latlng;this._tooltip.options.sticky&&t.originalEvent&&(e=this._map.mouseEventToContainerPoint(t.originalEvent),n=this._map.containerPointToLayerPoint(e),i=this._map.layerPointToLatLng(n)),this._tooltip.setLatLng(i)}});var Ii=Xn.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(t){var e=t&&"DIV"===t.tagName?t:document.createElement("div"),n=this.options;if(n.html instanceof Element?(fe(e),e.appendChild(n.html)):e.innerHTML=!1!==n.html?n.html:"",n.bgPos){var i=N(n.bgPos);e.style.backgroundPosition=-i.x+"px "+-i.y+"px"}return this._setIconStyles(e,"icon"),e},createShadow:function(){return null}});function Oi(t){return new Ii(t)}Xn.Default=ti;var Di=Gn.extend({options:{tileSize:256,opacity:1,updateWhenIdle:Ot.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(t){p(this,t)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView()},beforeAdd:function(t){t._addZoomLimit(this)},onRemove:function(t){this._removeAllTiles(),ge(this._container),t._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(_e(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(ve(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(t){return this.options.opacity=t,this._updateOpacity(),this},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){if(this._map){this._removeAllTiles();var t=this._clampZoom(this._map.getZoom());t!==this._tileZoom&&(this._tileZoom=t,this._updateLevels()),this._update()}return this},getEvents:function(){var t={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=r(this._onMoveEnd,this.options.updateInterval,this)),t.move=this._onMove),this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},createTile:function(){return document.createElement("div")},getTileSize:function(){var t=this.options.tileSize;return t instanceof M?t:new M(t,t)},_updateZIndex:function(){this._container&&void 0!==this.options.zIndex&&null!==this.options.zIndex&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(t){for(var e,n=this.getPane().children,i=-t(-1/0,1/0),s=0,o=n.length;s<o;s++)e=n[s].style.zIndex,n[s]!==this._container&&e&&(i=t(i,+e));isFinite(i)&&(this.options.zIndex=i+t(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!Ot.ielt9){ze(this._container,this.options.opacity);var t=+new Date,e=!1,n=!1;for(var i in this._tiles){var s=this._tiles[i];if(s.current&&s.loaded){var o=Math.min(1,(t-s.loaded)/200);ze(s.el,o),o<1?e=!0:(s.active?n=!0:this._onOpaqueTile(s),s.active=!0)}}n&&!this._noPrune&&this._pruneTiles(),e&&($(this._fadeFrame),this._fadeFrame=P(this._updateOpacity,this))}},_onOpaqueTile:h,_initContainer:function(){this._container||(this._container=me("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var t=this._tileZoom,e=this.options.maxZoom;if(void 0!==t){for(var n in this._levels)n=Number(n),this._levels[n].el.children.length||n===t?(this._levels[n].el.style.zIndex=e-Math.abs(t-n),this._onUpdateLevel(n)):(ge(this._levels[n].el),this._removeTilesAtZoom(n),this._onRemoveLevel(n),delete this._levels[n]);var i=this._levels[t],s=this._map;return i||((i=this._levels[t]={}).el=me("div","leaflet-tile-container leaflet-zoom-animated",this._container),i.el.style.zIndex=e,i.origin=s.project(s.unproject(s.getPixelOrigin()),t).round(),i.zoom=t,this._setZoomTransform(i,s.getCenter(),s.getZoom()),h(i.el.offsetWidth),this._onCreateLevel(i)),this._level=i,i}},_onUpdateLevel:h,_onRemoveLevel:h,_onCreateLevel:h,_pruneTiles:function(){if(this._map){var t,e,n=this._map.getZoom();if(n>this.options.maxZoom||n<this.options.minZoom)this._removeAllTiles();else{for(t in this._tiles)(e=this._tiles[t]).retain=e.current;for(t in this._tiles)if((e=this._tiles[t]).current&&!e.active){var i=e.coords;this._retainParent(i.x,i.y,i.z,i.z-5)||this._retainChildren(i.x,i.y,i.z,i.z+2)}for(t in this._tiles)this._tiles[t].retain||this._removeTile(t)}}},_removeTilesAtZoom:function(t){for(var e in this._tiles)this._tiles[e].coords.z===t&&this._removeTile(e)},_removeAllTiles:function(){for(var t in this._tiles)this._removeTile(t)},_invalidateAll:function(){for(var t in this._levels)ge(this._levels[t].el),this._onRemoveLevel(Number(t)),delete this._levels[t];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(t,e,n,i){var s=Math.floor(t/2),o=Math.floor(e/2),a=n-1,r=new M(+s,+o);r.z=+a;var l=this._tileCoordsToKey(r),h=this._tiles[l];return h&&h.active?(h.retain=!0,!0):(h&&h.loaded&&(h.retain=!0),a>i&&this._retainParent(s,o,a,i))},_retainChildren:function(t,e,n,i){for(var s=2*t;s<2*t+2;s++)for(var o=2*e;o<2*e+2;o++){var a=new M(s,o);a.z=n+1;var r=this._tileCoordsToKey(a),l=this._tiles[r];l&&l.active?l.retain=!0:(l&&l.loaded&&(l.retain=!0),n+1<i&&this._retainChildren(s,o,n+1,i))}},_resetView:function(t){var e=t&&(t.pinch||t.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),e,e)},_animateZoom:function(t){this._setView(t.center,t.zoom,!0,t.noUpdate)},_clampZoom:function(t){var e=this.options;return void 0!==e.minNativeZoom&&t<e.minNativeZoom?e.minNativeZoom:void 0!==e.maxNativeZoom&&e.maxNativeZoom<t?e.maxNativeZoom:t},_setView:function(t,e,n,i){var s=Math.round(e);s=void 0!==this.options.maxZoom&&s>this.options.maxZoom||void 0!==this.options.minZoom&&s<this.options.minZoom?void 0:this._clampZoom(s);var o=this.options.updateWhenZooming&&s!==this._tileZoom;i&&!o||(this._tileZoom=s,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),void 0!==s&&this._update(t),n||this._pruneTiles(),this._noPrune=!!n),this._setZoomTransforms(t,e)},_setZoomTransforms:function(t,e){for(var n in this._levels)this._setZoomTransform(this._levels[n],t,e)},_setZoomTransform:function(t,e,n){var i=this._map.getZoomScale(n,t.zoom),s=t.origin.multiplyBy(i).subtract(this._map._getNewPixelOrigin(e,n)).round();Ot.any3d?Se(t.el,s,i):Le(t.el,s)},_resetGrid:function(){var t=this._map,e=t.options.crs,n=this._tileSize=this.getTileSize(),i=this._tileZoom,s=this._map.getPixelWorldBounds(this._tileZoom);s&&(this._globalTileRange=this._pxBoundsToTileRange(s)),this._wrapX=e.wrapLng&&!this.options.noWrap&&[Math.floor(t.project([0,e.wrapLng[0]],i).x/n.x),Math.ceil(t.project([0,e.wrapLng[1]],i).x/n.y)],this._wrapY=e.wrapLat&&!this.options.noWrap&&[Math.floor(t.project([e.wrapLat[0],0],i).y/n.x),Math.ceil(t.project([e.wrapLat[1],0],i).y/n.y)]},_onMoveEnd:function(){this._map&&!this._map._animatingZoom&&this._update()},_getTiledPixelBounds:function(t){var e=this._map,n=e._animatingZoom?Math.max(e._animateToZoom,e.getZoom()):e.getZoom(),i=e.getZoomScale(n,this._tileZoom),s=e.project(t,this._tileZoom).floor(),o=e.getSize().divideBy(2*i);return new I(s.subtract(o),s.add(o))},_update:function(t){var e=this._map;if(e){var n=this._clampZoom(e.getZoom());if(void 0===t&&(t=e.getCenter()),void 0!==this._tileZoom){var i=this._getTiledPixelBounds(t),s=this._pxBoundsToTileRange(i),o=s.getCenter(),a=[],r=this.options.keepBuffer,l=new I(s.getBottomLeft().subtract([r,-r]),s.getTopRight().add([r,-r]));if(!(isFinite(s.min.x)&&isFinite(s.min.y)&&isFinite(s.max.x)&&isFinite(s.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var h in this._tiles){var d=this._tiles[h].coords;d.z===this._tileZoom&&l.contains(new M(d.x,d.y))||(this._tiles[h].current=!1)}if(Math.abs(n-this._tileZoom)>1)this._setView(t,n);else{for(var c=s.min.y;c<=s.max.y;c++)for(var u=s.min.x;u<=s.max.x;u++){var p=new M(u,c);if(p.z=this._tileZoom,this._isValidTile(p)){var m=this._tiles[this._tileCoordsToKey(p)];m?m.current=!0:a.push(p)}}if(a.sort(function(t,e){return t.distanceTo(o)-e.distanceTo(o)}),0!==a.length){this._loading||(this._loading=!0,this.fire("loading"));var g=document.createDocumentFragment();for(u=0;u<a.length;u++)this._addTile(a[u],g);this._level.el.appendChild(g)}}}}},_isValidTile:function(t){var e=this._map.options.crs;if(!e.infinite){var n=this._globalTileRange;if(!e.wrapLng&&(t.x<n.min.x||t.x>n.max.x)||!e.wrapLat&&(t.y<n.min.y||t.y>n.max.y))return!1}if(!this.options.bounds)return!0;var i=this._tileCoordsToBounds(t);return R(this.options.bounds).overlaps(i)},_keyToBounds:function(t){return this._tileCoordsToBounds(this._keyToTileCoords(t))},_tileCoordsToNwSe:function(t){var e=this._map,n=this.getTileSize(),i=t.scaleBy(n),s=i.add(n);return[e.unproject(i,t.z),e.unproject(s,t.z)]},_tileCoordsToBounds:function(t){var e=this._tileCoordsToNwSe(t),n=new D(e[0],e[1]);return this.options.noWrap||(n=this._map.wrapLatLngBounds(n)),n},_tileCoordsToKey:function(t){return t.x+":"+t.y+":"+t.z},_keyToTileCoords:function(t){var e=t.split(":"),n=new M(+e[0],+e[1]);return n.z=+e[2],n},_removeTile:function(t){var e=this._tiles[t];e&&(ge(e.el),delete this._tiles[t],this.fire("tileunload",{tile:e.el,coords:this._keyToTileCoords(t)}))},_initTile:function(t){be(t,"leaflet-tile");var e=this.getTileSize();t.style.width=e.x+"px",t.style.height=e.y+"px",t.onselectstart=h,t.onmousemove=h,Ot.ielt9&&this.options.opacity<1&&ze(t,this.options.opacity)},_addTile:function(t,e){var n=this._getTilePos(t),i=this._tileCoordsToKey(t),o=this.createTile(this._wrapCoords(t),s(this._tileReady,this,t));this._initTile(o),this.createTile.length<2&&P(s(this._tileReady,this,t,null,o)),Le(o,n),this._tiles[i]={el:o,coords:t,current:!0},e.appendChild(o),this.fire("tileloadstart",{tile:o,coords:t})},_tileReady:function(t,e,n){e&&this.fire("tileerror",{error:e,tile:n,coords:t});var i=this._tileCoordsToKey(t);(n=this._tiles[i])&&(n.loaded=+new Date,this._map._fadeAnimated?(ze(n.el,0),$(this._fadeFrame),this._fadeFrame=P(this._updateOpacity,this)):(n.active=!0,this._pruneTiles()),e||(be(n.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:n.el,coords:t})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),Ot.ielt9||!this._map._fadeAnimated?P(this._pruneTiles,this):setTimeout(s(this._pruneTiles,this),250)))},_getTilePos:function(t){return t.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(t){var e=new M(this._wrapX?l(t.x,this._wrapX):t.x,this._wrapY?l(t.y,this._wrapY):t.y);return e.z=t.z,e},_pxBoundsToTileRange:function(t){var e=this.getTileSize();return new I(t.min.unscaleBy(e).floor(),t.max.unscaleBy(e).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var t in this._tiles)if(!this._tiles[t].loaded)return!1;return!0}});function Ri(t){return new Di(t)}var Bi=Di.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(t,e){this._url=t,(e=p(this,e)).detectRetina&&Ot.retina&&e.maxZoom>0?(e.tileSize=Math.floor(e.tileSize/2),e.zoomReverse?(e.zoomOffset--,e.minZoom=Math.min(e.maxZoom,e.minZoom+1)):(e.zoomOffset++,e.maxZoom=Math.max(e.minZoom,e.maxZoom-1)),e.minZoom=Math.max(0,e.minZoom)):e.zoomReverse?e.minZoom=Math.min(e.maxZoom,e.minZoom):e.maxZoom=Math.max(e.minZoom,e.maxZoom),"string"==typeof e.subdomains&&(e.subdomains=e.subdomains.split("")),this.on("tileunload",this._onTileRemove)},setUrl:function(t,e){return this._url===t&&void 0===e&&(e=!0),this._url=t,e||this.redraw(),this},createTile:function(t,e){var n=document.createElement("img");return De(n,"load",s(this._tileOnLoad,this,e,n)),De(n,"error",s(this._tileOnError,this,e,n)),(this.options.crossOrigin||""===this.options.crossOrigin)&&(n.crossOrigin=!0===this.options.crossOrigin?"":this.options.crossOrigin),"string"==typeof this.options.referrerPolicy&&(n.referrerPolicy=this.options.referrerPolicy),n.alt="",n.src=this.getTileUrl(t),n},getTileUrl:function(t){var e={r:Ot.retina?"@2x":"",s:this._getSubdomain(t),x:t.x,y:t.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var i=this._globalTileRange.max.y-t.y;this.options.tms&&(e.y=i),e["-y"]=i}return f(this._url,n(e,this.options))},_tileOnLoad:function(t,e){Ot.ielt9?setTimeout(s(t,this,null,e),0):t(null,e)},_tileOnError:function(t,e,n){var i=this.options.errorTileUrl;i&&e.getAttribute("src")!==i&&(e.src=i),t(n,e)},_onTileRemove:function(t){t.tile.onload=null},_getZoomForUrl:function(){var t=this._tileZoom,e=this.options.maxZoom;return this.options.zoomReverse&&(t=e-t),t+this.options.zoomOffset},_getSubdomain:function(t){var e=Math.abs(t.x+t.y)%this.options.subdomains.length;return this.options.subdomains[e]},_abortLoading:function(){var t,e;for(t in this._tiles)if(this._tiles[t].coords.z!==this._tileZoom&&((e=this._tiles[t].el).onload=h,e.onerror=h,!e.complete)){e.src=y;var n=this._tiles[t].coords;ge(e),delete this._tiles[t],this.fire("tileabort",{tile:e,coords:n})}},_removeTile:function(t){var e=this._tiles[t];if(e)return e.el.setAttribute("src",y),Di.prototype._removeTile.call(this,t)},_tileReady:function(t,e,n){if(this._map&&(!n||n.getAttribute("src")!==y))return Di.prototype._tileReady.call(this,t,e,n)}});function Zi(t,e){return new Bi(t,e)}var ji=Bi.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(t,e){this._url=t;var i=n({},this.defaultWmsParams);for(var s in e)s in this.options||(i[s]=e[s]);var o=(e=p(this,e)).detectRetina&&Ot.retina?2:1,a=this.getTileSize();i.width=a.x*o,i.height=a.y*o,this.wmsParams=i},onAdd:function(t){this._crs=this.options.crs||t.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var e=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[e]=this._crs.code,Bi.prototype.onAdd.call(this,t)},getTileUrl:function(t){var e=this._tileCoordsToNwSe(t),n=this._crs,i=O(n.project(e[0]),n.project(e[1])),s=i.min,o=i.max,a=(this._wmsVersion>=1.3&&this._crs===Wn?[s.y,s.x,o.y,o.x]:[s.x,s.y,o.x,o.y]).join(","),r=Bi.prototype.getTileUrl.call(this,t);return r+m(this.wmsParams,r,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+a},setParams:function(t,e){return n(this.wmsParams,t),e||this.redraw(),this}});function qi(t,e){return new ji(t,e)}Bi.WMS=ji,Zi.wms=qi;var Fi=Gn.extend({options:{padding:.1},initialize:function(t){p(this,t),a(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),be(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var t={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(t.zoomanim=this._onAnimZoom),t},_onAnimZoom:function(t){this._updateTransform(t.center,t.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(t,e){var n=this._map.getZoomScale(e,this._zoom),i=this._map.getSize().multiplyBy(.5+this.options.padding),s=this._map.project(this._center,e),o=i.multiplyBy(-n).add(s).subtract(this._map._getNewPixelOrigin(t,e));Ot.any3d?Se(this._container,o,n):Le(this._container,o)},_reset:function(){for(var t in this._update(),this._updateTransform(this._center,this._zoom),this._layers)this._layers[t]._reset()},_onZoomEnd:function(){for(var t in this._layers)this._layers[t]._project()},_updatePaths:function(){for(var t in this._layers)this._layers[t]._update()},_update:function(){var t=this.options.padding,e=this._map.getSize(),n=this._map.containerPointToLayerPoint(e.multiplyBy(-t)).round();this._bounds=new I(n,n.add(e.multiplyBy(1+2*t)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),Wi=Fi.extend({options:{tolerance:0},getEvents:function(){var t=Fi.prototype.getEvents.call(this);return t.viewprereset=this._onViewPreReset,t},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){Fi.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var t=this._container=document.createElement("canvas");De(t,"mousemove",this._onMouseMove,this),De(t,"click dblclick mousedown mouseup contextmenu",this._onClick,this),De(t,"mouseout",this._handleMouseOut,this),t._leaflet_disable_events=!0,this._ctx=t.getContext("2d")},_destroyContainer:function(){$(this._redrawRequest),delete this._ctx,ge(this._container),Be(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){for(var t in this._redrawBounds=null,this._layers)this._layers[t]._update();this._redraw()}},_update:function(){if(!this._map._animatingZoom||!this._bounds){Fi.prototype._update.call(this);var t=this._bounds,e=this._container,n=t.getSize(),i=Ot.retina?2:1;Le(e,t.min),e.width=i*n.x,e.height=i*n.y,e.style.width=n.x+"px",e.style.height=n.y+"px",Ot.retina&&this._ctx.scale(2,2),this._ctx.translate(-t.min.x,-t.min.y),this.fire("update")}},_reset:function(){Fi.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(t){this._updateDashArray(t),this._layers[a(t)]=t;var e=t._order={layer:t,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=e),this._drawLast=e,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(t){this._requestRedraw(t)},_removePath:function(t){var e=t._order,n=e.next,i=e.prev;n?n.prev=i:this._drawLast=i,i?i.next=n:this._drawFirst=n,delete t._order,delete this._layers[a(t)],this._requestRedraw(t)},_updatePath:function(t){this._extendRedrawBounds(t),t._project(),t._update(),this._requestRedraw(t)},_updateStyle:function(t){this._updateDashArray(t),this._requestRedraw(t)},_updateDashArray:function(t){if("string"==typeof t.options.dashArray){var e,n,i=t.options.dashArray.split(/[, ]+/),s=[];for(n=0;n<i.length;n++){if(e=Number(i[n]),isNaN(e))return;s.push(e)}t.options._dashArray=s}else t.options._dashArray=t.options.dashArray},_requestRedraw:function(t){this._map&&(this._extendRedrawBounds(t),this._redrawRequest=this._redrawRequest||P(this._redraw,this))},_extendRedrawBounds:function(t){if(t._pxBounds){var e=(t.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new I,this._redrawBounds.extend(t._pxBounds.min.subtract([e,e])),this._redrawBounds.extend(t._pxBounds.max.add([e,e]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var t=this._redrawBounds;if(t){var e=t.getSize();this._ctx.clearRect(t.min.x,t.min.y,e.x,e.y)}else this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore()},_draw:function(){var t,e=this._redrawBounds;if(this._ctx.save(),e){var n=e.getSize();this._ctx.beginPath(),this._ctx.rect(e.min.x,e.min.y,n.x,n.y),this._ctx.clip()}this._drawing=!0;for(var i=this._drawFirst;i;i=i.next)t=i.layer,(!e||t._pxBounds&&t._pxBounds.intersects(e))&&t._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(t,e){if(this._drawing){var n,i,s,o,a=t._parts,r=a.length,l=this._ctx;if(r){for(l.beginPath(),n=0;n<r;n++){for(i=0,s=a[n].length;i<s;i++)o=a[n][i],l[i?"lineTo":"moveTo"](o.x,o.y);e&&l.closePath()}this._fillStroke(l,t)}}},_updateCircle:function(t){if(this._drawing&&!t._empty()){var e=t._point,n=this._ctx,i=Math.max(Math.round(t._radius),1),s=(Math.max(Math.round(t._radiusY),1)||i)/i;1!==s&&(n.save(),n.scale(1,s)),n.beginPath(),n.arc(e.x,e.y/s,i,0,2*Math.PI,!1),1!==s&&n.restore(),this._fillStroke(n,t)}},_fillStroke:function(t,e){var n=e.options;n.fill&&(t.globalAlpha=n.fillOpacity,t.fillStyle=n.fillColor||n.color,t.fill(n.fillRule||"evenodd")),n.stroke&&0!==n.weight&&(t.setLineDash&&t.setLineDash(e.options&&e.options._dashArray||[]),t.globalAlpha=n.opacity,t.lineWidth=n.weight,t.strokeStyle=n.color,t.lineCap=n.lineCap,t.lineJoin=n.lineJoin,t.stroke())},_onClick:function(t){for(var e,n,i=this._map.mouseEventToLayerPoint(t),s=this._drawFirst;s;s=s.next)(e=s.layer).options.interactive&&e._containsPoint(i)&&("click"!==t.type&&"preclick"!==t.type||!this._map._draggableMoved(e))&&(n=e);this._fireEvent(!!n&&[n],t)},_onMouseMove:function(t){if(this._map&&!this._map.dragging.moving()&&!this._map._animatingZoom){var e=this._map.mouseEventToLayerPoint(t);this._handleMouseHover(t,e)}},_handleMouseOut:function(t){var e=this._hoveredLayer;e&&(we(this._container,"leaflet-interactive"),this._fireEvent([e],t,"mouseout"),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(t,e){if(!this._mouseHoverThrottled){for(var n,i,o=this._drawFirst;o;o=o.next)(n=o.layer).options.interactive&&n._containsPoint(e)&&(i=n);i!==this._hoveredLayer&&(this._handleMouseOut(t),i&&(be(this._container,"leaflet-interactive"),this._fireEvent([i],t,"mouseover"),this._hoveredLayer=i)),this._fireEvent(!!this._hoveredLayer&&[this._hoveredLayer],t),this._mouseHoverThrottled=!0,setTimeout(s(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(t,e,n){this._map._fireDOMEvent(e,n||e.type,t)},_bringToFront:function(t){var e=t._order;if(e){var n=e.next,i=e.prev;n&&(n.prev=i,i?i.next=n:n&&(this._drawFirst=n),e.prev=this._drawLast,this._drawLast.next=e,e.next=null,this._drawLast=e,this._requestRedraw(t))}},_bringToBack:function(t){var e=t._order;if(e){var n=e.next,i=e.prev;i&&(i.next=n,n?n.prev=i:i&&(this._drawLast=i),e.prev=null,e.next=this._drawFirst,this._drawFirst.prev=e,this._drawFirst=e,this._requestRedraw(t))}}});function Ui(t){return Ot.canvas?new Wi(t):null}var Gi=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(t){return document.createElement("<lvml:"+t+' class="lvml">')}}catch(t){}return function(t){return document.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}(),Ki={_initContainer:function(){this._container=me("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(Fi.prototype._update.call(this),this.fire("update"))},_initPath:function(t){var e=t._container=Gi("shape");be(e,"leaflet-vml-shape "+(this.options.className||"")),e.coordsize="1 1",t._path=Gi("path"),e.appendChild(t._path),this._updateStyle(t),this._layers[a(t)]=t},_addPath:function(t){var e=t._container;this._container.appendChild(e),t.options.interactive&&t.addInteractiveTarget(e)},_removePath:function(t){var e=t._container;ge(e),t.removeInteractiveTarget(e),delete this._layers[a(t)]},_updateStyle:function(t){var e=t._stroke,n=t._fill,i=t.options,s=t._container;s.stroked=!!i.stroke,s.filled=!!i.fill,i.stroke?(e||(e=t._stroke=Gi("stroke")),s.appendChild(e),e.weight=i.weight+"px",e.color=i.color,e.opacity=i.opacity,i.dashArray?e.dashStyle=_(i.dashArray)?i.dashArray.join(" "):i.dashArray.replace(/( *, *)/g," "):e.dashStyle="",e.endcap=i.lineCap.replace("butt","flat"),e.joinstyle=i.lineJoin):e&&(s.removeChild(e),t._stroke=null),i.fill?(n||(n=t._fill=Gi("fill")),s.appendChild(n),n.color=i.fillColor||i.color,n.opacity=i.fillOpacity):n&&(s.removeChild(n),t._fill=null)},_updateCircle:function(t){var e=t._point.round(),n=Math.round(t._radius),i=Math.round(t._radiusY||n);this._setPath(t,t._empty()?"M0 0":"AL "+e.x+","+e.y+" "+n+","+i+" 0,23592600")},_setPath:function(t,e){t._path.v=e},_bringToFront:function(t){_e(t._container)},_bringToBack:function(t){ve(t._container)}},Vi=Ot.vml?Gi:Y,Yi=Fi.extend({_initContainer:function(){this._container=Vi("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=Vi("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){ge(this._container),Be(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_update:function(){if(!this._map._animatingZoom||!this._bounds){Fi.prototype._update.call(this);var t=this._bounds,e=t.getSize(),n=this._container;this._svgSize&&this._svgSize.equals(e)||(this._svgSize=e,n.setAttribute("width",e.x),n.setAttribute("height",e.y)),Le(n,t.min),n.setAttribute("viewBox",[t.min.x,t.min.y,e.x,e.y].join(" ")),this.fire("update")}},_initPath:function(t){var e=t._path=Vi("path");t.options.className&&be(e,t.options.className),t.options.interactive&&be(e,"leaflet-interactive"),this._updateStyle(t),this._layers[a(t)]=t},_addPath:function(t){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(t._path),t.addInteractiveTarget(t._path)},_removePath:function(t){ge(t._path),t.removeInteractiveTarget(t._path),delete this._layers[a(t)]},_updatePath:function(t){t._project(),t._update()},_updateStyle:function(t){var e=t._path,n=t.options;e&&(n.stroke?(e.setAttribute("stroke",n.color),e.setAttribute("stroke-opacity",n.opacity),e.setAttribute("stroke-width",n.weight),e.setAttribute("stroke-linecap",n.lineCap),e.setAttribute("stroke-linejoin",n.lineJoin),n.dashArray?e.setAttribute("stroke-dasharray",n.dashArray):e.removeAttribute("stroke-dasharray"),n.dashOffset?e.setAttribute("stroke-dashoffset",n.dashOffset):e.removeAttribute("stroke-dashoffset")):e.setAttribute("stroke","none"),n.fill?(e.setAttribute("fill",n.fillColor||n.color),e.setAttribute("fill-opacity",n.fillOpacity),e.setAttribute("fill-rule",n.fillRule||"evenodd")):e.setAttribute("fill","none"))},_updatePoly:function(t,e){this._setPath(t,J(t._parts,e))},_updateCircle:function(t){var e=t._point,n=Math.max(Math.round(t._radius),1),i="a"+n+","+(Math.max(Math.round(t._radiusY),1)||n)+" 0 1,0 ",s=t._empty()?"M0 0":"M"+(e.x-n)+","+e.y+i+2*n+",0 "+i+2*-n+",0 ";this._setPath(t,s)},_setPath:function(t,e){t._path.setAttribute("d",e)},_bringToFront:function(t){_e(t._path)},_bringToBack:function(t){ve(t._path)}});function Ji(t){return Ot.svg||Ot.vml?new Yi(t):null}Ot.vml&&Yi.include(Ki),sn.include({getRenderer:function(t){var e=t.options.renderer||this._getPaneRenderer(t.options.pane)||this.options.renderer||this._renderer;return e||(e=this._renderer=this._createRenderer()),this.hasLayer(e)||this.addLayer(e),e},_getPaneRenderer:function(t){if("overlayPane"===t||void 0===t)return!1;var e=this._paneRenderers[t];return void 0===e&&(e=this._createRenderer({pane:t}),this._paneRenderers[t]=e),e},_createRenderer:function(t){return this.options.preferCanvas&&Ui(t)||Ji(t)}});var Xi=ci.extend({initialize:function(t,e){ci.prototype.initialize.call(this,this._boundsToLatLngs(t),e)},setBounds:function(t){return this.setLatLngs(this._boundsToLatLngs(t))},_boundsToLatLngs:function(t){return[(t=R(t)).getSouthWest(),t.getNorthWest(),t.getNorthEast(),t.getSouthEast()]}});function Qi(t,e){return new Xi(t,e)}Yi.create=Vi,Yi.pointsToPath=J,pi.geometryToLayer=mi,pi.coordsToLatLng=fi,pi.coordsToLatLngs=_i,pi.latLngToCoords=vi,pi.latLngsToCoords=yi,pi.getFeature=bi,pi.asFeature=wi,sn.mergeOptions({boxZoom:!0});var ts=_n.extend({initialize:function(t){this._map=t,this._container=t._container,this._pane=t._panes.overlayPane,this._resetStateTimeout=0,t.on("unload",this._destroy,this)},addHooks:function(){De(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){Be(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){ge(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){0!==this._resetStateTimeout&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(t){if(!t.shiftKey||1!==t.which&&1!==t.button)return!1;this._clearDeferredResetState(),this._resetState(),se(),Ee(),this._startPoint=this._map.mouseEventToContainerPoint(t),De(document,{contextmenu:Ve,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(t){this._moved||(this._moved=!0,this._box=me("div","leaflet-zoom-box",this._container),be(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(t);var e=new I(this._point,this._startPoint),n=e.getSize();Le(this._box,e.min),this._box.style.width=n.x+"px",this._box.style.height=n.y+"px"},_finish:function(){this._moved&&(ge(this._box),we(this._container,"leaflet-crosshair")),oe(),Ae(),Be(document,{contextmenu:Ve,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(t){if((1===t.which||1===t.button)&&(this._finish(),this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(s(this._resetState,this),0);var e=new D(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(e).fire("boxzoomend",{boxZoomBounds:e})}},_onKeyDown:function(t){27===t.keyCode&&(this._finish(),this._clearDeferredResetState(),this._resetState())}});sn.addInitHook("addHandler","boxZoom",ts),sn.mergeOptions({doubleClickZoom:!0});var es=_n.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(t){var e=this._map,n=e.getZoom(),i=e.options.zoomDelta,s=t.originalEvent.shiftKey?n-i:n+i;"center"===e.options.doubleClickZoom?e.setZoom(s):e.setZoomAround(t.containerPoint,s)}});sn.addInitHook("addHandler","doubleClickZoom",es),sn.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var ns=_n.extend({addHooks:function(){if(!this._draggable){var t=this._map;this._draggable=new bn(t._mapPane,t._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),t.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),t.on("zoomend",this._onZoomEnd,this),t.whenReady(this._onZoomEnd,this))}be(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){we(this._map._container,"leaflet-grab"),we(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var t=this._map;if(t._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var e=R(this._map.options.maxBounds);this._offsetLimit=O(this._map.latLngToContainerPoint(e.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(e.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;t.fire("movestart").fire("dragstart"),t.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(t){if(this._map.options.inertia){var e=this._lastTime=+new Date,n=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(n),this._times.push(e),this._prunePositions(e)}this._map.fire("move",t).fire("drag",t)},_prunePositions:function(t){for(;this._positions.length>1&&t-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var t=this._map.getSize().divideBy(2),e=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=e.subtract(t).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(t,e){return t-(t-e)*this._viscosity},_onPreDragLimit:function(){if(this._viscosity&&this._offsetLimit){var t=this._draggable._newPos.subtract(this._draggable._startPos),e=this._offsetLimit;t.x<e.min.x&&(t.x=this._viscousLimit(t.x,e.min.x)),t.y<e.min.y&&(t.y=this._viscousLimit(t.y,e.min.y)),t.x>e.max.x&&(t.x=this._viscousLimit(t.x,e.max.x)),t.y>e.max.y&&(t.y=this._viscousLimit(t.y,e.max.y)),this._draggable._newPos=this._draggable._startPos.add(t)}},_onPreDragWrap:function(){var t=this._worldWidth,e=Math.round(t/2),n=this._initialWorldOffset,i=this._draggable._newPos.x,s=(i-e+n)%t+e-n,o=(i+e+n)%t-e-n,a=Math.abs(s+n)<Math.abs(o+n)?s:o;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=a},_onDragEnd:function(t){var e=this._map,n=e.options,i=!n.inertia||t.noInertia||this._times.length<2;if(e.fire("dragend",t),i)e.fire("moveend");else{this._prunePositions(+new Date);var s=this._lastPos.subtract(this._positions[0]),o=(this._lastTime-this._times[0])/1e3,a=n.easeLinearity,r=s.multiplyBy(a/o),l=r.distanceTo([0,0]),h=Math.min(n.inertiaMaxSpeed,l),d=r.multiplyBy(h/l),c=h/(n.inertiaDeceleration*a),u=d.multiplyBy(-c/2).round();u.x||u.y?(u=e._limitOffset(u,e.options.maxBounds),P(function(){e.panBy(u,{duration:c,easeLinearity:a,noMoveStart:!0,animate:!0})})):e.fire("moveend")}}});sn.addInitHook("addHandler","dragging",ns),sn.mergeOptions({keyboard:!0,keyboardPanDelta:80});var is=_n.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(t){this._map=t,this._setPanDelta(t.options.keyboardPanDelta),this._setZoomDelta(t.options.zoomDelta)},addHooks:function(){var t=this._map._container;t.tabIndex<=0&&(t.tabIndex="0"),De(t,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),Be(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var t=document.body,e=document.documentElement,n=t.scrollTop||e.scrollTop,i=t.scrollLeft||e.scrollLeft;this._map._container.focus(),window.scrollTo(i,n)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(t){var e,n,i=this._panKeys={},s=this.keyCodes;for(e=0,n=s.left.length;e<n;e++)i[s.left[e]]=[-1*t,0];for(e=0,n=s.right.length;e<n;e++)i[s.right[e]]=[t,0];for(e=0,n=s.down.length;e<n;e++)i[s.down[e]]=[0,t];for(e=0,n=s.up.length;e<n;e++)i[s.up[e]]=[0,-1*t]},_setZoomDelta:function(t){var e,n,i=this._zoomKeys={},s=this.keyCodes;for(e=0,n=s.zoomIn.length;e<n;e++)i[s.zoomIn[e]]=t;for(e=0,n=s.zoomOut.length;e<n;e++)i[s.zoomOut[e]]=-t},_addHooks:function(){De(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){Be(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(t){if(!(t.altKey||t.ctrlKey||t.metaKey)){var e,n=t.keyCode,i=this._map;if(n in this._panKeys){if(!i._panAnim||!i._panAnim._inProgress)if(e=this._panKeys[n],t.shiftKey&&(e=N(e).multiplyBy(3)),i.options.maxBounds&&(e=i._limitOffset(N(e),i.options.maxBounds)),i.options.worldCopyJump){var s=i.wrapLatLng(i.unproject(i.project(i.getCenter()).add(e)));i.panTo(s)}else i.panBy(e)}else if(n in this._zoomKeys)i.setZoom(i.getZoom()+(t.shiftKey?3:1)*this._zoomKeys[n]);else{if(27!==n||!i._popup||!i._popup.options.closeOnEscapeKey)return;i.closePopup()}Ve(t)}}});sn.addInitHook("addHandler","keyboard",is),sn.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var ss=_n.extend({addHooks:function(){De(this._map._container,"wheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){Be(this._map._container,"wheel",this._onWheelScroll,this)},_onWheelScroll:function(t){var e=Qe(t),n=this._map.options.wheelDebounceTime;this._delta+=e,this._lastMousePos=this._map.mouseEventToContainerPoint(t),this._startTime||(this._startTime=+new Date);var i=Math.max(n-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(s(this._performZoom,this),i),Ve(t)},_performZoom:function(){var t=this._map,e=t.getZoom(),n=this._map.options.zoomSnap||0;t._stop();var i=this._delta/(4*this._map.options.wheelPxPerZoomLevel),s=4*Math.log(2/(1+Math.exp(-Math.abs(i))))/Math.LN2,o=n?Math.ceil(s/n)*n:s,a=t._limitZoom(e+(this._delta>0?o:-o))-e;this._delta=0,this._startTime=null,a&&("center"===t.options.scrollWheelZoom?t.setZoom(e+a):t.setZoomAround(this._lastMousePos,e+a))}});sn.addInitHook("addHandler","scrollWheelZoom",ss);var os=600;sn.mergeOptions({tapHold:Ot.touchNative&&Ot.safari&&Ot.mobile,tapTolerance:15});var as=_n.extend({addHooks:function(){De(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){Be(this._map._container,"touchstart",this._onDown,this)},_onDown:function(t){if(clearTimeout(this._holdTimeout),1===t.touches.length){var e=t.touches[0];this._startPos=this._newPos=new M(e.clientX,e.clientY),this._holdTimeout=setTimeout(s(function(){this._cancel(),this._isTapValid()&&(De(document,"touchend",Ke),De(document,"touchend touchcancel",this._cancelClickPrevent),this._simulateEvent("contextmenu",e))},this),os),De(document,"touchend touchcancel contextmenu",this._cancel,this),De(document,"touchmove",this._onMove,this)}},_cancelClickPrevent:function t(){Be(document,"touchend",Ke),Be(document,"touchend touchcancel",t)},_cancel:function(){clearTimeout(this._holdTimeout),Be(document,"touchend touchcancel contextmenu",this._cancel,this),Be(document,"touchmove",this._onMove,this)},_onMove:function(t){var e=t.touches[0];this._newPos=new M(e.clientX,e.clientY)},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_simulateEvent:function(t,e){var n=new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window,screenX:e.screenX,screenY:e.screenY,clientX:e.clientX,clientY:e.clientY});n._simulated=!0,e.target.dispatchEvent(n)}});sn.addInitHook("addHandler","tapHold",as),sn.mergeOptions({touchZoom:Ot.touch,bounceAtZoomLimits:!0});var rs=_n.extend({addHooks:function(){be(this._map._container,"leaflet-touch-zoom"),De(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){we(this._map._container,"leaflet-touch-zoom"),Be(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(t){var e=this._map;if(t.touches&&2===t.touches.length&&!e._animatingZoom&&!this._zooming){var n=e.mouseEventToContainerPoint(t.touches[0]),i=e.mouseEventToContainerPoint(t.touches[1]);this._centerPoint=e.getSize()._divideBy(2),this._startLatLng=e.containerPointToLatLng(this._centerPoint),"center"!==e.options.touchZoom&&(this._pinchStartLatLng=e.containerPointToLatLng(n.add(i)._divideBy(2))),this._startDist=n.distanceTo(i),this._startZoom=e.getZoom(),this._moved=!1,this._zooming=!0,e._stop(),De(document,"touchmove",this._onTouchMove,this),De(document,"touchend touchcancel",this._onTouchEnd,this),Ke(t)}},_onTouchMove:function(t){if(t.touches&&2===t.touches.length&&this._zooming){var e=this._map,n=e.mouseEventToContainerPoint(t.touches[0]),i=e.mouseEventToContainerPoint(t.touches[1]),o=n.distanceTo(i)/this._startDist;if(this._zoom=e.getScaleZoom(o,this._startZoom),!e.options.bounceAtZoomLimits&&(this._zoom<e.getMinZoom()&&o<1||this._zoom>e.getMaxZoom()&&o>1)&&(this._zoom=e._limitZoom(this._zoom)),"center"===e.options.touchZoom){if(this._center=this._startLatLng,1===o)return}else{var a=n._add(i)._divideBy(2)._subtract(this._centerPoint);if(1===o&&0===a.x&&0===a.y)return;this._center=e.unproject(e.project(this._pinchStartLatLng,this._zoom).subtract(a),this._zoom)}this._moved||(e._moveStart(!0,!1),this._moved=!0),$(this._animRequest);var r=s(e._move,e,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=P(r,this,!0),Ke(t)}},_onTouchEnd:function(){this._moved&&this._zooming?(this._zooming=!1,$(this._animRequest),Be(document,"touchmove",this._onTouchMove,this),Be(document,"touchend touchcancel",this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))):this._zooming=!1}});sn.addInitHook("addHandler","touchZoom",rs),sn.BoxZoom=ts,sn.DoubleClickZoom=es,sn.Drag=ns,sn.Keyboard=is,sn.ScrollWheelZoom=ss,sn.TapHold=as,sn.TouchZoom=rs,t.Bounds=I,t.Browser=Ot,t.CRS=j,t.Canvas=Wi,t.Circle=ri,t.CircleMarker=oi,t.Class=T,t.Control=an,t.DivIcon=Ii,t.DivOverlay=Ei,t.DomEvent=en,t.DomUtil=Oe,t.Draggable=bn,t.Evented=A,t.FeatureGroup=Yn,t.GeoJSON=pi,t.GridLayer=Di,t.Handler=_n,t.Icon=Xn,t.ImageOverlay=Pi,t.LatLng=B,t.LatLngBounds=D,t.Layer=Gn,t.LayerGroup=Kn,t.LineUtil=Bn,t.Map=sn,t.Marker=ni,t.Mixin=vn,t.Path=si,t.Point=M,t.PolyUtil=Pn,t.Polygon=ci,t.Polyline=hi,t.Popup=Ai,t.PosAnimation=nn,t.Projection=qn,t.Rectangle=Xi,t.Renderer=Fi,t.SVG=Yi,t.SVGOverlay=Ti,t.TileLayer=Bi,t.Tooltip=Hi,t.Transformation=U,t.Util=S,t.VideoOverlay=Si,t.bind=s,t.bounds=O,t.canvas=Ui,t.circle=li,t.circleMarker=ai,t.control=rn,t.divIcon=Oi,t.extend=n,t.featureGroup=Jn,t.geoJSON=ki,t.geoJson=zi,t.gridLayer=Ri,t.icon=Qn,t.imageOverlay=$i,t.latLng=Z,t.latLngBounds=R,t.layerGroup=Vn,t.map=on,t.marker=ii,t.point=N,t.polygon=ui,t.polyline=di,t.popup=Mi,t.rectangle=Qi,t.setOptions=p,t.stamp=a,t.svg=Ji,t.svgOverlay=Ci,t.tileLayer=Zi,t.tooltip=Ni,t.transformation=G,t.version=e,t.videoOverlay=Li;var ls=window.L;t.noConflict=function(){return window.L=ls,this},window.L=t}(Zt.exports)),Zt.exports);const qt=["temp_new","wind_new","clouds_new","precipitation_new"];let Ft=class extends ht{constructor(){super(...arguments),this.nodes=[],this.owmKey="",this.zoom=10,this.radiusKm=0,this.center=null,this.heightMode="auto",this.pinSize="medium",this.labels=!1,this._owmLayer="",this._markers=[],this._signature="",this._heightApplied=""}firstUpdated(){const t=this.renderRoot.querySelector("#map");t&&(this._map=jt.map(t,{zoomControl:!0,attributionControl:!0}).setView([46,11],this.zoom),this._setBase(),this._drawNodes(),this._resizeObserver=new ResizeObserver(()=>this._map?.invalidateSize()),this._resizeObserver.observe(t),window.setTimeout(()=>this._map?.invalidateSize(),60))}willUpdate(){const t={auto:"clamp(320px, 60vh, 900px)",mobile:"340px",tablet:"520px",desktop:"760px"};this.style.setProperty("--hermes-map-height",t[this.heightMode]??t.auto)}updated(){const t=JSON.stringify([this.nodes.map(t=>[t.nodeNum,t.latitude,t.longitude,t.connected,t.authorized]),this.radiusKm,this.center,this.pinSize,this.labels]);t!==this._signature&&(this._signature=t,this._drawNodes()),this.heightMode!==this._heightApplied&&(this._heightApplied=this.heightMode,window.setTimeout(()=>this._map?.invalidateSize(),50))}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),this._map?.remove(),this._map=void 0}_isDark(){return matchMedia("(prefers-color-scheme: dark)").matches}_setBase(){this._map&&(this._base?.remove(),this._base=jt.tileLayer(this._isDark()?"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png":"https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',maxZoom:19}).addTo(this._map))}_drawNodes(){if(!this._map)return;for(const t of this._markers)t.remove();this._markers=[];const t=[];for(const e of this.nodes){if(null===e.latitude||null===e.longitude)continue;const n=[e.latitude,e.longitude];t.push(n);const i={small:12,medium:16,large:22},s=i[this.pinSize]??i.medium,o=e.authorized?e.connected?"on":"off":"relay",a=this.labels?`<span class="tag">${e.name}</span>`:"",r=jt.marker(n,{icon:jt.divIcon({className:"pin",html:`<div class="${o}" style="width:${s}px;height:${s}px"></div>${a}`,iconSize:[s,s],iconAnchor:[s/2,s/2]}),title:e.name}).addTo(this._map);r.bindPopup(this._popup(e)),this._markers.push(r)}if(this._circle?.remove(),this._circle=void 0,this.radiusKm>0&&this.center)return this._circle=jt.circle(this.center,{radius:1e3*this.radiusKm,color:"#e0a800",weight:2,fillOpacity:.06}).addTo(this._map),void this._map.fitBounds(this._circle.getBounds(),{padding:[20,20]});1===t.length?this._map.setView(t[0],Math.max(this.zoom,13)):t.length>1&&this._map.fitBounds(jt.latLngBounds(t),{padding:[40,40]})}_popup(t){const e=[`<b>${t.name}</b>`];return null!==t.nodeNum&&e.push(`#${t.nodeNum}`),null!==t.battery&&void 0!==t.battery&&e.push(`${t.battery}%`),t.lastSeen&&e.push(t.lastSeen),e.join("<br>")}_toggleOwm(t){this._map&&this.owmKey&&(this._owm?.remove(),this._owm=void 0,this._owmLayer!==t?(this._owmLayer=t,this._owm=jt.tileLayer(`https://tile.openweathermap.org/map/${t}/{z}/{x}/{y}.png?appid=${this.owmKey}`,{opacity:.6,maxZoom:19}).addTo(this._map)):this._owmLayer="")}render(){return W`
      ${this.owmKey?W`
            <div class="toolbar">
              ${qt.map(t=>W`
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
    `}};Ft.styles=[a('\n/* required styles */\n\n.leaflet-pane,\n.leaflet-tile,\n.leaflet-marker-icon,\n.leaflet-marker-shadow,\n.leaflet-tile-container,\n.leaflet-pane > svg,\n.leaflet-pane > canvas,\n.leaflet-zoom-box,\n.leaflet-image-layer,\n.leaflet-layer {\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\t}\n.leaflet-container {\n\toverflow: hidden;\n\t}\n.leaflet-tile,\n.leaflet-marker-icon,\n.leaflet-marker-shadow {\n\t-webkit-user-select: none;\n\t   -moz-user-select: none;\n\t        user-select: none;\n\t  -webkit-user-drag: none;\n\t}\n/* Prevents IE11 from highlighting tiles in blue */\n.leaflet-tile::selection {\n\tbackground: transparent;\n}\n/* Safari renders non-retina tile on retina better with this, but Chrome is worse */\n.leaflet-safari .leaflet-tile {\n\timage-rendering: -webkit-optimize-contrast;\n\t}\n/* hack that prevents hw layers "stretching" when loading new tiles */\n.leaflet-safari .leaflet-tile-container {\n\twidth: 1600px;\n\theight: 1600px;\n\t-webkit-transform-origin: 0 0;\n\t}\n.leaflet-marker-icon,\n.leaflet-marker-shadow {\n\tdisplay: block;\n\t}\n/* .leaflet-container svg: reset svg max-width decleration shipped in Joomla! (joomla.org) 3.x */\n/* .leaflet-container img: map is broken in FF if you have max-width: 100% on tiles */\n.leaflet-container .leaflet-overlay-pane svg {\n\tmax-width: none !important;\n\tmax-height: none !important;\n\t}\n.leaflet-container .leaflet-marker-pane img,\n.leaflet-container .leaflet-shadow-pane img,\n.leaflet-container .leaflet-tile-pane img,\n.leaflet-container img.leaflet-image-layer,\n.leaflet-container .leaflet-tile {\n\tmax-width: none !important;\n\tmax-height: none !important;\n\twidth: auto;\n\tpadding: 0;\n\t}\n\n.leaflet-container img.leaflet-tile {\n\t/* See: https://bugs.chromium.org/p/chromium/issues/detail?id=600120 */\n\tmix-blend-mode: plus-lighter;\n}\n\n.leaflet-container.leaflet-touch-zoom {\n\t-ms-touch-action: pan-x pan-y;\n\ttouch-action: pan-x pan-y;\n\t}\n.leaflet-container.leaflet-touch-drag {\n\t-ms-touch-action: pinch-zoom;\n\t/* Fallback for FF which doesn\'t support pinch-zoom */\n\ttouch-action: none;\n\ttouch-action: pinch-zoom;\n}\n.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {\n\t-ms-touch-action: none;\n\ttouch-action: none;\n}\n.leaflet-container {\n\t-webkit-tap-highlight-color: transparent;\n}\n.leaflet-container a {\n\t-webkit-tap-highlight-color: rgba(51, 181, 229, 0.4);\n}\n.leaflet-tile {\n\tfilter: inherit;\n\tvisibility: hidden;\n\t}\n.leaflet-tile-loaded {\n\tvisibility: inherit;\n\t}\n.leaflet-zoom-box {\n\twidth: 0;\n\theight: 0;\n\t-moz-box-sizing: border-box;\n\t     box-sizing: border-box;\n\tz-index: 800;\n\t}\n/* workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=888319 */\n.leaflet-overlay-pane svg {\n\t-moz-user-select: none;\n\t}\n\n.leaflet-pane         { z-index: 400; }\n\n.leaflet-tile-pane    { z-index: 200; }\n.leaflet-overlay-pane { z-index: 400; }\n.leaflet-shadow-pane  { z-index: 500; }\n.leaflet-marker-pane  { z-index: 600; }\n.leaflet-tooltip-pane   { z-index: 650; }\n.leaflet-popup-pane   { z-index: 700; }\n\n.leaflet-map-pane canvas { z-index: 100; }\n.leaflet-map-pane svg    { z-index: 200; }\n\n.leaflet-vml-shape {\n\twidth: 1px;\n\theight: 1px;\n\t}\n.lvml {\n\tbehavior: none;\n\tdisplay: inline-block;\n\tposition: absolute;\n\t}\n\n\n/* control positioning */\n\n.leaflet-control {\n\tposition: relative;\n\tz-index: 800;\n\tpointer-events: visiblePainted; /* IE 9-10 doesn\'t have auto */\n\tpointer-events: auto;\n\t}\n.leaflet-top,\n.leaflet-bottom {\n\tposition: absolute;\n\tz-index: 1000;\n\tpointer-events: none;\n\t}\n.leaflet-top {\n\ttop: 0;\n\t}\n.leaflet-right {\n\tright: 0;\n\t}\n.leaflet-bottom {\n\tbottom: 0;\n\t}\n.leaflet-left {\n\tleft: 0;\n\t}\n.leaflet-control {\n\tfloat: left;\n\tclear: both;\n\t}\n.leaflet-right .leaflet-control {\n\tfloat: right;\n\t}\n.leaflet-top .leaflet-control {\n\tmargin-top: 10px;\n\t}\n.leaflet-bottom .leaflet-control {\n\tmargin-bottom: 10px;\n\t}\n.leaflet-left .leaflet-control {\n\tmargin-left: 10px;\n\t}\n.leaflet-right .leaflet-control {\n\tmargin-right: 10px;\n\t}\n\n\n/* zoom and fade animations */\n\n.leaflet-fade-anim .leaflet-popup {\n\topacity: 0;\n\t-webkit-transition: opacity 0.2s linear;\n\t   -moz-transition: opacity 0.2s linear;\n\t        transition: opacity 0.2s linear;\n\t}\n.leaflet-fade-anim .leaflet-map-pane .leaflet-popup {\n\topacity: 1;\n\t}\n.leaflet-zoom-animated {\n\t-webkit-transform-origin: 0 0;\n\t    -ms-transform-origin: 0 0;\n\t        transform-origin: 0 0;\n\t}\nsvg.leaflet-zoom-animated {\n\twill-change: transform;\n}\n\n.leaflet-zoom-anim .leaflet-zoom-animated {\n\t-webkit-transition: -webkit-transform 0.25s cubic-bezier(0,0,0.25,1);\n\t   -moz-transition:    -moz-transform 0.25s cubic-bezier(0,0,0.25,1);\n\t        transition:         transform 0.25s cubic-bezier(0,0,0.25,1);\n\t}\n.leaflet-zoom-anim .leaflet-tile,\n.leaflet-pan-anim .leaflet-tile {\n\t-webkit-transition: none;\n\t   -moz-transition: none;\n\t        transition: none;\n\t}\n\n.leaflet-zoom-anim .leaflet-zoom-hide {\n\tvisibility: hidden;\n\t}\n\n\n/* cursors */\n\n.leaflet-interactive {\n\tcursor: pointer;\n\t}\n.leaflet-grab {\n\tcursor: -webkit-grab;\n\tcursor:    -moz-grab;\n\tcursor:         grab;\n\t}\n.leaflet-crosshair,\n.leaflet-crosshair .leaflet-interactive {\n\tcursor: crosshair;\n\t}\n.leaflet-popup-pane,\n.leaflet-control {\n\tcursor: auto;\n\t}\n.leaflet-dragging .leaflet-grab,\n.leaflet-dragging .leaflet-grab .leaflet-interactive,\n.leaflet-dragging .leaflet-marker-draggable {\n\tcursor: move;\n\tcursor: -webkit-grabbing;\n\tcursor:    -moz-grabbing;\n\tcursor:         grabbing;\n\t}\n\n/* marker & overlays interactivity */\n.leaflet-marker-icon,\n.leaflet-marker-shadow,\n.leaflet-image-layer,\n.leaflet-pane > svg path,\n.leaflet-tile-container {\n\tpointer-events: none;\n\t}\n\n.leaflet-marker-icon.leaflet-interactive,\n.leaflet-image-layer.leaflet-interactive,\n.leaflet-pane > svg path.leaflet-interactive,\nsvg.leaflet-image-layer.leaflet-interactive path {\n\tpointer-events: visiblePainted; /* IE 9-10 doesn\'t have auto */\n\tpointer-events: auto;\n\t}\n\n/* visual tweaks */\n\n.leaflet-container {\n\tbackground: #ddd;\n\toutline-offset: 1px;\n\t}\n.leaflet-container a {\n\tcolor: #0078A8;\n\t}\n.leaflet-zoom-box {\n\tborder: 2px dotted #38f;\n\tbackground: rgba(255,255,255,0.5);\n\t}\n\n\n/* general typography */\n.leaflet-container {\n\tfont-family: "Helvetica Neue", Arial, Helvetica, sans-serif;\n\tfont-size: 12px;\n\tfont-size: 0.75rem;\n\tline-height: 1.5;\n\t}\n\n\n/* general toolbar styles */\n\n.leaflet-bar {\n\tbox-shadow: 0 1px 5px rgba(0,0,0,0.65);\n\tborder-radius: 4px;\n\t}\n.leaflet-bar a {\n\tbackground-color: #fff;\n\tborder-bottom: 1px solid #ccc;\n\twidth: 26px;\n\theight: 26px;\n\tline-height: 26px;\n\tdisplay: block;\n\ttext-align: center;\n\ttext-decoration: none;\n\tcolor: black;\n\t}\n.leaflet-bar a,\n.leaflet-control-layers-toggle {\n\tbackground-position: 50% 50%;\n\tbackground-repeat: no-repeat;\n\tdisplay: block;\n\t}\n.leaflet-bar a:hover,\n.leaflet-bar a:focus {\n\tbackground-color: #f4f4f4;\n\t}\n.leaflet-bar a:first-child {\n\tborder-top-left-radius: 4px;\n\tborder-top-right-radius: 4px;\n\t}\n.leaflet-bar a:last-child {\n\tborder-bottom-left-radius: 4px;\n\tborder-bottom-right-radius: 4px;\n\tborder-bottom: none;\n\t}\n.leaflet-bar a.leaflet-disabled {\n\tcursor: default;\n\tbackground-color: #f4f4f4;\n\tcolor: #bbb;\n\t}\n\n.leaflet-touch .leaflet-bar a {\n\twidth: 30px;\n\theight: 30px;\n\tline-height: 30px;\n\t}\n.leaflet-touch .leaflet-bar a:first-child {\n\tborder-top-left-radius: 2px;\n\tborder-top-right-radius: 2px;\n\t}\n.leaflet-touch .leaflet-bar a:last-child {\n\tborder-bottom-left-radius: 2px;\n\tborder-bottom-right-radius: 2px;\n\t}\n\n/* zoom control */\n\n.leaflet-control-zoom-in,\n.leaflet-control-zoom-out {\n\tfont: bold 18px \'Lucida Console\', Monaco, monospace;\n\ttext-indent: 1px;\n\t}\n\n.leaflet-touch .leaflet-control-zoom-in, .leaflet-touch .leaflet-control-zoom-out  {\n\tfont-size: 22px;\n\t}\n\n\n/* layers control */\n\n.leaflet-control-layers {\n\tbox-shadow: 0 1px 5px rgba(0,0,0,0.4);\n\tbackground: #fff;\n\tborder-radius: 5px;\n\t}\n.leaflet-control-layers-toggle {\n\tbackground-image: none;\n\twidth: 36px;\n\theight: 36px;\n\t}\n.leaflet-retina .leaflet-control-layers-toggle {\n\tbackground-image: none;\n\tbackground-size: 26px 26px;\n\t}\n.leaflet-touch .leaflet-control-layers-toggle {\n\twidth: 44px;\n\theight: 44px;\n\t}\n.leaflet-control-layers .leaflet-control-layers-list,\n.leaflet-control-layers-expanded .leaflet-control-layers-toggle {\n\tdisplay: none;\n\t}\n.leaflet-control-layers-expanded .leaflet-control-layers-list {\n\tdisplay: block;\n\tposition: relative;\n\t}\n.leaflet-control-layers-expanded {\n\tpadding: 6px 10px 6px 6px;\n\tcolor: #333;\n\tbackground: #fff;\n\t}\n.leaflet-control-layers-scrollbar {\n\toverflow-y: scroll;\n\toverflow-x: hidden;\n\tpadding-right: 5px;\n\t}\n.leaflet-control-layers-selector {\n\tmargin-top: 2px;\n\tposition: relative;\n\ttop: 1px;\n\t}\n.leaflet-control-layers label {\n\tdisplay: block;\n\tfont-size: 13px;\n\tfont-size: 1.08333em;\n\t}\n.leaflet-control-layers-separator {\n\theight: 0;\n\tborder-top: 1px solid #ddd;\n\tmargin: 5px -10px 5px -6px;\n\t}\n\n/* Default icon URLs */\n.leaflet-default-icon-path { /* used only in path-guessing heuristic, see L.Icon.Default */\n\tbackground-image: none;\n\t}\n\n\n/* attribution and scale controls */\n\n.leaflet-container .leaflet-control-attribution {\n\tbackground: #fff;\n\tbackground: rgba(255, 255, 255, 0.8);\n\tmargin: 0;\n\t}\n.leaflet-control-attribution,\n.leaflet-control-scale-line {\n\tpadding: 0 5px;\n\tcolor: #333;\n\tline-height: 1.4;\n\t}\n.leaflet-control-attribution a {\n\ttext-decoration: none;\n\t}\n.leaflet-control-attribution a:hover,\n.leaflet-control-attribution a:focus {\n\ttext-decoration: underline;\n\t}\n.leaflet-attribution-flag {\n\tdisplay: inline !important;\n\tvertical-align: baseline !important;\n\twidth: 1em;\n\theight: 0.6669em;\n\t}\n.leaflet-left .leaflet-control-scale {\n\tmargin-left: 5px;\n\t}\n.leaflet-bottom .leaflet-control-scale {\n\tmargin-bottom: 5px;\n\t}\n.leaflet-control-scale-line {\n\tborder: 2px solid #777;\n\tborder-top: none;\n\tline-height: 1.1;\n\tpadding: 2px 5px 1px;\n\twhite-space: nowrap;\n\t-moz-box-sizing: border-box;\n\t     box-sizing: border-box;\n\tbackground: rgba(255, 255, 255, 0.8);\n\ttext-shadow: 1px 1px #fff;\n\t}\n.leaflet-control-scale-line:not(:first-child) {\n\tborder-top: 2px solid #777;\n\tborder-bottom: none;\n\tmargin-top: -2px;\n\t}\n.leaflet-control-scale-line:not(:first-child):not(:last-child) {\n\tborder-bottom: 2px solid #777;\n\t}\n\n.leaflet-touch .leaflet-control-attribution,\n.leaflet-touch .leaflet-control-layers,\n.leaflet-touch .leaflet-bar {\n\tbox-shadow: none;\n\t}\n.leaflet-touch .leaflet-control-layers,\n.leaflet-touch .leaflet-bar {\n\tborder: 2px solid rgba(0,0,0,0.2);\n\tbackground-clip: padding-box;\n\t}\n\n\n/* popup */\n\n.leaflet-popup {\n\tposition: absolute;\n\ttext-align: center;\n\tmargin-bottom: 20px;\n\t}\n.leaflet-popup-content-wrapper {\n\tpadding: 1px;\n\ttext-align: left;\n\tborder-radius: 12px;\n\t}\n.leaflet-popup-content {\n\tmargin: 13px 24px 13px 20px;\n\tline-height: 1.3;\n\tfont-size: 13px;\n\tfont-size: 1.08333em;\n\tmin-height: 1px;\n\t}\n.leaflet-popup-content p {\n\tmargin: 17px 0;\n\tmargin: 1.3em 0;\n\t}\n.leaflet-popup-tip-container {\n\twidth: 40px;\n\theight: 20px;\n\tposition: absolute;\n\tleft: 50%;\n\tmargin-top: -1px;\n\tmargin-left: -20px;\n\toverflow: hidden;\n\tpointer-events: none;\n\t}\n.leaflet-popup-tip {\n\twidth: 17px;\n\theight: 17px;\n\tpadding: 1px;\n\n\tmargin: -10px auto 0;\n\tpointer-events: auto;\n\n\t-webkit-transform: rotate(45deg);\n\t   -moz-transform: rotate(45deg);\n\t    -ms-transform: rotate(45deg);\n\t        transform: rotate(45deg);\n\t}\n.leaflet-popup-content-wrapper,\n.leaflet-popup-tip {\n\tbackground: white;\n\tcolor: #333;\n\tbox-shadow: 0 3px 14px rgba(0,0,0,0.4);\n\t}\n.leaflet-container a.leaflet-popup-close-button {\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\tborder: none;\n\ttext-align: center;\n\twidth: 24px;\n\theight: 24px;\n\tfont: 16px/24px Tahoma, Verdana, sans-serif;\n\tcolor: #757575;\n\ttext-decoration: none;\n\tbackground: transparent;\n\t}\n.leaflet-container a.leaflet-popup-close-button:hover,\n.leaflet-container a.leaflet-popup-close-button:focus {\n\tcolor: #585858;\n\t}\n.leaflet-popup-scrolled {\n\toverflow: auto;\n\t}\n\n.leaflet-oldie .leaflet-popup-content-wrapper {\n\t-ms-zoom: 1;\n\t}\n.leaflet-oldie .leaflet-popup-tip {\n\twidth: 24px;\n\tmargin: 0 auto;\n\n\t-ms-filter: "progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)";\n\tfilter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678);\n\t}\n\n.leaflet-oldie .leaflet-control-zoom,\n.leaflet-oldie .leaflet-control-layers,\n.leaflet-oldie .leaflet-popup-content-wrapper,\n.leaflet-oldie .leaflet-popup-tip {\n\tborder: 1px solid #999;\n\t}\n\n\n/* div icon */\n\n.leaflet-div-icon {\n\tbackground: #fff;\n\tborder: 1px solid #666;\n\t}\n\n\n/* Tooltip */\n/* Base styles for the element that has a tooltip */\n.leaflet-tooltip {\n\tposition: absolute;\n\tpadding: 6px;\n\tbackground-color: #fff;\n\tborder: 1px solid #fff;\n\tborder-radius: 3px;\n\tcolor: #222;\n\twhite-space: nowrap;\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n\tpointer-events: none;\n\tbox-shadow: 0 1px 3px rgba(0,0,0,0.4);\n\t}\n.leaflet-tooltip.leaflet-interactive {\n\tcursor: pointer;\n\tpointer-events: auto;\n\t}\n.leaflet-tooltip-top:before,\n.leaflet-tooltip-bottom:before,\n.leaflet-tooltip-left:before,\n.leaflet-tooltip-right:before {\n\tposition: absolute;\n\tpointer-events: none;\n\tborder: 6px solid transparent;\n\tbackground: transparent;\n\tcontent: "";\n\t}\n\n/* Directions */\n\n.leaflet-tooltip-bottom {\n\tmargin-top: 6px;\n}\n.leaflet-tooltip-top {\n\tmargin-top: -6px;\n}\n.leaflet-tooltip-bottom:before,\n.leaflet-tooltip-top:before {\n\tleft: 50%;\n\tmargin-left: -6px;\n\t}\n.leaflet-tooltip-top:before {\n\tbottom: 0;\n\tmargin-bottom: -12px;\n\tborder-top-color: #fff;\n\t}\n.leaflet-tooltip-bottom:before {\n\ttop: 0;\n\tmargin-top: -12px;\n\tmargin-left: -6px;\n\tborder-bottom-color: #fff;\n\t}\n.leaflet-tooltip-left {\n\tmargin-left: -6px;\n}\n.leaflet-tooltip-right {\n\tmargin-left: 6px;\n}\n.leaflet-tooltip-left:before,\n.leaflet-tooltip-right:before {\n\ttop: 50%;\n\tmargin-top: -6px;\n\t}\n.leaflet-tooltip-left:before {\n\tright: 0;\n\tmargin-right: -12px;\n\tborder-left-color: #fff;\n\t}\n.leaflet-tooltip-right:before {\n\tleft: 0;\n\tmargin-left: -12px;\n\tborder-right-color: #fff;\n\t}\n\n/* Printing */\n\n@media print {\n\t/* Prevent printers from removing background-images of controls. */\n\t.leaflet-control {\n\t\t-webkit-print-color-adjust: exact;\n\t\tprint-color-adjust: exact;\n\t\t}\n\t}\n'),r`
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
    `],t([mt({attribute:!1})],Ft.prototype,"hass",void 0),t([mt({attribute:!1})],Ft.prototype,"nodes",void 0),t([mt()],Ft.prototype,"owmKey",void 0),t([mt({type:Number})],Ft.prototype,"zoom",void 0),t([mt({type:Number})],Ft.prototype,"radiusKm",void 0),t([mt({attribute:!1})],Ft.prototype,"center",void 0),t([mt()],Ft.prototype,"heightMode",void 0),t([mt()],Ft.prototype,"pinSize",void 0),t([mt({type:Boolean})],Ft.prototype,"labels",void 0),t([gt()],Ft.prototype,"_owmLayer",void 0),Ft=t([ct("hermes-map")],Ft);const Wt=["auto","mobile","tablet","desktop"];function Ut(t,e){const n=t.settings?.map_nodes??[],i=function(t,e,n=!1,i=120,s=[]){const o=new Set((e??[]).map(Number)),a=new Set((s??[]).map(Number));if(!n&&!o.size)return[];const r=new Map,l=new Map;for(const e of St(t,Pt)){const t=e.device_id;t&&(e.entity_id.startsWith("device_tracker.")?r.set(t,e.entity_id):e.entity_id.includes("last_heard")&&l.set(t,e.entity_id))}const h=[];for(const e of Object.values(t.devices??{})){const s=Tt(t,e.id);if(null===s)continue;const d=o.has(s);if(!n&&!d)continue;const c=r.get(e.id),u=c?t.states[c]:void 0,p=u?.attributes?.latitude,m=u?.attributes?.longitude,g=u?.attributes?.battery_level;h.push({nodeNum:s,name:e.name_by_user||e.name||u?.attributes?.friendly_name||String(s),latitude:"number"==typeof p?p:null,longitude:"number"==typeof m?m:null,battery:"number"==typeof g?g:null,lastSeen:u?.last_changed?new Date(u.last_changed).toLocaleString():"",connected:At(t,l.get(e.id),i),selected:d,authorized:a.has(s)})}return h.sort((t,e)=>t.name.localeCompare(e.name))}(t.hass,n,t.showAll,t.settings?.reachable_minutes??120,t.authorized),s=function(t){const e=t.find(t=>t.selected&&null!==t.latitude)??t.find(t=>null!==t.latitude);return e&&null!==e.latitude&&null!==e.longitude?[e.latitude,e.longitude]:null}(i),o=t.radiusOn&&null!==s&&t.radiusKm>0,a=o?i.filter(e=>null===e.latitude||null===e.longitude||function(t,e,n,i){const s=t=>t*Math.PI/180,o=s(n-t),a=s(i-e),r=Math.sin(o/2)**2+Math.cos(s(t))*Math.cos(s(n))*Math.sin(a/2)**2;return 12742*Math.asin(Math.sqrt(r))}(s[0],s[1],e.latitude,e.longitude)<=t.radiusKm):i,r=a.filter(t=>null!==t.latitude&&null!==t.longitude),l=i.some(t=>null!==t.latitude);return W`
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

      <span class="radius">
        <label class="check" style="gap:6px">
          <span>${e("map.size")}</span>
          <select
            @change=${e=>t.onHeightChange(e.target.value)}
          >
            ${Wt.map(n=>W`
                <option
                  value=${n}
                  ?selected=${(t.settings?.map_height??"auto")===n}
                >
                  ${e(`map.size.${n}`)}
                </option>
              `)}
          </select>
        </label>
      </span>

      ${t.radiusOn?W`
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
      <span class="dot relay"></span>${e("map.relay")}
    </div>

    ${n.length||t.showAll?0===r.length?W`<div class="empty">
            ${e(l&&o?"map.noneInRadius":"map.noPosition")}
          </div>`:W`
            <hermes-map
              .hass=${t.hass}
              .nodes=${r}
              .owmKey=${t.settings?.openweather_api_key??""}
              .zoom=${t.settings?.map_zoom??10}
              .radiusKm=${t.radiusOn?t.radiusKm:0}
              .center=${s}
              .heightMode=${t.settings?.map_height??"auto"}
              .pinSize=${t.settings?.map_pin_size??"medium"}
              .labels=${t.settings?.map_labels??!1}
            ></hermes-map>
          `:W`<div class="empty">${e("map.noSelection")}</div>`}

    ${a.length?W`
          <div class="rows" style="margin-top:14px">
            ${a.map(t=>W`
                <div class="row">
                  <span class="k">
                    <span
                      class="dot ${t.authorized?t.connected?"on":"off":"relay"}"
                    ></span>
                    ${t.name}
                  </span>
                  <span class="v">
                    ${null!==t.latitude&&null!==t.longitude?`${t.latitude.toFixed(5)}, ${t.longitude.toFixed(5)}`:e("map.waiting")}
                  </span>
                </div>
              `)}
          </div>
        `:""}
  `}let Gt=class extends ht{constructor(){super(...arguments),this.value="",this.placeholder="",this.domains=[],this._query="",this._open=!1,this._active=0}_label(t){return this.hass?.states[t]?.attributes?.friendly_name||t}_matches(){if(!this.hass)return[];const t=this._query.trim().toLowerCase(),e=this.domains?.length?new Set(this.domains):null,n=Object.keys(this.hass.states).filter(t=>!e||e.has(t.split(".")[0]));return t?n.filter(e=>e.toLowerCase().includes(t)||this._label(e).toLowerCase().includes(t)).sort().slice(0,60):n.slice(0,60).sort()}_commit(t){this.value=t,this._query="",this._open=!1,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t},bubbles:!0,composed:!0}))}_onKeyDown(t){const e=this._matches();"ArrowDown"===t.key?(t.preventDefault(),this._open=!0,this._active=Math.min(this._active+1,e.length-1)):"ArrowUp"===t.key?(t.preventDefault(),this._active=Math.max(this._active-1,0)):"Enter"===t.key?this._open&&e[this._active]&&(t.preventDefault(),this._commit(e[this._active])):"Escape"===t.key&&(this._open=!1)}render(){const t=this._matches(),e=this._open?this._query:this.value;return W`
      <input
        .value=${e}
        placeholder=${this.placeholder}
        @focus=${()=>{this._open=!0,this._query="",this._active=0}}
        @input=${t=>{this._query=t.target.value,this._open=!0,this._active=0}}
        @keydown=${this._onKeyDown}
        @blur=${()=>window.setTimeout(()=>this._open=!1,150)}
      />
      ${this._open?W`
            <div class="list">
              ${t.length?t.map((t,e)=>W`
                      <div
                        class="opt"
                        data-active=${e===this._active?"1":"0"}
                        @mousedown=${e=>{e.preventDefault(),this._commit(t)}}
                      >
                        <span class="name">${this._label(t)}</span>
                        <span class="id">${t}</span>
                      </div>
                    `):W`<div class="none">${this._query}</div>`}
            </div>
          `:""}
    `}};Gt.styles=r`
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
  `,t([mt({attribute:!1})],Gt.prototype,"hass",void 0),t([mt()],Gt.prototype,"value",void 0),t([mt()],Gt.prototype,"placeholder",void 0),t([mt({attribute:!1})],Gt.prototype,"domains",void 0),t([gt()],Gt.prototype,"_query",void 0),t([gt()],Gt.prototype,"_open",void 0),t([gt()],Gt.prototype,"_active",void 0),Gt=t([ct("hermes-entity-picker")],Gt);const Kt=[{id:"turn_on",label:"Turn on",service:"homeassistant.turn_on"},{id:"turn_off",label:"Turn off",service:"homeassistant.turn_off"},{id:"toggle",label:"Toggle",service:"homeassistant.toggle"}];let Vt={light:[{id:"turn_on",label:"Turn on",service:"light.turn_on"},{id:"turn_on_brightness",label:"Turn on at brightness",service:"light.turn_on",value:{key:"brightness_pct",type:"number",unit:"%",min:1,max:100,step:1,default:80}},{id:"turn_off",label:"Turn off",service:"light.turn_off"},{id:"toggle",label:"Toggle",service:"light.toggle"}],switch:Kt,climate:[{id:"set_temperature",label:"Set temperature",service:"climate.set_temperature",value:{key:"temperature",type:"number",unit:"C",min:5,max:35,step:.5,default:21}},{id:"turn_on",label:"Turn on",service:"climate.turn_on"},{id:"turn_off",label:"Turn off",service:"climate.turn_off"}],cover:[{id:"open",label:"Open",service:"cover.open_cover"},{id:"close",label:"Close",service:"cover.close_cover"},{id:"stop",label:"Stop",service:"cover.stop_cover"},{id:"set_position",label:"Set position",service:"cover.set_cover_position",value:{key:"position",type:"number",unit:"%",min:0,max:100,step:5,default:100}}]},Yt={light:"light",switch:"switch",input_boolean:"switch",climate:"climate",cover:"cover"},Jt=Kt;const Xt={temperature:{min:"min_temp",max:"max_temp",step:"target_temp_step"},percentage:{step:"percentage_step"},value:{min:"min",max:"max",step:"step"}},Qt={hvac_mode:"hvac_modes",preset_mode:"preset_modes",fan_mode:"fan_modes",swing_mode:"swing_modes",operation_mode:"operation_list",source:"source_list"};function te(t,e,n){const i=t.states[e]?.attributes??{},s={...n},o=Xt[n.key]??{};for(const t of["min","max","step"]){const e=o[t],n=e?i[e]:void 0;"number"==typeof n&&(s[t]=n)}const a=Qt[n.key],r=a?i[a]:void 0;return Array.isArray(r)&&r.length&&(s.options=r.map(String),void 0!==s.default&&s.options.includes(String(s.default))||(s.default=s.options[0])),"number"==typeof s.default&&("number"==typeof s.min&&s.default<s.min&&(s.default=s.min),"number"==typeof s.max&&s.default>s.max&&(s.default=s.max)),s}const ee=new Set(["friendly_name","icon","supported_features","device_class","entity_picture","attribution","supported_color_modes","hs_color","rgb_color","xy_color"]);function ne(t,e,n){if("channel"!==e.mode)return n("messages.onDm");const i=e.channel_index??0,s=t.channels.find(t=>t.index===i);return s?`${i}: ${s.name}`:`${n("settings.channel")} ${i}`}function ie(t,e){if(t.loadError)return W`
      <div class="empty">
        <div>${e("common.loadError")}</div>
        <div class="sub-error">${t.loadError}</div>
      </div>
    `;if(!t.entries.length)return W`<div class="empty">${e("common.noEntries")}</div>`;const n=t.entries.find(e=>e.entry_id===t.selectedEntry)??t.entries[0];return W`
    <h2 class="screen-title">
      ${e("messages.title")}
      <span class="channel-badge" title=${e("messages.listeningHint")}>
        ${e("messages.listening")} ${ne(t,n,e)}
      </span>
    </h2>

    ${t.entries.length>1?W`
          <div class="field">
            <label>${e("messages.gateway")}</label>
            <select
              @change=${e=>t.onSelectEntry(e.target.value)}
            >
              ${t.entries.map(t=>W`
                  <option
                    value=${t.entry_id}
                    ?selected=${t.entry_id===n.entry_id}
                  >
                    ${t.title}
                  </option>
                `)}
            </select>
          </div>
        `:""}

    ${t.editing?function(t,e,n){const i=t.entries.find(e=>e.entry_id===t.selectedEntry)??t.entries[0],s="direct_message"===i?.mode,o=e=>n=>t.onDraftInput(e,n.target.value);return W`
    <div class="panel">
      <div class="field">
        <label>${n("messages.keyword")}</label>
        <input .value=${e.keyword??""} @input=${o("keyword")} />
        <span class="hint">${n("messages.keywordHint")}</span>
      </div>

      <div class="field">
        <label>${n("messages.matchType")}</label>
        <select @change=${o("match_type")}>
          <option value="exact" ?selected=${"exact"===e.match_type}>
            ${n("messages.exact")}
          </option>
          <option value="startswith" ?selected=${"startswith"===e.match_type}>
            ${n("messages.startswith")}
          </option>
        </select>
        <span class="hint">${n("messages.matchHint")}</span>
      </div>

      ${function(t,e){const n=t.paletteEntity;return W`
    <div class="palette">
      <div class="field">
        <label>${e("messages.paletteEntity")}</label>
        <hermes-entity-picker
          .hass=${t.hass}
          .value=${n}
          placeholder="light.kitchen"
          @value-changed=${e=>t.onPaletteEntity(e.detail.value)}
        ></hermes-entity-picker>
        <span class="hint">${e("messages.paletteHint")}</span>
      </div>

      ${n&&t.hass.states[n]?W`
            <div class="section-title">${e("messages.groupRead")}</div>
            <div class="chips">
              <button
                class="chip read"
                @click=${()=>t.onInsert(function(t){return`{state:${t}}`}(n))}
              >
                ${e("messages.readState")}
              </button>
              ${function(t,e){const n=t.states[e];return n?.attributes?Object.entries(n.attributes).filter(([t,e])=>!ee.has(t)&&("string"==typeof e||"number"==typeof e||"boolean"==typeof e)).map(([t])=>t).sort():[]}(t.hass,n).map(e=>W`
                  <button
                    class="chip read"
                    @click=${()=>t.onInsert(function(t,e){return`{attr:${t}:${e}}`}(n,e))}
                  >
                    ${e}
                  </button>
                `)}
            </div>

            <div class="section-title">${e("messages.groupDo")}</div>
            <div class="chips">
              ${function(t){const e=Yt[function(t){return t.split(".")[0]??""}(t)];return e&&Vt[e]||Jt}(n).map(e=>W`
                  <span class="chip-group">
                    <button
                      class="chip do"
                      @click=${()=>t.onInsert(function(t,e,n){return t.value&&void 0!==n&&""!==n?`{do:${t.service}:${e}:${t.value.key}=${n}}`:`{do:${t.service}:${e}}`}(e,n,t.paletteValues[e.id]??(e.value?te(t.hass,n,e.value).default:void 0)))}
                    >
                      ${e.label}
                    </button>
                    ${function(t,e,n){if(!e.value)return"";const i=te(t.hass,n,e.value),s=t.paletteValues[e.id]??i.default??"";if("enum"===i.type)return W`
      <select
        class="inline"
        @change=${n=>t.onPaletteValue(e.id,n.target.value)}
      >
        ${(i.options??[]).map(t=>W`
            <option value=${t} ?selected=${t===s}>
              ${t}
            </option>
          `)}
      </select>
    `;const o=function(t){if("enum"===t.type)return"";if("number"!=typeof t.min||"number"!=typeof t.max)return"";const e=t.unit?` ${t.unit}`:"";return`${t.min} to ${t.max}${e}`}(i);return W`
    <input
      class="inline"
      type="number"
      min=${i.min??0}
      max=${i.max??100}
      step=${i.step??1}
      .value=${String(s)}
      @input=${n=>t.onPaletteValue(e.id,Number(n.target.value))}
    />
    ${o?W`<span class="unit">${o}</span>`:""}
  `}(t,e,n)}
                  </span>
                `)}
            </div>
          `:W`<div class="hint">${e("messages.pickEntityFirst")}</div>`}
    </div>
  `}(t,n)}

      <div class="field">
        <label>${n("messages.replyTemplate")}</label>
        <textarea
          id="hermes-template"
          .value=${e.reply_template??""}
          @input=${o("reply_template")}
        ></textarea>
        <span class="hint">${n("messages.templateHint")}</span>
      </div>

      <div class="field">
        <label>${n("messages.replyTo")}</label>
        <select @change=${o("reply_to")}>
          <option value="channel" ?selected=${"channel"===e.reply_to}>
            ${n("messages.onChannel")}
          </option>
          <option value="sender_dm" ?selected=${"sender_dm"===e.reply_to}>
            ${n("messages.senderDm")}
          </option>
        </select>
      </div>

      ${"channel"===e.reply_to?W`
            <div class="field indented">
              <label>${n("messages.replyChannel")}</label>
              <select
                ?disabled=${s}
                @change=${e=>{const n=e.target.value;t.onDraftInput("reply_channel",""===n?null:Number(n))}}
              >
                <option
                  value=""
                  ?selected=${null===e.reply_channel||void 0===e.reply_channel}
                >
                  ${n("messages.replyChannelSame")}
                </option>
                ${t.channels.map(t=>W`
                    <option
                      value=${t.index}
                      ?selected=${e.reply_channel===t.index}
                    >
                      ${t.index}: ${t.name}
                    </option>
                  `)}
              </select>
              <span class="hint">
                ${n(s?"messages.dmGatewayNote":"messages.replyChannelHint")}
              </span>
            </div>
          `:""}

      <button class="btn link" @click=${t.onToggleAdvanced}>
        ${t.showAdvanced?n("messages.hideAdvanced"):n("messages.advanced")}
      </button>

      ${t.showAdvanced?W`
            <div class="field" style="margin-top:10px">
              <label>${n("messages.service")}</label>
              <input
                .value=${e.service??""}
                placeholder="light.turn_off"
                @input=${o("service")}
              />
              <span class="hint">${n("messages.serviceHint")}</span>
            </div>
            <div class="field">
              <label>${n("messages.target")}</label>
              <hermes-entity-picker
                .hass=${t.hass}
                .value=${e.target?.entity_id??""}
                placeholder="light.kitchen"
                @value-changed=${e=>{const n=e.detail.value;t.onDraftInput("target",n?{entity_id:n}:void 0)}}
              ></hermes-entity-picker>
            </div>
          `:""}

      <div class="actions">
        <button class="btn primary" @click=${t.onSave}>
          ${n("common.save")}
        </button>
        <button class="btn" @click=${t.onCancel}>${n("common.cancel")}</button>
      </div>
    </div>
  `}(t,t.editing,e):W`
          ${n.commands.length?n.commands.map(i=>function(t,e,n,i){const s=e.service||e.reply_template||"",o=e.reply_channel,a=null!=o?t.channels.find(t=>t.index===o):void 0,r="sender_dm"===e.reply_to?i("messages.onDm"):null!=o?`${o}${a?`: ${a.name}`:""}`:ne(t,n,i);return W`
    <div class="list-row">
      <div class="meta">
        <span class="kw">${e.keyword}</span>
        <span class="sub">${s}</span>
      </div>
      <div class="actions" style="margin:0">
        <span class="channel-badge small" title=${i("messages.repliesOn")}>
          ${r}
        </span>
        <button class="btn" @click=${()=>t.onEdit(e)}>
          ${i("common.edit")}
        </button>
        <button class="btn" @click=${()=>t.onDuplicate(e)}>
          ${i("common.duplicate")}
        </button>
        <button class="btn danger" @click=${()=>t.onDelete(e)}>
          ${i("common.delete")}
        </button>
      </div>
    </div>
  `}(t,i,n,e)):W`<div class="empty">${e("messages.empty")}</div>`}
          <div class="actions">
            <button class="btn primary" @click=${t.onNew}>
              ${e("messages.add")}
            </button>
          </div>

          ${function(t,e,n){if(t.editingPreset){const e=t.editingPreset;return W`
      <div class="section" style="margin-top:22px">
        <div class="section-title">${n("presets.title")}</div>
        <div class="panel">
          <div class="field">
            <label>${n("presets.label")}</label>
            <input
              .value=${e.label??""}
              @input=${e=>t.onPresetInput("label",e.target.value)}
            />
          </div>
          <div class="field">
            <label>${n("presets.text")}</label>
            <textarea
              .value=${e.text??""}
              @input=${e=>t.onPresetInput("text",e.target.value)}
            ></textarea>
          </div>
          <div class="field">
            <label>${n("presets.channel")}</label>
            <select
              ?disabled=${Boolean(e.node_id)}
              @change=${e=>{const n=e.target.value;t.onPresetInput("channel",""===n?null:Number(n))}}
            >
              <option value="" ?selected=${null===e.channel||void 0===e.channel}>
                ${n("presets.channelDefault")}
              </option>
              ${t.channels.map(t=>W`
                  <option
                    value=${t.index}
                    ?selected=${e.channel===t.index}
                  >
                    ${t.index}: ${t.name}
                  </option>
                `)}
            </select>
            <span class="hint">${n("presets.channelHint")}</span>
          </div>

          <div class="field">
            <label>${n("presets.node")}</label>
            <input
              type="number"
              .value=${e.node_id?String(e.node_id):""}
              @input=${e=>{const n=e.target.value.trim();t.onPresetInput("node_id",n?Number(n):null)}}
            />
            <span class="hint">${n("presets.nodeHint")}</span>
          </div>
          <div class="actions">
            <button class="btn primary" @click=${t.onPresetSave}>
              ${n("common.save")}
            </button>
            <button class="btn" @click=${t.onPresetCancel}>
              ${n("common.cancel")}
            </button>
          </div>
        </div>
      </div>
    `}return W`
    <div class="section" style="margin-top:22px">
      <div class="section-title">${n("presets.title")}</div>
      ${t.presets.length?t.presets.map(i=>W`
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
                    @click=${()=>t.onPresetSend(i)}
                    ?disabled=${!e}
                  >
                    ${n("presets.send")}
                  </button>
                  <button class="btn" @click=${()=>t.onPresetEdit(i)}>
                    ${n("common.edit")}
                  </button>
                  <button
                    class="btn danger"
                    @click=${()=>t.onPresetDelete(i)}
                  >
                    ${n("common.delete")}
                  </button>
                </div>
              </div>
            `):W`<div class="empty">${n("presets.empty")}</div>`}
      <div class="actions">
        <button class="btn" @click=${t.onPresetNew}>${n("presets.add")}</button>
      </div>
    </div>
  `}(t,n,e)}
        `}
  `}function se(t,e,n,i,s=null){if(s)return W`<div class="sub-error">${s}</div>`;if(!t.length)return W`<div class="hint">${i}</div>`;const o=new Set((e??[]).map(Number));return W`
    <div class="checklist">
      ${t.map(t=>W`
          <label class="check">
            <input
              type="checkbox"
              .checked=${o.has(t.node_num)}
              @change=${e=>{const i=new Set(o);e.target.checked?i.add(t.node_num):i.delete(t.node_num),n([...i].sort((t,e)=>t-e))}}
            />
            <span>${t.name}</span>
            <span class="node-num">${t.node_num}</span>
          </label>
        `)}
    </div>
  `}function oe(t,e){const n=t.settings,i=e=>t.draftGlobal[e]??n?.[e];return W`
    <h2 class="screen-title">
      ${e("settings.title")}
      <button
        class="btn refresh"
        ?disabled=${t.refreshing}
        title=${e("settings.refreshHint")}
        @click=${t.onRefresh}
      >
        ${t.refreshing?e("common.loading"):e("settings.refresh")}
      </button>
      ${t.saved?W`<span class="toast">${e("common.saved")}</span>`:""}
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
            .value=${String(i("openweather_api_key")??"")}
            @input=${e=>t.onGlobalInput("openweather_api_key",e.target.value)}
          />
          <span class="hint">${e("settings.owmHint")}</span>
        </div>

        <div class="field">
          <label>${e("settings.mapNodes")}</label>
          ${se(t.nodes,i("map_nodes")??[],e=>t.onGlobalInput("map_nodes",e),e("settings.noNodes"),t.nodesError)}
          <span class="hint">${e("settings.mapNodesHint")}</span>
        </div>

        <div class="field">
          <label>${e("settings.reachable")}</label>
          <input
            type="number"
            min="1"
            max="1440"
            step="5"
            .value=${String(i("reachable_minutes")??120)}
            @input=${e=>t.onGlobalInput("reachable_minutes",Number(e.target.value))}
          />
          <span class="hint">${e("settings.reachableHint")}</span>
        </div>

        <div class="field">
          <label>${e("settings.pinSize")}</label>
          <select
            @change=${e=>t.onGlobalInput("map_pin_size",e.target.value)}
          >
            ${["small","medium","large"].map(t=>W`
                <option
                  value=${t}
                  ?selected=${(i("map_pin_size")??"medium")===t}
                >
                  ${e(`settings.pinSize.${t}`)}
                </option>
              `)}
          </select>
        </div>

        <div class="field">
          <label class="check">
            <input
              type="checkbox"
              .checked=${Boolean(i("map_labels"))}
              @change=${e=>t.onGlobalInput("map_labels",e.target.checked)}
            />
            <span>${e("settings.mapLabels")}</span>
          </label>
          <span class="hint">${e("settings.mapLabelsHint")}</span>
        </div>

        <div class="actions">
          <button class="btn primary" @click=${t.onSaveGlobal}>
            ${e("common.save")}
          </button>
          ${t.saved?W`<span class="toast">${e("common.saved")}</span>`:""}
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">${e("settings.firmware")}</div>
      <div class="panel">
        ${t.firmware?W`<div class="row">
              <span class="k">${e("settings.gatewayFirmware")}</span>
              <span class="v">${t.firmware}</span>
            </div>`:""}
        <div class="row">
          <span class="k">${e("settings.channelsFound")}</span>
          <span class="v">
            ${t.channels.length?t.channels.map(t=>`${t.index}: ${t.name}`).join(", "):e("settings.channelsNone")}
          </span>
        </div>
        <div class="note">${e("settings.firmwareSameNote")}</div>
        <div class="note">${e("settings.firmwareDmNote")}</div>
        <div class="hint">${e("settings.firmwareOnlyGateway")}</div>
      </div>
    </div>

    ${function(t,e){const n=t.radioConfig;if(!n||!Object.keys(n.values).length)return W``;const i=e=>t.radioDraft[e]??n.values[e],s=Object.keys(t.radioDraft).length>0,o=s=>{const o=i(s),a=n.options[s];return a?W`
        <div class="field">
          <label>${e(`radioCfg.${s}`)}</label>
          <select
            @change=${e=>t.onRadioInput(s,e.target.value)}
          >
            ${a.map(t=>W`
                <option value=${t} ?selected=${t===o}>
                  ${t}
                </option>
              `)}
          </select>
        </div>
      `:"boolean"==typeof n.values[s]?W`
        <div class="field">
          <label class="check">
            <input
              type="checkbox"
              .checked=${Boolean(o)}
              @change=${e=>t.onRadioInput(s,e.target.checked)}
            />
            <span>${e(`radioCfg.${s}`)}</span>
          </label>
        </div>
      `:W`
      <div class="field">
        <label>${e(`radioCfg.${s}`)}</label>
        <input
          type="number"
          .value=${String(o??"")}
          @input=${e=>t.onRadioInput(s,Number(e.target.value))}
        />
      </div>
    `};return W`
    <div class="section">
      <div class="section-title">${e("radioCfg.title")}</div>
      <div class="panel">
        <div class="note warn">${e("radioCfg.warning")}</div>

        ${Object.keys(n.values).map(t=>o(t))}

        ${t.radioError?W`<div class="note warn">${t.radioError}</div>`:""}

        <div class="actions">
          <button
            class="btn primary"
            ?disabled=${!s||t.radioSaving}
            @click=${t.onRadioSave}
          >
            ${t.radioSaving?e("common.loading"):e("radioCfg.write")}
          </button>
        </div>
      </div>
    </div>
  `}(t,e)}

    ${t.loadError?W`<div class="empty">
          <div>${e("common.loadError")}</div>
          <div class="sub-error">${t.loadError}</div>
        </div>`:0===t.entries.length?W`<div class="empty">${e("common.noEntries")}</div>`:t.entries.map(n=>function(t,e,n){const i=t.draftEntries[e.entry_id]??{},s=(t,e)=>i[t]??e;return W`
    <div class="section">
      <div class="section-title">${e.title}</div>
      <div class="panel">
        <div class="rows">


        </div>

        <div class="field" style="margin-top:12px">
          <label>${n("settings.gateway")}</label>
          ${t.nodes.length?W`
                <select
                  @change=${n=>t.onEntryInput(e.entry_id,"gateway_node_id",Number(n.target.value))}
                >
                  ${t.nodes.map(t=>W`
                      <option
                        value=${t.node_num}
                        ?selected=${s("gateway_node_id",e.gateway_node_id)===t.node_num}
                      >
                        ${t.name} (${t.node_num})
                      </option>
                    `)}
                </select>
              `:W`<div class="hint">${n("settings.noNodes")}</div>`}
          <span class="hint">${n("settings.gatewayHint")}</span>
        </div>

        <div class="field">
          <label>${n("settings.mode")}</label>
          <select
            @change=${n=>t.onEntryInput(e.entry_id,"mode",n.target.value)}
          >
            <option
              value="channel"
              ?selected=${"channel"===s("mode",e.mode)}
            >
              ${n("settings.modeChannel")}
            </option>
            <option
              value="direct_message"
              ?selected=${"direct_message"===s("mode",e.mode)}
            >
              ${n("settings.modeDm")}
            </option>
          </select>
          <span class="hint">${n("settings.modeHint")}</span>
        </div>

        ${"channel"===s("mode",e.mode)?function(t,e,n){const i=t.draftEntries[e.entry_id]??{},s=i.channel_index??e.channel_index??0,o=t.channels.find(t=>t.index===s);return W`
    <div class="field" style="margin-top:12px">
      <label>${n("settings.channel")}</label>
      ${t.channels.length?W`
            <select
              @change=${n=>t.onEntryInput(e.entry_id,"channel_index",Number(n.target.value))}
            >
              ${t.channels.map(t=>W`
                  <option value=${t.index} ?selected=${t.index===s}>
                    ${t.index}: ${t.name}
                  </option>
                `)}
            </select>
          `:W`
            <input
              type="number"
              min="0"
              max="7"
              .value=${String(s)}
              @change=${n=>t.onEntryInput(e.entry_id,"channel_index",Number(n.target.value))}
            />
            <span class="hint">${n("settings.channelsUnavailable")}</span>
          `}
      <span class="hint">${n("settings.channelHint")}</span>
      ${o?.default_psk?W`<div class="note warn">${n("settings.defaultPskWarning")}</div>`:""}
    </div>
  `}(t,e,n):""}

        <div class="field" style="margin-top:12px">
          <label>${n("settings.initialDelay")}</label>
          <input
            type="number"
            min="0"
            max="60"
            step="1"
            .value=${String(s("initial_delay",e.initial_delay))}
            @input=${n=>t.onEntryInput(e.entry_id,"initial_delay",Number(n.target.value))}
          />
        </div>

        <div class="field">
          <label>${n("settings.partDelay")}</label>
          <input
            type="number"
            min="0"
            max="30"
            step="1"
            .value=${String(s("part_delay",e.part_delay))}
            @input=${n=>t.onEntryInput(e.entry_id,"part_delay",Number(n.target.value))}
          />
        </div>

        <div class="field">
          <label>${n("settings.authorizedNodes")}</label>
          ${se(t.nodes,s("authorized_nodes",e.authorized_nodes)??[],n=>t.onEntryInput(e.entry_id,"authorized_nodes",n),n("settings.noNodes"),t.nodesError)}
          <span class="hint">${n("settings.authorizedHint")}</span>
        </div>

        <div class="field">
          <label class="check">
            <input
              type="checkbox"
              .checked=${Boolean(s("require_ack",e.require_ack))}
              @change=${n=>t.onEntryInput(e.entry_id,"require_ack",n.target.checked)}
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
            .value=${String(s("rate_limit",e.rate_limit))}
            @input=${n=>t.onEntryInput(e.entry_id,"rate_limit",Number(n.target.value))}
          />
          <span class="hint">${n("settings.rateLimitHint")}</span>
        </div>

        <div class="field">
          <label class="check">
            <input
              type="checkbox"
              .checked=${Boolean(s("case_sensitive",e.case_sensitive))}
              @change=${n=>t.onEntryInput(e.entry_id,"case_sensitive",n.target.checked)}
            />
            <span>${n("settings.caseSensitive")}</span>
          </label>
          <span class="hint">${n("settings.caseSensitiveHint")}</span>
        </div>

        <div class="field">
          <label>${n("settings.helpKeyword")}</label>
          <input
            placeholder="help"
            .value=${String(s("help_keyword",e.help_keyword)??"")}
            @input=${n=>t.onEntryInput(e.entry_id,"help_keyword",n.target.value)}
          />
          <span class="hint">${n("settings.helpKeywordHint")}</span>
        </div>

        <div class="actions">
          <button
            class="btn primary"
            @click=${()=>t.onSaveEntry(e.entry_id)}
          >
            ${n("common.save")}
          </button>
          ${t.saved?W`<span class="toast">${n("common.saved")}</span>`:""}
        </div>
      </div>
    </div>
  `}(t,n,e))}
  `}const ae="0.26.2";function re(t,e,n,i,s,o){if(!function(t){return St(t,$t).length>0}(t))return W`<div class="empty">${o("status.noIntegration")}</div>`;const a=Et(t),r=Lt(t,"commands_executed"),l=Lt(t,"last_command"),h=Lt(t,"last_error"),d=t=>t&&"unknown"!==t&&"unavailable"!==t?t:o("status.none");return W`
    <h2 class="screen-title">
      ${o("status.title")}
      ${i?W`<span class="hint">${o("status.updatedAt")} ${i}</span>`:""}
    </h2>
    <div class="grid">
      <div class="panel stat">
        <div class="label">${o("status.nodes")}</div>
        <div class="value">${a.length}</div>
      </div>
      <div class="panel stat">
        <div class="label">${o("status.executed")}</div>
        <div class="value">${r?r.state:"0"}</div>
      </div>
      <div class="panel stat">
        <div class="label">${o("status.lastCommand")}</div>
        <div class="value small">${d(l?.state)}</div>
      </div>
      <div class="panel stat">
        <div class="label">${o("status.lastError")}</div>
        <div class="value small">${d(h?.state)}</div>
      </div>
    </div>

    ${s?function(t,e){const n=[["radio.name",t.long_name],["radio.short",t.short_name],["radio.hardware",t.hardware],["radio.role",t.role],["radio.firmware",t.firmware],["radio.region",t.region],["radio.preset",t.modem_preset],["radio.hops",t.hop_limit]],i=n.filter(([,t])=>null!=t&&""!==t);return i.length?W`
    <div class="section" style="margin-top:18px">
      <div class="section-title">${e("radio.title")}</div>
      <div class="panel">
        <div class="rows">
          ${i.map(([t,n])=>W`
              <div class="row">
                <span class="k">${e(t)}</span>
                <span class="v">${String(n)}</span>
              </div>
            `)}
        </div>
      </div>
    </div>
  `:W``}(s,o):""}

    ${e.map(t=>function(t,e,n){const i=t.last_seen,s=t.seen_counts??{},o=!1===t.loaded,a=!1===t.radio_connected,r=(s.received??0)>0&&!s.accepted;return W`
    <div class="section" style="margin-top:18px">
      <div class="section-title">
        ${n("status.reception")}
        ${a?W`<span class="warn-badge">${n("status.radioOfflineBadge")}</span>`:o?W`<span class="warn-badge">${n("status.notRunning")}</span>`:r?W`<span class="warn-badge">${n("status.mismatch")}</span>`:""}
      </div>
      <div class="panel">
        ${a?W`<div class="note warn">${n("status.radioOffline")}</div>`:""}
        ${o?W`<div class="note warn">
              ${n("status.notRunningHint")}
              ${t.state?W`<br /><code>${t.state}</code>`:""}
            </div>`:""}
        <div class="rows">
          <div class="row">
            <span class="k">${n("status.versions")}</span>
            <span class="v">
              ${n("status.card")} ${ae},
              ${n("status.backend")} ${t.backend_version||"?"}
              ${!1===t.listening?` (${n("status.notListening")})`:""}
            </span>
          </div>
          ${t.backend_version&&t.backend_version!==ae?W`<div class="note warn">${n("status.versionMismatch")}</div>`:""}
          <div class="row">
            <span class="k">${n("status.busEvents")}</span>
            <span class="v">${t.bus_events??0}</span>
          </div>
          <div class="row">
            <span class="k">${n("status.expects")}</span>
            <span class="v">
              ${n("settings.gateway")} ${t.gateway_node_id??"-"},
              ${"channel"===t.mode?`${n("settings.channel")} ${t.channel_index??0}`:n("messages.onDm")}
            </span>
          </div>
          ${i?W`
                <div class="row">
                  <span class="k">${n("status.lastSeen")}</span>
                  <span class="v">
                    ${n("settings.gateway")} ${i.gateway??"-"},
                    ${null!==i.channel&&void 0!==i.channel?`${n("settings.channel")} ${i.channel}`:n("messages.onDm")}
                  </span>
                </div>
                <div class="row">
                  <span class="k">${n("status.seenFrom")}</span>
                  <span class="v">${i.from??"-"}</span>
                </div>
                <div class="row">
                  <span class="k">${n("status.seenResult")}</span>
                  <span class="v">${n(`status.reason.${i.reason}`)}</span>
                </div>
                <div class="row">
                  <span class="k">${n("status.tally")}</span>
                  <span class="v">
                    ${Object.entries(s).map(([t,e])=>`${e} ${n(`status.reason.${t}`)}`).join(", ")}
                  </span>
                </div>
              `:W`<div class="row">
                <span class="k">${n("status.lastSeen")}</span>
                <span class="v">${n("status.nothingSeen")}</span>
              </div>`}
        </div>
        ${r?W`
              <div class="note warn" style="margin-top:10px">
                ${n("other_gateway"===i?.reason?"status.hintGateway":"status.hintTarget")}
              </div>
              ${i?W`
                    <div class="actions">
                      <button
                        class="btn primary"
                        @click=${()=>e(t)}
                      >
                        ${n("status.applySeen")}
                      </button>
                    </div>
                    <span class="hint">${n("status.applySeenHint")}</span>
                  `:""}
            `:""}
      </div>
    </div>
  `}(t,n,o))}
  `}function le(t,e){return t.callWS({type:"hermes/settings/update",patch:e})}function he(t){return t.callWS({type:"hermes/entries/list"})}function de(t,e,n){return t.callWS({type:"hermes/entry/update",entry_id:e,patch:n})}function ce(t){return t.callWS({type:"hermes/presets/list"})}function ue(t){return t.callWS({type:"hermes/history/list"})}function pe(t){return t.callWS({type:"hermes/chats/list"})}const me=["status","chat","log","devices","map","messages","homeassistant","settings"],ge={keyword:"",match_type:"exact",service:"",reply_template:"",reply_to:"channel"};let fe=class extends ht{constructor(){super(...arguments),this._tab="status",this._entries=[],this._nodes=[],this._settings=null,this._saved=!1,this._draftGlobal={},this._draftEntries={},this._selectedEntry=null,this._editing=null,this._loadError=null,this._paletteEntity="",this._paletteValues={},this._showAdvanced=!1,this._mapShowAll=!1,this._mapRadiusOn=!1,this._mapRadiusKm=25,this._presets=[],this._editingPreset=null,this._history=[],this._logFilter="",this._testText="",this._sendingTest=!1,this._channels=[],this._firmware=null,this._radio=null,this._nodesError=null,this._refreshing=!1,this._updatedAt="",this._chats={},this._chatThread=null,this._chatDraft="",this._chatSending=!1,this._radioConfig=null,this._radioDraft={},this._radioSaving=!1,this._radioError=null,this._loaded=!1,this._onGlobalInput=(t,e)=>{this._draftGlobal={...this._draftGlobal,[t]:e}},this._onEntryInput=(t,e,n)=>{this._draftEntries={...this._draftEntries,[t]:{...this._draftEntries[t]??{},[e]:n}}},this._onSaveGlobal=async()=>{this.hass&&Object.keys(this._draftGlobal).length&&(this._settings=await le(this.hass,this._draftGlobal),this._draftGlobal={},this._flagSaved())},this._onSaveEntry=async t=>{const e=this._draftEntries[t];this.hass&&e&&Object.keys(e).length&&(await de(this.hass,t,e),this._draftEntries={...this._draftEntries,[t]:{}},this._flagSaved(),await this._load())},this._onSelectEntry=t=>{this._selectedEntry=t,this._editing=null},this._onNew=()=>{this._editing={...ge}},this._onEdit=t=>{this._editing={...t}},this._onDuplicate=t=>{const{id:e,...n}=t;this._editing={...n,keyword:`${t.keyword} 2`}},this._onDraftInput=(t,e)=>{this._editing&&(this._editing={...this._editing,[t]:e})},this._onCancel=()=>{this._editing=null},this._onPaletteEntity=t=>{this._paletteEntity=t},this._onPaletteValue=(t,e)=>{this._paletteValues={...this._paletteValues,[t]:e}},this._onToggleAdvanced=()=>{this._showAdvanced=!this._showAdvanced},this._onPresetNew=()=>{this._editingPreset={label:"",text:"",node_id:null,channel:null}},this._onPresetEdit=t=>{this._editingPreset={...t}},this._onPresetInput=(t,e)=>{this._editingPreset&&(this._editingPreset={...this._editingPreset,[t]:e})},this._onPresetCancel=()=>{this._editingPreset=null},this._onPresetSave=async()=>{var t,e;this.hass&&this._editingPreset?.text&&(await(t=this.hass,e=this._editingPreset,t.callWS({type:"hermes/presets/save",preset:e})),this._editingPreset=null,this._presets=await ce(this.hass),this._flagSaved())},this._onPresetDelete=async t=>{var e,n;this.hass&&t.id&&(await(e=this.hass,n=t.id,e.callWS({type:"hermes/presets/remove",preset_id:n})),this._presets=await ce(this.hass))},this._onPresetSend=async t=>{const e=this._selectedEntry??this._entries[0]?.entry_id;this.hass&&e&&t.id&&(await function(t,e,n){return t.callWS({type:"hermes/presets/send",entry_id:e,preset_id:n})}(this.hass,e,t.id),this._flagSaved(),this._history=await ue(this.hass))},this._onTestText=t=>{this._testText=t},this._onSendTest=async()=>{const t=this._selectedEntry??this._entries[0]?.entry_id;if(this.hass&&t&&this._testText){this._sendingTest=!0;try{await this.hass.callService("hermes","broadcast",{config_entry_id:t,message:this._testText}),this._flagSaved(),this._history=await ue(this.hass)}catch(t){console.error("Hermes: test send failed",t)}finally{this._sendingTest=!1}}},this._onRadioInput=(t,e)=>{this._radioDraft={...this._radioDraft,[t]:e},this._radioError=null},this._onRadioSave=async()=>{if(this.hass&&Object.keys(this._radioDraft).length){this._radioSaving=!0,this._radioError=null;try{this._radioConfig=await(t=this.hass,e=this._radioDraft,t.callWS({type:"hermes/radio/config/set",patch:e})),this._radioDraft={},this._flagSaved()}catch(t){this._radioError=String(t?.message??t)}finally{this._radioSaving=!1}var t,e}},this._onChatSelect=t=>{this._chatThread=t},this._onChatDraft=t=>{this._chatDraft=t},this._onChatSend=async()=>{const t=this._selectedEntry??this._entries[0]?.entry_id,e=this._chatThread??Object.keys(this._chats)[0];if(this.hass&&t&&e&&this._chatDraft.trim()){this._chatSending=!0;try{await function(t,e,n,i){return t.callWS({type:"hermes/chats/send",entry_id:e,thread:n,message:i})}(this.hass,t,e,this._chatDraft.trim()),this._chatDraft="",this._chats=await pe(this.hass)}catch(t){console.error("Hermes: could not send the message",t)}finally{this._chatSending=!1}}},this._onChatClear=async t=>{this.hass&&(await function(t,e){return t.callWS({type:"hermes/chats/clear",thread:e})}(this.hass,t),this._chats=await pe(this.hass))},this._onLogFilter=t=>{this._logFilter=t},this._onLogClear=async()=>{var t;this.hass&&(await(t=this.hass,t.callWS({type:"hermes/history/clear"})),this._history=[])},this._onToggleShowAll=()=>{this._mapShowAll=!this._mapShowAll},this._onToggleRadius=()=>{this._mapRadiusOn=!this._mapRadiusOn},this._onRadiusChange=t=>{this._mapRadiusKm=t},this._onApplySeen=async t=>{const e=t.last_seen;if(!this.hass||!e)return;const n={};null!==e.gateway&&(n.gateway_node_id=e.gateway),null!==e.channel&&void 0!==e.channel?(n.mode="channel",n.channel_index=e.channel):null!==e.node&&void 0!==e.node&&(n.mode="direct_message"),Object.keys(n).length&&(await de(this.hass,t.entry_id,n),this._flagSaved(),await this._load())},this._onRefresh=async()=>{this._refreshing=!0;try{await this._load()}finally{this._refreshing=!1}},this._onHeightChange=async t=>{this.hass&&(this._settings=await le(this.hass,{map_height:t}))},this._onInsert=t=>{if(!this._editing)return;const e=this.renderRoot.querySelector("#hermes-template"),n=this._editing.reply_template??"";if(!e)return void(this._editing={...this._editing,reply_template:n+t});const i=e.selectionStart??n.length,s=e.selectionEnd??n.length,o=n.slice(0,i)+t+n.slice(s);this._editing={...this._editing,reply_template:o},this.updateComplete.then(()=>{const e=this.renderRoot.querySelector("#hermes-template");if(e){const n=i+t.length;e.focus(),e.setSelectionRange(n,n)}})},this._onSaveCommand=async()=>{const t=this._selectedEntry;if(!this.hass||!t||!this._editing)return;const e=Boolean(this._editing.service)||Boolean(this._editing.reply_template);this._editing.keyword&&e&&(await function(t,e,n){return t.callWS({type:"hermes/commands/save",entry_id:e,command:n})}(this.hass,t,this._editing),this._editing=null,this._flagSaved(),await this._load())},this._onDeleteCommand=async t=>{const e=this._selectedEntry;this.hass&&e&&t.id&&(await function(t,e,n){return t.callWS({type:"hermes/commands/remove",entry_id:e,command_id:n})}(this.hass,e,t.id),this._flagSaved(),await this._load())}}setConfig(t){this._config=t,t?.tab&&me.includes(t.tab)&&(this._tab=t.tab)}getCardSize(){return 12}connectedCallback(){super.connectedCallback(),this._subscribe(),this._pollTimer=window.setInterval(()=>{this._poll()},15e3)}disconnectedCallback(){super.disconnectedCallback(),this._pollTimer&&(window.clearInterval(this._pollTimer),this._pollTimer=void 0),this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=void 0)}async _subscribe(){const t=this.hass?.connection;if(t?.subscribeEvents&&!this._unsubscribe)try{this._unsubscribe=await t.subscribeEvents(()=>{this._poll(!0)},"meshtastic_api_text_message")}catch(t){console.warn("Hermes: live updates unavailable, falling back to polling",t)}}async _poll(t=!1){if(this.hass&&this._loaded&&(t||"status"===this._tab||"log"===this._tab||"chat"===this._tab))try{this._entries=await he(this.hass),this._history=await ue(this.hass),this._chats=await pe(this.hass),this._updatedAt=(new Date).toLocaleTimeString()}catch(t){console.warn("Hermes: refresh failed",t)}}firstUpdated(){let t=this.parentElement;for(;t;){if("HUI-PANEL-VIEW"===t.tagName){this.setAttribute("panel-mode","");break}t=t.parentElement}}updated(){this.hass&&!this._loaded&&(this._loaded=!0,this._load())}async _load(t=0){if(this.hass){try{const t=await he(this.hass);this._entries=t,this._loadError=null,!this._selectedEntry&&t.length&&(this._selectedEntry=t[0].entry_id)}catch(e){if(t<3)return void window.setTimeout(()=>{this._load(t+1)},500*(t+1));this._loadError=String(e?.message??e),console.error("Hermes: failed to load gateways",e)}try{this._nodes=await(e=this.hass,e.callWS({type:"hermes/nodes/list"})),this._nodesError=null}catch(t){this._nodesError=String(t?.message??t),console.error("Hermes: failed to load nodes",t)}var e,n;try{this._channels=await function(t){return t.callWS({type:"hermes/channels/list"})}(this.hass)}catch(t){console.warn("Hermes: could not read the radio channels",t)}try{const t=await function(t){return t.callWS({type:"hermes/radio/info"})}(this.hass);this._radio=t,this._firmware=t.firmware}catch{this._firmware=null}try{n=await function(t){return t.callWS({type:"hermes/actions"})}(this.hass),n?.by_type&&(Vt=n.by_type),n?.domain_to_type&&(Yt=n.domain_to_type),n?.generic&&(Jt=n.generic)}catch(t){console.warn("Hermes: using the built-in action catalogue",t)}try{this._presets=await ce(this.hass)}catch(t){console.error("Hermes: failed to load presets",t)}try{this._history=await ue(this.hass)}catch(t){console.error("Hermes: failed to load the log",t)}try{this._chats=await pe(this.hass)}catch(t){console.error("Hermes: failed to load the conversations",t)}try{this._radioConfig=await function(t){return t.callWS({type:"hermes/radio/config/get"})}(this.hass)}catch(t){console.warn("Hermes: could not read the radio configuration",t)}try{this._settings=await function(t){return t.callWS({type:"hermes/settings/get"})}(this.hass)}catch{this._settings=null}}}_flagSaved(){this._saved=!0,window.setTimeout(()=>{this._saved=!1},2e3)}_select(t){this._tab=t,this._load()}_screen(t){const e=this.hass;switch(this._tab){case"status":default:return re(e,this._entries,this._onApplySeen,this._updatedAt,this._radio,t);case"chat":return zt({chats:this._chats,channels:this._channels,nodes:this._nodes,thread:this._chatThread,draft:this._chatDraft,sending:this._chatSending,onSelect:this._onChatSelect,onDraft:this._onChatDraft,onSend:this._onChatSend,onClear:this._onChatClear},t);case"log":return Rt({entries:this._history,entries_meta:this._entries.map(t=>({title:t.title,counts:t.seen_counts??{}})),filter:this._logFilter,updatedAt:this._updatedAt,onFilter:this._onLogFilter,onClear:this._onLogClear,onRefresh:()=>{this._poll(!0)}},t);case"devices":return It(e,t);case"map":return Ut({hass:e,settings:this._settings,authorized:[...new Set(this._entries.flatMap(t=>t.authorized_nodes??[]))],showAll:this._mapShowAll,radiusOn:this._mapRadiusOn,radiusKm:this._mapRadiusKm,onToggleShowAll:this._onToggleShowAll,onToggleRadius:this._onToggleRadius,onRadiusChange:this._onRadiusChange,onHeightChange:this._onHeightChange},t);case"messages":return ie({hass:e,entries:this._entries,selectedEntry:this._selectedEntry,editing:this._editing,loadError:this._loadError,paletteEntity:this._paletteEntity,paletteValues:this._paletteValues,showAdvanced:this._showAdvanced,onSelectEntry:this._onSelectEntry,onNew:this._onNew,onEdit:this._onEdit,onDuplicate:this._onDuplicate,onDelete:this._onDeleteCommand,onDraftInput:this._onDraftInput,onPaletteEntity:this._onPaletteEntity,onPaletteValue:this._onPaletteValue,onInsert:this._onInsert,onToggleAdvanced:this._onToggleAdvanced,onSave:this._onSaveCommand,onCancel:this._onCancel,channels:this._channels,presets:this._presets,editingPreset:this._editingPreset,onPresetNew:this._onPresetNew,onPresetEdit:this._onPresetEdit,onPresetDelete:this._onPresetDelete,onPresetInput:this._onPresetInput,onPresetSave:this._onPresetSave,onPresetCancel:this._onPresetCancel,onPresetSend:this._onPresetSend},t);case"homeassistant":return Dt({hass:e,entries:this._entries,testText:this._testText,selectedEntry:this._selectedEntry,sending:this._sendingTest,onTestText:this._onTestText,onSendTest:this._onSendTest},t);case"settings":return oe({settings:this._settings,entries:this._entries,nodes:this._nodes,channels:this._channels,firmware:this._firmware,nodesError:this._nodesError,refreshing:this._refreshing,onRefresh:this._onRefresh,saved:this._saved,loadError:this._loadError,draftGlobal:this._draftGlobal,draftEntries:this._draftEntries,onGlobalInput:this._onGlobalInput,onEntryInput:this._onEntryInput,radioConfig:this._radioConfig,radioDraft:this._radioDraft,radioSaving:this._radioSaving,radioError:this._radioError,onRadioInput:this._onRadioInput,onRadioSave:this._onRadioSave,onSaveGlobal:this._onSaveGlobal,onSaveEntry:this._onSaveEntry},t)}}render(){if(!this.hass||!this._config)return W``;const t=function(t){const e=(t?.locale?.language||t?.language||"en").split("-")[0].toLowerCase(),n=_t[e]||ft;return t=>n[t]??ft[t]??t}(this.hass);return W`
      <div class="shell">
        <div class="topbar">
          <div class="brand">
            <span class="dot"></span>
            <span>Hermes</span>
            <span class="sub">Meshtastic Commander</span>
          </div>
        </div>

        <div class="tabs" role="tablist">
          ${me.map(e=>W`
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
    `}};fe.styles=[vt,yt],t([mt({attribute:!1})],fe.prototype,"hass",void 0),t([gt()],fe.prototype,"_config",void 0),t([gt()],fe.prototype,"_tab",void 0),t([gt()],fe.prototype,"_entries",void 0),t([gt()],fe.prototype,"_nodes",void 0),t([gt()],fe.prototype,"_settings",void 0),t([gt()],fe.prototype,"_saved",void 0),t([gt()],fe.prototype,"_draftGlobal",void 0),t([gt()],fe.prototype,"_draftEntries",void 0),t([gt()],fe.prototype,"_selectedEntry",void 0),t([gt()],fe.prototype,"_editing",void 0),t([gt()],fe.prototype,"_loadError",void 0),t([gt()],fe.prototype,"_paletteEntity",void 0),t([gt()],fe.prototype,"_paletteValues",void 0),t([gt()],fe.prototype,"_showAdvanced",void 0),t([gt()],fe.prototype,"_mapShowAll",void 0),t([gt()],fe.prototype,"_mapRadiusOn",void 0),t([gt()],fe.prototype,"_mapRadiusKm",void 0),t([gt()],fe.prototype,"_presets",void 0),t([gt()],fe.prototype,"_editingPreset",void 0),t([gt()],fe.prototype,"_history",void 0),t([gt()],fe.prototype,"_logFilter",void 0),t([gt()],fe.prototype,"_testText",void 0),t([gt()],fe.prototype,"_sendingTest",void 0),t([gt()],fe.prototype,"_channels",void 0),t([gt()],fe.prototype,"_firmware",void 0),t([gt()],fe.prototype,"_radio",void 0),t([gt()],fe.prototype,"_nodesError",void 0),t([gt()],fe.prototype,"_refreshing",void 0),t([gt()],fe.prototype,"_updatedAt",void 0),t([gt()],fe.prototype,"_chats",void 0),t([gt()],fe.prototype,"_chatThread",void 0),t([gt()],fe.prototype,"_chatDraft",void 0),t([gt()],fe.prototype,"_chatSending",void 0),t([gt()],fe.prototype,"_radioConfig",void 0),t([gt()],fe.prototype,"_radioDraft",void 0),t([gt()],fe.prototype,"_radioSaving",void 0),t([gt()],fe.prototype,"_radioError",void 0),fe=t([ct("hermes-card")],fe),window.customCards=window.customCards||[],window.customCards.push({type:"hermes-card",name:"Hermes",description:"Meshtastic Commander control panel",preview:!1}),console.info(`%c HERMES-CARD %c ${ae} `,"background:#FFD60A;color:#000","");export{fe as HermesCard};
