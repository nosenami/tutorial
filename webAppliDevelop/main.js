///////////////////////////////////////////////////
//
// 画面を初期表示する。
//

function doGet() {
    return HtmlService.createTemplateFromFile('index').evaluate();
}


///////////////////////////////////////////////////
//
// カウントアップした値を保存するスプレッドシートの定義
//

// https://docs.google.com/spreadsheets/d/1ws3hGT_qzSuvuOQ1QJ1xlbZgMPk1MaU_EdpCsIQNREo/edit#gid=0
// https://docs.google.com/spreadsheets/d/この部分がシートID/edit#gid=0
const SHEET_ID = '1ws3hGT_qzSuvuOQ1QJ1xlbZgMPk1MaU_EdpCsIQNREo'
const SHEET_NAME = 'カウンタ値シート'


///////////////////////////////////////////////////
//
// スプレッドシートに引数の値を保存する。
//

function saveToSpreadSheet(count) {

  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  const range = sheet.getRange('A1');
  range.setValue(count);
}
