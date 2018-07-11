webpackJsonp(["app/js/open-course/index"],{0:function(t,e){t.exports=jQuery},"29cf60bbbbb4e174f0f6":function(t,e,n){"use strict";function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,n,a){return n&&t(e.prototype,n),a&&t(e,a),e}}(),o=n("b334fd7e4c5a19234db2"),s=function(t){return t&&t.__esModule?t:{default:t}}(o),i=function(){function t(e){a(this,t),this.ele=$(e.element),this.init()}return r(t,[{key:"init",value:function(){this.initEvent(),$("[name=access-intercept-check]").length>0&&$.get($("[name=access-intercept-check]").val(),function(t){t||$(".access-intercept-modal").modal("show")},"json"),this.initPostForm()}},{key:"initEvent",value:function(){var t=this,e=this.ele;e.on("click",".js-post-more",function(e){return t.onClickPostMore(e)}),e.on("click",".js-reply",function(e){return t.onClickReply(e)}),e.on("click",".js-post-delete",function(e){return t.onPostDelete(e)}),e.on("click",".js-post-up",function(e){return t.onPostUp(e)}),e.on("click","[data-role=confirm-btn]",function(e){return t.onConfirmBtn(e)}),e.on("click",".js-toggle-subpost-form",function(e){return t.onClickToggleSubpostForm(e)}),e.on("click",".js-event-cancel",function(e){return t.onClickEventCancelBtn(e)}),e.on("click",".thread-subpost-container .pagination a",function(e){return t.onClickSubpost(e)})}},{key:"onClickPostMore",value:function(t){t.stopPropagation();var e=$(t.currentTarget);e.parents(".thread-subpost-moretext").addClass("hide"),e.parents(".thread-post").find(".thread-subpost").removeClass("hide"),e.parents(".thread-post").find(".pagination").removeClass("hide")}},{key:"onClickReply",value:function(t){t.stopPropagation();var e=$(t.currentTarget),n=e.parents(".thread-subpost-list").length>0,a=e.parents(".thread-post").find(".thread-subpost-container"),r=a.find(".thread-subpost-form");if(n){r.removeClass("hide");var o=Translator.trans("thread.post.reply")+" @ "+e.parents(".thread-post").data("authorName")+"： ";r.find("textarea").val(o).trigger("focus")}else a.toggleClass("hide");e.html()==Translator.trans("thread.post.reply")?e.html(Translator.trans("thread.post.put_away")):e.html(Translator.trans("thread.post.reply")),this.initSubpostForm(r)}},{key:"onPostDelete",value:function(t){t.stopPropagation();var e=this.ele,n=$(t.currentTarget);if(confirm(Translator.trans("thread.post.delete_hint"))){var a=n.parents(".thread-subpost-list").length>0;$.post(n.data("url"),function(){if(a){var t=n.parents(".thread-post").find(".subposts-num");t.text(parseInt(t.text())-1)}else e.find(".thread-post-num").text(parseInt(e.find(".thread-post-num").text())-1);$(n.data("for")).remove()})}}},{key:"onPostUp",value:function(t){t.stopPropagation();var e=$(t.currentTarget);$.post(e.data("url"),function(t){"ok"==t.status?e.find(".post-up-num").text(parseInt(e.find(".post-up-num").text())+1):"votedError"==t.status?(0,s.default)("danger",Translator.trans("thread.post.like_hint")):(0,s.default)("danger",Translator.trans("thread.post.like_error_hint"))},"json")}},{key:"onConfirmBtn",value:function(t){t.stopPropagation();var e=$(t.currentTarget);confirm(e.data("confirmMessage"))&&$.post(e.data("url"),function(){if(e.data("afterUrl"))return void(window.location.href=e.data("afterUrl"));window.location.reload()})}},{key:"onClickToggleSubpostForm",value:function(t){t.stopPropagation();var e=$(t.currentTarget),n=e.parents(".thread-subpost-container").find(".thread-subpost-form");n.toggleClass("hide"),this.initSubpostForm(n)}},{key:"onClickEventCancelBtn",value:function(t){$.post($(t.currentTarget).data("url"),function(){window.location.reload()})}},{key:"onClickSubpost",value:function(t){t.preventDefault();var e=$(t.currentTarget);$.post(e.attr("href"),function(t){var n=e.parents(".thread-post").attr("id");$("body,html").animate({scrollTop:$("#"+n).offset().top},300),e.closest(".thread-subpost-container .thread-subpost-content").html(t)})}},{key:"initPostForm",value:function(){var t=$(".thread-pripost-list"),e=$("#thread-post-form");if(0!=e.length){var n=null,a=e.find("textarea[name=content]");a.data("imageUploadUrl")&&(n=CKEDITOR.replace(a.attr("id"),{toolbar:"Thread",fileSingleSizeLimit:app.fileSingleSizeLimit,filebrowserImageUploadUrl:a.data("imageUploadUrl")}),n.on("change",function(){a.val(n.getData())}));var r=e.find("[type=submit]");e.validate({ajax:!0,currentDom:r,rules:{content:"required"},submitSuccess:function(o){r.button("reset"),a.data("imageUploadUrl")?(t.append(o),n.setData("")):(t.prepend(o),a.val(""));var s=t.find("li:last-child").offset();$("body").scrollTop(s.top),e.find(".thread-post-num").text(parseInt(e.find(".thread-post-num").text())+1),t.find("li.empty").remove(),t.closest(".top-reply").removeClass("hidden"),$(".js-attachment-list").empty(),$(".js-attachment-ids").val(""),$(".js-upload-file").show()},submitError:function(t){r.button("reset")}})}}},{key:"initSubpostForm",value:function(t){var e=t.find("[type=submit]");t.validate({ajax:!0,currentDom:e,rules:{content:"required"},submitSuccess:function(n){if(n.error)return void(0,s.default)("danger",n.error);e.button("reset"),t.parents(".thread-subpost-container").find(".thread-subpost-list").append(n),t.find("textarea").val("");var a=t.parents(".thread-post").find(".subposts-num");a.text(parseInt(a.text())+1),a.parent().removeClass("hide")},submitError:function(t){e.button("reset"),t=$.parseJSON(t.responseText),t.error?(0,s.default)("danger",t.error.message):(0,s.default)("danger",Translator.trans("thread.post.reply_error_hint"))}})}},{key:"undelegateEvents",value:function(t,e){this.ele.off(t,e)}}]),t}();e.default=i},"3362ac86e68ff2f492ab":function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}var r=n("29cf60bbbbb4e174f0f6"),o=a(r),s=n("b334fd7e4c5a19234db2"),i=a(s),l={init:function(){l.onClickThumb(),l.onClickfavorite(),l.removeMask(),l.onClickReplay()},onClickThumb:function(){$(".js-like-num").on("click",function(){var t,e,n=$(this);n.off("click").css("cursor","default"),t=n.data("likeUrl"),e="addClass",$.post(t,function(t){var a=n.parent().next(),r=a.html();a.html(parseInt(r)+1),n.parent()[e]("active")})})},onClickfavorite:function(){$(".js-favorite-num").on("click",function(){var t,e,n,a=$(this),r=a.parent().hasClass("active");r?(n=Translator.trans("open_course.collect"),t=a.data("cancelFavoriteUrl"),e="removeClass"):(t=a.data("favoriteUrl"),e="addClass",n=Translator.trans("open_course.collected")),$.post(t,function(t){t.result?(a.parent().next().html(n),a.parent()[e]("active")):t.result||"Access Denied"!=t.message?(0,i.default)("danger",t.message):($("#modal").html(),$("#modal").load(a.data("loginUrl")),$("#modal").modal("show"))})})},onClickReplay:function(){$(".js-play-es-live").on("click",function(){var t=$(this).data("url"),e="<iframe src='"+t+"' name='viewerIframe' id='viewerIframe' width='100%'allowfullscreen webkitallowfullscreen height='100%' style='border:0px'></iframe>";$(".open-course-views").html(e)})},isEsVedio:function(){""==$("#lesson-preview-player").html()&&$(".embed-responsive-16by9").addClass("masks")},removeMask:function(){setTimeout(l.isEsVedio,1500)}};if(l.init(),!$("#open-course-comment").find("[type=submit]").hasClass("disabled")){new o.default({element:"#open-course-comment"})}}},["3362ac86e68ff2f492ab"]);