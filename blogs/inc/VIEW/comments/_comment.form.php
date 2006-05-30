<?php
/**
 * This file implements the Comment form.
 *
 * This file is part of the b2evolution/evocms project - {@link http://b2evolution.net/}.
 * See also {@link http://sourceforge.net/projects/evocms/}.
 *
 * @copyright (c)2003-2005 by Francois PLANQUE - {@link http://fplanque.net/}.
 *
 * @license http://b2evolution.net/about/license.html GNU General Public License (GPL)
 *
 * @package admin
 *
 * {@internal Below is a list of authors who have contributed to design/coding of this file: }}
 * @author fplanque: Francois PLANQUE
 *
 * @version $Id$
 */
if( !defined('EVO_MAIN_INIT') ) die( 'Please, do not access this page directly.' );

/**
 * @var Blog
 */
global $Blog;
/**
 * @var Comment
 */
global $edited_Comment;
/**
 *
 */
global $Plugins;

global $comments_use_autobr, $mode, $month;

$Form = & new Form( NULL, 'post', 'post', 'linespan' );

$Form->begin_form( 'eform' );
$Form->hidden( 'ctrl', 'editactions' );
$Form->hidden( 'action', 'editedcomment' );
$Form->hidden( 'blog', $Blog->ID );
$Form->hidden( 'comment_ID', $edited_Comment->ID );
?>

<div class="left_col">

	<fieldset>
		<legend><?php echo T_('Comment contents') ?></legend>

		<?php
		if( ! $edited_Comment->get_author_User() )
		{ // This is not a member comment
			$Form->text( 'newcomment_author', $edited_Comment->author, 20, T_('Name'), '', 100 );
			$Form->text( 'newcomment_author_email', $edited_Comment->author_email, 20, T_('Email'), '', 100 );
			$Form->text( 'newcomment_author_url', $edited_Comment->author_url, 20, T_('URL'), '', 100 );
		}
		?>

	<div class="edit_toolbars">
	<?php // --------------------------- TOOLBARS ------------------------------------
		// CALL PLUGINS NOW:
		$Plugins->trigger_event( 'AdminDisplayToolbar', array( 'target_type' => 'Comment' ) );
	?>
	</div>

	<?php // ---------------------------- TEXTAREA -------------------------------------
	$content = $edited_Comment->content;
	if( $comments_use_autobr == 'always' || $comments_use_autobr == 'opt-out' )
	{
		// echo 'unBR:',htmlspecialchars(str_replace( ' ', '*', $content) );
		$content = unautobrize($content);
	}

	$Form->fieldstart = '<div class="edit_area">';
	$Form->fieldend = "</div>\n";
	$Form->textarea( 'content', $content, 16, '', '', 40 , '' );
	$Form->fieldstart = '<span class="line">';
	$Form->fieldend = '</span>';
	?>
	<script type="text/javascript" language="JavaScript">
		<!--
		// This is for toolbar plugins
		b2evoCanvas = document.getElementById('content');
		//-->
	</script>

	<div class="edit_actions">

	<input type="submit" value="<?php /* TRANS: This is the value of an input submit button */ echo T_('Save !'); ?>" class="SaveButton" tabindex="10" />

	<?php
	// ---------- DELETE ----------
	if( $action == 'editcomment' )
	{	// Editing comment
		// Display delete button if user has permission to:
		$edited_Comment->delete_link( ' ', ' ', '#', '#', 'DeleteButton', true );
	}

	// CALL PLUGINS NOW:
	$Plugins->trigger_event( 'AdminDisplayEditorButton', array( 'target_type' => 'Comment' ) );

	?>
	</div>
	</fieldset>

	<fieldset>
		<legend><?php echo T_('Advanced properties') ?></legend>

		<?php
		if( $current_User->check_perm( 'edit_timestamp' ) )
		{	// ------------------------------------ TIME STAMP -------------------------------------
			$aa = mysql2date('Y', $edited_Comment->date);
			$mm = mysql2date('m', $edited_Comment->date);
			$jj = mysql2date('d', $edited_Comment->date);
			$hh = mysql2date('H', $edited_Comment->date);
			$mn = mysql2date('i', $edited_Comment->date);
			$ss = mysql2date('s', $edited_Comment->date);
			?>
			<div>
			<input type="checkbox" class="checkbox" name="edit_date" value="1" id="timestamp"
				tabindex="13" />
			<label for="timestamp"><strong><?php echo T_('Edit timestamp') ?></strong>:</label>
			<span class="nobr">
			<input type="text" name="jj" value="<?php echo $jj ?>" size="2" maxlength="2" tabindex="14" />
			<select name="mm" tabindex="15">
			<?php
			for ($i = 1; $i < 13; $i = $i + 1)
			{
				echo "\t\t\t<option value=\"$i\"";
				if ($i == $mm)
				echo ' selected="selected"';
				if ($i < 10) {
					$ii = '0'.$i;
				} else {
					$ii = "$i";
				}
				echo ">";
				if( $mode == 'sidebar' )
					echo T_($month_abbrev[$ii]);
				else
					echo T_($month[$ii]);
				echo "</option>\n";
			}
			?>
		</select>

		<input type="text" name="aa" value="<?php echo $aa ?>" size="4" maxlength="5" tabindex="16" />
		</span>
		<span class="nobr">@
		<input type="text" name="hh" value="<?php echo $hh ?>" size="2" maxlength="2" tabindex="17" />:<input type="text" name="mn" value="<?php echo $mn ?>" size="2" maxlength="2" tabindex="18" />:<input type="text" name="ss" value="<?php echo $ss ?>" size="2" maxlength="2" tabindex="19" />
		</span></div>
		<?php
		}

		// --------------------------- AUTOBR --------------------------------------
		?>
		<input type="checkbox" class="checkbox" name="post_autobr" value="1" <?php
		if( $comments_use_autobr == 'always' || $comments_use_autobr == 'opt-out' ) echo ' checked="checked"' ?> id="autobr" tabindex="6" /><label for="autobr">
		<strong><?php echo T_('Auto-BR') ?></strong> <span class="notes"><?php echo T_('This option is deprecated, you should avoid using it.') ?></span></label><br />

	</fieldset>

