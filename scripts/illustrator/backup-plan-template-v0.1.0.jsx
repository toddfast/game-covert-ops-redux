#target illustrator
#include "../../../templ/lib/util.jsx"
#include "../../../templ/lib/template.jsx"

$.strict = true;

function BackupPlanCard(settings) {

	const ACTION_REGEX = /^#/;

	function onRender(record) {
		// Nothing
	}

	function afterRender(record) {
	}

	function setType(value) {
		this.select("artwork:/" + value)
			.showExclusive();
	}

	function setName(value) {
		this.select("name")
			.contents(value)
			// .style("Name")
			.fitLines(1); // Note, this only works if the field is sized to allow extra lines on screen
	}

	function setEffect(value) {
		value = value.replace(". ", ".\n\n").trim();
		this.select("effect")
			.contents(value);
	}

	// function setEffect(effectName, lines, style, value) {
	// 	var hasValue = value && value.trim().length > 0;
	// 	this.select(effectName + "Section")
	// 		.visible(hasValue);

	// 	if (hasValue) {
	// 		fitValue.call(this, effectName, lines, DEFAULT_EFFECT, value);
	// 	}
	// }


	function setPassiveEffect(value) {
		this.select("passiveEffect")
			.contents(value);

		if (value.trim().length > 0) {
			this.select("passiveEffect")
				.fitLines(3); // Note, this only works if the field is sized to allow extra lines on screen
		}
	}

	function setCost(costType, costStruct) {
		this.select(costType + "Cost")
			.contents(costStruct.value);

		this.select(costType + "CostSpecial")
			.visible(costStruct.special);
	}

	function setCostType(costType, type) {
		this.select(costType + ":/" + type)
			.showExclusive();
	}

	function setRestPoints(value) {
		this.select("restPoints:/" + value)
			.showExclusive();
	}

	function setXPValue(xp) {
		var totalXP = Number(xp.silver) + Number(xp.gold);
		var isLevelUp = totalXP > 0;
		if (isLevelUp) {
			this.select("stars:/" + totalXP)
				.showExclusive();

			for (var i = 1; i <= totalXP; i++) {
				this.select("stars:/" + totalXP + "/S" + i)
					.visible(i <= xp.silver);
			}
		}
	}


	function fitValue(field, lines, style, value) {
		this.select(field)
			.contents(value)
				.style(style || "Effect")
			.words(ACTION_REGEX)
				.style("Action 9pt")
				.substring(1);

		if (value.trim().length > 0) {
			this.select(field)
				.fitLines(lines); // Note, this only works if the field is sized to allow extra lines on screen
		}
	}

	var NO_OP = function no_op() { };
	var DEFAULT_EFFECT = "Effect";

	var exports = Object.create(new Template(settings), {
		onRender: { value: onRender },
	    afterRender: { value: afterRender },

		// setType: { value: setType },
		// setName: { value: setName },
		setEffect: { value: setEffect },
		// setLevel: { value: setLevel },
		// setKeywords: { value: fitValue.curry("keywords", 1, "Keywords") },

		// setVersion: { value: NO_OP },
		// setMetadata: { value: NO_OP }
	});

	return exports;
}
