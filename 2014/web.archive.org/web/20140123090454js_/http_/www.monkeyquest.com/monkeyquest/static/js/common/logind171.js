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
	var dlgLogin, skrim, defaultTemplateId = "tmpl-dlg-login";

	mq.login.dialog = {
		init: function(openSelector, templateId) {
			// Destroy init so that it can only happen once.
			mq.login.dialog.init = function() {};
			dlgLogin = dojo.create("div", {id: "dlg-login", innerHTML: dojo.byId(templateId || defaultTemplateId).innerHTML}, dojo.body());
			skrim    = dojo.byId("monkeybox_overlay");

			// Prep animated elements
			dojo.fadeOut({node: skrim,    duration: 1}).play();
			dojo.fadeOut({node: dlgLogin, duration: 1}).play();
			dlgLogin.style.display = "none";

			dojo.query(openSelector).onclick(mq.login.dialog.open);
			dojo.query("button.close", dlgLogin).onclick(mq.login.dialog.close);

			if ( dojo.isIE < 9 ) {
				mq.init.fonts();
			}
		},

		open: function(event) {
			if ( event ) {
				dojo.stopEvent(event);
			}

			skrim.style.display    = "block";
			dlgLogin.style.display = "block";

			dojo.fadeIn({
				node: skrim,
				duration: 200
			}).play();

			dojo.fadeIn({
				node: dlgLogin,
				duration: 300
			}).play();

			if ( typeof mboxTrack === "function" && typeof landerVersion !== "undefined" ) {
				mboxTrack("mq-lander-login-open", "landerVersion=" + landerVersion);
			}
		},

		close: function(event) {
			if ( event ) {
				dojo.stopEvent(event);
			}

			dojo.fadeOut({
				node: skrim,
				duration: 200
			}).play();

			dojo.fadeOut({
				node: dlgLogin,
				duration: 200
			}).play();

			setTimeout(function() {
				skrim.style.display    = "none";
				dlgLogin.style.display = "none";
			}, 200);
		}
	};
}());

dojo.ready(function() {
	try {
		var persistuser           = UI.Util.Cookie.get("persistuser"),
			inpRememberUsername   = UI.Widgets.Form.CustomElement.factory(dojo.byId("remember_username")),
			inpRememberPassword   = UI.Widgets.Form.CustomElement.factory(dojo.byId("remember_password")),
			labelOptions, usernameLabel, passwordLabel;
	} catch(e) {
		// If an exception is throw, the above nodes do not exist and there is nothing to do
		return;
	}

	mq.ensure_cookies_active();

	// Login is banned for this user, show the ban message and quit
	if ( mq.login.isBanned() ) {
		dojo.byId("loginform").style.display    = "none";
		dojo.byId("login_banned").style.display = "block";
		return;
	}
	// Login requires DOB for this user, show the DOB fields
	else if ( mq.login.isDobRequired() ) {
		dojo.byId('dob').style.display = "block";
	}

	//@TODO: Deprecate the use of jQuery here
	$("#loginform")
		.data("submitFreeze", false)
		.validate({
			submitHandler: mq.login.submit,
			rules: {
				username: {
					required: true
				},
				password: {
					required: true
				}
			},
			messages: {
				username: {
					required: heap.translate("username_empty")
				},
				password: {
					required: heap.translate("password_empty")
				}
			}
		});

	if ( dojo.query("input.dynamic_label").length ) {
		labelOptions = {
			show: function(label, input) {
				label.style.display = "block";
			},

			hide: function(label, input) {
				label.style.display = "none";
			}
		};

		passwordLabel = UI.Widgets.Form.Label.factory(dojo.byId("ipassword"), labelOptions);
		usernameLabel = UI.Widgets.Form.Label.factory(dojo.byId("iusername"), labelOptions)
			.addEventListener("change", function() {
				if ( passwordLabel.getNodes().input.value ) {
					passwordLabel.hide();
				}
			});
	}

	// Do not let user type in a space
	dojo.byId("iusername").addEventListener("keydown", function( e ) {
		var keyCode = e.keyCode || e.which;
		if ( keyCode == 32 ) {
			e.preventDefault();
		}
	});

	if ( persistuser ) {
		dojo.byId("iusername").value = persistuser;
		// IE complains when trying to focus on elements that are hidden (which may be the case on the index page)
		try {
		dojo.byId("ipassword").focus();
		} catch(e) {}

		if ( usernameLabel ) {
			usernameLabel.hide();
		}
	} else {
		// IE complains when trying to focus on elements that are hidden (which may be the case on the index page)
		try {
		dojo.byId("iusername").focus();
		} catch(e) {}
	}

	if ( UI.Util.Cookie.get("persistauth") ) {
		inpRememberPassword.checked(true);
	}

	inpRememberUsername.addEventListener("change", function() {
		if ( !this.isChecked() ) {
			inpRememberPassword.checked(false);
		}
	});

	inpRememberPassword.addEventListener("change", function() {
		if ( this.isChecked() ) {
			inpRememberUsername.checked(true);
		}
	});
	
});

}
/*
     FILE ARCHIVED ON 09:04:54 Jan 23, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:28:13 May 06, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.998
  exclusion.robots: 0.216
  exclusion.robots.policy: 0.203
  cdx.remote: 0.079
  esindex: 0.011
  LoadShardBlock: 347.615 (3)
  PetaboxLoader3.datanode: 141.234 (4)
  load_resource: 53.011
  PetaboxLoader3.resolve: 33.503
*/