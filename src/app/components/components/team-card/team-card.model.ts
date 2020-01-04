/**
 * Model for the team-card component
 */
export interface TeamCardModel {
  /**
   * The name of the team member
   */
  name: string;

  /**
   * A short description of the user, his hobbies, etc.
   */
  description?: string;

  /**
   * The url of the profile picture of the person
   */
  imgUrl?: string;
}
