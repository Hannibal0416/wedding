$.fn.left = function() {
	return this.offset().left;
}

$.fn.right = function() {
	return this.offset().left + this.width();
}


var isSubmited = false;

var components = {
		section1 : {
			svg_path1: null,
			svg_date1 : null
		},
		section2 : {
			bridegroom: null,
			bride: null
		}
}

var params = {
    "name": null,
    "email": null,
    "friendBelongs": null,
    "phone": null,
    "address": null,
    "church": null,
    "weddingDinner": null,
    "numberOfParticipants": null,
    "childSeats": null,
    "ip":null,
    "time": new Date().toLocaleString()
  };
var sname = null;

var animeInput = {
	targets : 'h1,h2,h3,label,input',
	translateY : '5px',
	easing: 'easeInOutQuart',
	opacity: {
	      value: [0, 1],
	      duration: 500
	},
	duration : 500,
	loop : false
};

var images = new Array()
function preload() {
	for (i = 0; i < preload.arguments.length; i++) {
		images[i] = new Image()
		images[i].src = preload.arguments[i]
	}
}
preload(
	"img/annie.png",
	"img/hannibal.png",
	"img/church.png",
	"img/dinner.png",
	"img/car-down.png",
	"img/car-left.png",
	"img/car-right.png",
	"img/car-up.png",
	"img/walk-down.png",
	"img/walk-left.png",
	"img/walk-right.png",
	"img/walk-up.png"
)

function getIP(json) {
	params.ip = json.ip;
}

