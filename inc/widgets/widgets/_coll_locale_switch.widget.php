<?php
/**
 * This file implements the Language/Locale/Version switch Widget class.
 *
 * This file is part of the evoCore framework - {@link http://evocore.net/}
 * See also {@link https://github.com/b2evolution/b2evolution}.
 *
 * @license GNU GPL v2 - {@link http://b2evolution.net/about/gnu-gpl-license}
 *
 * @copyright (c)2003-2019 by Francois Planque - {@link http://fplanque.com/}
 *
 * @package evocore
 */
if( !defined('EVO_MAIN_INIT') ) die( 'Please, do not access this page directly.' );

load_class( 'widgets/model/_widget.class.php', 'ComponentWidget' );

/**
 * ComponentWidget: Common navigation links.
 *
 * A ComponentWidget is a displayable entity that can be placed into a Container on a web page.
 *
 * @package evocore
 */
class coll_locale_switch_Widget extends ComponentWidget
{
	var $icon = 'language';

	/**
	 * Constructor
	 */
	function __construct( $db_row = NULL )
	{
		// Call parent constructor:
		parent::__construct( $db_row, 'core', 'coll_locale_switch' );
	}


	/**
	 * Get help URL
	 *
	 * @return string URL
	 */
	function get_help_url()
	{
		return get_manual_url( 'coll-locale-switch-widget' );
	}


	/**
	 * Get name of widget
	 */
	function get_name()
	{
		return T_('Language/Locale/Version switch');
	}


	/**
	 * Get a very short desc. Used in the widget list.
	 */
	function get_short_desc()
	{
		return format_to_output( $this->disp_params['title'] );
	}


	/**
	 * Get short description
	 */
	function get_desc()
	{
		return T_('Display flags to switch between Language/Locale/Version');
	}


	/**
	 * Get definitions for editable params
	 *
	 * @see Plugin::GetDefaultSettings()
	 * @param local params like 'for_editing' => true
	 */
	function get_param_definitions( $params )
	{
		$r = array_merge( array(
				'title' => array(
					'label' => T_('Block title'),
					'note' => T_( 'Title to display in your skin.' ),
					'size' => 40,
					'defaultvalue' => '',
				),
			), parent::get_param_definitions( $params ) );

		return $r;

	}


	/**
	 * Display the widget!
	 *
	 * @param array MUST contain at least the basic display params
	 */
	function display( $params )
	{
		global $Collection, $Blog, $locales;

		$this->init_display( $params );

		// Get collection locales:
		$coll_locales = $Blog->get_locales();

		if( count( $coll_locales ) < 2 )
		{	// Don't display this widget when less 2 locales:
			$this->display_debug_message( 'Widget "'.$this->get_name().'" is hidden because there is no more 1 collection locale.' );
			return false;
		}

		echo $this->disp_params['block_start'];

		$this->disp_title();

		echo $this->disp_params['block_body_start'];

		foreach( $coll_locales as $coll_locale )
		{
			if( ! isset( $locales[ $coll_locale ] ) || ! $locales[ $coll_locale ]['enabled'] )
			{	// Skip wrong or disabled locale:
				continue;
			}

			if( ( $version_Item = & get_current_Item() ) &&
			    ( $locale_Item = & $version_Item->get_version_Item( $coll_locale ) ) )
			{	// Use permanent URL of the version Item with requested locale:
				$locale_switch_url = $locale_Item->get_permanent_url();
			}
			else
			{	// Use URL to front page of the current collection:
				$locale_switch_url = url_add_param( $Blog->get( 'url' ), 'coll_locale='.urlencode( $coll_locale ) );
			}

			echo '<div class="evo_locale_switcher">';

			echo '<a href="'.$locale_switch_url.'">'.
					locale_flag( $coll_locale, 'w16px', 'flag', '', false ).' '.
					$locales[ $coll_locale ]['name'].
				'</a>';

			echo '</div>';
		}

		echo $this->disp_params['block_body_end'];

		echo $this->disp_params['block_end'];

		return true;
	}


	/**
	 * Maybe be overriden by some widgets, depending on what THEY depend on..
	 *
	 * @return array of keys this widget depends on
	 */
	function get_cache_keys()
	{
		global $Collection, $Blog;

		return array(
				'wi_ID'        => $this->ID, // Have the widget settings changed ?
				'set_coll_ID'  => $Blog->ID, // Have the settings of the blog changed ? (ex: new skin)
				'cont_coll_ID' => $Blog->ID, // Has the content of the displayed blog changed ?
				'item_ID'      => ( $version_Item = & get_current_Item() ? $version_Item->ID : 0 ), // Cache each item separately + Has the Item changed?
			);
	}
}

?>