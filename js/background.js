// Set defaults for the very first time

var icons = {
    enabled: {
        '19': '/img/clock19.png',
        '38': '/img/clock38.png'
    },
    disabled: {
        '19': '/img/clock_off19.png',
        '38': '/img/clock_off38.png'
    }
}

if (!localStorage.getItem('options')) {
    localStorage.setItem('options', JSON.stringify({
        mode: 'hours',
        type: 'Federal',
        state: Object.keys(wages.state)[0],
        other: wages.federal
    }));
}

chrome.browserAction.onClicked.addListener(function(tab) {
    var options = JSON.parse(localStorage.getItem('options'));
    if (options.mode === 'hours') {
        options.mode = 'money';
        chrome.browserAction.setIcon({ path: icons.disabled });
    } else {
        options.mode = 'hours';
        chrome.browserAction.setIcon({ path: icons.enabled });
    }

    localStorage.setItem('options', JSON.stringify(options));
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    var options = JSON.parse(localStorage.getItem('options'));

    // Merge options objects if we have request.options
    if (request.options) {
        for (var option in request.options) {
            options[option] = request.options[option];
        }
    }

    // If this was a request to set, then save the data
    if (request.name == 'set') {
        localStorage.setItem('options', JSON.stringify(options));
    }

    sendResponse(options);
});