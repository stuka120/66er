export interface SummerEventResponseModel {
  id: number;
  name: string;
  summary: string;
  description: string;
  stufen: string;
  price: number | undefined;
  eventDate: Date;
  eventStartTime: Date;
  eventEndTime: Date;
  registrationFrom: Date | undefined;
  registrationTo: Date | undefined;
  imageUrl: string;
  pdfUrl: string;
}
