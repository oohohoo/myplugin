<!DOCTYPE html>
<!--  Converted from HTML to WordPress with Pinegrow Web Editor. https://pinegrow.com  -->
<html <?php language_attributes(); ?>>
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>">
        <button id="edit-button">
            <?php _e( 'Edit', 'ohoho_components_app' ); ?>
        </button>
        <form id="edit-form" style="display: none;">
            <input id="edit-form-name" type="text">
            <textarea id="edit-form-html"></textarea>
            <textarea id="edit-form-js"></textarea>
            <textarea id="edit-form-css"></textarea>
            <button onclick="saveEditedComponent()">
                <?php _e( 'Save', 'ohoho_components_app' ); ?>
            </button>
        </form>
        <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/images/favicon.png" type="image/png">
        <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
        <meta content="Pinegrow Web Editor" name="generator">
        <?php wp_head(); ?>
    </head>
    <body class="<?php echo implode(' ', get_body_class()); ?>">
        <?php if( function_exists( 'wp_body_open' ) ) wp_body_open(); ?>