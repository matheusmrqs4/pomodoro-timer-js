const pomodoro = {
    started: false,
    minutes: 0,
    seconds : 0,
    fillerHeight : 0,
    fillerIncrement : 0,
    interval : null,
    minutesDom : null,
    secondsDom : null,
    fillerDom : null,

     init : function(){
        const self = this
        this.minutesDom = document.getElementById('min')
        this.secondsDom = document.getElementById('sec')
        this.filler = document.getElementById('col')
        this.interval  = setInterval(function(){
            self.intervalCallback.apply(self)
        }, 1000)

       document.getElementById('start').onclick = function(){
            self.startTimer.apply(self)
            document.getElementById('start').disabled = true
        }

        document.getElementById('pause').onclick = function(){
            self.pauseTimer.apply(self)
            document.getElementById('start').disabled = false
            document.getElementById('short-break').disabled = false
            document.getElementById('long-break').disabled = false
        }

        document.getElementById('reset').onclick = function(){
            self.resetTimer.apply(self) 
            document.getElementById('start').disabled = false
        }

        document.getElementById('short-break').onclick = function(){
            self.startIntervalo.apply(self) 
            document.getElementById('start').disabled = false
            document.getElementById('short-break').disabled = true
        }

        document.getElementById('long-break').onclick = function(){
            self.startIntervaloLongo.apply(self) 
            document.getElementById('start').disabled = true
            document.getElementById('long-break').disabled = true
        }
    },

         resetVariables : function(mins, secs, started){
            this.minutes = mins
            this.seconds = secs
            this.started = started
            this.fillerIncrement = 200/(this.minutes*60)
            this.fillerHeight = 0
            
        },
    
         startTimer: function() {
            this.resetVariables(25, 0, true)
          },

         pauseTimer : function() {
            this.resetVariables(0, 0, false)
          },

          resetTimer : function(){
            this.resetVariables(0, 0, false)
            this.updateDom()
          },
          
         startIntervalo : function(){
            this.resetVariables(5, 0, true)
          },

         startIntervaloLongo : function(){
            this.resetVariables(15, 0, true)
          },
         
    
         toDoubleDigit : function(num){
            if(num < 10) {
              return "0" + parseInt(num, 10)
            }
            return num
          },

         updateDom : function(){
            this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes)
            this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds)
            this.fillerHeight = this.fillerHeight + this.fillerIncrement
          },

         intervalCallback : function(){
            if(!this.started) return false
            if(this.seconds == 0) {
              if(this.minutes == 0) {
                this.timerComplete(document.getElementById('audio').play())
                return 
              }

              this.seconds = 59
              this.minutes--
            } else {
              this.seconds--
            }
            this.updateDom()
          },

         timerComplete : function(){
            this.started = false
            this.fillerHeight = 0 
          },

      }

        window.onload = function(){
        pomodoro.init()
      }


      
