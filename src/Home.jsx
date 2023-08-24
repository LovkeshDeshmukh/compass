import Sidebar from "./Sidebar";

const Home = () => {
  return <div>
    <div className="d-flex vh-100">
            <div className=""><Sidebar/></div>
            <div className="container-fluid py-3 bg-secondary-subtle">
                <div className="card h-100 p-2">GLORY to  Hanuman
                <span className="btn-group-sm"><button className="btn btn-warning"><i className="bi bi-arrow-left"></i> Back</button></span></div>
                
            </div>
        </div>
  </div>;
};
export default Home;