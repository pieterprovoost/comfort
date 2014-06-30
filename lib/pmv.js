var jerzy = require('jerzy');

Pmv = function(m, w, ta, tr, icl, va, rh) {
	var esat = function(t) {
		if (t < 0) {
			var a = 21.874;
			var b = 7.66;
		} else {
			var a = 17.269;
			var b = 35.86;
		}
		return(611 * Math.exp(a * t / (t + 273.16 - b)) / 100);  
	};
    var pa = rh * esat(ta);
    icl = icl * 0.155;
    m = m * 58.15;
    w = w * 58.15;
	this.m = m;
	this.w = w;
	if (icl > 0.078) {
		var fcl = 1.05 + 0.645 * icl;
	} else {
		var fcl = 1.00 + 1.290 * icl;
	}

	var tclf = function(tcl) {
		var tcle = 35.7 - 0.028 * (m - w) 
			- icl * (3.96 * 1e-8 * fcl * (Math.pow(tcl + 273, 4) - Math.pow(tr + 273, 4)) 
				+ fcl * Math.max(2.38 * Math.pow(Math.abs(tcl - ta), 0.25), 12.1 * Math.sqrt(va)) * (tcl - ta));
		return(tcl - tcle);
	};
	var tcl = jerzy.Numeric.secant(tclf, -50, 50);

	var hc = Math.max(2.38 * Math.pow(Math.abs(tcl - ta), 0.25), 12.1 * Math.sqrt(va));
	var f = 0.303 * Math.exp(-0.036 * m) + 0.028;
	
	this.diffusion = - 3.05 * 1e-3 * (5733 - 6.99 * (m - w) - pa);
	this.sweat = - 0.42 * (m - w - 58.15);
	this.evaporation = this.diffusion + this.sweat;
	this.vapour = - 1.7 * 1e-5 * m * (5867 - pa);
	this.temperature = - 0.0014 * m * (34 - ta);
	this.respiration = this.temperature + this.vapour;
	this.radiation = - 3.96 * 1e-8 * fcl * (Math.pow(tcl + 273, 4) - Math.pow(tr + 273, 4));
	this.convection = - fcl * hc * (tcl - ta);
	
	this.pmv = f * (m - w + this.evaporation + this.respiration + this.radiation + this.convection);
};

module.exports.Pmv = Pmv;