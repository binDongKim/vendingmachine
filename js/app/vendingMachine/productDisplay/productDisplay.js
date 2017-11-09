function ProductDisplay(eventTrigger) {
	var productInfoList = [
		{ "id": "pr1", "name": "레쓰비", "enName": "letsbe", "price": "200" },
		{ "id": "pr2", "name": "사이다", "enName": "soda", "price": "300" },
		{ "id": "pr3", "name": "콜라", "enName": "coke", "price": "400" },
		{ "id": "pr4", "name": "암바사", "enName": "ambasa", "price": "500" },
		{ "id": "pr5", "name": "데자와", "enName": "desawa", "price": "600" },
		{ "id": "pr6", "name": "코코팜", "enName": "cocopalm", "price": "700" },
		{ "id": "pr7", "name": "포카리", "enName": "pocari", "price": "800" },
		{ "id": "pr8", "name": "밀키스", "enName": "milkis", "price": "900" },
	];

	this.eventTrigger = eventTrigger;
	this.productList = [];

	for (var i = 0, length = productInfoList.length; i < length; i++) {
		var product = new Product(eventTrigger, productInfoList[i]);

		this.productList.push(product);
	}

	this.attachTrigger();
}

ProductDisplay.prototype.attachTrigger = function() {
	this.eventTrigger.on("PRODUCT_CLICKED", this.handleProductClick.bind(this));
	this.eventTrigger.on("TOTAL_INSERTED_MONEY_CHANGED", this.showProductState.bind(this));
	this.eventTrigger.on("MONEY_BACK_BUTTON_CLICKED", this.hideProductState.bind(this));
	this.eventTrigger.on("PURCHASE", this.purchase.bind(this));
	this.eventTrigger.on("WARN_SHORT_OF_MONEY", this.warnShortOfMoney.bind(this));
};

ProductDisplay.prototype.init = function(vendingMachineWrapper) {
	// 배치 랜덤.
	var shuffledProductList = util.getShuffledArray(this.productList);
	var productDisplayWrapper = dom.getWrapperAround("product-display-wrapper");

	shuffledProductList.forEach(function(productObj) {
		productObj.init(productDisplayWrapper);
	});

	vendingMachineWrapper.appendChild(productDisplayWrapper);
};

ProductDisplay.prototype.handleProductClick = function(e) {
	var clickedProduct = this.productList.find(function(productObj) {
		return productObj.id === e.currentTarget.dataset.productId;
	});

	if (clickedProduct.amount === 0) {
		this.eventTrigger.warnSoldOut(clickedProduct);
	} else {
		this.eventTrigger.checkEnoughMoney(clickedProduct);
	}
};

ProductDisplay.prototype.showProductState = function(totalInsertedMoney) {
	this.productList.forEach(function(productObj) {
		if (productObj.amount !== 0) {
			if (totalInsertedMoney >= productObj.price) {
				productObj.productStateTextContainer.textContent = "구매가능";
			} else {
				productObj.productStateTextContainer.textContent = "돈 부족";
			}
		} else {
			productObj.productStateTextContainer.textContent = "품절";
		}
	});
};

ProductDisplay.prototype.hideProductState = function() {
	this.productList.forEach(function(productObj) {
		if (productObj.amount !== 0) {
			productObj.productStateTextContainer.textContent = "";
		}
	});
};

ProductDisplay.prototype.purchase = function(product) {
	var purchasedProduct = this.productList.find(function(productObj) {
		return productObj.id === product.id;
	});

 	purchasedProduct.amount--;
};

ProductDisplay.prototype.warnShortOfMoney = function(product) {

};
