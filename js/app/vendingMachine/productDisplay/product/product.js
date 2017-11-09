function Product(eventTrigger, {id, name, enName, price}) {
	var productDOMBuildFuncs = {
		getProductFigure(id, name, enName, price) {
			var figure = document.createElement("figure");
			var image = document.createElement("img");
			var figcaption = document.createElement("figcaption");
			var nameP = document.createElement("p");
			var priceP = document.createElement("p");

			image.src = `../images/product/${enName}.png`;
			image.width = 64;
			image.height = 64;
			image.alt = name;
			nameP.textContent = name;
			priceP.textContent = `${price}원`;
			figure.className = "product-figure";
			figure.dataset.productId = id;
			figure.dataset.price = price;

			figcaption.appendChild(nameP);
			figcaption.appendChild(priceP);
			figure.appendChild(image);
			figure.appendChild(figcaption);

			return figure;
		},

		getProductStateTextContainer(id) {
			var p = document.createElement("p");

			p.className = "product-state-text-container";
			p.dataset.productId = id;
			p.textContent = "";

			return p;
		}
	};

	var MIN_AMOUNT = 1;
	var MAX_AMOUNT = 3;

	this.eventTrigger = eventTrigger;
	this.id = id;
	this.name = name;
	this.enName = enName;
	this.price = price;
	// amount(재고) 랜덤.
	this.amount = Math.floor(MIN_AMOUNT + MAX_AMOUNT * Math.random());

	this.productFigure = productDOMBuildFuncs.getProductFigure(this.id, this.name, this.enName, this.price);
	this.productStateTextContainer = productDOMBuildFuncs.getProductStateTextContainer(this.id);
}

Product.prototype.init = function(displayWrapper) {
	var figureWrapper = dom.getWrapperAround("product-figure-wrapper");

	figureWrapper.appendChild(this.productFigure);
	figureWrapper.appendChild(this.productStateTextContainer);
	displayWrapper.appendChild(figureWrapper);

	this.addListener();
};

Product.prototype.addListener = function() {
	this.productFigure.addEventListener("click", this.eventTrigger.handleProductClick.bind(this.eventTrigger));
};
