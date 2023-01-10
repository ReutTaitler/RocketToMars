/*
* Clock.js
*
* Does the logic for a rocket clock. This class can contain multiple clocks,
* ticking them simultaneously. 
*/


// Array of clocks - you can add more
const clocks = [
    // Clock for 1 minutes (in seconds)
    {
        id: 1,
        time: 60
    }, 
    // Clock for 2 minutes
    {
        id: 2,
        time: 120
    }, 
    // Clock for 5 minutes
    {
        id: 3,
        time: 300
    } 
];


// Variables for local Storage
var currentClocksStorage; 
var currentRocketsMissedStorage = 0;



/**
 * Clock component
 */
class Clock extends React.Component {
    
    /**
     * Initialize a clock instance, 
     * set the property timeLeft and clockOriginalTime from ClockTime parameter
     */
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: this.props.ClockTime,
            clockOriginalTime : clocks[this.props.id - 1].time
        };
    }

    /**
     * Returns the number of minutes left in the countdown
     */
    getMinutes() {
        return Math.floor(this.state.timeLeft / 60);
    }

    /**
     * Returns the number of seconds left in the countdown
     */
    getSeconds() {
        var seconds = this.state.timeLeft % 60;
        
        // Extends the number to two digits
        if (seconds < 10) 
            return "0" + seconds;
        
        return seconds;
    }

    /**
     * Update timeLeft property every second
     */
    tick() {       
        this.setState(state => ({
            timeLeft: state.timeLeft - 1
        }));
    }
    
    /**
     * Interval of the clock responsible for doing the ticks and updating the local storage
     */
    countdownInterval(){
        this.interval = setInterval(() => {
            
            // Check if the timer is over
            if (this.state.timeLeft == 0) {
                
                // Clear Interval
                clearInterval(this.interval);
                
                // Update missed rockets storage
                currentRocketsMissedStorage ++;
                localStorage.setItem("currentRocketsMissedStorage", currentRocketsMissedStorage);
                
                // Show the correct alert to user
                RocketMissedMessage();
            } else {
                
                this.tick();
                
                // Update clock json in local storage
                currentClocksStorage[this.props.id-1].time = this.state.timeLeft -1;
                localStorage.setItem("clocksStorage", JSON.stringify(currentClocksStorage));
            }
        }, 1000); // Update timer every second
    }

    
    /**
     * Called after a component is mounted (inserted into the DOM). - once in a lifecycle
     * set the Interval for the clock
     */
    componentDidMount() {  
        // Set Interval
        this.countdownInterval();
    }
    
    /**
     * Reset time to the start ClockTime
     */
    resetClock() {

        // Check if the clock over
         if(this.state.timeLeft == 0){
             // Set the interval again
            this.countdownInterval();
             
             // Update missed rockets storage - if it is 0 we don't need to update
             if(currentRocketsMissedStorage !=0){
                currentRocketsMissedStorage --;
                localStorage.setItem("currentRocketsMissedStorage", currentRocketsMissedStorage);
             }
           }

        
            // Update timeLeft property
            this.setState(state => ({
                // Get the time from the original clock
                timeLeft: this.state.clockOriginalTime
            }));
         
        
    }

    /**
     * Create clock container div - timer + button
     */
    render() {
        
        return React.createElement('div', {className: 'clock'} ,
                                  React.createElement('div', {className: 'clockTimer'} ,
                                                     React.createElement('span', {className: 'digits'} , [this.getMinutes()] ),
                                                     ':',
                                                      React.createElement('span', {className: 'digits'} , [this.getSeconds()] )
                                                     ),
                                  React.createElement('button', {onClick:()=>this.resetClock()} , 'Reset timer')
                                  );
    }
}


/**
* Customize the alert message by rocked missed status 
*/
function RocketMissedMessage() {
 
    // If all the rockets were missed
    if(currentRocketsMissedStorage == clocks.length){
       alert(`You missed the last rocket to mars!`);
    }
    else { 
        alert(`You missed ${currentRocketsMissedStorage} out of ${clocks.length} rockets to mars!`);
    }        
}

/**
* Init clocks
*
* Define default values for the clocks on first page load.
* On reload, use the clocks from local storage.
*/
function InitClocks(){
            
    // Get the current clocks time from local storage
    var clocksStorage = localStorage.getItem("clocksStorage");
    
    // If storage exsist - page is after reload
    if(clocksStorage){
        currentClocksStorage = JSON.parse(clocksStorage);
    }
    // The first time the page is loaded
    else{ 
        // Set the default values. 
        currentClocksStorage = clocks;
        localStorage.setItem("currentRocketsMissedStorage", 0);
    }
}