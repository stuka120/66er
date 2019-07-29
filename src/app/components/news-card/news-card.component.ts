import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/model/post.model';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {

  @Input() post: Post

  constructor() { }

  ngOnInit() {
  }
}
