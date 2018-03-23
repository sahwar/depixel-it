!function(e){function r(t){if(n[t])return n[t].exports;var d=n[t]={i:t,l:!1,exports:{}};return e[t].call(d.exports,d,d.exports,r),d.l=!0,d.exports}var n={};r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:t})},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},r.p="/depixel-it/",r(r.s=0)}([function(e,r,n){"use strict";function t(e){return e&&e.__esModule?e:{default:e}}function d(e,r){!e&&0!==e||!r&&0!==r||b.default.progress(e,r),w({type:"progress",data:b.default.getProgression()})}function o(e,r,n){for(var t=new N.default(r*n,r,n),o=0;o<n;o++)for(var i=0;i<r;i++){var a=o*r+i,s={r:e[4*a],g:e[4*a+1],b:e[4*a+2]};t.nodes[a].rgb=s,t.nodes[a].x=i,t.nodes[a].y=o,i<r-1&&(t.addEdge(a,a+1,"right"),o>0&&t.addEdge(a,a-r+1,"upright"),o<n-1&&t.addEdge(a,a+r+1,"downright")),i>0&&(t.addEdge(a,a-1,"left"),o>0&&t.addEdge(a,a-r-1,"upleft"),o<n-1&&t.addEdge(a,a+r-1,"downleft")),o<n-1&&t.addEdge(a,a+r,"down"),o>0&&t.addEdge(a,a-r,"up"),d(0,Math.floor(a/(n*r)*100))}return t}function i(e){return{y:Math.ceil(.299*e.r+.587*e.g+.114*e.b),u:Math.ceil(-.168736*e.r+-.331264*e.g+.5*e.b+128),v:Math.ceil(.5*e.r+-.418688*e.g+-.081312*e.b+128)}}function a(e,r){return e.r===r.r&&e.g===r.g&&e.b===r.b}function s(e){for(var r=e.nodes,n=0;n<r.length;++n)for(var t=r[n].edges,d=i(r[n].rgb),o=0;o<t.length;++o){var a=r[t[o].nodeId],s=i(a.rgb);(Math.abs(d.y-s.y)>48/255||Math.abs(d.u-s.u)>7/255||Math.abs(d.v-s.v)>6/255)&&(console.log("removing edges "+n+" -> "+t[o].nodeId),e.removeEdge(n,t[o].nodeId),--o)}}function g(e,r,n,t){var d=e.nodes,o=[],i=[r+"-"+n];for(o.push(r),o.push(n);o.length;){var a=o.pop(),s=d[a].edges;if(2===s.length)for(var g=0;g<s.length;++g){var u=s[g];-1===i.indexOf(a+"-"+u.nodeId)&&-1===i.indexOf(u.nodeId+"-"+a)&&(i.push(a+"-"+u.nodeId),o.push(u.nodeId))}}return i.length}function u(e,r,n,t){var d=e%n,o=Math.floor(e/n),i=r%n,a=Math.floor(r/n),s=-5+Math.min(d,i),g=-5+Math.min(o,a);return{xMin:s,yMin:g,xMax:s+8,yMax:g+8}}function l(e,r,n){var t=e.xMin,d=e.yMin,o=e.xMax,i=e.yMax;return r>=t&&r<=o&&n>=d&&n<=i}function f(e,r,n,t,d){var o=[],i=[r,n],a=u(r,n,t,d);for(o.push(r),o.push(n);o.length;)for(var s=o.pop(),g=e.nodes[s].edges,f=0;f<g.length;++f){var h=g[f].nodeId;if(-1===i.indexOf(h)){var c=e.nodes[h];l(a,c.x,c.y)&&(i.push(h),o.push(h))}}return-i.length}function h(e,r,n,t){var d=e.nodes;return 1===d[r].edges.length||1===d[n].edges.length?5:0}function c(e,r,n,t,d){var o=0;return o+=g(e,r,n,t),console.error("computeCurveHeuristic "+r+" "+n),console.log(g(e,r,n,t)),o+=f(e,r,n,t,d),console.error("computeSparseHeuristic "+r+" "+n),console.log(f(e,r,n,t,d)),o+=h(e,r,n,t),console.error("computeIslandHeuristic "+r+" "+n),console.log(h(e,r,n,t)),o}function v(e,r,n,t){var d=c(e,r,r+n+1,n,t),o=c(e,r+1,r+n,n,t);return d>o?(console.error("winner first"),{from:r+1,to:r+n}):d<o?(console.error("winner second"),{from:r,to:r+n+1}):null}function p(e,r,n){for(var t=e.nodes,d=0;d<t.length;++d)if(e.hasEdge(d,d+1)&&e.hasEdge(d,d+r)&&e.hasEdge(d,d+r+1)&&e.hasEdge(d+1,d+r)&&e.hasEdge(d+1,d+r+1)&&e.hasEdge(d+r,d+r+1))e.removeEdge(d,d+r+1),e.removeEdge(d+1,d+r);else if(!e.hasEdge(d,d+1)&&!e.hasEdge(d,d+r)&&e.hasEdge(d,d+r+1)&&e.hasEdge(d+1,d+r)&&!e.hasEdge(d+1,d+r+1)&&!e.hasEdge(d+r,d+r+1)){var o=v(e,d,r,n);o?e.removeEdge(o.from,o.to):(e.removeEdge(d,d+r+1),e.removeEdge(d+1,d+r))}}function y(e,r,n){var t=new N.default((r+1)*(n+1),r+1,n+1),d=e.nodes;t.makeGrid(r,n);for(var o=0;o<d.length;++o){var i=d[o],s=i.edges,g=i.x,u=i.y,l=i.rgb,f=i.id;if(!(0===g&&0===u||0===g&&u===n-1||g===r-1&&0===u||g===r-1&&u===n-1))for(var h=0;h<s.length;++h){var c=s[h],v=d[c.nodeId];if(g!==v.x&&u!==v.y){var p=Math.max(v.x,g),y=Math.max(v.y,u),E=v.x-g,m=v.y-u,x=e.findNode(v.x,u),M=null,b=null,w=null,I=null,k=null,O=null,C=null;a(l,x.rgb)||(M=[p,y-m],b=[p,y-.5*m],w=[p+.25*E,y-.25*m],e.removeCorner(x.id,p,y),e.addCorner(x.id,w[0],w[1]),e.addCorner(f,w[0],w[1]),I=t.findNode(b[0],b[1]),k=t.findNode(w[0],w[1]),O=t.findNode(p,y),I?t.removeEdge(I.id,O.id):(C=t.findNode(M[0],M[1]),t.removeEdge(C.id,O.id),I=t.addNode(b[0],b[1]),t.addEdge(C.id,I.id)),k||(k=t.addNode(w[0],w[1])),t.addEdge(I.id,k.id),t.addEdge(k.id,O.id)),x=e.findNode(g,v.y),a(l,x.rgb)||(M=[p-E,y],b=[p-.5*E,y],w=[p-.25*E,y+.25*m],e.removeCorner(x.id,p,y),e.addCorner(x.id,w[0],w[1]),e.addCorner(f,w[0],w[1]),I=t.findNode(b[0],b[1]),k=t.findNode(w[0],w[1]),O=t.findNode(p,y),I?t.removeEdge(I.id,O.id):(C=t.findNode(M[0],M[1]),t.removeEdge(C.id,O.id),I=t.addNode(b[0],b[1]),t.addEdge(C.id,I.id)),k||(k=t.addNode(w[0],w[1])),t.addEdge(I.id,k.id),t.addEdge(k.id,O.id))}}}for(var _=[],z=0;z<t.nodes.length;++z){var P=t.nodes[z],s=P.edges,g=P.x,u=P.y,f=P.id;0===g&&0===u||0===g&&u===n||g===r&&0===u||g===r&&u===n||(2===s.length&&t.addEdge(s[0].nodeId,s[1].nodeId),s.length<=2&&_.push(f))}for(var j=0;j<_.length;++j)t.removeNode(_[j]);for(var S=0;S<d.length;++S)for(var J=JSON.parse(JSON.stringify(d[S].corners)),G=0;G<J.length;++G)t.findNode(J[G].x,J[G].y)||e.removeCorner(S,J[G].x,J[G].y);return t}function E(e,r,n){var t=o(e,r,n);w({type:"step",data:{type:"initial",graph:t.serialize()}}),s(t),w({type:"step",data:{type:"initial",graph:t.serialize()}}),p(t,r,n),w({type:"step",data:{type:"initial",graph:t.serialize()}});var d=y(t,r,n);w({type:"step",data:{type:"reshaped",graph:d.serialize()}}),w({type:"step",data:{type:"initial",graph:t.serialize()}})}function m(e){var r=e.data.width,n=e.data.height,t=e.data.data;console.log("Message received from main script."),console.log(e.data),b.default.reset(),E(t,r,n),w({type:"step",data:{type:"final",image:t}}),b.default.done(),d()}var x=n(1),N=t(x),M=n(2),b=t(M),w=postMessage;onmessage=m},function(e,r,n){"use strict";function t(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function d(e,r){for(var n=0;n<e.length;++n)if(e[n].nodeId===r)return n;return-1}function o(e,r){for(var n=0;n<e.length;++n)if(e[n].id===r)return n;return-1}function i(e,r,n){for(var t=0;t<e.length;++t)if(e[t].x===r&&e[t].y===n)return t;return-1}Object.defineProperty(r,"__esModule",{value:!0});var a=function(){function e(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(r,n,t){return n&&e(r.prototype,n),t&&e(r,t),r}}(),s=0,g=function(){function e(r,n,d){t(this,e),this.id=++s,this.nodes=new Array(r),this.width=n,this.height=d;for(var o=0;o<this.nodes.length;++o){var i=o%n,a=Math.floor(o/n);this.nodes[o]={id:o,edges:[],rgb:null,x:-1,y:-1,corners:[{x:i,y:a}]},i<n&&this.nodes[o].corners.push({x:i+1,y:a}),a<d&&this.nodes[o].corners.push({x:i,y:a+1}),i<n&&a<d&&this.nodes[o].corners.push({x:i+1,y:a+1})}}return a(e,[{key:"makeGrid",value:function(e,r){for(var n=this.nodes,t=0;t<n.length;++t){var d=t%(e+1),o=Math.floor(t/(e+1));n[t].x=d,n[t].y=o,n[t].corners=[],console.log(""+d+o),d<e&&this.addEdge(t,t+1,"right"),o<r&&this.addEdge(t,t+(e+1),"down")}}},{key:"addNode",value:function(e,r){var n=this.findNode(e,r);return n||(n={id:this.nodes.length,edges:[],rgb:null,x:e,y:r,corners:[]},this.nodes.push(n)),n}},{key:"removeNode",value:function(e){var r=o(this.nodes,e);if(-1!==r){for(var n=this.nodes[r];n.edges.length;)this.removeEdge(e,n.edges[0].nodeId);this.nodes.splice(r,1)}}},{key:"findNode",value:function(e,r){for(var n=0;n<this.nodes.length;++n)if(this.nodes[n].x===e&&this.nodes[n].y===r)return this.nodes[n];return null}},{key:"getNode",value:function(e){for(var r=0;r<this.nodes.length;++r)if(this.nodes[r].id===e)return this.nodes[r];return null}},{key:"addEdge",value:function(e,r,n,t){var o=this.getNode(e),i=this.getNode(r);if(o&&-1===d(o.edges,r)&&o.edges.push({nodeId:r,dir:n,data:t}),i&&-1===d(i.edges,e)){i.edges.push({nodeId:e,dir:function(e){return"up"===e?"down":"down"===e?"up":"left"===e?"right":"right"===e?"left":"upright"===e?"downleft":"upleft"===e?"downright":"downleft"===e?"upright":"downright"===e?"upleft":void 0}(n),data:t})}}},{key:"removeEdge",value:function(e,r){var n=this.getNode(e),t=this.getNode(r);if(n){var o=d(n.edges,r);-1!==o&&n.edges.splice(o,1)}if(t){var i=d(t.edges,e);-1!==i&&t.edges.splice(i,1)}}},{key:"hasEdge",value:function(e,r){return-1!==d(this.getNode(e).edges,r)}},{key:"removeCorner",value:function(e,r,n){var t=this.getNode(e);if(t){var d=i(t.corners,r,n);-1!==d&&t.corners.splice(d,1)}}},{key:"addCorner",value:function(e,r,n){var t=this.getNode(e);t&&t.corners.push({x:r,y:n})}},{key:"serialize",value:function(){return JSON.stringify({nodes:this.nodes,width:this.width,height:this.height})}}],[{key:"unserialize",value:function(r){var n=JSON.parse(r),t=new e(n.nodes.length,n.width,n.height);return t.nodes=n.nodes,t}}]),e}();r.default=g},function(e,r,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=[{title:"Generating similarity graph",progress:0},{title:"Resolving ambiguous diagonals",progress:0},{title:"Computing reshaped graph",progress:0}],d={};d.reset=function(){for(var e=0;e<t.length;++e)t[e].progress=0},d.progress=function(e,r){t[e]&&(t[e].progress=r)},d.done=function(){for(var e=0;e<t.length;++e)t[e].progress=100},d.getProgression=function(){for(var e=0,r=null,n=0;n<t.length;++n)e+=t[n].progress,r||100===t[n].progress||(r=t[n].title);var d=Math.floor(e/t.length);return{title:100===d?"":r||t[0].title,percent:d,complete:100===d}},r.default=d}]);
//# sourceMappingURL=c0292686d4731ac1570e.worker.js.map