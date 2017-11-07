function App() {
	var eventTrigger = new EventTrigger();
	this.vendingMachine = new VendingMachine(eventTrigger);
	this.user = new User(eventTrigger);
	// this.record = new Record();
}

App.prototype.init = function() {
	this.vendingMachine.init();
	this.user.init();
	// this.record.init();
};
