import { Component } from '@angular/core';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent {
  awards = [
    { year: '', logo: 'A′', award: 'A′ Design Award', recognition: 'Award Winner', project: 'Project details pending' },
    { year: '2025', logo: 'LOOP', award: 'LOOP Design Awards', recognition: 'Winner — Interior Renovations', project: 'FEEL Boutique Plaza', url: 'https://loopdesignawards.com/winners-2025/' },
    { year: '2025', logo: 'A+', award: 'Architizer A+Awards', recognition: 'Special Mention — Architecture +Art', project: 'Jan Plaza', url: 'https://architizer.com/projects/jan-plaza/' },
    { year: '2025', logo: 'DNA', award: 'DNA Paris Design Awards', recognition: 'Honorable Mention', project: 'Jan Plaza', url: 'https://dna.paris/winner/zoom.php?eid=71-93884-25' },
    { year: '2025', logo: 'DNA', award: 'DNA Paris Design Awards', recognition: 'Honorable Mention', project: 'LOOKOUT/IN Café', url: 'https://dna.paris/winner/zoom.php?eid=71-93978-25' },
    { year: '2025', logo: 'NY', award: 'NY Product Design Awards', recognition: 'Silver Winner', project: 'NOUSHELLA — LoveLight Dress', url: 'https://nydesignawards.com/winner-info.php?id=3329' },
    { year: '2025', logo: 'DNA', award: 'DNA Paris Design Awards', recognition: 'Honorable Mention', project: 'NOUSHELLA — LoveLight Dress', url: 'https://dna.paris/winner/zoom.php?eid=71-94212-25' },
    { year: '2025', logo: 'DNA', award: 'DNA Paris Design Awards', recognition: 'Honorable Mention', project: 'NOUSHELLA — Lumière Dress', url: 'https://dna.paris/winner/zoom.php?eid=71-93916-25' },
    { year: '2025', logo: 'AMP', award: 'Architecture MasterPrize', recognition: 'Honorable Mention — Architectural Design of the Year', project: 'LOOKOUT/IN Café', url: 'https://architectureprize.com/winners/2025_hm.php?level=pro' },
    { year: '', logo: 'هنرمعماری', award: 'Architecture of the Year Award', recognition: 'Finalist', project: 'LOOKOUT/IN Café' },
    { year: '', logo: 'SIAA', award: 'Shiraz Interior Architecture Award', recognition: 'Finalist', project: 'LOOKOUT/IN Café' }
  ];
}
