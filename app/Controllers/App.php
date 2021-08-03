<?php

namespace App\Controllers;

use Sober\Controller\Controller;
use WP_Query;

class App extends Controller
{
    public function siteName()
    {
        return get_bloginfo('name');
    }

    protected $acf = true;

    public static function title()
    {
        if (is_home()) {
            if ($home = get_option('page_for_posts', true)) {
                return get_the_title($home);
            }
            return __('Latest Posts', 'sage');
        }
        if (is_archive()) {
            return get_the_archive_title();
        }
        if (is_search()) {
            return sprintf(__('Search Results for %s', 'sage'), get_search_query());
        }
        if (is_404()) {
            return __('Not Found', 'sage');
        }
        return get_the_title();
    }

    public function mainProject() {

        $featured = get_post(get_field('featured_project'), ARRAY_A);

        return [
            'title' => get_the_title(get_field('featured_project')),
            'excerpt'=> $featured['post_content'],
            'image' => get_the_post_thumbnail_url(get_field('featured_project')),
            'link' => get_the_permalink(get_field('featured_project'))
        ];

    }

    public function recentProjects() {

        $args = [
            'post_type' => 'project',
            'posts_per_page' => 3,
            'orderby' => 'date',
            'order' =>  'ASC',
            'offset' => 1,
        ];

        $query = new WP_Query($args);

        return $query;

    }

    public function parent_id() {

        $leadershipParentId = 483;
        $libraryParentId = 480;
        $newsParentId = 480;
        $projectParentId = 480;
        $postParentId = 519;

        $parentId = wp_get_post_parent_id(get_the_ID()) == 0
            ? get_the_ID() 
            : wp_get_post_parent_id(wp_get_post_parent_id(get_the_ID())) == 0
                ? wp_get_post_parent_id(get_the_ID())
                : wp_get_post_parent_id(wp_get_post_parent_id(get_the_ID()));

        if(get_post_type() == "leadership")
            $parentId = $leadershipParentId;

        if(get_post_type() == "news")
            $parentId = $leadershipParentId;

        if(get_post_type() == "project")
            $parentId = $projectParentId;

        if(get_post_type() == "post" || get_post_type() == 'library')
            $parentId = $postParentId;   

        return $parentId;
        
    }

    public static function responsive_wp_get_attachment_image($att_id, $size = 'project-thumb', $attr = array())
    {
        return preg_replace('/(width|height)="\d*"\s/', "", wp_get_attachment_image($att_id, $size, false, $attr));
    }

    public function child_pages() {

        $leadershipParentId = 480;
        $libraryParentId = 519;
        $newsParentId = 309;
        $projectParentId = 735;
        $postParentId = 519;

        $postDoesntHaveParent = wp_get_post_parent_id(get_the_ID()) == 0;
        if($postDoesntHaveParent){
            $parentId = get_the_ID();
        } else {
            $parentDoesntHaveParent = wp_get_post_parent_id(wp_get_post_parent_id(get_the_ID())) == 0;
            if($parentDoesntHaveParent) {
                $parentId = wp_get_post_parent_id(get_the_ID());
            } else {
                $parentId = wp_get_post_parent_id(wp_get_post_parent_id(get_the_ID()));
            }
            
        }

        if(get_post_type() == "leadership")
            $parentId = $leadershipParentId;

        if(get_post_type() == "news")
            $parentId = $leadershipParentId;

        if(get_post_type() == "project")
            $parentId = $projectParentId;

        if(get_post_type() == "post" || get_post_type() == 'library')
            $parentId = $postParentId;   

        if(get_post_type() == "library")
            $parentId = $libraryParentId;

        $mainLink = get_the_permalink($parentId);
        $mainTitle = get_the_title($parentId);

        $args = array(
            'posts_per_page' => -1,
            'order' => 'ASC',
            'post_type' => 'page',
            'post_parent' => $parentId,
            'post_status' => 'publish'
        );
        $children = get_children($args);

        

        $output = '';

        if($parentId == $projectParentId)
            $mainTitle = 'Projects';
        else if(is_search())
                $mainTitle = 'Search';
        $output .= "

        <div class='navigation'>

            <a href='$mainLink'>$mainTitle</a>";
            $output .= "<ul>";
            if($children):
                
                foreach($children as $child):
                    $pageId = $child->ID;
                    $childLink = get_the_permalink($child->ID);
                    $childTitle = get_the_title($child->ID);
                    $activeClass = $child->ID == get_the_ID() 
                        || $child->ID == $parentId
                            ? 'active' 
                            : '';
                    
                    $args = array(
                        'posts_per_page' => -1,
                        'order' => 'ASC',
                        'post_type' => 'page',
                        'post_parent' => $child->ID,
                        'post_status' => 'publish'
                    );
                    $children = get_children($args);
                    $hasChildrenClass = $children 
                        ? 'has-children'
                        : '';
                    $output .= "
                        <li class='$hasChildrenClass $activeClass'><a class='$activeClass sidebar-id-$pageId' href='$childLink'>$childTitle</a>
                    ";
                    if($children):
                        $output .= "<ul class='sub-menu'>";
                        foreach($children as $child):
                            $childLink = get_the_permalink($child->ID);
                            $childTitle = get_the_title($child->ID);
                            $activeClass = $child->ID == get_the_ID() 
                                || $child->ID == $parentId
                                    ? 'active' 
                                    : '';
                            $output .= "
                                <li><a class='$activeClass' href='$childLink'>$childTitle</a></li>
                            ";
                        endforeach;
                        $output .= "</ul>";
                    endif;
                    $output .= "</li>";
                endforeach;
                
            endif;
            $output .= "</ul>";
        echo "
        </div>

        ";

        return $output;
        
    }

    public static function getSnippet( $str, $wordCount = 10 ) {
        return implode( 
            '', 
            array_slice( 
            preg_split(
                '/([\s,\.;\?\!]+)/', 
                $str, 
                $wordCount*2+1, 
                PREG_SPLIT_DELIM_CAPTURE
            ),
            0,
            $wordCount*2-1
            )
        );
    }

}

