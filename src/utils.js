import axios from "axios";
import { useCancelToken } from "./useCancelToken";


const calculateTimeRemaining = (fileSize, percentCompleted, startTime) => {
  const currentTime = Date.now();
  const timeElapsedInSeconds = (currentTime - startTime) / 1000;
  const uploadSpeed = (fileSize * percentCompleted) / timeElapsedInSeconds;
  const timeRemainingInSeconds = (fileSize * (100 - percentCompleted)) / uploadSpeed;
  return Math.round(timeRemainingInSeconds);
};



export const uploadFiles = async (args) => {
  const { files, progressValues, setProgressValues, url, preset, newCancelToken, isCancel } = args



  const uploadPromises = files.map(async (file, idx) => {

    const formData = {
      file,
      upload_preset: preset,
    }

    const startTime = Date.now();
    const response = await axios.post(
      // 'https://api.cloudinary.com/v1_1/dubealp25/image/upload',
      url,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          //spread the initial progress values i.e completed: false and progress: 0;
          const initialProgress = [...progressValues]
          if (percentCompleted === 100){
            initialProgress[idx].completed = true;
            initialProgress[idx].progress = 100;
          }else{
            initialProgress[idx].progress = percentCompleted;
          }

          const timeRemaining = calculateTimeRemaining( file.size, percentCompleted, startTime );
          initialProgress[idx].timeRemaining = timeRemaining;

          setProgressValues(initialProgress)
        },
        cancelToken: newCancelToken(),
      }
    );
    return response.data.secure_url;
  })
  .catch(error => {
    if(isCancel(error)) return;
  });

  return Promise.all(uploadPromises);
};










// export const uploadFiles = async (args) => {
//   const { files, progressValues, setProgressValues, url, preset } = args



//   const uploadPromises = files.map(async (file, idx) => {

//     const formData = {
//       file,
//       upload_preset: preset,
//     }

//     const startTime = Date.now();
//     const response = await axios.post(
//       // 'https://api.cloudinary.com/v1_1/dubealp25/image/upload',
//       url,
//       formData,
//       {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );

//           //spread the initial progress values i.e completed: false and progress: 0;
//           const initialProgress = [...progressValues]
//           if (percentCompleted === 100){
//             initialProgress[idx].completed = true;
//             initialProgress[idx].progress = 100;
//           }else{
//             initialProgress[idx].progress = percentCompleted;
//           }

//           const timeRemaining = calculateTimeRemaining( file.size, percentCompleted, startTime );
//           initialProgress[idx].timeRemaining = timeRemaining;

//           setProgressValues(initialProgress)
//         },
//       }
//     );
//     return response.data.secure_url;
//   });

//   return Promise.all(uploadPromises);
// };
