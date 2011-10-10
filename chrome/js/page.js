/*

  OccupyInter.net <http://occupyinter.net>
  Copyfree 2011. Made for public use.

  Developed by Greg Leuch <http://gleuch.com> and the Free Art & Technology Lab <http://fffff.at>.

  ---------------------------------------------------------------------------------------------------


*/


OccupyInternet.Page = {

  init : function() {
    
  },
  
  occupy : function(tab) {
    if (!OccupyInternet.Tabs.tabs[tab.id].checked) {
      OccupyInternet.Tabs.tabs[tab.id].checked = true;

      var opts = {
        success : function(msg) {OccupyInternet.Page._occupy_success(tab, msg);},
        error : function(msg) {OccupyInternet.Page._occupy_error(tab, msg);},
        data : {}
      };

      opts.data.url = tab['url'];
      opts.data.uuid = localStorage.uuid;

      OccupyInternet.API.update(opts);
    } else {
      OccupyInternet.Page.inject(tab);
    }
  },
  
  _occupy_success : function(tab, msg) {
    OccupyInternet.Tabs.tabs[tab.id].visits = msg.visits;
    OccupyInternet.Page.inject(tab);
  },
  _occupy_error : function(tab, msg) {
    console.error('OccupyInter.net Error: Could not fetch data ('+ OccupyInternet.domain(tab['url']) +')');
  },

  inject : function(tab) {
    if (OccupyInternet.Tabs.tabs[tab.id].injected) return false;
    OccupyInternet.Tabs.tabs[tab.id].injected = true;

    var count = OccupyInternet.Tabs.tabs[tab.id].visits,
        code = "OccupyInternetPage.count = "+ count +";OccupyInternetPage.fetched = true;OccupyInternetPage.init();";

    chrome.tabs.insertCSS(tab.id, {file:'css/page/occupy.css'}, function() {});
    chrome.tabs.executeScript(tab.id, {file:'js/jquery.1.6.1.min.js'}, function() {});
    chrome.tabs.executeScript(tab.id, {file:'js/page/occupy.js'}, function() {
      chrome.tabs.executeScript(tab.id, {code:code}, function() {});
    });
  }

};