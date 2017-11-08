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

EventTrigger.prototype.handleMoneyBackButtonClick = function(totalInsertedMoney) {
	this.trigger("MONEY_BACK_BUTTON_CLICKED", [totalInsertedMoney]);
};

EventTrigger.prototype.moneyAccepted = function(droppedMoney) {
	this.trigger("MONEY_ACCEPTED", [droppedMoney]);
};

EventTrigger.prototype.moneyRefused = function(e) {
	this.trigger("MONEY_REFUSED", [e]);
};

EventTrigger.prototype.totalInsertedMoneyChanged = function(totalInsertedMoney) {
	this.trigger("TOTAL_INSERTED_MONEY_CHANGED", [totalInsertedMoney]);
};

EventTrigger.prototype.handleProductClick = function(e) {
	this.trigger("PRODUCT_CLICKED", [e]);
};

EventTrigger.prototype.purchase = function(product) {
	this.trigger("PURCHASE", [product]);
};

EventTrigger.prototype.warnShortOfMoney = function(product) {
	this.trigger("WARN_SHORT_OF_MONEY", [product]);
};

EventTrigger.prototype.warnSoldOut = function(product) {
	this.trigger("WARN_SOLD_OUT", [product]);
};

EventTrigger.prototype.checkEnoughMoney = function(product) {
	this.trigger("CHECK_ENOUGH_MONEY", [product]);
}
