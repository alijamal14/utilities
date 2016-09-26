function Utils() {
    this.isEven = function (n) {
        return n % 2 == 0;
    },
    this.isOdd = function (n) {
        return Math.abs(n % 2) == 1;
    },
    this.DateTimeClock = function (Selector) {


        setInterval(function () {
            if (Utilities.isEven(moment().format("ss"))) {

                $(Selector).text(moment().format("dddd DD MMMM YYYY hh mm A "))
            }
            else {

                $(Selector).text(moment().format("dddd DD MMMM YYYY hh:mm A "))
            }


        }, 1000)
    },
    this.getModalDataObject = function (parentSelectorName, objectExcludedFieldsSelectors) {
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
            else if ($('[name="' + $(this).attr('name') + '"]').length > 1) {
                if ($('[name="' + $(this).attr('name') + '"]').prop('tagName').toUpperCase() == "INPUT" && $('[name="' + $(this).attr('name') + '"]').prop('type').toUpperCase() == "RADIO") {
                    Data[$(this).attr('name')] = $('[name="' + $(this).attr('name') + '"]:checked').val()
                }
            }
            else {
                Data[$(this).attr('name')] = $(this).val()
            }
        })
        return Data
    },
    this.PascalCaseSpacesText = function (Text) {
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
    },
    this.PascalCaseSpacesElement = function (element) {
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
    },
    this.CalculateAge = function (FirstMoment, SecondMoment) {
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
    },
    this.DateTimeReviver = function (value) {
        var a;
        if (typeof value === 'string') {
            a = /\/Date\((\d*)\)\//.exec(value);
            if (a) {
                return new Date(+a[1]);
            }
        }
        return value;
    },
    this.GetQueryStringParameterByName = function (name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },
    this.IsUndefinedOrNull = function (Value) {
        if (Value != undefined && Value != null && Value.length != 0 && Value != '') {
            return false;
        }
        else {
            return true
        }

    },
    this.IsNotUndefinedOrNull = function (Value) {
        return !(this.IsUndefinedOrNull(Value))

    }
}
var Utilities = new Utils()
Utilities.DateTimeClock('.CurrentDateTimeAccount')