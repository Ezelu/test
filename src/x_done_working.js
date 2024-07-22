


import { FileUpload } from '@roqquhq/roqqu-css'
import axios from 'axios';
import Axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function App() {

  const [files, setFiles] = useState([])
  const [progressValues, setProgressValues] = useState([]);
  const cancelToken = Axios.CancelToken.source();

  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const controller = new AbortController();
  const [cloudFiles, setCloudFiles] = useState([])


  const calculateTimeRemaining = (fileSize, percentCompleted, startTime) => {
    const currentTime = Date.now();
    const timeElapsedInSeconds = (currentTime - startTime) / 1000;
    const uploadSpeed = (fileSize * percentCompleted) / timeElapsedInSeconds;
    const timeRemainingInSeconds = (fileSize * (100 - percentCompleted)) / uploadSpeed;
    return Math.round(timeRemainingInSeconds);
  };




  const uploadFiles = async (files) => {
    const uploadPromises = files.map(async (file, idx) => {
      const formData = new FormData();
      formData.append("file", file)
      formData.append("upload_preset", "praize")
  
      const startTime = Date.now();

      try {
        const response = await Axios.get('https://reqres.in/api/users/2?delay=2', {
          signal: controller?.signal,
        });

        console.log("AxiosCancel: got response");
        return(response?.data);



        // const response = await Axios.post(
        //   'https://api.cloudinary.com/v1_1/dubealp25/image/upload',
        //   formData,
        //   {
        //     headers: { 'Content-Type': 'multipart/form-data' },
        //     onUploadProgress: (progressEvent) => {
        //       const percentCompleted = Math.round(
        //         (progressEvent.loaded * 100) / progressEvent.total
        //       );
  
        //       //spread the initial progress values i.e completed: false and progress: 0;
        //       const initialProgress = [...progressValues]
        //       if (percentCompleted === 100){
        //         initialProgress[idx].completed = true;
        //         initialProgress[idx].progress = 100;
        //       }else{
        //         initialProgress[idx].progress = percentCompleted;
        //       }
  
        //       const timeRemaining = calculateTimeRemaining( file.size, percentCompleted, startTime );
        //       initialProgress[idx].timeRemaining = timeRemaining;
        //         // setProgressValues(initialProgress)
        //     },
        //     cancelToken: cancelToken?.token,
        //   }
        // );

        // console.log("AxiosCancel: got response");
        // setIsUploadLoading(false)
        // return (response.data.secure_url);
      }
      catch(error) {
        // setIsUploadLoading(false)
        if (Axios.isCancel(error)) {
          console.log("AxiosCancel: caught cancel");
        } else {
          throw error;
        }
      }
    });

    return Promise.all(uploadPromises);
  };

  useEffect(() => {    
    if(files.length > 0) {
      const loading = async() => {
        let data = await uploadFiles(files)
        console.log(data, 'data');
        setCloudFiles(data);
      }
      loading() 
    }

    // return () => {
    //   controller.abort();
    // }
  }, [files]);


  useEffect(() => {
    // setIsUploadLoading(files.length > 0 ? true : false)
    if(files.length > 0 && cloudFiles.length > 0) {
      setIsUploadLoading(false);
    }
    else {
      setIsUploadLoading(true)
    }
  }, [files, cloudFiles])


  console.log(cloudFiles)

  return (
    <div>
      <p> {isUploadLoading ? 'loading' : 'not loading'} </p>
      <button onClick={() => {
        controller.abort();
        setIsUploadLoading(false)
      }}> Cancel Request </button>
      <FileUpload 
        files={files} 
        setFiles={setFiles} 
        supportedTypes={["jpeg", "png"]} 
        maxFileSize={10} 
        progressValues={progressValues} 
        setProgressValues={setProgressValues} 
        Axios = {Axios}
        cancelToken={cancelToken}
      />
    </div>
  )
}


























// import { FileUpload } from '@roqquhq/roqqu-css'
// import axios from 'axios';
// import Axios from 'axios';
// import React, { useEffect, useState } from 'react'

// export default function App() {

//   const [files, setFiles] = useState([])
//   const [progressValues, setProgressValues] = useState([]);
//   const cancelToken = Axios.CancelToken.source();

//   const [isUploadLoading, setIsUploadLoading] = useState(false);


//   const calculateTimeRemaining = (fileSize, percentCompleted, startTime) => {
//     const currentTime = Date.now();
//     const timeElapsedInSeconds = (currentTime - startTime) / 1000;
//     const uploadSpeed = (fileSize * percentCompleted) / timeElapsedInSeconds;
//     const timeRemainingInSeconds = (fileSize * (100 - percentCompleted)) / uploadSpeed;
//     return Math.round(timeRemainingInSeconds);
//   };


//   let s = 1;
//   const updateState = (val) => {
//     console.log('updating');
//     s = 2;
//     // setIsUploadLoading(val)
//   };

//   console.log(s);


//   const uploadFiles = async (files) => {
//     // setIsUploadLoading(true)
//     const uploadPromises = files.map(async (file, idx) => {
//       const formData = new FormData();
//       formData.append("file", file)
//       formData.append("upload_preset", "praize")
  
//       const startTime = Date.now();

//       try {
//         const response = await Axios.get('https://reqres.in/api/users/2?delay=2', {
//           cancelToken: cancelToken?.token,
//         });

//         console.log("AxiosCancel: got response");
//         return(response?.data);



//         // const response = await Axios.post(
//         //   'https://api.cloudinary.com/v1_1/dubealp25/image/upload',
//         //   formData,
//         //   {
//         //     headers: { 'Content-Type': 'multipart/form-data' },
//         //     onUploadProgress: (progressEvent) => {
//         //       const percentCompleted = Math.round(
//         //         (progressEvent.loaded * 100) / progressEvent.total
//         //       );
  
//         //       //spread the initial progress values i.e completed: false and progress: 0;
//         //       const initialProgress = [...progressValues]
//         //       if (percentCompleted === 100){
//         //         initialProgress[idx].completed = true;
//         //         initialProgress[idx].progress = 100;
//         //       }else{
//         //         initialProgress[idx].progress = percentCompleted;
//         //       }
  
//         //       const timeRemaining = calculateTimeRemaining( file.size, percentCompleted, startTime );
//         //       initialProgress[idx].timeRemaining = timeRemaining;
//         //         // setProgressValues(initialProgress)
//         //     },
//         //     cancelToken: cancelToken?.token,
//         //   }
//         // );

//         // console.log("AxiosCancel: got response");
//         // setIsUploadLoading(false)
//         // return (response.data.secure_url);
//       }
//       catch(error) {
//         // setIsUploadLoading(false)
//         if (Axios.isCancel(error)) {
//           console.log("AxiosCancel: caught cancel");
//         } else {
//           throw error;
//         }
//       }
//     });

//     return Promise.all(uploadPromises);
//   };

//   useEffect(() => {
//     if(files.length > 0) {
//       updateState(true)
//       const loading = async() => {
//         let data = await uploadFiles(files)
//         console.log(data, 'data')
//     }
//       loading() 
//     }
//   }, [files])



//   return (
//     <div>
//       {/* <p> {isUploadLoading ? 'loading' : 'not loading'} </p> */}
//       <button onClick={() => cancelToken.cancel()}> Cancel Request </button>
//       <FileUpload 
//         files={files} 
//         setFiles={setFiles} 
//         supportedTypes={["jpeg", "png"]} 
//         maxFileSize={10} 
//         progressValues={progressValues} 
//         setProgressValues={setProgressValues} 
//         Axios = {Axios}
//         cancelToken={cancelToken}
//       />
//     </div>
//   )
// }
