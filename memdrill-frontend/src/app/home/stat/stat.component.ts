import { Component, OnInit } from '@angular/core';
import { CalculationService } from '../calculation.service';
import { Stat } from '../../interfaces';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
  stat: Stat;
  isLoading = true;

  constructor(private calculationService: CalculationService) {}

  ngOnInit(): void {
    this.calculationService.getStats().subscribe((result) => {
      this.stat = result;
      this.isLoading = false;
    });
  }
}
