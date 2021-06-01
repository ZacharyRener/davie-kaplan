<div class="col-md-8 col-md-offset-1 col-sm-8 body-txt pull-right about-body">
    
    @if(have_posts())
        @while(have_posts()) @php the_post(); @endphp
            <h1><a href='{{ get_the_permalink() }}'>{!! get_the_title() !!}</a></h1>
            <span class='wrapper'>@php the_excerpt(); @endphp</span>
        @endwhile
    @endif
</div>