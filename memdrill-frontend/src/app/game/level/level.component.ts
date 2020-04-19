import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit {

  @Output() level = new EventEmitter<string>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSelect(value: string): void {
    this.level.emit(value);
    this.router.navigate(['game/' + value]);
  }

}
