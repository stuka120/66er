import { Component, Input, OnInit } from "@angular/core";
import { TeamCardComponentModel } from "./team-card.component-model";

@Component({
  selector: "app-team-card",
  templateUrl: "./team-card.component.html",
  styleUrls: ["./team-card.component.css"]
})
export class TeamCardComponent implements OnInit {
  @Input()
  model: TeamCardComponentModel;

  constructor() {}

  ngOnInit() {}
}
