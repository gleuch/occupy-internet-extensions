try {$.noConflict();} catch(e) {} // Play nice!


if (typeof(OccupyInternetPage) == 'undefined') {
  var OccupyInternetPage = {
    avatars : [],
    count : 0,
    mode : 'quiet',
    dev_mode : false,
    fetched : false,
    gathered : false,
    app_url : 'http://api.occupyinter.net',
    post_url : 'http://api.occupyinter.net/count.json',
    get_url : 'http://api.occupyinter.net/site.json'
  };

  jQuery('.occupyinternet, #occupy-widget').remove();
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

      OccupyInternetPage._add_logo();
      var count = OccupyInternetPage.count;
      if (OccupyInternetPage.mode == 'loud') {
        jQuery('#occupyinternet_plaza').addClass('occupyinternet_is_loud');
        count = (OccupyInternetPage.avatars.length < 10 ? OccupyInternetPage.avatars.length : 10);
        OccupyInternetPage.avatars.sort(function(){ return 0.5 - Math.random() });
      }

      for (var i=0; i<count; i++) {
        OccupyInternetPage._add_protester(i);
      }
    }
  },
  
  _show_protest : function() {if (jQuery('#occupyinternet_plaza')) jQuery('#occupyinternet_plaza').show();},
  _hide_protest : function() {if (jQuery('#occupyinternet_plaza')) jQuery('#occupyinternet_plaza').hide();},

  _add_logo : function() {
    jQuery('#occupyinternet_plaza_area').append(OccupyInternetPage.html.logo);
    jQuery('#occupyinternet_logo').attr('title', 'OccupyInter.net - '+ OccupyInternetPage.phrase());
  },

  _add_protester : function(i) {
    if (OccupyInternetPage.mode == 'peaceful') {
      setTimeout(function() {
        jQuery('#occupyinternet_plaza_area').append(OccupyInternetPage.html.peaceful_protester.replace(/\?rnd/, '?'+Math.floor(Math.random()*1000)));
      }, Math.floor(Math.random()*1500));
    } else if (OccupyInternetPage.mode == 'loud') {
      var src = OccupyInternetPage.avatars[i].avatar, b = 10, l = left = (i*150)-50, z = (100+Math.floor(Math.random()*20));
      jQuery('#occupyinternet_plaza_area').append(OccupyInternetPage.html.loud_protester.replace(/(\#\{src\})/m, src).replace(/(\#\{b\})/m, b).replace(/(\#\{l\})/m, l).replace(/(\#\{z\})/m, z) );
    }
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

      if (OccupyInternetPage.mode == 'loud') return;

      jQuery('#occupyinternet_plaza').removeClass('occupyinternet_is_loud');
      jQuery('#occupyinternet_logo').attr('title', OccupyInternetPage.phrase());

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

  phrase : function() {return OccupyInternetPage.count +' '+ (OccupyInternetPage.count != 1 ? 'protesters' : 'protester');},

  html : {
    peaceful_protester : '<span class="occupyinternet occupyinternet_protester occupyinternet_protester_peaceful"><img class="occupyinternet" src="'+ ('chrome://occupyinternet/content/images/protester16.gif') +'?rnd" title="" alt="" /></span>',
    loud_protester : '<img class="occupyinternet occupyinternet_protester occupyinternet_protester_loud" style="bottom: #{b}px !important; left: #{l}px !important; z-index: #{z} !important;" src="#{src}" />',
    logo : '<a href="http://occupyinter.net" target="_blank" class="occupyinternet occupyinternet_logo"><img class="occupyinternet" id="occupyinternet_logo" src="'+ ('chrome://occupyinternet/content/images/net_protester48.gif') +'" title="OccupyInter.net" alt="" /></a>',
    liberty_plaza : '<div id="occupyinternet_plaza" class="occupyinternet"><div class="occupyinternet" id="occupyinternet_plaza_area"></div></div>',
    police : '',
    nets : ''
  }
});