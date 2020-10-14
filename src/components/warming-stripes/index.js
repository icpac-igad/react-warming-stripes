import React from "react";
import { Tooltip, ResponsiveContainer } from "recharts";
import isEmpty from "lodash/isEmpty";

import Stripes from "./Stripes";

import "./styles.css";

const StripeToolTip = ({ active, payload }) => {
  const payloadData = payload && payload.length > 0 && payload[0];
  if (active) {
    return (
      !isEmpty(payloadData) && (
        <div className="stripes-tooltip">
          <p className="label">
            {`${payloadData.name} (${payloadData.value}`})
          </p>
        </div>
      )
    );
  }
  return null;
};

export default function StripesChart({
  data,
  valueKey,
  nameKey,
  height,
  unit,
}) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <Stripes
        height={height}
        valueKey={valueKey}
        nameKey={nameKey}
        data={data}
        unit={unit}
      >
        <Tooltip content={<StripeToolTip />} />
      </Stripes>
    </ResponsiveContainer>
  );
}
