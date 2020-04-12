import { Component, Input, OnInit } from '@angular/core';
import { PostResponseModel } from '../../../model/responses/post.model';

@Component({
  selector: 'app-news-card-collection',
  templateUrl: './news-card-collection.component.html',
  styleUrls: ['./news-card-collection.component.css']
})
export class NewsCardCollectionComponent implements OnInit {

  @Input() posts: PostResponseModel[];

  constructor() { }

  ngOnInit() {
  }

}
