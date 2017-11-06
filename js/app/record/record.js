function Record() {
	var recordDOMBuildFuncs = {
		getRecordListContainer() {
			var ul = document.createElement("ul");

			ul.className = "record-list";
			return ul;
		}
	};

	this.recordListContainer = recordDOMBuildFuncs.getRecordListContainer();
}

Record.prototype.init = function() {
	var recordWrapper = dom.getWrapperAround("record-wrapper");
	var recordListContainerWrapper = dom.getWrapperAround("record-list-container-wrapper");

	recordListContainerWrapper.appendChild(this.recordListContainer);
	recordWrapper.appendChild(recordListContainerWrapper);

	dom.root.appendChild(recordWrapper);
};
