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
    if (!localStorage.active) {
      OccupyInternet.active = 'on';
      localStorage.active = OccupyInternet.active;
    }

    if (!localStorage.uuid) localStorage.uuid = jQuery.rand_str(24);

    if (OccupyInternet.dev_mode) {
      localStorage.app_url = 'http://localhost:4567';
    } else {
      localStorage.app_url = 'http://occupyinter.net';
    }

    localStorage.post_url = localStorage.app_url +'/api/count.json';
    localStorage.get_url = localStorage.app_url + '/api/site.json';
  },

  enabled : function() {return (OccupyInternet.active == 'on');},

  toggle : function(tab) {
    OccupyInternet.active = (OccupyInternet.active == 'on' ? 'off' : 'on');
    localStorage.active = OccupyInternet.active;
    OccupyInternet.ContextMenu.toggle(tab);
  },

  url : function(url) {return (url || '').replace(/^(.*)(#.*?)$/, '$1');},
  domain : function(url) {return (url || '').replace(/^(.*)(\:\/\/)([A-Z0-9\-\_\.\:]+)(\/.*)$/i, '$3');}

};