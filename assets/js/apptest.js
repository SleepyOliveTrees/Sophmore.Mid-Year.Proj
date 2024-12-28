const express = require("express");
const db = require("../../db/db_connection");
const app = express();
const user = `Select user.user_id From user where user.user_name = ? and user.password = ?`
app.use(express.static(__dirname + "/public"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

const get_all_subjects = `
    SELECT subject_name, subject_desc
    FROM subject 
`;

app.get("/", (req, res) => {
 
    res.render("index", { msesage: username, subjectlist: results });
});

app.get("/subjects", (req, res) => {
  db.execute(get_all_subjects, (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.render("index", { name: username, subjectlist: results });
    }
  });
});

const get_items = `
    SELECT *
    FROM to_do_item item
    JOIN subject
    ON item.subject_id = subject.subject_id 
    WHERE item_id = ?;

    SELECT *
    FROM to_do_item item
    JOIN subject_private
    ON item.subject_private_id = subject_private.subjectprivate_id
    WHERE item_id = ?
`;

app.get("/todo-list/:id", (req, res) => {
  db.execute(get_items, [req.params.id], (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.render("edit_item", { to_do_item: results[0] });
    }
  });
});

const create_game = `
    INSERT INTO game_wishlist (game_name, cost, store_id, type, description)
    VALUES (?, ?, ?, ?, ?)
`;

app.post("/", (req, res) => {
  console.log(
    req.body.game_name,
    req.body.cost,
    req.body.store,
    req.body.type,
    req.body.description
  );
  db.execute(
    create_game,
    [
      req.body.game_name,
      req.body.cost,
      req.body.store,
      req.body.type,
      req.body.description,
    ],
    (error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.redirect("/");
      }
    }
  );
});

const delete_game = `
    DELETE FROM game_wishlist
    WHERE gw_id = ?
`;

app.get("/game_wishlist/:id/delete", (req, res) => {
  db.execute(delete_game, [req.params.id], (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.redirect("/");
    }
  });
});

const update_game = `
    UPDATE game_wishlist
    SET game_name = ?,
        cost = ?,
        store_id = ?,
        type = ?,
        description = ?
    WHERE
        gw_id = ?
`;

app.post("/game_wishlist/:id", (req, res) => {
  console.log(
    req.body.game_name,
    req.body.cost,
    req.body.store_name,
    req.body.type,
    req.body.description,
    req.params.id
  );
  db.execute(
    update_game,
    [
      req.body.game_name,
      req.body.cost,
      req.body.store_name,
      req.body.type,
      req.body.description,
      req.params.id,
    ],
    (error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.redirect("/");
      }
    }
  );
});

app.listen(5000, () => {
  console.log("App Running");
});
