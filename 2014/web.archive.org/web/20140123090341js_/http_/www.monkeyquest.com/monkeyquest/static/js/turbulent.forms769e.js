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

//////////////////////////////////////////////////
//
// JQuery Forms Manager
// Marc Trudel
// =================================================
//
// Functions and plugins : 
//	----------------------------------------------------------------------
// 	toJSONString : take a jQuery element, parses for form element and stringify
//  ----------------------------------------------------------------------
//
//	******** Depends on json2.js
//
//	Call	:	jQuery(elem).toJsonString()
//	Return	:	String
//	Args	:	None
//
//
//	----------------------------------------------------------------------
// 	FormFields, FormFieldsArray, FilledFormFields, FilledFormFieldsArray
//  ----------------------------------------------------------------------
//
//	Call	:	jQuery(elem).FormFields()
//				jQuery(elem).FormFieldsArray()
//	Return	:	jQuery object / Javascript array
//	Args	:	None
//
//	----------------------------------------------------------------------
// 	FormHelper	: create a bubble near a form field
//  ----------------------------------------------------------------------
//
//	Call	:	jQuery(elem).FormHelper(array, effect, helperClass)
//	Returns	: 	jQuery(elem)
//	Args	:
//
//		array:	field list and help text
//
//			ex:	{"#id" : "Some help text", ".myclass" : "Some other txt"}
//
//			default: none
//
//		effect:	effect to apply to appear / disapear. if effect is one way,
//				i.e. fadeIn, it will be reverted on disappear, i.e. fadeOut
//
//			ex:	"fadeIn('fast')"
//				"slideToggle('slow')"
//
//			default: show / hide
//
//		helperClass	: class to identify the form helper and style it
//
//			ex : "formhelperclass"
//
//			default : "formHelper"
//
//	-------------------------------------------------------------------------------------------
// 	FormValidation	: implement javascript form validation with Regex
//  -------------------------------------------------------------------------------------------
//
//	Call	:	jQuery(elem).FormValidation(array, required_tag)
//	Returns	: 	jQuery(elem)
//	Args	:
//
//		array:	field list and regex - empty regex means make sure field is non-empty
//
//			ex:	{"#id" : "", ".myclass" : "|[a-zA-Z]+|"}
//
//			default: none
//
//		required_tag: HTML or text element to  place after the related label.
//
//					  For instance, if you have :
//						<label for="bleh">Bleh</label><input type="text" name="bleh" id="bleh" />
//
//					  You will end up with
//						<label for="bleh">Bleh</label>*<input type="text" name="bleh" id="bleh" />
//
//					  Or
//						<label for="bleh">Bleh</label>*<input type="text" name="bleh" id="bleh" />
//
//			ex:	"*"
//				"<span class='reqElem'>*</span>"
//				"<img class='req' src='bleh/imgs.jpg' />"
//
//			default: ""
//
//				
//	---------------------------------------------------------------------------------------------
// 	FormAjaxSubmit, FormAjaxGetSubmit, FormAjaxPostSubmit : Submit a form, Web 2.0 jQuery style
//  ---------------------------------------------------------------------------------------------
//
//	Call	:	jQuery(elem).FormAjaxPostSubmit(url, funct, json);
//				jQuery(elem).FormAjaxSubmit(url, funct, json, method);

