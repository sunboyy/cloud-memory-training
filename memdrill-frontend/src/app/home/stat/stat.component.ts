import { Component, OnInit } from '@angular/core';
import { CalculationService } from '../calculation.service';
import { Stat } from './stat';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {

  stat: Stat;

  constructor(private calculationService: CalculationService) { }

  ngOnInit(): void {
    this.calculationService.stats().subscribe((result) => {
      console.log(result);
      this.stat = result;
    });
  }

}
