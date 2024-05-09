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


jQuery.ajaxSetup({ type:"POST", dataType:'json' });

var heap = {
  SUCCESS: 1,
  FAILURE: 0
};

heap.form = {};
heap.submit = {};
heap.media = {};
heap.media.sizes = {};

heap.api = {};
heap.config = { language:'en' };
heap.labels = {};
heap.urlmap = {};


heap.config['deploymode'] = 'prod';
heap.config['heap_location'] = '/heap';
heap.config['http_root'] = 'https://web.archive.org/web/20140123090331/http://www.monkeyquest.com';
heap.config['request_uri'] = '../../../../../cache/heap.en3df8.js?v=42.0.5';
heap.config['script_url'] = '../../../../../cache/heap.en.js';
heap.config['upload_maxfiles'] = 50;
heap.config['upload_maxsize'] = '300MB';
heap.config['default_media_source'] = 'heap';
heap.config['default_media_store'] = 'LOCAL_DOCUMENTS';
heap.config['version'] = '1.5.1.44040';
heap.config['last_build'] = '2009-06-26';
heap.config['thread_max_depth'] = 3;
heap.config['atom_types'] = {'page':{'url_scheme':'/%meta.route%','meta_fields':{'route':{'label':'Url','type':'text','required':'1'},'template':{'label':'Template','type':'select','options':[{'value':'text','label':'Text'},{'value':'text-full','label':'Text Full'},{'value':'thumbs-grid','label':'Thumbs Grid'},{'value':'thumbs-list','label':'Thumbs List'},{'value':'video','label':'Video'},{'value':'full','label':'Full'}]},'hub':{'label':'Hub','type':'toggle'},'emphasis':{'label':'Emphasis','type':'toggle'},'cache_control':{'label':'Cache control','type':'select','options':[{'value':'cacheable_day','label':'Cacheable - 1 day'},{'value':'cacheable_halfday','label':'Cacheable - 12 hours'},{'value':'cacheable_long','label':'Cacheable - 1 hour'},{'value':'cacheable_short','label':'Cacheable - 10 minutes'},{'value':'peruser_long','label':'Per user - 1 hour'},{'value':'peruser_short','label':'Per user - 10 minutes'},{'value':'not_cacheable','label':'Not cacheable'}]}}},'news':{'meta_fields':{'category':{'label':'News category','type':'select','options':[{'value':'news','label':'News'},{'value':'maintenance','label':'Maintenance'},{'value':'event','label':'Event'}]},'cache_control':{'label':'Cache control','type':'select','options':[{'value':'cacheable_day','label':'Cacheable - 1 day'},{'value':'cacheable_halfday','label':'Cacheable - 12 hours'},{'value':'cacheable_long','label':'Cacheable - 1 hour'},{'value':'cacheable_short','label':'Cacheable - 10 minutes'},{'value':'peruser_long','label':'Per user - 1 hour'},{'value':'peruser_short','label':'Per user - 10 minutes'},{'value':'not_cacheable','label':'Not cacheable'}]}}},'external_link':{'meta_fields':{'route':{'label':'Url','type':'text','required':'1'},'emphasis':{'label':'Emphasis','type':'toggle'}}}};
heap.config['channel_types'] = {'normal':{'meta_fields':{'cache_control':{'label':'Cache control','type':'select','options':[{'value':'cacheable_day','label':'Cacheable - 1 day'},{'value':'cacheable_halfday','label':'Cacheable - 12 hours'},{'value':'cacheable_long','label':'Cacheable - 1 hour'},{'value':'cacheable_short','label':'Cacheable - 10 minutes'},{'value':'peruser_long','label':'Per user - 1 hour'},{'value':'peruser_short','label':'Per user - 10 minutes'},{'value':'not_cacheable','label':'Not cacheable'}]},'layout':{'label':'Grid','type':'custom','template':'ui/meta_layoutselector.html'}}}};
heap.config['reaction_types'] = ['comment','vote','answer_image','answer_text','answer_video'];
heap.config['user_meta'] = {'mqUser':{'type':'readonly-text','label':'MQ user'},'chatlevel':{'pcc':{'value_type':'number','meta_type':'choice','description':'Chat Level','editable':'1','choices':[1,2]},'type':'readonly-text','label':'Chat level'}};
heap.config['reaction_meta'] = [];
heap.config['media_meta'] = [];
heap.config['static_tag_prefixes'] = ['tag','category'];
heap.config['heap_logo'] = '../../../../../heap/static/heap/images/heap.html';
heap.config['heap_logo_mini'] = '../../../../../heap/static/heap/images/heap-mini.html';
heap.config['heap_module_location'] = '';
heap.config['current_language'] = 'en';
heap.config['plugins_location'] = '/heap_plugins';
heap.config['languages'] = ['en'];
heap.config['now_datetime'] = '2014-01-15 18:41:34';
heap.config['now_timestamp'] = 1389840094;
heap.config['now_date'] = '2014-01-15';
heap.config['now_time'] = '18:41:34';
heap.config['mce'] = '';
heap.config['panels_visibility'] = {'HEAPM_Atom':{'edit':{'basics':'1','custom':'1','meta':'1','text':'1','tags':'1','others':'1','seo':'','documents':'1'},'add':{'basics':'1','custom':'1','meta':'1','text':'1','tags':'1','others':'1','seo':'','documents':'1'}},'HEAPM_Channel':{'edit':{'basics':'1','custom':'1','meta':'1','text':'1','tags':'1','others':'1','seo':'','documents':'1'},'add':{'basics':'1','custom':'1','meta':'1','text':'1','tags':'1','others':'1','seo':'','documents':'1'}},'HEAPM_Reaction':{'edit':{'basics':'1','custom':'1','meta':'1','text':'1','tags':'1','others':'1','seo':'','documents':'1'},'add':{'basics':'1','custom':'1','meta':'1','text':'1','tags':'1','others':'1','seo':'','documents':'1'}},'HEAPM_Media':{'edit':{'basics':'1','custom':'1','meta':'1','text':'1','tags':'1','others':'1','seo':'','documents':'1'},'add':{'basics':'1','custom':'1','meta':'1','text':'1','tags':'1','others':'1','seo':'','documents':'1'}},'HEAPM_User':{'edit':{'basics':'1','custom':'1','meta':'1','text':'1','tags':'1','others':'1','seo':'','documents':'1'},'add':{'basics':'1','custom':'1','meta':'1','text':'1','tags':'1','others':'1','seo':'','documents':'1'}}};
heap.config['slug_selector_classes'] = {'HEAPM_Atom':{'api_class':'atoms','token':'atom'},'HEAPM_Channel':{'api_class':'channels','token':'channel'},'HEAPM_Reaction':{'api_class':'reactions','token':'reaction'},'HEAPM_User':{'api_class':'users','token':'user','show_field':'username'}};
heap.config['js_libs'] = [];
heap.config['cookie_domain'] = '.monkeyquest.com';
heap.config['heap_title'] = 'MonkeyQuest';

