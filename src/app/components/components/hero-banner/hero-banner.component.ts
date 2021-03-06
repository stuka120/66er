import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import { HeroBannerComponentModel } from "./hero-banner.component-model";

@Component({
  selector: "app-hero-banner",
  templateUrl: "./hero-banner.component.html",
  styleUrls: ["./hero-banner.component.css"]
})
export class HeroBannerComponent implements OnInit, AfterViewInit, AfterViewChecked {
  constructor() {
    this.morphextInitialized = true;
  }

  // @ts-ignore
  @ViewChild("morphextElement")
  nativeMorphextContainer: ElementRef;
  morphextText: any;

  @Input()
  model: HeroBannerComponentModel;

  /**
   * If you set this, you can override the image url from the model
   * This is required so that morphext does work.
   */
  @Input()
  imageUrl: string;

  @Output()
  buttonClicked = new EventEmitter<void>();

  morphextInitialized = false;

  ngAfterViewInit(): void {
    this.morphextText = $(this.nativeMorphextContainer.nativeElement);
    this.morphextText.Morphext({
      animation: "fadeIn", // Overrides default "bounceIn"
      separator: ",", // Overrides default ","
      speed: 3000 // Overrides default 2000
    });
  }

  ngOnInit() {}

  ngAfterViewChecked(): void {
    //this.morphextInitialized = true; bugfix see https://stackoverflow.com/a/48216423
  }
}
