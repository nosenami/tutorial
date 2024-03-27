/**
 * 本のジャンルの、オブジェクト（コード値とコード名称）の配列。
 *   codeValue：ジャンルのコード値
 *   codeName ：ジャンルのコード名称
 */
const KIND_NAME_MAP = [
  { codeValue:0, codeName:'指定なし' },
  { codeValue:1, codeName:'小説' },
  { codeValue:2, codeName:'ファンタジー' },
  { codeValue:3, codeName:'ミステリ' },
  { codeValue:4, codeName:'ＳＦ' }
]


/**
 * 本のジャンルの、コード名称を取得する。
 * @param {number} kindKey ジャンルのコード値
 * @returns ジャンルのコード名称
 */
export const getKindName = (kindKey) => {

  // 配列内のkeyが引数のコード値と一致した場合に、その配列を受け取る。
  const foundArray = KIND_NAME_MAP.find(
    (array) => array.codeValue === kindKey
  )

  // 受け取った配列のvalue（コード名称）を返す。
  // ただし受け取れなかった場合（一致がなかった場合）、空文字を返す。
  if( foundArray ){
    return foundArray.codeName
  }
  else{
    return ''
  }

};


/**
 * 本のジャンルの、コード値を取得する。
 * @param {string} kindName ジャンルのコード名称
 * @returns ジャンルのコード値（ただし存在しないコード名称を渡された場合は999を返す）
 */
export const getKindKey = (kindName) => {

  // 配列内のvalueが引数のコード名称と一致した場合に、その配列を受け取る。
  const foundArray = KIND_NAME_MAP.find(
    (array) => array.codeName === kindName
  )

  // 受け取った配列のkey（コード値）を返す。
  // ただし受け取れなかった場合（一致がなかった場合）、存在しないコード値999を返す。
  if( foundArray ){
    return foundArray.codeValue
  }
  else {
    return 999
  }

};
