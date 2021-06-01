@php
    
function get_snippet( $str, $wordCount = 10 ) {
  return implode( 
    '', 
    array_slice( 
      preg_split(
        '/([\s,\.;\?\!]+)/', 
        $str, 
        $wordCount*2+1, 
        PREG_SPLIT_DELIM_CAPTURE
      ),
      0,
      $wordCount*2-1
    )
  );
}

@endphp

<section id='experience'>
    
    <div class='section-wrapper'>
        <p class='section-header'>Experience</p>
    </div>
    <div class='projects container'>

        <div class='left-side'>
            <div class='image-wrapper'>
                <a href='{{$main_project['link']}}'><img class='image' src='{{$main_project['image']}}' /></a>
                <a href='{{$main_project['link']}}' class='button desktopOnly arrow red disableAnimation'>See Client Results</a>
            </div>
            <a href='{{$main_project['link']}}'><p class='title'>{{$main_project['title']}}</p></a>
            <p class='excerpt'>{{ strip_tags($main_project['excerpt']) }}</p>
            <div class='project-button-wrapper'><a href='{{$main_project['link']}}' class='button arrow red mobileOnly'>View Project</a></div>
            <div class='all-button-wrapper'><a href='#' class='button arrow black mobileOnly'>View All</a></div>
        </div>

        <div class='right-side'>
            <div class='loading-bar-root' time-delay='10s'></div>
            @if($side_project_1 && $side_project_2 && $side_project_3)
            <div class='project small hidden'>
                <a href='{!! get_the_permalink($side_project_1) !!}'>
                    <img src='{{get_the_post_thumbnail_url($side_project_1)}}' class='project-image' />
                    <p class='project-text'>{!! get_the_title($side_project_1) !!}</p>
                    <span class='project-excerpt'>{!! get_snippet(get_the_excerpt($side_project_1), 30) !!}</span>
                    <div class='red-overlay'></div>
                </a>
            </div>
            <div class='project small hidden'>
                <a href='{!! get_the_permalink($side_project_2) !!}'>
                    <img src='{{get_the_post_thumbnail_url($side_project_2)}}' class='project-image' />
                    <p class='project-text'>{!! get_the_title($side_project_2) !!}</p>
                    <span class='project-excerpt'>{!! get_snippet(get_the_excerpt($side_project_2), 30) !!}</span>
                    <div class='red-overlay'></div>
                </a>
            </div>
            <div class='project small hidden'>
                <a href='{!! get_the_permalink($side_project_3) !!}'>
                    <img src='{{get_the_post_thumbnail_url($side_project_3)}}' class='project-image' />
                    <p class='project-text'>{!! get_the_title($side_project_3) !!}</p>
                    <span class='project-excerpt'>{!! get_snippet(get_the_excerpt($side_project_3), 30) !!}</span>
                    <div class='red-overlay'></div>
                </a>
            </div>
            @else
            @while($recent_projects->have_posts()) @php $recent_projects->the_post(); @endphp
            <div class='project small hidden'>
                <a href='{!! get_the_permalink() !!}'>
                    <img src='{{get_the_post_thumbnail_url()}}' class='project-image' />
                    <p class='project-text'>{!! get_the_title() !!}</p>
                    <span class='project-excerpt'>{!! get_snippet(get_the_excerpt(), 30) !!}</span>
                    <div class='red-overlay'></div>
                </a>
            </div>
            @endwhile
            @php wp_reset_postdata(); @endphp
            @endif
            <a href='/experience' class='button arrow black'>View All</a>
        </div>

    </div>

</section>