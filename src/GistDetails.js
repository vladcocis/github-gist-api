import _ from 'lodash';
import './App.css';
import * as React from 'react';
import { useState, useEffect } from 'react';


function GistDetails({ details, loading }) {
    const [files, setFiles] = useState([]);
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        const tmp_files = [], tmp_languages = [];

        _.map(details.files, (it) => {
            tmp_files.push(it.filename);
            tmp_languages.push(it.language);
        });

        setFiles(tmp_files);
        setLanguages(tmp_languages);

    }, [details])

    if (loading) {
        return (
            <h1 className="loader">Loading...</h1>
        )
    }

    const displayFiles = () => {
        return _.map(files, (it) => (
            <li>{it}</li>
        ));
    }

    const displayLanguages = () => {
        return _.map(_.uniq(languages), (it) => (
            <li>{it}</li>
        ));
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
                <ul>{displayLanguages()}</ul>
            </div>
            <div className="details-row">
                <label className="label">Forks:</label>
            </div>
        </div>
    )
}

export default GistDetails;