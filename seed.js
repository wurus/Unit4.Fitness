const pool = require("./db");
const dropTables = async () => {
  try {
    await pool.query("DROP TABLE IF EXISTS routines_activities");
    await pool.query("DROP TABLE IF EXISTS activities");
    await pool.query("DROP TABLE IF EXISTS routines");

    console.log("Tables Dropped");
  } catch (err) {
    console.log("Error dropping tables", err);
  }
};

const createTables = async () => {
  try {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS activities (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT
    )
  `);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS routines (
    id SERIAL PRIMARY KEY,
    is_public BOOLEAN NOT NULL DEFAULT false,
    name VARCHAR(255) NOT NULL,
    goal TEXT
  )
`);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS routines_activities (
    id SERIAL PRIMARY KEY,
    routine_id INT NOT NULL,
    activity_id INT NOT NULL,
    count INT,
    FOREIGN KEY (routine_id) REFERENCES routines(id) ON DELETE CASCADE,
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
      )
    `);
    console.log("Tables Created");
  } catch (err) {
    console.log("Error creating tables", err);
  }
};

const activitiesData = [
  { name: "Running", description: "Jogging around the park" },
  { name: "Cycling", description: "Riding a bike on trails" },
  { name: "Swimming", description: "Laps in the pool" },
];

const routinesData = [
  { is_public: true, name: "Morning Workout", goal: "Stay fit" },
  { is_public: false, name: "Evening Routine", goal: "Relaxation" },
];

const routinesActivitiesData = [
  { routine_id: 1, activity_id: 1, count: 3 },
  { routine_id: 1, activity_id: 2, count: 2 },
  { routine_id: 2, activity_id: 3, count: 4 },
];
const seedDatabase = async () => {
  try {
    await Promise.all(
      activitiesData.map((activity) =>
        pool.query(
          "INSERT INTO activities (name, description) VALUES ($1, $2)",
          [activity.name, activity.description]
        )
      )
    );

    await Promise.all(
      routinesData.map((routine) =>
        pool.query(
          "INSERT INTO routines (is_public, name, goal) VALUES ($1, $2, $3)",
          [routine.is_public, routine.name, routine.goal]
        )
      )
    );

    await Promise.all(
      routinesActivitiesData.map((routinesActivity) =>
        pool.query(
          "INSERT INTO routines_activities (routine_id, activity_id, count) VALUES ($1, $2, $3)",
          [
            routinesActivity.routine_id,
            routinesActivity.activity_id,
            routinesActivity.count,
          ]
        )
      )
    );

    console.log("Database Seeded");
  } catch (err) {
    console.error("Error seeding database", err);
  } finally {
   
  }
};

const createAndSeed = async () => {
  await dropTables();
  await createTables();
  await seedDatabase();
};

module.exports = createAndSeed;
