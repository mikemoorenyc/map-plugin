<?php
add_action('admin_head-post-new.php','add_styles');
add_action('admin_head-post.php','add_styles');
function add_styles(){
	global $post;
  if(get_post_type($post) !== 'maps') {
    return;
  }
  ?>
  <link rel="stylesheet" type="text/css" href="<?php echo plugin_dir_url( __FILE__ );?>entry.css?v=<?php echo time();?>">
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css">

  <?php
}

 ?>
