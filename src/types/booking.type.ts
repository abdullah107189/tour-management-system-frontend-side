export const BOOKING_STATUS = {
  PENDING: "PENDING",
  CANCEL: "CANCEL",
  COMPLETE: "COMPLETE",
  FAILED: "FAILED",
} as const;
export type BOOKING_STATUS =
  (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];

export interface IBooking {
  _id?: string;
  user: string;
  tour: string;
  payment?: string;
  guestCount: number;
  status: BOOKING_STATUS;
}
