import './Page-Style.css';

import React, { useEffect, useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Dot } from 'recharts';


function Create() {

  const [data, setData] = useState([]);

  useEffect(() => { 
    document.title='Str-Attr';
    SearchAttractors(0);
  }, [])


  function SearchAttractors(n=1){
    let found = 0;

    while (found < n){
      // Initialize converging and lyapunov
      let converging = false;
      let lyapunov = 0;
      var dataTemp = [];

      // Random Starting point
      let x = (Math.random() - .5); // [0.0, 1.0] - .5
      let y = (Math.random() - .5); // [0.0, 1.0] - .5

      dataTemp.push({x:`${x}`,y:`${y}`});

      // Random nearby jittered points
      let xe = (Math.random() - .5) / 1000;
      let ye = (Math.random() - .5) / 1000;
      
      // Distance between the points
      let dx = xe - x;
      let dy = ye - y;
      let d0 = Math.sqrt(dx*dx + dy*dy);

      // Random parameter vector
      var a = Array.from({ length: 12 }, () => Math.random() * 4 - 2);

      // Itervaly pass (x,y) into quadratic map
      for (let i=0; i < 100; i++){
        // Compute next point
        let xNext = a[0] + a[1]*x + a[2]*x*x + a[3]*y + a[4]*y*y + a[5]*x*y;
        let yNext = a[6] + a[7]*x + a[8]*x*x + a[9]*y + a[10]*y*y + a[11]*x*y;

        // Check if we're converging to infinity
        if(xNext > 1e10 || xNext < -1e10 || yNext > 1e10 || yNext < -1e10){
          converging = true;
          break;
        }

        // Check if we're converging to a single point
        if(Math.abs(x-xNext) < 1e-10 && Math.abs(y-yNext) < 1e-10){
          converging = true;
          break;
        }

        // Check for chaotic behavior
        for (let j=0; j < 500; j++){
          // Compute next alternative point
          let xeNext = a[0] + a[1]*xe + a[2]*xe*xe + a[3]*ye + a[4]*ye*ye + a[5]*xe*ye;
          let yeNext = a[6] + a[7]*xe + a[8]*xe*xe + a[9]*ye + a[10]*ye*ye + a[11]*xe*ye;

          // Distance between new point and alternative point
          dx = xeNext - xNext;
          dy = yeNext - yNext;
          var d = Math.sqrt(dx*dx + dy*dy);

          // Lyapunov exponent
          lyapunov += Math.log(Math.abs(d/d0));

          // rescale the alternative points
          xe = xNext + d0*dx/d
          ye = yNext + d0*dy/d
        }

        // Update (x,y)
        x = xNext;
        y = yNext;

        // Add (x,y) to the data list
        dataTemp.push({x:`${x}`,y:`${y}`})
      }

      // Confirms the found graph will look good
      if(!converging && lyapunov >= 10){
        found += 1; 
        setData(dataTemp);
        console.log(dataTemp);
      }
    }
    return a;
  }

  return (
    <>
      <div className='content'>
        <h1>Create</h1>
        <div className='create'>
          <ScatterChart width={900} height={500}>
            <CartesianGrid fill="black" horizontal={false} vertical={false} />
            <XAxis type="number" dataKey="x" stroke="black" tick={true} />
            <YAxis type="number" dataKey="y" stroke="black" tick={true} />
            <Scatter data={data} fill="white" line={false} shape={<Dot r={1} />} />
          </ScatterChart>
        </div>
      </div>
    </>
  );

}

export default Create;