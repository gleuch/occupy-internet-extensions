/*

  OccupyInter.net <http://occupyinter.net>
  Copyfree 2011. Made for public use.

  Developed by Greg Leuch <http://gleuch.com> and the Free Art & Technology Lab <http://fffff.at>.

  ---------------------------------------------------------------------------------------------------


*/

var OccupyInternet = {
  avatars : [],
  mode_types : {
    peaceful : 'Calm and Peaceful',
    loud : 'Loud and Crazy',
    quiet : 'Quiet Time'
  },
  
  init : function() {
    OccupyInternet.settings();
    OccupyInternet.ContextMenu.init();
    OccupyInternet.Tabs.init();
    
    OccupyInternet.API.avatars();
    setInterval(OccupyInternet.API.avatars, 900000); // 15min
  },
  
  settings : function() {
    try {
      OccupyInternet.storage = Components.classes["@mozilla.org/fuel/application;1"].getService(Components.interfaces.fuelIApplication).prefs;
    } catch(e) {
      console.error('BuzzExt Error: '+e);
    }
    
    if (!OccupyInternet.storage.has('mode')) OccupyInternet.storage.setValue('mode', 'peaceful');
    if (!OccupyInternet.storage.has('uuid')) OccupyInternet.storage.setValue('uuid', jQuery.rand_str(24));

    if (OccupyInternet.dev_mode) {
      OccupyInternet.storage.setValue('app_url', 'http://localhost:4567');
      OccupyInternet.storage.setValue('api_url', 'http://localhost:4568');
    } else {
      OccupyInternet.storage.setValue('app_url', 'http://occupyinter.net');
      OccupyInternet.storage.setValue('api_url', 'http://api.occupyinter.net');
    }

    OccupyInternet.storage.setValue('avatars_url', OccupyInternet.storage.getValue('app_url', '') +'/avatars.json');
    OccupyInternet.storage.setValue('post_url', OccupyInternet.storage.getValue('api_url', '') +'/join_protest.json');
    OccupyInternet.storage.setValue('get_url', OccupyInternet.storage.getValue('api_url', '') + '/site.json');
  },

  enabled : function() {return (OccupyInternet.storage.getValue('mode', '') != 'quiet');},
  
  isMode : function(m) {return (OccupyInternet.storage.getValue('mode', '') == m);},

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
      OccupyInternet.storage.setValue('mode', m);
      OccupyInternet.ContextMenu.update();
    }

    return OccupyInternet.storage.getValue('mode', '');
  },

  url : function(url) {return (url || '').replace(/^(.*)(#.*?)$/, '$1');},
  domain : function(url) {return (url || '').replace(/^(.*)(\:\/\/)([A-Z0-9\-\_\.\:]+)(\/.*)$/i, '$3');},

  phrases : function(i,s,p) {
    if (!p) p = s+'s';
    return i +' '+ (i != 1 ? p : s);
  }

};