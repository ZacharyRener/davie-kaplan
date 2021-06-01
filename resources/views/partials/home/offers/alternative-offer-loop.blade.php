<?php
/* offer loop style 1 */
?>


<div class="col-sm-4 team-box">
    <h5><?php echo esc_html__( the_field( 'offer_title', $offer_id ) ); ?></h5>
    <div class="our-team-box">
        <a href="<?php echo esc_html__( the_field( 'offer_link', $offer_id ) ); ?>" class="linked-featured-img">
            <div class="hpf-box"><img src="<?php echo esc_html__( the_field( 'offer_image', $offer_id ) ); ?>"></div>
        </a>
        <h4><a href="#"><?php echo esc_html__( the_field( 'offer_excerpt', $offer_id ) ); ?></a></h4>
        <a href="<?php echo esc_html__( the_field( 'offer_link', $offer_id ) ); ?>"
           class="btn btn-default btn-orange"><?php echo esc_html__( the_field( 'offer_button_text', $offer_id ) ); ?></a>
    </div>
</div>