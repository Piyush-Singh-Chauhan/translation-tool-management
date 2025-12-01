import User from '../models/userModel.js';

// Register new user
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Create new user (In production, hash the password with bcrypt)
        const newUser = await User.create({
            name,
            email,
            password // Note: In production, use bcrypt.hash(password, 10)
        });

        // Generate token (simple version - in production use JWT)
        const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');

        res.status(201).json({
            message: "Registration successful",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: "Error in registration", error: err.message });
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Check password (In production, use bcrypt.compare(password, user.password))
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate token
        const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Error in login", error: err.message });
    }
};
