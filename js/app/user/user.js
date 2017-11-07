function User(eventTrigger, {name = "김동빈", money = 10000} = {}) {
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

	this.eventTrigger = eventTrigger;
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

	this.attachTrigger();
}

User.prototype.attachTrigger = function() {
	this.eventTrigger.on("DRAG_START", this.handleDragStart.bind(this));
	this.eventTrigger.on("DROP_ON_TARGET", this.handleDrop.bind(this));
	this.eventTrigger.on("DROP_OFF_TARGET", this.handleDrop.bind(this));
};

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

	this.addListener();
};

User.prototype.addListener = function() {
	for (var moneyButton in this.moneyButtonList) {
		this.moneyButtonList[moneyButton].addEventListener("dragstart", this.eventTrigger.handleDragStart.bind(this.eventTrigger));
	}
};

User.prototype.handleDragStart = function(e) {
	e.dataTransfer.setData("text", e.target.dataset.moneyValue);
};

User.prototype.handleDrop = function(e) {
	var droppedMoney = e.dataTransfer.getData("text");
	var myMoneySpan = document.getElementById("myMoney");
	var currentMyMoney = util.getNumberOnly(myMoneySpan.textContent);

	myMoneySpan.textContent = `${currentMyMoney - Number(droppedMoney)}원`;
};
