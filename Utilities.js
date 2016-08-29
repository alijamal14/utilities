class Utilities {
    constructor() {

    }

    static getModalDataObject(parentSelectorName, objectExcludedFieldsSelectors) {
        if (parentSelectorName == undefined || parentSelectorName == null || parentSelectorName == '') {
            parentSelectorName = '.modal-dialog';
        }
        var Form = $('form').first()
        var Data = {};
        var Token = $('input[name="__RequestVerificationToken"]', Form).val();
        if (Token != undefined) {
            Data["__RequestVerificationToken"] = Token;
        }

        $(parentSelectorName + ' input:not(.select2-focusser,.select2-input),.bootbox-body  select, .bootbox-body textarea').each(function () {
            if (objectExcludedFieldsSelectors != undefined && (objectExcludedFieldsSelectors.indexOf($(this).attr('name')) > -1)) {
                return true
            }
            else {
                Data[$(this).attr('name')] = $(this).val()
            }
        })
        return Data
    }
    static PascalCaseSpacesText(Text) {
        var NewString = ""
        $(Text.trim()
                        // insert a space before all caps
                        .replace(/([A-Z])/g, ' $1')
                        // uppercase the first character
                        .replace(/^./, function (str) { return str.toUpperCase(); }).split(' ')).each(function (Index, Element) {
                            //console.log(Index + ". " + Element + " " + Element.length)

                            if (Element.length < 1) {

                            }
                            else if (Element.length == 1) {
                                NewString += Element
                            }
                            else {
                                NewString += " " + Element
                            }
                        })
        return NewString
    }
    static PascalCaseSpacesElement(element) {
        var NewString = ""
        $($(element).text().trim()
                        // insert a space before all caps
                        .replace(/([A-Z])/g, ' $1')
                        // uppercase the first character
                        .replace(/^./, function (str) { return str.toUpperCase(); }).split(' ')).each(function (Index, Element) {
                            ///console.log(Index + ". " + Element + " " + Element.length)

                            if (Element.length < 1) {

                            }
                            else if (Element.length == 1) {
                                NewString += Element
                            }
                            else {
                                NewString += " " + Element
                            }
                        })
        $(element).text(NewString)
        //$(element).text($(element).text().trim()
        //        // insert a space before all caps
        //        .replace(/([A-Z])/g, ' $1')
        //        // uppercase the first character
        //        .replace(/^./, function (str) { return str.toUpperCase(); }))
    }
    static CalculateAge(FirstMoment, SecondMoment) {
        if (SecondMoment == undefined || SecondMoment == null || SecondMoment == '') {
            SecondMoment = moment()
        }
        var a = FirstMoment;
        var b = SecondMoment;

        var years = a.diff(b, 'year');
        b.add(years, 'years');

        var months = a.diff(b, 'months');
        b.add(months, 'months');

        var days = a.diff(b, 'days');

        var CalculatedDaysMonthYears = years + ' years ' + months + ' months ' + days + ' days'
        ///console.log(CalculatedDaysMonthYears);
        return CalculatedDaysMonthYears
    }
    static DateTimeReviver (value) {
        var a;
        if (typeof value === 'string') {
            a = /\/Date\((\d*)\)\//.exec(value);
            if (a) {
                return new Date(+a[1]);
            }
        }
        return value;
    }
}