function EventTrigger() {}

EventTrigger.prototype = Object.create(EventEmitter.prototype);

EventTrigger.prototype.handleDragStart = function(e) {
	this.trigger("DRAG_STARTED", [e]);
};

EventTrigger.prototype.handleDragOver = function(e) {
	this.trigger("DRAG_OVER", [e]);
};

EventTrigger.prototype.handleDropOnTarget = function(e) {
	this.trigger("DROPPED_ON_TARGET", [e]);
};

EventTrigger.prototype.handleDropOffTarget = function(e) {
	this.trigger("DROPPED_OFF_TARGET", [e]);
};

EventTrigger.prototype.handleMoneyBackButtonClick = function(e) {
	this.trigger("MONEY_BACK_BUTTON_CLICKED", [e]);
};

EventTrigger.prototype.moneyAccepted = function(e) {
	this.trigger("MONEY_ACCEPTED", [e]);
};

EventTrigger.prototype.moneyRefused = function(e) {
	this.trigger("MONEY_REFUSED", [e]);
};
