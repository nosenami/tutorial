import { DATABASE_URL, PASSWORD, USER_NAME } from './dbInfo'

/**
 * 書籍情報をＤＢから取得する。（条件なし）
 * @returns ＤＢから取得した書籍情報の一覧。配列形式。
 */
export const selectBooksAll = () => {

    const SQL_STATEMENT_SELECT = `
      SELECT
        book_id,
        title,
        kind,
        buy_date,
        buy_person,
        review_comment
      FROM
        book_info_table
      ORDER BY
        book_id
    `

    try{

      // ＳＥＬＥＣＴの前準備～実行
      const jdbcConnection = Jdbc.getCloudSqlConnection(DATABASE_URL, USER_NAME, PASSWORD)
      const jdbcStatement = jdbcConnection.createStatement()
      const jdbcResultSet = jdbcStatement.executeQuery(SQL_STATEMENT_SELECT)

      // ＳＥＬＥＣＴの結果を取り出し
      // 　ＳＱＬ結果が入っているjdbcResultSetというオブジェクトから
      // 　必要な値を取り出す。
      // 　nextとは、ＳＱＬ結果を１件読み込むこと（カーソルの移動）。
      // 　読めればtrueを返し、読めなければ（ATEND）falseを返す。

      let bookRecords = []

      while (jdbcResultSet.next()) {

        bookRecords.push({
          bookId : jdbcResultSet.getInt('book_id'),
          title :jdbcResultSet.getString('title'),
          kind : global.getKindName(jdbcResultSet.getInt('kind') ),
          buyDate : jdbcResultSet.getString('buy_date') ,
          buyPerson : jdbcResultSet.getString('buy_person'),
          reviewComment : jdbcResultSet.getString('review_comment')
        })
      }


      // ＳＥＬＥＣＴの後始末
      jdbcResultSet.close()
      jdbcStatement.close()
      jdbcConnection.close()

      return bookRecords

    }
    catch(e){
      console.log(e)
    }
    finally{
      // nop
    }
  }
