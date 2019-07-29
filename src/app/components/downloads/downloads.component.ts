import { Component, OnInit } from "@angular/core";
import { WordpressService } from "../../services/wordpress.service";
import { DomSanitizer } from "@angular/platform-browser";
import { WordpressMediaModel, WordpressFileModel } from 'src/app/model/wordpress-media.model';
import { Observable } from 'rxjs';
import { filter } from 'minimatch';
import { map, distinct, switchMap } from 'rxjs/operators';

@Component({
  selector: "app-downloads",
  templateUrl: "./downloads.component.html",
  styleUrls: ["./downloads.component.css"]
})
export class DownloadsComponent implements OnInit {
  private htmlContent: any;
  files: WordpressFileModel[];
  fileGroups: string[]

  constructor(
    private wordpressService: WordpressService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    // this.wordpressService.getPages().subscribe(payload => {
    //   this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(
    //     payload[0].content.rendered
    //   );
    // });

    this.wordpressService.getFiles$().pipe(
      map(files => files.filter(file => file.isVisible))
    ).subscribe(payload => {
      this.files = payload
      this.fileGroups = payload.map(file => file.fileGroup).filter((v, i, a) => a.indexOf(v) === i)
    })
  }

  getFilegroupFiles(filegroup: string): WordpressFileModel[] {
    return this.files.filter(file => file.fileGroup == filegroup)
  }
}
