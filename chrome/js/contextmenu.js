/*

  OccupyInter.net <http://occupyinter.net>
  Copyfree 2011. Made for public use.

  Developed by Greg Leuch <http://gleuch.com> and the Free Art & Technology Lab <http://fffff.at>.

  ---------------------------------------------------------------------------------------------------


*/

OccupyInternet.ContextMenu = {
  protesters : null,
  separator : null,
  mode: null,
  
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

    if (!OccupyInternet.ContextMenu.mode) {
      OccupyInternet.ContextMenu.mode = chrome.contextMenus.create({title : 'Show Protests', checked : OccupyInternet.enabled(), type : 'checkbox', contexts : ['all'], onclick : OccupyInternet.toggle}, function() {});
    }
  },
  
  remove : function() {
    if (OccupyInternet.ContextMenu.protesters) chrome.contextMenus.remove(OccupyInternet.ContextMenu.protesters);
    if (OccupyInternet.ContextMenu.separator) chrome.contextMenus.remove(OccupyInternet.ContextMenu.separator);
    if (OccupyInternet.ContextMenu.mode) chrome.contextMenus.remove(OccupyInternet.ContextMenu.mode);
    delete OccupyInternet.ContextMenu.protesters;
    delete OccupyInternet.ContextMenu.separator;
    delete OccupyInternet.ContextMenu.mode;
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

    var msg = '0 Protesters';
    if (OccupyInternet.Tabs.tabs[tab.id] && OccupyInternet.Tabs.tabs[tab.id].visits) {
      msg = OccupyInternet.phrases(OccupyInternet.Tabs.tabs[tab.id].visits, 'protester');
    }

    chrome.contextMenus.update(OccupyInternet.ContextMenu.protesters, {title : msg}, function() {});
    chrome.contextMenus.update(OccupyInternet.ContextMenu.mode, {checked : OccupyInternet.enabled()}, function() {});
  }

};