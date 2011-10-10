/*

  OccupyInter.net <http://occupyinter.net>
  Copyfree 2011. Made for public use.

  Developed by Greg Leuch <http://gleuch.com> and the Free Art & Technology Lab <http://fffff.at>.

  ---------------------------------------------------------------------------------------------------


*/

var OccupyInternet = {
  
  init : function() {
    OccupyInternet.settings();
    OccupyInternet.ContextMenu.init();
    OccupyInternet.Windows.init();
    OccupyInternet.Tabs.init();
  },
  
  settings : function() {
    if (!localStorage.active) localStorage.active = 'on';
    if (!localStorage.uuid) localStorage.uuid = jQuery.rand_str(24);

    if (OccupyInternet.dev_mode) {
      localStorage.app_url = 'http://localhost:4567';
    } else {
      localStorage.app_url = 'http://api.occupyinter.net';
    }

    localStorage.post_url = localStorage.app_url +'/count.json';
    localStorage.get_url = localStorage.app_url + '/site.json';
  },

  enabled : function() {return (localStorage.active == 'on');},

  toggle : function(tab) {
    localStorage.active = (localStorage.active == 'on' ? 'off' : 'on');
    OccupyInternet.ContextMenu.update(tab);

    // TODO!!!
    // This should show/hide all instances in tabs!

  },

  url : function(url) {return (url || '').replace(/^(.*)(#.*?)$/, '$1');},
  domain : function(url) {return (url || '').replace(/^(.*)(\:\/\/)([A-Z0-9\-\_\.\:]+)(\/.*)$/i, '$3');},

  phrases : function(i,s,p) {
    if (!p) p = s+'s';
    return i +' '+ (i != 1 ? p : s);
  }

};