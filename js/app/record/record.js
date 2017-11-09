function Record(eventTrigger) {
	var recordDOMBuildFuncs = {
		getRecordHeader() {
			var h3 = document.createElement("h4");

			h3.textContent = "콘솔 영역";

			return h3;
		},

		getRecordListContainer() {
			var ul = document.createElement("ul");

			ul.className = "record-list";

			return ul;
		}
	};

	this.eventTrigger = eventTrigger;

	this.recordHeader = recordDOMBuildFuncs.getRecordHeader();
	this.recordListContainer = recordDOMBuildFuncs.getRecordListContainer();

	this.attachTrigger();
}

Record.prototype.attachTrigger = function() {
	this.eventTrigger.on("DRAG_STARTED", this.makeDragStartedRecord.bind(this));
	this.eventTrigger.on("DROPPED_ON_USER", this.makeDroppedOnUserRecord.bind(this));
	this.eventTrigger.on("DROPPED_OFF_TARGET", this.makeDroppedOffTargetRecord.bind(this));
	this.eventTrigger.on("MONEY_BACK_BUTTON_CLICKED", this.makeMoneyBackButtonClickedRecord.bind(this));
	this.eventTrigger.on("MONEY_ACCEPTED", this.makeMoneyAcceptedRecord.bind(this));
	this.eventTrigger.on("MONEY_REFUSED", this.makeMoneyRefusedRecord.bind(this));
	this.eventTrigger.on("PURCHASE", this.makePurchaseRecord.bind(this));
	this.eventTrigger.on("WARN_SHORT_OF_MONEY_ON_MACHINE", this.makeWarnShortOfMoneyOnMachineRecord.bind(this));
	this.eventTrigger.on("WARN_SOLD_OUT", this.makeWarnSoldOutRecord.bind(this));
	this.eventTrigger.on("WARN_SHORT_OF_MONEY_ON_USER", this.makeWarnShortOfMoneyOnUserRecord.bind(this));
};

Record.prototype.init = function() {
	var recordWrapper = dom.getWrapperAround("record-wrapper");
	var recordHeaderWrapper = dom.getWrapperAround("record-header-wrapper");
	var recordListContainerWrapper = dom.getWrapperAround("record-list-container-wrapper");

	recordHeaderWrapper.appendChild(this.recordHeader);
	recordListContainerWrapper.appendChild(this.recordListContainer);

	recordWrapper.appendChild(recordHeaderWrapper);
	recordWrapper.appendChild(recordListContainerWrapper);

	dom.root.appendChild(recordWrapper);
};

Record.prototype.makeDragStartedRecord = function(e) {
	var draggedMoney = e.dataTransfer.getData("text");
	var record = `${draggedMoney}원을 꺼냈습니다.`;

	this.showRecord(record);
};

Record.prototype.makeDroppedOnUserRecord = function(e) {
	var droppedMoney = e.dataTransfer.getData("text");
	var record = `${droppedMoney}원을 다시 지갑에 넣었습니다.`;

	this.showRecord(record);
};

Record.prototype.makeDroppedOffTargetRecord = function(e) {
	var lostMoney = e.dataTransfer.getData("text");
	var record = `${lostMoney}원을 잃어버렸습니다.`;

	this.showRecord(record);
};

Record.prototype.makeMoneyBackButtonClickedRecord = function(money) {
	var record = `${money}원을 반환했습니다.`;

	this.showRecord(record);
};

Record.prototype.makeMoneyAcceptedRecord = function(money) {
	var record = `투입한 ${money}원이 승인되었습니다.`;

	this.showRecord(record);
};

Record.prototype.makeMoneyRefusedRecord = function(money) {
	var record = `투입한 ${money}원이 거부되었습니다.`;

	this.showRecord(record);
};

Record.prototype.makePurchaseRecord = function(product) {
	var record = `${product.name}를 구입했습니다.`;

	this.showRecord(record);
};

Record.prototype.makeWarnShortOfMoneyOnMachineRecord = function() {
	var record = `투입 금액이 모자랍니다.`;

	this.showRecord(record);
};

Record.prototype.makeWarnSoldOutRecord = function(product) {
	var record = `${product.name}는 품절입니다.`;

	this.showRecord(record);
};

Record.prototype.makeWarnShortOfMoneyOnUserRecord = function() {
	var record = `지갑에 돈이 모자랍니다.`;

	this.showRecord(record);
};

Record.prototype.showRecord = function(record) {
	var li = document.createElement("li");

	li.className = "record-list-item";
	li.textContent = record;

	this.recordListContainer.appendChild(li);
	
	this.goScrollToBottom();
};

Record.prototype.goScrollToBottom = function() {
	this.recordListContainer.scrollTop = this.recordListContainer.scrollHeight - this.recordListContainer.clientHeight;
};
