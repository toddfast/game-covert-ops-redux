#target illustrator
#include "../../../templ/lib/util.jsx"
#include "../../../templ/lib/template.jsx"
#include "../../../templ/lib/data.jsx"
#include "test-template-v0.1.0.jsx"

$.strict = true;

(function () {
	return {
		templateConstructor: TestCard,
		// exporterConstructor: null,
		// rendererConstructor: null,
		// renderFn: renderActionCards
		dataCallback: function getData(files, maxRecords) {
			// Load data
			var result = [
                { text: "This is some plain text." },
                { text: "This is some <bold>bold</bold> text." },
                { text: "This is some <i>italic</i> text." },
                { text: "This is some <i>italic</i> and <b>bold</b> text." },
                { text: "This is some <b>bold</b> and <i>italic</i> and <bold>bold</bold> text." },
                { text: "This is some <i>italic</i> and <b>bold</b> and <x foo='bar'>unknown</x> and more <b>bold</b> text." },
                { text: "This is some <b>bolded text with <i>italics</i> embedded</b>." },
                { text: "This is some <b>bolded text with <i>italics</i> embedded, and <i>italics</i> embedded</b> again." },
                { text: "This is some <bold foo=\"bar\" bar=\"baz\">attribute bolded</bold> text." },
                { text: "This is some <bold foo=\"bar\" bar=\"baz\">attribute bolded</bold> text with an inline <foo> tag for glyphs." },
            ];

			return result;
		}
	}
})();
