# Fullstack Hotel Booking rooms management app

This is a Fullstack hotel booking room app built with React and Bootstrap for the frontend, Springboot for the backend,MySQL for the database and Docker for containerization.

## Technology stack

- **Docker**
  <img src="https://icon-icons.com/icons2/2699/PNG/512/docker_official_logo_icon_169250.png" width="124px" height="124px">

- **React**
  <img src="https://upload.wikimedia.org/wikipedia/he/a/a7/React-icon.svg" width="124px" height="124px">

- **Vite**
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ypcSFB8vFNdXYDW4BdzHMH8Bs755Ph2OPGLMsZ4EfH8Y6OQpQuicat_OAqMHyMQYhVc&usqp=CAU" width="124px" height="124px">

- **Bootstrap**
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxEoQrNMALbwi0rJiuhscTDe6NZAkOmcVXhmbwKtkEoBCtKFrF5t0-oyypsn8uTCqXY5s&usqp=CAU" width="124px" height="124px">

- **VSCODE**
  <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" width="60px" height="60px">

- **Intelij IDEA**
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS7XtqSZkQgJKLNMq0Cqq5rGDSH3-Cr108SDYiKfdIqFqIGd9a9stz23NEz9BY9IBO1gA&usqp=CAU" width="60px" height="60px">

- **Springboot**
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7UaM26lbsPblqcbS0E8HD9stqpaNw-UFsDq6dOJP-101C4VSlhp_4XCPrJGubnbl4EE&usqp=CAU" width="224px" height="124px">

- **MySQL**
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj4xrCpljV3HbK4AOO8nYF9K9QQShugnOb32mQAUqtF7t3w2g6qJbeWXhUO2LX79qCe9c&usqp=CAU" width="224px" height="224px">

- **JWT (JSON Web Tokens)**
  <img src = "https://cdn.worldvectorlogo.com/logos/jwt-3.svg" width = "60px" height = "60px">

## Project structure

<a href="https://ibb.co/T0KfKkZ"><img src="https://i.ibb.co/8xzCz0J/Hotel-booking-management-System-arch-drawio.png" alt="Hotel-booking-management-System-arch-drawio" border="1"></a>

## Installation and Setup

<b>Clone the repository git clone https://github.com/roy845/Fullstack-Instagram-Clone.git</b>

### Client

<b>Install the dependencies and start the client</b>

1. Open a new terminal in VSCODE.
2. Navigate to the frontend directory: cd frontend.
3. Install dependencies: npm/yarn install.
4. Run the client: npm/yarn start.

### Server

<b>Prerequisites</b>
In mysql workbench create database with the name: lakeSide_hotel_db

<b>Install intelij ide and start the server</b>

1. Open Intelij IDE.
2. Navigate to the server directory: cd backend.
3. Click on the green play button at the navbar or Shift+ F10 to start the server.

<b>Run in docker environment</b>
Make sure Docker desktop is running and then Move to the terminal tab found at the bottom of the screen in intelij ide.

Type the command <strong>docker-compose up -d</strong> and it should run both the server and the mysql database.

If there's an error open cmd (command prompt) in administrator privilages and type the command:
<strong>netstat -ano | find 3306</strong>

And find the process id that belongs to this port

Type taskkill /F /PID pid_of_the_process_to_kill to kill the process id. replace pid_of_the_process_to_kill with the process id found with the command <strong>netstat -ano | find 3306</strong>.

Once they up and running we need to configure the role table in the database.

run the command
<strong>docker exec -it <your_container_name></strong> /bin/bash
replace your_container_name with: mysql-db

And then type the command <strong>mysql -u root -p</strong> to connect to the mysql db via the shell and enter the password: <strong>admin</strong>

Enter the following command to select your database:
USE lakeSide_hotel_db;
and press Enter.

Enter the following command to Insert values to the role table and press Enter:
<strong>INSERT INTO role (name) VALUES ("ROLE_USER");</strong>

Now you can naviagte to localhost:9192 in your browser and use the application.

## Features

- <b>User Authentication</b>
  Users can sign up, log in, and log out securely using jwt authentication system and also reset their password

<br/>

- <b>Login</b>
  <a href="https://ibb.co/YD8yK8q"><img src="https://i.ibb.co/TKRbnRF/Login.png" alt="Login" border="1"></a>

