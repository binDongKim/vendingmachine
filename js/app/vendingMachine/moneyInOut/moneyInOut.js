function MoneyInOut(eventTrigger, {moneyLimit = 3000, billLimit = 2} = {}) {
	var moneyInOutDOMBuildFuncs = {
		getMoneyPutArea() {
			var div = document.createElement("div");
			var p = document.createElement("p");

			p.className = "money-put-area-text";
			p.textContent = "투입구";
			div.className = "money-put-area-wrapper";

			div.appendChild(p);

			return div;
		},

		getMoneyBackButton() {
			var button = document.createElement("button");

			button.className = "button money-back-button";
			button.id = "moneyBackButton";
			button.textContent = "반환";

			return button;
		},

		getInsertedMoneyContainer() {
			var p = document.createElement("p");
			var span = document.createElement("span");

			p.className = "inserted-money-container";
			p.textContent = "투입금액: ";
			span.className = "inserted-money";
			span.id = "insertedMoney";
			span.textContent = "0원";

			p.appendChild(span);

			return p;
		}
	};

	this.eventTrigger = eventTrigger;
	this.insertedMoney = 0;
	this.moneyLimit = moneyLimit;
	this.billLimit = billLimit;

	this.moneyPutArea = moneyInOutDOMBuildFuncs.getMoneyPutArea();
	this.moneyBackButton = moneyInOutDOMBuildFuncs.getMoneyBackButton();
	this.insertedMoneyContainer = moneyInOutDOMBuildFuncs.getInsertedMoneyContainer();

	this.attachTrigger();
}

MoneyInOut.prototype.attachTrigger = function() {
	this.eventTrigger.on("DRAG_OVER", this.handleDragOver.bind(this));
	this.eventTrigger.on("DROP_ON_TARGET", this.handleDrop.bind(this));
};

MoneyInOut.prototype.init = function(vendingMachineWrapper) {
	var moneyInOutWrapper = dom.getWrapperAround("money-in-out-wrapper");
	var moneyPutAreaWrapper = this.moneyPutArea;
	var insertedMoneyContainerWrapper = dom.getWrapperAround("inserted-money-container-wrapper");
	var moneyBackButtonWrapper = dom.getWrapperAround("money-back-button-wrapper");

	moneyBackButtonWrapper.appendChild(this.moneyBackButton);
	insertedMoneyContainerWrapper.appendChild(this.insertedMoneyContainer);

	moneyInOutWrapper.appendChild(moneyPutAreaWrapper);
	moneyInOutWrapper.appendChild(insertedMoneyContainerWrapper);
	moneyInOutWrapper.appendChild(moneyBackButtonWrapper);

	vendingMachineWrapper.appendChild(moneyInOutWrapper);

	this.addListener();
};

MoneyInOut.prototype.addListener = function() {
	// this.moneyPutArea.addEventListener("dragover", this.eventTrigger.handleDragOver.bind(this.eventTrigger));
	// this.moneyPutArea.addEventListener("drop", this.eventTrigger.handleDrop.bind(this.eventTrigger));
};

MoneyInOut.prototype.handleDragOver = function(e) {
	e.preventDefault();
};

MoneyInOut.prototype.handleDrop = function(e) {
	e.preventDefault();

	var droppedMoney = e.dataTransfer.getData("text");
	var insertedMoneySpan = document.getElementById("insertedMoney");
	var currentInsertedMoney = util.getNumberOnly(insertedMoneySpan.textContent);

	insertedMoneySpan.textContent = `${currentInsertedMoney + Number(droppedMoney)}원`;
}
