import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const UpdateProfileView = ({ token, user }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday?.split('T')[0]);

  const handleSubmit = (event) => {
    event.preventDefault();


    const data = {};

    if (username) {
      data.Username = username;
    }

    if (password) {
      data.Password = password;
    }

    if (email) {
      data.Email = email;
    }

    if (birthday) {
      data.Birthday = birthday;
    }

    fetch(`https://supercoolmovieapi.herokuapp.com/users/${encodeURIComponent(user.Username)}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("Updated Profile Successfully");
          window.location.reload();
        } else {
          alert("Update Failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Update Failed");
      });
  };
  

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
          minLength="5"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          autoComplete="off"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Update Profile
      </Button>
    </Form>
  );
};
