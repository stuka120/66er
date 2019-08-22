import { TeamCardModel } from "../team-card/team-card.model";

export interface TeamCardCollectionModel {
  headerText: string;
  teamMembers: TeamCardModel[];
}
