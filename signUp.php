<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
include 'database.php'; //include database connection file

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];
    $phoneNumber = $_POST['phoneNumber'];

    //check if passwords match
    if ($password !== $confirmPassword) {
        echo json_encode(['status' => 'error', 'message' => 'Passwords do not match.']);
        exit();
    }

    //hash password
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    //check if email is already registered
    $stmt = $conn->prepare("SELECT * FROM information WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(['status' => 'error', 'message' => 'Email is already registered.']);
    } else {
        //insert new user into the database
        $stmt = $conn->prepare("INSERT INTO information (firstName, lastName, email, password, phoneNumber) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $firstName, $lastName, $email, $hashedPassword, $phoneNumber);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error: ' . $stmt->error]);
        }
    }
}
