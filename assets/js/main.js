$(function ($) {
  "use strict";

  jQuery(document).ready(function () {
    // preloader
    $("#preloader")
      .delay(300)
      .animate(
        {
          opacity: "0",
        },
        500,
        function () {
          $("#preloader").css("display", "none");
        }
      );

    // data background
    $("[data-background]").each(function () {
      $(this).css(
        "background-image",
        "url(" + $(this).attr("data-background") + ")"
      );
    });

    // navbar
    $(".nav__bar").on("click", function () {
      $(this).toggleClass("nav__bar-toggle");
      $(".nav__menu").toggleClass("nav__menu-active");
      $(".backdrop").toggleClass("backdrop-active");
    });

    $(".backdrop, .nav__menu-close, .nav__menu-link").on("click", function () {
      $(".backdrop").removeClass("backdrop-active");
      $(".nav__bar").removeClass("nav__bar-toggle");
      $(".nav__menu").removeClass("nav__menu-active");
    });

    $(window).on("resize", function () {
      $(".backdrop").removeClass("backdrop-active");
      $(".nav__bar").removeClass("nav__bar-toggle");
      $(".nav__menu").removeClass("nav__menu-active");
    });

    if ($(window.width < 1200)) {
      $(".nav__menu-link--dropdown").on("click", function () {
        $(this)
          .next(".nav__menu-dropdown")
          .toggleClass("nav__menu-dropdown-active");
      });
      $(".nav__menu-dropdown-link--dropdown").on("click", function () {
        $(this)
          .next(".nav__menu-dropdown--secondary")
          .toggleClass("nav__menu-dropdown--secondary-active");
      });
    }

    // registration modal
    $(".sign-up").on("click", function () {
      $(".registration").addClass("registration__active");
      $(".registration__content--sign").hide();
      $(".registration__content--up").show();
      $("body").addClass("modal-active");
    });

    $(".log-in").on("click", function () {
      $(".registration").addClass("registration__active");
      $(".registration__content--up").hide();
      $(".registration__content--sign").show();
      $("body").addClass("modal-active");
    });

    $(".registration").on("click", function (e) {
      var container = $(".registration__content");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        $(".registration").removeClass("registration__active");
        $("body").removeClass("modal-active");
      }
    });

    // calculate tab

    class simple_bet {
      constructor() {
        this.init = function () {
          this.detectChange();
        };

        this.detectChange = function () {
          var parent = this;
          jQuery(
            "#bet-back-stack, #bet-back-odds, #bet-lay-odds, #bet-commission"
          ).on("input", function () {
            parent.calculate();
          });

          jQuery(".bet-type").on("change", function () {
            parent.calculate();
          });

          jQuery(".bet-type").trigger("change");
        };

        this.calculate = function () {
          var $ = jQuery;
          var back_stack = parseFloat($("#bet-back-stack").val());
          var back_odds = parseFloat($("#bet-back-odds").val());
          var lay_odds = parseFloat($("#bet-lay-odds").val());
          var commission = parseFloat($("#bet-commission").val());
          var type = $(".bet-type:checked").val();

          if (type == "normal" || type == "sr") {
            var lay_stack =
              (back_odds / (lay_odds - commission / 100)) * back_stack;
          } else {
            var lay_stack =
              ((back_odds - 1) / (lay_odds - commission / 100)) * back_stack;
          }

          var profit = 0;
          var exc_balance = 0;

          if (!isNaN(lay_stack)) {
            $("#bet-lay-stack-result").html("£ " + lay_stack.toFixed(2));

            if (type == "normal" || type == "snr") {
              profit =
                (back_odds - 1) * back_stack - (lay_odds - 1) * lay_stack;
            } else {
              profit = back_odds * back_stack - (lay_odds - 1) * lay_stack;
            }

            if (!isNaN(profit)) {
              if (profit >= 0) {
                $("#bet-profit").html(
                  '<span class="bet-profit">£ ' + profit.toFixed(2) + "</span>"
                );
              } else {
                $("#bet-profit").html(
                  '<span class="bet-loss">£ ' + profit.toFixed(2) + "</span>"
                );
              }
            } else {
              profit = "0";
              $("#bet-profit").html(
                '<span class="bet-profit">£ ' + profit + "</span>"
              );
            }

            exc_balance = lay_stack * (lay_odds - 1);

            if (!isNaN(exc_balance)) {
              $("#bet-exc-balance").html("£ " + exc_balance.toFixed(2));
            } else {
              exc_balance = "0";
              $("#bet-exc-balance").html("£ " + exc_balance);
            }
          } else {
            $("#bet-lay-stack-result").html("£ 0");
          }
        };
      }
    }

    jQuery(function ($) {
      var simple_bet_obj = new simple_bet();
      simple_bet_obj.init();
    });

    // blog filter
    $(".cmn-button--filter").on("click", function () {
      $(".cmn-button--filter").removeClass("cmn-button--filter-active");
      $(this).addClass("cmn-button--filter-active");

      var $blogItem = $(this).attr("data-blog");

      if ($blogItem == "all") {
        $(".blog__filter").removeClass("is-hidden");
      } else {
        $(".blog__filter").addClass("is-hidden");
        $(".blog__filter[data-blog=" + $blogItem + "]").removeClass(
          "is-hidden"
        );
      }
    });

    // open reply box
    $(".reply-btn").on("click", function () {
      $(this)
        .closest(".blog-single__comment")
        .children(".blog-single__reply")
        .slideToggle();
    });

  

    $(".scrollToTop").on("click", function () {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        500
      );
    });

    $("#cog").on("click", function () {
      $(".theme-option").toggleClass("theme-option-active");
    });

    $(".out-theme").on("click", function () {
      $(".theme-option").removeClass("theme-option-active");
    });

    $("#dark").on("click", function () {
      window.localStorage.setItem(
        "dark-theme",
        $("body").addClass("dark-mode")
      );
      $("img[src='assets/images/logo.png']").attr(
        "src",
        "assets/images/logo-light.png"
      );
    });

    if (localStorage.getItem("dark-theme")) {
      $("body").addClass("dark-mode");
      $("img[src='assets/images/logo.png']").attr(
        "src",
        "assets/images/logo-light.png"
      );
    }

    $("#light").on("click", function () {
      $("body").removeClass("dark-mode");
      localStorage.removeItem("dark-theme");
      $("img[src='assets/images/logo-light.png']").attr(
        "src",
        "assets/images/logo.png"
      );
      $("#fixed-logo").attr("src", "assets/images/logo-light.png");
    });

    $("body").on("click", function (e) {
      if ($(e.target).closest(".theme").length === 0) {
        $(".theme-option").removeClass("theme-option-active");
      }
    });
  });
});
