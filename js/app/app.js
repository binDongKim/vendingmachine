function App() {
	this.vendingMachine = new VendingMachine("vm1");
	this.user = new User();
	// this.record = new Record();
}

App.prototype.init = function() {
	this.vendingMachine.init();
	this.user.init();
	// this.record.init();
};
