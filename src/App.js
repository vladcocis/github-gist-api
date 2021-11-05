import {useState} from "react";
import axios from "axios";
import GistDetails from "./GistDetails";
import './App.css';

function App() {

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [gists, setGists] = useState([]);
  const [details, setDetails] = useState({});
  const [detailsLoading, setDetailsLoading] = useState(false);

  function handleSubmit(e){
    e.preventDefault();
    searchGists();
  };

  function searchGists(){
    setLoading(true);
    axios({
      method: "get",
      url: `https://api.github.com/users/${username}/gists`,
    }).then(res => {
      setLoading(false);
      setGists(res.data);
    });
  }

  function renderGist(gist){
    return(
      <div className="row" onClick={()=> getDetails(gist.id)} key ={gist.id}>
      <h2 className="gist-name">
        {gist.id}
      </h2>
      </div>
    );
  }

  function getDetails(gistID){
    setDetailsLoading(true);
    axios({
      method: "get",
      url: `https://api.github.com/gists/${gistID}`,
    }).then(res => {
      setDetailsLoading(false);
      setDetails(res.data);
    });
  }

  return (
   <div className="main">
      <div className="landing-page-container">
        <div className= "left-side">
          <form className="form">
            <input
            className="search-box"
            value = {username}
            placeholder = "GitHub Username"
            onChange ={e => setUsername(e.target.value)}
            />
            <button className ="submit-button" onClick={handleSubmit}>{loading ? "Searching..." : "Search"}</button>
          </form>
          <div className ="results-container">
              {gists.map(renderGist)}
          </div>
        </div>
        <GistDetails details={details} loading={detailsLoading}/>
      </div>
   </div>
  );
}

export default App;
