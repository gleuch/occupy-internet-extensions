/*

  OccupyInter.net <http://occupyinter.net>
  Copyfree 2011. Made for public use.

  Developed by Greg Leuch <http://gleuch.com> and the Free Art & Technology Lab <http://fffff.at>.

  ---------------------------------------------------------------------------------------------------


*/

OccupyInternet.Tabs = {
  tabs : {},
  
  init : function() {
    OccupyInternet.Tabs.observe();
    chrome.tabs.getSelected(null, OccupyInternet.Tabs.onSelectedTab);
  },
  
  observe : function() {
    chrome.tabs.onUpdated.addListener(OccupyInternet.Tabs.onUpdate);
    chrome.tabs.onRemoved.addListener(OccupyInternet.Tabs.onRemove);
    chrome.tabs.onSelectionChanged.addListener(OccupyInternet.Tabs.onSelected);
  },
  
  occupy : function(tab, selected) {
    if (!tab) return false;
    if (!tab['url']) tab['url'] = '';

    var url = OccupyInternet.url(tab['url']);

    if (!OccupyInternet.Tabs.tabs[tab.id] || OccupyInternet.Tabs.tabs[tab.id].url != url) {
      OccupyInternet.Tabs.tabs[tab.id] = {url : url, checked : false, injected : false, visits : 0};

    } else if (OccupyInternet.Tabs.tabs[tab.id].url == url && !selected) {
      OccupyInternet.Tabs.tabs[tab.id].injected = false;
    }
    
    if (tab['url'].match(/^(http)/)) OccupyInternet.Protest.occupy(tab);
  },
  
  onRemove : function(tabid, removeinfo) {
    delete OccupyInternet.Tabs.tabs[tabid];
  },
  
  onUpdate : function(tabid, objectinfo, tab) {
    chrome.tabs.get(tabid, function(tab) {
      if (objectinfo['status'] == 'loading') OccupyInternet.Tabs.occupy(tab);
      OccupyInternet.ContextMenu.toggle(tab);
    });
  },
  
  onSelected : function(tabid) {
    chrome.tabs.get(tabid, OccupyInternet.Tabs.onSelectedTab);
  },
  
  onSelectedTab : function(tab) {
    OccupyInternet.Tabs.occupy(tab, true);
    OccupyInternet.ContextMenu.toggle(tab);
  }

};