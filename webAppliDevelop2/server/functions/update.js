import { DATABASE_URL, PASSWORD, USER_NAME } from './dbInfo'

/**
 * 書籍情報をＤＢへ登録または更新する。
 * キー項目（book_id）が存在しないなら、レコードを登録する。存在するなら、レコードを更新する。
 * @param {Object} inputBookInfo 登録または更新する内容が設定された書籍情報
 * @returns　登録または更新件数。（１件を示す「1」）。
 */
export const insertBookInfo = (inputBookInfo) => {

    const SQL_STATEMENT_INSERT = `
      INSERT INTO book_info_table (
        book_id,
        title,
        kind,
        buy_date,
        buy_person,
        review_comment
      )
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        kind = VALUES(kind),
        buy_date = VALUES(buy_date),
        buy_person = VALUES(buy_person),
        review_comment = VALUES(review_comment)
    `

    try{

      // ＩＮＳＥＲＴの前準備
      const jdbcConnection = Jdbc.getCloudSqlConnection(DATABASE_URL, USER_NAME, PASSWORD);
      const jdbcPreparedStatement = jdbcConnection.prepareStatement(SQL_STATEMENT_INSERT);

      // 受け渡された書籍情報をＳＱＬ文に設定する
      jdbcPreparedStatement.setInt(1, inputBookInfo.bookId);
      jdbcPreparedStatement.setString(2,inputBookInfo.title);
      jdbcPreparedStatement.setInt(3, inputBookInfo.kind);
      jdbcPreparedStatement.setString(4,  inputBookInfo.buyDate);
      jdbcPreparedStatement.setString(5,  inputBookInfo.buyPerson);
      jdbcPreparedStatement.setString(6,  inputBookInfo.reviewComment);

      //ＩＮＳＥＲＴの実行
      const resultRows = jdbcPreparedStatement.executeUpdate();

      //ＩＮＳＥＲＴの後始末
      jdbcPreparedStatement.close();
      jdbcConnection.close();

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
      const jdbcConnection = Jdbc.getCloudSqlConnection(DATABASE_URL, USER_NAME, PASSWORD);
      const jdbcPreparedStatement = jdbcConnection.prepareStatement(SQL_STATEMENT_DELETE);

      // 受け渡されたbook_idをＳＱＬ文に設定する
      jdbcPreparedStatement.setInt(1, book_id);

      // ＤＥＬＥＴＥの実行
      const resultRows = jdbcPreparedStatement.executeUpdate();

      // ＤＥＬＥＴＥの後始末
      jdbcPreparedStatement.close();
      jdbcConnection.close();

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
