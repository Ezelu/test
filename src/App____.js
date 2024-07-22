


import { FileUpload } from '@roqquhq/roqqu-css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { uploadFiles } from '@roqquhq/roqqu-css';

export default function App() {

  const [files, setFiles] = useState([])
  
  const [progressValues, setProgressValues] = useState([]);

  const [isUploading, setIsUploading] = useState(false);
  const [cloudFiles, setCloudFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([])
  const controller = new AbortController();





  const uploadFiles = async (files) => {
    const uploadPromises = files.map(async (file, idx) => {
      const formData = new FormData();
      formData.append("file", file)
      formData.append("upload_preset", "praize")

      
      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dubealp25/image/upload',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
            signal: controller?.signal,
          }
        );

        return (response.data.secure_url);
      }
      catch(error) {
        if (axios.isCancel(error)) {
          console.log("AxiosCancel: caught cancel");
        } else {
          setFiles([])
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
        // let data = await uploadFiles(files)
        setFiles([]);
        setCloudFiles(prev => [...prev, ...data]);
        setIsUploading(false);

        const filteredData = data.filter(each => each !== undefined);
        if(filteredData?.length > 0){
          setUploadedFiles((prev) => [...prev, ...files]);
        }
      }
      loading() 
    }
  }, [files]);




  console.log('cloud files: ', cloudFiles);
  console.log('Files: ', files)

  const cancelRequest = () => {
    controller.abort();
    setIsUploading(false);
  }


  return (
    <div>
      <p> {isUploading ? 'loading' : 'not loading'} </p>
      <button onClick={() => {
        controller.abort();
        setIsUploading(false)
      }}> Cancel Request </button>

      <FileUpload 
        files={files} 
        setFiles={setFiles} 
        supportedTypes={["jpeg", "png"]} 
        maxFileSize={10} 
        progressValues={progressValues} 
        setProgressValues={setProgressValues} 
        setIsUploading={setIsUploading}
        isUploading={isUploading}
        uploadedFiles={uploadedFiles}
        cancelRequest={cancelRequest}
        // Axios = {Axios}
        // cancelToken={cancelToken}
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

//   const [isUploading, setIsUploading] = useState(false);


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
//     // setIsUploading(val)
//   };

//   console.log(s);


//   const uploadFiles = async (files) => {
//     // setIsUploading(true)
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
//         // setIsUploading(false)
//         // return (response.data.secure_url);
//       }
//       catch(error) {
//         // setIsUploading(false)
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
//       {/* <p> {isUploading ? 'loading' : 'not loading'} </p> */}
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
