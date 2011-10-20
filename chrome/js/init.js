/*

  OccupyInter.net <http://occupyinter.net>
  Copyfree 2011. Made for public use.

  Developed by Greg Leuch <http://gleuch.com> and the Free Art & Technology Lab <http://fffff.at>.

  ---------------------------------------------------------------------------------------------------


*/

var OccupyInternet = {
  mode_types : {
    peaceful : 'Calm and Peaceful',
    loud : 'Loud and Crazy',
    quiet : 'Quiet Time'
  },
  
  init : function() {
    OccupyInternet.settings();
    OccupyInternet.ContextMenu.init();
    OccupyInternet.Windows.init();
    OccupyInternet.Tabs.init();
    
    OccupyInternet.API.avatars();
    setInterval(OccupyInternet.API.avatars, 900000); // 15min
  },
  
  settings : function() {
    if (!localStorage.mode) localStorage.mode = 'peaceful';
    if (!localStorage.uuid) localStorage.uuid = jQuery.rand_str(24);

    if (OccupyInternet.dev_mode) {
      localStorage.app_url = 'http://localhost:4567';
      localStorage.api_url = 'http://localhost:4568';
    } else {
      localStorage.app_url = 'http://occupyinter.net';
      localStorage.api_url = 'http://api.occupyinter.net';
    }

    
    localStorage.avatars_url = localStorage.app_url +'/avatars.json';
    localStorage.post_url = localStorage.api_url +'/join_protest.json';
    localStorage.get_url = localStorage.api_url + '/site.json';
  },

  enabled : function() {return (localStorage.mode != 'quiet');},
  
  isMode : function(m) {return (localStorage.mode == m);},

  setMode : function(info) {
    var changed = false;
    jQuery.each(OccupyInternet.mode_types, function(k,v) {
      if (OccupyInternet.ContextMenu.menus['mode_'+ k] == info['menuItemId']) {
        OccupyInternet.mode(k);
        changed = true;
      }
    });

    if (changed) {
      jQuery.each(OccupyInternet.Tabs.tabs, function(id, info) {
        OccupyInternet.Protest.update_mode(id);
      })
    }
  },

  mode : function(m) {
    var keys = [];
    jQuery.each(OccupyInternet.mode_types, function(k,v) {keys.push(k);});

    if (m && keys.indexOf(m) != -1) {
      localStorage.mode = m;
      OccupyInternet.ContextMenu.update();
    }

    return localStorage.mode;
  },

  url : function(url) {return (url || '').replace(/^(.*)(#.*?)$/, '$1');},
  domain : function(url) {return (url || '').replace(/^(.*)(\:\/\/)([A-Z0-9\-\_\.\:]+)(\/.*)$/i, '$3');},

  phrases : function(i,s,p) {
    if (!p) p = s+'s';
    return i +' '+ (i != 1 ? p : s);
  }

};