- <b>Register</b>
  <a href="https://ibb.co/CJf0qGk"><img src="https://i.ibb.co/FsF79TS/Register.png" alt="Register" border="1"></a>

- <b>Forgot password</b>
  <a href="https://ibb.co/6P7qkfD"><img src="https://i.ibb.co/1qt4kwR/Forgot-Password.png" alt="Forgot-Password" border="1"></a>

- <b>Reset Password</b>
  <a href="https://ibb.co/GVDL4P7"><img src="https://i.ibb.co/CnyZ30B/Reset-Password.png" alt="Reset-Password" border="1"></a>

- <b>Main screen</b>
  Once the user is logged in he/she will navigate to the main page of the application

<a href="https://ibb.co/9ynMdSp"><img src="https://i.ibb.co/TPcCNdw/Main.png" alt="Main" border="1"></a>

- <b>Menu navigation</b>
  In this section the user can navigate to it's user profile or logout from the system. Once logged out he/she will navigate to the login screen.
  <a href="https://imgbb.com/"><img src="https://i.ibb.co/bRVf2wt/Menu-navigation.png" alt="Menu-navigation" border="1"></a>

- <b>Rooms availability</b>
  In this section the user can check Rooms availability for booking and also filter them by room type and clear the filter.

  <a href='https://postimg.cc/dLhrzGVQ' target='_blank'><img src='https://i.postimg.cc/4N5PH5Cc/available-rooms-for-booking.png' border="1" alt='available-rooms-for-booking'/></a>

- <b>Browse rooms</b>
  In this section the user can view all the rooms available in the hotel and can book each room if it available in the selected dates.
  Also he/she can filter rooms by room type and clear the filter to show again all the rooms available.
  <a href="https://ibb.co/NydbvvZ"><img src="https://i.ibb.co/2k1H99g/Browse-rooms.png" alt="Browse-rooms" border="1"></a>

- <b>Filtered rooms by room type</b>
  <a href="https://ibb.co/56Kg0DG"><img src="https://i.ibb.co/FKHLrvm/Filtered-rooms-by-type.png" alt="Filtered-rooms-by-type" border="1"></a>

- <b>Book room</b>
  In this section the user need to select the dates period he/she wants to book the room and the number of guests (children and adults) that will arrive.
  <a href="https://ibb.co/gVPQbdF"><img src="https://i.ibb.co/pyRN6Qr/Book-room.png" alt="Book-room" border="1"></a>

- <b>Book room summary</b>
  Once clicked on continue a short summary about the reservation will display.
  The name,email,check-in-date,check-out-date,number days of reservation and the number of guests and the total Payment to pay for the room reservation.
  <a href="https://ibb.co/CB6yw6K"><img src="https://i.ibb.co/H7CyKCT/Book-room-summary.png" alt="Book-room-summary" border="1"></a>

- <b>Book room success</b>
  After approving the room booking the user will navigate to this screen and he/she will gets a booking confirmation code.
  <a href="https://ibb.co/smCY4Ft"><img src="https://i.ibb.co/ngBJyDR/Booking-success.png" alt="Booking-success" border="1"></a>

- <b>find my booking/reservation</b>
  In this section the user can search it's booking by the confirmation code he/she gets in the previous step
  <a href="https://ibb.co/QDG6dgr"><img src="https://i.ibb.co/RjWCyFz/Find-my-booking.png" alt="Find-my-booking" border="1"></a>

- <a href="https://ibb.co/xY48dFZ"><img src="https://i.ibb.co/gdnFh4Y/Find-my-booking2.png" alt="Find-my-booking2" border="1"></a>

- <b>Delete booking</b>
  The user can delete it's reservation at any time by clicking on the Cancel Booking button
  <a href="https://ibb.co/GQ3hkgp"><img src="https://i.ibb.co/qYFZ9bj/Delete-booking.png" alt="Delete-booking" border="1"></a>

- <b>User Profile</b>
  In this section the user can view/update it's details: FirstName,LastName,Password.
  And also view it's booking history.
  Lastly he/she can delete their account.
  <a href="https://ibb.co/cc1W3SH"><img src="https://i.ibb.co/6RmKw7x/Profile.png" alt="Profile" border="1"></a>

- <b>Delete User</b>
  <a href="https://ibb.co/gMM0fkL"><img src="https://i.ibb.co/cccWZ4S/Delete-user.png" alt="Delete-user" border="1"></a>

