import React from "react";
import CurrencyData from "./currency-data.js";
// import api from "fixer-io-node";

type CurrencyProps = {
  date: string;
  rates: number;
};

const Currency = (props: CurrencyProps) => {
  return (
    <div>
      <p>{props.date}</p>
      <p>{props.rates}</p>
    </div>
  );
};

const CurrencyConverter: React.FC = () => {
  // currencyData: Data;
  // currencyData: CurrencyData;
  // isLoaded: false;

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

  return (
    <div>
      {CurrencyData.map((data) => (
        <Currency date={data.date} rates={data.rates.USD} />
      ))}
    </div>
  );
};

export default CurrencyConverter;
