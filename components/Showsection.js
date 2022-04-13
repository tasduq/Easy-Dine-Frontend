import React from "react";
import Additem from "../components/Additem";
import Managemenuitemcard from "./Managemenuitemcard";
import { deleteSection } from "../Connection/Menu";
import { ToastContainer, toast } from "react-toastify";
import Editsection from "./Editsection";

const Showsection = ({ data, handleUpdate, menuId }) => {
  const handleDelete = async () => {
    // console.log(values);
    let res = await deleteSection({ sectionId: data.id, menuId });
    console.log(res);
    if (res?.data.success) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      handleUpdate(true);
      // handleClose();
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between">
          <div>
            <h4>
              {data.title} <span className="text-danger">.</span>
            </h4>
            <p>{data.description}</p>
          </div>
          <div>
            <div className="d-flex">
              <button
                className="btn btn-outline-danger mx-2"
                onClick={handleDelete}
              >
                Delete <i className="far fa-trash-alt"></i>
              </button>
              <Editsection
                handleUpdate={handleUpdate}
                menuId={menuId}
                data={data}
              />
            </div>
          </div>
        </div>

        <div className="row text-center">
          <div className="col-12 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
            <div>
              <div
                className="shadow-sm text-center pt-5"
                style={{
                  width: "225px",
                  height: "275px",
                  border: "1px dashed black",
                  borderRadius: "12px",
                }}
              >
                <div>
                  <p style={{ fontSize: "35px", fontWeight: "light" }}>
                    <i className="fas fa-plus"></i>
                  </p>
                  <Additem
                    data={data}
                    handleUpdate={handleUpdate}
                    menuId={menuId}
                  />
                </div>
              </div>
            </div>
          </div>
          {data &&
            data.items.map((item) => {
              return (
                <div
                  key={item._id}
                  className="col-12 col-md-4 col-lg-3 mb-4 d-flex justify-content-center "
                >
                  <Managemenuitemcard
                    // title={item.itemName}
                    // description={item.description}
                    // price={item.price}
                    // image={item?.images[0]}
                    data={item}
                    sectionId={data.id}
                    menuId={menuId}
                    handleUpdate={handleUpdate}
                  />
                  <br />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Showsection;
