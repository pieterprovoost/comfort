var jerzy = require('jerzy');

Pmv = function(m, w, ta, tr, icl, va, rh) {

	// conversions

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
    icl = icl * 0.155;
    m = m * 58.15;
    w = w * 58.15;
	this.m = m;
	this.w = w;

	// water vapour pressure ambient air

    var pa = rh * esat(ta);

	// clothing area factor

	if (icl > 0.078) {
		var fcl = 1.05 + 0.645 * icl;
	} else {
		var fcl = 1.00 + 1.290 * icl;
	}

	// skin temperature

	var ts = 35.7 - 0.028 * (m - w);
	this.ts = ts;

	// saturated water vapour pressure at skin surface

	var ps = 256 * this.ts - 3373;

	// clothing temperature

	var tclf = function(tcl) {
		var tcle = ts - icl * (3.96 * 1e-8 * fcl * (Math.pow(tcl + 273, 4) - Math.pow(tr + 273, 4)) 
				+ fcl * Math.max(2.38 * Math.pow(Math.abs(tcl - ta), 0.25), 12.1 * Math.sqrt(va)) * (tcl - ta));
		return(tcl - tcle);
	};
	this.tcl = jerzy.Numeric.secant(tclf, -50, 50);

	// convective heat transfer coefficient

	var hc = Math.max(2.38 * Math.pow(Math.abs(this.tcl - ta), 0.25), 12.1 * Math.sqrt(va));

	// heat balance

	this.diffusion = - 3.05 * 1e-3 * (5733 - 6.99 * (m - w) - pa);
	this.sweat = - 0.42 * (m - w - 58.15);
	this.evaporation = this.diffusion + this.sweat;

	this.vapour = - 1.7 * 1e-5 * m * (5867 - pa);
	this.temperature = - 0.0014 * m * (34 - ta);
	this.respiration = this.temperature + this.vapour;

	this.conduction = - (this.ts - this.tcl) / icl;
	this.radiation = - 3.96 * 1e-8 * fcl * (Math.pow(this.tcl + 273, 4) - Math.pow(tr + 273, 4));
	this.convection = - fcl * hc * (this.tcl - ta);
	
	this.pmv = (0.303 * Math.exp(-0.036 * m) + 0.028) * (m - w + this.evaporation + this.respiration + this.radiation + this.convection);

	this.balance = this.m - this.w + this.radiation + this.convection + this.evaporation + this.respiration;

};

module.exports.Pmv = Pmv;