//	Returns	: 	Mixed - return the result of the callback function
//	Args	:
//
//			url	: Remote Gateway
//			
//				ex : "url.php"
//
//			funct : Callback function. The result of this function will be the return val of this 
//					callback
//
//				ex : function(data){ return data; }
//			
//			json : data returned is json or XML / XHTML?
//
//				default : false;
//
//				ex : true
//				
//				
//	---------------------------------------------------------------------------------------------
// 	Query Helper, action & event handlers
//  ---------------------------------------------------------------------------------------------
//
//	Notes : Checkables elements are radio buttons and checkboxes
//			Selectables elements are options within select
//			Fillables elements are textarea, input text and passwords
//
//	Query Helpers :
//		checked, unchecked, checkables, selected, unselected, selectables, filled, unfilled, fillables
//
//		Return elements according to what is required
//			Example : jQuery("#myForm").checkables().remove();
//					  jQuery("#myDiv").selected();
//					  jQuery("#myForm").filled().each(function(i){ text += jQuery(this).val(); });
//
//	Action:
//		check, uncheck, fill, unfill, select, unselect
//
//		Returns  the same element
//			Example : jQuery("#checkable_el").check();
//					  jQuery("#myform").uncheck();
//
//	Event handlers :
//		oncheck, onuncheck, onfill, onunfill, onselect, onunselect
//
//		If false is specified as second arg, the event will be triggered only on the first occurence.
//
//		Return elements according to what is required
//			Example : jQuery("#myForm").oncheck(function(e){ alert("TATA");  });
//					  jQuery("#myTextBox").onunfill(
//							function(e){ 
//								alert("The string became shorter!");  
//							}, false);
//
//
//
//
//
///////////////////////////////////////////////////////////////////////////////////////////////////

