/* This includes ddexitpop files to initialize marketing popup container */

var ddexitpop=function(o){var i={delayregister:0,delayshow:200,hideaftershow:!0,displayfreq:"always",persistcookie:"ddexitpop_shown",fxclass:"rubberBand",mobileshowafter:3e3,onddexitpop:function(){}},e=["bounce","flash","pulse","rubberBand","shake","swing","tada","wobble","jello","bounceIn","bounceInDown","bounceInLeft","bounceInRight","bounceInUp","fadeIn","fadeInDown","fadeInDownBig","fadeInLeft","fadeInLeftBig","fadeInRight","fadeInRightBig","fadeInUp","fadeInUpBig","flipInX","flipInY","lightSpeedIn","rotateIn","rotateInDownLeft","rotateInDownRight","rotateInUpLeft","rotateInUpRight","slideInUp","slideInDown","slideInLeft","slideInRight","zoomIn","zoomInDown","zoomInLeft","zoomInRight","zoomInUp","rollIn"],t="ontouchstart"in window||0<navigator.msMaxTouchPoints?"touchstart":"click";function s(e){var t=new RegExp(e+"=[^;]+","i");return document.cookie.match(t)?document.cookie.match(t)[0].split("=")[1]:null}function r(e,t,n){var o="",i=new Date;if(void 0!==n){var s=parseInt(n)*(/hr/i.test(n)?60:/day/i.test(n)?1440:1);i.setMinutes(i.getMinutes()+s),o="; expires="+i.toUTCString()}document.cookie=e+"="+t+"; path=/"+o}var a={wrappermarkup:'<div id="ddexitpopwrapper"><div class="veil"></div></div>',$wrapperref:null,$contentref:null,displaypopup:!0,delayshowtimer:null,settings:null,ajaxrequest:function(e){var t=function(e){if(/^http/i.test(e)){var t=document.createElement("a");return t.href=e,t.href.replace(RegExp(t.hostname,"i"),location.hostname)}return e}(e);o.ajax({url:t,dataType:"html",error:function(e){alert("Error fetching content.<br />Server Response: "+e.responseText)},success:function(e){a.$contentref=o(e).appendTo(document.body),a.setup(a.$contentref)}})},detectexit:function(e){e.clientY<60&&(this.delayshowtimer=setTimeout(function(){a.showpopup(),a.settings.onddexitpop(a.$contentref)},this.settings.delayshow))},detectenter:function(e){e.clientY<60&&clearTimeout(this.delayshowtimer)},showpopup:function(){null!=this.$contentref&&1==this.displaypopup&&(!0===this.settings.randomizefxclass&&(this.settings.fxclass=e[Math.floor(Math.random()*e.length)]),this.$wrapperref.addClass("open"),this.$contentref.addClass(this.settings.fxclass),this.displaypopup=!1,this.settings.hideaftershow&&o(document).off("mouseleave.registerexit"))},hidepopup:function(){this.$wrapperref.removeClass("open"),this.$contentref.removeClass(this.settings.fxclass),this.displaypopup=!0},setup:function(e){this.$contentref.addClass("animated"),this.$wrapperref=o(this.wrappermarkup).appendTo(document.body),this.$wrapperref.append(this.$contentref),this.$wrapperref.find(".veil").on(t,function(){a.hidepopup()}),"always"!=this.settings.displayfreq&&("session"==this.settings.displayfreq?r(this.settings.persistcookie,"yes"):/\d+(hr|day)/i.test(this.settings.displayfreq)&&(r(this.settings.persistcookie,"yes",this.settings.displayfreq),r(this.settings.persistcookie+"_duration",this.settings.displayfreq,this.settings.displayfreq)))},init:function(e){var t=o.extend({},i,e),n=s(t.persistcookie+"_duration");!n||"session"!=t.displayfreq&&t.displayfreq==n||(r(t.persistcookie,"yes",-1),r(t.persistcookie+"_duration","",-1)),"always"!=t.displayfreq&&s(t.persistcookie)||("random"==t.fxclass&&(t.randomizefxclass=!0),"ajax"==(this.settings=t).contentsource[0]?this.ajaxrequest(t.contentsource[1]):"id"==t.contentsource[0]?(this.$contentref=o("#"+t.contentsource[1]).appendTo(document.body),this.setup(this.$contentref)):"inline"==t.contentsource[0]&&(this.$contentref=o(t.contentsource[1]).appendTo(document.body),this.setup(this.$contentref)),setTimeout(function(){o(document).on("mouseleave.registerexit",function(e){a.detectexit(e)}),o(document).on("mouseenter.registerenter",function(e){a.detectenter(e)})},t.delayregister),0<t.mobileshowafter&&o(document).one("touchstart",function(){setTimeout(function(){a.showpopup()},t.mobileshowafter)}))}};return a}(jQuery);jQuery(document).ready(function(){"undefined"!=typeof evo_ddexitpop_config&&(ddexitpop.init({contentsource:["id","evo_container__"+evo_ddexitpop_config.container_code],fxclass:evo_ddexitpop_config.animation,hideaftershow:evo_ddexitpop_config.show_repeat,displayfreq:evo_ddexitpop_config.show_frequency}),jQuery(".ddexitpop button.close").click(function(){ddexitpop.hidepopup()}))});