import React from "react";
import CurrencyData from "./currency-data.js";
// import api from "fixer-io-node";

function Currency(props) {
  return (
    <div>
      <p>{props.date}</p>
      <p>{props.rates}</p>
    </div>
  );
}

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    // currencyData: Data,
    // currencyData: CurrencyData
    // isLoaded: false
    // };
  }

  // componentDidMount() {
  //   fetch(
  //     `http://data.fixer.io/api/latest?access_key=${process.env.REACT_APP_FIXER_CURRENCY_TOKEN}&symbols=USD,AUD,CAD,PLN,MXN`
  //   )
  //     .then(res => res.json())
  //     .then(data =>
  //       this.setState(state => {
  //         return { currencyData: data };
  //       })
  //     );
  // }

  // keys() {
  //   return Object.keys(CurrencyData);
  // }

  render() {
    // console.log(keys());
    // console.log(this.state.currencyData[this.keys[4]]);
    return (
      <div>
        {CurrencyData.map(data => (
          <Currency date={data.date} rates={data.rates.USD} />
        ))}
      </div>
    );
  }
}

export default CurrencyConverter;
