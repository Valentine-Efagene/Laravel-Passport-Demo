import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Button, Modal, Spinner, Form, Table, Alert } from "react-bootstrap";
import Axios from "axios";
import { isEmpty } from "lodash";
//import { isEmpty } from "lodash";

function Passport(props) {
    const [creationData, setCreationData] = useState(null);
    const [showCreationForm, setShowCreationForm] = useState(false);
    const [creating, setCreating] = useState(false);

    const [editData, setEditData] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [updating, setUpdating] = useState(false);

    const [spin, setSpin] = useState(false);
    const [clients, setClients] = useState([]);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        loadClients();
    }, []);

    const closeCreationForm = () => {
        setShowCreationForm(false);
    };

    const closeEditForm = () => {
        setShowEditForm(false);
    };

    const handleCreationDataChange = (event) => {
        const { name, value } = event.target;
        setCreationData({ ...creationData, [name]: value });
    };

    const handleEditDataChange = (event) => {
        const { name, value } = event.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleCreate = async (event) => {
        event.preventDefault();
        const { name, redirect } = creationData;
        createClient(name, redirect);
    };

    const handleEdit = async (event) => {
        event.preventDefault();
        updateClient();
    };

    const createClient = async (name, redirect) => {
        setCreating(true);

        try {
            let response = await Axios.post("/oauth/clients/", {
                name,
                redirect,
            });
            loadClients();
        } catch (error) {
            // console.log(error)
            setShowError(true);
        } finally {
            setCreating(false);
            setShowCreationForm(false);
        }
    };

    const updateClient = async () => {
        setUpdating(true);
        const { id, name, redirect } = editData;

        try {
            let response = await Axios.put("/oauth/clients/" + id, {
                name,
                redirect,
            });

            loadClients();
        } catch (error) {
            console.log(error);
            setShowError(true);
        } finally {
            setUpdating(false);
            setShowEditForm(false);
        }
    };

    const showCreationModal = () => {
        setShowCreationForm(true);
    };

    const showEditModal = (index) => {
        setEditData(clients[index]);
        setShowEditForm(true);
    };

    const loadClients = async () => {
        setSpin(true);

        try {
            var response = await Axios.get("/oauth/clients/");
            setClients(response ? response?.data : []);
            console.log("Clients:");
            console.log(clients);
        } catch (error) {
            // console.log(error)
            setShowError(true);
        } finally {
            setSpin(false);
        }
    };

    return (
        <>
            <Button onClick={loadClients} variant="primary">
                <Spinner
                    as="span"
                    hidden={!spin}
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                <span>Load Clients</span>
            </Button>
            <br />
            <br />
            <Button onClick={showCreationModal} variant="primary">
                <Spinner
                    as="span"
                    hidden={!creating}
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                <span>Create Client</span>
            </Button>
            <br />
            <br />
            <Modal show={showCreationForm} onHide={closeCreationForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Client</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCreate}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                required
                                value={creationData?.name}
                                onChange={handleCreationDataChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Redirect</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                name="redirect"
                                value={creationData?.redirect}
                                onChange={handleCreationDataChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create Client
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Spinner
                        animation="border"
                        role="status"
                        variant="info"
                        hidden={!spin}
                    />
                    <span className="sr-only">Loading...</span>
                </Modal.Footer>
            </Modal>
            <br />
            <br />

            <Modal show={showEditForm} onHide={closeEditForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Client</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEdit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                required
                                value={editData?.name}
                                onChange={handleEditDataChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Redirect</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                name="redirect"
                                value={editData?.redirect}
                                onChange={handleEditDataChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Update Client
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Spinner
                        animation="border"
                        role="status"
                        variant="info"
                        hidden={!updating}
                    />
                    <span className="sr-only">Loading...</span>
                </Modal.Footer>
            </Modal>
            <br />
            <br />
            <h3>Clients</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Client ID</th>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Redirect</th>
                        <th>Secret</th>
                        <th>Revoked</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Password Client</th>
                        <th>Personal Access Client</th>
                        <th>Provider</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {clients?.map((client, index) => {
                        return (
                            <tr key={index}>
                                <td>{client?.id}</td>
                                <td>{client?.user_id}</td>
                                <td>{client?.name}</td>
                                <td>{client?.redirect}</td>
                                <td>{client?.secret}</td>
                                <td>{client?.revoked.toString()}</td>
                                <td>{client?.created_at}</td>
                                <td>{client?.updated_at}</td>
                                <td>{client?.password_client.toString()}</td>
                                <td>
                                    {client?.personal_access_client.toString()}
                                </td>
                                <td>
                                    {client?.provider
                                        ? client?.provider
                                        : "NULL"}
                                </td>
                                <td>
                                    <Button
                                        onClick={() => {
                                            showEditModal(index);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}

export default Passport;

if (document.getElementById("passport")) {
    ReactDOM.render(<Passport />, document.getElementById("passport"));
}
