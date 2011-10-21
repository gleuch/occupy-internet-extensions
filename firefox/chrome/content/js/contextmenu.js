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
    OccupyInternet.ContextMenu.menus.container.attr('hidden', 'false');
    OccupyInternet.ContextMenu.menus.separator1.attr('hidden', 'false');
  },

  create : function(tab) {  
    if (!OccupyInternet.ContextMenu.menus.container) OccupyInternet.ContextMenu.menus.container = jQuery('#occupyinternet_menu_container');
    if (!OccupyInternet.ContextMenu.menus.separator1) OccupyInternet.ContextMenu.menus.separator1 = jQuery('#occupyinternet_menu_separator1');
    if (!OccupyInternet.ContextMenu.menus.protesters) OccupyInternet.ContextMenu.menus.protesters = jQuery('#occupyinternet_menu_protesters');
    if (!OccupyInternet.ContextMenu.menus.mode_peaceful) OccupyInternet.ContextMenu.menus.mode_peaceful = jQuery('#occupyinternet_menu_mode_peaceful');
    if (!OccupyInternet.ContextMenu.menus.mode_loud) OccupyInternet.ContextMenu.menus.mode_loud = jQuery('#occupyinternet_menu_mode_loud');
    if (!OccupyInternet.ContextMenu.menus.mode_quiet) OccupyInternet.ContextMenu.menus.mode_quiet = jQuery('#occupyinternet_menu_mode_quiet');
  },
  
  remove : function() {
    OccupyInternet.ContextMenu.menus.container.attr('disabled', 'true').attr('hidden', 'true');
    OccupyInternet.ContextMenu.menus.separator1.attr('disabled', 'true').attr('hidden', 'true');
  },
  
  toggle : function(tab) {
    if (!tab) tab = {url : ''};

    if (tab['url'].match(/^(http)/)) {
      OccupyInternet.ContextMenu.create(tab);
      OccupyInternet.ContextMenu.update(tab);
    } else {
      OccupyInternet.ContextMenu.remove();
    }
  },
  
  update : function(tab) {
    OccupyInternet.ContextMenu.create(); // ensure

    if (tab && OccupyInternet.Tabs.tabs[tab.id] && OccupyInternet.Tabs.tabs[tab.id].visits) {
    //   var msg = OccupyInternet.phrases(OccupyInternet.Tabs.tabs[tab.id].visits, 'protester');
    //   chrome.contextMenus.update(OccupyInternet.ContextMenu.menus.protesters, {title : msg}, function() {});
    // }

    jQuery.each(OccupyInternet.mode_types, function(k,v) {
      if (OccupyInternet.ContextMenu.menus['mode_'+ k]) {
        OccupyInternet.ContextMenu.menus['mode_'+ k].attr('checked', (OccupyInternet.mode() == k ? 'true' : 'false'));
      }
    });
  }

};