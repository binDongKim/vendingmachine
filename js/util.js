var util = {
	getShuffledArray(arr) {
		var givenArray = arr.slice();
		var shuffledArray = [];

		while(givenArray.length) {
			shuffledArray.push(givenArray.splice(Math.floor(Math.random() * givenArray.length), 1)[0]);
		}
		return shuffledArray;
	},

	getNumberOnly(value) {
		return Number(value.replace(/\D/g, ""));
	}
};
