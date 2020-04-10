export interface HeroBannerModel {

  /**
   * Die fixe Höhe des Bilder. NULLABLE. Die Standardhöhe beträgt 35rem.
   */
  imageHeight?: number;

  /**
   * Die url des anzuzeigenden Bildes im Hintergrund
   */
  imageUrl: string;

  /**
   * Der text der VOR dem alternierenden Text angezeigt wird.
   */
  morphextPrefix: string;

  /**
   * Der Text der über dem Bild alterniert. Alternierende Text werden mit einem ',' getrennt.
   * Zum Beispiel: Biber, WiWö, GuSp, CaEx, RaRo
   */
  morpext: string;

  /**
   * Der Text des Buttons. Wenn null oder undefined wird der button augeblendet.
   */
  buttonText?: string;
}
