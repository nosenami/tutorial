/**
 * 本のジャンルの日本語名を取得する。
 * @param {*} kindValue ジャンルのコード値
 * @returns ジャンルのコード名称
 */
export const getKindName = (kindValue) => {
  switch (kindValue) {
    case 1:
      return '小説';
      break;
    case 2:
      return 'ファンタジー';
      break;
    case 3:
      return 'ミステリ';
      break;
    case 4:
      return 'ＳＦ';
      break;
    default:
      return '指定なし';
      break;
  }
};
