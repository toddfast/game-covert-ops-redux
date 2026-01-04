#target illustrator
#include "../../../templ/lib/util.jsx"
#include "../../../templ/lib/template.jsx"

$.strict = true;

function LocationCard(settings) {

	function onRender(record) {
		// Nothing
	}

	function afterRender(record) {
	}

	function setName(name) {
		this.select("art:/" + name)
			.showExclusive();
	}

	function setDistrict(index, name) {
		this.select("district" + index)
			.contents(name);
	}

	var NO_OP = function no_op() { };

	var exports = Object.create(new Template(settings), {
		onRender: { value: onRender },
	    afterRender: { value: afterRender },

		setName: { value: setName },
		setDistrict1: { value: setDistrict.curry(1) },
		setDistrict2: { value: setDistrict.curry(2) },

		// setVersion: { value: NO_OP },
		// setMetadata: { value: NO_OP }
	});

	return exports;
}
