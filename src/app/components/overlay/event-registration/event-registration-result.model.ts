export enum EventRegistrationResultEnum {
  Success,
  Fail
}

export interface EventRegistrationModalPayload {
  firstname: string;
  lastname: string;
  email: string;
  eventId: number;
}

export interface EventRegistrationResultModel {
  modalResult: EventRegistrationResultEnum;
  payload: EventRegistrationModalPayload | undefined;
}