</div>

<div class="right_col">

	<fieldset>
		<legend><?php echo T_('Comment info') ?></legend>
		<p><strong><?php echo T_('Author') ?>:</strong> <?php echo $edited_Comment->author() ?></p>
		<p><strong><?php echo T_('Type') ?>:</strong> <?php echo $edited_Comment->type; ?></p>
		<p><strong><?php echo T_('IP address') ?>:</strong> <?php echo $edited_Comment->author_IP; ?></p>
		<p><strong><?php echo T_('Spam Karma') ?>:</strong> <?php $edited_Comment->spam_karma(); ?></p>
	</fieldset>

	<?php
		$Form->begin_fieldset( T_('Visibility'), array( 'id' => 'commentform_visibility' ) );

		$sharing_options[] = array( 'published', T_('Published (Public)') );
		$sharing_options[] = array( 'draft', T_('Draft (Not published!)') );
		$sharing_options[] = array( 'deprecated', T_('Deprecated (Not published!)') );
		$Form->radio( 'comment_status', $edited_Comment->status, $sharing_options, '', true );

		$Form->end_fieldset();
	?>
</div>

<div class="clear"></div>

<?php
$Form->end_form();

/*
 * $Log$
 * Revision 1.9  2006/05/30 20:32:57  blueyed
 * Lazy-instantiate "expensive" properties of Comment and Item.
 *
 * Revision 1.8  2006/04/19 22:08:56  blueyed
 * Fixed spam_karma
 *
 * Revision 1.7  2006/04/18 19:29:52  fplanque
 * basic comment status implementation
 *
 * Revision 1.6  2006/04/06 19:48:28  blueyed
 * temporary fix
 *
 * Revision 1.5  2006/03/12 23:09:01  fplanque
 * doc cleanup
 *
 * Revision 1.4  2006/03/12 20:22:40  fplanque
 * no message
 *
 * Revision 1.3  2006/03/11 21:50:16  blueyed
 * Display spam_karma with comments
 *
 * Revision 1.2  2006/03/08 19:53:16  fplanque
 * fixed quite a few broken things...
 *
 * Revision 1.1  2006/02/23 21:12:17  fplanque
 * File reorganization to MVC (Model View Controller) architecture.
 * See index.hml files in folders.
 * (Sorry for all the remaining bugs induced by the reorg... :/)
 *
 * Revision 1.9  2005/12/22 23:13:39  blueyed
 * Plugins' API changed and handling optimized
 *
 * Revision 1.8  2005/12/12 19:21:20  fplanque
 * big merge; lots of small mods; hope I didn't make to many mistakes :]
 *
 * Revision 1.7  2005/10/24 23:20:32  blueyed
 * Removed &nbsp; in submit button value.
 *
 * Revision 1.6  2005/09/06 17:13:53  fplanque
 * stop processing early if referer spam has been detected
 *
 * Revision 1.5  2005/08/24 13:24:27  fplanque
 * no message
 *
 * Revision 1.3  2005/08/18 15:06:18  fplanque
 * got rid of format_to_edit(). This functionnality is being taken care of by the Form class.
 *
 * Revision 1.2  2005/02/28 09:06:37  blueyed
 * removed constants for DB config (allows to override it from _config_TEST.php), introduced EVO_CONFIG_LOADED
 *
 * Revision 1.1  2004/12/14 20:27:11  fplanque
 * splited post/comment edit forms
 *
 */
?>
