import { Component, Input, OnInit } from "@angular/core";
import { WordpressPostResponseModel } from "../../../shared/model/responses/wordpress/wordpress-post-response.model";

@Component({
  selector: "app-news-card-collection",
  templateUrl: "./news-card-collection.component.html",
  styleUrls: ["./news-card-collection.component.css"]
})
export class NewsCardCollectionComponent implements OnInit {
  @Input() posts: WordpressPostResponseModel[];

  constructor() {}

  ngOnInit() {}
}
