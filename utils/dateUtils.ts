/**
 * Formats a date string into a "mail-style" format.
 * - Same day: "HH:MM"
 * - Yesterday: "Yesterday"
 * - Same week: "Weekday name"
 * - Otherwise: "MM/DD/YYYY" or localized format
 *
 * @param isoString - The ISO date string to format.
 * @returns A formatted date string.
 */
export function formatMailStyleDate(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();

  const isSameDay = (a: Date, b: Date): boolean =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const isYesterday = (a: Date, b: Date): boolean => {
    const yesterday = new Date(b);
    yesterday.setDate(b.getDate() - 1);
    return isSameDay(a, yesterday);
  };

  const isSameWeek = (a: Date, b: Date): boolean => {
    const dayMs = 24 * 60 * 60 * 1000;
    const startOfWeek = new Date(b);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(b.getDate() - b.getDay());
    const endOfWeek = new Date(startOfWeek.getTime() + 6 * dayMs);
    return a >= startOfWeek && a <= endOfWeek;
  };

  if (isSameDay(date, now)) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else if (isYesterday(date, now)) {
    return "Yesterday";
  } else if (isSameWeek(date, now)) {
    return date.toLocaleDateString(undefined, { weekday: "long" });
  } else {
    return date.toLocaleDateString();
  }
}
