import React, { useState, useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import AnimationWrapper from "../common/page-animation";
import { theme } from "../itemsMui/thomeMui";
import { GetUser, UpdateUser, UpdateUserState, RemoveUser, signup } from "../function/Users.api"; // Import AddUser function
import { UserContext } from "../App";

const TableHeader = ({ headers }) => (
  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
    <tr>
      {headers.map((header, index) => (
        <th key={index} scope="col" className="px-6 py-3 truncate">
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

const TableRow = ({
  item,
  index,
  handleEdit,
  handleSaveEdit,
  handleStateChange,
  handleDelete,
  editingUser,
  setEditingUser,
  setEditedName,
  setEditedLastname,
  setEditedEmail,
}) => (
  <>
    <tr key={index} className="bg-white border-b hover:bg-gray-300">
      <td className="px-6 py-4">{index + 1}</td>
      <td className="px-6 py-4">
        <button
          onClick={() => handleEdit(item)}
          className="p-3 font-medium text-blue-600 hover:underline"
        >
          <i className="fi fi-ss-edit text-2xl"></i>
        </button>
        <button
          onClick={() => handleDelete(item.user_id)}
          className="p-3 font-medium text-red hover:underline"
        >
          <i className="fi fi-ss-delete text-2xl"></i>
        </button>
      </td>
      <td className="px-6 py-4 truncate">{item.user_name}</td>
      <td className="px-6 py-4 truncate">{item.user_lastname}</td>
      <td className="px-6 py-4 truncate">{item.user_email}</td>
      <td className="px-6 py-4 truncate">
        <select
          value={item.state}
          onChange={(e) => handleStateChange(item.user_id, e.target.value)}
          className="border rounded p-1"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
        </select>
      </td>
    </tr>
    {editingUser && editingUser.user_id === item.user_id && (
      <tr className="edit-modal border m-3 p-3 bg-gray-100">
        <td colSpan="6">
          <h2>Edit User</h2>
          <label>Name:</label>
          <input
            type="text"
            defaultValue={editingUser.user_name}
            onChange={(e) => setEditedName(e.target.value)}
            className="border rounded p-1 m-1"
          />
          <label>LastName:</label>
          <input
            type="text"
            defaultValue={editingUser.user_lastname}
            onChange={(e) => setEditedLastname(e.target.value)}
            className="border rounded p-1 m-1"
          />
          <label>Email:</label>
          <input
            type="email"
            defaultValue={editingUser.user_email}
            onChange={(e) => setEditedEmail(e.target.value)}
            className="border rounded p-1 m-1"
          />
          <button onClick={handleSaveEdit} className="p-2 bg-blue-500 text-white rounded m-1">
            Save
          </button>
          <button onClick={() => setEditingUser(null)} className="p-2 bg-gray-500 text-white rounded m-1">
            Cancel
          </button>
        </td>
      </tr>
    )}
  </>
);

const ManageUsers = () => {
  const { userAuth } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedLastname, setEditedLastname] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserLastName, setNewUserLastName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserpassword, setNewUserPassword] = useState("");
  const [open, setOpen] = useState(false);

  const loadData = async () => {
    try {
      const res = await GetUser();
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditedName(user.user_name);
    setEditedLastname(user.user_lastname);
    setEditedEmail(user.user_email);
  };

  const handleSaveEdit = async () => {
    try {
      const data = {
        user_name: editedName,
        user_lastname: editedLastname,
        user_email: editedEmail,
      };
      await UpdateUser(editingUser.user_id, data);

      // Update the user in the users array
      const updatedUsers = users.map((user) =>
        user.user_id === editingUser.user_id
          ? { ...user, user_name: editedName, user_lastname: editedLastname, user_email: editedEmail }
          : user
      );

      setUsers(updatedUsers);
      setEditingUser(null);
      toast.success("User information updated successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const handleStateChange = async (userId, newState) => {
    try {
      console.log(newState);
      console.log(userId);
      await UpdateUserState(userId, newState);
      loadData();
      toast.success("User state updated successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await RemoveUser(userId)
        .then((response) => {
          console.log(response);
          toast.success("User deleted successfully");
          loadData();
        })
        .catch((err) => {
          console.log(err);
          toast.error("User not deleted successfully");
          loadData();
        });
      // Filter out the deleted user from the users array
      const updatedUsers = users.filter((user) => user.user_id !== userId);
      setUsers(updatedUsers);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddUser = async () => {
    try {
      const data = {
        user_name: newUserName,
        user_lastname: newUserLastName,
        user_email: newUserEmail,
        user_password: newUserpassword,
      };
      console.log(data);
      await signup(data);
      loadData();
      toast.success("User added successfully");
      setNewUserName("");
      setNewUserLastName("");
      setNewUserEmail("");
      setNewUserPassword("");
      setOpen(false); // Close the modal after adding user
    } catch (err) {
      console.log(err);
    }
  };

  const headers = ["No", "Action", "Name", "LastName", "Email", "State"];

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <AnimationWrapper>
        <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
          <span className="flex justify-center items-center text-center py-4 md:text-2xl text-xl font-semibold">
            Manage Users
          </span>

          <div className="mt-4 w-full rounded-xl bg-grey px-3 md:px-10 items-center">
            <div className="flex justify-center w-full p-4">
              <button onClick={() => setOpen(true)}>Add User</button>
            </div>

            {open && (
              <div className="w-[70%] mx-auto bg-white p-4 rounded shadow-lg">
                <h2>Add New User</h2>
                <div className="mb-2">
                  <p>Name:</p>
                  <input
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    className="border rounded p-1 px-3 m-1 w-full"
                  />
                </div>
                <div className="mb-2">
                  <p>LastName:</p>
                  <input
                    type="text"
                    value={newUserLastName}
                    onChange={(e) => setNewUserLastName(e.target.value)}
                    className="border rounded p-1 px-3 m-1 w-full"
                  />
                </div>
                <div className="mb-2">
                  <p>Email:</p>
                  <input
                    type="email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    className="border rounded p-1 px-3 m-1 w-full"
                  />
                </div>
                <div className="mb-2">
                  <p>Password:</p>
                  <input
                    type="password"
                    value={newUserpassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    className="border rounded p-1 px-3 m-1 w-full"
                  />
                </div>
                <div className="flex justify-center items-center">
                  <button onClick={handleAddUser} className="p-2 bg-blue-500 text-white rounded m-1">
                    Add User
                  </button>
                  <button onClick={() => setOpen(false)} className="p-2 bg-gray-500 text-white rounded m-1">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          <table className="text-sm text-left rtl:text-right text-gray-500 mt-8 w-full">
            <TableHeader headers={headers} />
            <tbody>
              {users.length > 0 &&
                users.map((item, index) => (
                  <TableRow
                    key={item.user_id}
                    item={item}
                    index={index}
                    handleEdit={handleEdit}
                    handleSaveEdit={handleSaveEdit}
                    handleStateChange={handleStateChange}
                    handleDelete={handleDelete}
                    editingUser={editingUser}
                    setEditingUser={setEditingUser}
                    setEditedName={setEditedName}
                    setEditedLastname={setEditedLastname}
                    setEditedEmail={setEditedEmail}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </AnimationWrapper>
    </ThemeProvider>
  );
};

export default ManageUsers;
