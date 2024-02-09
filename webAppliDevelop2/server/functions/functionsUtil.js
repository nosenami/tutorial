/**
 * 本のジャンルの、コード値とコード名称のMap。
 *   key：ジャンルのコード値
 *   value:ジャンルのコード名称
 */
const KIND_NAME_MAP = new Map( [
  [0, '指定なし'],
  [1, '小説'],
  [2, 'ファンタジー'],
  [3, 'ミステリ'],
  [4, 'ＳＦ']
] )

/**
 * 本のジャンルの、コード名称を取得する。
 * @param {number} kindKey ジャンルのコード値
 * @returns ジャンルのコード名称
 */
export const getKindName = (kindKey) => {

  return KIND_NAME_MAP.get(kindKey)

};

/**
 * 本のジャンルの、コード値を取得する。
 * @param {string} kindName ジャンルのコード名称
 * @returns ジャンルのコード値
 */
export const getKindKey = (kindName) => {

  // 返却するコード値。初期値は存在しないコード値とする。
  let resultKindKey = '999'

  // マップ内の、コード名称が一致する場合に、そのコード値を返す。
  KIND_NAME_MAP.forEach(

    function(value, key) {
      if( value == kindName ){
        resultKindKey =  key
      }
    }

  )

  return resultKindKey
};
