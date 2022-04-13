import React, { useState, useEffect } from "react";
import Menuitemcard from "../components/Menuitemcard";
import { getMenu } from "../Connection/Menu";
import Menushowsection from "../components/Menushowsection";

const Menu = ({}) => {
  const [menu, setMenu] = useState();
  const [update, setUpdate] = useState(false);
  // const [isMenu, setIsMenu] = useState(menu?.length >= 1 ? true : false);
  const [isMenu, setIsMenu] = useState(false);

  console.log(menu);

  useEffect(() => {
    const fetchMenu = async () => {
      let res = await getMenu();
      console.log(res);
      if (res.data.success) {
        setMenu(res.data.menu[0]);
        // setIsMenu(menu.length >= 1 ? true : false);
        setIsMenu(true);
      }
    };

    fetchMenu();
    // setMenu(menu);
    // setIsMenu(menu.length >= 1 ? true : false);
    setUpdate(false);
  }, [update === true]);

  const handleUpdate = (status) => {
    if (status) {
      setUpdate(true);
    }
  };

  return (
    <div>
      {menu === undefined && (
        <div className="text-center mt-5">
          {" "}
          <div class="spinner-border text-danger" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <h5>Loading the Menu</h5>
        </div>
      )}

      {menu && (
        <div className="container mt-3  ">
          {/* <h2 className="text-center">
            Explore Our Menu <span className="text-danger">.</span>
          </h2> */}
          <div className="row mt-2 ">
            {menu ? (
              <div className="col-12 mt-5">
                <h3 className="text-center">
                  {menu.title}
                  <span className="text-danger">.</span>
                </h3>
                <p className="text-center">{menu.description}</p>

                <br />
                <br />
                {menu.sections.length >= 1 ? (
                  <div>
                    {menu.sections.map((section) => {
                      return (
                        <Menushowsection
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
      )}
    </div>
  );
};

// export const getServerSideProps = async (ctx) => {
//   // const res = await fetch('https://api.github.com/repos/vercel/next.js')
//   // const json = await res.json()

//   let menu;

//   let res = await getMenu();
//   // console.log(res);
//   if (res.data.success) {
//     menu = res.data.menu[0];
//     console.log(menu);
//   }

//   return { props: { menu } };
// };

export default Menu;
