SELECT
  a.id AS account_id,
  a.name AS account_name,
  count(1) AS number_of_users
FROM
  accounts a
  JOIN account_users au ON a.id = au.account_id
GROUP BY
  a.id
HAVING
  count(1) > 1