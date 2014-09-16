/********************************************************************
  Scroll
*********************************************************************/
function scroller(i){
		scroller_up(i,1000);
}
	
function scroller_up(i,y){
	y = y + (i - y)*.1;
	window.scroll(0,y);
	if (((i - y) <= .6)&&((i - y) >= -.6))
	{					
		y = i;
	}else{
		setTimeout("scroller_up("+i+","+y+")",1);
	}
}

function scroller_e(i){
	y = 1;
	kyoukai = i*.6;
	while(y <= kyoukai)
	{
		window.scroll(0,y);
		y = y + (y*.08);
    }
	while(y != i)
	{
		window.scroll(0,y);
		y = y + (i-y)*.08;
		if (((i - y) <= .6)&&((i - y) >= -.6))
		{					
			y = i;
		}		
	}
}


/********************************************************************
  Cross Fade
*********************************************************************/

new function(){
    function setRollOver2(){
        if(!document.images){return;}
        var imgs = document.images;
        var insert = [];
        for(var i=0;i<imgs.length;i++){
            var splitname = imgs[i].src.split('_rollout.');
            if((splitname[1])&&(imgs[i].parentNode.tagName=='A')){
                var rolloverImg = document.createElement('img');
                rolloverImg.src = splitname[0]+'_rollover.'+splitname[1];
                var alpha = 0;
                rolloverImg.currentAlpha = alpha;
                rolloverImg.style.opacity = alpha/100;
                rolloverImg.style.filter = 'alpha(opacity='+alpha+')';
                rolloverImg.style.position = 'absolute';

                addEvent(rolloverImg,'mouseover',function(){setFader(this,100);});
                addEvent(rolloverImg,'mouseout',function(){setFader(this,0);});

                insert[insert.length] = {position:imgs[i],element:rolloverImg};
            }
        }

        for(var i=0;i<insert.length;i++){
            var parent = insert[i].position.parentNode;
            parent.insertBefore(insert[i].element,insert[i].position);
        }
    }

    function setFader(targetObj,targetAlpha){
        targetObj.targetAlpha = targetAlpha;
        if(targetObj.currentAlpha==undefined){
            targetObj.currentAlpha = 100;
        }
        if(targetObj.currentAlpha==targetObj.targetAlpha){
            return;
        }
        if(!targetObj.fading){
            if(!targetObj.fader){
                targetObj.fader = fader;
            }
            targetObj.fading = true;
            targetObj.fader();
        }
    }

    function fader(){
        this.currentAlpha += (this.targetAlpha - this.currentAlpha)*0.2;
        if(Math.abs(this.currentAlpha-this.targetAlpha)<1){
            this.currentAlpha = this.targetAlpha;
            this.fading = false;
        }
        var alpha = parseInt(this.currentAlpha);
        this.style.opacity = alpha/100;
        this.style.filter = 'alpha(opacity='+alpha+')';
        if(this.fading){
            var scope = this;
            setTimeout(function(){fader.apply(scope)},30);
        }
    }

    function addEvent(eventTarget, eventName, func){
        if(eventTarget.addEventListener){

            eventTarget.addEventListener(eventName, func, false);
        }else if(window.attachEvent){

            eventTarget.attachEvent('on'+eventName, function(){func.apply(eventTarget);});
        }
    }

    addEvent(window,'load',setRollOver2);

}


/********************************************************************
  entry bar
*********************************************************************/
$(document).ready(function(){

    $(".entry").hide();
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.entry').slideDown("fast");
            } else {
                $('.entry').slideUp("fast");
            }
        });

	$(window).bind("scroll", function() {

		scrollHeight = $(document).height(); 
		scrollPosition = $(window).height() + $(window).scrollTop(); 
		footHeight = $("footer").innerHeight();
				
		if ( scrollHeight - scrollPosition  <= footHeight ) {
			
			$(".entry").css({
				"position":"absolute",
				"bottom": footHeight
			});
		
		} else {
		
			$(".entry").css({
				"position":"fixed",
				"bottom": "0px"
			});
		}
	});
	});


});

/********************************************************************
 Top hand move
*********************************************************************/
$(document).ready(function() { 
	setTimeout("animation()", 500);
});
		
	function animation(){
		handmove();
	}
		
	function handmove(){
		$("#hand").animate({left:"+=190px"},2000).animate({left:"-=190px"}, 2000);
		setTimeout("handmove()",2000);
	}

/********************************************************************
bg scroll
*********************************************************************/
 (function() {
        $(window).scroll(function(){
            var y = $(this).scrollTop();
            $('#Sp').css('background-position', '0 ' + parseInt( y / 10 ) + 'px');
            $('#Spup').css('background-position', '0 ' + parseInt( -y / 5 ) + 'px');
        });
    })();
$(function() {
    var bgsc1 = 0;
    var bgsc2 = 0;
setInterval(function(){
    bgsc1+= -0.5;
    bgsc2+= +0.5;
    $("#Payup").css("background-position", bgsc1 + "px ");
	$("#Pay").css("background-position", bgsc2 + "px ");
});
});