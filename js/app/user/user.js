function User({name = "김동빈", money = 10000} = {}) {
	var userDOMBuildFuncs = {
		buildCoinButton(value) {
			var button = document.createElement("button");

			button.className = "button money-button coin-button ${value}"
			button.textContent = value;
		},

		buildBillButton(value) {
			var button = document.createElement("button");

			button.className = "button money-button bill-button ${value}"
			button.textContent = value;
		},

		buildMyMoneyContainer() {
			var p = document.createElement("p");
			var span = document.createElement("span");

			p.textContent: "내 돈: ";
			span.className = "my-money";
			span.id = "myMoney";
			span.textContent = money;

			p.insertAdjacentHTML("beforeend", span);
		}
	}

	this.getName = function() {
		return name;
	};

	this.getMyMoney = function() {
		return money;
	};

	this.purchasedProductList = [];

	this.fiftyCoinButton = userDOMBuildFuncs.buildCoinButton("fifty");
	this.oneHundredCoinButton = userDOMBuildFuncs.buildCoinButton("onehundred");
	this.fiveHundredCoinButton = userDOMBuildFuncs.buildCoinButton("fivehundred");
	this.oneThousandBillButton = userDOMBuildFuncs.buildBillButton("onethousand");
	this.myMoneyContainer = userDOMBuildFuncs.buildMyMoneyContainer();
}

User.prototype.init = function() {
	var moneyWrapper = getWrapperAround("money-wrapper");
	var moneyListWrapper = getWrapperAround("money-list-wrapper");
	var myMoneyContainerWrapper = getWrapperAround("mymoney-container-wrapper");
};
