describe('comfort.Pmv', function() {
	describe("#pmv", function() {
		it("should return the correct value", function() {
			assert.closeTo(new comfort.Pmv(1.2, 0, 22, 22, 0.5, 0.1, 60).pmv, -0.75, 0.01);
			assert.closeTo(new comfort.Pmv(1.2, 0, 27, 27, 0.5, 0.1, 60).pmv, 0.77, 0.01);
			assert.closeTo(new comfort.Pmv(1.2, 0, 23.5, 25.5, 0.5, 0.1, 60).pmv, -0.01, 0.01);
			assert.closeTo(new comfort.Pmv(1.2, 0, 19, 19, 1.0, 0.1, 40).pmv, -0.60, 0.01);
			assert.closeTo(new comfort.Pmv(1.6, 0, 27, 27, 0.5, 0.3, 60).pmv, 0.95, 0.01);
		});
	});
});
describe('comfort.Local', function() {
	describe("#draught", function() {
		it("should return the correct value", function() {
			assert.closeTo(comfort.Local.draught(20, 0.1, 40), 10.1, 0.1);
			assert.closeTo(comfort.Local.draught(20, 0.3, 40), 44.9, 0.1);
		});
	});
});