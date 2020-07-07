export interface EventCardComponentModel {
  id: number;
  name: string;
  summary: string;
  description: string;
  stufen: string;
  price: number | undefined;
  eventDate: Date;
  eventStartTime: Date;
  eventEndTime: Date;
  registrationFrom: Date;
  registrationTo: Date;
  imageUrl: string;
  pdfUrl: string;
}
