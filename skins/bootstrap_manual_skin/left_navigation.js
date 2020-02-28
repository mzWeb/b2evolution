/* 
 * This code is used to fix left navigation bar when page is scrolled down
 */

jQuery( document ).ready( function()
{
	var sidebar_selectors = '#evo_container__sidebar, #evo_container__sidebar_2, #evo_container__sidebar_single';

	function fix_sidebars_positions()
	{	// Check all 3 sidebars are NOT in 3 columns (broken layout):
		// (We need to work only with correct layout when 3 sidebars are either in single column or in 2 columns)
		if( jQuery( sidebar_selectors ).length < 3 )
		{	// Skip case with 2 and less sidebars because no issue:
			return;
		}

		var sidebar_left_positions = [];
		jQuery( sidebar_selectors ).each( function()
		{
			var left = jQuery( this ).offset().left;
			if( sidebar_left_positions.indexOf( left ) )
			{	// Put in array only new different left position:
				sidebar_left_positions.push( left );
			}
		} );
		if( sidebar_left_positions.length > 2 )
		{	// WRONG CASE when 3 sidebars are contained in 3 different columns:
			// Correct layout is when 3 sidebars are either in single column or in 2 columns:
			// Make height of the left sidebar same as right sidebar in order to fix the bootstrap CSS issue:
			jQuery( '#evo_container__sidebar' ).parent().css( 'height', jQuery( '#evo_container__sidebar_single' ).parent().outerHeight( true ) + 100 );
		}
		else if( sidebar_left_positions.length == 1 )
		{	// Use auto height when all 3 sidebars in single column:
			jQuery( '#evo_container__sidebar' ).parent().css( 'height', 'auto' );
		}
	}
	// Fix position of sidebar on load and resize window:
	fix_sidebars_positions();
	jQuery( window ).bind( 'resize', fix_sidebars_positions );

	// Detect touch device in order to disable the fixed position for sidebars at all:
	var has_touch_event;
	window.addEventListener( 'touchstart', function set_has_touch_event ()
	{
		has_touch_event = true;
		// Remove event listener once fired, otherwise it'll kill scrolling
		window.removeEventListener( 'touchstart', set_has_touch_event );
	}, false );

	/**
	 * Change header position to fixed or revert to static
	 */
	function change_position_leftnav( $sidebar, $sidebarSpacer )
	{
		if( has_touch_event )
		{	// Don't fix the objects on touch devices:
			return;
		}

		if( $sidebar.length )
		{	// If sidebar exists on the page
			// Get top position of column:
			// Note: 2 cases possible:
			//   A) 3 sidebars in single left column
			//   B) 1 sidebar in left column, 2 sidebars in right column
			var column_top_point = $sidebar.offset().top;
			var column_height = $sidebar.outerHeight( true );
			// Top position(for position:fixed) where sidebar is started, it may be a position under other sidebar for case B:
			var sidebar_top_start_point = top_start_point;
			// Top position of shifting sidebar inside column relating on top sidebars:
			var sidebar_top_shift_in_column = 0
			jQuery( sidebar_selectors ).each( function()
			{	// Go through all sidebars in order to detect in each column current sidebar is located:
				if( $sidebar.offset().left == jQuery( this ).offset().left )
				{	// This is the same column:
					if( column_top_point > jQuery( this ).offset().top )
					{	// Find the toppest point of the column:
						column_top_point = jQuery( this ).offset().top;
					}
					if( jQuery( this ).attr( 'id' ) != $sidebar.attr( 'id' ) )
					{	// This another sidebar but from the same column:
						var sidebar_height = jQuery( this ).parent().outerHeight( true );
						column_height += sidebar_height;
						if( $sidebar.offset().top > jQuery( this ).offset().top )
						{	// If current sidebar is located under another sidebar in the same column (case B)
							sidebar_top_shift_in_column += sidebar_height;
							sidebar_top_start_point += sidebar_height;
						}
					}
				}
			} );

			// Set width of current sidebar to what wrapper has:
			$sidebar.css( 'width', $sidebar.parent().width() );

			if( ! $sidebar.hasClass( 'fixed' ) &&
					column_height < jQuery( window ).height() &&
					jQuery( window ).scrollTop() > $sidebar.offset().top - sidebar_top_start_point )
			{	// Fill the space with fake block with same size where we had real sidebar
				// AND Make sidebar as fixed if we scroll down:
				$sidebar.before( $sidebarSpacer );
				$sidebar.addClass( 'fixed' );
			}
			else if( $sidebar.hasClass( 'fixed' ) &&
					jQuery( window ).scrollTop() < $sidebarSpacer.offset().top - sidebar_top_start_point )
			{	// Remove 'fixed' class from sidebar if we scroll to the top of page:
				$sidebar.removeClass( 'fixed' ).css( 'top', '' );
				// Remove fake block after reverting real sidebar at the original place:
				$sidebarSpacer.remove();
			}

			if( $sidebar.hasClass( 'fixed' ) )
			{	// Check and fix an overlapping of footer with sidebar:
				$sidebar.css( 'top', sidebar_top_start_point + 'px' );
				var diff = $sidebar.offset().top + column_height - sidebar_top_shift_in_column - jQuery( '#evo_site_footer' ).offset().top;
				if( diff >= 0 )
				{	// Don't allow to put sidebar over footer:
					$sidebar.css( 'top', ( sidebar_top_start_point - diff - 5 ) + 'px' );
				}
			}
		}
	}

	// Calculate top point where we should start to make sidebars to fixed position:
	var top_start_point = ( jQuery( '#evo_toolbar' ).length > 0 ? jQuery( '#evo_toolbar' ).height() : 0 ) + 10;
	var site_header_obj = jQuery( '#evo_site_header' );
	if( site_header_obj.length && site_header_obj.css( 'position' ) == 'fixed' )
	{	// Shift fixed sidebar down on height of site header:
		top_start_point += site_header_obj.height();
	}

	// Get site footer height for initialization below:
	var footer_height = ( jQuery( '#evo_site_footer' ).length > 0 ? jQuery( '#evo_site_footer' ).height() : 0 );

	// Set proper position for each sidebar on page loading and on scrolling and resizing window:
	jQuery( sidebar_selectors ).each( function()
	{
		var $sidebar = jQuery( this );
		if( $sidebar.outerHeight( true ) + footer_height < jQuery( document ).height() )
		{	// It make sense to make sidebar with fixed position only when height of sidebar + footer is less than window height
			// Create fake empty block instead of real sidebar in order to fill the space what was used by real sidebar before we made sidebar to "position:fixed",
			// if we don't create such block at the same position and size as sidebar then layout will be broken, because some elements will be shifted to the place where sidebar was before fixed position.
			var $sidebarSpacer = jQuery( '<div />', {
					"class" : "evo_container__sidebar fixed_spacer",
					"height": $sidebar.parent().outerHeight( true )
				} );
			jQuery( window ).bind( 'scroll resize', function ()
			{	// Set proper position on scroll and resize window:
				change_position_leftnav( $sidebar, $sidebarSpacer );
			} );
			// Set proper position on page loading:
			change_position_leftnav( $sidebar, $sidebarSpacer );
		}
	} );
} );