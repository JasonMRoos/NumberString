/* Author: Jason Roos
 * Name: NumberString
 * 
 * Description:
 * Extends JavaScript's native String object with methods specific to "number strings".
 * A "number string" is defined as any sequence of digits that may include commas and a decimal point.
 *
 **/
(function (global_object) {
    var language;

    function NumberString(value) {
        String.apply(this, arguments);

        if (!NumberString.isNumberString(value)) {
            throw 'NumberString: value must be a string that includes only digits, optional commas, and an optional decimal point.'
        }

        language = N2T.i18n.getLanguage();

        this.value = value;
    };
    NumberString.prototype = Object.create(String.prototype);
    NumberString.prototype.constructor = NumberString;

    NumberString.prototype.trimZeros = function () {
        return NumberString.trimZeros(this.value);
    };

    NumberString.prototype.trimCommas = function () {
        return NumberString.trimCommas(this.value);
    };

    NumberString.prototype.trim = function () {
        return NumberString.trimSpaces(NumberString.trimZeros(NumberString.trimCommas(this.value)));
    };

    NumberString.prototype.formatWholePart = function () {
        var whole_part = this.getWholePart();

        return whole_part && whole_part.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g , "$&,");
    }

    NumberString.prototype.formatDecimalPart = function () {
        var decimal_part = this.getDecimalPart();

        return decimal_part && '.' + decimal_part;
    }

    NumberString.prototype.format = function () {
        var whole_part_formatted = this.formatWholePart(),
            decimal_part_formatted = this.formatDecimalPart();

        if (whole_part_formatted && decimal_part_formatted) {
            return whole_part_formatted + decimal_part_formatted;
        } else if (decimal_part_formatted) {
            return '0' + decimal_part_formatted;
        }

        return whole_part_formatted;
    };

    NumberString.prototype.getWholePart = function () {
        return this.trim().replace(/\.\d+$/, '');
    }

    NumberString.prototype.getDecimalPart = function () {
        return this.trim().replace(/^(\d|,)*\.?/, '');
    }

    NumberString.prototype.spell = function () {
        var spellings = [],
            whole_part = this.getWholePart(),
            decimal_part = this.getDecimalPart();

        if (whole_part) {
            spellings.push(new N2T.NumberPart({
                type: 'whole',
                value: whole_part
            }).spell());
        }

        if (whole_part && decimal_part) {
            spellings.push(' ' + N2T.i18n[language].whole_and_decimal_separator + ' ');
        }

        if (decimal_part) {
            spellings.push(new N2T.NumberPart({
                type: 'decimal',
                value: decimal_part
            }).spell());
        }

        return spellings.join('');
    }

    // Statics

    NumberString.trimSpaces = function (value) {
        return value.replace(/^\s+|\s+$/g, '');
    }

    NumberString.trimZeros = function (value) {
        return value.replace(/^0+/, '') || '0';
    };

    NumberString.trimCommas = function (value) {
        return value.replace(/\,/g, '');
    };

    NumberString.isNumberString = function (value) {
        var trimmed_value = this.trimSpaces(value);

        return trimmed_value && /^(\d|,)*\.?\d*$/.test(trimmed_value);
    };

    global_object.N2T = global_object.N2T || {};
    global_object.N2T.NumberString = NumberString;
}(this));