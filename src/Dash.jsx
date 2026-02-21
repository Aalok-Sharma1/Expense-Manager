import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Navbar, Nav, Form, Table } from "react-bootstrap";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

export default function Dash() {

  const { user } = useContext(AuthContext);
  const Navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged Out Successfully");
    Navigate('/');
  };

  const [date, setDate] = useState(0);
  const [note, setNote] = useState(0);
  const [credt, setCredt] = useState(0);
  const [val, setVal] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [id, setId] = useState(Number(localStorage.getItem("id")) || 0);
  const [ttlc, setTtlc] = useState(0);
  const [ttld, setTtld] = useState(0);

  let hndldate = (e) => { setDate(e.target.value) }
  let hndlnote = (e) => { setNote(e.target.value) }
  let hndlcredit = (e) => { setCredt(e.target.value) }

  localStorage.setItem("id", id)

  const [ddate, setDdate] = useState(0);
  const [dnote, setDnote] = useState(0);
  const [debt, setDebt] = useState(0);
  const [dshow, setdShow] = useState(false);
  const handledClose = () => setdShow(false);
  const handledShow = () => setdShow(true);

  let hndlddate = (e) => { setDdate(e.target.value) }
  let hndldnote = (e) => { setDnote(e.target.value) }
  let hndldebt = (e) => { setDebt(e.target.value) }

  const [data, setData] = useState([]);
  const [opbl, setOpbl] = useState(0)

  let opbal = () => {
    axios.get("https://codingshika.com/APP/EXP/opbal_list.php?uid=" + id)
      .then(res => {
        if (res.data.posts.status == 200) {
          setOpbl(res.data.posts.post[0]['OPBAL'])
        }
      })
  }

  let trans = () => {
    axios.get("https://codingshika.com/APP/EXP/transaction_list.php?uid=" + id)
      .then(res => {
        if (res.data.posts.status == 200) {
          setData(res.data.posts.post)

          const totalc = res.data.posts.post.reduce(
            (sum, item) => sum + Number(item.CREDIT), 0
          );
          setTtlc(totalc)

          const totald = res.data.posts.post.reduce(
            (sum, item) => sum + Number(item.DEBIT), 0
          );
          setTtld(totald)
        }
      })
  }

  let credit = () => {
    axios.post("https://codingshika.com/APP/EXP/insert_credit.php?&date=" + date + "&credit=" + credt + "&note=" + note + "&debit=" + val + "&uid=" + id)
      .then(res => {
        if (res.data.posts.status == "200") {
          opbal()
          trans()
          setShow(false)
        }
      })
  }

  let debit = () => {
    axios.post("https://codingshika.com/APP/EXP/insert_debit.php?&date=" + ddate + "&debit=" + debt + "&note=" + dnote + "&credit=" + val + "&uid=" + id)
      .then(res => {
        if (res.data.posts.status == "200") {
          opbal()
          trans()
          setdShow(false)
        }
      })
  }

  useEffect(() => {
    opbal()
    trans()
  }, [])

  return (
    <>
      {/* -------- PREMIUM NAVBAR -------- */}
      <Navbar expand="lg" className="px-4 fintech-navbar">
        <Navbar.Brand className="fw-bold text-white">
          💳 Finance Dashboard
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* -------- CREDIT MODAL -------- */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="modal-modern">
          <Modal.Title>💰 Add Credit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="date" onChange={hndldate} className="mb-3 input-modern" />
          <Form.Control type="number" onChange={hndlcredit} placeholder="Enter Credit Amount" className="mb-3 input-modern" />
          <Form.Control type="text" onChange={hndlnote} placeholder="Note" className="input-modern" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button className="btn-credit" onClick={credit}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* -------- DEBIT MODAL -------- */}
      <Modal show={dshow} onHide={handledClose} centered>
        <Modal.Header closeButton className="modal-modern">
          <Modal.Title>💸 Add Debit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="date" onChange={hndlddate} className="mb-3 input-modern" />
          <Form.Control type="number" onChange={hndldebt} placeholder="Enter Debit Amount" className="mb-3 input-modern" />
          <Form.Control type="text" onChange={hndldnote} placeholder="Note" className="input-modern" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handledClose}>Close</Button>
          <Button className="btn-debit" onClick={debit}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* -------- DASHBOARD CONTENT -------- */}
      <Container className="mt-4">

        <h4 className="mb-4 fw-bold">
          👋 Welcome, {localStorage.getItem("nm")}
        </h4>

        <Row className="mb-4">

          <Col md={6}>
            <Card className="balance-card">
              <h5>🏦 Current Balance</h5>
              <h2>₹ {opbl}</h2>
              <small>Account Holder: {localStorage.getItem("nm")}</small>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="summary-card text-center">
              <h6>📈 Total Credit</h6>
              <h4 className="text-success">₹ {ttlc}</h4>
              <Button className="btn-credit mt-2" onClick={handleShow}>
                + Add Credit
              </Button>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="summary-card text-center">
              <h6>📉 Total Debit</h6>
              <h4 className="text-danger">₹ {ttld}</h4>
              <Button className="btn-debit mt-2" onClick={handledShow}>
                + Add Debit
              </Button>
            </Card>
          </Col>

        </Row>

        <Row>
          <Col>
            <Card className="p-3 shadow-sm table-card">
              <h5 className="mb-3">🧾 Transaction History</h5>

              <Table hover responsive className="text-center align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Note</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((value) => (
                    <tr key={value.T_ID}>
                      <td>{value.T_ID}</td>
                      <td>{value.DATE}</td>
                      <td>{value.NOTE}</td>
                      <td className="text-danger">₹ {value.DEBIT}</td>
                      <td className="text-success">₹ {value.CREDIT}</td>
                      <td>₹ {value.CLBAL}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

            </Card>
          </Col>
        </Row>

      </Container>

      {/* -------- INTERNAL CSS -------- */}
      <style>{`
        .fintech-navbar {
          background: linear-gradient(135deg,#0f2027,#203a43,#2c5364);
        }

        .logout-btn {
          background: linear-gradient(45deg,#ff512f,#dd2476);
          border: none;
          color: white;
        }

        .balance-card {
          padding: 30px;
          border-radius: 20px;
          color: white;
          background: linear-gradient(135deg,#1e3c72,#2a5298);
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }

        .summary-card {
          padding: 20px;
          border-radius: 20px;
          box-shadow: 0 6px 15px rgba(0,0,0,0.15);
          transition: 0.3s;
        }

        .summary-card:hover {
          transform: translateY(-5px);
        }

        .btn-credit {
          background: linear-gradient(45deg,#00b09b,#96c93d);
          border: none;
          color: white;
        }

        .btn-debit {
          background: linear-gradient(45deg,#ff416c,#ff4b2b);
          border: none;
          color: white;
        }

        .modal-modern {
          background: #203a43;
          color: white;
        }

        .input-modern {
          border-radius: 10px;
        }

        .table-card {
          border-radius: 20px;
        }
      `}</style>
    </>
  );
}