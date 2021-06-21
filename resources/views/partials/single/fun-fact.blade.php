@if($enable_fun_facts)
<section id='fun-facts'>
    <div class='container'>
        <div class='row'>
            <div class='col-md-4 col-sm-12'>
                <div class='fun-fact-slick'>
                    @foreach($gallery as $image)
                        <div class='slide'>
                            <img src='{{$image}}'>
                        </div>
                    @endforeach
                </div>
            </div>
            <div class='col-md-8 col-sm-12'>
                <div class='text'>
                    <h3 class='headline'>{{$headline}}</h3>
                    <div class='excerpt'>{!! $excerpt !!}</div>
                </div>
            </div>
        </div>
    </div>
</section>
@endif