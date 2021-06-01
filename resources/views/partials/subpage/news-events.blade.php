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

<div class="col-md-8 col-md-offset-1 col-sm-8 body-txt pull-right about-body">

    <?php

    query_posts(array('nopaging' => 1, 'post_type' => array('news'), ));
    $prev_year = null;
    if ( have_posts() ) {
    while ( have_posts() ) {
        the_post();
        $this_year = get_the_date('Y');
        if ($prev_year != $this_year) {
            // Year boundary
            if (!is_null($prev_year)) {
                // A list is already open, close it first
                //echo '</ul>';
            }
            echo '<div class="news-title">' . $this_year . '</div>';
            //echo '<ul class="list-posts">';
        }

        if(has_post_thumbnail()) {
            $featured_img_url = get_the_post_thumbnail_url(get_the_ID(),'news-thumb'); 
        }


        echo '<div class="row">';
        if(has_post_thumbnail()) {
        echo '<div class="col-md-2"><img src="'.$featured_img_url.'" class="news-thumb"></div>';
        echo '<div class="col-md-9"><a href="'.get_the_permalink().'" class="news-url">'.get_the_title().'</a>';
       
        }else {
            echo '<div class="col-md-12"><a href="'.get_the_permalink().'" class="news-url">'.get_the_title().'</a>';
            
        }
        echo '<div class="date">'.get_the_date("F j")."</div>";
        ?><div class="excerpt"><p>{!! str_replace("&nbsp;", '', (ucfirst(strtolower(get_snippet(strip_tags(get_the_excerpt()), 20))))) !!}</p></div><?php
        echo '</div></div>';
        $prev_year = $this_year;
    }
    //echo '</ul>';
    }
    wp_reset_query();

    ?>
    
</div>