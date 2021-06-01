@php

$leadershipParentId = 309;
$libraryParentId = 0;
$page_top_banner_image = get_field('page_top_banner_image', $parentId);

$parentId = get_the_ID();
if(empty($page_top_banner_image)) {
    $parentId = $parent_id;
}

$thumb = get_field('page_top_banner_image', $parentId);

@endphp

<div class="banner" style="height: <?php echo get_field('top_banner_height', $parentId); ?>px !important;">
    <div style="background: url('<?php echo $thumb; ?>') 30% 60% no-repeat; background-position: <?php the_field('top_banner_position', $parentId); ?> !important; height: <?php echo get_field('top_banner_height', $parentId); ?>px !important;" class="slide-img banner-bg-img">
    @if(get_field('enable_cta'))
        <div class='floating-cta'>
            <div class='cta container'>
                <p>{!!$cta_text!!}</p>
                <a href='{{$cta_button_link}}' class='button arrow red'>{!!$cta_button_text!!}</a>
            </div>
        </div>
        <div class='background-dimmer'></div>
    @endif
    </div>
</div>