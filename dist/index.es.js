import e,{memo as t,useRef as r,useEffect as n,useCallback as a}from"react";var o=function(){return o=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},o.apply(this,arguments)};"function"==typeof SuppressedError&&SuppressedError;var i=function(e,t){void 0===t&&(t=1),"#"===e[0]&&(e=e.slice(1));var r=parseInt(e,16),n=r>>8&255,a=255&r;return"rgba(".concat(r>>16&255,", ").concat(n,", ").concat(a,", ").concat(t,")")},c=t((function(t){var c=t.amplitude,u=void 0===c?20:c,l=t.colors,p=void 0===l?["#436EDB"]:l,h=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(n=Object.getOwnPropertySymbols(e);a<n.length;a++)t.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]])}return r}(t,["amplitude","colors"]),f=r(u),d=r(null),s=r(u);n((function(){s.current=u}),[u]);var v=a((function(e,t,r,n,a){void 0===a&&(a=0),e.strokeStyle=n,e.beginPath();for(var o=0;o<e.canvas.width;o++){var i=Math.sin(Math.PI*(o/e.canvas.width)),c=Math.pow(i,6),u=t*Math.sin(r*o+a)*c;e.lineTo(o,e.canvas.height/2+u)}e.stroke()}),[]);return n((function(){var e,t=d.current,r=t.getContext("2d"),n=t.parentElement;n&&(t.width=n.clientWidth);var a=function(){var n,o,c=.0015*Date.now();f.current=(n=f.current,o=s.current,n+.1*(o-n));var u=f.current*(1+.05*Math.sin(c));r.clearRect(0,0,t.width,t.height);for(var l=function(e){var n=r.createLinearGradient(0,0,t.width,t.height),a=p.length>1?1/(p.length-1):0;p.forEach((function(t,r){n.addColorStop(a*r,i(t,e.alpha))})),v(r,e.amplitude,e.frequency,n,Date.now()*e.speed);for(var o=function(n){var a=e.amplitude-.1*n,o=e.frequency+25e-5*n,c=.6*e.alpha-.01*n,u=r.createLinearGradient(0,0,t.width,t.height),l=p.length>1?1/(p.length-1):0;p.forEach((function(e,t){u.addColorStop(l*t,i(e,c))})),v(r,a,o,u,Date.now()*e.speed+.015*n)},c=0;c<30;c++)o(c)},h=0,d=[{amplitude:u,frequency:.02,alpha:.6,speed:.001},{amplitude:.6*u,frequency:.03,alpha:.4,speed:.004},{amplitude:.3*u,frequency:.04,alpha:.2,speed:.007}];h<d.length;h++){l(d[h])}e=requestAnimationFrame(a)};return a(),function(){cancelAnimationFrame(e)}}),[p,v]),e.createElement("canvas",o({ref:d,width:"100%",height:"auto"},h))}));export{c as default};
//# sourceMappingURL=index.es.js.map