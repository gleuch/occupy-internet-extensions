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
    OccupyInternet.Tabs.onSelectedTab(gBrowser.selectedTab);
  },
  
  id : function(tab) {
    if (typeof(tab) != 'undefined') {
      if (typeof(tab.contentDocument.tab_id) == 'undefined') {
        var id = (new Date()).getTime();
        tab.contentDocument.tab_id = id;
      }
      
      return tab.contentDocument.tab_id;
    } else {
      return null;
    }
  },
  
  get : function(tabid) {
    if (!tabid) return null;

    var num = gBrowser.browsers.length, i, tab, id;
    for (i=0; i<num; i++) {
      tab = gBrowser.getBrowserAtIndex(i);
      try {if (tabid == tab.contentDocument.tab_id) return tab;} catch(e) {}
    }
    
    return null;
  },
  
  observe : function() {
    gBrowser.tabContainer.addEventListener("TabAttrModified", OccupyInternet.Tabs.onUpdate, false);
    gBrowser.tabContainer.addEventListener("TabSelect", OccupyInternet.Tabs.onSelected, false);
    gBrowser.tabContainer.addEventListener("TabClose", OccupyInternet.Tabs.onRemove, false);
  },
  
  occupy : function(tab, selected) {
    if (!tab || !tab.currentURI) return false;

    var url = OccupyInternet.url(tab.currentURI.spec),
        tabid = OccupyInternet.Tabs.id(tab);

    if (!OccupyInternet.Tabs.tabs[tabid] || OccupyInternet.Tabs.tabs[tabid].url != url) {
      OccupyInternet.Tabs.tabs[tabid] = {url : url, checked : false, injected : false, visits : 0};

    } else if (OccupyInternet.Tabs.tabs[tabid].url == url && !selected) {
      OccupyInternet.Tabs.tabs[tabid].injected = false;

    }

    if (tab.currentURI.spec.match(/^(http)/)) OccupyInternet.Protest.occupy(tab);
  },
  
  onRemove : function(e) {
    var tab = gBrowser.getBrowserForTab(e.target);
    if (typeof(tab) != 'undefined') {
      var tabid = OccupyInternet.Tabs.id(tab);
      if (tabid) delete OccupyInternet.Tabs.tabs[tabid];
    }
  },
  
  onUpdate : function(e) {
    var tab = gBrowser.getBrowserForTab(e.target);
    if (typeof(tab) != 'undefined') {
      OccupyInternet.ContextMenu.toggle(tab);
      OccupyInternet.Tabs.occupy(tab);
    }
  },
  
  onSelected : function(e) {
    var tab = gBrowser.getBrowserForTab(e.target);
    if (typeof(tab) != 'undefined') {
      OccupyInternet.Tabs.onSelectedTab(tab);
    }
  },
  
  onSelectedTab : function(tab) {
    OccupyInternet.ContextMenu.toggle(tab);
    OccupyInternet.Tabs.occupy(tab, true);
  },

  insertJS : function(tab, fname, fn) {
    var doc = tab.contentDocument, d = Components.stack.filename.replace(/.* -> |[^\/]+$/g, "").replace(/(\/content\/).*$/, '$1'), t = doc.createElement('script');
    t.type = 'text/javascript'; t.src = d+fname;
    doc.head.appendChild(t);
    if (typeof(fn) == 'function') fn();
  },

  insertCSS : function(tab, fname, fn) {
    var doc = tab.contentDocument, d = Components.stack.filename.replace(/.* -> |[^\/]+$/g, "").replace(/(\/content\/).*$/, '$1'), t = doc.createElement('link');
    t.type = 'text/css'; t.rel = 'stylesheet'; t.href = d+fname;
    doc.head.appendChild(t);
    if (typeof(fn) == 'function') fn();
  },

  executeScript : function(tab, code, fn) {
    if (!tab) return false;
    var doc = tab.contentDocument, t = doc.createElement('script');
    t.type = 'text/javascript'; t.innerHTML = code;
    doc.head.appendChild(t);
    if (typeof(fn) == 'function') fn();
  }


};