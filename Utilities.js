///Note Always Include First Enumerators.js And Messages Before Utilities.js Thank You
function Utils() {
    this.IsABootstrapModalOpen = function () {
        return document.querySelectorAll('.modal.in').length > 0;
    },
        this.WeekDaysBooleanToDaysOfWeeksArray = function (WeekDaysBoolean) {
            var ArrayDOW = []
            $.each(WeekDaysBoolean, function (Index, Element) {
                if (Element == true) {
                    var EnumeratorsSystemDayOfWeekindexOfIndex = Enumerators.System.DayOfWeek.indexOf(Index)
                    if (EnumeratorsSystemDayOfWeekindexOfIndex >= 0) {
                        ArrayDOW.push(EnumeratorsSystemDayOfWeekindexOfIndex)
                    }
                }

            })
            return ArrayDOW
        },
        this.DaysOfWeeksArrayToWeekDaysBoolean = function (DaysOfWeeksArray) {
            var CopiedWeekDays = jQuery.extend(true, {}, Enumerators.System.WeekDaysBoolean)
            $(DaysOfWeeksArray).each(function (Index, Element) {
                CopiedWeekDays[Enumerators.System.DayOfWeek[Element]] = true
            })
            return CopiedWeekDays
        },
        this.IsISODate = function (Value) {
            return ((Utilities.IsNotUndefinedOrNull(Value) && (typeof (Value) == 'string') && (Utilities.CSharpDateTimeToJSDateTime(Value)) && (Utilities.IsNotUndefinedOrNull(Value.match(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/g))) && (Value.match(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/g).length == 1)) ? true : false)
        },
        this.AJAXSelectList = function (Arguments) {///var Arguments = { SourceSelector: '#CountryId', TargetSelector: '#StateOrProvinceId', URL: "GetStateOrProvinces", SourceName: 'CountryId', SourceData: $('#CountryId').val(), RegexText: /,"Name":/g, RegexId: /"Id":/g, DefaultOption: '@ViewBag.StateName', SourceText: 'Country', TargetText: 'State or Province', SubArguments: CityArguments };

            if (Utilities.IsABootstrapModalOpen()) {

                $.fn.modal.Constructor.prototype.enforceFocus = function () { };

            }
            $(Arguments.SourceSelector).select2();
            $(Arguments.SourceSelector).off("select2:select");
            $(Arguments.SourceSelector).on("select2:select", function () {
                if ($(Arguments.SourceSelector).val() != '') {
                    $.ajax({
                        async: (Utilities.IsNotUndefinedOrNull(Arguments.async) ? Arguments.async : true),///Default Async True Else Take 'async' Value From 'Arguments'
                        url: Arguments.URL,
                        type: 'POST',
                        data: { [Arguments.SourceName]: $(Arguments.SourceSelector).val() /*Arguments.SourceData*/ }
                    }).done(function (Data) {

                        $(Arguments.TargetSelector).select2()
                        $(Arguments.TargetSelector).select2('destroy')
                        $(Arguments.TargetSelector).empty()
                        if (Utilities.IsNotUndefinedOrNull(Arguments.ReturnObjectName)) {
                            var NewJSONString = Data[Arguments.ReturnObjectName].replace(new RegExp(",\"" + Arguments.ReturnFieldNameText + "\":", "g"), ',"text":').replace(new RegExp("\"" + Arguments.ReturnFieldNameId + "\":", "g"), '"id":')
                        }
                        else
                            var NewJSONString = Data.List.replace(new RegExp(",\"" + Arguments.ReturnFieldNameText + "\":", "g"), ',"text":').replace(new RegExp("\"" + Arguments.ReturnFieldNameId + "\":", "g"), '"id":')
                        var NewJSON = JSON.parse(NewJSONString)
                        NewJSON.unshift({ id: '', text: "Please Select " + Arguments.TargetText })
                        $(Arguments.TargetSelector).select2({
                            data: NewJSON
                        })
                        $(Arguments.TargetSelector + ' option').first().attr('value', '')

                    }).fail(function (Data) {
                        $(Arguments.TargetSelector).empty()
                        $(Arguments.TargetSelector).append('<option value=' + '' + '>' + 'Select ' + Arguments.SourceText + ' First' + '</option>')

                    }).always(function (Data) {
                        if ($(Arguments.TargetSelector + ' option:not([value=""])').first().prop('selected', true).length > 0) {

                            if (Utilities.IsNotUndefinedOrNull(Arguments.PreSelectedData) && $(Arguments.TargetSelector + ' option[value="' + Arguments.PreSelectedData[Arguments.PreSelectedDataIdField] + '"]:not([value=""])').length > 0) {
                                $(Arguments.TargetSelector + ' option[value="' + Arguments.PreSelectedData[Arguments.PreSelectedDataIdField] + '"]:not([value=""])').first().prop('selected', true).trigger('change')

                            } else {
                                Utilities.SelectDropDownTextOptionElement(Arguments.TargetSelector, Arguments.DefaultOption)
                            }
                        }
                        else {
                            toastr.info('There are no ' + Arguments.TargetText + ' Available for this ' + Arguments.SourceText + '')
                        }


                        if (Utilities.IsNotUndefinedOrNull(Arguments.SubArguments)) {
                            Utilities.AJAXSelectList(Arguments.SubArguments)
                        }
                        $(Arguments.TargetSelector).change()
                        $(Arguments.TargetSelector).trigger("select2:select");
                    })
                }
                else {
                    $(Arguments.TargetSelector).empty()
                    $(Arguments.TargetSelector).append('<option value=' + '' + '>' + 'Select ' + Arguments.SourceText + ' First' + '</option>')
                    $(Arguments.TargetSelector).change()
                    $(Arguments.TargetSelector).trigger("select2:select");
                }
            })
            $(Arguments.SourceSelector).trigger("select2:select");
        },
        this.IsCSharpDateTime = function (Value) {//Example "/Date(892234800000)/" DateTime Is Not Serialized By C#
            return ((Utilities.IsNotUndefinedOrNull(Value) && (typeof (Value) == 'string') && (Utilities.CSharpDateTimeToJSDateTime(Value)) && (Utilities.IsNotUndefinedOrNull(Value.match(/\/Date\([0-9]+\)\//g))) && (Value.match(/\/Date\([0-9]+\)\//g).length == 1)) ? true : false)
        },
        this.CSharpDateTimeToJSDateTime = function (Value) {
            return new Date(parseInt(Value.replace("/Date(", "").replace(")/", ""), 10))
        },
        this.SelectDropDownTextOptionElement = function (Selector, StringToSelectDropDownTextOptionElement) {
            if (Utilities.IsNotUndefinedOrNull(Selector) && Utilities.IsNotUndefinedOrNull(StringToSelectDropDownTextOptionElement)) {
                $(Selector).find('option').each(function (Index, Element) {
                    if ($(Element).text().trim() == StringToSelectDropDownTextOptionElement.trim()) {
                        console.log($(Element).text().trim() + " " + $(Element).val().trim())
                        $(Selector).val($(Element).val())
                        $(Selector).trigger('change').trigger('select2:select')
                        return false;
                    }
                })
            }
            return $(Selector)
        },
        this.ScrollTo = function (CSSSelectorOrElement) {
            $('html, body').animate({
                scrollTop: $(CSSSelectorOrElement).first().offset().top - 35
            }, 300);
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
        this.TakeOnlyInputNumbersWithHyphen = function (event) {
            var keycode = event.which;
            if (!(event.shiftKey == false && (keycode == 45 || keycode == 8 || keycode == 37 || keycode == 39 || (keycode >= 48 && keycode <= 57)))) {
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
            if (!$(element).hasClass('PascalCaseSpacesElement')) {
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
                $(element).addClass('PascalCaseSpacesElement')
            }
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
            if (Value != undefined && Value != null && Value.length != 0 && Value !== '') {
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

/// Thank You