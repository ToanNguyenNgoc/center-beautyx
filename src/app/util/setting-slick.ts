export function settingsSlick() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        //autoplay: true,
        swipe: true,
        autoplaySpeed: 2000,
        //fade: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    swipe: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    swipe: true,
                    dots: true,
                    speed: 100,
                },
            },
        ],
    };
    return settings
}