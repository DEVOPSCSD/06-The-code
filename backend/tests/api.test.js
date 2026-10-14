const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../server");

test("GET /api/health returns success", async () => {
    const response = await request(app).get("/api/health");

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
});

test("GET /api/foods returns food records", async () => {
    const response = await request(app).get("/api/foods");

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
    assert.ok(Array.isArray(response.body.data));
    assert.ok(response.body.data.length > 0);
});

test("POST /api/orders rejects an invalid request", async () => {
    const response = await request(app)
        .post("/api/orders")
        .send({
            customer_name: "",
            food_id: 1,
            quantity: 2
        });

    assert.equal(response.status, 400);
    assert.equal(response.body.success, false);
});

test("POST /api/orders rejects a non-existent food item", async () => {
    const response = await request(app)
        .post("/api/orders")
        .send({
            customer_name: "Test Customer",
            food_id: 999999,
            quantity: 1
        });

    assert.equal(response.status, 404);
    assert.equal(response.body.success, false);
});

test("GET /api/orders returns an order list", async () => {
    const response = await request(app).get("/api/orders");

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
    assert.ok(Array.isArray(response.body.data));
});