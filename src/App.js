import React, { useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextView from "./components/TextView/textView";

function App() {
  const [text, setText] = useState("");
  const [texts, setTexts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

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
        disable: true,
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

  const handleNewsubmission = async () => {
    const URL = "http://127.0.0.1:8000/api/detect-news-validation";

    setLoading(true);
    const pending = toast.loading("Analyzing images");
    setShowResult(true);

    await axios
      .post(URL, texts, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((result) => result.data)
      .then((data) => {
        console.log(data);
        setLoading(false);
        setTexts(data.result);
        toast.update(pending, toastProps.success);
      })
      .catch((error) => {
        setLoading(false);
        toast.update(pending, (toastProps.error.render = error));
        console.error("Error:", error);
      });
  };

  const resetPage = () => {
    window.location.reload(false);
    serviceRef.current.scrollIntoView({ behavior: "smooth" });
  };

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
              <p>Please enter news article or description to validate the news is FAKE or REAL .</p>
            </div>

            {!isLoading ? (
              <>
                <div className="col-lg-6  d-flex flex-column justify-content-center">
                  <div>
                    <div className="mb-3">
                      <textarea
                        className="form-control"
                        disabled={showResult}
                        id="textarea"
                        value={text}
                        onChange={handleTextChange}
                        on
                        rows="5"
                      ></textarea>
                    </div>
                  </div>
                  <div className="my-4 d-flex justify-content-center text-center ">
                    <button
                      className="btn btn-primary m-1"
                      onClick={!showResult ? addText : resetPage}
                    >
                      {!showResult ? "Add" : "Restart"}
                    </button>


                      <button
                        className="btn btn-success m-1"
                        onClick={handleNewsubmission}
                        disabled ={texts.length === 0 || (showResult && texts.length !== 0)}
                      >
                        Analyze News
                      </button>

                  </div>
                </div>

                {!(texts.length === 0) ? (
                  <div ref={serviceRef} className="col-lg-12 ">
                    <TextView
                      data={texts}
                      showResult={showResult}
                      state={setTexts}
                      toast={toast}
                      toastProps={toastProps}
                    ></TextView>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <div className="col-lg-6  d-flex  justify-content-center">
                <div
                  style={{ width: "4rem", height: "4rem" }}
                  className="spinner-border text-primary"
                  role="status"
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
