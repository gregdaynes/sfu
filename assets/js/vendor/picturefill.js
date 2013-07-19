/*! Responsive Images - Author: Gregory Daynes, 2013 — Based off of: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 */

(function( w )
{
  // enable strict mode
  "use strict";
  
  w.respimg = function()
  {
    var     imgs = w.document.getElementsByTagName( 'img' ),
           media = ['', '(min-width: 30em)', '(min-width: 48em)', '(min-width: 62.5em)' ],
        mediadef = ['small', 'medium', 'large', 'extralarge'];
        
    var mediaMatch = null;
        
    // match media to window
    for ( var m = 0, ml = media.length; m < ml; m++ )
    {
      if (w.matchMedia(media[m]).matches)
      {
        mediaMatch = mediadef[m];
      }
    }
    
    // loop the images
    for ( var i = 0, il = imgs.length; i < il; i ++ )
    {
      // has data
      if ( imgs[ i ].getAttribute("data-small" ) !== null 
        || imgs[ i ].getAttribute("data-medium") !== null 
        || imgs[ i ].getAttribute("data-large" ) !== null
        || imgs[ i ].getAttribute("data-extralarge") !== null )
      {        
        // replace img src
        imgs[i].src = imgs[i].getAttribute('data-'+mediaMatch)
      }
    }
    
  };
  
  // Run on resize and domready (w.load as a fallback)
	if( w.addEventListener ){
		w.addEventListener( "resize", w.respimg, false );
		w.addEventListener( "DOMContentLoaded", function(){
			w.respimg();
			// Run once only
			w.removeEventListener( "load", w.respimg, false );
		}, false );
		w.addEventListener( "load", w.respimg, false );
	}
	else if( w.attachEvent ){
		w.attachEvent( "onload", w.respimg );
	}
}( this ));