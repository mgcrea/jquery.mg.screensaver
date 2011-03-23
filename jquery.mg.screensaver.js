
 /*
 * jQuery Screensaver plugin
 *
 * Copyright (c) 2011 Magenta Creations. All rights reserved.
 * Licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 License.
 *  Summary : <http://creativecommons.org/licenses/by-nc-sa/3.0/>
 *  Legal : <http://creativecommons.org/licenses/by-nc-sa/3.0/legalcode>
 *
 * Royalty-free license for commercial purpose available on demand
 *
 * contact@mg-crea.com
 * http://mg-crea.com
 */

(function($, console, undefined) {

var defaults = {
	active: 'ui-screensaver-active',
	play: function() {},
	loop: function() {},
	stop: function() {},
	tempo: 3000,
	debug: false,
};

if(!window.console || !window.console.log) console = {log: function(){}, warn: function(){}, error: function(){}};

$.fn.extend({

	screensaver : function(options) {

		options = $.extend(defaults, options);

		if(!options.debug) console = {log: function(){}, warn: function(){}, error: function(){}};
		console.log('$.fn.screensaver', [options]);

		var o = options,
			$this = this,
			timer = undefined;

		if($.isFunction(o.play)) $this.bind('play.screensaver', o.play);
		if($.isFunction(o.loop)) $this.bind('loop.screensaver', o.loop);
		if($.isFunction(o.stop)) $this.bind('stop.screensaver', o.stop);

		var screensaver = function() {

			if(!$this.hasClass(o.active)) {
				console.log('$.fn.screensaver ~ play', [time()]);
				// add styles
				$this.addClass(o.active);
				// trigger events
				$this.trigger('play.screensaver');
			} else {
				console.log('$.fn.screensaver ~ loop', [time()]);
				// trigger events
				$this.trigger('loop.screensaver');
			}

		}

		// init first interval
		timer = setInterval(screensaver, o.tempo);
		$this.bind('mousedown.screensaver, reset.screensaver', function() {
			console.log('$.fn.screensaver ~ reset', [time(), timer]);
			// clear current timeout
			clearInterval(timer);
			timer = setInterval(screensaver, o.tempo);


			if($this.hasClass(o.active)) {
				// trigger events
				console.log($this.trigger('stop.screensaver'));

				// remove styles
				$this.removeClass(o.active);
			}
		});

	}

});

})(jQuery, console);
