function App() {
	this.eventTrigger = new EventTrigger();
	this.vendingMachine = new VendingMachine(this.eventTrigger);
	this.user = new User(this.eventTrigger);
	// this.record = new Record();
}

App.prototype.init = function() {
	this.vendingMachine.init();
	this.user.init();

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
	var targetClassList = e.target.classList;

	//TODO: div, p 각각 체크하는 방법 말고 다른방법이 없을지.
	if (targetClassList.contains("money-put-area-text") || targetClassList.contains("money-put-area-wrapper")) {
		this.eventTrigger.handleDropOnTarget(e);
	} else {
		this.eventTrigger.handleDropOffTarget(e);
	}
};
