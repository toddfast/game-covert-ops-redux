#target illustrator
#include "../../../templ/lib/util.jsx"
#include "../../../templ/lib/template.jsx"

$.strict = true;

function TestCard(settings) {

	const NUM_ARTWORK = 5;
	const GLYPHS = {
		"foo": { path: "fooGlyph", /* color: null, tracking: 175 */},
	};
    const MARKUP_AVENIR_CONDENSED_12 = {
        "b": { styleName: "bold", /*fn: null, clearOverrides: true */ },
        // "i": { styleName: "italic"},
        "bold": { styleName: "bold" },
        "q": { styleName: "italic" },
    };

    // This only works with tags that are not nested. Without named capture group support to
    // ensure that the closing tag matches the opening tag, this can't easily be improved upon.
    const ALL_TAGS = {
        "\\w": { fn: function(tag) { console.log("Generic processing tag ", tag.tagName); } }
    };

	function onRender(record) {
		this.select("text")
            .style("reset");
	}

	function afterRender(record) {
        // Test out processing all tags; will glitch on embedded tags
		this.select("text")
           .processMarkup(ALL_TAGS);

        // Process the outer tags first
		this.select("text")
           .processMarkup(MARKUP_AVENIR_CONDENSED_12);

        // This may be an inner tag, so process separately
		this.select("text")
           .processMarkup({ "i": { styleName: "italic" } });
	}

	function setText(value) {
		this.select("text")
			.contents(value);
	}

	var NO_OP = function no_op() { };

	var publicInterface = Object.create(new Template(settings), {
		onRender: { value: onRender },
        afterRender: { value: afterRender },

		setText: { value: setText },
	});

	return publicInterface;
}
