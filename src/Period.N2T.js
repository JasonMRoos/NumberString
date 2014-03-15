/* Author: Jason Roos
 * Name: Period
 * 
 * Description:
 * Class with methods specific to numeric "periods," the sequences of 1-3 digits
 * into which long numbers are grouped, and required by NumberString.N2T.js.
 *
 **/
(function (global_object) {
    var language;

    function Period(value) {
        language = N2T.i18n.getLanguage();

        this.value = value;
        this.value_as_string = value + '';
    }

    Period.prototype.getOnes = function () {
        return this.value_as_string[this.value_as_string.length - 1];
    }

    Period.prototype.hasOnes = function () {
        return this.getOnes() > 0;
    }

    Period.prototype.getTens = function () {
        return this.value_as_string[this.value_as_string.length - 2];
    }

    Period.prototype.hasTens = function () {
        return this.getTens() > 0;
    }

    Period.prototype.getTensAndOnes = function () {
        return this.hasTens()
            ? this.getTens() + this.getOnes() + ''
            : this.getOnes();
    }

    Period.prototype.hasTensOrOnes = function () {
        return this.getTensAndOnes() > 0;
    }

    Period.prototype.hasHundreds = function () {
        return this.getHundreds() > 0;
    }

    Period.prototype.getHundreds = function () {
        return this.value_as_string[this.value_as_string.length - 3];
    }

    Period.prototype.hasTeens = function () {
        return !!N2T.i18n[language].ones_and_teens[this.getTens() + this.getOnes()];
    }

    function tensAndOnesSpelled() {
        if (this.value < 20) {
            return N2T.i18n[language].ones_and_teens[this.getTensAndOnes()];
        } else if (this.hasTeens()) {
            return N2T.i18n[language].ones_and_teens[this.getTens() + this.getOnes()];
        } else if (this.hasTens() && this.hasOnes()) {
            return N2T.i18n[language].tens[this.getTens()] +
                N2T.i18n[language].tens_and_ones_separator +
                N2T.i18n[language].ones_and_teens[this.getOnes()];            
        } else if (this.hasOnes()) {
            return N2T.i18n[language].ones_and_teens[this.getOnes()];
        }

        return N2T.i18n[language].tens[this.getTens()];
    }

    function hundredsSpelled() {
        return this.hasHundreds()
            ? N2T.i18n[language].ones_and_teens[this.getHundreds()] + ' ' + N2T.i18n[language].periods[1]
            : '';
    }

    Period.prototype.spell = function () {
        if (this.hasHundreds() && this.hasTensOrOnes()) {
            return hundredsSpelled.call(this) + ' ' + tensAndOnesSpelled.call(this);
        } else if (this.hasHundreds()) {
            return hundredsSpelled.call(this);
        }

        return tensAndOnesSpelled.call(this);
    }

    global_object.N2T = global_object.N2T || {};
    global_object.N2T.Period = Period;
}(this));