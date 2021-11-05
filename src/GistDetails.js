import _ from 'lodash';
import './App.css';
import * as React from 'react';
import { useState, useEffect } from 'react';

const GistDetails = ({ details, loading, forks }) => {
    const [files, setFiles] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        const tmp_files = [], tmp_languages = [], tmp_urls = [];

        _.map(details.files, (it) => {
            tmp_files.push(it.filename);
            tmp_languages.push(it.language);
            tmp_urls.push(it.raw_url);
        });

        setFiles(tmp_files);
        setLanguages(tmp_languages);
        setUrls(tmp_urls);
    }, [details])

    if (loading) {
        return (
            <h1 className="loader">Loading...</h1>
        )
    }

    const displayFiles = () => {
        let i = 0;
        return _.map(files, (it) => (

            <li className="filename-li" onClick={() => openInNewTab(urls[i++])} key={it}>{it} </li>
        ));
    }

    const displayLanguages = () => {
        return _.map(_.uniq(languages), (it) => (
            <li className="language-li" key={it}>{it}</li>
        ));
    }

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const renderFork = (fork) => {
        return (
            <li className="fork-li" key={fork.id} onClick={() => openInNewTab(fork.html_url)}>
                <img src={fork.owner.avatar_url} alt={fork.owner.id} />

                <span>{fork.owner.login}</span>
            </li>
        );
    }

    return (
        <div className="gist-details-container">
            <div className="details-row">
                <label className="label">ID:</label>
                <span className="value">{details.id}</span>
            </div>
            <div className="details-row filenames">
                <label className="label">File names:</label>
                <ul className="filenames-list">{displayFiles()}</ul>
            </div>
            <div className="details-row">
                <label className="label">Filetypes:</label>
                <ul className="languages-list">{displayLanguages()}</ul>
            </div>
            {forks.length ? (
                <div className="details-row">
                    <label className="label">Last 3 Forks:</label>
                    <ul className="usernames-list">{forks.slice(0).reverse().slice(0, 3).map(renderFork)}</ul>
                </div>
            ) : null}
        </div>
    )
}

export default GistDetails;