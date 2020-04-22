import React, { Component } from 'react';
import './App.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
export default class App extends Component {

  
  data = [{temperature:0, umidity:0, gas:0}];
  state = {  temperature:0,gas:0, umidity:0,data:[{temperature:0, umidity:0, gas:0}] }

  getGas = async () => {


    return fetch("https://iabackend.herokuapp.com/gas").then(res => {
      res.json().then(data => {
          this.setState({gas:data.temperature })  
      })
    })
  }
  getUmidity = async () => {

    return fetch("https://iabackend.herokuapp.com/umidity").then(res => {
      res.json().then(data => {
          this.setState({umidity:data.randomNumber })  
      })
    })
  }
  getTemperature = () => {


    return fetch("https://iabackend.herokuapp.com/temp").then(res => {
      res.json().then(data => {
          this.setState({temperature:data.randomNumber })  
      })
    })
  }
  getData = () => {
    this.getGas().then(async ()  => {
      await this.getUmidity().then( async () => {
        await this.getTemperature();
      })
    }).then(async () => {

      const {temperature, umidity, gas} = this.state;
      this.data.push({temperature, umidity, gas} )
      this.setState({data:""});
      await this.setState({data:this.data});
      
      
    });
    

  }

  componentDidMount = () => {

    setInterval(this.getData, 2000)


  }

  renderChart = () => {
    const { data } = this.state
    
    return (
    <div style={{display:'flex',
                 alignItems:'center',
                 flexDirection:'column',
                 justifyContent:'center',
                 flex:0,
                 background:'linear-gradient(180deg, rgba(76,67,230,1) 0%, rgba(60,60,238,1) 11%, rgba(0,212,255,1) 100%)',
                 borderRadius:24,
                 marginLeft:75,
                 marginRight:75,
                 marginTop:50,
                 boxShadow:'2px 2px 2px 2px gray'
                 }}>
        <p style={{fontSize:32,marginTop:40, marginBottom:12, color:'white', fontWeight:'bold'}}>Dashboard</p>
        <LineChart  style={{backgroundColor:'white', margin:30,paddingTop:30,paddingRight:30, borderRadius:12,  boxShadow:'1px 2px 8px 1px #888888aa'}} ref ={ comp => { this.lineChartRef = comp}}width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
          <Line type="monotone" dataKey="gas" stroke="#8884d0" />
          <Line type="monotone" dataKey="umidity" stroke="#8884f8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis  />
          <YAxis  />
          <Tooltip />
        </LineChart>
    </div>

    );
  }


  render = () => {
    return this.renderChart()
  
  }

}

