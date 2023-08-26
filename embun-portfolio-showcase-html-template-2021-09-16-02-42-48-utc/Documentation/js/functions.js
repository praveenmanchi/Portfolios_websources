(function() {
	'use strict';
	var highlight = function() {
		$('pre code').each(function(i, block) {
			$(this).text($(this).text().replace(/\t/g, '    '));
			hljs.highlightBlock(block);
		});
	}

	$(document).ready(function() {
		highlight();
	});
})(jQuery);
