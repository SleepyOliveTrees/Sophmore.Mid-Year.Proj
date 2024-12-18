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