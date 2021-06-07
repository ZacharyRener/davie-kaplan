<section id='slickCarouselWrapper'>

    <div class='slickCarousel'>
        @foreach($full_width_slider as $slide)
        <div 
        class='slide' 
        style='background:linear-gradient(48deg, rgba(52,164,234,1) 0%, rgba(255,255,255,0) 100%), url("{{$slide->background_image}}")'
            > 
            <div class='container'>
                <div class='content-wrapper'>
                    <p class='small-headline'>{{ $slide->small_headline }}</p>
                    <p class='large-excerpt'>{{ $slide->large_excerpt }}</p>
                    <a class='button' href='{{$slide->button_url}}'>{{$slide->button_text}}</a>
                </div>
            </div>
        </div>
        @endforeach
    </div>

    <div class='ontainer for-dots'>
        <div class='dots-container container'></div>
    </div>

     <div class='ontainer for-top-grid'>
        <div class='top-grid-container container'>
            <img src='/wp-content/uploads/2021/06/dotGridCrop.png' class='grid-image'>
        </div>
    </div>

     <div class='ontainer for-bottom-grid'>
        <div class='bottom-grid-container container'>
            <img src='/wp-content/uploads/2021/06/dotGridCrop.png' class='grid-image'>
        </div>
    </div>

</section>