// Notation: "NOTE:durée(en temps)", "A+B" = accord (2 touches max), "-" = silence, "motif*N" = répété N fois
// Mélodies du domaine public, versions simplifiées. spd = vitesse de chute (fraction de l'écran / seconde)
export const LEVELS=['Facile','Moyen','Difficile','Très difficile','EXTRÊME'];
export const SONGS=[
{n:'Ode à la joie',a:'Beethoven',lv:0,bpm:100,spd:.42,s:['E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4:1.5 D4:.5 D4:2 E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 D4:1.5 C4:.5 C4:2']},
{n:'Berceuse',a:'Brahms',lv:0,bpm:95,spd:.42,s:['E4 E4 G4:2 E4 E4 G4:2 E4 G4 C5 B4 A4 A4 G4:2 D4 E4 F4 D4 D4 E4 F4 D4 D4 F4 B4 A4 G4 B4 C5:2']},
{n:'Canon en Ré',a:'Pachelbel',lv:1,bpm:100,spd:.5,s:['F#5 E5 D5 C#5 B4 A4 B4 C#5*2','D5:.5 F#5:.5 A5 A4:.5 B4:.5 C#5:.5 D5:.5 B4 D5:.5 C#5:.5 B4:.5 A4:.5 G4 B4 A4:2']},
{n:'Petite musique de nuit',a:'Mozart',lv:1,bpm:130,spd:.55,s:['G4 D4:.5 G4:.5 D4:.5 G4:.5 D4:.5 G4:.5 B4 D5:2 C5 A4:.5 C5:.5 A4:.5 C5:.5 A4:.5 C5:.5 E5 D5:2']},
{n:'Pour Élise',a:'Beethoven',lv:1,bpm:125,spd:.55,s:['E5:.5 D#5:.5 E5:.5 D#5:.5 E5:.5 B4:.5 D5:.5 C5:.5 A4:1.5 C4:.5 E4:.5 A4:.5 B4:1.5 E4:.5 G#4:.5 B4:.5 C5:1.5 E4:.5 E5:.5 D#5:.5 E5:.5 D#5:.5 E5:.5 B4:.5 D5:.5 C5:.5 A4:1.5 C4:.5 E4:.5 A4:.5 B4:1.5 E4:.5 C5:.5 B4:.5 A4:2']},
{n:'Prélude en Do majeur',a:'Bach',lv:2,bpm:110,spd:.65,s:['C4:.5 E4:.5 G4:.5 C5:.5 E5:.5 G4:.5 C5:.5 E5:.5*2','C4:.5 D4:.5 A4:.5 D5:.5 F5:.5 A4:.5 D5:.5 F5:.5*2','B3:.5 D4:.5 G4:.5 D5:.5 F5:.5 G4:.5 D5:.5 F5:.5*2','C4:.5 E4:.5 G4:.5 C5:.5 E5:.5 G4:.5 C5:.5 E5:.5*2','C4+E5:4']},
{n:'Clair de lune (Sonate)',a:'Beethoven',lv:2,bpm:62,spd:.6,s:['G#3:.33 C#4:.33 E4:.33*4','A3:.33 C#4:.33 E4:.33*2','A3:.33 D4:.33 F#4:.33*2','G#3:.33 C#4:.33 F4:.33*2','G#3:.33 C#4:.33 E4:.33*2','C#4+E4:2']},
{n:'Marche turque',a:'Mozart',lv:3,bpm:125,spd:.8,s:['B5:.25 A5:.25 G#5:.25 A5:.25 C6 D6:.25 C6:.25 B5:.25 C6:.25 E6 F6:.25 E6:.25 D#6:.25 E6:.25 B6:.25 A6:.25 G#6:.25 A6:.25 B6:.25 A6:.25 G#6:.25 A6:.25 C7:1.5 A6 C7:1 B6:.5 A6:.5 G6:.5 A6:.5 B6:2']},
{n:'Le vol du bourdon',a:'Rimski-Korsakov',lv:4,bpm:120,spd:1.0,s:['E5:.25 D#5:.25 D5:.25 C#5:.25 D5:.25 C#5:.25 C5:.25 B4:.25 C5:.25 B4:.25 A#4:.25 A4:.25 G#4:.25 A4:.25 G#4:.25 G4:.25','E5:.25 D#5:.25 D5:.25 C#5:.25 D5:.25 C#5:.25 C5:.25 B4:.25 C5:.25 B4:.25 A#4:.25 A4:.25 G#4:.25 A4:.25 B4:.25 C5:.25','C#5:.25 D5:.25 D#5:.25 E5:.25 F5:.25 F#5:.25 G5:.25 G#5:.25 A5:.25 G#5:.25 G5:.25 F#5:.25 F5:.25 E5:.25 D#5:.25 D5:.25','A4+E5:.5 E5:.25 D#5:.25 E5:.25 D#5:.25 E5:.5 A4+E5:.5 E5:.25 D#5:.25 D5:.25 C#5:.25 A4+A5:1']},
{n:'La Campanella',a:'Liszt',lv:4,bpm:112,spd:1.0,s:['D#6:.25 D#5:.25*8','G#5:.25 G#6:.25 G#5:.25 G#6:.25 F#5:.25 F#6:.25 F#5:.25 F#6:.25*2','E5:.25 E6:.25 E5:.25 E6:.25 D#5:.25 D#6:.25 D#5:.25 D#6:.25*2','B5+B4:.5 G#5:.25 B5:.25 D#6+D#5:.5 B5:.25 G#5:.25 B5+B4:.5 G#5:.25 B5:.25 D#6+D#5:.5 G#6:.5 G#6+G#5:1']},
];
