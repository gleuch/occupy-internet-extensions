try {$.noConflict();} catch(e) {} // Play nice!


if (typeof(OccupyInternetPage) == 'undefined') {
  var OccupyInternetPage = {
    count : 0,
    mode : 'quiet',
    dev_mode : false,
    fetched : false,
    gathered : false,
    app_url : 'http://api.occupyinter.net',
    post_url : 'http://api.occupyinter.net/count.json',
    get_url : 'http://api.occupyinter.net/site.json'
  };

  jQuery('.occupyinternet').remove();
}


jQuery.extend(true, OccupyInternetPage, {

  init : function() {
    if (OccupyInternetPage.fetched) {
      OccupyInternetPage.protest();
    } else {
      OccupyInternetPage.mic_check();
    }
  },

  // Ping the server, get a headcount
  mic_check : function() {
    alert('mic')
  },

  // Repeat it back (success)
  _mic_check : function(msg) {
    OccupyInternetPage.count = msg.visits_count;
    OccupyInternetPage.protest();
  },
  
  // Getting some feedback from the mic (error)
  _mic_problems : function(msg) {
    
  },

  // Let us protest!
  protest : function() {
    if (OccupyInternetPage.mode == 'quiet') return;

    if (!OccupyInternetPage.gathered) {
      jQuery('body').append(OccupyInternetPage.html.liberty_plaza);
      OccupyInternetPage.gathered = true;

      for (var i=0; i<OccupyInternetPage.count; i++) {
        OccupyInternetPage._add_protester();
      }
    }
  },
  
  _show_protest : function() {if (jQuery('#occupyinternet_plaza')) jQuery('#occupyinternet_plaza').show();},
  _hide_protest : function() {if (jQuery('#occupyinternet_plaza')) jQuery('#occupyinternet_plaza').hide();},

  _add_protester : function() {
    jQuery('#occupyinternet_plaza').append(OccupyInternetPage.html.protester);
  },
  
  _remove_protester : function() {
    
  },
  
  _arrest_protester : function() {},
  _pepperspray_protester : function() {},

  // Update the protesting number
  new_protesters : function(num) {
    if (!!OccupyInternetPage.gathered) {
      OccupyInternetPage.count = num;
      OccupyInternetPage.protest();

    } else {
      var diff = (num - OccupyInternetPage.count);
      OccupyInternetPage.count = num;

      for (var i=0; i<Math.abs(diff); i++) {
        if (diff > 0) {
          OccupyInternetPage._add_protester();
        } else if (diff < 0) {
          OccupyInternetPage._remove_protester();
        }
      }
    }
  },

  // Do something to simplify the screen display if it gets overcrowded
  crowd_control : function() {
    
  },

  // If we switch modes, update the crowd!
  switch_mode : function() {
    if (jQuery('#occupyinternet_plaza')) jQuery('#occupyinternet_plaza').remove();
    OccupyInternetPage.gathered = false;
    OccupyInternetPage.protest();
  },

  html : {
    protester : '<span class="occupyinternet occupyinternet_protester">X</span>',
    liberty_plaza : '<div id="occupyinternet_plaza" class="occupyinternet"></div>',
    police : '',
    nets : ''
  }
});