heap.urlmap['root'] = "";
heap.urlmap['app_admin'] = "/heap";
heap.urlmap['app_docs'] = "/docs";
heap.urlmap['app_reactions'] = "/reactions";
heap.urlmap['tools_jsconfig'] = "../../../../../tools/jslib.html";
heap.urlmap['api_amf'] = "/heap/amf";
heap.urlmap['api_json'] = "/heap/json";
heap.urlmap['app_admin_static'] = "/heap/static/heap";
heap.urlmap['app_lang'] = "/heap/language";
heap.urlmap['app_lang_fr'] = "/heap/language/fr";
heap.urlmap['app_lang_en'] = "/heap/language/en";
heap.urlmap['app_doc_api'] = "/heap/apidoc";
heap.urlmap['app_doc_env'] = "/heap/environment";
heap.urlmap['app_admin_tagger'] = "/heap/batchTagger";
heap.urlmap['app_admin_login'] = "/heap/login";
heap.urlmap['app_admin_logout'] = "/heap/logout";
heap.urlmap['app_admin_atoms'] = "/heap/atoms";
heap.urlmap['app_admin_channels'] = "/heap/channels";
heap.urlmap['app_admin_reactions'] = "/heap/reactions";
heap.urlmap['app_admin_docs'] = "/heap/docs";
heap.urlmap['app_admin_users'] = "/heap/users";
heap.urlmap['app_admin_redirects'] = "/heap/redirects";
heap.urlmap['app_admin_tags'] = "/heap/tags";
heap.urlmap['app_admin_queue'] = "/heap/queue";
heap.urlmap['app_admin_geoblocking'] = "/heap/geoblocking";
heap.urlmap['app_admin_atoms_drafts'] = "/heap/atoms/drafts";
heap.urlmap['app_admin_atoms_edit'] = "/heap/atoms/edit";
heap.urlmap['app_admin_channels_assign'] = "/heap/channels/assign";
heap.urlmap['app_admin_channels_edit'] = "/heap/channels/edit";
heap.urlmap['app_admin_docs_edit'] = "/heap/docs/edit";
heap.urlmap['app_admin_docs_list'] = "/heap/docs";
heap.urlmap['app_admin_docs_sizes'] = "/heap/docs/sizes";
heap.urlmap['app_admin_docs_modify'] = "/heap/docs/modify";
heap.urlmap['app_admin_docs_subtitles'] = "/heap/docs/subtitles";
heap.urlmap['app_admin_docs_upload'] = "/heap/docs/upload";
heap.urlmap['app_admin_docs_upload_meta'] = "/heap/docs/uploadMeta";
heap.urlmap['app_admin_docs_upload_tags'] = "/heap/docs/uploadTags";
heap.urlmap['app_admin_redirects_edit'] = "/heap/redirects/edit";
heap.urlmap['app_admin_geoblocking_edit'] = "/heap/geoblocking/edit";
heap.urlmap['app_admin_reactions_edit'] = "/heap/reactions/edit";
heap.urlmap['app_admin_users_edit'] = "/heap/users/edit";
heap.urlmap['app_admin_queue_activejobs'] = "/heap/queue/active_jobs";
heap.urlmap['app_admin_tags_list'] = "/heap/tags/list_all";
heap.urlmap['app_admin_lm'] = "/heap/layoutmanager";
heap.urlmap['app_admin_lm_layouts'] = "/heap/layoutmanager/layouts";
heap.urlmap['app_admin_lm_layouts_edit'] = "/heap/layoutmanager/layouts/edit";
heap.urlmap['app_admin_lm_blocks'] = "/heap/layoutmanager/blocks";
heap.urlmap['app_admin_lm_blocks_edit'] = "/heap/layoutmanager/blocks/edit";
heap.urlmap['app_admin_menus'] = "/heap/menus";
heap.urlmap['app_admin_menus_edit'] = "/heap/menus/edit";
heap.urlmap['host'] = "https://web.archive.org/web/20140123090331/http://www.monkeyquest.com/";
heap.urlmap['static'] = "/monkeyquest/static";
heap.urlmap['heap_static'] = "/heap/static";
heap.urlmap['monkeyquest_api_json'] = "https://web.archive.org/api/json/";
heap.urlmap['en'] = "/en";
heap.urlmap['index'] = "/en/home";
heap.urlmap['news'] = "/en/news";
heap.urlmap['embed'] = "/en/embed";
heap.urlmap['embedLogin'] = "/en/embed/login";
heap.urlmap['embedSignup'] = "/en/embed/signup";
heap.urlmap['embedCongratulation'] = "/en/embed/congratulation";
heap.urlmap['embedUk'] = "/en/embed/nick-uk";
heap.urlmap['mmot'] = "/en/mmot";
heap.urlmap['mmotSignup'] = "/en/mmot/signup";
heap.urlmap['mmotCongratulation'] = "/en/mmot/congratulation";
heap.urlmap['google'] = "/en/google";
heap.urlmap['googleSignup'] = "/en/google/signup";
heap.urlmap['googleCongratulation'] = "/en/google/congratulation";
heap.urlmap['signup'] = "/en/signup";
heap.urlmap['signupSave'] = "/en/signup?mode=save";
heap.urlmap['legacy'] = "/en/signup/legacy";
heap.urlmap['betaslick'] = "/en/fragments/signup/betaslick";
heap.urlmap['banana_milkshakes'] = "/en/fragments/signup/banana-milkshakes";
heap.urlmap['promo'] = "https://web.archive.org/en/fragments/promo/";
heap.urlmap['loginAd'] = "https://web.archive.org/en/fragments/loginAd/";
heap.urlmap['congratulation'] = "/en/signup/congratulation";
heap.urlmap['forgot_password'] = "/en/signup/forgot-password";
heap.urlmap['forgot_username'] = "/en/signup/forgot-username";
heap.urlmap['login'] = "/en/login";
heap.urlmap['loginNotificationsModeration'] = "/en/fragments/login/notifications/moderation";
heap.urlmap['logout'] = "/en/logout";
heap.urlmap['play'] = "/en/play";
heap.urlmap['playAnonymous'] = "/en/play?anonymous=1";
heap.urlmap['playEmbed'] = "/en/play?embed=1";
heap.urlmap['playEmbedAnonymous'] = "/en/play?embed=1&anonymous=1";
heap.urlmap['activate_account'] = "/en/activate-account";
heap.urlmap['parental_control'] = "/en/parental-control-center";
heap.urlmap['learn_more_ajax'] = "/en/fragments/signup/learn-more";
heap.urlmap['reg_closed_ajax'] = "/en/fragments/signup/closed";
heap.urlmap['error_ajax'] = "/en/fragments/signup/error";
heap.urlmap['error_max_acc_ajax'] = "/en/fragments/signup/error-max-accounts";
heap.urlmap['error_banned_email_ajax'] = "/en/fragments/signup/error-banned-email";
heap.urlmap['why_ajax'] = "/en/fragments/signup/why";
heap.urlmap['activation_ajax'] = "/en/fragments/signup/activation-flow";
heap.urlmap['help_cookies'] = "/en/help/cookies";
heap.urlmap['help_metroIe'] = "/en/help/metro-ie";
heap.urlmap['account_basics'] = "/en/fragments/my-account/basic";
heap.urlmap['account_settings_success'] = "/en/fragments/my-account/settings/success";
heap.urlmap['account_settings_error'] = "/en/fragments/my-account/settings/error";
heap.urlmap['downloadmp3'] = "/en/downloadmp3";
heap.urlmap['my_account_reset_pw'] = "/en/my-account/reset-password";
heap.urlmap['my_account_print_credentials'] = "/en/my-account/print-credentials";
heap.urlmap['my_account'] = "/en/my-account";
heap.urlmap['contact'] = "/en/contact";
heap.urlmap['terms_of_use'] = "/en/terms-of-use";
heap.urlmap['privacy_policy'] = "/en/privacy-policy";
heap.urlmap['fb_bumper'] = "/en/fragments/fb-bumper";
heap.urlmap['fblike_bumper'] = "/en/fragments/fblike-bumper";
heap.urlmap['faq'] = "/en/report-a-bug";
heap.urlmap['game_guide'] = "/en/game-guide";
heap.urlmap['media'] = "/en/Media";
heap.urlmap['mobile'] = "/en/mobile";
heap.urlmap['premiumCodeRedemption'] = "/en/code-redemption";
heap.urlmap['parentalControlCenter'] = "/en/parental-control-center";
heap.urlmap['refer'] = "/en/tell-a-friend";
heap.urlmap['referredUser'] = "https://web.archive.org/en/referred/";
heap.urlmap['parents'] = "/en/parents";
heap.urlmap['safety'] = "/en/safety";
heap.urlmap['waysToPlay'] = "/en/ways-to-play";
heap.urlmap['dlc_unsupported_platform'] = "/en/dlc/unsupported-platform";
heap.urlmap['dlc_download'] = "/en/dlc/download";
heap.urlmap['members_only'] = "/en/members-only";
heap.urlmap['community'] = "/en/community";
heap.urlmap['nchub_url'] = "https://web.archive.org/web/20140123090331/http://secure.nc.monkeyquest.com";
heap.urlmap['membership_url'] = "https://web.archive.org/web/20140123090331/http://secure.nc.monkeyquest.com/membership";
heap.urlmap['getnickcash_url'] = "https://web.archive.org/web/20140123090331/http://secure.nc.monkeyquest.com/getneocash";
heap.urlmap['xdcommNick_url'] = "https://web.archive.org/web/20140123090331/http://www.nick.com/asm/iframe/xdcomm.html";
heap.urlmap['forum_url'] = "https://web.archive.org/web/20140123090331/http://forums.monkeyquest.com/";
heap.urlmap['mobileSignupComplete'] = "mqmobile://www.monkeyquest.com/r/mobile/signup/complete";
heap.urlmap['js_heap'] = "../../../../../cache/heap.en.js";

