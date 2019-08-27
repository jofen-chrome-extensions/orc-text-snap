var progressDiv = document.createElement("div");
var progressTxt = document.createElement("strong");
progressDiv.appendChild(progressTxt);
progressDiv.setAttribute("style","position: absolute;  box-sizing: border-box; width: 250px; padding: 10px; color: white; background-color: rgba(0,0,0, 0.75); z-index: 999999; text-align: center; top: 55%; left: calc(50% - 125px);");
progressTxt.innerHTML = "Processing...Please Wait";

var jcrop, selection

var overlay = ((active) => (state) => {
  active = typeof state === 'boolean' ? state : state === null ? active : !active
  $('.jcrop-holder')[active ? 'show' : 'hide']()
  chrome.runtime.sendMessage({message: 'active', active})
})(false)

var image = (done) => {
  var image = new Image()
  image.id = 'fake-image'
  image.src = chrome.runtime.getURL('/images/pixel.png')
  image.onload = () => {
    $('body').append(image)
    done()
  }
}

var init = (done) => {
  $('#fake-image').Jcrop({
    bgColor: 'none',
    onSelect: (e) => {
      selection = e
      capture()
    },
    onChange: (e) => {
      selection = e
    },
    onRelease: (e) => {
      setTimeout(() => {
        selection = null
      }, 100)
    }
  }, function ready() {
    jcrop = this

    $('.jcrop-hline, .jcrop-vline').css({
      backgroundImage: `url(${chrome.runtime.getURL('/images/Jcrop.gif')})`
    })

    if (selection) {
      jcrop.setSelect([
        selection.x, selection.y,
        selection.x2, selection.y2
      ])
    }

    done && done()
  })
}

var capture = (force) => {
  chrome.storage.sync.get((config) => {
    if (selection && (config.method === 'crop' || (config.method === 'wait' && force))) {
      jcrop.release()
      setTimeout(() => {
        chrome.runtime.sendMessage({
          message: 'capture', area: selection, dpr: devicePixelRatio
        }, (res) => {
        
          $('.jcrop-holder').addClass('spinner');
          //document.body.appendChild(progressDiv);
          $('.jcrop-holder').addClass('text-extraction');
          selection = null
        })
      }, 50)
    } 
  })
}

window.addEventListener('resize', ((timeout) => () => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    jcrop.destroy()
    init(() => overlay(null))
  }, 100)
})())

chrome.runtime.onMessage.addListener((req, sender, res) => {
  if (req.message === 'init') {
    res({}) // prevent re-injecting

    if (!jcrop) {
      image(() => init(() => {
        overlay()
        capture()
      }))
    } else {
      overlay()
      capture(true)
    }
  } else if (req.message === 'status') {
    //console.log($('.jcrop-holder').getClass('text-extraction').attr("content"));
    progressTxt.innerHTML = req.status.toString();
  } else if(req.message === 'loaded') {
    overlay(false)
    $('.jcrop-holder').removeClass('spinner');
    $('.jcrop-holder').removeClass('text-extraction');
    //document.body.removeChild(progressDiv);

    chrome.runtime.sendMessage({message: 'show-result', data: req.result});

  }
  return true
})