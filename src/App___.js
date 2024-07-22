import React, { useState, useEffect } from "react";
import Axios from "axios";


// COMPONENT THE DEVS WOULD INTERACT WITH
export default function AxiosCancel() {
  let source = Axios.CancelToken.source();

  return (
    <div>
      {/* <button onClick={() => source.cancel()}> Cancel request </button> <br /> */}
      <CustomComponent cancelToken={source} />
    </div>
  )
}



// FUNCTION THAT DOES THE HEAVY WORK, THEY'LL HAVE TO IMPORT IT

const loadData = async ( cancelToken, url ) => {
  try {
    const response = await Axios.get(url, {
      cancelToken: cancelToken?.token,
    });

    console.log("AxiosCancel: got response");
    return(response?.data);
  } 
  catch (error) {
    if (Axios.isCancel(error)) {
      console.log("AxiosCancel: caught cancel");
    } else {
      throw error;
    }
  }
};




// COMPONENT IN THE LIBRARY

function CustomComponent ({ cancelToken }) {
  const [data, setData] = useState(null);
  const url='https://reqres.in/api/users/2?delay=2'

  useEffect(() => {
    const fetch = async () => {
      const data = await loadData(cancelToken, url);
      setData(data)
    }
    fetch()
  }, [])

  console.log(data);


  if (!data) {
    return <div>
      <button onClick={() => cancelToken.cancel()}> Cancel request </button> <br />
      Loading data from {url}
      <br />

    </div>;
  }

  return <div>{JSON.stringify(data)}</div>;
}






























// import React, { useState, useEffect } from "react";
// import Axios from "axios";

// export default function AxiosCancel() {
//   let source = Axios.CancelToken.source();

//   return (
//     <div>
//       <button onClick={() => source.cancel()}> Cancel request </button> <br />
//       <CustomComponent cancelToken={source} />
//     </div>
//   )
// }




// function CustomComponent ({ cancelToken }) {
//   const [data, setData] = useState(null);
//   const url='https://reqres.in/api/users/2?delay=2'

//   useEffect(() => {

//     const loadData = async () => {
//       try {
//         const response = await Axios.get(url, {
//           cancelToken: cancelToken.token,
//         });

//         console.log("AxiosCancel: got response");
//         setData(response.data);
//       } 
//       catch (error) {
//         if (Axios.isCancel(error)) {
//           console.log("AxiosCancel: caught cancel");
//         } else {
//           throw error;
//         }
//       }
//     };
//     loadData();
//   }, [url]);

//   if (!data) {
//     return <div>
//       Loading data from {url}
//       <br />

//     </div>;
//   }

//   return <div>{JSON.stringify(data)}</div>;
// }