$(document).ready( function() {
	
// 		$('input, textarea').blur(function(event) {
// 		    $('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=0.5');
// 		});
	$('label[validate]').each(function(){
		$(this).hide();
	});
	$('#title').hide();
	
	var bridegroomX = $('#ring').left() - $('#bridegroom').right();
	var brideX =  $('#ring').right() - $('#bride').left();
	
	
	
	components.section2.bridegroom = anime({
		targets : document.getElementById('bridegroom'),
		translateX : [ {
			value : 0,
			duration : 0
		}, {
			value : bridegroomX,
			duration : 2000
		} ],
// 			translateX : '250',
		easing: 'easeInOutQuart',
// 			rotate : '1turn',
//			backgroundColor: '#FFF',
		duration : 3000,
		loop : false
	});
	
	
//	var morphing = anime({
//		  targets: '#leg1',
//		  path: [
//		    { value: '70 41 118.574 59.369 111.145 132.631 60.855 84.631 20.426 60.369' },
//		    { value: '70 6 119.574 60.369 100.145 117.631 39.855 117.631 55.426 68.369' }
//		    
//		  ],
//		  easing: 'easeOutQuad',
//		  duration: 2000,
//		  rotate : '0.5turn',
//		  loop: true
//		});
			
	components.section2.bride = anime({
		targets : document.getElementById('bride'),
//				translateX : [ {
//					value : brideOri,
//					duration : 0
//				}, {
//					value : brideX,
//					duration : 3000
//				} ],
		complete: function(anim) {
// 			completedLogEl.value = 'completed : ' + anim.completed;
			$('#ring').show();
		},
// 			rotate : '1turn'    ,
//		  	backgroundColor: '#FFF',
//	 		translateX: 250,
// 			scale: 2,
		translateX : brideX,
	    easing: 'easeInOutQuart',
		duration : 3000,
		loop : false
	});
	components.section1.svg_path1 = anime({
		  targets: '#path_title',
		  strokeDashoffset: [anime.setDashoffset, 0],
		  easing: 'easeInOutSine',
		  duration: 5000,
		  delay: function(el, i) { return i * 1000 },
		  direction: 'alternate',
		  loop: false
	});
	components.section1.svg_date1 = anime({
		  targets: '#path_date',
		  strokeDashoffset: [anime.setDashoffset, 0],
		  easing: 'easeInOutSine',
		  duration: 5000,
		  delay: function(el, i) { return i * 1000 },
		  direction: 'alternate',
		  loop: false
	});
	
	var loadingInput = document.querySelector('#text-out');
	var domAttributes = anime({
		  targets: '#text-out',
		  value: '100%',
		  round: 1,
		  duration: 6000,
		  update: function(anim) {
			  loadingInput.innerHTML =  Math.round(anim.progress) + '%';
			},
		  complete: function(anim) {
			  anime({
				  targets: '#loading-svg',
				  round: 1,
				  duration: 2000,
				  update: function(anim) {
					  $("#loading-svg").css("-webkit-transform","scale("+Math.round(anim.progress)+")");
					  $("#loading").css("opacity", (100 - Math.round(anim.progress)) / 100);
				  },
				  complete: function(anim) {
					$('#loading').remove();
					$('#title').show();
				    components.section1.svg_date1.restart();
				    components.section1.svg_path1.restart();
				    
				  }
				});
		  }
		});
	var morphing = anime({
		  targets: '#loading-svg .polymorph',
		  points: [
		    { value: '70 41 118.574 59.369 111.145 132.631 60.855 84.631 20.426 60.369' },
		    { value: '70 6 119.574 60.369 100.145 117.631 39.855 117.631 55.426 68.369' },
		    { value: '70 57 136.574 54.369 89.145 100.631 28.855 132.631 38.426 64.369' },
		    { value: '70 24 119.574 60.369 100.145 117.631 50.855 101.631 3.426 54.369' }
		  ],
		  easing: 'easeOutQuad',
		  duration: 2000,
		  loop: true
		});
// 		var mq = window.matchMedia( "(min-device-width: 320px) and (max-device-width: 736px)" );

			
	$('input:radio[name="friend-belongs"]').change(function(){
        if ($(this).is(':checked') && $(this).val() == 'hannibal') {
            $('#hannibal').css("background-image", "url('img/hannibal.png')");
            $('#annie').css("background-image", "url('img/annie_.png')");
        } else if ($(this).is(':checked') && $(this).val() == 'annie') {
        	$('#hannibal').css("background-image", "url('img/hannibal_.png')");
        	$('#annie').css("background-image", "url('img/annie.png')");
        } 
    });

    $('#name').blur(function(){
    	sname = $(this).val();
	    if (sname.length == 3) {
	    	sname = sname.substring(1,sname.length);			    
	    } else if (name.length >= 3) {
	    	sname = sname.substring(2,sname.length);
		}
	    $('span[specific-name]').each(function(){
			this.innerHTML=sname;
		});
	});
    

	$('#thanks').hide();
	$('#postInfo').show();

	$('input[type=text],input[type=tel]').blur(function(){
		if(isSubmited) {
			validate();
		}
	});
	
	$('input[type=radio]').change(function(){
		if(isSubmited) {
			validate();
		}
	});
	
	$('#dinner-map').click(function(){
		$.fancybox.open({
			src : 'dinnermap.html',
			type : 'iframe',
			title : '晚宴地圖資訊'
		},{
			padding: 0,
			openEffect : 'elastic',
			openSpeed  : 150,
			hideOnOverlayClick: false,
			closeEffect : 'elastic',
			closeSpeed  : 150,
			closeClick : true,
			helpers : {
				overlay : null
			}
		});
	});
	$('#church-map').click(function(){
		$.fancybox.open({
			src : 'churchmap.html',
			type : 'iframe',
			title : '教會地圖資訊'
		},{
			padding: 0,
			openEffect : 'elastic',
			openSpeed  : 150,
			closeEffect : 'elastic',
			closeSpeed  : 150,
			closeClick : true,
			helpers : {
				overlay : null
			}
		});
	});
	
});
var isScale = false;
$(document).ready( function() {
	var a = $('#fullpage').fullpage({
//				scrollingSpeed: 700,
// 			autoScrolling: false,
// 			resetSliders: false,
//				fadingEffect: true,
// 				scrollOverflowReset: false,
// 			scrollBar: true,
		verticalCentered: true,
		navigation: false,
		menu: '#menu',
		navigationPosition: 'right',
		navigationTooltips: ['一', '二', '三','四','五','六','七'],
		onLeave: function(index, nextIndex, direction){
			$('h1,h2,h3,label,input,#section4 img ').css("opacity","0");
		},
		afterLoad : function(anchorLink, index) {

			switch (index) {
			case 1:
				if ( components.section1.svg_path1 != null ) {
					components.section1.svg_path1.restart();
					components.section1.svg_date1.restart();
				}
				break;
			case 2:
				$('#ring').hide();
				animeInput.targets = '#section2 h1,#section2 h2';
				var a=anime(animeInput);
				animeInput.targets = 'h1,h2';
				var a=anime(animeInput);
				components.section2.bride.restart();
				components.section2.bridegroom.restart();
				break;
			case 3:
				animeInput.targets = '#section3 h1,#section3 input, #section3 label';
				anime(animeInput);
				break;
			case 4:
				animeInput.targets = '#section4 h1,#section4 h2,#section4 input, #section4 label, #section4 img';
				anime(animeInput);
				break;
			case 5:
				animeInput.targets = '#section5 h1,#section5 h2,#section5 input';
				anime(animeInput);
				params.church = $('input[name=church]:checked').val();
				params.weddingDinner = $('input[name=wedding-dinner]:checked').val();
				if (preIndex == 4) {
					if(params.weddingDinner == "false" && params.church == "false" ) {
						$.fn.fullpage.moveTo(7);
					} 
				}
				break;
			case 6:
				animeInput.targets = '#section6 h1,#section6 label,#section6 input';
				anime(animeInput);
				if (preIndex == 5) {
					if(params.weddingDinner == "false") {
						$.fn.fullpage.moveTo(7);
					}
				}
				break;
			case 7:
				animeInput.targets = '#section7 h1,#section7 textarea,#section7 button';
				anime(animeInput);
				break;	
			}
			preIndex = index;
		}
	});
});

