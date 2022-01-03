import './App.css';
import Bar from './components/Bar';
import React, { Component } from 'react'
import BarModel from './models/barModel';
import Dropdown from './components/Dropdown'

function _randomColor(){
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  return `rgb(${red}, ${green}, ${blue})`;
}

function _randomValue() {
  return Math.floor(Math.random()*1000);
}

function _getArray(size) {
  let i = 0;
  let list = [];
  for(i = 0; i< size; i++){
    list.push(_randomValue());
  }
  return list
}

function getdim(max, min, value) {
  let height = Math.floor(value * 400/(max - min))
  return height+50
}

async function bubblesort(bars, onChange) {
  let n = bars.length;
  const timer = ms => new Promise(res => setTimeout(res, ms))
  let time = 1/n * 1000;

  for(var j = 0; j < n-1;j++){
  for(var i = 0; i < n-1-j; i++){
    if(bars[i].value > bars[i+1].value){
      let tmp = bars[i];
      bars[i] = bars[i+1];
      bars[i+1] = tmp;
    }
    
    onChange(bars);
    await timer(time)
  }
 }
}

function merge(a, b){
  let n = a.length
  let m = b.length
  let res = []
  let an = 0
  let bn = 0

  while (n > an && m > bn){
    if (a[an] > b[bn]){
      res[res.length] = b[bn]
      bn++;
    }
    else{
      res[res.length] = a[an]
      an++;
    }
  }
  res.push(...a.splice(an))
  res.push(...b.splice(bn))
  return res;
}

function mergesort(bars){
  let n = bars.length
  if (n === 0 || n === 1){
    return bars
  }
  return merge(mergesort(bars.slice(0, Math.floor(n/2))), mergesort(bars.slice(Math.floor(n/2))))
}

class App extends Component {

  constructor(props){
    super(props)
    let n = 20
    let list = _getArray(n)
    let width = Math.floor(5000/n)
    let max = Math.max(...list)
    let min = Math.min(...list)
    this.bars = list.map((value) => new BarModel(value, _randomColor(), width, getdim(max, min, value)))
    this.state = {bars:this.bars, method: 'bubble'}

    this.onChange = this.onChange.bind(this)
  }
  componentDidMount() {
    bubblesort(this.bars, this.onChange)
  }

  onChange(change){
this.setState({
  bars : change
});
  }
  render() {
    console.log(mergesort([6, 3]))
    let barComps = this.state.bars.map((bar)=> <Bar key={`${bar.value} ${Math.random()}`} bar={bar}></Bar>)
    let containerStyle = {
      display: 'flex',
      padding: '100px 10px 0px 10px',
      width: '100%',
    };
    return <div>
      <nav>Sorting Visualizer</nav>
      <div>
        <p>Sorting Method</p>
        <Dropdown></Dropdown>
      </div>
        <div className="App" style={containerStyle}>
        {barComps}
        </div>
    </div>
  }
}

export default App;
