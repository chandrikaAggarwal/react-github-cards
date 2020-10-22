import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { render } from '@testing-library/react';

const testData = [
  { name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook" },
  { name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu" },
  { name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook" },
];


function Cardlist(props) {
  const [profile, setProfile] = useState(props);

  return (
    <div className="p-2 w-100">
      <img className="w-25" src={profile.avatar_url} />
      <span className="pl-5 w-50">
        <p>{profile.name}</p>
        <p>{profile.company}</p>
      </span>
    </div>
  )
}

const Result = (props) => (
  <div className="d-flex align-items-center flex-column">
    {props.profiles.map(profile => <Cardlist key={profile.name} {...profile} />)}
  </div>
);

function Search(props) {
  let [username, setUsername] = useState('');

  let handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://api.github.com/users/${username}`)
      .then(res => res.json())
      .then(res => {
        setUsername(res.login);
        props.onSubmit(res);
      });
  };

  return (
    <div className="w-50 jumbotron clearfix">
      <form className="form-inline justify-content-center" onSubmit={handleSubmit}>
        <div className="form-group mx-sm-3 mb-2">
          <label className="sr-only">Username</label>
          <input type="text" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="username" />
        </div>
        <button type="submit" className="btn btn-primary mb-2">Search</button>
      </form>
      <small className="text-muted form-text text-center">Try usernames: gaearon, sophiebits, sebmarkbage, bvaughn</small>
    </div>
  )
}

function App() {
  let [data, setData] = useState(testData);

  let searchProfile = (profile) => {
    setData([profile]);
  };

  return (
    <div className="d-flex flex-column align-items-center" >
      <h1 className="clearfix">The GitHub Cards App</h1>
      <Search onSubmit={searchProfile} />
      <div className="clearfix"><Result profiles={data} /></div>
    </div>
  );
}

export default App;
