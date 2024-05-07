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

ooktime = function()
{
  this.d;
  
  this.get_ooktime();
  setInterval(this.get_ooktime, 30000);
}

ooktime.prototype.get_ooktime = function()
{
  this.d = new Date();
  this.localtime = this.d.getTime();
  this.localOffset = this.d.getTimezoneOffset() * 60000;
  this.utc = this.localtime + this.localOffset;
  
  var _dst = dstDate(this.d.getFullYear());
  
  this.pacificTime;
  if(this.localtime > _dst.on.getTime() && this.localtime < _dst.off.getTime())
  {
    this.pacificTime = -7;
  }
  else
  {
    this.pacificTime = -8;
  }
  
  this.timezone = 'PST';

  this.ooktime = this.utc + (3600000 * this.pacificTime);
  
  this.nd = new Date(this.ooktime);
  this.hours = this.nd.getHours();
  this.minutes = this.nd.getMinutes();
  
  this.ampm = (this.hours >= 12) ? 'PM' : 'AM';
  this.hours = (this.hours > 12) ? this.hours - 12 : this.hours;
  this.hours = (this.hours < 10) ? "0" + this.hours : this.hours;
  this.minutes = (this.minutes <= 9) ? "0" + this.minutes : this.minutes;
  
  this.str = this.hours + ':'+ this.minutes +' ' + this.ampm + ' ' + this.timezone;
  
  $('#timeholer').html(this.str);
}

dstDate = function(yr)
{
  if ( yr<1987 ) return; // Outside range
  
  // Work out last possible on/off date
  var don = (yr<2007)? 38 : 14;
  var dof = (yr<2007)? 31 : 38;
  
  // Create initial on/off date objects
  var DSTon = new Date(yr, 2, don, 2);
  var DSToff = new Date(yr, 9, dof, 2);
  
  // Adjust to Sunday before last possible date (adjustment may be 0)
  DSTon.setDate( DSTon.getDate() - DSTon.getDay() );
  DSToff.setDate( DSToff.getDate() - DSToff.getDay() );
  
  return {'on': DSTon, 'off': DSToff};
}


}
/*
     FILE ARCHIVED ON 12:04:50 Jan 23, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:28:10 May 06, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 1.07
  exclusion.robots: 0.077
  exclusion.robots.policy: 0.067
  cdx.remote: 0.056
  esindex: 0.009
  LoadShardBlock: 37.356 (3)
  PetaboxLoader3.datanode: 121.395 (5)
  load_resource: 241.344 (2)
  PetaboxLoader3.resolve: 133.052 (2)
*/