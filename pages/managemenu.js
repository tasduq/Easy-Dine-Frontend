import React, { useEffect, useState } from "react";
import Addmenu from "../components/Addmenu";
import Addsection from "../components/Addsection";
import Showsection from "../components/Showsection";
import { useAuth } from "../Context/Auth-context";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { getMenu } from "../Connection/Menu";

const Managemenu = () => {
  const { loggedIn, loggedinUser, handleLogout } = useAuth();
  const [menu, setMenu] = useState();
  const [isMenu, setIsMenu] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    console.log(loggedinUser);
    if (loggedIn === false || loggedinUser?.role !== "admin") {
      console.log("i am running");
      Router.push("/");
      toast.error("You Dont Have Permission", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    const fetchMenu = async () => {
      let res = await getMenu();
      console.log(res);
      if (res.data.success) {
        setMenu(res.data.menu[0]);
        setIsMenu(res.data.menu.length >= 1 ? true : false);
      }
    };

    fetchMenu();
    setUpdate(false);
  }, [update === true]);

  const handleUpdate = (status) => {
    if (status) {
      setUpdate(true);
    }
  };
  return (
    <div>
      <div className="container mt-5">
        <h2>
          Manage Your Menu <span className="text-danger">.</span>
        </h2>
        {menu === undefined && (
          <div className="text-center mt-5">
            {" "}
            <div class="spinner-border text-danger" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <h5>Loading the Menu</h5>
          </div>
        )}
        <div className="row mt-4">
          {menu?.length <= 0 ? (
            <div className="mx-3 w-100">
              <div
                className="shadow-sm text-center pt-5"
                style={{
                  width: "100%",
                  height: "200px",
                  border: "1px dashed black",
                  borderRadius: "12px",
                }}
              >
                <div>
                  <p style={{ fontSize: "35px", fontWeight: "light" }}>
                    <i class="fas fa-plus"></i>
                  </p>

                  <Addmenu handleUpdate={handleUpdate} />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {isMenu ? (
            <div className="col-12 mt-5">
              <h3>
                {menu.title}
                <span className="text-danger">.</span>
              </h3>
              <p>{menu.description}</p>
              <br />
              <br />
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
                    <Addsection handleUpdate={handleUpdate} menuId={menu._id} />
                  </div>
                </div>
              </div>
              <br />
              <br />
              {menu.sections.length >= 1 ? (
                <div>
                  {menu.sections.map((section) => {
                    return (
                      <Showsection
                        data={section}
                        handleUpdate={handleUpdate}
                        menuId={menu._id}
                      />
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Managemenu;
