import React from "react";
import "./textView.css";

const TextView = ({ data, showResult, state, toast, toastProps }) => {
  const handleTextChange = (element, disable) => {
    if (element.text !== "") {
      let updatedItem = data.map((item) => {
        if (item.id === element.id) {
          return { ...item, disable: disable };
        }
        return item;
      });
      state(updatedItem);
    } else {
      toast.error((toastProps.error.render = "Fields cant be empty"));
    }
  };

  const handleTextOnChange = (index, e) => {
    let updatedItem = data.map((item) => {
      if (item.id === index) {
        return { ...item, text: e.target.value };
      }
      return item;
    });
    state(updatedItem);
  };

  const handleTextDelete = (element) => {
    state(data.filter((e) => e.id !== element.id));
  };

  const changePredictedClassColor = (cls) => {
    return (cls === "Real" ? "text-success" : "text-danger") + " p-1"
  }

  return (
    <div className="wrapper">
      <div className="content">
        <div className="row  justify-content-center">
          {showResult ? (
            <h3 className="text-center font-weight-bold">Result</h3>
          ) : null}
          {data.map((element) => (
            <>
              <div className="col-md-12 p-1" id={`div-id-${element.id}`}>
                <div className="d-flex">
                  <h6 className="p-1">News : {element.id + 1}</h6>
                  {showResult ? (
                    <h6 className="p-1 ms-2">
                      Predicted : 
                      <span className={changePredictedClassColor(element.predicted_class)}>{ element.predicted_class
                      }</span>
                      
                    </h6>
                  ) : null}
                </div>

                <div className={showResult ? null : "row"}>
                  <div className={showResult ? "col-md-12" : "col-md-11"} >
                    <div className="p-0">
                      <textarea
                        id={`textArea-id-${element.id}`}
                        className="form-control"
                        disabled={showResult ? true : element.disable}
                        rows="5"
                        value={element.text}
                        onChange={(e) => handleTextOnChange(element.id, e)}
                      />
                    </div>
                  </div>
                  {!showResult ? (
                    <div className="col-md-1">
                      <div className="row justify-content-center align-middle h-100">
                        <div className="col-lg-12 p-1 d-flex align-items-center justify-content-center">
                          <button
                            className={
                              element.disable
                                ? "btn btn-primary"
                                : "btn btn-success"
                            }
                            onClick={() => {
                              element.disable
                                ? handleTextChange(element, false)
                                : handleTextChange(element, true);
                            }}
                          >
                            {element.disable ? "Edit" : "Done"}
                          </button>
                        </div>
                        <div className="col-md-12 p-1 d-flex align-items-center justify-content-center">
                          <button
                            className="btn btn-danger"
                            onClick={() => handleTextDelete(element)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextView;
