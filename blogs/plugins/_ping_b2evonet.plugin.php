<?php
/**
 * This file implements the ping_b2evonet_plugin.
 *
 * For the most recent and complete Plugin API documentation
 * see {@link Plugin} in ../evocore/_plugin.class.php.
 *
 * This file is part of the evoCore framework - {@link http://evocore.net/}
 * See also {@link http://sourceforge.net/projects/evocms/}.
 *
 * @copyright (c)2003-2007 by Francois PLANQUE - {@link http://fplanque.net/}
 * Parts of this file are copyright (c)2004-2006 by Daniel HAHLER - {@link http://thequod.de/contact}.
 *
 * {@internal License choice
 * - If you have received this file as part of a package, please find the license.txt file in
 *   the same folder or the closest folder above for complete license terms.
 * - If you have received this file individually (e-g: from http://evocms.cvs.sourceforge.net/)
 *   then you must choose one of the following licenses before using the file:
 *   - GNU General Public License 2 (GPL) - http://www.opensource.org/licenses/gpl-license.php
 *   - Mozilla Public License 1.1 (MPL) - http://www.opensource.org/licenses/mozilla1.1.php
 * }}
 *
 * {@internal Open Source relicensing agreement:
 * Daniel HAHLER grants Francois PLANQUE the right to license
 * Daniel HAHLER's contributions to this file and the b2evolution project
 * under any OSI approved OSS license (http://www.opensource.org/licenses/).
 * }}
 *
 * @package plugins
 *
 * @author blueyed: Daniel HAHLER
 *
 * @version $Id$
 */
if( !defined('EVO_MAIN_INIT') ) die( 'Please, do not access this page directly.' );


/**
 * Pingomatic plugin.
 *
 * @package plugins
 */
class ping_b2evonet_plugin extends Plugin
{
	/**
	 * Variables below MUST be overriden by plugin implementations,
	 * either in the subclass declaration or in the subclass constructor.
	 */
	var $code = 'ping_b2evonet';
	var $priority = 50;
	var $version = '1.9-dev';
	var $author = 'The b2evo Group';

	/*
	 * These variables MAY be overriden.
	 */
	var $apply_rendering = 'never';
	var $group = 'ping';
	var $number_of_installs = 1;

	
	/**
	 * Init
	 */
	function PluginInit( & $params )
	{
		$this->name = T_('Ping b2evolution.net');
		$this->short_desc = T_('Ping the b2evolution.net site');
		$this->long_desc = T_('Pings the b2evolution.net site to include your post in the list of recently updated blogs.');

		$this->ping_service_name = 'b2evolution.net';
		$this->ping_service_note = $this->long_desc;
	}


	/**
	 * Ping the pingomatic RPC service.
	 */
	function ItemSendPing( & $params )
	{
		global $evonetsrv_host, $evonetsrv_port, $evonetsrv_uri;
		global $debug;

		$item_Blog = $params['Item']->get_Blog();

		$client = new xmlrpc_client( $evonetsrv_uri, $evonetsrv_host, $evonetsrv_port);
		$client->debug = ( $debug == 2 ); 

		$message = new xmlrpcmsg( 'b2evo.ping', array(
				new xmlrpcval('id') ,			// Reserved
				new xmlrpcval('user'),		// Reserved
				new xmlrpcval('pass'),		// Reserved
				new xmlrpcval($item_Blog->dget('name', 'xml')),
				new xmlrpcval($item_Blog->dget('url', 'xml')),
				new xmlrpcval($item_Blog->dget('locale', 'xml')),
				new xmlrpcval($params['Item']->dget('title', 'xml' )),
			)  );
		$result = $client->send($message);

		$params['xmlrpcresp'] = $result;

		return true;
	}

}


/*
 * $Log$
 * Revision 1.6  2007/09/11 20:57:51  fplanque
 * minor fixes
 *
 * Revision 1.5  2007/04/26 00:11:04  fplanque
 * (c) 2007
 *
 * Revision 1.4  2007/04/20 02:53:13  fplanque
 * limited number of installs
 *
 * Revision 1.3  2006/11/24 18:27:27  blueyed
 * Fixed link to b2evo CVS browsing interface in file docblocks
 *
 * Revision 1.2  2006/10/11 17:21:09  blueyed
 * Fixes
 *
 * Revision 1.1  2006/10/01 22:26:48  blueyed
 * Initial import of ping plugins.
 *
 */
?>