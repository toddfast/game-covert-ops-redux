#target illustrator
#include "../../../templ/lib/util.jsx"
#include "../../../templ/lib/template.jsx"

$.strict = true;

function PlayerBoardCard(settings) {

	function onRender(record) {
		// Nothing
	}

	function afterRender(record) {
	}

	function setName(value) {
		this.select("name")
			.contents(value);
	}

	function setTwist(value) {
		this.select("twist")
			.contents("Twist: " + value);
			// .fitLines(1); // Note, this only works if the field is sized to allow extra lines on screen
	}

	function setStartingResource(value) {
		this.select("startingResources:/" + value)
			.showExclusive();
	}

	var NO_OP = function no_op() { };

	var exports = Object.create(new Template(settings), {
		onRender: { value: onRender },
	    afterRender: { value: afterRender },

		setName: { value: setName },
		setTwist: { value: setTwist },
		setStartingResource: { value: setStartingResource },

		// setVersion: { value: NO_OP },
		// setMetadata: { value: NO_OP }
	});

	return exports;
}
