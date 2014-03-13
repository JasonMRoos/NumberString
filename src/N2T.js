(function (global_object) {
    function isValidLanguage(value) {
        return N2T.i18n[value];
    }

    function isValidNumberSelection(value) {
        return N2T.NumberString.isNumberString(value);
    }

    function getLanguageSelection() {
        var input;

        do {
            input = prompt('Select a language (en = English; es = Spanish):');
        } while (!isValidLanguage(input))

        return input;
    }

    function getNumberSelection() {
        var input;

        do {
            input = prompt('Enter a number of any size (Decimals are acceptable):');
        } while (!isValidNumberSelection(input))

        return input;
    }

    function init() {
        var input, number_string;

        N2T.i18n.setLanguage(getLanguageSelection());

        number_string = new N2T.NumberString(getNumberSelection());

        document.write([
            number_string.format(),
            number_string.spell()
        ].join('<br />'));        
    }

    global_object.N2T = global_object.N2T || {};
    global_object.N2T.init = init;
}(this));