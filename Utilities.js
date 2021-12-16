///Note Always Include First Enumerators.js And Messages Before Utilities.js Thank You
function Utils() {
    window.Utilities = this;
    this.Enumerators = {
        System: {
            WeekDaysBoolean: {
                TrueWeekDaysBoolean: function () {
                    var NewWeekDaysBoolean = jQuery.extend(true, {}, Enumerators.System.WeekDaysBoolean)
                    $.each(NewWeekDaysBoolean, function (Index, Element) { NewWeekDaysBoolean[Index] = true })
                    return NewWeekDaysBoolean
                }
            }
        }
    },
        this.DataTable = {
            Fix: {
                DateTimeSorting: function (Format) {
                    // Set filter for date in data table. 
                    $.fn.dataTable.moment = function (format, locale) {
                        var types = $.fn.dataTable.ext.type;

                        // Add type detection
                        types.detect.unshift(function (d) {
                            return moment(d, format, locale, true).isValid() ?
                                'moment-' + format :
                                null;
                        });

                        // Add sorting method - use an integer for the sorting
                        types.order['moment-' + format + '-pre'] = function (d) {
                            return moment(d, format, locale, true).unix();
                        };
                    };
                    //$.fn.dataTable.moment('dddd, MMMM Do, YYYY');
                    $.fn.dataTable.moment(Format);
                }
            }
        },
        this.BootstrapValidator = {
            ResetFormToNoValidated: function (FormSelector, CallBack) {
                window.PromiseResetFormToNoValidated = new Promise((resolve, reject) => {
                    // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
                    // In this example, we use setTimeout(...) to simulate async code. 
                    // In reality, you will probably be using something like XHR or an HTML5 API.
                    $(FormSelector).find('input, select').each(function (Index, Element) {
                        if (Utilities.IsNotUndefinedOrNull($(Element).attr('name'))) {
                            try { $(FormSelector).bootstrapValidator('updateStatus', $(Element).attr('name'), 'NOT_VALIDATED'); }
                            catch (e) { }
                        }
                    })
                    resolve("Success!"); // Yay! Everything went well!
                });

                PromiseResetFormToNoValidated.then((successMessage) => {
                    if (Utilities.Isfunction(CallBack))
                        CallBack()
                })

            },
            RemoteValidatingCallBack: function (FormSelector, CallBack) {
                if ($(FormSelector).last().find('i.form-control-feedback.glyphicon.glyphicon-refresh').length > 0) {
                    window.PromiseRemoteValidatingCheck = new Promise((resolve, reject) => {
                        //We call resolve(...) when what we were doing async succeeded, and reject(...) when it failed.
                        //In this example, we use setTimeout(...) to simulate async code. 
                        //In reality, you will probably be using something like XHR or an HTML5 API.
                        setInterval(function () {

                            if ($(FormSelector).last().find('i.form-control-feedback.glyphicon.glyphicon-refresh').length == 0) {
                                resolve("Success!"); //Yay! Everything went well!
                            }
                        }, 70);
                    });

                    PromiseRemoteValidatingCheck.then((successMessage) => {
                        //successMessage is whatever we passed in the resolve(...) function above.
                        //It doesn't have to be a string, but if it is only a succeed message, it probably will be.
                        ValidToSubmit = $(FormSelector).last().data('bootstrapValidator').isValid()
                        if (!ValidToSubmit)
                            return false;
                        if (ValidToSubmit) {
                            CallBack()
                        }
                    })
                }
            }
        },
        this.SelectPicker = {
            UpdateDDL: function (UpdateDDLArguments) {
                ///Usage Example Start
                ///<div class="col-md-7 " RefreshThis="SupplierId">  ///Use 'RefreshThis' = {Id of Selectlist}

                //    UpdateDDLArguments = {
                //        Selector: '.Update',
                //        URL: '/@HttpContext.Current.Request.RequestContext.RouteData.Values["controller"].ToString()',
                //        BeforeOperation: function () {
                //            $('form').bootstrapValidator('destroy')
                //        },
                //        Callback: function(){
                //            window.ValidationApply()
                //        }
                //    }
                //    Utilities.SelectPicker.UpdateDDL(UpdateDDLArguments)
                ///Note: Bootstrap form-group Neccecary Else It Wont Work, Thank You
                ///Usage Example End
                (Utilities.IsUndefinedOrNull(UpdateDDLArguments.Selector) ? (UpdateDDLArguments.Selector = '.Update') : UpdateDDLArguments.Selector = UpdateDDLArguments.Selector)
                $UpdateButtonElment = $(UpdateDDLArguments.Selector)

                $UpdateButtonElment.off()
                $UpdateButtonElment.on('click', function () {

                    var dialogUpdatingDDL = bootbox.dialog({
                        size: 'small',
                        message: '<p class="text-center">Updating</p><div class=sk-folding-cube><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube3"></div></div>',
                        closeButton: false
                    });
                    var NeededTopSelectorName = $(this).closest('div.form-group').find('[refreshthis]').attr('refreshthis');
                    //var NeededTopSelectorName = $($(this).closest('div.form-group')[0]).attr('class').split('form-group ')[1]
                    UpdateDDLArguments.BeforeOperation();///Oposite Of Call Back
                    var OrginalRefreshSelectorString = '[refreshthis="' + NeededTopSelectorName + '"]'
                    if (UpdateDDLArguments.Selector.indexOf(".modal") >= 0)
                        RefreshSelectorString = '.modal [refreshthis="' + NeededTopSelectorName + '"]'
                    else
                        RefreshSelectorString = OrginalRefreshSelectorString
                    $Target = $(RefreshSelectorString) //$(this).closest('div.form-group')
                    $Target.load(UpdateDDLArguments.URL + ' ' + OrginalRefreshSelectorString + ' > *', function () {
                        $(RefreshSelectorString).find('select').selectpicker({
                            liveSearch: true,
                            showContent: true,
                            noneSelectedText: 'Please Select'
                        })
                        UpdateDDLArguments.Callback();
                        $UpdateButtonElment.off()
                        Utilities.SelectPicker.UpdateDDL(UpdateDDLArguments)
                        ///Fixing Repeater Start
                        var ParentRepeated = $(RefreshSelectorString).parents('[data-repeater-list]')
                        if (ParentRepeated.length > 0) {
                            $(RefreshSelectorString).parents('[data-repeater-list]').siblings('[data-repeater-create]').click()
                            $(RefreshSelectorString).parents('[data-repeater-list]').find('[data-repeater-item]').last().find('[data-repeater-delete]').click()
                        }
                        ///Fixing Repeater End
                        dialogUpdatingDDL.modal('hide');
                    });
                })
            },
            AJAXAddSelectPickerItem: function (Arguments) {
                //   ///Usage Example Start
                //var Arguments = {
                //       SelectListSelector: '.selectpicker.First',
                //      // Message: "Enter New Value",
                //       IgnoreExactMatch: true,
                //      ValueTargetSelector: '#EnglishDefinition',
                //      FormTemplateURL: "/MedicineTypes/Create .card-body",
                //       SingleValue: {
                //           URL: "/MedicineNames/Create",
                //           NoPrompt: {
                //               FieldName:"Name"
                //           },

                //       },  //BootstrapValidation Is Not Valid With This Option
                //    //Events: {
                //    //    OnModalLoad: function () {
                //    //        $('.modal form [type="submit"]').remove()
                //    //    }
                //    //},
                //    ReturnedData: {
                //        ObjectName: "Data",
                //        ValueFieldName: 'Id',
                //        TextFieldName: 'Name',
                //        ///CustomTextComposition: ["Abbreviation", "EnglishDefinition", "UrduDefinition"]
                //    }
                // //Only For Edit
                //////Edit: {
                //////        ButtonSelector: '.modal .EditMedicineNameId',
                //////        Message: "Enter Medicine Name",
                //////        FormTemplateURL: "/MedicineNames/Edit",
                //////        Events: {
                //////        OnModalLoad: function () {
                //////            $('.modal').last().find('form [type="submit"]').remove()
                //////            $('.modal').last().find('form [type="submit"]').remove()
                //////            $('.modal').last().find('a[href="/MedicineNames"]').remove()
                //////        }
                //////        },
                //////    SendingDataQueryArgumentName: 'id',
                //////    ReturnedData: {
                //////        ObjectName: "Data",
                //////        ValueFieldName: 'Id',
                //////        TextFieldName: 'Name',
                //////        ///CustomTextComposition: ["Abbreviation", "EnglishDefinition", "UrduDefinition"]
                //////        }

                //};
                //Utilities.SelectPicker.AJAXAddSelectPickerItem(Arguments)
                /////Usage Example End

                window.SearchBoxAddToList = function (event) {
                    var Arguments = event.data.Arguments
                    var SearchBox = '';
                    window.AJAXAddSelectPickerItemSearchBoxValue = '';
                    if (Utilities.IsNotUndefinedOrNull(event.data.UtilsTopSelector)) {
                        SearchBox = event.data.UtilsTopSelector.find('.bs-searchbox')
                        AJAXAddSelectPickerItemSearchBoxValue = SearchBox.find('input').val()
                    }

                    if (Utilities.IsNotUndefinedOrNull(Arguments.SingleValue)) {

                        function SubmitAJAX(NoPrompt) {

                            var formData = new FormData($('.modal form.bootbox-form').last()[0]);

                            if (Utilities.IsNotUndefinedOrNull(Arguments.SingleValue.NoPrompt)) {

                                formData.append(Arguments.SingleValue.NoPrompt.FieldName, AJAXAddSelectPickerItemSearchBoxValue)
                            }
                            $.ajax({
                                url: Arguments.SingleValue.URL,
                                type: 'POST',
                                data: formData,
                                async: true,
                                cache: false,

                                contentType: false,
                                processData: false
                            }).done(function (Data) {

                                if (Data.data == "-3") {
                                    toastr.error("Please enter name")
                                }
                                if (Utilities.IsStringifiedJSON(Data[Arguments.ReturnedData.ObjectName])) {
                                    var RealObject = JSON.parse(Data[Arguments.ReturnedData.ObjectName])
                                    if (Utilities.IsNotUndefinedOrNull(Arguments.ReturnedData.CustomTextComposition)) {
                                        var NewCustomizedText = ""
                                        $.each(Arguments.ReturnedData.CustomTextComposition, function (Index, CustomTextCompositionElement) {
                                            if (Utilities.IsNotUndefinedOrNull(RealObject[CustomTextCompositionElement])) {
                                                NewCustomizedText += RealObject[CustomTextCompositionElement] + " ";

                                            }
                                        })
                                        if (Utilities.IsNotUndefinedOrNull(Arguments.MultipleDropdown) && (Utilities.IsNotUndefinedOrNull(Arguments.MultipleDropdown.Selector))) {
                                            if (Utilities.IsNotUndefinedOrNull(Arguments.MultipleDropdown.CloneInstanceReference)) { Arguments.MultipleDropdown.CloneInstanceReference.find(ArgumentNameArguments.MultipleDropdown.Selector).prepend('<option value="' + RealObject[Arguments.ReturnedData.ValueFieldName] + '">' + RealObject[Arguments.ReturnedData.TextFieldName] + '</option>') }; var SortedOptions = Utilities.HTML.Sort.SelectOptionsObject($NewDiv.find('select#AttributeNameId option')); $NewDiv.find('select#AttributeNameId').empty().append(SortedOptions);
                                            if ($(Arguments.MultipleDropdown.Selector).length > 1) {
                                                $(Arguments.MultipleDropdown.Selector).each(function (Index, Element) {
                                                    $(Element).prepend('<option value="' + RealObject[Arguments.ReturnedData.ValueFieldName] + '">' + NewCustomizedText + '</option>')
                                                    $(Element).selectpicker('refresh');
                                                })
                                            }
                                        }
                                        else {
                                            $(Arguments.SelectListSelector).prepend('<option value="' + RealObject[Arguments.ReturnedData.ValueFieldName] + '">' + NewCustomizedText + '</option>')
                                            $(Arguments.SelectListSelector).selectpicker('refresh');
                                        }

                                    }
                                    else {
                                        if (Utilities.IsNotUndefinedOrNull(Arguments.MultipleDropdown) && (Utilities.IsNotUndefinedOrNull(Arguments.MultipleDropdown.Selector))) {
                                            if (Utilities.IsNotUndefinedOrNull(Arguments.MultipleDropdown.CloneInstanceReference)) { Arguments.MultipleDropdown.CloneInstanceReference.find(ArgumentNameArguments.MultipleDropdown.Selector).prepend('<option value="' + RealObject[Arguments.ReturnedData.ValueFieldName] + '">' + RealObject[Arguments.ReturnedData.TextFieldName] + '</option>') }; var SortedOptions = Utilities.HTML.Sort.SelectOptionsObject($NewDiv.find('select#AttributeNameId option')); $NewDiv.find('select#AttributeNameId').empty().append(SortedOptions);
                                            if ($(Arguments.MultipleDropdown.Selector).length > 1) {
                                                $(Arguments.MultipleDropdown.Selector).each(function (Index, Element) {
                                                    $(Element).prepend('<option value="' + RealObject[Arguments.ReturnedData.ValueFieldName] + '">' + RealObject[Arguments.ReturnedData.TextFieldName] + '</option>')
                                                    $(Element).selectpicker('refresh');
                                                })
                                            }
                                        }
                                        else {
                                            $(Arguments.SelectListSelector).prepend('<option value="' + RealObject[Arguments.ReturnedData.ValueFieldName] + '">' + RealObject[Arguments.ReturnedData.TextFieldName] + '</option>')
                                            $(Arguments.SelectListSelector).selectpicker('refresh');
                                        }


                                    }

                                    $(Arguments.SelectListSelector).val(RealObject[Arguments.ReturnedData.ValueFieldName]);
                                    $(Arguments.SelectListSelector).selectpicker('render');

                                    if (Utilities.IsNotUndefinedOrNull(Arguments.Events) && Utilities.Isfunction(Arguments.Events.AfterOperation)) {
                                        Arguments.Events.AfterOperation(Data, Arguments)

                                    }

                                }
                                else {
                                    if (Utilities.IsNotUndefinedOrNull(Data.Messages)) {
                                        console.error(Data.Messages)
                                    }
                                }
                                if (Utilities.IsNotUndefinedOrNull(Data.Messages) && Utilities.IsNotUndefinedOrNull(Data.success)) {
                                    if (Data.success) {
                                        toastr.success(Data.Messages)
                                    } else {
                                        toastr.error(Data.Messages)
                                    }
                                }
                            })
                                .fail(function (jqXHR, textStatus, errorThrown) {

                                })
                                .always(function (data, textStatus, jqXHR) {

                                    var my_options = $(Arguments.SelectListSelector + " option");
                                    var selected = $(Arguments.SelectListSelector).val();

                                    my_options.sort(function (a, b) {
                                        if (a.text > b.text) return 1;
                                        if (a.text < b.text) return -1;
                                        return 0
                                    })
                                    var first = "";
                                    my_options.sort(function (x, y) { return x.value == first ? -1 : y.value == first ? 1 : 0; });

                                    $(Arguments.SelectListSelector).empty().append(my_options);
                                    $(Arguments.SelectListSelector).val(selected);
                                    $(Arguments.SelectListSelector).trigger('change')
                                    $(Arguments.SelectListSelector).selectpicker('refresh');
                                    //bootbox.hideAll()
                                    if (Utilities.IsNotUndefinedOrNull(Arguments.SingleValue) && Utilities.IsNotUndefinedOrNull(Arguments.SingleValue.NoPrompt)) {
                                        //Do Nothing
                                    } else {
                                        window.UtilsCreateModalDialog.modal('hide')
                                    }
                                    window.UtilsCreateModalDialogRequested = undefined
                                    $('.modal').find('div.modal-footer > button[data-bb-handler="Create"]').prop('disabled', false)
                                });
                        }

                        if (Utilities.IsNotUndefinedOrNull(Arguments.SingleValue.NoPrompt)) {
                            SubmitAJAX()
                        }
                        else {
                            window.UtilsCreateModalDialog = bootbox.prompt(Arguments.Message, function (result) {

                                if (result) {


                                    if (window.UtilsCreateModalDialogRequested != true) {
                                        window.UtilsCreateModalDialogRequested = true
                                        {


                                            SubmitAJAX()

                                            window.UtilsCreateModalDialogRequested = undefined

                                            return false;
                                        }

                                    }
                                    window.UtilsCreateModalDialogRequested = undefined

                                    return false
                                }
                            })

                        }

                    }
                    else {
                        window.UtilsCreateModalDialog = bootbox.dialog({
                            onEscape: function () {

                                window.UtilsCreateModalDialog.modal('hide');
                                window.LastSelectPickerUtilsTopSelector.find('button.dropdown-toggle').first().focus();

                            },
                            title: Arguments.Message,
                            message: '<h1 class="center">Loading</h1>' +
                                '<div class=sk-folding-cube><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube3"></div></div>',
                            buttons: {

                                Cancel: {
                                    label: 'Cancel',
                                    callback: function () {
                                        //Do Nothing
                                        window.UtilsCreateModalDialogRequested = undefined

                                    }
                                },
                                Create: {
                                    label: 'Create',
                                    callback: function () {


                                        if (window.UtilsCreateModalDialogRequested != true) {
                                            window.UtilsCreateModalDialogRequested = true

                                            var $CreateButton = $('.modal div.modal-footer > button[data-bb-handler="Create"]');
                                            if (!$CreateButton.prop('disabled')) {
                                                //$CreateButton.prop('disabled', true)


                                                var ValidToSubmit = true;

                                                function SubmitCall() {
                                                    var formData = new FormData($('.modal form').last()[0]);

                                                    $.ajax({
                                                        url: $('.modal form').last().attr('action'),
                                                        type: 'POST',
                                                        data: formData,
                                                        async: true,
                                                        cache: false,

                                                        contentType: false,
                                                        processData: false
                                                    }).done(function (Data) {

                                                        if (Utilities.IsStringifiedJSON(Data[Arguments.ReturnedData.ObjectName])) {
                                                            var RealObject = JSON.parse(Data[Arguments.ReturnedData.ObjectName])
                                                            if (Utilities.IsNotUndefinedOrNull(Arguments.ReturnedData.CustomTextComposition)) {
                                                                var NewCustomizedText = ""
                                                                $.each(Arguments.ReturnedData.CustomTextComposition, function (Index, CustomTextCompositionElement) {
                                                                    if (Utilities.IsNotUndefinedOrNull(RealObject[CustomTextCompositionElement])) {
                                                                        NewCustomizedText += RealObject[CustomTextCompositionElement] + " ";

                                                                    }
                                                                })
                                                                if (Utilities.IsNotUndefinedOrNull(Arguments.MultipleDropdown) && (Utilities.IsNotUndefinedOrNull(Arguments.MultipleDropdown.Selector))) {
                                                                    if (Utilities.IsNotUndefinedOrNull(Arguments.MultipleDropdown.CloneInstanceReference)) { Arguments.MultipleDropdown.CloneInstanceReference.find(ArgumentNameArguments.MultipleDropdown.Selector).prepend('<option value="' + RealObject[Arguments.ReturnedData.ValueFieldName] + '">' + RealObject[Arguments.ReturnedData.TextFieldName] + '</option>') }; var SortedOptions = Utilities.HTML.Sort.SelectOptionsObject($NewDiv.find('select#AttributeNameId option')); $NewDiv.find('select#AttributeNameId').empty().append(SortedOptions);
                                                                    if ($(Arguments.MultipleDropdown.Selector).length > 1) {
                                                                        $(Arguments.MultipleDropdown.Selector).each(function (Index, Element) {
                                                                            $(Element).prepend('<option value="' + RealObject[Arguments.ReturnedData.ValueFieldName] + '">' + NewCustomizedText + '</option>')
                                                                            $(Element).selectpicker('refresh');
                                                                        })
                                                                    }
                                                                }
                                                                else {
                                                                    $(Arguments.SelectListSelector).prepend('<option value="' + RealObject[Arguments.ReturnedData.ValueFieldName] + '">' + NewCustomizedText + '</option>')
                                                                    $(Arguments.SelectListSelector).selectpicker('refresh');
                                                                }

                                                            }
                                                            else {
                                                                if (Utilities.IsNotUndefinedOrNull(Arguments.MultipleDropdown) && (Utilities.IsNotUndefinedOrNull(Arguments.MultipleDropdown.Selector))) {
                                                                    if (Utilities.IsNotUndefinedOrNull(Arguments.MultipleDropdown.CloneInstanceReference)) { Arguments.MultipleDropdown.CloneInstanceReference.find(ArgumentNameArguments.MultipleDropdown.Selector).prepend('<option value="' + RealObject[Arguments.ReturnedData.ValueFieldName] + '">' + RealObject[Arguments.ReturnedData.TextFieldName] + '</option>') }; var SortedOptions = Utilities.HTML.Sort.SelectOptionsObject($NewDiv.find('select#AttributeNameId option')); $NewDiv.find('select#AttributeNameId').empty().append(SortedOptions);
                                                                    if ($(Arguments.MultipleDropdown.Selector).length > 1) {
                                                                        $(Arguments.MultipleDropdown.Selector).each(function (Index, Element) {
                                                                            $(Element).prepend('<option value="' + RealObject[Arguments.ReturnedData.ValueFieldName] + '">' + RealObject[Arguments.ReturnedData.TextFieldName] + '</option>')
                                                                            $(Element).selectpicker('refresh');
                                                                        })
                                                                    }
                                                                }
                                                                else {
                                                                    $(Arguments.SelectListSelector).prepend('<option value="' + RealObject[Arguments.ReturnedData.ValueFieldName] + '">' + RealObject[Arguments.ReturnedData.TextFieldName] + '</option>')
                                                                    $(Arguments.SelectListSelector).selectpicker('refresh');
                                                                }


                                                            }

                                                            $(Arguments.SelectListSelector).val(RealObject[Arguments.ReturnedData.ValueFieldName]);
                                                            $(Arguments.SelectListSelector).selectpicker('render');
                                                        }

                                                        if (Utilities.IsNotUndefinedOrNull(Arguments.Events) && Utilities.Isfunction(Arguments.Events.AfterOperation)) {
                                                            Arguments.Events.AfterOperation(Data, Arguments)
                                                        }
                                                        if (Utilities.IsNotUndefinedOrNull(Data.Messages) && Utilities.IsNotUndefinedOrNull(Data.success)) {
                                                            if (Data.success) {
                                                                toastr.success(Data.Messages)
                                                            } else {
                                                                toastr.error(Data.Messages)
                                                            }
                                                        }
                                                    })
                                                        .fail(function (jqXHR, textStatus, errorThrown) {
                                                            $('.modal div.modal-footer > button[data-bb-handler="Create"]').prop('disabled', false)
                                                        })
                                                        .always(function (data, textStatus, jqXHR) {
                                                            var my_options = $(Arguments.SelectListSelector + " option");
                                                            var selected = $(Arguments.SelectListSelector).val();

                                                            my_options.sort(function (a, b) {
                                                                if (a.text > b.text) return 1;
                                                                if (a.text < b.text) return -1;
                                                                return 0
                                                            })
                                                            var first = "";
                                                            my_options.sort(function (x, y) { return x.value == first ? -1 : y.value == first ? 1 : 0; });

                                                            $(Arguments.SelectListSelector).empty().append(my_options);
                                                            $(Arguments.SelectListSelector).val(selected);
                                                            $(Arguments.SelectListSelector).trigger('change')
                                                            $(Arguments.SelectListSelector).selectpicker('refresh');
                                                            //bootbox.hideAll()
                                                            window.UtilsCreateModalDialog.modal('hide')

                                                            window.UtilsCreateModalDialogRequested = undefined
                                                        })
                                                }

                                                if (Utilities.IsNotUndefinedOrNull(Arguments.Validation)) {
                                                    $(Arguments.Validation.FormSelector).last().data('bootstrapValidator').validate()
                                                    if ($(Arguments.Validation.FormSelector).last().find('i.form-control-feedback.glyphicon.glyphicon-refresh').length > 0) {
                                                        var PromiseCreateValidating = new Promise((resolve, reject) => {
                                                            //We call resolve(...) when what we were doing async succeeded, and reject(...) when it failed.
                                                            //In this example, we use setTimeout(...) to simulate async code. 
                                                            //In reality, you will probably be using something like XHR or an HTML5 API.
                                                            setInterval(function () {

                                                                if ($(Arguments.Validation.FormSelector).last().find('i.form-control-feedback.glyphicon.glyphicon-refresh').length == 0) {
                                                                    resolve("Success!"); //Yay! Everything went well!
                                                                }
                                                            }, 1);
                                                        });

                                                        PromiseCreateValidating.then((successMessage) => {
                                                            //successMessage is whatever we passed in the resolve(...) function above.
                                                            //It doesn't have to be a string, but if it is only a succeed message, it probably will be.
                                                            ValidToSubmit = $(Arguments.Validation.FormSelector).last().data('bootstrapValidator').isValid()
                                                            if (!ValidToSubmit) {

                                                                return false;
                                                            }

                                                            if (ValidToSubmit) {
                                                                SubmitCall()

                                                            }
                                                        });
                                                    }
                                                    else {
                                                        ValidToSubmit = $(Arguments.Validation.FormSelector).last().data('bootstrapValidator').isValid()
                                                        if (!ValidToSubmit)
                                                            return false;
                                                        if (ValidToSubmit) {
                                                            SubmitCall()
                                                        }

                                                    }
                                                }
                                                else {
                                                    SubmitCall()
                                                }
                                                window.UtilsCreateModalDialogRequested = undefined

                                                return false;
                                            }
                                        }
                                        window.UtilsCreateModalDialogRequested = undefined

                                        return false
                                    }
                                },
                            }
                        });
                    }


                    if (Utilities.IsNotUndefinedOrNull(Arguments.SingleValue) && Utilities.IsNotUndefinedOrNull(Arguments.SingleValue.NoPrompt)) {

                    }
                    else {
                        window.UtilsCreateModalDialog.init(function () {

                            $(document).off("hidden.bs.modal", ".bootbox.modal")
                            $(document).on("hidden.bs.modal", ".bootbox.modal", function (e) {
                                window.UtilsCreateModalDialogRequested = undefined
                            });

                            //$('.bootbox').last().find('.modal-footer [data-bb-handler="Create"]').prop('disabled', true)
                            if (Utilities.IsNotUndefinedOrNull(Arguments.SingleValue)) {

                                window.UtilsCreateModalDialog.find('input.bootbox-input-text').each(function (Index, Element) {
                                    $(Element).val(AJAXAddSelectPickerItemSearchBoxValue)

                                })

                                if (Utilities.IsNotUndefinedOrNull(Arguments.SingleValue.NoPrompt)) {
                                    window.UtilsCreateModalDialog.find('[data-bb-handler="confirm"]').click()
                                }
                            }
                            else {


                                window.UtilsCreateModalDialog.find('.bootbox-body').load(Arguments.FormTemplateURL, function () {
                                    $('.bootbox').last().find('.modal-footer [data-bb-handler="Create"]').prop('disabled', false)

                                    window.UtilsCreateModalDialog.find('.bootbox-body').find(Arguments.ValueTargetSelector).each(function (Index, Element) {
                                        $(Element).val(AJAXAddSelectPickerItemSearchBoxValue)

                                    })
                                    ///Event OnModalLoad Start
                                    if (Utilities.IsNotUndefinedOrNull(Arguments)) {
                                        if (Utilities.IsNotUndefinedOrNull(Arguments.Events) && Utilities.Isfunction(Arguments.Events.OnModalLoad)) {
                                            Arguments.Events.OnModalLoad()
                                        }
                                        if (Utilities.IsNotUndefinedOrNull(Arguments.Validation)) {///Using BootstrapValidation For Now
                                            window.$bootstrapValidator = $(Arguments.Validation.FormSelector).last().bootstrapValidator({
                                                framework: 'bootstrap',
                                                feedbackIcons: {
                                                    valid: 'glyphicon glyphicon-ok',
                                                    invalid: 'glyphicon glyphicon-remove',
                                                    validating: 'glyphicon glyphicon-refresh'
                                                },
                                                excluded: ':disabled',
                                                button: {
                                                    // The submit buttons selector
                                                    selector: '.modal [data-bb-handler="Create"]'//Arguments.Validation.ButtonSelector,
                                                },
                                                fields: Arguments.Validation.Fields


                                            })

                                            $bootstrapValidator.on('status.field.bv', function (e, data) {

                                                //
                                            })
                                            $bootstrapValidator.on('success.form.bv', function (e) {
                                                e.preventDefault();
                                            })
                                            $bootstrapValidator.on('success.validator.bv', function (e, data) {

                                                // data.field     --> The field name
                                                // data.validator --> The validator name
                                                // data.result    --> returned data from server
                                                if (Utilities.IsUndefinedOrNull(window.UtilsCreateModalDialogRequested) && (data.bv.$invalidFields.length == 0 || $('.bootbox.modal form').data('bootstrapValidator').isValid())) {
                                                    $('.bootbox.modal [data-bb-handler="Create"]').prop('disabled', false)

                                                }
                                                e.preventDefault();
                                                if (data.validator === 'remote') {

                                                }
                                            })
                                            $bootstrapValidator.on('error.validator.bv', function (e, data) {

                                                // data.field     --> The field name
                                                // data.validator --> The validator name
                                                // data.result    --> returned data from server
                                                if (data.bv.$invalidFields.length > 0 || $('.bootbox.modal form').data('bootstrapValidator').isValid()) {
                                                    //$('.bootbox.modal [data-bb-handler="Create"]').prop('disabled', true)
                                                }
                                                e.preventDefault();
                                                if (data.validator === 'remote') {
                                                    window.UtilsCreateModalDialogRequested = undefined
                                                }
                                            })
                                        }

                                    }
                                    ///Event OnModalLoad End
                                });
                            }

                        })
                    }
                }

                if (Utilities.IsUndefinedOrNull(Arguments.SingleValue)) {
                    $.get(Arguments.FormTemplateURL.split(' ')[0])//PreFetch
                }

                $(Arguments.SelectListSelector).on('hide.bs.select', function (e) {
                    window.LastSelectPickerUtilsTopSelector = $(this).closest('.bootstrap-select');
                })
                    .on('show.bs.select', function (e) {

                        var UtilsTopSelector = $(this).closest('.bootstrap-select');
                        var SearchBox = UtilsTopSelector.find('.bs-searchbox');

                        UtilsTopSelector.find('ul.NewListAddButtonSpace').remove();
                        SearchBox.append('<ul class="NewListAddButtonSpace"></ul>');

                        UtilsTopSelector.find('ul.NewListAddButtonSpace').prepend('<span class="ListAddButton"><a ><span class="text"><button>Add</button><span class="UpperSearchedLabel"> ' + SearchBox.children('input').val() + '</span> </span></a></span>')
                        UtilsTopSelector.find('ul.NewListAddButtonSpace .ListAddButton').on('click', {
                            Arguments: Arguments, UtilsTopSelector: UtilsTopSelector
                        }, window.SearchBoxAddToList)
                        SearchBox.off()
                        SearchBox.on('keyup', function (event) {


                            if (UtilsTopSelector.find('li.no-results').length == 1) {
                                UtilsTopSelector.find('ul.NewListAddButtonSpace ').remove()
                                UtilsTopSelector.find('li.no-results .ListAddButton').remove()
                                UtilsTopSelector.find('li.no-results').append('<button type="button" class="ListAddButton">Add</button>')
                                UtilsTopSelector.find('li.no-results .ListAddButton').off()
                                UtilsTopSelector.find('input').off("keyup")

                                UtilsTopSelector.find('input').on("keyup", function (event) {
                                    var KeyCode = event.which || event.keyCode;
                                    if (KeyCode == '13') {
                                        UtilsTopSelector.find('li.no-results .ListAddButton').click();
                                    }
                                })

                                UtilsTopSelector.find('li.no-results .ListAddButton').on('click', { Arguments: Arguments, UtilsTopSelector: UtilsTopSelector }, window.SearchBoxAddToList)

                            } else {

                                var ListAddButtonWasActive = UtilsTopSelector.find('ul.NewListAddButtonSpace ').hasClass('active')
                                UtilsTopSelector.find('ul.NewListAddButtonSpace ').remove()

                                window.SearchBoxAddToListKeyUpIsAlreadyAvailable = false;
                                window.AJAXAddSelectPickerItemSearchBoxValue = event.target.value

                                var SearchBoxAddToListKeyUpSearchBoxValuePromise = new Promise((resolve, reject) => {
                                    // We call resolve(...) when what we were doing made async successful, and reject(...) when it failed.
                                    // In this example, we use setTimeout(...) to simulate async code. 
                                    // In reality, you will probably be using something like XHR or an HTML5 API.

                                    $(Arguments.SelectListSelector).find('option').each(function (Index, Element) {

                                        if ($(Element).text() == window.AJAXAddSelectPickerItemSearchBoxValue) {
                                            window.SearchBoxAddToListKeyUpIsAlreadyAvailable = true
                                            return false
                                        }
                                    })
                                    resolve("Success!"); // Yay! Everything went well!

                                });

                                SearchBoxAddToListKeyUpSearchBoxValuePromise.then((successMessage) => {
                                    // successMessage is whatever we passed in the resolve(...) function above.
                                    // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
                                    if (!window.SearchBoxAddToListKeyUpIsAlreadyAvailable) {
                                        UtilsTopSelector.find('ul.NewListAddButtonSpace').remove();
                                        SearchBox.append('<ul class="NewListAddButtonSpace"></ul>');
                                        UtilsTopSelector.find('ul.NewListAddButtonSpace').prepend('<li class="ListAddButton"><a ><span class="text"><button>Add</button><span class="UpperSearchedLabel"> "' + SearchBox.children('input').val() + '"</span> </span></a></li>')
                                        if (ListAddButtonWasActive) {
                                            UtilsTopSelector.find('ul.NewListAddButtonSpace .ListAddButton').addClass('active');

                                            UtilsTopSelector.find('ul.NewListAddButtonSpace .ListAddButton')[0].scrollIntoView()
                                            UtilsTopSelector.find('.bs-searchbox input')[0].scrollIntoView()
                                            if (!UtilsTopSelector.hasClass('dropup')) {
                                                UtilsTopSelector[0].scrollIntoView()
                                            }
                                        }

                                        UtilsTopSelector.find('ul.NewListAddButtonSpace .ListAddButton').on('click', { Arguments: Arguments, UtilsTopSelector: UtilsTopSelector }, window.SearchBoxAddToList)
                                    }
                                });


                            }
                        })

                    });

                if (Utilities.IsNotUndefinedOrNull(Arguments.Edit)) {
                    $(Arguments.Edit.ButtonSelector).off()
                    $(Arguments.Edit.ButtonSelector).on('click', function () {
                        var ArgumentsSelectListSelectorValue = $(Arguments.SelectListSelector).val()
                        if (Utilities.IsNotUndefinedOrNull(ArgumentsSelectListSelectorValue)) {
                            var SendingDataQueryArgumentName = 'id';///We Have Set Default Argument Name As 'id'
                            if (Utilities.IsNotUndefinedOrNull(Arguments.SendingDataQueryArgumentName)) {
                                SendingDataQueryArgumentName = Arguments.SendingDataQueryArgumentName;
                            }
                            window.UtilsEditModalDialog = bootbox.dialog({
                                onEscape: function () {

                                    window.UtilsEditModalDialog.modal('hide');
                                    window.LastSelectPickerUtilsTopSelector.find('button.dropdown-toggle').first().focus();

                                },
                                title: Arguments.Message,
                                message: '<h1 class="center">Loading</h1>' +
                                    '<div class=sk-folding-cube><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube3"></div></div>',
                                buttons: {

                                    Cancel: {
                                        label: 'Cancel',
                                        callback: function () {
                                            //Do Nothing
                                        }
                                    },
                                    Update: {
                                        label: 'Update',
                                        callback: function () {
                                            var ValidToSubmit = true;

                                            if (Utilities.IsNotUndefinedOrNull(Arguments.Edit.Validation)) {
                                                $(Arguments.Edit.Validation.FormSelector).last().data('bootstrapValidator').validate()
                                                var SubmitCallAfterValidation = function () {


                                                    var formData = new FormData($('.modal form').last()[0]);
                                                    $.ajax({
                                                        url: $('.modal form').last().attr('action'),
                                                        type: 'POST',
                                                        data: formData,
                                                        async: true,
                                                        cache: false,

                                                        contentType: false,
                                                        processData: false
                                                    }).done(function (Data) {

                                                        if (Utilities.IsStringifiedJSON(Data[Arguments.ReturnedData.ObjectName])) {
                                                            var RealObject = JSON.parse(Data[Arguments.ReturnedData.ObjectName])

                                                            $(Arguments.SelectListSelector + " option[value='" + RealObject.Id + "'").remove()
                                                            if (Utilities.IsNotUndefinedOrNull(Arguments.ReturnedData.CustomTextComposition)) {
                                                                var NewCustomizedText = ""
                                                                $.each(Arguments.ReturnedData.CustomTextComposition, function (Index, CustomTextCompositionElement) {
                                                                    if (Utilities.IsNotUndefinedOrNull(RealObject[CustomTextCompositionElement])) {
                                                                        NewCustomizedText += RealObject[CustomTextCompositionElement] + " ";

                                                                    }
                                                                })
                                                                if (Utilities.IsNotUndefinedOrNull(Arguments.MultipleDropdown) && (Utilities.IsNotUndefinedOrNull(Arguments.MultipleDropdown.Selector))) {
                                                                    if (Utilities.IsNotUndefinedOrNull(Arguments.MultipleDropdown.CloneInstanceReference)) { Arguments.MultipleDropdown.CloneInstanceReference.find(ArgumentNameArguments.MultipleDropdown.Selector).prepend('<option value="' + RealObject[Arguments.ReturnedData.ValueFieldName] + '">' + RealObject[Arguments.ReturnedData.TextFieldName] + '</option>') }; var SortedOptions = Utilities.HTML.Sort.SelectOptionsObject($NewDiv.find('select#AttributeNameId option')); $NewDiv.find('select#AttributeNameId').empty().append(SortedOptions);
                                                                    if ($(Arguments.MultipleDropdown.Selector).length > 1) {
                                                                        $(Arguments.MultipleDropdown.Selector).each(function (Index, Element) {
                                                                            $(Element).prepend('<option value="' + RealObject[Arguments.ReturnedData.ValueFieldName] + '">' + NewCustomizedText + '</option>')
                                                                            $(Element).selectpicker('refresh');
                                                                        })
                                                                    }
                                                                }
                                                                else {
                                                                    $(Arguments.SelectListSelector).prepend('<option value="' + RealObject[Arguments.ReturnedData.ValueFieldName] + '">' + NewCustomizedText + '</option>')
                                                                    $(Arguments.SelectListSelector).selectpicker('refresh');
                                                                }
                                                            }
                                                            else {
                                                                if (Utilities.IsNotUndefinedOrNull(Arguments.MultipleDropdown) && (Utilities.IsNotUndefinedOrNull(Arguments.MultipleDropdown.Selector))) {
                                                                    if (Utilities.IsNotUndefinedOrNull(Arguments.MultipleDropdown.CloneInstanceReference)) { Arguments.MultipleDropdown.CloneInstanceReference.find(ArgumentNameArguments.MultipleDropdown.Selector).prepend('<option value="' + RealObject[Arguments.ReturnedData.ValueFieldName] + '">' + RealObject[Arguments.ReturnedData.TextFieldName] + '</option>') }; var SortedOptions = Utilities.HTML.Sort.SelectOptionsObject($NewDiv.find('select#AttributeNameId option')); $NewDiv.find('select#AttributeNameId').empty().append(SortedOptions);
                                                                    if ($(Arguments.MultipleDropdown.Selector).length > 1) {
                                                                        $(Arguments.MultipleDropdown.Selector).each(function (Index, Element) {
                                                                            $(Element).prepend('<option value="' + RealObject[Arguments.ReturnedData.ValueFieldName] + '">' + RealObject[Arguments.ReturnedData.TextFieldName] + '</option>')
                                                                            $(Element).selectpicker('refresh');
                                                                        })
                                                                    }
                                                                }
                                                                else {
                                                                    $(Arguments.SelectListSelector).prepend('<option value="' + RealObject[Arguments.ReturnedData.ValueFieldName] + '">' + RealObject[Arguments.ReturnedData.TextFieldName] + '</option>')
                                                                    $(Arguments.SelectListSelector).selectpicker('refresh');
                                                                }
                                                            }

                                                            $(Arguments.SelectListSelector).val(RealObject[Arguments.ReturnedData.ValueFieldName]);
                                                            $(Arguments.SelectListSelector).selectpicker('render');
                                                        }
                                                        if (Utilities.IsNotUndefinedOrNull(Data.Messages) && Utilities.IsNotUndefinedOrNull(Data.success)) {
                                                            if (Data.success) {
                                                                toastr.success(Data.Messages)

                                                            } else {
                                                                toastr.error(Data.Messages)

                                                            }
                                                        }
                                                    })
                                                        .fail(function (jqXHR, textStatus, errorThrown) { })
                                                        .always(function (data, textStatus, jqXHR) {


                                                            var my_options = $(Arguments.SelectListSelector + " option");
                                                            var selected = $(Arguments.SelectListSelector).val();

                                                            my_options.sort(function (a, b) {
                                                                if (a.text > b.text) return 1;
                                                                if (a.text < b.text) return -1;
                                                                return 0
                                                            })
                                                            var first = "";
                                                            my_options.sort(function (x, y) { return x.value == first ? -1 : y.value == first ? 1 : 0; });

                                                            $(Arguments.SelectListSelector).empty().append(my_options);
                                                            $(Arguments.SelectListSelector).val(selected);
                                                            $(Arguments.SelectListSelector).trigger('change')
                                                            $(Arguments.SelectListSelector).selectpicker('refresh');
                                                            window.UtilsEditModalDialog.modal('hide')
                                                            ///bootbox.hideAll()
                                                        });
                                                }
                                                if ($(Arguments.Validation.FormSelector).last().find('i.form-control-feedback.glyphicon.glyphicon-refresh').length > 0) {
                                                    var PromiseEditValidating = new Promise((resolve, reject) => {
                                                        //We call resolve(...) when what we were doing async succeeded, and reject(...) when it failed.
                                                        //In this example, we use setTimeout(...) to simulate async code. 
                                                        //In reality, you will probably be using something like XHR or an HTML5 API.
                                                        setInterval(function () {

                                                            if ($(Arguments.Validation.FormSelector).last().find('i.form-control-feedback.glyphicon.glyphicon-refresh').length == 0) {
                                                                resolve("Success!"); //Yay! Everything went well!
                                                            }
                                                        }, 70);
                                                    });

                                                    PromiseEditValidating.then((successMessage) => {
                                                        //successMessage is whatever we passed in the resolve(...) function above.
                                                        //It doesn't have to be a string, but if it is only a succeed message, it probably will be.
                                                        ValidToSubmit = $(Arguments.Validation.FormSelector).last().data('bootstrapValidator').isValid()
                                                        if (!ValidToSubmit)
                                                            return false;
                                                        if (ValidToSubmit) {
                                                            SubmitCallAfterValidation()
                                                        }
                                                    });
                                                }
                                                else {
                                                    var PromiseEditValidating = new Promise((resolve, reject) => {
                                                        //We call resolve(...) when what we were doing async succeeded, and reject(...) when it failed.
                                                        //In this example, we use setTimeout(...) to simulate async code. 
                                                        //In reality, you will probably be using something like XHR or an HTML5 API.
                                                        setInterval(function () {

                                                            if ($(Arguments.Edit.Validation.FormSelector).last().find('i.form-control-feedback.glyphicon.glyphicon-refresh').length == 0) {
                                                                resolve("Success!"); //Yay! Everything went well!
                                                            }
                                                        }, 70);
                                                    });
                                                    PromiseEditValidating.then((successMessage) => {
                                                        ValidToSubmit = $(Arguments.Edit.Validation.FormSelector).last().data('bootstrapValidator').isValid()
                                                        if (!ValidToSubmit)
                                                            return false;
                                                        if (ValidToSubmit) {
                                                            SubmitCallAfterValidation()
                                                        }
                                                    })


                                                }
                                            }
                                            return false;

                                        }
                                    },
                                }
                            });
                            UtilsEditModalDialog.init(function () {
                                $('.bootbox').last().find('.modal-footer [data-bb-handler="Update"]').prop('disabled', true)
                                UtilsEditModalDialog.find('.bootbox-body').load(Arguments.Edit.FormTemplateURL + '?' + SendingDataQueryArgumentName + '=' + ArgumentsSelectListSelectorValue, function () {
                                    $('.bootbox').last().find('.modal-footer [data-bb-handler="Update"]').prop('disabled', false)
                                    ///Event OnModalLoad Start


                                    if (Utilities.IsNotUndefinedOrNull(Arguments)) {
                                        if (Utilities.IsNotUndefinedOrNull(Arguments.Edit)) {
                                            if (Utilities.IsNotUndefinedOrNull(Arguments.Edit.Events) && Utilities.Isfunction(Arguments.Edit.Events.OnModalLoad)) {
                                                Arguments.Edit.Events.OnModalLoad()
                                            }
                                            if (Utilities.IsNotUndefinedOrNull(Arguments.Edit.Validation)) {///Using BootstrapValidation For Now

                                                var $bootstrapValidator = $(Arguments.Edit.Validation.FormSelector).last().bootstrapValidator({
                                                    framework: 'bootstrap',
                                                    feedbackIcons: {
                                                        valid: 'glyphicon glyphicon-ok',
                                                        invalid: 'glyphicon glyphicon-remove',
                                                        validating: 'glyphicon glyphicon-refresh'
                                                    },
                                                    excluded: ':disabled',
                                                    button: {
                                                        // The submit buttons selector
                                                        selector: Arguments.Edit.Validation.ButtonSelector,
                                                    },
                                                    fields: Arguments.Edit.Validation.Fields


                                                })
                                                $bootstrapValidator.on('success.form.bv', function (e) {
                                                    e.preventDefault();
                                                })
                                            }

                                        }
                                    }

                                    ///Event OnModalLoad End
                                });

                            });

                        }
                        else {
                            //toastr.warning('Please Select An Option From Dropdown List')
                            var event = {
                                data: {
                                    Arguments: Arguments,
                                }
                            }

                            window.SearchBoxAddToList(event)
                        }
                    })
                }
            }
        },
        this.Select2 = {
            HackOnKeyPressSearch: function () {
                //Hack On Key Search Start
                $(document).on('keydown', '.select2', function (event) {
                    var StringKey = String.fromCharCode(event.which || event.keyCode || 0)
                    if (!(event.ctrlKey || event.altKey)) {//If Ctrl Or Alt Is Not Pressed
                        if (event.keyCode != 9 && event.keyCode != 16 && event.keyCode != 17 && event.keyCode != 18 && event.keyCode != 19 && event.keyCode != 33 && event.keyCode != 34 && event.keyCode != 91 && event.keyCode != 144 && event.keyCode != 145) {

                            $(this).siblings('select').select2('open');
                            $('.select2-search__field').val(StringKey).trigger('keyup')
                        }
                    }
                });
                //Hack On Key Search End
            },
            OldMatcherSearching: function (Selector) {///Remeber To Use Select2 Full With This
                function matchStart(term, text) {
                    if (text.toUpperCase().indexOf(term.toUpperCase()) == 0) {
                        return true;
                    }

                    return false;
                }

                $.fn.select2.amd.require(['select2/compat/matcher'], function (oldMatcher) {
                    $(Selector).select2({
                        width: 'element',
                        matcher: oldMatcher(matchStart)
                    })
                });
            },
            AJAXSelectList: function (Arguments) {///AKA Cascade

                ///Usage:
                ///var Arguments = { SourceSelector: '#CountryId', TargetSelector: '#StateOrProvinceId', URL: "GetStateOrProvinces", SourceName: 'CountryId', SourceData: $('#CountryId').val(), RegexText: /,"Name":/g, RegexId: /"Id":/g, DefaultOption: '@ViewBag.StateName', SourceText: 'Country', TargetText: 'State or Province', SubArguments: CityArguments };
                //New Arguments And Default Values
                //Arguments.OldMatcherSearching = true 
                //

                if (Utilities.IsNotUndefinedOrNull(Arguments)) {


                    $('.modal').attr('tabindex', '');
                    if (Utilities.IsNotUndefinedOrNull(Arguments) && Utilities.Isfunction(Arguments.CallBackFirstTime)) {
                        if (Utilities.IsUndefinedOrNull(window.CallBackFirstTime)) {
                            window.CallBackFirstTime = [];
                        }
                        //window.CallBackFirstTime.push(Arguments.CallBackFirstTime)
                    }

                    if (Utilities.IsABootstrapModalOpen()) {

                        $.fn.modal.Constructor.prototype.enforceFocus = function () { };

                    }
                    $(Arguments.SourceSelector).select2({
                        width: 'element',
                        minimumResultsForSearch: Infinity
                    });

                    if (Utilities.IsNotUndefinedOrNull(Arguments.SubArguments) || (!$(Arguments.TargetSelector).prop('multiple'))) {

                        if (Utilities.IsUndefinedOrNull(Arguments.OldMatcherSearching) || (Utilities.IsUndefinedOrNull(Arguments.OldMatcherSearching) && Arguments.OldMatcherSearching != false)) {
                            Utilities.Select2.OldMatcherSearching(Arguments.SourceSelector);
                        }
                    }
                    $(Arguments.SourceSelector).off("select2:select");
                    $(Arguments.SourceSelector).on("select2:select", function () {

                        if (Utilities.IsUndefinedOrNull(window.FirstSelectedAJAXSelectList)) {
                            window.FirstSelectedAJAXSelectList = $(this);
                        }

                        if (Utilities.IsNotUndefinedOrNull(Arguments) && Utilities.Isfunction(Arguments.CallBackFirstTime)) {

                            window.CallBackFirstTime.push(Arguments.CallBackFirstTime);
                        }
                        if ($(Arguments.SourceSelector).val() != '' || Arguments.AllowAJAXOnNull == true) {
                            var SendData = {
                                [Arguments.SourceName]: $(Arguments.SourceSelector).val()
                            }
                            if (Utilities.IsUndefinedOrNull(Arguments.ExtraParameters)) {
                                Arguments.ExtraParameters = null;
                            } else {
                                jQuery.each(Arguments.ExtraParameters, function (i, val) {
                                    if (((typeof (val) == 'object') && val instanceof jQuery)) {
                                        if (Utilities.IsNotUndefinedOrNull(val.val())) {
                                            Arguments.ExtraParameters[i] = val.val()
                                            SendData[i] = val.val();
                                        }
                                    } else {
                                        if (Utilities.IsNotUndefinedOrNull(val)) {
                                            Arguments.ExtraParameters[i] = val
                                            SendData[i] = val
                                        }
                                    }
                                });
                            }


                            window.AJAXSelectListLastArguments = Arguments

                            $.ajax({
                                async: (Utilities.IsNotUndefinedOrNull(Arguments.async) ? Arguments.async : true),///Default Async True Else Take 'async' Value From 'Arguments'
                                url: Arguments.URL,
                                type: 'POST',
                                data: SendData, // { [Arguments.SourceName]: $(Arguments.SourceSelector).val(), ExtraParameters: Arguments.ExtraParameters  /*Arguments.SourceData*/ },
                                //async: false,
                            }).done(function (Data) {
                                ///Resolving Focus Start
                                if (Utilities.IsUndefinedOrNull(window.AJAXSelectListLastArguments.SubArguments)) {

                                    if (Utilities.IsUndefinedOrNull(window.AJAXSelectListCounter)) {
                                        window.AJAXSelectListCounter = 0
                                    } else {
                                        window.AJAXSelectListCounter++
                                    }
                                    if (Utilities.IsNotUndefinedOrNull(window.AJAXSelectListCounter) && window.AJAXSelectListCounter > 0) {
                                        if (Utilities.IsNotUndefinedOrNull(window.FirstSelectedAJAXSelectList)) {
                                            if (Utilities.IsNotUndefinedOrNull(window.FirstSelectedAJAXSelectList)) {
                                                console.log('u focus 1')
                                                //window.FirstSelectedAJAXSelectList.select2('focus')
                                                window.FirstSelectedAJAXSelectList = undefined
                                            }
                                        }
                                    }
                                }
                                ///Resolving Focus End

                                if (Utilities.IsNotUndefinedOrNull(Arguments.SubArguments) || (!$(Arguments.TargetSelector).prop('multiple'))) {
                                    $(Arguments.TargetSelector).select2({
                                        width: 'element',
                                        minimumResultsForSearch: Infinity
                                    })

                                    if (Utilities.IsUndefinedOrNull(Arguments.OldMatcherSearching) || (Utilities.IsUndefinedOrNull(Arguments.OldMatcherSearching) && Arguments.OldMatcherSearching != false)) {
                                        Utilities.Select2.OldMatcherSearching(Arguments.TargetSelector)
                                    }
                                    $(Arguments.TargetSelector).select2('destroy')

                                }
                                $(Arguments.TargetSelector).empty()
                                if (Utilities.IsNotUndefinedOrNull(Arguments.ReturnObjectName)) {
                                    var NewJSONString = Data[Arguments.ReturnObjectName].replace(new RegExp(",\"" + Arguments.ReturnFieldNameText + "\":", "g"), ',"text":').replace(new RegExp("\"" + Arguments.ReturnFieldNameId + "\":", "g"), '"id":')
                                }
                                else
                                    var NewJSONString = Data.List.replace(new RegExp(",\"" + Arguments.ReturnFieldNameText + "\":", "g"), ',"text":').replace(new RegExp("\"" + Arguments.ReturnFieldNameId + "\":", "g"), '"id":')
                                var NewJSON = JSON.parse(NewJSONString)
                                NewJSON.unshift({ id: '', text: "Please Select " + Arguments.TargetText })
                                $(Arguments.TargetSelector).select2({
                                    width: 'element',
                                    data: NewJSON
                                })

                                if (Utilities.IsNotUndefinedOrNull(Arguments.SubArguments) || (!$(Arguments.TargetSelector).prop('multiple'))) {

                                    if (Utilities.IsUndefinedOrNull(Arguments.OldMatcherSearching) || (Utilities.IsUndefinedOrNull(Arguments.OldMatcherSearching) && Arguments.OldMatcherSearching != false)) {
                                        Utilities.Select2.OldMatcherSearching(Arguments.TargetSelector)
                                    }
                                }
                                $(Arguments.TargetSelector + ' option').first().attr('value', '')



                            }).fail(function (Data) {
                                $(Arguments.TargetSelector).empty()
                                $(Arguments.TargetSelector).append('<option value=' + '' + '>' + 'Select ' + Arguments.SourceText + ' First' + '</option>')

                            }).always(function (Data) {
                                if ($(Arguments.TargetSelector + ' option:not([value=""])').first().prop('selected', true).length > 0) {

                                    if (Utilities.IsNotUndefinedOrNull(Arguments.PreSelectedData) && $(Arguments.TargetSelector + ' option[value="' + Arguments.PreSelectedData[Arguments.PreSelectedDataIdField] + '"]:not([value=""])').length > 0) {
                                        $(Arguments.TargetSelector + ' option[value="' + Arguments.PreSelectedData[Arguments.PreSelectedDataIdField] + '"]:not([value=""])').first().prop('selected', true)//.trigger('change')

                                    } else {

                                        Utilities.SelectDropDownTextOptionElement(Arguments.TargetSelector, Arguments.DefaultOption)

                                    }
                                }
                                else {
                                    toastr.info('There are no ' + Arguments.TargetText + ' Available for this ' + Arguments.SourceText + '')
                                }


                                if (Utilities.IsNotUndefinedOrNull(Arguments.SubArguments) || (!$(Arguments.TargetSelector).prop('multiple'))) {
                                    Utilities.Select2.AJAXSelectList(Arguments.SubArguments)
                                }
                                else if ($(Arguments.TargetSelector).prop('multiple')) {

                                    $(Arguments.TargetSelector).select2('destroy');
                                }
                                else {
                                    if (Utilities.IsUndefinedOrNull(window.AJAXSelectListCounter) || window.AJAXSelectListCounter != 0) {
                                        window.AJAXSelectListCounter = 0
                                    }
                                    else
                                        window.AJAXSelectListCounter++
                                    $(Arguments.TargetSelector).trigger("select2:select");
                                }
                                $(Arguments.TargetSelector).change()
                                if (Utilities.IsNotUndefinedOrNull(window.CallBackFirstTime)) {
                                    if (window.CallBackFirstTime.length > 0) {

                                        window.PoppedFunction = window.CallBackFirstTime.shift();
                                        //if (Utilities.IsUndefinedOrNull(Arguments.SubArguments)) {
                                        //    window.CallBackFirstTime.push(PoppedFunction)
                                        //}
                                        PoppedFunction(Data);
                                    }
                                }
                                //$(Arguments.SourceSelector).select2('focus');

                            })
                        }
                        else {

                            $(Arguments.TargetSelector).empty()
                            $(Arguments.TargetSelector).append('<option value=' + '' + '>' + 'Select ' + Arguments.SourceText + ' First' + '</option>')
                            $(Arguments.TargetSelector).change()
                            $(Arguments.TargetSelector).trigger("select2:select");

                            ///Resolving Focus Start
                            if (Utilities.IsNotUndefinedOrNull(window.AJAXSelectListLastArguments) && Utilities.IsUndefinedOrNull(window.AJAXSelectListLastArguments.SubArguments)) {

                                if (Utilities.IsUndefinedOrNull(window.AJAXSelectListCounter)) {
                                    window.AJAXSelectListCounter = 0;
                                } else {
                                    window.AJAXSelectListCounter++;
                                }
                                if (Utilities.IsNotUndefinedOrNull(window.AJAXSelectListCounter) && window.AJAXSelectListCounter > 0) {
                                    if (Utilities.IsNotUndefinedOrNull(window.FirstSelectedAJAXSelectList)) {




                                        setTimeout(function () {
                                            if (Utilities.IsNotUndefinedOrNull(window.FirstSelectedAJAXSelectList)) {
                                                console.log('u focus 2')
                                                window.FirstSelectedAJAXSelectList.select2('focus')
                                                window.FirstSelectedAJAXSelectList = undefined
                                            }
                                        }, 70);
                                    }
                                }
                            }
                            ///Resolving Focus End

                        }
                    })
                    $(Arguments.SourceSelector).trigger("select2:select");




                    $(document).ready(function () {

                        if (Utilities.IsNotUndefinedOrNull(Arguments) && Utilities.Isfunction(Arguments.CallBackFirstTime)) {
                            window.AJAXSelectListCallBackFirstTime = false;
                            Arguments.CallBackFirstTime()
                            Arguments.CallBackFirstTime = undefined
                        }
                    })
                    ///Resolving Focus Start
                    if (Utilities.IsUndefinedOrNull(Arguments.SubArguments)) {
                        $(Arguments.TargetSelector).off("select2:close");
                        $(Arguments.TargetSelector).on("select2:close", function () {

                            if (Utilities.IsNotUndefinedOrNull(window.AJAXSelectListCounter) && ++window.AJAXSelectListCounter > 0) {
                                if (Utilities.IsNotUndefinedOrNull($(this))) {

                                    window.LastLeafAJAXSelectList = $(this)

                                    setTimeout(function () {
                                        console.log('u focus 3')
                                        window.LastLeafAJAXSelectList.select2('focus')
                                    }, 70);
                                }
                            }
                        })
                        $(Arguments.SourceSelector).off("select2:close");
                        $(Arguments.SourceSelector).on("select2:close", function () {

                            if (Utilities.IsNotUndefinedOrNull(window.AJAXSelectListCounter) && ++window.AJAXSelectListCounter > 0) {
                                if (Utilities.IsNotUndefinedOrNull($(this))) {

                                    window.LastLeafAJAXSelectList = $(this)

                                    setTimeout(function () {
                                        console.log('u focus 4')
                                        window.LastLeafAJAXSelectList.select2('focus')
                                    }, 70);
                                }
                            }
                        })
                    }
                    ///Resolving Focus End
                }

            },
        },
        this.String = {
            Insert: function (TargetString, index, stringToInsert) {
                return TargetString.substr(0, index) + stringToInsert + TargetString.substr(index);
            },
            NumberWithCommas: function (x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        },
        this.HTML = {
            PrintInModal: function (Arguments) {///Arguments.URL
                ///Arguments.PrintOnLoad {bool} 
                window.PrintInModaldialog = bootbox.dialog({
                    onEscape: true,
                    size: 'large',
                    message: '<iframe style="width:100%" id="PrintFrame" name="PrintFrame" src="' + Arguments.URL + '" frameborder="0" allowtransparency="true"></iframe>',
                    buttons: {
                        Close: {
                            label: 'Close',
                            //className: 'btn-success'
                        },
                        Print: {
                            label: 'Print',
                            callback: function (e) {
                                window.frames["PrintFrame"].focus();
                                window.frames["PrintFrame"].print();
                                return false;
                            }
                        },

                    }
                });
                PrintInModaldialog.init(function () {
                    Utilities.AssureItIsDone(function () {
                        $('.modal iframe#PrintFrame').css('height', window.innerHeight - 170)
                    })
                    if (Arguments.PrintOnLoad) {
                        if (Arguments.CloseModelAfterMiliSeconds > 0) {
                            setTimeout(function () { PrintInModaldialog.modal('hide') }, Arguments.CloseModelAfterMiliSeconds);
                        }
                        window.frames["PrintFrame"].focus();
                        window.frames["PrintFrame"].print();
                    }

                });

            },
            RunningTimer: function () {/// InComplete
                var RunningTimer = []
                this.Start = function (Selector = '.RunningTimer', ToAttr = 'text') {
                    RunningTimer.push({

                        Selector: Selector,
                        ToAttr: ToAttr,
                        setInterval: setInterval(function () {

                            $(Selector).each(function (Index, Element) {
                                //$(Element).text(moment.utc(moment.duration($(Element).text()).add(1, 's')._milliseconds).format("HH:mm:ss"))
                                if (ToAttr == 'text') {
                                    $(Element).text(parseInt(moment.duration($(Element).text()).add(1, 's').asHours()) + ':' + moment.utc(moment.duration($(Element).text()).add(1, 's')._milliseconds).format("m:s"))
                                } else {
                                    $(Element).attr(ToAttr, parseInt(moment.duration($(Element).attr(ToAttr)).add(1, 's').asHours()) + ':' + moment.utc(moment.duration($(Element).attr(ToAttr)).add(1, 's')._milliseconds).format("m:s"))
                                }
                            })


                        }, 1000)


                    })


                },
                    this.Stop = function (Selector = '.RunningTimer', ToAttr = 'text') {

                    },
                    this.Reset = function (Selector = '.RunningTimer', ToAttr = 'text') {
                        $(Selector).each(function (Index, Element) {
                            //$(Element).text(moment.utc(moment.duration($(Element).text()).add(1, 's')._milliseconds).format("HH:mm:ss"))
                            if (ToAttr == 'text') {
                                $(Element).text('0:0:0')
                            } else {
                                $(Element).attr(ToAttr, '0:0:0')
                            }
                        })
                    }
            },
            RemoteSearhcableList: function (ArgumentsRemoteSearhcableList) {

                if (window.RemoteSearhcableListRegister == undefined) {
                    window.RemoteSearhcableListRegister = []
                }
                window.RemoteSearhcableListRegister[ArgumentsRemoteSearhcableList.ElementSearchSelector] = {}
                window.RemoteSearhcableListRegister[ArgumentsRemoteSearhcableList.ElementSearchSelector].AJAXRequestCount = 0
                window.RemoteSearhcableListRegister[ArgumentsRemoteSearhcableList.ElementSearchSelector].AJAXServedCount = 0
                window.RemoteSearhcableListRegister[ArgumentsRemoteSearhcableList.ElementSearchSelector].CurrentPageNumber = ArgumentsRemoteSearhcableList.RuntimeVariables.PageNumber;
                window.RemoteSearhcableListAJAXCall = function (ArgumentsRemoteSearhcableList, RemoteSearhcableListRegister, Init) {
                    if (Init == true) {
                        window.RemoteSearhcableListRegister[ArgumentsRemoteSearhcableList.ElementSearchSelector].CurrentPageNumber = ArgumentsRemoteSearhcableList.RuntimeVariables.PageNumber
                        if (window.RemoteSearhcableListRegister[ArgumentsRemoteSearhcableList.ElementSearchSelector].CurrentPageNumber < 1) {
                            window.RemoteSearhcableListRegister[ArgumentsRemoteSearhcableList.ElementSearchSelector].CurrentPageNumber = -1
                        }
                    }
                    var formData = new FormData();
                    formData.append('PageNumber', ++window.RemoteSearhcableListRegister[ArgumentsRemoteSearhcableList.ElementSearchSelector].CurrentPageNumber)
                    if (Utilities.IsUndefinedOrNull(ArgumentsRemoteSearhcableList.RuntimeVariables.PageLength)) {
                        ArgumentsRemoteSearhcableList.RuntimeVariables.PageLength = parseInt($(ArgumentsRemoteSearhcableList.ScrollAreaSelector).innerHeight() / 22) + 7
                    }
                    formData.append('PageLength', ArgumentsRemoteSearhcableList.RuntimeVariables.PageLength)
                    formData.append('SearchPattern', $(ArgumentsRemoteSearhcableList.ElementSearchSelector).val())
                    //  formData.append('doctorId', window.Model.DoctorId)
                    if (Utilities.IsNotUndefinedOrNull(ArgumentsRemoteSearhcableList.RuntimeVariables) && Utilities.IsNotUndefinedOrNull(ArgumentsRemoteSearhcableList.RuntimeVariables.Data)) {
                        for (var prop in ArgumentsRemoteSearhcableList.RuntimeVariables.Data) {
                            if (ArgumentsRemoteSearhcableList.RuntimeVariables.Data.hasOwnProperty(prop)) {
                                formData.append(prop, Utilities.Isfunction(ArgumentsRemoteSearhcableList.RuntimeVariables.Data[prop]) ? ArgumentsRemoteSearhcableList.RuntimeVariables.Data[prop]() : ArgumentsRemoteSearhcableList.RuntimeVariables.Data[prop]);
                            }
                        }
                    }
                    ++window.RemoteSearhcableListRegister[ArgumentsRemoteSearhcableList.ElementSearchSelector].AJAXRequestCount
                    $(ArgumentsRemoteSearhcableList.ProgressSpinner).removeClass(' fa fa-search').addClass('fa fa-spinner fa-spin  fa-fw margin-bottom')
                    $.ajax({
                        url: ArgumentsRemoteSearhcableList.RuntimeVariables.URL,
                        type: 'POST',
                        data: formData,
                        async: true,
                        cache: false,

                        contentType: false,
                        processData: false
                    }).done(function (ResultList) {
                        ArgumentsRemoteSearhcableList.AfterOperation(ResultList, ArgumentsRemoteSearhcableList);
                        if (ArgumentsRemoteSearhcableList.RuntimeVariables.ResultListName === undefined) {
                            window.RemoteSearhcableListRegister[ArgumentsRemoteSearhcableList.ElementSearchSelector].LastReceivedCount = ResultList.length;

                        } else
                            window.RemoteSearhcableListRegister[ArgumentsRemoteSearhcableList.ElementSearchSelector].LastReceivedCount = ResultList[ArgumentsRemoteSearhcableList.RuntimeVariables.ResultListName].length
                    }).always(function () {

                        var Percent = (++window.RemoteSearhcableListRegister[ArgumentsRemoteSearhcableList.ElementSearchSelector].AJAXServedCount / window.RemoteSearhcableListRegister[ArgumentsRemoteSearhcableList.ElementSearchSelector].AJAXRequestCount) * 100


                        if (Percent >= 100) {
                            $(ArgumentsRemoteSearhcableList.ProgressSpinner).removeClass('fa fa-spinner fa-spin  margin-bottom').addClass('fa fa-search fa-fw');
                            //console.log("ProgressPercentage")
                            //console.log(ArgumentsRemoteSearhcableList.ProgressPercentage)
                            $(ArgumentsRemoteSearhcableList.ProgressPercentage).find('.progress-bar').css('width', '100%');
                            $(ArgumentsRemoteSearhcableList.ProgressPercentage).css('visibility', 'hidden');
                            $(ArgumentsRemoteSearhcableList.ProgressPercentage).find('.progress-bar').css('width', '0%');

                        } else {
                            $(ArgumentsRemoteSearhcableList.ProgressPercentage).find('.progress-bar').css('width', parseInt(Percent + 1) + '%')
                            $(ArgumentsRemoteSearhcableList.ProgressPercentage).css('visibility', 'visible')
                            //$(ArgumentsRemoteSearhcableList.ProgressPercentage).text(parseInt(Percent + 1) + '%')
                        }
                    });
                    return window.RemoteSearhcableListRegister[ArgumentsRemoteSearhcableList.ElementSearchSelector];
                };

                window.RemoteSearhcableListRegister[ArgumentsRemoteSearhcableList.ElementSearchSelector].CurrentSearchPattern = ArgumentsRemoteSearhcableList.RuntimeVariables.SearchPattern;

                window.RemoteSearhcableListRegister[ArgumentsRemoteSearhcableList.ElementSearchSelector] = RemoteSearhcableListAJAXCall(ArgumentsRemoteSearhcableList, window.RemoteSearhcableListRegister[ArgumentsRemoteSearhcableList.ElementSearchSelector], true)

                if (!$(ArgumentsRemoteSearhcableList.ElementSearchSelector).hasClass('RemoteSearhcableListOnDoneTypingChangeBound')) {
                    $(ArgumentsRemoteSearhcableList.ElementSearchSelector).addClass('RemoteSearhcableListOnDoneTypingChangeBound');
                    Utilities.HTML.Events.OnDoneTyping(150, $(ArgumentsRemoteSearhcableList.ElementSearchSelector), function () {

                        window.RemoteSearhcableListRegister[ArgumentsRemoteSearhcableList.ElementSearchSelector].LastReceivedCount = -1;
                        window.RemoteSearhcableListRegister[ArgumentsRemoteSearhcableList.ElementSearchSelector].CurrentSearchPattern = ArgumentsRemoteSearhcableList.RuntimeVariables.SearchPattern;
                        window.RemoteSearhcableListRegister[ArgumentsRemoteSearhcableList.ElementSearchSelector] = RemoteSearhcableListAJAXCall(ArgumentsRemoteSearhcableList, window.RemoteSearhcableListRegister[ArgumentsRemoteSearhcableList.ElementSearchSelector], true);


                        //$('#MedicinesDiv .Medicines').each(function (Index, Element) {
                        //    if ($(Element).attr('searchText').toLowerCase().indexOf($('#Medicinesearch').val().toLowerCase()) == -1) {
                        //        $(Element).parent().slideUp();
                        //    }
                        //    else {
                        //        $(Element).parent().slideDown();
                        //    }
                        //});
                    });
                }

                Utilities.HTML.Events.OnDivBottomScrolled(ArgumentsRemoteSearhcableList.ScrollAreaSelector, function () {
                    if (window.RemoteSearhcableListRegister[ArgumentsRemoteSearhcableList.ElementSearchSelector].LastReceivedCount != 0) {
                        window.RemoteSearhcableListRegister[ArgumentsRemoteSearhcableList.ElementSearchSelector] = RemoteSearhcableListAJAXCall(ArgumentsRemoteSearhcableList, window.RemoteSearhcableListRegister[ArgumentsRemoteSearhcableList.ElementSearchSelector])
                    }
                }, 30);

            },
            PageBarCodeScanner: function (Arguments) {
                // only init when the page has loaded
                $(document).ready(function () {
                    // variable to ensure we wait to check the input we are receiving
                    // you will see how this works further down
                    var pressed = false;
                    // Variable to keep the barcode when scanned. When we scan each
                    // character is a keypress and hence we push it onto the array. Later we check
                    // the length and final char to ensure it is a carriage return - ascii code 13
                    // this will tell us if it is a scan or just someone writing on the keyboard
                    var chars = [];
                    var myVar = setInterval(myTimer, 1);
                    window.TestTimer = 0;
                    function myTimer() {

                        window.TestTimer++;
                    }
                    // trigger an event on any keypress on this webpage
                    $(window).keypress(function (e) {

                        // check the keys pressed are numbers
                        if ((e.which == 45 || (e.which >= 48 && e.which <= 57)
                            || (e.which >= 65 && e.which <= 90) || (e.which >= 97 && e.which <= 122)
                        )) {

                            // if a number is pressed we add it to the chars array
                            chars.push(String.fromCharCode(e.which));
                            console.log(window.TestTimer + ': ' + chars.join(""))
                        }
                        // debug to help you understand how scanner works
                        //console.log(e.which + ":" + chars.join("|"));
                        // Pressed is initially set to false so we enter - this variable is here to stop us setting a
                        // timeout everytime a key is pressed. It is easy to see here that this timeout is set to give 
                        // us 1 second before it resets everything back to normal. If the keypresses have not matched 
                        // the checks in the readBarcodeScanner function below then this is not a barcode
                        if (pressed == false) {
                            // we set a timeout function that expires after 1 sec, once it does it clears out a list 
                            // of characters 
                            setTimeout(function () {
                                // check we have a long length e.g. it is a barcode
                                if (chars.length >= 10) {

                                    // join the chars array to make a string of the barcode scanned
                                    var barcode = chars.join("");
                                    // debug barcode to console (e.g. for use in Firebug)
                                    //console.log("Barcode Scanned: " + barcode);
                                    window.LastBarCodeScanned = barcode;
                                    // assign value to some input (or do whatever you want)

                                    if (Utilities.Isfunction(Arguments.TextBoxSelector)) {
                                        if (Utilities.IsNotUndefinedOrNull(Arguments.TextBoxSelector())) {
                                            $(Arguments.TextBoxSelector()).val(barcode);
                                        }

                                    }
                                    else {
                                        if (Utilities.IsNotUndefinedOrNull(Arguments.TextBoxSelector)) {
                                            $(Arguments.TextBoxSelector).val(barcode);
                                        }
                                    }
                                    if (Utilities.Isfunction(Arguments.Callback)) {
                                        Arguments.Callback()
                                    }
                                }
                                chars = [];
                                pressed = false;
                            }, 77);
                        }
                        // set press to true so we do not reenter the timeout function above
                        pressed = true;
                    });
                });
                // this bit of code just ensures that if you have focus on the input which may be in a form
                // that the carriage return does not cause your form to be submitted. Some scanners submit
                // a carriage return after all the numbers have been passed.
                $("#barcode").keypress(function (e) {
                    if (e.which === 13) {
                        //console.log("Prevent form submit.");
                        e.preventDefault();
                    }
                });

            },
            Sort: {
                SelectOptions: function (SelectElementSelector) {
                    var my_options = $(SelectElementSelector + " option");
                    var selected = $(SelectElementSelector).val();

                    my_options.sort(function (a, b) {
                        return a.text.localeCompare(b.text);//Sorting non-english languages
                    });

                    $(SelectElementSelector).empty().append(my_options);
                    $(SelectElementSelector).val(selected);
                }
            },
            Events: {
                OnDivBottomScrolled: function (Selector, AfterOperation, Percentage = 100) {
                    jQuery(
                        function ($) {
                            window.ConditionTrue = 0;
                            if (!$(Selector).hasClass('bindScroll')) {
                                $(Selector).addClass('bindScroll').on('scroll', function () {
                                    if ($(this).scrollTop() >= (((($(this)[0].scrollHeight - $(this).innerHeight()) * Percentage) / 100))) {//If Scrolled To Bottom
                                        window.ConditionTrue++

                                        if (Utilities.Isfunction(AfterOperation)) {
                                            AfterOperation();
                                        }
                                    }
                                    //console.log((($(this)[0].scrollHeight * Percentage) / 100).toString() + '%')
                                    //console.log("$(this).scrollTop() >= (($(this)[0].scrollHeight - $(this).innerHeight() * Percentage) / 100)")
                                    //console.log($(this).scrollTop() + ' >= ' + '((' + $(this)[0].scrollHeight + ' - '+ $(this).innerHeight() + '*' + Percentage + ') /' + 100 + ')')
                                    //console.log($(this).scrollTop() + ' >= ' + ((($(this)[0].scrollHeight - $(this).innerHeight()) * Percentage) / 100))
                                    //console.log('Condition True: ' + window.ConditionTrue)

                                });
                            }
                        }
                    );
                },
                OnDoneTyping: function (WaitTime, FieldSelector, OnDoneFunction, CallBackFunction, AfterHit) {
                    var ButtonKeys = { "EnterKey": 13 };
                    var typingTimer;                //timer identifier
                    var doneTypingInterval = WaitTime;  //time in ms, 5 second for example
                    var $input = $(FieldSelector);

                    //on keyup, start the countdown

                    //                    if (!$input.hasClass('OnDoneTypingChangeBound')) {
                    $input.on('propertychange change keyup input paste').on('propertychange change keyup input paste', function (e) {
                        if (Utilities.Isfunction(AfterHit)) {
                            AfterHit();
                        }
                        if (e.which === Enumerators.KeyCodes.enter) {
                            doneTyping();
                        }
                        else {
                            clearTimeout(typingTimer);
                            typingTimer = setTimeout(doneTyping, doneTypingInterval);
                        }

                    });
                    //}

                    //on keydown, clear the countdown 
                    //if (!$input.hasClass('OnDoneTypingKeyDownBound')) {
                    $input.on('keydown', function () {
                        clearTimeout(typingTimer);
                    });
                    //}

                    //user is "finished typing," do something
                    function doneTyping() {
                        var doneTypingPromise = new Promise((resolve, reject) => {
                            // We call resolve(...) when what we were doing async succeeded, and reject(...) when it failed.
                            // In this example, we use setTimeout(...) to simulate async code. 
                            // In reality, you will probably be using something like XHR or an HTML5 API.
                            OnDoneFunction();
                            resolve("Success!"); // Yay! Everything went well!
                        });

                        doneTypingPromise.then((successMessage) => {
                            // successMessage is whatever we passed in the resolve(...) function above.
                            // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
                            try {
                                if (Utilities.Isfunction(CallBackFunction())) {
                                    CallbackFunction();
                                }
                            } catch (e) {

                            }
                        });

                    }
                },
            },
            Input: {
                TakeOnlyInt: function (Event) {

                    var keycode = event.which;

                    if (!((event.shiftKey == false || (event.shiftKey == true && keycode == 0)) && ((event.shiftKey == true && keycode == 0) || keycode == 0 || keycode == 8 || keycode == 37 || keycode == 39 || (keycode >= 48 && keycode <= 57)))) {
                        $(this).siblings('.err').text('Only Numbers are allowed')
                        $(this).siblings('.err').css('display', '')
                        event.preventDefault();
                    }
                    else {
                        $(this).siblings('.err').text('')
                        $(this).siblings('.err').css('display', 'none')
                    }

                }
            }
        },
        this.JavaScript = {
            JQuery: {
                GetElementSelector: function (Element) {
                    var selector = $(Element)
                        .parents()
                        .map(function () { return this.tagName; })
                        .get()
                        .reverse()
                        .concat([this.nodeName])
                        .join(">");

                    var id = $(Element).attr("id");
                    if (id) {
                        selector += "#" + id;
                    }

                    var classNames = $(Element).attr("class");
                    if (classNames) {
                        selector += "." + $.trim(classNames).replace(/\s/gi, ".");
                    }
                    selector = $.trim(selector).replace(/\.\./gi, ".");
                    return selector;
                }

            },
            JSON: {

                Clone: function (obj) {
                    /*
                     * JSONfn v1.1.0
                     * (c) 2013 - 2016 Vadim Kiryukhin; vkiryukhin @ gmail.com; http://www.eslinstructor.net/jsonfn/
                     * License: MIT
                     */
                    (function (a) {
                        a.stringify = function (a) { return JSON.stringify(a, function (a, b) { var d; return b instanceof Function || "function" == typeof b ? (d = b.toString(), 8 > d.length || "function" !== d.substring(0, 8) ? "_NuFrRa_" + d : d) : b instanceof RegExp ? "_PxEgEr_" + b : b }) }; a.parse = function (a, f) {
                            var b = f ? /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/ : !1; return JSON.parse(a, function (a, c) {
                                var e; if ("string" != typeof c || 8 > c.length) return c; e = c.substring(0, 8); return b && c.match(b) ? new Date(c) : "function" === e ? eval("(" + c +
                                    ")") : "_PxEgEr_" === e || "_NuFrRa_" === e ? eval(c.slice(8)) : c
                            })
                        }; a.clone = function (g, f) { return a.parse(a.stringify(g), f) }
                    })("undefined" === typeof exports ? window.JSONfn = {} : exports);

                    return JSONfn.parse(JSONfn.stringify(obj));
                },
                GetKeyFromValue: function (obj, value) {
                    for (key in obj) {
                        if (obj[key] == value) {
                            return key;
                        }
                    }

                }
            },
            FormElementToJSON: function (FormElement) {
                ///Example Usage
                ///var ReceivedJSON = FormDataToJSON(document.getElementById('FormId');)	
                var formData = new FormData(FormElement), ConvertedJSON = {};
                for (const [key, value] of formData.entries()) {
                    ConvertedJSON[key] = value;
                }

                return ConvertedJSON
            },
            FormDataToJSON: function (formData) {
                ///Example Usage
                ///var ReceivedJSON = FormDataToJSON(document.getElementById('FormId');)	

                for (const [key, value] of formData.entries()) {
                    ConvertedJSON[key] = value;
                }

                return ConvertedJSON
            }
        },
        this.Calendar = {
            CheckWeekDaysOn: function (ListWeeks) {
                var BooleanWeekDays = jQuery.extend({}, Enumerators.System.WeekDaysBoolean)
                $.each(ListWeeks, function (Index, Element) {
                    $.each(Element, function (WeekdaysIndex, WeekdaysElement) {
                        if (WeekdaysElement == true) {
                            BooleanWeekDays[WeekdaysIndex] = true
                        }
                    })
                })
                return BooleanWeekDays
            },
            CheckWeekDaysOff: function (ListWeeks) {
                var BooleanWeekDays = jQuery.extend({}, Enumerators.System.WeekDaysBoolean)
                $.each(BooleanWeekDays, function (Index, Element) { BooleanWeekDays[Index] = true })
                $.each(ListWeeks, function (Index, Element) {
                    $.each(Element, function (WeekdaysIndex, WeekdaysElement) {
                        if (WeekdaysElement == true) {
                            BooleanWeekDays[WeekdaysIndex] = false
                        }
                    })
                })
                return BooleanWeekDays
            }
        },
        this.ShowResponseMessagesFromServer = function (DataOrMessages, Success = true) {

            if (Utilities.IsNotUndefinedOrNull(DataOrMessages)) {
                if ($.isArray(DataOrMessages.Messages)) {
                    $(DataOrMessages.Messages).each(function (Index, Element) {
                        if (DataOrMessages.Success)
                            (Utilities.IsUndefinedOrNull(Element) ? toastr.success('Success') : toastr.success(Element));
                        else
                            (Utilities.IsUndefinedOrNull(Element) ? toastr.error('Failed') : toastr.error(Element))
                    })
                } else {
                    if (DataOrMessages.Success)
                        (Utilities.IsUndefinedOrNull(DataOrMessages.Messages) ? toastr.success('Success') : toastr.success(DataOrMessages.Messages))
                    else
                        (Utilities.IsUndefinedOrNull(DataOrMessages.Messages) ? toastr.error('Failed') : toastr.error(DataOrMessages.Messages))
                }
            }
            else {
                if ($.isArray(DataOrMessages)) {
                    $(DataOrMessages).each(function (Index, Element) {
                        if (Success)
                            (Utilities.IsUndefinedOrNull(Element) ? toastr.success('Success') : toastr.success(Element));
                        else
                            (Utilities.IsUndefinedOrNull(Element) ? toastr.error('Failed') : toastr.error(Element))

                    })
                } else {
                    if (DataOrMessages.constructor === {}.constructor) {
                        if (Success)
                            (Utilities.IsUndefinedOrNull(DataOrMessages.Messages) ? toastr.success('Success') : toastr.success(DataOrMessages.Messages))
                        else
                            (Utilities.IsUndefinedOrNull(DataOrMessages.Messages) ? toastr.error('Failed') : toastr.error(DataOrMessages.Messages))
                    } else {
                        if (Success)
                            (Utilities.IsUndefinedOrNull(DataOrMessages) ? toastr.success('Success') : toastr.success(DataOrMessages))
                        else
                            (Utilities.IsUndefinedOrNull(DataOrMessages) ? toastr.error('Failed') : toastr.error(DataOrMessages))
                    }


                }
            }
        },
        this.AssureItIsDone = function (FunctionObject, CallBack) {

            if (Utilities.Isfunction(FunctionObject)) {

                try {
                    FunctionObject()
                    //setTimeout(function () {
                    //    FunctionObject()
                    //}, 1)
                    //setTimeout(function () {
                    //    FunctionObject()
                    //}, 3)
                    //setTimeout(function () {
                    //    FunctionObject()
                    //}, 7)
                    //setTimeout(function () {
                    //    FunctionObject()
                    //}, 30)
                    //setTimeout(function () {
                    //    FunctionObject()
                    //}, 70)
                    //setTimeout(function () {
                    //    FunctionObject()
                    //}, 100)
                    //setTimeout(function () {
                    //    FunctionObject()
                    //}, 300)
                    //setTimeout(function () {
                    //    FunctionObject()
                    //}, 500)
                    setTimeout(function () {
                        FunctionObject()
                        if (Utilities.Isfunction(CallBack)) {
                            CallBack();
                        }
                    }, 700)
                } catch (e) {

                }
            }
        },
        this.GetObjects = function (obj, key, val) {
            var objects = [];
            for (var i in obj) {
                if (!obj.hasOwnProperty(i)) continue;
                if (typeof obj[i] == 'object') {
                    objects = objects.concat(Utilities.GetObjects(obj[i], key, val));
                } else if (i == key && obj[key] == val) {
                    objects.push(obj);
                }
            }
            return objects;
        },
        this.MenuPrefetch = function (Selector, SpecificPathName) {
            if (Utilities.IsUndefinedOrNull(SpecificPathName)) {
                SpecificPathName = window.location.pathname;
            }
            if (Utilities.IsNotUndefinedOrNull(window.location) && Utilities.IsNotUndefinedOrNull(SpecificPathName) && SpecificPathName.constructor === Array) {
                $.each(SpecificPathName, function (Index, Element) {
                    if (Element == window.location.pathname) {
                        $(Selector + " li a").each(function (a, b) {
                            if (Utilities.IsNotUndefinedOrNull($(b).attr("href"))) {
                                var ToBeFetched = $(b).attr("href");
                                $.get(ToBeFetched)

                                if (Utilities.IsNotUndefinedOrNull(Enumerators.SubPreFetchFor[ToBeFetched]) && Enumerators.SubPreFetchFor[ToBeFetched].constructor === Array) {
                                    $.each(Enumerators.SubPreFetchFor[ToBeFetched], function (Index, SubPreFetchForElement) {
                                        $.get(ToBeFetched + SubPreFetchForElement);
                                    })

                                }
                            }
                        });

                    }
                })
            }
            else if (Utilities.IsNotUndefinedOrNull(window.location) && SpecificPathName == window.location.pathname)
                $(Selector + " li a").each(function (a, b) { Utilities.IsNotUndefinedOrNull($(b).attr("href")) ? $.get($(b).attr("href")) : "" });

        },
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
                        //console.log($(Element).text().trim() + " " + $(Element).val().trim())
                        $(Selector).val($(Element).val())
                        //$(Selector).trigger('change').trigger('select2:select')
                        return false;
                    }
                    else if ($(Element).val() == StringToSelectDropDownTextOptionElement.trim()) {
                        $(Selector).val(StringToSelectDropDownTextOptionElement)
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
            if (event.shiftKey == true && keycode == 37) {
                $(this).siblings('.err').text('Only alphabets are allowed')
                $(this).siblings('.err').css('display', '')
                event.preventDefault();
            }
            else if ((!(keycode == 0 || keycode == 46 || keycode == 8 || keycode == 37 || keycode == 39 || (keycode === 16) || (keycode >= 65 && keycode <= 90) || (keycode == 32) || (keycode >= 97 && keycode <= 122)))) {
                $(this).siblings('.err').text('Only alphabets are allowed')
                $(this).siblings('.err').css('display', '')
                event.preventDefault();
            }
            else {
                $(this).siblings('.err').text('')
                $(this).siblings('.err').css('display', 'none')
            }

        }, this.TakeOnlyNormalValidInput = function (input) {

            var regex = /[^a-z A-Z 0-9-,_+/\\'.&\sa-z ]/gi;
            input.value = input.value.replace(regex, "");
        }, this.TakeOnlyAlphaNumerics = function (event) {

            var keycode = event.which;
            //if (event.shiftKey == true && keycode == 37) {
            //    $(this).siblings('.err').text('Only alphabets are allowed')
            //    $(this).siblings('.err').css('display', '')
            //    event.preventDefault();
            //}
            if ((!((keycode >= 65 && keycode <= 90) || (keycode >= 97 && keycode <= 122) || (keycode >= 48 && keycode <= 57) || keycode == 16 || (keycode == 32)))) {
                $(this).siblings('.err').text('Only alphabets are allowed')
                $(this).siblings('.err').css('display', '')
                event.preventDefault();
            }
            else {
                $(this).siblings('.err').text('')
                $(this).siblings('.err').css('display', 'none')
            }
        },

        this.TakeOnlyInputNumbersOnlyOneDot = function (event, StringValue) {
            ///Check If String Already Has Value Has A Dots Then Prevent Default

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
        this.TakeOnlyInputNumbers = function (event) {
            var keycode = event.which;

            if (!((event.shiftKey == false || (event.shiftKey == true && keycode == 0)) && ((event.shiftKey == true && keycode == 0) || keycode == 0 || keycode == 46 || keycode == 8 || keycode == 37 || keycode == 39 || (keycode >= 48 && keycode <= 57)))) {
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
        this.IsNavigationKey = function (KeyCode) {
            var IsNavigationKey = false;
            switch (KeyCode) {
                case 46:
                    IsNavigationKey = true;
                    break;
                case 45:
                    IsNavigationKey = true;
                    break;
                case 27:
                    IsNavigationKey = true;
                    break;
                case 9:
                    IsNavigationKey = true;
                    break;
                default: {
                    if (KeyCode >= 33 && KeyCode <= 40) {
                        IsNavigationKey = false;
                    }
                    else
                        IsNavigationKey = false;
                }
            }
            return IsNavigationKey;
        },
        this.IsEven = function (n) {
            return n % 2 == 0;
        },
        this.IsOdd = function (n) {
            return Math.abs(n % 2) == 1;
        },
        this.DateTimeClock = function (Selector) {

            if ($(Selector).length > 0) {
                $(Selector).text(moment().format("dddd DD MMMM YYYY hh:mm A "));
                setInterval(function () {
                    if (Utilities.IsEven(moment().format("ss"))) {

                        $(Selector).text(moment().format("dddd DD MMMM YYYY hh mm A "))
                    }
                    else {

                        $(Selector).text(moment().format("dddd DD MMMM YYYY hh:mm A "))
                    }

                }, 1000)
            }

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
                    //(Index + ". " + Element + " " + Element.length)
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
            var a = SecondMoment;
            var b = FirstMoment;

            var years = a.diff(b, 'year');
            b.add(years, 'years');

            var months = a.diff(b, 'months');
            b.add(months, 'months');

            var days = a.diff(b, 'days');

            var CalculatedDaysMonthYears = years + ' years ' + months + ' months ' + days + ' days'
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

        },
        this.IsStringifiedJSON = function (data) {
            var isJson = false
            try {
                // this works with JSON string and JSON object, not sure about others
                var json = $.parseJSON(data);
                isJson = typeof json === 'object';
            } catch (ex) {
                console.error('data is not Stringified JSON');
            }
            return isJson;
        }
    this.uuidv4 = function () {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
    }
    this.guid = function () {
        return Utilities.uuidv4();
    }
}

export { Utils }
/// Thank You