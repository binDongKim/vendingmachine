function User({name = "김동빈", money = 10000} = {}) {
	this.name = name;
	this.money = money;
	this.purchasedProductList = [];
}

User.prototype.init = function() {
};
