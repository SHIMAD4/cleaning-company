const inputMasked = false; //true РµСЃР»Рё РїРѕРЅР°РґРѕР±РёС‚СЊСЃСЏ РІРµСЂРЅСѓС‚СЊ РјР°СЃРєСѓ
var phone_format = 'one';

$(document).ready(function() {
	timer();
	var prefix = $('.prefix').val();
	var url = "send.php";
// 	phone_format = //$('.phone_format').val();
	var mobile = navigator.userAgent.toLowerCase().match(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i);
	if(mobile != null) {
		// $('html').css('width', window.innerWidth + 'px');
	} else {
		$(".scroll").each(function() {
			var block = $(this);
			$(window).scroll(function() {
				var top = block.offset().top;
				var bottom = block.height()+top;
				top = top - $(window).height();
				var scroll_top = $(this).scrollTop();
				var block_center = block.offset().top + (block.height() / 2);
				var screen_center = scroll_top + ($(window).height() / 2);
				if(block.height() < $(window).height()) {
					if ((scroll_top > (top-(block.height()/2))) && ((scroll_top < bottom+(block.height()/2))) && (scroll_top + $(window).height() > (bottom-(block.height()/2))) && (scroll_top < (block.offset().top+(block.height()/2)))) {
						if (!block.hasClass("animated")) {
							block.addClass("animated");
						}
					} else {
						if((block.offset().top + block.height() < scroll_top) || (block.offset().top > (scroll_top + $(window).height()))) {
							block.removeClass("animated");
						}
					}
				} else {
					if ((scroll_top > top) && (scroll_top < bottom) && (Math.abs(screen_center - block_center) < (block.height() / 4))) {
						if (!block.hasClass("animated")) {
							block.addClass("animated");
						}
					} else {
						if((block.offset().top + block.height() < scroll_top) || (block.offset().top > (scroll_top + $(window).height()))) {
							block.removeClass("animated");
						}
					}
				}
			});
		});
	}

	$('.button').click(function() {
		$('body').find('form:not(this)').children('label').removeClass('red');
		var request_url = $('input[name="ref_url"]').val().toString().replace(/&/g, '<br>');
		if (request_url.trim() == "") request_url = "UTM РјРµС‚РѕРє РЅРµС‚";
		var answer = checkForm($(this).parent().get(0));
		if(answer != false)
		{
		    //fbq('track', 'Lead');
			var $form = $(this).parent();
			var name = $('input[name="name"]', $form).val();
			
			if(phone_format == 'one') {
				var phone = $('input[name="phone"]', $form).val();
			} else if(phone_format == 'three') {
				var phone = $('input[name="phone1"]', $form).val()+' '+$('input[name="phone2"]', $form).val()+' '+$('input[name="phone3"]', $form).val();
			}
			
			var email = $('input[name="email"]', $form).val();
			var ques = $('textarea[name="ques"]', $form).val();
			var time = $('input[name="time"]', $form).val();
			var sbt = $('.button', $form).attr("data-name");
			var submit = $('.button', $form).text();
			var ref = $('input[name="referer"]').val();
			var formname = $('input[name="formname"]').val();
			var sitename = $('.sitename').val();
			var emailsarr = $('.emailsarr').val();
			
			$.ajax({
				type: "POST",
				url: url,
				dataType: "post",
				data: "name="+name+"&phone="+phone+"&"+sbt+"="+submit+"&email="+email+"&ques="+ques+"&time="+time+"&formname="+formname+"&ref="+ref+"&utm="+request_url+"&sitename="+sitename+"&emailsarr="+emailsarr
			}).always(function() {
				thx();
				//ym(55177114, 'reachGoal', 'order');
				//РјРµС‚СЂРёРєРё
//				setTimeout(function(){ga('send', 'event', ''+sbt, ''+sbt);}, 30);
//				setTimeout(function(){yaCounterXXXXXXXXX.reachGoal(''+sbt);}, 30); // РјРµРЅСЏРµРј XXXXXXXXX РЅР° РЅРѕРјРµСЂ СЃС‡РµС‚С‡РёРєР°
			});
		}
	});

	/* Youtube fix */
	$("iframe").each(function() {
	    if ($(this).data('type') === 'youtube') {
    		var ifr_source=$(this).attr('src');
    		var wmode="wmode=transparent";
    		if(ifr_source.indexOf('?')!=-1) {
    			var getQString=ifr_source.split('?');
    			var oldString=getQString[1];
    			var newString=getQString[0];
    			$(this).attr('src',newString+'?'+wmode+'&'+oldString)
    		} else $(this).attr('src',ifr_source+'?'+wmode)
	    }
	});

	if(phone_format == 'three') {
		$('input[name="phone2"]').focus(function() {
			$(this).keydown(function(event){
				if(event.keyCode != 8) {
					if($(this).val().length >= 3 && event.keyCode != 8)
						$(this).parent().siblings().find('input[name="phone3"]').focus();
				}
			});
		});
		$('input[name="phone3"]').focus(function() {
			$(this).keydown(function(event){
				if(event.keyCode == 8 && $(this).val().length == 0) {
					$(this).parent().siblings().find('input[name="phone2"]').focus();
				}
			});
		});
	}

//      ----------------- Masked input phone --------------------

    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        
        var pos = this.selectionStart;
        
        if (pos < 3) event.preventDefault();
        
        var matrix = " (___) ___-__-__",
        i = 0,
    
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
    
        new_value = matrix.replace(/[_\d]/g, function(a) {
            return i < val.length? val.charAt(i++) || def.charAt(i): a
        });
    
        i = new_value.indexOf("_");
        
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
    
        var reg = matrix.substr(0, this.value.length).replace(/_+/g, function(a) {
            return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
        
        reg = new RegExp("^" + reg + "$");
        
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == 'blur' && this.value.length < 5) this.value = ""
    }

    if (inputMasked) {
		$('input[name=phone].masked').inputmask('+7 (999) 999-99-99');
	} /*else { //СЂР°СЃРєРѕРјРјРµРЅРёС‚СЊ РµСЃР»Рё РїРѕРЅР°РґРѕР±РёС‚СЊСЃСЏ РІРµСЂРЅСѓС‚СЊ РјР°СЃРєСѓ
		$('input[name=phone].masked').each(function () {
			this.addEventListener('input', mask, false);
            this.addEventListener('focus', mask, false);
            this.addEventListener('blur', mask, false);
            this.addEventListener('keydown', mask, false)
		});
	}*/ //СЂР°СЃРєРѕРјРјРµРЅРёС‚СЊ РµСЃР»Рё РїРѕРЅР°РґРѕР±РёС‚СЊСЃСЏ РІРµСЂРЅСѓС‚СЊ РјР°СЃРєСѓ

//      ---------------------------------------------------------

});

