import Button from 'react-bootstrap/Button';
import {Modal, Form} from 'react-bootstrap';
import { IoMdCloseCircle } from "react-icons/io";
import { CiSaveDown2 } from "react-icons/ci";

function Model(props) {

const updateAPIData = () => {
  fetch(
`https://655f2e8e879575426b44c223.mockapi.io/student_data_crud_app/studentsData/${props.modaldata.id}`,
{
  method: "PUT",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(props.modaldata)
}
)
.then((res) => {
  if (res.ok) {
    return res.json();
  }
  // handle error
})
.then((tasks) => {
  
})
.catch((error) => {
  // handle error
}).then(()=>{props.modalStatus(true)});
props.modalClose();

}

//Create

const createAPIData = () => {
  fetch(
`https://655f2e8e879575426b44c223.mockapi.io/student_data_crud_app/studentsData`,
{
  method: 'POST',
  headers: {'content-type':'application/json'},
  // Send your data in the request body as JSON
  body: JSON.stringify(props.modaldata)
}).then(res => {
  if (res.ok) {
      return res.json();
  }
  // handle error
}).then(task => {
  // do something with the new task
}).catch(error => {
  // handle error
}).then(()=>{props.modalStatus(true)});
props.modalClose();
}


  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={props.modalshow} onHide={props.modalClose} size='md' aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.modaldata.id ? 'Edit Data' : 'Create Data'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className='fw-bold'>Name</Form.Label>
              <Form.Control 
              defaultValue ={props.modaldata? props.modaldata.name:false}
              onChange={(e)=>props.setModalData({...props.modaldata,name: e.target.value})}
                type="text"
                placeholder="Enter Name"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className='fw-bold'>Phone No</Form.Label>
              <Form.Control 
                defaultValue = {props.modaldata ? props.modaldata.phoneNo:false}
                onChange={(e)=>props.setModalData({...props.modaldata,phoneNo: e.target.value})}
                type="tel"
                placeholder="Enter Phone No"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className='fw-bold'>Email address</Form.Label>
              <Form.Control 
              defaultValue = {props.modaldata ? props.modaldata.emailId: false}
              onChange={(e)=>props.setModalData({...props.modaldata,emailId: e.target.value})}
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className='fw-bold'>Qualification</Form.Label>
              <Form.Control 
              defaultValue = {props.modaldata ? props.modaldata.qualification:false}
              onChange={(e)=>props.setModalData({...props.modaldata,qualification: e.target.value})}
                type="text"
                placeholder="Enter Qualification"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className='fw-bold'>Location</Form.Label>
              <Form.Control 
              defaultValue = {props.modaldata ? props.modaldata.location:false}
              onChange={(e)=>props.setModalData({...props.modaldata,location: e.target.value})}
                type="text"
                placeholder="Enter Location"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="danger" onClick={props.modalClose}>
            Close <IoMdCloseCircle />
          </Button>
          {props.modaldata.id ?
           
           (<Button variant="success" onClick={updateAPIData}>
            Save <CiSaveDown2 />
          </Button>) :

          (<Button variant="info" onClick={createAPIData}>
            Insert <CiSaveDown2 />
          </Button>)          
          }
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Model;