import React from "react";
import Additem from "../components/Additem";
import Menuitemcard from "./Menuitemcard";
import { deleteSection } from "../Connection/Menu";
import { ToastContainer, toast } from "react-toastify";
import Editsection from "./Editsection";

const Menushowsection = ({ data, handleUpdate, menuId }) => {
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
        <div>
          <div>
            <h4 className="text-center">
              {data.title} <span className="text-danger">.</span>
            </h4>
            <p className="text-center">{data.description}</p>
          </div>
        </div>
        <br />

        <div className="row text-center">
          {data &&
            data.items.map((item) => {
              return (
                <div className="col-12 col-md-4 col-lg-3 mb-4 d-flex justify-content-center ">
                  <Menuitemcard
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

export default Menushowsection;
