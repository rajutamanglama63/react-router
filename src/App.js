import {
  Container,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useState } from "react";
// import { Button, Table } from "react-bootstrap";
import {
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  useMatch,
} from "react-router-dom";
import { useField } from "./hooks";
const Home = () => (
  <div>
    <h2>TKTL notes app</h2>{" "}
  </div>
);

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {notes.map((note) => (
            <TableRow key={note.id}>
              <TableCell>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
              </TableCell>
              <TableCell>{note.user}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);
const Note = ({ note }) => {
  console.log(note);
  // const id = useParams().id;
  // const note = notes.find((n) => n.id === Number(id));
  return (
    <div>
      <h2>Notes</h2>
      <div>
        <h2>{note.content}</h2>
        <div>{note.user}</div>
        <div>
          <strong>{note.important ? "important" : ""}</strong>
        </div>
      </div>
    </div>
  );
};

const Users = () => (
  <div>
    <h2>Users</h2>{" "}
  </div>
);

const Login = (props) => {
  const navigate = useNavigate();

  const username = useField("text");
  const pswd = useField("password");
  const resetBtn = () => {
    username.clear();
    pswd.clear();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    props.onLogin(username.value);
    navigate("/");
  };

  return (
    <div>
      <h2>login</h2>
      {/* <form onSubmit={onSubmit}>
        <div>
          username:{" "}
          <TextField
            label="username"
            type={username.type}
            value={username.value}
            onChange={username.onChangeHandler}
          />
        </div>
        <div>
          password:{" "}
          <TextField
            label="password"
            type={pswd.type}
            value={pswd.value}
            onChange={pswd.onChangeHandler}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          login
        </Button>
      </form> */}

      <form onSubmit={onSubmit}>
        <div>
          <TextField
            label="username"
            type={username.type}
            value={username.value}
            onChange={username.onChangeHandler}
          />
        </div>
        <div>
          <TextField
            label="password"
            type={pswd.type}
            value={pswd.value}
            onChange={pswd.onChangeHandler}
          />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            login
          </Button>
        </div>
      </form>
      {/* <button onClick={() => resetBtn()}>reset</button> */}
      <Button variant="contained" color="secondary" onClick={() => resetBtn()}>
        reset
      </Button>
    </div>
  );
};

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: "HTML is easy",
      important: true,
      user: "Matti Luukkainen",
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false,
      user: "Matti Luukkainen",
    },
    {
      id: 3,
      content: "Most important methods of HTTP-protocol are GET and POST",
      important: true,
      user: "Arto Hellas",
    },
  ]);

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  const padding = {
    padding: 5,
  };

  const match = useMatch("/notes/:id");

  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null;

  return (
    <div>
      <Container>
        {message && <Alert severity="success">{message}</Alert>}
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/notes">
          notes
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {user ? (
          <em>{user} logged in</em>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}

        <Routes>
          <Route path="/notes/:id" element={<Note note={note} />} />

          <Route path="/notes" element={<Notes notes={notes} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={login} />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
