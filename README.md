# Translation Tool Management (MERN Stack)

A Translation Management Tool built using the MERN Stack that allows users to:

- Add a translation key and an English text
- Automatically generate translations in Hindi, French, and Spanish
- Store all translations in MongoDB
- Search and edit translations
- Provide a clean UI for managing multilingual content

---

## Features

### Core Features
- Add a new translation key
- Auto-translate English text into:
  - Hindi (hi)
  - Spanish (es)
  - French (fr)
- Save translations in MongoDB
- Search translations by key
- Edit existing translations

### Additional
- Organized folder structure
- Easy to extend with more languages

---

## Folder Structure

```
translation-tool-management/
│
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   └── server.js
│   ├── package.json
│   └── .env
│
└── Frontend/
    ├── src/
    ├── public/
    ├── package.json
    └── .env (optional)
```

---

## Environment Variables

Inside Backend/.env add:

```
MONGODB_URI=your-mongodb-connection-string
DBNAME=your-database-name
PORT=5000
```

---

## How to Run the Project

### Backend Setup

```
cd Backend
npm install
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

(or the port set in the .env file)

---

### Frontend Setup

```
cd Frontend
npm install
npm run dev
```

Visit the frontend in your browser:

```
http://localhost:5173
```

---

## API Endpoints

### Add Translation
```
POST /api/translations/add
```

### Search Translation
```
GET /api/translations/search?query=your-key
```

### Update Translation
```
PUT /api/translations/update/:id
```

---

## Database Example

```json
{
  "key": "welcome_message",
  "translations": {
    "en": "Welcome to our platform",
    "hi": "हमारे प्लेटफ़ॉर्म में आपका स्वागत है",
    "es": "Bienvenido a nuestra plataforma",
    "fr": "Bienvenue sur notre plateforme"
  }
}
```

---

## Loom Video Requirement (For Assignment)

The submission video should include:

- Adding a translation
- Auto-generation of translations
- Searching translations
- Editing values
- Showing MongoDB before and after updates
- Explanation of workflow

---

## Contributing

Pull requests are welcome. Fork the repository and submit improvements.

---

## License

Project is available under the MIT License.

---

## Author

Piyush Singh Chauhan  
Translation Tool Management – MERN Stack Project
