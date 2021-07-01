<?php

if(have_rows('offers_select')):

    while(have_rows('offers_select')):

    the_row('offers_select');


    $custom_bg = get_sub_field('s2_offer_background_color');

    $offer_id    = get_sub_field( 'offer' );
    $offer_style = get_sub_field( 'offer_style' );
    $offer_border = get_sub_field( 'offer_border_color' );
    $offer_alignment = get_sub_field( 'offer_alignment' );

    if ( $offer_style == "STY1" && $offer_id ) { ?>


    <div class="portfolio-content-wrapper sidebar-box sidebar-offer" style="text-align: <?php echo $offer_alignment; ?>;">
        <h5><?php the_field('offer_title', $offer_id); ?></h5>
        <div class="portfolio-content" style="background:<?php the_sub_field('s2_offer_background_color'); ?>; border: solid 2px <?php echo $offer_border; ?>;">
      <?php 
        if ( get_field('split_image', $offer_id) ){ 
            echo '<div class="hpf-box">
                    <div class="row">
                      <div class="col-md-6">'; ?> 
				<a href="<?php  echo esc_html__(the_field('offer_link', $offer_id)); ?>"><img src="<?php  echo esc_html__(the_field('offer_image', $offer_id)); ?>"></a>
            <?php 
             echo '</div>
             <div class="col-md-6" style="margin-top:20px;">
               '.get_field('split_text', $offer_id).'
             </div></div></div>
             ';
            ?>
        <?php } else { ?>
            
        <div class="hpf-box">
            <a href="<?php  echo esc_html__(the_field('offer_link', $offer_id)); ?>">
                <img src="<?php  echo esc_html__(the_field('offer_image', $offer_id)); ?>">
            </a>
        </div>
        <?php } ?>
                            

				<div>
					<p><?php  echo esc_html__(the_field('offer_excerpt', $offer_id)); ?></p>
					<a href="<?php  echo esc_html__(the_field('offer_link', $offer_id)); ?>" class="btn button arrow red btn-default btn-orange"><?php  echo esc_html__(the_field('offer_button_text', $offer_id)); ?></a>
				</div>
			</div>
</div>

<?php } else if ( $offer_style == "STY2" && $offer_id ) { ?>
	
<div class="featured-content-wrapper sidebar-box sidebar-offer">
              <h5><?php the_sub_field('s2_offers_title'); ?>...</h5>
              <div class="featured-content" style="background:<?php the_sub_field('s2_offer_background_color'); ?>;">
                <div class="col-xs-12">
                  <div class="fpo-img pull-left">
                    <a href="<?php the_field('offer_link', $offer_id); ?>"><img src="<?php the_field('offer_image', $offer_id); ?>"></a>
                  </div>
                  <div class="f-c-title">
                    <h4><?php the_field('offer_title', $offer_id); ?></h4>
                  </div>
                </div>
                <div class="col-xs-12">
                  <p><?php the_field('offer_excerpt', $offer_id); ?></p>
                  <a href="<?php the_field('offer_link', $offer_id); ?>" class="btn button arrow red btn-default btn-orange"><?php the_field('offer_button_text', $offer_id); ?></a>
                </div>
              </div>
            </div>

<?php

}

endwhile;
endif;

?>