
require("dotenv").config();
const express = require("express");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Online Food Ordering Backend is running!");
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Backend is running successfully"
    });
});

// GET /api/foods - Retrieve all food items
app.get("/api/foods", async (req, res) => {
    try {
        const [foods] = await pool.query(
            "SELECT * FROM foods ORDER BY id"
        );

        res.json({
            success: true,
            count: foods.length,
            data: foods
        });
    } catch (error) {
        console.error("Error retrieving foods:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve foods"
        });
    }
});

// POST /api/orders - Create a new order
app.post("/api/orders", async (req, res) => {
    const { customer_name, food_id, quantity } = req.body;

    if (
        typeof customer_name !== "string" ||
        !customer_name.trim() ||
        !Number.isInteger(Number(food_id)) ||
        Number(food_id) < 1 ||
        !Number.isInteger(Number(quantity)) ||
        Number(quantity) < 1 ||
        Number(quantity) > 100
    ) {
        return res.status(400).json({
            success: false,
            message: "Provide customer_name, a valid food_id, and a positive integer quantity (maximum 100)"
        });
    }

    try {
        const [foods] = await pool.execute(
            "SELECT id, price FROM foods WHERE id = ?",
            [Number(food_id)]
        );

        if (foods.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Food item not found"
            });
        }

        const totalPrice = Number(
            (Number(foods[0].price) * Number(quantity)).toFixed(2)
        );

        const [result] = await pool.execute(
            `INSERT INTO orders
            (customer_name, food_id, quantity, total_price)
            VALUES (?, ?, ?, ?)`,
            [
                customer_name.trim(),
                Number(food_id),
                Number(quantity),
                totalPrice
            ]
        );

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: {
                id: result.insertId,
                customer_name: customer_name.trim(),
                food_id: Number(food_id),
                quantity: Number(quantity),
                total_price: totalPrice,
                order_status: "Pending"
            }
        });
    } catch (error) {
        console.error("Error creating order:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to create order"
        });
    }
});

// GET /api/orders - Retrieve all orders
app.get("/api/orders", async (req, res) => {
    try {
        const [orders] = await pool.query(`
            SELECT
                o.id,
                o.customer_name,
                o.food_id,
                f.name AS food_name,
                o.quantity,
                o.total_price,
                o.order_status,
                o.created_at
            FROM orders o
            INNER JOIN foods f ON o.food_id = f.id
            ORDER BY o.id DESC
        `);

        res.json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        console.error("Error retrieving orders:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve orders"
        });
    }
});

// Handle malformed JSON requests
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({
            success: false,
            message: "Invalid JSON request body"
        });
    }

    next(err);
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Backend running on port ${PORT}`);
    });
}

module.exports = app;