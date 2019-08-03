export interface CalenderEventDtoModel {
  items: CalenderEventModel[];
}

export interface CalenderEventModel {
  summary: string;
  status: string;
  created: Date;
  updated: Date;
  start: {
    dateTime: Date;
    timeZone: string;
  };
  end: {
    dateTime: Date;
    timeZone: string;
  };
  recurrence: string[];
}
