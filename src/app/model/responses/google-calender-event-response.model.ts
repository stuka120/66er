export interface GoogleCalenderEventCollectionResponseModel {
  items: GoogleCalenderEventResponseModel[];
}

export interface GoogleCalenderEventResponseModel {
  summary: string;
  status: string;
  created: Date;
  updated: Date;
  start: {
    date: Date;
    dateTime: Date;
    timeZone: string;
  };
  end: {
    date: Date;
    dateTime: Date;
    timeZone: string;
  };
  recurrence: string[];
  location: string;
}
