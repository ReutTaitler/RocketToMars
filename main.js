/*
* main.js
* 
* Responsibly for creating the rocket flight to mars page
*/
const logoSrc = "assets/rocket.png"; 
const h1Text = "Get your seat to Mars!";
const paragraphText = "Eart is doomed, but don't warry!\
                        The last rocket is leaving for mars soon,\
                        so hurry up and book your flight!";
const countdownText = "Countdown to lift off";

/**
* Return full page as renderFragment
*/
class FullPageComponent extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <img id="logo" src={logoSrc}/>
                <div id="mainText" className="flex">
                    <div>
                        <h1>{h1Text}</h1> 
                        <p>{paragraphText}</p>
                    </div>
                    <div id="heroDiv"></div>
                </div>
                <p id="countdownText" className="center">{countdownText}</p>
                <div id="clocksContainer" className="center flex">     
                {currentClocksStorage.map(data => <Clock id={data.id} ClockTime={data.time}/>)}
                </div> 
            </React.Fragment>
        );
    }
}

// On load
InitClocks();

// Add elements to root div
const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer); 
root.render(React.createElement(FullPageComponent));