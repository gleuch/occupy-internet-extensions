/*

  OccupyInter.net <http://occupyinter.net>
  Copyfree 2011. Made for public use.

  Developed by Greg Leuch <http://gleuch.com> and the Free Art & Technology Lab <http://fffff.at>.

  ---------------------------------------------------------------------------------------------------


*/

OccupyInternet.ContextMenu = {
  menus : {},
  
  init : function() {
    chrome.contextMenus.removeAll();
    OccupyInternet.ContextMenu.create();
  },

  create : function(tab) {  
    if (!OccupyInternet.ContextMenu.menus.protesters) {
      OccupyInternet.ContextMenu.menus.protesters = chrome.contextMenus.create({title : '0 Protesters', contexts : ['all'], onclick : OccupyInternet.toggle}, function() {});
    }

    if (!OccupyInternet.ContextMenu.menus.separator1) {
      OccupyInternet.ContextMenu.menus.separator1 = chrome.contextMenus.create({type : 'separator', contexts : ['all']}, function() {});
    }

    jQuery.each(OccupyInternet.mode_types, function(k,v) {
      if (!OccupyInternet.ContextMenu.menus['mode_'+ k]) {
        OccupyInternet.ContextMenu.menus['mode_'+ k] = chrome.contextMenus.create({title : v, checked : OccupyInternet.isMode(k), type : 'checkbox', contexts : ['all'], onclick : OccupyInternet.setMode}, function() {});
      }
    });

    if (!OccupyInternet.ContextMenu.menus.separator2) {
      OccupyInternet.ContextMenu.menus.separator2 = chrome.contextMenus.create({type : 'separator', contexts : ['all']}, function() {});
    }

    if (!OccupyInternet.ContextMenu.menus.customize) {
      OccupyInternet.ContextMenu.menus.customize = chrome.contextMenus.create({title : 'Goto OccupyInter.net', contexts : ['all'], onclick : OccupyInternet.Protest.customize}, function() {});
    }
  },
  
  remove : function() {
    chrome.contextMenus.removeAll();
    OccupyInternet.ContextMenu.menus = {};
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
      var msg = OccupyInternet.phrases(OccupyInternet.Tabs.tabs[tab.id].visits, 'protester');
      chrome.contextMenus.update(OccupyInternet.ContextMenu.menus.protesters, {title : msg}, function() {});
    }

    jQuery.each(OccupyInternet.mode_types, function(k,v) {
      if (OccupyInternet.ContextMenu.menus['mode_'+ k]) {
        chrome.contextMenus.update(OccupyInternet.ContextMenu.menus['mode_'+ k], {checked : (OccupyInternet.mode() == k)}, function() {});
      }
    });
  }

};