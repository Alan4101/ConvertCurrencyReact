import React from "react"

export default function CurrencyItem(props) {
  const { ccy, base_ccy, buy, sale } = props.data

  return (
    <tr>
      <th>{ccy}</th>
      <th className="base-currency">{base_ccy}</th>
      <th>{Number(buy).toFixed(2)}</th>
      <th>{Number(sale).toFixed(2)}</th>
    </tr>
  )
}
