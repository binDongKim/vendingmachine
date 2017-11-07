function EventTrigger() {}

EventTrigger.prototype = Object.create(EventEmitter.prototype);
EventTrigger.prototype.handleDragStart = function(e) {
	this.trigger("DRAG_START", [e]);
};

EventTrigger.prototype.handleDragOver = function(e) {
	this.trigger("DRAG_OVER", [e]);
};

EventTrigger.prototype.handleDrop = function(e) {
	this.trigger("DROP", [e]);
};
