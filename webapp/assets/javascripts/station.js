$(document).ready(function() {
	//
	// Station view for element43
	//

	// Initialize tree
	$('#tree').dynatree({
		title: "market",
		// Tree's name
		autoCollapse: true,
		// Auto-collapse other branches
		imagePath: " ",
		// Path to a folder containing icons.
		initAjax: {
			url: "/market/browse/tree/"
		},
		// Initial AJAX location
		fx: {
			height: "toggle",
			duration: 200
		},
		// Animation
		onLazyRead: function(node) {
			node.appendAjax({
				url: "/market/browse/tree/" + node.data.key + "/"
			}); // AJAX URL
		},
		onActivate: function(node) {
			if(node.data.hasItems) {
				$('#group').text('Loading...');
				$('#group').load('/market/trading/station/' + staStationID + '/import/browse/panel/' + node.data.key + '/', function(){$("[rel=tooltip]").tooltip();}); // Load right panel
			}
		}
	});

	// Show / Hide filters section

	$('#spread_link').click(function(e) {
		if(($('#import-field').is(':visible'))) {
			$('#import-field').slideUp();
		}
	});

	$('#import_link').click(function(e) {
		if(!($('#import-field').is(':visible'))) {
			$('#import-field').slideDown();
		}
	});

	// AJAX autocomplete setup
	var options, a;
	options = {
		'minChars': 3,
		'maxHeight': 800,
		'width': 300,
		'serviceUrl': '/market/trading/live_search/',
		'onSelect': function(value, data) {
			// Forward depending on whether it's a system or region
			var id = data;
			if(id.indexOf('system_') != -1) {
				$('#import').load('/market/trading/station/' + staStationID + '/import/system/' + id.replace('system_', '') + '/', function() {
					$("[rel=tooltip]").tooltip();
				});
			} else if(id.indexOf('region_') != -1) {
				$('#import').load('/market/trading/station/' + staStationID + '/import/region/' + id.replace('region_', '') + '/', function() {
					$("[rel=tooltip]").tooltip();
				});
			}
		}
	};
	a = $('#import-search').autocomplete(options);

	$('#import-search').keypress(function(e) {
		if(e.which == 13) {
			$('#import').load('/market/trading/search/?query=' + encodeURIComponent($('#import-search').val()));
		}
	});
});

function loadSystem(id) {
	$('#import').load('/market/trading/station/' + staStationID + '/import/system/' + id + '/', function() {
		$("[rel=tooltip]").tooltip();
	});
}

function loadRegion(id) {
	$('#import').load('/market/trading/station/' + staStationID + '/import/region/' + id + '/', function() {
		$("[rel=tooltip]").tooltip();
	});
}