jQuery.forms = {
	//////////////////////////////////////
	// Vars to set with the handler
	//////////////////////////////////////
	
	helperClass : "formHelper",
	activeClass : "fieldActive",
	requiredClass : "fieldRequired",
	messageBox : "",
	messageBoxOKMsg : "ok",
	messaegBoxErrMsg : "error",
	ajax_action : "get",
	ajax_json	: 'false',
	
	//////////////////////////////////////
	// Actions
	//////////////////////////////////////
	
	handler : function(d){
		helperClass = d.helperClass ? d.helperClass : helperClass;
		activeClass = d.activeClass ? d.activeClass : activeClass;
		requiredClass = d.requiredClass ? d.requiredClass : requiredClass;
		messageBox = d.messageBox ? d.messageBox : messageBox;
		messageBoxOKMsg = d.messageBoxOKMsg ? d.messageBoxOKMsg : messageBoxOKMsg;
		messaegBoxErrMsg = d.messageBoxErrMsg ? d.messageBoxErrMsg : messageBoxErrMsg;
		
		fields = this.fields;
		
		fields.focus(function(){ this.addClass(activeClass); })
			  .blur(function(){ this.removeClass(activeClass); });
	},
	filled_fields_array : function(){
        var params = {};
        jQuery("input[checked], input[type='text'], input[type='hidden'], input[type='password'], input[type='submit'], option[selected], textarea", this).each(
                function(){
                        params[ this.name || this.id || this.parentNode.name || this.parentNode.id ] = this.value;
                }
        );
        return params;
	},
	fields_array : function(){
        var params = {};
        jQuery("input, select, option, textarea", this).each(
                function(){
                        params[ this.name || this.id || this.parentNode.name || this.parentNode.id ] = this.value;
                }
        );
        return params;
	},
	filled_fields : function(){
        return jQuery("input[checked], input[type='text'], input[type='hidden'], input[type='password'], input[type='submit'], option[selected], textarea", this);
	},
	fields : function(){
        return jQuery("input, select, option, textarea", this);
	},
	fields_helper : function(d, effect, helperclass){	

		elems = jQuery(this).FormFields() || jQuery(this);
		helper = helperclass ? helperclass : jQuery.forms.helperClass;
		effect  = effect ? effect : "";
		
		jQuery(elems).each(function(i){
			elem = this;
			jQuery.each(d, function(name, val){
				
				if(jQuery(elem).filter(name).length > 0){
					jQuery(name).focus(function(e){
										
										jQuery("."+helper).remove();
										jQuery(this).after("<div class='"+helper+"' style='display:none;'>"+val+'</div>');
										if(effect != "")
											eval('jQuery(".'+helper+'").'+effect.replace(/Out/, "In")+';');
										else
											jQuery("."+helper).show();	
										
									}).blur(function(e){
										
										if(effect != "")
											eval('jQuery(".'+helper+'").'+effect.replace(/In/, "Out")+';');
										else 
											jQuery("."+helper).hide();
									
									});
				};
			});
		});
	},
	fields_validation : function(d, req_elem){
	
		form  = this;
		elems = jQuery(this).FormFields() || jQuery(this);
		
		jQuery(elems).each(function(i){
			
			elem = this;
			
			jQuery.each(d, function(name, val){
				
				if(jQuery(elem).filter(name).length > 0){
				
					jQuery(elem).eq(0).before(req_elem);
				
					jQuery(form).submit(function(e){
						
						err = false;
						
						if(val == ""){
							if(jQuery(name).val() == "")
								err = true;
						}
						
						else{
							regex = new RegExp(val);
							if(!jQuery(name).val().match(regex))
								err = true;
						};
						
						if(err)	alert(val);						
					});
				};
			});
		});
	},
	validate : function(){ return true; },
	ajax_get_submit : function(url, call, json){ 
		jQuery(this).FormAjaxSubmit(url, call, json, "get");
	},
	ajax_post_submit : function(url, call, json){
		jQuery(this).FormAjaxSubmit(url, call, json, "post");
	},
	ajax_submit : function(url, call, json, get){
		if(jQuery(this).Validate()){
			jQuery.forms.ajax_action = get ? get : jQuery.forms.ajax_action;
			json = json ? "JSON" : (jQuery.forms.ajax_json ? "JSON" : "");
			params = jQuery(this).FilledFormFieldsArray();
			call = call ? call : function(data){ return data; };
			
			return eval("jQuery."+jQuery.forms.ajax_action+json+"(url, params, call);");
		};
	},
	toJsonString	: function(){
				return JSON.stringify(jQuery.forms.toDataStructure(this));				
			}, 
  _registerStructValue: function(selector, ret, val)
  {
    
    if (val && val.match(/^json:\/\//)) 
    {
      val = val.replace(/^json:\/\//, '');
      val = JSON.parse(val);
    }
    else if ((!val || val.length <= 0) && selector.is('.nullable'))
    {
      val = null;
    }
    
    var iname = selector.attr('name');
    
    if(iname.match(/\[\]$/))
    {
      iname = iname.replace(/\[\]$/, '');
      
      if(!ret[iname]) 
        ret[iname] = new Array();
      
      ret[iname].push(val);
    }
    else if(iname.match(/\[([^\]]*)\]$/))
    {
      var key = iname.match(/\[([^\]]*)\]$/);
      if(key) key = key[1];
      
      iname = iname.replace(/\[([^\]]*)\]$/, '');
      
      if(!ret[iname]) ret[iname] = new Object();
      
      ret[iname][key] = val;
    }
    else
    {
      ret[iname] = val;
    }
    
    return false;
  },
  
	toDataStructure		: function(element)
  {
			var ret = new Object();

			jQuery(element).not('.structure-ignore').each(function()
      {
					jQuery(this).find("input").not('.structure-ignore').each(function()
          {
            var input_val = jQuery(this).val();
            
            if(jQuery(this).is("input:checkbox"))
            {
              if(!jQuery(this).is("input:checked")) input_val = null;
            }
            else if(jQuery(this).is("input:radio"))
            {
  						if(!jQuery(this).is("input:checked")) return;
  					};
            
  					if(jQuery(this).is("input:button, input:submit, input:reset").length > 0)
  						return; 
            
            jQuery.forms._registerStructValue(jQuery(this), ret, input_val);
				  });

					jQuery(this).find("select").not('.structure-ignore').each(function()
          {
            var selectTmp = new Array();

            jQuery("option:selected", this).each(function(i)
            {
            		selectTmp[i] = jQuery(this).val();
            });
           
            jQuery.forms._registerStructValue(jQuery(this), ret, selectTmp[0]);
          });

					jQuery(this).find("textarea").not('.structure-ignore').each(function()
          { 
            jQuery.forms._registerStructValue(jQuery(this), ret, jQuery(this).val());
          });
          
     });

		 return ret;
	}
};

