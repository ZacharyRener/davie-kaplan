 <div class="col-md-8 col-md-offset-1 col-sm-8 body-txt pull-right about-body">
 <?php
                        if (have_posts()){
                            while(have_posts()){
                                the_post();
                                the_content();
                            }
                        }

                        query_posts(array('nopaging' => 1, 'post_type' => array('news'), ));
                        $prev_year = null;
                        if ( have_posts() ) {
                            ?><div class="accordion" id="accordionExample"><?php
                            while ( have_posts() ) {
                              the_post();
                              $this_year = get_the_date('Y');
                              if ($prev_year != $this_year) {
                                  // Year boundary
                                  if (!is_null($prev_year)) {
                                     // A list is already open, close it first
                                     echo '</div>';
                                     echo '</div>';
                                    echo '</div>';
                                  }
                                  //echo '<div class="news-title">' . $this_year . '</div>';
                                  ?>
                                <div class="card">
                                    <div class="card-header" id="heading<?php echo $this_year; ?>">
                                        <h2 class="mb-0">
                                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse<?php echo $this_year; ?>" aria-expanded="true" aria-controls="collapse<?php echo $this_year; ?>">
                                                <h1><?php echo $this_year; ?><i class="fa fa-angle-down"></i></h1>
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapse<?php echo $this_year; ?>" class="collapse" aria-labelledby="heading<?php echo $this_year; ?>" data-parent="#accordionExample">
                                        <div class="card-body">
                                        
                            <?php }

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
                                            echo '<br />'.get_the_date("F j");
                                            echo '</div></div>';
                                            $prev_year = $this_year;
                                    }
                                    echo '</div>';
                                    echo '</div>';
                                    echo '</div>';
                                    
                                    ?></div><?php
                                }
                                    wp_reset_query();

                      ?>

                      <script>
        setTimeout(function(){
            jQuery('.post-type-archive-news button.btn.btn-link.btn-default').click(function(e){
            
                var icon = e.currentTarget.children[0].children[0];
                console.log(icon)
                if(icon.classList.contains('fa-angle-down')){
                    icon.classList.remove('fa-angle-down');
                    icon.classList.add('fa-angle-up');
                } else if(icon.classList.contains('fa-angle-up')){
                    icon.classList.remove('fa-angle-up');        
                    icon.classList.add('fa-angle-down');
                }
                
            });
            document.querySelectorAll('.card-header button').forEach(button => {
                button.addEventListener('click', e => {
                    let arrow = e.currentTarget.children[0].children[0];
                    if(arrow.classList.contains('fa-angle-down')){
                        arrow.classList.remove('fa-angle-down');    
                        arrow.classList.add('fa-angle-up');
                    } else if(arrow.classList.contains('fa-angle-up')){
                        arrow.classList.remove('fa-angle-up');    
                        arrow.classList.add('fa-angle-down');
                    }
                    
                })
            })
            jQuery('#heading2021 button').click();
        }, 1000);
    </script>
  
</div>