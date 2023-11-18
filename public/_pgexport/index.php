<?php get_header(); ?>

<button id="add-component">
    <?php _e( 'ADD COMPONENT', 'ohoho_components_app' ); ?>
</button>
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
    <div id="component-container" class="grid-container">
        <!-- START AUTO-GENERATED COMPONENTS -->
        <?php while ( $components_query->have_posts() ) : $components_query->the_post(); ?>
            <?php PG_Helper_v2::rememberShownPost(); ?>
            <div id="mobile-nav" data-component-name="mobile-nav" <?php post_class( 'grid-item' ); ?>>
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
                <button class="edit-button" onclick="editComponent('mobile-nav')">
                    <?php _e( 'Edit', 'ohoho_components_app' ); ?>
                </button>                         

                <!-- Add this line -->
            </div>
        <?php endwhile; ?>
        <?php wp_reset_postdata(); ?>
        <div class="grid-item" id="ja-sam-jebena" data-component-name="ja sam jebena">
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
            <button class="edit-button" onclick="editComponent('ja sam jebena')">
                <?php _e( 'Edit', 'ohoho_components_app' ); ?>
            </button>                     

            <!-- Add this line -->
        </div>
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
            <button class="edit-button" onclick="editComponent('mala maša')">
                <?php _e( 'Edit', 'ohoho_components_app' ); ?>
            </button>                     

            <!-- Add this line -->
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
            <button class="edit-button" onclick="editComponent('tabs')">
                <?php _e( 'Edit', 'ohoho_components_app' ); ?>
            </button>                     

            <!-- Add this line -->
        </div>
        <div class="grid-item" id="Interactive-Mouse-Cursor-Effect-" data-component-name="Interactive Mouse Cursor Effect ">
            <h2 class="fulliframe"><?php the_title(); ?></h2>
            <iframe data-src="./components/Interactive Mouse Cursor Effect /Interactive Mouse Cursor Effect .html" title="Live Preview"></iframe>
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
                <button onclick="copyFileContent('components/Interactive Mouse Cursor Effect /Interactive Mouse Cursor Effect .html', this)">
                    <?php _e( 'HTML', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/Interactive Mouse Cursor Effect /Interactive Mouse Cursor Effect .js', this)">
                    <?php _e( 'JS', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/Interactive Mouse Cursor Effect /Interactive Mouse Cursor Effect .css', this)">
                    <?php _e( 'CSS', 'ohoho_components_app' ); ?>
                </button>
            </div>
            <button class="edit-button" onclick="editComponent('Interactive Mouse Cursor Effect ')">
                <?php _e( 'Edit', 'ohoho_components_app' ); ?>
            </button>                     

            <!-- Add this line -->
        </div>
        <div class="grid-item" id="slide" data-component-name="slide">
            <h2 class="fulliframe"><?php the_title(); ?></h2>
            <iframe data-src="./components/slide/slide.html" title="Live Preview"></iframe>
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
                <button onclick="copyFileContent('components/slide/slide.html', this)">
                    <?php _e( 'HTML', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/slide/slide.js', this)">
                    <?php _e( 'JS', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/slide/slide.css', this)">
                    <?php _e( 'CSS', 'ohoho_components_app' ); ?>
                </button>
            </div>
            <button class="edit-button" onclick="editComponent('slide')">
                <?php _e( 'Edit', 'ohoho_components_app' ); ?>
            </button>                     

            <!-- Add this line -->
        </div>
        <div class="grid-item" id="novo-pičko" data-component-name="novo pičko">
            <h2 class="fulliframe"><?php the_title(); ?></h2>
            <iframe data-src="./components/novo pičko/novo pičko.html" title="Live Preview"></iframe>
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
                <button onclick="copyFileContent('components/novo pičko/novo pičko.html', this)">
                    <?php _e( 'HTML', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/novo pičko/novo pičko.js', this)">
                    <?php _e( 'JS', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/novo pičko/novo pičko.css', this)">
                    <?php _e( 'CSS', 'ohoho_components_app' ); ?>
                </button>
            </div>
            <button class="edit-button" onclick="editComponent('novo pičko')">
                <?php _e( 'Edit', 'ohoho_components_app' ); ?>
            </button>                     

            <!-- Add this line -->
        </div>
        <div class="grid-item" id="dd" data-component-name="dd">
            <h2 class="fulliframe"><?php the_title(); ?></h2>
            <iframe data-src="./components/dd/dd.html" title="Live Preview"></iframe>
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
                <button onclick="copyFileContent('components/dd/dd.html', this)">
                    <?php _e( 'HTML', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/dd/dd.js', this)">
                    <?php _e( 'JS', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/dd/dd.css', this)">
                    <?php _e( 'CSS', 'ohoho_components_app' ); ?>
                </button>
            </div>
            <button class="edit-button" onclick="editComponent('dd')">
                <?php _e( 'Edit', 'ohoho_components_app' ); ?>
            </button>                     

            <!-- Add this line -->
        </div>
        <div class="grid-item" id="ahhahaha" data-component-name="ahhahaha">
            <h2 class="fulliframe"><?php the_title(); ?></h2>
            <iframe data-src="./components/ahhahaha/ahhahaha.html" title="Live Preview"></iframe>
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
                <button onclick="copyFileContent('components/ahhahaha/ahhahaha.html', this)">
                    <?php _e( 'HTML', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/ahhahaha/ahhahaha.js', this)">
                    <?php _e( 'JS', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/ahhahaha/ahhahaha.css', this)">
                    <?php _e( 'CSS', 'ohoho_components_app' ); ?>
                </button>
            </div>
            <button class="edit-button" onclick="editComponent('ahhahaha')">
                <?php _e( 'Edit', 'ohoho_components_app' ); ?>
            </button>                     

            <!-- Add this line -->
        </div>
        <div class="grid-item" id="jel-radi" data-component-name="jel radi">
            <h2 class="fulliframe"><?php the_title(); ?></h2>
            <iframe data-src="./components/jel radi/jel radi.html" title="Live Preview"></iframe>
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
                <button onclick="copyFileContent('components/jel radi/jel radi.html', this)">
                    <?php _e( 'HTML', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/jel radi/jel radi.js', this)">
                    <?php _e( 'JS', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/jel radi/jel radi.css', this)">
                    <?php _e( 'CSS', 'ohoho_components_app' ); ?>
                </button>
            </div>
            <button class="edit-button" onclick="editComponent('jel radi')">
                <?php _e( 'Edit', 'ohoho_components_app' ); ?>
            </button>                     

            <!-- Add this line -->
        </div>
        <div class="grid-item" id="prvaaaaaa" data-component-name="prvaaaaaa">
            <h2 class="fulliframe"><?php the_title(); ?></h2>
            <iframe data-src="./components/prvaaaaaa/prvaaaaaa.html" title="Live Preview"></iframe>
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
                <button onclick="copyFileContent('components/prvaaaaaa/prvaaaaaa.html', this)">
                    <?php _e( 'HTML', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/prvaaaaaa/prvaaaaaa.js', this)">
                    <?php _e( 'JS', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/prvaaaaaa/prvaaaaaa.css', this)">
                    <?php _e( 'CSS', 'ohoho_components_app' ); ?>
                </button>
            </div>
            <button class="edit-button" onclick="editComponent('prvaaaaaa')">
                <?php _e( 'Edit', 'ohoho_components_app' ); ?>
            </button>                     

            <!-- Add this line -->
        </div>
        <div class="grid-item" id="druga" data-component-name="druga">
            <h2 class="fulliframe"><?php the_title(); ?></h2>
            <iframe data-src="./components/druga/druga.html" title="Live Preview"></iframe>
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
                <button onclick="copyFileContent('components/druga/druga.html', this)">
                    <?php _e( 'HTML', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/druga/druga.js', this)">
                    <?php _e( 'JS', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/druga/druga.css', this)">
                    <?php _e( 'CSS', 'ohoho_components_app' ); ?>
                </button>
            </div>
            <button class="edit-button" onclick="editComponent('druga')">
                <?php _e( 'Edit', 'ohoho_components_app' ); ?>
            </button>                     

            <!-- Add this line -->
        </div>
        <div class="grid-item" id="treća" data-component-name="treća">
            <h2 class="fulliframe"><?php the_title(); ?></h2>
            <iframe data-src="./components/treća/treća.html" title="Live Preview"></iframe>
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
                <button onclick="copyFileContent('components/treća/treća.html', this)">
                    <?php _e( 'HTML', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/treća/treća.js', this)">
                    <?php _e( 'JS', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/treća/treća.css', this)">
                    <?php _e( 'CSS', 'ohoho_components_app' ); ?>
                </button>
            </div>
            <button class="edit-button" onclick="editComponent('treća')">
                <?php _e( 'Edit', 'ohoho_components_app' ); ?>
            </button>                     

            <!-- Add this line -->
        </div>
        <div class="grid-item" id="četvrta" data-component-name="četvrta">
            <h2 class="fulliframe"><?php the_title(); ?></h2>
            <iframe data-src="./components/četvrta/četvrta.html" title="Live Preview"></iframe>
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
                <button onclick="copyFileContent('components/četvrta/četvrta.html', this)">
                    <?php _e( 'HTML', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/četvrta/četvrta.js', this)">
                    <?php _e( 'JS', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/četvrta/četvrta.css', this)">
                    <?php _e( 'CSS', 'ohoho_components_app' ); ?>
                </button>
            </div>
            <button class="edit-button" onclick="editComponent('četvrta')">
                <?php _e( 'Edit', 'ohoho_components_app' ); ?>
            </button>                     

            <!-- Add this line -->
        </div>
        <div class="grid-item" id="peta" data-component-name="peta">
            <h2 class="fulliframe"><?php the_title(); ?></h2>
            <iframe data-src="./components/peta/peta.html" title="Live Preview"></iframe>
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
                <button onclick="copyFileContent('components/peta/peta.html', this)">
                    <?php _e( 'HTML', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/peta/peta.js', this)">
                    <?php _e( 'JS', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/peta/peta.css', this)">
                    <?php _e( 'CSS', 'ohoho_components_app' ); ?>
                </button>
            </div>
            <button class="edit-button" onclick="editComponent('peta')">
                <?php _e( 'Edit', 'ohoho_components_app' ); ?>
            </button>                     

            <!-- Add this line -->
        </div>
        <div class="grid-item" id="ajde-u-kurac" data-component-name="ajde u kurac">
            <h2 class="fulliframe"><?php the_title(); ?></h2>
            <iframe data-src="./components/ajde u kurac/ajde u kurac.html" title="Live Preview"></iframe>
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
                <button onclick="copyFileContent('components/ajde u kurac/ajde u kurac.html', this)">
                    <?php _e( 'HTML', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/ajde u kurac/ajde u kurac.js', this)">
                    <?php _e( 'JS', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/ajde u kurac/ajde u kurac.css', this)">
                    <?php _e( 'CSS', 'ohoho_components_app' ); ?>
                </button>
            </div>
            <button class="edit-button" onclick="editComponent('ajde u kurac')">
                <?php _e( 'Edit', 'ohoho_components_app' ); ?>
            </button>                     

            <!-- Add this line -->
        </div>
        <div class="grid-item" id="koja-si-sad" data-component-name="koja si sad">
            <h2 class="fulliframe"><?php the_title(); ?></h2>
            <iframe data-src="./components/koja si sad/koja si sad.html" title="Live Preview"></iframe>
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
                <button onclick="copyFileContent('components/koja si sad/koja si sad.html', this)">
                    <?php _e( 'HTML', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/koja si sad/koja si sad.js', this)">
                    <?php _e( 'JS', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/koja si sad/koja si sad.css', this)">
                    <?php _e( 'CSS', 'ohoho_components_app' ); ?>
                </button>
            </div>
            <button class="edit-button" onclick="editComponent('koja si sad')">
                <?php _e( 'Edit', 'ohoho_components_app' ); ?>
            </button>                     

            <!-- Add this line -->
        </div>
        <div class="grid-item" id="zadnja" data-component-name="zadnja">
            <h2 class="fulliframe"><?php the_title(); ?></h2>
            <iframe data-src="./components/zadnja/zadnja.html" title="Live Preview"></iframe>
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
                <button onclick="copyFileContent('components/zadnja/zadnja.html', this)">
                    <?php _e( 'HTML', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/zadnja/zadnja.js', this)">
                    <?php _e( 'JS', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/zadnja/zadnja.css', this)">
                    <?php _e( 'CSS', 'ohoho_components_app' ); ?>
                </button>
            </div>
            <button class="edit-button" onclick="editComponent('zadnja')">
                <?php _e( 'Edit', 'ohoho_components_app' ); ?>
            </button>                     

            <!-- Add this line -->
        </div>
        <div class="grid-item" id="najzadnja" data-component-name="najzadnja">
            <h2 class="fulliframe"><?php the_title(); ?></h2>
            <iframe data-src="./components/najzadnja/najzadnja.html" title="Live Preview"></iframe>
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
                <button onclick="copyFileContent('components/najzadnja/najzadnja.html', this)">
                    <?php _e( 'HTML', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/najzadnja/najzadnja.js', this)">
                    <?php _e( 'JS', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/najzadnja/najzadnja.css', this)">
                    <?php _e( 'CSS', 'ohoho_components_app' ); ?>
                </button>
            </div>
            <button class="edit-button" onclick="editComponent('najzadnja')">
                <?php _e( 'Edit', 'ohoho_components_app' ); ?>
            </button>                     

            <!-- Add this line -->
        </div>
        <div class="grid-item" id="fffff" data-component-name="fffff">
            <h2 class="fulliframe"><?php the_title(); ?></h2>
            <iframe data-src="./components/fffff/fffff.html" title="Live Preview"></iframe>
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
                <button onclick="copyFileContent('components/fffff/fffff.html', this)">
                    <?php _e( 'HTML', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/fffff/fffff.js', this)">
                    <?php _e( 'JS', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/fffff/fffff.css', this)">
                    <?php _e( 'CSS', 'ohoho_components_app' ); ?>
                </button>
            </div>
            <button class="edit-button" onclick="editComponent('fffff')">
                <?php _e( 'Edit', 'ohoho_components_app' ); ?>
            </button>                     

            <!-- Add this line -->
        </div>
        <div class="grid-item" id="PIČKOO" data-component-name="PIČKOO">
            <h2 class="fulliframe"><?php the_title(); ?></h2>
            <iframe data-src="./components/PIČKOO/PIČKOO.html" title="Live Preview"></iframe>
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
                <button onclick="copyFileContent('components/PIČKOO/PIČKOO.html', this)">
                    <?php _e( 'HTML', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/PIČKOO/PIČKOO.js', this)">
                    <?php _e( 'JS', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/PIČKOO/PIČKOO.css', this)">
                    <?php _e( 'CSS', 'ohoho_components_app' ); ?>
                </button>
            </div>
            <button class="edit-button" onclick="editComponent('PIČKOO')">
                <?php _e( 'Edit', 'ohoho_components_app' ); ?>
            </button>                     

            <!-- Add this line -->
        </div>
        <div class="grid-item" id="pizdice" data-component-name="pizdice">
            <h2 class="fulliframe"><?php the_title(); ?></h2>
            <iframe data-src="./components/pizdice/pizdice.html" title="Live Preview"></iframe>
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
                <button onclick="copyFileContent('components/pizdice/pizdice.html', this)">
                    <?php _e( 'HTML', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/pizdice/pizdice.js', this)">
                    <?php _e( 'JS', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/pizdice/pizdice.css', this)">
                    <?php _e( 'CSS', 'ohoho_components_app' ); ?>
                </button>
            </div>
            <button class="edit-button" onclick="editComponent('pizdice')">
                <?php _e( 'Edit', 'ohoho_components_app' ); ?>
            </button>                     

            <!-- Add this line -->
        </div>
        <div class="grid-item" id="VOLIM-TE" data-component-name="VOLIM TE">
            <h2 class="fulliframe"><?php the_title(); ?></h2>
            <iframe data-src="./components/VOLIM TE/VOLIM TE.html" title="Live Preview"></iframe>
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
                <button onclick="copyFileContent('components/VOLIM TE/VOLIM TE.html', this)">
                    <?php _e( 'HTML', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/VOLIM TE/VOLIM TE.js', this)">
                    <?php _e( 'JS', 'ohoho_components_app' ); ?>
                </button>
                <button onclick="copyFileContent('components/VOLIM TE/VOLIM TE.css', this)">
                    <?php _e( 'CSS', 'ohoho_components_app' ); ?>
                </button>
            </div>
            <button class="edit-button" onclick="editComponent('VOLIM TE')">
                <?php _e( 'Edit', 'ohoho_components_app' ); ?>
            </button>                     

            <!-- Add this line -->
        </div>
        <!-- END AUTO-GENERATED COMPONENTS -->
        <!-- Add component button -->
        <!--  <button id="show-form-button">Add Component</button> -->
        <!-- Side panel for adding/editing components -->
        <!-- Additional components would follow the same structure -->
    </div>
<?php else : ?>
    <p><?php _e( 'Sorry, no posts matched your criteria.', 'ohoho_components_app' ); ?></p>
<?php endif; ?>
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
<div id="editModal" class="modal">
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <h2><?php _e( 'Edit Component', 'ohoho_components_app' ); ?></h2>
        <label for="edit-form-name">
            <?php _e( 'Name', 'ohoho_components_app' ); ?>
        </label>
        <input type="text" id="edit-form-name" name="edit-form-name">
        <label for="edit-form-html">
            <?php _e( 'HTML', 'ohoho_components_app' ); ?>
        </label>
        <textarea id="edit-form-html" name="edit-form-html"></textarea>
        <label for="edit-form-css">
            <?php _e( 'CSS', 'ohoho_components_app' ); ?>
        </label>
        <textarea id="edit-form-css" name="edit-form-css"></textarea>
        <label for="edit-form-js">
            <?php _e( 'JavaScript', 'ohoho_components_app' ); ?>
        </label>
        <textarea id="edit-form-js" name="edit-form-js"></textarea>
        <button id="save-button">
            <?php _e( 'Save', 'ohoho_components_app' ); ?>
        </button>
    </div>
</div>        

<?php get_footer(); ?>