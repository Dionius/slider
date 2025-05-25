(function($) {
    $(document).ready(function () {
        $('.my-slick-slider').slick({
            centerMode: true,
            freeMode: true,
            centerPadding: '0px',
            slidesToShow: 5,
            slidesToScroll: 5,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 2500,
            adaptiveHeight: true,
            swipeToSlide: true,
            speed: 500,
            arrows: true,
            dots: false,
            variableWidth: false,
            prevArrow: '<button class="slick-prev custom-arrow"><</button>',
            nextArrow: '<button class="slick-next custom-arrow">></button>',
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3
                    }
                }
            ]
        });

        $('.my-slick-slider').on('afterChange', function (event, slick, currentSlide) {
            let imgSrc = $('.slick-center img').attr('src');
            $('#central-image img').attr('src', imgSrc);
        });

        function filterCategory(category) {
            $('.my-slick-slider').slick('slickUnfilter');
            if (category !== 'ALL') {
                $('.my-slick-slider').slick('slickFilter', function () {
                    return $(this).hasClass(category);
                });
            }
            $('.my-slick-slider').slick('refresh');
            $('.filter-bttn').removeClass('active');
            $(`[data-filtertarget="${category}"]`).addClass('active');
        }

        $('.filter-bttn').click(function () {
            let category = $(this).data('filtertarget');
            filterCategory(category);
        });
         // Блокування drag для зображення
        $('#central-image img').on('dragstart', function (e) {
                e.preventDefault();
            });
        
            // Свайп на мобільних
            let startX = 0;
            let endX = 0;
        
            $('#central-image').on('touchstart', function (e) {
                startX = e.originalEvent.touches[0].clientX;
            });
        
            $('#central-image').on('touchend', function (e) {
                endX = e.originalEvent.changedTouches[0].clientX;
                handleSwipe();
            });
        
            // Свайп на десктопі через мишу
            $('#central-image').on('mousedown', function (e) {
                startX = e.clientX;
            });
        
            $('#central-image').on('mouseup', function (e) {
                endX = e.clientX;
                handleSwipe();
            });
        
            function handleSwipe() {
                let deltaX = endX - startX;
                if (Math.abs(deltaX) > 50) {
                    if (deltaX > 0) {
                        $('.my-slick-slider').slick('slickPrev');
                    } else {
                        $('.my-slick-slider').slick('slickNext');
                    }
                }
            }
        
            // Початкове оновлення зображення
            let initialImg = $('.slick-center img').attr('src');
            $('#central-image img').attr('src', initialImg);
        });
})(jQuery);
