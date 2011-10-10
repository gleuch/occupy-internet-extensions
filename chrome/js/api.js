/*

  OccupyInter.net <http://occupyinter.net>
  Copyfree 2011. Made for public use.

  Developed by Greg Leuch <http://gleuch.com> and the Free Art & Technology Lab <http://fffff.at>.

  ---------------------------------------------------------------------------------------------------


*/

OccupyInternet.API = {
  
  update : function(opts) {
    var defaults = {success : function() {}, error : function() {}, data : {}},
        requires = {url : localStorage.post_url, type : 'PUT', dataType : 'json'};

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