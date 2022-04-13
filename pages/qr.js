import React, { useState, useEffect, useRef } from "react";
import QRCode from "react-qr-code";
import { useRouter } from "next/router";
import ReactToPrint from "react-to-print";

const QR = () => {
  const { pathname, asPath } = useRouter();
  const [originValue, setOriginValue] = useState("");
  const QrRef = useRef();
  useEffect(() => {
    console.log(pathname, asPath, window.location);
    setOriginValue(`${window.location.origin}/menu`);
  }, []);

  const handleChange = (evt) => {
    console.log(evt.target.value);
    setOriginValue(evt.target.value);
  };

  return (
    <div>
      <div className="container">
        <div className="text-center d-flex justify-content-center">
          <div
            className="shadow-sm p-3"
            style={{ borderRadius: "12px", height: "auto", width: "320px" }}
          >
            {originValue && (
              <div>
                {" "}
                <div ref={QrRef}>
                  <QRCode
                    value={
                      originValue.length > 1 ? `${originValue}` : "Genrate"
                    }
                  />
                  <p>{originValue}</p>
                </div>
                <div class="form-group">
                  <label className="mx-1 mt-2" for="exampleInputEmail1">
                    QR Value
                  </label>

                  <input
                    type="text"
                    className="form-control mx-1"
                    // id="exampleInputEmail1"
                    // aria-describedby="emailHelp"
                    value={originValue}
                    onChange={handleChange}
                  />
                  <div>
                    <ReactToPrint
                      trigger={() => {
                        // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                        // to the root node of the returned component as it will be overwritten.
                        return (
                          <button className="btn btn-danger mt-1">
                            {" "}
                            <i class="fas fa-print"></i> Print
                          </button>
                        );
                      }}
                      content={() => QrRef.current}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QR;
