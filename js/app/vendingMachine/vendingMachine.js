function VendingMachine(id) {
	this.id = id;

	this.productDisplay = new ProductDisplay();
	this.moneyInOut = new MoneyInOut();
}

VendingMachine.prototype.init = function() {
	var vendingMachineWrapper = dom.getWrapperAround("vending-machine-wrapper");

	this.productDisplay.init(vendingMachineWrapper);
	this.moneyInOut.init(vendingMachineWrapper);

	dom.root.appendChild(vendingMachineWrapper);
};
