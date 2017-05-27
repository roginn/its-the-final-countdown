// Create Countdown
var Countdown = {

  // Backbone-like structure
  $el: $('.countdown'),

  // Params
  countdown_interval: null,
  total_seconds     : 0,

  // Initialize the countdown
  init: function(initValues) {

    // DOM
		this.$ = {
    	hours  : this.$el.find('.bloc-time.hours .figure'),
    	minutes: this.$el.find('.bloc-time.min .figure'),
    	seconds: this.$el.find('.bloc-time.sec .figure')
   	};

    // Init countdown values
    this.values = initValues;

    // Initialize total seconds
    this.total_seconds = this.values.hours * 60 * 60 + (this.values.minutes * 60) + this.values.seconds;

    // Animate countdown to the end
    this.count();
  },

  count: function() {

    var that    = this,
        $hour_1 = this.$.hours.eq(0),
        $hour_2 = this.$.hours.eq(1),
        $min_1  = this.$.minutes.eq(0),
        $min_2  = this.$.minutes.eq(1),
        $sec_1  = this.$.seconds.eq(0),
        $sec_2  = this.$.seconds.eq(1);

        this.countdown_interval = setInterval(function() {

        if(that.total_seconds > 0) {

            --that.values.seconds;

            if(that.values.minutes >= 0 && that.values.seconds < 0) {

                that.values.seconds = 59;
                --that.values.minutes;
            }

            if(that.values.hours >= 0 && that.values.minutes < 0) {

                that.values.minutes = 59;
                --that.values.hours;
            }

            // Update DOM values
            // Hours
            that.checkHour(that.values.hours, $hour_1, $hour_2);

            // Minutes
            that.checkHour(that.values.minutes, $min_1, $min_2);

            // Seconds
            that.checkHour(that.values.seconds, $sec_1, $sec_2);

            --that.total_seconds;
        }
        else {
            clearInterval(that.countdown_interval);
        }
    }, 1000);
  },

  animateFigure: function($el, value) {

     var that         = this,
		     $top         = $el.find('.top'),
         $bottom      = $el.find('.bottom'),
         $back_top    = $el.find('.top-back'),
         $back_bottom = $el.find('.bottom-back');

    // Before we begin, change the back value
    $back_top.find('span').html(value);

    // Also change the back bottom value
    $back_bottom.find('span').html(value);

    // Then animate
    TweenMax.to($top, 0.8, {
        rotationX           : '-180deg',
        transformPerspective: 300,
	      ease                : Quart.easeOut,
        onComplete          : function() {

            $top.html(value);

            $bottom.html(value);

            TweenMax.set($top, { rotationX: 0 });
        }
    });

    TweenMax.to($back_top, 0.8, {
        rotationX           : 0,
        transformPerspective: 300,
	      ease                : Quart.easeOut,
        clearProps          : 'all'
    });
  },

  checkHour: function(value, $el_1, $el_2) {

    var val_1       = value.toString().charAt(0),
        val_2       = value.toString().charAt(1),
        fig_1_value = $el_1.find('.top').html(),
        fig_2_value = $el_2.find('.top').html();

    if(value >= 10) {

        // Animate only if the figure has changed
        if(fig_1_value !== val_1) this.animateFigure($el_1, val_1);
        if(fig_2_value !== val_2) this.animateFigure($el_2, val_2);
    }
    else {

        // If we are under 10, replace first figure with 0
        if(fig_1_value !== '0') this.animateFigure($el_1, 0);
        if(fig_2_value !== val_1) this.animateFigure($el_2, val_1);
    }
  }
};

function calcInitValues(dateEnd, dateNow) {
  var diff, leftSec, hrs, min;

  diff = (dateEnd - dateNow)/1000;
  leftSec = Math.abs(Math.floor(diff));

  hrs = Math.floor(leftSec/(60*60));
  leftSec = leftSec - hrs * 60*60;

  min = Math.floor(leftSec/(60));
  leftSec = leftSec - min * 60;

  return { hours: hrs, minutes: min, seconds: leftSec };
}

function itsTime() {
  dateNow = new Date();
  console.log("Is it time? At " + dateNow);

  if (dateEnd - dateNow < (24*60*60*1000) + 1000) {
    Countdown.init(calcInitValues(dateEnd, dateNow));
  } else {
    setTimeout(itsTime, 1000);
  }
}


// CHANGE HERE
var eventStarted  = true;
var dateBegin = new Date(2017, 4, 27, 11,42,00); // WTF, o 4 é o mes, e quer dizer Maio .-.

var dateEnd   = new Date(dateBegin.getTime() + 24*60*60*1000 + 15*1000);


if(eventStarted) {
  itsTime();  
} else {
  setTimeout(function(){ location.reload(true) }, 10 * 1000);
}

setInterval(function(){ location.reload(true) }, 60 * 1000);
