@php
$msl_arrows_color = $msl_arrows_color;
$msl_arrow_size = $msl_arrow_size;
$sl_slider_style = $sl_slider_style;
$slider_bg = $slider_background_color;
$hpf_site_bg_color = get_theme_mod( 'site_bg_color' );
// slide_image
// slide_video
$slide_image = !empty(get_field('slide_image')) 
    ? get_field('slide_image')
    : '/wp-content/uploads/2021/04/Homepage-Header.jpeg';
@endphp
<div class='home-slider-wrapper'>
    <!--
<div class='movingBg'></div>
<img class='movingImg' src='{{$slide_image}}' />
    -->
<div class="banner home-slider" style="background-color: <?php echo $slider_bg; ?>">
    
    <div class="owl-slider">
        <div class="owl-carousel">

            @if(have_rows('homepage-slider') )
                @while( have_rows('homepage-slider') )
                @php
                the_row();
                $slslide_image = esc_html(get_sub_field('slide_image'));
                $slslide_text = get_sub_field('slide_text');
                $slider_text_alignment = get_sub_field('slider_text_alignment');
                $slslide_heading = esc_html(get_sub_field('slide_heading'));
                $slbutton_text = esc_html(get_sub_field('button_text'));
                $slbutton_link = esc_html(get_sub_field('button_link'));
                $slheading_size = esc_html(get_sub_field('heading_font_size'));
                $heading_line_height = esc_html(get_sub_field('heading_line_height'));

                $slheading_family = esc_html(get_sub_field('heading_font_family'));
                $slheading_style = esc_html(get_sub_field('heading_font_style'));
                $slheading_transform = esc_html(get_sub_field('heading_font_transform'));

                $slheading_color = esc_html(get_sub_field('heading_font_color'));
                $slcopy_font_size = esc_html(get_sub_field('sl_copy_font_size'));
                $text_line_height = esc_html(get_sub_field('text_line_height'));

                $slcopy_font_family = esc_html(get_sub_field('sl_copy_font_family'));
                $slcopy_font_style = esc_html(get_sub_field('sl_copy_font_style'));

                $slcopy_font_color = esc_html(get_sub_field('sl_copy_font_color'));
                $slbutton_color = esc_html(get_sub_field('sl_button_color'));
                $slbutton_border_radius = esc_html(get_sub_field('sl_button_border_radius'));
                $slbutton_font_color = esc_html(get_sub_field('sl_button_font_color'));
                $sl_box_bg_color = esc_html(get_sub_field('sl_box_bg_color'));
                $sl_box_bg_opacity = esc_html(get_sub_field('sl_box_bg_opacity'));
                $sl_box_border_radius = esc_html(get_sub_field('sl_box_border_radius'));
                $sl_boxed_content = esc_html(get_sub_field('sl_boxed_content'));

                ?>
                <?php
                $slider_class = '';
                if($sl_slider_style == 'SLSTY1') {
                    $slider_class = 'style1';
                } else if($sl_slider_style == 'SLSTY2') {
                    $slider_class = 'style2';
                } else {
                    $slider_class = 'style1';
                }
                $boxedopacity = '';
                $boxed_class = '';
                $boxed_output = '';
                if($sl_slider_style == 'SLSTY2') {
                    if($sl_boxed_content == 'Yes') {
                        $boxedopacity = $sl_box_bg_opacity;
                        $color = $sl_box_bg_color;
                        $boxedrgba = hex2rgba($color, $boxedopacity);
                        $boxedoutput = "background:" . $boxedrgba . " !important; border-radius:" .  $sl_box_border_radius . "px !important ;";
                        $boxed_class = 'boxed';
                    } else if($sl_boxed_content == 'No') {
                        $boxed_class = 'unboxed';
                        $boxedoutput = "background: transparent !important; border-radius: 0px !important ;";
                    } else {
                        $boxed_class = 'boxed';
                    }
                }
                if($slheading_size) {
                    $slheading_size = $slheading_size;
                } else {
                    $slheading_size == '36';
                }

                if($heading_line_height) {
                    $heading_line_height = $heading_line_height;
                } else {
                    $heading_line_height == '46';
                }

                if($slider_text_alignment) {
                    $slider_text_alignment = $slider_text_alignment;
                } else {
                    $slider_text_alignment = 'center';
                }

                if($slheading_color) {
                    $slheading_color = $slheading_color;
                } else {
                    $slheading_color = '#ffffff';
                }
                if($slcopy_font_size) {
                    $slcoy_font_size = $slcopy_font_size;
                } else {
                    $slcopy_font_size == '14';
                }

                if($text_line_height) {
                    $text_line_height = $text_line_height;
                } else {
                    $text_line_height == '24';
                }

                if($slcopy_font_color) {
                    $slcopy_font_color = $slcopy_font_color;
                } else {
                    $slcopy_font_color = '#ffffff';
                }
                if($slbutton_color) {
                    $slbutton_color = $slbutton_color;
                } else {
                    $slbutton_color = '#489ca8';
                }
                if($slbutton_border_radius) {
                    $slbutton_border_radius = $slbutton_border_radius;
                }  else {
                    $slbutton_border_radius == '5';
                }
                if($slbutton_font_color) {
                    $slbutton_font_color = $slbutton_font_color;
                } else {
                    $slbutton_font_color = '#ffffff';
                }

                @endphp
                        
                <div class="owl-slide {{ $slider_class }} {{ $boxed_class }}">

                    @if (!empty(get_sub_field('slide_video')))

                        <div class="slide-vid">
                            <video autoplay id="owl-vid" height="100%" width="auto" muted="muted" loop >
                                <source src="{{ get_sub_field('slide_video') }}" type="video/mp4" >
                            </video>
                        </div>

                    @else
                        
                        <div class="slide-img" style="">
                            <img class='movingImg' src='{{$slslide_image}}' />
                        </div>

                    @endif
                    
                    <div class='container'>
                        <div class="slide-txt" style="text-align: {{ $slider_text_alignment }} !important; {{ $boxedoutput }}">
                            <h2>{{ $slslide_heading }}</h2>
                            <p>{{ $slslide_text }}</p>
                            <a style="border-radius:{{ $slbutton_border_radius }}px; background:{{ $slbutton_color }}; color: {{ $slbutton_font_color }};" href=" {{ $slbutton_link }}">{{ $slbutton_text }}</a>
                            <div class='loading-bar-root' time-delay='10s'></div>
                        </div>
                    </div>
                </div>	

            @endwhile
            @endif
        </div>
    </div>
