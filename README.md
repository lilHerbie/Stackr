# Stackr

1. Door middel van een 'step-by-step' formulier kan men vrachtwagens aanmaken met de volgende kenmerken:
  I. Lengte/Breedte (met een maximum)
  II. Aankomst interval (in seconden)
  III. Type: Koud transport | Breekbaar transport | Algemeen transport | Pallets | Snelkoerier
2. Pakketten worden gegenereerd op een virtuele lopende band. De mogelijke vormen van de pakketten: https://en.wikipedia.org/wiki/Tetromino
3. De vormen moeten ook echt zo worden geplaatst in de vrachtwagen. Dus geen tetrisvorm in een vierkant blok!
4. Er kunnen tijdens het draaien van de simulatie meerdere lopende banden worden gemaakt
5. Er is animatie aanwezig hoe de pakketten naar de vrachtwagens gaan / geplaatst worden.
6. Je kan handmatig pakketten in vrachtwagens plaatsen door middel van drag&drop.
7. Er zijn twee laadhallen beschikbaar. Je kan wisselen tussen de hallen zonder dat de pagina opnieuw wordt geladen.
8. Afhankelijk van het weer (via API aanroepen) zullen sommige vrachtwagens niet rijden. Maak een oplossing dat je makkelijk de stad/locatie van de api call kan aanpassen. Hierdoor kan je makkelijk van weertype wisselen. Als het regent of sneeuwt rijd de Breekbaar Transport niet. Als het boven de 35 graden is rijd de Koud transport niet. Bij harde wind rijdt de palletvrachtwagen niet. Pakketten voor deze vrachtwagens worden dan op een speciale plek opgeslagen. Dat mag zelfs een extra hal zijn. Zorg ervoor dat je een 'debug' veldje aanmaakt in het systeem dat je snel van lokatie kan veranderen om een ander weertype te krijgen. Je mag meerdere API's aanroepen om bijvoorbeeld betere windsnelheden te krijgen.
9. Extra creativiteit wordt beloond! dat kan in vele vormen. Je kan zelfs je applicatie laten communiceren met TrackR (WEBPHP).
11. - extra geluids effecten