Application.filter('digits', function () {
	return function (input, length, pad) {
		input = input.toString();
		if (input.length >= length) { return input; }
		else {
			pad = (pad || 0).toString();
			return new Array(1 + length - input.length).join(pad) + input;
		}
	}
});