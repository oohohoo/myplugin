<?php get_header(); ?>

<header>
    <h1 class="center-text"><?php _e( 'My Component Library', 'ohoho_components_app' ); ?></h1>
    <input id="search-input" type="text" placeholder="Search components...">
    <button id="clear-search">
        <?php _e( 'Clear Search', 'ohoho_components_app' ); ?>
    </button>
    <div id="tag-filter">
        <label>
            <input type="checkbox" value="interactive"> 
            <?php _e( 'Interactive', 'ohoho_components_app' ); ?>
        </label>
        <label>
            <input type="checkbox" value="media"> 
            <?php _e( 'Media', 'ohoho_components_app' ); ?>
        </label>
        <label>
            <input type="checkbox" value="content"> 
            <?php _e( 'Content', 'ohoho_components_app' ); ?>
        </label>
        <label>
            <input type="checkbox" value="navigation"> 
            <?php _e( 'Navigation', 'ohoho_components_app' ); ?>
        </label>
        <label>
            <input type="checkbox" value="mobile"> 
            <?php _e( 'Mobile', 'ohoho_components_app' ); ?>
        </label>
    </div>
</header>
<div id="components-container"></div>
<!--  <div id="fullscreen-container" class="fullscreen-container hidden" data-pg-collapsed>
    <iframe id="fullscreen-iframe" class="fullscreen-iframe" src="components/slideshow/slideshow.html"></iframe>
    <button id="close-button" class="close-button">Close</button>
</div>
<div id="fullscreen-container" class="fullscreen-container hidden" data-pg-collapsed>
    <iframe id="fullscreen-iframe" class="fullscreen-iframe" src="components/slideshow/slideshow.html"></iframe>
    <button id="close-button" class="close-button">Close</button>
</div> -->
<?php
    $components_query_args = array(
        'post_type' => 'components',
        'nopaging' => true,
        'order' => 'ASC',
        'orderby' => 'date'
    )
