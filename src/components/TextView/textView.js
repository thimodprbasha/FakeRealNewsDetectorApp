import React from "react";
import "./textView.css";

const TextView = ({ data, state, toast, toastProps }) => {
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

  return (
    <div className="wrapper">
      <div className="content">
        <div className="row  justify-content-center">
          {data.map((element) => (
            <>
              <div className="col-md-12 p-1" id={`div-id-${element.id}`}>
                <h6 className="pl-1">Text : {element.id + 1}</h6>
                <div className="row">
                  <div className="col-md-11">
                    <div className="p-0">
                      <textarea
                        id={`textArea-id-${element.id}`}
                        className="form-control"
                        disabled={element.disable}
                        rows="4"
                        value={element.text}
                        onChange={(e) => handleTextOnChange(element.id, e)}
                      />
                    </div>
                  </div>
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
