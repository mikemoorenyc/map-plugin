<?php
function map_tax_init() {

//PROPERTY
$args = array(
  'label' => 'Maps',
  'public' => false,
  'labels' => array(
    'add_new_item' => 'Add New Map',
    'name' => 'Maps',
    'edit_item' => 'Edit Map',
    'search_items' => 'Search Maps',
    'not_found' => 'No Maps found.',
    'all_items' => 'All Maps'
  ),
  'show_ui' => true,
  'capability_type' => 'page',
  'hierarchical' => false,
  'has_archive' => false,
  'rewrite' => array('slug' => 'maps'),
  'query_var' => true,
  'menu_icon' =>'dashicons-location-alt',
  'supports' => array(
      'title',

    )
  );
register_post_type( 'maps', $args );


   
}

add_action( 'init', 'map_tax_init' );
 ?>