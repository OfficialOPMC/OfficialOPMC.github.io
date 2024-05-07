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

/*mboxTrack() & mboxTrackLink() & mboxTrackDefer() v4 ==>Mbox.js Extra Javascript*/var mboxTrack=function(mbox,params){var m,u,i,f=mboxFactoryDefault;if(f.isEnabled()){if(f.getMboxes().length()>0){m=f.getMboxes().getById(0);u=m.getURL().replace("mbox="+escape(m.getName()),"mbox="+mbox).replace("/undefined","/ajax").replace("mboxPage="+f.getPageId(),"mboxPage="+mboxGenerateId())+'&'+params,i=new Image();i.style.display='none';i.src=u;document.body.appendChild(i)}else{mboxTrackDefer(mbox,params)}}},mboxTrackDefer=function(mbox,params){var f=mboxFactoryDefault;if(f.isEnabled()){mboxFactoryDefault.getSignaler().signal(mbox,mbox+'&'+params)}},mboxTrackLink=function(mbox,params,url){mboxTrack(mbox,params);setTimeout("location='"+url+"'",500)};

}
/*
     FILE ARCHIVED ON 09:04:41 Jan 23, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:28:13 May 06, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 1.124
  exclusion.robots: 0.141
  exclusion.robots.policy: 0.127
  cdx.remote: 0.122
  esindex: 0.015
  LoadShardBlock: 48.395 (3)
  PetaboxLoader3.datanode: 104.282 (4)
  load_resource: 189.204
  PetaboxLoader3.resolve: 107.704
*/