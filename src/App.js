import React, { useRef, useState } from "react";
import "./App.css";

import apiClient from "./http-common";

function App() {
  // Get data
  const get_id = useRef(null);
  const get_title = useRef(null);

  const [getResult, setGetResult] = useState(null);

  // Post data
  const post_title = useRef(null);
  const post_description = useRef(null);

  const [postResult, setPostResult] = useState(null);

  // update Put data
  const put_id = useRef(null);
  const put_title = useRef(null);
  const put_description = useRef(null);
  const put_published = useRef(null);

  const [putResult, setPutResult] = useState(null);

  // delete
  const delete_id = useRef(null);
  const [deleteResult, setDeleteResult] = useState(null);

  // format
  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };

  async function getAllData() {
    try {
      const res = await apiClient.get("/tutorials");

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };

      setGetResult(fortmatResponse(result));
    } catch (err) {
      setGetResult(fortmatResponse(err.response?.data || err));
    }
  }

  async function getDataById() {
    const id = get_id.current.value;

    if (id) {
      try {
        const res = await apiClient.get(`/tutorials/${id}`);

        const result = {
          data: res.data,
          status: res.status,
          statusText: res.statusText,
          headers: res.headers,
        };

        setGetResult(fortmatResponse(result));
      } catch (err) {
        setGetResult(fortmatResponse(err.response?.data || err));
      }
    }
  }

  async function getDataByTitle() {
    const title = get_title.current.value;

    if (title) {
      try {
        // const res = await instance.get(`/tutorials?title=${title}`);
        const res = await apiClient.get("/tutorials", {
          params: {
            title: title,
          },
        });

        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        setGetResult(fortmatResponse(result));
      } catch (err) {
        setGetResult(fortmatResponse(err.response?.data || err));
      }
    }
  }

  const clearGetOutput = () => {
    setGetResult(null);
  };

  // Post
  async function postData() {
    const postData = {
      title: post_title.current.value,
      description: post_description.current.value,
    };

    try {
      const res = await apiClient.post("/tutorials", postData, {
        headers: {
          "x-access-token": "token-value",
        },
      });

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };

      setPostResult(fortmatResponse(result));
    } catch (err) {
      setPostResult(fortmatResponse(err.response?.data || err));
    }
  }

  const clearPostOutput = () => {
    setPostResult(null);
  };

  // PUT data
  async function putData() {
    const id = put_id.current.value;

    if (id) {
      const putData = {
        title: put_title.current.value,
        description: put_description.current.value,
        published: put_published.current.checked,
      };

      try {
        const res = await apiClient.put(`/tutorials/${id}`, putData, {
          headers: {
            "x-access-token": "token-value",
          },
        });

        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        setPutResult(fortmatResponse(result));
      } catch (err) {
        setPutResult(fortmatResponse(err.response?.data || err));
      }
    }
  }

  const clearPutOutput = () => {
    setPutResult(null);
  };

  // Delete data
  const handleDeleteAll = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all records?"
    );
    if (confirmed) {
      deleteAllData();
    }
  };

  async function deleteAllData() {
    try {
      const res = await apiClient.delete("/tutorials");

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };

      setDeleteResult(fortmatResponse(result));
    } catch (err) {
      setDeleteResult(fortmatResponse(err.response?.data || err));
    }
  }

  const handleDeleteID = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this records?"
    );
    if (confirmed) {
      deleteDataById();
    }
  };
  async function deleteDataById() {
    const id = delete_id.current.value;

    if (id) {
      try {
        const res = await apiClient.delete(`/tutorials/${id}`);

        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        setDeleteResult(fortmatResponse(result));
      } catch (err) {
        setDeleteResult(fortmatResponse(err.response?.data || err));
      }
    }
  }

  const clearDeleteOutput = () => {
    setDeleteResult(null);
  };

  return (
    <div id="app" className="container mx-auto p-4">
      <div className="card">
        <div className="card-header">GET - Retrieve all records</div>
        <div className="card-body">
          <div className="flex items-center">
            <button className="btn btn-primary" onClick={getAllData}>
              Get All
            </button>

            <input
              type="text"
              ref={get_id}
              className="form-input ml-2"
              placeholder="Id"
            />
            <button className="btn btn-primary" onClick={getDataById}>
              Get by Id
            </button>

            <input
              type="text"
              ref={get_title}
              className="form-input ml-2"
              placeholder="Title"
            />
            <button className="btn btn-primary" onClick={getDataByTitle}>
              Find By Title
            </button>

            <button className="btn btn-warning ml-2" onClick={clearGetOutput}>
              Clear
            </button>
          </div>

          {getResult && (
            <div
              className="alert alert-secondary mt-2 result-section"
              role="alert"
            >
              <pre>{getResult}</pre>
            </div>
          )}
        </div>
      </div>
      {/* POST and PUT forms */}
      <div className="flex flex-wrap">
        {/* POST form */}
        <div className="w-full md:w-1/2 p-2">
          <div className="card">
            <div className="card-header">POST - Create new records</div>
            <div className="card-body">
              <div className="form-group">
                <input
                  type="text"
                  className="form-input ml-2"
                  ref={post_title}
                  placeholder="Title"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input ml-2"
                  ref={post_description}
                  placeholder="Description"
                />
              </div>
              <button className="btn btn-sm btn-primary" onClick={postData}>
                Post Data
              </button>
              <button
                className="btn btn-sm btn-warning ml-2"
                onClick={clearPostOutput}
              >
                Clear
              </button>

              {postResult && (
                <div className="alert alert-secondary mt-2" role="alert">
                  <pre>{postResult}</pre>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PUT form */}
        <div className="w-full md:w-1/2 p-2">
          <div className="card">
            <div className="card-header">PUT - Update existing records</div>
            <div className="card-body">
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  ref={put_id}
                  placeholder="Id"
                />
                <input
                  type="text"
                  className="form-input"
                  ref={put_title}
                  placeholder="Title"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  ref={put_description}
                  placeholder="Description"
                />
                <input
                  type="checkbox"
                  className="form-check-input"
                  ref={put_published}
                />
                <label className="form-check-label" htmlFor="put_published">
                  Publish
                </label>
              </div>
              <div className="form-check mb-2"></div>
              <button className="btn btn-sm btn-primary" onClick={putData}>
                Update Data
              </button>
              <button
                className="btn btn-sm btn-warning ml-2"
                onClick={clearPutOutput}
              >
                Clear
              </button>

              {putResult && (
                <div className="alert alert-secondary mt-2" role="alert">
                  <pre>{putResult}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">DELETE - Delete records</div>
        <div className="card-body">
          <div className="input-group input-group-sm">
            <input
              type="text"
              ref={delete_id}
              className="form-input ml-2"
              placeholder="Id"
            />
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleDeleteID}
            >
              Delete by Id
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={clearDeleteOutput}
            >
              Clear
            </button>
          </div>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleDeleteAll}
          >
            Delete All
          </button>

          {deleteResult && (
            <div className="alert alert-secondary mt-2" role="alert">
              <pre>{deleteResult}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
