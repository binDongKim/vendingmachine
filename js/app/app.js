function App() {
	this.eventTrigger = new EventTrigger();
	this.vendingMachine = new VendingMachine(this.eventTrigger);
	this.user = new User(this.eventTrigger);
	this.record = new Record(this.eventTrigger);
}

App.prototype.init = function() {
	this.vendingMachine.init();
	this.user.init();
	this.record.init();

	this.addListener();
};

App.prototype.addListener = function() {
	document.addEventListener("dragover", this.handleDragOver.bind(this));
	document.addEventListener("drop", this.handleDrop.bind(this));
};

App.prototype.handleDragOver = function(e) {
	e.preventDefault();
};

App.prototype.handleDrop = function(e) {
	e.preventDefault();

	var targetElement = e.target;
	var moneyPutAreaWrapper = document.querySelector(".money-put-area-wrapper");
	var userWrapper = document.querySelector(".user-wrapper");

	if (moneyPutAreaWrapper.contains(targetElement)) {
		// 투입구에 돈 넣었을때
		this.eventTrigger.handleDropOnTarget(e);
	} else if (userWrapper.contains(targetElement)) {
		// 지갑에 다시 넣었을때
		this.eventTrigger.handleDropOnUser(e);
	} else {
		this.eventTrigger.handleDropOffTarget(e);
	}
};
