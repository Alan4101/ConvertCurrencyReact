import React from "react";

export default function CurrencyItem(props) {
  const { ccy, base_ccy, buy, sale } = props.data;

  return (
    <tr className="color-table-text">
      <th>{ccy}</th>
      <td className="base-currency">{base_ccy}</td>
      <td>{Number(buy).toFixed(2)}</td>
      <td>{Number(sale).toFixed(2)}</td>
    </tr>
  );
}