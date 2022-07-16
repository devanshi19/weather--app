import React from 'react';
import './App.css';
import Weather from './components/weather.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import Form from './components/form.component';



//Api key 
const Api_key='3d86be912baec80645e9d4660ba15be6';

class App extends React.Component{
  constructor(){
    super();
    this.state={
      city:undefined,
      country:undefined,
      temp:undefined,
      min_temp:undefined,
      max_temp:undefined,
      desc:'' ,
      error:false
    };
    this.weatheorIcon={
      Thunderstorm:"wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain:"wi-rain",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Cloud:"wi-cloud"
    };
  }

//Function to convert temp in celcius
tocelcius(temp){
   let cel=Math.floor(temp-273.15);
   return cel;
}


//Function to represent different  weather icons
get_wetherIcon(icons,rangeid){
  switch(true){
    case rangeid>=200 && rangeid<=232:
      this.setState({
        icon:this.weatheorIcon.Thunderstorm,
      })
      break;
    case rangeid>=300 && rangeid<=321:
      this.setState({
        icon:this.weatheorIcon.Drizzle
      })
      break;
    case rangeid>=500 && rangeid<=531:
      this.setState({
        icon:this.weatheorIcon.Rain
      })
      break;
    case rangeid>=600 && rangeid<=622:
      this.setState({
        icon:this.weatheorIcon.Snow
      })
      break; 
    case rangeid>=701 && rangeid<=781:
      this.setState({
        icon:this.weatheorIcon.Atmosphere
      })
      break;
    case rangeid>=801 && rangeid<=804:
      this.setState({
        icon:this.weatheorIcon.Cloud
      })
      break;
    case rangeid==800:
      this.setState({
        icon:this.weatheorIcon.Clear
      })
      break;
    default:
      this.setState({
        icon:this.weatheorIcon.Clear
      })
  }

}

//function for valid country
// validcountry()
// {
//     return(
//         <div className="alert alert-danger mx-5" role="alert">
//             Please Enter Valid Country!
//         </div>
//     ); 
//  }


//function to fetch Weather data through API call and represent in json form
getWeather=async(e)=>{
    e.preventDefault();
    const city=e.target.elements.city.value;
    const country=e.target.elements.country.value;

    if(city && country)
    {
      const Api_call=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_key}`)
      const response=await Api_call.json();
      //console.log(response);
      //console.log(response.cod)
      if(response.cod=="404")
      {
       this.setState({error:true})
      }
      else{
      this.setState({
      city:`${response.name},${response.sys.country}`,
      temp:this.tocelcius(response.main.temp),
      min_temp:this.tocelcius(response.main.temp_min),
      max_temp:this.tocelcius(response.main.temp_max),
      desc:response.weather[0].description,
     });
     this.get_wetherIcon(this.weatheorIcon,response.weather[0].id)
    }
  }
    else
    {
      this.setState(
        {
          error:true
        }
      )
    }

    
  };
  render(){
    return(
    <div className="App">
      <main>
      <Form loadweather={this.getWeather} error={this.state.error}/>
      <Weather city={this.state.city} 
        country={this.state.country} 
        temp={this.state.temp} 
        mintemp={this.state.min_temp} 
        maxtemp={this.state.max_temp}
        description={this.state.desc}
        wIcon={this.state.icon}
      />
      </main>
    </div>
    );
  }
}


export default App;
