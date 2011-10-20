/*

  OccupyInter.net <http://occupyinter.net>
  Copyfree 2011. Made for public use.

  Developed by Greg Leuch <http://gleuch.com> and the Free Art & Technology Lab <http://fffff.at>.

  ---------------------------------------------------------------------------------------------------


*/


OccupyInternet.API = {
  
  avatars : function(opts) {
    var defaults = {success : function(msg) {eval('OccupyInternet.API._avatars('+ msg +');');}, error : function(a, b, c) {alert('e')}, data : {}},
        requires = {url : localStorage.avatars_url, type : 'GET', dataType : 'text'}; // should be json, widget part is nightmare to make true json

    if (!opts) opts = {};
    opts = jQuery.extend({}, defaults, opts, requires);

    jQuery.ajax(opts);
  },
  
  _avatars : function(msg) {
    OccupyInternet.avatars = msg;
  },
  
  update : function(opts) {
    var defaults = {success : function() {}, error : function() {}, data : {}},
        requires = {url : localStorage.post_url, type : 'POST', dataType : 'json'};

    if (!opts) opts = {};
    opts = jQuery.extend({}, defaults, opts, requires);

    jQuery.ajax(opts);
  },

  query : function(opts) {
    var defaults = {success : function() {}, error : function() {}, data : {}},
        requires = {url : localStorage.get_url, method : 'GET', dataType : 'json'};

    if (!opts) opts = {};
    jQuery.ajax(jQuery.extend({}, defaults, opts, requires));
  }
  
};