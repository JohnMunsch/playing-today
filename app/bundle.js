!function(e){var t={};function s(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=0)}([function(e,t,s){"use strict";s.r(t);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const n=new WeakMap,r=e=>"function"==typeof e&&n.has(e),a=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(e,t,s=null)=>{let n=t;for(;n!==s;){const t=n.nextSibling;e.removeChild(n),n=t}},o={},l=`{{lit-${String(Math.random()).slice(2)}}}`,d=`\x3c!--${l}--\x3e`,c=new RegExp(`${l}|${d}`),p="$lit$";class u{constructor(e,t){this.parts=[],this.element=t;let s=-1,n=0;const r=[],a=t=>{const i=t.content,o=document.createTreeWalker(i,133,null,!1);let d,u;for(;o.nextNode();){s++,d=u;const t=u=o.currentNode;if(1===t.nodeType){if(t.hasAttributes()){const r=t.attributes;let a=0;for(let e=0;e<r.length;e++)r[e].value.indexOf(l)>=0&&a++;for(;a-- >0;){const r=e.strings[n],a=y.exec(r)[2],i=a.toLowerCase()+p,o=t.getAttribute(i).split(c);this.parts.push({type:"attribute",index:s,name:a,strings:o}),t.removeAttribute(i),n+=o.length-1}}"TEMPLATE"===t.tagName&&a(t)}else if(3===t.nodeType){const e=t.nodeValue;if(e.indexOf(l)<0)continue;const a=t.parentNode,i=e.split(c),o=i.length-1;n+=o;for(let e=0;e<o;e++)a.insertBefore(""===i[e]?h():document.createTextNode(i[e]),t),this.parts.push({type:"node",index:s++});a.insertBefore(""===i[o]?h():document.createTextNode(i[o]),t),r.push(t)}else if(8===t.nodeType)if(t.nodeValue===l){const e=t.parentNode,a=t.previousSibling;null===a||a!==d||a.nodeType!==Node.TEXT_NODE?e.insertBefore(h(),t):s--,this.parts.push({type:"node",index:s++}),r.push(t),null===t.nextSibling?e.insertBefore(h(),t):s--,u=d,n++}else{let e=-1;for(;-1!==(e=t.nodeValue.indexOf(l,e+1));)this.parts.push({type:"node",index:-1})}}};a(t);for(const e of r)e.parentNode.removeChild(e)}}const m=e=>-1!==e.index,h=()=>document.createComment(""),y=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class g{constructor(e,t,s){this._parts=[],this.template=e,this.processor=t,this.options=s}update(e){let t=0;for(const s of this._parts)void 0!==s&&s.setValue(e[t]),t++;for(const e of this._parts)void 0!==e&&e.commit()}_clone(){const e=a?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=this.template.parts;let s=0,n=0;const r=e=>{const a=document.createTreeWalker(e,133,null,!1);let i=a.nextNode();for(;s<t.length&&null!==i;){const e=t[s];if(m(e))if(n===e.index){if("node"===e.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(i),this._parts.push(e)}else this._parts.push(...this.processor.handleAttributeExpressions(i,e.name,e.strings,this.options));s++}else n++,"TEMPLATE"===i.nodeName&&r(i.content),i=a.nextNode();else this._parts.push(void 0),s++}};return r(e),a&&(document.adoptNode(e),customElements.upgrade(e)),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */class b{constructor(e,t,s,n){this.strings=e,this.values=t,this.type=s,this.processor=n}getHTML(){const e=this.strings.length-1;let t="";for(let s=0;s<e;s++){const e=this.strings[s];let n=!1;t+=e.replace(y,(e,t,s,r)=>(n=!0,t+s+p+r+l)),n||(t+=d)}return t+this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const f=e=>null===e||!("object"==typeof e||"function"==typeof e);class v{constructor(e,t,s){this.dirty=!0,this.element=e,this.name=t,this.strings=s,this.parts=[];for(let e=0;e<s.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new _(this)}_getValue(){const e=this.strings,t=e.length-1;let s="";for(let n=0;n<t;n++){s+=e[n];const t=this.parts[n];if(void 0!==t){const e=t.value;if(null!=e&&(Array.isArray(e)||"string"!=typeof e&&e[Symbol.iterator]))for(const t of e)s+="string"==typeof t?t:String(t);else s+="string"==typeof e?e:String(e)}}return s+=e[t]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class _{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===o||f(e)&&e===this.value||(this.value=e,r(e)||(this.committer.dirty=!0))}commit(){for(;r(this.value);){const e=this.value;this.value=o,e(this)}this.value!==o&&this.committer.commit()}}class P{constructor(e){this.value=void 0,this._pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(h()),this.endNode=e.appendChild(h())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e._insert(this.startNode=h()),e._insert(this.endNode=h())}insertAfterPart(e){e._insert(this.startNode=h()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this._pendingValue=e}commit(){for(;r(this._pendingValue);){const e=this._pendingValue;this._pendingValue=o,e(this)}const e=this._pendingValue;e!==o&&(f(e)?e!==this.value&&this._commitText(e):e instanceof b?this._commitTemplateResult(e):e instanceof Node?this._commitNode(e):Array.isArray(e)||e[Symbol.iterator]?this._commitIterable(e):this._commitText(e))}_insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}_commitNode(e){this.value!==e&&(this.clear(),this._insert(e),this.value=e)}_commitText(e){const t=this.startNode.nextSibling;e=null==e?"":e,t===this.endNode.previousSibling&&t.nodeType===Node.TEXT_NODE?t.textContent=e:this._commitNode(document.createTextNode("string"==typeof e?e:String(e))),this.value=e}_commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value&&this.value.template===t)this.value.update(e.values);else{const s=new g(t,e.processor,this.options),n=s._clone();s.update(e.values),this._commitNode(n),this.value=s}}_commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let s,n=0;for(const r of e)void 0===(s=t[n])&&(s=new P(this.options),t.push(s),0===n?s.appendIntoPart(this):s.insertAfterPart(t[n-1])),s.setValue(r),s.commit(),n++;n<t.length&&(t.length=n,this.clear(s&&s.endNode))}clear(e=this.startNode){i(this.startNode.parentNode,e.nextSibling,this.endNode)}}class S{constructor(e,t,s){if(this.value=void 0,this._pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=s}setValue(e){this._pendingValue=e}commit(){for(;r(this._pendingValue);){const e=this._pendingValue;this._pendingValue=o,e(this)}if(this._pendingValue===o)return;const e=!!this._pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=e,this._pendingValue=o}}class x extends v{constructor(e,t,s){super(e,t,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new N(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class N extends _{}let w=!1;try{const e={get capture(){return w=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}class O{constructor(e,t,s){this.value=void 0,this._pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=s,this._boundHandleEvent=(e=>this.handleEvent(e))}setValue(e){this._pendingValue=e}commit(){for(;r(this._pendingValue);){const e=this._pendingValue;this._pendingValue=o,e(this)}if(this._pendingValue===o)return;const e=this._pendingValue,t=this.value,s=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),n=null!=e&&(null==t||s);s&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),n&&(this._options=T(e),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=e,this._pendingValue=o}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const T=e=>e&&(w?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const C=new class{handleAttributeExpressions(e,t,s,n){const r=t[0];return"."===r?new x(e,t.slice(1),s).parts:"@"===r?[new O(e,t.slice(1),n.eventContext)]:"?"===r?[new S(e,t.slice(1),s)]:new v(e,t,s).parts}handleTextExpression(e){return new P(e)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function E(e){let t=A.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},A.set(e.type,t));let s=t.stringsArray.get(e.strings);if(void 0!==s)return s;const n=e.strings.join(l);return void 0===(s=t.keyString.get(n))&&(s=new u(e,e.getTemplateElement()),t.keyString.set(n,s)),t.stringsArray.set(e.strings,s),s}const A=new Map,V=new WeakMap,$=(e,...t)=>new b(e,t,"html",C),M=NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_COMMENT|NodeFilter.SHOW_TEXT;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function R(e,t){const{element:{content:s},parts:n}=e,r=document.createTreeWalker(s,M,null,!1);let a=I(n),i=n[a],o=-1,l=0;const d=[];let c=null;for(;r.nextNode();){o++;const e=r.currentNode;for(e.previousSibling===c&&(c=null),t.has(e)&&(d.push(e),null===c&&(c=e)),null!==c&&l++;void 0!==i&&i.index===o;)i.index=null!==c?-1:i.index-l,i=n[a=I(n,a)]}d.forEach(e=>e.parentNode.removeChild(e))}const k=e=>{let t=e.nodeType===Node.DOCUMENT_FRAGMENT_NODE?0:1;const s=document.createTreeWalker(e,M,null,!1);for(;s.nextNode();)t++;return t},I=(e,t=-1)=>{for(let s=t+1;s<e.length;s++){const t=e[s];if(m(t))return s}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const j=(e,t)=>`${e}--${t}`;let F=!0;void 0===window.ShadyCSS?F=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),F=!1);const H=e=>t=>{const s=j(t.type,e);let n=A.get(s);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},A.set(s,n));let r=n.stringsArray.get(t.strings);if(void 0!==r)return r;const a=t.strings.join(l);if(void 0===(r=n.keyString.get(a))){const s=t.getTemplateElement();F&&window.ShadyCSS.prepareTemplateDom(s,e),r=new u(t,s),n.keyString.set(a,r)}return n.stringsArray.set(t.strings,r),r},L=["html","svg"],U=new Set,z=(e,t,s)=>{U.add(s);const n=e.querySelectorAll("style");if(0===n.length)return;const r=document.createElement("style");for(let e=0;e<n.length;e++){const t=n[e];t.parentNode.removeChild(t),r.textContent+=t.textContent}if((e=>{L.forEach(t=>{const s=A.get(j(t,e));void 0!==s&&s.keyString.forEach(e=>{const{element:{content:t}}=e,s=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{s.add(e)}),R(e,s)})})})(s),function(e,t,s=null){const{element:{content:n},parts:r}=e;if(null==s)return void n.appendChild(t);const a=document.createTreeWalker(n,M,null,!1);let i=I(r),o=0,l=-1;for(;a.nextNode();)for(l++,a.currentNode===s&&(o=k(t),s.parentNode.insertBefore(t,s));-1!==i&&r[i].index===l;){if(o>0){for(;-1!==i;)r[i].index+=o,i=I(r,i);return}i=I(r,i)}}(t,r,t.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(t.element,s),window.ShadyCSS.nativeShadow){const s=t.element.content.querySelector("style");e.insertBefore(s.cloneNode(!0),e.firstChild)}else{t.element.content.insertBefore(r,t.element.content.firstChild);const e=new Set;e.add(r),R(t,e)}},D=e=>null!==e,B=e=>e?"":null,W=(e,t)=>t!==e&&(t==t||e==e),q={attribute:!0,type:String,reflect:!1,hasChanged:W},G=new Promise(e=>e(!0)),Y=1,X=4,K=8;class J extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=G,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this._finalize();const e=[];for(const[t,s]of this._classProperties){const n=this._attributeNameForProperty(t,s);void 0!==n&&(this._attributeToPropertyMap.set(n,t),e.push(n))}return e}static createProperty(e,t=q){if(!this.hasOwnProperty("_classProperties")){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}if(this._classProperties.set(e,t),this.prototype.hasOwnProperty(e))return;const s="symbol"==typeof e?Symbol():`__${e}`;Object.defineProperty(this.prototype,e,{get(){return this[s]},set(n){const r=this[e];this[s]=n,this._requestPropertyUpdate(e,r,t)},configurable:!0,enumerable:!0})}static _finalize(){if(this.hasOwnProperty("_finalized")&&this._finalized)return;const e=Object.getPrototypeOf(this);"function"==typeof e._finalize&&e._finalize(),this._finalized=!0,this._attributeToPropertyMap=new Map;const t=this.properties,s=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const e of s)this.createProperty(e,t[e])}static _attributeNameForProperty(e,t){const s=void 0!==t&&t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,s=W){return s(e,t)}static _propertyValueFromAttribute(e,t){const s=t&&t.type;if(void 0===s)return e;const n=s===Boolean?D:"function"==typeof s?s:s.fromAttribute;return n?n(e):e}static _propertyValueToAttribute(e,t){if(void 0===t||void 0===t.reflect)return;return(t.type===Boolean?B:t.type&&t.type.toAttribute||String)(e)}initialize(){this.renderRoot=this.createRenderRoot(),this._saveInstanceProperties()}_saveInstanceProperties(){for(const[e]of this.constructor._classProperties)if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}}_applyInstanceProperties(){for(const[e,t]of this._instanceProperties)this[e]=t;this._instanceProperties=void 0}createRenderRoot(){return this.attachShadow({mode:"open"})}connectedCallback(){this._updateState&Y?void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this):this.requestUpdate()}disconnectedCallback(){}attributeChangedCallback(e,t,s){t!==s&&this._attributeToProperty(e,s)}_propertyToAttribute(e,t,s=q){const n=this.constructor,r=n._propertyValueToAttribute(t,s);if(void 0!==r){const t=n._attributeNameForProperty(e,s);void 0!==t&&(this._updateState=this._updateState|K,null===r?this.removeAttribute(t):this.setAttribute(t,r),this._updateState=this._updateState&~K)}}_attributeToProperty(e,t){if(!(this._updateState&K)){const s=this.constructor,n=s._attributeToPropertyMap.get(e);if(void 0!==n){const e=s._classProperties.get(n);this[n]=s._propertyValueFromAttribute(t,e)}}}requestUpdate(e,t){if(void 0!==e){const s=this.constructor._classProperties.get(e)||q;return this._requestPropertyUpdate(e,t,s)}return this._invalidate()}_requestPropertyUpdate(e,t,s){return this.constructor._valueHasChanged(this[e],t,s.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0===s.reflect&&(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,s)),this._invalidate()):this.updateComplete}async _invalidate(){if(!this._hasRequestedUpdate){let e;this._updateState=this._updateState|X;const t=this._updatePromise;this._updatePromise=new Promise(t=>e=t),await t,this._validate(),e(!this._hasRequestedUpdate)}return this.updateComplete}get _hasRequestedUpdate(){return this._updateState&X}_validate(){if(this._instanceProperties&&this._applyInstanceProperties(),this.shouldUpdate(this._changedProperties)){const e=this._changedProperties;this.update(e),this._markUpdated(),this._updateState&Y||(this._updateState=this._updateState|Y,this.firstUpdated(e)),this.updated(e)}else this._markUpdated()}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~X}get updateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){if(void 0!==this._reflectingProperties&&this._reflectingProperties.size>0){for(const[e,t]of this._reflectingProperties)this._propertyToAttribute(e,this[e],t);this._reflectingProperties=void 0}}updated(e){}firstUpdated(e){}}J._attributeToPropertyMap=new Map,J._finalized=!0,J._classProperties=new Map,J.properties={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
Z((e,t)=>e.querySelector(t)),Z((e,t)=>e.querySelectorAll(t));function Z(e){return t=>(s,n)=>{Object.defineProperty(s,n,{get(){return e(this.renderRoot,t)},enumerable:!0,configurable:!0})}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class Q extends J{update(e){super.update(e);const t=this.render();t instanceof b&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this})}render(){}}Q.render=((e,t,s)=>{const n=s.scopeName,r=V.has(t),a=t instanceof ShadowRoot&&F&&e instanceof b,o=a&&!U.has(n),l=o?document.createDocumentFragment():t;if(((e,t,s)=>{let n=V.get(t);void 0===n&&(i(t,t.firstChild),V.set(t,n=new P(Object.assign({templateFactory:E},s))),n.appendInto(t)),n.setValue(e),n.commit()})(e,l,Object.assign({templateFactory:H(n)},s)),o){const e=V.get(l);V.delete(l),e.value instanceof g&&z(l,e.value.template,n),i(t,t.firstChild),t.appendChild(l),V.set(t,e)}!r&&a&&window.ShadyCSS.styleElement(t.host)});customElements.define("recommended-players",class extends Q{createRenderRoot(){return this}render(){return $`
      <svg class="numPlayers"></svg>
    `}});customElements.define("games-list",class extends Q{static get properties(){return{games:{type:Array}}}remove(){}createRenderRoot(){return this}renderListOfGames(e){return console.log(e),e.map(e=>$`
        <tr>
          <td class="controls">
            <span
              class="glyphicon glyphicon-remove-sign"
              aria-hidden="true"
              @click="${this.remove}"
            ></span>
          </td>
          <td class="name">${e.name}</td>
          <td>
            <recommended-players
              .num-players="game.numberOfPlayers"
            ></recommended-players>
          </td>
        </tr>
      `)}render(){return $`
      <table class="table table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Game</th>
            <th>Number of Players</th>
          </tr>
        </thead>
        <tbody>
          ${this.renderListOfGames(this.games)}
        </tbody>
      </table>
    `}});customElements.define("game-tabs",class extends Q{static get properties(){return{games:{type:Array},numPlayers:{type:Number}}}createRenderRoot(){return this}render(){return $`
      <div class="gamesByPlayerCount">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active" ng-if="$ctrl.numPlayers > 0">
            <a href="#tab-1" aria-controls="home" role="tab" data-toggle="tab">
              Games for ${this.numPlayers} Players
            </a>
          </li>
          <li
            role="presentation"
            class="${0===this.numPlayers?"active":""}"
          >
            <a
              href="#tab-2"
              aria-controls="profile"
              role="tab"
              data-toggle="tab"
            >
              All Games
            </a>
          </li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="tab-1">
            <games-list
              .games="${this.games}"
              .num-players="${this.numPlayers}"
            ></games-list>
          </div>
          <div role="tabpanel" class="tab-pane" id="tab-2">
            <games-list .games="${this.games}"></games-list>
          </div>
        </div>
      </div>
    `}});customElements.define("nav-bar",class extends Q{static get properties(){return{user:{type:Object}}}signOut(){let e=new CustomEvent("sign-out",{detail:{message:"hello. a load-complete happened."}});this.dispatchEvent(e)}createRenderRoot(){return this}render(){return $`
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button
              type="button"
              class="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span> <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/"
              ><img class="logo" src="img/meeple.svg" />
              <div>Playing today?</div></a
            >
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <form
              class="navbar-form navbar-right"
              role="form"
              ng-if="this.user !== null"
            >
              <button
                type="submit"
                class="btn btn-success"
                @click="${this.signOut}"
              >
                Sign out
              </button>
            </form>
            <p class="navbar-text navbar-right">${this.user.email}</p>
          </div>
          <!--/.navbar-collapse -->
        </div>
      </nav>
    `}});customElements.define("players-list",class extends Q{static get properties(){return{user:{type:Object},players:{type:Array}}}playersIn(e){return 2}playersOut(e){return 8}renderControlsOrStatus(e,t){return e.uid==t.uid?$`
        <div
          class="btn-group btn-group-xs"
          role="group"
          aria-label="..."
          ng-if="$ctrl.active.uid === key"
        >
          <button
            type="button"
            class="btn btn-default"
            ng-click="$ctrl.playing({ uid: $ctrl.active.uid, name: $ctrl.active.email, playingToday: true })"
            ng-class="{ active: value.playingToday }"
          >
            In
          </button>
          <button
            type="button"
            class="btn btn-default"
            ng-click="$ctrl.playing({ uid: $ctrl.active.uid, name: $ctrl.active.email, playingToday: false })"
            ng-class="{ active: !value.playingToday }"
          >
            Out
          </button>
        </div>
      `:$`
        <div>${e.playingToday?"In":"Out"}</div>
      `}renderListOfPlayers(e,t,s){return e.map(e=>{if(e.playingToday==s)return $`
          <tr>
            <td class="name">${e.name}</td>
            <td class="inOut">${this.renderControlsOrStatus(e,t)}</td>
          </tr>
        `})}createRenderRoot(){return this}render(){return $`
      <h2>
        In
        <span class="label label-default">${this.playersIn(this.players)}</span>
      </h2>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Player</th>
            <th class="inOut">In/Out</th>
          </tr>
        </thead>
        <tbody>
          ${this.renderListOfPlayers(this.players,this.user,!0)}
        </tbody>
      </table>

      <h2>
        Out
        <span class="label label-default"
          >${this.playersOut(this.players)}</span
        >
      </h2>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Player</th>
            <th class="inOut">In/Out</th>
          </tr>
        </thead>
        <tbody>
          ${this.renderListOfPlayers(this.players,this.user,!1)}
        </tbody>
      </table>
    `}});customElements.define("main-page",class extends Q{static get properties(){return{user:{type:Object},games:{type:Array},players:{type:Array}}}constructor(){super(),this.user={uid:"6plMXPEIgoO4CYNUHp6HZEuDQ352",email:"john.munsch@aptitude.com"},this.players=[{uid:"4ajsIxK3zJeCD39JoP0IDNGY4t82",name:"mike.wartberg@aptitude.com",playingToday:!1},{uid:"6plMXPEIgoO4CYNUHp6HZEuDQ352",name:"john.munsch@aptitude.com",playingToday:!0},{uid:"CXbucJgnHcW6LK68blG3RVozg3D2",name:"trang.ngo@aptitude.com",playingToday:!1},{uid:"DcX0mno0e8T5ewKbw4yAN9Tv7EF2",name:"sfisherm@vha.com",playingToday:!0},{uid:"IMkuyDvmYNMYEIIfkV28HVmFZl62",name:"luis.gomez@aptitude.com",playingToday:!1},{uid:"PCLW3bxNgxPaq4bosKIpSiEFRYY2",name:"david.daniels@aptitude.com",playingToday:!1},{uid:"YeRVOKsi7sVhcsz75vATE9AZdRL2",name:"mike.nguchie@aptitude.com",playingToday:!1},{uid:"cDXTUxWBGwcPXsNzkRgc6x88uAR2",name:"barry.forrest@vizientinc.com",playingToday:!1},{uid:"sSNQFNHhzOOFhnPx7ydssl7gixr1",name:"richard.morgan@aptitude.com",playingToday:!1},{uid:"vok5IUKHdaRBPvNlEYzhtjNYy4t1",name:"kavya.katam@aptitude.com",playingToday:!1}],this.games=[{name:"Carcassonne",notes:"Plays with six if you add the Inns & Cathedrals.",numberOfPlayers:{0:{best:56.4,not:6.1,players:2,recommended:37.6},1:{best:47.3,not:2.3,players:3,recommended:50.3},2:{best:31.7,not:8.6,players:4,recommended:59.7},3:{best:12,not:35.4,players:5,recommended:52.7}}},{name:"Jamaica",numberOfPlayers:{0:{best:3.9,not:58.3,players:2,recommended:37.9},1:{best:8.2,not:25.8,players:3,recommended:66},2:{best:33.6,not:.9,players:4,recommended:65.5},3:{best:45,not:0,players:5,recommended:55},4:{best:70.9,not:4.5,players:6,recommended:24.5}}},{name:"Augustus",numberOfPlayers:{0:{best:6.7,not:20,players:2,recommended:73.3},1:{best:50.9,not:0,players:3,recommended:49.1},2:{best:67.9,not:0,players:4,recommended:32.1},3:{best:35.4,not:4.2,players:5,recommended:60.4},4:{best:23.9,not:15.2,players:6,recommended:60.9}}},{name:"No Thanks!",numberOfPlayers:{0:{best:1,not:92.2,players:2,recommended:6.8},1:{best:17.5,not:18.9,players:3,recommended:63.6},2:{best:57.7,not:0,players:4,recommended:42.3},3:{best:73,not:.7,players:5,recommended:26.4}}},{name:"Rattus",numberOfPlayers:{0:{best:6.8,not:45.9,players:2,recommended:47.3},1:{best:28.6,not:3.9,players:3,recommended:67.5},2:{best:87.8,not:2.4,players:4,recommended:9.8}}},{name:"Agricola: All Creatures Big and Small",numberOfPlayers:{0:{best:94,not:1.2,players:2,recommended:4.8}}},{name:"Dice Town",numberOfPlayers:{0:{best:4.7,not:53.5,players:2,recommended:41.9},1:{best:20.9,not:16.3,players:3,recommended:62.8},2:{best:67.4,not:2.2,players:4,recommended:30.4},3:{best:48.9,not:6.4,players:5,recommended:44.7}}},{name:"Saboteur",numberOfPlayers:{0:{best:1.4,not:83.7,players:3,recommended:15},1:{best:4.3,not:58.4,players:4,recommended:37.3},2:{best:21.5,not:8.6,players:5,recommended:69.9},3:{best:37.3,not:6.5,players:6,recommended:56.2},4:{best:64.7,not:1.2,players:7,recommended:34.1},5:{best:58.8,not:4.1,players:8,recommended:37.2},6:{best:31.6,not:9.6,players:9,recommended:58.8},7:{best:24.8,not:14.3,players:10,recommended:60.9}}},{name:"Bang! The Dice Game",numberOfPlayers:{0:{best:0,not:87.1,players:3,recommended:12.9},1:{best:3.5,not:55.8,players:4,recommended:40.7},2:{best:32.6,not:1.1,players:5,recommended:66.3},3:{best:68.8,not:0,players:6,recommended:31.3},4:{best:64.8,not:1.1,players:7,recommended:34.1},5:{best:39.5,not:5.8,players:8,recommended:54.7}}},{name:"Cacao",numberOfPlayers:{0:{best:19.4,not:6.5,players:2,recommended:74.2},1:{best:69.7,not:3,players:3,recommended:27.3},2:{best:34.3,not:5.7,players:4,recommended:60}}},{name:"Dominion",numberOfPlayers:{0:{best:38.4,not:6,players:2,recommended:55.6},1:{best:56.7,not:1,players:3,recommended:42.3},2:{best:39.6,not:6.9,players:4,recommended:53.5}}},{name:"For Sale",numberOfPlayers:{0:{best:7.7,not:19.6,players:3,recommended:72.6},1:{best:41.2,not:0,players:4,recommended:58.8},2:{best:69.4,not:1.2,players:5,recommended:29.5},3:{best:32.5,not:8.8,players:6,recommended:58.8}}},{name:"High Society",numberOfPlayers:{0:{best:20,not:21.5,players:3,recommended:58.5},1:{best:63.6,not:0,players:4,recommended:36.4},2:{best:56.3,not:3.1,players:5,recommended:40.6}}},{name:"Sushi Go",numberOfPlayers:{0:{best:5.7,not:39.8,players:2,recommended:54.5},1:{best:44.9,not:2.2,players:3,recommended:52.8},2:{best:71.1,not:1,players:4,recommended:27.8},3:{best:33.3,not:7.7,players:5,recommended:59}}},{name:"Coup Rebellion G54",numberOfPlayers:{0:{best:7.1,not:28.6,players:3,recommended:64.3},1:{best:35.7,not:0,players:4,recommended:64.3},2:{best:85.7,not:0,players:5,recommended:14.3},3:{best:64.3,not:7.1,players:6,recommended:28.6}}},{name:"Splendor",numberOfPlayers:{0:{best:34.5,not:7.8,players:2,recommended:57.8},1:{best:53.2,not:2,players:3,recommended:44.8},2:{best:37.5,not:8.2,players:4,recommended:54.3}}},{name:"Settlers of Catan, The",numberOfPlayers:{0:{best:35,not:7.1,players:3,recommended:57.9},1:{best:75.9,not:2,players:4,recommended:22.1}}},{name:"Carcassonne: The Castle",numberOfPlayers:{0:{best:96.5,not:0,players:2,recommended:3.5}}}]}playingStatusChanged(e){console.log("playingStatusChanged")}signOut(e){console.log("signOut")}createRenderRoot(){return this}render(){return $`
      <nav-bar .user="${this.user}" @sign-out="${this.signOut}"></nav-bar>

      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <players-list
              .user="${this.user}"
              .players="${this.players}"
              @playing-status-changed="${this.playingStatusChanged}"
            ></players-list>
          </div>
          <div class="col-md-8">
            <game-tabs
              .games="${this.games}"
              .num-players="this.counts.playersIn"
            ></game-tabs>
          </div>
        </div>

        <footer>
          <div>
            Copyright &copy; 2019
            <a href="mailto:john.munsch@gmail.com">John Munsch</a>
          </div>
        </footer>
      </div>
    `}});customElements.define("playing-today-app",class extends Q{createRenderRoot(){return this}render(){return $`
      <main-page></main-page>
    `}})}]);
//# sourceMappingURL=bundle.js.map