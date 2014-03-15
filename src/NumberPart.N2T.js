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

    function isUnnamedPeriod(period_value, period_position, num_periods) {
        var is_zero_number = period_value == 0 && num_periods == 1 && this.type == 'whole';

        if (period_value == 0 && !is_zero_number) {
            // In the whole part, periods without value are never named, with the exception of '0'.
            // (ex. 1,000 is read, "one thousand," and not, "one thousand zero hundreds")
            if (this.type == 'whole' && period_position > 0) {
                return true;
            }

            // In the decimal part, periods without value are named only if they are in the period of least value
            // (ex. 1.0 is read, "one and zero tenths")
            if (this.type == 'decimal' && period_position > 1) {
                return true;
            }
        }

        return false;
    }

    NumberPart.prototype.spell = function() {
        var periods = this.getPeriods(), 
            period_index = 0,
            period_position = periods.length,
            spellings = [],
            period_value, period;

        for (; period_index < periods.length; period_index++, period_position--) {
            period_value = periods[period_index];

            if (isUnnamedPeriod.call(this, period_value, period_position, periods.length)) {
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