heap.labels['default'] = [];
heap.labels['default']['menus_menu'] = "Navigation";
heap.labels['default']['manage_menus'] = "Manage navigation";
heap.labels['default']['m_structure'] = "Structure";
heap.labels['default']['add_menu'] = "Add navigation";
heap.labels['default']['edit_menu'] = "Edit navigation";
heap.labels['default']['layoutmanager'] = "Grid";
heap.labels['default']['menu_lm'] = "Grid";
heap.labels['default']['menu_lm_layouts'] = "Grids";
heap.labels['default']['menu_lm_blocks'] = "Blocks";
heap.labels['default']['html_body'] = "HTML Body";
heap.labels['default']['html_body_file'] = "HTML File";
heap.labels['default']['layout'] = "grid";
heap.labels['default']['manage_layouts'] = "Manage grids";
heap.labels['default']['add_layout'] = "Add grid";
heap.labels['default']['edit_layout'] = "Edit grid";
heap.labels['default']['block'] = "block";
heap.labels['default']['manage_blocks'] = "Manage blocks";
heap.labels['default']['add_block'] = "Add block";
heap.labels['default']['edit_block'] = "Edit block";
heap.labels['default']['mq_wrong_login'] = "Failed! Wrong username or password?";
heap.labels['default']['shard_logout_failed'] = "Failed to log out from the game server";
heap.labels['default']['user_not_logged_in'] = "User is not logged in";
heap.labels['default']['error_contacting_authser'] = "Error contacting game servers";
heap.labels['default']['invalid_session'] = "Session is invalid";
heap.labels['default']['shard_login_invalid'] = "Shard login is invalid";
heap.labels['default']['missing_username_login'] = "Missing username for login()";
heap.labels['default']['already_logged_in_another_computer'] = "Already logged in on another computer!";
heap.labels['default']['missing_username_getinfo'] = "Missing username for getinfo()";
heap.labels['default']['error_updating_heap_record'] = "Error update user record";
heap.labels['default']['mq_menu'] = "Monkey Quest";
heap.labels['default']['mq_panel'] = "Control panel";
heap.labels['default']['mq_panel_game'] = "Game service";
heap.labels['default']['mq_panel_registration'] = "Registration service";
heap.labels['default']['mq_panel_website'] = "Website service";
heap.labels['default']['mq_panel_game_availability'] = "Game state";
heap.labels['default']['mq_panel_game_message'] = "Game message";
heap.labels['default']['mq_panel_registration_availability'] = "Registration state";
heap.labels['default']['mq_panel_registration_message'] = "Registration message";
heap.labels['default']['mq_panel_website_availability'] = "Website state";
heap.labels['default']['mq_panel_website_message'] = "Website message";
heap.labels['default']['mq_panel_saving'] = "Saving properties";
heap.labels['default']['mq_panel_website_esi_state'] = "ESI Mode";
heap.labels['default']['mq_panel_website_caching_state'] = "Caching Mode";
heap.labels['default']['mq_registration_message_closed'] = "No longer accepting new players.";
heap.labels['default']['mq_registration_message_unavailable'] = "Registration is currently not available.";
heap.labels['default']['mq_website_message_maintenance'] = "The Monkey Quest site is currently under maintenance.";
heap.labels['default']['mq_game_message_down'] = "Please check back later.";
heap.labels['default']['date_F01'] = "January";
heap.labels['default']['date_F02'] = "February";
heap.labels['default']['date_F03'] = "March";
heap.labels['default']['date_F04'] = "April";
heap.labels['default']['date_F05'] = "May";
heap.labels['default']['date_F06'] = "June";
heap.labels['default']['date_F07'] = "July";
heap.labels['default']['date_F08'] = "August";
heap.labels['default']['date_F09'] = "September";
heap.labels['default']['date_F10'] = "October";
heap.labels['default']['date_F11'] = "November";
heap.labels['default']['date_F12'] = "December";
heap.labels['default']['date_M01'] = "Jan";
heap.labels['default']['date_M02'] = "Feb";
heap.labels['default']['date_M03'] = "Mar";
heap.labels['default']['date_M04'] = "Apr";
heap.labels['default']['date_M05'] = "May";
heap.labels['default']['date_M06'] = "Jun";
heap.labels['default']['date_M07'] = "Jul";
heap.labels['default']['date_M08'] = "Aug";
heap.labels['default']['date_M09'] = "Sep";
heap.labels['default']['date_M10'] = "Oct";
heap.labels['default']['date_M11'] = "Nov";
heap.labels['default']['date_M12'] = "Dec";
heap.labels['default']['date_l0'] = "Sunday";
heap.labels['default']['date_l1'] = "Monday";
heap.labels['default']['date_l2'] = "Tuesday";
heap.labels['default']['date_l3'] = "Wednesday";
heap.labels['default']['date_l4'] = "Thursday";
heap.labels['default']['date_l5'] = "Friday";
heap.labels['default']['date_l6'] = "Saturday";
heap.labels['default']['date_S01'] = "st";
heap.labels['default']['date_S02'] = "nd";
heap.labels['default']['date_S03'] = "rd";
heap.labels['default']['date_S04'] = "th";
heap.labels['default']['date_S05'] = "th";
heap.labels['default']['date_S06'] = "th";
heap.labels['default']['date_S07'] = "th";
heap.labels['default']['date_S08'] = "th";
heap.labels['default']['date_S09'] = "th";
heap.labels['default']['date_S10'] = "th";
heap.labels['default']['date_S11'] = "th";
heap.labels['default']['date_S12'] = "th";
heap.labels['default']['date_S13'] = "th";
heap.labels['default']['date_S14'] = "th";
heap.labels['default']['date_S15'] = "th";
heap.labels['default']['date_S16'] = "th";
heap.labels['default']['date_S17'] = "th";
heap.labels['default']['date_S18'] = "th";
heap.labels['default']['date_S19'] = "th";
heap.labels['default']['date_S20'] = "th";
heap.labels['default']['date_S21'] = "st";
heap.labels['default']['date_S22'] = "nd";
heap.labels['default']['date_S23'] = "rd";
heap.labels['default']['date_S24'] = "th";
heap.labels['default']['date_S25'] = "th";
heap.labels['default']['date_S26'] = "th";
heap.labels['default']['date_S27'] = "th";
heap.labels['default']['date_S28'] = "th";
heap.labels['default']['date_S29'] = "th";
heap.labels['default']['date_S30'] = "th";
heap.labels['default']['date_S31'] = "st";
heap.labels['default']['date_format'] = "%F %j%S %Y";
heap.labels['default']['validator_required'] = "Required field";
heap.labels['default']['validator_invalid_format'] = "Invalid format";
heap.labels['default']['ok'] = "okay";
heap.labels['default']['error'] = "error";
heap.labels['default']['next'] = "next";
heap.labels['default']['nojavascript'] = "JavaScript is needed to navigate this website. Make sure JavaScript is turned on.";
heap.labels['default']['reason'] = "Reason";
heap.labels['default']['hi'] = "Hi";
heap.labels['default']['login'] = "Login";
heap.labels['default']['logout'] = "Logout";
heap.labels['default']['signup'] = "Signup";
heap.labels['default']['language_en'] = "English";
heap.labels['default']['language_fr'] = "Français";
heap.labels['default']['language_es'] = "Espanol";
heap.labels['default']['copyright'] = "Viacom International, Inc. All Rights Reserved.";
heap.labels['default']['index'] = "Home";
heap.labels['default']['play'] = "Play";
heap.labels['default']['about'] = "About";
heap.labels['default']['beta_center'] = "Beta center";
heap.labels['default']['newsletter'] = "Newsletter";
heap.labels['default']['contact'] = "Contact";
heap.labels['default']['report_bug'] = "Report a Bug";
heap.labels['default']['terms_conditions'] = "Terms of Use";
heap.labels['default']['privacy_policies'] = "Privacy Policy";
heap.labels['default']['send_us_feedback'] = "Send Us Feedback";
heap.labels['default']['help_faq'] = "Help / FAQ";
heap.labels['default']['parental_control_center'] = "Parental Control Center";
heap.labels['default']['error_must_login'] = "You must login to do that.";
heap.labels['default']['error_click_here'] = "Click here";
heap.labels['default']['error_to_visit_homepage'] = "to visit home page";
heap.labels['default']['error404_title'] = "Oops! The page you're looking for could not be found.";
heap.labels['default']['error404_body'] = "(Error 404)";
heap.labels['default']['error500_title'] = "Server error";
heap.labels['default']['error500_body'] = "Please try again";
heap.labels['default']['error_something_wrong'] = "Oops! Something's gone wrong.";
heap.labels['default']['error_something_wrong_repeat'] = "Something has gone wrong. Please try again!";
heap.labels['default']['atom_not_found'] = "This content couldn't be found";
heap.labels['default']['error_invalid_email'] = "Oops! That's not a valid email. Please try again!";
heap.labels['default']['error_max_accounts1'] = "Oops! The email ";
heap.labels['default']['error_max_accounts2'] = " already has the maximum number of accounts. Please enter a different email.";
heap.labels['default']['error_mismatch_email'] = "Oops! Those emails don't match. Please try retyping them!";
heap.labels['default']['error_missing_email'] = "Please enter your email or unselect the checkbox above if you do not want to subscribe.";
heap.labels['default']['error_terms'] = "You have to accept the Terms of Use and Privacy Policy to register. If you do not accept them, you cannot register.";
heap.labels['default']['error_username_validator_length_short'] = "Oops! That username is too short. Please try again!";
heap.labels['default']['error_username_validator_length_long'] = "Oops! That username is too long. Please try again!";
heap.labels['default']['error_username_validator_format'] = "Letters, numbers or underscores only";
heap.labels['default']['error_username_not_available1'] = "Sorry! The username ";
heap.labels['default']['error_username_not_available2'] = " is not available. Try a different one, or choose one of these:";
heap.labels['default']['error_mismatch_password'] = "Oops! Your passwords don't match. Please try typing them again.";
heap.labels['default']['error_password_validator_length_short'] = "Oops! That password is too short. Please try again!";
heap.labels['default']['error_password_validator_length_long'] = "Oops! That password is too long. Please try again!";
heap.labels['default']['error_password_validator_format'] = "Oops! That password doesn't have at least 2 numbers in it. Please try again!";
heap.labels['default']['error_password_validator_username'] = "Oops! Your password cannot contain your username. Please try again!";
heap.labels['default']['error_password_validator_format_spaces'] = "Oops! That password has spaces in it. Please try again!";
heap.labels['default']['error_spaces_password'] = "Oops! That password has spaces in it. Please try again!";
heap.labels['default']['error_username_included_password'] = "Oops! Your password cannot contain your username. Please try again!";
heap.labels['default']['error_username_validator_required'] = "Oops! Please complete your username to continue.";
heap.labels['default']['error_invalid_date'] = "Oops! This date does not exist. Please check it.";
heap.labels['default']['error_missing_field'] = "Please complete the [Field name] field to continue.";
heap.labels['default']['error_missing_fields'] = "Please complete the [Field name], …, [Field name] fields to continue.";
heap.labels['default']['error_email_matching'] = "Sorry. The email address doesn't match the one we have on file. Please try again.";
heap.labels['default']['error_password_validator_match'] = "Oops! Your passwords do not match. Please try typing them again.";
heap.labels['default']['error_password_validator_required'] = "Oops! You need to enter a password. Please try again!";
heap.labels['default']['validator_unknown_email'] = "Oops! We don't have that email on file. Please try again.";
heap.labels['default']['error_date_validator_past'] = "Oops! This date does not exist. Please check it.";
heap.labels['default']['error_date_validator_format'] = "Oops! This date does not exist. Please check it.";
heap.labels['default']['error_email_validator_format'] = "Oops! That's not a valid email. Please try again!";
heap.labels['default']['error_email_validator_required'] = "Oops! That's not a valid email. Please try again!";
heap.labels['default']['error_email_validator_format_email'] = "Oops! That's not a valid email. Please try again!";
heap.labels['default']['error_email_banned1'] = "Oops! The email ";
heap.labels['default']['error_email_banned2'] = " is banned. Please enter a different email.";
heap.labels['default']['error_email_max_account1'] = "Oops! The email ";
heap.labels['default']['error_email_max_account2'] = " already has the maximum number of accounts. Please enter a different email.";
heap.labels['default']['error_email_validator_match'] = "Oops! Those emails don't match. Please try retyping them!";
heap.labels['default']['error_newsletter_already_member'] = "Oops! You are already on this list!";
heap.labels['default']['error_signup_email_banned'] = "Sorry! You cannot register on Monkey Quest.";
heap.labels['default']['error_email_reached_max_accounts'] = "Oops! The email you provided already has the maximum number of accounts. Please use a different email.";
heap.labels['default']['error_account_mismatch_password'] = "Please retype your new password.";
heap.labels['default']['error_registration_closed'] = "Registration is currently closed.";
heap.labels['default']['error_login_banned'] = "This account has been banned";
heap.labels['default']['error_account_login_ban_reason'] = "Sorry. Your account has been temporarily locked because you tried to login too many times. It's for your safety. Please try again later!";
heap.labels['default']['error_premium_code_redemption_already_redeemed'] = "Sorry, this code has been used.";
heap.labels['default']['error_premium_code_redemption_invalid'] = "Sorry, the code that you entered is incorrect. Please try again.";
heap.labels['default']['error_captcha_missing'] = "Please enter the characters shown in the image.";
heap.labels['default']['error_captcha_invalid'] = "Please enter the characters shown in the image.";
heap.labels['default']['error_captcha_not_played'] = "Play the mini-game above to prove you aren't a robot.";
heap.labels['default']['forgot_hint1'] = "Don't have an email address saved on file?";
heap.labels['default']['forgot_hint2'] = "Please contact Monkey Quest Support.";
heap.labels['default']['forgot_purge1'] = "If you haven't used your account in a while, it may have been deleted.";
heap.labels['default']['forgot_purge2'] = "Please sign up for a new account here";
heap.labels['default']['pager_page'] = "Page";
heap.labels['default']['pager_of'] = "of";
heap.labels['default']['pager_next'] = "Next";
heap.labels['default']['pager_previous'] = "Previous";
heap.labels['default']['login_box_username'] = "Username";
heap.labels['default']['login_box_password'] = "Password";
heap.labels['default']['username'] = "email or username";
heap.labels['default']['password'] = "password";
heap.labels['default']['username_empty'] = "Please enter a username";
heap.labels['default']['username_not_long_enough'] = "Your username must consist of at least 6 characters";
heap.labels['default']['password_empty'] = "Please provide a password";
heap.labels['default']['password_not_long_enough'] = "Your password must be at least 6 characters long";
heap.labels['default']['logging_in_please_wait'] = "Logging you in, please wait";
heap.labels['default']['login_successful_please_wait'] = "Login successful! please wait";
heap.labels['default']['label_enter_username'] = "Enter Username:";
heap.labels['default']['label_enter_password'] = "Enter Password:";
heap.labels['default']['logging_out'] = "Logging out...";
heap.labels['default']['logging_in'] = "Logging in...";
heap.labels['default']['label_your_email'] = "Your email address:";
heap.labels['default']['label_enter_your_email'] = "Enter your email address:";
heap.labels['default']['label_retype_your_email'] = "Retype your email address:";
heap.labels['default']['remember_user'] = "Remember my username";
heap.labels['default']['remember_pass'] = "Keep me logged in";
heap.labels['default']['remember_pass_notice'] = "Don't select this option if you're on a public computer!";
heap.labels['default']['login_dob'] = "The date of birth you provided does not match the one we have on file.";
heap.labels['default']['login_welcome_back'] = "Welcome back!";
heap.labels['default']['login_returning_title'] = "Returning players or new players who have a Nickelodeon account sign in here.";
heap.labels['default']['signup_title'] = "<strong>New</strong> Players";
heap.labels['default']['signup_subtitle'] = "Sign up!";
heap.labels['default']['login_forgot'] = "Forgot";
heap.labels['default']['login_forgot_username_short'] = "username";
heap.labels['default']['login_forgot_password_short'] = "password";
heap.labels['default']['login_forgot_username'] = "Forgot username?";
heap.labels['default']['login_forgot_password'] = "Forgot password?";
heap.labels['default']['login_hint'] = "Hint: You can use your Nickelodeon Virtual Worlds account to login.";
heap.labels['default']['login_hint1'] = "Already have a";
heap.labels['default']['login_hint2'] = "account?";
heap.labels['default']['login_nvw'] = "Nickelodeon Virtual Worlds";
heap.labels['default']['login_foot_dont_have_account'] = "Don't have a Nickelodeon Virtual Worlds Account?";
heap.labels['default']['login_foot_signup'] = "Sign up!";
heap.labels['default']['login_foot_free'] = "- it's free!";
heap.labels['default']['login_error_msg1'] = "Sorry. We did not recognize the information you entered. Please try again. You can only try logging in a few more times, so type carefully!";
heap.labels['default']['login_error_msg2'] = "Remember, your password is case sensitive. If you need a new account, ";
heap.labels['default']['login_please_signup_here'] = "please sign up here.";
heap.labels['default']['error_login_cannotplay_legacy'] = "Please complete signup before playing!";
heap.labels['default']['error_login_session_expired'] = "Please log in again in order to play!";
heap.labels['default']['error_login_cannotplay_groupmissing'] = "You are not part of the beta group!";
heap.labels['default']['newsletter_first_name'] = "First name";
heap.labels['default']['newsletter_email'] = "Email";
heap.labels['default']['newsletter_monkeyquest'] = "Monkey Quest newsletter";
heap.labels['default']['newsletter_nickelodeon'] = "Nickelodeon newsletter";
heap.labels['default']['newsletter_submit'] = "Submit";
heap.labels['default']['newsletter_thankyou'] = "Thank you";
heap.labels['default']['contact_name'] = "Name";
heap.labels['default']['contact_email'] = "Email";
heap.labels['default']['contact_message'] = "Message";
heap.labels['default']['contact_submit'] = "Submit";
heap.labels['default']['contact_thankyou'] = "Thank you";
heap.labels['default']['contact_subject'] = "Contact form submission";
heap.labels['default']['last_news'] = "Last news";
heap.labels['default']['news_none'] = "There are no news!";
heap.labels['default']['label_username'] = "Create Username:";
heap.labels['default']['label_password'] = "Create Password:";
heap.labels['default']['label_confirm_password'] = "Retype Password:";
heap.labels['default']['check_availability'] = "CHECK AVAILABILITY";
heap.labels['default']['label_available'] = "This name is available!";
heap.labels['default']['label_birthday'] = "Your Birthday:";
heap.labels['default']['label_month'] = "Month";
heap.labels['default']['label_day'] = "Day";
heap.labels['default']['label_year'] = "Year";
heap.labels['default']['month1'] = "January";
heap.labels['default']['month2'] = "February";
heap.labels['default']['month3'] = "March";
heap.labels['default']['month4'] = "April";
heap.labels['default']['month5'] = "May";
heap.labels['default']['month6'] = "June";
heap.labels['default']['month7'] = "July";
heap.labels['default']['month8'] = "August";
heap.labels['default']['month9'] = "September";
heap.labels['default']['month10'] = "October";
heap.labels['default']['month11'] = "November";
heap.labels['default']['month12'] = "December";
heap.labels['default']['select_country'] = "Select country";
heap.labels['default']['select_state'] = "Select state";
heap.labels['default']['label_select_country'] = "Select Country:";
heap.labels['default']['label_select_state'] = "Select State:";
heap.labels['default']['label_select_gender'] = "Select Gender:";
heap.labels['default']['label_enter_email'] = "Enter Your Email:";
heap.labels['default']['label_confirm_email'] = "Retype Your Email:";
heap.labels['default']['label_enter_parents_email'] = "Enter Parent's Email:";
heap.labels['default']['label_confirm_parents_email'] = "Retype Parent's Email:";
heap.labels['default']['label_mq_newsletter'] = "I'd like to get newsletters from Monkey Quest!";
heap.labels['default']['label_nick_newsletter'] = "I'd like to get newsletters from Nickelodeon!";
heap.labels['default']['label_agree_terms1'] = "I agree to the ";
heap.labels['default']['label_agree_terms2'] = " and ";
heap.labels['default']['intro_newsletter_email'] = "Please enter your email where you want the newsletters sent.";
heap.labels['default']['label_newsletter_email'] = "Enter Your Email:";
heap.labels['default']['step1_title'] = "Choose username and password";
heap.labels['default']['step2_title'] = "Select Location &amp; Enter Email";
heap.labels['default']['legacy_title'] = "We need a little more info...";
heap.labels['default']['progress_step_introduction'] = "Introduction";
heap.labels['default']['progress_step_info'] = "Your info";
heap.labels['default']['bubble_guess_location'] = "Did we guess the country you live in? If we did, you can leave it as is. If not, use the drop down menu to select the correct one. (Hey, we can't always be perfect!)";
heap.labels['default']['bubble_newsletter'] = "The Monkey Quest newsletter tells you what's new on the site and lets you in on lots of insider information!";
heap.labels['default']['error_signup'] = "Uh-oh! It looks like a problem occurred while you were creating your account.<br /> Please try again!";
heap.labels['default']['activate_head_msg'] = "You have not activated your account yet.";
heap.labels['default']['activate_now'] = "Activate now.";
heap.labels['default']['legacy_head_msg'] = "You have not completed the signup yet.";
heap.labels['default']['legacy_now'] = "Finish now.";
heap.labels['default']['activation_subject'] = "Monkey Quest - Account Activation";
heap.labels['default']['welcome_subject_adult'] = "Monkey Quest - Welcome";
heap.labels['default']['welcome_subject_child'] = "Your child has created an account on Monkey Quest";
heap.labels['default']['forgot_username_subject'] = "Monkey Quest - Lost Username";
heap.labels['default']['forgot_password_subject'] = "Monkey Quest - Lost Password";
heap.labels['default']['reset_password_subject'] = "Monkey Quest - Reset Password";
heap.labels['default']['referral_subject_with_name'] = "Your friend, %s, needs your help in Monkey Quest!";
heap.labels['default']['referral_subject'] = "Your friend needs your help in Monkey Quest!";
heap.labels['default']['activation_email_sent'] = "Activation Email Sent";
heap.labels['default']['activation_parent_sent'] = "<p>Thanks! We've re-sent an email to your parent with instructions to activate your account. </p><p>Please tell your parent to check his or her email!</p>";
heap.labels['default']['activation_email_sent_txt'] = "<p>Great! We've re-sent an activation email to the email address we have on file. Just click on the link in the email to activate your account.</p>";
heap.labels['default']['label_activation_code'] = "Activation Code:";
heap.labels['default']['activation_email_matching'] = "Sorry, the email address you entered does not match the parent email address we have on file. Please try again.";
heap.labels['default']['activation_email_validation'] = "Oops! That's not a valid email. Please try again!";
heap.labels['default']['activation_email_already'] = "Oops! Your account is already active!";
heap.labels['default']['please_enter_parent_email'] = "Please enter your Parent's email address";
heap.labels['default']['error_username_not_found'] = "Sorry. We did not recognize the username. Please try again!";
heap.labels['default']['error_email_validation'] = "Oops! That's not a valid email. Please try again!";
heap.labels['default']['error_email_required'] = "Please enter your email.";
heap.labels['default']['forgot_username_success'] = "<p>A message has been sent to that email address with your username. </p><p>If you do not receive a message please try again. Check to make sure emails from support@monkeyquest.com are not blocked by your email provider.</p>";
heap.labels['default']['forgot_password_success'] = "<p>A message has been sent to your email address with your password. </p><p>If you do not receive a message please try again. Check to make sure emails from support@monkeyquest.com are not blocked by your email provider.</p>";
heap.labels['default']['return_login'] = "Return to login";
heap.labels['default']['forgot_password_title'] = "FORGOTTEN PASSWORD";
heap.labels['default']['forgot_password_line1_part1'] = "If you don't have an account,";
heap.labels['default']['forgot_password_line1_part2'] = "click here";
heap.labels['default']['forgot_password_line1_part3'] = "to register.";
heap.labels['default']['forgot_password_line2_part1'] = "Just enter your Username in the box below and we'll email you a link to a page where you can create a new password.";
heap.labels['default']['forgot_password_line3_part1'] = "If you haven't used your account in a while, it may have been deleted. If so,";
heap.labels['default']['forgot_password_line3_part2'] = "please sign up for a new account here.";
heap.labels['default']['forgot_username_title'] = "FORGOTTEN USERNAME";
heap.labels['default']['forgot_username_line1_part1'] = "If you don't have an account,";
heap.labels['default']['forgot_username_line1_part2'] = "click here";
heap.labels['default']['forgot_username_line1_part3'] = "to register.";
heap.labels['default']['forgot_username_line2_part1'] = "Have you forgotten your username? No problem!";
heap.labels['default']['forgot_username_line3_part1'] = "Just enter the email address associated with your account and we will send your Username. This may be your parent's email address.";
heap.labels['default']['activation_parent_email'] = "Parent's Email Address";
heap.labels['default']['activation_parent_intro'] = "Please enter your parent's email address so we can re-send him or her instructions to activate your account.";
heap.labels['default']['error_username_profanity'] = "Sorry! This username is not allowed on Monkey Quest.";
heap.labels['default']['help_cookies'] = "Help | Cookies";
heap.labels['default']['error_error'] = "ERROR";
heap.labels['default']['error_sorry'] = "SORRY!";
heap.labels['default']['error_game_down'] = "GAME DOWN";
heap.labels['default']['error_site_down'] = "SITE DOWN";
heap.labels['default']['error_ie64bit_not_supported'] = "You can't play Monkey Quest on Internet Explorer (64-bit). Please try playing in another browser or <a href='/en/report-a-bug?questionID=15618'>click here</a> for more information!";
heap.labels['default']['error_closed'] = "SIGN UP CLOSED";
heap.labels['default']['error_login_not_beta_member'] = "Sorry! You are not a member of the Monkey Quest beta!";
heap.labels['default']['error_login_dob_mismatch'] = "The date of birth you provided does not match the one we have on file.";
heap.labels['default']['error_login_dob_required'] = "For your security, please provide your date of birth to login.";
heap.labels['default']['my_account'] = "My account";
heap.labels['default']['welcome'] = "Welcome";
heap.labels['default']['aging_form_title'] = "New Stuff!";
heap.labels['default']['aging_form_intro1'] = "Since you turned ";
heap.labels['default']['aging_form_intro2'] = ", you'll have some new settings available once you enter your email. You'll be able to manage your settings for all your sites in one place!</p><p>Also, if you ever forget your password, we can email you.";
heap.labels['default']['aging_form_intro'] = "<p>Since you turned [age], you'll have some new settings available once you enter your email. You'll be able to manage your settings for all your sites in one place!</p><p>Also, if you ever forget your password, we can email you.</p>";
heap.labels['default']['aging_thankyou'] = "<p>Thanks! We've updated your email. Please go to <a href='https://web.archive.org/web/20140123090331/http://www.monkeyquest.com/en/my-account'>Account Settings</a> to make changes to your account.</p>";
heap.labels['default']['aging_msg1'] = "Please ";
heap.labels['default']['aging_msg2'] = "enter your email";
heap.labels['default']['aging_msg3'] = "so that if you forget your password we can send it to you instead of your parent.";
heap.labels['default']['account_basic'] = "Basic info";
heap.labels['default']['account_change_email'] = "Change email";
heap.labels['default']['change_email_intro'] = "<p>We need your email on file to send you your password in case you forget it. Don't worry — we do not send spam!</p>";
heap.labels['default']['label_current_password'] = "Enter current password:";
heap.labels['default']['label_new_password'] = "Enter New Password:";
heap.labels['default']['label_new_password_confirm'] = "Retype Password:";
heap.labels['default']['save_changes'] = "Save changes";
heap.labels['default']['account_change_password'] = "Change Password";
heap.labels['default']['account_settings'] = "Settings";
heap.labels['default']['mq_chat'] = "Chat";
heap.labels['default']['easy_chat'] = "Easy chat &mdash; only phrases pre-approved by the Monkey Quest Team.";
heap.labels['default']['standard_chat'] = "Standard chat &mdash; only words pre-approved by the Monkey Quest Team.";
heap.labels['default']['account_region_title'] = "Server Region";
heap.labels['default']['account_region_label'] = "Region:";
heap.labels['default']['account_gamemode_title'] = "Game Mode";
heap.labels['default']['account_gamemode_fullsize'] = "Fullscreen";
heap.labels['default']['account_gamemode_normal'] = "Normal";
heap.labels['default']['account_onlogin_title'] = "Login Mode";
heap.labels['default']['account_onlogin_play'] = "Launch Game upon login";
heap.labels['default']['account_onlogin_home'] = "Go to Home Page upon login";
heap.labels['default']['account_newsletter'] = "Newsletters";
heap.labels['default']['account_newsletter_title'] = "Subscribe or Unsubscribe to Newsletters";
heap.labels['default']['mq_newsletter1'] = "Monkey Quest newsletter";
heap.labels['default']['mq_newsletter2'] = "Monkey Quest Beta newsletter";
heap.labels['default']['seo_title_default'] = "Monkey Quest | Virtual Worlds for Kids";
heap.labels['default']['seo_description_default'] = "Monkey Quest is Nickelodeon's new free-to-play, massively multiplayer online game (MMOG) set in the amazing World of Ook. Create your own Monkey and set off on exciting adventures to explore mysterious lands, battle monsters and discover the secrets of the lost Monkey King. Start your action-packed, fantasy filled adventure today.";
heap.labels['default']['seo_keywords_default'] = "Monkey quest, monkeyquest, monkey quest nickelodeon, monkeyquest nickelodeon, action game, fantasy game, mmo, mmog, mmo for kids, massively multiplayer online game, massively multiplayer online game for kids, massively multiplayer online game for kids and families, virtual world, virtual world game, nickelodeon virtual world";
heap.labels['default']['seo_title_login'] = "Login";
heap.labels['default']['seo_title_signup'] = "Signup";
heap.labels['default']['seo_title_activation'] = "Account activation";
heap.labels['default']['seo_title_myaccount'] = "My account";
heap.labels['default']['seo_title_congratulation'] = "Congratulations | Signup";
heap.labels['default']['need_flash_title'] = "This site requires Flash";
heap.labels['default']['need_flash_body'] = "<p>This site requires at least version 10 Flash player</p><p><a href='https://web.archive.org/web/20140123090331/http://get.adobe.com/flashplayer/' target='_blank'><img src='/monkeyquest/static/images/all/icons/get_flash_player.gif' alt='Get Adobe Flash Player' /></a></p>";
heap.labels['default']['signup_server_down'] = "The login server is currently not available!";
heap.labels['default']['login_server_down'] = "Oops! The login server is currently not available!";
heap.labels['default']['advertisement'] = "ADVERTISEMENT";
heap.labels['default']['fbbumper_title'] = "HEADS UP!";
heap.labels['default']['fbbumper_txt1'] = "<p>You are about to leave MonkeyQuest.com and the World of Ook to go to another website with a different set of rules. Remember: Always check with your parents before you give out information online!</p>";
heap.labels['default']['fbbumper_txt2'] = "<p>If you are not currently a Facebook.com member, please <a href='#' class='close_monkeybox'>click here</a> to return to Monkey Quest.</p>";
heap.labels['default']['fbbumper_wish_continue1'] = "If you wish to continue, please <br />";
heap.labels['default']['fbbumper_wish_continue2'] = "and click on the Facebook Like button again.";
heap.labels['default']['fbbumper_click_here'] = "CLICK HERE";
heap.labels['default']['error_authserv_spam'] = "Please try again.<br/>You can blame KA for this little mishap.";
heap.labels['default']['error_game_error'] = "Oops!";
heap.labels['default']['err_wrong_activation_code'] = "Oops! This is the wrong activation code!";
heap.labels['default']['parature_embed_login'] = "Log in to submit feedback";
heap.labels['default']['parature_embed_text'] = "Please sign in to use the Monkey Quest Support Center and review the status of existing support tickets. If you do not have an account or cannot remember your login, please submit a ticket using the link below.";
heap.labels['default']['parature_embed_anonymous'] = "SEND ANONYMOUS FEEDBACK";
heap.labels['default']['survey_text'] = "We need your help!<br />Tell us what YOU think!<br />Help us understand what's good, bad, or just okay about Monkey Quest.";
heap.labels['default']['referral_error_email_missing'] = "Oops, you'll need to fill in your friend's email to continue. ";
heap.labels['default']['referral_error_invalid_name'] = "Oops, we don't recognize that name. Try a new one.";
heap.labels['default']['referral_error_max_referrals_sent'] = "You've referred enough friends for today, Warrior.";
heap.labels['default']['referral_error_max_referrals_recieved'] = "This friend has already been referred today.";
heap.labels['default']['referral_copy_prompt'] = "Click to copy";
heap.labels['default']['referral_copy_complete'] = "Copied!";
heap.labels['default']['ingame_confirm_purchase'] = "Are you sure you want to buy this item<br><br>for a total of {total} NC?";
heap.labels['default']['ingame_insufficient_funds'] = "You don't have enough NickCash. Would<br><br>you like to get some?";

