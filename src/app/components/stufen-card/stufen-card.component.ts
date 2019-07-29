import { Component, OnInit, Input } from '@angular/core';
import { StufenCardModel } from 'src/app/model/stufen-card.model';

@Component({
  selector: 'app-stufen-card',
  templateUrl: './stufen-card.component.html',
  styleUrls: ['./stufen-card.component.css']
})
export class StufenCardComponent implements OnInit {

  @Input() stufenCardModel: StufenCardModel;

  constructor() { }

  ngOnInit() {
  }

}
