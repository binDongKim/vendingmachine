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

		getTotalInsertedMoneyTextContainer() {
			var p = document.createElement("p");

			p.className = "total-inserted-money-container";
			p.textContent = "투입금액: ";

			return p;
		},

		getTotalInsertedMoneySpan() {
			var span = document.createElement("span");

			span.className = "total-inserted-money";
			span.id = "totalInsertedMoney";
			span.textContent = "0원";

			return span;
		}
	};

	this.eventTrigger = eventTrigger;
	this.totalInsertedMoney = 0;
	this.moneyLimit = moneyLimit;
	this.currentBillCount = 0;
	this.billLimit = billLimit;

	this.moneyPutArea = moneyInOutDOMBuildFuncs.getMoneyPutArea();
	this.moneyBackButton = moneyInOutDOMBuildFuncs.getMoneyBackButton();
	this.totalInsertedMoneyTextContainer = moneyInOutDOMBuildFuncs.getTotalInsertedMoneyTextContainer();
	this.totalInsertedMoneySpan = moneyInOutDOMBuildFuncs.getTotalInsertedMoneySpan();
	this.totalInsertedMoneyTextContainer.appendChild(this.totalInsertedMoneySpan);

	this.attachTrigger();
}

MoneyInOut.prototype.attachTrigger = function() {
	// this.eventTrigger.on("DRAG_OVER", this.handleDragOver.bind(this));
	this.eventTrigger.on("DROPPED_ON_TARGET", this.handleDrop.bind(this));
	this.eventTrigger.on("MONEY_BACK_BUTTON_CLICKED", this.handleMoneyBackButtonClick.bind(this));
	this.eventTrigger.on("PRODUCT_CLICKED", this.handleProductClick.bind(this));
	this.eventTrigger.on("PURCHASE", this.deductTotalInsertedMoney.bind(this));
};

MoneyInOut.prototype.init = function(vendingMachineWrapper) {
	var moneyInOutWrapper = dom.getWrapperAround("money-in-out-wrapper");
	var moneyPutAreaWrapper = this.moneyPutArea;
	var totalInsertedMoneyTextContainerWrapper = dom.getWrapperAround("total-inserted-money-text-container-wrapper");
	var moneyBackButtonWrapper = dom.getWrapperAround("money-back-button-wrapper");

	moneyBackButtonWrapper.appendChild(this.moneyBackButton);
	totalInsertedMoneyTextContainerWrapper.appendChild(this.totalInsertedMoneyTextContainer);

	moneyInOutWrapper.appendChild(moneyPutAreaWrapper);
	moneyInOutWrapper.appendChild(totalInsertedMoneyTextContainerWrapper);
	moneyInOutWrapper.appendChild(moneyBackButtonWrapper);

	vendingMachineWrapper.appendChild(moneyInOutWrapper);

	this.addListener();
};

MoneyInOut.prototype.addListener = function() {
	var that = this;
	// this.moneyPutArea.addEventListener("dragover", this.eventTrigger.handleDragOver.bind(this.eventTrigger));
	// this.moneyPutArea.addEventListener("drop", this.eventTrigger.handleDrop.bind(this.eventTrigger));
	this.moneyBackButton.addEventListener("click", function() {
		var totalInsertedMoney = that.totalInsertedMoney;

		that.eventTrigger.handleMoneyBackButtonClick.call(that.eventTrigger, totalInsertedMoney);
	});
};

// MoneyInOut.prototype.handleDragOver = function(e) {
// 	e.preventDefault();
// };

MoneyInOut.prototype.checkMaxMoneyLimit = function(money) {
	return this.totalInsertedMoney + money <= this.moneyLimit;
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

		this.totalInsertedMoney += droppedMoney;
		this.totalInsertedMoneySpan.textContent = `${this.totalInsertedMoney}원`;

		this.eventTrigger.moneyAccepted(droppedMoney);
		this.eventTrigger.totalInsertedMoneyChanged(this.totalInsertedMoney);
	} else {
		this.eventTrigger.moneyRefused(e);
		//TODO: Limit도달 경고 띄우기.
	}
};

MoneyInOut.prototype.handleMoneyBackButtonClick = function() {
	this.totalInsertedMoney = 0;
	this.currentBillCount = 0;
	this.totalInsertedMoneySpan.textContent = `${this.totalInsertedMoney}원`;

	this.eventTrigger.totalInsertedMoneyChanged(this.totalInsertedMoney);
};

MoneyInOut.prototype.handleProductClick = function(e) {
	var price = e.currentTarget.dataset.price;
	var isMoneyEnough = this.isMoneyEnough(price);

	if (isMoneyEnough) {
		this.eventTrigger.purchase(e);
	} else {
		this.eventTrigger.warnShortOfMoney(e);
	}
};

MoneyInOut.prototype.isMoneyEnough = function(price) {
	return this.totalInsertedMoney >= Number(price);
};

MoneyInOut.prototype.deductTotalInsertedMoney = function(e) {
	var price = e.currentTarget.dataset.price;

	this.totalInsertedMoney -= Number(price);
	this.currentBillCount = 0;
	this.totalInsertedMoneySpan.textContent = `${this.totalInsertedMoney}원`;

	this.eventTrigger.totalInsertedMoneyChanged(this.totalInsertedMoney);
}
