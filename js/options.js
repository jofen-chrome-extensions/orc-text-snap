// Saves options to chrome.storage
function save_options() {
  var orclang = document.getElementById('orc-lang').value;
  var targetlang = document.getElementById('target-lang').value;
  chrome.storage.sync.set({
    targetLanguage: targetlang,
    orcLanguage: orclang
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value lang = 'english'.
  chrome.storage.sync.get({
    orcLanguage: 'eng',
    targetLanguage: 'eng'
  }, function(items) {
    document.getElementById('orc-lang').value = items.orcLanguage;
    document.getElementById('target-lang').value = items.targetLanguage;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);


const donateUrl = 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=2M474PCNZVZFC&currency_code=CAD&source=url';

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){        
    document.getElementById('donate').onclick = function () {
        chrome.tabs.create({active: true, url: donateUrl});
    };    
});