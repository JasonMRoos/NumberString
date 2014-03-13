(function (global_object) {
    var language = 'en';

    function setLanguage(value) {
        language = value;
    }

    function getLanguage() {
        return language;
    }

    var i18n = {
        setLanguage: setLanguage,
        getLanguage: getLanguage
    }

    global_object.N2T.i18n = global_object.N2T.i18n || {};
    global_object.N2T.i18n = i18n;
}(this));