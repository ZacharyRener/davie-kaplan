@php

$page_top_banner_image = get_field('page_top_banner_image', $parentId);

$parentId = get_the_ID();
if(empty($page_top_banner_image)) {
    $parentId = $parent_id;
}

$leadershipParentId = 483;
$libraryParentId = 483;
$newsParentId = 483;
$projectParentId = 483;
$postParentId = 483;

if(get_post_type() == "leadership")
    $parentId = $leadershipParentId;

if(get_post_type() == "news")
    $parentId = $leadershipParentId;

if(get_post_type() == "project")
    $parentId = $projectParentId;

if(get_post_type() == "post" || get_post_type() == 'library')
    $parentId = $postParentId;   

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