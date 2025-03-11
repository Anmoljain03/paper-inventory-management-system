import "./Home.css"; 
import paperImage from "../assets/paper.jpg"; 

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <h1 className="title">Paper Inventory Management</h1>
        <p className="subtitle">
          Keep track of your paper stock with ease and efficiency.
        </p>
      </header>

      <div className="content">
        <div className="image-container">
          <img
            src={paperImage}
            alt="Paper Rolls"
            className="paper-image"
          />
        </div>
        <div className="info">
          <h2>Manage Your Paper Stock Seamlessly</h2>
          <p>
            Assign, update, and track your paper inventory all in one place.
            Fast, reliable, and simple to use!
          </p>
          <p className="owner-name">
            Owned by: <span>Mukesh Jain</span>
          </p>
          <p className="owner-contact">
            Contact: <span>9950467388</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
