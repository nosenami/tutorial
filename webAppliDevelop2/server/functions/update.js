import { DATABASE_URL, PASSWORD, USER_NAME } from './dbInfo'

/**
 * 書籍情報をＤＢへ登録する。
 * @param {*} inputBookInfo 登録する内容が設定された書籍情報
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

      // ＩＮＳＥＲＴの前準備～実行
      const jdbcConnection = Jdbc.getCloudSqlConnection(DATABASE_URL, USER_NAME, PASSWORD);
      const jdbcPreparedStatement = jdbcConnection.prepareStatement(SQL_STATEMENT_INSERT);

      // 以下、5-2にて、子画面で入力した値を設定させる予定。
      jdbcPreparedStatement.setString(1,inputBookInfo.title);
      jdbcPreparedStatement.setInt(2, inputBookInfo.kind);
      jdbcPreparedStatement.setString(3,  inputBookInfo.buyDate);
      jdbcPreparedStatement.setString(4,  inputBookInfo.buyPerson);
      jdbcPreparedStatement.setString(5,  inputBookInfo.reviewComment);

      const resultRows = jdbcPreparedStatement.executeUpdate();

      //ＩＮＳＥＲＴ実行の後始末
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
