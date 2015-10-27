/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, maxerr:50 */
/*global jQuery, WorkPage, console, define, window, document, _gaq*/

define([
	'underscore',
	'jquery'
], function (
	_,
	$
){
    'use strict';

    //defaults for use throughout the footer
    var _defaults = {
        'actions' : {
            'addFavorite': 'Favorites.addFavorite',
            'removeFavorite': 'Favorites.removeFavorite'
        },
        'selectors':{
            'imageTemplate': '#imageTemplate',
            'videoTemplate': '#videoTemplate',
            'unviewedImages': '.image.unviewed'
        },
        'allImagesAppended': false,
        'allImagesAnimated': false,
        'lazyLoadCount': 24,
        'imageLoadIndex': 0
    };

    var Oliver = function(){};

    /**
     * init
     * @return {[type]} [description]
     */
    Oliver.prototype.init = function(customOptions){
        // deep extend defaults
        this.options = $.extend(true, {}, _defaults, customOptions);

        this.cacheElements();
        this.getData();
        this.render();
        this.addListeners();
	};

    //cache variable that are used often through this js
    Oliver.prototype.cacheElements = function() {
        this.templates = {
            image: _.template($(this.options.selectors.imageTemplate).html()),
            video: _.template($(this.options.selectors.videoTemplate).html())
        };
        this.$window = $(window);
        this.$document = $(document);
    };

    Oliver.prototype.render = function() {
        this.appendImages();
        this.animateImages();
    };

    //append next set of images and 
	Oliver.prototype.appendImages = function() {
        var html = "",
            maxIndex = this.options.lazyLoadCount + this.options.imageLoadIndex;

        //load two less items on initial load because logo takes up two content spots
        if(this.options.imageLoadIndex <= 0){
            maxIndex -= 2;
        }

        //check if the end of the feed
        if(maxIndex >= (this.data.feeds.length)){
            maxIndex = (this.data.feeds.length);
            this.options.allImagesAppended = true;
        }

        // generate html for the next set of images
        for(this.options.imageLoadIndex; this.options.imageLoadIndex<maxIndex; this.options.imageLoadIndex++){

            this.data.feeds[this.options.imageLoadIndex].modalId = 'modal' + this.options.imageLoadIndex;
            html += this.templates[this.data.feeds[this.options.imageLoadIndex].type](this.data.feeds[this.options.imageLoadIndex]);
        }

        $('.body-container').append(html);
	};

    // get oliver's feeds from local json
	Oliver.prototype.getData = function() {
		this.data = $.parseJSON($('#oliverData').html());
	};

    // add scroll listeners to:
    //  1. animate images when they are in view
    //  2. render more images in view
    Oliver.prototype.addListeners = function() {
        var that = this;

        //namespace functions
        this.animateScroll = function(){ that.animateImages(); };
        this.lazyLoadScroll = function(){ that.lazyLoad(); };
        
        this.$window.scroll(this.animateScroll);
        this.$window.scroll(this.lazyLoadScroll);
    };

    //remove scroll listeners
    Oliver.prototype.removeListeners = function() {
        this.$window.off('scroll', this.animateScroll);
        this.$window.off('scroll', this.lazyLoadScroll);
    };

    //if scroll to bottom of screen, load next images
    Oliver.prototype.lazyLoad = function(){
        if(this.$window.scrollTop() + this.$window.height() === this.$document.height()){
            this.appendImages();
        }
    };

    // animate any images that have not been animated yet
    // if all images are appened and loaded, then remove listeners
    Oliver.prototype.animateImages = function() {
        var that = this,
            $unviewedImages = $(this.options.selectors.unviewedImages);

        if($unviewedImages.length > 0){
            $.each($unviewedImages, function(index, image){
                var $target = $(image);
                if( that.inView($target.parent()) ){
                    //mark image and viewed
                    $target.removeClass('unviewed');
                    //randomize loading direction
                    var directions = {
                            0: 'left',
                            1: 'right',
                            2: 'up',
                            3: 'down'
                        },
                        dir = directions[(Math.floor(Math.random() * 4))],
                        timer = Math.random() * 1000; //randomize loading time within 1 second
                    window.setTimeout(function() {
                        that.animate($target, dir);
                    }, timer);
                }
            });
        }
        else{
            if(this.options.allImagesAppended){
                this.options.allImagesAnimated = true;
                this.removeListeners();
            }
        }
    };

    //animate image into view based on direction
    Oliver.prototype.animate = function($target, dir){
        switch(dir){
            case 'up':
                $target.css({'margin-top':'100%'});
                $target.show();
                $target.animate({'margin-top':'0%'});
                break;
            case 'down':
                $target.css({'margin-top':'-100%'});
                $target.show();
                $target.animate({'margin-top':'0%'});
                break;
            case 'left':
                $target.css({'margin-left':'-100%'});
                $target.show();
                $target.animate({'margin-left':'0%'});
                break;
            case 'right':
                $target.css({'margin-left':'100%'});
                $target.show();
                $target.animate({'margin-left':'0%'});
                break;
        }
    };

    //check if element is in view
    Oliver.prototype.inView = function($el){
        var docViewTop = this.$window.scrollTop();
        var docViewBottom = docViewTop + this.$window.height();

        var elTop = $el.offset().top;
        var elBottom = elTop + $el.height();

        return ( (elTop <= docViewBottom) && (elBottom >= docViewTop) );
    };

    // TODO: import video handling code from main.js
    Oliver.prototype.videoHandler = function(){
        // this.videoHover = function(){
        //     var video = $(this).siblings('video')[0];
        // }    

        // $('.content').hover(function(){
        //     var video = $(this).siblings('video')[0];
        //     if(video != undefined){
        //         $(this).siblings('video')[0].play();
        //     }
        // },function(){
        //     var video = $(this).siblings('video')[0];
        //     if(video != undefined){
        //         $(this).siblings('video')[0].pause();
        //     }
        // });
    };

	return new Oliver();
});