</div>
</div>
<style>

    @if($msl_arrow_placement == 'Outside')
        body .home-slider .owl-slider .owl-controls .owl-buttons, body .home-slider .owl-slider .owl-controls {
            width: 100%;
        }
    @endif;

    body .home-slider .owl-slider .owl-buttons > div i {
        @if($msl_arrows_color) 
            color: {{ $msl_arrows_color}};
        @endif
        @if($msl_arrow_size)
            font-size: {{ $msl_arrow_size }}px;
        @endif
    }

    .slide-img::after {
        display: block;
        position: absolute;
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, {{ $hpf_site_bg_color }} 100%);
        bottom: 0;
        height: 150px;
        width: 100%;
        content: '';
        z-index: 100;
    }
    
    @media only screen and (max-width:801px) {
        .slide-img::after {
            bottom: 120px !important;
        }
    }

</style>

<script>

    jQuery(document).ready(function(){
        jQuery('.banner.home-slider').css('height', jQuery(window).height());
        jQuery('.home-slider .owl-slider .owl-slide').css('height', jQuery(window).height());
        
    });
    jQuery(window).resize(function(){
        jQuery('.banner.home-slider').css('height', jQuery(window).height());
        jQuery('.home-slider .owl-slider .owl-slide').css('height', jQuery(window).height());
    });

</script>