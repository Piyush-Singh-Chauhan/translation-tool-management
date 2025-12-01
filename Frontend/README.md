# Translation Management Tool (TMT) - Frontend

A modern React-based frontend for managing translations with authentication and CRUD operations.

## Features

### Authentication
- **Login Page** with email and password validation
- **Register Page** with name, email, and password fields
- **Enterprise-level field validations**:
  - Email: RFC 5322 standard validation
  - Password: Min 8 chars, uppercase, lowercase, number, special character
  - Name: Min 2 chars, alphabets only
  - Real-time validation feedback
  
### Dashboard
- Overview of total translations
- Quick stats display
- Navigation to translation management features
- Supported languages display (English, Hindi, Spanish, French)

### Translation Management
- **Add Translation**: Create translation keys with auto-generated translations
- **View Translations**: Browse all translations with search functionality
- **Edit Translation**: Update individual language translations
- **Search**: Real-time search by translation key

### Additional Features
- Protected routes with authentication
- Toast notifications for user feedback
- Responsive design
- Modern UI with gradient effects
- Loading states and error handling

## Tech Stack

- **React 18+**
- **Vite** - Build tool
- **React Router v6** - Routing
- **Axios** - API calls
- **React Toastify** - Notifications
- **Context API** - State management

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will run on `http://localhost:5173/`

## Project Structure

```
Frontend/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Auth.css
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Dashboard.css
│   │   ├── Translation/
│   │   │   ├── AddTranslation.jsx
│   │   │   ├── ViewTranslations.jsx
│   │   │   ├── EditTranslation.jsx
│   │   │   └── Translation.css
│   │   └── Layout/
│   │       ├── Navbar.jsx
│   │       ├── Navbar.css
│   │       └── PrivateRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   ├── authService.js (Mock auth)
│   │   └── translationService.js
│   ├── utils/
│   │   └── validation.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── package.json
```

## Usage

### Register New User
1. Navigate to `/register`
2. Fill in name, email, and password
3. All fields have real-time validation
4. Click "Sign Up" when all validations pass

### Login
1. Navigate to `/login`
2. Enter registered email and password
3. Click "Login" to access dashboard

### Add Translation
1. Go to Dashboard and click "Add Translation"
2. Enter translation key (e.g., `welcome_message`)
3. Enter English text
4. Auto-translations will be generated for Hindi, Spanish, and French
5. Click "Add Translation"

### View & Search Translations
1. Click "View Translations" from navbar or dashboard
2. Use search box to filter by translation key
3. View all language translations for each key
4. Click "Edit" to modify translations

### Edit Translation
1. From View Translations, click "Edit" on any translation
2. Modify any language translation
3. Click "Update Translation" to save changes

## Validation Rules

### Name
- Required
- Minimum 2 characters
- Maximum 50 characters
- Only letters, spaces, hyphens, and apostrophes

### Email
- Required
- Valid RFC 5322 email format
- Maximum 254 characters

### Password
- Required
- Minimum 8 characters
- At least one lowercase letter
- At least one uppercase letter
- At least one number
- At least one special character

### Translation Key
- Required
- Minimum 2 characters
- Only letters, numbers, underscores, dots, and hyphens

## API Integration

The frontend connects to the backend at `http://localhost:8080/api/translations`

**Note**: Authentication is mock-based (using localStorage) since the backend doesn't have auth endpoints.

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` folder.

## Notes

- Make sure the backend server is running on `http://localhost:8080`
- Mock authentication stores user data in localStorage
- All validations are enterprise-grade with real-time feedback