?>
<?php $components_query = new WP_Query( $components_query_args ); ?>
<?php if ( $components_query->have_posts() ) : ?>
    <div class="grid-container">
        <!-- START AUTO-GENERATED COMPONENTS -->
        <?php while ( $components_query->have_posts() ) : $components_query->the_post(); ?>
            <?php PG_Helper_v2::rememberShownPost(); ?>
            <div id="ja-sam-jebena" data-component-name="ja sam jebena" <?php post_class( 'grid-item' ); ?>>
                <h2 class="fulliframe"><?php the_title(); ?></h2>
                <iframe data-src="./components/ja sam jebena/ja sam jebena.html" title="Live Preview"></iframe>
                <ul class="tags">
                    <li>
                        <?php _e( 'mobile', 'ohoho_components_app' ); ?>
                    </li>
                    <li>
                        <?php _e( 'media', 'ohoho_components_app' ); ?>
                    </li>
                </ul>
                <button class="close-button">
                    <?php _e( 'Close', 'ohoho_components_app' ); ?>
                </button>
                <div class="button-container">
                    <button onclick="copyFileContent('components/ja sam jebena/ja sam jebena.html', this)">
                        <?php _e( 'HTML', 'ohoho_components_app' ); ?>
                    </button>
                    <button onclick="copyFileContent('components/ja sam jebena/ja sam jebena.js', this)">
                        <?php _e( 'JS', 'ohoho_components_app' ); ?>
                    </button>
                    <button onclick="copyFileContent('components/ja sam jebena/ja sam jebena.css', this)">
                        <?php _e( 'CSS', 'ohoho_components_app' ); ?>
                    </button>
                </div>
            </div>
        <?php endwhile; ?>
        <?php wp_reset_postdata(); ?>
        <div class="grid-item" id="mala-maša" data-component-name="mala maša">
            <h2 class="fulliframe"><?php the_title(); ?></h2>
            <iframe data-src="./components/mala maša/mala maša.html" title="Live Preview"></iframe>
            <ul class="tags">
                <li>
                    <?php _e( 'mobile', 'ohoho_components_app' ); ?>
                </li>
                <li>
                    <?php _e( 'media', 'ohoho_components_app' ); ?>
                </li>
            </ul>
            <button class="close-button">
                <?php _e( 'Close', 'ohoho_components_app' ); ?>
            </button>
            <div class="button-container">
                <button onclick="copyFileContent('components/mala maša/mala maša.html', this)">
                    <?php _e( 'HTML', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/mala maša/mala maša.js', this)">
                    <?php _e( 'JS', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/mala maša/mala maša.css', this)">
                    <?php _e( 'CSS', 'ohoho_components_app' ); ?>
                </button>
            </div>
        </div>
        <div class="grid-item" id="mobile-nav" data-component-name="mobile-nav">
            <h2 class="fulliframe"><?php the_title(); ?></h2>
            <iframe data-src="./components/mobile-nav/mobile-nav.html" title="Live Preview"></iframe>
            <ul class="tags">
                <li>
                    <?php _e( 'mobile', 'ohoho_components_app' ); ?>
                </li>
                <li>
                    <?php _e( 'media', 'ohoho_components_app' ); ?>
                </li>
            </ul>
            <button class="close-button">
                <?php _e( 'Close', 'ohoho_components_app' ); ?>
            </button>
            <div class="button-container">
                <button onclick="copyFileContent('components/mobile-nav/mobile-nav.html', this)">
                    <?php _e( 'HTML', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/mobile-nav/mobile-nav.js', this)">
                    <?php _e( 'JS', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/mobile-nav/mobile-nav.css', this)">
                    <?php _e( 'CSS', 'ohoho_components_app' ); ?>
                </button>
            </div>
        </div>
        <div class="grid-item" id="tabs" data-component-name="tabs">
            <h2 class="fulliframe"><?php the_title(); ?></h2>
            <iframe data-src="./components/tabs/tabs.html" title="Live Preview"></iframe>
            <ul class="tags">
                <li>
                    <?php _e( 'mobile', 'ohoho_components_app' ); ?>
                </li>
                <li>
                    <?php _e( 'media', 'ohoho_components_app' ); ?>
                </li>
            </ul>
            <button class="close-button">
                <?php _e( 'Close', 'ohoho_components_app' ); ?>
            </button>
            <div class="button-container">
                <button onclick="copyFileContent('components/tabs/tabs.html', this)">
                    <?php _e( 'HTML', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/tabs/tabs.js', this)">
                    <?php _e( 'JS', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/tabs/tabs.css', this)">
                    <?php _e( 'CSS', 'ohoho_components_app' ); ?>
                </button>
            </div>
        </div>
        <!-- END AUTO-GENERATED COMPONENTS -->
        <!-- Add component button -->
        <button id="add-component">
            <?php _e( 'ADD COMPONENT', 'ohoho_components_app' ); ?>
        </button>
        <!--  <button id="show-form-button">Add Component</button> -->
        <!-- Side panel for adding/editing components -->
        <div id="side-panel" class="side-panel-hidden">
            <form id="component-form">
                <button type="button" id="close-form-button">
                    <?php _e( 'Close', 'ohoho_components_app' ); ?>
                </button>
                <input type="text" id="component-name" placeholder="Component name" required>
                <textarea id="html-code" placeholder="HTML code" required></textarea>
                <textarea id="css-code" placeholder="CSS code" required></textarea>
                <textarea id="js-code" placeholder="JavaScript code" required></textarea>
                <select id="tag-selection">
                    <!-- Add options for each tag -->
                </select>
                <textarea id="notes" placeholder="Notes"></textarea>
                <button type="submit">
                    <?php _e( 'SAVE', 'ohoho_components_app' ); ?>
                </button>
            </form>
        </div>
        <!-- Additional components would follow the same structure -->
    </div>
<?php else : ?>
    <p><?php _e( 'Sorry, no posts matched your criteria.', 'ohoho_components_app' ); ?></p>
<?php endif; ?>

<?php get_footer(); ?>