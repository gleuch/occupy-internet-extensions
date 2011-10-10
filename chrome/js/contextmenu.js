/*

  OccupyInter.net <http://occupyinter.net>
  Copyfree 2011. Made for public use.

  Developed by Greg Leuch <http://gleuch.com> and the Free Art & Technology Lab <http://fffff.at>.

  ---------------------------------------------------------------------------------------------------


*/

OccupyInternet.ContextMenu = {
  protesters : null,
  separator : null,
  
  init : function() {
    chrome.contextMenus.removeAll();
    OccupyInternet.ContextMenu.create();
  },

  create : function(tab) {  
    if (!OccupyInternet.ContextMenu.protesters) {
      OccupyInternet.ContextMenu.protesters = chrome.contextMenus.create({title : '0 Protesters', contexts : ['all'], onclick : OccupyInternet.toggle}, function() {});
    }

    if (!OccupyInternet.ContextMenu.separator) {
      OccupyInternet.ContextMenu.separator = chrome.contextMenus.create({type : 'separator', contexts : ['all']}, function() {});
    }

    jQuery.each(OccupyInternet.mode_types, function(k,v) {
      if (!OccupyInternet.ContextMenu['mode_'+ k]) {
        OccupyInternet.ContextMenu['mode_'+ k] = chrome.contextMenus.create({title : v, checked : OccupyInternet.isMode(k), type : 'checkbox', contexts : ['all'], onclick : OccupyInternet.setMode}, function() {});
      }
    });
  },
  
  remove : function() {
    if (OccupyInternet.ContextMenu.protesters) chrome.contextMenus.remove(OccupyInternet.ContextMenu.protesters);
    if (OccupyInternet.ContextMenu.separator) chrome.contextMenus.remove(OccupyInternet.ContextMenu.separator);
    delete OccupyInternet.ContextMenu.protesters;
    delete OccupyInternet.ContextMenu.separator;

    jQuery.each(OccupyInternet.mode_types, function(k,v) {
      if (OccupyInternet.ContextMenu['mode_'+ k]) chrome.contextMenus.remove(OccupyInternet.ContextMenu['mode_'+ k]);
      delete OccupyInternet.ContextMenu['mode_'+ k];
    });
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
    if (!OccupyInternet.ContextMenu.protesters || !OccupyInternet.ContextMenu.mode) OccupyInternet.ContextMenu.create();

    if (tab && OccupyInternet.Tabs.tabs[tab.id] && OccupyInternet.Tabs.tabs[tab.id].visits) {
      var msg = OccupyInternet.phrases(OccupyInternet.Tabs.tabs[tab.id].visits, 'protester');
      chrome.contextMenus.update(OccupyInternet.ContextMenu.protesters, {title : msg}, function() {});
    }

    jQuery.each(OccupyInternet.mode_types, function(k,v) {
      if (OccupyInternet.ContextMenu['mode_'+ k]) {
        chrome.contextMenus.update(OccupyInternet.ContextMenu['mode_'+ k], {checked : (OccupyInternet.mode() == k)}, function() {});
      }
    });
  }

};