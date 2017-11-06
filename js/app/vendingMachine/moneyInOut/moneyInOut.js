function MoneyInOut({moneyLimit = 3000, billLimit = 2} = {}) {
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

	this.insertedMoney = 0;
	this.moneyLimit = moneyLimit;
	this.billLimit = billLimit;

	this.moneyPutArea = moneyInOutDOMBuildFuncs.getMoneyPutArea();
	this.moneyBackButton = moneyInOutDOMBuildFuncs.getMoneyBackButton();
	this.insertedMoneyContainer = moneyInOutDOMBuildFuncs.getInsertedMoneyContainer();
}

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

	this.addListeners();
};

MoneyInOut.prototype.addListeners = function() {
	this.moneyPutArea.addEventListener("dragover", this.handleDragOver);
	this.moneyPutArea.addEventListener("drop", this.handleDrop);
};

MoneyInOut.prototype.handleDragOver = function(e) {
	e.preventDefault();
};

MoneyInOut.prototype.handleDrop = function(e) {
	e.preventDefault();

	var passedMoney = e.dataTransfer.getData("text");
	var insertedMoneySpan = document.getElementById("insertedMoney");
	var currentInsertedMoney = util.getNumberOnly(insertedMoneySpan.textContent);

	insertedMoneySpan.textContent = `${currentInsertedMoney + Number(passedMoney)}원`;
}
