var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

dojo.ready(function() {
	var btnPlay = dojo.byId("btn-play");

	// If at /en/index, redirect to /en/home. This is a failsafe for something that should never happen.
	if ( mq.user.isReturning() && window.location.pathname.match(/\/en\/index.*/) ) {
		window.location = heap.urlmap.index;
		return;
	}
	
	// User is not logged in, initialize the login prompt
	if ( !mq.user.isLoggedIn() ) {
		mq.login.dialog.init("#btn-login");
	}

	/*
	 * Play button animation
	 */
	(function() {
		var sprite = dojo.query(".animation", btnPlay)[0],
			negHeight  = dojo.position(sprite).h * -1,
			delay  = 4000,
			fps    = 17,
			frame  = 1,
			intervalId;

		// Setup dynamic initial position
		sprite.style.backgroundPosition = "0 " + negHeight + "px";
		sprite.style.visibility         = "visible";

		function animate() {
			var currentPosition = frame * negHeight;

			// End of sprite reached. Que the next animation after a delay
			if ( currentPosition < negHeight * 31 ) {
				clearInterval(intervalId);
				negHeight = dojo.position(sprite).h * -1;
				frame = 1;

				sprite.style.backgroundPosition = "0 " + negHeight + "px";

				setTimeout(function() {
					intervalId = setInterval(animate, 1000 / fps);
				}, delay);

				return;
			}
			sprite.style.backgroundPosition = "0 " + currentPosition + "px";
			frame++;
		}

		intervalId = setInterval(animate, 1000 / fps);
	}());

	// resume carousel when user closes video player
	$('#monkeybox_content .mq_controls.close_monkeybox').addClass("thslide_resume");

	$('#lander-carousel').thslide({
		itemVisible: 1,
		itemOffset: 934,
	    infiniteScroll: 1
	});

	// not sure if this is necessary any more
//	mq_lightbox.onBeforeShow = function() {
//		dojo.byId("dlg-login").style.zIndex = 19;
//	};
//
//	mq_lightbox.onClose = function() {
//		dojo.byId("dlg-login").style.zIndex = 21;
//		dojo.byId("monkeybox_overlay").style.display = "block";
//	};
});


function launchTrailer()
{
    new videoPlayer();
}

var videoPlayer = function() {
    var that = this,
    videoFormat = mq.isMobile ? ".mp4" : ".flv";

    $('#btn-trailer').live('click', function() {
        that.videoURL = heap.urlmap.static + "/videos/new-mq-v16-small" + videoFormat;
        that.showVideo();
        return false;
    });
};


videoPlayer.prototype.showVideo = function() {
    var that = this;

    mq_lightbox.showBox({
        _class: 'videoFeature'
    });

    var flashvars = {
        videoURL: that.videoURL
    };
    var params = {
        bgcolor: '#000000',
        wmode: 'transparent',
        allowfullscreen: true
    };
    var attributes = {
        id: 'videoPlayer'
    };

    if (mq.isMobile) {
    	$( "#monkeybox_inner" ).append( '<video src="' + that.videoURL + '" width="640" height="480" controls></video>' );
    }
    else {
    	$('#monkeybox_inner').html('<div id="videoPlayer"><div class="scotchpanel noflash"><div class="inner"><div class="error_monkey"><h2 class="title grobold">' + heap.translate("need_flash_title") + '</h2>' + heap.translate("need_flash_body") + '</div></div></div></div>');
    	swfobject.embedSWF(heap.urlmap.static + "/swf/MQVideoPlayerLoader.swf", "videoPlayer", "640", "480", "10.0.0", "", flashvars, params, attributes);
    }
}


}
/*
     FILE ARCHIVED ON 09:04:48 Jan 23, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:28:12 May 06, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.801
  exclusion.robots: 0.11
  exclusion.robots.policy: 0.099
  cdx.remote: 0.071
  esindex: 0.011
  LoadShardBlock: 129.523 (3)
  PetaboxLoader3.datanode: 51.356 (4)
  PetaboxLoader3.resolve: 156.973 (2)
  load_resource: 104.769
*/