heap.media.sizes['square'] = new Object();
heap.media.sizes['square']['width'] = 100;
heap.media.sizes['square']['height'] = 100;
heap.media.sizes['square']['mode'] = 'crop';
heap.media.sizes['square']['crop'] = 'center';
heap.media.sizes['large'] = new Object();
heap.media.sizes['large']['width'] = 612;
heap.media.sizes['large']['height'] = 395;
heap.media.sizes['large']['mode'] = 'resize-crop';
heap.media.sizes['large']['dimension'] = 'min';
heap.media.sizes['medium'] = new Object();
heap.media.sizes['medium']['width'] = 299;
heap.media.sizes['medium']['height'] = 266;
heap.media.sizes['medium']['mode'] = 'resize-crop';
heap.media.sizes['medium']['dimension'] = 'min';
heap.media.sizes['ref'] = new Object();
heap.media.sizes['ref']['width'] = 400;
heap.media.sizes['ref']['height'] = 400;
heap.media.sizes['ref']['mode'] = 'resize';
heap.media.sizes['ref']['dimension'] = 'max';
heap.media.sizes['thumb_list'] = new Object();
heap.media.sizes['thumb_list']['width'] = 100;
heap.media.sizes['thumb_list']['height'] = 125;
heap.media.sizes['thumb_list']['mode'] = 'resize-crop';
heap.media.sizes['thumb_grid'] = new Object();
heap.media.sizes['thumb_grid']['width'] = 120;
heap.media.sizes['thumb_grid']['height'] = 90;
heap.media.sizes['thumb_grid']['mode'] = 'resize-crop';
heap.media.sizes['features'] = new Object();
heap.media.sizes['features']['width'] = 632;
heap.media.sizes['features']['height'] = 320;
heap.media.sizes['features']['mode'] = 'resize-crop';
heap.media.sizes['features_thumb'] = new Object();
heap.media.sizes['features_thumb']['width'] = 84;
heap.media.sizes['features_thumb']['height'] = 65;
heap.media.sizes['features_thumb']['mode'] = 'resize-crop';
heap.media.sizes['banner'] = new Object();
heap.media.sizes['banner']['width'] = 407;
heap.media.sizes['banner']['height'] = 86;
heap.media.sizes['banner']['mode'] = 'resize-crop';
heap.media.sizes['slide_thumb'] = new Object();
heap.media.sizes['slide_thumb']['width'] = 155;
heap.media.sizes['slide_thumb']['height'] = 117;
heap.media.sizes['slide_thumb']['mode'] = 'resize-crop';
heap.media.sizes['slide_thumb']['crop'] = 'center';
heap.media.sizes['slide_large'] = new Object();
heap.media.sizes['slide_large']['width'] = 531;
heap.media.sizes['slide_large']['height'] = 299;
heap.media.sizes['slide_large']['mode'] = 'crop';
heap.media.sizes['slide_large']['crop'] = 'center';
heap.media.sizes['small'] = new Object();
heap.media.sizes['small']['width'] = 300;
heap.media.sizes['small']['height'] = 300;
heap.media.sizes['small']['mode'] = 'resize';
heap.media.sizes['small']['dimension'] = 'max';
 



