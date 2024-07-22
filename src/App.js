import { useState, useEffect } from "react";
import "./App.css";
import logo from "./logo.svg";
import axios from "axios";
import Axios from "axios";
import "./App.css";
// import { uploadFiles } from './utils';

import {
  InputField,
  NumberInput,
  Typography,
  SearchBar,
  Switch,
  DropDown,
  Filter,
  Alert,
  Stats,
  Radio,
  PinInput,
  Pagination,
  NeutralButton,
  CheckBox,
  toggleRoqquTheme,
  initializeTheme,
  Loader,
  Tooltip,
  Select,
  FileUpload,
  uploadFiles,
  // getThemeName,
} from "@roqquhq/roqqu-css";

const renderData = (data) => {
  // useEffect(() => {

  // }, [])
  return (
    <ul>
      {data.map((todo, index) => {
        return <li key={index}> {todo.title} </li>;
      })}
    </ul>
  );
};

// getThemeName('helloworld', localStorage.getItem('helloworld') || 'dark');

function App() {
  initializeTheme(localStorage.getItem("theme") == "dark" ? true : false);
  const [selectValue, setSelectValue] = useState();
  const [inputVal, setInputVal] = useState("");
  const [numberInputVal, setNumberInputVal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropValue, setDropValue] = useState("option-1");

  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState({
    errTrigger: true,
    errMsg: "This is an error message",
  });

  const [pinInputVal, setPinInputVal] = useState("");
  console.log(pinInputVal);

  const [openAlert, setOpenAlert] = useState(false);

  const statsData = [
    {
      title: "Total Users",
      content: "1,835,234",
      change: "positive",
      type: "primary",
      id: 1,
      icon: logo,
    },
    {
      title: "Total Users",
      content: "1,835,234",
      change: "negative",
      type: "primary",
      id: 2,
    },
    {
      title: "Total Users",
      content: "9,090,111",
      change: "negative",
      type: "tertiary",
      sec_text: "hello world",
      icon: logo,
      id: 4,
      // width: '500px'
    },
    {
      title: "Total Users",
      content: "9,090,111",
      change: "negative",
      type: "secondary",
      sec_text: "hello world",
      icon: logo,
      id: 4,
    },
  ];
  const [currentStat, setCurrentStat] = useState(1);

  const [data, setData] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [xPage, setXPage] = useState(true);
  const [resetPinInput, setResetPinInput] = useState(false);

  // console.log('current page: ', currentPage)

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setUpdatedData(res.slice(0, 10));
      });
  }, []);

  const [files, setFiles] = useState([]);
  const [progressValues, setProgressValues] = useState([]);
  // const cancelToken = Axios.CancelToken.source();

  // useEffect(() => {
  //   if(files.length > 0) {
  //     const loading = async() => {
  //       let data = await uploadFiles({
  //         axios,
  //         files,
  //         progressValues,
  //         setProgressValues,
  //         url: 'https://api.cloudinary.com/v1_1/dubealp25/image/upload',
  //         preset: 'praize',
  //         cancelToken,
  //       })
  //   }
  //     loading()
  //   }
  // }, [files])

  useEffect(() => {
    setXPage(currentPage);
  }, [currentPage]);

  const [cloudFiles, setCloudFiles] = useState([]);
  // console.log(cloudFiles)

  const calculateTimeRemaining = (fileSize, percentCompleted, startTime) => {
    const currentTime = Date.now();
    const timeElapsedInSeconds = (currentTime - startTime) / 1000;
    const uploadSpeed = (fileSize * percentCompleted) / timeElapsedInSeconds;
    const timeRemainingInSeconds =
      (fileSize * (100 - percentCompleted)) / uploadSpeed;
    return Math.round(timeRemainingInSeconds);
  };

  const uploadFiles = async (files) => {
    const uploadPromises = files.map(async (file, idx) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "praize");

      const startTime = Date.now();
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dubealp25/image/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            //spread the initial progress values i.e completed: false and progress: 0;
            const initialProgress = [...progressValues];
            if (percentCompleted === 100) {
              initialProgress[idx].completed = true;
              initialProgress[idx].progress = 100;
            } else {
              initialProgress[idx].progress = percentCompleted;
            }

            const timeRemaining = calculateTimeRemaining(
              file.size,
              percentCompleted,
              startTime
            );
            initialProgress[idx].timeRemaining = timeRemaining;

            setProgressValues(initialProgress);
          },
        }
      );
      return response.data.secure_url;
    });

    return Promise.all(uploadPromises);
  };

  useEffect(() => {
    if (files.length > 0) {
      const loading = async () => {
        let data = await uploadFiles(files);
        console.log(data, "data");
      };
      loading();
    }
  }, [files]);

  useEffect(() => {
    if (inputValue?.length < 5) {
      setInputError((prev) => ({
        ...prev,
        errTrigger: false,
      }));
      return;
    }

    setInputError({
      errTrigger: true,
      errMsg: "Length is greater than 5",
    });
  }, [inputValue]);

  // console.log(pinInputVal)

  const dropDownItems = [
    { title: "SELECT OPTION", caption: true },
    { title: "option-1", value: "option-1" },
    { title: "option-5", value: "option-2", color: "blue" },
    { title: "elect-3", value: "option-3", color: "red" },
    {
      title: "option-4",
      value: "option-4",
      color: "green",
      font: "text-md-black",
    },
    { title: "election-8x", value: "option-5" },
    { title: "option-6", value: "option-6" },
    { title: "option-7", value: "option-7" },
    { title: "option-8", value: "option-8" },
    { title: "option-9", value: "option-9" },
  ];

  const [allRadioBtns, setAllRadioBtns] = useState([
    { label: "XL", disabled: false, variant: "primary", value: "XL" },
    { label: "Md", disabled: false, variant: "primary", value: "Md" },
    { label: "Sm", disabled: true, variant: "primary", value: "Sm" },
    { label: "XSm", disabled: false, variant: "secondary", value: "XSm" },
  ]);
  const [radioVal, setRadioVal] = useState("Sm");
  const [checked, setChecked] = useState(true);

  const trigger = () => console.log(searchTerm);

  const [appTheme, setAppTheme] = useState(localStorage.getItem("theme"));

  const [checkboxState, setCheckboxState] = useState(!true);
  // console.log(checkboxState);

  return (
    <div
      style={{
        background: appTheme === "dark" ? "#1C2127" : "white",
      }}
    >
      <h1 className="one"> Buying & Selling </h1>
      <CheckBox
        name="controller"
        checked={checkboxState}
        onChange={() => setCheckboxState(!checkboxState)}
        disabled={!true}
        variant="primary"
        size="large"
      />
      <h1 className="header-xl"> Buying & Selling </h1>
      <FileUpload
        supportedTypes={["jpeg", "png"]}
        maxFileSize={10}
        axios={axios}
        Axios={Axios}
        setCloudFiles={setCloudFiles}
        url="https://api.cloudinary.com/v1_1/dubealp25/image/upload"
        preset="praize"
      />
      <PinInput
        items={4}
        setValue={setPinInputVal}
        // variant="password"
        sx={{ borderColor: "orange", color: "orange" }}
        reset={resetPinInput}
        setReset={setResetPinInput}
      />
      <br />
      <button onClick={() => setResetPinInput(true)}> Reset </button>
      <br />
      <button
        onClick={() => {
          const theme = localStorage.getItem("theme");

          toggleRoqquTheme();

          if (theme === "dark") {
            localStorage.setItem("theme", "light");
            setAppTheme("light");
          } else {
            localStorage.setItem("theme", "dark");
            setAppTheme("dark");
          }
        }}
      >
        Toggle theme
      </button>
      <InputField
        type="text"
        inputError={inputError}
        value={inputValue}
        removeOutline={true}
        onChange={(e) => {
          setInputValue(e.value);
        }}
        placeholder="Enter to check error"
      />
      <p className="mb-7 text-lg-bold"> Hellog </p>
      <br />
      <br />
      <SearchBar
        removeOutline={true}
        value={searchTerm}
        setValue={setSearchTerm}
        searchAction={trigger}
        placeholder="search roqqu"
        // disabled
      />
      <br />
      <Switch
        checked={checked}
        switchAction={() => {
          // logic
          // toggle modal
          // setChecked(!checked)
        }}
      />
      <br />
      <form
        method="GET"
        action="#"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {/* <InputField name="Ikorodu street" type='number' /> */}
        <InputField name="names" type="text" placeholder="Enter second" />
        <InputField name="name" type="text" placeholder="Enter name" />
        <InputField name="name2" type="email" placeholder="Enter mailo" />
        <button type="submit"> Submit Form </button>
      </form>
      <br />
      <form
        method="GET"
        action="#"
        style={{ display: "flex", flexDirection: "column", width: "500px" }}
      >
        <input
          name="first"
          type="text"
          placeholder="Enter second"
          autoComplete="off"
        />
        <input
          name="name"
          type="text"
          placeholder="Enter name"
          autoComplete="off"
        />
        <input
          name="second"
          type="email"
          placeholder="Enter email"
          autoComplete="dfghjkl"
        />
        <button type="submit"> Submit Form </button>
      </form>
      <br />
      <br />
      {/* <div style={{ display: 'flex'}}>
          <article style={{ width: '50%'}}>
            <DropDown 
              items={dropDownItems} 
              value={dropValue}
              setValue={setDropValue}
              variant="primary"
              width="100%"
              height='200px'
              // disabled
              direction="left">
                <SearchBar 
                  width='100%'
                  value={searchTerm} 
                  setValue={setSearchTerm} 
                  searchAction={trigger} 
                  placeholder="testing dropdown component"
                />
            </DropDown>
          </article>  
          <article>
            <button onClick={() => setChecked(!checked)}> Click </button>
          </article>
        </div> */}
      <div style={{ display: "flex" }}>
        <article style={{ width: "50%" }}>
          <td>
            <DropDown
              items={dropDownItems}
              value={dropValue}
              setValue={setDropValue}
              removeOutline={true}
              variant="primary"
              width="100%"
              height="200px"
              // disabled
              direction="left"
            >
              <SearchBar
                width="100%"
                value={searchTerm}
                setValue={setSearchTerm}
                searchAction={trigger}
                placeholder="testing dropdown component"
              />
            </DropDown>
          </td>
        </article>
        <article>
          <button onClick={() => setChecked(!checked)}> Click </button>
        </article>
      </div>
      <br /> <br />
      <br /> <br />
      <Select
        // width="150px"
        // height="200px"
        title="Symbol"
        // sx={{ height: '400px'}}
        setValue={setSelectValue}
        options={[
          { title: "hello-1", value: "world-1" },
          { title: "hello-2", value: "world-2" },
          { title: "hello-3", value: "world-3" },
          { title: "hello-4", value: "world-4" },
          { title: "hello-5", value: "world-5" },
        ]}
      />
      <br />
      <br />
      <Typography variant="header-lg"> Hello world g </Typography>
      <h1 className="micro text-xl-bold"> TESTING THE MICROPHONE </h1>
      {/* <InputField label="hello world" /> */}
      <div className="dropdown-parent-container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            background: "green",
          }}
        >
          <DropDown
            items={dropDownItems}
            value={dropValue}
            setValue={setDropValue}
            variant="primary"
            width="400px"
            height="200px"
            // disabled
            direction="left"
          >
            <button> Click Me! </button>
          </DropDown>
        </div>
      </div>
      <br /> <br />
      <Loader fullScreen={false} />
      <div style={{ marginLeft: "10rem" }}>
        <Tooltip
          title="Greetings!"
          position="bottom"
          width="300px"
          sx={{
            color: "red",
            fontSize: "7px",
          }}
        >
          <button> Hello world </button>
        </Tooltip>
      </div>
      <br /> <br />
      <CheckBox
        name="controller"
        checked={false}
        onChange={() => console.log("hello world")}
        disabled={!true}
        variant="primary"
        size="large"
      />
      <br />
      <Filter
        icon={logo}
        onClick={() => console.log("clicked")}
        title="select date"
        content="Pick date"
        variant="primary"
        sx={{
          height: "50px",
        }}
        // sx={{width: '400px'}}
      />
      <Filter
        icon={logo}
        onClick={() => console.log("clicked")}
        title="select date"
        align="left"
        sx={{
          width: "300px",
        }}
      />
      <Filter
        icon={logo}
        onClick={() => console.log("clicked")}
        title="date"
        content="august"
        variant="tertiary"
        color="orange"
        // sx={{width: '400px'}}
      />
      <br />
      <button className="mt-5 mb-5" onClick={() => setOpenAlert(!openAlert)}>
        {" "}
        open alert{" "}
      </button>
      <Alert
        isOpen={openAlert}
        setIsOpen={setOpenAlert}
        variant="info"
        duration={5000}
        position="bottom-right"
        content={{
          title: "Hello Roqquian",
          message:
            "Est elementum id senectus aliquet fermentum enim, scelerisque. Sit platea justo ipsum tortor et porttitor turpis.",
        }}
      />
      <br />
      <div
        style={{
          display: "flex",
          gap: "2rem",
          marginTop: "2rem",
        }}
      >
        {statsData.map((data) => {
          const { title, content, change, type, id, sec_text, icon, width } =
            data;
          return (
            <Stats
              title={title}
              content={content}
              change={change}
              type={type}
              id={id}
              icon={icon}
              sec_text={sec_text}
              stat={currentStat}
              width={width}
              setStat={setCurrentStat}
            >
              &nbsp;
            </Stats>
          );
        })}
      </div>
      <br />
      <div className="mt-6">
        <Radio
          items={allRadioBtns}
          value={radioVal}
          setValue={setRadioVal}
          direction="column-reverse"
          // sx={{
          //   marginLeft: '50%',
          //   transform: 'translateX(-50%)',
          // }}
        />
      </div>
      <br />
      <div>
        <div>{renderData(updatedData)}</div>

        <Pagination
          data={data}
          pageToggle={xPage}
          setData={setUpdatedData}
          items={10}
          setPage={setCurrentPage}
          background="green"
          count={false}
        />

        <br />
        <button onClick={() => setXPage(!xPage)}> Reset pagination </button>
      </div>
      <br />
      <NeutralButton
        sx={{ margin: "2rem" }}
        buttonAction={() => console.log("clicked")}
      >
        {" "}
        NeutralButton{" "}
      </NeutralButton>
      <br />
    </div>
  );
}

export default App;