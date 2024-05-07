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

/**
 * User
 */
dojo.setObject('mq.user', (function() {
	var username            = null,
		displayName         = null,
		authenticated       = false,
		authToken           = null,
		clientDisplayMode   = "normal",
		groupSize           = 0,
		isGroupLeader       = false,
		monkeyLevel         = null,
		activeQuestId       = null,
		activeQuestName     = null,
		gameRegion          = null,
		gameArea            = null,
		dob                 = null,
		age                 = null,
		gucid               = null,
		isChild             = null,
		accountCreationDate = null,
		campaignCode        = null,
		premium             = null,
		bananas             = null,
		pendingSessionData  = {"key[]": [], "value[]": []};

	var processPendingSessionData = (function() {
		var isProcessing = false,
			reProcess    = false;

		return function() {
			var data = pendingSessionData;

			if ( isProcessing ) {
				reProcess = true;
				return;
			}

			pendingSessionData = {"key[]": [], "value[]": []};
			isProcessing = true;

			dojo.xhrPost({
				url:          "/api/json/user_settings/session",
				content:      data,
				preventCache: true,
				handle:       function() {
					isProcessing = false;

					if ( reProcess && pendingSessionData["key[]"].length ) {
						reProcess = false;
						processPendingSessionData();
					} else {
						dojo.publish("mq/user/setSessionData/complete", [{
							keys:   data["key[]"],
							values: data["value[]"]
						}]);
					}
				}
			});
		};
	}());

	return response = {
		/**
		 * All or nothing
		 */
		setState: function(data) {
			if ( data ) {
				username      = data.username;
				displayName   = data.displayName;
				authenticated = data.authenticated;
				authToken     = data.token;
				dob           = data.dob;
				age           = data.age;
				gucid         = data.gucid;
				isChild       = data.isChild;
				campaignCode  = data.campaignCode;

				this.setAccountCreationDate(data.creationDate);

				if ( data.premium ) {
					premium = data.premium;
				}
			} else {
				username            = null;
				displayName         = null;
				authToken           = null;
				dob                 = null;
				age                 = null;
				gucid               = null;
				isChild             = null;
				accountCreationDate = null;
				campaignCode        = null;
			}
		},

		getUsername: function() {
			return username;
		},

		getDisplayName: function() {
			return displayName;
		},

		getAuthToken: function() {
			return authToken;
		},

		/**
		 * @return bool Returns true if the user is logged in; otherwise, false.
		 */
		isLoggedIn: function() {
			return !!$.cookie('x-mq-authenticated') || authenticated;
		},

		/**
		 * @return bool Returns true if the user has ever logged in before; otherwise, false.
		 */
		isReturning: function() {
			return mq.user.isLoggedIn() || !!$.cookie('x-mq-has-logged-in');
		},
		
		/**
		 * @return bool Returns true if the user signed up this session
		 */
		isNew: function() {
			return $.cookie("x-mq-user-new-signup");
		},

		/**
		 * Set the client display mode.
		 *
		 * @param string mode Either "normal" or "fullscreen"
		 */
		setClientDisplayMode: function(mode) {
			clientDisplayMode = mode;
		},

		/**
		 * @return string The current display mode (default is "normal")
		 */
		getClientDisplayMode: function() {
			return clientDisplayMode;
		},

		/**
		 * @return bool Returns true if the current display mode is "fullscreen."
		 */
		isFullscreen: function() {
			return clientDisplayMode == "fullscreen";
		},

		/**
		 * Should be called when a user groups up with other users.
		 *
		 * @param int size The number of users in the group.
		 * @param bool isLeader Whether or not the user is the leader of the group
		 */
		joinGroup: function(size, isLeader) {
			groupSize = size;
			isGroupLeader = !!isLeader;
		},

		/**
		 * Should be called when a user leaves a group.  Resets all group data to indiciate individual play mode.
		 */
		leaveGroup: function() {
			groupSize = 0;
			isGroupLeader = false;
		},

		/**
		 * Get the group info for the user
		 * @return object Returns an object with `size` and `isLeader` properties.
		 * @see joinGroup()
		 */
		getGroupInfo: function() {
			return {
				size:     groupSize,
				isLeader: isGroupLeader
			};
		},

		/**
		 * @return bool Returns true if the user is in a group (group size > 0).
		 * @see joinGroup()
		 */
		isGrouped: function() {
			return !!groupSize;
		},

		/**
		 * @param int level The level of the user's monkey.
		 */
		setMonkeyLevel: function(level) {
			var userCookie = UI.Util.Cookie.get('x-mq-user');

			monkeyLevel = level;

			if ( userCookie ) {
				userCookie.monkeyLevel = level;
				UI.Util.Cookie.set('x-mq-user', userCookie, 'https://web.archive.org/', heap.config.cookie_domain);
			}
		},

		/**
		 * @return int The level of the user's monkey.
		 */
		getMonkeyLevel: function() {
			return monkeyLevel;
		},

		/**
		 * @param string quest The current active quest that the user is on.
		 */
		setActiveQuest: function(questId, questName) {
			activeQuestId   = questId   || null;
			activeQuestName = questName || null;
		},

		/**
		 * Set the zone info for the player
		 *
		 * @param string region tribe region
		 * @param string area zone the player is in
		 */
		setGameZoneInfo: function(region, area) {
			gameRegion = region || null;
			gameArea   = area   || null;
		},

		getGameRegion: function() {
			return gameRegion;
		},

		getGameArea: function() {
			return gameArea;
		},

		setBananaBalance: function(balance) {
			bananas = balance;
		},

		/**
		 * @return string The current active quest that the user is on.
		 * @deprecated use getActiveQuestId()
		 */
		getActiveQuest: function() {
			return this.getActiveQuestId();
		},

		/**
		 * @return string The current active quest that the user is on.
		 */
		getActiveQuestId: function() {
			return activeQuestId;
		},

		/**
		 * @return string The current active quest that the user is on.
		 */
		getActiveQuestName: function() {
			return activeQuestName;
		},

		/**
		 * @return int The user's age, populated by SSO.
		 */
		getAge: function() {
			return age;
		},

		/**
		 * @return String The user's dob, populated by SSO (YYYY-MM-DD).
		 */
		getDob: function() {
			return dob;
		},

		/**
		 * @return bool Whether or not the user is a child, populated by SSO.
		 */
		isChild: function() {
			return isChild;
		},

		/**
		 * @return string The user's GUCID, populated by SSO.
		 */
		getId: function() {
			return gucid;
		},

		/**
		 * @return string The user's SSO account creation date (YYYY-MM-DD).
		 */
		getAccountCreationDate: function() {
			return accountCreationDate;
		},

		setAccountCreationDate: function(date) {
			if ( date && typeof date.getFullYear == "function" ) {
				date = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).substr(-2) + "-" + date.getDate();
			}

			accountCreationDate = date;

			return this;
		},

		/**
		 * @return string The user's referring campaign code (aka xid).
		 */
		getCampaignCode: function() {
			return campaignCode;
		},

		getBananaBalance: function() {
			return bananas;
		},

		/**
		 * Update the user's premium data. This data will be served from a local cache after the first request, and
		 * only updated after 5 minutes, regardless of how many times this method is called.
		 *
		 * @param function callback Will be called with either null if the user is not logged in, false if there
		 * is an error, or an object containing the user's premium info upon success. Always executed asynchronously.
		 * Required.
		 * @param bool forceUpdate True to ignore cached values and force an update the user's premium data. Optional.
		 */
		updatePremium: (function() {
			var useCache = false;

			return function(callback, forceUpdate) {
				if ( !this.isLoggedIn() ) {
					setTimeout(function() {
						callback(null);
					}, 1);
				}

				// Cached premium data exists and an update is not being forced
				if ( useCache && !forceUpdate ) {
					setTimeout(function() {
						callback(premium);
					}, 1);

					return;
				}

				$.ajax({
					url:      "/api/json/monkeyquest/premium",
					cache:    false,
					dataType: "json",
					success:  function(response) {
						if ( response.data && response.data.premium ) {
							useCache = true;
							premium  = response.data.premium;

							// Expire the local cache after 5 minutes (5 * 60 * 1000)
							setTimeout(function() {
								useCache = false;
							}, 300000);

							callback(premium);
						}
						else {
							callback(false);
						}
					}
				});
			};
		}()),

		/**
		 * Get user's premium (NC) balance
		 *
		 * @return int|false
		 */
		getPremiumBalance: function() {
			return premium ? premium.ncBalance : false;
		},

		/**
		 * Get whether or not the user is a member
		 *
		 * @return bool
		 */
		isMember: function() {
			return !!(premium && premium.membership);
		},

		/**
		 * @return the membership plan, if it exists; otherwise false.
		 */
		getPremiumMembershipPlanId: function() {
			return this.isMember() && premium.membership.planId;
		},

		setSessionData: function(key, value) {
			pendingSessionData["key[]"].push(key);
			pendingSessionData["value[]"].push(value);
			setTimeout(processPendingSessionData, 1);
		}
	};
}()) );


try {
	mq.user.setState($.parseJSON($.cookie("x-mq-user")));
} catch (e) {}


}
/*
     FILE ARCHIVED ON 09:03:33 Jan 23, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:28:12 May 06, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.566
  exclusion.robots: 0.078
  exclusion.robots.policy: 0.068
  cdx.remote: 0.055
  esindex: 0.009
  LoadShardBlock: 623.957 (3)
  PetaboxLoader3.datanode: 88.362 (4)
  PetaboxLoader3.resolve: 588.171 (2)
  load_resource: 86.758
*/