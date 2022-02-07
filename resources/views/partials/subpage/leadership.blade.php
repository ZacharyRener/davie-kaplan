<div class="col-md-8 col-md-offset-1 col-sm-8 body-txt pull-right about-body">
    @if(have_posts())
        @while(have_posts()) @php the_post(); @endphp
            @php the_content(); @endphp


	    @if( get_field('enable_filtering') )

        <div class="filters-container"> 

            <div class="media-boxes-search">
                <span class="media-boxes-icon fa fa-search"></span>
                <input type="text" id="search" placeholder="Search Leadership">
                <span class="media-boxes-clear fa fa-close"></span>
            </div>
            
    
            <div class="media-boxes-drop-down">
                <div class="media-boxes-drop-down-header">
                </div>
                <ul class="media-boxes-drop-down-menu filters" data-id="third-filter">
                  <!--<li><a class="selected" href="#" data-filter="*">Filter By Category</a></li>-->
	                <?php
	                   $terms = get_terms("positions", array( 
                        'orderby' => 'name',
                        'order'   => 'ASC',
                        ) );
	                   $count = count($terms);
	                   
	                   if ( $count > 0 ){
	                       
	                   		echo '<li><a class="selected" href="#" data-filter="*">All Team Members</a></li>';

	                          foreach ( $terms as $term ) {
	                               
	                              $termname = strtolower($term->name);
	                              $termname = str_replace(',', '', $termname);
	                              $termname = str_replace('&amp;', '', $termname);

	                              $termname = str_replace(' ', '-', $termname);
	                              $termname = str_replace('--', '-', $termname);

	                              echo '<li><a href="#" data-filter=".'.$termname.'" class="'.$termname.'">'.$term->name.'</a></li>';
	                          }
	                   }
	                   
	                ?>
                </ul>
            </div>

        </div>

        @endif

        <div id="grid">

                <?php

                    $args = array(
                        'post_status' => 'publish',
                        'post_type'   => 'leadership',
                        'posts_per_page' => -1,
                        'orderby'     => 'meta_value',
                        'order'       => 'DESC',
                        'meta_key' => 'lds_last_name'
                    );

                    $the_query = new WP_Query( $args );

                ?>

                <?php $count = 1; while ( $the_query->have_posts() ) : $the_query->the_post(); ?>
        

                <?php
                $terms = get_the_terms( get_the_ID(), 'positions' );
                            
                if ( $terms && ! is_wp_error( $terms ) ) : 
                    $links = array();

                    foreach ( $terms as $term ) 
                    {
                        $links[] = $term->name;
                    }
                        $links = str_replace(',', '', $links);
                        $links = str_replace('&amp;', '', $links);

                        $links = str_replace(' ', '-', $links);
                        $links = str_replace('--', '-', $links);
                    $tax = join( " ", $links );     
                else :  
                    $tax = '';  
                endif;
                ?>

                <?php setup_postdata($post); ?>
                <?php $member_id = $post->ID; ?>
                <?php 	$lsfn = get_field('lds_first_name', get_the_ID());
                        $lsln = get_field('lds_last_name', get_the_ID());
                        $lsimg = get_field('lds_bio_image', get_the_ID());
                        $lstitle = get_field('lds_title', get_the_ID());
                        $second_title = get_field('lds_secondary_title');
                        $prof_link = get_the_permalink(get_the_ID());

                        if(get_field('lds_bio_image', get_the_ID())) {
                            $lsimg_size = 'leadership-thumb-alterative';
                            $get_lsimg = get_the_post_thumbnail_url();
                            $lsimg = wp_get_attachment_image($get_lsimg, $lsimg_size);
                        }else{
                            $lsimg = wp_get_attachment_image_src( get_post_thumbnail_id( get_the_ID() ), 'leadership-thumb-alterative' );
                            $lsimg = $lsimg[0];
                        }
                        

                        ?>

        <div class="media-box <?php echo get_the_ID(); ?> <?php echo strtolower($tax); ?> col-md-4 leader-emblem col-xs-12">
            <a href="<?php the_permalink(get_the_ID()); ?>">
                <div class="media-box-logo">
                    <div class='leadership-overlay'></div>
                    <img class="id-<?php echo (get_the_ID()); ?>single-leader-img" src="<?php echo $get_lsimg; ?>" />
                </div>
            </a>

            <div class="media-box-content">
                <a href="<?php the_permalink(get_the_ID());?>">
                <div class="media-box-title searchtitle"><?php echo $lsfn . ' ' . $lsln; ?>
                    <br><?php echo get_field('lds_sm_credentials'); ?></div>
                <div class="media-box-text searchtitle">
                    <?php echo $lstitle; ?><?php if($second_title) { echo '<br />' . $second_title; } ?>
                </div>
                </a>
            </div>
        </div>



            <?php $count++; endwhile; ?>
            
        </div>
        <?php wp_reset_postdata(); // IMPORTANT - reset the $post object so the rest of the page works correctly ?>

   

        @endwhile
    @endif
</div>