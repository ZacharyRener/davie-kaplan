<div class="col-md-8 col-md-offset-1 col-sm-8 body-txt pull-right about-body">
<h1> <?php the_title(); ?></h1>

<?php $gallery = get_field( 'gallery' );
if( has_post_thumbnail() || $gallery ) : ?>
	<div class="slide" style="background-image: url('<?php echo get_the_post_thumbnail_url(); ?>'); background-position: <?php the_field('gallery_thumbnails_align'); ?>"></div>
	<!-- visual -->
	<div class="visual gallery-visual">
		<!-- project gallery -->
		<div class="project-gallery" data-effect="<?php the_field( 'effect' ); ?>">
			<div class="mask">

				<?php if ( has_post_thumbnail() ) : ?>
					<div class="slide" style="background-image: url(' <?php echo get_the_post_thumbnail_url(); ?>'); background-position: <?php the_field('gallery_thumbnails_align'); ?>"></div>
				<?php endif; ?>
				<?php if ( $gallery ) : ?>
					<?php foreach( $gallery as $image ) : ?>
						<?php if($image['image']) { ?>
							<div class="slide" style="background-image: url('<?php echo wp_get_attachment_image_src($image['image'])[0]; ?>'); background-position: <?php the_field('gallery_thumbnails_align'); ?>"></div>
						<?php }?>
						<?php if($image['video']) { ?>
							<?php $theVid = $image['video']; ?>
							<?php $video = wp_get_attachment_image_src( get_post_thumbnail_id( $theVid['ID'] ), 'large' ); ?>
							<div class="slide"><video poster="<?php echo $video[0]; ?>" width="100%" height="100%" id="sampleMovie" src="<?php echo $theVid['url']; ?>" preload controls></video></div>
						<?php }?>
					<?php endforeach; ?>
				<?php endif; ?>
			</div>
			<!-- thumbnails -->
			<div class="thumbnails">
				<div class="mask">
					<div class="slideset">
						<?php if ( has_post_thumbnail() && sizeof($gallery) == 1 ) : ?>
							
						<?php else: ?>
                            <?php if(sizeof($gallery) > 1): ?>
							<div class="thumb-slide active"><a href="#"><?php echo get_the_post_thumbnail(); ?></a></div>
                            <?php endif; ?>
						<?php endif; ?>
						<?php if ( $gallery ) : ?>
							<?php foreach( $gallery as $image ) : ?>
								<?php if($image['image']) { ?>
                                    <?php if(sizeof($gallery) > 1): ?>
									<div class="thumb-slide"><a href="#"><img src="<?php echo wp_get_attachment_image_src($image['image'])[0]; ?>"></a></div>
                                    <?php endif; ?>
								<?php } ?>
								<?php if($image['video']) { ?>
									<?php $theVid = $image['video']; ?>
									<?php $video = wp_get_attachment_image_src( get_post_thumbnail_id( $theVid['ID'] ), 'project-thumb' ); ?>
									<div class="thumb-slide"><a href="#">
											<img src="<?php echo $video[0]; ?>"></a></div>
								<?php } ?>
							<?php endforeach; ?>
						<?php endif; ?>
					</div>
				</div>
				<?php if ( $gallery ) : ?>
					<a href="#" class="btn-thumb-prev"><svg class="icon"><use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/images/sprite.svg#icon-arrow-left"></use></svg></a>
					<a href="#" class="btn-thumb-next"><svg class="icon"><use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/images/sprite.svg#icon-arrow-right"></use></svg></a>
				<?php endif; ?>
			</div>
		</div>
	</div>
<?php endif; ?>
	<!-- post -->
	<div class="post">
		<div class="project-description">
			<?php $categories = get_the_terms( get_the_ID(), get_post_type() . '_cat' );
			if ( $categories ) : ?>
				<!-- post category -->
				<div class="post-category" style="display: none;"><span class="category"><?php echo strtoupper( get_post_type() ); ?></span> <span class="subcategory"><?php foreach( $categories as $cat ) {echo $cat->name; $cat_slug = $cat->slug; break;}  ?></span></div>
			<?php endif; ?>
			<!-- post content -->
			<div class="post-content">
				<?php the_content(); ?>
			</div>
		</div>
	</div>
</div>