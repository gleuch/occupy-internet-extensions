var avatar_orderly = true;
var avatar_size = '200px';

function load_protest(data){

var oNewP = document.createElement("div");

oNewP.innerHTML = "<div id=\"occupy-widget\" class=\"occupy-widget\" style=\"display: none;\">\n\n  <div id=\"occupy-joinprotest\">\n    <form id=\"occupy-joinprotest-form\" method=\"POST\" action=\"http://occupyinternet2.heroku.com/join_protest\">\n      <!-- <a href=\"http://fffff.at/enlist-today\" id=\"occupy-joinprotest-header\" target=\"_blank\">Occupy Internet</span> -->\n      <a href=\"http://fffff.at/occupy-the-internet\" target=\"_blank\" class=\"bigavatar\" id=\"occupy-joinprotest-button\">We Are Occupying The Internet!</a>\n    </form>\n  </div>\n\n  <div id=\"occupy-avatars\"><span id=\"occupy-protestor_avatars\"></span></div>\n</div>\n";

document.body.appendChild(oNewP);

//document.write("")

  var avatar_output = '';
  // Hardcode the response data

  if(data == undefined) data = {};

  data.protestors = [

    {avatar: "http://occupyinternet.heroku.com/avatars/banana-evanroth-occupy.gif"},

    {avatar: "http://occupyinternet.heroku.com/avatars/jig-evanroth-occupy.gif"},

    {avatar: "http://occupyinternet.heroku.com/avatars/gdance-evanroth-occupy.gif"},

    // {avatar: "http://occupyinternet.heroku.com/avatars/theo-beyonce.gif"},

    {avatar: "http://occupyinternet.heroku.com/avatars/david_goliath-evanroth-stevelambert-occupy.gif"},

    {avatar: "http://occupyinternet.heroku.com/avatars/bugs_troll_mrqmarx.gif"},

    {avatar: "http://occupyinternet.heroku.com/avatars/hallo-surfer_dragan.gif"},

    {avatar: "http://occupyinternet.heroku.com/avatars/jesus-evanroth-occupy.gif"},

    // {avatar: "http://occupyinternet.heroku.com/avatars/Hombre-65_gyna.gif"},

    {avatar: "http://occupyinternet.heroku.com/avatars/moonwalk-evanroth-occupy.gif"},

    {avatar: "http://occupyinternet.heroku.com/avatars/jeanluc-evanroth-occupy.gif"},

    {avatar: "http://occupyinternet.heroku.com/avatars/occupy-net-evanroth-02.gif"},

    {avatar: "http://occupyinternet.heroku.com/avatars/headless-evanroth-occupy.gif"},

    {avatar: "http://occupyinternet.heroku.com/avatars/weare99percent_DAG.gif"},

    {avatar: "http://occupyinternet.heroku.com/avatars/occupy-net-evanroth-03.gif"},

    {avatar: "http://occupyinternet.heroku.com/avatars/unicorn-evanroth-occupy.gif"},

    {avatar: "http://occupyinternet.heroku.com/avatars/retake-public-domain_telegramsam.jpg"},

    {avatar: "http://occupyinternet.heroku.com/avatars/chunli-evanroth-occupy.gif"},

    {avatar: "http://occupyinternet.heroku.com/avatars/classwar-ahead_goulassoflosy.gif"},

    {avatar: "http://occupyinternet.heroku.com/avatars/pow-evanroth-occupy.gif"},

    {avatar: "http://occupyinternet.heroku.com/avatars/droid-evanroth-occupy.gif"},

    // {avatar: "http://occupyinternet.heroku.com/avatars/LCKY-capitalism_adamharms.gif"},

    {avatar: "http://occupyinternet.heroku.com/avatars/hulkster-evanroth-occupy.gif"},

    {avatar: "http://occupyinternet.heroku.com/avatars/dino-evanroth-occupy.gif"},

    // {avatar: "http://occupyinternet.heroku.com/avatars/unfucktheworld_seb.gif"},

    {avatar: "http://occupyinternet.heroku.com/avatars/cxzy-dear-maslow-2.gif"},

    {avatar: "http://occupyinternet.heroku.com/avatars/snoop-evanroth-occupy.gif"},

    {avatar: "http://occupyinternet.heroku.com/avatars/bellydance-evanroth-occupy.gif"},

    // {avatar: "http://occupyinternet.heroku.com/avatars/theo-doucheCat.gif"},

    {avatar: "http://occupyinternet.heroku.com/avatars/txt-minimi_makemoney.gif"},

    {avatar: "http://occupyinternet.heroku.com/avatars/frodo-evanroth-occupy.gif"},

    {avatar: "http://occupyinternet.heroku.com/avatars/bowlers-evanroth-occupy.gif"}

  ]



  // Randomize dem avatars

  data.protestors.sort(function(){ return 0.5 - Math.random() });



  // Current user's id; not using this yet

  data.uuid = undefined;





  // Change 'start' to 'join' if people here already

  // if(data.protestors.length > 0){

  //   console.log("changing protest button text...");

  //   document.getElementById('occupy-joinprotest-button').innerHTML = 'Join The Protest!';

  // }



  // Add a selection of our avatars

  // FIXME don't want to load too many imgs, but what's the right #?

  var max_protestors = 10;

  for(var i = 0; i < max_protestors; i++){

    var protestor = data.protestors[i];

    protestor.uuid = i + 1; // ...



    var bottom = 0,

        left = (i*150),

        zindex = (100+Math.floor(Math.random()*20));

    avatar_output += '<div id="avatar'+i+'" class="bigavatar" style="position: absolute; bottom: '+bottom+'px; left: '+left+'px; z-index: '+zindex+'">';

    var owner = data.uuid != undefined && protestor.uuid == data.uuid;



    if(owner){

      document.getElementById('occupy-joinprotest').style.display = 'none';

      document.getElementById('occupy-avatars').style.left = '0px';



      avatar_output += '<div id="occupy-you">';

      avatar_output += 'This is you!';

      avatar_output += '<a id="customize_button" href="http://occupyinternet2.heroku.com/customize" onclick="toggle_customize();">';

      avatar_output += 'Customize Your Avatar';

      avatar_output += '<img src="http://occupyinternet2.heroku.com/images/arrow-down1.jpg" height="32" />';

      avatar_output += '</div>';

    }



    avatar_output += '<img src="'+protestor.avatar+'" />';



    if(owner){

      avatar_output += '</a>';

    }



    // if(protestor.tagline != '' && protestor.tagline != undefined){

    //  avatar_output += '<span class="tagline">'+protestor.tagline+'</span>';

    // }



    avatar_output += '</div>';

  }



  // Add and start animating

  document.getElementById('occupy-protestor_avatars').innerHTML = avatar_output;



  inject_sound();

  move_avatars();

  show_protest();

};



