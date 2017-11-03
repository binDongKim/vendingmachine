function App() {
	this.user = new User();
	this.vendingMachine = new VendingMachine();
}

App.prototype.init = function() {
	this.user.init();
	this.vendingMachine.init();
};
