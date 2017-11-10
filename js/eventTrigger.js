function EventTrigger() {}

EventTrigger.prototype = Object.create(EventEmitter.prototype);

// To user.js, record.js
EventTrigger.prototype.handleDragStart = function(e) {
	this.trigger("DRAG_STARTED", [e]);
};

EventTrigger.prototype.handleDragOver = function(e) {
	this.trigger("DRAG_OVER", [e]);
};

// To moneyInOut.js
EventTrigger.prototype.handleDropOnTarget = function(e) {
	this.trigger("DROPPED_ON_TARGET", [e]);
};

// To user.js, record.js
EventTrigger.prototype.handleDropOnUser = function(e) {
	this.trigger("DROPPED_ON_USER", [e]);
};

// To user.js, record.js
EventTrigger.prototype.handleDropOffTarget = function(e) {
	this.trigger("DROPPED_OFF_TARGET", [e]);
};

// To productDisplay.js, moneyInOut.js, user.js, record.js
EventTrigger.prototype.handleMoneyBackButtonClick = function(totalInsertedMoney) {
	this.trigger("MONEY_BACK_BUTTON_CLICKED", [totalInsertedMoney]);
};

// To user.js, record.js
EventTrigger.prototype.moneyAccepted = function(droppedMoney) {
	this.trigger("MONEY_ACCEPTED", [droppedMoney]);
};

// To record.js
EventTrigger.prototype.moneyRefused = function(droppedMoney) {
	this.trigger("MONEY_REFUSED", [droppedMoney]);
};

// To productDisplay.js
EventTrigger.prototype.totalInsertedMoneyChanged = function(totalInsertedMoney) {
	this.trigger("TOTAL_INSERTED_MONEY_CHANGED", [totalInsertedMoney]);
};

// To productDisplay.js
EventTrigger.prototype.handleProductClick = function(e) {
	this.trigger("PRODUCT_CLICKED", [e]);
};

// To productDisplay.js, moneyInOut.js, user.js, record.js
EventTrigger.prototype.purchase = function(product) {
	this.trigger("PURCHASE", [product]);
};

// To productDisplay.js, record.js
EventTrigger.prototype.warnShortOfMoneyOnMachine = function(product) {
	this.trigger("WARN_SHORT_OF_MONEY_ON_MACHINE", [product]);
};

// To record.js
EventTrigger.prototype.warnSoldOut = function(product) {
	this.trigger("WARN_SOLD_OUT", [product]);
};

// To moneyInOut.js
EventTrigger.prototype.checkEnoughMoney = function(product) {
	this.trigger("CHECK_ENOUGH_MONEY", [product]);
};

// To record.js
EventTrigger.prototype.warnShortOfMoneyOnUser = function() {
	this.trigger("WARN_SHORT_OF_MONEY_ON_USER");
};
