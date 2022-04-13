import React from "react";
// import { useHistory, Link } from "react-router-dom";
// import CurrencyFormat from "react-currency-format";
import "../styles/Searchprocard.module.css";
import { deleteItem } from "../Connection/Menu";
import { ToastContainer, toast } from "react-toastify";
import Edititem from "./Edititem";
import Managemenuitempage from "./Managemenuitempage";

const Menuitemcard = ({ data, sectionId, menuId, handleUpdate }) => {
  // const history = useHistory();
  // const [newDescription , setNewDescription] = useState()
  let newDescription;

  const handleDelete = async () => {
    // console.log(values);
    let res = await deleteItem({ itemId: data.id, sectionId, menuId });
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
    <div
      class="card   rounded-lg pb-3"
      style={{
        width: "14rem",
        border: "1px solid #E6034D",
        height: "360px",
        borderRadius: "12px",
        position: "relative",
      }}
    >
      {/* {console.log(date, id, contactDetails, images, price)} */}
      <div
        style={{ minHeight: "45%", position: "relative" }}
        className="imgcontainersearchprocard"
      >
        <img
          src={data?.images[0]}
          // className=" imgstylessearchoprocard "
          alt="..."
          style={{
            display: "initial",
            position: "absolute",
            inset: "0px",
            margin: "auto",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
            borderRadius: "0px",
          }}
        />
      </div>

      <div class="card-body text-start  mb-4 pb-4">
        {data.itemName && (
          <h5 className="mt-2">
            {" "}
            {data.itemName.length > 10
              ? (data.itemName = `${data.itemName.slice(0, 12)}...`)
              : data.itemName}
          </h5>
        )}
        {/* <h4>{title}</h4> */}
        <p class="card-text text-muted ">{data.price}</p>
        {data.description && (
          <p className="m-0 p-0 d-block d-lg-none">
            {" "}
            {data.description.length > 75
              ? (newDescription = `${data.description.slice(0, 18)}...`)
              : data.description}
          </p>
        )}
        {data.description && (
          <p className="m-0 p-0 d-none d-lg-block">
            {" "}
            {data.description.length > 75
              ? (newDescription = `${data.description.slice(0, 30)}...`)
              : data.description}
          </p>
        )}
        {/* <p class=" d-none d-sm-block card-text text-muted">{date}</p>{" "} */}
      </div>
      <div className="d-flex justify-content-center ">
        <div>
          <button
            onClick={handleDelete}
            className="btn btn-outline-danger mx-1"
          >
            <i class="far fa-trash-alt"></i>
          </button>
        </div>

        <Edititem
          data={data}
          handleUpdate={handleUpdate}
          menuId={menuId}
          sectionId={sectionId}
        />
        <div>
          {" "}
          <Managemenuitempage data={data} />
        </div>
      </div>
    </div>
  );
};

export default Menuitemcard;
