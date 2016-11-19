import  videojs from 'video.js'
import Emitter from 'es6-event-emitter';
require('file-loader?name=libs/[name].[ext]!nodeModulesDir/video.js/dist/video-js/video-js.swf');
class LocalVideoPlayer extends Emitter{
    constructor(options) {
        super();
        this.options = options;
        this.player = '';
        this.setup();
    }

    setup() {
        var techOrder = ['flash', 'html5'];
         if (this.options.agentInWhiteList || this.options.mediaType=='audio') {
            techOrder = ['html5', 'flash'];
        }
        var that = this;
        var player = videojs(this.options.element, {
            techOrder: techOrder,
            loop: false,
            flash: {
                swf: '/build/libs/video-js.swf'
            },
        });
        player.dimensions('100%', '100%');
        player.src(this.options.url);

        player.on('error', function (error) {
            that.set("hasPlayerError", true);
            var message = Translator.trans('您的浏览器不能播放当前视频。');
           // Notify.danger(message, 60);
        });

        player.on('fullscreenchange', function (e) {
            if ($(e.target).hasClass('vjs-fullscreen')) {
                $("#site-navbar").hide();
            }
        });

        player.on('ended', function (e) {
            that._onEnded(e);
            that.trigger('ended', e);
        });

        player.on('timeupdate', function (e) {
            that.trigger('timechange', e);
        });

        player.on('loadedmetadata', function (e) {
            that.trigger('ready', e);
        });

        player.on("play", function (e) {
            that.trigger("playing", e);
        });

        player.on("pause", function (e) {
            that.trigger("paused", e);
        });

        this.player =player;

        window.player = this;
    }

    checkHtml5() {
        if (window.applicationCache) {
            return true;
        } else {
            return false;
        }
    }


    play() {
        this.player.play();
    }

    _onEnded(e) {
        if (this.get("hasPlayerError")) {
            return;
        }
        var player = this.player;
        player.currentTime(0);
        /* 播放器重置时间后马上暂停没用, 延时100毫秒再执行暂停 */
        setTimeout(function(){
            player.pause();
        },100);
       // _.delay(_.bind(player.pause, player), 100);
    }


    getCurrentTime() {
        return this.player.currentTime();
    }


    getDuration() {
        return this.player.duration();
    }


    setCurrentTime(time) {
        this.player.currentTime(time);
        return this;
    }


    replay() {
        this.setCurrentTime(0).play();
        return this;
    }


    isPlaying() {
        return !this.player.paused();
    }

    destroy() {
        this.player.dispose();
    }
}
export  default LocalVideoPlayer;