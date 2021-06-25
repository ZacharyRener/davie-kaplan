<div class="col-md-8 col-md-offset-1 col-sm-8 body-txt pull-right about-body">
    
    @if(get_field('featured_article'))

        @php

        $imageUrl = get_the_post_thumbnail_url(get_field('featured_article'));
        $title = get_the_title(get_field('featured_article'));
        $date = get_the_date('', get_field('featured_article'));
        $url = get_the_permalink(get_field('featured_article'));

        @endphp

    @else

    @php
        
    $args = [
        'post_type' => 'post',
        'posts_per_page' => 1,
        'orderby' => 'date',
        'order' => 'DESC'
    ];

    $recent_post = new WP_Query($args);

    @endphp

    @if($recent_post->have_posts())
        @while($recent_post->have_posts())
            @php $recent_post->the_post(); @endphp

            @php
            $imageUrl = get_the_post_thumbnail_url();
            $title = get_the_title();
            $date = get_the_date();
            $url = get_the_permalink();
            @endphp

        @endwhile
    @endif

    @endif

    <h1>Blog</h1>

    <div class="featured-content-wrapper sidebar-box">
        <div class="featured-content">
            <div class="col-xs-12">
                <div class="fpo-img pull-left">
                    <img src="{{ $imageUrl }}" style="margin-bottom: 30px;">
                </div>
                <div class="f-c-title">
                    <h5 class="ftr-content-title">Featured Article</h5>
                    <h4>{{ $title }}</h4>
                </div>
                <p style='display:none;'>{{ $date }}</p>
                <a href="{{ $url }}"
                    class="button red no-arrow">Read Post</a>
            </div>
        </div>
    </div>

    <div id='blog-root'></div>

</div>