import { Component } from '@angular/core';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent {
  awards = [
    { year: '2025', award: 'Architizer A+Awards', recognition: 'Special Mention', project: 'Jan Plaza' },
    { year: '2025', award: 'DNA Paris Design Awards', recognition: 'Honorable Mention', project: 'Jan Plaza' },
    { year: '2025', award: 'DNA Paris Design Awards', recognition: 'Honorable Mention', project: 'LOOKOUT/IN Café' },
    { year: '', award: 'Shiraz Interior Architecture Award', recognition: 'Finalist', project: 'LOOKOUT/IN Café' }
  ];
}
