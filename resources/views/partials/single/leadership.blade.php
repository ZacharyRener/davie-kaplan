
<div class="col-md-8 col-md-offset-1 col-sm-8 body-txt pull-right about-body">
<?php

                // if the team member is listed as a speaker, display below
                if(has_term( 'speaker', 'member-type', null )){ ?>

                    <h1 class="leadership-name"><?php echo get_field('lds_first_name') . ' ' . get_field('lds_last_name'); ?></h1>

                    <h4 class="leadership-title" style="color: #302f2e !important; text-transform: none !important;"><?php echo get_field('lds_title');?></h4>
                    
<div id="image-area">
                <div class="col-sm-5 col-sm-offset-1 col-xs-12 person-contact" >
                    <?php

                    $lsimg = get_the_post_thumbnail_url();
                $size = 'leadership-thumb';

                if( $lsimg ) {
                    $lsimg = wp_get_attachment_image( $lsimg, $size );
                }

                echo $lsimg;

                    ?>

                    <?php if(have_rows('lds_socail_media') || (get_field('lds_phone_number')) || (get_field('lds_email')) ): ?>
                
                    <div class="share-links person-share">
                    <ul class='social-share' style="margin-bottom: 0px !important;">
                        <?php if(get_field('lds_email')){
                        ?><li><a href="mailto:<?php echo get_field('lds_email'); ?>"><i class="fa fa-envelope" aria-hidden="true"></i></a></li><?php
                        } ?>

                        <?php if(get_field('lds_phone_number')){
                        ?><li><a href="tel:<?php echo get_field('lds_phone_number'); ?>" data-toggle="tooltip" data-placement="top" title="<?php echo get_field('lds_phone_number'); ?>"><i class="fa fa-phone" aria-hidden="true"></i></a></li><?php

                        }?>
                        
                    <?php while( have_rows('lds_socail_media') ): the_row(); ?>
                    <?php $lds_smac = get_sub_field('lds_sm_account_type');
                        $lds_smlnk = get_sub_field('lds_sm_link');
                        $brokercheck_url = get_sub_field('brokercheck_url');
                        $lds_color_box = '';
                        if(get_sub_field('lds_sm_account_type') == "facebook") {$lds_color_box = "fb";} elseif(get_sub_field('lds_sm_account_type') == "google-plus") {$lds_color_box = "google";} else { $lds_color_box = $lds_smac;} ?>
                        <li class="<?php echo $lds_color_box;?>-share"><a href="<?php echo $lds_smlnk;?>" target="_blank"><i class="fab fa-<?php echo $lds_smac;?>" aria-hidden="true"></i></a></li>
                    <?php endwhile; ?>
                    </ul>

                    <div class="clearfix"></div>
                    </div>
                <?php endif; ?>
                </div>
                    <?php the_content(); ?>
                
                </div>
                <hr />
                <div id="accordionParentWrapper">
                <?php 
                $i = 0;
                    if(have_rows('additional_content_areas')){
                    ?><div class="buttonshere"><?php
                    while(have_rows('additional_content_areas')){
                        the_row();
                        $title = get_sub_field('lds_adc_area_title');
                        $content = get_sub_field('lds_adc_area_content');
                        $num_rows = count(get_field('additional_content_areas'));

                        if($i == 0) {
                            $aria_expanded = 'true';
                            $collapse_show = 'show';
                            $collapse_class = '';
                        }else{
                            $aria_expanded = 'false';
                            $collapse_show = '';
                            $collapse_class = 'collapsed';
                        }
                            $tempString = 'jQuery("#first_content").hide();';
                            echo'

                            <button class="btn btn-primary speaker-button '.$collapse_class.'" type="button" data-toggle="collapse" data-target="#collapse-'.$i.'" data-parent="#accordionParentWrapper" aria-expanded="'.$aria_expanded.'" onclick='.$tempString.'>
                                '.$title.'
                            </button>
                        ';
                        $i++;
                        }
                        ?></div><?php
                        ?>
                        <script>
                        var myGroup = jQuery('#accordionParentWrapper');
                        myGroup.on('show.bs.collapse','.collapse', function() {
                            myGroup.find('.collapse.in').collapse('hide');
                        });


                        </script>
                        <?php
                        ?><div class="collapseWrapper"><?php
                        $i = 0;
                        reset_rows();
                        while(have_rows('additional_content_areas')){
                        the_row();
                        $title = get_sub_field('lds_adc_area_title');
                        $content = get_sub_field('lds_adc_area_content');
                        $num_rows = count(get_field('additional_content_areas'));

                        if($i == 0) {
                            $aria_expanded = 'true';
                            $collapse_show = '';
                            echo '<div id="first_content">'.$content.'</div>';
                        }else{
                            $aria_expanded = 'false';
                            $collapse_show = '';
                        }

                            echo'

                            <div class="collapse '.$collapse_show.'" id="collapse-'.$i.'">
                                <div class="card card-body">
                                    '.$content.'
                                </div>
                            </div>

                            ';
                        $i++; 
                    }
                    }
                ?>

                        
                    <script type="text/javascript">
                        var read_more_count = 0;
                    
                            jQuery("#read-more-btn").click(function() {
            
                                    read_more_count++;

                                    if (read_more_count % 2 != 0 || read_more_count==0){
                                    //odd number of clicks
                                    document.getElementById('read-more-btn').innerHTML = 'View Less';
                                    jQuery('#collapseQuotes').show();
                                    }else{
                                    //even number of clicks
                                    document.getElementById('read-more-btn').innerHTML = 'Read More';
                                    jQuery('#collapseQuotes').hide();
}
                                    
                            });
                    </script>
                                    </div> <!-- /collapseWrapper -->
                            </div> <!-- /accordionParent Wrapper -->
                </div>





                <!-- if the team member isn't listed as a speaker, display this instead -->





                <?php }else{

                        $lsimg = get_the_post_thumbnail_url();
                                    $size = 'leadership-thumb';

                ?>      
                    <!-- loop -->
                        <h1 class="leader-name"><?php echo get_field('lds_first_name') . ' ' . get_field('lds_last_name'); ?><?php if(get_field('lds_sm_credentials')) { echo ", " .get_field('lds_sm_credentials');}?></h1>
                        <h2 class="leader-title"><?php echo get_field('lds_title');?></h2>
                        
                <p class="lds_location"><?php echo get_field('lds_location');?></p>
                
                        <div class="person-detail">

                            <div class="col-sm-5 col-sm-offset-1 col-xs-12 person-contact" style="float: right;">
                            <img class="single-leader" src="<?php echo $lsimg; ?>" />

                            <?php if(have_rows('lds_socail_media') || (get_field('lds_phone_number')) || (get_field('lds_email')) ): ?>
                                    
                            <div class="share-links person-share">
                            <ul class='social-share' style="margin-bottom: 0px !important;">
                        <?php if(get_field('lds_email')){
                        ?><li><a href="mailto:<?php echo get_field('lds_email'); ?>"><i class="fa fa-envelope" aria-hidden="true"></i></a></li><?php
                        } ?>

                        <?php if(get_field('lds_phone_number')){
                        ?><li><a href="tel:<?php echo get_field('lds_phone_number'); ?>" data-toggle="tooltip" data-placement="top" title="<?php echo get_field('lds_phone_number'); ?>"><i class="fa fa-phone" aria-hidden="true"></i></a></li><?php

                        }?>
                                
                                <?php while( have_rows('lds_socail_media') ): the_row(); ?>
                                <?php $lds_smac = get_sub_field('lds_sm_account_type');
                                    $lds_smlnk = get_sub_field('lds_sm_link');
                                    $lds_color_box = '';
                                    if(get_sub_field('lds_sm_account_type') == "facebook") {$lds_color_box = "fb";} elseif(get_sub_field('lds_sm_account_type') == "google-plus") {$lds_color_box = "google";} else { $lds_color_box = $lds_smac;} ?>
                                <li class="<?php echo $lds_color_box;?>-share"><a href="<?php echo $lds_smlnk;?>" target="_blank"><i class="fab fa-<?php echo $lds_smac;?>" aria-hidden="true"></i></a></li>
                            <?php endwhile; ?>
                            </ul>
                    <?php $single_broker_url = get_field('brokercheck_url');
                    if (empty($single_broker_url))
                        $single_broker_url = 'https://brokercheck.finra.org/';
                        ?>
                    <div class="clearfix"></div>
                            </div>
                            <?php endif; ?>	
                            </div>
                    <span class='main-quote'><?php echo get_field('main_quote'); ?></span>
                    </div>
                            <?php
                    if ( have_posts() ) :
                        /* Start the Loop */
                        while ( have_posts() ) : the_post();
                            the_content();
                        endwhile;
                    endif;



                    ?>
                            

                        
                        
                <div class="col-md-12 accordion-wrapper">

<div id="accordion" role="tablist">




<?php

$collapse_count = 0;
while (have_rows("tabs")){ the_row();?>
    <?php $collapse_count++; ?>
    <div class="card"> 

    <div class="card-header" role="tab" id="heading<?php echo $collapse_count; ?>">
        <h5 class="mb-0">
        <a class='collapsed' data-toggle="collapse" href="#collapse<?php echo $collapse_count; ?>" role="button" aria-expanded="true" aria-controls="collapse<?php echo $collapse_count; ?>">
            <?php the_sub_field("heading"); ?>
            <span class="accordion-icon"></span>
        </a>
        </h5>
    </div>

    <div id="collapse<?php echo $collapse_count; ?>" class="collapse " role="tabpanel" aria-labelledby="heading<?php echo $collapse_count; ?>" data-parent="#accordion">
        <div class="card-body">
        <?php the_sub_field('content'); ?>
        </div>
    </div>
    
    </div>


<?php

}

?>





</div>



</div>
                        
                        
                    

                
            

                <?php } ?>
               
    
    

<?php 
?>

</div>

<script>
    document.addEventListener('DOMContentLoaded', ()=>{
        jQuery('.card:nth-child(1) a').click()
    })
</script>