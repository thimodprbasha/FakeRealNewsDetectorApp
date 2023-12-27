import React, { useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextView from "./components/TextView/textView";

function App() {
  const [text, setText] = useState("");
  const [texts, setTexts] = useState([]);
  // var isPreview = false;
  // const [imageFiles, setImages] = useState(null);
  // const [files, setFiles] = useState(null);
  const [isLoading, setLoading] = useState(false);
  // const [showImages, setPreview] = useState(false);
  // const [showImageResult, setPreviewResult] = useState({
  //   showResult: false,
  //   err: false,
  // });

  const toastProps = {
    default: {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    },
    success: {
      render: "Success 👌",
      type: "success",
      isLoading: false,
      autoClose: 5000,
    },
    error: {
      render: "",
      type: "error",
      isLoading: false,
      autoClose: 5000,
    },
  };

  const serviceRef = useRef(null);

  const addText = () => {
    if (text !== "") {
      const id =
        texts[texts.length - 1] === undefined
          ? 0
          : texts[texts.length - 1].id + 1;
      let textObj = {
        id: id,
        text: text,
        disable : true
      };
      setTexts([...texts, textObj]);
      setText("");
    } else {
      toast.error((toastProps.error.render = "Fields cant be empty"));
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  // const handleFileSelected = (e) => {
  //   setFiles([]);
  //   setImages([]);
  //   for (let i = 0; i < e.target.files.length; i++) {
  //     const imgObj = {
  //       image: URL.createObjectURL(e.target.files[i]),
  //       file_name: e.target.files[i].name,
  //     };
  //     setFiles((fileArr) => [...fileArr, imgObj]);
  //     setImages((fileArr) => [...fileArr, e.target.files[i]]);
  //   }
  // };

  // const handleFileSubmition = () => {
  //   if (files != null) {
  //     setPreview(true);
  //   } else {
  //     toast.error((toastProps.error.render = "Please add a image"));
  //   }
  // };

  // const handleData = (probs) => {
  //   const newImgProps = probs.map((e) => {
  //     const fileULR = files.find((x) => x.file_name === e.file_name);
  //     console.log(fileULR);

  //     e.image = fileULR.image;
  //     return e;
  //   });
  //   setFiles(newImgProps);
  //   isPreview = true;
  // };

  const handleNewsubmission = async () => {
    const URL = "http://127.0.0.1:8000/api/detect-news-validation";

   

    setLoading(true);
    const pending = toast.loading("Analyzing images");

    await axios
      .post(URL, texts, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((result) => result.data)
      .then((data) => {
        setLoading(false);
        // handleData(data.result);
        if (!data.error) {
          // setPreviewResult({
          //   showResult: true,
          //   err: false,
          // });
          toast.update(pending, toastProps.success);
        } else {
          // setPreviewResult({
          //   showResult: false,
          //   err: true,
          // });
          toast.update(pending, (toastProps.error.render = data.error_msg));
        }
      })
      .catch((error) => {
        // setPreviewResult({
        //   showResult: false,
        //   err: true,
        // });
        setLoading(false);
        toast.update(pending, (toastProps.error.render = error));
        console.error("Error:", error);
      });
  };

  // const resetPage = () => {
  //   window.location.reload(false);
  //   serviceRef.current.scrollIntoView({ behavior: "smooth" });
  // };

  return (
    <>
      <ToastContainer />
      <div className="service">
        <div className="container">
          <div className="row gy-4 d-flex justify-content-center">
            <div ref={serviceRef} className="col-lg-12 ">
              <div className="section-header">
                <h2>Fake News Detector</h2>
              </div>
              <p>Please upload brain MRI scan images to detect tumor type.</p>
            </div>

            {!isLoading ? (
              <div className="col-lg-6  d-flex flex-column justify-content-center">
                <div>
                  <div class="mb-3">
                    <textarea
                      class="form-control"
                      id="textarea"
                      value={text}
                      onChange={handleTextChange}
                      on
                      rows="5"
                    ></textarea>
                  </div>
                </div>
                <div className="my-4 d-flex justify-content-center ">
                  <button className="btn btn-primary m-1" onClick={addText}>
                    Add News
                  </button>

                  {!(texts.length === 0) ? (
                  <button className="btn btn-success m-1" onClick={handleNewsubmission}>
                    Analyze News
                  </button>
                  ) : <></> }
                </div>  
              </div>
            ) : (
              <div className="col-lg-6  d-flex  justify-content-center">
                <div
                  style={{ width: "4rem", height: "4rem" }}
                  className="spinner-border text-primary"
                  role="status"
                ></div>
              </div>
            )}
            {!(texts.length === 0) ? (
              <div ref={serviceRef} className="col-lg-12 ">
                <TextView data={texts} state={setTexts} toast={toast} toastProps={toastProps}></TextView>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
