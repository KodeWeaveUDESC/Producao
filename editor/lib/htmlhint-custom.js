/*!
 * HTMLHint v0.9.6
 * https://github.com/yaniswang/HTMLHint
 *
 * (c) 2013 Yanis Wang <yanis.wang@gmail.com>.
 * MIT Licensed
 */
var HTMLHint=function(e){var t={};return t.version="0.9.6",t.rules={},t.defaultRuleset={"tagname-lowercase":!0,"attr-lowercase":!0,"attr-value-double-quotes":!0,"tag-pair":!0,"spec-char-escape":!0,"id-unique":!0,"src-not-empty":!0,"attr-no-duplication":!0},t.addRule=function(e){t.rules[e.id]=e},t.verify=function(a,n){a=a.replace(/^\s*<!--\s*htmlhint\s+([^\r\n]+?)\s*-->/i,function(t,a){return n===e&&(n={}),a.replace(/(?:^|,)\s*([^:]+)\s*:\s*([^,\s]+)/g,function(e,t,a){"false"===a?a=!1:"true"===a&&(a=!0),n[t]=a}),""}),(n===e||0===Object.keys(n).length)&&(n=t.defaultRuleset);var i,r=new HTMLParser,s=new t.Reporter(a.split(/\r?\n/),n),o=t.rules;for(var l in n)i=o[l],i!==e&&n[l]!==!1&&i.init(r,s,n[l]);return r.parse(a),s.messages},t}();"object"==typeof exports&&exports&&(exports.HTMLHint=HTMLHint),function(e){var t=function(){var e=this;e._init.apply(e,arguments)};t.prototype={_init:function(e,t){var a=this;a.lines=e,a.ruleset=t,a.messages=[]},error:function(e,t,a,n,i){this.report("error",e,t,a,n,i)},warn:function(e,t,a,n,i){this.report("warning",e,t,a,n,i)},info:function(e,t,a,n,i){this.report("info",e,t,a,n,i)},report:function(e,t,a,n,i,r){var s=this;s.messages.push({type:e,message:t,raw:r,evidence:s.lines[a-1],line:a,col:n,rule:{id:i.id,description:i.description,link:"https://github.com/yaniswang/HTMLHint/wiki/"+i.id}})}},e.Reporter=t}(HTMLHint);var HTMLParser=function(e){var t=function(){var e=this;e._init.apply(e,arguments)};return t.prototype={_init:function(){var e=this;e._listeners={},e._mapCdataTags=e.makeMap("script,style"),e._arrBlocks=[]},makeMap:function(e){for(var t={},a=e.split(","),n=0;a.length>n;n++)t[a[n]]=!0;return t},parse:function(t){function a(t,a,n,i){var r=n-w+1;i===e&&(i={}),i.raw=a,i.pos=n,i.line=b,i.col=r,L.push(i),c.fire(t,i);for(var s;s=p.exec(a);)b++,w=n+p.lastIndex}var n,i,r,s,o,l,d,u,c=this,f=c._mapCdataTags,g=/<(?:\/([^\s>]+)\s*|!--([\s\S]*?)--|!([^>]*?)|([\w\-:]+)((?:\s+[\w\-:]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"']+))?)*?)\s*(\/?))>/g,m=/\s*([\w\-:]+)(?:\s*=\s*(?:(")([^"]*)"|(')([^']*)'|([^\s"']+)))?/g,p=/\r?\n/g,v=0,h=0,w=0,b=1,L=c._arrBlocks;for(c.fire("start",{pos:0,line:1,col:1});n=g.exec(t);)if(i=n.index,i>v&&(u=t.substring(v,i),o?d.push(u):a("text",u,v)),v=g.lastIndex,!(r=n[1])||(o&&r===o&&(u=d.join(""),a("cdata",u,h,{tagName:o,attrs:l}),o=null,l=null,d=null),o))if(o)d.push(n[0]);else if(r=n[4]){s=[];for(var H,y=n[5],T=0;H=m.exec(y);){var x=H[1],M=H[2]?H[2]:H[4]?H[4]:"",R=H[3]?H[3]:H[5]?H[5]:H[6]?H[6]:"";s.push({name:x,value:R,quote:M,index:H.index,raw:H[0]}),T+=H[0].length}T===y.length?(a("tagstart",n[0],i,{tagName:r,attrs:s,close:n[6]}),f[r]&&(o=r,l=s.concat(),d=[],h=v)):a("text",n[0],i)}else(n[2]||n[3])&&a("comment",n[0],i,{content:n[2]||n[3],"long":n[2]?!0:!1});else a("tagend",n[0],i,{tagName:r});t.length>v&&(u=t.substring(v,t.length),a("text",u,v)),c.fire("end",{pos:v,line:b,col:v-w+1})},addListener:function(t,a){for(var n,i=this._listeners,r=t.split(/[,\s]/),s=0,o=r.length;o>s;s++)n=r[s],i[n]===e&&(i[n]=[]),i[n].push(a)},fire:function(t,a){a===e&&(a={}),a.type=t;var n=this,i=[],r=n._listeners[t],s=n._listeners.all;r!==e&&(i=i.concat(r)),s!==e&&(i=i.concat(s));for(var o=0,l=i.length;l>o;o++)i[o].call(n,a)},removeListener:function(t,a){var n=this._listeners[t];if(n!==e)for(var i=0,r=n.length;r>i;i++)if(n[i]===a){n.splice(i,1);break}},fixPos:function(e,t){var a,n=e.raw.substr(0,t),i=n.split(/\r?\n/),r=i.length-1,s=e.line;return r>0?(s+=r,a=i[r].length+1):a=e.col+t,{line:s,col:a}},getMapAttrs:function(e){for(var t,a={},n=0,i=e.length;i>n;n++)t=e[n],a[t.name]=t.value;return a}},t}();"object"==typeof exports&&exports&&(exports.HTMLParser=HTMLParser),HTMLHint.addRule({id:"attr-lowercase",description:"Attribute name must be lowercase.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,i=e.attrs,r=e.col+e.tagName.length+1,s=0,o=i.length;o>s;s++){n=i[s];var l=n.name;l!==l.toLowerCase()&&t.error("Attribute name [ "+l+" ] must be lower case.",e.line,r+n.index,a,n.raw)}})}}),HTMLHint.addRule({id:"attr-no-duplication",description:"Attribute name can not been duplication.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,i,r=e.attrs,s=e.col+e.tagName.length+1,o={},l=0,d=r.length;d>l;l++)n=r[l],i=n.name,o[i]===!0&&t.error("The name of attribute [ "+n.name+" ] been duplication.",e.line,s+n.index,a,n.raw),o[i]=!0})}}),HTMLHint.addRule({id:"attr-unsafe-chars",description:"Attribute value cant not use unsafe chars.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,i=e.attrs,r=e.col+e.tagName.length+1,s=/[\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/,o=0,l=i.length;l>o;o++)n=i[o],s.test(n.value)===!0&&t.warn("The value of attribute [ "+n.name+" ] cant not use unsafe chars.",e.line,r+n.index,a,n.raw)})}}),HTMLHint.addRule({id:"attr-value-double-quotes",description:"Attribute value must closed by double quotes.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,i=e.attrs,r=e.col+e.tagName.length+1,s=0,o=i.length;o>s;s++)n=i[s],(""!==n.value&&'"'!==n.quote||""===n.value&&"'"===n.quote)&&t.error("The value of attribute [ "+n.name+" ] must closed by double quotes.",e.line,r+n.index,a,n.raw)})}}),HTMLHint.addRule({id:"attr-value-not-empty",description:"Attribute must set value.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,i=e.attrs,r=e.col+e.tagName.length+1,s=0,o=i.length;o>s;s++)n=i[s],""===n.quote&&""===n.value&&t.warn("The attribute [ "+n.name+" ] must set value.",e.line,r+n.index,a,n.raw)})}}),HTMLHint.addRule({id:"csslint",description:"Scan css with csslint.",init:function(e,t,a){var n=this;e.addListener("cdata",function(e){if("style"===e.tagName.toLowerCase()){var i;if(i="object"==typeof exports&&require?require("csslint").CSSLint.verify:CSSLint.verify,void 0!==a){var r=e.line-1,s=e.col-1;try{var o=i(e.raw,a).messages;o.forEach(function(e){var a=e.line;t["warning"===e.type?"warn":"error"]("["+e.rule.id+"] "+e.message,r+a,(1===a?s:0)+e.col,n,e.evidence)})}catch(l){}}}})}}),HTMLHint.addRule({id:"doctype-html5",description:"Doctype must be html5.",init:function(e,t){function a(e){e.long===!1&&"doctype html"!==e.content.toLowerCase()&&t.warn("Doctype must be html5.",e.line,e.col,i,e.raw)}function n(){e.removeListener("comment",a),e.removeListener("tagstart",n)}var i=this;e.addListener("all",a),e.addListener("tagstart",n)}}),HTMLHint.addRule({id:"head-script-disabled",description:"The script tag can not be used in head.",init:function(e,t){function a(e){"script"===e.tagName.toLowerCase()&&t.warn("The script tag can not be used in head.",e.line,e.col,i,e.raw)}function n(t){"head"===t.tagName.toLowerCase()&&(e.removeListener("tagstart",a),e.removeListener("tagstart",n))}var i=this;e.addListener("tagstart",a),e.addListener("tagend",n)}}),HTMLHint.addRule({id:"href-abs-or-rel",description:"Href must be absolute or relative.",init:function(e,t,a){var n=this,i="abs"===a?"absolute":"relative";e.addListener("tagstart",function(e){for(var a,r=e.attrs,s=e.col+e.tagName.length+1,o=0,l=r.length;l>o;o++)if(a=r[o],"href"===a.name){("absolute"===i&&/^\w+?:/.test(a.value)===!1||"relative"===i&&/^https?:\/\//.test(a.value)===!0)&&t.warn("The value of href [ "+a.value+" ] must be "+i+".",e.line,s+a.index,n,a.raw);break}})}}),HTMLHint.addRule({id:"id-class-ad-disabled",description:"Id and class can not use ad keyword, it will blocked by adblock software.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,i,r=e.attrs,s=e.col+e.tagName.length+1,o=0,l=r.length;l>o;o++)n=r[o],i=n.name,/^(id|class)$/i.test(i)&&/(^|[-\_])ad([-\_]|$)/i.test(n.value)&&t.warn("The value of "+i+" can not use ad keyword.",e.line,s+n.index,a,n.raw)})}}),HTMLHint.addRule({id:"id-class-value",description:"Id and class value must meet some rules.",init:function(e,t,a){var n,i=this,r={underline:{regId:/^[a-z\d]+(_[a-z\d]+)*$/,message:"Id and class value must lower case and split by underline."},dash:{regId:/^[a-z\d]+(-[a-z\d]+)*$/,message:"Id and class value must lower case and split by dash."},hump:{regId:/^[a-z][a-zA-Z\d]*([A-Z][a-zA-Z\d]*)*$/,message:"Id and class value must meet hump style."}};if(n="string"==typeof a?r[a]:a,n&&n.regId){var s=n.regId,o=n.message;e.addListener("tagstart",function(e){for(var a,n=e.attrs,r=e.col+e.tagName.length+1,l=0,d=n.length;d>l;l++)if(a=n[l],"id"===a.name.toLowerCase()&&s.test(a.value)===!1&&t.warn(o,e.line,r+a.index,i,a.raw),"class"===a.name.toLowerCase())for(var u,c=a.value.split(/\s+/g),f=0,g=c.length;g>f;f++)u=c[f],u&&s.test(u)===!1&&t.warn(o,e.line,r+a.index,i,u)})}}}),HTMLHint.addRule({id:"id-unique",description:"Id must be unique.",init:function(e,t){var a=this,n={};e.addListener("tagstart",function(e){for(var i,r,s=e.attrs,o=e.col+e.tagName.length+1,l=0,d=s.length;d>l;l++)if(i=s[l],"id"===i.name.toLowerCase()){r=i.value,r&&(void 0===n[r]?n[r]=1:n[r]++,n[r]>1&&t.error("Id redefinition of [ "+r+" ].",e.line,o+i.index,a,i.raw));break}})}}),HTMLHint.addRule({id:"img-alt-require",description:"Alt of img tag must be set value.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){if("img"===e.tagName.toLowerCase()){for(var n=e.attrs,i=!1,r=0,s=n.length;s>r;r++)if("alt"===n[r].name.toLowerCase()){i=!0;break}i===!1&&t.warn("Alt of img tag must be set value.",e.line,e.col,a,e.raw)}})}}),HTMLHint.addRule({id:"jshint",description:"Scan script with jshint.",init:function(e,t,a){var n=this;e.addListener("cdata",function(i){if("script"===i.tagName.toLowerCase()){var r=e.getMapAttrs(i.attrs),s=r.type;if(void 0!==r.src||s&&/^(text\/javascript)$/i.test(s)===!1)return;var o;if(o="object"==typeof exports&&require?require("jshint").JSHINT:JSHINT,void 0!==a){var l=i.line-1,d=i.col-1,u=i.raw.replace(/\t/g," ");try{var c=o(u,a);c===!1&&o.errors.forEach(function(e){var a=e.line;t.warn(e.reason,l+a,(1===a?d:0)+e.character,n,e.evidence)})}catch(f){}}}})}}),HTMLHint.addRule({id:"space-tab-mixed-disabled",description:"Spaces and tabs can not mixed in front of line.",init:function(e,t){var a=this;e.addListener("text",function(n){for(var i,r=n.raw,s=/(^|\r?\n)( +\t|\t+ )/g;i=s.exec(r);){var o=e.fixPos(n,i.index+i[1].length);t.warn("Mixed spaces and tabs in front of line.",o.line,1,a,n.raw)}})}}),HTMLHint.addRule({id:"spec-char-escape",description:"Special characters must be escaped.",init:function(e,t){var a=this;e.addListener("text",function(n){for(var i,r=n.raw,s=/[<>]/g;i=s.exec(r);){var o=e.fixPos(n,i.index);t.error("Special characters must be escaped : [ "+i[0]+" ].",o.line,o.col,a,n.raw)}})}}),HTMLHint.addRule({id:"src-not-empty",description:"Src of img(script,link) must set value.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,i=e.tagName,r=e.attrs,s=e.col+i.length+1,o=0,l=r.length;l>o;o++)n=r[o],(/^(img|script|embed|bgsound|iframe)$/.test(i)===!0&&"src"===n.name||"link"===i&&"href"===n.name||"object"===i&&"data"===n.name)&&""===n.value&&t.error("[ "+n.name+"] of [ "+i+" ] must set value.",e.line,s+n.index,a,n.raw)})}}),HTMLHint.addRule({id:"style-disabled",description:"Style tag can not be use.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){"style"===e.tagName.toLowerCase()&&t.warn("Style tag can not be use.",e.line,e.col,a,e.raw)})}}),HTMLHint.addRule({id:"tag-pair",description:"Tag must be paired.",init:function(e,t){var a=this,n=[],i=e.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");e.addListener("tagstart",function(e){var t=e.tagName.toLowerCase();void 0!==i[t]||e.close||n.push(t)}),e.addListener("tagend",function(e){for(var i=e.tagName.toLowerCase(),r=n.length-1;r>=0&&n[r]!==i;r--);if(r>=0){for(var s=[],o=n.length-1;o>r;o--)s.push("</"+n[o]+">");s.length>0&&t.error("Tag must be paired, Missing: [ "+s.join("")+" ]",e.line,e.col,a,e.raw),n.length=r}else t.error("Tag must be paired, No start tag: [ "+e.raw+" ]",e.line,e.col,a,e.raw)}),e.addListener("end",function(e){for(var i=[],r=n.length-1;r>=0;r--)i.push("</"+n[r]+">");i.length>0&&t.error("Tag must be paired, Missing: [ "+i.join("")+" ]",e.line,e.col,a,"")})}}),HTMLHint.addRule({id:"tag-self-close",description:"The empty tag must closed by self.",init:function(e,t){var a=this,n=e.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");e.addListener("tagstart",function(e){var i=e.tagName.toLowerCase();void 0!==n[i]&&(e.close||t.warn("The empty tag : [ "+i+" ] must closed by self.",e.line,e.col,a,e.raw))})}}),HTMLHint.addRule({id:"tagname-lowercase",description:"Tagname must be lowercase.",init:function(e,t){var a=this;e.addListener("tagstart,tagend",function(e){var n=e.tagName;n!==n.toLowerCase()&&t.error("Tagname [ "+n+" ] must be lower case.",e.line,e.col,a,e.raw)})}});
