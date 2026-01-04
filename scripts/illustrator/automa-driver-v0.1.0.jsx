#target illustrator
#include "../../../templ/lib/util.jsx"
#include "../../../templ/lib/template.jsx"
#include "../../../templ/lib/data.jsx"
#include "automa-template-v0.1.0.jsx"

$.strict = true;

(function () {
	return {
		templateConstructor: AutomaCard,
		// exporterConstructor: TestExporter,
		//exporterConstructor: ImageOnlyExporter,
		exporterConstructor: FastImageOnlyExporter,
		// rendererConstructor: null,
		// renderMutatorsOnly: false,
		// renderFn: someFunction,
		dataCallback: function getData(files, range) {
			// Load data
			var data = new Table({
				file: files.data,
				maxRecords: range || -1,
				filterFn: null /*function(record) { return (record[2] === "1");  } */});

			var result = [];

			// Count records
			var totalCount = 0;
			data.forEach(
				function(record) {
					if (typeof record.count === "undefined") { record.count = 0; }
					totalCount += +(record.count);
				});

			console.log("Found " + totalCount + " records");

			const COPYRIGHT = "Copyright © 2026 by Todd Fast. All rights reserved.";
			// const VERSION = "v" + files.version + ". " + COPYRIGHT;
			const VERSION = "v" + files.version;

			data.forEach(
				function enrich(record) {
					if (typeof record.count === "undefined" || record.count.length === 0 || +(record.count) < 1) {
						return;
					}
// 
					// console.log("Record:",record);

					// For double-sided cards, I Need to turn each row into 2 card elements in the array
					var output1 = {
						// id: record.id + "/" + totalCount,
						// count: record.count,

						location1: {
							locationName: record.location1,
							districtName: record.district1
						},
						location2: {
							locationName: record.location2,
							districtName: record.district2
						},
						location3: {
							locationName: record.location3,
							districtName: record.district3
						},

						// rewardRanking: {
						// 	blueIntel: record.blueIntel,
						// 	redIntel: record.redIntel,
						// 	yellowIntel: record.yellowIntel,
						// 	funding: record.funding,
						// 	operation: record.operation,
						// 	twist: record.twist
						// },

						version: VERSION
					};

					output1.rewardRanking = [];
					output1.rewardRanking[record.blueIntel] = "Blue Intel";
					output1.rewardRanking[record.redIntel] = "Red Intel";
					output1.rewardRanking[record.yellowIntel] = "Yellow Intel";
					output1.rewardRanking[record.funding] = "Funding";
					output1.rewardRanking[record.operation] = "Operational Progress";
					output1.rewardRanking[record.twist] = "Twist";

					// Add number based on count (which may be blank == 0)
					for (var append, i = 0; i < +(record.count); i++) {
						append = Object.create(output1);
						append.metadata = (result.length + 1) + "/" + totalCount;
						result.push(append);
					}
				});

			// var max = ((range || -1) !== -1) ? range : Number.MAX_VALUE;
			// return data.slice(0,Math.min(max,data.length));
			// result = result.slice(16);

			return result;
		}
	}

	function costString(cost) {
		if (cost.includes("*")) {
			return {
				value: cost.slice(0, -1),
				special: true
			};
		}
		else {
			return {
				value: Number(cost) >= 0 ? cost : "/",
				special: false
			};
		}
	}
})();
