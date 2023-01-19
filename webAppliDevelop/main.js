/**
 * 画面を初期表示する。
 * @returns index.htmlの画面のHtmlServiceオブジェクト。
 */
function doGet() {
    return HtmlService.createTemplateFromFile('index').evaluate();
}


/** 接続名（インスタンス名） */
const CONNECTION_NAME = 'esm-gcp-study:us-central1:modern-study';
/** データベース名 */
const DATABASE_NAME = 'web_book_nosenami';
/** データベースのＵＲＬ */
const DATABASE_URL = 'jdbc:google:mysql://' + CONNECTION_NAME + '/' + DATABASE_NAME;

/**ユーザーＩＤ */
const USER_NAME = 'esm';
/**パスワード  */
const PASSWORD = 'esm';


/**
 * ＤＢからの取得を行う。
 * @returns 取得したカウンタ値。
 */
function selectFromDatabase() {

  /** ＳＱＬ文（counter_tableのcountをＳＥＬＥＣＴする。） */
  const SQL_STATEMENT_SELECT = `
    SELECT
      count
    FROM
      web_book_nosenami.counter_table
    WHERE
      counter_id = 1
    `;

  //ＳＥＬＥＣＴ実行の手順①
  //ＤＢへ接続し、JdbcConnectionというオブジェクトを受け取る。
  //  JDBCとは、接続に関するサービス。
  const jdbcConnection = Jdbc.getCloudSqlConnection(DATABASE_URL, USER_NAME, PASSWORD);

  //ＳＥＬＥＣＴ実行の手順②
  //JdbcConnectionというオブジェクトをもとに
  //jdbcStatementというオブジェクトを作成する。
  //それをもとにＳＱＬを実行し、ＳＱＬ結果をjdbcResultSetというオブジェクトに受け取る。
  const jdbcStatement = jdbcConnection.createStatement();
  const jdbcResultSet = jdbcStatement.executeQuery(SQL_STATEMENT_SELECT);

  //ＳＥＬＥＣＴ実行の手順③
  //ＳＱＬ結果が入っているjdbcResultSetというオブジェクトから
  //必要な値を取り出す。
  //  nextとは、ＳＱＬ結果を１件読み込む。
  //  読めればtrueを返し、読めなければ（ATEND）falseを返す。
  let count = 0;
  while( jdbcResultSet.next() ) {
    count = jdbcResultSet.getInt('count')
  }

  //ＳＥＬＥＣＴ実行の手順④
  //接続を終了する。
  jdbcResultSet.close();
  jdbcStatement.close();
  jdbcConnection.close();

  return count;
}


/**
 * ＤＢへの更新を行う。
 * @param {*} count カウンタ値。（counter_tableのcountをこの値で更新する。）
 * @returns 更新結果の行数である１。
 */
function updateToDatabase(count) {

  /** ＳＱＬ文（counter_tableのcountをＵＰＤＡＴＥする。） */
  const SQL_STATEMENT_UPDATE = `
    UPDATE
      web_book_nosenami.counter_table
    SET
      count = ?
    WHERE
      counter_id = 1
    `;

  //ＵＰＤＡＴＥ実行の手順①
  //ＤＢへ接続し、JdbcConnectionというオブジェクトを受け取る。
  //  JDBCとは、接続に関するサービス。
  const jdbcConnection = Jdbc.getCloudSqlConnection(DATABASE_URL, USER_NAME, PASSWORD);

  //ＵＰＤＡＴＥ実行の手順②
  //JdbcConnectionというオブジェクトに対してＳＱＬ文を設定し、
  //JdbcPreparedStatementというオブジェクトを受け取る。
  const jdbcPreparedStatement = jdbcConnection.prepareStatement(SQL_STATEMENT_UPDATE);

  //ＵＰＤＡＴＥ実行の手順③
  //JdbcPreparedStatementというオブジェクトに対して
  //ＳＱＬ文の「？」パラメタ値を設定して実行する。
  //更新された行数を受け取る。
  jdbcPreparedStatement.setInt(1,count);
  const resultRows = jdbcPreparedStatement.executeUpdate();

  //ＵＰＤＡＴＥ実行の手順④
  //接続を終了する。
  jdbcPreparedStatement.close();
  jdbcConnection.close();

  return resultRows;
}
