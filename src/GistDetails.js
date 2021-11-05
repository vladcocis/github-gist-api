import _ from 'lodash';
import './App.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";


function GistDetails({ details, loading }) {
    const [files, setFiles] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [forks, setForks] = useState([]);
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        const tmp_files = [], tmp_languages = [], tmp_urls =[];

        _.map(details.files, (it) => {
            tmp_files.push(it.filename);
            tmp_languages.push(it.language);
            tmp_urls.push(it.raw_url);
        });

        setFiles(tmp_files);
        setLanguages(tmp_languages);
        setUrls(tmp_urls);
        searchForks(details.id);

    }, [details])

    if (loading) {
        return (
            <h1 className="loader">Loading...</h1>
        )
    }
    const displayFiles = () => {
        let i=0;
        return _.map(files, (it) => (
            
            <li  onClick={() => openInNewTab(urls[i++])} key={it}>{it} </li>
        ));
    }

    const displayLanguages = () => {
        return _.map(_.uniq(languages), (it) => (
            <li key={it}>{it}</li>
        ));
    }

    function searchForks(gistID) {
        axios({
            method: "get",
            url: `https://api.github.com/gists/${gistID}/forks`,
        }).then(res => {
            setForks(res.data);
        });
    }

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
      }

    function renderFork(fork) {
        return ( 
            <li key={fork.id} onClick={() => openInNewTab(fork.html_url)}>
                {fork.owner.login} 
                &nbsp;
                <img src={fork.owner.avatar_url} width="20" height="20" alt={fork.owner.id} />
            </li>
        );
    }

    return (
        <div className="gist-details-container">
            <div className="details-row">
                <label className="label">ID:</label>
                <span className="value">{details.id}</span>
            </div>
            <div className="details-row">
                <label className="label">File names:</label>
                {/* <span className="value">{getFilename(details)} </span> */}
                <ul>{displayFiles()}</ul>
            </div>
            <div className="details-row">
                <label className="label">Filetypes:</label>
                {/* <span className="value">{getLanguage(details)} </span> */}
                <ul >{displayLanguages()}</ul>
            </div>
            <div className="details-row">
                <label className="label">Last 3 Forks:</label>
                <ul>{forks.slice(0).reverse().slice(0,3).map(renderFork)}</ul>
            </div>
        </div>
    )
}

export default GistDetails;