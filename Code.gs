function onInstall(){
  onOpen();   
}

function onOpen(){

    SpreadsheetApp.getUi().createAddonMenu()
    .addItem('Manage Sheets', 'openSidebar')
    .addToUi();
    
}

function openSidebar() {
  
  var html = HtmlService.createHtmlOutputFromFile('SheetManager')
  .setTitle('Bulk Sheet Manager')
      .setWidth(300)
  .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html);
 
}


function getSheets() {
  var protection;
  var spreadsheet = SpreadsheetApp.getActive();
  var sheets = spreadsheet.getSheets();
  for (var i = 0; i < sheets.length; i++) {
     protection = sheets[i].getProtections(SpreadsheetApp.ProtectionType.SHEET).length >= 1 ? true : false; 
    sheets[i] = {name: sheets[i].getName(), hidden: sheets[i].isSheetHidden(), protected: protection};    
  }
  return sheets;
}

function gsActOnSelected(sheetNames, action) {
  var spreadsheet = SpreadsheetApp.getActive();
  
  switch(action) {
    case 'Deleting':
      var confirmationMessage = sheetNames.length == 1 ? 'Are you sure you want to delete this sheet?' : 'Are you sure you want to delete these sheets?'; 
      var returningAction = {word:'deleted', completed:true};
        var sheet;
          for (var i = 0; i < sheetNames.length; i++) {
            sheet = spreadsheet.getSheetByName(sheetNames[i]);
            if (sheet != null) {
              spreadsheet.deleteSheet(sheet);
            }
          }
        return returningAction;
        break;
    case 'Protecting':
      var returningAction = {word:'protected', completed:true}
        for (var i = 0; i < sheetNames.length; i++) {
          spreadsheet.getSheetByName(sheetNames[i]).protect();
        }
      return returningAction;
        break;
    case 'Hiding':
      var sheet;
      var returningAction = {word:'hidden', completed:true}
      for (var i = 0; i < sheetNames.length; i++) {
          sheet = spreadsheet.getSheetByName(sheetNames[i]);
          if (sheet.isSheetHidden() == true) {
            action.completed = false; 
          }
          else {
            sheet.hideSheet();
          }
        }
      return returningAction;
      break;
    case 'Unhiding':
      var returningAction = {word:'unhidden', completed:true}
      for (var i = 0; i < sheetNames.length; i++) {
          spreadsheet.getSheetByName(sheetNames[i]).showSheet();
        }
      return returningAction;
      break;
    case 'Unprotecting':
      var protection;
      var returningAction = {word:'unprotected', completed:true}
      for (var i = 0; i < sheetNames.length; i++) {
        protection = spreadsheet.getSheetByName(sheetNames[i]).getProtections(SpreadsheetApp.ProtectionType.SHEET)[0];
        if (protection != undefined) {
          protection.remove();
        }
      }
      return returningAction;
      break;
  }
  
}

function gsSheetGetFail() {
  var formName = FormApp.openByUrl(SpreadsheetApp.getActiveSpreadsheet().getFormUrl()).getTitle();
  var ui = SpreadsheetApp.getUi()
    ui.alert(
     'Sheet retrieval error',
      'Your sheets could not be retrieved. Please close this dialog and try again. If this issue persists, please report the issue via Add-ons > Bulk Sheet Manager > Help',
      ui.ButtonSet.OK)
}
function debug () {
  
  SpreadsheetApp.getActiveSpreadsheet().toast('Task started'); 
}