- <b>Admin Panel</b>
  In this section the user (only if he/she defined with ROLE_ADMIN by the administrator) can Manage Rooms,Manage bookings,Manage Roles,Assign Roles to users, Delete Roles from users and Delete all users from specific role.

  <a href='https://postimg.cc/w3pdpDJQ' target='_blank'><img src='https://i.postimg.cc/ZY9Y6c52/Admin-panel.png' border="1" alt='Admin-panel'/></a>

- <b>Manage rooms</b>
  In this section the admin can view/filter all rooms by room type and can add new rooms
  <a href='https://postimg.cc/dhyLf8Gc' target='_blank'><img src='https://i.postimg.cc/8zyMj45c/Manage-rooms.png' border="1" alt='Manage-rooms'/></a>

- <b>Filtered rooms</b>
  <a href='https://postimg.cc/gxZHKLJn' target='_blank'><img src='https://i.postimg.cc/rwhZMS2C/Filtered-rooms-by-room-type-admin.png' border="1" alt='Filtered-rooms-by-room-type-admin'/></a>

- <b>View/Update room details</b>
  In this section the admin can view the details of specific room or update it's details (Room type,Room price and room photo). in the room type section he/she can add new room to the list of room types.
  <a href='https://postimg.cc/dDFNVYBz' target='_blank'><img src='https://i.postimg.cc/ZYBGjYyK/Room-view-update.png' border="1"  alt='Room-view-update'/></a>

- <b>Delete room</b>
  In this section the admin can delete the room.
  <a href='https://postimg.cc/QB1tS5vY' target='_blank'><img src='https://i.postimg.cc/XvDCjkLW/Delete-room.png' border="1"  alt='Delete-room'/></a>

- <b>Add new room</b>
  In this section the admin can add new room and also add new room type to the list of room types.
  <a href='https://postimg.cc/yk3t5PYP' target='_blank'><img src='https://i.postimg.cc/9FL2D86v/Add-new-room.png' border="1" alt='Add-new-room'/></a>

- <b>Manage bookings</b>
  In this section the admin can view all the bookings made by the different users and also filter and cancel them.
  <a href='https://postimg.cc/K3gPxQz7' target='_blank'><img src='https://i.postimg.cc/zvx0wcYQ/Manage-bookings.png' border="1" alt='Manage-bookings'/></a>

- <b>Cancel booking</b>
  <a href='https://postimg.cc/T56Wrx0S' target='_blank'><img src='https://i.postimg.cc/cCKMG4ns/Cancel-booking.png' border="1" alt='Cancel-booking'/></a>

- <b>Manage roles</b>
  In this section the admin can view all roles available on the system, delete specific role and add new role.
  <a href='https://postimg.cc/gwGMz93Y' target='_blank'><img src='https://i.postimg.cc/vmVCvbB6/Manage-roles.png' border="1" alt='Manage-roles'/></a>

- <b>Add role</b>
  In this section the admin can add new role to the list of roles. the role must eneterd with all lower case or all upper case letters.
  <a href='https://postimg.cc/rzhDV7tq' target='_blank'><img src='https://i.postimg.cc/J48ZqLrH/Add-role.png' border="1" alt='Add-role'/></a>

- <b>Delete role</b>
  In this section the admin can delete specific role form the list of roles.
  <a href='https://postimg.cc/1fdX16VB' target='_blank'><img src='https://i.postimg.cc/bwytb9z7/Delete-role.png' border="1" alt='Delete-role'/></a>

- <b>Assign user to role</b>
  In this section the admin can assign users to specific roles.
  <a href='https://postimg.cc/f3Cp97sQ' target='_blank'><img src='https://i.postimg.cc/ydCH2nrx/Assign-user-to-role.png' border="1" alt='Assign-user-to-role'/></a>

- <b>Remove user from role</b>
  In this section the admin can remove role from specific user.
  <a href='https://postimg.cc/WFTD9khn' target='_blank'><img src='https://i.postimg.cc/Y9m1CN7J/Delete-role-from-user.png' border="1" alt='Delete-role-from-user'/></a>

- <b>Remove all users from role</b>
  In this section the admin can remove role from all users.
  <a href='https://postimg.cc/8s3vGs31' target='_blank'><img src='https://i.postimg.cc/7YPng2nT/Remove-all-users-from-role.png' border="1" alt='Remove-all-users-from-role'/></a>
