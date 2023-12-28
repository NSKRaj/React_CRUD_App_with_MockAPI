import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoIosPersonAdd } from "react-icons/io";
import Model from "./component/modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Crud() {
  const [value, setValue] = useState([]);
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState(false);
  const [temp, setTemp] = useState({
    id: "",
    name: "",
    phoneNo: "",
    emailId: "",
    qualification: "",
    location: "",
  });

  //Edit Data

  const handleClose = () => setShow(false);

  const editData = (data) => {
    setShow(true);
    setTemp({
      id: data.id,
      name: data.name,
      phoneNo: data.phoneNo,
      emailId: data.emailId,
      qualification: data.qualification,
      location: data.location,
    });
  };

  // Create

  const newData = () => {
    setShow(true);
    setTemp({
      id: "",
      name: "",
      phoneNo: "",
      emailId: "",
      qualification: "",
      location: "",
    });
  };

  //Get Data
  useEffect(() => {
    fetch(
      "https://655f2e8e879575426b44c223.mockapi.io/student_data_crud_app/studentsData",
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((tasks) => {
        // Do something with the list of tasks
        setValue(tasks);
      })
      .catch((error) => {
        // handle error
      });
    setStatus(false);
  }, [status]);

  //Delete
  const deleteData = (id) => {
    fetch(
      `https://655f2e8e879575426b44c223.mockapi.io/student_data_crud_app/studentsData/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((task) => {
        // do something with the new task
      })
      .catch((error) => {
        // handle error
      })
      .then(() => {
        setStatus(true);
      });
  };

  return (
    <div>
      <h1>Crud App</h1>
      <Container fluid style={{ marginTop: "10px" }}>
        <Row>
          <Col className="col-12 col-sm-6 col-md-6 col-lg-12">
            <div className="create">
              <p>
                <Button variant="success" onClick={() => newData()}>
                  Add User <IoIosPersonAdd />
                </Button>
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="col-12 col-sm-6 col-md-6 col-lg-12">
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Phone No</th>
                  <th>Email Id</th>
                  <th>Qualification</th>
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {value?.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.phoneNo}</td>
                      <td>{item.emailId}</td>
                      <td>{item.qualification}</td>
                      <td>{item.location}</td>
                      <td>
                        <FaEdit
                          style={{ color: "yellow" }}
                          className="mx-2"
                          type="button"
                          onClick={() => editData(item)}
                        />
                        <RiDeleteBin6Fill
                          type="button"
                          style={{ color: "red" }}
                          onClick={() => deleteData(item.id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col className="col-12 col-sm-6 col-md-6 col-lg-12">
            <Model
              modalshow={show}
              modalClose={handleClose}
              modaldata={temp}
              modalStatus={setStatus}
              setModalData={setTemp}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Crud;
