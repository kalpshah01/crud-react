import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { getUsers } from './utils/index.js';
function App() {
  const [user, setusers] = useState({
    name: '',
    lname: '',
    email: '',
    pass: '',
    add: '',
    state: '',
    city: ''
  });

  const [record, setrecord] = useState(getUsers());
  const [edit, setEdituser] = useState(false);
const [recentdel,setRecentdel]=useState([]);
  const handleinput = (e) => {
    setusers({ ...user, [e.target.name]: e.target.value });
  };

  const handleDelete = (id) => {
    const redel=record.find((item)=>item.id === id);
   

    const olddata=[...recentdel,redel];
    console.log(olddata);
  setRecentdel([...recentdel,redel]);
    const updated = record.filter((item) => item.id !== id);

    // /console.log(redel);
    
    setrecord(updated);
  };

const handleRecover = (item) => {
 
  setrecord([...record, item]);


  const updatedDel = recentdel.filter((rec) => rec.id !== item.id);
  setRecentdel(updatedDel);
};
  const handleEdit = (id) => {
    const selected = record.find((item) => item.id === id);
    if (!selected) return "No match record";
    setusers(selected);
    setEdituser(true);
  };
const handleSubmit = (e) => {
    e.preventDefault();

    if (edit) {
      const updated = record.map((rec) => (rec.id === user.id ? user : rec));
      setrecord(updated);
      setEdituser(false);
    } else {
      const obj = { ...user, id: Date.now() };
      setrecord([...record, obj]);
    }

    setusers({
      name: '',
      lname: '',
      email: '',
      pass: '',
      add: '',
      state: '',
      city: ''
    });
  };

 
  useEffect(() => {
  
    localStorage.setItem("users",JSON.stringify(record));
  }, [record]);

  return (
    <>
    {!edit ?
    <>
    {/* <h1>The Add Form</h1> */}
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <h2>The Registration Form For Add</h2>

          <Form.Group as={Col}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={user.name}
              onChange={handleinput}
              name="name" 
              placeholder="Enter name" 
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={user.lname}
              onChange={handleinput}
              name="lname"
              placeholder="Enter last name"
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={user.email}
              onChange={handleinput}
              name="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={user.pass}
              onChange={handleinput}
              name="pass"
              placeholder="Password"
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            value={user.add}
            onChange={handleinput}
            name="add"
            placeholder="1234 Main St"
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>City</Form.Label>
            <Form.Control
              value={user.city}
              type="text"
              placeholder="Enter city"
              onChange={handleinput}
              name="city"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>State</Form.Label>
            <Form.Select
              value={user.state}
              onChange={handleinput}
              name="state"
            >
              <option value="">Choose...</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Maharashtra">Maharashtra</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
:  
<>
{/* <h2>The Edit Form</h2> */}
<Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <h2>The Registration form For Edit</h2>

          <Form.Group as={Col}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={user.name}
              onChange={handleinput}
              name="name"
              placeholder="Enter name"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={user.lname}
              onChange={handleinput}
              name="lname"
              placeholder="Enter last name"
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={user.email}
              onChange={handleinput}
              name="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={user.pass}
              onChange={handleinput}
              name="pass"
              placeholder="Password"
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            value={user.add}
            onChange={handleinput}
            name="add"
            placeholder="1234 Main St"
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>City</Form.Label>
            <Form.Control
              value={user.city}
              type="text"
              placeholder="Enter city"
              onChange={handleinput}
              name="city"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>State</Form.Label>
            <Form.Select
              value={user.state}
              onChange={handleinput}
              name="state"
            >
              <option value="">Choose...</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Maharashtra">Maharashtra</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
      </>
}
 {record.length ==0 
         ?"No Record please addd first" :
      <table className='table table-bordered mt-4'>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Action</th>
          </tr>
        </thead>


        <tbody>
        
          
           {
            record.map((rec, index) => (
              <tr key={rec.id}>
                <td>{index + 1}</td>
                <td>{rec.name}</td>
                <td>{rec.lname}</td>
                <td>{rec.email}</td>
                <td>{rec.pass}</td>
                <td>{rec.add}</td>
                <td>{rec.city}</td>
                <td>{rec.state}</td>
                <td>
                  <button className='btn btn-danger' onClick={()=>{
                    handleDelete(rec.id) }}>Delete</button> &nbsp;
                  <button className='btn btn-primary' onClick={()=>{
                    handleEdit(rec.id)
                  }}>Edit</button>
                </td>
              </tr>
            ))
           } 
        </tbody>
      </table>
}
   <div className="recent-delte">
  <h3>Recently Deleted</h3>

  {recentdel.length === 0 ? (
    <p>No deleted records</p>
  ) : (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>City</th>
          <th>State</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {recentdel.map((rec, index) => (
          <tr >
            <td>{index + 1}</td>
            <td>{rec.name}</td>
            <td>{rec.lname}</td>
            <td>{rec.email}</td>
            <td>{rec.city}</td>
            <td>{rec.state}</td>
            <td><button className='btn btn-success' onClick={()=>{
              handleRecover(rec)}
              }>Recover </button></td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
    </>

  );
}

export default App;