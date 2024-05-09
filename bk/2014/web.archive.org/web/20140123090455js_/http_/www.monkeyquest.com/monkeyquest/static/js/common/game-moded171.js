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

(function() {
	var updateCookie  = "x-mq-gameMode-update",
		storageCookie = "x-mq-gameMode",
		defaultValue  = UI.Util.Cookie.get(storageCookie),
		state         = {
			id:     null,
			value:  null,
			update: false
		},
		options       = {
			normal:     null,
			fullscreen: null
		};

	dojo.ready(function() {
		var inpSave = dojo.byId("gamemode-save");

		var onChange = function(label) {
			if ( this.isChecked() ) {
				label && dojo.addClass(label, "selected");

				// If a user changes their settings, set the cookie to trigger the game page to use the appropriate
				// game mode (and update their profile, if applicable)
				state.value = this.getInputNode().value;
				// If there is an option to save the setting, do as the user asks; otherwise, save it anyway
				state.update = inpSave ? inpSave.checked : true;
			} else {
				label && dojo.removeClass(label, "selected");
			}
		};

		try {
			mq.gameMode.setupDropDown();

			options.fullscreen = UI.Widgets.Form.CustomElement.factory(dojo.byId("gamemode-fullscreen"))
				.addEventListener("change", dojo.partial(onChange, dojo.byId("lbl-gamemode-fullscreen")))
				.checked(defaultValue != 2);

			options.normal = UI.Widgets.Form.CustomElement.factory(dojo.byId("gamemode-normal"))
				.addEventListener("change", dojo.partial(onChange, dojo.byId("lbl-gamemode-normal")))
				.checked(defaultValue == 2);

			// The save settings option is not always available
			if ( inpSave ) {
				UI.Widgets.Form.CustomElement.factory(inpSave).addEventListener("change", function() {
					state.update = this.isChecked();
				});
			}
		} catch (e) {
			// game mode may not exist on this page
		}
	});

	dojo.setObject("mq.gameMode", {
		confirm: function() {
			// User made no change to the value, there is nothing to do.
			if ( !state.value || state.value == defaultValue ) {
				UI.Util.Cookie.erase(updateCookie);
				return;
			}

			state.id = UI.Util.Cookie.get("heap_access_token");

			UI.Util.Cookie.set(updateCookie, state);
		},

		setupDropDown: function() {
			if ( window.location.pathname.match(/\/[a-z]{2}\/play.*/) || $("#gamemode-normal").length || UI.Util.Cookie.get("x-mq-anonid") ) {
				return;
			}

			var template = dojo.byId("gamemode-template");

			if ( !template ) {
				return;
			}

			dojo.place(template.innerHTML, template, "replace");

			dojo.query("#main_nav .holder_b_play")
				.onmouseover(function() { dojo.addClass(this, "dropdown"); })
				.onmouseout(function() { dojo.removeClass(this, "dropdown"); })
				.query("a").onclick(mq.gameMode.confirm);

			mq.gameMode.setupDropDown = function() {};
		},

		getState: function() {
			return state;
		},

		setStateFullscreen: function() {
			options.fullscreen.checked(true);
		},

		setStateNormal: function() {
			options.normal.checked(true);
		}
	});
}());

}
/*
     FILE ARCHIVED ON 09:04:55 Jan 23, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:28:13 May 06, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 1.544
  exclusion.robots: 0.131
  exclusion.robots.policy: 0.117
  cdx.remote: 0.09
  esindex: 0.014
  LoadShardBlock: 117.866 (3)
  PetaboxLoader3.datanode: 64.915 (4)
  PetaboxLoader3.resolve: 104.138 (2)
  load_resource: 54.936
*/