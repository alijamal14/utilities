Salaamun Alekum

# Utilities
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Falijamal14%2FUtilities.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Falijamal14%2FUtilities?ref=badge_shield)

# Version 12
* Major Changes To Structure Of Code
* Added Object 'Enumerators'
  * Added Object 'System'
    * Added Object 'WeekDaysBoolean'
      * Added Function 'TrueWeekDaysBoolean'
* Added Object 'DataTable'
  * Added Object 'Fix'
    * Added Function 'DateTimeSorting'
* Added Object 'BootstrapValidator'
  * Added Function 'RemoteValidatingCallBack'
* Added Object 'SelectPicker'
  * Added Function UpdateDDL'
  * Added Function 'AJAXAddSelectPickerItem'
* Added Object 'Select2'
  * Added Function 'OldMatcherSearching'
  * Added Function 'AJAXSelectList'
* Added Object 'String'
  * Added Function 'Insert'
  * Added Function 'NumberWithCommas'
* Added Object 'HTML'
  * Added Function 'PageBarCodeScanner'
  * Added Object 'Sort'
    * Added Function 'SelectOptions'
  * Added Function 'Events'
    * Added Function 'DoneTyping'
  * Added Object 'Input'
    * Added Function 'TakeOnlyInt'
* Added Object 'JavaScript'
  * Added Object 'JSON'
    * Added Function 'Added Function '
  * Added Function 'FormElementToJSON'
  * Added Function 'FormDataToJSON'
  * Added Object 'Calendar'
    * Added Function 'CheckWeekDaysOn'
    * Added Function 'CheckWeekDaysOff'
* Added Function 'AssureItIsDone'
* Added Function 'GetObjects'
* Added Function 'MenuPrefetch'
* Added Function 'IsABootstrapModalOpen'
* Added Function 'WeekDaysBooleanToDaysOfWeeksArray'
* Added Function 'DaysOfWeeksArrayToWeekDaysBoolean'
* Added Function 'IsISODate'
* Modified Function 'SelectDropDownTextOptionElement'
* Modified Function 'AlphabetOnly'
* Added Function 'TakeOnlyInputNumbersOnlyOneDot'
* Modified Function 'TakeOnlyInputNumbers'
* Added Function 'IsNavigationKey'
* Modified Function 'DateTimeClock'
* Added Function 'IsStringifiedJSON'

## Version 11

- Added Function 'AJAXSelectList'

**Note:** *Always Include First 'Enumerators.js' And 'Messages.js' Before Utilities.js Thank You*

* Added 
  * Files
    * Enumerators.js
      * Some Of Most Frequently Used Enumerators
    * Messages.js
      * Some Of Most Frequently Used Messages. These Message Are Divded In Four Success, Warnings, Error, Information Thank You
        *Function 
    * IsABootstrapModalOpen
      * Checks If Any Bootstrap Modal Is Open
    * WeekDaysBooleanToDaysOfWeeksArray
      * Convert WeekDays Boolean Instance (Used In Enumerators.js) To Array Days Of Week Where Sunday is 0 And Saturaday Is 6
    * DaysOfWeeksArrayToWeekDaysBoolean
      * Convert To Array Where Sunday is 0 And Saturaday Is 6 To WeekDays Boolean Instance (Used In Enumerators.js)
    * IsISODate
      * Checks If Given Date Is In ISO Date Format (ISO 8601) 
* Updated 
  * Function
    * AJAXSelectList
      * Fixed ' AJAXSelectList ' In Bootstrap Modal 
      * Added
        * 'async' Feature
          * Default Async True Else Take 'async' Value From 'Arguments'
        * Argument 'ReturnObjectName' 
          * 'ReturnObjectName' Is The Name Object From Server Side In Which List Of Dropdown Is Placed 
            * Type Is String Give String Name To Define 'ReturnObjectName'
            * Default Value Of 'ReturnObjectName' Is 'List'
        * Default 'option' 
          * id = ''
          * text = 'Please Select'
    * SelectDropDownTextOptionElement
      * Fixed For Select2.js
    * ScrollTo
      * Increased Animation Time From 30 To 300
    * PascalCaseSpacesElement
      * Added Class To Elements ' PascalCaseSpacesElement '
    * IsUndefinedOrNull
      * Fixed Value !== ''
* Thank You <3 [Smile]


## Version 10
* Added Function 'AJAXSelectList'
   * This Function Is Based On Select2 So Include Select2.js Before Using This Function
* Updated 'SelectDropDownTextOptionElement'
   * Now It Returns Selector
   * Sting Are Trimed Inside 
* Updated 'TakeOnlyInputNumbers'

Thank You

***


##Version 1
* Minor Updates

Thank You
Welcome to the Utilities wiki!


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Falijamal14%2FUtilities.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Falijamal14%2FUtilities?ref=badge_large)