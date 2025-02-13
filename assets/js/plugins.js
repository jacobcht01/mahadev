$(function ($) {
  "use strict";

  jQuery(document).ready(function () {
    // wow init
    new WOW().init();

    // video popup
    if ($(".hero__video").length) {
      $(".hero__video").magnificPopup({
        type: "iframe",
      });
    }

    // video popup
    if ($(".work__video__btn").length) {
      $(".work__video__btn").magnificPopup({
        type: "iframe",
      });
    }

    // testimonial slider
    $(".testimonial__slider")
      .not(".slick-initialized")
      .slick({
        infinite: true,
        autoplay: true,
        focusOnSelect: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        prevArrow: $(".prev-testimonial"),
        nextArrow: $(".next-testimonial"),
      });

    // featured slider
    $(".featured__slider")
      .not(".slick-initialized")
      .slick({
        infinite: true,
        autoplay: true,
        focusOnSelect: true,
        speed: 2000,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        centerMode: true,
        centerPadding: "0px",
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 375,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
  });
});
