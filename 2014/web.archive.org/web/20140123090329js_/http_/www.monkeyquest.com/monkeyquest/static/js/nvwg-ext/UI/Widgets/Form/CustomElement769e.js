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
 * Add custom display on to form inputs. Currently supports checkbox and radio input.
 */
dojo.declare("UI.Widgets.Form.CustomElement", UI.Base, {
	_type:          null,
	_nodeInput:     null,
	_nodeContainer: null,
	_selected:      false,

	constructor: function(inpNode, options) {
		options = dojo.mixin({
			selected: false
		}, options || {});

		this._nodeInput     = inpNode;
		this._selected    = options.selected;
	},

	initialize: function() {
		this._nodeInput.getUIFormCustomElement = dojo.hitch(this, function() {
			return this;
		});

		this._nodeContainer = document.createElement("span");

		if ( this._nodeInput.id ) {
			this._nodeContainer.id = "x-ui-ce-container-" + this._nodeInput.id;
		}

		if ( this._selected ) {
			this._nodeInput.checked = true;
		}

		this._nodeContainer.className = "x-ui-ce-container x-ui-ce-" + this._type
			+ (this._nodeInput.checked ? " x-ui-ce-selected" : "");

		this._nodeInput.parentNode.replaceChild(this._nodeContainer, this._nodeInput);
		this._nodeContainer.appendChild(this._nodeInput);
		this._nodeContainer.appendChild(document.createElement("span"));

		dojo.connect(this._nodeInput, "focus",  this, this._onFocus);
		dojo.connect(this._nodeInput, "blur",   this, this._onBlur);
		dojo.connect(this._nodeInput, "keyup",  this, this._onChange);
		dojo.connect(this._nodeInput, "change", this, this._onChange);

		dojo.connect(this._nodeContainer, "mouseover", this, this._onMouseover);
		dojo.connect(this._nodeContainer, "mouseout",  this, this._onMouseout);
		dojo.connect(this._nodeContainer, "click",     this, this._onChange);


		return this;
	},

	getInputNode: function() {
		return this._nodeInput;
	},

	focus: function() {
		this._nodeInput.focus();
		return this;
	},

	blur: function() {
		this._nodeInput.blur();
		return this;
	},

	_onFocus: function(event) {
		dojo.addClass(this._nodeContainer, "x-ui-ce-active");
	},

	_onBlur: function(event) {
		dojo.removeClass(this._nodeContainer, "x-ui-ce-active");
	},

	_onMouseover: function(event) {
		dojo.addClass(this._nodeContainer, "x-ui-ce-active");
	},

	_onMouseout: function(event) {
		dojo.removeClass(this._nodeContainer, "x-ui-ce-active");
	},

	_onChange: function(event) { /* abstract */ },

	_select: function() {
		dojo.addClass(this._nodeContainer, "x-ui-ce-selected");
		return this;
	},

	_unselect: function() {
		dojo.removeClass(this._nodeContainer, "x-ui-ce-selected");
		return this;
	}
});


/**
 * Progamatically convert a form element into a custom element
 */
UI.Widgets.Form.CustomElement.factory = function(inpNode, options) {
	var instance;

	if ( inpNode.tagName != "INPUT" || dojo.indexOf(["radio", "checkbox"], inpNode.type.toLowerCase()) < 0 ) {
		throw "Invalid input node: <" + inpNode.tagName + " type='" + inpNode.type + "'>";
	}

	options = dojo.mixin({
		initialize: true
	}, options || {});

	// Custom element is already created, get that instance
	if ( inpNode.getUIFormCustomElement ) {
		instance = inpNode.getUIFormCustomElement();
	} else {
		instance = new UI.Widgets.Form["CustomElement_" + inpNode.type.substr(0, 1).toUpperCase() + inpNode.type.substr(1)](inpNode, options);
		
		if ( options.initialize !== false ) {
			instance.initialize();
		}
	}

	return instance;
};


/**
 * Initialize all custom input (should only be called once).
 */
