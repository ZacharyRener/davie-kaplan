<?php

namespace App;

/**
 * Theme customizer
 */
add_action('customize_register', function (\WP_Customize_Manager $wp_customize) {
    // Add postMessage support
    $wp_customize->get_setting('blogname')->transport = 'postMessage';
    $wp_customize->selective_refresh->add_partial('blogname', [
        'selector' => '.brand',
        'render_callback' => function () {
            bloginfo('name');
        }
    ]);
});

/**
 * Customizer JS
 */
add_action('customize_preview_init', function () {
    wp_enqueue_script('sage/customizer.js', asset_path('scripts/customizer.js'), ['customize-preview'], null, true);
});

wp_enqueue_style('main', get_template_directory_uri() . '/assets/dist/main.min.css', array(), filemtime(get_template_directory() . '/assets/dist/main.min.css'), false);

if( function_exists('acf_add_options_page') ) { acf_add_options_page(); }


add_action( 'init', function(){

    register_nav_menu('header-menu',__( 'Header Menu' ));

    $labels = array(
		'name'                  => _x( 'Offers', 'Post Type General Name', 'jtptheme' ),
		'singular_name'         => _x( 'Offer', 'Post Type Singular Name', 'jtptheme' ),
		'menu_name'             => __( 'Offers', 'jtptheme' ),
		'name_admin_bar'        => __( 'Offers', 'jtptheme' ),
		'archives'              => __( 'Offer Archives', 'jtptheme' ),
		'attributes'            => __( 'Offer Attributes', 'jtptheme' ),
		'parent_item_colon'     => __( 'Parent Offer:', 'jtptheme' ),
		'all_items'             => __( 'All Offers', 'jtptheme' ),
		'add_new_item'          => __( 'Add New Offer', 'jtptheme' ),
		'add_new'               => __( 'Add New Offer', 'jtptheme' ),
		'new_item'              => __( 'New Offer', 'jtptheme' ),
		'edit_item'             => __( 'Edit Offer', 'jtptheme' ),
		'update_item'           => __( 'Update Offer', 'jtptheme' ),
		'view_item'             => __( 'View Offer', 'jtptheme' ),
		'view_items'            => __( 'View Offer', 'jtptheme' ),
		'search_items'          => __( 'Search Offer', 'jtptheme' ),
		'not_found'             => __( 'Not found', 'jtptheme' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'jtptheme' ),
		'featured_image'        => __( 'Featured Image', 'jtptheme' ),
		'set_featured_image'    => __( 'Set featured image', 'jtptheme' ),
		'remove_featured_image' => __( 'Remove featured image', 'jtptheme' ),
		'use_featured_image'    => __( 'Use as featured image', 'jtptheme' ),
		'insert_into_item'      => __( 'Insert into Offer', 'jtptheme' ),
		'uploaded_to_this_item' => __( 'Uploaded to this Offer', 'jtptheme' ),
		'items_list'            => __( 'Items list', 'jtptheme' ),
		'items_list_navigation' => __( 'Items list navigation', 'jtptheme' ),
		'filter_items_list'     => __( 'Filter items list', 'jtptheme' ),
	);
	$args = array(
		'label'                 => __( 'Offer', 'jtptheme' ),
		'description'           => __( 'Offers', 'jtptheme' ),
		'labels'                => $labels,
		'supports'              => array( 'title'),
		// 'taxonomies'            => array( 'category', 'post_tag' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
        'show_in_rest'          => true,
		'menu_position'         => 10,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,		
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
	);
	register_post_type( 'offers', $args );

    $labels = array(
		'name'                  => _x( 'Projects', 'Post Type General Name', 'jtptheme' ),
		'singular_name'         => _x( 'Project', 'Post Type Singular Name', 'jtptheme' ),
		'menu_name'             => __( 'Projects', 'jtptheme' ),
		'name_admin_bar'        => __( 'Projects', 'jtptheme' ),
		'archives'              => __( 'Project Archives', 'jtptheme' ),
		'attributes'            => __( 'Project Attributes', 'jtptheme' ),
		'parent_item_colon'     => __( 'Parent Project:', 'jtptheme' ),
		'all_items'             => __( 'All Projects', 'jtptheme' ),
		'add_new_item'          => __( 'Add New Project', 'jtptheme' ),
		'add_new'               => __( 'Add New Project', 'jtptheme' ),
		'new_item'              => __( 'New Project', 'jtptheme' ),
		'edit_item'             => __( 'Edit Project', 'jtptheme' ),
		'update_item'           => __( 'Update Project', 'jtptheme' ),
		'view_item'             => __( 'View Project', 'jtptheme' ),
		'view_items'            => __( 'View Project', 'jtptheme' ),
		'search_items'          => __( 'Search Project', 'jtptheme' ),
		'not_found'             => __( 'Not found', 'jtptheme' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'jtptheme' ),
		'featured_image'        => __( 'Featured Image', 'jtptheme' ),
		'set_featured_image'    => __( 'Set featured image', 'jtptheme' ),
		'remove_featured_image' => __( 'Remove featured image', 'jtptheme' ),
		'use_featured_image'    => __( 'Use as featured image', 'jtptheme' ),
		'insert_into_item'      => __( 'Insert into Project', 'jtptheme' ),
		'uploaded_to_this_item' => __( 'Uploaded to this Project', 'jtptheme' ),
		'items_list'            => __( 'Items list', 'jtptheme' ),
		'items_list_navigation' => __( 'Items list navigation', 'jtptheme' ),
		'filter_items_list'     => __( 'Filter items list', 'jtptheme' ),
	);
	$args = array(
		'label'                 => __( 'Project', 'jtptheme' ),
		'description'           => __( 'Projects', 'jtptheme' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor', 'thumbnail'),
		// 'taxonomies'            => array( 'category', 'post_tag' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
        'show_in_rest'          => true,
		'menu_position'         => 10,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,		
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
	);
	register_post_type( 'project', $args );

	$labels = array(
		'name'                  => _x( 'Leadership', 'Post Type General Name', 'jtptheme' ),
		'singular_name'         => _x( 'Leadership', 'Post Type Singular Name', 'jtptheme' ),
		'menu_name'             => __( 'Leadership', 'jtptheme' ),
		'name_admin_bar'        => __( 'Leadership', 'jtptheme' ),
		'archives'              => __( 'Leadership Archives', 'jtptheme' ),
		'attributes'            => __( 'Leadership Attributes', 'jtptheme' ),
		'parent_item_colon'     => __( 'Parent Leadership:', 'jtptheme' ),
		'all_items'             => __( 'All Leadership', 'jtptheme' ),
		'add_new_item'          => __( 'Add New Leadership', 'jtptheme' ),
		'add_new'               => __( 'Add New Leadership', 'jtptheme' ),
		'new_item'              => __( 'New Leadership', 'jtptheme' ),
		'edit_item'             => __( 'Edit Leadership', 'jtptheme' ),
		'update_item'           => __( 'Update Leadership', 'jtptheme' ),
		'view_item'             => __( 'View Leadership', 'jtptheme' ),
		'view_items'            => __( 'View Leadership', 'jtptheme' ),
		'search_items'          => __( 'Search Leadership', 'jtptheme' ),
		'not_found'             => __( 'Not found', 'jtptheme' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'jtptheme' ),
		'featured_image'        => __( 'Featured Image', 'jtptheme' ),
		'set_featured_image'    => __( 'Set featured image', 'jtptheme' ),
		'remove_featured_image' => __( 'Remove featured image', 'jtptheme' ),
		'use_featured_image'    => __( 'Use as featured image', 'jtptheme' ),
		'insert_into_item'      => __( 'Insert into Leadership', 'jtptheme' ),
		'uploaded_to_this_item' => __( 'Uploaded to this Leadership', 'jtptheme' ),
		'items_list'            => __( 'Items list', 'jtptheme' ),
		'items_list_navigation' => __( 'Items list navigation', 'jtptheme' ),
		'filter_items_list'     => __( 'Filter items list', 'jtptheme' ),
	);
	$args = array(
		'label'                 => __( 'Leadership', 'jtptheme' ),
		'description'           => __( 'Leadership', 'jtptheme' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor','author','thumbnail', 'page-attributes'),
		//'taxonomies'            => array( 'categories' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 10,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,		
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
	);
	register_post_type( 'leadership', $args );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'Leadership-Type' ),
        'show_in_rest'      => true
    );

    register_taxonomy( 'team-type', array( 'leadership' ), $args );

    $labels = array(
		'name'                  => _x( 'News', 'Post Type General Name', 'jtptheme' ),
		'singular_name'         => _x( 'News', 'Post Type Singular Name', 'jtptheme' ),
		'menu_name'             => __( 'News', 'jtptheme' ),
		'name_admin_bar'        => __( 'News', 'jtptheme' ),
		'archives'              => __( 'News Archives', 'jtptheme' ),
		'attributes'            => __( 'News Attributes', 'jtptheme' ),
		'parent_item_colon'     => __( 'Parent News:', 'jtptheme' ),
		'all_items'             => __( 'All News', 'jtptheme' ),
		'add_new_item'          => __( 'Add New News', 'jtptheme' ),
		'add_new'               => __( 'Add New News', 'jtptheme' ),
		'new_item'              => __( 'New News', 'jtptheme' ),
		'edit_item'             => __( 'Edit News', 'jtptheme' ),
		'update_item'           => __( 'Update News', 'jtptheme' ),
		'view_item'             => __( 'View News', 'jtptheme' ),
		'view_items'            => __( 'View News', 'jtptheme' ),
		'search_items'          => __( 'Search News', 'jtptheme' ),
		'not_found'             => __( 'Not found', 'jtptheme' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'jtptheme' ),
		'featured_image'        => __( 'Featured Image', 'jtptheme' ),
		'set_featured_image'    => __( 'Set featured image', 'jtptheme' ),
		'remove_featured_image' => __( 'Remove featured image', 'jtptheme' ),
		'use_featured_image'    => __( 'Use as featured image', 'jtptheme' ),
		'insert_into_item'      => __( 'Insert into News', 'jtptheme' ),
		'uploaded_to_this_item' => __( 'Uploaded to this News', 'jtptheme' ),
		'items_list'            => __( 'Items list', 'jtptheme' ),
		'items_list_navigation' => __( 'Items list navigation', 'jtptheme' ),
		'filter_items_list'     => __( 'Filter items list', 'jtptheme' ),
	);
	$args = array(
		'label'                 => __( 'News', 'jtptheme' ),
		'description'           => __( 'News', 'jtptheme' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor','author','thumbnail', 'page-attributes'),
		//'taxonomies'            => array( 'categories' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 10,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,		
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
        'show_in_rest'          => true,
	);
	register_post_type( 'news', $args );

    $labels = array(
        'name'              => _x( 'Project Types', 'taxonomy general name', 'textdomain' ),
        'singular_name'     => _x( 'Project Type', 'taxonomy singular name', 'textdomain' ),
        'search_items'      => __( 'Search Project Types', 'textdomain' ),
        'all_items'         => __( 'All Project Types', 'textdomain' ),
        'parent_item'       => __( 'Parent Project Type', 'textdomain' ),
        'parent_item_colon' => __( 'Parent Project Type:', 'textdomain' ),
        'edit_item'         => __( 'Edit Project Type', 'textdomain' ),
        'update_item'       => __( 'Update Project Type', 'textdomain' ),
        'add_new_item'      => __( 'Add New Project Type', 'textdomain' ),
        'new_item_name'     => __( 'New Project Type Name', 'textdomain' ),
        'menu_name'         => __( 'Project Type', 'textdomain' ),
    );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'Project Type' ),
        'show_in_rest'      => true
    );

    register_taxonomy( 'project-type', array( 'project' ), $args );

    $labels = array(
        'name'              => _x( 'Project Services', 'taxonomy general name', 'textdomain' ),
        'singular_name'     => _x( 'Project Service', 'taxonomy singular name', 'textdomain' ),
        'search_items'      => __( 'Search Project Services', 'textdomain' ),
        'all_items'         => __( 'All Project Services', 'textdomain' ),
        'parent_item'       => __( 'Parent Project Service', 'textdomain' ),
        'parent_item_colon' => __( 'Parent Project Service:', 'textdomain' ),
        'edit_item'         => __( 'Edit Project Service', 'textdomain' ),
        'update_item'       => __( 'Update Project Service', 'textdomain' ),
        'add_new_item'      => __( 'Add New Project Service', 'textdomain' ),
        'new_item_name'     => __( 'New Project Service Name', 'textdomain' ),
        'menu_name'         => __( 'Project Service', 'textdomain' ),
    );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'Project Service' ),
        'show_in_rest'      => true
    );

    register_taxonomy( 'project-service', array( 'project' ), $args );

    $labels = array(
        'name'              => _x( 'Project Regions', 'taxonomy general name', 'textdomain' ),
        'singular_name'     => _x( 'Project Region', 'taxonomy singular name', 'textdomain' ),
        'search_items'      => __( 'Search Project Regions', 'textdomain' ),
        'all_items'         => __( 'All Project Regions', 'textdomain' ),
        'parent_item'       => __( 'Parent Project Region', 'textdomain' ),
        'parent_item_colon' => __( 'Parent Project Region:', 'textdomain' ),
        'edit_item'         => __( 'Edit Project Region', 'textdomain' ),
        'update_item'       => __( 'Update Project Region', 'textdomain' ),
        'add_new_item'      => __( 'Add New Project Region', 'textdomain' ),
        'new_item_name'     => __( 'New Project Region Name', 'textdomain' ),
        'menu_name'         => __( 'Project Region', 'textdomain' ),
    );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'Project Region' ),
        'show_in_rest'      => true
    );

    register_taxonomy( 'project-region', array( 'project' ), $args );

    $labels = array(
		'name'                  => _x( 'Library', 'Post Type General Name', 'jtptheme' ),
		'singular_name'         => _x( 'Library', 'Post Type Singular Name', 'jtptheme' ),
		'menu_name'             => __( 'Library', 'jtptheme' ),
		'name_admin_bar'        => __( 'Library', 'jtptheme' ),
		'archives'              => __( 'Library Archives', 'jtptheme' ),
		'attributes'            => __( 'Library Attributes', 'jtptheme' ),
		'parent_item_colon'     => __( 'Parent Library:', 'jtptheme' ),
		'all_items'             => __( 'All Library', 'jtptheme' ),
		'add_new_item'          => __( 'Add New Library', 'jtptheme' ),
		'add_new'               => __( 'Add New Library', 'jtptheme' ),
		'new_item'              => __( 'New Library', 'jtptheme' ),
		'edit_item'             => __( 'Edit Library', 'jtptheme' ),
		'update_item'           => __( 'Update Library', 'jtptheme' ),
		'view_item'             => __( 'View Library', 'jtptheme' ),
		'view_items'            => __( 'View Library', 'jtptheme' ),
		'search_items'          => __( 'Search Library', 'jtptheme' ),
		'not_found'             => __( 'Not found', 'jtptheme' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'jtptheme' ),
		'featured_image'        => __( 'Featured Image', 'jtptheme' ),
		'set_featured_image'    => __( 'Set featured image', 'jtptheme' ),
		'remove_featured_image' => __( 'Remove featured image', 'jtptheme' ),
		'use_featured_image'    => __( 'Use as featured image', 'jtptheme' ),
		'insert_into_item'      => __( 'Insert into Library', 'jtptheme' ),
		'uploaded_to_this_item' => __( 'Uploaded to this Library', 'jtptheme' ),
		'items_list'            => __( 'Items list', 'jtptheme' ),
		'items_list_navigation' => __( 'Items list navigation', 'jtptheme' ),
		'filter_items_list'     => __( 'Filter items list', 'jtptheme' ),
	);
	$args = array(
		'label'                 => __( 'Library', 'jtptheme' ),
		'description'           => __( 'Library', 'jtptheme' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor','author','thumbnail', 'page-attributes'),
		//'taxonomies'            => array( 'categories' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 10,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,		
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
	);
	register_post_type( 'library', $args );

    $labels = array(
        'name'              => _x( 'Library Types', 'taxonomy general name', 'textdomain' ),
        'singular_name'     => _x( 'Library Type', 'taxonomy singular name', 'textdomain' ),
        'search_items'      => __( 'Search Library Types', 'textdomain' ),
        'all_items'         => __( 'All Library Types', 'textdomain' ),
        'parent_item'       => __( 'Parent Library Type', 'textdomain' ),
        'parent_item_colon' => __( 'Parent Library Type:', 'textdomain' ),
        'edit_item'         => __( 'Edit Library Type', 'textdomain' ),
        'update_item'       => __( 'Update Library Type', 'textdomain' ),
        'add_new_item'      => __( 'Add New Library Type', 'textdomain' ),
        'new_item_name'     => __( 'New Library Type Name', 'textdomain' ),
        'menu_name'         => __( 'Library Type', 'textdomain' ),
    );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'Library Type' ),
        'show_in_rest'      => true
    );

    register_taxonomy( 'library_category', array( 'library' ), $args );

    $labels = array(
        'name'              => _x( 'Primary Services', 'taxonomy general name', 'textdomain' ),
        'singular_name'     => _x( 'Primary Service', 'taxonomy singular name', 'textdomain' ),
        'search_items'      => __( 'Search Primary Services', 'textdomain' ),
        'all_items'         => __( 'All Primary Services', 'textdomain' ),
        'parent_item'       => __( 'Parent Primary Service', 'textdomain' ),
        'parent_item_colon' => __( 'Parent Primary Service:', 'textdomain' ),
        'edit_item'         => __( 'Edit Primary Service', 'textdomain' ),
        'update_item'       => __( 'Update Primary Service', 'textdomain' ),
        'add_new_item'      => __( 'Add New Primary Service', 'textdomain' ),
        'new_item_name'     => __( 'New Primary Service Name', 'textdomain' ),
        'menu_name'         => __( 'Primary Service', 'textdomain' ),
    );
    
    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'primary-service' ),
        'show_in_rest'      => true
    );

    register_taxonomy( 'library_primary_service', array( 'library' ), $args );

    $labels = array(
        'name'              => _x( 'Industries', 'taxonomy general name', 'textdomain' ),
        'singular_name'     => _x( 'Industry', 'taxonomy singular name', 'textdomain' ),
        'search_items'      => __( 'Search Industries', 'textdomain' ),
        'all_items'         => __( 'All Industries', 'textdomain' ),
        'parent_item'       => __( 'Parent Industry', 'textdomain' ),
        'parent_item_colon' => __( 'Parent Industry:', 'textdomain' ),
        'edit_item'         => __( 'Edit Industry', 'textdomain' ),
        'update_item'       => __( 'Update Industry', 'textdomain' ),
        'add_new_item'      => __( 'Add New Industry', 'textdomain' ),
        'new_item_name'     => __( 'New Industry Name', 'textdomain' ),
        'menu_name'         => __( 'Industry', 'textdomain' ),
    );
    
    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'primary-service' ),
        'show_in_rest'      => true
    );

    register_taxonomy( 'library_industry', array( 'library' ), $args );

    $labels = array(
        'name'              => _x( 'Services', 'taxonomy general name', 'textdomain' ),
        'singular_name'     => _x( 'Service', 'taxonomy singular name', 'textdomain' ),
        'search_items'      => __( 'Search Services', 'textdomain' ),
        'all_items'         => __( 'All Services', 'textdomain' ),
        'parent_item'       => __( 'Parent Service', 'textdomain' ),
        'parent_item_colon' => __( 'Parent Service:', 'textdomain' ),
        'edit_item'         => __( 'Edit Service', 'textdomain' ),
        'update_item'       => __( 'Update Service', 'textdomain' ),
        'add_new_item'      => __( 'Add New Service', 'textdomain' ),
        'new_item_name'     => __( 'New Service Name', 'textdomain' ),
        'menu_name'         => __( 'Service', 'textdomain' ),
    );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'Service' ),
        'show_in_rest'      => true
    );

    register_taxonomy( 'blog_service', array( 'post' ), $args );

    $labels = array(
        'name'              => _x( 'Industrys', 'taxonomy general name', 'textdomain' ),
        'singular_name'     => _x( 'Industry', 'taxonomy singular name', 'textdomain' ),
        'search_items'      => __( 'Search Industrys', 'textdomain' ),
        'all_items'         => __( 'All Industrys', 'textdomain' ),
        'parent_item'       => __( 'Parent Industry', 'textdomain' ),
        'parent_item_colon' => __( 'Parent Industry:', 'textdomain' ),
        'edit_item'         => __( 'Edit Industry', 'textdomain' ),
        'update_item'       => __( 'Update Industry', 'textdomain' ),
        'add_new_item'      => __( 'Add New Industry', 'textdomain' ),
        'new_item_name'     => __( 'New Industry Name', 'textdomain' ),
        'menu_name'         => __( 'Industry', 'textdomain' ),
    );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'Industry' ),
        'show_in_rest'      => true
    );

    register_taxonomy( 'blog_industry', array( 'post' ), $args );

}, 0 );


define( 'WP_DEBUG', true );



wp_localize_script( 'wp-api', 'wpApiSettings', array(
    'root' => esc_url_raw( rest_url() ),
    'nonce' => wp_create_nonce( 'wp_rest' )
) );