# IpBased Attendance System and Auth and Authorization on the basis of the permissions

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)

# Description
This project is a Node.js-based API that provides various functionalities for user management, authentication, and an ip session based attendance system.
# Features
**1.User Management**: The API includes a super user who has the authority to create new users. Upon user creation, a password is generated for the user, along with their assigned permissions. This allows users to have controlled access to different parts of the system.

**2.User Authentication:** Once users are created, they can log in using their credentials. The API verifies the login information and grants access to the authenticated user.

**3.Product Manipulation:** After logging in, users have the ability to manipulate the product model. This includes adding, modifying, and deleting products based on their permissions. Users can perform various operations on the product model through the API endpoints.

**4.Attendance System:** The project also incorporates an attendance system. When a user logs in, their session starts automatically based on their IP address. The API retrieves the user's location information using the IP address. When the user logs out, the system records the duration of their session and stores it as their attendance outcome.

**5.Daily Attendance Record:** The API maintains a daily attendance record for each user, tracking the amount of time they spent on the system. This record can be accessed to monitor and analyze user activity on a daily basis.

## Requirements
- Node.js (version 18.13.0)
- npm (version 8.19.3)
- Postgresql Sequelize Orm (version 14.8) 

## Installation

**1.Clone the repository:** git clone https://github.com/obaidurrehman123/Auth_And_Autherization.git

**2.Install the dependencies:** npm install

**3.Set up the environment variables:** Open the `.env` file and configure the necessary variables such as database connection details, API keys, etc.

**4.Run the application:** npm run server

## Usage

1. Credential of logged in as an admin are you can edit in the config file present in the config folder.

2. Then you can create the user and give them the permissions can explore the permissions model and user model for it.

3. When the user will logged in to the system his ip shall get and start its attendance session on the basis of ip local and when he logout his session and we have maintained the hours what are the minimum hours he has spent in the office and mark attendance accordingly.



   












