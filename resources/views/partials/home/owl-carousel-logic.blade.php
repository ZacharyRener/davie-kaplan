<link rel="stylesheet" href="{{ get_stylesheet_directory_uri() }}/assets/owlcarousel/owl.carousel.min.css">
<link rel="stylesheet" href="{{ get_stylesheet_directory_uri() }}/assets/owlcarousel/owl.theme.min.css">
<link rel="stylesheet" href="{{ get_stylesheet_directory_uri() }}/assets/owlcarousel/owl.transitions.css">
<script src="{{ get_stylesheet_directory_uri() }}/assets/owlcarousel/owl.carousel.min.js"></script>
<script src="{{ get_stylesheet_directory_uri() }}/assets/owlcarousel/owl.autoplay.js"></script>
<script src="{{ get_stylesheet_directory_uri() }}/assets/owlcarousel/owl.video.js"></script>

@php
$slide_transition_speed = esc_html( get_field( 'slide_transition_speed' ) );
$slide_transition_style = esc_html( get_field( 'slide_transition_style' ) );
$msl_left_arrow = esc_html(get_field('msl_left_arrow'));
$msl_right_arrow = esc_html(get_field('msl_right_arrow'));
if($msl_left_arrow) {$msl_left_arrow = $msl_left_arrow;} else {$msl_left_arrow = "fa-caret-left";}
if($msl_right_arrow) {$msl_right_arrow = $msl_right_arrow;} else { $msl_right_arrow = "fa-caret-right";}
$hpf_client_slider_right_arrow = get_theme_mod('hpf_client_slider_right_arrow');
$hpf_client_slider_left_arrow = get_theme_mod('hpf_client_slider_left_arrow');
if( !empty($hpf_client_slider_right_arrow ) ){
    $hpf_client_slider_right_arrow = $hpf_client_slider_right_arrow;
} else {
    $hpf_client_slider_right_arrow ="fa-caret-right";
}
if( !empty($hpf_client_slider_left_arrow ) ){
    $hpf_client_slider_left_arrow = $hpf_client_slider_left_arrow;
} else {  
    $hpf_client_slider_left_arrow = "fa-caret-left";
}
@endphp

<script type="text/javascript">
(function ($) {
    $(document).ready(function () {
        setTimeout(()=>{
$(".owl-carousel:not(.owl-carousel-clients)").owlCarousel({
            transitionStyle: 'customHinge',
            loop: true,
            navigation: true,
            autoplay: true,
            autoPlaySpeed: 5000,
            autoPlayTimeout: 5000,
            autoplayHoverPause: true,
            @if( !empty( $slide_transition_speed ) )
                slideSpeed: {{$slide_transition_speed}},
            @else
                slideSpeed: 300,
            @endif
            singleItem: true,
            lazyLoad: true,
            @if( $slide_transition_style === 'fade' && false )
                transitionStyle: 'fade',
                items: 1,
                loop: true,
                margin: 0,
                stagePadding: 0,
                smartSpeed: 450,
            @endif
            pagination: false,
            navigationText: ['<i class="fa {{ $msl_left_arrow }}" aria-hidden="true"></i>', '<i class="fa {{ $msl_right_arrow }}" aria-hidden="true"></i>'],
            video:true,
        });

        jQuery('.owl-carousel:not(.owl-carousel-clients)').trigger('owl.play', {{ $slide_auto_play_length }});

        jQuery('.owl-carousel:not(.owl-carousel-clients)').trigger('next.owl.carousel', 1000);

        jQuery('.slide-txt').addClass('done');

        }, 0)

        
        var clientSlider = $(".owl-carousel-clients");
        clientSlider.owlCarousel({
            autoplay: true,
            autoPlaySpeed: 1500,
            navigation: false,
            slideSpeed: 300,
            paginationSpeed: 400,
            singleItem: false,
            loop: true,
            dots: true,
            pagination: true,
            items: 4,
            touchDrag: false,
            mouseDrag: false,
            pullDrag: false,
            freeDrag: false,
            slideBy: 4,
            itemsDesktop: [1024, 4],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 2],
            itemsMobile: [480, 2],
            navigationText: ['<i class="fa {{ $hpf_client_slider_left_arrow }}" aria-hidden="true"></i>', '<i class="fa {{ $hpf_client_slider_right_arrow }}" aria-hidden="true"></i>'],
        });

        

        clientSlider.trigger('owl.play', 2500);
        clientSlider.trigger('owl.play', 2500);

        

    });
}(jQuery));
</script>