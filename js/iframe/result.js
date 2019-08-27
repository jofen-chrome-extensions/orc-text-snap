var Result = (function (){
	// variables ----------------------------------------------------------------
	var _this 		= {},
		_iframe		= null,
		_textresult = '';
	
	// initialize ---------------------------------------------------------------
	_this.init = function (){
		_iframe = new IframeManager();
		_iframe.setListener(onMessage);
		
		$('#close').on('click', close_onClick);
		$('#button_copy').on('click', copy_onClick);
		$('#button_translate').on('click', translate_onClick);
	};
	
	// private functions --------------------------------------------------------

	// events -------------------------------------------------------------------
	function onMessage (request){
		switch (request.message){
			case 'show-result': 
			    _textresult = request.data.result;
				message_onShowResult(request.data); 
				break;
		}
	};
	
	function close_onClick (event){		
		_iframe.tell('close-result');
	};

	function copy_onClick (event){		
		document.oncopy = function (event) {
        	event.clipboardData.setData('text/plain', _textresult);
            event.preventDefault();
        };
        document.execCommand("copy", false, null);
	};

	function translate_onClick (event){
		chrome.tabs.getSelected(null, function (tab){
			if (!tab) return;

			chrome.storage.sync.get((config) => {
				var text = _textresult;
				const url = `http://translate.google.com/#auto/${config.targetLanguage}/${encodeURIComponent(text)}`;
 	  			chrome.tabs.create({url: url, index: tab.index + 1});
        	})		
		});
	};

	// messages -----------------------------------------------------------------
	function message_onShowResult (data){
		$('#result').val(data.result);
	};
	
	// public functions ---------------------------------------------------------

	return _this;
}());

document.addEventListener("DOMContentLoaded", function (){ new Result.init(); }, false);