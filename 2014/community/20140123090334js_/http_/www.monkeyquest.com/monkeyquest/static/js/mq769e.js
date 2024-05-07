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

var ispromosection = false;
var isgooglesection = false;
var embedVersion;
var referrer;
var redirectParent = false;
var registrationFlowId = "control-original";
var formValidationDelay = 600;
var formValidationDelayLong = 1000;

if(!dojo.exists('mq')) {
	mq = {};
}

dojo.mixin(mq, {
	isMobile: /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent),

	isEmbed: window.location.pathname.indexOf("/embed") != -1 || "embed" in dojo.queryToObject(window.location.search.substr(1)),

	api: {},

	events: {
		GAME_CLOSE: "ongameclose"
	},

	cookies: {
		hasPremiumAuth: "x-mq-has-premium-auth"
	},

	isLive: window.location.hostname == "www.monkeyquest.com"
} );

heap.api.setup({
	object: mq.api,
	'api_class': 'monkeyquest',
	url: heap.urlmap.monkeyquest_api_json,
	methods: [
		'login',
		'newsletter',
		'contact',
		'list_signup',
		'forgot_username',
		'forgot_password',
		'send_activation'
	]
});

heap.api.setup({
	object: mq.api,
	'api_class': 'signup',
	url: heap.urlmap.monkeyquest_api_json,
	methods: [
		'basics_save',
		'settings_save',
		'newsletters_save'
	]
});


/*
 * Utils
 */
