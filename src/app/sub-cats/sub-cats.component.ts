import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sub-cats',
  templateUrl: './sub-cats.component.html',
  styleUrls: ['./sub-cats.component.css']
})

export class SubCatsComponent implements OnInit {
  @Input() subcats: any;
  constructor() { }

  ngOnInit() {
  }

}
