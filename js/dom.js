var dom = {
	root: document.getElementById("root"),
	getWrapperAround(className) {
		var wrapper = document.createElement("div");

		wrapper.className = className;
		return wrapper;
	}
};
