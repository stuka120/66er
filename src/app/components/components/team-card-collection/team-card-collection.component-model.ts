import { TeamCardComponentModel } from "../team-card/team-card.component-model";

export interface TeamCardCollectionComponentModel {
  headerText: string;
  teamMembers: TeamCardComponentModel[];
}
