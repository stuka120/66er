import { Component, OnInit, Input } from "@angular/core";
import { faChevronDown, faComment, faShare } from "@fortawesome/free-solid-svg-icons";
import { WordpressPostResponseModel } from "../../../shared/model/responses/wordpress/wordpress-post-response.model";

@Component({
  selector: "app-news-card",
  templateUrl: "./news-card.component.html",
  styleUrls: ["./news-card.component.css"]
})
export class NewsCardComponent implements OnInit {
  @Input() post: WordpressPostResponseModel;
  @Input() cardId: number;

  faCommend = faComment;
  faShare = faShare;
  faChevronDown = faChevronDown;

  constructor() {}

  ngOnInit() {}
}
