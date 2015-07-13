function onInstall(){
  
  onOpen();
   
}

function onOpen(){
var spreadsheet = SpreadsheetApp.getActive();
  
    SpreadsheetApp.getUi().createAddonMenu()
    .addItem('Start', 'openSidebar')
    .addSeparator()
      .addItem('Help', 'openHelp')
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


function openHelp() {

}

function getSheets() {
  var spreadsheet = SpreadsheetApp.getActive();
  var sheets = spreadsheet.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    sheets[i] = sheets[i].getName();
    
  }
  return sheets;
  
}

function gsActOnSelected(sheetNames, action) {
  var spreadsheet = SpreadsheetApp.getActive();
  switch(action) {
    case 'delete':
        for (var i = 0; i < sheetNames.length; i++) {
          spreadsheet.deleteSheet(spreadsheet.getSheetByName(sheetNames[i]));
        }
        break;
    case 'protect':
        for (var i = 0; i < sheetNames.length; i++) {
          spreadsheet.getSheetByName(sheetNames[i]).protect();
        }
        break;
    case 'hide':
      for (var i = 0; i < sheetNames.length; i++) {
          spreadsheet.getSheetByName(sheetNames[i]).hideSheet();
        }
      break;
    case 'unhide':
      for (var i = 0; i < sheetNames.length; i++) {
          spreadsheet.getSheetByName(sheetNames[i]).showSheet();
        }
      break;
    case 'unprotect':
       for (var i = 0; i < sheetNames.length; i++) {
          spreadsheet.getSheetByName(sheetNames[i]).getProtections(SpreadsheetApp.ProtectionType.SHEET)[0].remove();
        }
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