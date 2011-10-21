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
    var tabid = OccupyInternet.Tabs.id(tab);

    if (!OccupyInternet.Tabs.tabs[tabid].checked) {
      OccupyInternet.Tabs.tabs[tabid].checked = true;
    
      var opts = {
        success : function(msg) {OccupyInternet.Protest._occupy_success(tab, msg);},
        error : function(msg) {OccupyInternet.Protest._occupy_error(tab, msg);},
        data : {}
      };
    
      opts.data.url = tab.currentURI.spec
      opts.data.uuid = OccupyInternet.storage.getValue('uuid', '');
    
      OccupyInternet.API.update(opts);
    } else {
      OccupyInternet.Protest.inject(tab);
    }
  },
  
  _occupy_success : function(tab, msg) {
    var tabid = OccupyInternet.Tabs.id(tab);

    OccupyInternet.Tabs.tabs[tabid].visits = msg.visits;
    OccupyInternet.ContextMenu.update(tab);
    OccupyInternet.Protest.inject(tab);
  },
  _occupy_error : function(tab, msg) {
    console.error('OccupyInter.net Error: Could not fetch data ('+ OccupyInternet.domain(tab.currentURI.spec) +')');
  },

  inject : function(tab) {
    var tabid = OccupyInternet.Tabs.id(tab);

    if (OccupyInternet.Tabs.tabs[tabid].injected) return false;
    OccupyInternet.Tabs.tabs[tabid].injected = true;

    var count = OccupyInternet.Tabs.tabs[tabid].visits,
        code = "OccupyInternetPage.count = "+ count +";OccupyInternetPage.avatars = "+ jQuery.toJSON(OccupyInternet.avatars) +";OccupyInternetPage.fetched = true; OccupyInternetPage.mode = '"+ OccupyInternet.mode() +"';";

    // Additional customizations
    if (!!OccupyInternet.dev_mode) code += "OccupyInternetPage.dev_mode = true;";
    code += "OccupyInternetPage.init();";

    OccupyInternet.Tabs.insertCSS(tab, 'css/protest/occupy.css', function() {});
    OccupyInternet.Tabs.insertJS(tab, 'js/jquery.1.6.1.min.js', function() {});
    OccupyInternet.Tabs.insertJS(tab, 'js/protest/occupy.js', function() {
      setTimeout(function() {
        OccupyInternet.Tabs.executeScript(tab, code, function() {});
      }, 500);
    });
  },

  update_mode : function(tab) {
    var code = "if (typeof(OccupyInternetPage) != 'undefined') {OccupyInternetPage.avatars = "+ jQuery.toJSON(OccupyInternet.avatars) +";OccupyInternetPage.mode = '"+ OccupyInternet.mode() +"'; OccupyInternetPage.switch_mode();}";
    OccupyInternet.Tabs(tab, {code:code}, function() {});
  },
  
  customize : function() {
    // chrome.tabs.create({selected:true, url:OccupyInternet.storage.getValue('app_url', '')});
  }

};