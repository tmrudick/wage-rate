 var minimumWage = 7.25,
    dollarRegEx = new RegExp(/^\$(\d{1,3}(,?\d{3})*(\.\d\d)?)$/g);

function wagifySomeText(text) {
    var match = dollarRegEx.exec(text);

    if (match) {
        var amount = +match[1].replace(/,/g, '');

        var hours = amount / minimumWage;

        return '$' + hours.toFixed(1) + ' hours';
    }

    return text;
}

function wagifyTheDom(element) {
    var walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    while (walker.nextNode()) {
        var current = walker.currentNode;
        current.textContent = wagifySomeText(current.textContent);
    }
}

wagifyTheDom(document.body);

document.body.addEventListener('DOMNodeInserted', function(event) {
    wagifyTheDom(event.target);
});