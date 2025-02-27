function initMap() {
  var e = $("#map").data("latitude"),
    t = $("#map").data("longitude"),
    a = $("#map").data("zoom"),
    o = new google.maps.LatLng(e, t),
    s = {
      zoom: a,
      center: o,
      mapTypeControl: !1,
      disableDefaultUI: !0,
      zoomControl: !0,
      scrollwheel: !1,
      styles: [
        {
          stylers: [
            { hue: "#ff1a00" },
            { invert_lightness: !0 },
            { saturation: -100 },
            { lightness: 33 },
            { gamma: 0.5 },
          ],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#2a2b30" }],
        },
      ],
    },
    i = new google.maps.Map(document.getElementById("map"), s);
  new google.maps.Marker({ position: o, map: i, title: "We are here!" });
}
function contactFormSetup() {
  $(".input-field").each(function () {
    $(this).val()
      ? $(this).addClass("input--filled")
      : $(this).removeClass("input--filled");
  }),
    $(".input-field").on("keyup", function () {
      $(this).val()
        ? $(this).addClass("input--filled")
        : $(this).removeClass("input--filled");
    }),
    $("#contact-form").on("submit", function (e) {
      e.preventDefault();
      var t = $("#cf-name").val(),
        a = $("#cf-email").val(),
        o = $("#cf-message").val(),
        s = 0;
      $(".cf-validate", this).each(function () {
        "" == $(this).val()
          ? ($(this).addClass("cf-error"), (s += 1))
          : $(this).hasClass("cf-error") &&
            ($(this).removeClass("cf-error"), s > 0 && (s -= 1));
      }),
        0 === s &&
          $.ajax({
            type: "POST",
            url: "mail.php",
            data: { cf_name: t, cf_email: a, cf_message: o },
            success: function (e) {
              $("#contact-form .input-field").val(""),
                showAlertBox(e.status, e.responseText);
            },
            error: function (e) {
              showAlertBox(e.status, e.responseText);
            },
          });
    });
}
function showAlertBox(e, t) {
  var a = $('<div class="alert"></div>'),
    o = $("#contact-form .alert-container");
  200 == e
    ? (a.addClass("alert-success").html(t), o.html(a))
    : (a.addClass("alert-danger").html(t), o.html(a)),
    o.fadeIn(300).delay(2e3).fadeOut(400);
}
$(window).on("load", function () {
  if (
    ($(".loading-text").delay(1e3).fadeOut("slow"),
    $(".preloader").delay(2e3).fadeOut("slow"),
    $(".portfolio-items").length)
  ) {
    var e = $(".portfolio-items"),
      t = $(".portfolio-filter ul li");
    e.isotope(),
      t.on("click", function () {
        t.removeClass("active"), $(this).addClass("active");
        var e = $(this).data("filter");
        $(".portfolio-items").isotope({ filter: e });
      });
  }
}),
  $(document).ready(function () {
    "use strict";
    $(".text-slideshow").length && animateText(),
      $(".pages-stack .page").each(function () {
        var e = "#" + $(this).attr("id");
        new SimpleBar($(e)[0], { scrollbarMinSize: 15 });
      }),
      $(".portfolio-items .image-link").magnificPopup({ type: "image" }),
      $(".portfolio-items .video-link").magnificPopup({ type: "iframe" }),
      $(".testimonials .owl-carousel").owlCarousel({
        loop: !0,
        margin: 30,
        autoplay: !0,
        smartSpeed: 500,
        responsiveClass: !0,
        dots: !1,
        autoplayHoverPause: !0,
        responsive: { 0: { items: 1 }, 800: { items: 1 }, 992: { items: 2 } },
      }),
      $(".clients .owl-carousel").owlCarousel({
        loop: !0,
        margin: 30,
        autoplay: !0,
        smartSpeed: 500,
        responsiveClass: !0,
        autoplayHoverPause: !0,
        dots: !1,
        responsive: {
          0: { items: 2 },
          575: { items: 3 },
          768: { items: 4 },
          1e3: { items: 6 },
        },
      }),
      $("#map").length && initMap(),
      $(window).on("hashchange", function () {
        setTimeout(function () {
          "contact" === window.location.hash.slice(2) &&
            $("#map").length &&
            initMap(),
            console.log("triggered");
        }, 500);
      }),
      contactFormSetup(),
      console.log(window.location.hash.slice(2));
  });
