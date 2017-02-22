<?php
add_action('admin_footer-post.php', 'map_post_footer');
add_action('admin_footer-post-new.php', 'map_post_footer');
function map_post_footer() {
  global $post;
  if(get_post_type($post) !== 'maps') {
    return;
  }
?>
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<?php
$blankData = array(
  'categories' => array(
    array(
      'id' => 1,
      'title' => 'Your First Category',
      'color' => '#cc0000',
      'points' => array()
    ),
    array(
      'id' => 2,
      'title' => 'Your Second Category',
      'color' => '#00cc00',
      'points' => array()
    )
  ),
  'mapInfo' => array(
    "zoom" => 14,
    "lat" =>40.7680441,
    "lng" =>-73.9845609
  )

);
$initial = get_post_meta(get_the_ID(), 'mapJSON', true);
if(empty($initial)) {
  $initial = json_encode($blankData);
}


 ?>
<script>
var dObj = <?php echo $initial;?>;
dObj.editing = false;
dObj.mapStatus = null;
var App = {};
App.pluginDir = '<?php echo dirname(plugin_dir_url( __FILE__ ));?>';
App.postID = <?php echo get_the_ID();?>;



</script>

<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?v=3&libraries=places"></script>
<script src="<?php echo dirname(plugin_dir_url( __FILE__ ));?>/plugin-infobox.js"></script>
<script src="<?php echo dirname(plugin_dir_url( __FILE__ ));?>/component-maker.php?getfull=scripts"></script>

<?php




}


 ?>
