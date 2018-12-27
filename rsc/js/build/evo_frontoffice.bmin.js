/* This includes 9 files: src/evo_modal_window.js, src/evo_images.js, src/evo_user_crop.js, src/evo_user_report.js, src/evo_user_contact_groups.js, src/evo_rest_api.js, src/evo_item_flag.js, src/evo_links.js, ajax.js */

function openModalWindow(e,t,a,r,o,n){var s="overlay_page_active";void 0!==r&&1==r&&(s="overlay_page_active_transparent"),void 0===t&&(t="560px");var i="";void 0!==a&&(0<a||""!=a)&&(i=' style="height:'+a+'"'),0<jQuery("#overlay_page").length?jQuery("#overlay_page").html(e):(jQuery("body").append('<div id="screen_mask"></div><div id="overlay_wrap" style="width:'+t+'"><div id="overlay_layout"><div id="overlay_page"'+i+"></div></div></div>"),jQuery("#screen_mask").fadeTo(1,.5).fadeIn(200),jQuery("#overlay_page").html(e).addClass(s),jQuery(document).on("click","#close_button, #screen_mask, #overlay_page",function(e){if("overlay_page"!=jQuery(this).attr("id"))return closeModalWindow(),!1;var t=jQuery("#overlay_page form");if(t.length){var a=t.position().top+jQuery("#overlay_wrap").position().top,r=a+t.height();e.clientY>a&&e.clientY<r||closeModalWindow()}return!0}))}function closeModalWindow(e){return void 0===e&&(e=window.document),jQuery("#overlay_page",e).hide(),jQuery(".action_messages",e).remove(),jQuery("#server_messages",e).insertBefore(".first_payload_block"),jQuery("#overlay_wrap",e).remove(),jQuery("#screen_mask",e).remove(),!1}function user_crop_avatar(e,t,a){void 0===a&&(a="avatar");var r=750,o=320,n=jQuery(window).width(),s=jQuery(window).height(),i=s/n,_=10,l=10;_=o<(n=r<n?r:n<o?o:n)-2*_?10:0,l=o<(s=r<s?r:s<o?o:s)-2*l?10:0;var d=r<n?r:n,u=r<s?r:s;openModalWindow('<span id="spinner" class="loader_img loader_user_report absolute_center" title="'+evo_js_lang_loading+'"></span>',d+"px",u+"px",!0,evo_js_lang_crop_profile_pic,[evo_js_lang_crop,"btn-primary"],!0);var c=jQuery("div.modal-dialog div.modal-body").length?jQuery("div.modal-dialog div.modal-body"):jQuery("#overlay_page"),p=parseInt(c.css("paddingTop")),v=parseInt(c.css("paddingRight")),f=parseInt(c.css("paddingBottom")),j=parseInt(c.css("paddingLeft")),h=(jQuery("div.modal-dialog div.modal-body").length?parseInt(c.css("min-height")):u-100)-(p+f),y={user_ID:e,file_ID:t,aspect_ratio:i,content_width:d-(j+v),content_height:h,display_mode:"js",crumb_user:evo_js_crumb_user};return evo_js_is_backoffice?(y.ctrl="user",y.user_tab="crop",y.user_tab_from=a):(y.blog=evo_js_blog,y.disp="avatar",y.action="crop"),jQuery.ajax({type:"POST",url:evo_js_user_crop_ajax_url,data:y,success:function(e){openModalWindow(e,d+"px",u+"px",!0,evo_js_lang_crop_profile_pic,[evo_js_lang_crop,"btn-primary"])}}),!1}function user_report(e,t){openModalWindow('<span class="loader_img loader_user_report absolute_center" title="'+evo_js_lang_loading+'"></span>',"auto","",!0,evo_js_lang_report_user,[evo_js_lang_report_this_user_now,"btn-danger"],!0);var a={action:"get_user_report_form",user_ID:e,crumb_user:evo_js_crumb_user};return evo_js_is_backoffice?(a.is_backoffice=1,a.user_tab=t):a.blog=evo_js_blog,jQuery.ajax({type:"POST",url:evo_js_user_report_ajax_url,data:a,success:function(e){openModalWindow(e,"auto","",!0,evo_js_lang_report_user,[evo_js_lang_report_this_user_now,"btn-danger"])}}),!1}function user_contact_groups(e){return openModalWindow('<span class="loader_img loader_user_report absolute_center" title="'+evo_js_lang_loading+'"></span>',"auto","",!0,evo_js_lang_contact_groups,evo_js_lang_save,!0),jQuery.ajax({type:"POST",url:evo_js_user_contact_groups_ajax_url,data:{action:"get_user_contact_form",blog:evo_js_blog,user_ID:e,crumb_user:evo_js_crumb_user},success:function(e){openModalWindow(e,"auto","",!0,evo_js_lang_contact_groups,evo_js_lang_save)}}),!1}function evo_rest_api_request(url,params_func,func_method,method){var params=params_func,func=func_method;"function"==typeof params_func&&(func=params_func,params={},method=func_method),void 0===method&&(method="GET"),jQuery.ajax({contentType:"application/json; charset=utf-8",type:method,url:restapi_url+url,data:params}).then(function(data,textStatus,jqXHR){"object"==typeof jqXHR.responseJSON&&eval(func)(data,textStatus,jqXHR)})}function evo_rest_api_print_error(e,t,a){if("string"!=typeof t&&void 0===t.code&&(t=void 0===t.responseJSON?t.statusText:t.responseJSON),void 0===t.code)var r='<h4 class="text-danger">Unknown error: '+t+"</h4>";else{r='<h4 class="text-danger">'+t.message+"</h4>";a&&(r+="<div><b>Code:</b> "+t.code+"</div><div><b>Status:</b> "+t.data.status+"</div>")}evo_rest_api_end_loading(e,r)}function evo_rest_api_start_loading(e){jQuery(e).addClass("evo_rest_api_loading").append('<div class="evo_rest_api_loader">loading...</div>')}function evo_rest_api_end_loading(e,t){jQuery(e).removeClass("evo_rest_api_loading").html(t).find(".evo_rest_api_loader").remove()}function evo_link_fix_wrapper_height(){var e=jQuery("#attachments_fieldset_table").height();jQuery("#attachments_fieldset_wrapper").height()!=e&&jQuery("#attachments_fieldset_wrapper").height(jQuery("#attachments_fieldset_table").height())}function evo_link_change_position(a,e,t){var r=a,o=a.value,n=a.id.substr(17);return jQuery.get(e+"anon_async.php?action=set_object_link_position&link_ID="+n+"&link_position="+o+"&crumb_link="+t,{},function(e,t){"OK"==(e=ajax_debug_clear(e))?(evoFadeSuccess(jQuery(r).closest("tr")),jQuery(r).closest("td").removeClass("error"),"cover"==o&&jQuery("select[name=link_position][id!="+a.id+"] option[value=cover]:selected").each(function(){jQuery(this).parent().val("aftermore"),evoFadeSuccess(jQuery(this).closest("tr"))})):(jQuery(r).val(e),evoFadeFailure(jQuery(r).closest("tr")),jQuery(r.form).closest("td").addClass("error"))}),!1}function evo_link_insert_inline(e,t,a,r){if(null==r&&(r=0),"undefined"!=typeof b2evoCanvas){var o="["+e+":"+t;a.length&&(o+=":"+a),o+="]";var n=jQuery("#display_position_"+t);0!=n.length&&"inline"!=n.val()?(deferInlineReminder=!0,evo_rest_api_request("links/"+t+"/position/inline",function(e){n.val("inline"),evoFadeSuccess(n.closest("tr")),n.closest("td").removeClass("error"),textarea_wrap_selection(b2evoCanvas,o,"",r,window.document)},"POST"),deferInlineReminder=!1):textarea_wrap_selection(b2evoCanvas,o,"",r,window.document)}}function evo_link_delete(r,o,n,e){return evo_rest_api_request("links/"+n,{action:e},function(e){if("item"==o||"comment"==o||"emailcampaign"==o||"message"==o){var t=window.b2evoCanvas;if(null!=t){var a=new RegExp("\\[(image|file|inline|video|audio|thumbnail):"+n+":?[^\\]]*\\]","ig");textarea_str_replace(t,a,"",window.document)}}jQuery(r).closest("tr").remove(),evo_link_fix_wrapper_height()},"DELETE"),!1}function evo_link_change_order(_,e,l){return evo_rest_api_request("links/"+e+"/"+l,function(e){var t=jQuery(_).closest("tr"),a=t.find("span[data-order]");if("move_up"==l){var r=a.attr("data-order"),o=jQuery(t.prev()).find("span[data-order]"),n=o.attr("data-order");t.prev().before(t),a.attr("data-order",n),o.attr("data-order",r)}else{r=a.attr("data-order");var s=jQuery(t.next()).find("span[data-order]"),i=s.attr("data-order");t.next().after(t),a.attr("data-order",i),s.attr("data-order",r)}evoFadeSuccess(t)},"POST"),!1}function evo_link_attach(e,t,a,r){return evo_rest_api_request("links",{action:"attach",type:e,object_ID:t,root:a,path:r},function(e){var t=jQuery("#attachments_fieldset_table .results table",window.parent.document),a=(t.parent,jQuery(e.list_content));t.replaceWith(jQuery("table",a)).promise().done(function(e){setTimeout(function(){window.parent.evo_link_fix_wrapper_height()},10)})}),!1}function evo_link_ajax_loading_overlay(){var e=jQuery("#attachments_fieldset_table"),t=!1;return 0==e.find(".results_ajax_loading").length&&(t=jQuery('<div class="results_ajax_loading"><div>&nbsp;</div></div>'),e.css("position","relative"),t.css({width:e.width(),height:e.height()}),e.append(t)),t}function evo_link_refresh_list(e,t,a){var r=evo_link_ajax_loading_overlay();return r&&evo_rest_api_request("links",{action:void 0===a?"refresh":"sort",type:e.toLowerCase(),object_ID:t},function(e){jQuery("#attachments_fieldset_table").html(e.html),r.remove(),evo_link_fix_wrapper_height()}),!1}function evo_link_sort_list(){var a,o=jQuery("tr","tbody#filelist_tbody");o.sort(function(e,t){var a=parseInt(jQuery("span[data-order]",e).attr("data-order")),r=parseInt(jQuery("span[data-order]",t).attr("data-order"));return a||(a=o.length),r||(r=o.length),a<r?-1:r<a?1:0}),$.each(o,function(e,t){a=(0===e?jQuery(t).prependTo("tbody#filelist_tbody"):jQuery(t).insertAfter(a),t)})}function ajax_debug_clear(e){return e=(e=e.replace(/<!-- Ajax response end -->/,"")).replace(/(<div class="jslog">[\s\S]*)/i,""),jQuery.trim(e)}function ajax_response_is_correct(e){return!!e.match(/<!-- Ajax response end -->/)&&""!=(e=ajax_debug_clear(e))}jQuery(document).keyup(function(e){27==e.keyCode&&closeModalWindow()}),jQuery(document).ready(function(){jQuery("img.loadimg").each(function(){jQuery(this).prop("complete")?(jQuery(this).removeClass("loadimg"),""==jQuery(this).attr("class")&&jQuery(this).removeAttr("class")):jQuery(this).on("load",function(){jQuery(this).removeClass("loadimg"),""==jQuery(this).attr("class")&&jQuery(this).removeAttr("class")})})}),jQuery(document).on("click","a.evo_post_flag_btn",function(){var t=jQuery(this),e=parseInt(t.data("id"));return 0<e&&(t.data("status","inprogress"),jQuery("span",jQuery(this)).addClass("fa-x--hover"),evo_rest_api_request("collections/"+t.data("coll")+"/items/"+e+"/flag",function(e){e.flag?(t.find("span:first").show(),t.find("span:last").hide()):(t.find("span:last").show(),t.find("span:first").hide()),jQuery("span",t).removeClass("fa-x--hover"),setTimeout(function(){t.removeData("status")},500)},"PUT")),!1}),jQuery(document).on("mouseover","a.evo_post_flag_btn",function(){"inprogress"!=jQuery(this).data("status")&&jQuery("span",jQuery(this)).addClass("fa-x--hover")}),jQuery(document).ready(function(){if(0<jQuery("#attachments_fieldset_table").length){var e=jQuery("#attachments_fieldset_table").height();e=320<e?320:e<97?97:e,jQuery("#attachments_fieldset_wrapper").height(e),jQuery("#attachments_fieldset_wrapper").resizable({minHeight:80,handles:"s",resize:function(e,t){jQuery("#attachments_fieldset_wrapper").resizable("option","maxHeight",jQuery("#attachments_fieldset_table").height())}}),jQuery(document).on("click","#attachments_fieldset_wrapper .ui-resizable-handle",function(){var e=jQuery("#attachments_fieldset_table").height(),t=jQuery("#attachments_fieldset_wrapper").height()+80;jQuery("#attachments_fieldset_wrapper").css("height",e<t?e:t)})}});