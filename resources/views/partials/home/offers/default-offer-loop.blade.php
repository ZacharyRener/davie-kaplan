@php
$custom_bg = $offer->s2_offer_background_color;
$border_thickness = $offer->s2_offers_border_thickness;
$border_color = $offer->offer_border_color;

if($border_thickness > 0) {
    $border_style = 'solid';
}else{
    $border_style = 'none';
}
@endphp


<div class="col-sm-4 team-box" style="text-align: <?php echo $offer_alignment; ?>">

    

    <div class="our-team-box" style="background-color: {{ $custom_bg }} border-color: {{ $border_color }} border-width: {{ $border_thickness }}px; border-style: {{ $border_style }}">

        

        @if ( get_field('split_image', $offer_id) ) 
            <div class="row">
                <div class="col-md-6">
                    <a href="{{ get_field( 'offer_link', $offer_id ) }}" class="linked-featured-img">
                        <img src="{{ get_field( 'offer_image', $offer_id ) }}" style="width: 100%; height: auto;">
                    </a>
                </div>
                <div class="col-md-6" style="margin-top:20px;">
                    {{ get_field('split_text', $offer_id) }}
                </div>
            </div>
        @else
            <a href={{ get_field( 'offer_link', $offer_id ) }} class="linked-featured-img">
                <img src="{{ get_field( 'offer_image', $offer_id ) }}" style="width: 100%; height: auto;">
            </a>
        @endif

        <div style="padding: 10px 25px 25px 25px;">
            <h5>
                <a href="{{ get_field( 'offer_link', $offer_id) }} ">
                    {{ get_field( 'offer_title', $offer_id ) }}
                </a>
            </h5>
            <span>{!! get_field( 'offer_excerpt', $offer_id ) !!}</span>
            <a href="{{ get_field( 'offer_link', $offer_id ) }}" class="button arrow red">
                {{ get_field( 'offer_button_text', $offer_id ) }}
            </a>
       </div>

    </div>

</div>