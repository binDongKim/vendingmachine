function App() {
	this.user = new User();
	this.vendingMachine = new VendingMachine("vm1");
	this.record = new Record();
}

App.prototype.init = function() {
	this.user.init();
	this.vendingMachine.init();
	this.record.init();
};