mq.utils = {
	includeCss: function(url, media) {
		var link  = document.createElement("link");
			link.rel  = "stylesheet";
			link.type = "text/css";
			link.href = url;
			link.media = media || "all";
			document.getElementsByTagName("head")[0].appendChild(link);
	},

	getQueryParam: function (name, defaultValue) {
		var results = new RegExp("[\\?&]" + name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]") + "=([^&#]*)").exec(window.location.search);
		return results ? decodeURIComponent(results[1].replace(/\+/g, " ")) : defaultValue;
	},

	removeUrlLanguage: function(url) {
		return url.replace(/^\/en\//, "");
	}
};


mq.survey = function() {
	if (jQuery.cookie('x-mq-survey')) {
		return false;
	} else {
		jQuery.cookie('x-mq-survey', '1', {
			expires: 9999
		});
		mq_msgbox.showSurvey();
	}

	return false;
};

mq.ensure_cookies_active = function() {
	if ( !UI.Util.Cookie.test() && !embedVersion ) {
		window.location.href = heap.urlmap.help_cookies;
	}
};


/*
 * Login
 */
mq.login = {
	infos: {},

	isBanned: function() {
		return !!$.cookie("x-mq-login-ban");
	},

	isDobRequired: function() {
		return !!$.cookie("x-mq-login-dob");
	}
};

mq.login.submit = function(form) {
	var btnSubmit = $('#loginform input[name=submit]'),
		params    = {
			username:    $('#iusername').val(),
			password:    $('#ipassword').val(),
			dob:         $('#login_year').val() + '-' + $('#login_month').val() + '-' + $('#login_day').val() + ' 00:00:00',
			newGameMode: mq.gameMode && mq.gameMode.getState().update ? mq.gameMode.getState().value : null,
			persistUser: $('#remember_username').attr("checked"),
			persistAuth: $('#remember_password').attr("checked")
		};

	if ( $(form).data('submitFreeze') !== false ) {
		return false;
	}

	mq.nav.lockPlayButton();

	$(form).data('submitFreeze', true);

	if ( mq.gameMode ) {
		mq.gameMode.confirm();
	}

	$.cookie(mq.cookies.hasPremiumAuth, 1, {path: "/", expires: -1});

	mq.login.infos = params;
	mq.api.login(mq.login.process, params);

	$('#login_message')
		.attr('class', 'ui-message')
		.html(heap.translate('logging_in_please_wait'));

	btnSubmit.data('default_img', btnSubmit.attr('src'))
		.attr('src', '../../../../../monkeyquest/static/images/all/icons/loading.html')
		.css('outline', 'none')
		.addClass("processing");


	// Doing this instead of the dojo.publish method because we were getting weird
	// results with IE < 9. Go figure right?
	// dojo.publish("/mq/login/submit", form);
	if ( typeof mq.login.onSubmitClicked == "function" ) {
		setTimeout(function(){
			mq.login.onSubmitClicked(form);
		});
	}

	$('#login_message').fadeIn();
};

mq.login.process = function(result) {
	var btnSubmit, msg;

	mq.login.infos.result = result;

	// Doing this instead of the dojo.publish method because we were getting weird
	// results with IE < 9. Go figure right?
	//dojo.publish('/mq/login/process', result);
	if ( typeof mq.login.onProcess == "function" ) {
		setTimeout(function(){
			mq.login.onProcess(result);
		});
	}

	if (result.type == 1) {
		//track login
		MQStats.trackLogin();
		mq.login.timeout = setTimeout(function() {
			mq.login_success();
		}, 8000);
		mq.login_finish();
	} else {
		$("#loginform").data('submitFreeze', false);
		mq.nav.unlockPlayButton();

		if ( result.require_dob ) {
			$('#dob').fadeIn();
		};

		if ( result.login_ban ) {
			$('#loginform').fadeOut('normal', function() {
				$(this).remove();
				$('#login_banned').fadeIn();
			});
			return false;
		};

		if ( result.code == 'ERR_INVALID_DOB' || result.code == 'ERR_NOT_BETA_MEMBER' ) {
			$('#login_message').attr('class', 'ui-error').html(heap.translate(result.msg)).fadeIn();
		} else if (result.code == 'ERR_BANNED') {
			mq.login.displayNotifications(result.data.notifications, function() {});
		} else {
			if ( result.msg.error ) {
				$('#login_message').attr('class', 'ui-error').html('<p>' + result.msg.error + '</p>').fadeIn();
			} else {
				$('#login_message').attr('class', 'ui-error').html('<p>' + result.msg + '</p>').fadeIn();
			}
		};

		btnSubmit = $('#loginform input[name=submit]');
		btnSubmit.attr('src', btnSubmit.data('default_img')).removeClass("processing");
	}
};

mq.login_finish = function(result) {
	if (result == 1) {
		clearTimeout(mq.login.timeout);
	}

	// NC Hub login
	mq.jsonp(heap.urlmap.nchub_url + "/auth/login?username=" + mq.login.infos.username + "&token=" + mq.login.infos.result.data.user.sso.authToken + "&callback=mq.login_success");

	setTimeout(function() {
		mq.login_success();
	}, 5000);
};

mq.login_success = (function() {
	var hasRedirected = false;

	var finalizeUrl = function(url) {
		if ( !url ) {
			return;
		}

		//@TODO: add url = decodeURIComponent(url);
		return url + (url.indexOf("?") === -1 ? "?" : "&") + "isLoggedIn=1";
	};

	var finalizeUrl = function(url) {
		if ( !url ) {
			return;
		}

		url = decodeURIComponent(url);
		return url + (url.indexOf("?") === -1 ? "?" : "&") + "isLoggedIn=1";
	};

	return function(premiumResult) {
		var redirectUrl    = finalizeUrl(getUrlVars()['redirect']),
			redirectMapKey = getUrlVars()['redirect-map'];

		$.cookie(mq.cookies.hasPremiumAuth, 1, {path: "/", expires: premiumResult ? 0 : -1});

		if ( hasRedirected ) {
			return;
		}

		hasRedirected = true;

		// Allow explicit redirects to local urls
		if ( redirectUrl && (redirectUrl[0] == "/" || redirectUrl.match(/^(https?:)?\/\/([^\/]*\.)?(monkeyquest.com|mtvi.com)((\/.*)?|$)/) ) ) {
			window.parent.location.href = redirectUrl;
		}
		// Just a refresh is required
		else if ( getUrlVars()['reload'] || mq.login.doParentReload ) {
			// do not use window.top.location.reload, strange things happen
			window.top.location.href = window.top.location.href;
		}
		// User has a legacy account and must update
		else if ( mq.login.infos.result.data.legacy == true ) {
			window.location.href = finalizeUrl(heap.urlmap.legacy);
		}
		// Implicit or default redirect
		else {
			// Redirect using map
			if ( redirectMapKey ) {
				redirectUrl = heap.urlmap[redirectMapKey];
			}
			// Embed redirect
			else if ( typeof embedVersion != "undefined" ) {
				redirectUrl = heap.urlmap.playEmbed;
			}
			// A redirect url has been explicitly set
			else if ( mq.login.defaultRedirectUrlOverride ) {
				redirectUrl = mq.login.defaultRedirectUrlOverride;
			}
			// Profile based redirect (only used when not in embed mode)
			else if ( !mq.isEmbed && mq.login.infos.result.data.user.profile.onLogin ) {
				redirectUrl = mq.login.infos.result.data.user.profile.onLogin;
			}
			// Default redirect
			else {
				redirectUrl = heap.urlmap.play;
			}

			// Do the actual redirect
			if ( redirectParent ) {
				window.parent.location.href = finalizeUrl(redirectUrl);
			}
			else {
				window.location.href = finalizeUrl(redirectUrl);
			}
		}
	};
}());

mq.login.premiumReauthorization = function() {
	if ( !mq.user.isLoggedIn() || $.cookie(mq.cookies.hasPremiumAuth) ) {
		// Destroy this function to prevent needless calls to the nc hub
		mq.login.premiumReauthorization = function() {};
		return;
	}

	mq.jsonp(heap.urlmap.nchub_url + "/auth/login?username=" + mq.user.getUsername() + "&token=" + mq.user.getAuthToken() + "&callback=mq.login.premiumReauthorization.onComplete");
};

mq.login.premiumReauthorization.onComplete = function(status) {
	// Successfully logged into the premium site.  Set the appropriate cookie and destroy the triggering function to prevent further calls on this page
	if ( status ) {
		$.cookie(mq.cookies.hasPremiumAuth, 1, {path: "/"});
		mq.login.premiumReauthorization = function() {};
	}
};


mq.logout = function() {
	// Log out of NC hub
	new Image().src = heap.urlmap.nchub_url + "/auth/logout";
	setTimeout(function() {
		window.location = heap.urlmap.logout;
	}, 333);
};



mq.login.forgot_username = function(form) {
	var params = {};
	params['email'] = $("#iforgot_username_email").val();

	var forgot_usernameCB = function(result) {
		if (result.type == 1) {
			$(form).fadeOut('normal', function() {
				$('.success_message').fadeIn();
				setTimeout(function() {
					window.location.href = heap.urlmap.login;
				}, 5000);
			});
		} else {
			if (result.data.email == 'validator_required') {
				mq.errorMsg($("#iforgot_username_email"), 'error_email_required');
			} else if (result.data.email == "validator_unknown_email") {
				mq.errorMsg($("#iforgot_username_email"), 'validator_unknown_email');
			} else {
				mq.errorMsg($("#iforgot_username_email"), 'error_email_validation');
			};
		}
	};
	mq.api.forgot_username(forgot_usernameCB, params);

	return false;
};

mq.login.forgot_password = function(form) {
	var params = {};
	params['username'] = $("#iforgot_password_username").val();
	params['email'] = $("#iforgot_password_email").val();

	var forgot_passwordCB = function(result) {
		if (result.type == 1) {
			$(form).fadeOut('normal', function() {
				$('.success_message').fadeIn();
				setTimeout(function() {
					window.location.href = heap.urlmap.login;
				}, 5000);
			});
		} else {
			if (result.data.is_child) {
				if (result.data.email) {
					mq.errorMsg($("#iforgot_password_email"), 'error_email_matching');
				} else {
					$('#field_username').fadeOut('normal', function() {
						$('#field_email').fadeIn();
					});
				}
			} else {
				if (result.data.email) mq.errorMsg($("#iforgot_password_email"), 'error_email_validation');
				else mq.errorMsg($("#iforgot_password_username"), 'error_username_not_found');
			}
		}
	};
	mq.api.forgot_password(forgot_passwordCB, params);

	return false;
};


mq.login.displayNotifications = function(notifications, callback) {
	var reloadOnClose = heap.urlmap.play,
		noClose = true, 
		containerOnly = true, 
		useEmbeddedUrl = false, 
		cls, url;
	
	// If the login is in a dialog box, close it first
	$("#dlg-login").hide();

	// Show moderation
	if ( notifications.moderation ) {
		var moderation = notifications.moderation;

		mq_lightbox.onBeforeShow = function() {
			$("#dlg-login-moderation-notification")
				.addClass(moderation.permanent ? "permanent": "temporary")
				.addClass(moderation.type)
				.find(".reason")
					.html(moderation.reason);

			if ( !moderation.permanent ) {
				var duration = ((moderation.endTime * 1000) - new Date()) / 1000,
					hours, days, minutes;

				days = duration / (60 * 60 * 24) >>> 0;
				duration -= days * (60 * 60 * 24);
				hours = duration / (60 * 60) >>> 0;
				duration -= hours * (60 * 60);
				minutes = duration / 60 >>> 0;

				$("#dlg-login-moderation-notification .expiry").html(
					days + "d " +
					hours + "h " +
					minutes + "m"
				);

				mq.init.fonts();
			}

			$("#dlg-login-moderation-notification .container").removeClass("hidden");
		};
		
		reloadOnClose = false;
		url = heap.urlmap.loginNotificationsModeration;
		noClose = true;
		containerOnly = true;
	}
	// Show login promos first, then loginAds if there are any
	else if ( notifications.promos && notifications.promos.length || notifications.loginAd ) {

		if ( notifications.promos && notifications.promos.length ) {
			url = heap.urlmap.promo + notifications.promos[0];
		} else if (notifications.loginAd) {
			url     = heap.urlmap.loginAd + notifications.loginAd;
			noClose = false;
			useEmbeddedUrl = true;
			cls = notifications.loginAd
		}
	}
	
	if ( url ) {
		mq_msgbox.showMsg({
			url:           url,
			reloadOnClose: reloadOnClose,
			noClose:       noClose,
			containerOnly: containerOnly,
			_class: cls
		});
		
		$('#monkeybox_inner a, #monkeybox_inner button.close').die('click').live('click', function() {
			mq_lightbox.closeBox();
			
			if ( useEmbeddedUrl ) {
				window.location = this.href;
				return;
			}
			
			if ( typeof callback === "function" ) {
				callback();
			}
		});
	}
};

(function() {
	// Warp mq.api.login so that we may intercept and delay the callback
	// if there is something to display (e.g.: promo grants)
	var login = mq.api.login;

	mq.api.login = function(callback, params) {
		login(function(response) {
			// Success.  See if there is any data that requires interception
			if ( response.type ) {
				// Interception has not been specifically disabled
				if ( !params.preventInterception ) {
					// Determine what, if any interception is necessary
					if ( response.hasNotifications && mq.isEmbed ) {
						mq.login.displayNotifications(response.data.notifications, function() {
							callback(response);
						});

						return;
					}
				}

				// Nothing to intercept, fall through to the callback
			}

			// Success without interception, or error case
			callback(response);
		}, params);
	};
}());


/*
 * JSONP
 */
mq.jsonp = function(url) {
	var script = document.createElement("script");
	script.setAttribute("src", url);
	script.setAttribute("type", "text/javascript");
	document.body.appendChild(script);
};



/*
 * Newsletter
 */
mq.newsletter = {};
mq.newsletter.initialize = function() {
	var formElem = $("#newsletter_form");
	formElem.children("button").click(function() {
		var params = jQuery.forms.toDataStructure(formElem);
		$("div.error", formElem).remove();
		mq.api.newsletter(mq.newsletter.callback, params);
		return false;
	});
};


mq.newsletter.callback = function(response, elem) {
	var formElem = $("#newsletter_form");
	if (response.type == heap.SUCCESS) {
		success_send($(formElem), true);
	} else {
		for (var i in response.data) {
			var selector = $('input[name=' + i + '], textarea[name=' + i + '], select[name=' + i + ']').last();
			selector.bind('focus, click, change', function() {
				$(this).removeClass('error').siblings("div.error:first").fadeOut(100);
			}).addClass('error');
			$('<div class="error">' + heap.translate(response.data[i]) + '</div>').insertAfter((selector.next().is('label') ? selector.next() : selector));
		};
		$(".error", formElem).fadeIn();
	}
};


/*
 * Contact
 */
mq.contact = {};
mq.contact.initialize = function() {
	var formElem = $("#contact_form");
	formElem.find("input[name=submit]").click(function() {
		var params = jQuery.forms.toDataStructure(formElem);
		$("div.error", formElem).remove();
		mq.api.contact(mq.contact.callback, params);
		return false;
	});
};

mq.contact.callback = function(response, elem) {
	var formElem = $("#contact_form");
	if (response.type == heap.SUCCESS) {
		success_send($(formElem), true);
	} else {
		for (var i in response.data) {
			var selector = $('input[name=' + i + '], textarea[name=' + i + '], select[name=' + i + ']').last();
			selector.bind('focus, click, change', function() {
				$(this).removeClass('error').siblings("div.error:first").fadeOut(100);
			}).addClass('error');
			$('<div class="error">' + heap.translate(response.data[i]) + '</div>').insertAfter((selector.next().is('label') ? selector.next() : selector));
		};
		$(".error", formElem).fadeIn();
	}
};

var success_send = function(form, doScroll) {
	$(form).css('height', $(form).height() + 'px');
	$('button', form).remove();
	$(form).find('fieldset').fadeOut('slow', function() {
		$(this).remove();

		$("#success_send").fadeIn('slow');

		$(form).css('height', '');
		if (doScroll) $('html, body').animate({
			scrollTop: 0
		}, 'slow');
	});
};



mq.registrationClosed = function() {
	mq_msgbox.showMsg({
		url:     heap.urlmap.reg_closed_ajax,
		noClose: true,
		isError: true
	});
};

mq.serverError = function(url, noClose) {
	mq_msgbox.showMsg({
		url:     url,
		noClose: noClose
	});
};

mq.subscribeNewsletter = function(form) {
	var _email = form.find('input[name=email]').val();

	if (validateEmail(_email) == false) {
		if (_email.length == 0) {
			mq.errorMsg(form.find('input[name=email]'), 'error_email_required');
		} else {
			mq.errorMsg(form.find('input[name=email]'), 'error_email_validation');
		}

		return false;
	};

	var subscribeNewsletter_cb = function(result) {
		if (result.type == 1) {
			form.find('.formContent').fadeOut('normal', function() {
				$(this).html('<p>Thank you!</p>').fadeIn();
			});
		} else {
			mq.errorMsg(form.find('input[name=email]'), result.msg);
		}
	};


	mq.api.list_signup(subscribeNewsletter_cb, {
		email: _email,
		list: 'waitinglist'
	});

	return false;
};


function validateEmail(elementValue) {
	var emailPattern = /^[a-zA-Z0-9+._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return emailPattern.test(elementValue);
}

mq.errorMsg = function(field, msg) {
	if (field.parent().find('label.error').length <= 0) {
		var error = $('<label class="error">' + heap.translate(msg) + '</label>');
		$(error).css('display', 'none');

		field.parent().append(error);
		field.focus();
		error.fadeIn();

		setTimeout(function() {
			error.fadeOut('normal', function() {
				$(this).remove();
			});
		}, 5000);
	}
};

var activation_account = function(json) {
	this.container = json.target;
	this.blocks = this.container.find('.activation_block');
	this.parentForm = $('form#send_parent_email');
	this.normalForm = $('form#send_activation');
	this.parentEmail = '';

	this.isChild = false;

	var t = this;
	this.parentForm.find('a.b_submit').click(function() {
		t.parentEmail = t.parentForm.find('input[name=email]').val();
		return t.process(t.parentForm);
	});

	this.normalForm.find('a.b_submit').click(function() {
		t.normalForm.submit();
	});

	this.process();
};

activation_account.prototype.process = function(form) {
	var t = this;
	this.activation_cb = function(result) {
		if (result.type == 1) {
			if (t.isChild == true) {
				t.blocks.hide();
				$('#parent_email_sent').show();
			} else {
				t.blocks.hide();
				$('#normal_email_sent').show();
			};
		} else {
			t.isChild = true;

			if (result.code == 'ERR_MISSING_PARENT_EMAIL') {
				if (form) {
					$('#parent_mail_error').html(heap.translate('activation_email_validation'));
					t.parentForm.find('input[name=email]').focus();
					return false;
				};
				t.blocks.hide();
				$('#parent_email').show();
			} else if (result.code == 'ERR_ALREADY_ACTIVATED') {
				t.blocks.hide();
				$('#activation_already').show();
			} else if (result.code == 'ERR_INVALID_PARENT_EMAIL') {
				$('#parent_mail_error').html(heap.translate('activation_email_matching'));
				t.parentForm.find('input[name=email]').focus();
			} else if (result.data.parent_email == 'validator_format_email') {
				$('#parent_mail_error').html(heap.translate('activation_email_validation'));
				t.parentForm.find('input[name=email]').focus();
			};

		};

	};
	mq.api.send_activation(t.activation_cb, {
		parent_email: t.parentEmail
	});

	return false;
};




/*
 * monkeyBox (lightbox)
 */
var monkeyBox = function() {
	var that = this;

	this.mq_overlay      = $('#monkeybox_overlay');
	this.mq_window       = $('#monkeybox_window');
	this.layerBase       = +this.mq_overlay.css("z-index");
	this.layerMultiplier = 2;
	this.layerCount      = 0;

	$('a.monkeybox').live('click', function() {
		return that.showBox();
	});
};

monkeyBox.prototype.bringForward = function() {
	++this.layerCount;

	var newZIndex = this.layerBase + (this.layerCount * this.layerMultiplier);

	this.mq_overlay.css("z-index", newZIndex);
	this.mq_window.css("z-index", newZIndex + 1);
};

monkeyBox.prototype.sendBack = function() {
	--this.layerCount;

	var newZIndex = this.layerBase + (this.layerCount * this.layerMultiplier);

	this.mq_overlay.css("z-index", newZIndex);
	this.mq_window.css("z-index", newZIndex + 1);
};

monkeyBox.prototype.showBox = function(options) {
	var that = this;

	options = options || {};

	if ( options.noClose ) {
		$('#monkeybox_window .close_monkeybox').hide();
	} else {
		$('#monkeybox_window .close_monkeybox').show();
	}

	if ( options._class ) {
		$('#monkeybox_content').addClass(options._class);
	}

	if ( options.containerOnly ) {
		$('#monkeybox_content').addClass("container-only");
	} else {
		$('#monkeybox_content').removeClass("container-only");
	}

// If reloadOnClose is strictly true, redirect to the home page.  Otherwise, if reloadOnClose is not falsey, use it as the URL to redirect to
	if ( options.reloadOnClose ) {
		$('#monkeybox_window .close_monkeybox').die('click').live('click', function() {
			if ( options.reloadOnClose === true ) {
			     window.location.href = window.location.href;
			} else {
			     window.location.href = mq.isEmbed ? heap.urlmap.playEmbed : options.reloadOnClose;
			}
		});
	} else {
		$('#monkeybox_window .close_monkeybox').die('click').live('click', function() {
			that.closeBox();
			return false;
		});
	}

	this.bringForward();
	this.positionBox();
	this.onBeforeShow();

	this.mq_overlay.fadeIn('normal', function() {
		that.mq_window.fadeIn('normal');
		that.onShow();
	});

	return false;
};

monkeyBox.prototype.showOverlay = function(callback) {
	this.bringForward();
	this.mq_overlay.fadeIn('normal', callback);
};

monkeyBox.prototype.hideOverlay = function(callback) {
	this.mq_overlay.fadeOut('normal', callback);
	this.sendBack();
};

/**
 * Context defined
 */
monkeyBox.prototype.onClose = function() { };

/**
 * Context defined
 */
monkeyBox.prototype.onBeforeShow = function() { };

/**
 * Context defined
 */
monkeyBox.prototype.onShow = function() { };

monkeyBox.prototype.closeBox = function(callback) {
	var that = this;

	var onComplete = function() {
		that.onClose();

		if ( typeof callback === "function" ) {
			callback();
		}
	};

	$('#monkeybox_inner').html('');

	that.sendBack();

	if ( that.layerCount == 0 ) {
		that.mq_window.fadeOut('normal', function() {
			that.mq_overlay.fadeOut('normal', onComplete);
		});
	} else {
		that.mq_window.fadeOut(1);
		onComplete();
	}


	return false;
};

monkeyBox.prototype.positionBox = function() {
	var height;

	this.mq_overlay.height($(document).height());

	height = (($(window).height() - this.mq_window.height()) / 2) + $(document).scrollTop();

	this.mq_window.css('padding-top', height + 'px');
};


/*
 * monkeySlideshow
 */
var monkeySlideshow = function(params) {
	this.docs = {};
	this.currentIndex;
	this.currentSlide;

	//this.built = false;
	var that = this;

	$('a.monkeySlideshow').each(function() {

		var cat = $(this).attr('rel');
		var doc = {
			img: $(this).attr('href'),
			title: $(this).attr('title'),
			description: $(this).find('img').attr('alt'),
			slug: $(this).attr('id'),
			type: null
		};

		if ($(this).hasClass('video')) doc.type = 'video';
		else if ($(this).hasClass('audio')) doc.type = 'audio';
		else doc.type = null;

		if (!that.docs[cat]) {
			that.docs[cat] = [];
		};
		that.docs[cat].push(doc);

		$(this).bind('click', function() {

			for (var i = 0; i < that.docs[cat].length; i++) {
				if (doc == that.docs[cat][i]) {
					that.currentSlide = that.docs[cat];
					that.currentIndex = i;
				};
			};

			return that.openSlideshow();
		});
	});
};

monkeySlideshow.prototype.openSlideshow = function() {
	mq_lightbox.showBox({
		_class: 'slideshow'
	});
	this.buildSlideshow();

	return false;
};

monkeySlideshow.prototype.buildSlideshow = function() {
	var container = $('#monkeySlideshow');
	var that = this;
	if (!$('#monkeybox_inner').find(container).length > 0) {
		container = $('.monkeySlideshowTemplate').clone().attr('id', 'monkeySlideshow').removeClass('monkeySlideshowTemplate');

		$('#monkeybox_inner').html(container);

		container.find('a.mq_controls.prev').unbind('click').bind('click', function() {
			return that.prevImage();
		});
		container.find('a.mq_controls.next').unbind('click').bind('click', function() {
			return that.nextImage();
		});
	};


	container.find('#gallery_meta .gallery_title').html(that.currentSlide[that.currentIndex].title);
	container.find('#gallery_meta .gallery_count').html((that.currentIndex + 1) + ' / ' + (that.currentSlide.length));

	if (that.currentSlide[that.currentIndex].type == 'video') {
		container.find('#img_holder').html('<div id="videoPlayer"><div class="scotchpanel noflash"><div class="inner"><div class="error_monkey"><h2 class="title grobold">' + heap.translate("need_flash_title") + '</h2>' + heap.translate("need_flash_body") + '</div></div></div></div>');

		var flashvars = {
			videoURL: that.currentSlide[that.currentIndex].img
		};
		var params = {
			bgcolor: '#000000',
			wmode: 'transaprent',
			allowfullscreen: true
		};
		var attributes = {
			id: 'videoPlayer'
		};

		MQStats.siteVideoPlay(that.currentSlide[that.currentIndex].title);

		swfobject.embedSWF(heap.urlmap.static + "/swf/MQVideoPlayerLoader.swf", "videoPlayer", "561", "310", "10.0.0", "", flashvars, params, attributes);
	}
	else if (that.currentSlide[that.currentIndex].type == 'audio') {
		container.find('#img_holder').html('<div id="audioPlayer"><div class="scotchpanel noflash"><div class="inner"><div class="error_monkey"><h2 class="title grobold">' + heap.translate("need_flash_title") + '</h2>' + heap.translate("need_flash_body") + '</div></div></div></div><a href="' + heap.urlmap.downloadmp3 + '/' + that.currentSlide[that.currentIndex].slug + '" class="btn b_download_mp3">Download mp3</a>');

		var flashvars = {
			audioURL: that.currentSlide[that.currentIndex].img
		};
		var params = {
			bgcolor: '#000000',
			wmode: 'transaprent',
			allowfullscreen: true
		};
		var attributes = {
			id: 'audioPlayer'
		};
		swfobject.embedSWF(heap.urlmap.static + "/swf/MQAudioPlayerLoader.swf", "audioPlayer", "561", "55", "10.0.0", "", flashvars, params, attributes);

	} else {
		container.find('#img_holder').html('<img src="' + that.currentSlide[that.currentIndex].img + '" />');
	}
};

monkeySlideshow.prototype.nextImage = function() {
	if (this.currentIndex == (this.currentSlide.length - 1)) this.currentIndex = 0;
	else this.currentIndex += 1;

	this.buildSlideshow();

	return false;
};

monkeySlideshow.prototype.prevImage = function() {
	if (this.currentIndex == 0) this.currentIndex = this.currentSlide.length - 1;
	else this.currentIndex -= 1;

	this.buildSlideshow();

	return false;
};


/*
 * monkeyMessageBox
 */
var monkeyMessageBox = function() {
	var that = this;
	$('.msgbox').die('click').live('click', function() {
		return that.showMsg({
			url:              $(this).attr('href'),
			// This should be a CSS selector
			embeddedTemplate: $(this).attr('data-embedded-template'),
			noClose:          $(this).hasClass('noclose')
		});
	});
};

monkeyMessageBox.prototype.showMsg = function(opt) {
	var embeddedTemplate = $(opt.embeddedTemplate);

	if ( embeddedTemplate.length ) {
		// This is done asynchronously so that this function always behaves the same
		setTimeout(function() {
			$('#monkeybox_inner').html(embeddedTemplate[0].innerHTML);
			mq_lightbox.showBox(opt);
		}, 10);
	} else {
		$.ajax({
			type:     'GET',
			dataType: 'html',
			url:      opt.url,
			success:  function(data) {
				if ( opt.isError ) {
					$('#monkeybox_content').addClass('game_closed');
				}

				$('#monkeybox_inner').html(data);
				mq_lightbox.showBox(opt);
			}
		});
	}

	return false;
};

monkeyMessageBox.prototype.showSurvey = function(opt) {
	$('#monkeybox_overlay').fadeIn();
	$('.mq_survey_holder').fadeIn();

	$('.mq_survey_holder .btn_close').click(function(e) {
		e.preventDefault();
		$('#monkeybox_overlay').fadeOut();
		$('.mq_survey_holder').fadeOut();
	});
	$('.mq_survey_holder .take_survey').click(function(e) {
		$('#monkeybox_overlay').fadeOut();
		$('.mq_survey_holder').fadeOut();
	});

	var that = this;
	var height = (($(window).height() - 300) / 2);
	$('.mq_survey_inner').css('margin-top', height + 'px');

	return false;
};



/*
 * initNav
 */
var initNav = function() {
	this.dropdown = $('#main_nav .section_nav .dropdown');
	this.positionNavItem();

	$('#main_nav .section_nav > li').hover(
		function() {
			$(this).find('.dropdown').show();
		},
		function() {
			$(this).find('.dropdown').hide();
		}
	);

	this.playbutton_init();
};

initNav.prototype.positionNavItem = function() {
	$(this.dropdown).each(function() {
		$('.thumb a', this).each(function() {
			var _height = $(this).height();
			var _txt = $('span', this);
			var _txtHeight = _txt.innerHeight();
			var _img = $('img', this);
			var _imgHeight = _img.innerHeight();

			if (_txtHeight < _height) {
				_txt.css({
					top: Math.round((_height - _txtHeight) / 2)
				});
			} else {
				_img.css({
					top: Math.round((_height - _imgHeight) / 2)
				});
			}
		});

		$(this).css({
			display: 'none',
			visibility: 'visible'
		});
	});
};

initNav.prototype.playbutton_init = function(delay) {
	var t = this;

	if ($('.playbutton_anim').length > 0) {
		this.delay = (delay) ? delay : 0;
		this.anim = $('.playbutton_anim');
		this.pos = 0;
		this.big = false;

		if (this.anim.parent().hasClass('big')) {
			this.big = true;
		}


		if (this.big) {
			$(this.anim).css('background-position', this.pos + 'px 0px');
		} else {
			$(this.anim).css('background-position', '0px ' + this.pos + 'px');
		}

		clearInterval(this.loop);

		setTimeout(function() {
			t.loop = setInterval(function() {
				t.playbutton_anim();
			}, 65);
		}, this.delay);
	}
};

initNav.prototype.playbutton_anim = function() {
	var t = this;
	if (this.big) {
		this.pos -= 600;
		$(this.anim).css('background-position', t.pos + 'px' + ' 0px');
		if (this.pos <= -24000) this.playbutton_init(3000);
	} else {
		this.pos -= 125;
		$(this.anim).css('background-position', '0px ' + t.pos + 'px');
		if (this.pos <= -5845) this.playbutton_init(3000);
	}
};

var highlights = function() {
	this.holder = $('#highlights');
	this.featuresHolder = $('#features_holder');
	this.interval;

	var t = this;

	$('#highlight_tabs li').hover(

	function() {
		$(this).stop().animate({
			left: 27
		}, {
			duration: 200
		}).end();
	}, function() {
		if (!$(this).hasClass('active')) $(this).stop().animate({
			left: 0
		}, {
			duration: 200
		}).end();
	}).find('a').bind('click', function(e) {
		t.stopCycling();

		t.selectItem($(this));

		return false;
	});

	t.startCycling();

/*
		gotta pass the Highlight instance to stop cycling
		on when the user open a video feature
	*/
	new featureVideo({
		_parent: this
	});
};


/*
	Method: startCycling
	It cycles through features tabs and select next item
*/
highlights.prototype.startCycling = function() {
	var t = this;

	t.interval = setInterval(function() {
		var _next = ($('#highlight_tabs li.active').hasClass('last')) ? $('#highlight_tabs li:first').find('a') : $('#highlight_tabs li.active').next().find('a');

		t.selectItem($(_next));
	}, 5000);
};

highlights.prototype.stopCycling = function() {
	clearInterval(this.interval);
};

highlights.prototype.selectItem = function(item) {
	var link = $(item);
	var info = $(item).data('info');
	var t = this;
	var learnmore = $('#learnmore');

	$(item).parent().trigger('mouseenter');

	if (!$(item).parent().hasClass('active')) {
		$('#highlight_tabs li.active').removeClass('active').trigger('mouseout');
		$(item).parent().addClass('active');

		t.featuresHolder.find('img').fadeOut('normal', function() {
			$(this).attr('src', info.img).fadeIn();
		});

		$(learnmore).removeClass('monkeyFeature');
		if ( info ) {
			if (info.type == 'video') {
				$(learnmore).attr({
					'href': info.mediaUrl,
					'title': info.text
				}).addClass('monkeyFeature');
			} else {
				$(learnmore).attr({
					'href': info.url
				});
			}
		}
	}
};


var featureVideo = function(opt) {
	this.videoURL;

	var that = this;
	$('.monkeyFeature').live('click', function() {
		opt._parent.stopCycling();
		that.videoURL = $(this).attr('href');
		that.showVideo();
		return false;
	});
};

featureVideo.prototype.showVideo = function() {
	var that = this;
	mq_lightbox.showBox({
		_class: 'videoFeature'
	});
	$('#monkeybox_inner').html('<div id="videoPlayer"><div class="scotchpanel noflash"><div class="inner"><div class="error_monkey"><h2 class="title grobold">' + heap.translate("need_flash_title") + '</h2>' + heap.translate("need_flash_body") + '</div></div></div></div>');


	var flashvars = {
		videoURL: that.videoURL
	};
	var params = {
		bgcolor: '#000000',
		wmode: 'transaprent',
		allowfullscreen: true
	};
	var attributes = {
		id: 'videoPlayer'
	};
	swfobject.embedSWF(heap.urlmap.static + "/swf/MQVideoPlayerLoader.swf", "videoPlayer", "640", "480", "10.0.0", "", flashvars, params, attributes);
}

var setContainerHeight = function() {
	var container = $('.background.top');
	var footer = $('#footer');

	var dHeight = $(window).height();
	var fHeight = footer.innerHeight();
	var cHeight = $(container).innerHeight();

	if (cHeight < dHeight) container.css('min-height', (dHeight - fHeight) + 'px');
};

var check_fblike = function() {
	if ( $.cookie('x-mq-authenticated') ) {
		if ( !$.cookie('x-mq-child') ) {
			$('#fblike-decoy').hide();
			$('#fblike').show();
			$('.utilbox.fblike').fadeIn();
		}
	} else {
		if ( $.cookie('x-mq-fb-allowed') ) {
			$('#fblike-decoy').hide();
			$('#fblike').show();
		}

		$('.utilbox.fblike').fadeIn();
	}
};

var getUrlVars = function() {
	var vars = {};

	window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
		vars[key] = value;
	});

	return vars;
};


/*
 * Simple pub/sub
 */
(function() {
	var listeners = {};

	mq.subscribe = function(event, callback, isSynchronous) {
		(listeners[event] || (listeners[event] = [])).push({
			callback:      callback,
			isSynchronous: isSynchronous
		});
	};

	mq.publish = function(event/*, arg1, arg2, ..., argN*/) {
		var args = Array.prototype.slice.apply(arguments);
		args.shift();

		if ( !listeners[event] ) {
			return true;
		}

		for ( var i=0, l=listeners[event].length; i<l; ++i ) {
			if ( listeners[event][i].isSynchronous ) {
				if ( !listeners[event][i].callback.apply(null, args) ) {
					return false;
				}
			} else {
				(function(i) {
					setTimeout(function() {
						listeners[event][i].callback.apply(null, args);
					}, 1);
				}(i));
			}
		}

		return true;
	};
}());


/**
 * IE compatibility: Metro IE10
 */
dojo.setObject("mq.ie.metro", {
	/**
	 * Currently, the only way is to detect if we are in IE10 and fullscreen (since metro is always fullscreen),
	 * although this can come up with a false positive for other desktop IE10 users browsing in fullscreen.
	 */
	isMetro: function() {
		if ( !document.all || !window.navigator.userAgent.indexOf("MSIE 10.0") == -1 ) {
			return false;
		}

		try {
			return !new ActiveXObject("htmlfile");
		} catch (e) {
			return true;
		}
	},

	/**
	 * @return bool Whether or not this is Metro IE 10 and the user needs to be notified
	 */
	isNotificationRequired: function() {
		var page = mq.utils.removeUrlLanguage(window.location.pathname);

		// If this is not Metro IE10, then no notification is required.
		if ( !this.isMetro() ) {
			return false;
		}

		// Always redirect for play.*
		if ( page == "play" || page.indexOf("play?") == 0 ) {
			return true;
		}
		// Never redirect for help/metro-ie or if the user has already been notified
		else if ( page.indexOf("help/metro-ie") == 0 || this.wasNotified() ) {
			return false;
		}

		// For all other pages, require notification if we think this is Metro IE 10.
		return true;
	},

	/**
	 * Redirect the user to the Metro IE help page
	 */
	notify: function() {
		var query  = dojo.queryToObject(window.location.search.substr(1)),
			url    = window.location,
			params = {
				redirect: url.pathname + url.search + url.hash
			};

		if ( query.xid ) {
			params.xid = query.xid;
		}

		if ( mq.pages && mq.pages.embed && mq.pages.embed.referrer ) {
			params.referrer = mq.pages.embed.referrer;
		}

		window.top.location = url.protocol + "//" + url.hostname + heap.urlmap.help_metroIe + "?" + dojo.objectToQuery(params);
	},

	/**
	 * Sets a cookie to track whether or not the user was notified about the sadness of being metro
	 */
	setNotified: function() {
		UI.Util.Cookie.set("x-mq-metro-ie-notified", true);
	},

	/**
	 * Wether or not the user has already been notified about Metro IE.
	 */
	wasNotified: function() {
		return UI.Util.Cookie.get("x-mq-metro-ie-notified");
	}
});

if ( mq.ie.metro.isNotificationRequired() ) {
	mq.ie.metro.notify();
}


/**
 * Navigation
 */
(function() {
	var isPlayButtonLocked = false;

	mq.nav = {
		lockPlayButton: function(event) {
			if ( isPlayButtonLocked ) {
				if ( event ) {
					event.stopPropagation();
					event.preventDefault();
				}

				return false;
			}

			isPlayButtonLocked = true;
		},

		unlockPlayButton: function() {
			isPlayButtonLocked = false;
		}
	};
}());


/*
 * Initialize
 */
var mq_lightbox;
var mq_slideshow;
var mq_msgbox;

mq.init = {
	fonts: function() {
		if ( typeof Cufon !== "undefined" ) {
			Cufon.replace(".grobold", {
				color: "#322727",
				letterSpacing: "1px",
				textTransform: "uppercase"
			});

			Cufon.replace(".sub_grobold", {
				color: "#322727",
				textTransform: "uppercase"
			});

			Cufon.replace(".html");
		}
	}
};

$(function() {
	var isPlayPage   = !!window.location.pathname.match(/\/[a-z]{2}\/play\/?$/),
		campaignCode = dojo.queryToObject(window.location.search.substr(1)).xid,
		isClicked    = false;

	mq.login.premiumReauthorization();

	mq_lightbox  = new monkeyBox();
	mq_slideshow = new monkeySlideshow();
	mq_msgbox    = new monkeyMessageBox();

	$('.logout').bind('click', function(event) {
		return mq.logout(event);
	});

	$('.promo_box .close_monkeybox').live('click', function() {
		$(this).parents('.promo_box').fadeOut('normal', function() {
			$(this).remove();
		});
		return false;
	});

	mq.init.fonts();

	if ( isPlayPage ) {
		$("#main_nav .playbutton").addClass("disabled");
	} else {
		new initNav();
	}

	if ( mq.gameMode ) {
		mq.gameMode.setupDropDown();
	}

	UI.Widgets.Form.CustomElement.initialize();

	$('#news_list .news_collapse').live('click', function() {
		var item = $(this).parent();
		if ($(item).hasClass('open')) {
			$(item).find('.article').slideUp('fast', function() {
				item.removeClass('open');
			});
		} else {
			$(item).find('.article').slideDown('fast', function() {
				item.addClass('open');
			});
		}

		return false;
	});

	$('.atom_listing .atom_item .trigger_slideshow').bind('click', function() {
		$(this).parents('.atom_item').find('.monkeySlideshow').trigger('click');
		return false;
	});

	setContainerHeight();
	$(window).resize(setContainerHeight);

	// Prevent spamming on the play button
	$("#btn-play, a.playbutton, a.b_play_signup, a.play").click(mq.nav.lockPlayButton);

	if ( campaignCode ) {
		mq.user.setSessionData("xid", campaignCode);
	}
	
	
	// Mobile Browser Check
	
	if ( mq.isMobile ) {
		dojo.addClass(dojo.byId('bg-top'), 'mobile');
	}
});


}
/*
     FILE ARCHIVED ON 09:03:34 Jan 23, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 14:51:05 May 07, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.727
  exclusion.robots: 0.082
  exclusion.robots.policy: 0.07
  cdx.remote: 0.095
  esindex: 0.011
  LoadShardBlock: 88.291 (3)
  PetaboxLoader3.datanode: 40.822 (4)
  PetaboxLoader3.resolve: 90.515 (2)
  load_resource: 45.989
*/