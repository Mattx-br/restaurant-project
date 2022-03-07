use restaurant;
select * from tb_reservations;

DELETE FROM tb_reservations WHERE id=7; 




SELECT
    CONCAT(YEAR(date), '-', MONTH(date)) AS date,
    COUNT(*) AS total,
    SUM(people) / COUNT(*) AS avg_people
FROM tb_reservations
WHERE
    date BETWEEN '2017-09-24' AND '2028-09-24'
GROUP BY YEAR(date) DESC, MONTH(date) DESC
ORDER BY YEAR(date) DESC, MONTH(date) DESC;


SELECT
    date,
    COUNT(*) AS total,
    SUM(people) / COUNT(*) AS avg_people
FROM tb_reservations;