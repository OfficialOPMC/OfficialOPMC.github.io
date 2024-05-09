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

dojo.provide("UI.Base");


(function() {
	var normalizeEventType = function(type) {
		return type.toLowerCase();
	};

	var idIndex = 1;

	dojo.declare("UI.Base", null, {
		constructor: function() {
			this._eventListeners = {};

			// Remember kids, caps means constant
			this.EVT_BEFORE_OPEN  = 'beforeopen',
			this.EVT_OPEN         = 'open',
			this.EVT_LOAD         = 'load';
			this.EVT_BEFORE_CLOSE = 'beforeclose',
			this.EVT_CLOSE        = 'close';
			this.EVT_CHANGE       = 'change';
			this.EVT_SUCCESS      = 'success';
			this.EVT_ERROR        = 'error';
			this.EVT_SELECT       = 'select';
		},

		nodeAttribute: function(attribute) {
			return UI.Base.nodeAttribute(attribute, this.declaredClass);
		},

		getNodeAttribute: function(node, attribute) {
			return UI.Base.getNodeAttribute(node, attribute, this.declaredClass);
		},

		setNodeAttribute: function(node, attribute, value) {
			return UI.Base.setNodeAttribute(node, attribute, value, this.declaredClass);
		},

		getStyle: function(element, style) {
			return UI.Base.getStyle(element, style);
		},

		addEventListener: function(type, callback, synchronous) {
			type = normalizeEventType(type);

			if ( !this._eventListeners[type] ) {
				this._eventListeners[type] = [];
			}

			this._eventListeners[type].push({
				callback:    dojo.hitch(this, callback),
				synchronous: synchronous
			});

			return this;
		},

		removeEventListener: function(type, callback, synchronous) {
			type = normalizeEventType(type);

			if ( !this._eventListeners[type] ) {
				return 0;
			}

			var removeCount = 0;
			for ( var i=0, events=this._eventListeners[type], l=events.length; i<l; ++i ) {
				if (
					events[i].synchronous === synchronous &&
					events[i].callback    === callback
				) {
					events[i].splice(i, 1);
					--i;
					--l;
					++removeCount;
				}
			}

			return removeCount;
		},

		triggerEvent: function(type/*, arg1, arg2, arg3, ..., argN*/) {
			var args = Array.prototype.slice.call(arguments);

			type = normalizeEventType(args.shift());

			if ( !this._eventListeners[type] ) {
				return;
			}

			for ( var i=0, events=this._eventListeners[type], l=events.length; i<l; ++i ) {
				if ( events[i].synchronous ) {
					if ( events[i].callback.apply(this, args) === false ) {
						return false;
					}
				} else {
					setTimeout((function(callback) {
						return function() { callback.apply(this, args); };
					})(events[i].callback), 1);
				}
			}

			return true;
		},

		generateId: function() {
			return this.declaredClass.replace(/\./g, "_") + (idIndex++);
		}
	});
})();

UI.Base.nodeAttribute = function(attribute, declaredClass) {
	return "__" + declaredClass + "." + attribute;
};

UI.Base.getNodeAttribute = function(node, attribute, declaredClass) {
	return node[ UI.Base.nodeAttribute(attribute) ];
};

UI.Base.setNodeAttribute = function(node, attribute, value, declaredClass) {
	node[ UI.Base.nodeAttribute(attribute) ] = value;
	return node;
};

/**
 * Get's the computed style of a node
 * @param string|node element A CSS selector or a DOM node.
 * @param string styleProp The CSS property to get (e.g.: "z-index").
 * @return string
 * @see http://www.quirksmode.org/dom/getstyles.html
 */
UI.Base.getStyle = function(element, style) {
	var node = typeof element == "string" ? dojo.query(element)[0] : element,
		computedStyle;

	if ( node.currentStyle ) {
		// Convert -ms-blah-blah to blahBlah per http://msdn.microsoft.com/en-us/library/ms535231%28VS.85%29.aspx
		style = style.replace(/^-ms-/i, "").replace(/-./g, function(match) {
			return match.substr(1, 1).toUpperCase()
		});

		return node.currentStyle[style];
	} else if ( window.getComputedStyle ) {
		computedStyle = document.defaultView.getComputedStyle(node, null);

		if ( computedStyle ) {
			return computedStyle.getPropertyValue(style);
		}
	}

	return null;
};

}
/*
     FILE ARCHIVED ON 09:03:26 Jan 23, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:28:09 May 06, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.611
  exclusion.robots: 0.068
  exclusion.robots.policy: 0.06
  cdx.remote: 0.057
  esindex: 0.008
  LoadShardBlock: 123.139 (3)
  PetaboxLoader3.datanode: 68.417 (4)
  PetaboxLoader3.resolve: 71.04 (2)
  load_resource: 84.952
*/