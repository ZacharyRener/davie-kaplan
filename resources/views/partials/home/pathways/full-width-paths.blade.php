<?php $full_row_bg = get_field('full-background_color'); ?>
<div class="col-sm-12 a-e-p-buttons" style="background-color:<?php echo $full_row_bg;?>;">
<?php if(have_rows('fullwidth_pathways') ): ?>
		<?php while( have_rows('fullwidth_pathways') ): the_row(); 
			$fullicon = get_sub_field('full-icon');
			$fulltext = get_sub_field('full-text');
			$fulllink = get_sub_field('full-link');
			$numberOfPathways = count(get_field('fullwidth_pathways'));?>
				<? if($numberOfPathways == 4){ ?>
					<div class="col-sm-3 a-button" style="width:25%; padding: 15px;">
						<a class="fa <?php echo $fullicon; ?>" style="background:transparent;border:0px;" href="<?php echo $fulllink; ?>"><?php echo $fulltext; ?></a>
					</div>
				<? } elseif($numberOfPathways == 3) { ?>	
					<div class="col-sm-4 a-button" style="padding: 15px;">
						<a class="fa <?php echo $fullicon; ?>" style="background:transparent;border:0px;" href="<?php echo $fulllink; ?>"><?php echo $fulltext; ?></a>
					</div>
				<? } ?>
				
		<?php endwhile; ?>
<?php endif; ?>
</div>