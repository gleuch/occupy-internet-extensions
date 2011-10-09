/*

  OccupyInter.net <http://occupyinter.net>
  Copyfree 2011. Made for public use.

  Developed by Greg Leuch <http://gleuch.com> and the Free Art & Technology Lab <http://fffff.at>.

  ---------------------------------------------------------------------------------------------------


*/

OccupyInternet.Windows = {
  
  init : function() {
    OccupyInternet.Windows.observe();
  },
  
  observe : function() {
    chrome.windows.onFocusChanged.addListener(OccupyInternet.Windows.onSelected);
  },
  
  onSelected : function(winid) {
    if (winid == -1) return false; // unfocused out of app
    chrome.tabs.getSelected(winid, OccupyInternet.Tabs.onSelectedTab);
  }
  
};