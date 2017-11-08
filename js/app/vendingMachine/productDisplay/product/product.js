function Product(eventTrigger, {productId, name, enName, price}) {
	var productDOMBuildFuncs = {
		getProductFigure(id, name, price) {
			var figure = document.createElement("figure");
			var image = document.createElement("img");
			var figcaption = document.createElement("figcaption");

			image.src = `../images/product/${name}.png`;
			image.width = 64;
			image.height = 64;
			image.alt = name;
			figcaption.textContent = `${price}원`;
			figure.className = "product-figure";
			figure.id = id;
			figure.dataset.price = price;

			figure.appendChild(image);
			figure.appendChild(figcaption);

			return figure;
		}
	};

	var MIN_AMOUNT = 1;
	var MAX_AMOUNT = 3;

	this.eventTrigger = eventTrigger;
	this.productId = productId;
	this.name = name;
	this.enName = enName;
	this.price = price;
	// amount(재고) 랜덤.
	this.amount = Math.floor(MIN_AMOUNT + MAX_AMOUNT * Math.random());

	this.productFigure = productDOMBuildFuncs.getProductFigure(this.productId, this.enName, this.price);
}

Product.prototype.init = function(displayWrapper) {
	var figureWrapper = dom.getWrapperAround("product-figure-wrapper");

	figureWrapper.appendChild(this.productFigure);
	displayWrapper.appendChild(figureWrapper);

	this.addListener();
};

Product.prototype.addListener = function() {
	this.productFigure.addEventListener("click", this.eventTrigger.handleProductClick.bind(this.eventTrigger));
};

Product.prototype.purchase = function() {
	this.amount--;
	// this.eventTrigger.purchased();
};

Product.prototype.warnShortOfMoney = function(e) {

};
