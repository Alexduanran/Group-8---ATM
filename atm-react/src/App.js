import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import css from './App.module.css';
import {InputForm} from "./components/InputForm";
import {LineChart} from "./components/LineChart";
import { NNetwork } from './components/NNetwork';

function App() {
  const [originalArr, setOriginalArr] = useState([]);
  const [predictedArr, setPredictedArr] = useState([]);
  const [input_layer, setInputLayer] = useState(20);
  const [numHiddenLayer, setNumHiddenLayer] = useState(1);
  const [hidden_layer_one, setHiddenLayerOne] = useState(5);
  const [hidden_layer_two, setHiddenLayerTwo] = useState(0);
  const [hidden_layer_three, setHiddenLayerThree] = useState(0);

  useEffect(() => {
    fetch('/datas').then(response => 
      response.json().then(data => {
        setOriginalArr(data.original_arr);
        setPredictedArr(data.predicted_arr);
      })
    );
  }, [])
  
  return (
    <div className={css.container}>
      <div className={css.row}>
        <div className={css.colFour}>
          <div className={css.title}>
            <h1>Group 8 - ATM</h1>
          </div>
          <InputForm className={css.inputform}
            onEditInputO={origiArr =>
              setOriginalArr(origiArr)}
            onEditInputP={predicArr =>
              setPredictedArr(predicArr)}
            onEditInputN={(input_layer, numHiddenLayer, hidden_layer_one, hidden_layer_two, hidden_layer_three) => {
              setInputLayer(input_layer)
              setNumHiddenLayer(numHiddenLayer)
              setHiddenLayerOne(hidden_layer_one)
              setHiddenLayerTwo(hidden_layer_two)
              setHiddenLayerThree(hidden_layer_three)
            }}
          />
        </div>
        <div className={css.colEight}>
          <Router basename={process.env.PUBLIC_URL}>
            <div className={css.navi}>
              <nav>
                <ul>
                  <li>
                    <Link to="/stocks">
                      Stocks Prediction
                    </Link>
                  </li>
                  <li>
                    <Link to="/neural-network">
                      Neural Network
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <Switch>
              <Route path="/stocks">
                <LineChart originalArr={originalArr} predictedArr={predictedArr}/>
              </Route>
              <Route path="/neural-network">
                <NNetwork numInputNodes={Number(input_layer)}
                          numLayer={Number(numHiddenLayer)} 
                          nodesLayer1={Number(hidden_layer_one)}
                          nodesLayer2={Number(hidden_layer_two)}
                          nodesLayer3={Number(hidden_layer_three)} />
              </Route>
              <Route path="/">
                <LineChart originalArr={originalArr} predictedArr={predictedArr}/>
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
      <footer>Copyright © 2020 Group 8 - ATM</footer>
    </div>  
  );
}

export default App;
