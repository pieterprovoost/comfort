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

Local.vertical = function(dt) {
	return 100 / (1 + Math.exp(5.76 - 0.856 * dt));
};

Local.floor = function(t) {
	return 100 - 94 * Math.exp(-1.387 + 0.118 * t - 0.0025 * Math.pow(t, 2));
};

Local.warmCeiling = function(dt) {
	return 100 / (1 + Math.exp(2.84 - 0.174 * dt)) - 5.5;
};

Local.coolWall = function(dt) {
	return 100 / (1 + Math.exp(6.61 - 0.345 * dt));
};

Local.coolCeiling = function(dt) {
	return 100 / (1 + Math.exp(9.93 - 0.50 * dt));
};

Local.warmWall = function(dt) {
	return 100 / (1 + Math.exp(3.72 - 0.052 * dt)) - 3.5;
};

module.exports.Local = Local;