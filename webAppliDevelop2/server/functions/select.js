import { DATABASE_URL, PASSWORD, USER_NAME } from './dbInfo'

/**
 * 書籍情報をＤＢから取得する。（条件なし）
 * @returns ＤＢから取得した書籍情報の一覧。配列形式。
 */
export const selectAllBooks = () => {

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

      const bookRecords = []

      while (jdbcResultSet.next()) {

        bookRecords.push({
          bookId : jdbcResultSet.getInt('book_id'),
          title :jdbcResultSet.getString('title'),
          kind : jdbcResultSet.getString('kind'),
          kindName : global.getKindName(jdbcResultSet.getInt('kind') ),
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
      throw new Error(e)
    }
    finally{
      // nop
    }
  }

/**
 * 書籍情報をＤＢから取得する。（条件付き）
 * @param {string} searchText 画面から入力した検索条件の文字列。
 * @param {string} searchType 画面で選択した検索方法。searchType_title…タイトル部分一致。searchType_kind…ジャンル完全一致。
 * @returns ＤＢから取得した書籍情報の一覧。配列形式。
 */
export const selectSearchedBooks = (searchText, searchType) => {

  // SQL文のWHERE条件を組み立てる。
  let sqlWhereSentence = 'WHERE '

  // 検索条件が「タイトル部分一致」の場合は
  // タイトルの条件文を生成する。
  if( searchType === 'searchType_title' ){
    sqlWhereSentence = sqlWhereSentence + `title LIKE '%${searchText}%' `
  }

  // 検索条件が「ジャンル完全一致」の場合は
  // ジャンルの条件文を生成する。
  else if( searchType === 'searchType_kind' ){
    sqlWhereSentence = sqlWhereSentence + `kind = ${ global.getKindKey(searchText) } `
  }

  // 検索条件がその他の場合は、WHERE条件なしとする。
  else{
    sqlWhereSentence = ` `
  }


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
    ${sqlWhereSentence}
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

    const bookRecords = []

    while (jdbcResultSet.next()) {

      bookRecords.push({
        bookId : jdbcResultSet.getInt('book_id'),
        title :jdbcResultSet.getString('title'),
        kind : jdbcResultSet.getString('kind'),
        kindName : global.getKindName(jdbcResultSet.getInt('kind') ),
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
    throw new Error(e)
  }
  finally{
    // nop
  }
}
