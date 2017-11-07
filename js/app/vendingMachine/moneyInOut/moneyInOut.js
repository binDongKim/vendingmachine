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

		getInsertedMoneyTextContainer() {
			var p = document.createElement("p");

			p.className = "inserted-money-container";
			p.textContent = "투입금액: ";

			return p;
		},

		getInsertedMoneySpan() {
			var span = document.createElement("span");

			span.className = "inserted-money";
			span.id = "insertedMoney";
			span.textContent = "0원";

			return span;
		}
	};

	this.eventTrigger = eventTrigger;
	this.insertedMoney = 0;
	this.moneyLimit = moneyLimit;
	this.currentBillCount = 0;
	this.billLimit = billLimit;

	this.moneyPutArea = moneyInOutDOMBuildFuncs.getMoneyPutArea();
	this.moneyBackButton = moneyInOutDOMBuildFuncs.getMoneyBackButton();
	this.insertedMoneyTextContainer = moneyInOutDOMBuildFuncs.getInsertedMoneyTextContainer();
	this.insertedMoneySpan = moneyInOutDOMBuildFuncs.getInsertedMoneySpan();
	this.insertedMoneyTextContainer.appendChild(this.insertedMoneySpan);

	this.attachTrigger();
}

MoneyInOut.prototype.attachTrigger = function() {
	// this.eventTrigger.on("DRAG_OVER", this.handleDragOver.bind(this));
	this.eventTrigger.on("DROPPED_ON_TARGET", this.handleDrop.bind(this));
	this.eventTrigger.on("MONEY_BACK_BUTTON_CLICKED", this.handleMoneyBackButtonClick.bind(this));
};

MoneyInOut.prototype.init = function(vendingMachineWrapper) {
	var moneyInOutWrapper = dom.getWrapperAround("money-in-out-wrapper");
	var moneyPutAreaWrapper = this.moneyPutArea;
	var insertedMoneyTextContainerWrapper = dom.getWrapperAround("inserted-money-text-container-wrapper");
	var moneyBackButtonWrapper = dom.getWrapperAround("money-back-button-wrapper");

	moneyBackButtonWrapper.appendChild(this.moneyBackButton);
	insertedMoneyTextContainerWrapper.appendChild(this.insertedMoneyTextContainer);

	moneyInOutWrapper.appendChild(moneyPutAreaWrapper);
	moneyInOutWrapper.appendChild(insertedMoneyTextContainerWrapper);
	moneyInOutWrapper.appendChild(moneyBackButtonWrapper);

	vendingMachineWrapper.appendChild(moneyInOutWrapper);

	this.addListener();
};

MoneyInOut.prototype.addListener = function() {
	// this.moneyPutArea.addEventListener("dragover", this.eventTrigger.handleDragOver.bind(this.eventTrigger));
	// this.moneyPutArea.addEventListener("drop", this.eventTrigger.handleDrop.bind(this.eventTrigger));
	this.moneyBackButton.addEventListener("click", this.eventTrigger.handleMoneyBackButtonClick.bind(this.eventTrigger));
};

// MoneyInOut.prototype.handleDragOver = function(e) {
// 	e.preventDefault();
// };

MoneyInOut.prototype.checkMaxMoneyLimit = function(money) {
	return this.insertedMoney + money <= this.moneyLimit;
};

MoneyInOut.prototype.checkMaxBillLimit = function(money) {
	return this.currentBillCount !== this.billLimit;
};

//TODO: isMoneyAcceptable 리팩토링.
MoneyInOut.prototype.handleDrop = function(e) {
	e.preventDefault();

	var droppedMoney = Number(e.dataTransfer.getData("text"));
	var isMoneyAcceptable = false;
	var isMoneyBill = droppedMoney === 1000;

	if (isMoneyBill) {
		isMoneyAcceptable = this.checkMaxBillLimit(droppedMoney) && this.checkMaxMoneyLimit(droppedMoney);
	} else {
		isMoneyAcceptable = this.checkMaxMoneyLimit(droppedMoney);
	}

	if (isMoneyAcceptable) {
		if (isMoneyBill) {
			this.currentBillCount++;
		}

		this.insertedMoney += droppedMoney;
		this.insertedMoneySpan.textContent = `${this.insertedMoney}원`;
		this.eventTrigger.moneyAccepted(e);
	} else {
		this.eventTrigger.moneyRefused(e);
		//TODO: Limit도달 경고 띄우기.
	}
};

MoneyInOut.prototype.handleMoneyBackButtonClick = function(e) {
	this.insertedMoney = 0;
	this.currentBillCount = 0;
	this.insertedMoneySpan.textContent = `${this.insertedMoney}원`;
};
