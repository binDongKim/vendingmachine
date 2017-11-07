function VendingMachine(eventTrigger) {
	this.productDisplay = new ProductDisplay(eventTrigger);
	this.moneyInOut = new MoneyInOut(eventTrigger);
}

VendingMachine.prototype.init = function() {
	var vendingMachineWrapper = dom.getWrapperAround("vending-machine-wrapper");

	this.productDisplay.init(vendingMachineWrapper);
	this.moneyInOut.init(vendingMachineWrapper);

	dom.root.appendChild(vendingMachineWrapper);
};
