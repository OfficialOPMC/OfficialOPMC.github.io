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

dojo.provide("UI.Util.Cookie");
dojo.require("dojo.cookie");


dojo.setObject("UI.Util.Cookie", {
	/**
	 * @param string name
	 * @param string value
	 * @param mixed expiry A date object, or the number of minutes. If null, a session cookie will be set. 
	 */
	set: function(name, value, expiry, path, domain) {
		dojo.cookie(name, dojo.toJson(value), dojo.mixin(
			(domain
				? {
					// Set all cookies to the root so that php can delete any cookie that js creates
					path:   path || "/",
					domain: domain
				}
				: {path: path || "/"}
			),
			// Only set the expiry if provided. This is how to do session cookies
			expiry ? {expires: expiry} : {}
		));
	},
	
	get: function(name) {
		var cookie = dojo.cookie(name);
		try {
			return dojo.fromJson(cookie);
		} catch (e) {
			return cookie;
		}
	},
	
	erase: function(name, path, domain) {
		this.set(name, null, -1, path, domain);
	},
	
	test: function() {
	    var name = (+new Date()) + "-cookie-test";
	    this.set(name, 1);
	    
	    if ( this.get(name) == 1 )  {
	    	this.erase(name);
	        return true;
	    }

	    return false;
	}
});

}
/*
     FILE ARCHIVED ON 09:03:27 Jan 23, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 14:51:05 May 07, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.733
  exclusion.robots: 0.075
  exclusion.robots.policy: 0.064
  cdx.remote: 0.07
  esindex: 0.011
  LoadShardBlock: 261.074 (3)
  PetaboxLoader3.datanode: 295.607 (4)
  PetaboxLoader3.resolve: 144.534 (3)
  load_resource: 222.166
*/