/*

  OccupyInter.net <http://occupyinter.net>
  Copyfree 2011. Made for public use.

  Developed by Greg Leuch <http://gleuch.com> and the Free Art & Technology Lab <http://fffff.at>.

  ---------------------------------------------------------------------------------------------------


*/

OccupyInternet.ContextMenu = {
  menus : {},
  
  init : function() {
    OccupyInternet.ContextMenu.create();
    OccupyInternet.ContextMenu.menus.container.attr('hidden', 'true');
    OccupyInternet.ContextMenu.menus.separator1.attr('hidden', 'true');
  },

  create : function(tab) {  
    if (!OccupyInternet.ContextMenu.menus.container) OccupyInternet.ContextMenu.menus.container = jQuery('#occupyinternet_menu_container');
    if (!OccupyInternet.ContextMenu.menus.separator1) OccupyInternet.ContextMenu.menus.separator1 = jQuery('#occupyinternet_menu_separator1');
    if (!OccupyInternet.ContextMenu.menus.protesters) OccupyInternet.ContextMenu.menus.protesters = jQuery('#occupyinternet_menu_protesters');
    if (!OccupyInternet.ContextMenu.menus.mode_peaceful) OccupyInternet.ContextMenu.menus.mode_peaceful = jQuery('#occupyinternet_menu_mode_peaceful');
    if (!OccupyInternet.ContextMenu.menus.mode_loud) OccupyInternet.ContextMenu.menus.mode_loud = jQuery('#occupyinternet_menu_mode_loud');
    if (!OccupyInternet.ContextMenu.menus.mode_quiet) OccupyInternet.ContextMenu.menus.mode_quiet = jQuery('#occupyinternet_menu_mode_quiet');
  },
  
  show : function() {
    OccupyInternet.ContextMenu.menus.container.attr('hidden', 'false');
    OccupyInternet.ContextMenu.menus.separator1.attr('hidden', 'false');
  },

  remove : function() {
    OccupyInternet.ContextMenu.menus.container.attr('hidden', 'true');
    OccupyInternet.ContextMenu.menus.separator1.attr('hidden', 'true');
  },
  
  toggle : function(tab) {
    if (!tab) return;

    if (tab && tab.currentURI && tab.currentURI.spec.match(/^(http)/)) {
      OccupyInternet.ContextMenu.create(tab);
      OccupyInternet.ContextMenu.update(tab);
      OccupyInternet.ContextMenu.show();
    } else {
      OccupyInternet.ContextMenu.remove();
    }
  },
  
  update : function(tab) {
    OccupyInternet.ContextMenu.create(); // ensure
    var tabid = OccupyInternet.Tabs.id(tab);

    if (tab && OccupyInternet.Tabs.tabs[tabid] && OccupyInternet.Tabs.tabs[tabid].visits) {
      var msg = OccupyInternet.phrases(OccupyInternet.Tabs.tabs[tabid].visits, 'protester');
      jQuery('#occupyinternet_menu_protesters').attr('label', msg);
    }

    jQuery.each(OccupyInternet.mode_types, function(k,v) {
      if (OccupyInternet.ContextMenu.menus['mode_'+ k]) {
        OccupyInternet.ContextMenu.menus['mode_'+ k].attr('checked', (OccupyInternet.mode() == k ? 'true' : 'false'));
      }
    });
  }

};