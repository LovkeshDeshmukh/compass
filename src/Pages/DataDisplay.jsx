import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import { GiHomeGarage, GiHandTruck } from "react-icons/gi";
import { FaHandPointRight } from "react-icons/fa";
import { AiFillFolder } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

const DataDisplay = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [pages, setpages] = useState();
  const [showMenu, setshowMenu] = useState("");
  const [show, setShow] = useState(false);
  const [showData, setShowData] = useState("");
  const [data, setData] = useState({});

  //   const pages=
  useEffect(() => {
    getdata();
  }, []);
  const getdata = () => {
    axios.get("http://localhost:5001/backup").then((res) => setItems(res.data));
  };
  const allKeys = Object.keys(items);
  function copyDivToClipboard(x) {
    var range = document.createRange();
    range.selectNode(document.getElementById(x));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    try {
      const editdata = JSON.parse(window.getSelection().toString());
      axios
        .patch(`http://localhost:5001/${showData}/` + editdata.id, editdata)
        .then(() => {
          getdata();
          alert("document Modified");
          setEditId("");
        });
    } catch {
      alert("error");
    }

    window.getSelection().removeAllRanges();
  }
  const dltData = (x) => {
    axios
      .delete(`http://localhost:5001/${showData}/` + x)
      .then(() => getdata());
  };
  const addData = (x) => {
    axios.post(`http://localhost:5001/${showData}`, {}).then(() => getdata());
  };
  const updateData = () => {
    const item = JSON.parse(editData);
    axios
      .patch(`http://localhost:5001/${showData}/` + editId, item)
      .then(() => {
        setEditData("");
        setEditId("");
        getdata();
      });
  };
  const [editData, setEditData] = useState("");
  const [editId, setEditId] = useState("");
  return (
    <>
      {editData !== "" ? (
        <div
          style={{
            position: "fixed",
            zIndex: 1,
            height: "100vh",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <textarea
            style={{ width: "50%", minHeight: "60vh" }}
            value={editData}
            onChange={(e) => setEditData(e.target.value)}
          />
          <button onClick={() => updateData()}>Update</button>
        </div>
      ) : null}
      <div className="d-flex vh-100">
        <div className="">
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
              {allKeys.map((i) => (
                <div
                  onClick={() => setShowData(i)}
                  style={{ color: "black" }}
                  className="w-100 d-flex align-items-center py-3  "
                >
                  <div>
                    <AiFillFolder className=" me-3 ms-1" />
                  </div>
                  <div style={{ width: "182px", fontSize: "15px" }}>{i}</div>
                </div>
              ))}
            </div>
          </div>
          {show ? (
            <div
              style={{
                width: "200px",
                height: "100%",
                border: "2px solid pink",
                position: "fixed",
                zIndex: "5",
              }}
              onClick={() => setShow(false)}
            >
              lovkesh
            </div>
          ) : (
            <div
              className="d-sm-block d-block
       d-md-none"
              style={{
                width: "25px",
                height: "25px",
                border: "2px solid red",
                position: "fixed",
                top: 25,
                left: 25,
                zIndex: "5",
              }}
              onClick={() => setShow(true)}
            >
              <i className="bi bi-list"></i> [+ ]
            </div>
          )}
        </div>
        <div className="container-fluid py-3 bg-secondary-subtle">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#">
                  Previous
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  1
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  2
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  3
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
          <div className="card p-2 position-relative">
            {showData}
            {showData ? <button onClick={() => addData()}>+Add</button> : null}

            {/* {items.map((i, index) => (<div>{JSON.stringify(i.pincodeData)}</div>))} */}
            <div className="col">
              {items[showData]?.map((i) => (
                <>
                  <div style={{ right: "20px", position: "absolute" }}>
                    {editId !== i.id ? (
                      <button onClick={() => setEditId(i.id)}>
                        <i class="bi bi-pencil-square mx-2"></i>
                      </button>
                    ) : (
                      <>
                        <button onClick={() => copyDivToClipboard(i.id)}>
                          Update
                        </button>
                        <button onClick={() => setEditData(JSON.stringify(i))}>
                          add new fields
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => {
                        if (window.confirm("are you sure")) {
                          dltData(i.id);
                        }
                      }}
                    >
                      <i class="bi bi-trash3-fill"></i>
                    </button>
                  </div>
                  <div contentEditable={editId == i.id} id={i.id}>
                    {"{"}
                    {Object.keys(i).map((j, k) => (
                      <h6>
                        <span style={{ color: "orange" }}>"{j}"</span> :{" "}
                        {typeof i[j] === "object" ? (
                          <>
                            [
                            <div style={{ marginLeft: 20 }}>
                              {i[j].map((q, w) => (
                                <>
                                  {" "}
                                  {"{"}
                                  {Object.keys(q).map((j1, k1) => (
                                    <h6>
                                      {" "}
                                      <span style={{ color: "red" }}>
                                        "{j1}"
                                      </span>{" "}
                                      :{" "}
                                      <span style={{ color: "green" }}>
                                        "{q[j1]}"
                                      </span>
                                      {k1 < Object.keys(q).length - 1
                                        ? ","
                                        : ""}
                                    </h6>
                                  ))}{" "}
                                  {w < i[j].length - 1 ? "}," : "}"}
                                </>
                              ))}
                            </div>
                            ]{" "}
                          </>
                        ) : (
                          <span style={{ color: "yellowgreen" }}>"{i[j]}"</span>
                        )}
                        {k < Object.keys(i).length - 1 ? "," : ""}
                      </h6>
                    ))}{" "}
                    {"}"}
                  </div>
                  <hr />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DataDisplay;
