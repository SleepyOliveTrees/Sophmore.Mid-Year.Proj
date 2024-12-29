const db = require("../config/db");

const taskModel = {
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
};

module.exports = taskModel;
