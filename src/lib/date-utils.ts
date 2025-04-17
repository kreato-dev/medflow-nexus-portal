
// Date utility functions for appointments and scheduling

/**
 * Format a date to display as "Month Day, Year"
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format a time to display in 12-hour format with AM/PM
 */
export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Format a date and time together
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return `${formatDate(d)} at ${formatTime(d)}`;
}

/**
 * Get the day of the week
 */
export function getDayOfWeek(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { weekday: 'long' });
}

/**
 * Check if a date is today
 */
export function isToday(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
}

/**
 * Check if a date is in the past
 */
export function isPast(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  return d < now;
}

/**
 * Calculate the difference between two dates in days
 */
export function daysBetween(date1: Date | string, date2: Date | string): number {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Get the date for the start of the week (Sunday)
 */
export function getStartOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0 for Sunday
  d.setDate(d.getDate() - day);
  return d;
}

/**
 * Get an array of dates for a week starting from a specific date
 */
export function getWeekDates(startDate: Date): Date[] {
  const weekDates: Date[] = [];
  const start = new Date(startDate);
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    weekDates.push(date);
  }
  
  return weekDates;
}

/**
 * Generate time slots for a day
 * @param startHour Start hour (0-23)
 * @param endHour End hour (0-23)
 * @param intervalMinutes Interval in minutes
 */
export function generateTimeSlots(
  startHour: number = 9,
  endHour: number = 17,
  intervalMinutes: number = 30
): string[] {
  const slots: string[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let min = 0; min < 60; min += intervalMinutes) {
      const date = new Date(today);
      date.setHours(hour, min);
      slots.push(formatTime(date));
    }
  }
  
  return slots;
}

/**
 * Convert a date to ISO format without timezone
 */
export function toISODateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Format relative time (e.g., "2 days ago", "in 3 hours")
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = d.getTime() - now.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);
  
  if (diffDay > 0) {
    return diffDay === 1 ? 'tomorrow' : `in ${diffDay} days`;
  } else if (diffDay < 0) {
    return diffDay === -1 ? 'yesterday' : `${Math.abs(diffDay)} days ago`;
  } else if (diffHour > 0) {
    return diffHour === 1 ? 'in an hour' : `in ${diffHour} hours`;
  } else if (diffHour < 0) {
    return diffHour === -1 ? 'an hour ago' : `${Math.abs(diffHour)} hours ago`;
  } else if (diffMin > 0) {
    return diffMin === 1 ? 'in a minute' : `in ${diffMin} minutes`;
  } else if (diffMin < 0) {
    return diffMin === -1 ? 'a minute ago' : `${Math.abs(diffMin)} minutes ago`;
  } else {
    return diffSec >= 0 ? 'just now' : 'just now';
  }
}
