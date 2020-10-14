import React from "react";
import StripesChart from "./components/warming-stripes";

import "./styles.css";

const data = [
  { year: 1995, tavg: 0.58 },
  { year: 1996, tavg: 0.5 },
  { year: 1997, tavg: 0.55 },
  { year: 1998, tavg: 0.85 },
  { year: 1999, tavg: 0.61 },
  { year: 2000, tavg: 0.59 },
  { year: 2001, tavg: 0.69 },
  { year: 2002, tavg: 0.81 },
  { year: 2003, tavg: 0.79 },
  { year: 2004, tavg: 0.7 },
  { year: 2005, tavg: 0.89 },
  { year: 2006, tavg: 0.78 },
  { year: 2007, tavg: 0.87 },
  { year: 2008, tavg: 0.66 },
  { year: 2009, tavg: 0.8 },
  { year: 2010, tavg: 0.93 },
  { year: 2011, tavg: 0.79 },
  { year: 2012, tavg: 0.77 },
  { year: 2013, tavg: 0.82 },
  { year: 2014, tavg: 0.88 },
  { year: 2015, tavg: 0.98 },
  { year: 2016, tavg: 1.25 },
  { year: 2017, tavg: 1.14 },
  { year: 2018, tavg: 1.06 },
];

export default function App() {
  return (
    <div style={{ width: 500 }}>
      <StripesChart
        data={data}
        height={200}
        valueKey="tavg"
        nameKey="year"
        unit="°C"
      />
    </div>
  );
}
