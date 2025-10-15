import { addMonths, startOfMonth } from "date-fns"

export function calculateNextReportDate(lastSentDate?: Date): Date {
    const now = new Date();
    lastSentDate = lastSentDate || now;

    const nextDate = startOfMonth(addMonths(lastSentDate, 1));
    nextDate.setHours(0, 0, 0, 0); // Set to start of the day (00:00:00)

    return nextDate;
}