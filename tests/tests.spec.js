describe("NumberString", function () {
    var result;

    describe("when English is the selected language", function () {

        beforeEach(function () {
            N2T.i18n.setLanguage('en');
        });

        describe("its spell method", function() {
            it("can spell a single-digit number", function() {
                result = new N2T.NumberString('1').spell();
                expect(result).toEqual('one');
            });

            it("spells zero correctly", function () {
                result = new N2T.NumberString('0').spell();
                expect(result).toEqual('zero');
            });

            it("can spell a regular teen", function() {
                result = new N2T.NumberString('14').spell();
                expect(result).toEqual('fourteen');

                result = new N2T.NumberString('18').spell();
                expect(result).toEqual('eighteen');
            });

            it("can spell an irregular teen", function() {
                result = new N2T.NumberString('11').spell();
                expect(result).toEqual('eleven');

                result = new N2T.NumberString('12').spell();
                expect(result).toEqual('twelve');

                result = new N2T.NumberString('13').spell();
                expect(result).toEqual('thirteen');

                result = new N2T.NumberString('15').spell();
                expect(result).toEqual('fifteen');
            });

            it("hyphenates the tens and ones places together", function() {
                result = new N2T.NumberString('25').spell();
                expect(result).toEqual('twenty-five');

                result = new N2T.NumberString('157').spell();
                expect(result).toEqual('one hundred fifty-seven');

                result = new N2T.NumberString('74328').spell();
                expect(result).toEqual('seventy-four thousand three hundred twenty-eight');                
            });

            it("can handle multiple named periods", function() {
                result = new N2T.NumberString('1256').spell();
                expect(result).toEqual('one thousand two hundred fifty-six');

                result = new N2T.NumberString('3142973').spell();
                expect(result).toEqual('three million one hundred fourty-two thousand nine hundred seventy-three');
            });

            it("can handle unnamed periods (000s)", function() {
                result = new N2T.NumberString('1000').spell();
                expect(result).toEqual('one thousand');

                result = new N2T.NumberString('18000003').spell();
                expect(result).toEqual('eighteen million three');
            });

            it("can handle very large numbers (including > 18 digits)", function() {
                result = new N2T.NumberString('2384923524938539498345').spell();
                expect(result).toEqual('two sextillion three hundred eighty-four quintillion nine hundred twenty-three quadrillion five hundred twenty-four trillion nine hundred thirty-eight billion five hundred thirty-nine million four hundred ninety-eight thousand three hundred fourty-five');
            });

            it("can handle periods of varying length", function() {
                result = new N2T.NumberString('9675').spell();
                expect(result).toEqual('nine thousand six hundred seventy-five');

                result = new N2T.NumberString('24763').spell();
                expect(result).toEqual('twenty-four thousand seven hundred sixty-three');
            });

            it("delineates the whole and decimal parts properly", function() {
                result = new N2T.NumberString('3.5').spell();
                expect(result).toEqual('three and five tenths');
            });

            it("does not name a zero in the ones place of single-digit whole part", function () {
                result = new N2T.NumberString('0.1').spell();
                expect(result).toEqual('one tenth');
            });

            it("names a zero in the tens place of a single-digit decimal part", function () {
                result = new N2T.NumberString('1.0').spell();
                expect(result).toEqual('one and zero tenths');
            });

            it("handles decimals with single digit whole and decimal parts", function () {
                result = new N2T.NumberString('2.5').spell();
                expect(result).toEqual('two and five tenths');
            });

            it("handles decimals with leading zeros in the decimal part", function () {
                result = new N2T.NumberString('13.015').spell();
                expect(result).toEqual('thirteen and fifteen thousandths');
            });

            it("handles decimals with the zero missing in the ones place", function () {
                result = new N2T.NumberString('.6257').spell();
                expect(result).toEqual('six thousand two hundred fifty-seven ten-thousandths');
            });

            it("can handle very long decimal parts (including > 18 decimal digits)", function() {
                result = new N2T.NumberString('0.2384923524938539498345').spell();
                expect(result).toEqual('two sextillion three hundred eighty-four quintillion nine hundred twenty-three quadrillion five hundred twenty-four trillion nine hundred thirty-eight billion five hundred thirty-nine million four hundred ninety-eight thousand three hundred fourty-five ten-sextillionths');
            });

            it("accepts commas in the input", function () {
                result = new N2T.NumberString('1,247,712').spell();
                expect(result).toEqual('one million two hundred fourty-seven thousand seven hundred twelve');
            });

            it("tolerates mistakes in comma positioning", function () {
                result = new N2T.NumberString('1,24,7712').spell();
                expect(result).toEqual('one million two hundred fourty-seven thousand seven hundred twelve');
            });

            it("tolerates trailing and leading spaces", function () {
                result = new N2T.NumberString('   1,24,7712   ').spell();
                expect(result).toEqual('one million two hundred fourty-seven thousand seven hundred twelve');
            });

            it("tolerates leading zeros", function() {
                result = new N2T.NumberString('007').spell();
                expect(result).toEqual('seven');
            });

            it("rejects input from which a number cannot be inferred", function () {
                var error_msg = 'NumberString: value must be a string that includes only digits, optional commas, and an optional decimal point.';

                expect(function () {
                    new N2T.NumberString(' ');
                }).toThrow(error_msg);

                expect(function () {
                    new N2T.NumberString('abc');
                }).toThrow(error_msg);

                expect(function () {
                    new N2T.NumberString('15.79.3');
                }).toThrow(error_msg);
            });
        });
    });

    describe("when Spanish is the selected language", function () {

        beforeEach(function () {
            N2T.i18n.setLanguage('es');
        });

        describe("its spell method", function() {

            it("joins ones and tens properly", function() {
                result = new N2T.NumberString('25').spell();
                expect(result).toEqual('veinte y cinco');

                result = new N2T.NumberString('157').spell();
                expect(result).toEqual('uno cien cincuenta y siete');

                result = new N2T.NumberString('74328').spell();
                expect(result).toEqual('setenta y cuatro mil tres cien veinte y ocho');            
            });

            it("delineates the ones and tenths places properly", function() {
                result = new N2T.NumberString('3.5').spell();
                expect(result).toEqual('tres unidades, cinco décimos');
            });
        });
    });
});