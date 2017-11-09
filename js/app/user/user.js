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

			p.className = "my-money-text-container";
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
	this.purchasedProductMap = new Map();

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
	this.eventTrigger.on("MONEY_ACCEPTED", this.moneyAccepted.bind(this));
	this.eventTrigger.on("DROPPED_ON_USER", this.handleDropOnUser.bind(this));
	this.eventTrigger.on("DROPPED_OFF_TARGET", this.handleDropOffTarget.bind(this));
	this.eventTrigger.on("MONEY_BACK_BUTTON_CLICKED", this.handleMoneyBackButtonClick.bind(this));
	this.eventTrigger.on("PURCHASE", this.showPurchasedProduct.bind(this));
};

User.prototype.init = function() {
	var userWrapper = dom.getWrapperAround("user-wrapper");
	var moneyListWrapper = dom.getWrapperAround("money-list-wrapper");
	var myMoneyTextContainerWrapper = dom.getWrapperAround("my-money-text-container-wrapper");
	var purchasedProductListWrapper = dom.getWrapperAround("purchased-product-list-wrapper");

	for (var moneyButton in this.moneyButtonList) {
		var moneyWrapper = dom.getWrapperAround("money-wrapper");

		moneyWrapper.appendChild(this.moneyButtonList[moneyButton]);
		moneyListWrapper.appendChild(moneyWrapper);
	}

	myMoneyTextContainerWrapper.appendChild(this.myMoneyTextContainer);

	userWrapper.appendChild(moneyListWrapper);
	userWrapper.appendChild(myMoneyTextContainerWrapper);
	userWrapper.appendChild(purchasedProductListWrapper);

	dom.root.appendChild(userWrapper);

	this.addListener();
};

User.prototype.addListener = function() {
	for (var moneyButtonKey in this.moneyButtonList) {
		var moneyButton = this.moneyButtonList[moneyButtonKey];

		moneyButton.addEventListener("dragstart", this.eventTrigger.handleDragStart.bind(this.eventTrigger));
		moneyButton.addEventListener("mousedown", this.handleMouseDown.bind(this));
	}
};

User.prototype.handleDragStart = function(e) {
	e.dataTransfer.setData("text", e.target.dataset.moneyValue);
};

User.prototype.moneyAccepted = function(droppedMoney) {
	this.myMoney -= droppedMoney;

	this.myMoneySpan.textContent = `${this.myMoney}원`;

	this.checkMoneyButtonList();
};

User.prototype.handleDropOnUser = function(e) {
	// Nothing happens
};

User.prototype.handleDropOffTarget = function(e) {
	var lostMoney = Number(e.dataTransfer.getData("text"));

	this.lostMoney += lostMoney;
	this.myMoney -= lostMoney;

	this.myMoneySpan.textContent = `${this.myMoney}원`;

	this.checkMoneyButtonList();
};

User.prototype.handleMoneyBackButtonClick = function(totalInsertedMoney) {
	this.myMoney += totalInsertedMoney;

	this.myMoneySpan.textContent = `${this.myMoney}원`;
};

User.prototype.checkMoneyButtonList = function() {
	for (var moneyButtonKey in this.moneyButtonList) {
		var moneyButton = this.moneyButtonList[moneyButtonKey];

		if (this.myMoney < Number(moneyButton.dataset.moneyValue)) {
			moneyButton.setAttribute("draggable", false);
			moneyButton.classList.add("no-money");
		}
	}
};

User.prototype.handleMouseDown = function(e) {
	var moneyButton = e.target;

	if (moneyButton.classList.contains("no-money")) {
		this.eventTrigger.warnShortOfMoneyOnUser();
	}
};

User.prototype.showPurchasedProduct = function(product) {
	var purchasedProduct = this.purchasedProductMap.get(product.id);
	var purchasedProductWrapper = dom.getWrapperAround("purchased-product-wrapper");
	var purchasedProductListWrapper = document.querySelector(".purchased-product-list-wrapper");

	if (purchasedProduct) {
		var purchasedProductFigure = document.querySelector(`[data-purchased-product-id=${purchasedProduct.product.id}]`);

		purchasedProductFigure.querySelector(".purchased-product-amount").textContent = `${++purchasedProduct.amount}개`;
	} else {
		this.purchasedProductMap.set(product.id, {
			"amount": 1,
			"product": product
		});

		var figure = document.createElement("figure");
		var image = document.createElement("img");
		var figcaption = document.createElement("figcaption");
		var nameP = document.createElement("p");
		var amountP = document.createElement("p");

		image.src = `../images/product/${product.enName}.png`;
		image.width = 64;
		image.height = 64;
		image.alt = product.name;
		nameP.textContent = product.name;
		amountP.className = "purchased-product-amount";
		amountP.textContent = "1개";
		figure.dataset.purchasedProductId = product.id;

		figcaption.appendChild(nameP);
		figcaption.appendChild(amountP);
		figure.appendChild(image);
		figure.appendChild(figcaption);
		purchasedProductWrapper.appendChild(figure);
		purchasedProductListWrapper.appendChild(purchasedProductWrapper);
	}

	purchasedProductListWrapper.style.borderTop = "1px solid black";
};
