<div class="col-md-8 col-md-offset-1 col-sm-8 body-txt pull-right about-body">
<?php if ( get_field( 'featured_content_offer' ) ): ?>
    <?php
    $feat_offer_id = get_field( 'featured_content_offer' );
    ?>
    <div class="featured-content-wrapper sidebar-box">
        <div class="featured-content">
            <div class="col-xs-12">
                <h5 class="ftr-content-title">Featured Content</h5>
                <div class="fpo-img pull-left">
                    <img src="<?php echo esc_html__( the_field( 'offer_image', $feat_offer_id ) ); ?>" style="margin-bottom: 30px;">
                </div>
                <div class="f-c-title">
                    <h4><?php echo esc_html__( the_field( 'offer_title', $feat_offer_id ) ); ?></h4>
                </div>
                <p><?php echo esc_html__( the_field( 'offer_excerpt', $feat_offer_id ) ); ?></p>
                <a href="<?php echo esc_html__( the_field( 'offer_link', $feat_offer_id ) ); ?>"
                    class="btn btn-default btn-orange button red no-arrow"><?php echo esc_html__( the_field( 'offer_button_text', $feat_offer_id ) ); ?></a>
            </div>
        </div>
    </div>

<?php endif; ?>

<?php if ( have_rows( 'library_categories' ) ): ?>
<div class='row'>
    <?php while ( have_rows( 'library_categories' ) ): the_row();
        $lib_title        = get_sub_field( 'lib_title' );
        $lib_image        = get_sub_field( 'lib_image' );
        $lib_excerpt      = get_sub_field( 'lib_excerpt' );
        $lib_see_all_text = get_sub_field( 'lib_see_all_text' );
        $see_all_link     = get_sub_field( 'see_all_link' );
        ?>
        <div class="col-sm-6">
            <div class="library-category">
                <h5><?php echo $lib_title; ?></h5>
                <a href="<?php echo esc_html($see_all_link); ?>"><img src="<?php echo $lib_image; ?>"></a>
                <?php echo do_shortcode($lib_excerpt); ?>
                <div class="see-all-link"><a
                            href="<?php echo esc_html($see_all_link); ?>"><?php echo $lib_see_all_text; ?></a>
                </div>
            </div>
        </div>

    <?php endwhile; ?>
</div>
<?php endif; ?>

</div>