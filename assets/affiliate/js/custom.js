
(function() {
    "use strict";

    // custom scrollbar

//    $("html").niceScroll({styler:"fb",cursorcolor:"#EE5826", cursorwidth: '6', cursorborderradius: '0px', background: '#22252A', spacebarenabled:false, cursorborder: '0',  zindex: '1000'});

//    $(".side-content").niceScroll({styler:"fb",cursorcolor:"#EE5826", cursorwidth: '3', cursorborderradius: '0px', background: '#22252A', spacebarenabled:false, cursorborder: '0'});


//    $(".side-content").getNiceScroll();
    if ($('body').hasClass('side-content-collapsed')) {
//        $(".side-content").getNiceScroll().hide();
    }



    // Toggle Left Menu
   jQuery('.menu-list > a').click(function() {
      
      var parent = jQuery(this).parent();
      var sub = parent.find('> ul');
      
      if(!jQuery('body').hasClass('side-content-collapsed')) {
         if(sub.is(':visible')) {
            sub.slideUp(200, function(){
               parent.removeClass('nav-active');
               jQuery('.main-content').css({height: ''});
               mainContentHeightAdjust();
            });
         } else {
            visibleSubMenuClose();
            parent.addClass('nav-active');
            sub.slideDown(200, function(){
                mainContentHeightAdjust();
            });
         }
      }
      return false;
   });

   function visibleSubMenuClose() {
      jQuery('.menu-list').each(function() {
         var t = jQuery(this);
         if(t.hasClass('nav-active')) {
            t.find('> ul').slideUp(200, function(){
               t.removeClass('nav-active');
            });
         }
      });
   }

   function mainContentHeightAdjust() {
      // Adjust main content height
      var docHeight = jQuery(document).height();
      if(docHeight > jQuery('.main-content').height())
         jQuery('.main-content').height(docHeight);
   }

   //  class add mouse hover
   jQuery('.custom-nav > li').hover(function(){
      jQuery(this).addClass('nav-hover');
   }, function(){
      jQuery(this).removeClass('nav-hover');
   });


   // Menu Toggle
   jQuery('.toggle-btn').click(function(){
//       $(".side-content").getNiceScroll().hide();
       
       if ($('body').hasClass('side-content-collapsed')) {
//           $(".side-content").getNiceScroll().hide();
       }
      var body = jQuery('body');
      var bodyposition = body.css('position');

      if(bodyposition != 'relative') {

         if(!body.hasClass('side-content-collapsed')) {
            body.addClass('side-content-collapsed');
            jQuery('.custom-nav ul').attr('style','');

            jQuery(this).addClass('menu-collapsed');

         } else {
            body.removeClass('side-content-collapsed');
            jQuery('.custom-nav li.active ul').css({display: 'block'});

            jQuery(this).removeClass('menu-collapsed');

         }
      } else {

         if(body.hasClass('side-content-show'))
            body.removeClass('side-content-show');
         else
            body.addClass('side-content-show');

         mainContentHeightAdjust();
      }

   });
   
   jQuery(window).resize(function(){

      if(jQuery('body').css('position') == 'relative') {

         jQuery('body').removeClass('side-content-collapsed');

      } else {

         jQuery('body').css({left: '', marginRight: ''});
      }

   });

})(jQuery);