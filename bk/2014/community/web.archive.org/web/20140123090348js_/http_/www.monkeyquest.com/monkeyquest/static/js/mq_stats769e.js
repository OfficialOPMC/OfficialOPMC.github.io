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

dojo.setObject("MQStats.Marketing", {
	avatarCreated: function() {
		// Netx affiliate tracking (must be in an iframe, not an image)
		dojo.create("iframe", {
			src:   "https://web.archive.org/web/20140123090348/https://monkeyquest.ojrq.net/ifconv/?irchannel=1829&cid=850&custid=&oid=" + mq.user.getId(),
			style: "display: none"
		}, dojo.body());

		// These logging methods must be in their own page as they use document.write :(
		dojo.create("iframe", {
			src:   "/tracking/account/avatar-created?referer=" + (UI.Util.Cookie.get("x-mq-embed-home") || ""),
			style: "display: none"
		}, dojo.body());
	}
});
var dataSingleton = {
	viewProducts: null
};
dojo.setObject("MQStats.Omniture", {
	// Wrapper for sendPageCall that routes pageCalls to the appropriate suite
	executePageCall: function (obj) {
		var pageURL = location.host;
		
		MQStats.mtvnBtgInitOnce();
		
		if(obj.prop33 == "game" || obj.prop33 == "Play Load" || obj.prop33 == "Adoption Screen"	|| obj.eVar33 == "game" || obj.eVar33 == "Play Load" || obj.eVar33 == "Adoption Screen"){
			MQStats.overrideVisitorId();
			//if (pageURL.indexOf("-q.mtvi.com") > -1 || pageURL.indexOf("-q2.mtvi.com") > -1) {
				//btg.config.Omniture.account = "viamonkeyquestclientdev";
			//}else{
				btg.config.Omniture.account = "viamonkeyquestclient";
			//}
			
			
		}else if(obj.prop33 == "site" || obj.eVar33=="site"){
			
			if (pageURL.indexOf("-q.mtvi.com") > -1 || pageURL.indexOf("-q2.mtvi.com") > -1) {
				btg.config.Omniture.account = "viaviamonkeyquestdev";
			}else{
				btg.config.Omniture.account = "viamonkeyquest";
			}

		}else{
			this.log(obj.pageName + "is missing prop33/eVar33");
		}
		
	
		// debug output Page Call to console
		var mqDebugKey = this.getQSValue('mqdebug')
		if(mqDebugKey == "true"){
			var message = "***** Omniture - " + obj.pageName + " *****\n";
			this.log(message);
			this.log(obj);
		}
		
		mtvn.btg.Controller.sendPageCall(MQStats.preparePageCall(obj));
	},
	
	// Wrapper for sendLinkEvent that routes Omniture calls to the appropriate suite
	executeLinkEvent: function (obj) {
		
		if(obj.prop33 == "game" || obj.prop33 == "Play Load" || obj.prop33 == "Adoption Screen"
		|| obj.eVar33 == "game" || obj.eVar33 == "Play Load" || obj.eVar33 == "Adoption Screen"){
			
			
			btg.config.Omniture.account = "viamonkeyquestclient";
			
			
			
			MQStats.overrideVisitorId();
		}else if(obj.prop33 == "site" || obj.eVar33=="site"){
			btg.config.Omniture.account = "viamonkeyquest";
		}else{
			this.log(obj.linkName + "is missing prop33/eVar33");
		}
		
		// debug output Page Call to console
		var mqDebugKey = this.getQSValue('mqdebug')
		
		if(mqDebugKey == "true"){
			var message = "***** Omniture - " + obj.linkName + " *****\n";
			this.log(message);
			this.log(obj);
		}
		
		mtvn.btg.Controller.sendLinkEvent(obj);
	},
	
	
	/*** BEGIN DLC functions ***/
	
	//DLC Event
	linkDLCDownload: function() {
		try{	
			var linkObj = {
				linkName: "DLC Download",
				linkType: "o",
				eVar33: "site"
			};
			this.executeLinkEvent(linkObj);
		}catch(e){
			this.log(e);
		}
	},
	
	trackDLCLogin: function(){
		try{
			var pageObj = {
				pageName: 	"/DLC Login",
				prop2: 		"/DLC Login",
				eVar2: 		"/DLC Login",
				eVar33: 	"game",
				events:		""
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	trackDLCLaunch:function(){
		try{	
			var pageObj = {
				pageName: 	"/DLC Launch",
				prop2: 		"/DLC Launch",
				eVar2: 		"/DLC Launch",
				eVar33: 	"game",
				events:		""
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	trackDLCInstall: function(){
		try{	
			var pageObj = {
					pageName: 	"/DLC Install",
					prop2: 		"/DLC Install",
					eVar2: 		"/DLC Install",
					eVar33: 	"game",
					events:		""
				};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	trackDLCGameLaunch: function(experience){
		try{
			var pageObj = {
				
				pageName: "webclientStart",
				channel: "Application",
				prop33: "game",
				eVar33: "game",
				eVar49: "application",
				events: "event16"
			};
			
			if (typeof experience !== "undefined" || experience == "control") {
				pageObj.events += ",event41";
				pageObj.prop12 = "webclient";
				pageObj.eVar12 = "webclient";
			}
	
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	
	/*** END DLC functions ***/	
	//Achievements 
	trackAchievement: function(achieveId, milestoneId){
		try{
			var pageObj = {
				pageName: 	"/Achievement "+achieveId+"/Milestone "+milestoneId,
				prop2: 		"/Achievement "+achieveId+"/Milestone "+milestoneId,
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"/Achievement "+achieveId+"/Milestone "+milestoneId,
				eVar33:		"game",
				eVar37:		String(mq.user.getMonkeyLevel()),
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
			
				events:		""
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	
	trackAchievementComplete: function(achieveId){
		try{
			var pageObj = {
				pageName: 	"/Achievement Complete"+achieveId,
				prop2: 		"/Achievement Complete"+achieveId,
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"/Achievement Complete"+achieveId,
				eVar33:		"game",
				eVar37:		String(mq.user.getMonkeyLevel()),
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				
				events:		""
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	
	
    //DLC Event
    linkDLCDownload: function() {
        try{
        	var linkObj = {
	            linkName: "DLC Download",
	            linkType: "o",
	            eVar33: "site"
        	};
        	this.executeLinkEvent(linkObj);
        }catch(e){
        	
        }
    },
    
    
    //Achievements 
    trackAchievement: function(achieveId, milestoneId){
        var pageObj = {
            pageName:   "/Achievement "+achieveId+"/Milestone "+milestoneId,
            prop2:      "/Achievement "+achieveId+"/Milestone "+milestoneId,
            prop25:     com.monkeyquest.network.avgPingTime,
            prop26:     com.monkeyquest.client.frameRate,
            prop33:     "game",
            prop37:     String(mq.user.getMonkeyLevel()),
            prop40:     com.monkeyquest.sso_id,
            prop43:     location.pathname,
            
            eVar2:      "/Achievement "+achieveId+"/Milestone "+milestoneId,
            eVar33:     "game",
            eVar37:     String(mq.user.getMonkeyLevel()),
            eVar40:     com.monkeyquest.sso_id,
            eVar43:     location.pathname,
        
            events:     ""
        };
        this.executePageCall(pageObj);
    },
    
    trackAchievementComplete: function(achieveId){
        var pageObj = {
            pageName:   "/Achievement Complete"+achieveId,
            prop2:      "/Achievement Complete"+achieveId,
            prop25:     com.monkeyquest.network.avgPingTime,
            prop26:     com.monkeyquest.client.frameRate,
            prop33:     "game",
            prop37:     String(mq.user.getMonkeyLevel()),
            prop40:     com.monkeyquest.sso_id,
            prop43:     location.pathname,
            
            eVar2:      "/Achievement Complete"+achieveId,
            eVar33:     "game",
            eVar37:     String(mq.user.getMonkeyLevel()),
            eVar40:     com.monkeyquest.sso_id,
            eVar43:     location.pathname,
            
            events:     ""
        };
        this.executePageCall(pageObj);
    },    

	// simple event tracking
	eventTrack: function(eventName) {
		MQStats.mtvnBtgInitOnce();
		var linkObj= {
			linkName: eventName,
			linkType: "o",
			eVar33: "game"
		}
		this.executeLinkEvent(linkObj);
	},
	
	useSocialItem: function(itemID,region,area) {
		try{
			var pageObj = {
				pageName: 	"/Use Social Item " + itemID + "/" + region +"/"+ area,
				prop2Z: 		"/Use Social Item " + itemID + "/" + region +"/"+ area,
		
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
		
				prop69: 	String(mq.user.getCampaignCode()),
				
				eVar2: 		"/Use Social Item " + itemID + "/" +region+ "/" +area,
		
				eVar33:		"game",
				eVar37:		String(mq.user.getMonkeyLevel()),
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				eVar54:		itemID,
				eVar69: 	String(mq.user.getCampaignCode()),
				
				events:		""
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	
	deleteItem: function(userCountry,userGender,userAge,itemID,region,area){
		try{
			var pageObj = {
					pageName: 	"/Deleted "+itemID+"/"+region+"/"+area,
					channel:	region,
					hier1:		userCountry+"/"+userGender+"/"+userAge+"/Deleted "+itemID+"/"+region+"/"+area,
					prop2: 		"/Deleted "+itemID+"/"+region+"/"+area,
					prop7:		region,
					prop25: 	com.monkeyquest.network.avgPingTime,
					prop26: 	com.monkeyquest.client.frameRate,
					prop33:		"game",
					prop37:		String(mq.user.getMonkeyLevel()),
					prop40:		com.monkeyquest.sso_id,
					prop43: 	location.pathname,
					prop65:		itemID,
					prop69: 	String(mq.user.getCampaignCode()),
					
					eVar2: 		"/Deleted "+itemID+"/"+region+"/"+area,
					eVar7:		region,
					//eVar25: 	com.monkeyquest.network.avgPingTime,
					//eVar26: 	com.monkeyquest.client.frameRate,
					eVar33:		"game",
					eVar37:		String(mq.user.getMonkeyLevel()),
					eVar40:		com.monkeyquest.sso_id,
					eVar43: 	location.pathname,
					eVar65:		itemID,
					eVar69: 	String(mq.user.getCampaignCode()),
					
					events:		"event47"
			};
			if(mq.user.isLoggedIn() == true){
				pageObj.prop19 = userCountry;
				pageObj.prop20 = userGender;
				pageObj.prop21 = mq.user.getAge();
				pageObj.prop22 = String(mq.user.getAccountCreationDate());
				pageObj.prop71 = mq.user.isMember() ? "member" : "non member";
				
				pageObj.eVar19 = userCountry;
				pageObj.eVar20 = userGender;
				pageObj.eVar21 = mq.user.getAge();
				pageObj.eVar22 = String(mq.user.getAccountCreationDate());
				pageObj.eVar71 = mq.user.isMember() ? "member" : "non member";
				
			}else{
				pageObj.prop22 = "Not Registered";
				pageObj.eVar22 = "Not Registered";
			}
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	trackObjectInteraction: function(objectId, description, region, area){
		try{		
			var pageObj = {
					pageName: 	"/Interaction/ " + objectId + "/" + description +"/"+ region + "/" + area,
					
					prop2: 		"/Interaction/ " + objectId + "/" + description +"/"+ region + "/" + area,
					prop33:		"game",
					prop74:		objectId,
					
					eVar2: 		"/Interaction/ " + objectId + "/" + description +"/"+ region + "/" + area,
					eVar33:		"game",
					eVar74:		objectId,
					
					events:		""
				};
			//Halloween 2013 Event Tracking
			if(description == "Pumpkin Smashed"){
				pageObj.events = "event51";
			}else if(description == "Loot Collected"){
				pageObj.events = "event52";
			}
			
			if(description == "Pumpkin Smashed" || description == "Loot Collected"){
				this.executePageCall(pageObj);
			}
		}catch(e){
			this.log(e);
		}	
	},
	equipItem: function(itemId, description, region, area){
		try{
			var pageObj = {
					pageName: 	"/Equip/ "+itemId+"/"+ description +"/"+ region +"/"+ area,
					prop2: 		"/Equip/ "+itemId+"/"+ description +"/"+ region +"/"+ area,
					prop33:		"game",
					prop57:		itemId,

					
					eVar2: 		"/Equip/ "+itemId+"/"+ description +"/"+ region +"/"+ area,
					eVar33:		"game",
					eVar47:		itemId,
										
					events:		"event97"
				};
			
			if(description == "Ghost Amulet"){
				this.executePageCall(pageObj);
			}
			
		}catch(e){
			this.log(e);
		}
	},
	consumeItem: function(itemId, petType){
		try{
			var pageObj = {
					pageName: 	"/ConsumeItem/ "+itemId,
					prop2: 		"/ConsumeItem/ "+itemId,
					prop33:		"game",
					prop74:		itemId,
					prop75:		petType,
					
					eVar2: 		"/ConsumeItem/ "+itemId,
					eVar33:		"game",
					eVar74:		itemId,
					eVar75:		petType,
					
					
					events:		"event90"
				};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	viewProducts: function(vendorGoId, vendorId, pProducts){
		try{
			var dataObj = $.parseJSON(pProducts);//pProducts = JSON Array Object
			var sProducts = "";

			//AAPM - patch to prevent duplicate view product events until a long term solution is found
			if (dataObj.length < 1) {
				return;
			}

			if (dataObj == dataSingleton.viewProducts) {
				return; //repeat data
			}

			dataSingleton.viewProducts = dataObj;

			for(i=0; i < dataObj.length; i++){
				if((i+1) == dataObj.length){//process last product
					sProducts += ";" + dataObj[i].id;

				}else{
					sProducts += ";" + dataObj[i].id + ",";//process product
				}
			}
			var pageObj = {
				pageName:	"Vendor Store",
				prop2:		"Vendor Store",
				prop33:		"game",
				prop38:		vendorId,
				prop46:		mq.user.getPremiumBalance(),
				
				eVar2:		"Vendor Store",
				eVar33:		"game",
				eVar38:		vendorId,
				eVar46:		mq.user.getPremiumBalance(),
				
				products:	sProducts,
				events:		"prodView,event65"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	// when purchases an item (with bananas or nc) from one of the 'shops' in the game
	buyProducts: function(vendorGoId, vendorId, pProducts, isGift){
		try{
			var dataObj;
			//If not, wrap JSON in array [] 
			if (pProducts.charAt(0) != "[" || pProducts.charAt(pProducts.length-1) != "]"){
				dataObj = $.parseJSON('[' +pProducts + ']');//pProduct = JSON String
			}else{
				dataObj = $.parseJSON(pProducts);//pProducts = JSON Array Object
			}

			var trackBananas = false;
			var trackNC = false;
			var sProducts = "";
			var sEvent = "";
			var productMax = 24; //zero based limit on products tracked (default 25 products)
			//Set currency events switches, construct product variable
			for(i=0; i < dataObj.length; i++){
				if(i<=productMax){
					//determine event tracking
					if(dataObj[i].currencyType == "NC"){  //if(dataObj[i].c == "NC"){
						trackNC = true;//event3
						sEvent = "event3";
					}else{
						trackBananas = true;//event2
						sEvent = "event2";
					}
					//create product variable
					if((i+1) == dataObj.length || (i+1) > productMax ){//process last product
						sProducts += ";" + String(dataObj[i].id) + ";;;" + sEvent + "=" +dataObj[i].price;

					}else{//process product
						sProducts += ";" + String(dataObj[i].id) + ";;;" + sEvent + "=" +dataObj[i].price + ",";
					}
				}else{
					break;//no more products tracked
				}
			}
			//Create Page Call
			var pageObj = {
				pageName: 	"/BuyProducts/",
				
				prop2: 		"/BuyProducts/",
				prop33:		"game",
				prop38:		vendorId,
				
				eVar2: 		"/BuyProducts/",
				eVar33:		"game",
				eVar38:		vendorId,
				
				products:	sProducts,
				events: ""
			};
			//Page Call Mods
			if(trackNC == true && trackBananas == true){//Both NC and Bananas
				pageObj.events = "event2,event91,event3,event66";
				pageObj.prop46 = mq.user.getPremiumBalance();
				pageObj.prop48 = mq.user.getBananaBalance();
				pageObj.eVar46 = mq.user.getPremiumBalance();
				pageObj.eVar48 = mq.user.getBananaBalance();

			}else if (trackNC == true && trackBananas == false) {//Only NC
				pageObj.events = "event3,event66";
				pageObj.prop46 = mq.user.getPremiumBalance();
				pageObj.eVar46 = mq.user.getPremiumBalance();

			}else if (trackNC == false && trackBananas == true) {//Only Bananas
				pageObj.events = "event2,event91";
				pageObj.prop48 = mq.user.getBananaBalance();
				pageObj.eVar48 = mq.user.getBananaBalance();
			}
			
			//If a gift, set event
			if(isGift == true || isGift.toLowerCase() == "true"){
				pageObj.events = pageObj.events + ",event96";
			}			
			
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	addProduct: function(pProduct){
		try{
			var dataObj = $.parseJSON('[' +pProduct + ']');//pProduct = JSON String
			var sProducts = ";" + dataObj[0].id;

			//Create Page Call
			var pageObj = {
					pageName: 	"/AddProduct/"+ dataObj[0].id,
					prop2: 		"/AddProduct/"+ dataObj[0].id,
					prop33:		"game",
					eVar2: 		"/AddProduct/"+ dataObj[0].id,
					eVar33:		"game",
					products:	sProducts,
					events:		"scAdd"
			};
			//Page Call Mods
			if(dataObj[0].currencyType == "NC"){//NC
				pageObj.prop46 = mq.user.getPremiumBalance();
				pageObj.eVar46 = mq.user.getPremiumBalance();
			}else{//Bananas
				pageObj.prop48 = mq.user.getBananaBalance();
				pageObj.eVar48 = mq.user.getBananaBalance();
			}
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	removeProduct: function(pProduct){
		try{
			var dataObj = $.parseJSON('[' +pProduct + ']');//pProduct = JSON String
			var sProducts = ";" + dataObj[0].id;
			//Create Page Call
			var pageObj = {
					pageName: 	"/RemoveProduct/"+ dataObj[0].id,
					prop2: 		"/RemoveProduct/"+ dataObj[0].id,
					prop33:		"game",
					eVar2: 		"/RemoveProduct/"+ dataObj[0].id,
					eVar33:		"game",
					products:	sProducts,
					events:		"scRemove"
			};
			//Page Call Mods
			if(dataObj[0].currencyType == "NC"){//NC
				pageObj.prop46 = mq.user.getPremiumBalance();
				pageObj.eVar46 = mq.user.getPremiumBalance();
			}else{
				pageObj.prop48 = mq.user.getBananaBalance();
				pageObj.eVar48 = mq.user.getBananaBalance();
			}
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	trackGetNC: function(){
		try{
			var pageObj = {
				linkName: 	"NC Mall Get NC Button",
				linkType: 	"o",
				eVar66: 	"NC Mall Get NC Button",
				eVar33: 	"game",
				events:   	"event60"
			};
			this.executeLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	buyTrailKey: function(pProduct){
		try{
			var dataObj = $.parseJSON('[' +pProduct + ']');//pProduct = JSON String
			var trackBananas = false;
			var trackNC = false;
			var sEvent = "";
			var sProducts = ";" + String(dataObj[0].id) + ";;;event3=" +dataObj[0].price;
			//Create Page Call
			var pageObj = {
				pageName: 	"/BuyTrailKey/"+ dataObj[0].id,
				prop2: 		"/BuyTrailKey/"+ dataObj[0].id,
				prop33:		"game",
				prop46: 	mq.user.getPremiumBalance(),
				eVar2: 		"/BuyTrailKey/"+ dataObj[0].id,
				eVar33:		"game",
				eVar46: 	mq.user.getPremiumBalance(),
				products:	sProducts,
				events:		"event3,event66"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},

	trackReferInvite: function(){
		try{
			var today = new Date();

			this.executePageCall({
				pageName: 	"Tell your friends page",
				prop2: 		"Tell your friends page",
				prop73: 	today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
				eVar2: 		"Tell your friends page",
				eVar73: 	today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
				events:		"event88"
			});
		}catch(e){
			this.log(e);
		}
	},

	trackReferAccept: function(){
		try{
			var xid    = this.getQSValue('xid'),
				rcdate = this.getQSValue('rcdate'),
				acdate = this.getQSValue('acdate');

			//Create Page Call
			var pageObj = {
				pageName: 	"Referee landing page",
				prop2: 		"Referee landing page",
				prop34:		xid,//xid
				prop33:		"site",
				prop60:		xid,//xid
				prop61:		xid,//xid
				prop42: 	acdate,
				prop73: 	rcdate,
				eVar2: 		"Referee landing page",
				eVar34:		xid,//xid
				eVar33:		"site",
				eVar60:		xid,//xid
				eVar61:		xid,//xid
				eVar42: 	acdate,
				eVar73: 	rcdate,
				events:		"event89"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},


	// monkey has died, track when a user's monkey is killed
	monkeyDeath: function(){
		try{
			var pageObj = {
				linkName: "Monkey Death",
				linkType: "o",
				eVar33: "game",
				events:   "event5"
			};
			this.executeLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
	},

	//Tribe Changes
	tribeMemberUpdate: function(tribeId){
		try{
			var pageObj = {
				pageName:	"TribeMemberUpdate",
				prop33: 	"game",
				prop63: 	tribeId,
				eVar33:		"game",
				eVar63: 	tribeId,
				events:     ""
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},

	//Emotes
	emoteSelectionStarted: function(emoteList){
		try{
			var pageObj = {
				pageName:	"Popup/Emotes",
				list2:		emoteList,
				eVar33:		"game",
				events:		"event59"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},

	emoteSelected: function(emoteName){
		try{
			var pageObj = {
				pageName: "Popup/EmoteSelected",
				list2:	emoteName,
				eVar33:		"game",
				events:	"event60"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
/* ********** In Game - Popup Tracking Functions Begin ************ */

	//*** Membership Popup Tracking ***

	//When Membership Popup Appears
	trackMembershipPopup: function(){
		try{
			if(mq.user.isMember() == false){
				var pageObj = {
					pageName: 	"Popup Hud membership",
					prop66: 	"Hud membership",
					eVar66: 	"Hud membership",
					eVar33:		"game",
					events: 	"event59"
				};
				this.executePageCall(pageObj);
			}
		}catch(e){
			this.log(e);
		}
	},
	//When Become a Member button is clicked
	linkMembership: function(){
		try{
			if(mq.user.isMember() == false){
				var pageObj = {
					linkName:	"In game - Hud Become a member",
					linkType:	"o",
					eVar33: 	"game",
					eVar66: 	"Hud membership",
					
					events:		"event60"
				};
				this.executeLinkEvent(pageObj);
			}
		}catch(e){
			this.log(e);
		}
	},

	// *** Map Popup Tracking ***

	//When the map popup appears
	trackMapPopup: function(){
		try{
			if(mq.user.isMember() == false){
				var pageObj = {
					pageName: 	"Popup Map",
					eVar33:		"game",
					prop66: 	"Popup Map",
					eVar66: 	"Popup Map",
					events: 	"event59"
				};
				this.executePageCall(pageObj);
			}
		}catch(e){
			this.log(e);
		}
	},
	//When Become a Member button is clicked
	linkMapMembership: function(){
			try{
			if(mq.user.isMember() == false){
					var pageObj = {
						linkName:	"Map Become a member",
						linkType:	"o",
						eVar33: 	"game",
						eVar66: 	"Popup Map",
						events:		"event60"
					};
				this.executeLinkEvent(pageObj);
				}
			}catch(e){
				this.log(e);
		}
	},

	// *** Nick Cash Popup Tracking ***

	//When Not Enough Nick Cash Popup appears
	trackNCPopup: function(){
		try{
			var pageObj = {
				pageName: 	"Popup NC Mall Not enough NC",
				prop66: 	"NC Mall Not enough NC",
				eVar33:		"game",
				eVar66: 	"NC Mall Not enough NC",
				events: 	"event35"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},

	// *** Premium Trail Popup ***
	//When Premium Trail Popup appears
	trackPremiumTrailPopup: function(trailName,premium){
		try{
			var sPageName = "";
			if(typeof trailName == 'undefined'){
				sPageName = " ";
			}else{
				sPageName = " " + trailName + " ";
			}

			if(mq.user.isMember() == false){
				var pageObj = {
					pageName: 	"Popup" + sPageName + "Get Access",
					prop66: 	"Premium" + sPageName + " Event Get Access",
					eVar66: 	"Premium" + sPageName + " Event Get Access",
					prop59: 	trailName,
					eVar59: 	trailName,
					eVar33:		"game",
					events: 	"event59"
				};
				this.executePageCall(pageObj);
				}
		}catch(e){
			this.log(e);
		}
	},
	//When Premium Trail Get Access button is clicked
	linkPremiumTrail: function(trailID,premium){
		try{
			var sLinkName = "";
			if(typeof trailID == 'undefined'){
				sLinkName = " ";
			}else{
				sLinkName = " " + trailID + " ";
			}

			if(mq.user.isMember() == false){
				var pageObj = {
						linkName:	"In Game - Premium" + sLinkName + "Portal Get Access ",
						linkType:	"o",
						eVar33: 	"game",
						eVar66:  	"Premium" + sLinkName + "Portal Get Access",
						events:		"event60"
					};
				this.executeLinkEvent(pageObj);
			}
		}catch(e){
			this.log(e);
		}
	},
	// *** Premium Trail Instant Buy

	//When Premium Trail Instant Buy popup appears
	trackPremiumTrailBuy: function(trailID,premium){
		try{
			var sPageName = "";
			if(typeof trailID == 'undefined'){
				sPageName = " ";
			}else{
				sPageName = " " + trailID + " ";
			}
			if(mq.user.isMember() == false){
				var pageObj = {
					pageName: 	"Popup Premium" +sPageName+ "Event Instant Buy",
					prop58: 	"Premium" +sPageName+ "Event Instant Buy",
					eVar58: 	"Premium" +sPageName+ "Event Instant Buy",
					eVar33:		"game",
					events: 	"event61"
				};
				this.executePageCall(pageObj);
			}
		}catch(e){
			this.log(e);
		}
	},
	//When Premium Trail Instant Buy - Buy Trail Key button is clicked
	linkPremiumTrailBuyKey: function(){
		try{
			if(mq.user.isMember() == false){
				var pageObj = {
					linkName:	"In game - Premium Trail Buy Key",
					linkType:	"o",
					eVar33: 	"game",
					eVar58: 	"Premium Trail Instant Buy",
					events:		"event62,event63"
				};
				this.executeLinkEvent(pageObj);
			}
		}catch(e){
			this.log(e);
		}
	},
	//When Premium Trail Instant Buy - Become a Member button is clicked
	linkPremiumTrailBuyMember: function(trailID,premium){
		try{
			var sLinkName = " ";
			if(typeof trailID == 'undefined'){
				sLinkName = " ";
			}else{
				sLinkName = " " + trailID + " ";
			}
			if(mq.user.isMember() == false){
				var pageObj = {
					linkName:	"In game - Premium" + sLinkName + " Event Become a Member",
					linkType:	"o",
					eVar33: 	"game",
					eVar58: 	"Premium" + sLinkName + " Event Instant Buy",
					events:" 	event62,event64"
				};
				this.executeLinkEvent(pageObj);
			}
		}catch(e){
			this.log(e);
		}
	},


	// *** Premium Quest Popup
	//When Premium Quest Popup Appears
	trackPremiumQuestPopup: function(){
		try{
			if(mq.user.isMember() == false){
				var pageObj = {
					pageName: 	"Popup Premium Quest Get Access",
					prop66: 	"Premium Quest Get Access",
					eVar66: 	"Premium Quest Get Access",
					eVar33:		"game",
					events: 	"event59"
				};
				this.executePageCall(pageObj);
			}
		}catch(e){
			this.log(e);
		}
	},
	//When the Premium Quest Get Access button is clicked
	linkPremiumQuest: function(){
		try{
			if(mq.user.isMember() == false){
				var pageObj = {
					linkName:	"In Game - Premium Quest Get Access ",
					linkType:	"o",
					eVar33:		"game",
					eVar66: 	"Premium Quest Get Access",
					events:		"event60"
				};
				this.executeLinkEventEvent(pageObj);
			}
		}catch(e){
			this.log(e);
		}
	},
	// *** Premium Quest Instant Buy
	//When the Premium Quest Instant Buy popup appears
	trackPremiumQuestBuy: function(){
		try{
			if(mq.user.isMember() == false){
				var pageObj = {
					pageName: 	"Popup Premium Quest Instant Buy",
					prop58: 	"Premium Quest Instant Buy",
					eVar58: 	"Premium Quest Instant Buy",
					eVar33:		"game",
					events: 	"event61"
				};
				this.executePageCall(pageObj);
			}
		}catch(e){
			this.log(e);
		}
	},
	//When the Premium Quest Instant Buy - Buy Trail Key button is clicked
	linkPremiumQuestBuyKey: function(){
		try{
			if(mq.user.isMember() == false){
				var pageObj = {
					linkName:	"In game - Premium Quest Buy Key",
					linkType:	"o",
					eVar33:		"game",
					eVar58: 	"Premium Quest Instant Buy",
					events:		"event62,event63"
				};
				this.executeLinkEvent(pageObj);
			}
		}catch(e){
			this.log(e);
		}
	},
	//When the Premium Quest Instant Buy - Become a Member button is clicked
	linkPremiumQuestBuyMember: function(){
		try{
			if(mq.user.isMember() == false){
				var pageObj = {
					linkName: 	"In game - Premium Quest Become a Member",
					linkType:	"o",
					eVar33:		"game",
					eVar58: 	"Premium Quest Instant Buy",
					events:		"event62,event64"
				};
				this.executeLinkEvent(pageObj);
			}
		}catch(e){
			this.log(e);
		}
	},
	// *** NC Mall Notification ***

	//When NC Mall Notification Popup appears
	trackNCMallNotification: function(itemList){
		try{
			var sProducts = "";
			for(var i=0; i < itemList.length; i++){
				if((i+1) == itemList.length){//process last product
					sProducts += ";" + itemList[i];

				}else{
					sProducts += ";" + itemList[i] + ",";//process product
				}
			}

			var pageObj = {
				pageName: 	"Popup NC Mall notification",
				prop66: 	"NC Mall notification",
				eVar66: 	"NC Mall notification",
				eVar33:		"game",
				products: 	sProducts,
				events: 	"prodView,event59"
				};

			// Parse itemList to format for productList variable */
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	//When an NC Mall item is picked and clicked
	linkNCMallNotification: function(){
		try{
			var pageObj = {
				linkName:	"In game - NC Mall notification Pick Item",
				linkType:	"o",
				eVar33:		"game",
				eVar66: 	"NC Mall notification",
				events:		"event60"
			};
			this.executeLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	// *** Instant Revive ***
	//When the Revive Popup Appears
	trackInstantRevivePopup: function(){
		try{
			if(mq.user.isMember() == false){
				var pageObj = {
					pageName: 	"Popup Instant Revive Become a Member",
					prop66: 	"Instant Revive",
					eVar66: 	"Instant Revive",
					eVar33:		"game",
					events: 	"event59"
				};
				this.executePageCall(pageObj);
			}
		}catch(e){
			this.log(e);
		}
	},
	//When the Revive Popup - Become a Member button is clicked
	linkInstantRevive: function(){
		try{
			if(mq.user.isMember() == false){
				var pageObj = {
					linkName:	"In game - Instant Revive Become a Member ",
					linkType:	"o",
					eVar33:		"game",
					eVar66: 	"Instant Revive",
					events:		"event60"
				};
				this.executeLinkEvent(pageObj);
			}
		}catch(e){
			this.log(e);
		}
	},

	// *** Tribe Starter Pack ***

	//When the Tribe Starter Pack popup appears
	trackTribeStarterPackPopup: function(){
		try{
			if(mq.user.isMember() == false){
				var pageObj = {
					pageName: 	"Popup Tribe starter pack Get Access",
					prop66: 	"Tribe starter pack Get Access",
					eVar66: 	"Tribe starter pack Get Access",
					eVar33:		"game",
					events: 	"event59"
				};
				this.executePageCall(pageObj);
			}
		}catch(e){
			this.log(e);
		}
	},
	//When the Tribe Starter Pack - Get Access Button is clicked
	linkTribeStarterPack: function(){
		try{
			if(mq.user.isMember() == false){
				var pageObj = {
					linkName:	"In game - Instant Tribe starter pack ",
					linkType:	"o",
					eVar33:		"game",
					eVar66: 	"Tribe starter pack Get Access",
					events:		"event60"
				};
				this.executeLinkEvent(pageObj);
			}
		}catch(e){
			this.log(e);
		}
	},
	// *** Tribe Instant Buy  ***
	//When the Tribe Starter Pack Instant Buy appears
	trackTribeStarterBuy: function(){
		try{
			if(mq.user.isMember() == false){
				var pageObj = {
					pageName: 	"Popup Tribe starter pack Instant Buy",
					prop58: 	"Tribe starter pack Instant Buy",
					eVar58: 	"Tribe starter pack Instant Buy",
					eVar33:		"game",
					events: 	"event61"
				};
				this.executePageCall(pageObj);
			}
		}catch(e){
			this.log(e);
		}
	},
	//When the Tribe Starter Pack Instant Buy - Buy Trail Key button is clicked
	linkTribeStarterBuyKey: function(){
		try{
			if(mq.user.isMember() == false){
				var pageObj = {
					linkName:	"In game - Tribe starter pack Instant Buy Key",
					linkType:	"o",
					eVar33:		"game", 
					eVar58: 	"Tribe starter pack Instant Buy",
					eVar33:		"game",
					events:		"event62,event63"
				};
				this.executeLinkEvent(pageObj);
			}
		}catch(e){
			this.log(e);
		}
	},
	//When the Tribe Starter Pack Instant Buy - Become a Member button is clicked
	linkTribeStarterBuyMember: function(){
		try{
			if(mq.user.isMember() == false){
				var pageObj = {
					linkName:	"In game - Tribe starter pack Become a Member",
					linkType:	"o",
					eVar33:		"game", 
					eVar58: 	"Tribe starter pack Instant Buy",
					events:		"event62,event64"
				};
				this.executeLinkEvent(pageObj);
			}
		}catch(e){
			this.log(e);
		}
	},

	// *** Level Up ***

	//When the Level Up popup appears
	trackLevelUp: function(){
		try{
			var pageObj = {
				pageName: 	"Popup Level up",
				prop66: 	"Level up",
				eVar66: 	"Level up",
				eVar33:		"game",
				events: 	"event59"
				};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	//When a Level Up item is picked and clicked
	linkLevelUpPickItem: function(){
		try{
			var pageObj = {
				linkName:	"In game - Level up Pick Item",
				linkType:	"o",
				eVar33:		"game", 
				eVar66: 	"Level up",
				eVar33:		"game",
				events:		"event60"
			};
			this.executeLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
	},

	// *** Pets ***

	//When the Pets popup appears
	trackPetsPopup: function(){
		try{
			if(mq.user.isMember() == false){
				var pageObj = {
					pageName: 	"Popup Access to Pets",
					prop66: 	"Access to Pets",
					eVar66: 	"Access to Pets",
					eVar33:		"game",
					events: 	"event59"
				};
				this.executePageCall(pageObj);
			}
		}catch(e){
			this.log(e);
		}
	},
	//When the Pets Popup - Become a Member button is clicked
	linkPets: function(){
		try{
			if(mq.user.isMember() == false){
				var pageObj = {
					linkName:	"In game - Access to Pets",
					linkType:	"o",
					eVar33:		"game", 
					eVar66: 	"Access to Pets",
					events:		"event60"
				};
				this.executeLinkEvent(pageObj);
				}
		}catch(e){
			this.log(e);
		}
	},
	/* ********** Popup Tracking Functions - End ************ */

	/* ********** Pre-Registration Tracking Functions - Begin ************ */
	trackSaveMonkeyReg: function(){
		try{
			var pageObj = {
				pageName:"Popup Registration Save Monkey",
				prop66:"Registration Save Monkey",
				eVar66:"Registration Save Monkey",
				eVar33:		"game",
				events:"event59"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},

	linkSaveMonkeyReg: function(){
		try{
			var pageObj = {
				linkName:"In game - Registration Save Monkey",
				linkType:"o",
				eVar33:		"game", 
				eVar66:"Registration Save Monkey",
				events:"event60"
			};
			this.executeLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
	},

	//Social Registration
	trackSocialEnticeReg: function(){
		try{
			var pageObj = {
				pageName:"Popup Registration Social Enticement",
				prop66:"Registration Social enticement",
				eVar66:"Registration Social enticement",
				eVar33:		"game",
				events:"event59"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},

	linkSocialEnticeReg: function(){
		try{
			var pageObj = {
				linkName:"In game - Registration Social enticement",
				linkType:"o",
				eVar33:		"game", 
				eVar66:"Registration Social enticement",
				events:"event60"
			};
			this.executeLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
	},

	//Level Up Registration
	trackLevelUpReg: function(){
		try{
			var pageObj = {
				pageName:"Popup Registration Level Up",
				prop66:"Registration Level Up",
				eVar66:"Registration Level Up",
				eVar33:		"game",
				events:"event59"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},

	linkLevelUpReg: function(){
		try{
			var pageObj = {
				linkName:	"In game - Registration Level Up",
				linkType:	"o",
				eVar33:		"game", 
				eVar66:		"Registration Level Up",
				events:		"event60"
			};
			this.executeLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
	},

	//Item Purchase Registration
	trackItemPurchaseReg: function(){
		try{
			var pageObj = {
				pageName:"Popup Registration Item Purchase",
				prop66:"Registration Item Purchase",
				eVar66:"Registration Item Purchase",
				eVar33:		"game",
				events:"event59"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},

	linkItemPurchaseReg: function(){
		try{
			var pageObj = {
				linkName:	"In game - Registration Item Purchase",
				linkType:	"o",
				eVar33:		"game", 
				eVar66:		"Registration Item Purchase",
				events:		"event60"
			};
			this.executeLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
	},

	//Premium Registration
	trackPremiumReg: function(){
		try{
			var pageObj = {
				pageName:"Popup Registration Premium",
				prop66:"Registration Premium",
				eVar66:"Registration Premium",
				eVar33:		"game",
				events:"event59"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},

	linkPremiumReg: function(){
		try{
			var pageObj = {
				linkName:	"In game - Registration Premium",
				linkType:	"o",
				eVar33:		"game", 
				eVar66:		"Registration Premium",
				events:		"event60"
			};
			this.executeLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
	},

	//Giveaway Registration
	trackGiveAwayReg: function(){
		try{
			var pageObj = {
				pageName:"Popup Registration Giveaway",
				prop66:"Registration Giveaway",
				eVar66:"Registration Giveaway",
				eVar33:		"game",
				events:"event59"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},

	linkGiveAwayReg: function(){
		try{
			var pageObj = {
				linkName:"In game - Registration Giveaway",
				linkType:"o",
				eVar33:		"game",
				eVar66:"Registration Giveaway",
				events:"event60"
			};
			this.executeLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
	},

	//Exit Registration
	trackExitReg: function(){
		try{
			var pageObj = {
				pageName:"Popup Registration Exit",
						prop66:"Registration Exit",
						eVar66:"Registration Exit",
						eVar33:		"game",
						events:"event59"
				};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},

	linkExitReg: function(){
		try{
			var pageObj = {
				linkName:"In game - Registration Exit",
				linkType:"o",
				eVar33:		"game",
				eVar66:"Registration Exit",
				events:"event60"
			};
			this.executeLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
	},

	trackRegisterPopup: function(promptType ){
		try{
			switch(promptType){
				case "save":
						this.trackSaveMonkeyReg();
				break;
				case "social":
						this.trackSocialEnticeReg();
				break;
				case "level":
						this.trackLevelUpReg();
						break;
				case "purchase":
						this.trackItemPurchaseReg();
				break;
				case "premium":
						this.trackPremiumReg();
				break;
				case "giveaway":
						this.trackGivewayReg();
				break;
				case "exit":
						this.trackExitReg();
				break;
				default:
				//code to be executed if promptType is different from above
				break;
			}
		}catch(e){
			this.log(e);
		}

	},
	linkRegisterButton: function(promptType ){
		try{
			switch(promptType){
				case "save":
						this.linkSaveMonkeyReg();
				break;
				case "social":
						this.linkSocialEnticeReg();
				break;
				case "level":
						this.linkLevelUpReg();
				break;
				case "purchase":
						this.linkItemPurchaseReg();
				break;
				case "premium":
						this.linkPremiumReg();
				break;
				case "giveaway":
						this.linkGivewayReg();
				break;
				case "exit":
						this.linkExitReg();
				break;
				default:
						//code to be executed if promptType is different from above
				break;
			}
		}catch(e){
			this.log(e);
		}
	},
	/* ********** Pre-Registration Tracking Functions - End ************ */



	/* ********** Guest Pass Tracking Functions - Begin ************ */
	trackGPassReceived: function(receptionType){
		try{
			var trackData = null;

			if(receptionType == "system"){
				trackData = "event67";
			}else if(receptionType == "usergift"){
				trackData  = "event68";
			}

			if(trackData != null){
				var pageObj = {
					pageName: "Guest Pass Received",
					events:trackData
				};
				this.executePageCall(pageObj);
			}
		}catch(e){
			this.log(e);
		}
	},
	trackGPassUsed: function(){
		try{
			var pageObj = {
				pageName: "Guest Pass Used",
				eVar33:		"game",
				events:"event69"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	trackGPassExpired: function(){
		try{
			var pageObj = {
				pageName: "Popup Guest Pass Expiration",
				prop66: "Guest Pass Expiration",
				eVar66: "Guest Pass Expiration",
				eVar33:		"game",
				events: "event59"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	linkGPassExpired: function(){
		try{
			var pageObj = {
				linkName: "In game - Guest Pass Expiration",
				linkType:"o",
				eVar33:		"game", 
				eVar66: "Guest Pass Expiration",
				events: "event60"
			};
			this.executeLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
	},

	/* ********** Guest Pass Tracking Functions - End ************ */

	/* ********** Event Popup Tracking - Begin ********** */
	trackEventPageCall:function(pEventType,pEventId){
		try{
			if(typeof pEventId == "undefined"){
				pEventId = "";
			}

			switch(pEventType){
				//NEW EVENT Popups
			/*	
			case "petshop"://petshop popup
					this.setPetShopPageCall(pEventId);
				break;

				case "minigamego"://mini-game popup
					this.setMiniGamePageCall(pEventId);
				break;

				//HOLIDAY EVENT Popups
				case "holidaygetaccess"://holiday event get access popup
					this.setHolidayAccessPageCall(pEventId);
				break;

				case "holidayinstantbuy"://holiday event instant buy popup
					this.setHolidayBuyPageCall(pEventId);

				break;

				case "holidaypromote"://holiday promote popup
					this.setHolidayPromotePageCall(pEventId);
				break;

				//PREMIUM MINI-GAME Popups
				case "pmgpopup"://premium game get access popup
					this.setPremiumGameGetAccessPageCall(pEventId);
				break;

				case "pmginstantbuy"://premium instant buy popup
					this.setPremiumGameInstantBuyPageCall(pEventId);
				break;

				case "pmgpromote": //premium game promote popup
					this.setPremiumGamePromotePageCall(pEventId);
				break;
				*/
				//SALES & LIMITED ED Popups
				case "wkdsale"://weekend sale popup
					this.setWeekendSalePageCall(pEventId);
				break;

				case "limitededition"://limited edition popup
					this.setLimitedEditionPageCall(pEventId);
				break;

				default:
				//code to be executed if promptType is different from above
				break;
			}
		}catch(e){
			this.log(e);
		}
	},
	trackEventLink:function(pEventType,pEventId){
		try{
			if(typeof pEventId == "undefined"){
				pEventId = "";
			}

			switch(pEventType){
				//NEW EVENT Popups
					
				/*case "petshop"://petshop link
						this.setPetShopLink(pEventId);
					break;

					case "minigamego"://mini-game link
						this.setMiniGameLink(pEventId);
					break;

					//HOLIDAY EVENT Popups
					case "holidaygetaccess"://holiday get access link
						this.setHolidayAccessLink(pEventId);
					break;

					case "holidayinstantbuy"://holiday instant buy link
						this.setHolidayBuyLink(pEventId);
					break;

					case "holidaypromote"://holiday promote link
						this.setHolidayPromoteLink(pEventId);
					break;

					//PREMIUM MINI-GAME Popups
					case "pmggetaccess"://premium game get accecss link
						this.setPremiumGameGetAccessLink(pEventId);
					break;

					case "pmginstantbuymember"://premium game instant buy link
						this.setPremiumGameInstantBuyLink(pEventId);
					break;

					case "pmgpromote"://premium game promote link
						this.setPremiumGamePromoteLink(pEventId);
					break;
					*/
					//SALES & LIMITED ED Popups
					case "wkdsale"://weekend sale NC Mall link
						this.setWeekendSaleLink(pEventId);
					break;

					case "limitededition"://limited ed NC Mall link
						this.setLimitedEditionLink(pEventId);
					break;

					default:
					//code to be executed if promptType is different from above
					break;
			}
		}catch(e){
			this.log(e);
		}
	},

	setLimitedEditionPageCall: function(pEventId){
		try{
			var pageObj = {
				pageName: 	"Popup NC Mall Limited Edition Items",
				eVar66:		"NC Mall Limited Edition Items",
				eVar33:		"game",
				events: 	"event59"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	setLimitedEditionLink: function(pEventId){
		try{
			var pageObj = {
				linkName:	"In game - NC Mall Limited Edition Items",
				linkType:	"o",
				eVar33:		"game",
				eVar66:		"NC Mall Limited Edition Items",
				events:		"event60"
			};
			this.executeLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
	},

	setWeekendSalePageCall: function(pEventId){
		try{
			var pageObj = {
				pageName: 	"Popup NC Mall Weekend Sale",
				eVar66:		"NC Mall Weekend Sale",
				eVar33:		"game",
				events: 	"event59"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	setWeekendSaleLink: function(pEventId){
		try{
			var pageObj = {
				linkName:	"In game - NC Mall Weekend Sale",
				linkType:	"o",
				eVar33:		"game",
				eVar66:		"NC Mall Weekend Sale",
				events:		"event60"
			};
			this.executeLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
	},

	/*
	//Premium Games
	setPremiumGameGetAccessPageCall: function(pEventId){
		try{
			var pageObj = {
				pageName: 	"Popup " + pEventId + " Get Access",
				eVar59: 	pEventId,
				eVar66:		"Premium Mini Games Get Access",
				events: 	"event59"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	setPremiumGameGetAccessLink: function(pEventId){
		try{
			var pageObj = {
				linkName:	"In game - Premium Mini Games Portal Get Access",
				linkType:	"o",
				eVar66:		"Premium Mini Games Get Access",
				events:		"event60"
			};
			mtvn.btg.Controller.sendLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	setPremiumGamePromotePageCall: function(pEventId){
		try{
			var pageObj = {
				pageName: 	"Popup Promote Premium Mini Games",
				eVar66:		"Promote Premium Mini Games",
				events: 	"event59"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	setPremiumGamePromoteLink: function(pEventId){
		try{
			var pageObj = {
				linkName:	"In game - Promote Premium Mini Games",
				linkType:	"o",
				eVar66:		"Promote Premium Mini Games",
				events:		"event60"
			};
			mtvn.btg.Controller.sendLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	setPremiumGameInstantBuyPageCall: function(pEventId){
		try{
			var pageObj = {
				pageName: 	"Popup Premium Mini Games Instant Buy",
				eVar58:		"Premium Mini Games Instant Buy",
				events: 	"event61"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	setPremiumGameInstantBuyLink: function(pEventId){
		try{
			var pageObj = {
					linkName:	"In game - Premium Mini Games Become a Member",
					linkType:	"o",
					eVar58:		"Premium Mini Games Instant Buy",
					events:		"event64"
				};
			mtvn.btg.Controller.sendLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	//Holiday Events
	setHolidayPromotePageCall: function(pEventId){
		try{
			var pageObj = {
					pageName: 	"Popup Promote Holiday Event",
					eVar66:		"Promote Holiday Event",
					events: 	"event59"
				};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	setHolidayPromoteLink: function(pEventId){
		try{
			var pageObj = {
				linkName:	"In game - Promote Holiday Event",
				linkType:	"o",
				eVar66:		"Promote Holiday Event",
				events:		"event60"
			};
			mtvn.btg.Controller.sendLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	setHolidayBuyPageCall: function(pEventId){
		try{
			pageObj = {
				pageName: 	"Popup Premium Holiday Event Instant Buy",
				eVar58:		"Premium Holiday Event Instant Buy",
				events: 	"event61"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},

	setHolidayBuyLink: function(pEventId){
		try{
			var pageObj = {
				linkName:	"In game - Premium Holiday Event Become a Member",
				linkType:	"o",
				eVar58:		"Premium Holiday Event Instant Buy",
				events:		"event64"
			};
			mtvn.btg.Controller.sendLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	setHolidayAccessPageCall: function(pEventId){
		try{
			var pageObj = {
				pageName: 	"Popup " + pEventId + " Get Access",
				eVar59:		pEventId,
				eVar66: 	"Premium Holiday Event Get Access",
				events: 	"event59"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	setHolidayAccessLink: function(pEventId){
		try{
			var pageObj = {
				linkName:	"In game - Premium Holiday Event Portal Get Access",
				linkType:	"o",
				eVar66:		"Premium Holiday Event Get Access",
				events:		"event60"
			};
			mtvn.btg.Controller.sendLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	//Mini-Game Events
	setMiniGamePageCall: function(pEventId){
		try{
			var pageObj = {
				pageName: 	"Popup Promote Mini Games",
				prop66: 	"Promote Mini Games",
				eVar66: 	"Promote Mini Games",
				events: 	"event59"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	setMiniGameLink: function(pEventId){
		try{
			var pageObj = {
				linkName:	"In game - Popup Promote Mini Games",
				linkType:	"o",
				eVar66:		"Promote Mini Games",
				events:		"event60"
			};
			mtvn.btg.Controller.sendLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	//PetShop Events
	setPetShopPageCall:function(pEventId){
		try{
			var pageObj = {
				pageName: 	"Popup Promote Pets",
				prop66: 	"Promote Pets",
				eVar66: 	"Promote Pets",
				events: 	"event59"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	setPetShopLink: function(pEventId){
		try{
			var pageObj = {
				linkName:	"In game - Popup Promote Pets",
				linkType:	"o",
				eVar66:		"Promote Pets",
				events:		"event60"
			};
			mtvn.btg.Controller.sendLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	 */
	/* *********** Event Popup Tracking - End *********** */

	trackHudNotificationSent: function (notificationId, type, category, priority, expiration) {
		try{
			var status          = "sent";
			var pageObj = {
				pageName: 	"Notification " + type,
				prop52: 	"Notification " + type,
				prop23: 	com.monkeyquest.level.loadTime,
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				events: 	"event59"
			};

		}catch(e){
			this.log(e);
		}
	},

	trackHudNotificationClicked: function (notificationId, type, category, priority, expiration) {
		try{
			var status          = "clicked";
			var pageObj = {
				linkName:	"Notification " + type,
				linkType:	"o",
				eVar33:		"game",
				eVar52:		"Notification " + type,
				events:		"event60"
			};
			this.executeLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	/* ************ BEGIN Social Event Tracking *********** */
	
	trackActivePeriodStart: function (globalEventName){
		try{
			var pageObj = {
				pageName: 	"Timed Social Event: Active Period Start/"+globalEventName,
				prop2:		"Timed Social Event: Active Period Start",
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2:		"Timed Social Event: Active Period Start",
				eVar25:		"Timed Social Event: Active Period Start",
				events: 	"event76"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
		
	},
	
	trackPlayerInteraction: function (globalEventName){
		try{
			var pageObj = {
				pageName: 	"Timed Social Event: Player Interaction/"+globalEventName,
				prop2:		"Timed Social Event: Player Interaction",
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2:		"Timed Social Event: Player Interaction",
				eVar25:		"Timed Social Event: Player Interaction",
				events: 	"event77"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
		
	},
	
	trackPartyStart: function (globalEventName){
		try{
			var pageObj = {
				pageName: 	"Timed Social Event: Party Start/"+globalEventName,
				prop2:		"Timed Social Event: Party Start",
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2:		"Timed Social Event: Party Start",
				eVar25:		"Timed Social Event: Party Start",
				events: 	"event78"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
		
	},
	
	/* ************ END Social Event Tracking *********** */
	/* ************ BEGIN Auto Grouping *********** */
	trackAutoGrouping: function (source){
		try{
			//source of the autogrouping toggle hud / monkeybook
			var sSource;
			if(source == "hud"){
				sSource = "Hud auto grouping";
			}else if(source == "monkeybook"){
				sSource = "Monkey book auto grouping";
			}else{
				sSource = "auto grouping";
			}
			
			var pageObj = {
					linkName: 	sSource,
					linkType: 	"o",
					eVar33:		"game",
					eVar66:		sSource,
					events: 	"event60"
			};
			this.executeLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	trackAutoGroupingOptions: function(source,game){
		try{
			var sSource;
			var sEvent;
			
			switch(source){
				case "playgamenow":
					sSource = "Play Game Now";
					sEvent = "event94";
					break;
				case "playwithmygroup":
					sSource = "Play With My Group";
					sEvent = "event94";
					break;
				case "matchmeotherplayers":
					sSource = "Match me with other players";
					sEvent = "event37";
					break;
				case "matchplayersmygroup":
					sSource = "Match players to my group";
					sEvent = "event37";
					break;	
			}

			var pageObj = {
				linkName:	sSource + ": " + game,
				linkType:	'o',
				eVar33:		"game",
				eVar36:		sSource + ": " + game,
				events:		sEvent
			};
			this.executeLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
		
	},
	trackAutoGroupingQueue: function(source,game){
		try{
			var sSource;
			var sEvent;
			switch(source){

				case "start":
					sSource = "From Queue to Game (Success): " + game;
					var pageObj = {
						pageName: 	sSource,
						prop2:		sSource,
						eVar33:		"game",
						eVar36:		sSource,

						events: 	"event38"
					};
					this.executePageCall(pageObj);
					
					return;
					
					break;
				case "cancel":
					sSource = "Queue Failed: Player cancelled queue";
					sEvent = "event48";
					break;
				case "decline":
					sSource = "Queue Failed: ready but popup declined by player";
					sEvent = "event48";
					break;
				case "loggedout":
					sSource = "Queue Failed: Player logged out from MQ";
					sEvent = "event48";
					break;
				case "leftgroup":
					sSource = "Queue Failed: Player left the group";
					sEvent = "event48";
					break;
				case "newgame":
					sSource = "Queue Failed: Leader selected a new game";
					sEvent = "event48";
					break;
				default:
					break;
			}
			var pageObj = {
				linkName:	sSource + ": " + game,
				linkType:	"o",
				eVar33:		"game",
				eVar36:		sSource + ": " + game,
				events:		sEvent
			};
			this.executeLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	/* ************ END Auto Grouping *********** */
	/* ************ BEGIN Banner UpSell *********** */
	
	trackBannerUpSell: function(){
		var bannerName = mq.user.isMember() ? "Referral program" : "Ways to play";			
		try{
			var pageObj = {
				pageName: 	bannerName,
				eVar66: 	bannerName,
				eVar33:		"site",
				events: 	"event59"
			};
			this.executePageCall(pageObj);
		}catch(e){
			this.log(e);
		}
	},
	
	linkBannerUpSell: function(bannerId){
		var bannerName = mq.user.isMember() ? "Referral program" : "Ways to play";
		try{				
			var pageObj = {
				linkName:	 bannerName,
				linkType:	"o",
				eVar33:		"site",
				eVar66:		 bannerName,
				events:		"event60"
			};
			this.executeLinkEvent(pageObj);
		}catch(e){
			this.log(e);
		}		
	},
	
	/* ************ END Banner UpSell *********** */

	/* ********** Unit installation ********* */
	// Install Unity button
	installClick: function() {
		MQStats.mtvnBtgInitOnce();
		var linkObj = {
			linkName:	"Install Unity Click",
			linkType: 	"o",
			eVar33:		"site", 
			events: 	"event27"
		};
		this.executeLinkEvent(linkObj);
	},

	mtvnBtgInitOnce: function() {
		mtvn.btg.Controller.init();
		MQStats.mtvnBtgInitOnce = function() {};
	}
});

dojo.setObject("MQStats.SODA", {
	// wrapper for sendPageCall that duplicates all prop values to also be evars
	executePageCall: function(obj) {
		MQStats.asyncTrack(MQStats.preparePageCall(obj));
	},

	// track a loadunit being crossed in-game
	trackLoadUnit: function(levelId, loadUnitId, userCountry, userGender, userDob, userAccountAge, host, additionalArgs) {
		var fullLoadUnitId = levelId + "." + loadUnitId;
		var obj = {
			pageName: 	"/loadUnit." + fullLoadUnitId,
			channel:	"loadUnits",
			hier1:		userCountry+"/"+userGender+"/"+userDob+"/"+userAccountAge+"/" + fullLoadUnitId,
			prop2: 		"/loadUnit." + fullLoadUnitId,
			prop19:		userCountry,
			prop20:		userGender,
			prop21:		userDob,
			prop22:		userAccountAge,
			prop25: 	com.monkeyquest.network.avgPingTime,
			prop26: 	com.monkeyquest.client.frameRate,
			prop28: 	host,
			prop33:		"Play Load",
			prop37: 	levelId,
			prop40: 	com.monkeyquest.sso_id,
			prop43: 	location.pathname
		};
		var key;

		if ( typeof additionalArgs != "undefined" && additionalArgs.length ) {
			for ( key in additionalArgs ) {
				if ( additionalArgs.hasOwnProperty(key) ) {
					obj[key] = additionalArgs[key];
				}
			}
		}

		MQStats.asyncTrack(MQStats.preparePageCall(obj));
	},

	trackHudNotificationSent: function (notificationId, type, category, priority, expiration) {
		MQStats.asyncTrack(MQStats.preparePageCall({
			pageName:        "Notification",
			type:            type,
			category:        category,
			notifID:         notificationId,
			status:          "sent",
			priority:        priority,
			expiration:      expiration,
			level:           mq.user.getMonkeyLevel(),
			activeQuestId:   mq.user.getActiveQuestId(),
			region:          mq.user.getGameRegion(),
			area:            mq.user.getGameArea()
		}));
	},

	trackHudNotificationClicked: function (notificationId, type, category, priority, expiration) {
		MQStats.asyncTrack(MQStats.preparePageCall({
			pageName:        "Notification",
			type:            type,
			category:        category,
			notifID:         notificationId,
			status:          "clicked",
			priority:        priority,
			expiration:      expiration,
			level:           mq.user.getMonkeyLevel(),
			activeQuestId:   mq.user.getActiveQuestId(),
			region:          mq.user.getGameRegion(),
			area:            mq.user.getGameArea()
		}));
	},

	asyncTrack: function(obj) {
		return;
		var img = document.createElement('img'),
			url = 'https://web.archive.org/web/20140123090348/http://mq.mtvstats.com/mq/_t.gif?sso_id=' + encodeURIComponent(com.monkeyquest.sso_id) + "&cachebust=" + new Date().getTime(),
			key;

		img.type  = 'image/gif';
		img.async = true;

		// common tracking fields
		this.injectCommonTracking(obj);

		for ( key in obj ) {
			// props have been copied to eVars, so skip them
			if ( obj.hasOwnProperty(key) && key.indexOf("prop") != 0 ) {
				url += '&' + key + '=' + encodeURIComponent(obj[key]);
			}
		}

		img.src = url;
	},

	injectCommonTracking: function(obj) {
		obj.app         = com.monkeyquest.app_region || 'mq_prod_unk'; //signifies that there was a js error and this property was not set
		obj.levelName   = com.monkeyquest.level.name;
		obj.levelRegion = com.monkeyquest.level.area;
	},

	// smartfox connection tracking
	sfsConnection: function(type, elapsed, host) {
		MQStats.asyncTrack({
			event_type:	"sfsConnection",
			type:		type,
			elapsed: 	elapsed,
			host:		host
		});
	}
});

//20.0.0
MQStats = dojo.mixin(MQStats, {
	numberInGroup:"0",
	validMember: "non member",
	activeQuest: "0",
	log: function(message) {
		if ( typeof console !== "undefined") {
			console.log(message);
		}
	},
	// UTIL function to get query param value
	getQSValue: function(key) {
		var regex, qs;

		key   = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
		qs    = regex.exec(window.location.href);

		return qs ? qs[1] : false;
	},
	overrideVisitorId: function(){
		try{
			if(typeof com.monkeyquest.sso_id != "undefined"){
				
				btg.config.Omniture.visitorID = com.monkeyquest.sso_id;
			}
		}catch(e){
			this.log(e);
		}
		
	},
	preparePageCall: function(obj) {
		try{
			var xid = this.getQSValue('xid'),navid = this.getQSValue('navid'),key;
	
			// if prop33 is not set assume the call is coming from the game
			if ( typeof obj.prop33 == "undefined" ) {
				obj.prop33 = 'game';
				obj.eVar33 = 'game';
			}
	
			// get external campaign var
			if (xid) {
				obj.v0 = xid;
				obj.prop34 = xid;
				obj.prop60 = xid;
				obj.prop61 = xid;
				
				obj.eVar34 = xid;
				obj.eVar60 = xid;
				obj.eVar61 = xid;
			}
			// get internal navid var
			if (navid) {
				obj.prop62 = navid;
				obj.eVar62 = navid;
			}
			//if we are in 'play' mode track grouping
			var pageURL = String(document.location);
			if (pageURL.indexOf("/play") > -1) {
				//if the current numberInGroup is different than saved user data, update
				if(this.numberInGroup != String(mq.user.getGroupInfo().size)){
					this.numberInGroup = String(mq.user.getGroupInfo().size);
				}
				//setGroupStatus
				if(this.numberInGroup){
					obj.prop10 = this.numberInGroup;
					obj.eVar10 = this.numberInGroup;
				}
	
				//if active quest is null, do nothing
				if(mq.user.getActiveQuest() != null){
					if(this.activeQuest > 0){
						//if active quest changes, update omniture
						if(this.activeQuest != String(mq.user.getActiveQuest())){
							this.activeQuest = String(mq.user.getActiveQuest());
							//removed KIDSADSR-2622
							//obj.prop4 = this.activeQuest;
							//obj.eVar4 = this.activeQuest;
						}
					}
				}
			}
			return obj;
		}catch(e){	
			this.log(e);
		}
	},

	initFacade: function() {
		var libraries      = [MQStats.SODA, MQStats.Omniture, MQStats.Marketing],
			proxiedMethods = {},
			i, library, method;

		for ( i = 0; i < libraries.length; ++i ) {
			library = libraries[i];

			for ( method in library ) {
				if (
					// Ignore inherited poperties
					!library.hasOwnProperty(method)
					// Only create proxies for functions
					|| typeof library[method] !== "function"
					// ... that do not exist as a non-function property in MQStats
					|| (method in MQStats && typeof MQStats[method] !== "function")
					// ... and that haven't already been proxied
					|| method in proxiedMethods
				) {
					continue;
				}

				// Create unique `library` and `method` variables for each iteration (because we lack `let`)
				(function(library, method, originalMethod) {
					MQStats[method] = function() {
						var i = libraries.length - 1;

						// The method being proxies on the sublibraries also exists in MQStats, call that first
						if ( typeof originalMethod === "function" ) {
							try {
								originalMethod.apply(MQStats, arguments);
							} catch (e) {}
						}

						// Call the method on each sublibrary that it exists in
						while ( i >= 0 ) {
							if ( typeof libraries[i][method] === "function" ) {
								try {
									libraries[i][method].apply(MQStats, arguments);
								} catch (e) {}
							}

							--i;
						}
					};
				}(library, method, MQStats[method]));

				// Mark this method as already having its proxy setup
				proxiedMethods[method] = true;
			}
		}
	},

	/*
	 * Page events
	 */

	// website page views
	pageView: function(sectionName, pageName, userAge, userGender, userCountry) {
		try{
			var pageObj = {
				//* FIX THIS - (hier1) getting undefined values from user specific parameters, handle this */
				pageName:	sectionName + " - " + location.pathname,
				channel:	sectionName,
				
				hier1:  	userCountry + "/" + userGender + "/" + userAge + "/" + sectionName + "/" + pageName,
				prop2: 		sectionName + " - " + location.pathname,
				prop19:		userCountry,
				prop20:		userGender,
				prop21:		mq.user.getAge(),
				prop33:		"site",
				prop40: 	com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				prop44: 	document.referrer,
				
				eVar2: 		sectionName + " - " + location.pathname,
				eVar19:		userCountry,
				eVar20:		userGender,
				eVar21:		mq.user.getAge(),
				eVar33:		"site",
				eVar40: 	com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				eVar44: 	document.referrer,
				
				events:		""
			
			};
			//if authenticated capture original campaignCode and registration date
			if (mq.user.isLoggedIn() == true){
				var origXid = String(mq.user.getCampaignCode());
				var origRegDate = String(mq.user.getAccountCreationDate());
				
				pageObj.eVar71 = mq.user.isMember() ? "member" : "non member";
				pageObj.prop71 = mq.user.isMember() ? "member" : "non member";
				
				if(origXid != null){
					pageObj.eVar69 = origXid;
					pageObj.prop69 = origXid;
				}
	
				if(origRegDate != null){
					pageObj.eVar22 = origRegDate;
					pageObj.prop22 = origRegDate;
				}
			}
	
			// capture embed URL and set prop1 to the embed identifer IF
			// the document location is not the game popup.
			var pageURL = String(document.location);
			if (pageURL.indexOf("/play") == -1) {
				if(pageURL.indexOf("embed/addictinggames") > -1 ) {
					pageObj.prop1 = "AG Embed Splash";
					pageObj.eVar1 = "AG Embed Splash";
				} else if (pageURL.indexOf("embed/shockwave") > -1) {
					pageObj.prop1 = "Shockwave Embed Splash";
					pageObj.eVar1 = "Shockwave Embed Splash";
				} else if (pageURL.indexOf("embed/nick") > -1) {
					pageObj.prop1 = "Nick Embed Splash";
					pageObj.eVar1 = "Nick Embed Splash";
				} else if (pageURL.indexOf("embed/miniclip") > -1) {
					pageObj.prop1 = "Miniclip Embed Splash";
					pageObj.eVar1 = "Miniclip Embed Splash";
				}
			}
	
			// Capture User State (New/Returning)
			// Skip if called from ingame
			if ( pageURL.indexOf("/play") == -1 ) {
				pageObj.prop3 = mq.user.isReturning() ? "Returning User" : "New User";
				pageObj.eVar3 = mq.user.isReturning() ? "Returning User" : "New User";
			}
	
			// if the unity object is defined then lets see if the user has the plugin
			if ( typeof unityObject != "undefined" ) {
				pageObj.prop27 = this.detectUnity();
				pageObj.eVar27 = this.detectUnity();
				if(pageObj.prop27 == "Install Attempt Failed"){
					//install attempt failed, send fail event
					pageObj.events = "event73";
				}
	
			}
	
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},

	// trackLogin
	trackLogin: function(){
		try{
			var pageObj = {
				pageName:	"/trackLogin/",
				channel:	"Login",
				hier1:		"/trackLogin/",
				prop2:		"/trackLogin/",
				prop25:		com.monkeyquest.network.avgPingTime,
				prop26:		com.monkeyquest.client.frameRate,
				prop33:		'site',
				prop43:		location.pathname,
				prop44:		document.referrer,
				
				eVar2:		"/trackLogin/",
				//eVar25:		com.monkeyquest.network.avgPingTime,
				//eVar26:		com.monkeyquest.client.frameRate,
				eVar33:		'site',
				eVar43:		location.pathname,
				eVar44:		document.referrer,
				events:     "event11"
			};
	
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}

        if ( typeof mboxTrack === "function" && typeof landerVersion !== "undefined" ) {
            mboxTrack("mq-lander-login-complete", "landerVersion=" + landerVersion);
        }
	},
	trackLoginAttempt: function(){
		try{
			var pageObj = {
				pageName:	"/trackLoginAttempt/",
				channel:	"Login Attempt",
				hier1:		"/trackLoginAttempt/",
				prop2:		"/trackLoginAttempt/",
				prop25:		com.monkeyquest.network.avgPingTime,
				prop26:		com.monkeyquest.client.frameRate,
				prop33:		'site',
				prop43:		location.pathname,
				prop44:		document.referrer,
				
				eVar2:		"/trackLoginAttempt/",
				//eVar25:		com.monkeyquest.network.avgPingTime,
				//eVar26:		com.monkeyquest.client.frameRate,
				eVar33:		'site',
				eVar43:		location.pathname,
				eVar44:		document.referrer,
				events:     "event93"
			};
	
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},

	// registration steps
	registrationStep: function(userCountry,userGender,userAge,userAccountAge,registrationStep){
		try{
			this.executePageCall({
				pageName:	"/userRegistration/" + registrationStep,
				channel:	"Registration",
				hier1:		userCountry + "/"+userGender+"/"+userAge+"/"+userAccountAge+"/userRegistration/"+registrationStep,
				prop2:		"/userRegistration/"+registrationStep,
				prop19:		userCountry,
				prop20:		userGender,
				prop21:		mq.user.getAge(),
				prop22:		userAccountAge,
				prop25:		com.monkeyquest.network.avgPingTime,
				prop26:		com.monkeyquest.client.frameRate,
				prop33:		'site',
				prop43:		location.pathname,
				prop44:		document.referrer,
				eVar2:		"/userRegistration/"+registrationStep,
				eVar19:		userCountry,
				eVar20:		userGender,
				eVar21:		mq.user.getAge(),
				eVar22:		userAccountAge,
				//eVar25:		com.monkeyquest.network.avgPingTime,
				//eVar26:		com.monkeyquest.client.frameRate,
				eVar33:		'site',
				eVar43:		location.pathname,
				eVar44:		document.referrer,
				events:     ""
			});
		}catch(e){	
			this.log(e);
		}
	},

	// registration steps including field
	registrationStepField: function(registrationFlowId,registrationStep,registrationField){
		try{
			if ( registrationField == "start" ) {
				this.executePageCall({
					pageName: "/userRegistration/ Registration Flow " +registrationFlowId+ " / " +registrationStep+ " / " +registrationField,
					channel:  "Registration",
					hier1:    "userRegistration/ Registration Flow " +registrationFlowId+ " / " +registrationStep+ " / " +registrationField,
					prop2: 	  "/userRegistration/ Registration Flow " +registrationFlowId+ " / " +registrationStep+ " / " +registrationField,
					prop25:   com.monkeyquest.network.avgPingTime,
					prop26:   com.monkeyquest.client.frameRate,
					prop33:   "site",
					prop43:   location.pathname,
					prop44:   document.referrer,
					
					eVar2: 	  "/userRegistration/ Registration Flow " +registrationFlowId+ " / " +registrationStep+ " / " +registrationField,
					//eVar25:   com.monkeyquest.network.avgPingTime,
					//eVar26:   com.monkeyquest.client.frameRate,
					eVar33:   "site",
					eVar43:   location.pathname,
					eVar44:   document.referrer,
					
					events:   "event12"
				});
			}
			else if ( registrationField == "completed" ) {
				this.executePageCall({
					pageName:	"/userRegistration/ Registration Flow " +registrationFlowId+ " / " +registrationStep+ " / " +registrationField,
					channel:	"Registration",
					hier1:		"userRegistration/ Registration Flow " +registrationFlowId+ " / " +registrationStep+ " / " +registrationField,
					prop2:		"/userRegistration/ Registration Flow " +registrationFlowId+ " / " +registrationStep+ " / " +registrationField,
					prop25:		com.monkeyquest.network.avgPingTime,
					prop26:		com.monkeyquest.client.frameRate,
					prop33:		"site",
					prop43:		location.pathname,
					prop44:		document.referrer,
					
					eVar2:		"/userRegistration/ Registration Flow " +registrationFlowId+ " / " +registrationStep+ " / " +registrationField,
					//eVar25:		com.monkeyquest.network.avgPingTime,
					//eVar26:		com.monkeyquest.client.frameRate,
					eVar33:		"site",
					eVar43:		location.pathname,
					eVar44:		document.referrer,
					
					events:		"event6"
				});
			}
			else {
				this.executePageCall({
					pageName: "/userRegistration/ Registration Flow " +registrationFlowId+ " / " +registrationStep+ " / " +registrationField,
					channel:  "Registration",
					hier1:    "userRegistration/ Registration Flow " +registrationFlowId+ " / " +registrationStep+ " / " +registrationField,
					prop2: 	  "/userRegistration/ Registration Flow " +registrationFlowId+ " / " +registrationStep+ " / " +registrationField,
					prop25:   com.monkeyquest.network.avgPingTime,
					prop26:   com.monkeyquest.client.frameRate,
					prop33:   "site",
					prop43:   location.pathname,
					prop44:   document.referrer,
					
					eVar2: 	  "/userRegistration/ Registration Flow " +registrationFlowId+ " / " +registrationStep+ " / " +registrationField,
					//eVar25:   com.monkeyquest.network.avgPingTime,
					//eVar26:   com.monkeyquest.client.frameRate,
					eVar33:   "site",
					eVar43:   location.pathname,
					eVar44:   document.referrer,
					events:   "event16"
				});
			}
		}catch(e){	
			this.log(e);
		}
	},

	// On-Site Video
	siteVideoPlay: function(videoTitle){
		this.executePageCall({
			pageName: 	"Video Play: " + videoTitle,
			channel:	"Video",
			hier1:		"Video Play/" + videoTitle,
			prop2: 	  	"Video Play: " + videoTitle,
			prop25: 	com.monkeyquest.network.avgPingTime,
			prop26: 	com.monkeyquest.client.frameRate,
			prop33: 	"site",
			prop43: 	location.pathname,
			prop44: 	document.referrer,
			
			eVar2: 	  	"Video Play: " + videoTitle,
			//eVar25: 	com.monkeyquest.network.avgPingTime,
			//eVar26: 	com.monkeyquest.client.frameRate,
			eVar33: 	"site",
			eVar43: 	location.pathname,
			eVar44: 	document.referrer,
			
			events:     ""
		});
	},

	/*
	 * These are in-game events
	 */

	// Application Load
	applicationStarted: function(host){
			try{
			// IE doesnt seem to like to refresh the page when the plugin
			// gets installed so we do the check here too.
			var cookieVal = mtvn.btg.util.Cookie.read('mqUnityStatus');
			var status = "Installed";
			var installEvent = "event71";
			if (cookieVal && cookieVal == "installAttempt") {
				status = "Install Success";
				installEvent = "event71,event72";
				mtvn.btg.util.Cookie.set('mqUnityStatus', 'Done');
			}
	
			this.executePageCall({
				pageName: 	"/applicationStart",
				channel:	"Application",
				hier1:		"applicationStart",
				prop2: 		"/applicationStart",
				prop24: 	com.monkeyquest.client.qualityUsed,
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop27: 	status,
				prop28: 	host,
				prop33:		"Play Load",
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				prop45: 	mq.client.getUnityEngineVersion(),
				prop56:		mq.client.getUnityPluginVersion(),
				eVar2: 		"/applicationStart",
				//eVar24: 	com.monkeyquest.client.qualityUsed,
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar27: 	status,
				eVar28: 	host,
				eVar33:		"Play Load",
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				eVar45: 	mq.client.getUnityEngineVersion(),
				//eVar56:		mq.client.getUnityPluginVersion(),
				
				events:     installEvent
			});
		}catch(e){	
			this.log(e);
		}
	},

	// user closed the application
	applicationClosed: function(){
		try{
			this.executePageCall({
				pageName: 	"/applicationClose",
				channel:	"Application",
				hier1:		"applicationClose",
				prop2: 		"/applicationClose",
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"Play Load",
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"/applicationClose",
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar33:		"Play Load",
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				
				events:     ""
			});
		}catch(e){	
			this.log(e);
		}
	},

	// application was disconnected for some reason
	applicationDisconnect: function(host, zone, errorCode){
		try{
			this.executePageCall({
				pageName: 	"/applicationDisconnected",
				channel:	"Application",
				hier1:		"applicationDisconnected",
				prop2: 		"/applicationDisconnected",
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop28:		host,
				prop29: 	zone,
				prop32: 	errorCode,
				prop33:		"Play Load",
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"/applicationDisconnected",
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar28:		host,
				eVar29: 	zone,
				eVar32: 	errorCode,
				eVar33:		"Play Load",
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				
				events:     ""
			});
		}catch(e){	
			this.log(e);
		}
	},

	// change hosts
	applicationChangeHost: function(fromHost,toHost,fromZone,toZone){
		try{
			this.executePageCall({
				pageName: 	"/applicationChangeHost",
				channel:	"Application",
				hier1:		"applicationChangeHost",
				prop2:		"/applicationChangeHost",
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop30: 	fromHost + " to " + toHost,
				prop31: 	fromZone + " to " + toZone,
				prop33:		"Play Load",
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2:		"/applicationChangeHost",
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar30: 	fromHost + " to " + toHost,
				eVar31: 	fromZone + " to " + toZone,
				eVar33:		"Play Load",
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				
				events:     ""
			});
		}catch(e){	
			this.log(e);
		}
	},

	// generic application error tracking
	applicationError: function(host, zone, errorCode, msg, numOfMonkey){
		try{
			this.executePageCall({
				pageName: 	"/applicationError/" + errorCode + "/" + msg,
				channel:	"Application",
				hier1:		"ErrorNotification",
				prop2: 		"/applicationError/" + errorCode + "/" + msg,
				prop23: 	com.monkeyquest.level.loadTime,
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop28:		host,
				prop29: 	zone,
				prop32: 	errorCode,
				prop33:		"Play Load",
				prop35: 	numOfMonkey,
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"/applicationError/" + errorCode + "/" + msg,
				//eVar23: 	com.monkeyquest.level.loadTime,
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar28:		host,
				eVar29: 	zone,
				eVar32: 	errorCode,
				eVar33:		"Play Load",
				eVar35: 	numOfMonkey,
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				
				events: 	"event7"
			});
		}catch(e){	
			this.log(e);
		}
	},


	/*
	 * Adoption process
	 */

	// monkey select: only use at avatar selection screen
	avatarSelectStart: function(userCountry,userGender,userAge,userAccountAge,host){
		try{
			var pageObj = {
				pageName: 	"/monkeyAvatarSelectStart",
				channel:	"Adoption",
				hier1:		userCountry+"/"+userGender+"/"+userAge+"/"+userAccountAge+"/monkeyAvatarSelectStart",
				prop2: 		"/monkeyAvatarSelectStart",
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop28: 	host,
				prop33:		"Adoption Screen",
				prop40: 	com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"/monkeyAvatarSelectStart",
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar28: 	host,
				eVar33:		"Adoption Screen",
				eVar40: 	com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				
				events:     ""
			};
	
			if(mq.user.isLoggedIn() == true){
				pageObj.prop19 = userCountry;
				pageObj.prop20 = userGender;
				pageObj.prop21 = mq.user.getAge();
				pageObj.prop22 = String(mq.user.getAccountCreationDate());
				pageObj.prop69 = String(mq.user.getCampaignCode());
				pageObj.prop71 = mq.user.isMember() ? "member" : "non member";
				
				pageObj.eVar19 = userCountry;
				pageObj.eVar20 = userGender;
				pageObj.eVar21 = mq.user.getAge();
				pageObj.eVar22 = String(mq.user.getAccountCreationDate());
				pageObj.eVar69 = String(mq.user.getCampaignCode());
				pageObj.eVar71 = mq.user.isMember() ? "member" : "non member";
				
				
			}else{
				pageObj.eVar22 = "Not Registered";
				pageObj.prop22 = "Not Registered";
			}
	
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},

	// monkey select: only use when monkey is selected
	avatarSelected: function(userCountry,userGender,userAge,userAccountAge,host){
		try{
			var pageObj = {
				pageName: 	"/monkeyAvatarSelected",
				channel:	"Adoption",
				hier1:		userCountry+"/"+userGender+"/"+userAge+"/"+userAccountAge+"/monkeyAvatarSelected",
				prop2: 		"/monkeyAvatarSelected",
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop28: 	host,
				prop33:		"Adoption Screen",
				prop40: 	com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"/monkeyAvatarSelected",
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar28: 	host,
				eVar33:		"Adoption Screen",
				eVar40: 	com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				
				events:     ""
			};
			if(mq.user.isLoggedIn() == true){
				pageObj.prop69 = String(mq.user.getCampaignCode());
				pageObj.prop19 = userCountry;
				pageObj.prop20 = userGender;
				pageObj.prop21 = mq.user.getAge();
				pageObj.prop22 = String(mq.user.getAccountCreationDate());
				pageObj.prop71 = mq.user.isMember() ? "member" : "non member";
				
				pageObj.eVar69 = String(mq.user.getCampaignCode());
				pageObj.eVar19 = userCountry;
				pageObj.eVar20 = userGender;
				pageObj.eVar21 = mq.user.getAge();
				pageObj.eVar22 = String(mq.user.getAccountCreationDate());
				pageObj.eVar71 = mq.user.isMember() ? "member" : "non member";
				
				
			}else{
				pageObj.prop22 = "Not Registered";
				pageObj.eVar22 = "Not Registered";
			}
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},

	// monkey creation: only use at avatar selection screen
	avatarCreationStart: function(userCountry,userGender,userAge,userAccountAge,host){
		//Default Page Call
		try{
			var pageObj = {
				pageName: 	"/monkeyCreationStart",
				channel:	"Adoption",
				hier1:		userCountry+"/"+userGender+"/"+userAge+"/"+userAccountAge+"/monkeyCreationStart",
				prop2:		"/monkeyCreationStart",
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop28: 	host,
				prop33:		"Adoption Screen",
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2:		"/monkeyCreationStart",
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar28: 	host,
				eVar33:		"Adoption Screen",
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,			
				
				events: 	"event14"
			};
	
			if(mq.user.isLoggedIn() == true){
				pageObj.prop19 = userCountry;
				pageObj.prop20 = userGender;
				pageObj.prop21 = mq.user.getAge();
				pageObj.prop22 = String(mq.user.getAccountCreationDate());
				pageObj.prop69 = String(mq.user.getCampaignCode());
				pageObj.prop71 = mq.user.isMember() ? "member" : "non member";
				
				pageObj.eVar19 = userCountry;
				pageObj.eVar20 = userGender;
				pageObj.eVar21 = mq.user.getAge();
				pageObj.eVar22 = String(mq.user.getAccountCreationDate());
				pageObj.eVar69 = String(mq.user.getCampaignCode());
				pageObj.eVar71 = mq.user.isMember() ? "member" : "non member";
				
			}else{
				pageObj.prop22 = "Not Registered";
				pageObj.eVar22 = "Not Registered";
			}
	
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},

	// monkey creation: only use at creation complete
	avatarCreated: function(userCountry,userGender,userAge,userAccountAge,monkeyGender,monkeyColor,monkeyHair,monkeyFace) {
		try{
			mq.user.setMonkeyLevel(1);
			var pageObj = {
				pageName: 	"/monkeyAvatarCreated",
				channel:	"Adoption",
				hier1:		userCountry+"/"+userGender+"/"+userAge+"/"+userAccountAge+"/monkeyAvatarCreated",
				prop2:		"/monkeyAvatarCreated",
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"Adoption Screen",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2:		"/monkeyAvatarCreated",
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar33:		"Adoption Screen",
				eVar37:		String(mq.user.getMonkeyLevel()),
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				
				events:		"event15"
			};
	
			if(mq.user.isLoggedIn() == true){
				pageObj.prop19 = userCountry;
				pageObj.prop20 = userGender;
				pageObj.prop21 = mq.user.getAge();
				pageObj.prop22 = String(mq.user.getAccountCreationDate());
				pageObj.prop69 = String(mq.user.getCampaignCode());
				pageObj.prop71 = mq.user.isMember() ? "member" : "non member";
				
				pageObj.eVar19 = userCountry;
				pageObj.eVar20 = userGender;
				pageObj.eVar21 = mq.user.getAge();
				pageObj.eVar22 = String(mq.user.getAccountCreationDate());
				pageObj.eVar69 = String(mq.user.getCampaignCode());
				pageObj.eVar71 = mq.user.isMember() ? "member" : "non member";
			}else{
				pageObj.prop22 = "Not Registered";
				pageObj.eVar22 = "Not Registered";
			}
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},

	// users has named a monkey
	avatarNamed: function(userCountry,userGender,userAge,userAccountAge){
		try{
			var pageObj = {
				pageName: 	"/monkeyAvatarNamed",
				channel:	"Adoption",
				hier1:		userCountry+"/"+userGender+"/"+userAge+"/"+userAccountAge+"/monkeyAvatarNamed",
				prop2: 		"/monkeyAvatarNamed",
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"Adoption Screen",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"/monkeyAvatarNamed",
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar33:		"Adoption Screen",
				eVar37:		String(mq.user.getMonkeyLevel()),
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				
				events:     ""
			};
			if(mq.user.isLoggedIn() == true){
				pageObj.prop69 = String(mq.user.getCampaignCode());
				pageObj.prop19 = userCountry;
				pageObj.prop20 = userGender;
				pageObj.prop21 = mq.user.getAge();
				pageObj.prop22 = String(mq.user.getAccountCreationDate());
				pageObj.prop71 = mq.user.isMember() ? "member" : "non member";
				
				pageObj.eVar69 = String(mq.user.getCampaignCode());
				pageObj.eVar19 = userCountry;
				pageObj.eVar20 = userGender;
				pageObj.eVar21 = mq.user.getAge();
				pageObj.eVar22 = String(mq.user.getAccountCreationDate());
				pageObj.eVar71 = mq.user.isMember() ? "member" : "non member";			
			}else{
				pageObj.prop22 = "Not Registered";
				pageObj.prop22 = "Not Registered";
			}
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},

// Add a death event function, duplicate one of these functions
// What was happening when character died?  Session info...is a part of the game to hard...death trends.
	videoPlayStart: function(host){
		try{
			var pageObj = {
				pageName: 	"/In Game Video Start",
				channel:	"Application",
				hier1:		"In Game Video Start",
				prop2: 		"/In Game Video Start",
				prop24: 	com.monkeyquest.client.qualityUsed,
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop27: 	status,
				prop28: 	host,
				prop33:		"Play Load",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"/In Game Video Start",
				//eVar24: 	com.monkeyquest.client.qualityUsed,
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar27: 	status,
				eVar28: 	host,
				eVar33:		"Play Load",
				eVar37:		String(mq.user.getMonkeyLevel()),
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				
				events:     ""
			};
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},

	videoPlaySkip: function(host){
		try{
			var pageObj = {			pageName: 	"/In Game Video Skip Button",
				channel:	"Application",
				hier1:		"In Game Video Skip Button",
				prop2: 		"/In Game Video Skip Button",
				prop24: 	com.monkeyquest.client.qualityUsed,
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop27: 	status,
				prop28: 	host,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"/In Game Video Skip Button",
				//eVar24: 	com.monkeyquest.client.qualityUsed,
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar27: 	status,
				eVar28: 	host,
				eVar33:		"game",
				eVar37:		String(mq.user.getMonkeyLevel()),
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,				
				
				events:     ""
			};
		}catch(e){	
			this.log(e);
		}
	},

	brandedLoader: function(advertiserName){
		try{
			var pageObj = {
				pageName: 	"Branded Loader - " + advertiserName,
				channel:	"Application",
				hier1:		advertiserName,
				prop2: 		"Branded Loader - " + advertiserName,
				prop24: 	com.monkeyquest.client.qualityUsed,
				prop25:		com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop27: 	status,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"Branded Loader - " + advertiserName,
				//eVar24: 	com.monkeyquest.client.qualityUsed,
				//eVar25:		com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar27: 	status,
				eVar33:		"game",
				eVar37:		String(mq.user.getMonkeyLevel()),
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				
				events:     ""
			};
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},

	adContent: function(eventId,contentID){
		try{
			var pageObj = {
					pageName: 	"Advertiser Content: " + eventId + ": " + contentID,
					channel:	"Application",
					hier1:		eventId,
					prop2: 		eventId + ": " + contentID,
					prop24: 	com.monkeyquest.client.qualityUsed,
					prop25:		com.monkeyquest.network.avgPingTime,
					prop26: 	com.monkeyquest.client.frameRate,
					prop27: 	status,
					prop33:		"game",
					prop37:		String(mq.user.getMonkeyLevel()),
					prop40:		com.monkeyquest.sso_id,
					prop43: 	location.pathname,
					prop51: 	"Advertiser: " + eventId,
					
					eVar2: 		eventId + ": " + contentID,
					//eVar24: 	com.monkeyquest.client.qualityUsed,
					//eVar25:		com.monkeyquest.network.avgPingTime,
					//eVar26: 	com.monkeyquest.client.frameRate,
					//eVar27: 	status,
					eVar33:		"game",
					eVar37:		String(mq.user.getMonkeyLevel()),
					eVar40:		com.monkeyquest.sso_id,
					eVar43: 	location.pathname,
					eVar51: 	"Advertiser: " + eventId,
					
					events:     ""
				};
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},
	adContentClick: function(eventId){
		try{
			var pageObj = {
				linkName:	"In game - Link Event " + eventId,
				linkType:	"o",
				eVar33:		"game", 
				eVar66:		"Clicked Event " + eventId,
				events:		"event60"
			};
			this.executeLinkEvent(pageObj);
		}catch(e){	
			this.log(e);
		}
	},

	// user has entered a new region or area in the game
	enterLocation: function(userCountry,userGender,userAge,userAccountAge,region,area){
		try{
			var pageObj = {
				pageName: 	"/Entering "+region+" "+area,
				channel:	region,
				hier1:		userCountry+"/"+userGender+"/"+userAge+"/"+userAccountAge+"/Entering "+region+" "+area,
				prop2: 		"/Entering "+region+" "+area,
				prop7:		region,
				prop8:		area,
				prop23: 	com.monkeyquest.level.loadTime,
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop39:		mq.user.isFullscreen() ? "Full Screen" : "Normal",
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"/Entering "+region+" "+area,
				eVar7:		region,
				eVar8:		area,
				//eVar23: 	com.monkeyquest.level.loadTime,
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar33:		"game",
				eVar37:		String(mq.user.getMonkeyLevel()),
				//eVar39:		mq.user.isFullscreen() ? "Full Screen" : "Normal",
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				
				events: 	""
			};
			if(mq.user.isLoggedIn() == true){
				pageObj.prop19 = userCountry;
				pageObj.prop20 = userGender;
				pageObj.prop21 = mq.user.getAge();
				pageObj.prop22 = String(mq.user.getAccountCreationDate());
				pageObj.prop69 = String(mq.user.getCampaignCode());
				pageObj.prop71 = mq.user.isMember() ? "member" : "non member";
				
				pageObj.eVar19 = userCountry;
				pageObj.eVar20 = userGender;
				pageObj.eVar21 = mq.user.getAge();
				pageObj.eVar22 = String(mq.user.getAccountCreationDate());
				pageObj.eVar69 = String(mq.user.getCampaignCode());
				pageObj.eVar71 = mq.user.isMember() ? "member" : "non member";
			}else{
				pageObj.eVar22 = "Not Registered";
				pageObj.prop22 = "Not Registered";
			}
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},
	// user has entered a new region or area in the game
	exitLocation: function(userCountry,userGender,userAge,userAccountAge,region,area){
		try{
			var pageObj = {
				pageName: 	"/Exit "+region+" "+area,
				channel:	region,
				hier1:		userCountry+"/"+userGender+"/"+userAge+"/"+userAccountAge+"/Exit "+region+" "+area,
				prop2: 		"/Exit "+region+" "+area,
				prop7:		region,
				prop8:		area,
				prop23: 	com.monkeyquest.level.loadTime,
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop39:		mq.user.isFullscreen() ? "Full Screen" : "Normal",
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"/Exit "+region+" "+area,
				eVar7:		region,
				eVar8:		area,
				//eVar23: 	com.monkeyquest.level.loadTime,
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar33:		"game",
				eVar37:		String(mq.user.getMonkeyLevel()),
				//eVar39:		mq.user.isFullscreen() ? "Full Screen" : "Normal",
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				
				events: 	""
			};
			if(mq.user.isLoggedIn() == true){
				pageObj.prop19 = userCountry;
				pageObj.prop20 = userGender;
				pageObj.prop21 = mq.user.getAge();
				pageObj.prop22 = String(mq.user.getAccountCreationDate());
				pageObj.prop69 = String(mq.user.getCampaignCode());
				pageObj.prop71 = mq.user.isMember() ? "member" : "non member";
				
				pageObj.eVar19 = userCountry;
				pageObj.eVar20 = userGender;
				pageObj.eVar21 = mq.user.getAge();
				pageObj.eVar22 = String(mq.user.getAccountCreationDate());
				pageObj.eVar69 = String(mq.user.getCampaignCode());
				pageObj.eVar71 = mq.user.isMember() ? "member" : "non member";
			}else{
				pageObj.eVar22 = "Not Registered";
				pageObj.prop22 = "Not Registered";
			}
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},
	// user has entered an arena challenge in the game
	enterArena: function(userCountry,userGender,userAge,userAccountAge,region,area,arena,numberInGroup){
		try{
			var pageObj = {
					pageName: 	"/Entering Arena "+arena+"/"+region+"/"+area,
					channel:	region,
					hier1:		userCountry+"/"+userGender+"/"+userAge+"/"+userAccountAge+"/Entering Arena "+arena+"/"+region+"/"+area,
					prop2: 		"/Entering Arena "+arena+"/"+region+"/"+area,
					prop7:		region,
					prop9:		arena,
					prop25: 	com.monkeyquest.network.avgPingTime,
					prop26: 	com.monkeyquest.client.frameRate,
					prop33:		"game",
					prop37:		String(mq.user.getMonkeyLevel()),
					prop40:		com.monkeyquest.sso_id,
					prop43: 	location.pathname,
					
					eVar2: 		"/Entering Arena "+arena+"/"+region+"/"+area,
					eVar7:		region,
					eVar9:		arena,
					//eVar25: 	com.monkeyquest.network.avgPingTime,
					//eVar26: 	com.monkeyquest.client.frameRate,
					eVar33:		"game",
					eVar37:		String(mq.user.getMonkeyLevel()),
					eVar40:		com.monkeyquest.sso_id,
					eVar43: 	location.pathname,
					events:     ""
			};
			if(mq.user.isLoggedIn() == true){
				pageObj.prop69 = String(mq.user.getCampaignCode());
				pageObj.prop19 = userCountry;
				pageObj.prop20 = userGender;
				pageObj.prop21 = mq.user.getAge();
				pageObj.prop22 = String(mq.user.getAccountCreationDate());
				pageObj.prop71 = mq.user.isMember() ? "member" : "non member";
				pageObj.eVar69 = String(mq.user.getCampaignCode());
				pageObj.eVar19 = userCountry;
				pageObj.eVar20 = userGender;
				pageObj.eVar21 = mq.user.getAge();
				pageObj.eVar22 = String(mq.user.getAccountCreationDate());
				pageObj.eVar71 = mq.user.isMember() ? "member" : "non member";
			}else{
				pageObj.prop22 = "Not Registered";
				pageObj.eVar22 = "Not Registered";
			}
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},

	// user has exited an arena challenge in the game, applies to winning or losing the challenge
	exitArena: function(userCountry,userGender,userAge,userAccountAge,region,area,arena,exitReason){
		try{
			var pageObj = {
				pageName: 	"/Exiting Arena "+arena+"/"+region+"/"+area,
				channel:	region,
				hier1:		userCountry+"/"+userGender+"/"+userAge+"/"+userAccountAge+"/Exiting Arena "+arena+"/"+region+"/"+area,
				prop2: 		"/Exiting Arena "+arena+"/"+region+"/"+area,
				prop7:		region,
				prop11:		exitReason,
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"/Exiting Arena "+arena+"/"+region+"/"+area,
				eVar7:		region,
				eVar11:		exitReason,
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar33:		"game",
				eVar37:		String(mq.user.getMonkeyLevel()),
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				
				events:     ""
			};
			if(mq.user.isLoggedIn() == true){
				pageObj.prop69 = String(mq.user.getCampaignCode());
				pageObj.prop19 = userCountry;
				pageObj.prop20 = userGender;
				pageObj.prop21 = mq.user.getAge();
				pageObj.prop22 = String(mq.user.getAccountCreationDate());
				pageObj.prop71 = mq.user.isMember() ? "member" : "non member";
				pageObj.eVar69 = String(mq.user.getCampaignCode());
				pageObj.eVar19 = userCountry;
				pageObj.eVar20 = userGender;
				pageObj.eVar21 = mq.user.getAge();
				pageObj.eVar22 = String(mq.user.getAccountCreationDate());
				pageObj.eVar71 = mq.user.isMember() ? "member" : "non member";
			}else{
				pageObj.prop22 = "Not Registered";
			}
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},

	// tracking call for when the game makes an eWallet request
	eWalletRequest: function(host, requestType) {
		//Depricated
		
	},

	// user has visited a vault
	vaultVisit: function(userCountry,userGender,userAge,userAccountAge,accessPoint){
		try{
			var pageObj = {
				pageName: 	"/Vault Visit/"+accessPoint,
				channel:	"Vault",
				hier1:		userCountry+"/"+userGender+"/"+userAge+"/"+userAccountAge+"/Vault Visit/"+accessPoint,
				prop2:		"/Vault Visit/"+accessPoint,
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2:		"/Vault Visit/"+accessPoint,
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar33:		"game",
				eVar37:		String(mq.user.getMonkeyLevel()),
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				
				events:     ""
			};
			if(mq.user.isLoggedIn() == true){
				pageObj.prop19 = userCountry;
				pageObj.prop20 = userGender;
				pageObj.prop21 = mq.user.getAge();
				pageObj.prop22 = String(mq.user.getAccountCreationDate());
				pageObj.prop69 = String(mq.user.getCampaignCode());
				pageObj.prop71 = mq.user.isMember() ? "member" : "non member";
				
				pageObj.eVar19 = userCountry;
				pageObj.eVar20 = userGender;
				pageObj.eVar21 = mq.user.getAge();
				pageObj.eVar22 = String(mq.user.getAccountCreationDate());
				pageObj.eVar69 = String(mq.user.getCampaignCode());
				pageObj.eVar71 = mq.user.isMember() ? "member" : "non member";
			}else{
				pageObj.prop22 = "Not Registered";
				pageObj.eVar22 = "Not Registered";
			}
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},

	// user has accepted a quest
	startQuest: function(userCountry,userGender,userAge,userAccountAge,questName,questID){
		try{
			var pageObj = {
				pageName: 	"/Started Quest "+questName,
				channel:	"Quest",
				hier1:		userCountry+"/"+userGender+"/"+userAge+"/"+userAccountAge+"/Started Quest "+questName,
				prop2: 		"/Started Quest "+questName,
				//prop4:      questID, //String(mq.user.getActiveQuest()),  returns -1
				prop13:		questName,
				prop14:		questID,
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"/Started Quest "+questName,
				//eVar4:      questID, //String(mq.user.getActiveQuest()),  returns -1
				eVar13:		questName,
				eVar14:		questID,
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar33:		"game",
				eVar37:		String(mq.user.getMonkeyLevel()),
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				
				events:   	"event8"
			};
			if(mq.user.isLoggedIn() == true){
				pageObj.prop19 = userCountry;
				pageObj.prop20 = userGender;
				pageObj.prop21 = mq.user.getAge();
				pageObj.prop22 = String(mq.user.getAccountCreationDate());
				pageObj.prop69 = String(mq.user.getCampaignCode());
				pageObj.prop71 = mq.user.isMember() ? "member" : "non member";
				
				pageObj.eVar19 = userCountry;
				pageObj.eVar20 = userGender;
				pageObj.eVar21 = mq.user.getAge();
				pageObj.eVar22 = String(mq.user.getAccountCreationDate());
				pageObj.eVar69 = String(mq.user.getCampaignCode());
				pageObj.eVar71 = mq.user.isMember() ? "member" : "non member";
			}else{
				pageObj.prop22 = "Not Registered";
				pageObj.eVar22 = "Not Registered";
			}
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},
	
	// user has collided with a tracked object
	trackedObjectReached: function(userCountry,userGender,userAge,userAccountAge,identifier,questID){
		try{
			var pageObj = {
				pageName: 	"/Tracked Object Reached "+identifier,
				channel:	"Quest",
				hier1:		userCountry+"/"+userGender+"/"+userAge+"/"+userAccountAge+"/Tracked Object Reached "+identifier,
				prop2: 		"/Tracked Object Reached "+identifier,
				//prop4:      questID, //String(mq.user.getActiveQuest()),  returns -1
				prop13:		identifier,
				prop14:		questID,
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"/Started Quest "+identifier,
				//eVar4:      questID, //String(mq.user.getActiveQuest()),  returns -1
				eVar13:		identifier,
				eVar14:		questID,
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar33:		"game",
				eVar37:		String(mq.user.getMonkeyLevel()),
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				
				events:   	"event8"
			};
			if(mq.user.isLoggedIn() == true){
				pageObj.prop19 = userCountry;
				pageObj.prop20 = userGender;
				pageObj.prop21 = mq.user.getAge();
				pageObj.prop22 = String(mq.user.getAccountCreationDate());
				pageObj.prop69 = String(mq.user.getCampaignCode());
				pageObj.prop71 = mq.user.isMember() ? "member" : "non member";
				
				pageObj.eVar19 = userCountry;
				pageObj.eVar20 = userGender;
				pageObj.eVar21 = mq.user.getAge();
				pageObj.eVar22 = String(mq.user.getAccountCreationDate());
				pageObj.eVar69 = String(mq.user.getCampaignCode());
				pageObj.eVar71 = mq.user.isMember() ? "member" : "non member";
			}else{
				pageObj.prop22 = "Not Registered";
				pageObj.eVar22 = "Not Registered";
			}
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},

	// user has accepted a quest
	// Modified 7/11 - now accepts region, and sets channel to region
	startQuest2: function(userCountry,userGender,userAge,userAccountAge,questName,questID,region){
		try{
			var pageObj = {
				pageName: 	"/Started Quest "+questName,
				channel:	region,
				hier1:		userCountry+"/"+userGender+"/"+userAge+"/"+userAccountAge+"/Started Quest "+questName,
				prop2: 		"/Started Quest "+questName,
				//prop4:      questID, //String(mq.user.getActiveQuest()),  /returns -1
				prop7:		region,
				prop13:		questName,
				prop14:		questID,
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"/Started Quest "+questName,
				//eVar4:      questID, //String(mq.user.getActiveQuest()),  /returns -1
				eVar7:		region,
				eVar13:		questName,
				eVar14:		questID,
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar33:		"game",
				eVar37:		String(mq.user.getMonkeyLevel()),
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				
				events:   	"event8"
			};
			if(mq.user.isLoggedIn() == true){
				pageObj.prop69 = String(mq.user.getCampaignCode());
				pageObj.prop19 = userCountry;
				pageObj.prop20 = userGender;
				pageObj.prop21 = mq.user.getAge();
				pageObj.prop22 = String(mq.user.getAccountCreationDate());
				pageObj.prop71 = mq.user.isMember() ? "member" : "non member";
				
				pageObj.eVar69 = String(mq.user.getCampaignCode());
				pageObj.eVar19 = userCountry;
				pageObj.eVar20 = userGender;
				pageObj.eVar21 = mq.user.getAge();
				pageObj.eVar22 = String(mq.user.getAccountCreationDate());
				pageObj.eVar71 = mq.user.isMember() ? "member" : "non member";
			}else{
				pageObj.prop22 = "Not Registered";
				pageObj.eVar22 = "Not Registered";
			}
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},

	// completed any step in the quest that is not the final step
	questStep: function(userCountry,userGender,userAge,userAccountAge,questName,questStep){
		try{
			var pageObj = {
				pageName: 	"/Quest Step "+questStep,
				channel:	"Quest",
				hier1:		userCountry+"/"+userGender+"/"+userAge+"/"+userAccountAge+"/Quest Step "+questStep,
				prop2: 		"/Quest Step "+questStep,
				//prop4:      String(mq.user.getActiveQuest()),
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"/Quest Step "+questStep,
				//eVar4:      String(mq.user.getActiveQuest()),
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar33:		"game",
				eVar37:		String(mq.user.getMonkeyLevel()),
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				
				events:   	"event9"
			};
			if(mq.user.isLoggedIn() == true){
				pageObj.prop19 = userCountry;
				pageObj.prop20 = userGender;
				pageObj.prop21 = mq.user.getAge();
				pageObj.prop22 = String(mq.user.getAccountCreationDate());
				pageObj.prop69 = String(mq.user.getCampaignCode());
				pageObj.prop71 = mq.user.isMember() ? "member" : "non member";
				
				pageObj.eVar19 = userCountry;
				pageObj.eVar20 = userGender;
				pageObj.eVar21 = mq.user.getAge();
				pageObj.eVar22 = String(mq.user.getAccountCreationDate());
				pageObj.eVar69 = String(mq.user.getCampaignCode());
				pageObj.eVar71 = mq.user.isMember() ? "member" : "non member";
			}else{
				pageObj.prop22 = "Not Registered";
				pageObj.eVar22 = "Not Registered";
			}
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},

	// completed any step in the quest that is not the final step
	// Modified 7/11 - now accepts questID and region, and sets props 13 and 14 and sets channel to region
	questStep2: function(userCountry,userGender,userAge,userAccountAge,questName,questStep,questID,region){
		try{
			var pageObj = {
				pageName: 	"/Quest Step "+questStep,
				channel:	region,
				hier1:		userCountry+"/"+userGender+"/"+userAge+"/"+userAccountAge+"/Quest Step "+questStep,
				prop2: 		"/Quest Step "+questStep,
				//prop4:      String(mq.user.getActiveQuest()),
				prop7:		region,
				prop13:		questName,
				prop14:		questID,
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"/Quest Step "+questStep,
				//eVar4:      String(mq.user.getActiveQuest()),
				eVar7:		region,
				eVar13:		questName,
				eVar14:		questID,
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar33:		"game",
				eVar37:		String(mq.user.getMonkeyLevel()),
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				
				events:   	"event9"
			};
			if(mq.user.isLoggedIn() == true){
				pageObj.prop69 = String(mq.user.getCampaignCode());
				pageObj.prop19 = userCountry;
				pageObj.prop20 = userGender;
				pageObj.prop21 = mq.user.getAge();
				pageObj.prop22 = String(mq.user.getAccountCreationDate());
				pageObj.prop71 = mq.user.isMember() ? "member" : "non member";
				
				pageObj.eVar69 = String(mq.user.getCampaignCode());
				pageObj.eVar19 = userCountry;
				pageObj.eVar20 = userGender;
				pageObj.eVar21 = mq.user.getAge();
				pageObj.eVar22 = String(mq.user.getAccountCreationDate());
				pageObj.eVar71 = mq.user.isMember() ? "member" : "non member";
			}else{
				pageObj.prop22 = "Not Registered";
				pageObj.eVar22 = "Not Registered";
			}
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},

	// final step in the quest
	completeQuest: function(userCountry,userGender,userAge,userAccountAge,questName){
		try{
			var pageObj = {
				pageName: 	"/Quest "+questName+" Completed",
				channel:	"Quest",
				hier1:		userCountry+"/"+userGender+"/"+userAge+"/"+userAccountAge+"/Quest "+questName+" Completed",
				prop2: 		"/Quest "+questName+" Completed",
				//prop4:      String(mq.user.getActiveQuest()),
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"/Quest "+questName+" Completed",
				//eVar4:      String(mq.user.getActiveQuest()),
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar33:		"game",
				eVar37:		String(mq.user.getMonkeyLevel()),
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				events:   	"event10"
			};
			if(mq.user.isLoggedIn() == true){
				pageObj.prop69 = String(mq.user.getCampaignCode());
				pageObj.prop19 = userCountry;
				pageObj.prop20 = userGender;
				pageObj.prop21 = mq.user.getAge();
				pageObj.prop22 = String(mq.user.getAccountCreationDate());
				pageObj.prop71 = mq.user.isMember() ? "member" : "non member";
				
				pageObj.eVar69 = String(mq.user.getCampaignCode());
				pageObj.eVar19 = userCountry;
				pageObj.eVar20 = userGender;
				pageObj.eVar21 = mq.user.getAge();
				pageObj.eVar22 = String(mq.user.getAccountCreationDate());
				pageObj.eVar71 = mq.user.isMember() ? "member" : "non member";
			}else{
				pageObj.prop22 = "Not Registered";
				pageObj.eVar22 = "Not Registered";
			}
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},
	// final step in the quest
	// Modified 7/11 - now accepts questID and region, and sets props 13 and 14 and sets channel to region
	completeQuest2: function(userCountry,userGender,userAge,userAccountAge,questName,questID,region){
		try{
			var questEvents = "event10";
			if(questName == "THEMONKEYKINGARTIFACT"){
				questEvents += ",event75"
			}
			
			var pageObj = {
				pageName: 	"/Quest "+questName+" Completed",
				channel:	region,
				hier1:		userCountry+"/"+userGender+"/"+userAge+"/"+userAccountAge+"/Quest "+questName+" Completed",
				prop2: 		"/Quest "+questName+" Completed",
				//prop4:      String(mq.user.getActiveQuest()),
				prop7:		region,
				prop13:		questName,
				prop14:		questID,
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"/Quest "+questName+" Completed",
				//eVar4:      String(mq.user.getActiveQuest()),
				eVar7:		region,
				eVar13:		questName,
				eVar14:		questID,
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar33:		"game",
				eVar37:		String(mq.user.getMonkeyLevel()),
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				events:   	questEvents
			};
			if(mq.user.isLoggedIn() == true){
				pageObj.prop69 = String(mq.user.getCampaignCode());
				pageObj.prop19 = userCountry;
				pageObj.prop20 = userGender;
				pageObj.prop21 = mq.user.getAge();
				pageObj.prop22 = String(mq.user.getAccountCreationDate());
				pageObj.prop71 = mq.user.isMember() ? "member" : "non member";
				
				pageObj.eVar69 = String(mq.user.getCampaignCode());
				pageObj.eVar19 = userCountry;
				pageObj.eVar20 = userGender;
				pageObj.eVar21 = mq.user.getAge();
				pageObj.eVar22 = String(mq.user.getAccountCreationDate());
				pageObj.eVar71 = mq.user.isMember() ? "member" : "non member";
			}else{
				pageObj.prop22 = "Not Registered";
				pageObj.eVar22 = "Not Registered";
			}
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},
	failedQuest2: function(userCountry,userGender,userAge,userAccountAge,questName,questID,region){
		try{
		
			var pageObj = {
				pageName: 	"/Quest "+questName+" Failed",
				channel:	region,
				hier1:		userCountry+"/"+userGender+"/"+userAge+"/"+userAccountAge+"/Quest "+questName+" Failed",
				prop2: 		"/Quest "+questName+" Failed",
				//prop4:      String(mq.user.getActiveQuest()),
				prop7:		region,
				prop13:		questName,
				prop14:		questID,
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"/Quest "+questName+" Failed",
				//eVar4:      String(mq.user.getActiveQuest()),
				eVar7:		region,
				eVar13:		questName,
				eVar14:		questID,
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar33:		"game",
				eVar37:		String(mq.user.getMonkeyLevel()),
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				events:   	""
			};
			if(mq.user.isLoggedIn() == true){
				pageObj.prop69 = String(mq.user.getCampaignCode());
				pageObj.prop19 = userCountry;
				pageObj.prop20 = userGender;
				pageObj.prop21 = mq.user.getAge();
				pageObj.prop22 = String(mq.user.getAccountCreationDate());
				pageObj.prop71 = mq.user.isMember() ? "member" : "non member";
				
				pageObj.eVar69 = String(mq.user.getCampaignCode());
				pageObj.eVar19 = userCountry;
				pageObj.eVar20 = userGender;
				pageObj.eVar21 = mq.user.getAge();
				pageObj.eVar22 = String(mq.user.getAccountCreationDate());
				pageObj.eVar71 = mq.user.isMember() ? "member" : "non member";
			}else{
				pageObj.prop22 = "Not Registered";
				pageObj.eVar22 = "Not Registered";
			}
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},
	// called every 50 bananas a monkey has collected
	// removing Banana calls per Jim 7/11
	bananasEarned: function(userCountry,userGender,userAge,userAccountAge,region,area){
		return;
	},

	// when purchases an item (with bananas or nc) from one of the 'shops' in the game
	// deprecated  9/26/2012 will merge with buyProducts
	purchaseItem: function(userCountry,userGender,userAge,userAccountAge,itemID,currencyType,amount,region,area){
		try{
			var eventTitle = currencyType.indexOf("anana") > -1 ? "event2" : "event3";
			var pageObj = {
				pageName: 	"/Purchased "+itemID+"/"+region+"/"+area,
				channel:	region,
				hier1:		userCountry+"/"+userGender+"/"+userAge+"/"+userAccountAge+"/Purchased "+itemID+"/"+region+"/"+area,
				prop2: 		"/Purchased "+itemID+"/"+region+"/"+area,
				prop7:		region,
				//prop15:		itemID,
				products:	";;;;" + eventTitle + "=" + amount + ";",
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				eVar2: 		"/Purchased "+itemID+"/"+region+"/"+area,
				eVar7:		region,
				//eVar15:		itemID,
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar33:		"game",
				eVar37:		String(mq.user.getMonkeyLevel()),
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				
				events:		eventTitle
			};
	
			if(mq.user.isLoggedIn() == true){
				pageObj.prop69 = String(mq.user.getCampaignCode());
				pageObj.prop19 = userCountry;
				pageObj.prop20 = userGender;
				pageObj.prop21 = mq.user.getAge();
				pageObj.prop22 = String(mq.user.getAccountCreationDate());
				pageObj.prop71 = mq.user.isMember() ? "member" : "non member";
				
				pageObj.eVar69 = String(mq.user.getCampaignCode());
				pageObj.eVar19 = userCountry;
				pageObj.eVar20 = userGender;
				pageObj.eVar21 = mq.user.getAge();
				pageObj.eVar22 = String(mq.user.getAccountCreationDate());
				pageObj.eVar71 = mq.user.isMember() ? "member" : "non member";
			}else{
				pageObj.prop22 = "Not Registered";
				pageObj.eVar22 = "Not Registered";
			}
			//this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},
	
	// user visits a 'shop' in the game
	shopVisit: function(userCountry,userGender,userAge,userAccountAge,region,area){
		try{
			var pageObj = {
				pageName: 	"/Shop Visit/"+region+"/"+area,
				channel:	region,
				hier1:		userCountry+"/"+userGender+"/"+userAge+"/"+userAccountAge+"/Shop Visit/"+region+"/"+area,
				prop2: 		"/Shop Visit/"+region+"/"+area,
				prop7:		region,
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"/Shop Visit/"+region+"/"+area,
				eVar7:		region,
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar33:		"game",
				eVar37:		String(mq.user.getMonkeyLevel()),
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				events:     ""
			};
			if(mq.user.isLoggedIn() == true){
				pageObj.prop69 = String(mq.user.getCampaignCode());
				pageObj.prop19 = userCountry;
				pageObj.prop20 = userGender;
				pageObj.prop21 = mq.user.getAge();
				pageObj.prop22 = String(mq.user.getAccountCreationDate());
				pageObj.prop71 = mq.user.isMember() ? "member" : "non member";
				
				pageObj.eVar69 = String(mq.user.getCampaignCode());
				pageObj.eVar19 = userCountry;
				pageObj.eVar20 = userGender;
				pageObj.eVar21 = mq.user.getAge();
				pageObj.eVar22 = String(mq.user.getAccountCreationDate());
				pageObj.eVar71 = mq.user.isMember() ? "member" : "non member";
			}else{
				pageObj.prop22 = "Not Registered";
				pageObj.eVar22 = "Not Registered";
			}
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},

	
	
	shopVisit2: function(userCountry,userGender,userAge,userAccountAge,region,area,vendorName){
		// deprecated  9/26/2012 see viewProducts
	},

	// monster has been defeated, this includes anything the monkey defeats in the game
	monsterDefeated: function(userCountry,userGender,userAge,userAccountAge,region,area,monsterID){
		try{
			var pageObj = {
				pageName: 	"/Monster Defeated/"+region+"/"+area,
				channel:	region,
				hier1:		userCountry+"/"+userGender+"/"+userAge+"/"+userAccountAge+"/Monster Defeated/"+region+"/"+area,
				prop2: 		"/Monster Defeated/"+region+"/"+area,
				prop7:		region,
				prop16:		monsterID,
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				eVar2: 		"/Monster Defeated/"+region+"/"+area,
				eVar7:		region,
				eVar16:		monsterID,
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar33:		"game",
				eVar37:		String(mq.user.getMonkeyLevel()),
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				events:     ""
			};
			if(mq.user.isLoggedIn() == true){
				pageObj.prop69 = String(mq.user.getCampaignCode());
				pageObj.prop19 = userCountry;
				pageObj.prop20 = userGender;
				pageObj.prop21 = mq.user.getAge();
				pageObj.prop22 = String(mq.user.getAccountCreationDate());
				pageObj.prop71 = mq.user.isMember() ? "member" : "non member";
				
				pageObj.eVar69 = String(mq.user.getCampaignCode());
				pageObj.eVar19 = userCountry;
				pageObj.eVar20 = userGender;
				pageObj.eVar21 = mq.user.getAge();
				pageObj.eVar22 = String(mq.user.getAccountCreationDate());
				pageObj.eVar71 = mq.user.isMember() ? "member" : "non member";
			}else{
				pageObj.prop22 = "Not Registered";
				pageObj.eVar22 = "Not Registered";
			}
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},

	// called when the user opens the recipe book in thier backpack
	visitCraftingStation: function(userCountry,userGender,userAge,userAccountAge,region,area,craftingStationName){
		try{
			var pageObj = {
				pageName: 	"/Visiting Crafting Station "+craftingStationName+"/"+region+"/"+area,
				channel:	region,
				hier1:		userCountry+"/"+userGender+"/"+userAge+"/"+userAccountAge+"/Visiting Crafting Station "+craftingStationName+"/"+region+"/"+area,
				prop2: 		"/Visiting Crafting Station "+craftingStationName+"/"+region+"/"+area,
				prop7:		region,
				prop17:		craftingStationName,
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"/Visiting Crafting Station "+craftingStationName+"/"+region+"/"+area,
				eVar7:		region,
				eVar17:		craftingStationName,
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar33:		"game",
				eVar37:		String(mq.user.getMonkeyLevel()),
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				events:     ""
			};
			if(mq.user.isLoggedIn() == true){
				pageObj.prop69 = String(mq.user.getCampaignCode());
				pageObj.prop19 = userCountry;
				pageObj.prop20 = userGender;
				pageObj.prop21 = mq.user.getAge();
				pageObj.prop22 = String(mq.user.getAccountCreationDate());
				pageObj.prop71 = mq.user.isMember() ? "member" : "non member";
				
				pageObj.eVar69 = String(mq.user.getCampaignCode());
				pageObj.eVar19 = userCountry;
				pageObj.eVar20 = userGender;
				pageObj.eVar21 = mq.user.getAge();
				pageObj.eVar22 = String(mq.user.getAccountCreationDate());
				pageObj.eVar71 = mq.user.isMember() ? "member" : "non member";
			}else{
				pageObj.prop22 = "Not Registered";
				pageObj.eVar22 = "Not Registered";
			}
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},

	// called when a user completes one of the steps in a recipe
	craftingStep: function(userCountry,userGender,userAge,userAccountAge,region,area,craftingStationName,craftingStep){
		//Not used
		return;
	},

	// called when user has finished crafting one of the recipes
	itemCrafted: function(userCountry,userGender,userAge,userAccountAge,region,area,itemID){
		try{
			var pageObj = {
				pageName: 	"Item Crafted/"+itemID+"/"+region+"/"+area,
				channel:	region,
				hier1:		userCountry+"/"+userGender+"/"+userAge+"/"+userAccountAge+"/"+itemID+"/"+region+"/"+area,
				prop2: 		"/"+itemID+"/"+region+"/"+area,
				prop7:		region,
				prop18:		itemID,
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"/"+itemID+"/"+region+"/"+area,
				eVar7:		region,
				eVar18:		itemID,
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar33:		"game",
				eVar37:		String(mq.user.getMonkeyLevel()),
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				events:     ""
			};
			if(mq.user.isLoggedIn() == true){
				pageObj.prop69 = String(mq.user.getCampaignCode());
				pageObj.prop19 = userCountry;
				pageObj.prop20 = userGender;
				pageObj.prop21 = mq.user.getAge();
				pageObj.prop22 = String(mq.user.getAccountCreationDate());
				pageObj.prop71 = mq.user.isMember() ? "member" : "non member";
				
				pageObj.eVar69 = String(mq.user.getCampaignCode());
				pageObj.eVar19 = userCountry;
				pageObj.eVar20 = userGender;
				pageObj.eVar21 = mq.user.getAge();
				pageObj.eVar22 = String(mq.user.getAccountCreationDate());
				pageObj.eVar71 = mq.user.isMember() ? "member" : "non member";
	
			}else{
				pageObj.prop22 = "Not Registered";
				pageObj.eVar22 = "Not Registered";
			}
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},

	// called when user clicks on Membership Upsell
	membershipUpsell: function(upsellID){
		try{
			var pageObj = {
				pageName: 	"Membership Upsell: "+upsellID,
				channel:	com.monkeyquest.level.name,
				hier1:		"Membership Upsell/"+upsellID,
				prop2: 		"Membership Upsell: "+upsellID,
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				
				eVar2: 		"Membership Upsell: "+upsellID,
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar33:		"game",
				eVar37:		String(mq.user.getMonkeyLevel()),
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				events:     ""
			};
			this.executePageCall(pageObj);
		}catch(e){	
			this.log(e);
		}
	},

	// called when user is prompted to purchase a Key
	keyPurchasePrompt: function() {
		/*
		var nextExecuteTime = new Date() - 1, lastType, lastID;

		return function(keyPurchaseType, keypurchaseTypeID) {
			if ( new Date() < nextExecuteTime && keyPurchaseType === lastType && keypurchaseTypeID === lastID ) {
				nextExecuteTime = +new Date() + 5000;
				return;
			}

			lastType        = keyPurchaseType;
			lastID          = keypurchaseTypeID;
			nextExecuteTime = +new Date() + 5000;

			this.executePageCall({
				pageName: 	"Key Purchase Prompt",
				channel:	com.monkeyquest.level.name,
				hier1:		"Key Purchase Prompt",
				prop2: 		"Key Purchase Prompt",
				prop25: 	com.monkeyquest.network.avgPingTime,
				prop26: 	com.monkeyquest.client.frameRate,
				prop33:		"game",
				prop37:		String(mq.user.getMonkeyLevel()),
				prop40:		com.monkeyquest.sso_id,
				prop43: 	location.pathname,
				prop55:		keyPurchaseType + ": "+keypurchaseTypeID,
				
				eVar2: 		"Key Purchase Prompt",
				//eVar25: 	com.monkeyquest.network.avgPingTime,
				//eVar26: 	com.monkeyquest.client.frameRate,
				eVar33:		"game",
				eVar37:		String(mq.user.getMonkeyLevel()),
				eVar40:		com.monkeyquest.sso_id,
				eVar43: 	location.pathname,
				//eVar55:		keyPurchaseType + ": "+keypurchaseTypeID,
				events:     ""
			});
		};*/
	},

	// Called when the Promo Popup window opens
	promoPopup: function(promoID){
		this.executePageCall({
			pageName: 	"NC Mall Promo Popup: " + promoID,
			channel:	com.monkeyquest.level.name,
			hier1:		"NC Mall Promo Popup: " + promoID,
			prop2: 		"NC Mall Promo Popup: " + promoID,
			prop25: 	com.monkeyquest.network.avgPingTime,
			prop26: 	com.monkeyquest.client.frameRate,
			prop33:		"game",
			prop37:		String(mq.user.getMonkeyLevel()),
			prop40:		com.monkeyquest.sso_id,
			prop43: 	location.pathname,
			
			eVar2: 		"NC Mall Promo Popup: " + promoID,
			//eVar25: 	com.monkeyquest.network.avgPingTime,
			//eVar26: 	com.monkeyquest.client.frameRate,
			eVar33:		"game",
			eVar37:		String(mq.user.getMonkeyLevel()),
			eVar40:		com.monkeyquest.sso_id,
			eVar43: 	location.pathname,
			
			events:     ""
		});
	},


	// sets cookie so we know that they are attempting to install unity
	unityInstallAttempt: function() {
		mtvn.btg.util.Cookie.set('mqUnityStatus', 'installAttempt');

		this.executePageCall({
			pageName:	"Play Popup - /en/play/popup/installAttempt",
			channel:	"Play Popup",
			prop33:		"site",
			prop27:		"Install Attempt",
			eVar33:		"site",
			eVar27:		"Install Attempt",
			hier1:		"Play Popup - /en/play/popup/installAttempt",
			events:     "event79"
		});
	},

	// Detects if unity is installed and working
	detectUnity: function () {
		var status = "Not Installed";
		var win = window;
		var doc = document;
		var nav = navigator;
		var cookieVal = mtvn.btg.util.Cookie.read('mqUnityStatus');
		nav.plugins.refresh();

		if (typeof nav.plugins != "undefined" && nav.plugins["Unity Player"] && typeof nav.mimeTypes != "undefined" && nav.mimeTypes["application/vnd.unity"] && nav.mimeTypes["application/vnd.unity"].enabledPlugin) {
			status = "Installed";
			// see if the user clicked the install button from our site to get the plugin
			if (cookieVal && cookieVal == "installAttempt") {
				status = "Install Success";
				mtvn.btg.util.Cookie.set('mqUnityStatus', 'Done');
			}
		}
		else if (typeof win.ActiveXObject != "undefined") {
			try {
				var pv = new ActiveXObject("UnityWebPlayer.UnityWebPlayer.1").GetPluginVersion();
				if (cookieVal && cookieVal == "installAttempt") {
					status = "Install Success";
					mtvn.btg.util.Cookie.set('mqUnityStatus', 'Done');
				} else {
					status = "Installed";
				}
				// 2.5.0 auto update has issues on vista and later
				if (pv == "2.5.0f5") {
					var m = /Windows NT \d+\.\d+/.exec(nav.userAgent);
					if (m && m.length > 0) {
						var wv = parseFloat(m[0].split(' ')[2]);
						if (wv >= 6) {
							status += " -  Broken";
						}
					}
				}
			} catch (ex) {
				// In IE when you first install Unity we can can not see the plugin
				// for some reason IE only sees the plugin when the browser is restarted
				// this is a hack to work around it
				if ( mq.client.getClient() ) {
					if (cookieVal && cookieVal == "installAttempt") {
						status = "Install Success";
						mtvn.btg.util.Cookie.set('mqUnityStatus', 'Done');
					} else {
						status = "Installed";
					}
				}
			}
		}

		// if the user tried to install the plugin and failed
		if (cookieVal && cookieVal == "installAttempt" && status.indexOf("Not Installed") > -1) {
			status = "Install Attempt Failed";
			mtvn.btg.util.Cookie.set('mqUnityStatus', 'Done');
		}
		return status;
	},

	gaq: function(json) {
		if ( _gaq && _gaq.push ) {
			_gaq.push(dojo.fromJson(json));
		}
	}
});
MQStats.initFacade();



}
/*
     FILE ARCHIVED ON 09:03:48 Jan 23, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 14:51:05 May 07, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 5.247
  exclusion.robots: 0.141
  exclusion.robots.policy: 0.121
  cdx.remote: 0.116
  esindex: 0.018
  LoadShardBlock: 166.124 (3)
  PetaboxLoader3.datanode: 83.379 (4)
  PetaboxLoader3.resolve: 236.71 (2)
  load_resource: 192.116
*/