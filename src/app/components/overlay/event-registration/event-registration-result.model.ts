import { EventCardComponentModel } from "../../components/event-card/event-card.component-model";

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
  associatedEventCard: EventCardComponentModel;
}
