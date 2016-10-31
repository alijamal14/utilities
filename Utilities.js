function Utils() {
    this.SelectDropDownTextOption = function (Selector, StringToSelectDropDownTextOption) {
        if (Utilities.IsNotUndefinedOrNull(Selector) && Utilities.IsNotUndefinedOrNull(StringToSelectDropDownTextOption)) {
            $(Selector).find('option').each(function (Index, Element) {
                if ($(Element).text() == StringToSelectDropDownTextOption) {
                    console.log($(Element).text() + " " + $(Element).val())
                    $(Selector).val($(Element).val())
                    return false;
                }
            })
        }
    },
    this.ScrollTo = function (CSSSelectorOrElement) {
        $('html, body').animate({
            scrollTop: $(CSSSelectorOrElement).first().offset().top - 35
        }, 30);
    },
    this.Isfunction = function (ObjectReceived) {
        return typeof ObjectReceived === "function"
    },
    this.AlphabetOnly = function (event) {

        var keycode = event.which;
        if ((!(keycode == 0 || keycode == 46 || keycode == 8 || keycode == 37 || keycode == 39 || (keycode === 16) || (keycode >= 65 && keycode <= 90) || (keycode == 32) || (keycode >= 97 && keycode <= 122)))) {
            $(this).siblings('.err').text('Only alphabets are allowed')
            $(this).siblings('.err').css('display', '')
            event.preventDefault();
        }
        else {
            $(this).siblings('.err').text('')
            $(this).siblings('.err').css('display', 'none')
        }

    },
    this.TakeOnlyInputNumbers = function (event) {
        var keycode = event.which;
        if (!(event.shiftKey == false && (keycode == 46 || keycode == 8 || keycode == 37 || keycode == 39 || (keycode >= 48 && keycode <= 57)))) {
            $(this).siblings('.err').text('Only Numbers are allowed')
            $(this).siblings('.err').css('display', '')
            event.preventDefault();
        }
        else {
            $(this).siblings('.err').text('')
            $(this).siblings('.err').css('display', 'none')
        }
    },
    this.IsEven = function (n) {
        return n % 2 == 0;
    },
    this.IsOdd = function (n) {
        return Math.abs(n % 2) == 1;
    },
    this.DateTimeClock = function (Selector) {


        setInterval(function () {
            if (Utilities.IsEven(moment().format("ss"))) {

                $(Selector).text(moment().format("dddd DD MMMM YYYY hh mm A "))
            }
            else {

                $(Selector).text(moment().format("dddd DD MMMM YYYY hh:mm A "))
            }


        }, 1000)
    },
    this.GetModalDataObject = function (parentSelectorName, objectExcludedFieldsSelectors) {
        if (parentSelectorName == undefined || parentSelectorName == null || parentSelectorName == '') {
            parentSelectorName = '.modal-dialog';
        }
        var Form = $('form').first()
        var Data = {};
        var Token = $('input[name="__RequestVerificationToken"]', Form).val();
        if (Token != undefined) {
            Data["__RequestVerificationToken"] = Token;
        }

        $(parentSelectorName + ' input:not(.select2-focusser,.select2-input), select, .bootbox-body textarea').each(function () {
            if (objectExcludedFieldsSelectors != undefined && (objectExcludedFieldsSelectors.indexOf($(this).attr('name')) > -1)) {
                return true
            }
            else if (($('[name="' + $(this).attr('name') + '"]').length > 1) && ($('[name="' + $(this).attr('name') + '"]').prop('tagName').toUpperCase() == "INPUT" && $('[name="' + $(this).attr('name') + '"]').prop('type').toUpperCase() == "RADIO")) {
                Data[$(this).attr('name')] = $('[name="' + $(this).attr('name') + '"]:checked').val()
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
                            if (Utilities.IsNotUndefinedOrNull(Element)) {
                                var CaptializeString = ''
                                for (var i = 0; i < Element.length; i++) {
                                    if (i == 0) {
                                        CaptializeString += Element[i].toUpperCase()
                                    }
                                    else
                                        CaptializeString += Element[i]
                                }
                                Element = CaptializeString
                            }
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
                            if (Utilities.IsNotUndefinedOrNull(Element)) {
                                var CaptializeString = ''
                                for (var i = 0; i < Element.length; i++) {
                                    if (i == 0) {
                                        CaptializeString += Element[i].toUpperCase()
                                    }
                                    else
                                        CaptializeString += Element[i]
                                }
                                Element = CaptializeString
                            }
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
    this.CapitalizeText = function (Text) {
        var NewString = ""
        $(Text.trim()
                        // uppercase the first character
                        .replace(/^./, function (str) { return str.toUpperCase(); }).split(' ')).each(function (Index, Element) {
                            //console.log(Index + ". " + Element + " " + Element.length)
                            if (Utilities.IsNotUndefinedOrNull(Element)) {
                                var CaptializeString = ''
                                for (var i = 0; i < Element.length; i++) {
                                    if (i == 0) {
                                        CaptializeString += Element[i].toUpperCase()
                                    }
                                    else
                                        CaptializeString += Element[i]
                                }
                                Element = CaptializeString
                            }
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
    this.RecursiveCapitalizeTextValue = function (Selector) {
        if (Utilities.IsUndefinedOrNull(Selector)) {
            Selector = 'input.capitalize, textarea.capitalize'
        }
        $('form#patient').find(Selector).each(function (index, element) {

            $(element).val(Utilities.CapitalizeText($(element).val()).trim())

        })
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