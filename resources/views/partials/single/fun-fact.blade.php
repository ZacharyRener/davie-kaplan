@if(get_field('biography_casual') || $enable_fun_facts)
<section id='fun-facts'>
    <div class='container'>
        <div class='row'>
            <div class='col-md-4 col-sm-12'>
                <div class='fun-fact-slick'>
                    @if($gallery):
                        @foreach($gallery as $image)
                            <div class='slide'>
                                <img src='{{$image}}'>
                            </div>
                        @endforeach
                    @else
                        <div class='slide noImage'>
                            <img src='/wp-content/uploads/2021/06/DK-logo-copy.png'>
                        </div>
                    @endif
                </div>
            </div>
            <div class='col-md-8 col-sm-12'>
                <div class='text'>
                    @if($headline)
                        <h3 class='headline'>{{$headline}}</h3>
                    @else
                        <h3 class='headline'>Get to know the "real me"...</h3>
                    @endif
                    @if($excerpt)
                        <div class='excerpt'>{!! $excerpt !!}</div>
                    @elseif(get_field('biography_casual'))
                        <div class='excerpt'>{!! get_field('biography_casual') !!}</div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</section>
@endif