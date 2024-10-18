CREATE TABLE Leader (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    identifier Text,
    firstname Text,
    lastname Text,
    othername Text,
    phonenumber Text,
    fullname Text,
    department Text,
    team Text,
    workerrole Text,
    fullnamereverse Text,
    ispresent BOOLEAN,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    updatedat TIMESTAMP
);
