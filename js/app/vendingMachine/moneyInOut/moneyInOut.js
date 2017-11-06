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

MoneyInOut.prototype.init = function() {
	var moneyInOutWrapper = dom.getWrapperAround("money-in-out-wrapper");
	var moneyPutAreaWrapper = this.moneyPutArea;
	var moneyBackButtonWrapper = dom.getWrapperAround("money-back-button-wrapper");
	var insertedMoneyContainerWrapper = dom.getWrapperAround("inserted-money-container-wrapper");

	moneyBackButtonWrapper.appendChild(this.moneyBackButton);
	insertedMoneyContainerWrapper.appendChild(this.insertedMoneyContainer);

	moneyInOutWrapper.appendChild(moneyPutAreaWrapper);
	moneyInOutWrapper.appendChild(moneyBackButtonWrapper);
	moneyInOutWrapper.appendChild(insertedMoneyContainerWrapper);

	dom.root.appendChild(moneyInOutWrapper);
};