function validate() {
	var isPassed = true;
	var moveTo = 7;
	params.name = $('#name').val();
	params.phone = $('#phone').val();
	params.friendBelongs=$('input[name=friend-belongs]:checked').val();
	params.address = $('#address').val();
	params.church = $('input[name=church]:checked').val();
	params.weddingDinner = $('input[name=wedding-dinner]:checked').val();
	params.numberOfParticipants = $('input[name=number-of-participants]:checked').val();
	params.childSeats = $('input[name=child-seats]:checked').val();
	params.comments = $('#comments').val();
	
	if(params.weddingDinner == undefined) {
		moveTo = 4;
		$('#wedding-dinner-validator').show();
		isPassed = false;
	} else {
		$('#wedding-dinner-validator').hide();
	}
	if(params.church == undefined) {
		moveTo = 4;
		$('#church-validator').show();
		isPassed = false;
	} else {
		$('#church-validator').hide();
	}
	if(params.name == '') {
		moveTo = 3;
		$('#name').addClass("has-error");
		isPassed = false;
	} else {
		if($('#name').hasClass("has-error")){
			$('#name').removeClass("has-error");
		}
	}
	if(params.friendBelongs == undefined) {
		moveTo = 3;
		$('#friend-belongs-validator').show();
		isPassed = false;
	} else {
		$('#friend-belongs-validator').hide();
	}
	if( !isPassed ) {
		$.fn.fullpage.moveTo(moveTo);
		return isPassed;
	} else {
		if(params.church == "true" || params.weddingDinner == "true") {
			var isPassed2 = true;
			if(params.weddingDinner == "true") {
				if(params.childSeats == undefined) {
					moveTo = 6;
					$('#child-seats-validator').show();
					isPassed2 = false;
				} else {
					$('#child-seats-validator').hide();
				}
				if(params.numberOfParticipants == undefined) {
					moveTo = 6;
					$('#number-of-participants-validator').show();
					isPassed2 = false;
				} else {
					$('#number-of-participants-validator').hide();
				}
			} else {
				$('#child-seats-validator').hide();
				$('#number-of-participants-validator').hide();
			}
			if(params.phone == '') {
				moveTo = 5;
				$('#phone').addClass("has-error");
				isPassed2 = false;
			} else {
				if($('#phone').hasClass("has-error")){
					$('#phone').removeClass("has-error");
				}
			}
			if(params.address == '') {
				moveTo = 5;
				$('#address').addClass("has-error");
				isPassed2 = false;
			} else {
				if($('#address').hasClass("has-error")){
					$('#address').removeClass("has-error");
				}
			}
			if(!isPassed2) {
				$.fn.fullpage.moveTo(moveTo);
				return isPassed2;
			} 
		} else {
			if($('#address').hasClass("has-error")){
				$('#address').removeClass("has-error");
			}
			if($('#phone').hasClass("has-error")){
				$('#phone').removeClass("has-error");
			}
			$('#child-seats-validator').hide();
			$('#number-of-participants-validator').hide();
		}
	}
	return true;
}

function submitTo(){
	isSubmited = true;
	console.log(params);
	if (validate()) {
		$('#submitTo').button('loading');
		$.ajax({
		  	data : params,
		  	dataType: 'json',
		  	method : 'GET',
		  	url:'https://script.google.com/macros/s/AKfycbyo3xu8-NLPOJQQKQTp36RmyGOMdAzm0KXXfrxTN1Z6lXHndiWh/exec',
		  	success : function(data, textStatus, jqXHR ) {
		  		if(data == true || data == "true"){
					  show();
				} else {
					alert('an error has occured');
					$('#submitTo').button('reset');
				}
			},
			error : function(jqXHR,textStatus,errorThrown){
				show();
			}
		});
	}
}

function show() {
	var mq = window.matchMedia( "(min-device-width: 320px) and (max-device-width: 400px)" );
	var mq2 = window.matchMedia( "(min-device-width: 400px) and (max-device-width: 736px)" );
	
	if(mq.matches) {
		$('#born_canvas').attr('style','margin-left: -'+ ($(document).width()/2)+'px');
	}
	if(mq2.matches) {
		$('#born_canvas').attr('style','margin-left: -'+ ($(document).width()/3)+'px');
	}
	if(params.weddingDinner == "true" || params.church == 'true') {
		arr_Msg =  sname + '我們八月十九日見！感謝您！';
	} else {
		arr_Msg =  sname + '您的資料我們收到了！感謝您！';
	}
	
	$('#submitTo').button('reset');
	$('#thanks').show();
	$('#postInfo').hide();
	init();
	setHighNumCircles();
	setGravity();
	setFade();
}

