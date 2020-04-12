import { Component, OnInit, Input } from "@angular/core";
import { PostResponseModel } from "src/app/model/responses/post.model";
import {
  faChevronDown,
  faComment,
  faShare
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-news-card",
  templateUrl: "./news-card.component.html",
  styleUrls: ["./news-card.component.css"]
})
export class NewsCardComponent implements OnInit {
  @Input() post: PostResponseModel;
  @Input() cardId: number;

  faCommend = faComment;
  faShare = faShare;
  faChevronDown = faChevronDown;

  constructor() {}

  ngOnInit() {}
}
