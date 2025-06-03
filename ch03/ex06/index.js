export function slice(str, indexStart, indexEnd) {
  const len = str.length;

  // indexStart の処理
  let from;
  if (indexStart !== undefined) {
    from = Number(indexStart);
  } else {
    from = 0;
  }
  if (isNaN(from)) from = 0;
  if (from < 0) {
    from = Math.max(len + from, 0);
  } else {
    from = Math.min(from, len);
  }

  // indexEnd の処理
  let to;
  if (indexEnd !== undefined) {
    to = Number(indexEnd);
  } else {
    to = len;
  }
  if (isNaN(to)) to = 0;
  if (to < 0) {
    to = Math.max(len + to, 0);
  } else {
    to = Math.min(to, len);
  }

  // to < from なら空文字列
  if (to < from) {
    return "";
  }

  return str.substring(from, to);
}
