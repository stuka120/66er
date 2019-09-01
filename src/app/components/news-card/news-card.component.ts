import { Component, OnInit, Input } from "@angular/core";
import { Post } from "src/app/model/post.model";
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
  @Input() post: Post;
  @Input() cardId: number;

  faCommend = faComment;
  faShare = faShare;
  faChevronDown = faChevronDown;

  constructor() {}

  ngOnInit() {}
}