heap.translate = function (token, replacements, dict)
{
  if (!dict) dict = 'default';
  if (heap.labels[dict] && heap.labels[dict][token]) {
    var out = heap.labels[dict][token];
    if (replacements) {
      if (typeof(replacements) == 'string') replacements = [ replacements ];
      var type = typeof(replacements);
      
      if (type == 'object' || type == 'array') {
        for (var key in replacements) {
          var text = replacements[key];
          out = out.replace("{"+key+"}", text);
        }
      }
    }
    return out;
  } else
    return token + '-' + heap.config['current_language'];
};

heap.api.setup = function(setupParams)
{
  var target = setupParams['object'];
  var api_url = setupParams['url'];
  var api_class = setupParams['api_class'];
  var methods = setupParams['methods'];
  
  if(!target) throw new Error("Missing target for heap.api.setup");
  if(!api_url) throw new Error("Missing api_url for heap.api.setup");
  if(!api_class) throw new Error("Missing api_class for heap.api.setup");
  if(!methods) methods = new Array();
  
  for(var m = 0; m < methods.length; m++) (function(api_method)
  {
    target[api_method] = function(callback, params)
    {
      jQuery.ajax({
        url: api_url+'/'+api_class+'/'+api_method,
        data: { parameters: JSON.stringify(params) }, 
        success: callback
      }); 
    }
  })(methods[m]);
  
  
};

