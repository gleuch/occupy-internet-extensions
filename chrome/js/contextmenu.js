/*

  OccupyInter.net <http://occupyinter.net>
  Copyfree 2011. Made for public use.

  Developed by Greg Leuch <http://gleuch.com> and the Free Art & Technology Lab <http://fffff.at>.

  ---------------------------------------------------------------------------------------------------


*/

OccupyInternet.ContextMenu = {
  menu : null,
  
  init : function() {
    chrome.contextMenus.removeAll();
    OccupyInternet.ContextMenu.create();
  },

  create : function() {
    if (OccupyInternet.ContextMenu.menu) return false;
    // OccupyInternet.ContextMenu.menu = chrome.contextMenus.create({title : 'Occupy Internet', checked : OccupyInternet.enabled(), type : 'checkbox', contexts : ['all'], onclick : OccupyInternet.toggle}, function() {});
    OccupyInternet.ContextMenu.menu = chrome.contextMenus.create({title : 'Occupy Internet', contexts : ['all'], onclick : OccupyInternet.toggle}, function() {});
  },
  
  remove : function() {
    if (!OccupyInternet.ContextMenu.menu) return false;
    chrome.contextMenus.remove(OccupyInternet.ContextMenu.menu);
    delete OccupyInternet.ContextMenu.menu;
  },
  
  toggle : function(tab) {
    if (!tab) tab = {url : ''};

    if (tab['url'].match(/^(http)/)) {
      OccupyInternet.ContextMenu.create();
    } else {
      OccupyInternet.ContextMenu.remove();
    }
  },
  
  update : function(tab, msg) {
    if (!OccupyInternet.ContextMenu.menu) return false;
    chrome.contextMenus.update(OccupyInternet.ContextMenu.menu, {title : msg}, function() {});
  }

};