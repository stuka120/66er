import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../../model/post.model";
import { FacebookService } from "../../services/facebook.service";

@Component({
  selector: "app-start-dashboard",
  templateUrl: "./start-dashboard.component.html",
  styleUrls: ["./start-dashboard.component.css"]
})
export class StartDashboardComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(private testService: FacebookService) {}

  ngOnInit(): void {
    this.posts$ = this.testService.getPosts();
  }
}
