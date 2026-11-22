/**
 * Belleva · Bridal pipeline (Google Apps Script, bound to a Google Sheet)
 *
 * The website POSTs every new bridal sign-up here; this adds a row to the
 * "Bridal pipeline" tab. Setup steps: docs/bridal-sheet/README.md
 *
 * Script property required: SECRET (must match BRIDAL_SHEET_SECRET on the website).
 */

const SHEET_NAME = "Bridal pipeline";
const HEADERS = [
  "Received",
  "Name",
  "Phone",
  "Wedding date",
  "Days to wedding",
  "Would like to come in",
  "Dress colour",
  "The look she wants",
  "Party",
  "Anything else",
  "Status",
  "Tech",
  "Trial date",
  "Wedding set date",
  "Salon notes",
];
const STATUSES = [
  "New",
  "Texted",
  "Trial booked",
  "Trial done",
  "Wedding set booked",
  "Done",
  "Review asked",
  "Not going ahead",
];

/** Called by the website for each sign-up. */
function doPost(e) {
  const data = JSON.parse(e.postData.contents || "{}");
  const secret = PropertiesService.getScriptProperties().getProperty("SECRET");
  if (!secret || data.secret !== secret) {
    return ContentService.createTextOutput("forbidden");
  }
  const sheet = getSheet_();
  sheet.appendRow([
    new Date(data.receivedAt || Date.now()),
    String(data.firstName || ""),
    // leading apostrophe keeps phone numbers as text
    "'" + String(data.phone || ""),
    data.weddingDate ? new Date(data.weddingDate + "T12:00:00") : "",
    "",
    data.visitDate ? new Date(data.visitDate + "T12:00:00") : "",
    String(data.dressColor || ""),
    String(data.designIdea || ""),
    data.partySize || "",
    String(data.note || ""),
    "New",
  ]);
  const row = sheet.getLastRow();
  sheet.getRange(row, 5).setFormulaR1C1('=IF(R[0]C[-1]="","",R[0]C[-1]-TODAY())');
  return ContentService.createTextOutput("ok");
}

/** Run once from the editor (Run → setup) to create the tab, headers, menus and colours. */
function setup() {
  const sheet = getSheet_();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight("bold");
  sheet.setFrozenRows(1);
  sheet.getRange("A2:A").setNumberFormat("mmm d, h:mm am/pm");
  sheet.getRange("D2:D").setNumberFormat("ddd mmm d, yyyy");
  sheet.getRange("F2:F").setNumberFormat("ddd mmm d, yyyy");
  sheet.getRange("M2:N").setNumberFormat("ddd mmm d, yyyy");
  sheet.getRange("E2:E").setNumberFormat("0");

  // Status dropdown
  const statusRule = SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build();
  sheet.getRange("K2:K").setDataValidation(statusRule);
  // Date pickers for trial and wedding-set dates
  const dateRule = SpreadsheetApp.newDataValidation().requireDate().build();
  sheet.getRange("M2:N").setDataValidation(dateRule);

  // Colours: red = still "New" after 24 hours; amber = wedding within 14 days and set not booked yet
  const all = sheet.getRange("A2:O");
  const red = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND($K2="New",$A2<>"",NOW()-$A2>1)')
    .setBackground("#f6d4cf")
    .setRanges([all])
    .build();
  const amber = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied(
      '=AND($E2<>"",$E2<=14,$E2>=0,NOT(OR($K2="Wedding set booked",$K2="Done",$K2="Review asked",$K2="Not going ahead")))',
    )
    .setBackground("#f7e7c1")
    .setRanges([all])
    .build();
  sheet.setConditionalFormatRules([red, amber]);
  sheet.autoResizeColumns(1, HEADERS.length);
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}
