function VendingMachine() {
	this.productDisplay = new ProductDisplay();
	this.moneyInOut = new MoneyInOut();
	this.record = new Record();
}

VendingMachine.prototype.init = function() {
	this.productDisplay.init();
	this.moneyInOut.init();
	this.record.init();
};