/** User API **/

heap.api.users = {};
heap.api.setup({
  object: heap.api.users,
  api_class:'users',
  url: heap.urlmap.api_json,
  methods: ['load','create','erase','edit','search','isloggedin','login','logout','usernameAvailability','checkEmailAvailability']
});


heap.api.users.login = function(callback, params)
{
  params['password'] = hex_md5(params['password']);
  
  jQuery.ajax({
    url: heap.urlmap.api_json+'/'+'users'+'/'+'login',
    data: { parameters: JSON.stringify(params) }, 
    success: callback
  }); 
}

/** Atoms API **/
heap.api.atoms = {};
heap.api.setup({
  object: heap.api.atoms,
  api_class:'atoms',
  url: heap.urlmap.api_json,
  methods: ['load','create','erase','edit','search','setRating','getMetaBlock','addTags','removeTags','setFavorite']
});


/** Channels API **/
heap.api.channels = {};
heap.api.setup({
  object: heap.api.channels,
  api_class:'channels',
  url: heap.urlmap.api_json,
  methods: ['load','create','erase','edit','search','getMetaBlock','addTags','removeTags','getFeaturesParams']
});


/** Documents API **/
heap.api.media = {};
heap.api.setup({
  object: heap.api.media,
  api_class:'media',
  url: heap.urlmap.api_json,
  methods: ['load','create','erase','edit','search','addTags','removeTags', 'crop', 'setFrame', 'rotate', 'searchAndRender']
});

