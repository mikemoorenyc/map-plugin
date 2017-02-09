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
      'ID' => 1,
      'title' => 'Your First Category',
      'color' => '#cc0000'
    )
  ),
  'posts' => array()
);
$initial = get_post_meta(get_the_ID(), 'mapJSON', true);
if(empty($initial)) {
  $initial = json_encode($blankData);
}


 ?>
<script>
var firstState = <?php echo $initial;?>;
var App = {};
App.pluginDir = '<?php echo dirname(plugin_dir_url( __FILE__ ));?>';
App.postID = <?php echo get_the_ID();?>;

console.log(firstState.categories)
</script>



<?php




}


 ?>
