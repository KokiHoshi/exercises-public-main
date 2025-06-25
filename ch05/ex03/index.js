export function is31DaysIf(month) {
  const validMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (!validMonths.includes(month)) {
    throw new Error(`Invalid month: ${month}`);
  }

  if (
    month === "Jan" ||
    month === "Mar" ||
    month === "May" ||
    month === "Jul" ||
    month === "Aug" ||
    month === "Oct" ||
    month === "Dec"
  ) {
    return true;
  } else {
    return false;
  }
}

export function is31DaysSwitch(month) {
  const validMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (!validMonths.includes(month)) {
    throw new Error(`Invalid month: ${month}`);
  }
  switch (month) {
    case "Jan":
    case "Mar":
    case "May":
    case "Jul":
    case "Aug":
    case "Oct":
    case "Dec":
      return true;
    default:
      return false;
  }
}
