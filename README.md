# Playdates

Playdates is an application for dog walking, sitting, and boarding on the Upper East Side of New York City. Users can schedule playdates for their dogs with Ella and Lily, their new best friends.

## Built By
Ella Freudenberger

## Tech Stack

### Frontend
- React
- Bootstrap

### Backend
- Node
- Express

### Database
- MongoDB

### Node Modules
- dotenv
- mongoose
- express
- body-parser
- bcrypt
- cors
- react, react-dom
- date-fns, react-big-calendar
- antd


### Design Packages
- React Big Calendar
- Ant Design

## Features

### Create (C):

#### Registration
- Endpoint: `/register`
- Description: Allows the registration of a new user and stores user information in the MongoDB database.

#### Admin Login
- Endpoint: `/adminlogin`
- Description: Allows logging in as an admin and creates a session upon successful login.

#### New Booking
- Endpoint: `/bookings` (POST)
- Description: Adds a new booking and saves the booking details to the database.

### Read (R):

#### User Data
- Endpoint: `/admin/users`
- Description: Retrieves user data to display user information.

#### All Bookings
- Endpoint: `/admin/savedbookings`
- Description: Retrieves all bookings to display booking information.

#### Fetch Bookings
- Endpoint: `/bookings` (GET)
- Description: Fetches all bookings from the database to later filter out already booked dates in the calendar.

### Update (U):

### Edit Bookings (Coming Soon)
-Endpoint: `/admin/savedbookings`
-Description: Updates bookings and edits their information. 

### Delete (D):

### Delete Bookings
-Endpoint: `/admin/savedbookings`
-Description: Deletes bookings and removes them from the database. 


