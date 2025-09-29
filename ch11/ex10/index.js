export function daysInMonth(year, month1to12) {
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month1to12) ||
    month1to12 < 1 ||
    month1to12 > 12
  ) {
    throw new TypeError("daysInMonth(year, month): month is 1..12");
  }
  return new Date(year, month1to12, 0).getDate();
}

function parseYMDLocal(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) throw new TypeError("Invalid date format (YYYY-MM-DD)");
  const y = +m[1],
    mo = +m[2],
    d = +m[3];
  return new Date(y, mo - 1, d, 0, 0, 0, 0); // ローカル 00:00:00
}

export function countWeekdaysInclusive(startYMD, endYMD) {
  let a = parseYMDLocal(startYMD);
  let b = parseYMDLocal(endYMD);
  if (a > b) [a, b] = [b, a];

  let cnt = 0;
  const d = new Date(a.getTime());
  while (d <= b) {
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) cnt++;
    d.setDate(d.getDate() + 1);
  }
  return cnt;
}

export function weekdayOf(dateYMD, locale = "ja-JP", style = "long") {
  const d = parseYMDLocal(dateYMD);

  return new Intl.DateTimeFormat(locale, { weekday: style }).format(d);
}

export function startOfPrevMonthLocal() {
  const d = new Date();
  d.setDate(0);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}
