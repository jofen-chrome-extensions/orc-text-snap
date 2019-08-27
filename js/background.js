var Background = (function (){
	// variables ----------------------------------------------------------------
	var _this 		= {};
			
	// initialize ---------------------------------------------------------------
	_this.init = function (){
		// receive post messages from "inject.js" and any iframes
		chrome.runtime.onMessage.addListener(onPostMessage);	
	};
	
	// private functions --------------------------------------------------------	
	function processMessage (request){
		// process the request
		switch (request.message){
			case 'all-iframes-loaded': message_allIframesLoaded(); break;
		}
	};
	
	// events -------------------------------------------------------------------
	function onPostMessage (request, sender, sendResponse){
		if (!request.message || !request.data) return;
		_this.tell(request.message, request.data);

		processMessage(request);
	};
	
	function message_allIframesLoaded (){
		console.log("all iframe loaded!")
	};
	
	// public functions ---------------------------------------------------------	
	_this.tell = function (message, data){
		var data = data || {};
		
		// find the current tab and send a message to "inject.js" and all the iframes
		chrome.tabs.getSelected(null, function (tab){
			if (!tab) return;
			
			chrome.tabs.sendMessage(tab.id, {
				message	: message,
				data	: data
			});
		});
	};
	
	return _this;
}());

window.addEventListener("load", function() { Background.init(); }, false);