UI.Widgets.Form.CustomElement.initialize = function() {
	dojo.query("form.x-ui-ce").forEach(function(form) {
		dojo.query("input[type=checkbox]", form).forEach(UI.Widgets.Form.CustomElement.factory);
		dojo.query("input[type=radio]", form).forEach(UI.Widgets.Form.CustomElement.factory);
	});
};

dojo.declare("UI.Widgets.Form.CustomElement_Checkable", UI.Widgets.Form.CustomElement, {
	_isChanging: null,

	isChecked: function() {
		return this._nodeInput.checked;
	},

	checked: function(checked) {
		this._nodeInput.checked = checked;

		if ( checked ) {
			this._select();
		} else {
			this._unselect();
		}

		this.triggerEvent(this.EVT_CHANGE);

		return this;
	},

	toggle: function() {
		this.checked(!this._nodeInput.checked);
		return this;
	},

	_onChange: function(event) {
		if ( this._isChanging ) {
			return;
		}

		this._isChanging = true;

		setTimeout(dojo.hitch(this, function() {
			this._isChanging = false;
		}, 50));

		return this._onChangeDebounced(event);
	},

	_onChangeDebounced: function(event) { /* abstract */ }
});

/**
 * Checkboxes
 */
dojo.declare("UI.Widgets.Form.CustomElement_Checkbox", UI.Widgets.Form.CustomElement_Checkable, {
	_type: "checkbox",

	_onChangeDebounced: function(event) {
		if ( event.keyCode && !this._isSelectableKeyInput(event.keyCode) ) {
			return;
		}
		
		if ( !dojo.isFF && event.target.tagName == "INPUT" ) {
			this._nodeInput.checked = !this._nodeInput.checked;
		}

		// Toggle checked state for events that didn't happen directly to the input (where
		// state is already toggled by the event
		if ( event.originalTarget != this._nodeInput ) {
			this._nodeInput.checked = !this._nodeInput.checked;
		}

		// Update state
		if ( this._nodeInput.checked ) {
			this._select();
		} else {
			this._unselect();
		}

		this.focus();
		this.triggerEvent(this.EVT_CHANGE);
	},

	_isSelectableKeyInput: function(keyCode) {
		// Space key only
		return keyCode == 32;
	}
});


/**
 * Radio buttons
 */
dojo.declare("UI.Widgets.Form.CustomElement_Radio", UI.Widgets.Form.CustomElement_Checkable, {
	_type: "radio",
	_siblings: [],

	constructor: function(inpNode, options) {
		this.inherited(arguments);
		this._siblings = dojo.query("form.x-ui-ce input[name=" + inpNode.name + "]");
	},

	checked: function(checked) {
		this.inherited(arguments);
		this._updateSiblings();

		return this;
	},

	_onChangeDebounced: function(event) {
		if ( event.keyCode && !this._isSelectableKeyInput(event.keyCode) ) {
			return;
		}

		this._nodeInput.checked = true;

		this.focus();
		this._select();
		this.triggerEvent(this.EVT_CHANGE);
		this._updateSiblings();
	},

	_updateSiblings: function() {
		var self = this;

		// If the current node is not checked, there is nothing to update for the other siblings.
		if ( !this.isChecked() ) {
			return;
		}

		this._siblings.forEach(function(sibling) {
			if ( !sibling.getUIFormCustomElement ) {
				return;
			}
			
			sibling = sibling.getUIFormCustomElement();

			if ( sibling._nodeInput != self._nodeInput ) {
				sibling._unselect().triggerEvent(self.EVT_CHANGE);
			}
		});
	},

	_isSelectableKeyInput: function(keyCode) {
		// Space and arrow keys
		return dojo.indexOf([32, 37, 38, 39, 40], keyCode) !== -1;
	}
});


}
/*
     FILE ARCHIVED ON 09:03:29 Jan 23, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:28:10 May 06, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.697
  exclusion.robots: 0.073
  exclusion.robots.policy: 0.061
  cdx.remote: 0.076
  esindex: 0.008
  LoadShardBlock: 29.812 (3)
  PetaboxLoader3.datanode: 45.431 (4)
  load_resource: 63.461
  PetaboxLoader3.resolve: 42.883
*/