function inject_sound(){

  var audio = document.createElement('audio');

  audio.setAttribute('src', 'http://occupyinternet2.heroku.com/crowd.mp3');

  audio.setAttribute('loop', 'true');

  audio.volume = .2;

  audio.play();



  var widget = document.getElementById('occupy-widget')

  widget.appendChild(audio);

}





function show_protest(){

  var widget = document.getElementById('occupy-widget');

  widget.style.display = "block";



  // var avatars = document.getElementById('occupy-avatars');

  // avatars.style.bottom = "-200px";

  // slide_protest_in(avatars);

}



function slide_protest_in(el){

  setTimeout(function(){

    if(parseInt(el.style.bottom) >= -20){

      console.log("done animating protest");

    }

    else {

      el.style.bottom = (parseInt(el.style.bottom) + 12)+'px';

      slide_protest_in(el);

    }

  }, 10);

}





function move_avatars(counter){

  setTimeout(function(){

    if(counter == undefined){

      counter = 0;

    }

    var els = document.getElementsByClassName('bigavatar');

    for(var j = 0; j < els.length; j++){

      var el = els[j];

      var distance = (counter % 10 < 5) == 0 ? -2 : 2;

      if(counter % 15 == 0){

        var left = (counter + j) % 2 == 0 ? 4 : -4;

      }

      el.style.bottom = (parseInt(el.style.bottom) + distance) + 'px';

      el.style.left = (parseInt(el.style.left) + left) + 'px';

    }



    counter += 1;

    move_avatars(counter);

  }, 100);

}



function toggle_customize(){

  return true; // disabled



  var el = document.getElementById('occupy-customize');

  if(el.style.display == 'none'){

    el.style.display = 'block';

  }

  else {

    el.style.display = 'none';

  }

}



function join_protest(){

  document.getElementById('occupy-joinprotest-form').submit();

}



// window.onLoad = function(){

//   console.log("loading protest...");

//   load_protest();

// };



if(window.attachEvent) {

  window.attachEvent('onload', load_protest);

} else {

  if(window.onload) {

    var curronload = window.onload;

    var newonload = function() {

      load_protest;

    };

    window.onload = newonload;

  } else {

    window.onload = load_protest;

  }

}