function timer() {
	var now = new Date();
	var newDate = new Date((now.getMonth()+1)+"/"+now.getDate()+"/"+now.getFullYear()+" 23:59:59"); //var newDate = new Date("Feb,29,2014 23:59:00");
	var totalRemains = (newDate.getTime()-now.getTime());
	if (totalRemains>1) {
		var Days = (parseInt(parseInt(totalRemains/1000)/(24*3600)));
		var Hours = (parseInt((parseInt(totalRemains/1000) - Days*24*3600)/3600));
		var Min = (parseInt(parseInt((parseInt(totalRemains/1000) - Days*24*3600) - Hours*3600)/60));
		var Sec = parseInt((parseInt(totalRemains/1000) - Days*24*3600) - Hours*3600) - Min*60;
		if (Days<10){Days="0"+Days}
		if (Hours<10){Hours="0"+Hours}
		if (Min<10){Min="0"+Min}
		if (Sec<10){Sec="0"+Sec}
		$(".day").each(function() { $(this).text(Days); });
		$(".hour").each(function() { $(this).text(Hours); });
		$(".min").each(function() { $(this).text(Min); });
		$(".sec").each(function() { $(this).text(Sec); });
		setTimeout(timer, 1000);
	}
}

function popup(id, form, h1, h2, btn) { 
 $('.popup_overlay').show();
 $('#'+id).addClass('activePopup');

 	var myScroll = $(window).scrollTop();
	new_scroll=myScroll;
//	$('.wrapper').addClass('fix-site');
//	$('.wrapper').css('top','-'+new_scroll+'px');
	$("html,body").animate({scrollTop: myScroll}, 0);	

 if(id == 'request') {
  var def_h1 = 'РћСЃС‚Р°РІРёС‚СЊ Р·Р°СЏРІРєСѓ';
  var def_h2 = 'Р—Р°РїРѕР»РЅРёС‚Рµ С„РѕСЂРјСѓ,<br>Рё&nbsp;РјС‹&nbsp;РѕР±СЏР·Р°С‚РµР»СЊРЅРѕ СЃРІСЏР¶РµРјСЃСЏ СЃ&nbsp;РІР°РјРё!';
  var def_btn = 'РћСЃС‚Р°РІРёС‚СЊ Р·Р°СЏРІРєСѓ';
 }
 if(h1 != '') {$('#'+id).find('.popup_h1').html(h1);} else {$('#'+id).find('.modal_title').html(def_h1);}
 if(h2 != '') {$('#'+id).find('.popup_h2').html(h2);} else {$('#'+id).find('.modal_text').html(def_h2);}
 if(btn != '') {$('#'+id).find('.button').html(btn);} else {$('#'+id).find('.button').html(def_btn);}
 $('.activePopup').show();
    m_top = -$('.activePopup').outerHeight() / 2 + 'px'
    m_left = -$('.activePopup').outerWidth() / 2 + 'px';
 $('.activePopup').css({ 
	 top: '50%',
	 left: '50%',
     'margin-top': m_top,
     'margin-left': m_left
 })

 $('.formname').attr("value", form);
}

