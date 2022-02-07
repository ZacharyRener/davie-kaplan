
<div class="col-md-8 col-md-offset-1 col-sm-8 body-txt pull-right about-body">
    
     <h1>{{ get_the_title() }}</h1>
    <div id='wp-filter-root'></div>
        <?php
        $searchQuery = isset($_GET['searchQuery']) ? $_GET['searchQuery'] : '';
        $paged = ( get_query_var('paged') ) ? get_query_var('paged') : 1;
        $industry = isset($_GET['industry'])
            ? array(
                    'taxonomy' => 'library_industry',
                    'field'    => 'term_id',
                    'terms'    => array(intval($_GET['industry'])),
                )
            : '';
        $primary_service = isset($_GET['service'])
            ? array(
                    'taxonomy' => 'library_primary_service',
                    'field'    => 'term_id',
                    'terms'    => array(intval($_GET['service'])),
                )
            : '';
        
        $args = array(
            'post_type' => 'library',
            'tax_query' => array(
                'relation' => 'AND',
                array(
                    'taxonomy' => 'library_category',
                    'field'    => 'slug',
                    'terms'    => $library_type,
                ),
                $industry,
                $primary_service
            ),
            'paged' => $paged,
            's' => $searchQuery,
        );
        $query = new WP_Query( $args );

        if($query->have_posts()) : 
        while($query->have_posts()) :
        $query->the_post(); 

        $summary = get_field('on_page_text');
        $summary = strip_tags($summary);
        $excerpt_current = substr($summary, 0, 140);



        if ( strlen($excerpt_current) == 0 && !has_post_thumbnail()) {
            ?>

            <div class="row library-item">
                <div class="col-md-4 library-thumb"><?php the_post_thumbnail(); ?></div>
                <div class="col-md-8">
                    <h3>
                        <a href="<?php echo get_the_permalink(); ?>">
                            <?php echo get_the_title(); ?>
                        </a>
                    </h3>
                    <p>{{ App::getSnippet(strip_tags(get_field('on_page_text')), 24) }}...</p>
                    <a class="btn btn-default btn-orange button red no-arrow" href="<?php echo get_the_permalink(); ?>" style="margin: 10px 0px; color: white; font-weight: 400; padding: 8px 15px;">Download Now</a>
                </div>
            </div>

    <?php
        }else if (has_post_thumbnail()){ ?>
            <div class="row library-item">
                <div class="col-md-4 library-thumb"><?php the_post_thumbnail(); ?></div>
                <div class="col-md-8">
                    <h3>
                        <a href="<?php echo get_the_permalink(); ?>">
                            <?php echo get_the_title(); ?>
                        </a>
                    </h3>
                    <p>{{ App::getSnippet(strip_tags(get_field('on_page_text')), 24) }}...</p>
                    <a class="btn btn-default btn-orange button red no-arrow" href="<?php echo get_the_permalink(); ?>" style="margin: 10px 0px; color: white; font-weight: 400; padding: 8px 15px;">Download Now</a>
                </div>
            </div>
        <?php } else { ?>
            <div class="row library-item">
                <div class="col-md-4 library-thumb"><div class='image-spacer'></div></div>
                <div class="col-md-8">
                    <h3>
                        <a href="<?php echo get_the_permalink(); ?>">
                            <?php echo get_the_title(); ?>
                        </a>
                    </h3>
                    <p>{{ App::getSnippet(strip_tags(get_field('on_page_text')), 24) }}...</p>
                    <a class="btn btn-default btn-orange button red no-arrow" href="<?php echo get_the_permalink(); ?>" style="margin: 10px 0px; color: white; font-weight: 400; padding: 8px 15px;">Download Now</a>
                </div>
            </div>
        <?php }  ?>
    
    
    


    <?php 

        endwhile;
        endif;
        //wp_reset_query(); 

        //wp_pagenavi( array( 'query' => $query ) ); 
        wp_reset_query();

    ?>
                        
                    
    </div>