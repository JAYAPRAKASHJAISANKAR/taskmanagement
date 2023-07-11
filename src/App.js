// App.js
import React, { useState, useEffect } from "react";
import { auth, firestore } from "./firebase";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import Signup from "./Signup";
import Signin from "./Signin";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchTasks(user.uid);
      } else {
        setUser(null);
        setTasks([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchTasks = (userId) => {
    const tasksRef = firestore.collection("tasks");
    tasksRef
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        const fetchedTasks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(fetchedTasks);
      })
      .catch((error) => {
        console.log("Failed to fetch tasks:", error.message);
        console.log("Please check your internet connection and try again.");
      });
  };

  const handleSignup = (email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        console.log("Signup:", user.email);
        fetchTasks(user.uid);
      })
      .catch((error) => {
        console.log("Signup error:", error.message);
      });
  };

  const handleSignin = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        console.log("Signin:", user.email);
        fetchTasks(user.uid);
      })
      .catch((error) => {
        console.log("Signin error:", error.message);
      });
  };

  const handleSignout = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
        setTasks([]);
        console.log("Signed out");
      })
      .catch((error) => {
        console.log("Signout error:", error.message);
      });
  };

  const addTask = (task) => {
    const newTask = {
      ...task,
      userId: user.uid,
      createdAt: new Date(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]); // Update tasks state optimistically

    firestore
      .collection("tasks")
      .add(newTask)
      .then((docRef) => {
        console.log("Task added successfully");
        // Task added to Firestore, no further action needed
      })
      .catch((error) => {
        console.log("Add task error:", error.message);
        // Revert the optimistic update in case of an error
        setTasks((prevTasks) => prevTasks.filter((task) => task !== newTask));
      });
  };

  const deleteTask = (taskId) => {
    firestore
      .collection("tasks")
      .doc(taskId)
      .delete()
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => {
        console.log("Delete task error:", error.message);
      });
  };

  return (
    <div>
      <h1>Task Management Application</h1>
      {user ? (
        <>
          <p>Welcome, {user.email}!</p>
          <button onClick={handleSignout}>Sign Out</button>
          <TaskForm addTask={addTask} />
          <TaskList tasks={tasks} deleteTask={deleteTask} />
        </>
      ) : (
        <>
          <Signup handleSignup={handleSignup} />
          <Signin handleSignin={handleSignin} />
        </>
      )}
    </div>
  );
};

export default App;