function popup__service() { 
 $('.popup_overlay').show();
	$('.popup__service').addClass('activePopup');

 $('.activePopup').show();
 $('.activePopup').css({
  'top': '5%',
  'left': '50%',
  'bottom': '5%',
  'margin-top': '0',
  '-webkit-transform': 'translateX(-50%)',
  'transform': 'translateX(-50%)'
 })
}

function popup__document(id) { 
 $('.popup_overlay').show();
 $('#' + id).addClass('activePopup');

$('.activePopup').show();
 $('.activePopup').css({ 
	 left: '50%',
	 '-webkit-transform': 'translateX(-50%)',
     'transform': 'translateX(-50%)',
	 'top': 'calc(7vh + ' + pageYOffset +'px)'
      
 });
}

function popup_out() {
	$('.popup_overlay').hide();
	$('.popup').hide();
	$('.popup').removeClass('activePopup');
	$('body').find('label').removeClass('red');
}

function formname(name) { //onClick="formname('text');"
	$('.formname').attr("value", name);
}

function thx() {
	$('.popup').hide();
	$('.popup').removeClass('activePopup');
	popup('thx', '');
	if(phone_format == 'one') {
		$('input[type="text"]').each(function(){
			$(this).val('');
		});
	} else if(phone_format == 'three') {
		$('input[type="text"]:not(input[name="phone1"])').each(function(){
			$(this).val('');
		});
	}
	$('textarea').val('');
}

function checkForm(form1) {

	var $form = $(form1);
	var checker = true;
	var name = $("input[name='name']", $form).val();
	
	if(phone_format == 'one') {
		var phone = $("input[name='phone']", $form).val();
	} else if(phone_format == 'three') {
		var phone1 = $("input[name='phone1']", $form).val();
		var phone2 = $("input[name='phone2']", $form).val();
		var phone3 = $("input[name='phone3']", $form).val();
	}
	
	var email = $("input[name='email']", $form).val();

	if($form.find(".name").hasClass("required")) {
		if(!name) {
			$form.find(".name").addClass("red");
			checker = false;
		} else {
			$form.find(".name").removeClass('red');
		}
	}

	if(phone_format == 'one') {
		if($form.find(".phone").hasClass("required")) {
			if(!phone) {
				$form.find(".phone").addClass("red");
				checker = false;
			} else if(/[^0-9\+ ()\-]/.test(phone)) {
				$form.find(".phone").addClass("red");
				checker = false;
			} else {
				$form.find(".phone").removeClass("red");
			}
		}
	} else if(phone_format == 'three') {
		if($form.find(".phone").hasClass("required")) {
			if(!phone1) {
				$form.find(".phone").addClass("red");
				checker = false;
			} else if(/[^0-9+]/.test(phone1)) {
				$form.find(".phone").addClass("red");
				checker = false;
			} else {
				$form.find(".phone").removeClass("red");
			}

			if(!phone2) {
				$form.find(".phone").addClass("red");
				checker = false;
			} else if(/[^0-9]/.test(phone2)) {
				$form.find(".phone").addClass("red");
				checker = false;
			} else {
				$form.find(".phone").removeClass("red");
			}

			if(!phone3) {
				$form.find(".phone").addClass("red");
				checker = false;
			} else if(/[^0-9 -]/.test(phone3) || phone3.length < 4) {
				$form.find(".phone").addClass("red");
				checker = false;
			} else {
				$form.find(".phone").removeClass("red");
			}
		}
	}

	if($form.find(".email").hasClass("required")) {
		if(!email) {
			$form.find(".email").addClass("red");
			checker = false;
		} else if(!/^[\.A-z0-9_\-\+]+[@][A-z0-9_\-]+([.][A-z0-9_\-]+)+[A-z]{1,4}$/.test(email)) {
			$form.find(".email").addClass("red");
			checker = false;
		} else {
			$form.find(".email").removeClass("red");
		}
	}

	if(checker != true) { return false; }
}
function getQueryVariable()
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       var utm = {};
       console.log(vars)
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               utm[pair[0]] = pair[1];
               console.log(pair)
       }

       return(utm);
}