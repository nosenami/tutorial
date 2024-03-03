/**
 * 本のジャンルの、オブジェクト（コード値とコード名称）の配列。
 *   key：ジャンルのコード値
 *   value：ジャンルのコード名称
 */
const KIND_NAME_MAP = [
  { key:0, value:'指定なし' },
  { key:1, value:'小説' },
  { key:2, value:'ファンタジー' },
  { key:3, value:'ミステリ' },
  { key:4, value:'ＳＦ' }
]


/**
 * 本のジャンルの、コード名称を取得する。
 * @param {number} kindKey ジャンルのコード値
 * @returns ジャンルのコード名称
 */
export const getKindName = (kindKey) => {

  // 配列内のkeyが引数のコード値と一致した場合に、その配列を受け取る。
  const foundArray = KIND_NAME_MAP.find(
    (array) => array.key === kindKey
  )

  // 受け取った配列のvalue（コード名称）を返す。
  return foundArray.value

};


/**
 * 本のジャンルの、コード値を取得する。
 * @param {string} kindName ジャンルのコード名称
 * @returns ジャンルのコード値（ただし存在しないコード名称を渡された場合は999を返す）
 */
export const getKindKey = (kindName) => {

  // 配列内のvalueが引数のコード名称と一致した場合に、その配列を受け取る。
  const foundArray = KIND_NAME_MAP.find(
    (array) => array.value === kindName
  )

  // 受け取った配列のkey（コード値）を返す。
  // ただし受け取れなかった場合（一致がなかった場合）、存在しないコード値999を返す。
  if( foundArray !== undefined){
    return foundArray.key
  }
  else {
    return 999
  }

};
