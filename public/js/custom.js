// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

// toggle overlay menu
function openNav() {
    document.getElementById("myNav").classList.toggle("menu_width");
    document.querySelector(".custom_menu-btn").classList.toggle("menu_btn-style");
}

// nice select
$(document).ready(function () {
    $('select').niceSelect();
});

// slick slider

$(".slider_container").slick({
    autoplay: true,
    autoplaySpeed: 1500,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: false,
    draggable: false,
    prevArrow: '<button class="slick-prev"> </button>',
    nextArrow: '<button class="slick-next"></button>',
    responsive: [{
            breakpoint: 991,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                adaptiveHeight: true,
            },
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 420,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        }
    ]
});


document.addEventListener("DOMContentLoaded", function() {
  const callButton = document.querySelector('.call-buton');
  const currentHour = new Date().getHours(); // Get the current hour (0-23)

  if (currentHour >= 11 && currentHour < 23) {
    callButton.style.display = 'block'; // Show the button between 11 AM and 11 PM
  } else {
    callButton.style.display = 'none'; // Hide the button between 11 PM and 11 AM
  }
});
