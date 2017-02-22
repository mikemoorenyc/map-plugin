<?php
function mapBoxes() {
  function mapboxAdd($id, $title, $callback,$position) {
    add_meta_box(
      $id,
      $title,
      $callback,
      'maps',
      $position
    );
  }
  $mapMeta = array(
    array(
      'id' => 'map_categories',
      'title' => 'Categories',
      'callback' => 'map_categories_callback',
      'position' => 'side'
    ),
    array(
      'id' => 'main_map_box',
      'title' => 'Map',
      'callback' => 'main_map_callback',
      'position' => 'normal'
    )
  );
  foreach($mapMeta as $cm) {
    mapboxAdd($cm['id'], $cm['title'], $cm['callback'],$cm['position']);
  }
}

add_action( 'add_meta_boxes', 'mapBoxes' );
function map_categories_callback( $post ) {
	wp_nonce_field( 'map_categories', 'map_categories_nonce' );
  ?>
  <input type="hidden" id="main_map" name="main_map" />
  <div id="map-categories"></div>
  <?php
}
function main_map_callback( $post ) {
	wp_nonce_field( 'main_map', 'main_map_nonce' );

  ?>
  <div id="global-point-container"></div>
  <div id="map-vue"></div>
  <div id="point-list-container"></div>
  <?php
}

 ?>
