function User({name = "김동빈", money = 10000} = {}) {
	var userDOMBuildFuncs = {
		getCoinButton(value) {
			var button = document.createElement("button");

			button.className = `button money-button coin-button ${value}`
			button.textContent = (function(value) {
				switch(value) {
					case "fifty":
						return "50원";
					case "onehundred":
						return "100원";
					case "fivehundred":
						return "500원";
				}
			})(value);

			return button;
		},

		getBillButton(value) {
			var button = document.createElement("button");

			button.className = `button money-button bill-button ${value}`
			button.textContent = (function(value) {
				switch(value) {
					case "onethousand":
						return "1000원";
					case "fivethousand":
						return "5000원";
					case "tenthousand":
						return "10000원";
				}
			})(value);

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
};