jQuery.formElements = {
	strlen : 0,
	checked : function(){
		return jQuery("input[checked]", this);
	},
	unchecked : function(){
		return jQuery("input[type='checkbox'], input[type='radio']", this).not("input[checked]");
	},
	check : function(){
	
		object = jQuery(this).checkables();
	
		object.each(function(i){ jQuery(this).attr("checked", "checked"); });
	},
	uncheck : function(){
		
		object = jQuery(this).checkables();
		
		object.each(function(i){ jQuery(this).attr("checked", ""); })
	},
  toggle_conditional: function() {

    var source_toggle = false;
    var check_count = 0;

    $(this).each(function()
    {      
      if(check_count == 0) source_toggle = !$(this).attr('checked');
      $(this).attr('checked', source_toggle);
      check_count++;
    });
    
    return false; 
  },
  toggle: function() {

    $(this).each(function()
    {      
      $(this).attr('checked', !$(this).attr('checked'));
    });
    
    return false; 
  },
	oncheck : function(funct, once){ 
	
		object = jQuery(this).checkables();
			
		jQuery.formElements.form_event('jQuery(this).attr("checked") != undefined', funct, "click", once); 
		
		return this;
		
	},
	onuncheck : function(funct, once){
	
		object = jQuery(this).checkables();
			
		jQuery.formElements.form_event('jQuery(this).attr("checked") == undefined', funct, "click", once); 
		
		return this;
	},
	checkables: function(){
		if(jQuery(this).is("input[type='checkbox']") || jQuery(this).is("input[type='radio']"))
			ret = this;
		else
			ret = jQuery("input[type='checkbox'], input[type='radio']", this);
			
		return ret;
	},
	selected : function(){
		return jQuery("option[selected]", this);
	},
	unselected : function(){
		return jQuery("option", this).not("option[selected]");
	},
	select : function(){
		ret = jQuery(this).selectables();
		
		ret.elems.each(function(i){ jQuery(this).attr("selected", "selected"); });
	},
	unselect : function(){
		ret = jQuery(this).selectables();
	
		ret.elems.each(function(i){ jQuery(this).attr("selected", ""); });
	},
	onselect : function(funct, once){ 

		object = jQuery(this).selectables();
			
		jQuery.formElements.form_event('jQuery(this).attr("selected") != undefined', funct, "click", once);
		
		return this;
	},
	onunselect : function(funct, once){ 
		
		object = jQuery(this).selectables();
		
		jQuery.formElements.form_event('jQuery(this).attr("selected") == undefined', funct, "change", once);
		
		return this;
		
	},
	selectables: function(){
	
		if(jQuery(this).is("option"))
			ret = this;
		else
			ret = jQuery("option", this);
	
		return ret;
	},
	fill : function(str){

		object = jQuery(this).fillables();
		
		object.each(function(i){ jQuery(this).val(str); });
		
	},
	unfill : function(str){
	
		object = jQuery(this).fillables();
		
		object.each(function(i){ jQuery(this).val(""); });
	},
	filled : function(){
		return jQuery(this).fillables().filter(function(i){
			return jQuery(this).val() != "";
		});
	},
	unfilled : function(){
		
		return jQuery(this).fillables().filter(function(i){
			return jQuery(this).val() == "";
		});
		
	},
	onfill : function(funct, once){

		object = jQuery(this).fillables();
			
		jQuery.formElements.form_event('true', function(){ jQuery.formElements.strlen = jQuery(this).val().length; }, "keydown", once);
		jQuery.formElements.form_event('jQuery(this).val().length > jQuery.formElements.strlen', funct, "keyup", once);
		
		return this;
	},
	onunfill : function(funct, once){
	
		object = jQuery(this).fillables();
		
		jQuery.formElements.form_event('true', function(){ jQuery.formElements.strlen = jQuery(this).val().length; }, "keydown", once);
		jQuery.formElements.form_event('jQuery(this).val().length < jQuery.formElements.strlen', funct, "keyup", once);
		
		return this;
	},
	fillables: function(){
		if(jQuery(this).is("input[type='text']") || jQuery(this).is("input[type='password']") ||jQuery(this).is("textarea"))
			ret = this;
		else
			ret = jQuery("input[type='text'], input[type='password'], textarea", this);
			
		return ret;
	},
	form_event : function(evaled, funct, evt, once){	
		
		once = once ? false : true;

		jQuery(object).each(function(i){
			if(once)
				jQuery(this).bind(evt, function(e){
						if(eval(evaled)){ jQuery.fn.exec = funct; jQuery(this).exec(); };
				});
				
			else
				jQuery(this).one(evt, function(e){
						if(eval(evaled)){ jQuery.fn.exec = funct; jQuery(this).exec(); };
				}); 
		});
	}
};

