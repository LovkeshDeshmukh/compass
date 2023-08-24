import { BsTruckFlatbed } from "react-icons/bs";
import { GiHomeGarage, GiHandTruck } from "react-icons/gi";
import { FaHandPointRight } from "react-icons/fa";
import { AiFillFolder } from "react-icons/ai";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [showMenu, setshowMenu] = useState("");
  const [show, setShow] = useState(false);
  return (
    <>
      <div
        style={{
          width: "260px",
          height: "100vh",
          // backgroundColor: "#001d3d",
          display: "inline-block",
        }}
        className="d-none d-sm-none d-md-block"
      >
        <div
          style={{ color: "black" }}
          className="w-100 d-flex justify-content-evenly align-items-end py-3 px-4 position-sticky top-0 bg-success"
        >
          <div
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
            className="d-flex align-items-end "
          >
            <div>
              <GiHomeGarage className="fs-1 " />
            </div>
            <div className="" style={{ cursor: "pointer" }}>
              HOME
            </div>
          </div>
          <span className="btn-group-sm ms-5">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-warning py-0"
            >
              <i className="bi bi-arrow-left"></i> Back
            </button>
          </span>
        </div>
        <div
          style={{ height: "580px", cursor: "pointer" }}
          className="overflow-y-scroll hide_scroll"
        >
          <div
            onClick={() => setshowMenu(showMenu === "Booking" ? "" : "Booking")}
            style={{ color: "black" }}
            className="w-100 d-flex align-items-center py-3  "
          >
            <div>
              <AiFillFolder className=" me-3 ms-1" />
            </div>
            <div style={{ width: "182px", fontSize: "15px" }}>Test</div>
            <div>
              {showMenu !== "Booking" ? (
                <i
                  style={{ marginRight: "" }}
                  className="bi bi-caret-right-fill"
                ></i>
              ) : (
                <i
                  style={{ marginLeft: "" }}
                  className="bi bi-caret-down-fill"
                ></i>
              )}
            </div>
          </div>
          <div
            style={{
              color: "#6c757d",
              height: showMenu === "Booking" ? "130px" : "0px",
              overflow: "hidden",
              transition: "0.6s",
            }}
          >
            <div className="w-100 d-flex align-items-center py-2 ps-3">
              <div>
                <FaHandPointRight className="mx-3" />
              </div>
              <div className="me-3"> Subheading</div>
            </div>
            <div className="w-100 d-flex align-items-center py-2 ps-3">
              <div>
                <FaHandPointRight className="mx-3" />
              </div>
              <div className="me-3"> Subheading</div>
            </div>
            <div className="w-100 d-flex align-items-center py-2 ps-3">
              <div>
                <FaHandPointRight className="mx-3" />
              </div>
              <div className="me-3"> Subheading</div>
            </div>
          </div>
          
          
        </div>
      </div>
      {show?
      <div style={{width:'200px',height:'100%',border:'2px solid pink',position:"fixed",zIndex:'5'}} onClick={()=>setShow(false)} >
          lovkesh
      </div>:
      <div className="d-sm-block d-block
       d-md-none" style={{width:'25px',height:'25px',border:'2px solid red', position:"fixed", top:25, left:25,zIndex:'5'}} 
        onClick={()=>setShow(true)}>
        <i className="bi bi-list"></i>  [+
        ]
      </div>}
    </>
  );
};


export default Sidebar;