/** Reactions API **/
heap.api.reactions = {};
heap.api.setup({
  object: heap.api.reactions,
  api_class:'reactions',
  url: heap.urlmap.api_json,
  methods: ['load','create','erase','edit','search','moderate']
});

/** Redirects API **/
heap.api.redirects = {};
heap.api.setup({
  object: heap.api.redirects,
  api_class:'redirects',
  url: heap.urlmap.api_json,
  methods: ['load','create','erase','edit','search', 'setRating']
});

/** Geoblocking API **/
heap.api.geoblocking = {};
heap.api.setup({
  object: heap.api.geoblocking,
  api_class:'geoblocking',
  url: heap.urlmap.api_json,
  methods: ['load','create','erase','edit','search']
});


/** Tags API **/
heap.api.tags = {};
heap.api.setup({
  object: heap.api.tags,
  api_class:'tags',
  url: heap.urlmap.api_json,
  methods: ['load', 'create', 'erase', 'rename', 'merge', 'renameDictionary', 'eraseDictionary', 'search', 'searchAndRender']
});


/** Queue API **/
heap.api.queues = {};
heap.api.setup({
  object: heap.api.queues,
  api_class:'queues',
  url: heap.urlmap.api_json,
  methods: ['read', 'ls', 'count']
});





}
/*
     FILE ARCHIVED ON 09:03:31 Jan 23, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:28:10 May 06, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.761
  exclusion.robots: 0.09
  exclusion.robots.policy: 0.078
  cdx.remote: 0.074
  esindex: 0.013
  LoadShardBlock: 177.524 (3)
  PetaboxLoader3.datanode: 63.354 (4)
  PetaboxLoader3.resolve: 121.005
  load_resource: 31.89
*/