export interface SummerEventResponseModel {
  id: number;
  name: string;
  summary: string;
  description: string;
  stufen: string;
  eventDate: Date;
  eventStartTime: Date;
  eventEndTime: Date;
  registrationFrom: Date | undefined;
  registrationTo: Date | undefined;
  imageUrl: string;
}
