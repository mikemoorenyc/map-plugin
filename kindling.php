<?php
   /*
   Plugin Name: Kindling DEV
   */
?>
<?php
//REMOVE TINYMCE
add_filter('user_can_richedit' , create_function('' , 'return false;') , 50);
//BOTTOM
add_action('admin_footer-post.php', 'remove_buttons');
add_action('admin_footer-post-new.php', 'remove_buttons');

function remove_buttons() {
  ?>
<script>
jQuery(document).ready(function($){
  $('#ed_toolbar').remove();
});

</script>
<style>
#content {margin-top: 0 !important}
</style>
  <?php
}   

 ?>
