/*=========================================
 * animatedModal.js: Version 1.0
 * author: João Pereira
 * website: http://www.joaopereira.pt
 * email: joaopereirawd@gmail.com
 * Licensed MIT
=========================================*/

(function ($) {

    $.fn.animatedModal = function(options) {
        var modal = $(this),
            currentContext = this;

        //Defaults
        var settings = $.extend({
            modalTarget:'animatedModal',
            position:'fixed',
            width:'100%',
            height:'100%',
            top:'0px',
            left:'0px',
            zIndexIn: '9999',
            zIndexOut: '-9999',
            color: '#39BEB9',
            opacityIn:'1',
            opacityOut:'0',
            animatedIn:'zoomIn',
            animatedOut:'zoomOut',
            animationDuration:'.6s',
            overflow:'auto',
            // Callbacks
            beforeOpen: function() {},
            afterOpen: function() {},
            beforeClose: function() {},
            afterClose: function() {}

        }, options);

        var closeBt = $('.close-'+settings.modalTarget);

        ['beforeOpen', 'afterOpen', 'beforeClose', 'afterClose'].forEach(function(key) {
          if (key in settings) {
            settings[key] = settings[key].bind(this);
          }
        }, this);

        var href = $(modal).attr('href'),
            id = $('body').find('#'+settings.modalTarget),
            idConc = '#'+id.attr('id');

            // Default Classes
            id.addClass('animated');
            id.addClass(settings.modalTarget+'-off');

        //Init styles
        var initStyles = {
            'position':settings.position,
            'width':settings.width,
            'height':settings.height,
            'top':settings.top,
            'left':settings.left,
            'background-color':settings.color,
            'overflow-y':settings.overflow,
            'z-index':settings.zIndexOut,
            'opacity':settings.opacityOut,
            '-webkit-animation-duration':settings.animationDuration
        };
        //Apply stles
        id.css(initStyles);

        modal.click(function(event) {
            event.preventDefault();
            $('body, html').css({'overflow':'hidden'});
            if (href == idConc) {
                if (id.hasClass(settings.modalTarget+'-off')) {
                    id.removeClass(settings.animatedOut);
                    id.removeClass(settings.modalTarget+'-off');
                    id.addClass(settings.modalTarget+'-on');
                }

                 if (id.hasClass(settings.modalTarget+'-on')) {
                    settings.beforeOpen(id);
                    id.css({'opacity':settings.opacityIn,'z-index':settings.zIndexIn});
                    id.addClass(settings.animatedIn);
                    id.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', afterOpen);
                };
            }
        });



        closeBt.click(function(event) {
            event.preventDefault();
            $('body, html').css({'overflow':'auto'});

            settings.beforeClose(id); //beforeClose
            if (id.hasClass(settings.modalTarget+'-on')) {
                id.removeClass(settings.modalTarget+'-on');
                id.addClass(settings.modalTarget+'-off');
            }

            if (id.hasClass(settings.modalTarget+'-off')) {
                id.removeClass(settings.animatedIn);
                id.addClass(settings.animatedOut);
                id.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', afterClose);
            };

        });

        function afterClose () {
            id.css({'z-index':settings.zIndexOut});
            settings.afterClose(id); //afterClose
        }

        function afterOpen () {
            settings.afterOpen(id); //afterOpen
        }

    }; // End animatedModal.js

}(jQuery));




