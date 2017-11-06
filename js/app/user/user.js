function User({name = "김동빈", money = 10000} = {}) {
	var userDOMBuildFuncs = {
		getCoinButton(value) {
			var button = document.createElement("button");

			button.className = `button money-button coin-button ${value}`;
			switch(value) {
				case "fifty":
					button.dataset.moneyValue = 50;
					button.textContent = "50원";
					break;
				case "onehundred":
					button.dataset.moneyValue = 100;
					button.textContent = "100원";
					break;
				case "fivehundred":
					button.dataset.moneyValue = 500;
					button.textContent = "500원";
					break;
			}

			button.draggable = true;

			return button;
		},

		getBillButton(value) {
			var button = document.createElement("button");

			button.className = `button money-button bill-button ${value}`;
			button.dataset.moneyValue = 1000;
			button.textContent = "1000원";
			button.draggable = true;

			return button;
		},

		getMyMoneyContainer() {
			var p = document.createElement("p");
			var span = document.createElement("span");

			p.className = "my-money-container";
			p.textContent = "내 돈: ";
			span.className = "my-money";
			span.id = "myMoney";
			span.textContent = `${money}원`;

			p.appendChild(span);

			return p;
		}
	};

	this.name = name;
	this.money = money;
	this.purchasedProductList = [];

	this.moneyButtonList = {
		"fiftyCoinButton": userDOMBuildFuncs.getCoinButton("fifty"),
		"oneHundredCoinButton": userDOMBuildFuncs.getCoinButton("onehundred"),
		"fiveHundredCoinButton": userDOMBuildFuncs.getCoinButton("fivehundred"),
		"oneThousandBillButton": userDOMBuildFuncs.getBillButton("onethousand"),
	};
	this.myMoneyContainer = userDOMBuildFuncs.getMyMoneyContainer();
}

User.prototype.init = function() {
	var userWrapper = dom.getWrapperAround("user-wrapper");
	var moneyListWrapper = dom.getWrapperAround("money-list-wrapper");
	var myMoneyContainerWrapper = dom.getWrapperAround("my-money-container-wrapper");

	for (var moneyButton in this.moneyButtonList) {
		var moneyWrapper = dom.getWrapperAround("money-wrapper");

		moneyWrapper.appendChild(this.moneyButtonList[moneyButton]);
		moneyListWrapper.appendChild(moneyWrapper);
	}

	myMoneyContainerWrapper.appendChild(this.myMoneyContainer);

	userWrapper.appendChild(moneyListWrapper);
	userWrapper.appendChild(myMoneyContainerWrapper);

	dom.root.appendChild(userWrapper);

	this.addListeners();
};

User.prototype.addListeners = function() {
	for (var moneyButton in this.moneyButtonList) {
		this.moneyButtonList[moneyButton].addEventListener("dragstart", this.handleDragStart);
	}
};

User.prototype.handleDragStart = function(e) {
	e.dataTransfer.setData("text", this.dataset.moneyValue);
};
