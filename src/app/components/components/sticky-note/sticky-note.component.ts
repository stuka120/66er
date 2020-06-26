import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-sticky-note",
  templateUrl: "./sticky-note.component.html",
  styleUrls: ["./sticky-note.component.css"]
})
export class StickyNoteComponent implements OnInit {
  @Input()
  isRotated: boolean = false;

  @Input()
  rotateDirection: "clockwise" | "anticlockwise" = "anticlockwise";

  @Input()
  isZoomingOnHover: boolean = false;

  @Input()
  backgroundColor: string = "#ffc";

  constructor() {}

  ngOnInit() {}
}
