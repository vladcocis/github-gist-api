import { useState } from "react";
import axios from "axios";
import GistDetails from "./GistDetails";
import './App.css';

const App = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [gists, setGists] = useState([]);
  const [details, setDetails] = useState({});
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [forks, setForks] = useState([]);

  const [lengthError, setLengthError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    searchGists();
  };

  const searchGists = () => {
    if (!username.trim().length) {
      setLengthError(true);
      return;
    }

    setLengthError(false);
    setLoading(true);

    axios({
      method: "get",
      url: `https://api.github.com/users/${username}/gists`,
    }).then(res => {
      setLoading(false);
      setGists(res.data);
    });
  }

  const searchForks = (gistID) => {
    axios({
      method: "get",
      url: `https://api.github.com/gists/${gistID}/forks`,
    }).then(res => {
      setForks(res.data);
    }).catch((err) => console.error(err));
  }

  const renderGist = (gist) => {
    return (
      <div className="row" onClick={() => getDetails(gist.id)} key={gist.id}>
        <h2 className="gist-name">
          {gist.id}
        </h2>
      </div>
    );
  }

  const getDetails = (gistID) => {
    setDetailsLoading(true);
    axios({
      method: "get",
      url: `https://api.github.com/gists/${gistID}`,
    }).then(res => {
      setDetailsLoading(false);
      setDetails(res.data);
    });

    searchForks(gistID);
  }

  return (
    <div className="main">
      <div className="landing-page-container">
        <div className="left-side">
          <form className="form">
            <input
              className={`search-box ${lengthError ? 'input-error' : null}`}
              value={username}
              placeholder={lengthError ? 'Username cannot be empty.' : 'GitHub Username'}
              onChange={e => setUsername(e.target.value)}
            />
            <button className="submit-button" onClick={handleSubmit}>{loading ? "Searching..." : "Search"}</button>
          </form>
          <div className="results-container">
            {gists.map(renderGist)}
          </div>
        </div>
        <GistDetails details={details} loading={detailsLoading} forks={forks} />
      </div>
    </div>
  );
}

export default App;