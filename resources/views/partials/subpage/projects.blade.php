
    <div class="main-container ajax-filter-container about-body">
        

        <section class="about-body-section">
            <div class="">

                <div class='body-txt container about-body'>
                    <?php
                    if(have_posts()):
                        while(have_posts()): the_post();
                            

                            the_content();
                            
                        endwhile;
                    endif;
                    ?>
                </div>

                <div class="project-filter" style="padding: 10px 20px 10px 20px; margin-bottom: 50px;">
                    <h5 class="area-title">Filter Projects</h5>
                    
                    <!-- contain the main content of the page -->

                    <!-- filter area -->

                <div class="filters-container">

                    <div class="media-boxes-search">
                        <span class="media-boxes-icon fa fa-search"></span>
                        <input type="text" id="search" placeholder="Search Projects by Keyword">
                        <span class="media-boxes-clear fa fa-close"></span>
                    </div>
            
                    <div class="media-boxes-drop-down" >
                        <div class="media-boxes-drop-down-header">
                        </div>
                        <ul class="media-boxes-drop-down-menu filters" data-id="project-type">
                          <li><a class="selected" href="#" data-filter="*">All Industries</a></li>

                            <?php
								function sortByName($a, $b) {
									return $a->name > $b->name;
								}
								
                                //$type_terms = get_terms( 'project-type' );
								$type_terms = get_terms( array(
									'taxonomy' => 'project-type',
									'orderby' => 'name',
									'order' => 'ASC',
                                    'exclude' => array(18)
								) );
								usort($type_terms, 'sortByName');
                                if ( ! empty( $type_terms ) && ! is_wp_error( $type_terms ) ){

                                    foreach ( $type_terms as $type_term ) {
                                        $term_name = $type_term->name;
                                        $term_slug = $type_term->slug;
                                        echo '<li><a href="#" data-filter=".'.strtolower($term_slug).'">' . $term_name . '</a></li>';
                                    }
                                   
                                }
                            ?>

                        </ul>
                    </div>

                    <div class="media-boxes-drop-down" style="width:250px;">
                        <div class="media-boxes-drop-down-header">
                        </div>
                        <ul class="media-boxes-drop-down-menu filters" data-id="project-service">
                          <li><a class="selected" href="#" data-filter="*">All Services</a></li>

                            <?php
                                $service_terms = get_terms( 'project-service' );
                                if ( ! empty( $service_terms ) && ! is_wp_error( $service_terms ) ){
                                    
                                    foreach ( $service_terms as $service_term ) {
                                        $term_name = $service_term->name;
                                        $term_slug = $service_term->slug;
                                        echo '<li><a href="#" data-filter=".'.strtolower($term_slug).'">' . $term_name . '</a></li>';
                                    }
                                    
                                }
                            ?>
                        </ul>
                    </div>

                    <div class="media-boxes-drop-down" >
                        <div class="media-boxes-drop-down-header">
                        </div>
                        <ul class="media-boxes-drop-down-menu filters" data-id="project-region">
                          <li><a class="selected" href="#" data-filter="*">All Regions</a></li>
                            <?php
                                $region_terms = get_terms( 'project-region' );
                                if ( ! empty( $region_terms ) && ! is_wp_error( $region_terms ) ){
                                  
                                    foreach ( $region_terms as $region_term ) {
                                        $term_name = $region_term->name;
                                        $term_slug = $region_term->slug;
                                        echo '<li><a href="#" data-filter=".'.strtolower($term_slug).'">' . $term_name . '</a></li>';
                                    }
                                   
                                }
                            ?>
                        </ul>
                    </div>

                </div>

                    </form>
                    <div class="clearfix"></div>

                </div>
                <div class="project-group projects" id="grid">
                    <!-- portfolio section -->

                    <?php

                        $query = new WP_Query( array( 'post_type' => 'project', 'posts_per_page' => -1 ) );

                    if ( $query->have_posts() ) : ?>
                        <?php while ( $query->have_posts() ) : $query->the_post(); ?> 

                        <?php

                            //$project_types = wp_get_object_terms( $post->ID, 'project-type' );
                            $project_types = strip_tags (get_the_term_list( get_the_ID(), 'project-type', ' ',' '));
                            $project_types = str_replace('All', '', $project_types);
                            //$project_servivces = wp_get_object_terms( $post->ID, 'project-service' );
                            $project_services = strip_tags (get_the_term_list( get_the_ID(), 'project-service', ' ',' '));
                            //print_r($project_services);
                            //$project_services_slugs = str_replace(" ", "-", $project_services);
                            $list_service_slugs = '';
                            $list_region_slugs = '';
                            $list_type_slugs = '';

                            $service_terms_1 = get_the_terms( get_the_ID(), 'project-service' );
                           // print_r($service_terms);
                            foreach ( $service_terms_1 as $service_term ) {
                                $term_slug = $service_term->slug;
                                $list_service_slugs .= $term_slug . ' , ';
                            }


                            //$project_regions = wp_get_object_terms( $post->ID, 'project-region' );
                            //$project_regions = strip_tags (get_the_term_list( $post->ID, 'project-region', ' ',' '));

                            $region_terms_1 = get_the_terms( get_the_ID(), 'project-region' );
                           //print_r($service_terms);
                            foreach ( $region_terms_1 as $region_term ) {
                                $term_slug = $region_term->slug;
                                $list_region_slugs .= $term_slug . ' ';
                            }

                            $type_terms_1 = get_the_terms( get_the_ID(), 'project-type' );
                           // print_r($service_terms);
                            foreach ( $type_terms_1 as $type_term ) {
                                $term_slug = $type_term->slug;
                                $list_type_slugs .= $term_slug . ' ';
                            }



                        ?>

                    <div class="media-box <?php echo strtolower($list_type_slugs); ?> <?php echo strtolower($list_service_slugs); ?> <?php echo strtolower($list_region_slugs); ?>">
                        <div class="pull-left" id="project-<?php the_ID(); ?>">
                            <a href="<?php the_permalink(); ?>">
                                <?php if ( has_post_thumbnail() ) : ?>
                                    <!-- photo -->
                                    <div class="jpt-box">
                                        <?php echo get_the_post_thumbnail(); ?>
                                        <?php if($project_types && sizeof($project_types) > 0): ?>
                                        <div class="jpt-box-child">
                                              <h6 class="searchtitle"><?php echo $project_types; ?></h6>
                                            </div>
                                            <?php endif; ?>
                                        <!-- <span class="category"></span> -->
                                    </div>
                                <?php endif; ?>
                                <div class="title-location">
                                    <div class="proj-item title searchtitle"><?php echo ( $title = get_field( 'shorten_title' ) ) ? $title : get_the_title(); ?></div>
                                    <?php if ( $subtitle = get_field( 'subtitle' ) ) : ?>
                                        <!-- <h3><?php //echo $subtitle; ?></h3> -->
                                    <?php endif; ?>
                                    <?php if ( $client = get_field( 'client' ) ) : ?>
                                        <em class="client"><?php //echo $client; ?></em>
                                    <?php endif; ?>
                                    <!--
                        <?php if ( $locations = get_the_terms( get_the_ID(), 'project_location' ) ) : ?>
                                        <ul class="locations">
                                            <li><?php $loc_num = count( $locations ); $i = 1; foreach( $locations as $location ) {echo $location->name; if ( $i < $loc_num ) {echo ' | ';} $i++;} ?></li>
                                        </ul>
                                    <?php endif; ?>
                        -->
                                </div>
                            </a>
                        </div>
                    </div>

                    <?php endwhile; wp_reset_postdata(); wp_reset_query(); ?>
                <!-- show pagination here -->
                <?php else : ?>
                    No Projects
                <?php endif; ?>


                </div>
            </div>
        </section>
        
    

    <script>

        
    </script>
    
   

    </div>