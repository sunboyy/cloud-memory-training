import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit {

  @Output() level = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(value: string): void {
    this.level.emit(value);
  }

}
