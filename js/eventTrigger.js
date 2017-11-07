function EventTrigger() {}

EventTrigger.prototype = Object.create(EventEmitter.prototype);
EventTrigger.prototype.handleDragStart = function(e) {
	this.trigger("DRAG_START", [e]);
};

// EventTrigger.prototype.handleDragOver = function(e) {
// 	this.trigger("DRAG_OVER", [e]);
// };

EventTrigger.prototype.handleDropOnTarget = function(e) {
	this.trigger("DROP_ON_TARGET", [e]);
};

EventTrigger.prototype.handleDropOffTarget = function(e) {
	this.trigger("DROP_OFF_TARGET", [e]);
};

// EventTrigger.prototype.putMoney = function(e) {
// 	this.trigger("PUT_MONEY", [e]);
// };
//
// EventTrigger.prototype.loseMoney = function(e) {
// 	this.trigger("LOSE_MONEY", [e]);
// };
