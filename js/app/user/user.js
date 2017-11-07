function User(eventTrigger, {name = "김동빈", myMoney = 10000} = {}) {
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

		getMyMoneyTextContainer() {
			var p = document.createElement("p");

			p.className = "my-money-container";
			p.textContent = "내 돈: ";

			return p;
		},

		getMyMoneySpan() {
			var span = document.createElement("span");

			span.className = "my-money";
			span.id = "myMoney";
			span.textContent = `${myMoney}원`;

			return span;
		}
	};

	this.eventTrigger = eventTrigger;
	this.name = name;
	this.myMoney = myMoney;
	this.putMoney = 0;
	this.lostMoney = 0;
	this.purchasedProductList = [];

	this.moneyButtonList = {
		"fiftyCoinButton": userDOMBuildFuncs.getCoinButton("fifty"),
		"oneHundredCoinButton": userDOMBuildFuncs.getCoinButton("onehundred"),
		"fiveHundredCoinButton": userDOMBuildFuncs.getCoinButton("fivehundred"),
		"oneThousandBillButton": userDOMBuildFuncs.getBillButton("onethousand"),
	};
	this.myMoneyTextContainer = userDOMBuildFuncs.getMyMoneyTextContainer();
	this.myMoneySpan = userDOMBuildFuncs.getMyMoneySpan();
	this.myMoneyTextContainer.appendChild(this.myMoneySpan);

	this.attachTrigger();
}

User.prototype.attachTrigger = function() {
	this.eventTrigger.on("DRAG_STARTED", this.handleDragStart.bind(this));
	this.eventTrigger.on("DROPPED_ON_TARGET", this.handleDropOnTarget.bind(this));
	this.eventTrigger.on("DROPPED_OFF_TARGET", this.handleDropOffTarget.bind(this));
	this.eventTrigger.on("MONEY_BACK_BUTTON_CLICKED", this.handleMoneyBackButtonClick.bind(this));
};

User.prototype.init = function() {
	var userWrapper = dom.getWrapperAround("user-wrapper");
	var moneyListWrapper = dom.getWrapperAround("money-list-wrapper");
	var myMoneyTextContainerWrapper = dom.getWrapperAround("my-money-text-container-wrapper");

	for (var moneyButton in this.moneyButtonList) {
		var moneyWrapper = dom.getWrapperAround("money-wrapper");

		moneyWrapper.appendChild(this.moneyButtonList[moneyButton]);
		moneyListWrapper.appendChild(moneyWrapper);
	}

	myMoneyTextContainerWrapper.appendChild(this.myMoneyTextContainer);

	userWrapper.appendChild(moneyListWrapper);
	userWrapper.appendChild(myMoneyTextContainerWrapper);

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

User.prototype.handleDropOnTarget = function(e) {
	var droppedMoney = Number(e.dataTransfer.getData("text"));

	this.putMoney += droppedMoney;
	this.myMoney -= droppedMoney;

	this.myMoneySpan.textContent = `${this.myMoney}원`;
};

User.prototype.handleDropOffTarget = function(e) {
	var droppedMoney = Number(e.dataTransfer.getData("text"));

	this.lostMoney += droppedMoney;
	this.myMoney -= droppedMoney;

	this.myMoneySpan.textContent = `${this.myMoney}원`;
};

User.prototype.handleMoneyBackButtonClick = function(e) {
	this.myMoney += this.putMoney;
	this.putMoney = 0;

	this.myMoneySpan.textContent = `${this.myMoney}원`;
}
