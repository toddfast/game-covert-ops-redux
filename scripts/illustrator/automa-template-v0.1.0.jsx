#target illustrator
#include "../../../templ/lib/util.jsx"
#include "../../../templ/lib/template.jsx"

$.strict = true;

function AutomaCard(settings) {

	function onRender(record) {
		// Nothing
	}

	function afterRender(record) {
	}

	function setLocation(index, value) {
		this.select("location" + index + ":/Icons/" + value.locationName)
			.showExclusive();
		this.select("location" + index + ":/Location")
			.contents(value.locationName);
		this.select("location" + index + ":/District")
			.contents(value.districtName);
	}

	function setRewardRanking(rankings) {
		for (var i = 1; i <= 6; i++) {
			var rewardName = rankings[i];
			this.select("rewards:/Reward " + i + "/" + rewardName)
				.showExclusive();
		}
	}

	var NO_OP = function no_op() { };

	var exports = Object.create(new Template(settings), {
		onRender: { value: onRender },
	    afterRender: { value: afterRender },

		setLocation1: { value: setLocation.curry(1) },
		setLocation2: { value: setLocation.curry(2) },
		setLocation3: { value: setLocation.curry(3) },
		setRewardRanking: { value: setRewardRanking },

		// setVersion: { value: NO_OP },
		// setMetadata: { value: NO_OP }
	});

	return exports;
}
