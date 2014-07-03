Local = function() {};

Local.draught = function(ta, va, tu) {
	if (va < 0.05) {
		va = 0.05;
	}
	var dr = (34 - ta) * Math.pow(va - 0.05, 0.62) * (0.37 * va * tu + 3.14);
	if (dr > 100) {
		dr = 100;
	}
	return dr;
};

Local.floor = function(t) {
	return 100 - 94 * Math.exp(-1.387 + 0.118 * t - 0.0025 * Math.pow(t, 2));
}

module.exports.Local = Local;