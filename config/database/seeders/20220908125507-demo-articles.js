'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const articles = [];
    for (let i = 1; i < 6; i++) {
      for (let j = 1; j < 6; j++) {
        articles.push({
          title: `Lorem ipsum${i * j}`,
          perex: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse nisl. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
          content: `# Veri virginitas quanta commemorat vestras

## Tuto herbas

Lorem **markdownum tantum**, tum et dixit ardebant **habitantem tempora potat**
fertilitas. Strictique ignara Theseus auspicio Phrygii; adspicit scit patrem
ordine materiamque epulae, iniqua, ita aera. Nisi est longi summis purasque
cessit nitidaque alimenta et volvere manus iudice illi dieque spemque et.

Ponti solidumve inde movit ante radiantis: nata candescere dedit ipse, iugalia
mente! Duce talum litem pectus [praestatque condita
siste](http://vellent.org/tuosaxo.html) nata esse totoque. Postquam quaerunt
accepti stridore subito, mentis ab facies nec. Auxilio vates. Dea qua, sum
*labant*; quo mala bella ferus vacet timet procumbere quoque prohibentque
saturae tot agnovit.

> Dixisse fieri, equo induruit fecit et quam generosaque sic obstructaque,
> Hippomenes! Turba longoque iubet. Turbant pudor quo contra *sequendi quippe*,
> axis erravit falsum? Ardore volenti frustraque litora releguntque Lycabas,
> breve viros dabit caelestibus vices capillos, premit medullas in quod,
> Hesperium. Saltem inmotas.

## Senior tum rubefactaque prolisque nam modo Cebrenida

Dextra in si namque partus, qui ut iuvabat at turres, Aiax dea sistitur silentia
maxima parenti habebat. Aqua spinae vobis: nec neque Oceanum nox undas casias,
ferit non, trux ceu, en. Novi excessisse circumdata ardet decertare corruit
suoque avus modo inventa tuo *multo excipiunt* cetera iubes diverso, ille.
Sustinet mox Capetusque duos conceptus coimus: in, deus es Clanis deprenduntur
**saltibus repulsae ad** vires, Cydoneasque. Mite visaque non clamant erat nec
Orphea sed sim aratri, et.

Cernit instabat et tamen odoratis furiale sollicitive quo nunc segetes Europam
eloquioque dant et saepe, deo veniat. Ipsa deque tunc ture morboque aequalibus
accedere Peleus de mortales videndi imagine gelidis moenia. Nulla
[Coae](http://umbraein.org/) pectora movere fera cultusque regnat cunctaque mox,
moriere obsistere Clytumque cuncta, quae sola!`,
          deleted: false,
          state: `done`,
          image: `../../../assets/article-images/image${i}.jpeg`,
          user_id: i
        });
      }
    }
    const draft = {
      title: `Lorem ipsum`,
      perex: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse nisl. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
      content: `# Veri virginitas quanta commemorat vestras

## Tuto herbas

Lorem **markdownum tantum**, tum et dixit ardebant **habitantem tempora potat**
fertilitas. Strictique ignara Theseus auspicio Phrygii; adspicit scit patrem
ordine materiamque epulae, iniqua, ita aera. Nisi est longi summis purasque
cessit nitidaque alimenta et volvere manus iudice illi dieque spemque et.

Ponti solidumve inde movit ante radiantis: nata candescere dedit ipse, iugalia
mente! Duce talum litem pectus [praestatque condita
siste](http://vellent.org/tuosaxo.html) nata esse totoque. Postquam quaerunt
accepti stridore subito, mentis ab facies nec. Auxilio vates. Dea qua, sum
*labant*; quo mala bella ferus vacet timet procumbere quoque prohibentque
saturae tot agnovit.

> Dixisse fieri, equo induruit fecit et quam generosaque sic obstructaque,
> Hippomenes! Turba longoque iubet. Turbant pudor quo contra *sequendi quippe*,
> axis erravit falsum? Ardore volenti frustraque litora releguntque Lycabas,
> breve viros dabit caelestibus vices capillos, premit medullas in quod,
> Hesperium. Saltem inmotas.

## Senior tum rubefactaque prolisque nam modo Cebrenida

Dextra in si namque partus, qui ut iuvabat at turres, Aiax dea sistitur silentia
maxima parenti habebat. Aqua spinae vobis: nec neque Oceanum nox undas casias,
ferit non, trux ceu, en. Novi excessisse circumdata ardet decertare corruit
suoque avus modo inventa tuo *multo excipiunt* cetera iubes diverso, ille.
Sustinet mox Capetusque duos conceptus coimus: in, deus es Clanis deprenduntur
**saltibus repulsae ad** vires, Cydoneasque. Mite visaque non clamant erat nec
Orphea sed sim aratri, et.

Cernit instabat et tamen odoratis furiale sollicitive quo nunc segetes Europam
eloquioque dant et saepe, deo veniat. Ipsa deque tunc ture morboque aequalibus
accedere Peleus de mortales videndi imagine gelidis moenia. Nulla
[Coae](http://umbraein.org/) pectora movere fera cultusque regnat cunctaque mox,
moriere obsistere Clytumque cuncta, quae sola!`,
      deleted: false,
      state: `draft`,
      image: `../../../assets/article-images/image1.jpeg`,
      user_id: 5
    }
    articles.push(draft);
    await queryInterface.bulkInsert('articles', articles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('articles', null, {});
  }
};
