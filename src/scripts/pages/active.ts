/**
 * ================================================================
 * active.ts — Inicializaciones de Carruseles y Sliders MuscleRice
 * ================================================================
 */

// Declaraciones de objetos globales de jQuery y plugins
declare const $: any;
declare const $JssorSlider$: any;
declare const $Jease$: any;
declare const $Jssor$: any;

// Hacer jssor_1_slider_init accesible globalmente si es necesario
let jssor_1_slider_init: (() => void) | undefined;

$(document).ready(() => {
  // Inicialización de Owl Carousel
  const owlCarousel = $('.owl-carousel');
  if (owlCarousel.length && typeof owlCarousel.owlCarousel === 'function') {
    owlCarousel.owlCarousel({
      loop: true,
      nav: true,
      items: 1
    });
  }

  // Inicialización de Magnific Popup
  const productSingle = $('.product-single');
  if (productSingle.length && typeof productSingle.magnificPopup === 'function') {
    productSingle.magnificPopup({
      delegate: 'a',
      type: 'image',
      closeOnContentClick: false,
      closeBtnInside: false,
      mainClass: 'mfp-with-zoom mfp-img-mobile',
      image: {
        verticalFit: true,
      },
      gallery: {
        enabled: true
      },
    });
  }

  // Inicialización de Jssor Slider
  const jssorContainer = document.getElementById('jssor_1');
  if (jssorContainer && typeof $JssorSlider$ !== 'undefined') {
    jssor_1_slider_init = function () {
      const jssor_1_options = {
        $AutoPlay: true,
        $Idle: 0,
        $AutoPlaySteps: 4,
        $SlideDuration: 2500,
        $SlideEasing: $Jease$.$Linear,
        $PauseOnHover: 4,
        $SlideWidth: 140,
        $Cols: 5
      };

      const jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);

      /*responsive code begin*/
      function ScaleSlider() {
        const refSize = jssor_1_slider.$Elmt.parentNode.clientWidth;
        if (refSize) {
          const scaledWidth = Math.min(refSize, 809);
          jssor_1_slider.$ScaleWidth(scaledWidth);
        } else {
          window.setTimeout(ScaleSlider, 30);
        }
      }
      ScaleSlider();
      $Jssor$.$AddEvent(window, "load", ScaleSlider);
      $Jssor$.$AddEvent(window, "resize", ScaleSlider);
      $Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
      /*responsive code end*/
    };

    jssor_1_slider_init();
  }

  // Inicialización de bxSlider
  const sliderEl = $('#slider');
  if (sliderEl.length && typeof sliderEl.bxSlider === 'function') {
    sliderEl.bxSlider({
      ticker: true,
      tickerSpeed: 5000,
      tickerHover: true
    });
  }
});

export {};
