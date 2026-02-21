import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import React, { useEffect,useState } from "react";
import logo from './assets/savings.png'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

export default function Login() {

    const [nm,setNm]=useState(' ')
    const [mo,setMo]=useState(0)
    const [op,setOp]=useState(0)
    const [umo,setUmo]=useState(0)
    const Navigate=useNavigate();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { setUser } = useContext(AuthContext);

    /* --------- Dynamic Financial Text Loop --------- */
    const services = [
        "💰 Track Your Expenses",
        "📊 Manage Transactions",
        "📈 Analyze Income",
        "💳 Smart Budgeting",
        "🧾 Daily Expense Records"
    ];

    const [currentService, setCurrentService] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentService((prev) => (prev + 1) % services.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    let getnm=(e)=>{setNm(e.target.value)}
    let getmo=(e)=>{setMo(e.target.value)}
    let getOp=(e)=>{setOp(e.target.value)}
    let getumo=(e)=>{setUmo(e.target.value)}

    let reg=()=>{
        alert("Reg here")
        alert(nm+mo+op)
        axios.post("https://codingshika.com/APP/EXP/add_user.php?&mobile="+mo+"&uname="+nm+"&opbal="+op)
        .then(res=>{
            if(res.data.posts.status=="200"){
                alert("Registered Success..!")
                setShow(false)
            }else{
                alert("Failed..!")
                setShow(false)
            }
        })
    }

    let login=()=>{
        axios.post("https://codingshika.com/APP/EXP/user_login.php?&mobile="+umo)
        .then(res=>{
            if(res.data.posts.status=="200"){
                alert("Login Success..!")
                localStorage.setItem("id",res.data.posts.id)
                localStorage.setItem("nm",res.data.posts.name)
                setUser({
                    id: res.data.posts.id,
                    uname: res.data.posts.name
                })
                Navigate('/dash')
            }else{
                alert("Failed..!")
            }
        })
    }

    return(
        <>

{/* -------- Registration Modal -------- */}
<Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>🧾 Add New User</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form.Control type="text" onChange={getnm} placeholder="Enter Name" className="mb-3 shadow-sm"/>
        <Form.Control type="number" onChange ={getmo} placeholder="Enter Mobile No" className="mb-3 shadow-sm"/>
        <Form.Control type="number" onChange={getOp} placeholder="Enter Opening Balance" className="mb-3 shadow-sm"/>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="success" onClick={reg}>Done</Button>
    </Modal.Footer>
</Modal>

{/* -------- Login UI -------- */}
<Container fluid className="vh-100 d-flex justify-content-center align-items-center"
style={{
    background: "linear-gradient(135deg, #1e3c72, #2a5298)"
}}>

<Row>
<Col>
<Card 
className="shadow-lg border-0 p-4"
style={{
    width: "25rem",
    borderRadius: "20px",
    backdropFilter: "blur(10px)"
}}
>

<div className="text-center">
<img 
src={logo} 
style={{ height: "150px", width: "150px" }} 
alt="logo"
className="mb-3"
/>

<h4 className="text-primary fw-bold">
Personal Transaction Manager
</h4>

{/* Dynamic Loop Text */}
<p className="text-muted fw-semibold" style={{minHeight:"25px"}}>
{services[currentService]}
</p>

</div>

<hr/>

<h5 className="text-center mb-3">🔐 Secure Login</h5>

<Form>
<Form.Group className="mb-3">
<Form.Label>Mobile Number</Form.Label>
<Form.Control
type="tel"
placeholder="Enter mobile number"
onChange={getumo}
className="shadow-sm"
/>
</Form.Group>

<div className="d-grid gap-2">
<Button 
variant="primary" 
onClick={login}
style={{borderRadius:"10px"}}
>
🚀 Login
</Button>

<Button 
variant="outline-light"
onClick={handleShow}
style={{borderRadius:"10px", background:"#f8f9fa"}}
>
New User? Register Here
</Button>
</div>

</Form>

</Card>
</Col>
</Row>
</Container>

</>
    )
}