jQuery.fn.extend({

	///////////////////////////////////
	// Applicable on forms
	///////////////////////////////////

	FormHelper				    :	jQuery.forms.fields_helper,
	FormFields				    :	jQuery.forms.fields,
	FormFieldsArray			  :	jQuery.forms.fields_array,
	FilledFormFields		  :	jQuery.forms.filled_fields,
	FilledFormFieldsArray	:	jQuery.forms.filled_fields_array,
	FormHelper				    :	jQuery.forms.fields_helper,
	FormValidation			  :	jQuery.forms.fields_validation,	
	RequiredFields			  :	jQuery.forms.fields_required,
	Validate				      :	jQuery.forms.validate,
	FormAjaxSubmit				:	jQuery.forms.ajax_submit,
	FormAjaxGetSubmit			:	jQuery.forms.ajax_get_submit,
	FormAjaxPostSubmit		:	jQuery.forms.ajax_post_submit,
	toJsonString				  :	jQuery.forms.toJsonString,
	toDataStructure				:	jQuery.forms.toDataStructure,

	///////////////////////////////////
	// Applicable on selected fields
	///////////////////////////////////

	checked				:	jQuery.formElements.checked,
	unchecked			:	jQuery.formElements.unchecked,
	check				  :	jQuery.formElements.check,
	uncheck				:	jQuery.formElements.uncheck,
	oncheck				:	jQuery.formElements.oncheck,
	onuncheck			:	jQuery.formElements.onuncheck,
  toggle_conditional  : jQuery.formElements.toggle_conditional,
  //toggle        :   jQuery.formElements.toggle,
	checkables	  :	jQuery.formElements.checkables,
	selected			:	jQuery.formElements.selected,
	unselected		:	jQuery.formElements.unselected,
	select				:	jQuery.formElements.select,
	unselect			:	jQuery.formElements.unselect,
	onselect			:	jQuery.formElements.onselect,
	onunselect		:	jQuery.formElements.onunselect,
	selectables		:	jQuery.formElements.selectables,
	fill				  :	jQuery.formElements.fill,
	unfill				:	jQuery.formElements.unfill,
	filled				:	jQuery.formElements.filled,
	unfilled			:	jQuery.formElements.unfilled,
	onfill				:	jQuery.formElements.onfill,
	onunfill			:	jQuery.formElements.onunfill,
	fillables			:	jQuery.formElements.fillables
});


jQuery.fn.extend({
  hitch: function(ev, fn, scope) 
  {
    return this.bind(ev, function() 
    {
     return fn.apply(scope || this, Array.prototype.slice.call(arguments));
    });
  }
});


jQuery.createDelegate = function(target, handler)
{ 
  var delegate = function() 
  {
    return handler.apply(target, Array.prototype.slice.call(arguments));
  };
  
  return delegate;
};


}
/*
     FILE ARCHIVED ON 09:03:41 Jan 23, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:28:11 May 06, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.733
  exclusion.robots: 0.088
  exclusion.robots.policy: 0.076
  cdx.remote: 0.059
  esindex: 0.011
  LoadShardBlock: 83.904 (3)
  PetaboxLoader3.datanode: 65.386 (4)
  PetaboxLoader3.resolve: 57.692 (2)
  load_resource: 41.874
*/