!function(u){function t(t){for(var e,n,r=t[0],a=t[1],i=t[2],o=0,s=[];o<r.length;o++)n=r[o],Object.prototype.hasOwnProperty.call(l,n)&&l[n]&&s.push(l[n][0]),l[n]=0;for(e in a)Object.prototype.hasOwnProperty.call(a,e)&&(u[e]=a[e]);for(f&&f(t);s.length;)s.shift()();return p.push.apply(p,i||[]),c()}function c(){for(var t,e=0;e<p.length;e++){for(var n=p[e],r=!0,a=1;a<n.length;a++){var i=n[a];0!==l[i]&&(r=!1)}r&&(p.splice(e--,1),t=o(o.s=n[0]))}return t}var n={},l={286:0},p=[];function o(t){if(n[t])return n[t].exports;var e=n[t]={i:t,l:!1,exports:{}};return u[t].call(e.exports,e,e.exports,o),e.l=!0,e.exports}o.m=u,o.c=n,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/static-dist/";var e=window.webpackJsonp=window.webpackJsonp||[],r=e.push.bind(e);e.push=t,e=e.slice();for(var a=0;a<e.length;a++)t(e[a]);var f=r;p.push([698,0]),c()}({263:function(t,e,n){"use strict";var r=n(20),o=n.n(r),a=n(0),i=n.n(a),s=n(1),u=n.n(s),c=n(94),l=function(){function e(t){i()(this,e),this.cropImg=t.cropImg,this.saveBtn=t.saveBtn,this.selectBtn=t.selectBtn,this.imgs=t.imgs,this.group=t.group,this.lastFile={},this.uploadInput=t.uploadInput||".js-upload-input",this.modal=t.modal||"#modal",this.init()}return u()(e,[{key:"init",value:function(){this.initImage();var t=this.imageCrop();this.initEvent(t)}},{key:"initImage",value:function(){var t=JSON.parse(localStorage.getItem("crop_image_attr"));$(this.cropImg).attr({src:t.src,width:t.width,height:t.height,"data-natural-width":t["natural-width"],"data-natural-height":t["natural-height"]}),localStorage.removeItem("crop_image_attr")}},{key:"initEvent",value:function(e){var n=this;$(this.saveBtn).on("click",function(t){return n.saveEvent(t,e)}),$(this.selectBtn).on("click",function(t){return n.selectEvent(t)})}},{key:"saveEvent",value:function(t,e){t.stopPropagation();var n=$(t.currentTarget);console.log("start crop"),e.crop({imgs:this.imgs,post:!1}),n.button("loading")}},{key:"selectEvent",value:function(){$(this.uploadInput).click()}},{key:"imageCrop",value:function(){var e=this,t=new c.a({element:this.cropImg,cropedWidth:this.imgs.large[0],cropedHeight:this.imgs.large[1],group:this.group});return this.lastFile=$(this.uploadInput)[0].files[0],t.afterCrop=function(t){e.afterCrop(t)},t}},{key:"afterCrop",value:function(n){var r=new FormData,a=$(this.modal),i=$(this.uploadInput);r.append("token",i.data("token"));var t=i[0].files[0]?i[0].files[0]:this.lastFile;r.append("file",t);new o.a(function(e,t){$.ajax({url:i.data("fileUpload"),type:"POST",cache:!1,data:r,processData:!1,contentType:!1}).done(function(t){e(t)})}).then(function(t){return new o.a(function(e,t){$.post(i.data("crop"),n,function(t){e(t)})})}).then(function(t){return n=t,new o.a(function(t,e){$.post(i.data("saveUrl"),{images:n},function(t){t.image&&($(i.data("targetImg")).attr("src",t.image),cd.message({type:"success",message:Translator.trans("site.upload_success_hint")}))}).error(function(){cd.message({type:"danger",message:Translator.trans("site.upload_fail_retry_hint")})}).always(function(){i.val(""),a.modal("hide")})});var n}).catch(function(t){console.log(t)})}}]),e}();e.a=l},698:function(t,e,n){"use strict";n.r(e),new(n(263).a)({cropImg:"#avatar-crop",saveBtn:"#save-btn",selectBtn:"#select-btn",group:"user",imgs:{large:[200,200],medium:[120,120],small:[48,48]}})}});