export interface EventCardComponentModel {
  id: number;
  name: string;
  summary: string;
  description: string;
  stufen: string;
  eventDate: Date;
  eventStartTime: Date;
  eventEndTime: Date;
  registrationFrom: Date;
  registrationTo: Date;
  imageUrl: string;
  pdfUrl: string;
}
