const db = require("../config/db");

const taskModel = {

    // get tasks between a date range
    getTasks: async (startDate, endDate) => {
        if (!startDate || !endDate) {
            throw new Error("Start date and end date are required");
        }

        console.log("Query Parameters - Start Date:", startDate, "End Date:", endDate);

        const query = `
            SELECT id, category, descr, is_completed, due_date
            FROM task
            WHERE due_date BETWEEN ? and ?
            ORDER BY due_date ASC;
        `;

        try {
            const [rows] = await db.execute(query, [startDate, endDate]);

            // Format due_date to only include the date part
            const formattedRows = rows.map(row => ({
                ...row,
                due_date: new Date(row.due_date).toISOString().split('T')[0], // Extracts YYYY-MM-DD
            }));

            console.log("Formatted Result from DB execution:", formattedRows);
            return formattedRows;
        } catch (error) {
            console.error("Database execution error:", error.message);
            throw error;
        }
    },

    // create a new task
    createTask: async(task) => {
        const query = `
        INSERT INTO task (category, descr, due_date)
        values(?, ?, ?);
        `;
        const [result] = await db.execute (query, [
            task.category,
            task.descr,
            task.due_date,
        ]);
        return {id: result.insertId, ...task};
    },

    // update an existsing task
    updateTask: async(id, task) => {
        const query = `
        UPDATE task
         SET category = ?, descr = ?, due_date = ?
         WHERE id = ?;
        `;
        await db.execute(query, [
            task.category,
            task.descr,
            task.due_date,
            id,
        ]);

        // return the updated task
        return {id, ...task};
    },

    // delete a task
    deleteTask: async (id) => {
        const query = `
        DELETE FROM task
        WHERE id = ?;
        `;
        const [result] = await db.execute(query, [id]);
        return result.affectedRows > 0; // return true if a row was deleted
    },
};

module.exports = taskModel;
