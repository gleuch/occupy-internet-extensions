/*

  OccupyInter.net <http://occupyinter.net>
  Copyfree 2011. Made for public use.

  Developed by Greg Leuch <http://gleuch.com> and the Free Art & Technology Lab <http://fffff.at>.

  ---------------------------------------------------------------------------------------------------


*/


OccupyInternet.Protest = {

  init : function() {
    
  },
  
  occupy : function(tab) {
    if (!OccupyInternet.Tabs.tabs[tab.id].checked) {
      OccupyInternet.Tabs.tabs[tab.id].checked = true;

      var opts = {
        success : function(msg) {OccupyInternet.Protest._occupy_success(tab, msg);},
        error : function(msg) {OccupyInternet.Protest._occupy_error(tab, msg);},
        data : {}
      };

      opts.data.url = tab['url'];
      opts.data.uuid = localStorage.uuid;

      OccupyInternet.API.update(opts);
    } else {
      OccupyInternet.Protest.inject(tab);
    }
  },
  
  _occupy_success : function(tab, msg) {
    OccupyInternet.Tabs.tabs[tab.id].visits = msg.visits;
    OccupyInternet.ContextMenu.update(tab);
    OccupyInternet.Protest.inject(tab);
  },
  _occupy_error : function(tab, msg) {
    console.error('OccupyInter.net Error: Could not fetch data ('+ OccupyInternet.domain(tab['url']) +')');
  },

  inject : function(tab) {
    if (OccupyInternet.Tabs.tabs[tab.id].injected) return false;
    OccupyInternet.Tabs.tabs[tab.id].injected = true;

    var count = OccupyInternet.Tabs.tabs[tab.id].visits,
        code = "OccupyInternetPage.count = "+ count +";OccupyInternetPage.avatars = "+ jQuery.toJSON(OccupyInternet.avatars) +";OccupyInternetPage.fetched = true; OccupyInternetPage.mode = '"+ OccupyInternet.mode() +"';";

    // Additional customizations
    if (!!OccupyInternet.dev_mode) code += "OccupyInternetPage.dev_mode = true;";
    code += "OccupyInternetPage.init();";

    chrome.tabs.insertCSS(tab.id, {file:'css/protest/occupy.css'}, function() {});
    chrome.tabs.executeScript(tab.id, {file:'js/jquery.1.6.1.min.js'}, function() {});
    chrome.tabs.executeScript(tab.id, {file:'js/protest/occupy.js'}, function() {
      chrome.tabs.executeScript(tab.id, {code:code}, function() {});
    });
  },

  update_mode : function(tabid) {
    var code = "if (typeof(OccupyInternetPage) != 'undefined') {OccupyInternetPage.avatars = "+ jQuery.toJSON(OccupyInternet.avatars) +";OccupyInternetPage.mode = '"+ OccupyInternet.mode() +"'; OccupyInternetPage.switch_mode();}";
    chrome.tabs.executeScript(parseInt(tabid), {code:code}, function() {});
  },
  
  customize : function() {
    chrome.tabs.create({selected:true, url:localStorage.app_url});
  }

};