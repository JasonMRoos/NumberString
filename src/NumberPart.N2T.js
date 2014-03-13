/* Author: Jason Roos
 * Name: NumberPart
 * 
 * Description:
 * Class containing methods specific to the decimal and whole parts of numbers, as used by NumberString.
 *
 **/
(function (global_object) {
    var language;

    function NumberPart(config) {
        language = N2T.i18n.getLanguage();

        this.value = config.value;
        this.type = config.type;
    }

   NumberPart.prototype.getPeriods = function () {
        var periods = [],
            first_period_len = this.value.length % 3,
            digit_index = first_period_len;

        periods.push(this.value.substr(0, first_period_len));

        for (; digit_index < this.value.length; digit_index += 3) {
            periods.push(this.value.substr(digit_index, 3));
        }

        return periods;
    }

    NumberPart.prototype.getFractionUnitName = function () {
        var decimal_place;

        if (this.type == 'whole') {
            return;
        }

        decimal_place = N2T.i18n[language].decimal_places[this.value.length];

        if (this.value > 1 || this.value == 0) {
            return decimal_place + 's';
        } else {
            return decimal_place;
        }
    }

    NumberPart.prototype.spell = function() {
        var periods = this.getPeriods(), 
            period_index = 0,
            period_position = periods.length,
            spellings = [],
            period_value, period;

        for (; period_index < periods.length; period_index++, period_position--) {
            period_value = periods[period_index];

            // Periods without value are only named if they are in the ones place
            if (period_value == 0 && period_value != '0') {
                continue;
            }

            period = new N2T.Period(period_value);
            period_name = N2T.i18n[language].periods[period_position];

            spellings.push(period.spell());

            // The hundreds period does not get named
            if (period_position != 1) {
                spellings.push(period_name);
            }
        }

        // Decimal numbers have their fractional unit identified
        if (this.type == 'decimal') {
            spellings.push(this.getFractionUnitName());            
        }

        return spellings.join(' ') ;
    }

    global_object.N2T = global_object.N2T || {};
    global_object.N2T.NumberPart = NumberPart;
}(this));