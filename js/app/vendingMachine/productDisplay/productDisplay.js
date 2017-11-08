function ProductDisplay(eventTrigger) {
	var productInfoList = [
		{ "productId": "pr1", "name": "레쓰비", "enName": "letsbe", "price": "200" },
		{ "productId": "pr2", "name": "사이다", "enName": "soda", "price": "300" },
		{ "productId": "pr3", "name": "콜라", "enName": "coke", "price": "400" },
		{ "productId": "pr4", "name": "암바사", "enName": "ambasa", "price": "500" },
		{ "productId": "pr5", "name": "데자와", "enName": "desawa", "price": "600" },
		{ "productId": "pr6", "name": "코코팜", "enName": "cocopalm", "price": "700" },
		{ "productId": "pr7", "name": "포카리", "enName": "pocari", "price": "800" },
		{ "productId": "pr8", "name": "밀키스", "enName": "milkis", "price": "900" },
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
	this.eventTrigger.on("PURCHASE", this.purchase.bind(this));
	this.eventTrigger.on("WARN_SHORT_OF_MONEY", this.warnShortOfMoney.bind(this));
};

ProductDisplay.prototype.init = function(vendingMachineWrapper) {
	// 배치 랜덤.
	var shuffledProductList = util.getShuffledArray(this.productList);
	var productDisplayWrapper = dom.getWrapperAround("product-display-wrapper");

	shuffledProductList.forEach(function(product) {
		product.init(productDisplayWrapper);
	});

	vendingMachineWrapper.appendChild(productDisplayWrapper);
};

ProductDisplay.prototype.purchase = function(e) {
	var productId = e.currentTarget.id;
	var purchasedProduct = this.productList.find(function(product) {
		return product.productId === productId;
	});

 	purchasedProduct.amount--;
};

ProductDisplay.prototype.warnShortOfMoney = function(e) {

};
