var Inject = (function (){
	// constants ----------------------------------------------------------------
	var ID = {
		CONTAINER		: 'iresult-container',
		IFRAME_PREFIX	: 'iresult-iframe-'
	};
	
	// variables ----------------------------------------------------------------
	var _this		= {},
		_views		= {},
		_container	= null;
	
	// initialize ---------------------------------------------------------------
	_this.init = function (){
		// create the main container
		_container = $('<div />', {id:ID.CONTAINER});
		_container.appendTo(document.body);
		
		// add the "result" iframe
		getView('result', _container);

		// listen to the iframes/webpages message
		window.addEventListener("message", dom_onMessage, false);
	
		// listen to the Control Center (background.js) messages
		chrome.extension.onMessage.addListener(background_onMessage);
	};
	
	// private functions --------------------------------------------------------
	function getView (id){
		// return the view if it's already created
		if (_views[id]) return _views[id];
		
		// iframe initial details
		var src		= chrome.extension.getURL('html/iframe/'+id+'.html?view='+id+'&_'+(new Date().getTime())),
			iframe	= $('<iframe />', {id:ID.IFRAME_PREFIX+id, src:src, scrolling:true});
		
		// view
		_views[id] = {
			isLoaded	: false,
			iframe		: iframe
		};
		
		// add to the container
		_container.append(iframe);
		
		return _views[id];
	};
	
	function tell (message, data){
		var data = data || {};
		
		// send a message to "background.js"
		chrome.runtime.sendMessage({
			message : message,
			data	: data
		});
	};
	
	function processMessage (request){
		if (!request.message) return;
		
		switch (request.message){
			case 'iframe-loaded': message_onIframeLoaded(request.data); break;
			case 'show-result': message_onShowResult(request.data); break;
			case 'close-result': message_onCloseResult(); break;
		}
	};
	
	// events -------------------------------------------------------------------	
	// messages coming from iframes and the current webpage
	function dom_onMessage (event){		
		if (!event.data.message) return;
		
		// tell another iframe a message
		if (event.data.view){
			tell(event.data);
		}else{
			processMessage(event.data);
		}
	};
	
	// messages coming from "background.js"
	function background_onMessage (request, sender, sendResponse){
		if (request.data && request.data.view) return;

		processMessage(request);
	};
	
	// messages -----------------------------------------------------------------
	function message_onIframeLoaded (data){
		var view 		= getView(data.source),
			allLoaded	= true;
		
		view.isLoaded = true;
		view.iframe.hide();
		
		for (var i in _views){
			if (_views[i].isLoaded === false) allLoaded = false;
		}
		
		// tell "background.js" that all the frames are loaded
		if (allLoaded) tell('all-iframes-loaded');
	};
	
	function message_onShowResult (data){
		var result = getView('result');
		result.iframe.show();
		
		// tell the "result" iframe to show dynamic result
		tell('show-result', {view:'result', result: data});
	};
		
	function message_onCloseResult (){
		var result = getView('result');
		result.iframe.hide();
	};
	
	return _this;
}());
document.addEventListener("DOMContentLoaded", function (){ Inject.init(); }, false);
