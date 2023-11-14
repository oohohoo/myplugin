<?php
if ( ! function_exists( 'ohoho_components_app_setup' ) ) :

function ohoho_components_app_setup() {

    /*
     * Make theme available for translation.
     * Translations can be filed in the /languages/ directory.
     */
    /* Pinegrow generated Load Text Domain Begin */
    load_theme_textdomain( 'ohoho_components_app', get_template_directory() . '/languages' );
    /* Pinegrow generated Load Text Domain End */

    // Add default posts and comments RSS feed links to head.
    add_theme_support( 'automatic-feed-links' );

    /*
     * Let WordPress manage the document title.
     */
    add_theme_support( 'title-tag' );
    
    /*
     * Enable support for Post Thumbnails on posts and pages.
     */
    add_theme_support( 'post-thumbnails' );
    //Support custom logo
    add_theme_support( 'custom-logo' );

    // Add menus.
    register_nav_menus( array(
        'primary' => __( 'Primary Menu', 'ohoho_components_app' ),
        'social'  => __( 'Social Links Menu', 'ohoho_components_app' ),
    ) );

/*
     * Register custom menu locations
     */
    /* Pinegrow generated Register Menus Begin */

    /* Pinegrow generated Register Menus End */
    
/*
    * Set image sizes
     */
    /* Pinegrow generated Image sizes Begin */

    /* Pinegrow generated Image sizes End */
    
    /*
     * Switch default core markup for search form, comment form, and comments
     * to output valid HTML5.
     */
    add_theme_support( 'html5', array(
        'search-form', 'comment-form', 'comment-list', 'gallery', 'caption'
    ) );

    /*
     * Enable support for Post Formats.
     */
    add_theme_support( 'post-formats', array(
        'aside', 'image', 'video', 'quote', 'link', 'gallery', 'status', 'audio', 'chat'
    ) );

    /*
     * Enable support for Page excerpts.
     */
     add_post_type_support( 'page', 'excerpt' );
}
endif; // ohoho_components_app_setup

add_action( 'after_setup_theme', 'ohoho_components_app_setup' );


if ( ! function_exists( 'ohoho_components_app_init' ) ) :

function ohoho_components_app_init() {

    
    // Use categories and tags with attachments
    register_taxonomy_for_object_type( 'category', 'attachment' );
    register_taxonomy_for_object_type( 'post_tag', 'attachment' );

    /*
     * Register custom post types. You can also move this code to a plugin.
     */
    /* Pinegrow generated Custom Post Types Begin */

    register_post_type('components', array(
        'labels' => 
            array(
                'name' => __( 'Components', 'ohoho_components_app' ),
                'singular_name' => __( 'Component', 'ohoho_components_app' )
            ),
        'public' => true,
        'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'custom-fields', 'revisions', 'page-attributes' ),
        'show_in_rest' => true,
        'show_in_menu' => true
    ));

    /* Pinegrow generated Custom Post Types End */
    
    /*
     * Register custom taxonomies. You can also move this code to a plugin.
     */
    /* Pinegrow generated Taxonomies Begin */

    /* Pinegrow generated Taxonomies End */

}
endif; // ohoho_components_app_setup

add_action( 'init', 'ohoho_components_app_init' );


if ( ! function_exists( 'ohoho_components_app_custom_image_sizes_names' ) ) :

function ohoho_components_app_custom_image_sizes_names( $sizes ) {

    /*
     * Add names of custom image sizes.
     */
    /* Pinegrow generated Image Sizes Names Begin*/
    /* This code will be replaced by returning names of custom image sizes. */
    /* Pinegrow generated Image Sizes Names End */
    return $sizes;
}
add_action( 'image_size_names_choose', 'ohoho_components_app_custom_image_sizes_names' );
endif;// ohoho_components_app_custom_image_sizes_names



if ( ! function_exists( 'ohoho_components_app_widgets_init' ) ) :

function ohoho_components_app_widgets_init() {

    /*
     * Register widget areas.
     */
    /* Pinegrow generated Register Sidebars Begin */

    /* Pinegrow generated Register Sidebars End */
}
add_action( 'widgets_init', 'ohoho_components_app_widgets_init' );
endif;// ohoho_components_app_widgets_init



if ( ! function_exists( 'ohoho_components_app_customize_register' ) ) :

function ohoho_components_app_customize_register( $wp_customize ) {
    // Do stuff with $wp_customize, the WP_Customize_Manager object.

    /* Pinegrow generated Customizer Controls Begin */

    /* Pinegrow generated Customizer Controls End */

}
add_action( 'customize_register', 'ohoho_components_app_customize_register' );
endif;// ohoho_components_app_customize_register


if ( ! function_exists( 'ohoho_components_app_enqueue_scripts' ) ) :
    function ohoho_components_app_enqueue_scripts() {

        /* Pinegrow generated Enqueue Scripts Begin */

    wp_deregister_script( 'ohoho_components_app-app' );
    wp_enqueue_script( 'ohoho_components_app-app', get_template_directory_uri() . '/app.js', [], '1.0.5', true);

    /* Pinegrow generated Enqueue Scripts End */

        /* Pinegrow generated Enqueue Styles Begin */

    wp_deregister_style( 'ohoho_components_app-styles' );
    wp_enqueue_style( 'ohoho_components_app-styles', get_template_directory_uri() . '/styles.css', [], '1.0.5', 'all');

    wp_deregister_style( 'ohoho_components_app-style' );
    wp_enqueue_style( 'ohoho_components_app-style', get_bloginfo('stylesheet_url'), [], '1.0.5', 'all');

    /* Pinegrow generated Enqueue Styles End */

    }
    add_action( 'wp_enqueue_scripts', 'ohoho_components_app_enqueue_scripts' );
endif;

function pgwp_sanitize_placeholder($input) { return $input; }
/*
 * Resource files included by Pinegrow.
 */
/* Pinegrow generated Include Resources Begin */
require_once "inc/custom.php";
if( !class_exists( 'PG_Helper_v2' ) ) { require_once "inc/wp_pg_helpers.php"; }

    /* Pinegrow generated Include Resources End */
?>