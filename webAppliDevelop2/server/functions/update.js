import { DATABASE_URL, PASSWORD, USER_NAME } from './dbInfo'

/**
 * jdbcConnectionオブジェクト、jdbcPreparedStatementオブジェクト
 */
let jdbcConnection = null;
let jdbcPreparedStatement = null;


/**
 * 書籍情報をＤＢへ登録する。
 * @param {Object} inputBookInfo 登録する内容が設定された書籍情報
 * @returns　登録件数。（１件を示す「1」）。
 */
export const insertBookInfo = (inputBookInfo) => {

    const SQL_STATEMENT_INSERT = `
      INSERT INTO book_info_table (
        title,
        kind,
        buy_date,
        buy_person,
        review_comment
      )
      VALUES (?, ?, ?, ?, ?)
    `

    try{

      // ＩＮＳＥＲＴの前準備
      const jdbcPreparedStatement = sqlPreparation(SQL_STATEMENT_INSERT);

      // 以下、5-2にて、子画面で入力した値を設定させる予定。
      jdbcPreparedStatement.setString(1,inputBookInfo.title);
      jdbcPreparedStatement.setInt(2, inputBookInfo.kind);
      jdbcPreparedStatement.setString(3,  inputBookInfo.buyDate);
      jdbcPreparedStatement.setString(4,  inputBookInfo.buyPerson);
      jdbcPreparedStatement.setString(5,  inputBookInfo.reviewComment);

      //ＩＮＳＥＲＴ実行と後始末
      const resultRows = sqlExecuteAndCleaning(jdbcPreparedStatement);

      return resultRows;

    }
    catch(e){
      console.log(e)
      throw new Error(e)
    }
    finally{
      // nop
    }
  }


/**
 * 書籍情報をＤＢから削除する。
 * @param {number} book_id 削除する書籍情報のキー項目であるbook_id。
 * @returns　削除件数。（１件を示す「1」）。
 */
export const deleteBookInfo = (book_id) => {

    const SQL_STATEMENT_DELETE = `
      DELETE
      FROM
        book_info_table
      WHERE
        book_id = ?
      `

    try{

      // ＤＥＬＥＴＥの前準備
      const jdbcPreparedStatement = sqlPreparation(SQL_STATEMENT_DELETE);

      // 受け渡されたbook_idをＳＱＬ文に設定する
      jdbcPreparedStatement.setInt(1, book_id);

      // ＤＥＬＥＴＥ実行と後始末
      const resultRows = sqlExecuteAndCleaning(jdbcPreparedStatement);

      return resultRows;

    }
    catch(e){
      console.log(e)
      throw new Error(e)
    }
    finally{
      // nop
    }
  }


  /**
   * 更新系のＳＱＬの、実行の前準備を行う。
   * @param {string} sqlStatement ＳＱＬ文の文字列（insert,update,deleteなど更新系のＳＱＬ文。）
   * @returns jdbcPreparedStatementオブジェクト。
   */
  function sqlPreparation(sqlStatement) {

    jdbcConnection = Jdbc.getCloudSqlConnection(DATABASE_URL, USER_NAME, PASSWORD);
    jdbcPreparedStatement = jdbcConnection.prepareStatement(sqlStatement);

    return jdbcPreparedStatement;
  }

  /**
   * 更新系のＳＱＬの、実行と、後始末を行う。
   * @param {Object} jdbcPreparedStatement jdbcPreparedStatementオブジェクト。
   * @returns ＳＱＬ実行の件数。
   */
  function sqlExecuteAndCleaning(jdbcPreparedStatement) {

    const resultRows = jdbcPreparedStatement.executeUpdate();

    jdbcPreparedStatement.close();
    jdbcConnection.close();

    return resultRows;
  }
