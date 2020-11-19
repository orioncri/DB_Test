WOQL.and(         
    WOQL.doctype("Object").label("City or Person")             
        .description("An object is either a City, Person or Null")
        .property("id", "integer").label("Object Id")
        .property("objet_type", "string").label("Object Type"),
    WOQL.doctype("City").label("City")
        .property("id", "integer").label("City Id")
        .property("object_id", "integer").label("Object Id"),
    WOQL.doctype("Person").label("Person")
        .property("id", "integer").label("Person Id")
        .property("object_id", "integer").label("Object Id"),
    WOQL.doctype("City_Content").label("City_Content")             
        .property("id", "integer").label("City Content Id")
        .property("content_id", "integer").label("Content Id")
        .property("city_id", "integer").label("City Id")
        .property("name", "string").label("City Name"),
    WOQL.doctype("Person_Content").label("Person Content")             
        .property("id", "integer").label("Person Content Id")
        .property("content_id", "integer").label("Content Id")
        .property("person_id", "integer").label("Person Id")
        .property("first_name", "string").label("First Name")
        .property("last_name", "string").label("Last Name")
        .property("age", "integer").label("Person Age")
        .property("city_id", "integer").label("City Id")
)
