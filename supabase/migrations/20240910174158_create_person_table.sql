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

CREATE TABLE Worker (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    identifier Text,
    firstname Text,
    lastname Text,
    email Text,
    maritalstatus Text,
    othername Text,
    phonenumber Text,
    fullname Text,
    department Text,
    team Text,
    workerrole Text,
    code Text,
    auditorium Text,
    fullnamereverse Text,
    ispresent BOOLEAN,
    isactive BOOLEAN,
    iseligible BOOLEAN,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMP
);
