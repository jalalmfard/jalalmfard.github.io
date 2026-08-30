import { Component } from '@angular/core';

interface AwardItem {
  year: string;
  award: string;
  recognition: string;
  project: string;
  url?: string;
  logoSrc?: string;
  logoText?: string;
  dark?: boolean;
}

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent {
  awards: AwardItem[] = [
    { year: '', award: 'A′ Design Award', recognition: 'Award Winner', project: 'Project details pending', logoSrc: 'https://competition.adesignaward.com/images/square-logo-with-text-vertical-hires.jpg' },
    { year: '2025', award: 'LOOP Design Awards', recognition: 'Winner — Interior Renovations', project: 'FEEL Boutique Plaza', url: 'https://loopdesignawards.com/winners-2025/', logoSrc: 'https://loopdesignawards.com/wp-content/uploads/2020/02/LOOP_awards_badge_2024.png' },
    { year: '2025', award: 'Architizer A+Awards', recognition: 'Special Mention — Architecture +Art', project: 'Jan Plaza', url: 'https://architizer.com/projects/jan-plaza/', logoSrc: 'https://architizer-uploads.s3.us-west-2.amazonaws.com/A%2BAwardsLogo_WhiteStacked.png', dark: true },
    { year: '2025', award: 'DNA Paris Design Awards', recognition: 'Honorable Mention', project: 'Jan Plaza', url: 'https://dna.paris/winner/zoom.php?eid=71-93884-25', logoSrc: 'https://gehri.ch/content/uploads/2024/07/Paris_Design_Awards_Logo-992x620.jpg' },
    { year: '2025', award: 'DNA Paris Design Awards', recognition: 'Honorable Mention', project: 'LOOKOUT/IN Café', url: 'https://dna.paris/winner/zoom.php?eid=71-93978-25', logoSrc: 'https://gehri.ch/content/uploads/2024/07/Paris_Design_Awards_Logo-992x620.jpg' },
    { year: '2025', award: 'NY Product Design Awards', recognition: 'Silver Winner', project: 'NOUSHELLA — LoveLight Dress', url: 'https://nydesignawards.com/winner-info.php?id=3329', logoSrc: 'https://nydesignawards.com/upload/winner/1637724570winner_2.png' },
    { year: '2025', award: 'DNA Paris Design Awards', recognition: 'Honorable Mention', project: 'NOUSHELLA — LoveLight Dress', url: 'https://dna.paris/winner/zoom.php?eid=71-94212-25', logoSrc: 'https://gehri.ch/content/uploads/2024/07/Paris_Design_Awards_Logo-992x620.jpg' },
    { year: '2025', award: 'DNA Paris Design Awards', recognition: 'Honorable Mention', project: 'NOUSHELLA — Lumière Dress', url: 'https://dna.paris/winner/zoom.php?eid=71-93916-25', logoSrc: 'https://gehri.ch/content/uploads/2024/07/Paris_Design_Awards_Logo-992x620.jpg' },
    { year: '2025', award: 'Architecture MasterPrize', recognition: 'Honorable Mention — Architectural Design of the Year', project: 'LOOKOUT/IN Café', url: 'https://architectureprize.com/winners/2025_hm.php?level=pro', logoSrc: 'https://architectureprize.com/wp-content/uploads/2018/06/AM-logo-color-on-white-main.png' },
    { year: '', award: 'Architecture of the Year Award', recognition: 'Finalist', project: 'LOOKOUT/IN Café', logoText: 'هنرمعماری' },
    { year: '', award: 'Shiraz Interior Architecture Award', recognition: 'Finalist', project: 'LOOKOUT/IN Café', logoText: 'جایزه معماری شیراز' }
  ];
}
