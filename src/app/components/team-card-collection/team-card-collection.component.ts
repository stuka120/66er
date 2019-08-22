import { Component, Input, OnInit } from "@angular/core";
import { TeamCardCollectionModel } from "./team-card-collection.model";

@Component({
  selector: "app-team-card-collection",
  templateUrl: "./team-card-collection.component.html",
  styleUrls: ["./team-card-collection.component.css"]
})
export class TeamCardCollectionComponent implements OnInit {
  @Input()
  model: TeamCardCollectionModel;

  constructor() {}

  ngOnInit() {}
}
