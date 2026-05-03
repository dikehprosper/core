
# Job Board Frontend

A fast starter kit for authentication and user management, built with React. This APP is designed for developers who want to quickly set up a secure frontend without writing everything from scratch. Just clone, install, and add your own features!

## Features

- User authentication (register, login, password reset)
- Browse, search, and view job listings
- Apply for the jobs
- Responsive dashboard for viewing applied jobs
- Light/dark theme toggle
- Protected routes for authenticated users

## Tech Stack

- React 19
- React Router DOM
- Axios (API requests)
- Context API (theme management)
- CSS Modules

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm

### Installation
1. Clone the repository:
	```bash
	git clone <repo-url>
	cd core
	```
2. Install dependencies:
	```bash
	npm install
	```
3. Set up environment variables:
	- Create a `.env` file in the root directory.
	- Add your backend API URL:
	  ```env
	  REACT_APP_API_URL=http://localhost:5000/api
	  ```

### Running the App
```bash
npm start
```
The app will run at [http://localhost:3000](http://localhost:3000).

### Running Tests
```bash
npm test
```

## Folder Structure

```
src/
  api/            # Axios API setup
  components/     # Reusable UI components
  context/        # React context (theme)
  pages/          # Main app pages (Dashboard, Auth, etc.)
  styles/         # CSS files
  utils/          # Helper functions
```

## Environment Variables

- `REACT_APP_API_URL`: Base URL for the backend API

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your branch and open a Pull Request

## License

This project is licensed under the MIT License.
